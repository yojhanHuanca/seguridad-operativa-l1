import { useMemo, useRef, useState } from "react";
import { Download, FileText, Image as ImageIcon, Paperclip, Upload, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { useAddCaseEvidence } from "@/features/cases/hooks/useCaseActions";
import { planEvidenceFiles, timelineBelongsToPlan } from "@/features/cases/lib/planEvidence";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { ACTOR_ROL_LABEL } from "@/features/cases/lib/workflow";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AnexoCaso, CaseDetail, TimelineEvento } from "@/features/cases/types";
import { abrirArchivoProtegido } from "@/lib/archivos";

// Origen del backend para resolver las rutas `/uploads/...` que devuelve la API.

// Mismos límites que valida el backend (middlewares/upload.middleware.ts):
// rechazar aquí evita un viaje al servidor para un archivo que va a fallar.
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime", "application/pdf"];
const ACCEPT = TIPOS_PERMITIDOS.join(",");
const MAX_ARCHIVOS = 10;
const MAX_BYTES = 25 * 1024 * 1024;
const PLAN_EVIDENCE_MARKER = "__PLAN_EVIDENCE__:";
const CASE_EVIDENCE_MARKER = "__CASE_EVIDENCE__:";

interface EvidencePayloadFile {
  id_anexo?: number;
  ruta_archivo?: string | null;
}

interface EvidenceGroup {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  anexos: AnexoCaso[];
}

