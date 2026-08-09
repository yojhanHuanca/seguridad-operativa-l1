import type { ReactNode } from "react";
import { Check, X, AlertCircle, Inbox, FileSearch, Microscope, ClipboardList, Rocket, Activity, CheckCircle2 } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { cn } from "@/lib/utils";
import type { Stage } from "../domain";

// Workflow de 7 etapas — mismos iconos, orden y estilos que el prototipo
// (pages/seguridad/CaseFile.tsx → STAGE_STEP).
export const STAGE_STEP: { stage: Stage; label: string; icon: typeof FileSearch }[] = [
  { stage: "recepcion", label: "Recepción", icon: Inbox },
  { stage: "evaluacion", label: "Evaluación", icon: FileSearch },
  { stage: "investigacion", label: "Investigación", icon: Microscope },
  { stage: "plan_accion", label: "Plan de Acción", icon: ClipboardList },
  { stage: "ejecucion", label: "Ejecución", icon: Rocket },
  { stage: "verificacion", label: "Verificación", icon: Activity },
  { stage: "cierre", label: "Cierre", icon: CheckCircle2 },
];

/**
 * Índice del paso activo. "Pendiente de Información" no es una etapa propia
 * sino una pausa que puede ocurrir en Recepción, Evaluación o Investigación:
 * se ancla a la etapa a la que el caso volverá (`vuelveA`), que el backend
 * guarda en `solicitudes_informacion.estado_previo`. Antes se anclaba siempre
 * a Recepción, así que un caso pausado desde Evaluación retrocedía un paso
 * visualmente sin haber retrocedido de verdad.
 */
export function stageStepIndex(stage: Stage, vuelveA?: Stage | null): number {
  if (stage === "pendiente_info") {
    const anclaje = vuelveA && vuelveA !== "pendiente_info" ? vuelveA : "evaluacion";
    return STAGE_STEP.findIndex((s) => s.stage === anclaje);
  }
  if (stage === "rechazado") return -1;
  return STAGE_STEP.findIndex((s) => s.stage === stage);
}

export function WorkflowStepper({
  stage,
  vuelveA,
  prorroga = false,
  investigacionOmitida = false,
}: {
  stage: Stage;
  /** Etapa a la que vuelve un caso pausado por solicitud de información. */
  vuelveA?: Stage | null;
  /** Pausa por ampliación de plazo: ocurre dentro de Ejecución. */
  prorroga?: boolean;
  /** Seguridad Operativa evaluó el caso y decidió saltar Investigación. */
  investigacionOmitida?: boolean;
}) {
  const stepIdx = stageStepIndex(stage, vuelveA);
  return (
    <Card className="mt-5 p-4">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {STAGE_STEP.map((s, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          const rejected = stage === "rechazado" && i === 0;
          // Ambas pausas se pintan igual: el paso activo en ámbar, señalando
          // que el caso está detenido esperando a un tercero.
          const pendingInfo = (stage === "pendiente_info" || prorroga) && i === stepIdx;
          const skippedInvestigation = investigacionOmitida && s.stage === "investigacion" && i < stepIdx;
          return (
            <div key={s.stage} className="flex items-center shrink-0">
              <div className="flex items-center gap-2.5 px-2">
                <div
                  className={cn(
                    "h-9 w-9 rounded-full grid place-items-center shrink-0 transition-all",
                    done && !skippedInvestigation && "bg-brand-700 text-white",
                    active && !pendingInfo && "bg-info-soft text-info-ink ring-2 ring-info/30 ring-offset-2 ring-offset-white",
                    (pendingInfo || skippedInvestigation) && "bg-warning text-warning-ink ring-2 ring-warning/40 ring-offset-2 ring-offset-white",
                    rejected && "bg-critical text-white",
                    !done && !active && !rejected && !pendingInfo && !skippedInvestigation && "bg-surface-2 text-ink-faint"
                  )}
                  title={skippedInvestigation ? "Investigación omitida por decisión de Seguridad Operativa" : s.label}
                >
                  {skippedInvestigation ? <AlertCircle className="h-4 w-4" /> : done ? <Check className="h-4 w-4" /> : rejected ? <X className="h-4 w-4" /> : pendingInfo ? <AlertCircle className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </div>
                <div className="hidden md:block">
                  <p
                    className={cn(
                      "text-[12.5px] font-medium leading-tight",
                      active && !pendingInfo ? "text-info-ink" : pendingInfo || skippedInvestigation ? "text-warning-ink" : done ? "text-ink" : "text-ink-quiet"
                    )}
                  >
                    {skippedInvestigation ? "Investigación omitida" : s.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-ink-faint mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-ink-faint">{label}</p>
        <p className="text-[12.5px] text-ink font-medium leading-snug mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export function InfoCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <Card padded={false}>
      <div className={cn("p-4 border-b border-line-soft", action && "flex items-center justify-between")}>
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-faint">{title}</p>
        {action}
      </div>
      <div className="p-4 space-y-3.5">{children}</div>
    </Card>
  );
}

export function StageSection({
  title,
  subtitle,
  icon,
  children,
  action,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-700 grid place-items-center shrink-0">{icon}</div>
          <div>
            <h2 className="text-[16px] font-bold text-ink leading-tight">{title}</h2>
            <p className="text-[12.5px] text-ink-quiet mt-0.5">{subtitle}</p>
          </div>
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}

export function DescriptionBlock({ description }: { description: string }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-1.5">Descripción del evento</p>
        <p className="text-[13.5px] text-ink-soft leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
