import { useState } from "react";
import { Microscope, Check, FileSearch, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Pill, RiskPill } from "@/design-system/primitives/Pill";
import type { RiskLevel } from "@/features/cases/domain";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { StageSection } from "@/features/cases/components/CaseParts";
import { useSaveInvestigation } from "@/features/cases/hooks/useCaseActions";
import { criterioAceptabilidad } from "@/features/cases/lib/sla";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { StageRollbackButton } from "./StageRollbackButton";
import type { CaseDetail } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx → InvestigationStage / InvDisplay.
function InvBlock({ label, value, tone }: { label: string; value: string; tone?: "critical" }) {
  return (
    <div>
      <p className={cn("text-[11px] font-semibold tracking-wide uppercase mb-1.5", tone === "critical" ? "text-critical-ink" : "text-ink-faint")}>
        {label}
      </p>
      <p className="text-[13.5px] text-ink-soft leading-relaxed break-words">{value}</p>
    </div>
  );
}

/**
 * Aviso ámbar cuando el caso todavía no tiene Plan de Acción. El cliente pidió
 * que la investigación cambie de color mientras el plan siga sin hacerse, para
 * que no se quede parada sin que nadie lo note.
 */
function SinPlanAviso() {
  return (
    <div className="mb-4 rounded-lg bg-warning-soft border border-warning/30 p-3.5 flex items-start gap-2.5">
      <AlertTriangle className="h-4 w-4 text-warning-ink shrink-0 mt-0.5" />
      <p className="text-[12.5px] text-warning-ink">
        <span className="font-semibold">Sin Plan de Acción.</span> Este caso aún no tiene un plan registrado. Al guardar
        la investigación deberá crearlo para que el área responsable pueda ejecutarlo.
      </p>
    </div>
  );
}

export function InvestigationCard({ caso }: { caso: CaseDetail }) {
  const inv = caso.investigacion_caso;
  // El riesgo evaluado se muestra junto a la investigación: es el contexto que
  // el investigador necesita a la vista mientras redacta (pedido del cliente).
  const riesgo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const risk = riesgo?.codigo as RiskLevel | undefined;
  const riesgoLabel = riesgo ? `${riesgo.codigo} — ${criterioAceptabilidad(riesgo.nombre, riesgo.codigo) ?? riesgo.nombre}` : "Sin evaluar";
  // Aviso en color cuando la investigación está lista pero aún no hay plan.
  const sinPlan = caso.planes_accion.length === 0;
  const [editMode, setEditMode] = useState(!inv);
  const [findings, setFindings] = useState(inv?.hallazgos ?? "");
  const [rootCause, setRootCause] = useState(inv?.causa_raiz ?? "");
  const [conclusions, setConclusions] = useState(inv?.conclusiones ?? "");
  const [observations, setObservations] = useState(inv?.observaciones ?? "");

  const save = useSaveInvestigation(caso.codigo_sop);
  const canSave = findings.trim() && rootCause.trim() && conclusions.trim();

  // Ya registrada y sin editar: vista de solo lectura.
  if (inv && !editMode) {
    return (
      <StageSection
        title="Investigación registrada"
        subtitle="Hallazgos, causa raíz y conclusiones registrados por Seguridad Operativa."
        icon={<Microscope className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-2">
            {risk && <RiskPill risk={risk} showCategory />}
            <Pill tone={sinPlan ? "warning" : "brand"} dot>{sinPlan ? "Falta plan" : "Completado"}</Pill>
            <StageRollbackButton
              codigo={caso.codigo_sop}
              destino="Evaluación"
              label="Volver a Evaluación"
              title="Volver al análisis de riesgo"
              description="El caso regresará a Evaluación para corregir clasificación, peligro, consecuencia o nivel de riesgo. La investigación registrada se mantiene guardada."
            />
            <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
              <FileSearch className="h-4 w-4" /> Editar
            </Button>
          </div>
        }
      >
        {sinPlan && <SinPlanAviso />}
        <div className="space-y-4">
          <InvBlock label="Riesgo evaluado" value={riesgoLabel} />
          <InvBlock label="Descripción de evento" value={inv.hallazgos} />
          <InvBlock label="Causa raíz" value={inv.causa_raiz} tone="critical" />
          <InvBlock label="Conclusiones" value={inv.conclusiones} />
          {inv.observaciones && <InvBlock label="Observaciones" value={inv.observaciones} />}
          {inv.updated_at && (
            <p className="text-[11px] text-ink-faint pt-2 border-t border-line-soft">
              Actualizado {formatDateTime(inv.updated_at)}
              {inv.usuarios ? ` · ${inv.usuarios.nombre}` : ""}
            </p>
          )}
        </div>
      </StageSection>
    );
  }

  return (
    <StageSection
      title="Investigación del caso"
      subtitle="Seguridad Operativa registra hallazgos, causa raíz, análisis y conclusiones."
      icon={<Microscope className="h-5 w-5" />}
      action={
        <div className="flex items-center gap-2">
          {risk && <RiskPill risk={risk} showCategory />}
          <Pill tone={sinPlan ? "warning" : "info"} dot>{sinPlan ? "Falta plan" : "En curso"}</Pill>
          <StageRollbackButton
            codigo={caso.codigo_sop}
            destino="Evaluación"
            label="Volver a Evaluación"
            title="Volver al análisis de riesgo"
            description="El caso regresará a Evaluación para corregir clasificación, peligro, consecuencia o nivel de riesgo. Si ya existe una investigación guardada, no se elimina."
          />
        </div>
      }
    >
      {sinPlan && <SinPlanAviso />}
      <div className="space-y-4">
        <InvBlock label="Riesgo evaluado" value={riesgoLabel} />
        <Field label="Descripción de evento" required>
          <Textarea value={findings} onChange={(e) => setFindings(e.target.value)} placeholder="¿Qué se encontró durante la inspección?" rows={3} />
        </Field>
        <Field label="Causa raíz" required>
          <Textarea value={rootCause} onChange={(e) => setRootCause(e.target.value)} placeholder="¿Cuál es la causa originaria del evento?" rows={2} />
        </Field>
        <Field label="Conclusiones" required>
          <Textarea value={conclusions} onChange={(e) => setConclusions(e.target.value)} placeholder="Conclusiones del análisis…" rows={2} />
        </Field>
        <Field label="Observaciones">
          <Textarea value={observations} onChange={(e) => setObservations(e.target.value)} placeholder="Recomendaciones o información complementaria…" rows={2} />
        </Field>

        <div className="pt-3 border-t border-line-soft flex items-center justify-end gap-2">
          {inv && (
            <Button variant="ghost" size="sm" onClick={() => setEditMode(false)}>
              Cancelar
            </Button>
          )}
          <Button
            disabled={!canSave || save.isPending}
            onClick={() =>
              save.mutate(
                {
                  hallazgos: findings.trim(),
                  causa_raiz: rootCause.trim(),
                  conclusiones: conclusions.trim(),
                  observaciones: observations.trim() || undefined,
                },
                {
                  onSuccess: () => {
                    toast.success("Investigación guardada, el caso pasó a Plan de Acción");
                    setEditMode(false);
                  },
                  onError: (e) => toast.error(apiErrorMessage(e, "No se pudo guardar la investigación")),
                }
              )
            }
          >
            <Check className="h-4 w-4" /> Guardar investigación y pasar a Plan de Acción
          </Button>
        </div>
      </div>
    </StageSection>
  );
}
