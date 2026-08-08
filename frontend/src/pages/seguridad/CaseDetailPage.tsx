import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User as UserIcon,
  FileText,
  Image as ImageIcon,
  Flag,
  Building2,
  AlertTriangle,
  AlertOctagon,
  Shield,
  Timer,
  Search,
  ClipboardList,
  CheckCircle2,
  Train,
  Download,
} from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Pill, StagePill } from "@/design-system/primitives/Pill";
import { WorkflowStepper, InfoRow, InfoCard } from "@/features/cases/components/CaseParts";
import { useCase } from "@/features/cases/hooks/useCase";
import { stageFromEstado } from "@/features/cases/domain";
import { panelForEstado, puede, siguientePaso } from "@/features/cases/lib/workflow";
import { fechaEvaluacion, slaDueDate, slaEstado, diasRestantes, gravedadDerivada } from "@/features/cases/lib/sla";
import { formatDate, formatDateTime, formatTime } from "@/lib/format";
import { ReceptionStage } from "./case-detail/ReceptionStage";
import { TimelinePanel } from "./case-detail/TimelinePanel";
import { ExtensionReviewCard } from "./case-detail/ExtensionReviewCard";
import { PendingInfoCard } from "./case-detail/PendingInfoCard";
import { InvestigationCard } from "./case-detail/InvestigationCard";
import { PlanCard } from "./case-detail/PlanCard";
import { ExecutionSummaryCard } from "./case-detail/ExecutionSummaryCard";
import { EvidencePanel } from "./case-detail/EvidencePanel";
import type { CaseDetail } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx: cabecera + stepper + panel
// izquierdo (Información general / Registro SOP / Evento operativo) + panel
// central por etapa, con los modales de Evidencias y Línea de tiempo.
export function CaseDetailPage() {
  const { codigo = "" } = useParams<{ codigo: string }>();
  const { data: caso, isLoading, isError } = useCase(codigo);

  if (isLoading) {
    return (
      <SeguridadOperativaShell>
        <Card className="text-center py-16">
          <p className="text-[13px] text-ink-quiet">Cargando expediente…</p>
        </Card>
      </SeguridadOperativaShell>
    );
  }

  if (isError || !caso) {
    return (
      <SeguridadOperativaShell>
        <Card className="text-center py-16">
          <p className="text-[16px] font-semibold text-ink">Expediente no encontrado</p>
          <p className="text-[13px] text-ink-quiet mt-1">El expediente {codigo} no existe o fue eliminado.</p>
          <Link to="/seguridad/casos" className="mt-4 inline-block">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" /> Volver a casos
            </Button>
          </Link>
        </Card>
      </SeguridadOperativaShell>
    );
  }

  return <CaseFileContent caso={caso} />;
}

