// Centro de Decisiones: bandeja única de todo lo que espera una decisión de
// Seguridad Operativa. Hasta ahora había que entrar expediente por expediente
// para descubrir cuáles estaban esperando algo; aquí se ven todos juntos y
// ordenados por urgencia real (riesgo y SLA), no por fecha de creación.
//
// La lista se deriva de workflow.ts, que es la fuente de verdad de qué puede
// hacer SO en cada estado. Si mañana se agrega un estado al flujo, basta con
// declararlo en DECISIONES para que aparezca en la bandeja.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Gavel,
  Inbox,
  MessageSquareWarning,
  ShieldCheck,
  Timer,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill, RiskPill } from "@/design-system/primitives/Pill";
import { EmptyState } from "@/design-system/primitives/Progress";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { Skeleton } from "@/design-system/primitives/Skeleton";
import { CountUp } from "@/design-system/motion/motion";
import { riseItem, staggerContainer } from "@/design-system/motion/variants";
import { useCases } from "@/features/cases/hooks/useCases";
import { useApproveCase, useRejectCase } from "@/features/cases/hooks/useCaseActions";
import { toCaseRow, type CaseRow } from "@/features/cases/adapter";
import { riskCategory } from "@/features/cases/domain";
import { slaEstado } from "@/features/cases/lib/sla";
import { apiErrorMessage } from "@/lib/api";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

type TipoDecision = "recepcion" | "evaluacion" | "info" | "investigacion" | "plan" | "prorroga" | "verificacion";

interface SpecDecision {
  tipo: TipoDecision;
  /** Qué tiene que hacer SO, en imperativo y en una línea. */
  pide: string;
  grupo: string;
  icono: typeof Inbox;
  tone: "brand" | "warning" | "critical" | "info" | "neutral";
  /** Solo Recepción se resuelve desde la bandeja; el resto necesita el expediente. */
  resolubleAqui?: boolean;
}

/**
 * Estados del catálogo "Estado Hallazgo" que dependen de SO. Se omiten a
 * propósito Ejecución (le toca al área), Cerrado y Rechazado (terminales).
 */
const DECISIONES: Record<string, SpecDecision> = {
  Recepción: {
    tipo: "recepcion",
    pide: "Aprobar o rechazar el reporte recibido",
    grupo: "Reportes nuevos",
    icono: Inbox,
    tone: "info",
    resolubleAqui: true,
  },
  Evaluación: {
    tipo: "evaluacion",
    pide: "Clasificar con la matriz de riesgo",
    grupo: "Por evaluar",
    icono: ShieldCheck,
    tone: "warning",
  },
  // Estado heredado de los casos sembrados antes del módulo de gestión;
  // workflow.ts ya lo trata como una Evaluación y aquí se hace lo mismo.
  "En Proceso": {
    tipo: "evaluacion",
    pide: "Clasificar con la matriz de riesgo",
    grupo: "Por evaluar",
    icono: ShieldCheck,
    tone: "warning",
  },
  "Pendiente de Información": {
    tipo: "info",
    pide: "Registrar la respuesta a la información solicitada",
    grupo: "Esperando información",
    icono: MessageSquareWarning,
    tone: "neutral",
  },
  Investigación: {
    tipo: "investigacion",
    pide: "Registrar hallazgos, causa raíz y conclusiones",
    grupo: "Investigación abierta",
    icono: FileSearch,
    tone: "warning",
  },
  "Plan de Acción": {
    tipo: "plan",
    pide: "Definir el plan de acción y asignarlo al área",
    grupo: "Sin plan de acción",
    icono: ClipboardList,
    tone: "brand",
  },
  "Prórroga Solicitada": {
    tipo: "prorroga",
    pide: "Resolver la ampliación de plazo pedida por el área",
    grupo: "Prórrogas por resolver",
    icono: Timer,
    tone: "warning",
  },
  Verificación: {
    tipo: "verificacion",
    pide: "Verificar la ejecución y cerrar el expediente",
    grupo: "Por verificar",
    icono: Gavel,
    tone: "brand",
  },
};

/** Orden de la bandeja: primero lo que puede costar caro dejar esperando. */
function urgencia(c: CaseRow): number {
  const sla = slaEstado(c.slaDueDate, c.stage);
  const porSla = sla === "overdue" ? 0 : sla === "soon" ? 1 : 2;
  const categoria = c.risk ? riskCategory(c.risk) : null;
  const porRiesgo = categoria === "inaceptable" ? 0 : categoria === "no_deseable" ? 1 : 2;
  return porSla * 10 + porRiesgo;
}

