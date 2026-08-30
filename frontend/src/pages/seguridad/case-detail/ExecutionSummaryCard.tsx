import { useState, type ReactNode } from "react";
import {
  Activity, ClipboardList, CheckCircle2, CornerUpLeft, Clock,
  Building2, FileText, User as UserIcon, Rocket, AlertTriangle, Timer, Gavel,
  MessageSquare, Paperclip, Send, ListChecks, Download, ChevronDown, ChevronUp,
  Image as ImageIcon, Video,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { EmptyState, Progress } from "@/design-system/primitives/Progress";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Input, Select, Textarea } from "@/design-system/primitives/Input";
import { StageSection } from "@/features/cases/components/CaseParts";
import { useAuth } from "@/features/auth/auth";
import { useCurrentSoUser } from "@/features/users/hooks/useCurrentSoUser";
import {
  useAddPlanComment,
  useCloseCase,
  useKeepPending,
  useReopenCase,
  useReviewFinalPlan,
  useReviewPlanExtension,
  useSendToVerification,
} from "@/features/cases/hooks/useCaseActions";
import { parseActivityDescription } from "@/features/cases/lib/activityMeta";
import { compactPlanCodes, shortPlanCode } from "@/features/cases/lib/planLabels";
import { evidenciasDelEvento, humanEvidenceDetail, planEvidenceFiles, timelineBelongsToPlan } from "@/features/cases/lib/planEvidence";
import { progresoPorHitos } from "@/features/cases/lib/planProgress";
import { ACTOR_ROL_LABEL } from "@/features/cases/lib/workflow";
import { planDeadline } from "@/features/plans/lib/planDeadline";
import { apiErrorMessage } from "@/lib/api";
import { formatDate, formatDateTime, relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { abrirArchivoProtegido, useArchivoProtegido } from "@/lib/archivos";
import type { ActividadPlan, AnexoCaso, CaseDetail, PlanAccion, TimelineEvento } from "@/features/cases/types";
import { StageRollbackButton } from "./StageRollbackButton";

// Portado de pages/seguridad/CaseFile.tsx → ExecutionStage / VerificationStage
// / ClosedStage. Las tres comparten la lectura del plan ejecutado y se
// diferencian por las acciones disponibles para Seguridad Operativa.

/**
 * Avance de una actividad. Se usa el porcentaje real que registró el área; si
 * todavía no hay ninguno, se deriva del estado para no mostrar 0% en una
 * actividad que ya está completada.
 */
function avanceActividad(act: ActividadPlan): number {
  const registrado = act.porcentaje != null ? Number(act.porcentaje) : NaN;
  if (Number.isFinite(registrado) && registrado > 0) return Math.min(100, registrado);
  const estado = act.catalogo_detalle?.nombre;
  return estado === "Completado" ? 100 : estado === "En progreso" ? 50 : 0;
}

/**
 * Mismo cálculo por hitos que ve el Jefe del Área, para que ambos paneles
 * muestren el mismo número. Necesita el caso porque los comentarios y las
 * evidencias del plan viven en el timeline del expediente.
 */
function avancePlanEnCaso(caso: CaseDetail, plan: PlanAccion): number {
  const key = estadoPlanKey(plan);
  const eventos = timelineDelPlan(caso, plan);
  return progresoPorHitos({
    aceptado: key === "ejecucion" || key === "finalizado" || key === "cerrado",
    finalizado: key === "finalizado" || key === "cerrado",
    comentarios: eventos.filter((e) => e.kind === "comentario").length,
    evidencias: evidenciasDelPlan(caso, plan).length,
  });
}

/**
 * "Rol · Nombre" de quien hizo una acción en la bitácora. Sin login real,
 * las acciones de Seguridad Operativa se firman con el nombre genérico
 * "Seguridad Operativa" — igual que la etiqueta de su rol —, así que
 * mostrar ambos por separado salía repetido ("Seguridad Operativa ·
 * Seguridad Operativa"). Si coinciden, se muestra una sola vez.
 */
function actorLine(actorRol: string, actor: string): string {
  const rolLabel = ACTOR_ROL_LABEL[actorRol] ?? actorRol;
  return actor && actor !== rolLabel ? `${rolLabel} · ${actor}` : rolLabel;
}

function normalize(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function planFinalizado(plan: PlanAccion): boolean {
  return normalize(plan.catalogo_detalle.nombre).includes("finaliz");
}

function planCerrado(plan: PlanAccion): boolean {
  return normalize(plan.catalogo_detalle.nombre).includes("cerrad");
}

function planLegacyListoParaRevision(plan: PlanAccion): boolean {
  // Planes viejos que quedaron con todas sus actividades al 100% sin pasar por
  // el cierre; el avance por hitos no aplica acá, se mira el dato original.
  if (plan.actividades_plan.length === 0) return false;
  const porActividades = plan.actividades_plan.reduce((acc, a) => acc + avanceActividad(a), 0) / plan.actividades_plan.length;
  return estadoPlanKey(plan) === "ejecucion" && Math.round(porActividades) === 100;
}

function planRevisablePorSo(plan: PlanAccion): boolean {
  return !planCerrado(plan) && (planFinalizado(plan) || planLegacyListoParaRevision(plan));
}

function planStatus(plan: PlanAccion): { label: string; tone: "brand" | "warning" | "neutral" | "critical" | "info" | "success" } {
  const estado = normalize(plan.catalogo_detalle.nombre);
  if (estado.includes("rechaz")) return { label: "Rechazado", tone: "critical" };
  if (estado.includes("cerrad")) return { label: "Cerrado por SO", tone: "neutral" };
  if (estado.includes("finaliz")) return { label: "Pendiente de revisión SO", tone: "warning" };
  if (estado.includes("ejecucion") || estado.includes("aceptad")) return { label: "En ejecución", tone: "brand" };
  if (estado.includes("enviado") || estado.includes("pendiente")) return { label: "Pendiente de aceptación", tone: "info" };
  return { label: plan.catalogo_detalle.nombre, tone: "neutral" };
}

function estadoPlanKey(plan: PlanAccion): "pendiente" | "ejecucion" | "finalizado" | "cerrado" | "otro" {
  const estado = normalize(plan.catalogo_detalle.nombre);
  if (estado.includes("cerrad")) return "cerrado";
  if (estado.includes("finaliz")) return "finalizado";
  if (estado.includes("ejecucion") || estado.includes("aceptad")) return "ejecucion";
  if (estado.includes("pendiente") || estado.includes("enviado")) return "pendiente";
  return "otro";
}

function avanceCaso(caso: CaseDetail): number {
  const items = caso.planes_accion.flatMap((p) => p.actividades_plan);
  if (items.length === 0) return 0;
  return Math.round(items.reduce((acc, a) => acc + avanceActividad(a), 0) / items.length);
}

const ACTIVIDAD_TONE: Record<string, "brand" | "warning" | "neutral"> = {
  Completado: "brand",
  "En progreso": "warning",
  Pendiente: "neutral",
};

function contienePlan(evento: TimelineEvento, plan: PlanAccion): boolean {
  return timelineBelongsToPlan(evento, plan);
}

function timelineDelPlan(caso: CaseDetail, plan: PlanAccion): TimelineEvento[] {
  return caso.timeline_caso
    .filter((t) => contienePlan(t, plan))
    .sort((a, b) => +new Date(b.fecha ?? 0) - +new Date(a.fecha ?? 0));
}

function descripcionCierre(caso: CaseDetail, plan: PlanAccion): string | null {
  const evento = timelineDelPlan(caso, plan).find((t) => normalize(t.titulo).includes("finaliz"));
  const detalle = humanEvidenceDetail(evento?.detalle ?? "");
  // Se corta en el fin de línea, no en el fin del texto: el detalle puede
  // traer un "Comentario: ..." en la línea siguiente y con `(.+)$` el match
  // fallaba por completo, dejando el cierre sin descripción.
  const match = detalle.match(/descripci[oó]n final:\s*([^\n]+)/i);
  return match?.[1]?.trim() || null;
}

function comentariosActividad(plan: PlanAccion) {
  return plan.actividades_plan
    .flatMap((actividad) =>
      (actividad.seguimientos ?? [])
        .filter((s) => s.comentario?.trim())
        .map((s) => ({
          id: s.id_seguimiento,
          actividad,
          comentario: s.comentario?.trim() ?? "",
          porcentaje: Number(s.porcentaje ?? actividad.porcentaje ?? 0),
          fecha: s.fecha,
          usuario: s.usuarios?.nombre ?? actividad.usuarios?.nombre ?? plan.usuarios.nombre,
        }))
    )
    .sort((a, b) => +new Date(b.fecha ?? 0) - +new Date(a.fecha ?? 0));
}

/**
 * Evidencias del plan agrupadas por el evento del timeline que las trajo
 * (una actualización del área, el cierre, etc.), con el título de ese evento
 * como etiqueta.
 *
 * Antes solo se leían los eventos cuyo título incluía la palabra "evidencia",
 * así que las fotos adjuntas a una "Actualización N" quedaban invisibles acá
 * aunque el jefe sí las viera en su panel: se recorren todos los eventos del
 * plan y se extraen sus anexos del payload JSON, con `planEvidenceFiles` como
 * respaldo para evidencia vieja que no llevaba ese payload.
 */
function evidenciasDelPlan(caso: CaseDetail, plan: PlanAccion) {
  const usedIds = new Set<number>();
  const out: { nombre: string; anexo: AnexoCaso; etiqueta: string }[] = [];

  for (const evento of timelineDelPlan(caso, plan)) {
    for (const anexo of evidenciasDelEvento(evento, caso.anexos_caso)) {
      if (usedIds.has(anexo.id_anexo)) continue;
      usedIds.add(anexo.id_anexo);
      out.push({ nombre: anexo.nombre_archivo ?? "Archivo adjunto", anexo, etiqueta: compactPlanCodes(evento.titulo) });
    }
  }

  for (const anexo of planEvidenceFiles(plan, caso.timeline_caso, caso.anexos_caso)) {
    if (usedIds.has(anexo.id_anexo)) continue;
    usedIds.add(anexo.id_anexo);
    out.push({ nombre: anexo.nombre_archivo ?? "Archivo adjunto", anexo, etiqueta: "Evidencia del plan" });
  }

  return out;
}

function IconoArchivo({ tipo }: { tipo: string | null }) {
  if (tipo?.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
  if (tipo?.startsWith("video/")) return <Video className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

/**
 * Miniatura real del adjunto en la fila de evidencias: antes toda evidencia
 * mostraba el mismo icono genérico, así que una foto subida por el área no se
 * veía como foto. Si la imagen/video falla al cargar, cae al icono de siempre.
 */
function MiniaturaArchivo({ anexo }: { anexo: AnexoCaso | null }) {
  const [falloCarga, setFalloCarga] = useState(false);
  const url = useArchivoProtegido(anexo?.ruta_archivo);
  const tipo = anexo?.tipo_archivo ?? "";
  const puedePrevisualizar = !!url && !falloCarga;

  if (puedePrevisualizar && tipo.startsWith("image/")) {
    return (
      <span className="h-9 w-9 rounded-lg overflow-hidden bg-surface-2 grid place-items-center shrink-0">
        <img
          src={url}
          alt={anexo?.nombre_archivo ?? "Evidencia"}
          loading="lazy"
          onError={() => setFalloCarga(true)}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  if (puedePrevisualizar && tipo.startsWith("video/")) {
    return (
      <span className="h-9 w-9 rounded-lg overflow-hidden bg-surface-2 grid place-items-center shrink-0">
        <video
          src={url}
          muted
          playsInline
          preload="metadata"
          onError={() => setFalloCarga(true)}
          className="pointer-events-none h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span className="h-9 w-9 rounded-lg bg-surface-2 text-ink-soft grid place-items-center shrink-0">
      <IconoArchivo tipo={anexo?.tipo_archivo ?? null} />
    </span>
  );
}

function FilaAnexoPlan({ nombre, anexo, etiqueta }: { nombre: string; anexo: AnexoCaso | null; etiqueta?: string }) {
  const contenido = (
    <>
      <MiniaturaArchivo anexo={anexo} />
      <span className="min-w-0 flex-1">
        {etiqueta && (
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-brand-700 truncate">{etiqueta}</span>
        )}
        <span className="block text-[12.5px] font-medium text-ink truncate">{nombre}</span>
        <span className="block text-[11px] text-ink-quiet">
          {anexo
            ? `${anexo.peso ? `${anexo.peso} KB` : "Archivo"}${anexo.fecha_subida ? ` · ${formatDateTime(anexo.fecha_subida)}` : ""}`
            : "Registrado en bitácora"}
        </span>
      </span>
      {anexo?.ruta_archivo && <Download className="h-3.5 w-3.5 text-ink-faint" />}
    </>
  );

  if (!anexo?.ruta_archivo) {
    return <div className="flex items-center gap-2.5 rounded-lg bg-surface/70 p-2.5">{contenido}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => abrirArchivoProtegido(anexo.ruta_archivo!)}
      className="flex w-full items-center gap-2.5 rounded-lg bg-surface/70 p-2.5 text-left hover:bg-surface-2 transition-colors"
    >
      {contenido}
    </button>
  );
}

/** ISO de una columna @db.Date → valor de un `<input type="date">`. */
const soloFecha = (v?: string | null) => (v ? v.slice(0, 10) : "");

/** Día siguiente a `v`, para el `min` del input: prorrogar es correr la fecha. */
function diaSiguiente(v?: string | null): string {
  const base = soloFecha(v);
  if (!base) return "";
  return new Date(new Date(`${base}T00:00:00.000Z`).getTime() + 86400000).toISOString().slice(0, 10);
}

function PlanExecutionBoard({
  caso,
  cerrado,
  enVerificacion,
  openPlanReview,
}: {
  caso: CaseDetail;
  cerrado: boolean;
  enVerificacion: boolean;
  openPlanReview: (plan: PlanAccion, decision: "aprobada" | "rechazada") => void;
}) {
  const reviewExtension = useReviewPlanExtension(caso.codigo_sop);
  const addPlanComment = useAddPlanComment(caso.codigo_sop);
  const { nombre: usuarioSoNombre } = useCurrentSoUser();
  const [extensionReview, setExtensionReview] = useState<{ plan: PlanAccion; decision: "aprobada" | "rechazada" } | null>(null);
  const [extensionNote, setExtensionNote] = useState("");
  /** Plazo que SO va a otorgar; arranca en el que pidió el área y es editable. */
  const [extensionDate, setExtensionDate] = useState("");
  const [activeCommentPlan, setActiveCommentPlan] = useState<number | null>(null);
  const [planComment, setPlanComment] = useState("");
  const [expandedPlans, setExpandedPlans] = useState<Set<number>>(() => new Set());

  const progresoGeneral = avanceCaso(caso);

  const abrirRevisionProrroga = (plan: PlanAccion, decision: "aprobada" | "rechazada") => {
    setExtensionReview({ plan, decision });
    setExtensionNote("");
    setExtensionDate(soloFecha(plan.prorroga_fecha));
  };

  const enviarComentario = (plan: PlanAccion) => {
    const texto = planComment.trim();
    if (!texto) return;
    addPlanComment.mutate(
      { id_plan: plan.id_plan, texto, actor: usuarioSoNombre },
      {
        onSuccess: () => {
          toast.success("Comentario agregado al plan");
          setActiveCommentPlan(null);
          setPlanComment("");
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo agregar el comentario")),
      }
    );
  };

  const togglePlan = (idPlan: number) => {
    setExpandedPlans((current) => {
      const next = new Set(current);
      if (next.has(idPlan)) next.delete(idPlan);
      else next.add(idPlan);
      return next;
    });
  };

  // Plazo que SO otorga en la prórroga en revisión. Solo es una ampliación si
  // la fecha corre hacia adelante, así que un plazo igual o anterior al
  // vigente bloquea la aprobación (el backend valida lo mismo).
  const planEnRevision = extensionReview?.plan;
  const plazoVigente = planEnRevision ? soloFecha(planDeadline(planEnRevision)) : "";
  const fechaAjustada = !!planEnRevision && extensionDate !== soloFecha(planEnRevision.prorroga_fecha);
  const fechaOtorgadaInvalida =
    extensionReview?.decision === "aprobada" && (!extensionDate || extensionDate <= plazoVigente);

  return (
    <>
      <div className="rounded-xl border border-line bg-surface/50 p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-[12.5px] font-semibold text-ink">Progreso operativo del expediente</p>
          <span className="text-[20px] font-bold text-brand-700 tabular-nums">{progresoGeneral}%</span>
        </div>
        <Progress value={progresoGeneral} tone={progresoGeneral === 100 ? "brand" : "warning"} />
        <p className="mt-2 text-[11.5px] text-ink-quiet">
          El porcentaje resume actividades; el cierre del expediente depende de que cada plan quede cerrado por Seguridad Operativa.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {caso.planes_accion.map((plan) => {
          const avance = avancePlanEnCaso(caso, plan);
          const actualizacionesDelPlan = timelineDelPlan(caso, plan).filter((e) => e.kind === "actualizacion").length;
          const requiereRevision = planRevisablePorSo(plan);
          const cerradoPorSo = planCerrado(plan);
          const estadoPlan =
            requiereRevision && !cerradoPorSo
              ? { label: "Listo para revisión SO", tone: "warning" as const }
              : planStatus(plan);
          const pendienteProrroga = plan.prorroga_estado === "pendiente";
          const eventos = timelineDelPlan(caso, plan).filter((t) => {
            const titulo = normalize(t.titulo);
            return !titulo.includes("evidencia") && !titulo.includes("actividad actualizada");
          });
          // El backend guarda cada comentario/actualización del jefe dos veces
          // (en `seguimientos` y en el timeline del caso) para que el jefe vea
          // su hilo y SO vea la bitácora. Acá se leen ambas fuentes, así que
          // sin este filtro el mismo mensaje aparecía duplicado.
          const eventTexts = new Set(eventos.map((e) => normalize(humanEvidenceDetail(e.detalle) || e.titulo)));
          const comentarios = comentariosActividad(plan).filter((c) => !eventTexts.has(normalize(c.comentario)));
          const evidencias = evidenciasDelPlan(caso, plan);
          const cierre = descripcionCierre(caso, plan);
          const abierto = expandedPlans.has(plan.id_plan);

          return (
            <div
              key={plan.id_plan}
              className={cn(
                "rounded-xl border p-4 bg-white shadow-sm",
                requiereRevision && !cerrado && "border-warning/40 bg-warning-soft/15",
                pendienteProrroga && "border-warning/50",
                cerradoPorSo && "bg-surface/40"
              )}
            >
              <button
                type="button"
                className="flex w-full flex-wrap items-center justify-between gap-4 text-left"
                aria-expanded={abierto}
                onClick={() => togglePlan(plan.id_plan)}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="font-mono text-[14px] font-bold text-brand-700">{shortPlanCode(plan.codigo_plan)}</span>
                  <Pill tone={estadoPlan.tone} dot>{estadoPlan.label}</Pill>
                  {pendienteProrroga && <Pill tone="warning" dot>Prórroga pendiente</Pill>}
                  {/* Avisa que el área agregó información después del cierre,
                      para que SO sepa que hay algo nuevo que leer. */}
                  {actualizacionesDelPlan > 0 && (
                    <Pill tone="info" dot>
                      Actualizado ({actualizacionesDelPlan})
                    </Pill>
                  )}
                </span>
                <span className="flex min-w-[190px] items-center gap-3">
                  <span className="min-w-[150px]">
                    <Progress value={avance} showLabel tone={avance === 100 ? "brand" : "warning"} />
                  </span>
                  <span className="text-ink-quiet">{abierto ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}</span>
                </span>
              </button>

              {abierto && (
                <>
                  <p className="mt-4 border-t border-line-soft pt-4 text-[14px] font-semibold text-ink leading-snug break-words">{plan.descripcion}</p>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <div className="rounded-lg bg-surface/70 border border-line-soft p-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">Área</p>
                  <p className="text-[12.5px] font-medium text-ink mt-1">{plan.areas.nombre_area}</p>
                </div>
                <div className="rounded-lg bg-surface/70 border border-line-soft p-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">Responsable</p>
                  <p className="text-[12.5px] font-medium text-ink mt-1">{plan.usuarios.nombre}</p>
                </div>
                <div className="rounded-lg bg-surface/70 border border-line-soft p-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">Fecha límite</p>
                  <p className={cn("text-[12.5px] font-medium mt-1", plan.fecha_reprogramada ? "text-brand-700" : "text-ink")}>
                    {formatDate(planDeadline(plan))}
                  </p>
                </div>
                <div className="rounded-lg bg-surface/70 border border-line-soft p-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">Actividades</p>
                  <p className="text-[12.5px] font-medium text-ink mt-1">{plan.actividades_plan.length}</p>
                </div>
              </div>

              {pendienteProrroga && (
                <div className="mt-4 rounded-lg border border-warning/35 bg-warning-soft/60 p-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-semibold text-warning-ink">Solicitud de prórroga del área</p>
                      <p className="mt-1 text-[12px] text-ink-soft leading-relaxed break-words">{plan.prorroga_motivo}</p>
                      <p className="mt-1 text-[11.5px] text-ink-quiet">
                        Fecha propuesta: {plan.prorroga_fecha ? formatDate(plan.prorroga_fecha) : "—"}
                        {plan.prorroga_fecha_sol ? ` · solicitada ${relativeTime(plan.prorroga_fecha_sol)}` : ""}
                      </p>
                    </div>
                    {!cerrado && (
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => abrirRevisionProrroga(plan, "aprobada")} disabled={reviewExtension.isPending}>
                          <CheckCircle2 className="h-4 w-4" /> Aprobar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => abrirRevisionProrroga(plan, "rechazada")} disabled={reviewExtension.isPending}>
                          <CornerUpLeft className="h-4 w-4" /> Rechazar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {plan.prorroga_estado && plan.prorroga_estado !== "pendiente" && (
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-surface border border-line-soft p-3">
                  <Timer className="h-4 w-4 text-ink-faint shrink-0 mt-0.5" />
                  <div className="min-w-0 text-[12px]">
                    <span className={cn("font-semibold", plan.prorroga_estado === "aprobada" ? "text-brand-700" : "text-critical-ink")}>
                      Prórroga {plan.prorroga_estado}
                    </span>
                    {plan.prorroga_fecha && ` · fecha solicitada ${formatDate(plan.prorroga_fecha)}`}
                    {plan.prorroga_motivo && <p className="text-ink-quiet mt-0.5 break-words">{plan.prorroga_motivo}</p>}
                  </div>
                </div>
              )}

              {plan.actividades_plan.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2.5 flex items-center gap-1.5">
                    <ListChecks className="h-3.5 w-3.5" /> Actividades del plan
                  </p>
                  <div className="space-y-2">
                    {plan.actividades_plan.map((act) => {
                      const parsed = parseActivityDescription(act.descripcion);
                      return (
                        <div key={act.id_actividad} className="rounded-lg border border-line-soft bg-surface/40 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium text-ink leading-snug break-words">{parsed.descripcion}</p>
                              <p className="text-[11px] text-ink-quiet mt-1">
                                {act.usuarios?.nombre ?? "Sin responsable"}
                                {act.usuarios?.cargo ? ` · ${act.usuarios.cargo}` : ""}
                                {parsed.meta.tipoAccion ? ` · ${parsed.meta.tipoAccion}` : ""}
                                {parsed.meta.areaNombre ? ` · ${parsed.meta.areaNombre}` : ""}
                                {act.fecha_fin ? ` · vence ${formatDate(act.fecha_fin)}` : ""}
                              </p>
                            </div>
                            <Pill tone={ACTIVIDAD_TONE[act.catalogo_detalle?.nombre ?? "Pendiente"] ?? "neutral"} dot>
                              {act.catalogo_detalle?.nombre ?? "Pendiente"}
                            </Pill>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {cierre && (
                <div className="mt-4 rounded-lg border border-brand-200 bg-brand-50/60 p-3">
                  <p className="text-[11px] font-semibold tracking-wide uppercase text-brand-700">Descripción final del área</p>
                  <p className="mt-1 text-[12.5px] text-ink-soft leading-relaxed break-words">{cierre}</p>
                </div>
              )}

              <div className="mt-4 grid gap-3 xl:grid-cols-2">
                <div className="rounded-lg border border-line-soft bg-white p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> Seguimiento ({comentarios.length + eventos.length})
                    </p>
                  </div>
                  <div className="mt-2.5 max-h-72 space-y-2 overflow-y-auto pr-1">
                    {comentarios.length === 0 && eventos.length === 0 && (
                      <p className="rounded-lg border border-dashed border-line bg-surface/40 p-3 text-[12px] text-ink-quiet">
                        Sin comentarios registrados para este plan.
                      </p>
                    )}
                    {/* Comentarios de avance y eventos del timeline se mezclaban
                        en dos bloques separados (primero todos los comentarios,
                        después los eventos) sin importar la fecha, así que la
                        conversación no se leía en orden. Ahora salen todos
                        juntos, más reciente primero, con scroll propio en vez
                        de cortar a los primeros 6 y empujar el resto de la
                        pantalla. */}
                    {[
                      ...comentarios.map((s) => ({
                        key: `seg-${s.id}`,
                        fecha: s.fecha,
                        node: (
                          <div className="rounded-lg bg-surface/60 p-2.5">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-[12.5px] font-medium text-ink leading-snug break-words">{s.comentario}</p>
                              <span className="text-[10.5px] text-ink-faint shrink-0">{s.fecha ? relativeTime(s.fecha) : ""}</span>
                            </div>
                            {/* El porcentaje de avance no aporta al comentario en sí. */}
                            <p className="mt-1 text-[10.5px] text-ink-quiet">{s.usuario}</p>
                          </div>
                        ),
                      })),
                      ...eventos.map((evento) => ({
                        key: `evt-${evento.id_evento}`,
                        fecha: evento.fecha,
                        node: (
                          <div className="rounded-lg bg-surface/60 p-2.5">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-[12.5px] font-medium text-ink leading-snug break-words">{compactPlanCodes(evento.titulo)}</p>
                              <span className="text-[10.5px] text-ink-faint shrink-0">{evento.fecha ? relativeTime(evento.fecha) : ""}</span>
                            </div>
                            {evento.detalle && (
                              <p className="mt-1 text-[12px] text-ink-soft leading-relaxed break-words">
                                {compactPlanCodes(humanEvidenceDetail(evento.detalle))}
                              </p>
                            )}
                            <p className="mt-1 text-[10.5px] text-ink-quiet">
                              {actorLine(evento.actor_rol, evento.actor)}
                            </p>
                          </div>
                        ),
                      })),
                    ]
                      .sort((a, b) => +new Date(b.fecha ?? 0) - +new Date(a.fecha ?? 0))
                      .map((item) => <div key={item.key}>{item.node}</div>)}
                  </div>
                </div>

                <div className="rounded-lg border border-line-soft bg-white p-3">
                  <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint flex items-center gap-1.5">
                    <Paperclip className="h-3.5 w-3.5" /> Evidencias del plan ({evidencias.length})
                  </p>
                  <div className="mt-2.5 space-y-2">
                    {evidencias.length === 0 && (
                      <p className="rounded-lg border border-dashed border-line bg-surface/40 p-3 text-[12px] text-ink-quiet">
                        Sin evidencias vinculadas a este plan.
                      </p>
                    )}
                    {evidencias.map((e) => (
                      <FilaAnexoPlan
                        key={`${plan.id_plan}-${e.anexo?.id_anexo ?? e.nombre}`}
                        nombre={e.nombre}
                        anexo={e.anexo}
                        etiqueta={e.etiqueta}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {!cerrado && (
                <div className="mt-4 rounded-lg border border-line-soft bg-surface/40 p-3">
                  <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2">
                    Respuesta de Seguridad Operativa
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      value={activeCommentPlan === plan.id_plan ? planComment : ""}
                      onFocus={() => setActiveCommentPlan(plan.id_plan)}
                      onChange={(e) => {
                        setActiveCommentPlan(plan.id_plan);
                        setPlanComment(e.target.value);
                      }}
                      placeholder="Responder o dejar observación para este plan..."
                    />
                    <Button
                      size="md"
                      disabled={activeCommentPlan !== plan.id_plan || planComment.trim().length < 3 || addPlanComment.isPending}
                      onClick={() => enviarComentario(plan)}
                    >
                      <Send className="h-4 w-4" /> Enviar
                    </Button>
                  </div>
                </div>
              )}

              {requiereRevision && !cerrado && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-warning/30 bg-warning-soft/60 p-3">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-warning-ink">Validación final pendiente</p>
                    <p className="text-[12px] text-warning-ink/85 mt-0.5">
                      Este plan está listo para revisión. Puede cerrarlo o devolverlo sin afectar a los otros planes.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => openPlanReview(plan, "aprobada")}>
                      <CheckCircle2 className="h-4 w-4" /> Cerrar plan
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openPlanReview(plan, "rechazada")}>
                      <CornerUpLeft className="h-4 w-4" /> Devolver
                    </Button>
                  </div>
                </div>
              )}

              {cerradoPorSo && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line-soft bg-surface/70 p-3">
                  <p className="text-[12px] text-ink-quiet">
                    Plan cerrado por Seguridad Operativa. El resto de planes del mismo reporte conserva su estado actual.
                  </p>
                  {enVerificacion && !cerrado && (
                    <Button variant="outline" size="sm" onClick={() => openPlanReview(plan, "rechazada")}>
                      <CornerUpLeft className="h-4 w-4" /> Reabrir plan
                    </Button>
                  )}
                </div>
              )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        open={!!extensionReview}
        onClose={() => setExtensionReview(null)}
        title={extensionReview?.decision === "aprobada" ? "Aprobar prórroga" : "Rechazar prórroga"}
        subtitle={extensionReview ? `${shortPlanCode(extensionReview.plan.codigo_plan)} · solicitud de ampliación` : undefined}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setExtensionReview(null)}>Cancelar</Button>
            <Button
              variant={extensionReview?.decision === "rechazada" ? "danger" : "primary"}
              disabled={!extensionReview || reviewExtension.isPending || fechaOtorgadaInvalida}
              onClick={() => {
                if (!extensionReview || fechaOtorgadaInvalida) return;
                const aprobando = extensionReview.decision === "aprobada";
                reviewExtension.mutate(
                  {
                    id_plan: extensionReview.plan.id_plan,
                    decision: extensionReview.decision,
                    nota: extensionNote.trim() || undefined,
                    // Solo viaja al aprobar: al rechazar no hay plazo que otorgar.
                    fecha_aprobada: aprobando ? extensionDate : undefined,
                  },
                  {
                    onSuccess: () => {
                      toast.success(
                        !aprobando
                          ? "Prórroga rechazada"
                          : fechaAjustada
                            ? `Prórroga aprobada con plazo ajustado al ${formatDate(extensionDate)}`
                            : "Prórroga aprobada"
                      );
                      setExtensionReview(null);
                      setExtensionNote("");
                      setExtensionDate("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo resolver la prórroga")),
                  }
                );
              }}
            >
              {extensionReview?.decision === "aprobada" ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Aprobar
                </>
              ) : (
                <>
                  <CornerUpLeft className="h-4 w-4" /> Rechazar
                </>
              )}
            </Button>
          </>
        }
      >
        {extensionReview && (
          <div className="space-y-3">
            <div className="rounded-lg border border-line bg-surface/50 p-3 text-[12.5px]">
              <p className="font-semibold text-ink">{extensionReview.plan.prorroga_motivo}</p>
              <div className="mt-2 grid grid-cols-2 gap-3 border-t border-line-soft pt-2 text-ink-quiet">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">Plazo vigente</p>
                  <p className="mt-0.5 text-ink">{plazoVigente ? formatDate(plazoVigente) : "—"}</p>
                </div>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">Fecha que pide el área</p>
                  <p className="mt-0.5 font-medium text-warning-ink">
                    {extensionReview.plan.prorroga_fecha ? formatDate(extensionReview.plan.prorroga_fecha) : "—"}
                  </p>
                </div>
              </div>
            </div>

            {extensionReview.decision === "aprobada" && (
              <Field
                label="Plazo que se otorga"
                required
                hint={
                  fechaAjustada
                    ? "Distinto al solicitado: se otorgará esta fecha y la diferencia queda en la bitácora."
                    : "Puede modificarlo si el área necesita un plazo distinto al que pidió."
                }
                error={
                  fechaOtorgadaInvalida
                    ? `Debe ser posterior al plazo vigente${plazoVigente ? ` (${formatDate(plazoVigente)})` : ""}.`
                    : undefined
                }
              >
                <Input
                  type="date"
                  value={extensionDate}
                  min={diaSiguiente(plazoVigente)}
                  onChange={(e) => setExtensionDate(e.target.value)}
                />
              </Field>
            )}

            <Field label="Nota de decisión" hint="Opcional; queda registrada en la bitácora del plan.">
              <Textarea
                value={extensionNote}
                onChange={(e) => setExtensionNote(e.target.value)}
                rows={3}
                placeholder="Motivo de la aprobación o rechazo..."
              />
            </Field>
          </div>
        )}
      </Modal>
    </>
  );
}

function VerificationChecklist({
  caso,
  progreso,
  todosPlanesCerrados,
  onClose,
  onKeepPending,
  onReopenCase,
}: {
  caso: CaseDetail;
  progreso: number;
  todosPlanesCerrados: boolean;
  onClose: () => void;
  onKeepPending: () => void;
  onReopenCase: () => void;
}) {
  const total = caso.planes_accion.length;
  const cerrados = caso.planes_accion.filter(planCerrado).length;
  const porRevisar = caso.planes_accion.filter(planRevisablePorSo).length;
  const enEjecucion = caso.planes_accion.filter((plan) => estadoPlanKey(plan) === "ejecucion" && !planRevisablePorSo(plan)).length;
  const evidencias = caso.planes_accion.reduce((acc, plan) => acc + evidenciasDelPlan(caso, plan).length, 0);
  const comentariosSo = caso.timeline_caso.filter((evento) => evento.actor_rol === "seguridad" && evento.kind === "comentario").length;
  const listo = total > 0 && todosPlanesCerrados;
  const reabribles = caso.planes_accion.filter((plan) => planRevisablePorSo(plan) || planCerrado(plan)).length;

  const checks = [
    { label: "Planes cerrados por SO", value: `${cerrados}/${total}`, ok: listo },
    { label: "Pendientes de revisión", value: String(porRevisar), ok: porRevisar === 0 },
    { label: "En ejecución", value: String(enEjecucion), ok: enEjecucion === 0 },
    { label: "Avance acumulado", value: `${progreso}%`, ok: progreso === 100 },
    { label: "Evidencias de planes", value: String(evidencias), ok: evidencias > 0 },
    { label: "Comentarios SO", value: String(comentariosSo), ok: true },
  ];

  return (
    <StageSection
      title="Verificación final del expediente"
      subtitle="Cierre disponible cuando cada plan de acción haya sido validado y cerrado por Seguridad Operativa."
      icon={<Gavel className="h-5 w-5" />}
      action={<Pill tone={listo ? "brand" : "warning"} dot>{listo ? "Listo para cierre" : "Validación pendiente"}</Pill>}
    >
      <div className="rounded-xl border border-line bg-surface/40 p-3.5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-[13px] font-semibold text-ink">Decisión de verificación</p>
            <p className="mt-0.5 text-[12px] text-ink-quiet">Seleccione el resultado del expediente sin perder el seguimiento por plan.</p>
          </div>
          <Pill tone="info" dot>{reabribles} planes revisables</Pill>
        </div>

        <div className="mt-3 grid gap-2 lg:grid-cols-3">
          <DecisionCard
            tone="brand"
            icon={<CheckCircle2 className="h-4.5 w-4.5" />}
            title="Cerrar caso"
            description="Archiva el expediente cuando todos los planes fueron cerrados por Seguridad Operativa."
            actionLabel="Registrar cierre"
            disabled={!listo}
            onClick={onClose}
          />
          <DecisionCard
            tone="warning"
            icon={<Timer className="h-4.5 w-4.5" />}
            title="Mantener pendiente"
            description="Conserva el caso en Verificación y registra una nota de seguimiento."
            actionLabel="Guardar decisión"
            onClick={onKeepPending}
          />
          <DecisionCard
            tone="info"
            icon={<CornerUpLeft className="h-4.5 w-4.5" />}
            title="Reabrir caso"
            description="Devuelve a corrección el plan seleccionado y mueve el expediente a Ejecución."
            actionLabel="Elegir plan"
            disabled={reabribles === 0}
            onClick={onReopenCase}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Condiciones de cierre</p>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {checks.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-lg border border-line-soft bg-surface/50 px-3 py-2.5">
              <span className="text-[12px] text-ink-soft">{item.label}</span>
              <span className={cn("text-[13px] font-semibold tabular-nums", item.ok ? "text-brand-700" : "text-warning-ink")}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {!listo && (
        <p className="mt-3 rounded-lg border border-warning/30 bg-warning-soft/50 p-3 text-[12.5px] text-warning-ink">
          Todavía hay planes abiertos. Cierre o devuelva cada plan desde su tarjeta antes de cerrar el expediente.
        </p>
      )}
    </StageSection>
  );
}

function ExecutionVerificationGate({
  caso,
  isPending,
  onSend,
}: {
  caso: CaseDetail;
  isPending: boolean;
  onSend: () => void;
}) {
  const total = caso.planes_accion.length;
  const listos = caso.planes_accion.filter((plan) => {
    const key = estadoPlanKey(plan);
    return key === "finalizado" || key === "cerrado";
  });
  const abiertos = caso.planes_accion.filter((plan) => {
    const key = estadoPlanKey(plan);
    return key !== "finalizado" && key !== "cerrado";
  });
  const prorrogas = caso.planes_accion.filter((plan) => plan.prorroga_estado === "pendiente");
  const puedePasar = total > 0 && abiertos.length === 0 && prorrogas.length === 0;

  return (
    <StageSection
      title="Paso a Verificación"
      subtitle="Cuando todos los planes quedan finalizados por las áreas, Seguridad Operativa puede abrir la verificación formal del expediente."
      icon={<Activity className="h-5 w-5" />}
      action={<Pill tone={puedePasar ? "brand" : "warning"} dot>{puedePasar ? "Listo" : "Pendiente"}</Pill>}
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-line-soft bg-surface/50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Planes listos</p>
            <p className="mt-1 text-[18px] font-bold text-ink tabular-nums">{listos.length}/{total}</p>
          </div>
          <div className="rounded-lg border border-line-soft bg-surface/50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">En ejecución</p>
            <p className={cn("mt-1 text-[18px] font-bold tabular-nums", abiertos.length ? "text-warning-ink" : "text-brand-700")}>{abiertos.length}</p>
          </div>
          <div className="rounded-lg border border-line-soft bg-surface/50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Prórrogas pendientes</p>
            <p className={cn("mt-1 text-[18px] font-bold tabular-nums", prorrogas.length ? "text-warning-ink" : "text-brand-700")}>{prorrogas.length}</p>
          </div>
        </div>
        <Button disabled={!puedePasar || isPending} onClick={onSend} className="lg:min-w-[210px]">
          <Activity className="h-4 w-4" /> Pasar a Verificación
        </Button>
      </div>
      {!puedePasar && (
        <p className="mt-3 rounded-lg border border-warning/30 bg-warning-soft/50 p-3 text-[12.5px] text-warning-ink">
          Para habilitar el paso, cada plan debe estar finalizado por el jefe de área o cerrado por SO, y no debe haber prórrogas pendientes.
        </p>
      )}
    </StageSection>
  );
}

/** Opción de la decisión final de Verificación. */
function DecisionCard({
  tone,
  icon,
  title,
  description,
  actionLabel,
  onClick,
  disabled = false,
}: {
  tone: "brand" | "critical" | "warning" | "info";
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const toneClasses = {
    brand: {
      button: "border-line hover:border-brand-600 hover:bg-brand-50/40",
      icon: "bg-brand-50 text-brand-700",
      action: "text-brand-700",
    },
    critical: {
      button: "border-line hover:border-critical hover:bg-critical-soft/40",
      icon: "bg-critical-soft text-critical-ink",
      action: "text-critical-ink",
    },
    warning: {
      button: "border-line hover:border-warning/60 hover:bg-warning-soft/50",
      icon: "bg-warning-soft text-warning-ink",
      action: "text-warning-ink",
    },
    info: {
      button: "border-line hover:border-info/40 hover:bg-info-soft/50",
      icon: "bg-info-soft text-info-ink",
      action: "text-info-ink",
    },
  }[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-left rounded-xl border p-4 transition-all hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:border-line disabled:hover:bg-white disabled:hover:shadow-none",
        toneClasses.button
      )}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            "h-9 w-9 rounded-lg grid place-items-center shrink-0",
            toneClasses.icon
          )}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold text-ink leading-tight">{title}</p>
          <p className="text-[12px] text-ink-quiet mt-1 leading-snug">{description}</p>
          <span
            className={cn(
              "inline-block mt-2.5 text-[12px] font-medium",
              toneClasses.action
            )}
          >
            {disabled ? "No disponible" : `${actionLabel} →`}
          </span>
        </div>
      </div>
    </button>
  );
}

type VerificationResult = "Conforme" | "Con observación";
type ReopenTarget = "Recepción" | "Evaluación" | "Investigación" | "Plan de Acción" | "Ejecución" | "Verificación";

const REOPEN_TARGETS: Array<{ value: ReopenTarget; label: string; description: string }> = [
  { value: "Verificación", label: "Verificación", description: "corregir la revisión final o el cierre" },
  { value: "Ejecución", label: "Ejecución", description: "corregir avances, evidencias o actividades" },
  { value: "Plan de Acción", label: "Plan de Acción", description: "ajustar responsables, áreas o actividades" },
  { value: "Investigación", label: "Investigación", description: "corregir hallazgos, causa raíz o conclusiones" },
  { value: "Evaluación", label: "Evaluación", description: "revisar riesgo, clasificación o asignación" },
  { value: "Recepción", label: "Recepción", description: "revisar el expediente desde el inicio" },
];

export function ExecutionSummaryCard({
  caso,
  panel,
}: {
  caso: CaseDetail;
  panel: "ejecucion" | "prorroga" | "verificacion" | "cierre";
}) {
  const enVerificacion = panel === "verificacion";
  const enProrroga = panel === "prorroga";
  const cerrado = panel === "cierre";
  const progreso = avanceCaso(caso);
  const sinPlan = caso.planes_accion.length === 0;
  const todosPlanesCerrados = caso.planes_accion.length > 0 && caso.planes_accion.every(planCerrado);

  const closeCase = useCloseCase(caso.codigo_sop);
  const keepPending = useKeepPending(caso.codigo_sop);
  const reviewFinalPlan = useReviewFinalPlan(caso.codigo_sop);
  const sendToVerification = useSendToVerification(caso.codigo_sop);

  const [closeOpen, setCloseOpen] = useState(false);
  const [closeNote, setCloseNote] = useState("");
  const [verificationResult, setVerificationResult] = useState<VerificationResult>("Conforme");
  const [pendingOpen, setPendingOpen] = useState(false);
  const [pendingNote, setPendingNote] = useState("");
  const [reopenCaseOpen, setReopenCaseOpen] = useState(false);
  const [reopenCasePlanId, setReopenCasePlanId] = useState("");
  const [reopenCaseNote, setReopenCaseNote] = useState("");
  const [planReview, setPlanReview] = useState<{ plan: PlanAccion; decision: "aprobada" | "rechazada" } | null>(null);
  const [planReviewNote, setPlanReviewNote] = useState("");
  const reopenablePlans = caso.planes_accion.filter((plan) => planRevisablePorSo(plan) || planCerrado(plan));
  const selectedReopenPlan =
    reopenablePlans.find((plan) => String(plan.id_plan) === reopenCasePlanId) ?? reopenablePlans[0] ?? null;

  const openPlanReview = (plan: PlanAccion, decision: "aprobada" | "rechazada") => {
    setPlanReview({ plan, decision });
    setPlanReviewNote("");
  };

  const openCaseReopen = () => {
    setReopenCasePlanId(reopenablePlans[0] ? String(reopenablePlans[0].id_plan) : "");
    setReopenCaseNote("");
    setReopenCaseOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Un caso en Ejecución o Verificación sin plan es una inconsistencia:
          antes esto dejaba el panel central completamente vacío. */}
      {sinPlan && !cerrado && (
        <StageSection
          title={enVerificacion ? "Verificación sin plan registrado" : "Ejecución sin plan registrado"}
          subtitle="El caso avanzó de etapa pero no tiene un Plan de Acción asociado."
          icon={<AlertTriangle className="h-5 w-5" />}
          action={<Pill tone="critical" dot>Requiere atención</Pill>}
        >
          <EmptyState
            className="border-0 bg-transparent py-8"
            icon={<ClipboardList className="h-5 w-5" />}
            title="No hay Plan de Acción para seguir"
            description="No se puede medir el avance ni verificar el cumplimiento sin un plan. Revise el expediente con el área responsable."
          />
        </StageSection>
      )}

      {!sinPlan && !cerrado && (
        <StageSection
          title={enVerificacion ? "Plan de Acción ejecutado" : "Ejecución del Plan de Acción"}
          subtitle={
            enVerificacion
              ? "Revise el cumplimiento de las actividades antes de cerrar el caso."
              : enProrroga
                ? "Hay una solicitud de prórroga pendiente. Resuelva el plan afectado sin detener la lectura de los demás."
                : "El jefe del área ejecuta las actividades. Aquí puede seguir el avance por plan."
          }
          icon={enVerificacion ? <Activity className="h-5 w-5" /> : enProrroga ? <Timer className="h-5 w-5" /> : <Rocket className="h-5 w-5" />}
          action={
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Pill tone={enVerificacion || enProrroga ? "warning" : "brand"} dot>
                {enVerificacion ? "Por verificar" : enProrroga ? "Prórroga pendiente" : "En ejecución"}
              </Pill>
              {panel === "ejecucion" && (
                <StageRollbackButton
                  codigo={caso.codigo_sop}
                  destino="Plan de Acción"
                  label="Volver a Plan de Acción"
                  title="Volver a Plan de Acción"
                  description="El caso regresará a Plan de Acción. Los planes, avances, evidencias y comentarios registrados se mantienen guardados."
                />
              )}
            </div>
          }
        >
          <PlanExecutionBoard caso={caso} cerrado={cerrado} enVerificacion={enVerificacion} openPlanReview={openPlanReview} />
        </StageSection>
      )}

      {!enVerificacion && !cerrado && !sinPlan && (
        <ExecutionVerificationGate
          caso={caso}
          isPending={sendToVerification.isPending}
          onSend={() =>
            sendToVerification.mutate(undefined, {
              onSuccess: () => toast.success("Expediente enviado a Verificación"),
              onError: (e) => toast.error(apiErrorMessage(e, "No se pudo pasar a Verificación")),
            })
          }
        />
      )}

      {enVerificacion && !sinPlan && (
        <VerificationChecklist
          caso={caso}
          progreso={progreso}
          todosPlanesCerrados={todosPlanesCerrados}
          onClose={() => setCloseOpen(true)}
          onKeepPending={() => setPendingOpen(true)}
          onReopenCase={openCaseReopen}
        />
      )}

      {/* El resumen de cierre y la reapertura viven fuera del bloque de plan:
          un caso cerrado sin plan también debe poder consultarse y reabrirse. */}
      {cerrado && <ClosedSummary caso={caso} />}

      <Modal
        open={!!planReview}
        onClose={() => setPlanReview(null)}
        title={
          planReview?.decision === "aprobada"
            ? "Cerrar plan de acción"
            : planReview && planCerrado(planReview.plan)
              ? "Reabrir plan de acción"
              : "Devolver plan al área"
        }
        subtitle={planReview ? `${shortPlanCode(planReview.plan.codigo_plan)} · revisión final individual` : undefined}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPlanReview(null)}>Cancelar</Button>
            <Button
              variant={planReview?.decision === "rechazada" ? "danger" : "primary"}
              disabled={!planReview || reviewFinalPlan.isPending || (planReview.decision === "rechazada" && planReviewNote.trim().length < 5)}
              onClick={() => {
                if (!planReview) return;
                reviewFinalPlan.mutate(
                  {
                    id_plan: planReview.plan.id_plan,
                    decision: planReview.decision,
                    nota: planReviewNote.trim() || undefined,
                  },
                  {
                    onSuccess: () => {
                      toast.success(
                        planReview.decision === "aprobada"
                          ? "Plan cerrado por SO"
                          : planCerrado(planReview.plan)
                            ? "Plan reabierto para corrección"
                            : "Plan devuelto al área"
                      );
                      setPlanReview(null);
                      setPlanReviewNote("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo registrar la revisión final")),
                  }
                );
              }}
            >
              {planReview?.decision === "aprobada" ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Confirmar cierre
                </>
              ) : planReview && planCerrado(planReview.plan) ? (
                <>
                  <CornerUpLeft className="h-4 w-4" /> Reabrir plan
                </>
              ) : (
                <>
                  <CornerUpLeft className="h-4 w-4" /> Devolver
                </>
              )}
            </Button>
          </>
        }
      >
        <Field
          label={
            planReview?.decision === "aprobada"
              ? "Nota de cierre"
              : planReview && planCerrado(planReview.plan)
                ? "Motivo de reapertura"
                : "Motivo de devolución"
          }
          required={planReview?.decision === "rechazada"}
          hint={planReview?.decision === "aprobada" ? "Opcional; queda en la bitácora del expediente." : undefined}
        >
          <Textarea
            value={planReviewNote}
            onChange={(e) => setPlanReviewNote(e.target.value)}
            rows={3}
            placeholder={
              planReview?.decision === "aprobada"
                ? "Conformidad del plan ejecutado..."
                : planReview && planCerrado(planReview.plan)
                  ? "Indique qué no conformidad obliga a reabrir este plan..."
                  : "Indique qué debe corregir el área responsable..."
            }
          />
        </Field>
      </Modal>

      <Modal
        open={closeOpen}
        onClose={() => setCloseOpen(false)}
        title="Cerrar caso"
        subtitle={`${caso.codigo_sop} · el expediente quedará archivado`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCloseOpen(false)}>Cancelar</Button>
            <Button
              disabled={closeCase.isPending}
              onClick={() => {
                const nota = [`Resultado de verificación: ${verificationResult}.`, closeNote.trim()].filter(Boolean).join(" ");
                closeCase.mutate(
                  { nota },
                  {
                    onSuccess: () => {
                      toast.success("Caso cerrado correctamente");
                      setCloseOpen(false);
                      setCloseNote("");
                      setVerificationResult("Conforme");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo cerrar el caso")),
                  }
                );
              }}
            >
              <CheckCircle2 className="h-4 w-4" /> Confirmar cierre
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Field label="Resultado de verificación" required>
            <Select value={verificationResult} onChange={(e) => setVerificationResult(e.target.value as VerificationResult)}>
              <option value="Conforme">Conforme</option>
              <option value="Con observación">Con observación</option>
            </Select>
          </Field>
          <Field label="Nota de cierre" hint="Opcional — queda en la bitácora">
            <Textarea value={closeNote} onChange={(e) => setCloseNote(e.target.value)} rows={3} placeholder="Conclusión de la verificación..." />
          </Field>
          <p className="rounded-lg border border-line-soft bg-surface/50 p-3 text-[12px] text-ink-quiet">
            Si hay una no conformidad, cierre este modal y reabra el plan específico desde su tarjeta.
          </p>
        </div>
      </Modal>

      <Modal
        open={pendingOpen}
        onClose={() => setPendingOpen(false)}
        title="Mantener pendiente"
        subtitle={`${caso.codigo_sop} · permanece en Verificación`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPendingOpen(false)}>Cancelar</Button>
            <Button
              disabled={keepPending.isPending}
              onClick={() =>
                keepPending.mutate(
                  { nota: pendingNote.trim() || undefined },
                  {
                    onSuccess: () => {
                      toast.success("Caso mantenido pendiente en Verificación");
                      setPendingOpen(false);
                      setPendingNote("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo mantener pendiente el caso")),
                  }
                )
              }
            >
              <Timer className="h-4 w-4" /> Guardar decisión
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Field label="Nota de seguimiento" hint="Opcional — queda en la bitácora sin cambiar de etapa">
            <Textarea
              value={pendingNote}
              onChange={(e) => setPendingNote(e.target.value)}
              rows={3}
              placeholder="Ej. Se mantiene pendiente hasta validar una evidencia adicional..."
            />
          </Field>
          <p className="rounded-lg border border-warning/30 bg-warning-soft/50 p-3 text-[12px] text-warning-ink">
            Esta opción no cierra ni devuelve el expediente: solo deja constancia y conserva la etapa de Verificación.
          </p>
        </div>
      </Modal>

      <Modal
        open={reopenCaseOpen}
        onClose={() => setReopenCaseOpen(false)}
        title="Reabrir caso para corrección"
        subtitle={`${caso.codigo_sop} · se devolverá a Ejecución`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReopenCaseOpen(false)}>Cancelar</Button>
            <Button
              variant="danger"
              disabled={!selectedReopenPlan || reopenCaseNote.trim().length < 5 || reviewFinalPlan.isPending}
              onClick={() => {
                if (!selectedReopenPlan) return;
                reviewFinalPlan.mutate(
                  {
                    id_plan: selectedReopenPlan.id_plan,
                    decision: "rechazada",
                    nota: reopenCaseNote.trim(),
                  },
                  {
                    onSuccess: () => {
                      toast.success("Caso reabierto para corrección");
                      setReopenCaseOpen(false);
                      setReopenCasePlanId("");
                      setReopenCaseNote("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo reabrir el caso")),
                  }
                );
              }}
            >
              <CornerUpLeft className="h-4 w-4" /> Reabrir caso
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-warning/30 bg-warning-soft/50 p-3 text-[12px] text-warning-ink">
            Reabrir desde Verificación conserva el historial y devuelve a Ejecución el plan que necesita corrección.
          </div>
          <Field label="Plan a corregir" required>
            <Select value={reopenCasePlanId} onChange={(e) => setReopenCasePlanId(e.target.value)}>
              {reopenablePlans.map((plan) => (
                <option key={plan.id_plan} value={plan.id_plan}>
                  {shortPlanCode(plan.codigo_plan)} · {plan.areas.nombre_area} · {planStatus(plan).label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Motivo de reapertura" required hint="Mínimo 5 caracteres — quedará en la bitácora">
            <Textarea
              value={reopenCaseNote}
              onChange={(e) => setReopenCaseNote(e.target.value)}
              rows={4}
              placeholder="Explique qué evidencia, actividad o validación requiere corrección..."
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}

/** Resumen final del expediente cerrado (ClosedStage del prototipo). */
function ClosedSummary({ caso }: { caso: CaseDetail }) {
  const { user } = useAuth();
  const puedeReabrir = user?.rol === "Admin" || user?.puede_reabrir_casos;
  const reopen = useReopenCase(caso.codigo_sop);
  const [reopenOpen, setReopenOpen] = useState(false);
  const [reopenNote, setReopenNote] = useState("");
  const [reopenTarget, setReopenTarget] = useState<ReopenTarget>("Verificación");

  const creado = new Date(caso.created_at);
  const cierre = caso.timeline_caso.find((t) => t.kind === "cierre");
  const cerradoAt = cierre?.fecha ? new Date(cierre.fecha) : new Date();
  const dias = Math.max(1, Math.round((cerradoAt.getTime() - creado.getTime()) / 86400000));

  const participantes = Array.from(new Set(caso.timeline_caso.map((t) => t.actor).filter(Boolean)));
  const areasResponsables = Array.from(
    new Set(
      caso.planes_accion
        .map((plan) => plan.areas?.nombre_area?.trim())
        .filter((nombre): nombre is string => !!nombre)
    )
  );
  const areasValue =
    areasResponsables.length === 0
      ? "—"
      : areasResponsables.length === 1
        ? areasResponsables[0]
        : `${areasResponsables.length} áreas`;
  const evidenciasPlanes = new Set<string>();
  for (const plan of caso.planes_accion) {
    for (const evidencia of evidenciasDelPlan(caso, plan)) {
      evidenciasPlanes.add(evidencia.anexo?.id_anexo ? `id:${evidencia.anexo.id_anexo}` : `${plan.id_plan}:${evidencia.nombre}`);
    }
  }

  // Orden cronológico ascendente: en un cierre se lee el recorrido del caso
  // de principio a fin, al revés que en el modal de bitácora.
  const historial = [...caso.timeline_caso].sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0));
  const actividades = caso.planes_accion.reduce((acc, p) => acc + p.actividades_plan.length, 0);
  const comentarios = caso.timeline_caso.filter((t) => t.kind === "comentario").length;
  const reaperturas = caso.timeline_caso.filter((t) => t.kind === "reapertura").length;

  const resumen = [
    { label: "Tiempo total de atención", value: dias === 1 ? "1 día" : `${dias} días`, icon: Clock },
    {
      label: areasResponsables.length > 1 ? "Áreas responsables" : "Área responsable",
      value: areasValue,
      icon: Building2,
      detail: areasResponsables.length > 1 ? areasResponsables.join(", ") : undefined,
    },
    { label: "Responsables participantes", value: String(participantes.length), icon: UserIcon, detail: participantes.join(", ") },
    { label: caso.planes_accion.length > 1 ? "Actividades de planes" : "Actividades del plan", value: String(actividades), icon: ClipboardList },
    { label: "Evidencias de planes", value: String(evidenciasPlanes.size), icon: FileText },
    { label: "Comentarios registrados", value: String(comentarios), icon: Activity },
  ];

  return (
    <StageSection
      title="Caso cerrado"
      subtitle="Resumen del ciclo completo del expediente."
      icon={<CheckCircle2 className="h-5 w-5" />}
      action={
        <div className="flex items-center gap-2">
          {reaperturas > 0 && (
            <Pill tone="warning" dot>
              {reaperturas} {reaperturas === 1 ? "reapertura" : "reaperturas"}
            </Pill>
          )}
          <Pill tone="neutral" dot>Archivado</Pill>
        </div>
      }
    >
      <div className="close-success-card rounded-2xl border border-brand-200 bg-brand-50/70 px-5 py-7 text-center">
        <span className="close-success-icon mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-700 text-white shadow-[0_14px_34px_-16px_rgba(15,107,62,0.8)]">
          <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle className="close-success-ring" cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="3.5" opacity="0.95" />
            <path className="close-success-check" d="M16.5 24.5l5.1 5.1L32.5 18.7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-4 text-[13px] font-semibold uppercase tracking-wide text-brand-700 animate-[fadeIn_0.4s_ease-out_0.38s_both]">Caso cerrado correctamente</p>
        <p className="mt-1 font-mono text-[28px] font-bold tracking-tight text-ink animate-[fadeIn_0.42s_ease-out_0.5s_both]">{caso.codigo_sop}</p>
        <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-ink-soft">
          El expediente quedó archivado con su historial, planes de acción, evidencias y comentarios registrados.
        </p>
      </div>

      {puedeReabrir && (
        <div className="mt-4 pt-4 border-t border-line-soft flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[11.5px] text-ink-quiet">
            Reabrir conserva el historial y permite elegir la etapa exacta a corregir.
          </p>
          <Button variant="outline" size="sm" onClick={() => setReopenOpen(true)}>
            <CornerUpLeft className="h-4 w-4" /> Reabrir caso
          </Button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {resumen.map((r) => (
          <Card key={r.label} padded={false} className="p-3.5 shadow-none">
            <div className="flex items-start gap-2.5">
              <span className="h-8 w-8 rounded-lg bg-surface-2 text-ink-soft grid place-items-center shrink-0">
                <r.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-ink-faint">{r.label}</p>
                <p className="text-[14px] font-semibold text-ink mt-0.5 break-words">{r.value}</p>
                {r.detail && <p className="text-[11px] text-ink-quiet mt-1 leading-snug break-words">{r.detail}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {cierre?.fecha && (
        <p className="mt-4 pt-3 border-t border-line-soft text-[11.5px] text-ink-faint break-words">
          Cerrado {formatDateTime(cierre.fecha)}
          {cierre.detalle ? ` · ${compactPlanCodes(humanEvidenceDetail(cierre.detalle))}` : ""}
        </p>
      )}

      {/* Historial completo del expediente. En un caso cerrado la bitácora es
          el entregable de auditoría, así que se muestra inline y no solo
          detrás del modal de la cabecera. */}
      <div className="mt-4 pt-4 border-t border-line-soft">
        <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2.5">
          Historial completo ({historial.length} eventos)
        </p>
        <ol className="space-y-0">
          {historial.map((t, i) => (
            <li key={t.id_evento} className="flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <span className="h-2 w-2 rounded-full bg-brand-600 mt-1.5" />
                {i < historial.length - 1 && <span className="w-px flex-1 bg-line" />}
              </div>
              <div className="min-w-0 pb-3">
                <p className="text-[12.5px] font-medium text-ink leading-snug break-words">{compactPlanCodes(t.titulo)}</p>
                <p className="text-[10.5px] text-ink-quiet mt-0.5">
                  {actorLine(t.actor_rol, t.actor)}
                  {t.fecha ? ` · ${formatDateTime(t.fecha)}` : ""}
                </p>
                {t.detalle && (
                  <p className="text-[11.5px] text-ink-soft mt-1 leading-relaxed break-words">
                    {compactPlanCodes(humanEvidenceDetail(t.detalle))}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Modal
        open={reopenOpen}
        onClose={() => setReopenOpen(false)}
        title="Reabrir caso para edición"
        subtitle={`${caso.codigo_sop} · seleccione la etapa de retorno`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReopenOpen(false)}>Cancelar</Button>
            <Button
              variant="danger"
              disabled={reopenNote.trim().length < 5 || reopen.isPending}
              onClick={() =>
                reopen.mutate(
                  { nota: reopenNote.trim(), destino: reopenTarget },
                  {
                    onSuccess: () => {
                      toast.success(`Caso reabierto a ${reopenTarget}`);
                      setReopenOpen(false);
                      setReopenNote("");
                      setReopenTarget("Verificación");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo reabrir el caso")),
                  }
                )
              }
            >
              <CornerUpLeft className="h-4 w-4" /> Confirmar reapertura
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-warning/30 bg-warning-soft/50 p-3 text-[12px] leading-relaxed text-warning-ink">
            Toda la información anterior se conserva. La reapertura solo cambia la etapa del expediente y registra el motivo en la bitácora.
          </div>
          <Field label="Etapa a la que desea volver" required>
            <Select value={reopenTarget} onChange={(e) => setReopenTarget(e.target.value as ReopenTarget)}>
              {REOPEN_TARGETS.map((target) => (
                <option key={target.value} value={target.value}>
                  {target.label} — {target.description}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Motivo de la reapertura" required hint="Mínimo 5 caracteres — queda en la bitácora del expediente">
            <Textarea
              value={reopenNote}
              onChange={(e) => setReopenNote(e.target.value)}
              rows={4}
              placeholder="Explique por qué se reabre el caso y qué se debe corregir..."
            />
          </Field>
        </div>
      </Modal>
    </StageSection>
  );
}
