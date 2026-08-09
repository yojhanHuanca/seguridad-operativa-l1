// Vocabulario de dominio del prototipo SIGMA L1 (etapas del workflow, tipo SOP,
// matriz de riesgo). Los valores son idénticos a los del prototipo — cambia solo
// la organización: aquí viven agrupados y tipados, en vez de dispersos en un
// types.ts de 28 KB mezclado con el store de localStorage.

export type Stage =
  | "recepcion"
  | "evaluacion"
  | "investigacion"
  | "plan_accion"
  | "ejecucion"
  | "verificacion"
  | "cierre"
  | "rechazado"
  | "pendiente_info";

export type TipoSOP = "hallazgo" | "incidente" | "reporte_voluntario" | "accidente";

export type RiskLevel =
  | "1A" | "1B" | "1C" | "1D" | "1E"
  | "2A" | "2B" | "2C" | "2D" | "2E"
  | "3A" | "3B" | "3C" | "3D" | "3E"
  | "4A" | "4B" | "4C" | "4D" | "4E";

export type RiskBand = "muy_alto" | "alto" | "medio" | "bajo" | "muy_bajo";
export type RiskCategory = "inaceptable" | "no_deseable" | "aceptable_revision" | "aceptable_sin_revision";

export const STAGE_LABELS: Record<Stage, string> = {
  recepcion: "Recepción",
  evaluacion: "Evaluación",
  investigacion: "Investigación",
  plan_accion: "Plan de Acción",
  ejecucion: "Ejecución",
  verificacion: "Verificación",
  cierre: "Cierre",
  rechazado: "Rechazado",
  pendiente_info: "Pendiente de Información",
};

export const STAGE_STATUS: Record<Stage, "abierto" | "cerrado" | "rechazado"> = {
  recepcion: "abierto",
  evaluacion: "abierto",
  investigacion: "abierto",
  plan_accion: "abierto",
  ejecucion: "abierto",
  verificacion: "abierto",
  cierre: "cerrado",
  rechazado: "rechazado",
  pendiente_info: "abierto",
};

export const STAGE_ORDER: Stage[] = [
  "recepcion",
  "evaluacion",
  "investigacion",
  "plan_accion",
  "ejecucion",
  "verificacion",
  "cierre",
];

export const EVENT_LABELS: Record<TipoSOP, string> = {
  hallazgo: "Hallazgo",
  incidente: "Incidente",
  reporte_voluntario: "Reporte Voluntario",
  accidente: "Accidente",
};

export const RISK_CATEGORY_LABELS: Record<RiskCategory, string> = {
  inaceptable: "Inaceptable",
  no_deseable: "No Deseable",
  aceptable_revision: "Aceptable con revisión",
  aceptable_sin_revision: "Aceptable sin revisión",
};

export const RISK_CATEGORY_TONE: Record<RiskCategory, "critical" | "warning" | "info" | "brand" | "success"> = {
  inaceptable: "critical",
  no_deseable: "warning",
  aceptable_revision: "info",
  aceptable_sin_revision: "success",
};

export const RISK_BAND_LABELS: Record<RiskBand, string> = {
  muy_alto: "Riesgo Muy Alto",
  alto: "Riesgo Alto",
  medio: "Riesgo Medio",
  bajo: "Riesgo Bajo",
  muy_bajo: "Riesgo Muy Bajo",
};

export const RISK_BAND_STYLES: Record<RiskBand, string> = {
  muy_alto: "bg-red-600 text-white border-red-700",
  alto: "bg-yellow-400 text-yellow-950 border-yellow-500",
  medio: "bg-white text-gray-900 border-gray-300",
  bajo: "bg-sky-100 text-sky-900 border-sky-300",
  muy_bajo: "bg-green-200 text-green-950 border-green-300",
};

export const RISK_BAND_DOT_STYLES: Record<RiskBand, string> = {
  muy_alto: "bg-red-900",
  alto: "bg-yellow-700",
  medio: "bg-gray-400",
  bajo: "bg-sky-500",
  muy_bajo: "bg-green-700",
};

const RISK_CODE_BAND: Record<RiskLevel, RiskBand> = {
  "1A": "muy_alto",
  "1B": "muy_alto",
  "1C": "muy_alto",
  "2A": "muy_alto",
  "2B": "muy_alto",
  "1D": "alto",
  "2C": "alto",
  "3A": "alto",
  "3B": "alto",
  "2D": "medio",
  "3C": "medio",
  "4A": "medio",
  "4B": "bajo",
  "4C": "bajo",
  "4D": "bajo",
  "4E": "bajo",
  "1E": "muy_bajo",
  "2E": "muy_bajo",
  "3D": "muy_bajo",
  "3E": "muy_bajo",
};

export function isRiskLevel(r?: string | null): r is RiskLevel {
  return !!r && r in RISK_CODE_BAND;
}

export function riskBand(r: RiskLevel): RiskBand {
  return RISK_CODE_BAND[r];
}

export function riskCategory(r: RiskLevel): RiskCategory {
  const band = riskBand(r);
  if (band === "muy_alto") return "inaceptable";
  if (band === "alto") return "no_deseable";
  if (band === "medio") return "aceptable_revision";
  return "aceptable_sin_revision";
}

// Tono de fondo por tipo de evento, tal como lo define CaseList del prototipo.
export const TYPE_TONE: Record<TipoSOP, string> = {
  accidente: "bg-critical-soft text-critical-ink",
  incidente: "bg-warning-soft text-warning-ink",
  hallazgo: "bg-info-soft text-info-ink",
  reporte_voluntario: "bg-brand-50 text-brand-800",
};

// ── Puentes con los catálogos reales de Postgres ────────────────────────
// El backend guarda estos mismos conceptos como texto en `catalogo_detalle`.
// Estos mapas traducen ese texto al vocabulario del prototipo.

const STAGE_BY_ESTADO: Record<string, Stage> = {
  "Recepción": "recepcion",
  "Evaluación": "evaluacion",
  "Pendiente de Información": "pendiente_info",
  "Investigación": "investigacion",
  "Plan de Acción": "plan_accion",
  "Ejecución": "ejecucion",
  "Prórroga Solicitada": "ejecucion",
  "Verificación": "verificacion",
  "Cerrado": "cierre",
  "Rechazado": "rechazado",
  // Estado heredado de los casos sembrados antes del módulo de gestión.
  "En Proceso": "evaluacion",
};

export function stageFromEstado(estado: string): Stage {
  return STAGE_BY_ESTADO[estado] ?? "recepcion";
}

export function estadoFromStage(stage: Stage): string {
  return STAGE_LABELS[stage];
}

const TIPO_BY_NOMBRE: Record<string, TipoSOP> = {
  Hallazgo: "hallazgo",
  Incidente: "incidente",
  "Reporte Voluntario": "reporte_voluntario",
  Accidente: "accidente",
};

export function tipoSopFromNombre(nombre?: string | null): TipoSOP {
  return (nombre && TIPO_BY_NOMBRE[nombre]) || "hallazgo";
}