export function SoDecisionesPage() {
  const { data, isLoading } = useCases();
  const [filtro, setFiltro] = useState<TipoDecision | "todas">("todas");
  const [rechazando, setRechazando] = useState<CaseRow | null>(null);

  const pendientes = useMemo(() => {
    const filas = (data ?? [])
      .map(toCaseRow)
      .filter((c) => DECISIONES[c.estado])
      .sort((a, b) => {
        const u = urgencia(a) - urgencia(b);
        if (u !== 0) return u;
        // A igual urgencia, lo que lleva más tiempo esperando va primero.
        return +new Date(a.createdAt) - +new Date(b.createdAt);
      });
    return filas;
  }, [data]);

  const conteos = useMemo(() => {
    const m = new Map<TipoDecision, number>();
    for (const c of pendientes) {
      const t = DECISIONES[c.estado].tipo;
      m.set(t, (m.get(t) ?? 0) + 1);
    }
    return m;
  }, [pendientes]);

  const vencidos = useMemo(
    () => pendientes.filter((c) => slaEstado(c.slaDueDate, c.stage) === "overdue").length,
    [pendientes]
  );

  const visibles = filtro === "todas" ? pendientes : pendientes.filter((c) => DECISIONES[c.estado].tipo === filtro);

  // Un chip por tipo con decisiones pendientes; los tipos vacíos no se muestran
  // para que la barra no se llene de ceros.
  const chips = useMemo(() => {
    const vistos = new Map<TipoDecision, SpecDecision>();
    for (const spec of Object.values(DECISIONES)) {
      if (!vistos.has(spec.tipo) && (conteos.get(spec.tipo) ?? 0) > 0) vistos.set(spec.tipo, spec);
    }
    return [...vistos.values()];
  }, [conteos]);

  return (
    <SeguridadOperativaShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-700 mb-1.5">Bandeja de Seguridad Operativa</p>
          <h1 className="text-[22px] font-bold text-ink leading-tight tracking-tight">Centro de Decisiones</h1>
          <p className="text-[13.5px] text-ink-quiet mt-1.5 max-w-2xl">
            Todo lo que está esperando una decisión suya, ordenado por urgencia: primero lo que ya venció su plazo y lo de riesgo
            inaceptable.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {vencidos > 0 && (
            <Pill tone="critical" dot>
              {vencidos} con plazo vencido
            </Pill>
          )}
          <Pill tone="brand" dot>
            <CountUp value={pendientes.length} /> pendientes
          </Pill>
        </div>
      </div>

      {chips.length > 0 && (
        <motion.div className="mt-5 flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" animate="visible">
          <ChipFiltro activo={filtro === "todas"} onClick={() => setFiltro("todas")} label="Todas" total={pendientes.length} />
          {chips.map((spec) => (
            <ChipFiltro
              key={spec.tipo}
              activo={filtro === spec.tipo}
              onClick={() => setFiltro(spec.tipo)}
              label={spec.grupo}
              total={conteos.get(spec.tipo) ?? 0}
              icono={<spec.icono className="h-3.5 w-3.5" />}
            />
          ))}
        </motion.div>
      )}

      <div className="mt-5">
        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-2.5 w-1/2" />
                  </div>
                  <Skeleton className="h-9 w-28 rounded-lg shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        ) : visibles.length === 0 ? (
          <EmptyState
            icon={<CheckCircle2 className="h-6 w-6" />}
            title={pendientes.length === 0 ? "No hay decisiones pendientes" : "Nada pendiente en este filtro"}
            description={
              pendientes.length === 0
                ? "Todos los expedientes están en manos de las áreas responsables o ya cerrados."
                : "Pruebe con otro grupo de la barra superior."
            }
          />
        ) : (
          <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" animate="visible">
            {visibles.map((caso) => (
              <FilaDecision key={caso.id} caso={caso} onRechazar={() => setRechazando(caso)} />
            ))}
          </motion.div>
        )}
      </div>

      {rechazando && <ModalRechazo caso={rechazando} onClose={() => setRechazando(null)} />}
    </SeguridadOperativaShell>
  );
}

function ChipFiltro({
  activo,
  onClick,
  label,
  total,
  icono,
}: {
  activo: boolean;
  onClick: () => void;
  label: string;
  total: number;
  icono?: React.ReactNode;
}) {
  return (
    <motion.button
      variants={riseItem}
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
        activo ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-white text-ink-soft hover:border-brand-300"
      )}
    >
      {icono}
      {label}
      <span className={cn("tabular-nums rounded-full px-1.5 text-[11px]", activo ? "bg-brand-600 text-white" : "bg-surface-2 text-ink-quiet")}>
        {total}
      </span>
    </motion.button>
  );
}

