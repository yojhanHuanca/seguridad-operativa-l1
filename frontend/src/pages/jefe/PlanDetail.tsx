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
  FileText,
  Image as ImageIcon,
  Microscope,
  Plus,
  Save,
  Timer,
  Upload,
  Video,
  X,
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
import { compactPlanCodes, numeroDePlan, shortPlanCode } from "@/features/cases/lib/planLabels";
import { progresoPorHitos } from "@/features/cases/lib/planProgress";
import {
  evidenciasDelEvento,
  humanEvidenceDetail,
  planEvidenceFiles as extractPlanEvidenceFiles,
  timelineBelongsToPlan,
} from "@/features/cases/lib/planEvidence";
import {
  useAcceptPlanById,
  useAddPlanEvidence,
  useAddPlanUpdate,
  useCompleteExecutionByPlan,
  usePlans,
  useRemovePlanEvidence,
  useRequestPlanExtension,
} from "@/features/plans/hooks/usePlans";
import { useAddPlanComment } from "@/features/cases/hooks/useCaseActions";
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
  const flow = planFlow(plan);
  const eventos = planTimeline(plan);
  return progresoPorHitos({
    aceptado: flow.aceptado,
    finalizado: flow.finalizado || flow.cerrado || flow.enVerificacion,
    detenido: flow.rechazado,
    comentarios: eventos.filter((e) => e.kind === "comentario").length,
    evidencias: extractPlanEvidenceFiles(plan, plan.casos_sop.timeline_caso ?? [], plan.casos_sop.anexos_caso ?? []).length,
  });
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

function eventBelongsToPlan(plan: PlanItem, evento: PlanItem["casos_sop"]["timeline_caso"][number]) {
  return timelineBelongsToPlan(evento, plan);
}

function planTimeline(plan: PlanItem) {
  return (plan.casos_sop.timeline_caso ?? []).filter((evento) => eventBelongsToPlan(plan, evento));
}

/** Tope de actualizaciones que el jefe puede apilar; el backend valida lo mismo. */
const MAX_ACTUALIZACIONES = 4;

interface PlanUpdate {
  id: string;
  etiqueta: string;
  descripcion: string;
  actor: string;
  fecha: string | null;
  evidencias: AnexoPlanCaso[];
}

/**
 * Historial de actualizaciones del plan, de la más antigua a la más reciente.
 *
 * La primera es la descripción de cierre que el jefe mandó al finalizar; las
 * siguientes son las que apiló después. Todas son de solo lectura: una vez
 * enviadas no se editan ni se borran, por eso se arman desde el timeline y no
 * desde un estado editable.
 */
function planUpdates(plan: PlanItem): PlanUpdate[] {
  const anexos = plan.casos_sop.anexos_caso ?? [];
  const eventos = planTimeline(plan);

  const original = eventos
    .filter((e) => e.kind === "seguimiento" && normalize(e.titulo).includes("finalizado por el area"))
    .map((e) => ({
      id: `cierre-${e.id_evento}`,
      etiqueta: "Actualización original",
      descripcion: humanEvidenceDetail(e.detalle).replace(/^Descripción final:\s*/i, "").trim(),
      actor: e.actor || "Jefe de Área",
      fecha: e.fecha,
      evidencias: [] as AnexoPlanCaso[],
    }));

  // El timeline llega en orden descendente, así que hay que ordenar ANTES de
  // numerar: si no, la actualización más nueva quedaba etiquetada como la 1.
  // A igualdad de fecha desempata el id_evento, que sí es incremental.
  const adicionales = eventos
    .filter((e) => e.kind === "actualizacion")
    .sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0) || a.id_evento - b.id_evento)
    .map((e, i) => ({
      id: `act-${e.id_evento}`,
      etiqueta: `Actualización ${i + 1}`,
      descripcion: humanEvidenceDetail(e.detalle),
      actor: e.actor || "Jefe de Área",
      fecha: e.fecha,
      evidencias: evidenciasDelEvento(e, anexos),
    }));

  // Las evidencias que no vinieron con una actualización adicional (las que el
  // jefe subió en el cierre) pertenecen a la original: sin esto quedaban
  // guardadas pero sin mostrarse en ninguna parte de la pantalla.
  const yaAsignadas = new Set(adicionales.flatMap((a) => a.evidencias.map((x) => x.id_anexo)));
  const sueltas = extractPlanEvidenceFiles(plan, plan.casos_sop.timeline_caso ?? [], anexos).filter(
    (a) => !yaAsignadas.has(a.id_anexo)
  );

  // Solo se cuelgan del cierre real. Antes, si todavía no había cierre, se
  // fabricaba una entrada "Evidencias del plan" con una descripción inventada:
  // aparecía en el historial de lo enviado sin que se hubiera enviado nada, y
  // repetía las mismas miniaturas que ya se ven bajo los botones de carga.
  if (sueltas.length > 0 && original.length > 0) {
    original[0]!.evidencias = sueltas;
  }

  return [...original, ...adicionales];
}

