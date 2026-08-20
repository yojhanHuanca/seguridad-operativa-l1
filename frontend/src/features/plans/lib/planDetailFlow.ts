import { normalize } from "./planStatus";
import { parseActivityDescription } from "@/features/cases/lib/activityMeta";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { progresoPorHitos } from "@/features/cases/lib/planProgress";
import {
  evidenciasDelEvento,
  humanEvidenceDetail,
  planEvidenceFiles as extractPlanEvidenceFiles,
  timelineBelongsToPlan,
} from "@/features/cases/lib/planEvidence";
import { daysUntil } from "@/lib/format";
import type { AnexoPlanCaso, PlanActividad, PlanItem } from "../types";

/**
 * Lógica de estado/derivados exclusiva de la pantalla de detalle de plan
 * (Jefe de Área). Deliberadamente separada de `planStatus.ts`: esa vive en
 * JefeShell/JefeHome para filtros de lista, esta es más granular (agrega
 * `pendienteAceptacion`, `puedeTrabajar`, `todasCompletadas` para habilitar
 * botones) y con matices propios de esta pantalla. No se fusionaron para no
 * arriesgar el comportamiento ya afinado de ninguna de las dos.
 */

export type StatusTone = "neutral" | "brand" | "critical" | "warning" | "info" | "success";

/** Tope de actualizaciones que el jefe puede apilar; el backend valida lo mismo. */
export const MAX_ACTUALIZACIONES = 4;

export interface PlanUpdate {
  id: string;
  etiqueta: string;
  descripcion: string;
  actor: string;
  fecha: string | null;
  evidencias: AnexoPlanCaso[];
}

export interface MensajePlan {
  id: number;
  rol: "seguridad" | "jefe";
  autor: string;
  texto: string;
  fecha: string | null;
}

function activityProgressValue(activity: PlanActividad): number {
  if (activity.porcentaje !== null && activity.porcentaje !== "") {
    const numeric = Number(activity.porcentaje);
    if (Number.isFinite(numeric)) return Math.min(100, Math.max(0, numeric));
  }

  const estado = normalize(activity.catalogo_detalle?.nombre);
  if (estado.includes("complet")) return 100;
  if (estado.includes("progreso")) return 50;
  return 0;
}

export function calcProgress(plan: PlanItem): number {
  const flow = planFlow(plan);
  const eventos = planTimeline(plan);
  return progresoPorHitos({
    aceptado: flow.aceptado,
    finalizado: flow.finalizado || flow.cerrado || flow.enVerificacion,
    detenido: flow.rechazado,
    comentarios: eventos.filter((e) => e.kind === "comentario").length,
    evidencias: extractPlanEvidenceFiles(plan, plan.casos_sop.timeline_caso ?? [], plan.casos_sop.anexos_caso ?? []).length,
  });
}

export function planTipoAccion(plan: PlanItem): string {
  const tipo = plan.actividades_plan
    .map((actividad) => parseActivityDescription(actividad.descripcion).meta.tipoAccion)
    .find(Boolean);
  return tipo?.replace(/^Acción\s+/i, "") ?? "Correctiva";
}

export function planFlow(plan: PlanItem) {
  const estadoPlan = plan.catalogo_detalle?.nombre ?? "";
  const etapaCaso = plan.casos_sop.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
  const estadoKey = normalize(estadoPlan);
  const etapaKey = normalize(etapaCaso);
  const finalizado = estadoKey.includes("finaliz");
  const cerrado = estadoKey.includes("cerrad") || etapaKey.includes("cierre");
  const rechazado = estadoKey.includes("rechaz") || etapaKey.includes("rechaz");
  const enVerificacion = etapaKey.includes("verificacion");
  const prorrogaPendiente = plan.prorroga_estado === "pendiente";
  const aceptado = estadoKey.includes("aceptad") || estadoKey.includes("ejecucion") || finalizado || estadoKey.includes("cerrad");
  const pendienteAceptacion = !aceptado && !finalizado && !cerrado && !rechazado && !enVerificacion && !prorrogaPendiente;
  const puedeTrabajar = aceptado && !finalizado && !cerrado && !rechazado && !enVerificacion && !prorrogaPendiente;
  const todasCompletadas = (plan.actividades_plan ?? []).length > 0 && plan.actividades_plan.every((a) => activityProgressValue(a) >= 100);

  return {
    estadoPlan,
    etapaCaso,
    finalizado,
    cerrado,
    rechazado,
    enVerificacion,
    prorrogaPendiente,
    aceptado,
    pendienteAceptacion,
    puedeTrabajar,
    todasCompletadas,
  };
}

