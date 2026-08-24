import prisma from "../../lib/prisma.js";
import { planDeadline } from "../../lib/planDeadline.js";
import type { ChartSlice, IndicadoresResponse } from "./dashboard.types.js";

/**
 * Colores fijos por serie — mismos que `CHART_COLORS` del frontend
 * (`design-system/charts/Charts.tsx`). Se duplican acá porque el backend no
 * conoce el sistema de diseño; si esos colores cambian, hay que actualizar
 * los dos lados.
 */
const COLOR = {
  brand: "#16A34A",
  warning: "#F59E0B",
  info: "#3B82F6",
  critical: "#DC2626",
} as const;

/**
 * Mismo mapeo que `STAGE_BY_ESTADO` + `STAGE_STATUS` de
 * `frontend/src/features/cases/domain.ts` — cuál nombre de
 * "Estado Hallazgo" cuenta como abierto, cerrado o rechazado. Se duplica acá
 * a propósito: es la única forma de agregar en el servidor sin depender del
 * código del frontend, y son solo 11 nombres fijos del catálogo del cliente.
 */
const ESTADO_STATUS: Record<string, "abierto" | "cerrado" | "rechazado"> = {
  "Recepción": "abierto",
  "Evaluación": "abierto",
  "Pendiente de Información": "abierto",
  "Investigación": "abierto",
  "Plan de Acción": "abierto",
  "Ejecución": "abierto",
  "Prórroga Solicitada": "abierto",
  "Verificación": "abierto",
  "Cerrado": "cerrado",
  "Rechazado": "rechazado",
  "En Proceso": "abierto",
};

/** Mismo mapeo que `RISK_CODE_CATEGORY` de `domain.ts` — las 20 celdas de la matriz de riesgo del cliente. */
const RISK_CATEGORY: Record<string, "inaceptable" | "no_deseable" | "aceptable_revision" | "aceptable_sin_revision"> = {
  "1A": "inaceptable", "2A": "inaceptable", "3A": "no_deseable", "4A": "aceptable_revision",
  "1B": "inaceptable", "2B": "inaceptable", "3B": "no_deseable", "4B": "aceptable_sin_revision",
  "1C": "inaceptable", "2C": "no_deseable", "3C": "aceptable_revision", "4C": "aceptable_sin_revision",
  "1D": "no_deseable", "2D": "aceptable_revision", "3D": "aceptable_sin_revision", "4D": "aceptable_sin_revision",
  "1E": "aceptable_sin_revision", "2E": "aceptable_sin_revision", "3E": "aceptable_sin_revision", "4E": "aceptable_sin_revision",
};

const RISK_ORDER = ["inaceptable", "no_deseable", "aceptable_revision", "aceptable_sin_revision"] as const;
const RISK_LABEL: Record<(typeof RISK_ORDER)[number], string> = {
  inaceptable: "Inaceptable",
  no_deseable: "No Deseable",
  aceptable_revision: "Aceptable con revisión",
  aceptable_sin_revision: "Aceptable sin revisión",
};
const RISK_COLOR: Record<(typeof RISK_ORDER)[number], string> = {
  inaceptable: COLOR.critical,
  no_deseable: COLOR.warning,
  aceptable_revision: COLOR.info,
  aceptable_sin_revision: COLOR.brand,
};

/** "cerrado" | "enValidacion" | "enProceso" — mismo criterio que `planBucket()` de `aggregations.ts`. */
function planBucket(estadoPlan: string, estadoCaso: string): "cerrado" | "enValidacion" | "enProceso" {
  const p = estadoPlan.toLowerCase();
  const c = estadoCaso.toLowerCase();
  if (p.includes("rechaz") || p.includes("cerrad") || c.includes("cierre") || c === "cerrado") return "cerrado";
  if (p.includes("finaliz") || c.includes("verificacion") || c === "verificación") return "enValidacion";
  return "enProceso";
}

const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function diasHasta(fecha: Date): number {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const objetivo = new Date(fecha);
  objetivo.setHours(0, 0, 0, 0);
  return Math.round((objetivo.getTime() - hoy.getTime()) / 86_400_000);
}

/**
 * Todas las agregaciones de KPIs + Estadísticas en una sola consulta liviana:
 * solo los campos que se necesitan (sin evidencias, sin línea de tiempo, sin
 * historial de comentarios), calculadas acá en vez de en cada navegador.
 *
 * Es la misma lógica que antes vivía en
 * `frontend/src/features/indicadores/lib/aggregations.ts` sobre el listado
 * completo de casos — se mantiene ese archivo para la tabla de detalle
 * (que sí necesita fila por fila), pero los números y gráficos ya no
 * requieren bajar el histórico completo al navegador.
 */
