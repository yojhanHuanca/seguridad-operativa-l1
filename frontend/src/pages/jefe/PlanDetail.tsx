import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  AlertCircle,
  AlertTriangle,
  Building2,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Check,
  ClipboardList,
  Download,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Microscope,
  Plus,
  Save,
  Timer,
  Upload,
  UserRound,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { JefeShell } from "@/components/layout/JefeShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill, RiskPill } from "@/design-system/primitives/Pill";
import { Progress } from "@/design-system/primitives/Progress";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Input, Textarea } from "@/design-system/primitives/Input";
import { parseActivityDescription } from "@/features/cases/lib/activityMeta";
import { compactPlanCodes, shortPlanCode } from "@/features/cases/lib/planLabels";
import { planEvidenceFiles as extractPlanEvidenceFiles, timelineBelongsToPlan } from "@/features/cases/lib/planEvidence";
import {
  useAcceptPlanById,
  useAddPlanEvidence,
  useCompleteExecutionByPlan,
  usePlans,
  useRequestPlanExtension,
  useUpdateActivity,
} from "@/features/plans/hooks/usePlans";
import type { RiskLevel } from "@/features/cases/domain";
import { apiErrorMessage } from "@/lib/api";
import { daysUntil, formatDate, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AnexoPlanCaso, PlanActividad, PlanItem } from "@/features/plans/types";

const ACTOR = "Jefe de Área"; // TODO(auth): usuario logueado.
const API_ORIGIN = (import.meta.env.VITE_API_URL ?? "http://localhost:3000/api").replace(/\/api\/?$/, "");
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime", "application/pdf"];
const ACCEPT = TIPOS_PERMITIDOS.join(",");
const ACCEPT_IMAGES = "image/jpeg,image/png,image/webp";
const ACCEPT_VIDEOS = "video/mp4,video/quicktime";
const ACCEPT_DOCUMENTS = "application/pdf";
const MAX_ARCHIVOS = 10;
const MAX_BYTES = 25 * 1024 * 1024;

type StatusTone = "neutral" | "brand" | "critical" | "warning" | "info" | "success";

