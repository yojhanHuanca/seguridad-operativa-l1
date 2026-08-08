import { useMemo, useState, type ReactNode } from "react";
import {
  Activity, ClipboardList, Microscope, CheckCircle2, CornerUpLeft, Clock,
  Building2, FileText, User as UserIcon, Rocket, AlertTriangle, Timer, Gavel,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { EmptyState, Progress } from "@/design-system/primitives/Progress";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { StageSection } from "@/features/cases/components/CaseParts";
import { useCloseCase, useKeepPending, useReopenCase } from "@/features/cases/hooks/useCaseActions";
import { ACTOR_ROL_LABEL } from "@/features/cases/lib/workflow";
import { apiErrorMessage } from "@/lib/api";
import { formatDate, formatDateTime, relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EvidencePanel } from "./EvidencePanel";
import type { ActividadPlan, CaseDetail, PlanAccion } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx → ExecutionStage / VerificationStage
// / ClosedStage. Las tres comparten la lectura del plan ejecutado y se
// diferencian por las acciones disponibles para Seguridad Operativa.
function InvBlock({ label, value, tone }: { label: string; value: string; tone?: "critical" }) {
  return (
    <div>
      <p className={cn("text-[11px] font-semibold tracking-wide uppercase mb-1.5", tone === "critical" ? "text-critical-ink" : "text-ink-faint")}>
        {label}
      </p>
      <p className="text-[13.5px] text-ink-soft leading-relaxed">{value}</p>
    </div>
  );
}

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

function avancePlan(plan: PlanAccion): number {
  if (plan.actividades_plan.length === 0) return 0;
  const total = plan.actividades_plan.reduce((acc, a) => acc + avanceActividad(a), 0);
  return Math.round(total / plan.actividades_plan.length);
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

/** Opción de la decisión final de Verificación. */
function DecisionCard({
  tone,
  icon,
  title,
  description,
  actionLabel,
  onClick,
}: {
  tone: "brand" | "critical";
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left rounded-xl border p-4 transition-all hover:shadow-sm",
        tone === "brand"
          ? "border-line hover:border-brand-600 hover:bg-brand-50/40"
          : "border-line hover:border-critical hover:bg-critical-soft/40"
      )}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            "h-9 w-9 rounded-lg grid place-items-center shrink-0",
            tone === "brand" ? "bg-brand-50 text-brand-700" : "bg-critical-soft text-critical-ink"
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
              tone === "brand" ? "text-brand-700" : "text-critical-ink"
            )}
          >
            {actionLabel} →
          </span>
        </div>
      </div>
    </button>
  );
}