export class DashboardService {
  static async getIndicadores(): Promise<IndicadoresResponse> {
    const casos = await prisma.casos_sop.findMany({
      select: {
        codigo_sop: true,
        fecha_hallazgo: true,
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true } },
        catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { select: { nombre: true } },
        catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { select: { codigo: true } },
        planes_accion: {
          select: {
            fecha_plan: true,
            fecha_reprogramada: true,
            actividades_plan: { select: { fecha_fin: true } },
            catalogo_detalle: { select: { nombre: true } },
            areas: { select: { nombre_area: true } },
          },
        },
      },
    });

    // ── Reportes por tipo ────────────────────────────────────────────
    const porTipoMap = new Map<string, number>();
    // ── Cerrado vs En Proceso ────────────────────────────────────────
    let cerrado = 0;
    let enProceso = 0;
    // ── Tendencia mensual (últimos 12 meses) ─────────────────────────
    const tendenciaMap = new Map<string, number>();
    // ── Análisis de riesgo (solo casos abiertos) ─────────────────────
    const riesgoCounts: Record<(typeof RISK_ORDER)[number], number> = {
      inaceptable: 0,
      no_deseable: 0,
      aceptable_revision: 0,
      aceptable_sin_revision: 0,
    };
    // ── Planes ────────────────────────────────────────────────────────
    let planCerrado = 0;
    let planEnValidacion = 0;
    let planEnProceso = 0;
    const porAreaMap = new Map<string, number>();
    let vence0_30 = 0;
    let vencido0_30 = 0;
    let vence1_3m = 0;
    let vencido30_90 = 0;
    let vencido90_160 = 0;
    let repro1_3 = 0;
    let repro3_6 = 0;
    let repro6_12 = 0;

    const inicioVentana = new Date();
    inicioVentana.setDate(1);
    inicioVentana.setMonth(inicioVentana.getMonth() - 11);
    inicioVentana.setHours(0, 0, 0, 0);

    for (const caso of casos) {
      const nombreEstado = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
      const estadoStatus = ESTADO_STATUS[nombreEstado] ?? "abierto";

      const tipoNombre = caso.catalogo_detalle_casos_sop_tipoTocatalogo_detalle.nombre;
      porTipoMap.set(tipoNombre, (porTipoMap.get(tipoNombre) ?? 0) + 1);

      if (estadoStatus === "cerrado") cerrado++;
      else if (estadoStatus === "abierto") enProceso++;

      if (caso.fecha_hallazgo >= inicioVentana) {
        const d = new Date(caso.fecha_hallazgo);
        const clave = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
        tendenciaMap.set(clave, (tendenciaMap.get(clave) ?? 0) + 1);
      }

      if (estadoStatus === "abierto") {
        const codigo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?.codigo;
        const categoria = codigo ? RISK_CATEGORY[codigo] : undefined;
        if (categoria) riesgoCounts[categoria]++;
      }

      for (const plan of caso.planes_accion) {
        const bucket = planBucket(plan.catalogo_detalle.nombre, nombreEstado);
        if (bucket === "cerrado") {
          planCerrado++;
          continue;
        }
        if (bucket === "enValidacion") planEnValidacion++;
        else planEnProceso++;

        porAreaMap.set(plan.areas.nombre_area, (porAreaMap.get(plan.areas.nombre_area) ?? 0) + 1);

        const dias = diasHasta(planDeadline(plan));
        if (dias >= 0 && dias <= 30) vence0_30++;
        else if (dias > 30 && dias <= 90) vence1_3m++;
        else if (dias < 0 && dias >= -30) vencido0_30++;
        else if (dias < -30 && dias >= -90) vencido30_90++;
        else if (dias < -90) vencido90_160++;

        if (plan.fecha_reprogramada) {
          const meses = (plan.fecha_reprogramada.getTime() - plan.fecha_plan.getTime()) / (30 * 86_400_000);
          if (meses >= 1 && meses < 3) repro1_3++;
          else if (meses >= 3 && meses < 6) repro3_6++;
          else if (meses >= 6 && meses <= 12) repro6_12++;
        }
      }
    }

    const tendenciaMensual: { label: string; value: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(inicioVentana);
      d.setMonth(d.getMonth() + (11 - i));
      const clave = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
      tendenciaMensual.push({
        label: `${MONTH_NAMES[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(2)}`,
        value: tendenciaMap.get(clave) ?? 0,
      });
    }

    const ordenarDescendente = (mapa: Map<string, number>, color?: string): ChartSlice[] =>
      Array.from(mapa.entries())
        .map(([name, value]) => ({ name, value, color: color ?? COLOR.brand }))
        .sort((a, b) => b.value - a.value);

    return {
      totalReportes: casos.length,
      reportesPorTipo: Array.from(porTipoMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value),
      reportesCerradoVsProceso: [
        { name: "Cerrado", value: cerrado, color: COLOR.brand },
        { name: "En Proceso", value: enProceso, color: COLOR.warning },
      ],
      planes: {
        total: planCerrado + planEnValidacion + planEnProceso,
        abiertos: planEnValidacion + planEnProceso,
        donut: [
          { name: "Cerrado", value: planCerrado, color: COLOR.brand },
          { name: "En Proceso", value: planEnProceso, color: COLOR.warning },
          { name: "En Validación", value: planEnValidacion, color: COLOR.info },
        ],
      },
      tendenciaMensual,
      analisisRiesgo: RISK_ORDER.map((key) => ({
        name: RISK_LABEL[key],
        value: riesgoCounts[key],
        color: RISK_COLOR[key],
      })),
      planesAbiertosPorArea: ordenarDescendente(porAreaMap),
      vencimientoPlanesAbiertos: [
        { name: "Vence 0-30 días", value: vence0_30, color: COLOR.brand },
        { name: "Vencido 0-30 días", value: vencido0_30, color: COLOR.warning },
        { name: "Vence 1-3 meses", value: vence1_3m, color: COLOR.info },
        { name: "Vencido 30-90 días", value: vencido30_90, color: COLOR.critical },
        { name: "Vencido 90-160 días", value: vencido90_160, color: COLOR.critical },
      ],
      reprogramacionPlanesAbiertos: [
        { name: "1 hasta 3 meses", value: repro1_3, color: COLOR.info },
        { name: "3 hasta 6 meses", value: repro3_6, color: COLOR.info },
        { name: "6 hasta 12 meses", value: repro6_12, color: COLOR.info },
      ],
    };
  }
}
