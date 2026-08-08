import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  AlertCircle,
  AlertTriangle,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  Image as ImageIcon,
  Lock,
  MessageSquare,
  Microscope,
  Paperclip,
  Send,
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
import { Field, Input, Select, Textarea } from "@/design-system/primitives/Input";
import { useAddCaseEvidence } from "@/features/cases/hooks/useCaseActions";
import {
  useAcceptPlanById,
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
const MAX_ARCHIVOS = 10;
const MAX_BYTES = 25 * 1024 * 1024;

type StatusTone = "neutral" | "brand" | "critical" | "warning" | "info" | "success";

function normalize(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function InfoRow({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div>
      <p className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint mb-1">{label}</p>
      <p className="text-[14px] font-medium text-ink">{value ?? "-"}</p>
    </div>
  );
}

function SidebarRow({ icon, label, value }: { icon: ReactNode; label: string; value?: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-ink-faint shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">{label}</p>
        <p className="text-[13.5px] font-medium text-ink mt-0.5 break-words">{value ?? "-"}</p>
      </div>
    </div>
  );
}

function calcProgress(p: PlanItem): number {
  const items = p.actividades_plan ?? [];
  if (items.length === 0) return 0;
  const total = items.reduce((acc, it) => {
    const state = normalize(it.catalogo_detalle?.nombre);
    if (state.includes("complet")) return acc + 100;
    if (state.includes("progreso")) return acc + 50;
    return acc;
  }, 0);
  return Math.round(total / items.length);
}

function planFlow(plan: PlanItem) {
  const estadoPlan = plan.catalogo_detalle?.nombre ?? "";
  const etapaCaso = plan.casos_sop.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
  const estadoKey = normalize(estadoPlan);
  const etapaKey = normalize(etapaCaso);
  const cerrado = estadoKey.includes("cerrad") || etapaKey.includes("cierre");
  const rechazado = estadoKey.includes("rechaz") || etapaKey.includes("rechaz");
  const enVerificacion = etapaKey.includes("verificacion");
  const prorrogaPendiente = plan.prorroga_estado === "pendiente";
  const aceptado = estadoKey.includes("aceptad");
  const pendienteAceptacion = !aceptado && !cerrado && !rechazado && !enVerificacion && !prorrogaPendiente;
  const puedeTrabajar = aceptado && !cerrado && !rechazado && !enVerificacion && !prorrogaPendiente;
  const todasCompletadas =
    (plan.actividades_plan ?? []).length > 0 &&
    plan.actividades_plan.every((a) => normalize(a.catalogo_detalle?.nombre).includes("complet"));

  return {
    estadoPlan,
    etapaCaso,
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

function statusLabel(flow: ReturnType<typeof planFlow>) {
  if (flow.rechazado) return { label: "Rechazado", tone: "critical" as StatusTone };
  if (flow.cerrado) return { label: "Cerrado", tone: "neutral" as StatusTone };
  if (flow.prorrogaPendiente) return { label: "Prórroga solicitada", tone: "warning" as StatusTone };
  if (flow.enVerificacion) return { label: "En verificación SO", tone: "warning" as StatusTone };
  if (flow.aceptado) return { label: "En ejecución", tone: "brand" as StatusTone };
  return { label: "Pendiente de aceptación", tone: "info" as StatusTone };
}

function activityTone(estado?: string | null): StatusTone {
  const key = normalize(estado);
  if (key.includes("complet")) return "success";
  if (key.includes("progreso")) return "brand";
  return "neutral";
}

function dueCopy(fecha: string, locked: boolean) {
  const days = daysUntil(fecha);
  if (locked) return `Fecha límite ${formatDate(fecha)}`;
  if (days < 0) return `Vencido hace ${Math.abs(days)} d`;
  if (days === 0) return "Vence hoy";
  if (days === 1) return "Vence mañana";
  return `Vence en ${days} d`;
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

function planWeight(plan: PlanItem): number {
  const flow = planFlow(plan);
  const due = daysUntil(planEnd(plan));
  if (flow.rechazado || flow.cerrado) return 99;
  if (due < 0) return 0;
  if (flow.prorrogaPendiente) return 1;
  if (flow.pendienteAceptacion) return 2;
  if (flow.todasCompletadas && flow.aceptado && !flow.enVerificacion) return 3;
  if (flow.aceptado) return 4;
  if (flow.enVerificacion) return 5;
  return 6;
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
        "flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-surface transition-colors group",
        !anexo.ruta_archivo && "pointer-events-none opacity-60"
      )}
    >
      <div className="h-10 w-10 rounded-lg bg-surface-2 text-ink-soft grid place-items-center shrink-0">
        <IconoArchivo tipo={anexo.tipo_archivo} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-ink truncate">{anexo.nombre_archivo ?? "Archivo adjunto"}</p>
        <p className="text-[11.5px] text-ink-quiet">
          {anexo.peso ? `${anexo.peso} KB` : ""}
          {anexo.peso && anexo.fecha_subida ? " · " : ""}
          {anexo.fecha_subida ? formatDateTime(anexo.fecha_subida) : ""}
        </p>
      </div>
      <Download className="h-3.5 w-3.5 text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

export function PlanDetail() {
  const { codigo = "" } = useParams<{ codigo: string }>();
  const [params] = useSearchParams();
  const idPlan = params.get("plan");
  const { data: planes, isLoading } = usePlans();

  const casePlans = useMemo(
    () => (planes ?? []).filter((p) => p.casos_sop.codigo_sop === codigo),
    [planes, codigo]
  );
  const plan = idPlan ? casePlans.find((p) => String(p.id_plan) === idPlan) : null;

  if (isLoading) {
    return (
      <JefeShell>
        <Card className="p-8 text-center text-[14px] text-ink-quiet">Cargando planes...</Card>
      </JefeShell>
    );
  }

  if (casePlans.length === 0) {
    return (
      <JefeShell>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <Link to="/jefe" className="rounded-lg p-2 hover:bg-surface-2">
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <h1 className="text-[24px] font-bold tracking-tight text-ink">Reporte no encontrado</h1>
          </div>
          <Card className="p-6 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-critical" />
            <p className="text-[14px] text-ink-soft">No hay planes de acción asignados para el SOP solicitado.</p>
          </Card>
        </div>
      </JefeShell>
    );
  }

  if (!idPlan) {
    return <PlanSelectionContent codigo={codigo} plans={casePlans} />;
  }

  if (!plan) {
    return (
      <JefeShell>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <Link to={`/jefe/planes/${encodeURIComponent(codigo)}`} className="rounded-lg p-2 hover:bg-surface-2">
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <h1 className="text-[24px] font-bold tracking-tight text-ink">Plan no encontrado</h1>
          </div>
          <Card className="p-6 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-critical" />
            <p className="text-[14px] text-ink-soft">El plan de acción solicitado no pertenece a este SOP.</p>
          </Card>
        </div>
      </JefeShell>
    );
  }

  return <PlanDetailContent plan={plan} />;
}

function PlanSelectionContent({ codigo, plans }: { codigo: string; plans: PlanItem[] }) {
  const caso = plans[0].casos_sop;
  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => planWeight(a) - planWeight(b) || daysUntil(planEnd(a)) - daysUntil(planEnd(b))),
    [plans]
  );

  return (
    <JefeShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            to="/jefe"
            className="rounded-xl p-2 text-ink-quiet transition-all hover:bg-surface-2 hover:text-ink hover:shadow-sm"
            aria-label="Volver a mis planes"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-[24px] font-bold tracking-tight text-ink">Plan de Acción</h1>
            <p className="mt-1 text-[13px] text-ink-soft">Caso: <span className="font-mono">{codigo}</span></p>
          </div>
        </div>

        <Card padded={false} className="overflow-hidden border-line-soft shadow-sm">
          <div className="border-b border-line-soft bg-surface/70 px-5 py-4">
            <p className="text-[14px] font-semibold text-ink">Seleccione un plan para ver el detalle:</p>
            <p className="mt-1 line-clamp-1 text-[13px] text-ink-quiet">{caso.titulo?.trim() || caso.descripcion}</p>
          </div>
          <div className="space-y-3 p-5">
            {sortedPlans.map((plan) => (
              <PlanChoiceCard key={plan.id_plan} codigo={codigo} plan={plan} />
            ))}
          </div>
        </Card>
      </div>
    </JefeShell>
  );
}

function PlanChoiceCard({ codigo, plan }: { codigo: string; plan: PlanItem }) {
  const flow = planFlow(plan);
  const status = statusLabel(flow);
  const priority = priorityInfo(plan);
  const acceptPlan = useAcceptPlanById();
  const inicio = planStart(plan);
  const fin = planEnd(plan);
  const vencido = daysUntil(fin) < 0 && !flow.cerrado && !flow.rechazado && !flow.enVerificacion;
  const progreso = calcProgress(plan);

  return (
    <article className="rounded-xl border border-line-soft bg-white p-4 transition-all hover:border-line-strong hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-brand-200 bg-brand-50 text-brand-700">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <Link
              to={`/jefe/planes/${encodeURIComponent(codigo)}?plan=${plan.id_plan}`}
              className="font-mono text-[16px] font-bold text-brand-700 transition-colors hover:text-brand-800 hover:underline"
            >
              {plan.codigo_plan}
            </Link>
            <p className="mt-1 line-clamp-1 text-[13px] text-ink-quiet">{plan.descripcion}</p>
          </div>
        </div>
        <Pill tone={status.tone} dot>{status.label}</Pill>
      </div>

      <div className="mt-4 grid gap-x-8 gap-y-3 text-[13px] md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-2 text-ink-soft">
          <UserRound className="h-3.5 w-3.5 text-ink-faint" />
          <span>Responsable:</span>
          <span className="font-semibold text-ink">{plan.usuarios.nombre}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <Building2 className="h-3.5 w-3.5 text-ink-faint" />
          <span>Área:</span>
          <span className="font-semibold text-ink">{plan.areas.nombre_area}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <ClipboardList className="h-3.5 w-3.5 text-ink-faint" />
          <span>Tipo:</span>
          <span className="font-semibold text-ink">Acción correctiva</span>
        </div>
        <div className="flex items-center gap-2">
          <Pill tone={priority.tone} dot>{priority.label}</Pill>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <CalendarClock className="h-3.5 w-3.5 text-ink-faint" />
          <span>Inicio:</span>
          <span className="font-medium text-ink">{formatDate(inicio)}</span>
        </div>
        <div className={cn("flex items-center gap-2", vencido ? "font-semibold text-critical" : "text-ink-soft")}>
          {vencido && <AlertCircle className="h-3.5 w-3.5" />}
          <span>Fin:</span>
          <span>{formatDate(fin)}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <span>Actividades:</span>
          <span className="font-semibold text-ink">{plan.actividades_plan.length}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-soft">
          <span>Avance:</span>
          <span className="font-semibold text-ink">{progreso}%</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-line-soft pt-3">
        {flow.pendienteAceptacion && (
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
            <Check className="h-4.5 w-4.5" /> Aceptar plan de acción
          </Button>
        )}
        <Link
          to={`/jefe/planes/${encodeURIComponent(codigo)}?plan=${plan.id_plan}`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-white px-3 text-[13.5px] font-medium text-ink transition-colors hover:bg-surface-2 hover:border-ink-faint"
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
  const status = statusLabel(flow);
  const limite = plan.fecha_reprogramada ?? plan.fecha_plan;
  const progreso = calcProgress(plan);
  const anexos = caso.anexos_caso ?? [];
  const evidenciasBloqueadas = flow.cerrado || flow.rechazado || flow.enVerificacion || flow.prorrogaPendiente;
  const vencido = daysUntil(limite) < 0 && !flow.cerrado && !flow.rechazado && !flow.enVerificacion;

  const acceptPlan = useAcceptPlanById();
  const completeExec = useCompleteExecutionByPlan();
  const requestExt = useRequestPlanExtension();
  const updateActivity = useUpdateActivity();
  const addEvidence = useAddCaseEvidence(caso.codigo_sop);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [activityDrafts, setActivityDrafts] = useState<Record<number, string>>({});
  const [extOpen, setExtOpen] = useState(false);
  const [nuevaFecha, setNuevaFecha] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [justificacion, setJustificación] = useState("");

  const updateDraft = (id: number, value: string) => {
    setActivityDrafts((current) => ({ ...current, [id]: value }));
  };

  const submitActivity = (actividad: PlanActividad, estado: string, comentario?: string) => {
    const texto = (comentario ?? activityDrafts[actividad.id_actividad] ?? "").trim();
    updateActivity.mutate(
      {
        id_actividad: actividad.id_actividad,
        estado,
        comentario: texto || undefined,
        actor: ACTOR,
      },
      {
        onSuccess: () => {
          toast.success(texto ? "Seguimiento registrado" : "Actividad actualizada");
          if (texto) updateDraft(actividad.id_actividad, "");
        },
        onError: (err) => toast.error(apiErrorMessage(err, "No se pudo actualizar la actividad")),
      }
    );
  };

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const lista = Array.from(files);

    if (lista.length > MAX_ARCHIVOS) {
      toast.error(`Maximo ${MAX_ARCHIVOS} archivos por vez.`);
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
    addEvidence.mutate(lista, {
      onSuccess: () => toast.success(lista.length === 1 ? "Evidencia adjuntada" : `${lista.length} evidencias adjuntadas`),
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo adjuntar la evidencia")),
      onSettled: () => {
        setSubiendo(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  return (
    <JefeShell>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3 min-w-0">
          <Link to={`/jefe/planes/${encodeURIComponent(caso.codigo_sop)}`} className="p-2 hover:bg-surface-2 rounded-lg shrink-0">
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[20px] font-bold text-brand-700">{plan.codigo_plan}</span>
              <span className="text-ink-faint">·</span>
              <Pill tone={status.tone} dot>{status.label}</Pill>
              {vencido && (
                <Pill tone="critical" dot>
                  <AlertTriangle className="h-3 w-3" /> Plazo vencido
                </Pill>
              )}
            </div>
            <h1 className="mt-2 text-[26px] font-bold text-ink tracking-tight leading-tight max-w-3xl">
              {caso.titulo?.trim() || caso.descripcion}
            </h1>
            <p className="text-[13px] text-ink-soft mt-1 font-mono">{caso.codigo_sop}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {flow.pendienteAceptacion && (
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
              <Check className="h-4.5 w-4.5" /> Aceptar plan
            </Button>
          )}
          {flow.puedeTrabajar && (
            <>
              <Button
                size="md"
                disabled={!flow.todasCompletadas || completeExec.isPending}
                onClick={() =>
                  completeExec.mutate(
                    { id_plan: plan.id_plan, actor: ACTOR },
                    {
                      onSuccess: () => toast.success("Plan completado correctamente"),
                      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo completar la ejecución")),
                    }
                  )
                }
              >
                <Send className="h-4.5 w-4.5" /> Enviar a SO
              </Button>
              <Button variant="outline" size="md" onClick={() => setExtOpen(true)}>
                <Timer className="h-4.5 w-4.5" /> Solicitar prórroga
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 grid xl:grid-cols-[minmax(760px,1fr)_360px] gap-5 items-start">
        <div className="space-y-4">
          <Card>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-700 grid place-items-center shrink-0">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[18px] font-bold text-ink leading-tight">Actividades del plan</h2>
                  <p className="text-[13.5px] text-ink-quiet mt-0.5">{plan.descripcion}</p>
                </div>
              </div>
              <Pill tone={flow.todasCompletadas ? "success" : "info"} dot>
                {progreso}% avance
              </Pill>
            </div>

            <Progress value={progreso} showLabel className="mb-4" />

            {!flow.todasCompletadas && flow.puedeTrabajar && (
              <div className="mb-4 rounded-lg border border-line-soft bg-surface/60 p-3 text-[13px] text-ink-soft">
                Actualiza cada actividad y deja comentarios de avance. Cuando todas esten completadas, podras enviar el expediente a Seguridad Operativa.
              </div>
            )}

            <div className="space-y-3">
              {(plan.actividades_plan ?? []).map((a) => {
                const estado = a.catalogo_detalle?.nombre ?? "Pendiente";
                const draft = activityDrafts[a.id_actividad] ?? "";
                const seguimientos = a.seguimientos ?? [];
                return (
                  <div key={a.id_actividad} className="rounded-xl border border-line-soft p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[14px] font-semibold text-ink">{a.descripcion}</p>
                          <Pill tone={activityTone(estado)} dot>{estado}</Pill>
                        </div>
                        <p className="text-[12px] text-ink-quiet mt-1 flex items-center gap-1.5 flex-wrap">
                          <UserRound className="h-3.5 w-3.5" /> {a.usuarios?.nombre ?? "Sin responsable"}
                          {a.fecha_fin && (
                            <>
                              <span className="text-ink-faint">·</span>
                              <CalendarClock className="h-3.5 w-3.5" /> vence {formatDate(a.fecha_fin)}
                            </>
                          )}
                        </p>
                      </div>
                      <Select
                        className="h-10 w-[170px] text-[13px] shrink-0"
                        value={estado}
                        disabled={!flow.puedeTrabajar || updateActivity.isPending}
                        onChange={(e) => submitActivity(a, e.target.value)}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Completado">Completado</option>
                      </Select>
                    </div>

                    <div className="mt-3 grid md:grid-cols-[1fr_auto] gap-2 items-start">
                      <Textarea
                        value={draft}
                        rows={2}
                        disabled={!flow.puedeTrabajar || updateActivity.isPending}
                        onChange={(e) => updateDraft(a.id_actividad, e.target.value)}
                        placeholder={flow.puedeTrabajar ? "Comentario de avance, bloqueo o evidencia realizada..." : "Actividad bloqueada por el estado actual del caso"}
                        className="min-h-[92px] text-[13.5px]"
                      />
                      <Button
                        variant="outline"
                        size="md"
                        disabled={!flow.puedeTrabajar || updateActivity.isPending || draft.trim().length < 3}
                        onClick={() => submitActivity(a, estado, draft)}
                        className="md:mt-0"
                      >
                        <MessageSquare className="h-4.5 w-4.5" /> Agregar comentario
                      </Button>
                    </div>

                    {seguimientos.length > 0 && (
                      <div className="mt-3 border-t border-line-soft pt-3 space-y-2">
                        <p className="text-[11.5px] font-semibold tracking-wide uppercase text-ink-faint">Seguimientos</p>
                        {seguimientos.map((s) => (
                          <div key={s.id_seguimiento} className="rounded-lg bg-surface/70 px-3 py-2">
                            <p className="text-[13px] text-ink-soft">{s.comentario ?? "Seguimiento sin comentario"}</p>
                            <p className="text-[11.5px] text-ink-faint mt-1">
                              {s.usuarios?.nombre ?? ACTOR}
                              {s.porcentaje ? ` · ${s.porcentaje}%` : ""}
                              {s.fecha ? ` · ${formatDateTime(s.fecha)}` : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {(plan.actividades_plan ?? []).length === 0 && (
                <p className="text-[13.5px] text-ink-quiet">Este plan no tiene actividades registradas.</p>
              )}
            </div>

            <div className="mt-5 pt-5 border-t border-line-soft flex items-center gap-2 flex-wrap">
              {flow.enVerificacion && (
                <p className="text-[13.5px] text-ink-quiet flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-600" /> Enviado a Seguridad Operativa para verificación.
                </p>
              )}
              {(flow.cerrado || flow.rechazado) && (
                <p className="text-[13.5px] text-ink-quiet flex items-center gap-1.5">
                  <Lock className="h-4.5 w-4.5" /> El expediente está cerrado para acciones del jefe de área.
                </p>
              )}
              {flow.prorrogaPendiente && (
                <p className="text-[13.5px] text-warning-ink flex items-center gap-1.5">
                  <Timer className="h-4.5 w-4.5" /> La prorroga esta pendiente de decision de Seguridad Operativa.
                </p>
              )}
              {flow.puedeTrabajar && !flow.todasCompletadas && (
                <span className="text-[12.5px] text-ink-quiet">Completa todas las actividades para habilitar el envio a SO.</span>
              )}
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid place-items-center h-10 w-10 rounded-lg bg-surface-2 text-brand-700">
                  <Paperclip className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold text-ink">Evidencias de ejecución</h2>
                  <p className="text-[13px] text-ink-quiet">Archivos que sustentan el avance del plan.</p>
                </div>
              </div>
              {!evidenciasBloqueadas && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPT}
                    className="hidden"
                    onChange={(e) => onFiles(e.target.files)}
                  />
                  <Button variant="outline" size="md" disabled={subiendo} onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4.5 w-4.5" /> {subiendo ? "Subiendo..." : "Adjuntar"}
                  </Button>
                </>
              )}
            </div>

            {anexos.length > 0 ? (
              <div className="space-y-1.5">
                {anexos.map((a) => <FilaAnexo key={a.id_anexo} anexo={a} />)}
              </div>
            ) : (
              <p className="text-[13px] text-ink-faint p-2">Sin evidencias adjuntas.</p>
            )}

            <p className="pt-3 mt-3 border-t border-line-soft text-[12.5px] text-ink-quiet">
              {evidenciasBloqueadas
                ? "El estado actual permite consultar evidencias, pero no adjuntar nuevos archivos."
                : `Imagenes, video MP4/MOV o PDF · hasta ${MAX_ARCHIVOS} archivos de 25 MB.`}
            </p>
          </Card>

          {caso.investigacion_caso && (
            <Card>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="grid place-items-center h-10 w-10 rounded-lg bg-surface-2 text-brand-700">
                  <Microscope className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold text-ink">Investigación del caso</h2>
                  <p className="text-[13px] text-ink-quiet">Contexto aprobado por Seguridad Operativa para ejecutar el plan.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <InfoRow label="Causa raíz" value={caso.investigacion_caso.causa_raiz} />
                <InfoRow label="Hallazgos" value={caso.investigacion_caso.hallazgos} />
                <InfoRow label="Conclusiones" value={caso.investigacion_caso.conclusiones} />
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-20">
          <Card padded={false}>
            <div className="p-4 border-b border-line-soft">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-faint">Información del plan</p>
            </div>
            <div className="p-4 space-y-3.5">
              <SidebarRow icon={<FileText className="h-3.5 w-3.5" />} label="Código plan" value={plan.codigo_plan} />
              <SidebarRow icon={<FileText className="h-3.5 w-3.5" />} label="Código SOP" value={caso.codigo_sop} />
              <SidebarRow icon={<UserRound className="h-3.5 w-3.5" />} label="Responsable" value={plan.usuarios.nombre} />
              <SidebarRow icon={<UserRound className="h-3.5 w-3.5" />} label="Área" value={plan.areas.nombre_area} />
              <SidebarRow icon={<CalendarClock className="h-3.5 w-3.5" />} label="Fecha límite" value={formatDate(limite)} />
              <SidebarRow icon={<Timer className="h-3.5 w-3.5" />} label="Control de plazo" value={dueCopy(limite, flow.cerrado || flow.rechazado || flow.enVerificacion)} />
              <SidebarRow icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Estado plan" value={flow.estadoPlan} />
              <SidebarRow icon={<ClipboardList className="h-3.5 w-3.5" />} label="Etapa caso" value={flow.etapaCaso} />

              {caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?.codigo && (
                <div>
                  <p className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint mb-1">Riesgo del caso</p>
                  <RiskPill
                    risk={caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle.codigo as RiskLevel}
                    showCategory
                  />
                </div>
              )}
              {plan.observaciones && <InfoRow label="Observaciones" value={plan.observaciones} />}
            </div>
          </Card>

          <Card className={cn(flow.todasCompletadas ? "border-brand-100 bg-brand-50/40" : "border-line-soft")}> 
            <p className="text-[13px] font-semibold text-ink">Checklist de cierre</p>
            <div className="mt-3 space-y-2.5">
              <ChecklistItem done={flow.aceptado} label="Plan aceptado por el jefe" />
              <ChecklistItem done={progreso === 100} label="Actividades completadas" />
              <ChecklistItem done={anexos.length > 0} label="Evidencias adjuntas" />
              <ChecklistItem done={flow.enVerificacion || flow.cerrado} label="Enviado a verificación SO" />
            </div>
          </Card>

          {flow.prorrogaPendiente && (
            <Card className="border-warning/40 bg-warning-soft">
              <p className="text-[13px] font-semibold text-warning-ink">Prórroga en revisión</p>
              <p className="text-[13px] text-ink-soft mt-1.5">{plan.prorroga_motivo}</p>
              {plan.prorroga_fecha && (
                <p className="text-[12px] text-ink-quiet mt-1.5">Nueva fecha propuesta: {formatDate(plan.prorroga_fecha)}</p>
              )}
              {plan.prorroga_fecha_sol && (
                <p className="text-[12px] text-ink-quiet mt-1">Solicitada: {formatDateTime(plan.prorroga_fecha_sol)}</p>
              )}
            </Card>
          )}
        </div>
      </div>

      <Modal
        open={extOpen}
        onClose={() => setExtOpen(false)}
        title="Solicitar ampliación de plazo"
        subtitle={`${plan.codigo_plan} · la decide Seguridad Operativa`}
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
                      setJustificación("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo solicitar la ampliacion")),
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
            onChange={(e) => setJustificación(e.target.value)}
            rows={4}
            placeholder="Explique por qué necesita más tiempo..."
          />
        </Field>
      </Modal>
    </JefeShell>
  );
}

function ChecklistItem({ done, label }: { done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px]">
      <span
        className={cn(
          "grid place-items-center h-6 w-6 rounded-full border shrink-0",
          done ? "bg-brand-700 border-brand-700 text-white" : "bg-white border-line-strong text-ink-faint"
        )}
      >
        {done ? <Check className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      </span>
      <span className={done ? "text-ink" : "text-ink-quiet"}>{label}</span>
    </div>
  );
}










