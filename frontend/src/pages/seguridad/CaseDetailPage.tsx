import { useEffect, useState, type ReactNode } from "react";
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
  Timer,
  Search,
  Train,
  Download,
} from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Logo } from "@/components/brand/Logo";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Pill, StagePill } from "@/design-system/primitives/Pill";
import { WorkflowStepper, InfoRow, InfoCard } from "@/features/cases/components/CaseParts";
import { useCase } from "@/features/cases/hooks/useCase";
import { nombreSistema, useConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";
import { stageFromEstado } from "@/features/cases/domain";
import { panelForEstado, puede, siguientePaso, ACTOR_ROL_LABEL } from "@/features/cases/lib/workflow";
import { criterioAceptabilidad } from "@/features/cases/lib/sla";
import { humanEvidenceDetail } from "@/features/cases/lib/planEvidence";
import { compactPlanCodes } from "@/features/cases/lib/planLabels";
import { planDeadline } from "@/features/plans/lib/planDeadline";
import { formatDate, formatDateTime, formatTime } from "@/lib/format";
import { useCurrentSoUser } from "@/features/users/hooks/useCurrentSoUser";
import { ReceptionStage } from "./case-detail/ReceptionStage";
import { TimelinePanel } from "./case-detail/TimelinePanel";
import { PendingInfoCard } from "./case-detail/PendingInfoCard";
import { InvestigationCard } from "./case-detail/InvestigationCard";
import { PlanCard } from "./case-detail/PlanCard";
import { ExecutionSummaryCard } from "./case-detail/ExecutionSummaryCard";
import { EvidencePanel } from "./case-detail/EvidencePanel";
import type { CaseDetail } from "@/features/cases/types";
import { parseActivityDescription } from "@/features/cases/lib/activityMeta";
import { shortPlanCode } from "@/features/cases/lib/planLabels";

const mobileHeaderButtonClass =
  "h-auto min-h-8 w-full min-w-0 whitespace-normal px-2 py-1.5 text-center leading-tight sm:h-8 sm:w-auto sm:whitespace-nowrap sm:px-3 sm:py-0";

// Portado de pages/seguridad/CaseFile.tsx: cabecera + stepper + panel
// izquierdo (Información general / Evento operativo) + panel central por etapa,
// con los modales de Evidencias y Línea de tiempo.
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
  const { data: configuracion } = useConfiguracion();
  const systemName = nombreSistema(configuracion);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [exportPlanActive, setExportPlanActive] = useState(false);
  const [exportFullActive, setExportFullActive] = useState(false);

  const estado = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
  const stage = stageFromEstado(estado);
  // El panel central y las acciones disponibles salen de la máquina de estados:
  // la UI nunca ofrece una transición que el flujo no contempla en esta etapa.
  const panel = panelForEstado(estado);
  const investigacionOmitida =
    !caso.investigacion_caso &&
    ["Plan de Acción", "Ejecución", "Prórroga Solicitada", "Verificación", "Cerrado"].includes(estado);

  // Solicitud abierta: define a qué etapa vuelve el caso cuando le respondan.
  const solicitudAbierta = caso.solicitudes_informacion.find((s) => !s.respondida);
  const vuelveA = solicitudAbierta?.estado_previo ? stageFromEstado(solicitudAbierta.estado_previo) : null;

  const evento = caso.evento_caso[0]?.eventos_operativos;
  const titulo = caso.titulo?.trim() || caso.descripcion;
  const ayuda = siguientePaso(estado);
  const motivoRechazo = caso.timeline_caso.find((t) => t.kind === "rechazado")?.detalle ?? caso.observaciones;
  const puedeExportarPlan = caso.planes_accion.length > 0;
  const areasCaso = uniqueValues([
    caso.areas?.nombre_area,
    ...caso.planes_accion.map((plan) => plan.areas?.nombre_area),
  ]);

  useEffect(() => {
    if (!exportPlanActive) return;
    const cleanup = () => setExportPlanActive(false);
    window.addEventListener("afterprint", cleanup, { once: true });
    return () => window.removeEventListener("afterprint", cleanup);
  }, [exportPlanActive]);

  useEffect(() => {
    if (!exportFullActive) return;
    const cleanup = () => setExportFullActive(false);
    window.addEventListener("afterprint", cleanup, { once: true });
    return () => window.removeEventListener("afterprint", cleanup);
  }, [exportFullActive]);

  const exportarPlanAccion = () => {
    setExportPlanActive(true);
    window.setTimeout(() => window.print(), 0);
  };

  const exportarExpedienteCompleto = () => {
    setExportFullActive(true);
    window.setTimeout(() => window.print(), 0);
  };

  return (
    <SeguridadOperativaShell>
      <div className="min-w-0 max-w-full" data-plan-export-root={exportPlanActive ? "active" : "idle"} data-expediente-export-root={exportFullActive ? "active" : "idle"}>
      {puedeExportarPlan && exportPlanActive && <PlanActionPrintDocument caso={caso} systemName={systemName} />}
      {exportFullActive && <ExpedienteCompletoPrintDocument caso={caso} systemName={systemName} />}
      <div data-print-plan-screen>
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 sm:flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[18px] font-bold text-brand-700">{caso.codigo_sop}</span>
            <span className="text-ink-faint">·</span>
            <StagePill stage={stage} />
            {estado === "Prórroga Solicitada" && (
              <Pill tone="warning" dot>
                <Timer className="h-3 w-3" /> Prórroga solicitada
              </Pill>
            )}
            {investigacionOmitida && (
              <Pill tone="warning" dot>
                <AlertTriangle className="h-3 w-3" /> Investigación omitida
              </Pill>
            )}
          </div>
          <h1 className="mt-2 max-w-3xl break-words text-[20px] font-bold leading-tight tracking-tight text-ink sm:text-[22px]">{titulo}</h1>
        </div>
        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <span data-print="hide" className="grid w-full min-w-0 grid-cols-2 gap-2 min-[440px]:grid-cols-3 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-end">
          <Button variant="outline" size="sm" className={mobileHeaderButtonClass} onClick={() => setShowEvidence(true)}>
            <ImageIcon className="h-4 w-4" /> Evidencias ({caso.anexos_caso.length})
          </Button>
          <Button variant="outline" size="sm" className={mobileHeaderButtonClass} onClick={() => setShowTimeline(true)}>
            <Clock className="h-4 w-4" /> Línea de tiempo
          </Button>
          {puedeExportarPlan && (
            <Button variant="outline" size="sm" className={mobileHeaderButtonClass} onClick={exportarPlanAccion}>
              <Download className="h-4 w-4" /> Exportar Plan de Acción
            </Button>
          )}
          <Button variant="outline" size="sm" className={mobileHeaderButtonClass} onClick={exportarExpedienteCompleto}>
            <Download className="h-4 w-4" /> Exportar Expediente Completo
          </Button>
          <Link to="/seguridad/casos" className="w-full sm:w-auto">
            <Button variant="ghost" size="sm" className={mobileHeaderButtonClass}>
              <ArrowLeft className="h-4 w-4" /> Casos
            </Button>
          </Link>
          </span>
        </div>
      </div>

      <WorkflowStepper
        stage={stage}
        vuelveA={vuelveA}
        prorroga={estado === "Prórroga Solicitada"}
        investigacionOmitida={investigacionOmitida}
      />
      {ayuda && <p className="mt-2 text-[11.5px] text-ink-quiet">{ayuda}</p>}

      {/* Dos columnas */}
      <div className="mt-5 grid lg:grid-cols-[280px_minmax(0,1fr)] gap-5 items-start">
        {/* Panel izquierdo */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <InfoCard title="Información general">
            <InfoRow icon={<Building2 className="h-3.5 w-3.5" />} label="Área" value={areasCaso} />
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
          {(panel === "ejecucion" || panel === "prorroga" || panel === "verificacion" || panel === "cierre") && (
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
      </div>
      </div>
    </SeguridadOperativaShell>
  );
}

function planTipoAccion(plan: CaseDetail["planes_accion"][number]): string {
  const actividadTipo = plan.actividades_plan
    .map((actividad) => parseActivityDescription(actividad.descripcion).meta.tipoAccion)
    .find(Boolean);
  if (actividadTipo) return actividadTipo;

  const match = plan.descripcion.match(/^([^:—-]+)[:—-]/);
  return match?.[1]?.trim() || "Correctiva";
}

function planDescripcion(plan: CaseDetail["planes_accion"][number]): string {
  const raw = plan.descripcion.trim();
  const match = raw.match(/^[^:—-]+[:—-]\s*(.+)$/);
  return match?.[1]?.trim() || raw || "Sin descripción registrada";
}

function planFechaLimite(plan: CaseDetail["planes_accion"][number]): string {
  return planDeadline(plan);
}

function latestPlanLimit(caso: CaseDetail): string | null {
  const dates = caso.planes_accion
    .map(planFechaLimite)
    .filter(Boolean)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  return dates[0] ?? null;
}

function formatDateCompact(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const isDateOnly = /T00:00:00(\.000)?Z$/.test(iso) || /^\d{4}-\d{2}-\d{2}$/.test(iso);
  return d.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    ...(isDateOnly ? { timeZone: "UTC" as const } : {}),
  });
}

function uniqueValues(values: Array<string | null | undefined>): string {
  const clean = Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean) as string[]));
  return clean.length > 0 ? clean.join(", ") : "—";
}

