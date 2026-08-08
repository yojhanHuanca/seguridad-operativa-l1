// Matriz de riesgo → días de SLA, tal como la propone el informe técnico de
// Gestión de Casos (mapea 1:1 sobre las 4 categorías ya sembradas en el
// catálogo "Análisis de riesgo").
//
// Fuente única: antes esta tabla estaba duplicada en tres archivos (adapter.ts,
// CaseDetailPage.tsx y este módulo, que no se usaba), con riesgo de que se
// desincronizaran.
import type { Stage } from "../domain";
import { STAGE_STATUS } from "../domain";

const RISK_SLA_DAYS: Record<string, number> = {
  Inaceptable: 3,
  "No deseable": 7,
  "No Deseable": 7,
  "Aceptable con revisión por la gerencia": 14,
  "Aceptable sin revisión por la gerencia": 21,
};

const RISK_GRAVEDAD: Record<string, string> = {
  Inaceptable: "Crítica",
  "No deseable": "Alta",
  "No Deseable": "Alta",
  "Aceptable con revisión por la gerencia": "Media",
  "Aceptable sin revisión por la gerencia": "Baja",
};

export function gravedadDerivada(riesgoNombre?: string | null): string | null {
  return riesgoNombre ? (RISK_GRAVEDAD[riesgoNombre] ?? null) : null;
}

export function diasSlaPorRiesgo(riesgoNombre?: string | null): number | null {
  return riesgoNombre ? (RISK_SLA_DAYS[riesgoNombre] ?? null) : null;
}

/**
 * Momento en que el caso fue evaluado, leído de la bitácora.
 *
 * El plazo de atención corre desde la evaluación, no desde el hallazgo: antes
 * de evaluar todavía no hay riesgo asignado y por lo tanto no hay SLA que medir.
 *
 * `derivado` lo emite únicamente la evaluación. `investigacion` lo emiten tanto
 * la evaluación (cuando deriva a Investigación) como el guardado de la
 * investigación, así que se toma el más antiguo de los dos tipos.
 */
export function fechaEvaluacion(timeline: { kind: string; fecha: string | null }[]): string | null {
  const fechas = timeline
    .filter((t) => t.kind === "derivado" || t.kind === "investigacion")
    .map((t) => t.fecha)
    .filter((f): f is string => !!f)
    .sort();
  return fechas[0] ?? null;
}

/**
 * Fecha límite de atención. Devuelve null mientras no haya riesgo evaluado,
 * que es justamente la señal de que el SLA todavía no arrancó.
 */
export function slaDueDate(desdeISO: string | null, riesgoNombre?: string | null): string | null {
  const dias = diasSlaPorRiesgo(riesgoNombre);
  if (!dias || !desdeISO) return null;
  const limite = new Date(desdeISO);
  if (isNaN(limite.getTime())) return null;
  limite.setDate(limite.getDate() + dias);
  return limite.toISOString();
}

export function diasRestantes(dueISO: string): number {
  return Math.ceil((new Date(dueISO).getTime() - Date.now()) / 86400000);
}

export type SlaEstado = "ok" | "soon" | "overdue" | "done" | "sin_sla";

/**
 * Estado del SLA para pintar el indicador. `sin_sla` es el caso normal de un
 * expediente que todavía no pasó por Evaluación.
 */
export function slaEstado(dueISO: string | null, stage: Stage): SlaEstado {
  if (STAGE_STATUS[stage] !== "abierto") return "done";
  if (!dueISO) return "sin_sla";
  const dias = diasRestantes(dueISO);
  if (dias < 0) return "overdue";
  if (dias <= 2) return "soon";
  return "ok";
}