function FilaDecision({ caso, onRechazar }: { caso: CaseRow; onRechazar: () => void }) {
  const spec = DECISIONES[caso.estado];
  const aprobar = useApproveCase(caso.id);
  const sla = slaEstado(caso.slaDueDate, caso.stage);
  const Icono = spec.icono;

  return (
    <motion.div variants={riseItem}>
      <Card
        className={cn(
          "p-4 transition-colors",
          sla === "overdue" && "border-critical/35 bg-critical-soft/20",
          sla === "soon" && "border-warning/35"
        )}
      >
        <div className="flex flex-wrap items-start gap-4">
          <div
            className={cn(
              "h-10 w-10 rounded-xl grid place-items-center shrink-0",
              spec.tone === "critical" && "bg-critical-soft text-critical-ink",
              spec.tone === "warning" && "bg-warning-soft text-warning-ink",
              spec.tone === "info" && "bg-info-soft text-info-ink",
              spec.tone === "brand" && "bg-brand-50 text-brand-700",
              spec.tone === "neutral" && "bg-surface-2 text-ink-soft"
            )}
          >
            <Icono className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link to={`/seguridad/casos/${caso.id}`} className="font-mono text-[13px] font-bold text-brand-700 hover:underline">
                {caso.id}
              </Link>
              <Pill tone={spec.tone === "neutral" ? "neutral" : spec.tone}>{caso.estado}</Pill>
              {caso.risk && <RiskPill risk={caso.risk} />}
              {sla === "overdue" && (
                <Pill tone="critical" dot>
                  Plazo vencido
                </Pill>
              )}
              {sla === "soon" && (
                <Pill tone="warning" dot>
                  Por vencer
                </Pill>
              )}
            </div>

            {/* Los casos sin `titulo` propio caen a la descripción completa
                (ver deriveTitle en el adapter), que puede ser un párrafo
                entero: se recorta a dos líneas para no romper la fila. */}
            <p className="mt-1.5 line-clamp-2 text-[13.5px] font-semibold text-ink leading-snug">{caso.title}</p>
            <p className="mt-1 text-[12px] text-ink-quiet">
              {spec.pide}
              {caso.station && ` · ${caso.station}`}
              {caso.area && ` · ${caso.area}`}
              {` · en el sistema ${relativeTime(caso.createdAt)}`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {spec.resolubleAqui ? (
              <>
                <Button
                  size="sm"
                  disabled={aprobar.isPending}
                  onClick={() =>
                    aprobar.mutate(undefined, {
                      onSuccess: () => toast.success(`${caso.id} aprobado, pasa a Evaluación`),
                      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo aprobar el reporte")),
                    })
                  }
                >
                  <CheckCircle2 className="h-4 w-4" /> Aprobar
                </Button>
                <Button variant="ghost" size="sm" className="text-critical hover:bg-critical-soft" onClick={onRechazar}>
                  <X className="h-4 w-4" /> Rechazar
                </Button>
              </>
            ) : (
              // Evaluar, investigar, planificar o verificar requieren el
              // formulario completo del expediente; desde aquí solo se enruta.
              <Link
                to={`/seguridad/casos/${caso.id}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-[12.5px] font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-800"
              >
                Resolver
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ModalRechazo({ caso, onClose }: { caso: CaseRow; onClose: () => void }) {
  const [motivo, setMotivo] = useState("");
  const rechazar = useRejectCase(caso.id);

  return (
    <Modal
      open
      onClose={onClose}
      title="Rechazar reporte"
      subtitle={`${caso.id} · el expediente queda archivado como Rechazado`}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            disabled={rechazar.isPending || motivo.trim().length < 5}
            onClick={() =>
              rechazar.mutate(
                { motivo: motivo.trim() },
                {
                  onSuccess: () => {
                    toast.success(`${caso.id} rechazado`);
                    onClose();
                  },
                  onError: (e) => toast.error(apiErrorMessage(e, "No se pudo rechazar el reporte")),
                }
              )
            }
          >
            <X className="h-4 w-4" /> Rechazar
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning-soft/50 p-3">
          <AlertTriangle className="h-4 w-4 text-warning-ink shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-ink-soft">{caso.title}</p>
        </div>
        <Field label="Motivo del rechazo" required hint="Queda en la bitácora del expediente y lo ve quien reportó.">
          <Textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={3}
            placeholder="Explique por qué el reporte no procede…"
          />
        </Field>
      </div>
    </Modal>
  );
}