type PlanExportRow = {
  plan: CaseDetail["planes_accion"][number];
  actividad: CaseDetail["planes_accion"][number]["actividades_plan"][number] | null;
  descripcion: string;
  tipo: string;
  responsable: string;
  area: string;
  inicio: string | null;
  limite: string;
  estado: string;
};

function buildPlanRows(caso: CaseDetail): PlanExportRow[] {
  return caso.planes_accion.flatMap((plan): PlanExportRow[] => {
    if (plan.actividades_plan.length === 0) {
      return [{
        plan,
        actividad: null,
        descripcion: planDescripcion(plan),
        tipo: planTipoAccion(plan),
        responsable: plan.usuarios.nombre,
        area: plan.areas.nombre_area,
        inicio: null,
        limite: planFechaLimite(plan),
        estado: plan.catalogo_detalle.nombre,
      }];
    }

    return plan.actividades_plan.map((actividad) => {
      const parsed = parseActivityDescription(actividad.descripcion);
      return {
        plan,
        actividad,
        descripcion: parsed.descripcion || planDescripcion(plan),
        tipo: parsed.meta.tipoAccion ?? planTipoAccion(plan),
        responsable: actividad.usuarios?.nombre ?? plan.usuarios.nombre,
        area: parsed.meta.areaNombre ?? plan.areas.nombre_area,
        inicio: actividad.fecha_inicio,
        limite: actividad.fecha_fin ?? planFechaLimite(plan),
        estado: actividad.catalogo_detalle?.nombre ?? plan.catalogo_detalle.nombre,
      };
    });
  });
}

