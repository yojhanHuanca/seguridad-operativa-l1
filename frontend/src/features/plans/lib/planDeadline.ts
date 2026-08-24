import { daysUntil } from "@/lib/format";

export interface PlanDeadlineSource {
  fecha_plan: string;
  fecha_reprogramada?: string | null;
  actividades_plan?: Array<{ fecha_fin?: string | null }> | null;
}

export interface PlanEstadoSource {
  catalogo_detalle: { nombre: string };
}

function validTime(value: string | null | undefined): number {
  if (!value) return Number.NEGATIVE_INFINITY;
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : Number.NEGATIVE_INFINITY;
}

/**
 * Fecha limite vigente de un plan.
 *
 * La prorroga aprobada manda sobre todo. Si no existe, el plazo real es la
 * fecha fin mas lejana de sus actividades. `fecha_plan` queda como fallback
 * para planes antiguos/importados que no tengan actividades con fecha fin.
 */
export function planDeadline(plan: PlanDeadlineSource): string {
  if (plan.fecha_reprogramada) return plan.fecha_reprogramada;

  const activityEnd = (plan.actividades_plan ?? [])
    .map((activity) => activity.fecha_fin)
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => validTime(b) - validTime(a))[0];

  return activityEnd ?? plan.fecha_plan;
}

/** Un plan cerrado, rechazado o finalizado ya no tiene plazo vigente que vencer. */
export function isPlanActivo(plan: PlanEstadoSource): boolean {
  const estado = plan.catalogo_detalle.nombre.toLowerCase();
  return !estado.includes("cerrad") && !estado.includes("rechaz") && !estado.includes("finaliz");
}

export function isPlanVencido(plan: PlanDeadlineSource & PlanEstadoSource): boolean {
  return isPlanActivo(plan) && daysUntil(planDeadline(plan)) < 0;
}
