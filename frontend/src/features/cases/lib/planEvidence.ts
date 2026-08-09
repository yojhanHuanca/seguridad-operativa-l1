const PLAN_EVIDENCE_MARKER = "__PLAN_EVIDENCE__:";

export interface PlanEvidenceAnexo {
  id_anexo: number;
  nombre_archivo: string | null;
  ruta_archivo: string | null;
  tipo_archivo: string | null;
  peso: string | null;
  fecha_subida: string | null;
}

export interface PlanEvidenceTimeline {
  titulo: string;
  detalle: string | null;
  fecha: string | null;
}

export interface PlanEvidencePlan {
  id_plan: number;
  codigo_plan: string;
}

interface EvidencePayloadFile {
  id_anexo?: number;
  nombre_archivo?: string | null;
  ruta_archivo?: string | null;
}

interface EvidencePayload {
  planId?: number;
  planCode?: string;
  anexos?: EvidencePayloadFile[];
}

export function humanEvidenceDetail(detalle: string | null | undefined): string {
  return (detalle ?? "").split(PLAN_EVIDENCE_MARKER)[0].trim();
}

function parseEvidencePayload(detalle: string | null | undefined): EvidencePayload | null {
  const raw = detalle ?? "";
  const markerIndex = raw.indexOf(PLAN_EVIDENCE_MARKER);
  if (markerIndex < 0) return null;

  try {
    const parsed = JSON.parse(raw.slice(markerIndex + PLAN_EVIDENCE_MARKER.length).trim());
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export function timelineBelongsToPlan(evento: PlanEvidenceTimeline, plan: PlanEvidencePlan): boolean {
  const payload = parseEvidencePayload(evento.detalle);
  if (payload) {
    return payload.planId === plan.id_plan || payload.planCode === plan.codigo_plan;
  }

  return `${evento.titulo} ${humanEvidenceDetail(evento.detalle)}`.includes(plan.codigo_plan);
}

export function planEvidenceFiles<T extends PlanEvidenceAnexo>(
  plan: PlanEvidencePlan,
  timeline: PlanEvidenceTimeline[],
  anexos: T[]
): T[] {
  const byId = new Map(anexos.map((anexo) => [anexo.id_anexo, anexo]));
  const byPath = new Map(anexos.map((anexo) => [anexo.ruta_archivo ?? "", anexo]));
  const usedIds = new Set<number>();
  const out: T[] = [];

  const add = (anexo: T | null | undefined) => {
    if (!anexo || usedIds.has(anexo.id_anexo)) return;
    usedIds.add(anexo.id_anexo);
    out.push(anexo);
  };

  for (const evento of timeline.filter((item) => timelineBelongsToPlan(item, plan))) {
    if (!humanEvidenceDetail(evento.detalle) || !evento.titulo.toLowerCase().includes("evidencia")) continue;
    const payload = parseEvidencePayload(evento.detalle);

    if (payload?.anexos?.length) {
      for (const ref of payload.anexos) {
        add((ref.id_anexo ? byId.get(ref.id_anexo) : null) ?? byPath.get(ref.ruta_archivo ?? ""));
      }
      continue;
    }

    for (const name of humanEvidenceDetail(evento.detalle).split(",").map((item) => item.trim()).filter(Boolean)) {
      add(closestLegacyAnexo(name, evento.fecha, anexos, usedIds));
    }
  }

  return out.sort((a, b) => +new Date(b.fecha_subida ?? 0) - +new Date(a.fecha_subida ?? 0));
}

function closestLegacyAnexo<T extends PlanEvidenceAnexo>(
  name: string,
  eventDate: string | null,
  anexos: T[],
  usedIds: Set<number>
): T | null {
  const eventTime = eventDate ? new Date(eventDate).getTime() : NaN;
  const candidates = anexos
    .filter((anexo) => anexo.nombre_archivo?.trim() === name && !usedIds.has(anexo.id_anexo))
    .sort((a, b) => {
      if (!Number.isFinite(eventTime)) return +new Date(b.fecha_subida ?? 0) - +new Date(a.fecha_subida ?? 0);
      return Math.abs(+new Date(a.fecha_subida ?? 0) - eventTime) - Math.abs(+new Date(b.fecha_subida ?? 0) - eventTime);
    });

  return candidates[0] ?? null;
}
