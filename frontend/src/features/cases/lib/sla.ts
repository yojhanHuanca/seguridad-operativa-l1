import {
  RISK_CATEGORY_LABELS,
  RISK_CATEGORY_SHORT_LABELS,
  isRiskLevel,
  riskCategory,
  type RiskCategory,
} from "../domain";

function categoriaDesdeRiesgo(riesgoNombre?: string | null, riesgoCodigo?: string | null): RiskCategory | null {
  if (isRiskLevel(riesgoCodigo)) return riskCategory(riesgoCodigo);

  const normalizado = riesgoNombre?.trim().toLowerCase();
  if (!normalizado) return null;
  if (normalizado.includes("inaceptable")) return "inaceptable";
  if (normalizado.includes("no deseable")) return "no_deseable";
  if (normalizado.includes("con revisión") || normalizado.includes("con revision")) return "aceptable_revision";
  if (normalizado.includes("sin revisión") || normalizado.includes("sin revision")) return "aceptable_sin_revision";
  return null;
}

export function gravedadDerivada(riesgoNombre?: string | null, riesgoCodigo?: string | null): string | null {
  const categoria = categoriaDesdeRiesgo(riesgoNombre, riesgoCodigo);
  return categoria ? RISK_CATEGORY_SHORT_LABELS[categoria] : null;
}

export function criterioAceptabilidad(riesgoNombre?: string | null, riesgoCodigo?: string | null): string | null {
  const categoria = categoriaDesdeRiesgo(riesgoNombre, riesgoCodigo);
  return categoria ? RISK_CATEGORY_LABELS[categoria] : null;
}
