import type { PlanItem } from "../types";

/**
 * Clasificación de estado de un plan para el panel de Jefe de Área: filtros
 * del sidebar, pestañas de "Mis Planes de Acción" y contadores.
 *
 * Antes esta misma lógica vivía copiada en JefeShell.tsx y JefeHome.tsx: al
 * tocar una había que acordarse de tocar la otra, y ya habían empezado a
 * divergir. Vive acá para que ambos (y cualquier pantalla nueva) usen la
 * misma definición de "qué es un plan pendiente/en ejecución/etc.".
 *
 * `PlanDetail.tsx` tiene su propio `planFlow`, más granular (agrega
 * `pendienteAceptacion`, `puedeTrabajar`, `todasCompletadas` para habilitar
 * botones) y con matices propios de esa pantalla — no se tocó al armar este
 * módulo para no arriesgar ese comportamiento ya afinado.
 */

export function normalize(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function planState(p: PlanItem): string {
  return p.catalogo_detalle?.nombre ?? "";
}

function caseStage(p: PlanItem): string {
  return p.casos_sop.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
}

export function isFinalized(p: PlanItem): boolean {
  return normalize(planState(p)).includes("finaliz");
}

export function isClosed(p: PlanItem): boolean {
  return (
    normalize(caseStage(p)).includes("cierre") ||
    normalize(caseStage(p)).includes("cerrado") ||
    normalize(planState(p)).includes("cerrado")
  );
}

export function isRejected(p: PlanItem): boolean {
  return normalize(caseStage(p)).includes("rechaz") || normalize(planState(p)).includes("rechaz");
}

export function hasPendingExtension(p: PlanItem): boolean {
  return p.prorroga_estado === "pendiente";
}

export function isInVerification(p: PlanItem): boolean {
  const estado = normalize(planState(p));
  return isFinalized(p) || (!estado.includes("cerrad") && normalize(caseStage(p)).includes("verificacion"));
}

export function isAccepted(p: PlanItem): boolean {
  const estado = normalize(planState(p));
  return estado.includes("aceptad") || estado.includes("ejecucion");
}

export function isPendingAcceptance(p: PlanItem): boolean {
  const estado = normalize(planState(p));
  return (
    !isClosed(p) &&
    !isRejected(p) &&
    !isInVerification(p) &&
    !hasPendingExtension(p) &&
    !isAccepted(p) &&
    (estado.includes("enviado") || estado.includes("pendiente") || !estado)
  );
}

export function isExecuting(p: PlanItem): boolean {
  return isAccepted(p) && !isClosed(p) && !isRejected(p) && !isInVerification(p) && !hasPendingExtension(p);
}

export type StatusFilter = "todos" | "pendientes" | "ejecucion" | "verificacion" | "cerrados";

export function matchesStatus(p: PlanItem, filter: StatusFilter): boolean {
  if (filter === "todos") return true;
  if (filter === "pendientes") return isPendingAcceptance(p);
  if (filter === "ejecucion") return isExecuting(p) || hasPendingExtension(p);
  if (filter === "verificacion") return isInVerification(p);
  return isClosed(p);
}

export function planStatusCounts(plans: PlanItem[]) {
  return {
    todos: plans.length,
    pendientes: plans.filter(isPendingAcceptance).length,
    ejecucion: plans.filter(isExecuting).length,
    verificacion: plans.filter(isInVerification).length,
    cerrados: plans.filter(isClosed).length,
  };
}