function IconoArchivo({ tipo }: { tipo: string | null }) {
  if (tipo?.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
  if (tipo?.startsWith("video/")) return <Video className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function normalize(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseEvidenceRefs(detalle: string | null | undefined, marker: string): EvidencePayloadFile[] {
  const raw = detalle ?? "";
  const markerIndex = raw.indexOf(marker);
  if (markerIndex < 0) return [];

  try {
    const payload = JSON.parse(raw.slice(markerIndex + marker.length).trim()) as { anexos?: EvidencePayloadFile[] };
    return Array.isArray(payload.anexos) ? payload.anexos : [];
  } catch {
    return [];
  }
}

function resolveRefs(refs: EvidencePayloadFile[], anexos: AnexoCaso[], usedIds: Set<number>) {
  const byId = new Map(anexos.map((anexo) => [anexo.id_anexo, anexo]));
  const byPath = new Map(anexos.map((anexo) => [anexo.ruta_archivo ?? "", anexo]));
  const out: AnexoCaso[] = [];

  for (const ref of refs) {
    const anexo = (ref.id_anexo ? byId.get(ref.id_anexo) : null) ?? byPath.get(ref.ruta_archivo ?? "");
    if (!anexo || usedIds.has(anexo.id_anexo)) continue;
    usedIds.add(anexo.id_anexo);
    out.push(anexo);
  }

  return out;
}

function roleTitle(evento: TimelineEvento, fallback: string) {
  if (evento.actor_rol === "reportante") return "Reportante";
  return ACTOR_ROL_LABEL[evento.actor_rol] ?? fallback;
}

function uploaderSubtitle(evento: TimelineEvento, extra?: string) {
  return [evento.actor || "Usuario no identificado", extra, evento.fecha ? formatDateTime(evento.fecha) : undefined]
    .filter(Boolean)
    .join(" · ");
}

function planEvidenceGroups(caso: CaseDetail, usedIds: Set<number>): EvidenceGroup[] {
  const groups: EvidenceGroup[] = [];

  for (const plan of caso.planes_accion) {
    const eventos = caso.timeline_caso
      .filter((evento) => timelineBelongsToPlan(evento, plan) && normalize(evento.titulo).includes("evidencia"))
      .sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0));

    for (const evento of eventos) {
      const anexos = resolveRefs(parseEvidenceRefs(evento.detalle, PLAN_EVIDENCE_MARKER), caso.anexos_caso, usedIds);
      if (anexos.length === 0) continue;
      groups.push({
        id: `plan-${plan.id_plan}-${evento.id_evento}`,
        title: roleTitle(evento, "Jefe de Área"),
        subtitle: uploaderSubtitle(evento, `${shortPlanCode(plan.codigo_plan)} · ${plan.areas.nombre_area}`),
        description: `Evidencias de ejecución del plan ${shortPlanCode(plan.codigo_plan)}.`,
        anexos,
      });
    }

    const anexos = planEvidenceFiles(plan, caso.timeline_caso, caso.anexos_caso).filter((anexo) => {
      if (usedIds.has(anexo.id_anexo)) return false;
      usedIds.add(anexo.id_anexo);
      return true;
    });
    if (anexos.length > 0) {
      groups.push({
        id: `plan-${plan.id_plan}-legacy`,
        title: "Jefe de Área",
        subtitle: `${plan.usuarios.nombre} · ${shortPlanCode(plan.codigo_plan)} · ${plan.areas.nombre_area}`,
        description: "Evidencias de ejecución vinculadas al plan.",
        anexos,
      });
    }
  }

  return groups;
}

function buildEvidenceGroups(caso: CaseDetail): EvidenceGroup[] {
  const usedIds = new Set<number>();
  const groups: EvidenceGroup[] = [];

  for (const evento of caso.timeline_caso.filter((item) => normalize(item.titulo).includes("evidencia"))) {
    const anexos = resolveRefs(parseEvidenceRefs(evento.detalle, CASE_EVIDENCE_MARKER), caso.anexos_caso, usedIds);
    if (anexos.length === 0) continue;
    groups.push({
      id: `case-${evento.id_evento}`,
      title: roleTitle(evento, "Expediente"),
      subtitle: uploaderSubtitle(evento),
      description: "Evidencias adjuntadas directamente al expediente.",
      anexos,
    });
  }

  const planGroups = planEvidenceGroups(caso, usedIds);
  const restantes = caso.anexos_caso.filter((anexo) => !usedIds.has(anexo.id_anexo));
  if (restantes.length > 0) {
    groups.unshift({
      id: "reportante",
      title: "Reportante",
      subtitle: [caso.nombre_reportante?.trim() || "Reporte Anónimo", formatDateTime(caso.created_at)].join(" · "),
      description: "Evidencias enviadas durante el registro inicial del reporte.",
      anexos: restantes,
    });
  }

  return [...groups, ...planGroups];
}

function FilaAnexo({ anexo }: { anexo: AnexoCaso }) {
  return (
    <button
      type="button"
      onClick={() => anexo.ruta_archivo && abrirArchivoProtegido(anexo.ruta_archivo)}
      className="flex w-full items-center gap-2.5 p-2.5 rounded-lg text-left hover:bg-surface transition-colors group cursor-pointer"
    >
      <div className="h-8 w-8 rounded-lg bg-surface-2 text-ink-soft grid place-items-center shrink-0">
        <IconoArchivo tipo={anexo.tipo_archivo} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-ink truncate">{anexo.nombre_archivo}</p>
        <p className="text-[10.5px] text-ink-quiet">
          {anexo.peso ? `${anexo.peso} KB` : ""}
          {anexo.peso && anexo.fecha_subida ? " · " : ""}
          {anexo.fecha_subida ? formatDateTime(anexo.fecha_subida) : ""}
        </p>
      </div>
      <Download className="h-3.5 w-3.5 text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function EvidenceGroupSection({ group, compact = false }: { group: EvidenceGroup; compact?: boolean }) {
  return (
    <section className={cn("rounded-xl border border-line bg-white", compact ? "p-2.5" : "p-3")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12.5px] font-bold text-ink">{group.title}</p>
          <p className="mt-0.5 text-[11px] text-ink-quiet truncate">{group.subtitle}</p>
          {group.description && !compact && (
            <p className="mt-1 text-[11px] text-ink-faint">{group.description}</p>
          )}
        </div>
        <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-[10.5px] font-semibold text-ink-quiet">
          {group.anexos.length} {group.anexos.length === 1 ? "archivo" : "archivos"}
        </span>
      </div>

      <div className={cn("mt-2", compact ? "space-y-0.5" : "space-y-1.5")}>
        {group.anexos.map((anexo) => (
          <FilaAnexo key={anexo.id_anexo} anexo={anexo} />
        ))}
      </div>
    </section>
  );
}

/**
 * Evidencias del expediente: listado y adjunto de nuevos archivos.
 *
 * `puedeAdjuntar` lo decide la máquina de estados (lib/workflow.ts): un caso
 * cerrado o rechazado se consulta pero ya no admite archivos nuevos.
 */
export function EvidencePanel({
  caso,
  puedeAdjuntar,
  compact = false,
}: {
  caso: CaseDetail;
  puedeAdjuntar: boolean;
  /** Versión reducida para incrustar dentro de una etapa. */
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const upload = useAddCaseEvidence(caso.codigo_sop);
  const groups = useMemo(() => buildEvidenceGroups(caso), [caso]);
  const totalEvidence = caso.anexos_caso.length;

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const lista = Array.from(files);

    if (lista.length > MAX_ARCHIVOS) {
      toast.error(`Máximo ${MAX_ARCHIVOS} archivos por vez.`);
      return;
    }
    const pesado = lista.find((f) => f.size > MAX_BYTES);
    if (pesado) {
      toast.error(`"${pesado.name}" supera los 25 MB permitidos.`);
      return;
    }
    const invalido = lista.find((f) => !TIPOS_PERMITIDOS.includes(f.type));
    if (invalido) {
      toast.error(`"${invalido.name}" no es un tipo permitido (imagen, video MP4/MOV o PDF).`);
      return;
    }

    setSubiendo(true);
    upload.mutate(lista, {
      onSuccess: () => toast.success(lista.length === 1 ? "Evidencia adjuntada" : `${lista.length} evidencias adjuntadas`),
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo adjuntar la evidencia")),
      onSettled: () => {
        setSubiendo(false);
        if (inputRef.current) inputRef.current.value = "";
      },
    });
  };

  const botonAdjuntar = puedeAdjuntar && (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      <Button
        variant="outline"
        size="sm"
        disabled={subiendo}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-4 w-4" /> {subiendo ? "Subiendo…" : "Adjuntar evidencia"}
      </Button>
    </>
  );

  if (compact) {
    return (
      <div className="rounded-lg border border-line bg-surface/50 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint flex items-center gap-1.5">
            <Paperclip className="h-3.5 w-3.5" />
            Evidencias ({totalEvidence})
          </p>
          {botonAdjuntar}
        </div>
        {groups.length > 0 && (
          <div className="mt-2 space-y-2">
            {groups.map((group) => (
              <EvidenceGroupSection key={group.id} group={group} compact />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className={cn("space-y-2", groups.length === 0 && "space-y-0")}>
        {groups.length === 0 && (
          <p className="text-[12px] text-ink-faint p-2">Sin evidencias adjuntas.</p>
        )}
        {groups.map((group) => (
          <EvidenceGroupSection key={group.id} group={group} />
        ))}
      </div>

      {puedeAdjuntar ? (
        <div className="pt-3 border-t border-line-soft flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[11.5px] text-ink-quiet">
            Imágenes, video MP4/MOV o PDF · hasta {MAX_ARCHIVOS} archivos de 25 MB.
          </p>
          {botonAdjuntar}
        </div>
      ) : (
        <p className="pt-3 border-t border-line-soft text-[11.5px] text-ink-faint">
          El expediente está archivado: no admite nuevas evidencias.
        </p>
      )}
    </div>
  );
}
