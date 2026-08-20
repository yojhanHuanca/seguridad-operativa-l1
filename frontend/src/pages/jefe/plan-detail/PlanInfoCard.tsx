import { useMemo, useState } from "react";
import { AlertCircle, ClipboardList, FileText, Microscope } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { Pill, RiskPill } from "@/design-system/primitives/Pill";
import { parseActivityDescription } from "@/features/cases/lib/activityMeta";
import type { RiskLevel } from "@/features/cases/domain";
import { formatDate } from "@/lib/format";
import { daysUntil } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PlanItem } from "@/features/plans/types";
import {
  estimatedDuration,
  planEnd,
  planFlow,
  planStart,
  planTipoAccion,
  priorityInfo,
  reportOnlyAnexos,
  reviewState,
} from "@/features/plans/lib/planDetailFlow";
import { InfoRow, InfoTile, MiniaturaAnexo, SectionHeader } from "@/features/plans/components/PlanDetailParts";

export function PlanInfoCard({ plan }: { plan: PlanItem }) {
  const [open, setOpen] = useState(true);
  const caso = plan.casos_sop;
  const reportEvidence = useMemo(() => reportOnlyAnexos(caso), [caso]);
  const flow = planFlow(plan);
  const inicio = planStart(plan);
  const fin = planEnd(plan);
  const priority = priorityInfo(plan);
  const revision = reviewState(flow);

  return (
    <Card padded={false} className="overflow-hidden border-line-soft shadow-sm">
      <div className="px-5 pt-4">
        <SectionHeader
          icon={<ClipboardList className="h-4.5 w-4.5" />}
          title="Información del Plan"
          open={open}
          onToggle={() => setOpen((v) => !v)}
          extra={
            <Pill tone={priority.tone} dot>
              {priority.label}
            </Pill>
          }
        />
      </div>
      {open && (
        <div className="space-y-6 px-5 pb-5 pt-5">
          <div className="grid gap-x-6 gap-y-4 md:grid-cols-4">
            <InfoRow label="Tipo" value={planTipoAccion(plan)} />
            <InfoRow label="Inicio" value={formatDate(inicio)} />
            <InfoRow label="Elaborado por" value="No registrado" />
            <InfoRow label="Estado de revisión" value={<Pill tone={revision.tone} dot>{revision.label}</Pill>} />
            {caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?.codigo && (
              <InfoRow
                label="Riesgo"
                value={
                  <RiskPill
                    risk={caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle.codigo as RiskLevel}
                    showCategory
                  />
                }
              />
            )}
            <InfoRow
              label="Fin"
              value={
                <span className={cn(daysUntil(fin) <= 3 && !flow.cerrado ? "font-semibold text-critical" : "text-ink")}>
                  {daysUntil(fin) <= 3 && !flow.cerrado && <AlertCircle className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />}
                  {formatDate(fin)}
                </span>
              }
            />
            <InfoRow label="Tiempo estimado" value={estimatedDuration(inicio, fin)} />
            <InfoRow label="Fecha de envío" value={plan.created_at ? formatDate(plan.created_at) : formatDate(plan.fecha_plan)} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
                  <ClipboardList className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-[17px] font-semibold text-ink">Actividades del plan</h2>
              </div>
              <div className="rounded-xl border border-line-soft bg-surface/60 px-4 py-4">
                {plan.actividades_plan.length > 0 ? (
                  <div className="space-y-3">
                    {plan.actividades_plan.map((actividad) => {
                      const parsed = parseActivityDescription(actividad.descripcion);
                      return (
                        <div key={actividad.id_actividad} className="rounded-lg border border-line-soft bg-white/70 px-3 py-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="max-h-[220px] overflow-y-auto text-[14px] leading-relaxed text-ink break-words">
                                {parsed.descripcion || plan.descripcion || "Sin descripción registrada."}
                              </p>
                              <p className="mt-1 text-[11px] text-ink-quiet break-words">
                                {actividad.usuarios?.nombre ?? "Sin responsable"}
                                {actividad.usuarios?.cargo ? ` · ${actividad.usuarios.cargo}` : ""}
                                {(parsed.meta.tipoAccion ?? planTipoAccion(plan)) && ` · ${parsed.meta.tipoAccion ?? planTipoAccion(plan)}`}
                                {(parsed.meta.areaNombre ?? plan.areas.nombre_area) && ` · ${parsed.meta.areaNombre ?? plan.areas.nombre_area}`}
                                {actividad.fecha_fin && ` · vence ${formatDate(actividad.fecha_fin)}`}
                              </p>
                            </div>
                            <Pill tone={actividad.catalogo_detalle?.nombre === "Completado" ? "brand" : "neutral"} dot>
                              {actividad.catalogo_detalle?.nombre ?? "Pendiente"}
                            </Pill>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <InfoRow label="Descripción" value={plan.descripcion || "Sin descripción registrada."} />
                )}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-[17px] font-semibold text-ink">Descripción del reporte</h2>
              </div>
              <div className="flex flex-wrap items-start gap-4 rounded-xl border border-line-soft bg-surface/60 px-4 py-4">
                <p className="min-w-0 flex-1 text-[13.5px] leading-relaxed text-ink-soft break-words">
                  {caso.descripcion || "Sin descripción registrada."}
                </p>
                {reportEvidence.length > 0 && (
                  <div className="flex shrink-0 flex-wrap gap-2.5 border-l border-line-soft pl-4">
                    {reportEvidence.map((anexo) => (
                      <MiniaturaAnexo key={anexo.id_anexo} anexo={anexo} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
                <Microscope className="h-4.5 w-4.5" />
              </span>
              <h2 className="text-[17px] font-semibold text-ink">Investigación</h2>
            </div>
            {caso.investigacion_caso ? (
              // Se muestran los campos de la investigación con las mismas
              // etiquetas del formulario que llena Seguridad Operativa
              // (InvestigationCard), para que el jefe lea lo mismo que se
              // escribió. La descripción del evento ya no es un campo de
              // la investigación (se escribe en Evaluación) y se muestra
              // arriba, en la sección del plan.
              <div className="grid gap-2.5 md:grid-cols-2">
                <InfoTile label="Causa raíz" value={caso.investigacion_caso.causa_raiz} />
                <InfoTile
                  label="Conclusiones"
                  value={caso.investigacion_caso.conclusiones}
                  wide={!caso.investigacion_caso.observaciones}
                />
                {caso.investigacion_caso.observaciones && (
                  <InfoTile label="Observaciones" value={caso.investigacion_caso.observaciones} />
                )}
              </div>
            ) : (
              <InfoTile label="Investigación" value="La investigación del caso aún no está registrada." wide />
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
