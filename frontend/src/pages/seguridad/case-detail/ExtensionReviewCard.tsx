import { useState } from "react";
import { Timer, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { StageSection } from "@/features/cases/components/CaseParts";
import { useReviewExtension } from "@/features/cases/hooks/useCaseActions";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { planDeadline } from "@/features/plans/lib/planDeadline";
import { apiErrorMessage } from "@/lib/api";
import { formatDate, relativeTime } from "@/lib/format";
import type { CaseDetail } from "@/features/cases/types";

/**
 * Etapa 5 (pausa) — el Jefe del Área pidió ampliación de plazo y el caso
 * quedó en "Prórroga Solicitada". Aquí Seguridad Operativa la resuelve:
 * si aprueba, la fecha del plan se corre a la propuesta; si rechaza, no.
 * En ambos casos el caso vuelve a Ejecución.
 */
export function ExtensionReviewCard({ caso }: { caso: CaseDetail }) {
  const plan = caso.planes_accion.find((p) => p.prorroga_estado === "pendiente") ?? caso.planes_accion[0];
  const [nota, setNota] = useState("");
  const review = useReviewExtension(caso.codigo_sop);

  if (!plan) return null;

  const resolver = (decision: "aprobada" | "rechazada") =>
    review.mutate(
      { decision, nota: nota.trim() || undefined },
      {
        onSuccess: () =>
          toast.success(
            decision === "aprobada"
              ? "Ampliación aprobada, la fecha del plan fue reprogramada"
              : "Ampliación rechazada, se mantiene la fecha original"
          ),
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo resolver la ampliación")),
      }
    );

  return (
    <StageSection
      title="Solicitud de ampliación de plazo"
      subtitle="El área responsable pidió más tiempo para ejecutar el plan. Resuelva para que la ejecución continúe."
      icon={<Timer className="h-5 w-5" />}
      action={<Pill tone="warning" dot>Pendiente de decisión</Pill>}
    >
      <div className="rounded-lg bg-warning-soft border border-warning/30 p-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-warning-ink">Justificación del área</p>
            <p className="text-[13px] text-ink mt-1.5">{plan.prorroga_motivo}</p>
          </div>
          {plan.prorroga_fecha_sol && (
            <span className="text-[11px] text-ink-quiet shrink-0">Solicitada {relativeTime(plan.prorroga_fecha_sol)}</span>
          )}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3 border-t border-warning/25 pt-3.5">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">Plan</p>
            <p className="text-[12.5px] font-medium text-ink mt-0.5 font-mono">{shortPlanCode(plan.codigo_plan)}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">Fecha actual</p>
            <p className="text-[12.5px] font-medium text-ink mt-0.5">{formatDate(planDeadline(plan))}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">Fecha propuesta</p>
            <p className="text-[12.5px] font-semibold text-warning-ink mt-0.5">
              {plan.prorroga_fecha ? formatDate(plan.prorroga_fecha) : "—"}
            </p>
          </div>
        </div>
      </div>

      <Field label="Nota de la decisión" hint="Opcional — queda en la bitácora del expediente" className="mt-4">
        <Textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={2} placeholder="Motivo de la aprobación o del rechazo…" />
      </Field>

      <div className="mt-4 pt-4 border-t border-line-soft flex items-center gap-2 flex-wrap">
        <Button size="sm" disabled={review.isPending} onClick={() => resolver("aprobada")}>
          <Check className="h-4 w-4" /> Aprobar ampliación
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={review.isPending}
          onClick={() => resolver("rechazada")}
          className="text-critical hover:bg-critical-soft"
        >
          <X className="h-4 w-4" /> Rechazar
        </Button>
      </div>
    </StageSection>
  );
}