interface MensajePlan {
  id: number;
  rol: "seguridad" | "jefe";
  autor: string;
  texto: string;
  fecha: string | null;
}

/**
 * Hilo de comentarios del plan, del más antiguo al más nuevo.
 *
 * Salen del timeline con `kind: "comentario"`, que es donde escriben los dos
 * lados: Seguridad Operativa desde el expediente y el jefe desde este panel.
 * El rol define de qué lado se pinta el mensaje.
 */
function planMensajes(plan: PlanItem): MensajePlan[] {
  return planTimeline(plan)
    .filter((e) => e.kind === "comentario")
    .map((e) => ({
      id: e.id_evento,
      rol: e.actor_rol === "jefe" ? ("jefe" as const) : ("seguridad" as const),
      autor: e.actor || (e.actor_rol === "jefe" ? "Jefe de Área" : "Seguridad Operativa"),
      texto: humanEvidenceDetail(e.detalle) || e.titulo,
      fecha: e.fecha,
    }))
    .sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0) || a.id - b.id);
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
      <p className="text-[14px] font-medium text-ink break-words">{value ?? "-"}</p>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  open,
  onToggle,
  extra,
}: {
  icon: ReactNode;
  title: string;
  open: boolean;
  onToggle: () => void;
  /** Contenido centrado entre el título y el chevron (p. ej. la prioridad del plan). */
  extra?: ReactNode;
}) {
  return (
    <button type="button" onClick={onToggle} className="flex w-full items-center gap-4 text-left">
      <span className="flex flex-1 items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">{icon}</span>
        <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
      </span>
      {extra && <span className="flex flex-1 justify-center">{extra}</span>}
      <span className="flex flex-1 items-center justify-end text-ink-quiet">
        {open ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
      </span>
    </button>
  );
}

function InfoTile({ label, value, wide }: { label: string; value?: ReactNode; wide?: boolean }) {
  return (
    <div className={cn("rounded-lg border border-line-soft bg-surface/60 px-3 py-2", wide && "md:col-span-2")}>
      <p className="mb-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">{label}</p>
      <div className="text-[13px] leading-snug text-ink break-words">{value ?? "-"}</div>
    </div>
  );
}

function IconoArchivo({ tipo }: { tipo: string | null }) {
  if (tipo?.startsWith("image/")) return <ImageIcon className="h-4.5 w-4.5" />;
  if (tipo?.startsWith("video/")) return <Video className="h-4.5 w-4.5" />;
  return <FileText className="h-4.5 w-4.5" />;
}

/**
 * Miniatura real del adjunto en vez del icono genérico.
 *
 * Antes toda evidencia se veía igual —un cuadradito con el icono del tipo—,
 * así que al subir una foto no se veía la foto. Ahora la imagen se muestra, el
 * video renderiza su primer fotograma con `preload="metadata"` (sin descargar
 * el archivo entero) y el PDF su primera página con el visor nativo. Si algo
 * no carga, cae al icono de siempre.
 *
 * El contenido va con `pointer-events-none` para que el clic siga yendo al
 * enlace que abre el archivo completo.
 */
function VistaPreviaAnexo({ anexo }: { anexo: AnexoPlanCaso }) {
  const [falloCarga, setFalloCarga] = useState(false);
  const url = anexo.ruta_archivo ? `${API_ORIGIN}${anexo.ruta_archivo}` : "";
  const tipo = anexo.tipo_archivo ?? "";
  const puedePrevisualizar = !!url && !falloCarga;

  const marco = "grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-2 text-ink-soft";

  if (puedePrevisualizar && tipo.startsWith("image/")) {
    return (
      <div className={marco}>
        <img src={url} alt={anexo.nombre_archivo ?? "Evidencia"} loading="lazy" onError={() => setFalloCarga(true)} className="h-full w-full object-cover" />
      </div>
    );
  }

  if (puedePrevisualizar && tipo.startsWith("video/")) {
    return (
      <div className={marco}>
        <video src={url} muted playsInline preload="metadata" onError={() => setFalloCarga(true)} className="pointer-events-none h-full w-full object-cover" />
      </div>
    );
  }

  if (puedePrevisualizar && tipo === "application/pdf") {
    return (
      <div className={marco}>
        {/* El visor nativo se escala para que entre la primera página. */}
        <iframe
          src={`${url}#toolbar=0&navpanes=0&view=FitH`}
          title={anexo.nombre_archivo ?? "Documento"}
          tabIndex={-1}
          className="pointer-events-none h-[224px] w-[224px] origin-top-left scale-[0.25] border-0 bg-white"
        />
      </div>
    );
  }

  return (
    <div className={marco}>
      <IconoArchivo tipo={anexo.tipo_archivo} />
    </div>
  );
}

/**
 * Versión compacta de la evidencia: solo la miniatura, para mostrarla en fila
 * debajo de los botones de carga sin que la tarjeta crezca a lo alto.
 */
function MiniaturaAnexo({
  anexo,
  onQuitar,
  quitando,
}: {
  anexo: AnexoPlanCaso;
  /** Si viene, se muestra la × para descartar la evidencia. */
  onQuitar?: () => void;
  quitando?: boolean;
}) {
  return (
    <div className="relative">
      <a
        href={`${API_ORIGIN}${anexo.ruta_archivo ?? ""}`}
        target="_blank"
        rel="noreferrer"
        title={anexo.nombre_archivo ?? "Archivo adjunto"}
        className={cn(
          "block rounded-lg ring-1 ring-line-soft transition-shadow hover:ring-brand-300",
          !anexo.ruta_archivo && "pointer-events-none opacity-60"
        )}
      >
        <VistaPreviaAnexo anexo={anexo} />
      </a>

      {/* Solo aparece mientras la evidencia todavía se puede descartar; una vez
          enviada a SO el adjunto queda bloqueado igual que la descripción. */}
      {onQuitar && (
        <button
          type="button"
          onClick={onQuitar}
          disabled={quitando}
          title={`Quitar ${anexo.nombre_archivo ?? "evidencia"}`}
          aria-label={`Quitar ${anexo.nombre_archivo ?? "evidencia"}`}
          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white text-ink-quiet shadow ring-1 ring-line transition-colors hover:bg-critical hover:text-white disabled:opacity-50"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
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
    () =>
      [...plans].sort(
        (a, b) =>
          planWeight(a) - planWeight(b) ||
          daysUntil(planEnd(a)) - daysUntil(planEnd(b)) ||
          (numeroDePlan(a.codigo_plan) ?? 0) - (numeroDePlan(b.codigo_plan) ?? 0)
      ),
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
          <p className="mt-1 line-clamp-1 break-all text-[13.5px] text-ink-quiet">{caso?.titulo?.trim() || caso?.descripcion}</p>
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
            <p className="mt-1 line-clamp-1 break-all text-[13.5px] text-ink-quiet">{plan.descripcion}</p>
          </div>
        </div>
        <Pill tone={status.tone} dot>{status.label}</Pill>
      </div>

      <div className="mt-4 grid gap-x-8 gap-y-3 text-[13.5px] md:grid-cols-2 xl:grid-cols-4">
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
  const actualizaciones = planUpdates(plan);
  // Lo adjuntado al plan que todavía no forma parte de una actualización
  // adicional: es lo que el jefe acaba de subir en el formulario de cierre.
  const evidenciasDelCierre = extractPlanEvidenceFiles(
    plan,
    plan.casos_sop.timeline_caso ?? [],
    plan.casos_sop.anexos_caso ?? []
  );
  const mensajes = planMensajes(plan);
  const registrosEnviados = actualizaciones.filter((a) => a.etiqueta !== "Actualización original");
  const adicionales = registrosEnviados.length;
  const puedeAgregarActualizacion = flow.finalizado && registrosEnviados.length < MAX_ACTUALIZACIONES;
  const vencido = daysUntil(limite) < 0 && !flow.finalizado && !flow.cerrado && !flow.rechazado && !flow.enVerificacion;

  const acceptPlan = useAcceptPlanById();
  const completeExec = useCompleteExecutionByPlan();
  const requestExt = useRequestPlanExtension();
  const addEvidence = useAddPlanEvidence();
  const addUpdate = useAddPlanUpdate();
  const removeEvidence = useRemovePlanEvidence();
  const addPlanComment = useAddPlanComment(caso.codigo_sop);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const finalDescriptionDraftKey = useMemo(() => `sigma-l1-plan-${plan.id_plan}-descripcion-cierre`, [plan.id_plan]);
  const [subiendo, setSubiendo] = useState(false);
  const [fileAccept, setFileAccept] = useState(ACCEPT);
  const [finalDescription, setFinalDescription] = useState("");
  const [comentarioCierre, setComentarioCierre] = useState("");
  const [historialAbierto, setHistorialAbierto] = useState(true);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateFiles, setUpdateFiles] = useState<File[]>([]);
  const [updateAccept, setUpdateAccept] = useState(ACCEPT);
  const updateFileRef = useRef<HTMLInputElement>(null);
  const [extOpen, setExtOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ info: true, execution: true });
  const [nuevaFecha, setNuevaFecha] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [justificacion, setJustificacion] = useState("");
  // Ya no se exige 100% de avance: el cliente indicó que un plan puede
  // ejecutarse y finalizarse el mismo día, así que el cierre depende solo del
  // estado del flujo y de que haya una descripción.
  const puedeFinalizar = flow.puedeTrabajar;
  const hasSaveableChanges = flow.puedeTrabajar && finalDescription.trim().length > 0;

  useEffect(() => {
    setFinalDescription(window.localStorage.getItem(finalDescriptionDraftKey) ?? "");
  }, [finalDescriptionDraftKey]);

  const openUpdatePicker = (accept: string) => {
    setUpdateAccept(accept);
    window.setTimeout(() => updateFileRef.current?.click(), 0);
  };

  const cerrarActualizacion = () => {
    setUpdateOpen(false);
    setUpdateDescription("");
    setUpdateFiles([]);
  };

  const quitarEvidencia = (anexo: AnexoPlanCaso) => {
    removeEvidence.mutate(
      { id_plan: plan.id_plan, id_anexo: anexo.id_anexo, actor: plan.usuarios?.nombre ?? ACTOR },
      {
        onSuccess: () => toast.success(`Se quitó ${anexo.nombre_archivo ?? "la evidencia"}`),
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo quitar la evidencia")),
      }
    );
  };

  const enviarComentario = () => {
    const texto = comentarioCierre.trim();
    if (!texto) {
      toast.error("Escribe un comentario antes de enviar.");
      return;
    }

    addPlanComment.mutate(
      { id_plan: plan.id_plan, texto, rol: "jefe", actor: plan.usuarios?.nombre ?? ACTOR },
      {
        onSuccess: () => {
          toast.success("Comentario enviado a Seguridad Operativa");
          setComentarioCierre("");
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo enviar el comentario")),
      }
    );
  };

  const enviarActualizacion = () => {
    addUpdate.mutate(
      {
        id_plan: plan.id_plan,
        descripcion: updateDescription.trim(),
        files: updateFiles,
        actor: plan.usuarios?.nombre ?? "Jefe de Área",
      },
      {
        onSuccess: () => {
          toast.success("Actualización registrada y bloqueada");
          cerrarActualizacion();
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo registrar la actualización")),
      }
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((current) => ({ ...current, [section]: !current[section] }));
  };


  const finalizePlan = () => {
    if (!puedeFinalizar) {
      toast.error("El estado actual del plan no permite finalizarlo");
      return;
    }

    const descripcion = finalDescription.trim();
    if (descripcion.length < 10) {
      toast.error("Agrega una descripción final de al menos 10 caracteres");
      return;
    }

    completeExec.mutate(
      { id_plan: plan.id_plan, actor: ACTOR, descripcion, comentario: comentarioCierre.trim() || undefined },
      {
        onSuccess: () => {
          toast.success("Plan enviado a Seguridad Operativa para revisión");
          window.localStorage.removeItem(finalDescriptionDraftKey);
          setFinalDescription("");
          setComentarioCierre("");
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
              extra={
                <Pill tone={priority.tone} dot>
                  {priority.label}
                </Pill>
              }
            />
          </div>
          {expandedSections.info && (
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
                                <p className="text-[14px] leading-relaxed text-ink break-words">
                                  {parsed.descripcion || plan.descripcion || "Sin descripción registrada."}
                                </p>
                                <p className="mt-1 text-[11px] text-ink-quiet">
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
                      Describa lo ejecutado y adjunte la evidencia que lo sustente.
                    </p>
                  </div>
                </div>
              </div>
              <Pill tone={flow.finalizado ? "warning" : "success"} dot>
                {flow.finalizado ? "En revisión SO" : "Listo para enviar"}
              </Pill>
            </div>

            {flow.finalizado ? (
              <div className="mt-4 rounded-lg border border-warning/30 bg-warning-soft px-3 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[13px] text-warning-ink">
                    Este plan ya fue finalizado por el área y está pendiente de revisión final por Seguridad Operativa.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!puedeAgregarActualizacion}
                    onClick={() => setUpdateOpen(true)}
                  >
                    <Plus className="h-4 w-4" /> Nueva actualización
                  </Button>
                </div>
                {!puedeAgregarActualizacion && (
                  <p className="mt-2 text-[12px] text-warning-ink/80">
                    Ya se alcanzó el límite de actualizaciones adicionales para este plan.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {/* Opcional y solo en el cierre original: las actualizaciones
                    posteriores llevan únicamente descripción y evidencias. */}
                {/* Una sola línea y sin repetir "opcional" en label, hint y
                    placeholder: ocupaba tres veces el espacio que necesita. */}
                <Field label="Comentario (opcional)">
                  {/* Hilo arriba y caja de escritura abajo, como un chat. El
                      alto está acotado con scroll propio para que la
                      conversación no empuje al resto del formulario. */}
                  {mensajes.length > 0 && (
                    <div className="mb-2 max-h-36 space-y-1.5 overflow-y-auto rounded-lg border border-line-soft bg-surface/60 p-2">
                      {mensajes.map((m) => (
                        <div
                          key={m.id}
                          className={cn(
                            "rounded-md px-2.5 py-1.5",
                            m.rol === "seguridad" ? "bg-brand-50 ring-1 ring-brand-100" : "bg-white ring-1 ring-line-soft"
                          )}
                        >
                          <p className="text-[12.5px] leading-snug text-ink">{compactPlanCodes(m.texto)}</p>
                          <p className="mt-0.5 text-[10.5px] text-ink-faint">
                            {m.rol === "seguridad" ? "Seguridad Operativa" : m.autor}
                            {m.fecha ? ` · ${formatDateTime(m.fecha)}` : ""}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      value={comentarioCierre}
                      onChange={(e) => setComentarioCierre(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && comentarioCierre.trim()) enviarComentario();
                      }}
                      disabled={addPlanComment.isPending}
                      placeholder="Escriba un comentario para Seguridad Operativa"
                      className="flex-1"
                    />
                    <Button size="md" disabled={!comentarioCierre.trim() || addPlanComment.isPending} onClick={enviarComentario}>
                      <Plus className="h-4 w-4" /> Agregar
                    </Button>
                  </div>
                </Field>



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

                  {/* Lo ya adjuntado, en fila y compacto: al subir varias no
                      crece hacia abajo, se acomodan una al lado de la otra. */}
                  {evidenciasDelCierre.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {evidenciasDelCierre.map((a) => (
                        <MiniaturaAnexo
                          key={a.id_anexo}
                          anexo={a}
                          quitando={removeEvidence.isPending}
                          onQuitar={() => quitarEvidencia(a)}
                        />
                      ))}
                    </div>
                  )}
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

        {/* Incluye el cierre original, no solo las adicionales: el jefe tiene
            que poder releer lo que envio antes de agregar una correccion. */}
        {actualizaciones.length > 0 && (
          <Card className="border-line-soft shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="text-[17px] font-semibold text-ink">Historial enviado</h2>
                  <p className="mt-0.5 text-[13px] text-ink-quiet">
                    Las descripciones ya enviadas quedan bloqueadas; cualquier corrección se agrega como nuevo registro.
                  </p>
                </div>
              </div>

              {/* El historial puede llegar a cinco registros con sus evidencias:
                  se puede plegar para no empujar el resto de la pantalla. */}
              <button
                type="button"
                onClick={() => setHistorialAbierto((v) => !v)}
                aria-expanded={historialAbierto}
                aria-label={historialAbierto ? "Ocultar historial" : "Mostrar historial"}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {historialAbierto ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {historialAbierto && (
            <div className="mt-4 space-y-3">
              {actualizaciones.map((registro) => (
                <div key={registro.id} className="rounded-xl border border-line-soft bg-surface/50 px-4 py-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-ink">{registro.etiqueta}</p>
                    <span className="text-[12px] text-ink-faint">
                      {registro.fecha ? formatDate(registro.fecha) : "Sin fecha"}
                    </span>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-ink break-words">
                    {registro.descripcion || "Sin descripción registrada."}
                  </p>
                  {registro.evidencias.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {registro.evidencias.map((anexo) => (
                        <MiniaturaAnexo key={anexo.id_anexo} anexo={anexo} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}
          </Card>
        )}


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

      <Modal
        open={updateOpen}
        onClose={cerrarActualizacion}
        title="Agregar nueva actualización"
        subtitle={`${shortPlanCode(plan.codigo_plan)} · quedan ${MAX_ACTUALIZACIONES - adicionales} de ${MAX_ACTUALIZACIONES}`}
        footer={
          <>
            <Button variant="ghost" onClick={cerrarActualizacion}>
              Cancelar
            </Button>
            <Button
              disabled={updateDescription.trim().length < 10 || addUpdate.isPending}
              onClick={enviarActualizacion}
            >
              <Save className="h-4.5 w-4.5" /> Registrar actualización
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Advertencia obligatoria antes de crear cada actualización. */}
          <p className="rounded-lg border border-warning/30 bg-warning-soft px-3 py-3 text-[13px] text-warning-ink">
            La información ya registrada no podrá modificarse. Esta actualización se agrega al mismo plan{" "}
            {shortPlanCode(plan.codigo_plan)} y, una vez enviada, también quedará bloqueada.
          </p>

          <Field label="Descripción de la actualización" required>
            <Textarea
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              rows={4}
              disabled={addUpdate.isPending}
              placeholder="Describa la información que agrega sobre la ejecución de este plan."
            />
          </Field>

          <div className="rounded-xl border border-line-soft bg-white/70 px-4 py-3.5">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Evidencias de esta actualización</p>
            <p className="mt-1 text-[13px] text-ink-quiet">
              Se guardan junto a este nuevo registro; las evidencias anteriores no se modifican.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="md"
                disabled={addUpdate.isPending || updateFiles.length >= MAX_ARCHIVOS}
                onClick={() => openUpdatePicker(ACCEPT_IMAGES)}
              >
                <Upload className="h-4 w-4" /> Agregar Foto
              </Button>
              <Button
                variant="outline"
                size="md"
                disabled={addUpdate.isPending || updateFiles.length >= MAX_ARCHIVOS}
                onClick={() => openUpdatePicker(ACCEPT_VIDEOS)}
              >
                <Upload className="h-4 w-4" /> Agregar Video
              </Button>
              <Button
                variant="outline"
                size="md"
                disabled={addUpdate.isPending || updateFiles.length >= MAX_ARCHIVOS}
                onClick={() => openUpdatePicker(ACCEPT_DOCUMENTS)}
              >
                <Upload className="h-4 w-4" /> Agregar Documento
              </Button>
            </div>
            {updateFiles.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {updateFiles.map((file, index) => (
                  <li
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-surface/70 px-3 py-2 text-[12.5px] text-ink"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      className="shrink-0 text-[11.5px] font-medium text-critical hover:underline"
                      onClick={() => setUpdateFiles((prev) => prev.filter((_, idx) => idx !== index))}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </Modal>

      <input
        ref={updateFileRef}
        type="file"
        multiple
        accept={updateAccept}
        className="hidden"
        onChange={(e) => {
          setUpdateFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
          e.target.value = "";
        }}
      />

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

