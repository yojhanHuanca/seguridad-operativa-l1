import { CHART_COLORS } from "@/design-system/charts/Charts";
import { STAGE_STATUS, isRiskLevel, riskCategory, stageFromEstado, RISK_CATEGORY_LABELS, type RiskCategory } from "@/features/cases/domain";
import { daysUntil } from "@/lib/format";
import type { CaseListItem, PlanAccion } from "@/features/cases/types";

/**
 * Agregaciones para el dashboard de Indicadores (KPIs + Estadísticas) del
 * panel de Seguridad Operativa. Todo se calcula en el cliente sobre
 * `useCases()` — igual que ya hace `DashboardPage.tsx` — porque la lista de
 * casos ya trae `planes_accion` anidado con todo lo necesario (área, estado,
 * fechas, riesgo); no hace falta un endpoint de agregación en el backend.
 */

function normalize(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export interface CountItem {
  name: string;
  value: number;
  color?: string;
}

/** Como `CountItem`, pero con color obligatorio — para series de dona/barras que siempre lo definen. */
export interface ChartSlice {
  name: string;
  value: number;
  color: string;
}

// ── KPIs ─────────────────────────────────────────────────────────────────

export function reportesPorTipo(cases: CaseListItem[]): CountItem[] {
  const map = new Map<string, number>();
  cases.forEach((c) => {
    const nombre = c.catalogo_detalle_casos_sop_tipoTocatalogo_detalle.nombre;
    map.set(nombre, (map.get(nombre) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Cerrado vs En Proceso a nivel de reporte SOP. Los casos rechazados quedan
 * fuera de las dos barras: ya son un estado terminal, no "en proceso", pero
 * tampoco el "Cerrado" que se está midiendo acá (caso resuelto).
 */
export function reportesCerradoVsProceso(cases: CaseListItem[]): ChartSlice[] {
  let cerrado = 0;
  let enProceso = 0;
  cases.forEach((c) => {
    const stage = stageFromEstado(c.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre);
    const status = STAGE_STATUS[stage];
    if (status === "cerrado") cerrado++;
    else if (status === "abierto") enProceso++;
  });
  return [
    { name: "Cerrado", value: cerrado, color: CHART_COLORS.brand },
    { name: "En Proceso", value: enProceso, color: CHART_COLORS.warning },
  ];
}

type PlanBucket = "cerrado" | "enValidacion" | "enProceso";

/**
 * Mismo criterio que `planFlow` de `pages/jefe/plan-detail` (finalizado =
 * pendiente de revisión SO, en verificación = etapa del caso), reimplementado
 * acá porque ese vive sobre `PlanItem` (tipo del panel Jefe) y acá se trabaja
 * sobre `PlanAccion` anidado en `CaseListItem` (tipo del panel SO).
 */
function planBucket(plan: PlanAccion, caso: CaseListItem): PlanBucket {
  const estadoPlan = normalize(plan.catalogo_detalle.nombre);
  const etapaCaso = normalize(caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre);
  if (estadoPlan.includes("rechaz") || estadoPlan.includes("cerrad") || etapaCaso.includes("cierre")) return "cerrado";
  if (estadoPlan.includes("finaliz") || etapaCaso.includes("verificacion")) return "enValidacion";
  return "enProceso";
}

export function totalPlanes(cases: CaseListItem[]): { total: number; abiertos: number; donut: ChartSlice[] } {
  let cerrado = 0;
  let enValidacion = 0;
  let enProceso = 0;
  cases.forEach((caso) =>
    caso.planes_accion.forEach((plan) => {
      const bucket = planBucket(plan, caso);
      if (bucket === "cerrado") cerrado++;
      else if (bucket === "enValidacion") enValidacion++;
      else enProceso++;
    })
  );
  return {
    total: cerrado + enValidacion + enProceso,
    abiertos: enValidacion + enProceso,
    donut: [
      { name: "Cerrado", value: cerrado, color: CHART_COLORS.brand },
      { name: "En Proceso", value: enProceso, color: CHART_COLORS.warning },
      { name: "En Validación", value: enValidacion, color: CHART_COLORS.info },
    ],
  };
}

const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export function tendenciaMensual(cases: CaseListItem[], months = 12): { label: string; value: number }[] {
  const out: { label: string; value: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const year = d.getFullYear();
    const month = d.getMonth();
    const count = cases.filter((c) => {
      const fecha = new Date(c.fecha_hallazgo);
      return fecha.getFullYear() === year && fecha.getMonth() === month;
    }).length;
    out.push({ label: `${MONTH_NAMES[month]} ${year.toString().slice(2)}`, value: count });
  }
  return out;
}

// ── Estadísticas ─────────────────────────────────────────────────────────

const RISK_CATEGORY_ORDER: RiskCategory[] = ["inaceptable", "no_deseable", "aceptable_revision", "aceptable_sin_revision"];
const RISK_CATEGORY_CHART_COLOR: Record<RiskCategory, string> = {
  inaceptable: CHART_COLORS.critical,
  no_deseable: CHART_COLORS.warning,
  aceptable_revision: CHART_COLORS.info,
  aceptable_sin_revision: CHART_COLORS.brand,
};

/** Matriz de riesgo de los SOP abiertos (cerrados no cuentan: ya no hay riesgo activo que gestionar). */
export function analisisRiesgo(cases: CaseListItem[]): ChartSlice[] {
  const counts: Record<RiskCategory, number> = {
    inaceptable: 0,
    no_deseable: 0,
    aceptable_revision: 0,
    aceptable_sin_revision: 0,
  };
  cases.forEach((c) => {
    const stage = stageFromEstado(c.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre);
    if (STAGE_STATUS[stage] !== "abierto") return;
    const codigo = c.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?.codigo;
    if (!isRiskLevel(codigo)) return;
    counts[riskCategory(codigo)]++;
  });
  return RISK_CATEGORY_ORDER.map((key) => ({
    name: RISK_CATEGORY_LABELS[key],
    value: counts[key],
    color: RISK_CATEGORY_CHART_COLOR[key],
  }));
}

export function planesAbiertosPorArea(cases: CaseListItem[]): ChartSlice[] {
  const map = new Map<string, number>();
  cases.forEach((caso) =>
    caso.planes_accion.forEach((plan) => {
      if (planBucket(plan, caso) === "cerrado") return;
      const nombre = plan.areas.nombre_area;
      map.set(nombre, (map.get(nombre) ?? 0) + 1);
    })
  );
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value, color: CHART_COLORS.brand }))
    .sort((a, b) => b.value - a.value);
}

/** Buckets según los días que faltan (o pasaron) hasta la fecha límite vigente del plan. */
export function vencimientoPlanesAbiertos(cases: CaseListItem[]): ChartSlice[] {
  let vence0_30 = 0;
  let vencido0_30 = 0;
  let vence1_3m = 0;
  let vencido30_90 = 0;
  let vencido90_160 = 0;

  cases.forEach((caso) =>
    caso.planes_accion.forEach((plan) => {
      if (planBucket(plan, caso) === "cerrado") return;
      const dias = daysUntil(plan.fecha_reprogramada ?? plan.fecha_plan);
      if (dias >= 0 && dias <= 30) vence0_30++;
      else if (dias > 30 && dias <= 90) vence1_3m++;
      else if (dias < 0 && dias >= -30) vencido0_30++;
      else if (dias < -30 && dias >= -90) vencido30_90++;
      else if (dias < -90) vencido90_160++;
    })
  );

  return [
    { name: "Vence 0-30 días", value: vence0_30, color: CHART_COLORS.brand },
    { name: "Vencido 0-30 días", value: vencido0_30, color: CHART_COLORS.warning },
    { name: "Vence 1-3 meses", value: vence1_3m, color: CHART_COLORS.info },
    { name: "Vencido 30-90 días", value: vencido30_90, color: CHART_COLORS.critical },
    { name: "Vencido 90-160 días", value: vencido90_160, color: CHART_COLORS.critical },
  ];
}

/** Buckets de cuánto se extendió la fecha límite original de planes que sí fueron reprogramados. */
export function reprogramacionPlanesAbiertos(cases: CaseListItem[]): ChartSlice[] {
  let m1_3 = 0;
  let m3_6 = 0;
  let m6_12 = 0;

  cases.forEach((caso) =>
    caso.planes_accion.forEach((plan) => {
      if (planBucket(plan, caso) === "cerrado") return;
      if (!plan.fecha_reprogramada) return;
      const meses = (new Date(plan.fecha_reprogramada).getTime() - new Date(plan.fecha_plan).getTime()) / (30 * 86400000);
      if (meses >= 1 && meses < 3) m1_3++;
      else if (meses >= 3 && meses < 6) m3_6++;
      else if (meses >= 6 && meses <= 12) m6_12++;
    })
  );

  return [
    { name: "1 hasta 3 meses", value: m1_3, color: CHART_COLORS.info },
    { name: "3 hasta 6 meses", value: m3_6, color: CHART_COLORS.info },
    { name: "6 hasta 12 meses", value: m6_12, color: CHART_COLORS.info },
  ];
}

export interface DetalleRow {
  id: string;
  codigo: string;
  fechaEvento: string;
  descripcion: string;
  planCodigo: string | null;
  responsable: string | null;
  estadoPlan: string | null;
  descripcionPlan: string | null;
}

/** Una fila por (caso, plan); los casos sin plan todavía aparecen con las columnas de plan vacías. */
export function tablaDetalle(cases: CaseListItem[]): DetalleRow[] {
  const rows: DetalleRow[] = [];
  cases.forEach((caso) => {
    if (caso.planes_accion.length === 0) {
      rows.push({
        id: caso.codigo_sop,
        codigo: caso.codigo_sop,
        fechaEvento: caso.fecha_hallazgo,
        descripcion: caso.descripcion,
        planCodigo: null,
        responsable: null,
        estadoPlan: null,
        descripcionPlan: null,
      });
      return;
    }
    caso.planes_accion.forEach((plan) => {
      rows.push({
        id: `${caso.codigo_sop}-${plan.id_plan}`,
        codigo: caso.codigo_sop,
        fechaEvento: caso.fecha_hallazgo,
        descripcion: caso.descripcion,
        planCodigo: plan.codigo_plan,
        responsable: plan.usuarios.nombre,
        estadoPlan: plan.catalogo_detalle.nombre,
        descripcionPlan: plan.descripcion,
      });
    });
  });
  return rows.sort((a, b) => +new Date(b.fechaEvento) - +new Date(a.fechaEvento));
}