function PlanActionPrintDocument({ caso, systemName }: { caso: CaseDetail; systemName: string }) {
  const evento = caso.evento_caso[0]?.eventos_operativos;
  const riesgo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const fechaLimite = latestPlanLimit(caso);
  const { nombre: usuarioSoNombre } = useCurrentSoUser();
  const elaboradoPor =
    caso.usuarios_casos_sop_responsable_planTousuarios?.nombre ??
    caso.usuarios_casos_sop_responsable_hallazgoTousuarios?.nombre ??
    usuarioSoNombre;
  const rows = buildPlanRows(caso);

  return (
    <section data-plan-export className="mx-auto max-w-none bg-white px-2 py-1 text-ink">
      <header className="flex items-center gap-4">
        <Logo size={48} withWordmark={false} />
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-ink">Plan de Acción — {systemName}</h1>
          <p className="text-[14px] text-ink-quiet">Línea 1 del Metro de Lima · Seguridad Operativa</p>
        </div>
      </header>

      <div className="mt-6 h-[3px] w-full bg-brand-700" />

      <section className="mt-7">
        <h2 className="border-b border-line pb-2 text-[18px] font-bold text-brand-800">Información del expediente</h2>
        <div className="mt-5 grid grid-cols-3 gap-x-10 gap-y-5">
          <PrintField label="Código" value={caso.codigo_sop} />
          <PrintField label="Tipo de incidencia" value={evento?.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?.nombre ?? "—"} />
          <PrintField label="Estación" value={evento?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre ?? "—"} />
          <PrintField label="Área encargada" value={uniqueValues(caso.planes_accion.map((plan) => plan.areas.nombre_area))} />
          <PrintField
            label="Análisis de riesgo"
            value={riesgo ? `${riesgo.codigo ?? "—"} — ${criterioAceptabilidad(riesgo.nombre, riesgo.codigo) ?? riesgo.nombre}` : "Sin evaluar"}
          />
          <PrintField label="Fecha límite" value={fechaLimite ? formatDate(fechaLimite) : "—"} />
          <PrintField label="Elaborado por" value={elaboradoPor} />
          <PrintField label="Fecha de creación" value={formatDateTime(caso.created_at)} />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="border-b border-line pb-2 text-[18px] font-bold text-brand-800">Actividades</h2>
        <table className="mt-3 w-full table-fixed border-collapse text-left text-[12px]">
          <colgroup>
            <col className="w-[8%]" />
            <col className="w-[21%]" />
            <col className="w-[13%]" />
            <col className="w-[10%]" />
            <col className="w-[13%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[11%]" />
          </colgroup>
          <thead>
            <tr className="bg-surface">
              <PrintTh>Código</PrintTh>
              <PrintTh>Actividad</PrintTh>
              <PrintTh>Responsable</PrintTh>
              <PrintTh>Tipo de acción</PrintTh>
              <PrintTh>Área responsable</PrintTh>
              <PrintTh>Inicio</PrintTh>
              <PrintTh>Límite</PrintTh>
              <PrintTh>Estado</PrintTh>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.plan.id_plan}-${row.actividad?.id_actividad ?? index}`}>
                <PrintTd className="whitespace-nowrap font-mono">{shortPlanCode(row.plan.codigo_plan)}</PrintTd>
                <PrintTd className="break-words font-semibold">{row.descripcion}</PrintTd>
                <PrintTd className="break-words">{row.responsable}</PrintTd>
                <PrintTd className="break-words">{row.tipo}</PrintTd>
                <PrintTd className="break-words">{row.area}</PrintTd>
                <PrintTd className="whitespace-nowrap">{row.inicio ? formatDateCompact(row.inicio) : "—"}</PrintTd>
                <PrintTd className="whitespace-nowrap">{row.limite ? formatDateCompact(row.limite) : "—"}</PrintTd>
                <PrintTd className="whitespace-nowrap">{row.estado}</PrintTd>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="mt-8 border-t border-line pt-4 text-[12px] text-ink-quiet">
        Documento generado por {systemName} · {formatDateTime(new Date())}
      </footer>
    </section>
  );
}

/**
 * Expediente completo: a diferencia de "Exportar Plan de Acción" (que solo
 * lleva las actividades), este documento agrega la bitácora entera del caso
 * — todo lo que se hizo desde que se creó — más los mismos planes de acción.
 * Es un botón aparte, no un reemplazo del anterior.
 */
function ExpedienteCompletoPrintDocument({ caso, systemName }: { caso: CaseDetail; systemName: string }) {
  const evento = caso.evento_caso[0]?.eventos_operativos;
  const riesgo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const estado = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
  const rows = buildPlanRows(caso);
  // Orden cronológico (más antiguo primero): en un documento formal se lee
  // como una historia, al revés de la lista en pantalla que muestra lo
  // último arriba.
  const timeline = [...caso.timeline_caso].sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0));

  return (
    <section data-expediente-export className="mx-auto max-w-none bg-white px-2 py-1 text-ink">
      <header className="flex items-center gap-4">
        <Logo size={48} withWordmark={false} />
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-ink">Expediente Completo — {systemName}</h1>
          <p className="text-[14px] text-ink-quiet">Línea 1 del Metro de Lima · Seguridad Operativa</p>
        </div>
      </header>

      <div className="mt-6 h-[3px] w-full bg-brand-700" />

      <section className="mt-7">
        <h2 className="border-b border-line pb-2 text-[18px] font-bold text-brand-800">Información del expediente</h2>
        <div className="mt-5 grid grid-cols-3 gap-x-10 gap-y-5">
          <PrintField label="Código" value={caso.codigo_sop} />
          <PrintField label="Estado actual" value={estado} />
          <PrintField label="Tipo de incidencia" value={evento?.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?.nombre ?? "—"} />
          <PrintField label="Estación" value={evento?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre ?? "—"} />
          <PrintField label="Área encargada" value={uniqueValues(caso.planes_accion.map((plan) => plan.areas.nombre_area))} />
          <PrintField
            label="Análisis de riesgo"
            value={riesgo ? `${riesgo.codigo ?? "—"} — ${criterioAceptabilidad(riesgo.nombre, riesgo.codigo) ?? riesgo.nombre}` : "Sin evaluar"}
          />
          <PrintField label="Reportante" value={caso.nombre_reportante?.trim() || "Reporte Anónimo"} />
          <PrintField label="Fecha de creación" value={formatDateTime(caso.created_at)} />
        </div>
        <div className="mt-3">
          <PrintField label="Descripción" value={caso.descripcion} />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-x-10 gap-y-5">
          <PrintField label="Peligro" value={caso.peligro?.trim() || "No registrado"} />
          <PrintField
            label="Riesgo"
            value={riesgo ? `${riesgo.codigo ?? "—"} — ${criterioAceptabilidad(riesgo.nombre, riesgo.codigo) ?? riesgo.nombre}` : "Sin evaluar"}
          />
          <PrintField label="Consecuencia" value={caso.consecuencia?.trim() || "No registrada"} />
        </div>
      </section>

      {rows.length > 0 && (
        <section className="mt-6">
          <h2 className="border-b border-line pb-2 text-[18px] font-bold text-brand-800">Planes de acción aplicados</h2>
          <table className="mt-3 w-full table-fixed border-collapse text-left text-[12px]">
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[21%]" />
              <col className="w-[13%]" />
              <col className="w-[10%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[12%]" />
              <col className="w-[11%]" />
            </colgroup>
            <thead>
              <tr className="bg-surface">
                <PrintTh>Código</PrintTh>
                <PrintTh>Actividad</PrintTh>
                <PrintTh>Responsable</PrintTh>
                <PrintTh>Tipo de acción</PrintTh>
                <PrintTh>Área responsable</PrintTh>
                <PrintTh>Inicio</PrintTh>
                <PrintTh>Límite</PrintTh>
                <PrintTh>Estado</PrintTh>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.plan.id_plan}-${row.actividad?.id_actividad ?? index}`}>
                  <PrintTd className="whitespace-nowrap font-mono">{shortPlanCode(row.plan.codigo_plan)}</PrintTd>
                  <PrintTd className="break-words font-semibold">{row.descripcion}</PrintTd>
                  <PrintTd className="break-words">{row.responsable}</PrintTd>
                  <PrintTd className="break-words">{row.tipo}</PrintTd>
                  <PrintTd className="break-words">{row.area}</PrintTd>
                  <PrintTd className="whitespace-nowrap">{row.inicio ? formatDateCompact(row.inicio) : "—"}</PrintTd>
                  <PrintTd className="whitespace-nowrap">{row.limite ? formatDateCompact(row.limite) : "—"}</PrintTd>
                  <PrintTd className="whitespace-nowrap">{row.estado}</PrintTd>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="mt-6">
        <h2 className="border-b border-line pb-2 text-[18px] font-bold text-brand-800">
          Línea de tiempo ({timeline.length} eventos)
        </h2>
        {timeline.length === 0 ? (
          <p className="mt-3 text-[12px] text-ink-quiet">Sin eventos registrados en la bitácora.</p>
        ) : (
          <table className="mt-3 w-full table-fixed border-collapse text-left text-[11.5px]">
            <colgroup>
              <col className="w-[17%]" />
              <col className="w-[16%]" />
              <col className="w-[19%]" />
              <col className="w-[48%]" />
            </colgroup>
            <thead>
              <tr className="bg-surface">
                <PrintTh>Fecha</PrintTh>
                <PrintTh>Quién</PrintTh>
                <PrintTh>Acción</PrintTh>
                <PrintTh>Detalle</PrintTh>
              </tr>
            </thead>
            <tbody>
              {timeline.map((t) => (
                <tr key={t.id_evento}>
                  <PrintTd className="break-words">{t.fecha ? formatDateTime(t.fecha) : "—"}</PrintTd>
                  <PrintTd className="break-words">
                    {ACTOR_ROL_LABEL[t.actor_rol] ?? t.actor_rol}
                    {t.actor && t.actor !== (ACTOR_ROL_LABEL[t.actor_rol] ?? t.actor_rol) ? ` · ${t.actor}` : ""}
                  </PrintTd>
                  <PrintTd className="break-words font-semibold">{compactPlanCodes(t.titulo)}</PrintTd>
                  <PrintTd className="break-words">{t.detalle ? compactPlanCodes(humanEvidenceDetail(t.detalle)) : "—"}</PrintTd>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer className="mt-8 border-t border-line pt-4 text-[12px] text-ink-quiet">
        Documento generado por {systemName} · {formatDateTime(new Date())}
      </footer>
    </section>
  );
}

function PrintField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-quiet">{label}</p>
      <p className="mt-1 text-[14px] leading-relaxed text-ink">{value}</p>
    </div>
  );
}

function PrintTh({ children }: { children: ReactNode }) {
  return <th className="border-b-2 border-ink px-2 py-2.5 text-[11px] font-bold uppercase tracking-wide text-ink">{children}</th>;
}

function PrintTd({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={`border-b border-line px-2 py-2.5 align-top text-ink ${className ?? ""}`}>{children}</td>;
}