function normalize(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function activityProgressValue(activity: PlanActividad): number {
  if (activity.porcentaje !== null && activity.porcentaje !== "") {
    const numeric = Number(activity.porcentaje);
    if (Number.isFinite(numeric)) return Math.min(100, Math.max(0, numeric));
  }

  const estado = normalize(activity.catalogo_detalle?.nombre);
  if (estado.includes("complet")) return 100;
  if (estado.includes("progreso")) return 50;
  return 0;
}

function calcProgress(plan: PlanItem): number {
  const items = plan.actividades_plan ?? [];
  if (items.length === 0) return 0;
  const total = items.reduce((acc, item) => acc + activityProgressValue(item), 0);
  return Math.round(total / items.length);
}

function planTipoAccion(plan: PlanItem): string {
  const tipo = plan.actividades_plan
    .map((actividad) => parseActivityDescription(actividad.descripcion).meta.tipoAccion)
    .find(Boolean);
  return tipo?.replace(/^Acción\s+/i, "") ?? "Correctiva";
}

function planFlow(plan: PlanItem) {
  const estadoPlan = plan.catalogo_detalle?.nombre ?? "";
  const etapaCaso = plan.casos_sop.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
  const estadoKey = normalize(estadoPlan);
  const etapaKey = normalize(etapaCaso);
  const finalizado = estadoKey.includes("finaliz");
  const cerrado = estadoKey.includes("cerrad") || etapaKey.includes("cierre");
  const rechazado = estadoKey.includes("rechaz") || etapaKey.includes("rechaz");
  const enVerificacion = etapaKey.includes("verificacion");
  const prorrogaPendiente = plan.prorroga_estado === "pendiente";
  const aceptado = estadoKey.includes("aceptad") || estadoKey.includes("ejecucion") || finalizado || estadoKey.includes("cerrad");
  const pendienteAceptacion = !aceptado && !finalizado && !cerrado && !rechazado && !enVerificacion && !prorrogaPendiente;
  const puedeTrabajar = aceptado && !finalizado && !cerrado && !rechazado && !enVerificacion && !prorrogaPendiente;
  const todasCompletadas = (plan.actividades_plan ?? []).length > 0 && plan.actividades_plan.every((a) => activityProgressValue(a) >= 100);

  return {
    estadoPlan,
    etapaCaso,
    finalizado,
    cerrado,
    rechazado,
    enVerificacion,
    prorrogaPendiente,
    aceptado,
    pendienteAceptacion,
    puedeTrabajar,
    todasCompletadas,
  };
}

function statusLabel(flow: ReturnType<typeof planFlow>): { label: string; tone: StatusTone } {
  if (flow.rechazado) return { label: "Rechazado", tone: "critical" };
  if (flow.cerrado) return { label: "Cerrado", tone: "neutral" };
  if (flow.finalizado) return { label: "En revisión SO", tone: "warning" };
  if (flow.prorrogaPendiente) return { label: "Prórroga solicitada", tone: "warning" };
  if (flow.enVerificacion) return { label: "En verificación SO", tone: "warning" };
  if (flow.aceptado) return { label: "En ejecución", tone: "brand" };
  return { label: "Pendiente de aceptación", tone: "info" };
}

function priorityInfo(plan: PlanItem): { label: string; tone: StatusTone; rank: number } {
  const riesgo = plan.casos_sop.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const text = normalize(`${riesgo?.codigo ?? ""} ${riesgo?.nombre ?? ""}`);
  const tokens = text.split(/[^a-z0-9]+/).filter(Boolean);

  if (tokens.some((t) => ["critica", "critico", "inaceptable", "extremo", "extrema"].includes(t))) return { label: "Crítica", tone: "critical", rank: 0 };
  if (tokens.some((t) => ["a", "alta", "alto"].includes(t))) return { label: "Alta", tone: "warning", rank: 1 };
  if (tokens.some((t) => ["b", "baja", "bajo"].includes(t))) return { label: "Baja", tone: "neutral", rank: 3 };
  return { label: "Media", tone: "info", rank: 2 };
}

function planStart(plan: PlanItem): string {
  return plan.actividades_plan.find((a) => a.fecha_inicio)?.fecha_inicio ?? plan.created_at ?? plan.fecha_plan;
}

function planEnd(plan: PlanItem): string {
  const ends = plan.actividades_plan
    .map((a) => a.fecha_fin)
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  return plan.fecha_reprogramada ?? ends[0] ?? plan.fecha_plan;
}

function planNumberLabel(plan: PlanItem): string {
  return shortPlanCode(plan.codigo_plan);
}

function estimatedDuration(start: string, end: string): string {
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) return "-";
  const days = Math.max(1, Math.ceil((endMs - startMs) / 86400000));
  return `${days} ${days === 1 ? "día" : "días"}`;
}

function reviewState(flow: ReturnType<typeof planFlow>): { label: string; tone: StatusTone } {
  if (flow.rechazado) return { label: "Rechazado", tone: "critical" };
  if (flow.pendienteAceptacion) return { label: "Pendiente", tone: "info" };
  return { label: "Aprobado", tone: "success" };
}

function detailStatus(flow: ReturnType<typeof planFlow>, progreso: number): { label: string; tone: StatusTone } {
  if (flow.rechazado) return { label: "Rechazado", tone: "critical" };
  if (flow.cerrado) return { label: "Cerrado", tone: "neutral" };
  if (flow.finalizado || flow.enVerificacion) return { label: "En revisión SO", tone: "warning" };
  if (flow.prorrogaPendiente) return { label: "Prórroga solicitada", tone: "warning" };
  if (progreso >= 100) return { label: "Completado", tone: "success" };
  if (flow.aceptado) return { label: "En proceso", tone: "brand" };
  return { label: "Pendiente", tone: "info" };
}

function nextActivityForProgress(plan: PlanItem): PlanActividad | null {
  return (
    plan.actividades_plan.find((actividad) => activityProgressValue(actividad) < 100) ??
    plan.actividades_plan[0] ??
    null
  );
}

function nextAutoActivityState(activity: PlanActividad): string {
  return activityProgressValue(activity) >= 50 ? "Completado" : "En progreso";
}