export function statusLabel(flow: ReturnType<typeof planFlow>): { label: string; tone: StatusTone } {
  if (flow.rechazado) return { label: "Rechazado", tone: "critical" };
  if (flow.cerrado) return { label: "Cerrado", tone: "neutral" };
  if (flow.finalizado) return { label: "En revisión SO", tone: "warning" };
  if (flow.prorrogaPendiente) return { label: "Prórroga solicitada", tone: "warning" };
  if (flow.enVerificacion) return { label: "En verificación SO", tone: "warning" };
  if (flow.aceptado) return { label: "En ejecución", tone: "brand" };
  return { label: "Pendiente de aceptación", tone: "info" };
}

export function priorityInfo(plan: PlanItem): { label: string; tone: StatusTone; rank: number } {
  const riesgo = plan.casos_sop.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const text = normalize(`${riesgo?.codigo ?? ""} ${riesgo?.nombre ?? ""}`);
  const tokens = text.split(/[^a-z0-9]+/).filter(Boolean);

  if (tokens.some((t) => ["critica", "critico", "inaceptable", "extremo", "extrema"].includes(t))) return { label: "Crítica", tone: "critical", rank: 0 };
  if (tokens.some((t) => ["a", "alta", "alto"].includes(t))) return { label: "Alta", tone: "warning", rank: 1 };
  if (tokens.some((t) => ["b", "baja", "bajo"].includes(t))) return { label: "Baja", tone: "neutral", rank: 3 };
  return { label: "Media", tone: "info", rank: 2 };
}

export function planStart(plan: PlanItem): string {
  return plan.actividades_plan.find((a) => a.fecha_inicio)?.fecha_inicio ?? plan.created_at ?? plan.fecha_plan;
}

export function planEnd(plan: PlanItem): string {
  const ends = plan.actividades_plan
    .map((a) => a.fecha_fin)
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  return plan.fecha_reprogramada ?? ends[0] ?? plan.fecha_plan;
}

export function planNumberLabel(plan: PlanItem): string {
  return shortPlanCode(plan.codigo_plan);
}

export function estimatedDuration(start: string, end: string): string {
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) return "-";
  const days = Math.max(1, Math.ceil((endMs - startMs) / 86400000));
  return `${days} ${days === 1 ? "día" : "días"}`;
}

export function reviewState(flow: ReturnType<typeof planFlow>): { label: string; tone: StatusTone } {
  if (flow.rechazado) return { label: "Rechazado", tone: "critical" };
  if (flow.pendienteAceptacion) return { label: "Pendiente", tone: "info" };
  return { label: "Aprobado", tone: "success" };
}

export function detailStatus(flow: ReturnType<typeof planFlow>, progreso: number): { label: string; tone: StatusTone } {
  if (flow.rechazado) return { label: "Rechazado", tone: "critical" };
  if (flow.cerrado) return { label: "Cerrado", tone: "neutral" };
  if (flow.finalizado || flow.enVerificacion) return { label: "En revisión SO", tone: "warning" };
  if (flow.prorrogaPendiente) return { label: "Prórroga solicitada", tone: "warning" };
  if (progreso >= 100) return { label: "Completado", tone: "success" };
  if (flow.aceptado) return { label: "En proceso", tone: "brand" };
  return { label: "Pendiente", tone: "info" };
}

function eventBelongsToPlan(plan: PlanItem, evento: PlanItem["casos_sop"]["timeline_caso"][number]) {
  return timelineBelongsToPlan(evento, plan);
}

export function planTimeline(plan: PlanItem) {
  return (plan.casos_sop.timeline_caso ?? []).filter((evento) => eventBelongsToPlan(plan, evento));
}

/**
 * Anexos del registro inicial del reporte, sin las evidencias que Jefes de
 * otras áreas (u otros planes de este mismo caso) fueron subiendo durante la
 * ejecución. `caso.anexos_caso` trae todo mezclado, así que se descarta lo que
 * ya está referenciado por algún evento "evidencia" del timeline, sea del
 * plan que sea.
 */
export function reportOnlyAnexos(caso: PlanItem["casos_sop"]): AnexoPlanCaso[] {
  const usedIds = new Set<number>();
  const usedNames = new Set<string>();

  for (const evento of caso.timeline_caso ?? []) {
    if (!evento.titulo.toLowerCase().includes("evidencia")) continue;
    for (const anexo of evidenciasDelEvento(evento, caso.anexos_caso)) usedIds.add(anexo.id_anexo);
    for (const name of humanEvidenceDetail(evento.detalle).split(",").map((n) => n.trim()).filter(Boolean)) {
      usedNames.add(name);
    }
  }

  return caso.anexos_caso.filter(
    (anexo) => !usedIds.has(anexo.id_anexo) && !(anexo.nombre_archivo && usedNames.has(anexo.nombre_archivo.trim()))
  );
}