function CaseFileContent({ caso }: { caso: CaseDetail }) {
  const [showEvidence, setShowEvidence] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const estado = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
  const stage = stageFromEstado(estado);
  // El panel central y las acciones disponibles salen de la máquina de estados:
  // la UI nunca ofrece una transición que el flujo no contempla en esta etapa.
  const panel = panelForEstado(estado);
  const riesgo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;

  // El plazo corre desde la evaluación (que es cuando se asigna el riesgo),
  // no desde el hallazgo: antes de evaluar no hay SLA que medir. Los casos
  // sembrados antes del módulo de gestión ya traen riesgo pero no tienen el
  // evento de evaluación en la bitácora; para esos se cuenta desde el hallazgo,
  // que es el mismo criterio que usa la bandeja.
  const evaluadoEl = fechaEvaluacion(caso.timeline_caso);
  const slaDesde = evaluadoEl ?? caso.fecha_hallazgo;
  const slaDue = slaDueDate(slaDesde, riesgo?.nombre);
  const sla = slaEstado(slaDue, stage);
  const dias = slaDue ? diasRestantes(slaDue) : 0;

  // Solicitud abierta: define a qué etapa vuelve el caso cuando le respondan.
  const solicitudAbierta = caso.solicitudes_informacion.find((s) => !s.respondida);
  const vuelveA = solicitudAbierta?.estado_previo ? stageFromEstado(solicitudAbierta.estado_previo) : null;

  const evento = caso.evento_caso[0]?.eventos_operativos;
  const titulo = caso.titulo?.trim() || caso.descripcion;
  const ayuda = siguientePaso(estado);
  const motivoRechazo = caso.timeline_caso.find((t) => t.kind === "rechazado")?.detalle ?? caso.observaciones;

  return (
    <SeguridadOperativaShell>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[18px] font-bold text-brand-700">{caso.codigo_sop}</span>
            <span className="text-ink-faint">·</span>
            <StagePill stage={stage} />
            {estado === "Prórroga Solicitada" && (
              <Pill tone="warning" dot>
                <Timer className="h-3 w-3" /> Prórroga solicitada
              </Pill>
            )}
          </div>
          <h1 className="mt-2 text-[22px] font-bold text-ink tracking-tight leading-tight max-w-3xl">{titulo}</h1>
        </div>
        <div className="flex items-center gap-2">
          {sla !== "done" && sla !== "ok" && sla !== "sin_sla" && (
            <Pill tone={sla === "overdue" ? "critical" : "warning"} dot>
              <Timer className="h-3 w-3" /> SLA {sla === "overdue" ? `vencido ${Math.abs(dias)}d` : `${dias}d`}
            </Pill>
          )}
          <span data-print="hide" className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowEvidence(true)}>
            <ImageIcon className="h-4 w-4" /> Evidencias ({caso.anexos_caso.length})
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowTimeline(true)}>
            <Clock className="h-4 w-4" /> Línea de tiempo
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Download className="h-4 w-4" /> Exportar PDF
          </Button>
          <Link to="/seguridad/casos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" /> Casos
            </Button>
          </Link>
          </span>
        </div>
      </div>

      <WorkflowStepper stage={stage} vuelveA={vuelveA} prorroga={estado === "Prórroga Solicitada"} />
      {ayuda && <p className="mt-2 text-[11.5px] text-ink-quiet">{ayuda}</p>}

      {/* Dos columnas */}
      <div className="mt-5 grid lg:grid-cols-[280px_1fr] gap-5 items-start">
        {/* Panel izquierdo */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <InfoCard title="Información general">
            <InfoRow icon={<Flag className="h-3.5 w-3.5" />} label="Tipo de evento" value={caso.catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?.nombre ?? "—"} />
            <InfoRow icon={<Building2 className="h-3.5 w-3.5" />} label="Área" value={caso.areas?.nombre_area ?? "—"} />
            <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Estación" value={evento?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre ?? "—"} />
            <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Ubicación" value={evento?.catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?.nombre ?? "—"} />
            <InfoRow icon={<Calendar className="h-3.5 w-3.5" />} label="Fecha" value={formatDate(evento?.fecha ?? caso.fecha_hallazgo)} />
            <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="Hora" value={evento?.hora ? formatTime(evento.hora) : "—"} />
            <InfoRow icon={<UserIcon className="h-3.5 w-3.5" />} label="Reportante" value={caso.nombre_reportante?.trim() || "Reporte Anónimo"} />
            {caso.usuarios_casos_sop_responsable_hallazgoTousuarios && (
              <InfoRow icon={<UserIcon className="h-3.5 w-3.5" />} label="Asignado a" value={caso.usuarios_casos_sop_responsable_hallazgoTousuarios.nombre} />
            )}
            <InfoRow icon={<FileText className="h-3.5 w-3.5" />} label="Creado" value={formatDateTime(caso.created_at)} />
          </InfoCard>

          <InfoCard
            title="Registro SOP"
            action={
              <Pill tone={stage === "cierre" ? "brand" : "warning"} dot>
                {estado}
              </Pill>
            }
          >
            <InfoRow icon={<FileText className="h-3.5 w-3.5" />} label="Tipo de SOP" value={caso.catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle.nombre} />
            <InfoRow icon={<Flag className="h-3.5 w-3.5" />} label="Subtipo" value={caso.catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?.nombre ?? "—"} />
            <InfoRow icon={<Building2 className="h-3.5 w-3.5" />} label="Procedencia" value={caso.catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle.nombre} />
            <InfoRow icon={<AlertTriangle className="h-3.5 w-3.5" />} label="Tipo hallazgo" value={caso.catalogo_detalle_casos_sop_tipoTocatalogo_detalle.nombre} />
            {caso.clasificacion && <InfoRow icon={<Flag className="h-3.5 w-3.5" />} label="Clasificación" value={caso.clasificacion} />}
            <InfoRow icon={<Calendar className="h-3.5 w-3.5" />} label="Fecha hallazgo" value={formatDate(caso.fecha_hallazgo)} />
            <InfoRow icon={<Calendar className="h-3.5 w-3.5" />} label="Fecha evento" value={caso.fecha_evento ? formatDate(caso.fecha_evento) : "—"} />
            <InfoRow icon={<UserIcon className="h-3.5 w-3.5" />} label="Responsable investigación" value={caso.usuarios_casos_sop_responsable_hallazgoTousuarios?.nombre ?? "—"} />
            {caso.peligro && <InfoRow icon={<AlertOctagon className="h-3.5 w-3.5" />} label="Peligro" value={caso.peligro} />}
            {caso.consecuencia && <InfoRow icon={<AlertTriangle className="h-3.5 w-3.5" />} label="Consecuencia" value={caso.consecuencia} />}
            <InfoRow
              icon={<Shield className="h-3.5 w-3.5" />}
              label="Análisis de riesgo"
              value={riesgo ? `${riesgo.codigo} — ${riesgo.nombre}` : "Sin evaluar"}
            />
            {riesgo && (
              <InfoRow
                icon={<AlertOctagon className="h-3.5 w-3.5" />}
                label={evaluadoEl ? "Gravedad · plazo desde evaluación" : "Gravedad · plazo desde hallazgo"}
                value={`${gravedadDerivada(riesgo.nombre) ?? "—"}${slaDue ? ` · vence ${formatDate(slaDue)}` : ""}`}
              />
            )}
            {caso.acr && <InfoRow icon={<FileText className="h-3.5 w-3.5" />} label="ACR" value={caso.acr} />}
            {caso.planes_accion.length > 0 && (
              <>
                <div className="h-px bg-line-soft my-1" />
                <InfoRow icon={<ClipboardList className="h-3.5 w-3.5" />} label="Plan de acción" value={caso.planes_accion[0].codigo_plan} />
                <InfoRow icon={<UserIcon className="h-3.5 w-3.5" />} label="Responsable plan" value={caso.planes_accion[0].usuarios.nombre} />
                <InfoRow icon={<Building2 className="h-3.5 w-3.5" />} label="Área plan" value={caso.planes_accion[0].areas.nombre_area} />
                <InfoRow icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Estado plan" value={caso.planes_accion[0].catalogo_detalle.nombre} />
              </>
            )}
          </InfoCard>

          {evento && (
            <InfoCard title="Evento operativo">
              <InfoRow icon={<AlertOctagon className="h-3.5 w-3.5" />} label="Tipo incidente" value={evento.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?.nombre ?? "—"} />
              {evento.catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle && (
                <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Ubicación" value={evento.catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle.nombre} />
              )}
              {evento.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle && (
                <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Lugar" value={evento.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle.nombre} />
              )}
              {evento.catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle && (
                <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="Rango horario" value={evento.catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle.nombre} />
              )}
              {evento.catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle && (
                <InfoRow icon={<Flag className="h-3.5 w-3.5" />} label="Tipo vía" value={evento.catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle.nombre} />
              )}
              {evento.catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle && (
                <InfoRow icon={<Train className="h-3.5 w-3.5" />} label="Modelo MR" value={evento.catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle.nombre} />
              )}
              {evento.catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle && (
                <InfoRow icon={<UserIcon className="h-3.5 w-3.5" />} label="Personal/Falla" value={evento.catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle.nombre} />
              )}
              {evento.catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle && (
                <InfoRow icon={<Search className="h-3.5 w-3.5" />} label="Tipo causa" value={evento.catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle.nombre} />
              )}
              {evento.catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle && (
                <InfoRow icon={<Search className="h-3.5 w-3.5" />} label="Posible causa" value={evento.catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle.nombre} />
              )}
              {evento.descripcion && <InfoRow icon={<FileText className="h-3.5 w-3.5" />} label="Descripción" value={evento.descripcion} />}
              {evento.informacion_adicional && <InfoRow icon={<FileText className="h-3.5 w-3.5" />} label="Info adicional" value={evento.informacion_adicional} />}
            </InfoCard>
          )}
        </div>

        {/* Panel central — una sola etapa activa a la vez */}
        <div>
          {(panel === "recepcion" || panel === "evaluacion") && (
            <ReceptionStage caso={caso} isRecepcion={panel === "recepcion"} />
          )}
          {panel === "pendiente_info" && <PendingInfoCard caso={caso} />}
          {panel === "investigacion" && <InvestigationCard caso={caso} />}
          {panel === "plan" && <PlanCard caso={caso} />}
          {panel === "prorroga" && <ExtensionReviewCard caso={caso} />}
          {(panel === "ejecucion" || panel === "verificacion" || panel === "cierre") && (
            <ExecutionSummaryCard caso={caso} panel={panel} />
          )}
          {panel === "rechazado" && (
            <Card>
              <p className="text-[16px] font-bold text-ink">Reporte rechazado</p>
              <p className="text-[13px] text-ink-quiet mt-1">{motivoRechazo || "Sin motivo registrado."}</p>
              <p className="text-[11.5px] text-ink-faint mt-3 pt-3 border-t border-line-soft">
                Un reporte rechazado no continúa el flujo. Queda en el histórico con su motivo y su bitácora.
              </p>
            </Card>
          )}
        </div>
      </div>

      <Modal
        open={showEvidence}
        onClose={() => setShowEvidence(false)}
        title="Evidencias"
        subtitle={`${caso.anexos_caso.length} archivos adjuntos`}
        size="md"
      >
        <EvidencePanel caso={caso} puedeAdjuntar={puede(estado, "adjuntar_evidencia")} />
      </Modal>

      <Modal
        open={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Línea de tiempo"
        subtitle={`${caso.timeline_caso.length} eventos`}
        size="lg"
      >
        <TimelinePanel caso={caso} puedeComentar={puede(estado, "comentar")} />
      </Modal>
    </SeguridadOperativaShell>
  );
}

