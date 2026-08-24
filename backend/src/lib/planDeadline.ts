export type PlanDeadlineSource = {
  fecha_plan: Date;
  fecha_reprogramada: Date | null;
  actividades_plan?: Array<{ fecha_fin: Date | null }>;
};

/**
 * Fecha limite vigente de un plan.
 *
 * La prorroga aprobada manda sobre todo. Si no existe, el plazo real es la
 * fecha fin mas lejana de sus actividades. `fecha_plan` queda como fallback
 * para planes antiguos/importados que no tengan actividades con fecha fin.
 *
 * Debe coincidir con `planDeadline` de frontend/src/features/plans/lib/planDeadline.ts.
 */
export function planDeadline(plan: PlanDeadlineSource): Date {
  if (plan.fecha_reprogramada) return plan.fecha_reprogramada;

  const activityEnd = (plan.actividades_plan ?? []).reduce<Date | null>((latest, activity) => {
    if (!activity.fecha_fin) return latest;
    if (!latest || activity.fecha_fin.getTime() > latest.getTime()) return activity.fecha_fin;
    return latest;
  }, null);

  return activityEnd ?? plan.fecha_plan;
}

export type PlanEstadoSource = { catalogo_detalle: { nombre: string } };

/** Un plan cerrado, rechazado o finalizado ya no tiene plazo vigente que vencer. */
export function planEstaActivo(plan: PlanEstadoSource): boolean {
  const estado = plan.catalogo_detalle.nombre.toLowerCase();
  return !estado.includes("cerrad") && !estado.includes("rechaz") && !estado.includes("finaliz");
}

/**
 * `fecha_plan`/`fecha_reprogramada`/`fecha_fin` son columnas `@db.Date`: llegan
 * como medianoche UTC exacta y representan un día calendario, sin hora real
 * (mismo criterio que `isDateOnly` de frontend/src/lib/format.ts). Comparar
 * el instante exacto contra "ahora" haría que un plan que vence hoy ya
 * apareciera vencido desde la medianoche, mientras el frontend (que compara
 * por día calendario con `daysUntil`) todavía lo muestra como "vence hoy" —
 * un caso quedaba en la lista de vencidos sin ninguna insignia de vencido.
 * Truncar "ahora" al inicio del día evita ese desacuerdo.
 */
export function planVencido(plan: PlanDeadlineSource & PlanEstadoSource, ahora: Date = new Date()): boolean {
  if (!planEstaActivo(plan)) return false;
  const inicioDeHoy = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate()));
  return planDeadline(plan).getTime() < inicioDeHoy.getTime();
}
