import { Link } from "react-router-dom";
import { ArrowUpRight, AlertTriangle, Building2, CalendarClock, Check, ClipboardList, Timer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { Progress } from "@/design-system/primitives/Progress";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { useAcceptPlanById } from "@/features/plans/hooks/usePlans";
import { apiErrorMessage } from "@/lib/api";
import { daysUntil, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PlanItem } from "@/features/plans/types";
import { calcProgress, planEnd, planFlow, planStart, planTipoAccion, priorityInfo, statusLabel } from "@/features/plans/lib/planDetailFlow";
import { ACTOR } from "./constants";

export function PlanChoiceCard({ codigo, plan }: { codigo: string; plan: PlanItem }) {
  const flow = planFlow(plan);
  const status = statusLabel(flow);
  const priority = priorityInfo(plan);
  const inicio = planStart(plan);
  const fin = planEnd(plan);
  const vencido = daysUntil(fin) < 0 && !flow.finalizado && !flow.cerrado && !flow.rechazado && !flow.enVerificacion;
  const progreso = calcProgress(plan);
  const acceptPlan = useAcceptPlanById();

  return (
    <article className="rounded-xl border border-line-soft bg-white p-3 shadow-sm transition-colors hover:border-brand-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <ClipboardList className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <Link
              to={`/jefe/planes/${encodeURIComponent(codigo)}?plan=${plan.id_plan}`}
              className="font-mono text-[15px] font-bold text-brand-700 transition-colors hover:text-brand-800 hover:underline"
            >
              {shortPlanCode(plan.codigo_plan)}
            </Link>
            <p className="mt-0.5 line-clamp-1 break-all text-[12.5px] text-ink-quiet">{plan.descripcion}</p>
          </div>
        </div>
        <Pill tone={status.tone} dot>{status.label}</Pill>
      </div>

      <div className="mt-3 grid gap-x-6 gap-y-2 text-[12.5px] md:grid-cols-2 xl:grid-cols-5">
        <div className="flex items-center gap-1.5 text-ink-soft">
          <Building2 className="h-3 w-3 text-ink-faint" />
          <span>Área:</span>
          <span className="font-semibold text-ink">{plan.areas.nombre_area}</span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-soft">
          <ClipboardList className="h-3 w-3 text-ink-faint" />
          <span>Tipo:</span>
          <span className="font-semibold text-ink">{planTipoAccion(plan)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-soft">
          <AlertTriangle className="h-3 w-3 text-ink-faint" />
          <span>Riesgo:</span>
          <Pill tone={priority.tone} dot>{priority.label}</Pill>
        </div>
        <div className="flex items-center gap-1.5 text-ink-soft">
          <CalendarClock className="h-3 w-3 text-ink-faint" />
          <span>Inicio:</span>
          <span className="font-medium text-ink">{formatDate(inicio)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-soft">
          <Timer className="h-3 w-3 text-ink-faint" />
          <span>{vencido ? "Vencido:" : "Fin:"}</span>
          <span className={cn("font-medium", vencido ? "text-critical" : "text-ink")}>{formatDate(fin)}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Progress value={progreso} className="h-1.5 flex-1" />
        <span className="w-12 text-right text-[11.5px] font-semibold text-ink-soft">{progreso}%</span>
      </div>

      <div className="mt-3 flex flex-wrap justify-end gap-2">
        {flow.pendienteAceptacion && (
          <Button
            size="sm"
            disabled={acceptPlan.isPending}
            onClick={() =>
              acceptPlan.mutate(
                { id_plan: plan.id_plan, actor: ACTOR },
                {
                  onSuccess: () => toast.success("Plan aceptado, la ejecución ha iniciado"),
                  onError: (e) => toast.error(apiErrorMessage(e, "No se pudo aceptar el plan")),
                }
              )
            }
          >
            <Check className="h-4.5 w-4.5" /> Aceptar plan de acción
          </Button>
        )}
        <Link
          to={`/jefe/planes/${encodeURIComponent(codigo)}?plan=${plan.id_plan}`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-white px-3 text-[13.5px] font-medium text-ink transition-colors hover:border-ink-faint hover:bg-surface-2"
        >
          <ArrowUpRight className="h-4.5 w-4.5" /> Ver detalle
        </Link>
      </div>
    </article>
  );
}
