import { planDeadline, planEstaActivo } from "../../lib/planDeadline.js";
import prisma from "../../lib/prisma.js";
import { enviarCorreoRecordatorioPlan } from "../../utils/mailer.js";
import logger from "../../utils/logger.js";
import { env } from "../../config/env.js";
import { PushService } from "../notifications/push.service.js";

const HITO_DIAS = [5, 3, 1] as const;
const INTERVALO_MS = 6 * 60 * 60 * 1000;
const TAMANO_LOTE = 500;
const staleBefore = () => new Date(Date.now() - 15 * 60 * 1000);
let running = false;

function fechaLima(hoy = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(hoy);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)));
}

function fechaISO(fecha: Date) {
  return fecha.toISOString().slice(0, 10);
}

function diaMas(fecha: Date, dias: number) {
  const resultado = new Date(fecha);
  resultado.setUTCDate(resultado.getUTCDate() + dias);
  return resultado;
}

export async function procesarRecordatoriosPlanes() {
  if (running) return;
  running = true;
  try {
    const hoy = fechaLima();
    let cursor: number | undefined;
    while (true) {
      const planes = await prisma.planes_accion.findMany({
        ...(cursor ? { cursor: { id_plan: cursor }, skip: 1 } : {}),
        take: TAMANO_LOTE,
        orderBy: { id_plan: "asc" },
        select: {
          id_plan: true, fecha_plan: true, fecha_reprogramada: true,
          actividades_plan: { select: { fecha_fin: true } },
          catalogo_detalle: { select: { nombre: true } },
        },
      });
      if (!planes.length) break;
      cursor = planes[planes.length - 1]!.id_plan;
      const pendientes: { id_plan: number; dias_antes: number; fecha_limite: Date }[] = [];
      for (const plan of planes) {
        if (!planEstaActivo(plan)) continue;
        const limite = planDeadline(plan);
        for (const dias of HITO_DIAS) {
          if (fechaISO(limite) === fechaISO(diaMas(hoy, dias))) pendientes.push({ id_plan: plan.id_plan, dias_antes: dias, fecha_limite: limite });
        }
      }
      if (pendientes.length) await prisma.plan_recordatorios.createMany({ data: pendientes, skipDuplicates: true });
      if (planes.length < TAMANO_LOTE) break;
    }

    const pendientes = await prisma.plan_recordatorios.findMany({
      where: { OR: [{ estado: "pendiente" }, { estado: "enviando", claimed_at: { lte: staleBefore() } }] },
      take: 200,
      orderBy: { created_at: "asc" },
      include: { plan: { select: { id_plan: true, codigo_plan: true, descripcion: true, fecha_plan: true, fecha_reprogramada: true, actividades_plan: { select: { fecha_fin: true } }, catalogo_detalle: { select: { nombre: true } }, usuarios: { select: { id_usuario: true, correo: true, nombre: true } }, casos_sop: { select: { codigo_sop: true } } } } },
    });

    for (const recordatorio of pendientes) {
      const claim = await prisma.plan_recordatorios.updateMany({
        where: { id_recordatorio: recordatorio.id_recordatorio, OR: [{ estado: "pendiente" }, { estado: "enviando", claimed_at: { lte: staleBefore() } }] },
        data: { estado: "enviando", claimed_at: new Date() },
      });
      if (!claim.count) continue;
      const plan = recordatorio.plan;
      if (!planEstaActivo(plan) || fechaISO(planDeadline(plan)) !== fechaISO(recordatorio.fecha_limite)) {
        await prisma.plan_recordatorios.update({ where: { id_recordatorio: recordatorio.id_recordatorio }, data: { estado: "cancelado", claimed_at: null } });
        continue;
      }
      try {
        const titulo = `Tu plan ${plan.codigo_plan} vence en ${recordatorio.dias_antes} ${recordatorio.dias_antes === 1 ? "día" : "días"}`;
        const mensaje = `El plazo del plan ${plan.codigo_plan} vence el ${fechaISO(recordatorio.fecha_limite)}. Revisa y registra el avance pendiente.`;
        // El aviso en la plataforma no depende del proveedor de correo. El
        // marcador evita duplicados si el correo falla y el hito se reintenta.
        let avisarDispositivo = false;
        await prisma.$transaction(async tx => {
          const result = await tx.plan_recordatorios.updateMany({
            where: { id_recordatorio: recordatorio.id_recordatorio, notificado_at: null },
            data: { notificado_at: new Date() },
          });
          if (!result.count) return;
          await tx.notificaciones.create({ data: { usuario: plan.usuarios.id_usuario, tipo: "plan_por_vencer", titulo, mensaje } });
          avisarDispositivo = true;
        });
        if (avisarDispositivo) void PushService.enviarAUsuarios([plan.usuarios.id_usuario], { title: titulo, body: mensaje });
        await enviarCorreoRecordatorioPlan({
          destino: plan.usuarios.correo,
          nombre: plan.usuarios.nombre,
          codigoPlan: plan.codigo_plan,
          codigoCaso: plan.casos_sop.codigo_sop,
          descripcion: plan.descripcion,
          fechaLimite: recordatorio.fecha_limite,
          diasRestantes: recordatorio.dias_antes,
          url: `${env.FRONTEND_URL.replace(/\/$/, "")}/jefe/planes/${encodeURIComponent(plan.casos_sop.codigo_sop)}?plan=${plan.id_plan}`,
        });
        await prisma.plan_recordatorios.update({ where: { id_recordatorio: recordatorio.id_recordatorio }, data: { estado: "enviado", sent_at: new Date(), claimed_at: null } });
        logger.info({ idPlan: plan.id_plan, diasAntes: recordatorio.dias_antes }, "Plan deadline reminder sent");
      } catch (error) {
        await prisma.plan_recordatorios.update({ where: { id_recordatorio: recordatorio.id_recordatorio }, data: { estado: "pendiente", claimed_at: null } });
        logger.warn({ idPlan: plan.id_plan, diasAntes: recordatorio.dias_antes, errorName: error instanceof Error ? error.name : "UnknownError" }, "Plan deadline reminder failed; will retry");
      }
    }
  } catch (error) {
    logger.error({ errorName: error instanceof Error ? error.name : "UnknownError" }, "Plan deadline reminder scan failed");
  } finally {
    running = false;
  }
}

export function iniciarRecordatoriosPlanes() {
  void procesarRecordatoriosPlanes();
  const timer = setInterval(() => void procesarRecordatoriosPlanes(), INTERVALO_MS);
  timer.unref();
}