export function ExecutionSummaryCard({
  caso,
  panel,
}: {
  caso: CaseDetail;
  panel: "ejecucion" | "verificacion" | "cierre";
}) {
  const enVerificacion = panel === "verificacion";
  const cerrado = panel === "cierre";
  const inv = caso.investigacion_caso;
  const progreso = avanceCaso(caso);
  const sinPlan = caso.planes_accion.length === 0;

  // Comentarios de avance que dejó el área al actualizar cada actividad.
  const seguimiento = useMemo(
    () =>
      caso.timeline_caso
        .filter((t) => t.kind === "seguimiento" || t.kind === "ampliacion")
        .sort((a, b) => +new Date(b.fecha ?? 0) - +new Date(a.fecha ?? 0)),
    [caso.timeline_caso]
  );

  const closeCase = useCloseCase(caso.codigo_sop);
  const keepPending = useKeepPending(caso.codigo_sop);

  const [closeOpen, setCloseOpen] = useState(false);
  const [closeNote, setCloseNote] = useState("");
  const [pendingOpen, setPendingOpen] = useState(false);
  const [pendingNote, setPendingNote] = useState("");

  return (
    <div className="space-y-4">
      {inv && (
        <StageSection title="Investigación" subtitle="Hallazgos y causa raíz." icon={<Microscope className="h-5 w-5" />}>
          <div className="space-y-4">
            <InvBlock label="Descripción de evento" value={inv.hallazgos} />
            <InvBlock label="Causa raíz" value={inv.causa_raiz} tone="critical" />
            <InvBlock label="Conclusiones" value={inv.conclusiones} />
          </div>
        </StageSection>
      )}

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

      {!sinPlan && (
        <StageSection
          title={enVerificacion || cerrado ? "Plan de Acción ejecutado" : "Ejecución del Plan de Acción"}
          subtitle={
            enVerificacion
              ? "Revise el cumplimiento de las actividades antes de cerrar el caso."
              : cerrado
                ? "Actividades ejecutadas por el área responsable."
                : "El jefe del área ejecuta las actividades. Aquí puede seguir el avance."
          }
          icon={enVerificacion ? <Activity className="h-5 w-5" /> : <Rocket className="h-5 w-5" />}
          action={
            <Pill tone={cerrado ? "neutral" : enVerificacion ? "warning" : "brand"} dot>
              {cerrado ? "Cerrado" : enVerificacion ? "Por verificar" : "En ejecución"}
            </Pill>
          }
        >
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-ink-quiet">Progreso general</span>
            </div>
            <Progress value={progreso} showLabel tone={progreso === 100 ? "brand" : "warning"} />
          </div>

          <div className="space-y-3">
            {caso.planes_accion.map((plan) => (
              <div key={plan.id_plan} className="rounded-lg border border-line p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[12px] font-semibold text-brand-700">{plan.codigo_plan}</span>
                  <Pill tone={plan.catalogo_detalle.nombre === "Cerrado" ? "neutral" : "brand"} dot>
                    {plan.catalogo_detalle.nombre}
                  </Pill>
                </div>
                <p className="mt-2 text-[13px] text-ink-soft">{plan.descripcion}</p>
                <p className="mt-1.5 text-[11px] text-ink-quiet">
                  {plan.areas.nombre_area} · {plan.usuarios.nombre} · vence{" "}
                  {formatDate(plan.fecha_reprogramada ?? plan.fecha_plan)}
                  {plan.fecha_reprogramada && " (reprogramada)"}
                </p>

                {/* Ampliaciones ya resueltas: queda constancia de que la fecha
                    se movió y por qué, sin tener que abrir la bitácora. */}
                {plan.prorroga_estado && plan.prorroga_estado !== "pendiente" && (
                  <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-surface border border-line-soft p-2.5">
                    <Timer className="h-3.5 w-3.5 text-ink-faint shrink-0 mt-0.5" />
                    <div className="min-w-0 text-[11.5px]">
                      <span className={cn("font-semibold", plan.prorroga_estado === "aprobada" ? "text-ink" : "text-critical-ink")}>
                        Ampliación {plan.prorroga_estado}
                      </span>
                      {plan.prorroga_fecha && ` · fecha propuesta ${formatDate(plan.prorroga_fecha)}`}
                      {plan.prorroga_motivo && <p className="text-ink-quiet mt-0.5">{plan.prorroga_motivo}</p>}
                    </div>
                  </div>
                )}

                {plan.actividades_plan.length > 0 && (
                  <>
                    <div className="mt-2.5">
                      <Progress value={avancePlan(plan)} showLabel />
                    </div>
                    <div className="mt-3 space-y-1.5 border-t border-line-soft pt-2.5">
                      {plan.actividades_plan.map((act) => (
                        <div key={act.id_actividad} className="flex items-start justify-between gap-2 text-[12.5px]">
                          <div className="min-w-0">
                            <span className="text-ink-soft">{act.descripcion}</span>
                            <p className="text-[10.5px] text-ink-faint mt-0.5">
                              {act.usuarios?.nombre ?? "Sin responsable"}
                              {act.fecha_fin ? ` · vence ${formatDate(act.fecha_fin)}` : ""}
                            </p>
                          </div>
                          <Pill tone={ACTIVIDAD_TONE[act.catalogo_detalle?.nombre ?? "Pendiente"] ?? "neutral"} dot>
                            {act.catalogo_detalle?.nombre ?? "Pendiente"}
                          </Pill>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Seguimiento del área: los comentarios de avance que registró el
              Jefe de Área al actualizar cada actividad. */}
          {seguimiento.length > 0 && (
            <div className="mt-5 pt-4 border-t border-line-soft">
              <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2.5">
                Seguimiento del área ({seguimiento.length})
              </p>
              <div className="space-y-2">
                {seguimiento.map((s) => (
                  <div key={s.id_evento} className="rounded-lg border border-line-soft bg-surface/50 p-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[12.5px] font-medium text-ink leading-snug">{s.titulo}</p>
                      <span className="text-[10.5px] text-ink-faint shrink-0">
                        {s.fecha ? relativeTime(s.fecha) : ""}
                      </span>
                    </div>
                    {s.detalle && <p className="text-[12px] text-ink-soft mt-1 leading-relaxed">{s.detalle}</p>}
                    <p className="text-[10.5px] text-ink-quiet mt-1">
                      {ACTOR_ROL_LABEL[s.actor_rol] ?? s.actor_rol} · {s.actor}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <EvidencePanel caso={caso} puedeAdjuntar={!cerrado} compact />
          </div>
        </StageSection>
      )}

      {/* Decisión final de Verificación, como tarjetas: cada opción dice qué
          consecuencia tiene, en vez de dos botones sin contexto. */}
      {enVerificacion && (
        <StageSection
          title="Decisión de verificación"
          subtitle="Revise la investigación y el plan ejecutado, y resuelva el expediente."
          icon={<Gavel className="h-5 w-5" />}
          action={<Pill tone="warning" dot>Pendiente de decisión</Pill>}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <DecisionCard
              tone="brand"
              icon={<CheckCircle2 className="h-4.5 w-4.5" />}
              title="Aprobar y cerrar"
              description="El cumplimiento es conforme. El expediente se archiva con su historial completo."
              actionLabel="Cerrar caso"
              onClick={() => setCloseOpen(true)}
            />
            <DecisionCard
              tone="critical"
              icon={<CornerUpLeft className="h-4.5 w-4.5" />}
              title="Devolver a ejecución"
              description="Falta cumplimiento o evidencia. Vuelve al área con un motivo obligatorio."
              actionLabel="Mantener pendiente"
              onClick={() => setPendingOpen(true)}
            />
          </div>
          {progreso < 100 && (
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-warning-soft border border-warning/30 p-3 text-[12px] text-warning-ink">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              El plan está al {progreso}%: hay actividades sin completar. Verifique antes de cerrar.
            </p>
          )}
        </StageSection>
      )}

      {/* El resumen de cierre y la reapertura viven fuera del bloque de plan:
          un caso cerrado sin plan también debe poder consultarse y reabrirse. */}
      {cerrado && <ClosedSummary caso={caso} />}

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
              onClick={() =>
                closeCase.mutate(
                  { nota: closeNote.trim() || undefined },
                  {
                    onSuccess: () => {
                      toast.success("Caso cerrado correctamente");
                      setCloseOpen(false);
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo cerrar el caso")),
                  }
                )
              }
            >
              <CheckCircle2 className="h-4 w-4" /> Confirmar cierre
            </Button>
          </>
        }
      >
        <Field label="Nota de cierre" hint="Opcional — queda en la bitácora">
          <Textarea value={closeNote} onChange={(e) => setCloseNote(e.target.value)} rows={3} placeholder="Conclusión de la verificación…" />
        </Field>
      </Modal>

      <Modal
        open={pendingOpen}
        onClose={() => setPendingOpen(false)}
        title="Devolver a ejecución"
        subtitle={`${caso.codigo_sop} · indique qué falta para dar conforme`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPendingOpen(false)}>Cancelar</Button>
            <Button
              variant="danger"
              disabled={!pendingNote.trim() || keepPending.isPending}
              onClick={() =>
                keepPending.mutate(
                  { nota: pendingNote.trim() },
                  {
                    onSuccess: () => {
                      toast.success("Caso devuelto a Ejecución");
                      setPendingOpen(false);
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo devolver el caso")),
                  }
                )
              }
            >
              <CornerUpLeft className="h-4 w-4" /> Devolver
            </Button>
          </>
        }
      >
        <Field label="Motivo" required>
          <Textarea value={pendingNote} onChange={(e) => setPendingNote(e.target.value)} rows={3} placeholder="¿Qué falta para dar conforme la verificación?" />
        </Field>
      </Modal>
    </div>
  );
}

/** Resumen final del expediente cerrado (ClosedStage del prototipo). */
function ClosedSummary({ caso }: { caso: CaseDetail }) {
  const reopen = useReopenCase(caso.codigo_sop);
  const [reopenOpen, setReopenOpen] = useState(false);
  const [reopenNote, setReopenNote] = useState("");

  const creado = new Date(caso.created_at);
  const cierre = caso.timeline_caso.find((t) => t.kind === "cierre");
  const cerradoAt = cierre?.fecha ? new Date(cierre.fecha) : new Date();
  const dias = Math.max(1, Math.round((cerradoAt.getTime() - creado.getTime()) / 86400000));

  const participantes = Array.from(new Set(caso.timeline_caso.map((t) => t.actor).filter(Boolean)));
  // Orden cronológico ascendente: en un cierre se lee el recorrido del caso
  // de principio a fin, al revés que en el modal de bitácora.
  const historial = [...caso.timeline_caso].sort((a, b) => +new Date(a.fecha ?? 0) - +new Date(b.fecha ?? 0));
  const actividades = caso.planes_accion.reduce((acc, p) => acc + p.actividades_plan.length, 0);
  const comentarios = caso.timeline_caso.filter((t) => t.kind === "comentario").length;
  const reaperturas = caso.timeline_caso.filter((t) => t.kind === "reapertura").length;

  const resumen = [
    { label: "Tiempo total de atención", value: dias === 1 ? "1 día" : `${dias} días`, icon: Clock },
    { label: "Área responsable", value: caso.areas?.nombre_area ?? "—", icon: Building2 },
    { label: "Responsables participantes", value: String(participantes.length), icon: UserIcon, detail: participantes.join(", ") },
    { label: "Actividades del plan", value: String(actividades), icon: ClipboardList },
    { label: "Evidencias adjuntas", value: String(caso.anexos_caso.length), icon: FileText },
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
      <div className="grid sm:grid-cols-2 gap-3">
        {resumen.map((r) => (
          <Card key={r.label} padded={false} className="p-3.5 shadow-none">
            <div className="flex items-start gap-2.5">
              <span className="h-8 w-8 rounded-lg bg-surface-2 text-ink-soft grid place-items-center shrink-0">
                <r.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-ink-faint">{r.label}</p>
                <p className="text-[14px] font-semibold text-ink mt-0.5">{r.value}</p>
                {r.detail && <p className="text-[11px] text-ink-quiet mt-1 leading-snug">{r.detail}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {cierre?.fecha && (
        <p className="mt-4 pt-3 border-t border-line-soft text-[11.5px] text-ink-faint">
          Cerrado {formatDateTime(cierre.fecha)}
          {cierre.detalle ? ` · ${cierre.detalle}` : ""}
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
                <p className="text-[12.5px] font-medium text-ink leading-snug">{t.titulo}</p>
                <p className="text-[10.5px] text-ink-quiet mt-0.5">
                  {ACTOR_ROL_LABEL[t.actor_rol] ?? t.actor_rol} · {t.actor}
                  {t.fecha ? ` · ${formatDateTime(t.fecha)}` : ""}
                </p>
                {t.detalle && <p className="text-[11.5px] text-ink-soft mt-1 leading-relaxed">{t.detalle}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 pt-4 border-t border-line-soft flex items-center justify-between gap-3 flex-wrap">
        <p className="text-[11.5px] text-ink-quiet">
          Reabrir devuelve el caso a Verificación y queda registrado en la bitácora.
        </p>
        <Button variant="outline" size="sm" onClick={() => setReopenOpen(true)}>
          <CornerUpLeft className="h-4 w-4" /> Reabrir caso
        </Button>
      </div>

      <Modal
        open={reopenOpen}
        onClose={() => setReopenOpen(false)}
        title="Reabrir caso"
        subtitle={`${caso.codigo_sop} · volverá a Verificación`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReopenOpen(false)}>Cancelar</Button>
            <Button
              disabled={!reopenNote.trim() || reopen.isPending}
              onClick={() =>
                reopen.mutate(
                  { nota: reopenNote.trim() },
                  {
                    onSuccess: () => {
                      toast.success("Caso reabierto, vuelve a Verificación");
                      setReopenOpen(false);
                      setReopenNote("");
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
        <Field label="Motivo de la reapertura" required hint="Queda en la bitácora del expediente">
          <Textarea
            value={reopenNote}
            onChange={(e) => setReopenNote(e.target.value)}
            rows={3}
            placeholder="¿Por qué se reabre el caso? Ej. reincidencia del hallazgo en la misma estación…"
          />
        </Field>
      </Modal>
    </StageSection>
  );
}
