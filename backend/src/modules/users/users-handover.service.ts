import { z } from "zod";
import prisma from "../../lib/prisma.js";
import type { Actor } from "../../utils/actor.js";
import { pendingPlansForUser } from "./user-plan-responsibilities.js";
import { PushService } from "../notifications/push.service.js";
import { enviarCorreoPlanReasignado } from "../../utils/mailer.js";
import { env } from "../../config/env.js";
import logger from "../../utils/logger.js";

const idSchema = z.coerce.number().int().positive();
const handoverSchema = z.object({
  planes: z.array(z.number().int().positive()).min(1).max(10_000),
  asignaciones: z.array(z.object({ id_plan: z.number().int().positive(), id_usuario: z.number().int().positive() }).strict()).min(1).max(10_000),
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
      new Set(payload.asignaciones.map(item => item.id_plan)).size !== payload.asignaciones.length ||
      payload.planes.length !== payload.asignaciones.length ||
      payload.asignaciones.some(item => !payload.planes.includes(item.id_plan))) {
      throw new Error("Cada plan seleccionado debe tener un único reemplazo.");
    }
    const result = await prisma.$transaction(async tx => {
      const source = await tx.usuarios.findUnique({ where: { id_usuario: id }, select: { nombre: true } });
      if (!source) throw new Error("Usuario no encontrado");
      const allPending = await pendingPlansForUser(tx, id);
      const requested = new Set(payload.planes);
      const plans = allPending.filter(plan => requested.has(plan.id_plan));
      if (!plans.length || plans.length !== requested.size) {
        throw new Error("Los planes pendientes cambiaron. Actualiza la revisión antes de reasignar.");
      }
      const destinationIds = [...new Set(payload.asignaciones.map(item => item.id_usuario))];
      const destinations = await tx.usuarios.findMany({
        where: { id_usuario: { in: destinationIds }, estado: "Activo", roles: { nombre_rol: "Jefe de Área" } },
        select: { id_usuario: true, nombre: true, correo: true, id_area: true },
      });
      const mappings = new Map(payload.asignaciones.map(item => [item.id_plan, item.id_usuario]));
      for (const plan of plans) {
        const target = destinations.find(user => user.id_usuario === mappings.get(plan.id_plan));
        if (!target || target.id_usuario === id) {
          throw new Error("Selecciona un Jefe de Área activo y distinto del actual para cada plan.");
        }
      }
      let activities = 0;
      const notifications: { usuario: number; titulo: string; mensaje: string; tipo: string }[] = [];
      const emails: { destino: string; nombreJefe: string; codigoPlan: string; codigoCaso: string; areaNombre: string; anterior: string; url: string }[] = [];
      for (const plan of plans) {
        const target = destinations.find(user => user.id_usuario === mappings.get(plan.id_plan))!;
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
        emails.push({ destino: target.correo, nombreJefe: target.nombre, codigoPlan: plan.codigo_plan,
          codigoCaso: plan.casos_sop.codigo_sop, areaNombre: plan.areas.nombre_area, anterior: source.nombre,
          url: `${env.FRONTEND_URL.replace(/\/$/, "")}/jefe/planes/${encodeURIComponent(plan.casos_sop.codigo_sop)}?plan=${plan.id_plan}` });
      }
      // Notification and audit rows commit atomically with the transfer.
      await tx.notificaciones.createMany({ data: notifications });
      return { planes: plans.length, actividades: activities, pendientesRestantes: allPending.length - plans.length, destinatarios: destinationIds, emails };
    }, { isolationLevel: "Serializable", timeout: 120_000 });
    // No push can advertise a transfer that ultimately rolled back.
    void PushService.enviarAUsuarios(result.destinatarios, { title: "Planes reasignados", body: "Tienes responsabilidades reasignadas. Revisa tu bandeja de notificaciones." });
    const emailResults = await Promise.allSettled(result.emails.map(email => enviarCorreoPlanReasignado(email)));
    const correosFallidos = emailResults.filter(item => item.status === "rejected").length;
    if (correosFallidos) logger.warn({ correosFallidos }, "Plan reassignment email failed after commit");
    return { planes: result.planes, actividades: result.actividades, pendientesRestantes: result.pendientesRestantes,
      correosEnviados: emailResults.length - correosFallidos, correosFallidos };
  }
}