function executionComments(plan: PlanItem) {
  const activityComments = plan.actividades_plan
    .flatMap((actividad) =>
      (actividad.seguimientos ?? []).map((seguimiento) => ({
        id: `seg-${seguimiento.id_seguimiento}`,
        role: "jefe" as const,
        text: seguimiento.comentario ?? "Seguimiento sin comentario",
        actor: seguimiento.usuarios?.nombre ?? actividad.usuarios?.nombre ?? "Jefe de Área",
        meta: [
          parseActivityDescription(actividad.descripcion).descripcion,
          seguimiento.porcentaje ? `${seguimiento.porcentaje}%` : null,
        ].filter(Boolean).join(" · "),
        fecha: seguimiento.fecha,
      }))
    );

  const soComments = planTimeline(plan)
    .filter((evento) => evento.actor_rol === "seguridad" && evento.kind === "comentario")
    .map((evento) => ({
      id: `evt-${evento.id_evento}`,
      role: "seguridad" as const,
      text: evento.detalle ?? evento.titulo,
      actor: evento.actor || "Seguridad Operativa",
      meta: "Respuesta de Seguridad Operativa",
      fecha: evento.fecha,
    }));

  return [...activityComments, ...soComments].sort(
    (a, b) => new Date(b.fecha ?? 0).getTime() - new Date(a.fecha ?? 0).getTime()
  );
}

function eventBelongsToPlan(plan: PlanItem, evento: PlanItem["casos_sop"]["timeline_caso"][number]) {
  return timelineBelongsToPlan(evento, plan);
}

function planTimeline(plan: PlanItem) {
  return (plan.casos_sop.timeline_caso ?? []).filter((evento) => eventBelongsToPlan(plan, evento));
}

function planEvidenceFiles(plan: PlanItem): AnexoPlanCaso[] {
  return extractPlanEvidenceFiles(plan, plan.casos_sop.timeline_caso ?? [], plan.casos_sop.anexos_caso ?? []);
}

function planWeight(plan: PlanItem): number {
  const flow = planFlow(plan);
  const due = daysUntil(planEnd(plan));
  if (flow.rechazado || flow.cerrado) return 99;
  if (due < 0) return 0;
  if (flow.prorrogaPendiente) return 1;
  if (flow.pendienteAceptacion) return 2;
  if (flow.finalizado || flow.todasCompletadas) return 3;
  if (flow.aceptado) return 4;
  if (flow.enVerificacion) return 5;
  return 6;
}

function InfoRow({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="text-[14px] font-medium text-ink">{value ?? "-"}</p>
    </div>
  );
}

function SectionHeader({ icon, title, open, onToggle }: { icon: ReactNode; title: string; open: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-4 text-left">
      <span className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">{icon}</span>
        <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
      </span>
      <span className="text-ink-quiet">{open ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}</span>
    </button>
  );
}

function InfoTile({ label, value, wide }: { label: string; value?: ReactNode; wide?: boolean }) {
  return (
    <div className={cn("rounded-xl border border-line-soft bg-surface/60 px-4 py-3.5", wide && "md:col-span-2")}>
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">{label}</p>
      <div className="text-[14px] leading-relaxed text-ink">{value ?? "-"}</div>
    </div>
  );
}

function IconoArchivo({ tipo }: { tipo: string | null }) {
  if (tipo?.startsWith("image/")) return <ImageIcon className="h-4.5 w-4.5" />;
  if (tipo?.startsWith("video/")) return <Video className="h-4.5 w-4.5" />;
  return <FileText className="h-4.5 w-4.5" />;
}

function FilaAnexo({ anexo }: { anexo: AnexoPlanCaso }) {
  return (
    <a
      href={`${API_ORIGIN}${anexo.ruta_archivo ?? ""}`}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group flex items-center gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-surface",
        !anexo.ruta_archivo && "pointer-events-none opacity-60"
      )}
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-soft">
        <IconoArchivo tipo={anexo.tipo_archivo} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-ink">{anexo.nombre_archivo ?? "Archivo adjunto"}</p>
        <p className="text-[11.5px] text-ink-quiet">
          {anexo.peso ? `${anexo.peso} KB` : ""}
          {anexo.peso && anexo.fecha_subida ? " · " : ""}
          {anexo.fecha_subida ? formatDateTime(anexo.fecha_subida) : ""}
        </p>
      </div>
      <Download className="h-3.5 w-3.5 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  );
}

