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

export function riskCategory(r: RiskLevel): RiskCategory {
  // Rojo (Riesgo Muy Alto): 1A, 1B, 1C, 2A, 2B → Inaceptable
  if (["1A", "1B", "1C", "2A", "2B"].includes(r)) return "inaceptable";
  // Amarillo (Riesgo Alto): 1D, 2C, 3A, 3B → No Deseable
  if (["1D", "2C", "3A", "3B"].includes(r)) return "no_deseable";
  // Blanco (Riesgo Medio): 2D, 3C, 4A → Aceptable con revisión
  if (["2D", "3C", "4A"].includes(r)) return "aceptable_revision";
  // Celeste / Verde (Riesgo Bajo y Muy Bajo) → Aceptable sin revisión
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
