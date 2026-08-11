import { useMemo, useState } from "react";
import {
  FileText, Check, X, Mail, CornerUpLeft, Send, Microscope, ClipboardList,
  CheckCircle2, AlertCircle, Rocket, Timer, Activity, Gavel, Paperclip,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { useAddComment } from "@/features/cases/hooks/useCaseActions";
import { humanEvidenceDetail } from "@/features/cases/lib/planEvidence";
import { compactPlanCodes } from "@/features/cases/lib/planLabels";
import { ACTOR_ROL_LABEL } from "@/features/cases/lib/workflow";
import { apiErrorMessage } from "@/lib/api";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CaseDetail } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx → TimelinePanel + TimelineIcon.
function TimelineIcon({ kind }: { kind: string }) {
  const map: Record<string, typeof FileText> = {
    creado: FileText, aprobado: Check, rechazado: X, info_solicitada: Mail, info_recibida: CornerUpLeft,
    derivado: Send, investigacion: Microscope, plan_propuesto: ClipboardList, plan_aprobado: CheckCircle2,
    plan_ajustado: AlertCircle, ejecucion: Rocket, ampliacion: Timer, seguimiento: Activity,
    cierre: CheckCircle2, reapertura: CornerUpLeft, retroceso: CornerUpLeft, comentario: FileText, sancion: Gavel,
  };
  const Icon = map[kind] ?? FileText;
  return <Icon className="h-4 w-4" />;
}

// Cada rol de la bitácora tiene su propio color, para que se lea de un vistazo
// quién movió el expediente: SO, el reportante o el área responsable.
const ROL_STYLE: Record<string, { avatar: string; etiqueta: string }> = {
  seguridad: { avatar: "bg-brand-100 text-brand-800", etiqueta: "bg-brand-50 text-brand-800" },
  reportante: { avatar: "bg-info-soft text-info-ink", etiqueta: "bg-info-soft text-info-ink" },
  jefe: { avatar: "bg-warning-soft text-warning-ink", etiqueta: "bg-warning-soft text-warning-ink" },
};

const ROL_FALLBACK = { avatar: "bg-surface-2 text-ink-soft", etiqueta: "bg-surface-2 text-ink-quiet" };

type RolFiltro = "todos" | "seguridad" | "reportante" | "jefe";

export function TimelinePanel({ caso, puedeComentar = true }: { caso: CaseDetail; puedeComentar?: boolean }) {
  const [comment, setComment] = useState("");
  const [rol, setRol] = useState<RolFiltro>("todos");
  const addComment = useAddComment(caso.codigo_sop);

  const events = useMemo(
    () => [...caso.timeline_caso].sort((a, b) => +new Date(b.fecha ?? 0) - +new Date(a.fecha ?? 0)),
    [caso.timeline_caso]
  );

  const conteos = useMemo(() => {
    const out: Record<RolFiltro, number> = { todos: events.length, seguridad: 0, reportante: 0, jefe: 0 };
    for (const e of events) {
      if (e.actor_rol === "seguridad" || e.actor_rol === "reportante" || e.actor_rol === "jefe") out[e.actor_rol]++;
    }
    return out;
  }, [events]);

  const visibles = rol === "todos" ? events : events.filter((e) => e.actor_rol === rol);

  return (
    <div className="space-y-4">
      {/* Filtro por actor */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-line w-fit">
        {(["todos", "seguridad", "reportante", "jefe"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRol(r)}
            className={cn(
              "h-7 px-2.5 rounded-md text-[11.5px] font-medium transition-all whitespace-nowrap",
              rol === r ? "bg-brand-700 text-white" : "text-ink-soft hover:bg-white"
            )}
          >
            {r === "todos" ? "Todos" : ACTOR_ROL_LABEL[r]}
            <span className="ml-1.5 tabular-nums opacity-70">{conteos[r]}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-line" />
        <div className="space-y-4">
          {visibles.length === 0 && (
            <p className="text-[12px] text-ink-faint pl-10">
              {events.length === 0 ? "Sin eventos registrados todavía." : "Sin eventos de este actor."}
            </p>
          )}
          {visibles.map((t) => {
            const estilo = ROL_STYLE[t.actor_rol] ?? ROL_FALLBACK;
            return (
              <div key={t.id_evento} className="relative pl-10">
                <div
                  className={cn(
                    "absolute left-0 top-1 h-8 w-8 rounded-full grid place-items-center border-2 border-white shrink-0",
                    estilo.avatar
                  )}
                >
                  <TimelineIcon kind={t.kind} />
                </div>
                <p className="text-[12.5px] font-semibold text-ink leading-tight break-words">{compactPlanCodes(t.titulo)}</p>
                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                  <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", estilo.etiqueta)}>
                    {ACTOR_ROL_LABEL[t.actor_rol] ?? t.actor_rol}
                  </span>
                  <span className="text-[11px] text-ink-quiet">
                    {t.actor} · {t.fecha ? relativeTime(t.fecha) : ""}
                  </span>
                </div>
                {t.detalle && (
                  // Los eventos que enlazan evidencias llevan un payload JSON
                  // técnico al final del detalle; aquí solo va el texto legible.
                  <p className="text-[12px] text-ink-soft mt-1.5 leading-relaxed break-words bg-surface/60 rounded-md p-2">
                    {compactPlanCodes(humanEvidenceDetail(t.detalle))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {puedeComentar && (
        <div className="pt-3 border-t border-line-soft">
          <Field label="Agregar comentario al expediente">
            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} placeholder="Comentario interno…" />
          </Field>
          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              variant="secondary"
              disabled={!comment.trim() || addComment.isPending}
              onClick={() =>
                addComment.mutate(
                  { texto: comment.trim() },
                  {
                    onSuccess: () => {
                      toast.success("Comentario agregado");
                      setComment("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo agregar el comentario")),
                  }
                )
              }
            >
              <Paperclip className="h-3.5 w-3.5" /> Agregar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