export function PlanDetail() {
  const { codigo = "" } = useParams<{ codigo: string }>();
  const [params] = useSearchParams();
  const idPlan = params.get("plan");
  const { data: planes, isLoading, isError } = usePlans();

  const casePlans = useMemo(
    () => (planes ?? []).filter((p) => p.casos_sop.codigo_sop === codigo),
    [planes, codigo]
  );

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

function PlanSelectionContent({ codigo, plans }: { codigo: string; plans: PlanItem[] }) {
  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => planWeight(a) - planWeight(b) || daysUntil(planEnd(a)) - daysUntil(planEnd(b))),
    [plans]
  );
  const caso = plans[0]?.casos_sop;

  return (
    <JefeShell>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link to="/jefe" className="rounded-lg p-2 hover:bg-surface-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-[26px] font-bold tracking-tight text-ink">Plan de Acción</h1>
            <p className="mt-1 text-[14px] text-ink-soft">
              Caso: <span className="font-mono">{codigo}</span>
            </p>
          </div>
        </div>
      </div>

      <Card padded={false} className="overflow-hidden border-line-soft shadow-sm">
        <div className="border-b border-line-soft bg-surface/70 px-5 py-4">
          <p className="text-[15px] font-semibold text-ink">Seleccione un plan para ver el detalle:</p>
          <p className="mt-1 line-clamp-1 text-[13.5px] text-ink-quiet">{caso?.titulo?.trim() || caso?.descripcion}</p>
        </div>
        <div className="space-y-3 p-5">
          {sortedPlans.map((plan) => (
            <PlanChoiceCard key={plan.id_plan} codigo={codigo} plan={plan} />
          ))}
        </div>
      </Card>
    </JefeShell>
  );
}

