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

// Antes había un campo separado (`tipo_sop`) que se fijaba en "Hallazgo" al
// crear el caso y nunca se volvía a actualizar — todo el sistema terminaba
// mostrando el mismo tipo sin importar el real. Ahora el tipo de evento sale
// directo del catálogo "Tipo de Reporte" que elige el reportante (o corrige
// SO), la misma fuente que ya usa la tarjeta "Evento Operativo".
export type TipoSOP = "accidente" | "incidente" | "condicion_insegura" | "hallazgo" | "acto_inseguro" | "otro";

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
  accidente: "Accidente",
  incidente: "Incidente",
  condicion_insegura: "Condición Insegura",
  hallazgo: "Hallazgo",
  acto_inseguro: "Acto Inseguro",
  otro: "Otro",
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

// Nombre corto de cada categoría — los 4 únicos niveles que reconoce el
// cliente ("Leyenda de Criterios de Aceptabilidad" de su documento de
// gestión): Alto, Grave, Medio, Bajo. No hay un quinto nivel intermedio; antes
// el código separaba "muy alto"/"alto" y "bajo"/"muy bajo" como si fueran 5,
// lo que no existe en la matriz real del cliente.
export const RISK_CATEGORY_SHORT_LABELS: Record<RiskCategory, string> = {
  inaceptable: "Alto",
  no_deseable: "Grave",
  aceptable_revision: "Medio",
  aceptable_sin_revision: "Bajo",
};

export const RISK_CATEGORY_STYLES: Record<RiskCategory, string> = {
  inaceptable: "bg-red-600 text-white border-red-700",
  no_deseable: "bg-yellow-500 text-white border-yellow-600",
  aceptable_revision: "bg-white text-gray-800 border-gray-300",
  aceptable_sin_revision: "bg-green-200 text-green-900 border-green-300",
};

export const RISK_CATEGORY_DOT_STYLES: Record<RiskCategory, string> = {
  inaceptable: "bg-red-800",
  no_deseable: "bg-yellow-700",
  aceptable_revision: "bg-gray-400",
  aceptable_sin_revision: "bg-green-600",
};

// Las 20 celdas de la matriz (severidad 1-4 × probabilidad A-E), mapeadas
// directo a una de las 4 categorías reales — mismos valores, celda por
// celda, que el catálogo "Análisis de riesgo" sembrado en el backend desde
// la matriz del cliente (ver backend/prisma/seed/catalogos-data.ts).
const RISK_CODE_CATEGORY: Record<RiskLevel, RiskCategory> = {
  "1A": "inaceptable",
  "2A": "inaceptable",
  "3A": "no_deseable",
  "4A": "aceptable_revision",
  "1B": "inaceptable",
  "2B": "inaceptable",
  "3B": "no_deseable",
  "4B": "aceptable_sin_revision",
  "1C": "inaceptable",
  "2C": "no_deseable",
  "3C": "aceptable_revision",
  "4C": "aceptable_sin_revision",
  "1D": "no_deseable",
  "2D": "aceptable_revision",
  "3D": "aceptable_sin_revision",
  "4D": "aceptable_sin_revision",
  "1E": "aceptable_sin_revision",
  "2E": "aceptable_sin_revision",
  "3E": "aceptable_sin_revision",
  "4E": "aceptable_sin_revision",
};

export function isRiskLevel(r?: string | null): r is RiskLevel {
  return !!r && r in RISK_CODE_CATEGORY;
}

export function riskCategory(r: RiskLevel): RiskCategory {
  return RISK_CODE_CATEGORY[r];
}

// Tono de fondo por tipo de evento, tal como lo define CaseList del prototipo.
export const TYPE_TONE: Record<TipoSOP, string> = {
  accidente: "bg-critical-soft text-critical-ink",
  incidente: "bg-warning-soft text-warning-ink",
  condicion_insegura: "bg-warning-soft text-warning-ink",
  hallazgo: "bg-info-soft text-info-ink",
  acto_inseguro: "bg-warning-soft text-warning-ink",
  otro: "bg-surface-2 text-ink-soft",
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

// Mismos nombres que el catálogo "Tipo de Reporte" (el que elige el
// reportante, o corrige SO desde Recepción).
const TIPO_BY_NOMBRE: Record<string, TipoSOP> = {
  Accidente: "accidente",
  Incidente: "incidente",
  "Condición Insegura": "condicion_insegura",
  Hallazgo: "hallazgo",
  "Acto Inseguro": "acto_inseguro",
  Otro: "otro",
};

export function tipoEventoFromNombre(nombre?: string | null): TipoSOP {
  return (nombre && TIPO_BY_NOMBRE[nombre]) || "otro";
}