/**
 * Historial de actualizaciones del plan, de la más antigua a la más reciente.
 *
 * La primera es la descripción de cierre que el jefe mandó al finalizar; las
 * siguientes son las que apiló después. Todas son de solo lectura: una vez
 * enviadas no se editan ni se borran, por eso se arman desde el timeline y no
 * desde un estado editable.
 */
export function planUpdates(plan: PlanItem): PlanUpdate[] {
  const anexos = plan.casos_sop.anexos_caso ?? [];
  const eventos = planTimeline(plan);

  const original = eventos
    .filter((e) => e.kind === "seguimiento" && normalize(e.titulo).includes("finalizado por el area"))
    .map((e) => ({
      id: `cierre-${e.id_evento}`,
      etiqueta: "Actualización original",
      descripcion: humanEvidenceDetail(e.detalle).replace(/^Descripción final:\s*/i, "").trim(),
      actor: e.actor || "Jefe de Área",
      fecha: e.fecha,
      evidencias: [] as AnexoPlanCaso[],
    }));

  // El timeline llega en orden descendente, así que hay que ordenar ANTES de
  // numerar: si no, la actualización más nueva quedaba etiquetada como la 1.
  // A igualdad de fecha desempata el id_evento, que sí es incremental.
  const adicionales = eventos
    .filter((e) => e.kind === "actualizacion")
    .sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0) || a.id_evento - b.id_evento)
    .map((e, i) => ({
      id: `act-${e.id_evento}`,
      etiqueta: `Actualización ${i + 1}`,
      descripcion: humanEvidenceDetail(e.detalle),
      actor: e.actor || "Jefe de Área",
      fecha: e.fecha,
      evidencias: evidenciasDelEvento(e, anexos),
    }));

  // Las evidencias que no vinieron con una actualización adicional (las que el
  // jefe subió en el cierre) pertenecen a la original: sin esto quedaban
  // guardadas pero sin mostrarse en ninguna parte de la pantalla.
  const yaAsignadas = new Set(adicionales.flatMap((a) => a.evidencias.map((x) => x.id_anexo)));
  const sueltas = extractPlanEvidenceFiles(plan, plan.casos_sop.timeline_caso ?? [], anexos).filter(
    (a) => !yaAsignadas.has(a.id_anexo)
  );

  // Solo se cuelgan del cierre real. Antes, si todavía no había cierre, se
  // fabricaba una entrada "Evidencias del plan" con una descripción inventada:
  // aparecía en el historial de lo enviado sin que se hubiera enviado nada, y
  // repetía las mismas miniaturas que ya se ven bajo los botones de carga.
  if (sueltas.length > 0 && original.length > 0) {
    original[0]!.evidencias = sueltas;
  }

  return [...original, ...adicionales];
}

/**
 * Hilo de comentarios del plan, del más antiguo al más nuevo.
 *
 * Salen del timeline con `kind: "comentario"`, que es donde escriben los dos
 * lados: Seguridad Operativa desde el expediente y el jefe desde este panel.
 * El rol define de qué lado se pinta el mensaje.
 */
export function planMensajes(plan: PlanItem): MensajePlan[] {
  return planTimeline(plan)
    .filter((e) => e.kind === "comentario")
    .map((e) => ({
      id: e.id_evento,
      rol: e.actor_rol === "jefe" ? ("jefe" as const) : ("seguridad" as const),
      autor: e.actor || (e.actor_rol === "jefe" ? "Jefe de Área" : "Seguridad Operativa"),
      texto: humanEvidenceDetail(e.detalle) || e.titulo,
      fecha: e.fecha,
    }))
    .sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0) || a.id - b.id);
}

export function planWeight(plan: PlanItem): number {
  const flow = planFlow(plan);
  const due = daysUntil(planEnd(plan));
  if (flow.rechazado || flow.cerrado) return 99;
  if (due < 0) return 0;
  if (flow.prorrogaPendiente) return 1;
  if (flow.pendienteAceptacion) return 2;
  if (flow.finalizado || flow.todasCompletadas) return 3;
  if (flow.aceptado) return 4;
  if (flow.enVerificacion) return 5;
  return 6;
}