function PlanChoiceCard({ codigo, plan }: { codigo: string; plan: PlanItem }) {
  const flow = planFlow(plan);
  const status = statusLabel(flow);
  const priority = priorityInfo(plan);
  const inicio = planStart(plan);
  const fin = planEnd(plan);
  const vencido = daysUntil(fin) < 0 && !flow.finalizado && !flow.cerrado && !flow.rechazado && !flow.enVerificacion;
  const progreso = calcProgress(plan);
  const acceptPlan = useAcceptPlanById();

  return (
    <article className="rounded-xl border border-line-soft bg-white p-4 shadow-sm transition-colors hover:border-brand-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <Link
              to={`/jefe/planes/${encodeURIComponent(codigo)}?plan=${plan.id_plan}`}
              className="font-mono text-[17px] font-bold text-brand-700 transition-colors hover:text-brand-800 hover:underline"
            >
              {shortPlanCode(plan.codigo_plan)}
            </Link>
            <p className="mt-1 line-clamp-1 text-[13.5px] text-ink-quiet">{plan.descripcion}</p>
          </div>
        </div>
        <Pill tone={status.tone} dot>{status.label}</Pill>
      </div>

      <div className="mt-4 grid gap-x-8 gap-y-3 text-[13.5px] md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-2 text-ink-soft">
          <UserRound className="h-3.5 w-3.5 text-ink-faint" />
          <span>Responsable:</span>
          <span className="font-semibold text-ink">{plan.usuarios.nombre}</span>
          {plan.usuarios.cargo && <span className="text-ink-faint">· {plan.usuarios.cargo}</span>}
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <Building2 className="h-3.5 w-3.5 text-ink-faint" />
          <span>Área:</span>
          <span className="font-semibold text-ink">{plan.areas.nombre_area}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <ClipboardList className="h-3.5 w-3.5 text-ink-faint" />
          <span>Tipo:</span>
          <span className="font-semibold text-ink">{planTipoAccion(plan)}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <AlertTriangle className="h-3.5 w-3.5 text-ink-faint" />
          <span>Riesgo:</span>
          <Pill tone={priority.tone} dot>{priority.label}</Pill>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <CalendarClock className="h-3.5 w-3.5 text-ink-faint" />
          <span>Inicio:</span>
          <span className="font-medium text-ink">{formatDate(inicio)}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <Timer className="h-3.5 w-3.5 text-ink-faint" />
          <span>{vencido ? "Vencido:" : "Fin:"}</span>
          <span className={cn("font-medium", vencido ? "text-critical" : "text-ink")}>{formatDate(fin)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Progress value={progreso} className="h-2 flex-1" />
        <span className="w-12 text-right text-[12px] font-semibold text-ink-soft">{progreso}%</span>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
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

function PlanDetailContent({ plan }: { plan: PlanItem }) {
  const caso = plan.casos_sop;
  const flow = planFlow(plan);
  const limite = plan.fecha_reprogramada ?? planEnd(plan);
  const progreso = calcProgress(plan);
  const status = detailStatus(flow, progreso);
  const inicio = planStart(plan);
  const fin = planEnd(plan);
  const priority = priorityInfo(plan);
  const revision = reviewState(flow);
  const anexos = planEvidenceFiles(plan);
  const comentarios = executionComments(plan);
  const targetActivity = nextActivityForProgress(plan);
  const evidenciasBloqueadas = flow.finalizado || flow.cerrado || flow.rechazado || flow.enVerificacion || flow.prorrogaPendiente;
  const vencido = daysUntil(limite) < 0 && !flow.finalizado && !flow.cerrado && !flow.rechazado && !flow.enVerificacion;

  const acceptPlan = useAcceptPlanById();
  const completeExec = useCompleteExecutionByPlan();
  const requestExt = useRequestPlanExtension();
  const updateActivity = useUpdateActivity();
  const addEvidence = useAddPlanEvidence();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const finalDescriptionDraftKey = useMemo(() => `sigma-l1-plan-${plan.id_plan}-descripcion-cierre`, [plan.id_plan]);
  const [subiendo, setSubiendo] = useState(false);
  const [fileAccept, setFileAccept] = useState(ACCEPT);
  const [executionComment, setExecutionComment] = useState("");
  const [finalDescription, setFinalDescription] = useState("");
  const [extOpen, setExtOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ info: true, execution: true });
  const [nuevaFecha, setNuevaFecha] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [justificacion, setJustificacion] = useState("");
  const puedeFinalizar = flow.puedeTrabajar && progreso >= 100;
  const hasSaveableChanges = flow.puedeTrabajar && (executionComment.trim().length >= 3 || finalDescription.trim().length > 0);

  useEffect(() => {
    setFinalDescription(window.localStorage.getItem(finalDescriptionDraftKey) ?? "");
  }, [finalDescriptionDraftKey]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((current) => ({ ...current, [section]: !current[section] }));
  };

  const registerProgress = (comentario: string) => {
    const texto = comentario.trim();
    if (!targetActivity || !texto || !flow.puedeTrabajar) return;

    const estado = nextAutoActivityState(targetActivity);
    updateActivity.mutate(
      { id_actividad: targetActivity.id_actividad, estado, comentario: texto, actor: ACTOR },
      {
        onSuccess: () => {
          toast.success(estado === "Completado" ? "Avance completado" : "Avance registrado");
          setExecutionComment("");
        },
        onError: (err) => toast.error(apiErrorMessage(err, "No se pudo actualizar la actividad")),
      }
    );
  };

  const finalizePlan = () => {
    if (!puedeFinalizar) {
      toast.error("Completa todas las actividades antes de finalizar el plan");
      return;
    }

    const descripcion = finalDescription.trim();
    if (descripcion.length < 10) {
      toast.error("Agrega una descripción final de al menos 10 caracteres");
      return;
    }

    completeExec.mutate(
      { id_plan: plan.id_plan, actor: ACTOR, descripcion },
      {
        onSuccess: () => {
          toast.success("Plan enviado a Seguridad Operativa para revisión");
          window.localStorage.removeItem(finalDescriptionDraftKey);
          setFinalDescription("");
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo finalizar el plan")),
      }
    );
  };

  const saveChanges = () => {
    if (!flow.puedeTrabajar) {
      toast.info(flow.pendienteAceptacion ? "Acepta el plan para iniciar la ejecución" : "El estado actual no permite guardar cambios");
      return;
    }

    let saved = false;

    if (executionComment.trim().length >= 3) {
      registerProgress(executionComment);
      saved = true;
    }

    const descripcion = finalDescription.trim();
    if (descripcion) {
      window.localStorage.setItem(finalDescriptionDraftKey, descripcion);
      toast.success("Descripción final guardada como borrador");
      saved = true;
    }

    if (!saved) toast.info("No hay cambios pendientes por guardar");
  };

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
    addEvidence.mutate({ id_plan: plan.id_plan, files: lista, actor: ACTOR }, {
      onSuccess: () => toast.success(lista.length === 1 ? "Evidencia adjuntada" : `${lista.length} evidencias adjuntadas`),
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo adjuntar la evidencia")),
      onSettled: () => {
        setSubiendo(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  const openEvidencePicker = (accept: string) => {
    setFileAccept(accept);
    window.setTimeout(() => fileInputRef.current?.click(), 0);
  };

  return (
    <JefeShell>
      <div className="space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={fileAccept}
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />

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
                <h1 className="text-[24px] font-bold tracking-tight text-ink">Detalle del Plan</h1>
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

        <Card padded={false} className="overflow-hidden border-line-soft shadow-sm">
          <div className="px-5 pt-4">
            <SectionHeader
              icon={<ClipboardList className="h-4.5 w-4.5" />}
              title="Información del Plan"
              open={expandedSections.info}
              onToggle={() => toggleSection("info")}
            />
          </div>
          {expandedSections.info && (
            <div className="space-y-6 px-5 pb-5 pt-5">
              <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
                <InfoRow label="Tipo" value={planTipoAccion(plan)} />
                <InfoRow label="Elaborado por" value="No registrado" />
                <InfoRow label="Área responsable" value={plan.areas.nombre_area} />
                <InfoRow label="Inicio" value={formatDate(inicio)} />
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
                <InfoRow label="Prioridad" value={<Pill tone={priority.tone} dot>{priority.label}</Pill>} />
                <InfoRow label="Estado de revisión" value={<Pill tone={revision.tone} dot>{revision.label}</Pill>} />
                <InfoRow label="Responsable" value={plan.usuarios.nombre} />
                <InfoRow label="Fecha de envío" value={plan.created_at ? formatDate(plan.created_at) : formatDate(plan.fecha_plan)} />
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
              </div>

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
                    <Microscope className="h-4.5 w-4.5" />
                  </span>
                  <h2 className="text-[17px] font-semibold text-ink">Investigación</h2>
                </div>
                {caso.investigacion_caso ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <InfoTile label="Causa raíz" value={caso.investigacion_caso.causa_raiz} />
                    <InfoTile label="Descripción técnica" value={plan.descripcion || caso.investigacion_caso.conclusiones} />
                    <InfoTile label="Hallazgos" value={caso.investigacion_caso.hallazgos} wide />
                  </div>
                ) : (
                  <InfoTile label="Investigación" value="La investigación del caso aún no está registrada." wide />
                )}
              </div>

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
                    <ClipboardList className="h-4.5 w-4.5" />
                  </span>
                  <h2 className="text-[17px] font-semibold text-ink">Actividades del plan</h2>
                </div>
                <div className="rounded-xl border border-line-soft bg-surface/60 px-4 py-4">
                  <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                    <InfoRow label="Responsable" value={plan.usuarios.nombre} />
                    <InfoRow label="Tipo" value={planTipoAccion(plan)} />
                    <InfoRow label="Área" value={plan.areas.nombre_area} />
                    <InfoRow label="Inicio" value={formatDate(inicio)} />
                    <InfoRow label="Fin" value={formatDate(fin)} />
                  </div>
                  <div className="mt-4">
                    <InfoRow label="Descripción" value={plan.descripcion} />
                  </div>
                  {plan.observaciones && (
                    <div className="mt-5 rounded-xl border border-line-soft bg-white/70 px-4 py-3.5">
                      <InfoRow label="Observaciones" value={plan.observaciones} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card padded={false} className="overflow-hidden border-line-soft shadow-sm">
          <div className="px-5 pt-4">
            <SectionHeader
              icon={<MessageSquare className="h-4.5 w-4.5" />}
              title="Comentarios de Ejecución"
              open={expandedSections.execution}
              onToggle={() => toggleSection("execution")}
            />
          </div>
          {expandedSections.execution && (
            <div className="space-y-5 px-5 pb-5 pt-5">
              <div>
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Comentarios de ejecución</p>
                  <span className="text-[12px] font-medium text-ink-quiet">{progreso}% avance</span>
                </div>
                <Progress value={progreso} className="mb-3" />
                <div className="mb-3 space-y-2">
                  {comentarios.length > 0 ? (
                    comentarios.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "rounded-lg border px-3 py-2",
                          item.role === "seguridad" ? "border-brand-100 bg-brand-50/70" : "border-line-soft bg-surface/70"
                        )}
                      >
                        <p className="text-[13px] text-ink">{compactPlanCodes(item.text)}</p>
                        <p className="mt-1 text-[11.5px] text-ink-faint">
                          {item.actor}
                          {item.meta ? ` · ${compactPlanCodes(item.meta)}` : ""}
                          {item.fecha ? ` · ${formatDateTime(item.fecha)}` : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-lg border border-dashed border-line bg-surface px-3 py-3 text-[13px] text-ink-quiet">No hay comentarios registrados</p>
                  )}
                </div>
                <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                  <Input
                    value={executionComment}
                    disabled={!flow.puedeTrabajar || updateActivity.isPending}
                    onChange={(event) => setExecutionComment(event.target.value)}
                    placeholder={flow.puedeTrabajar ? "Agregar comentario..." : "La ejecución está bloqueada por el estado actual"}
                  />
                  <Button
                    size="md"
                    disabled={!flow.puedeTrabajar || updateActivity.isPending || executionComment.trim().length < 3}
                    onClick={() => registerProgress(executionComment)}
                  >
                    <Plus className="h-4 w-4" /> Agregar
                  </Button>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-ink-faint">
                  Evidencias de ejecución <span className="text-ink-quiet">({anexos.length})</span>
                </p>
                {anexos.length > 0 ? (
                  <div className="space-y-2">
                    {anexos.map((a) => <FilaAnexo key={a.id_anexo} anexo={a} />)}
                  </div>
                ) : (
                  <p className="rounded-lg border border-dashed border-line bg-surface px-3 py-3 text-[13px] text-ink-quiet">No hay evidencias registradas</p>
                )}
                {!evidenciasBloqueadas && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="md" disabled={subiendo} onClick={() => openEvidencePicker(ACCEPT_IMAGES)}>
                      <Upload className="h-4 w-4" /> Agregar Foto
                    </Button>
                    <Button variant="outline" size="md" disabled={subiendo} onClick={() => openEvidencePicker(ACCEPT_VIDEOS)}>
                      <Upload className="h-4 w-4" /> Agregar Video
                    </Button>
                    <Button variant="outline" size="md" disabled={subiendo} onClick={() => openEvidencePicker(ACCEPT_DOCUMENTS)}>
                      <Upload className="h-4 w-4" /> Agregar Documento
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {(flow.puedeTrabajar || flow.finalizado) && (
          <Card className={cn("border-line-soft shadow-sm", puedeFinalizar && "border-brand-100 bg-brand-50/30")}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
                    <Save className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h2 className="text-[17px] font-semibold text-ink">Cierre de ejecución</h2>
                    <p className="mt-0.5 text-[13px] text-ink-quiet">
                      Se habilita cuando todas las actividades del plan llegan al 100%.
                    </p>
                  </div>
                </div>
              </div>
              <Pill tone={puedeFinalizar ? "success" : flow.finalizado ? "warning" : "info"} dot>
                {flow.finalizado ? "En revisión SO" : puedeFinalizar ? "Listo para enviar" : `${progreso}% avance`}
              </Pill>
            </div>

            {flow.finalizado ? (
              <p className="mt-4 rounded-lg border border-warning/30 bg-warning-soft px-3 py-3 text-[13px] text-warning-ink">
                Este plan ya fue finalizado por el área y está pendiente de revisión final por Seguridad Operativa.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                <Field label="Descripción final de ejecución" required>
                  <Textarea
                    value={finalDescription}
                    onChange={(e) => setFinalDescription(e.target.value)}
                    rows={4}
                    disabled={!puedeFinalizar || completeExec.isPending}
                    placeholder={
                      puedeFinalizar
                        ? "Resume qué se ejecutó, qué evidencia se adjuntó y cualquier condición relevante para la revisión de SO."
                        : "Completa todas las actividades para habilitar el cierre del plan."
                    }
                  />
                </Field>

                <div className="rounded-xl border border-line-soft bg-white/70 px-4 py-3.5">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Evidencia final de soporte</p>
                  <p className="mt-1 text-[13px] text-ink-quiet">
                    Adjunta fotos, videos o documentos que sustenten el cierre antes de enviarlo a revisión.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="md"
                      disabled={!puedeFinalizar || subiendo}
                      onClick={() => openEvidencePicker(ACCEPT_IMAGES)}
                    >
                      <Upload className="h-4 w-4" /> Agregar Foto
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      disabled={!puedeFinalizar || subiendo}
                      onClick={() => openEvidencePicker(ACCEPT_VIDEOS)}
                    >
                      <Upload className="h-4 w-4" /> Agregar Video
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      disabled={!puedeFinalizar || subiendo}
                      onClick={() => openEvidencePicker(ACCEPT_DOCUMENTS)}
                    >
                      <Upload className="h-4 w-4" /> Agregar Documento
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                  <p className="text-[12.5px] text-ink-quiet">
                    Seguridad Operativa revisará este plan individualmente; los otros planes del SOP no se bloquean.
                  </p>
                  <Button
                    size="md"
                    disabled={!puedeFinalizar || finalDescription.trim().length < 10 || completeExec.isPending}
                    onClick={finalizePlan}
                  >
                    <Save className="h-4.5 w-4.5" /> Finalizar y enviar a SO
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        <Button
          variant={hasSaveableChanges ? "primary" : "outline"}
          size="lg"
          className="w-full"
          disabled={updateActivity.isPending || completeExec.isPending || !hasSaveableChanges}
          onClick={saveChanges}
        >
          <Save className="h-4.5 w-4.5" /> Guardar cambios
        </Button>

        {flow.finalizado && (
          <p className="rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-[13.5px] text-warning-ink">
            Plan finalizado; pendiente de revisión final de Seguridad Operativa.
          </p>
        )}
      </div>

      <Modal
        open={extOpen}
        onClose={() => setExtOpen(false)}
        title="Solicitar ampliación de plazo"
        subtitle={`${shortPlanCode(plan.codigo_plan)} · la decide Seguridad Operativa`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setExtOpen(false)}>
              Cancelar
            </Button>
            <Button
              disabled={!nuevaFecha || justificacion.trim().length < 5 || requestExt.isPending}
              onClick={() =>
                requestExt.mutate(
                  { id_plan: plan.id_plan, nueva_fecha: nuevaFecha, justificacion: justificacion.trim(), actor: ACTOR },
                  {
                    onSuccess: () => {
                      toast.success("Ampliación solicitada, pendiente de decisión de SO");
                      setExtOpen(false);
                      setJustificacion("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo solicitar la ampliación")),
                  }
                )
              }
            >
              <Timer className="h-4.5 w-4.5" /> Enviar solicitud
            </Button>
          </>
        }
      >
        <Field label="Nueva fecha propuesta" required>
          <Input type="date" value={nuevaFecha} onChange={(e) => setNuevaFecha(e.target.value)} />
        </Field>
        <Field label="Justificación" required className="mt-4">
          <Textarea
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
            rows={4}
            placeholder="Explique por qué necesita más tiempo..."
          />
        </Field>
      </Modal>
    </JefeShell>
  );
}

