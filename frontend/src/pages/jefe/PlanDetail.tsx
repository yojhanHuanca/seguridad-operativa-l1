import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, AlertCircle, AlertTriangle, Check, ClipboardList, Save, Timer } from "lucide-react";
import { toast } from "sonner";
import { JefeShell } from "@/components/layout/JefeShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { useAcceptPlanById, useCompleteExecutionByPlan, usePlansByCase } from "@/features/plans/hooks/usePlans";
import { apiErrorMessage } from "@/lib/api";
import { daysUntil } from "@/lib/format";
import type { PlanItem } from "@/features/plans/types";
import { calcProgress, detailStatus, planEnd, planFlow, planNumberLabel } from "@/features/plans/lib/planDetailFlow";
import { ACTOR } from "./plan-detail/constants";
import { PlanSelectionContent } from "./plan-detail/PlanSelectionContent";
import { PlanInfoCard } from "./plan-detail/PlanInfoCard";
import { ClosureCard } from "./plan-detail/ClosureCard";
import { HistoryCard } from "./plan-detail/HistoryCard";
import { UpdateModal } from "./plan-detail/UpdateModal";
import { ExtensionModal } from "./plan-detail/ExtensionModal";

export function PlanDetail() {
  const { codigo = "" } = useParams<{ codigo: string }>();
  const [params] = useSearchParams();
  const idPlan = params.get("plan");
  const { data: casePlansData, isLoading, isError } = usePlansByCase(codigo);
  const casePlans = casePlansData ?? [];

  if (isLoading) {
    return (
      <JefeShell>
        <Card className="py-16 text-center">
          <p className="text-[13px] text-ink-quiet">Cargando plan de acción…</p>
        </Card>
      </JefeShell>
    );
  }

  if (isError || casePlans.length === 0) {
    return (
      <JefeShell>
        <div className="mb-5 flex items-center gap-3">
          <Link to="/jefe" className="rounded-lg p-2 hover:bg-surface-2">
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>
          <h1 className="text-[26px] font-bold tracking-tight text-ink">Reporte no encontrado</h1>
        </div>
        <Card className="p-6 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-critical" />
          <p className="font-medium text-ink">No encontramos planes para el SOP {codigo}.</p>
          <Link to="/jefe" className="mt-4 inline-block">
            <Button variant="outline" size="sm">Volver a mi plan</Button>
          </Link>
        </Card>
      </JefeShell>
    );
  }

  if (!idPlan) {
    return <PlanSelectionContent codigo={codigo} plans={casePlans} />;
  }

  const plan = casePlans.find((p) => String(p.id_plan) === idPlan);
  if (!plan) {
    return (
      <JefeShell>
        <div className="mb-5 flex items-center gap-3">
          <Link to={`/jefe/planes/${encodeURIComponent(codigo)}`} className="rounded-lg p-2 hover:bg-surface-2">
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>
          <h1 className="text-[26px] font-bold tracking-tight text-ink">Plan no encontrado</h1>
        </div>
        <Card className="p-6 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-critical" />
          <p className="font-medium text-ink">El plan de acción solicitado no pertenece a este SOP.</p>
          <Link to={`/jefe/planes/${encodeURIComponent(codigo)}`} className="mt-4 inline-block">
            <Button variant="outline" size="sm">Ver planes del reporte</Button>
          </Link>
        </Card>
      </JefeShell>
    );
  }

  return <PlanDetailContent plan={plan} />;
}

function PlanDetailContent({ plan }: { plan: PlanItem }) {
  const caso = plan.casos_sop;
  const flow = planFlow(plan);
  const limite = plan.fecha_reprogramada ?? planEnd(plan);
  const progreso = calcProgress(plan);
  const status = detailStatus(flow, progreso);
  const vencido = daysUntil(limite) < 0 && !flow.finalizado && !flow.cerrado && !flow.rechazado && !flow.enVerificacion;

  const acceptPlan = useAcceptPlanById();
  const completeExec = useCompleteExecutionByPlan();

  const finalDescriptionDraftKey = useMemo(() => `sigma-l1-plan-${plan.id_plan}-descripcion-cierre`, [plan.id_plan]);
  const [finalDescription, setFinalDescription] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [extOpen, setExtOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFinalDescription(window.localStorage.getItem(finalDescriptionDraftKey) ?? "");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [finalDescriptionDraftKey]);

  const hasSaveableChanges = flow.puedeTrabajar && finalDescription.trim().length > 0;

  const onFinalizeSuccess = () => {
    window.localStorage.removeItem(finalDescriptionDraftKey);
    setFinalDescription("");
  };

  const saveChanges = () => {
    if (!flow.puedeTrabajar) {
      toast.info(flow.pendienteAceptacion ? "Acepta el plan para iniciar la ejecución" : "El estado actual no permite guardar cambios");
      return;
    }

    let saved = false;

    const descripcion = finalDescription.trim();
    if (descripcion) {
      window.localStorage.setItem(finalDescriptionDraftKey, descripcion);
      toast.success("Descripción final guardada como borrador");
      saved = true;
    }

    if (!saved) toast.info("No hay cambios pendientes por guardar");
  };

  return (
    <JefeShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to={`/jefe/planes/${encodeURIComponent(caso.codigo_sop)}`}
              className="rounded-xl p-2 text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Volver a planes del caso"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[13px] font-medium text-ink-soft">
                  {caso.codigo_sop}
                </span>
                {vencido && (
                  <Pill tone="critical" dot>
                    <AlertTriangle className="h-3 w-3" /> Plazo vencido
                  </Pill>
                )}
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-ink-soft">
                <ClipboardList className="h-4 w-4 text-brand-700" />
                {planNumberLabel(plan)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {flow.puedeTrabajar && (
              <Button variant="outline" size="md" onClick={() => setExtOpen(true)}>
                <Timer className="h-4.5 w-4.5" /> Solicitar Prórroga
              </Button>
            )}
            <Pill tone={status.tone} dot className="text-[13px]">
              {status.label}
            </Pill>
          </div>
        </div>

        {flow.pendienteAceptacion && (
          <Card className="border-brand-100 bg-brand-50/50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-ink">Plan pendiente de aceptación</p>
                <p className="mt-1 text-[13px] text-ink-soft">Acepta el plan para iniciar la ejecución y habilitar comentarios/evidencias.</p>
              </div>
              <Button
                size="md"
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
                <Check className="h-4.5 w-4.5" /> Aceptar Plan
              </Button>
            </div>
          </Card>
        )}

        <PlanInfoCard plan={plan} />

        <ClosureCard
          plan={plan}
          finalDescription={finalDescription}
          onFinalDescriptionChange={setFinalDescription}
          completeExec={completeExec}
          onFinalizeSuccess={onFinalizeSuccess}
          onRequestUpdate={() => setUpdateOpen(true)}
        />

        <HistoryCard plan={plan} />

        <Button
          variant={hasSaveableChanges ? "primary" : "outline"}
          size="lg"
          className="w-full"
          disabled={completeExec.isPending || !hasSaveableChanges}
          onClick={saveChanges}
        >
          <Save className="h-4.5 w-4.5" /> Guardar cambios
        </Button>
      </div>

      <UpdateModal plan={plan} open={updateOpen} onClose={() => setUpdateOpen(false)} />
      <ExtensionModal plan={plan} open={extOpen} onClose={() => setExtOpen(false)} />
    </JefeShell>
  );
}
