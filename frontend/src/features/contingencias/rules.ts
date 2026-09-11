import type { ContingenciaFormValues } from "./fields";

export const MENSAJE_TRANSEUNTE = "Para un transeúnte, el lugar exacto del evento debe ser Explanada, Exteriores o NA.";
const normalize = (value: string) => value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

interface DependentRule {
  code: string;
  source: keyof ContingenciaFormValues;
  target: keyof ContingenciaFormValues;
  applies: (values: ContingenciaFormValues) => boolean;
  allows: (value: string) => boolean;
  message: string;
}

export const CONTINGENCIA_RULES: DependentRule[] = [{
  code: "categoria-transeunte-lugar-exacto",
  source: "categoria_paciente",
  target: "lugar_exacto_evento",
  applies: (values) => normalize(values.categoria_paciente) === "transeunte",
  allows: (value) => ["exteriores", "explanada", "na"].includes(normalize(value)),
  message: MENSAJE_TRANSEUNTE,
}];

export function allowedOption(field: keyof ContingenciaFormValues, value: string, values: ContingenciaFormValues) {
  return CONTINGENCIA_RULES.every((rule) => rule.target !== field || !rule.applies(values) || rule.allows(value));
}
