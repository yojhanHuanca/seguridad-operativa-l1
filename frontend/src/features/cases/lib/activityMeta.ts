const META_PREFIX = "__SIGMA_PLAN_ACTIVITY__";
const META_SUFFIX = "__/SIGMA_PLAN_ACTIVITY__";

export interface PlanActivityMeta {
  tipoAccion?: string;
  idArea?: number | null;
  areaNombre?: string;
}

export function encodeActivityDescription(descripcion: string, meta: PlanActivityMeta): string {
  const cleanDescription = descripcion.trim();
  const cleanMeta: PlanActivityMeta = {
    tipoAccion: meta.tipoAccion?.trim() || undefined,
    idArea: meta.idArea ?? null,
    areaNombre: meta.areaNombre?.trim() || undefined,
  };

  return `${META_PREFIX}${JSON.stringify(cleanMeta)}${META_SUFFIX}\n${cleanDescription}`;
}

export function parseActivityDescription(value?: string | null): { descripcion: string; meta: PlanActivityMeta } {
  const raw = value ?? "";
  if (!raw.startsWith(META_PREFIX)) return { descripcion: raw, meta: {} };

  const end = raw.indexOf(META_SUFFIX);
  if (end === -1) return { descripcion: raw, meta: {} };

  const json = raw.slice(META_PREFIX.length, end);
  const descripcion = raw.slice(end + META_SUFFIX.length).replace(/^\s+/, "");

  try {
    return { descripcion, meta: JSON.parse(json) as PlanActivityMeta };
  } catch {
    return { descripcion: raw, meta: {} };
  }
}
