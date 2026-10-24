import { z } from "zod";
import prisma from "../../lib/prisma.js";
import type { Actor } from "../../utils/actor.js";
import { pendingPlansForUser } from "./user-plan-responsibilities.js";
import { PushService } from "../notifications/push.service.js";

const idSchema = z.coerce.number().int().positive();
const handoverSchema = z.object({
  planes: z.array(z.number().int().positive()).min(1).max(10_000),
  asignaciones: z.array(z.object({ id_area: z.number().int().positive(), id_usuario: z.number().int().positive() }).strict()).min(1).max(1000),
  motivo: z.string().trim().min(10, "Describe el motivo de la reasignación (mínimo 10 caracteres).").max(1000),
}).strict();

export class UsersHandoverService {
  static async pendientes(rawId: unknown) {
    const id = idSchema.parse(rawId);
    if (!await prisma.usuarios.findUnique({ where: { id_usuario: id }, select: { id_usuario: true } })) throw new Error("Usuario no encontrado");
    return pendingPlansForUser(prisma, id);
  }

  static async reasignar(rawId: unknown, body: unknown, actor: Actor, ip?: string) {
    const id = idSchema.parse(rawId);
    const payload = handoverSchema.parse(body);
    if (new Set(payload.planes).size !== payload.planes.length ||
      new Set(payload.asignaciones.map(item => item.id_area)).size !== payload.asignaciones.length) {
      throw new Error("No repitas planes ni áreas en la reasignación.");
    }
    const result = await prisma.$transaction(async tx => {
      const source = await tx.usuarios.findUnique({ where: { id_usuario: id }, select: { nombre: true } });
      if (!source) throw new Error("Usuario no encontrado");
      const plans = await pendingPlansForUser(tx, id);
      const requested = new Set(payload.planes);
      if (!plans.length || plans.length !== requested.size || plans.some(plan => !requested.has(plan.id_plan))) {
        throw new Error("Los planes pendientes cambiaron. Actualiza la revisión antes de reasignar.");
      }
      const destinationIds = [...new Set(payload.asignaciones.map(item => item.id_usuario))];
      const destinations = await tx.usuarios.findMany({
        where: { id_usuario: { in: destinationIds }, estado: "Activo", roles: { nombre_rol: "Jefe de Área" } },
        select: { id_usuario: true, nombre: true, id_area: true },
      });
      const mappings = new Map(payload.asignaciones.map(item => [item.id_area, item.id_usuario]));
      if (payload.asignaciones.some(item => !plans.some(plan => plan.id_area === item.id_area))) throw new Error("La revisión contiene un área que no corresponde a los planes.");
      for (const plan of plans) {
        const target = destinations.find(user => user.id_usuario === mappings.get(plan.id_area));
        if (!target || target.id_usuario === id || target.id_area !== plan.id_area) {
          throw new Error("Selecciona un Jefe de Área activo y distinto del actual para cada área correspondiente.");
        }
      }
      let activities = 0;
      const notifications: { usuario: number; titulo: string; mensaje: string; tipo: string }[] = [];
      for (const plan of plans) {
        const target = destinations.find(user => user.id_usuario === mappings.get(plan.id_area))!;
        if (plan.responsable === id) {
          const changed = await tx.planes_accion.updateMany({ where: { id_plan: plan.id_plan, responsable: id }, data: { responsable: target.id_usuario, updated_at: new Date() } });
          if (changed.count !== 1) throw new Error("El responsable cambió durante la reasignación. Actualiza la revisión.");
        }
        const activityIds = plan.actividades_plan.map(item => item.id_actividad);
        if (activityIds.length) {
          const changed = await tx.actividades_plan.updateMany({ where: { id_actividad: { in: activityIds }, responsable: id }, data: { responsable: target.id_usuario } });
          if (changed.count !== activityIds.length) throw new Error("Las actividades cambiaron durante la reasignación. Actualiza la revisión.");
          activities += changed.count;
        }
        await tx.auditoria.create({ data: {
          usuario: actor.id_usuario, ip: ip ?? null, tabla_afectada: "planes_accion", id_registro: plan.id_plan, accion: "editar",
          descripcion: `Reasignó responsabilidades de ${plan.codigo_plan}. Motivo: ${payload.motivo}`,
          datos_previos: { responsable: plan.responsable, actividades_pendientes: activityIds, usuario_saliente: id },
          datos_nuevos: { responsable: plan.responsable === id ? target.id_usuario : plan.responsable, nuevo_responsable_actividades: target.id_usuario, motivo: payload.motivo },
        } });
        await tx.timeline_caso.create({ data: {
          id_caso: plan.id_caso, kind: "plan_reasignado", actor: actor.nombre || actor.correo, actor_rol: "admin",
          titulo: `Responsabilidades reasignadas — ${plan.codigo_plan}`,
          detalle: `De ${source.nombre} a ${target.nombre}. Motivo: ${payload.motivo}. Se conservaron estados, avances, fechas y evidencias.`,
        } });
        notifications.push({ usuario: target.id_usuario, tipo: "plan_asignado",
          titulo: `Responsabilidades reasignadas — ${plan.codigo_plan}`,
          mensaje: `Se te asignaron responsabilidades pendientes del caso ${plan.casos_sop.codigo_sop}. Revisa el plan; conserva su estado y avance.` });
      }
      // Notification and audit rows commit atomically with the transfer.
      await tx.notificaciones.createMany({ data: notifications });
      return { planes: plans.length, actividades: activities, destinatarios: destinationIds };
    }, { isolationLevel: "Serializable", timeout: 120_000 });
    // No push can advertise a transfer that ultimately rolled back.
    void PushService.enviarAUsuarios(result.destinatarios, { title: "Planes reasignados", body: "Tienes responsabilidades reasignadas. Revisa tu bandeja de notificaciones." });
    return { planes: result.planes, actividades: result.actividades };
  }
}
