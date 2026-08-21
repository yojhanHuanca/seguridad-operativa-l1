import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileWarning,
  Filter,
  FolderOpen,
  Search,
  ShieldAlert,
  Timer,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { EmptyState } from "@/design-system/primitives/Progress";
import { Input, Select } from "@/design-system/primitives/Input";
import { Pill, RiskPill, StagePill } from "@/design-system/primitives/Pill";
import { Skeleton } from "@/design-system/primitives/Skeleton";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow, type CaseRow } from "@/features/cases/adapter";
import { riskCategory, STAGE_STATUS } from "@/features/cases/domain";
import { diasRestantes, slaEstado } from "@/features/cases/lib/sla";
import { cn } from "@/lib/utils";
import { daysUntil, formatDate, relativeTime } from "@/lib/format";

type Severity = "critica" | "alta" | "media";
type AlertType = "sla" | "riesgo" | "prorroga" | "decision" | "info" | "validacion";

interface AlertItem {
  id: string;
  codigo: string;
  title: string;
  detail: string;
  action: string;
  severity: Severity;
  type: AlertType;
  icon: LucideIcon;
  caseRow: CaseRow;
  dueDate?: string | null;
  days?: number | null;
  planCode?: string;
}

const SEVERITY_META: Record<Severity, { label: string; tone: "critical" | "warning" | "info"; className: string }> = {
  critica: {
    label: "Critica",
    tone: "critical",
    className: "border-red-200 bg-red-50/70 text-red-800",
  },
  alta: {
    label: "Alta",
    tone: "warning",
    className: "border-yellow-200 bg-yellow-50/80 text-yellow-800",
  },
  media: {
    label: "Media",
    tone: "info",
    className: "border-line bg-white text-ink-soft",
  },
};

const TYPE_LABEL: Record<AlertType, string> = {
  sla: "SLA",
  riesgo: "Riesgo",
  prorroga: "Prorroga",
  decision: "Decision",
  info: "Informacion",
  validacion: "Validacion",
};

const TYPE_OPTIONS: Array<{ value: "todas" | AlertType; label: string }> = [
  { value: "todas", label: "Todos los tipos" },
  { value: "sla", label: "SLA" },
  { value: "riesgo", label: "Riesgo" },
  { value: "prorroga", label: "Prorrogas" },
  { value: "decision", label: "Decisiones" },
  { value: "info", label: "Informacion" },
  { value: "validacion", label: "Validacion" },
];

const SEVERITY_ORDER: Record<Severity, number> = { critica: 0, alta: 1, media: 2 };

export function SoAlertasPage() {
  const { data: rawCases, isLoading } = useCases({ sort: "sla" });
  const [severityFilter, setSeverityFilter] = useState<"todas" | Severity>("todas");
  const [typeFilter, setTypeFilter] = useState<"todas" | AlertType>("todas");
  const [query, setQuery] = useState("");

  const cases = useMemo(() => (rawCases ?? []).map(toCaseRow), [rawCases]);
  const alerts = useMemo(() => buildAlerts(cases), [cases]);
  const openCases = useMemo(() => cases.filter((c) => STAGE_STATUS[c.stage] === "abierto"), [cases]);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return alerts.filter((alert) => {
      if (severityFilter !== "todas" && alert.severity !== severityFilter) return false;
      if (typeFilter !== "todas" && alert.type !== typeFilter) return false;
      if (!text) return true;
      return [
        alert.codigo,
        alert.title,
        alert.detail,
        alert.caseRow.area ?? "",
        alert.caseRow.station,
        alert.caseRow.reporter,
        alert.planCode ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(text);
    });
  }, [alerts, query, severityFilter, typeFilter]);

  const stats = useMemo(() => {
    const critical = alerts.filter((a) => a.severity === "critica").length;
    const high = alerts.filter((a) => a.severity === "alta").length;
    const media = alerts.length - critical - high;
    const sla = alerts.filter((a) => a.type === "sla").length;
    const prorroga = alerts.filter((a) => a.type === "prorroga").length;
    const operationalHealth = alerts.length === 0 ? 100 : Math.max(0, Math.round(((openCases.length - critical - high) / Math.max(openCases.length, 1)) * 100));
    return { critical, high, media, sla, prorroga, operationalHealth };
  }, [alerts, openCases.length]);

  const clearFilters = () => {
    setSeverityFilter("todas");
    setTypeFilter("todas");
    setQuery("");
  };

  return (
    <SeguridadOperativaShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">Centro de decisiones</p>
          <h1 className="text-[22px] font-bold leading-tight tracking-tight text-ink">Alertas operativas</h1>
          <p className="mt-1.5 max-w-2xl text-[13.5px] text-ink-quiet">
            Prioriza expedientes con SLA comprometido, riesgo alto, prorrogas y acciones pendientes de Seguridad Operativa.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {stats.critical > 0 ? (
            <Pill tone="critical" dot>
              {stats.critical} criticas
            </Pill>
          ) : (
            <Pill tone="brand" dot>
              Sin criticas
            </Pill>
          )}
          <Link
            to="/seguridad/casos"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong bg-white px-3 text-[12.5px] font-medium text-ink transition-colors hover:bg-surface-2"
          >
            <FolderOpen className="h-4 w-4" /> Ver casos
          </Link>
        </div>
      </div>

      <Card className="mt-5 overflow-hidden p-0">
        <div className="grid gap-6 p-5 lg:grid-cols-[1.4fr_1fr] lg:divide-x lg:divide-line">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Distribución por severidad</p>
              <p className="text-[12px] text-ink-quiet">{alerts.length} alerta{alerts.length === 1 ? "" : "s"} generada{alerts.length === 1 ? "" : "s"}</p>
            </div>
            <SeverityBar critical={stats.critical} alta={stats.high} media={stats.media} />
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <SeverityStat swatch="bg-red-500" label="Criticas" value={stats.critical} />
              <SeverityStat swatch="bg-amber-400" label="Alta" value={stats.high} />
              <SeverityStat swatch="bg-brand-300" label="Media" value={stats.media} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:pl-6">
            <InlineStat icon={<CalendarClock className="h-4 w-4" />} label="SLA por revisar" value={stats.sla} tone={stats.sla ? "warning" : "neutral"} />
            <InlineStat icon={<Timer className="h-4 w-4" />} label="Prorrogas" value={stats.prorroga} tone={stats.prorroga ? "warning" : "neutral"} />
            <InlineStat
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Salud operativa"
              value={stats.operationalHealth}
              suffix="%"
              tone={stats.operationalHealth >= 85 ? "brand" : "warning"}
            />
          </div>
        </div>
      </Card>

      <Card className="mt-5 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_190px_190px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por codigo, area, estacion o responsable" className="pl-9" />
          </div>
          <Select value={severityFilter} onChange={(event) => setSeverityFilter(event.target.value as typeof severityFilter)} aria-label="Filtrar por severidad">
            <option value="todas">Todas las severidades</option>
            <option value="critica">Critica</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
          </Select>
          <Select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as typeof typeFilter)} aria-label="Filtrar por tipo">
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Button variant="outline" size="sm" onClick={clearFilters} className="h-10">
            <Filter className="h-4 w-4" /> Limpiar
          </Button>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card padded={false} className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <h2 className="text-[15px] font-semibold leading-tight text-ink">Bandeja de alertas</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{filtered.length} alertas visibles de {alerts.length} generadas</p>
            </div>
            <Pill tone={filtered.length ? "warning" : "brand"} dot>
              {filtered.length ? "Requiere seguimiento" : "Sin pendientes"}
            </Pill>
          </div>

          {isLoading ? (
            <LoadingRows />
          ) : filtered.length === 0 ? (
            <div className="p-5">
              <EmptyState
                icon={<CheckCircle2 className="h-6 w-6" />}
                title={alerts.length === 0 ? "Sin alertas operativas" : "No hay alertas con esos filtros"}
                description={alerts.length === 0 ? "No se detectan SLA vencidos, prorrogas pendientes ni casos criticos abiertos." : "Ajusta los filtros para volver a ver la bandeja completa."}
                action={alerts.length > 0 ? <Button variant="outline" size="sm" onClick={clearFilters}>Restablecer filtros</Button> : undefined}
              />
            </div>
          ) : (
            <div className="divide-y divide-line-soft">
              {filtered.map((alert) => (
                <AlertRow key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-5">
          <Card>
            <div className="mb-4 flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold leading-tight text-ink">Proximo foco</h2>
                <p className="mt-0.5 text-[12.5px] text-ink-quiet">Primeras acciones recomendadas</p>
              </div>
            </div>
            <PriorityList alerts={alerts.slice(0, 5)} />
          </Card>

          <Card>
            <div className="mb-4 flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <UserCheck className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold leading-tight text-ink">Criterio de priorizacion</h2>
                <p className="mt-0.5 text-[12.5px] text-ink-quiet">Orden operativo aplicado</p>
              </div>
            </div>
            <div className="space-y-2.5 text-[12.5px] text-ink-soft">
              <Criterion tone="critical" label="Critica" text="SLA vencido o plan vencido con accion abierta." />
              <Criterion tone="warning" label="Alta" text="SLA proximo, riesgo inaceptable o prorroga pendiente." />
              <Criterion tone="info" label="Media" text="Recepcion, informacion pendiente o verificacion final." />
            </div>
          </Card>
        </div>
      </div>
    </SeguridadOperativaShell>
  );
}

function buildAlerts(cases: CaseRow[]): AlertItem[] {
  const alerts: AlertItem[] = [];

  for (const c of cases) {
    if (STAGE_STATUS[c.stage] !== "abierto") continue;

    const sla = slaEstado(c.slaDueDate, c.stage);
    const slaDays = c.slaDueDate ? diasRestantes(c.slaDueDate) : null;

    if (sla === "overdue") {
      alerts.push({
        id: `${c.id}-sla-overdue`,
        codigo: c.id,
        title: "SLA vencido",
        detail: slaDays == null ? "El expediente supero el plazo definido." : `El expediente supero el plazo por ${Math.abs(slaDays)} dia(s).`,
        action: "Revisar expediente y definir decision de cierre o continuidad.",
        severity: "critica",
        type: "sla",
        icon: ShieldAlert,
        caseRow: c,
        dueDate: c.slaDueDate,
        days: slaDays,
      });
    } else if (sla === "soon") {
      alerts.push({
        id: `${c.id}-sla-soon`,
        codigo: c.id,
        title: "SLA por vencer",
        detail: slaDays == null ? "El expediente esta cerca del vencimiento." : `Quedan ${Math.max(slaDays, 0)} dia(s) para el vencimiento.`,
        action: "Priorizar revision antes de que pase a vencido.",
        severity: "alta",
        type: "sla",
        icon: CalendarClock,
        caseRow: c,
        dueDate: c.slaDueDate,
        days: slaDays,
      });
    }

    if (c.risk && riskCategory(c.risk) === "inaceptable") {
      alerts.push({
        id: `${c.id}-risk`,
        codigo: c.id,
        title: "Riesgo inaceptable abierto",
        detail: `${c.risk} · ${c.riskCategoria ?? "Inaceptable"}. El caso requiere seguimiento ejecutivo.`,
        action: "Validar responsable, plan de accion y fecha comprometida.",
        severity: sla === "overdue" ? "critica" : "alta",
        type: "riesgo",
        icon: AlertTriangle,
        caseRow: c,
      });
    }

    if (c.prorrogaSolicitada || c.planes.some((plan) => plan.prorroga_estado === "pendiente")) {
      const plan = c.planes.find((p) => p.prorroga_estado === "pendiente");
      alerts.push({
        id: `${c.id}-extension-${plan?.id_plan ?? "case"}`,
        codigo: c.id,
        title: "Prorroga pendiente de decision",
        detail: plan?.prorroga_fecha ? `Nueva fecha solicitada: ${formatDate(plan.prorroga_fecha)}.` : "El area solicito ampliar el plazo del plan.",
        action: "Aprobar, ajustar o rechazar la solicitud de ampliacion.",
        severity: "alta",
        type: "prorroga",
        icon: Timer,
        caseRow: c,
        dueDate: plan?.prorroga_fecha,
        planCode: plan?.codigo_plan,
      });
    }

    if (c.stage === "pendiente_info") {
      alerts.push({
        id: `${c.id}-info`,
        codigo: c.id,
        title: "Informacion pendiente del reportante",
        detail: "El flujo esta pausado hasta recibir o revisar la respuesta solicitada.",
        action: "Verificar la solicitud y hacer seguimiento al reportante.",
        severity: "media",
        type: "info",
        icon: FileWarning,
        caseRow: c,
      });
    }

    if (c.stage === "recepcion" || c.stage === "evaluacion") {
      alerts.push({
        id: `${c.id}-decision`,
        codigo: c.id,
        title: c.stage === "recepcion" ? "Reporte pendiente de recepcion" : "Caso pendiente de evaluacion",
        detail: c.stage === "recepcion" ? "El reporte todavia no fue admitido o rechazado por Seguridad Operativa." : "El riesgo, clasificacion y derivacion aun no fueron definidos.",
        action: c.stage === "recepcion" ? "Aceptar, observar o rechazar el reporte." : "Completar evaluacion y derivar el caso.",
        severity: "media",
        type: "decision",
        icon: Clock,
        caseRow: c,
      });
    }

    if (c.stage === "verificacion") {
      alerts.push({
        id: `${c.id}-verification`,
        codigo: c.id,
        title: "Verificacion final pendiente",
        detail: "El expediente esta listo para validacion final de Seguridad Operativa.",
        action: "Cerrar, reabrir o mantener pendiente con sustento.",
        severity: "media",
        type: "validacion",
        icon: UserCheck,
        caseRow: c,
      });
    }

    for (const plan of c.planes) {
      const estado = plan.catalogo_detalle.nombre.toLowerCase();
      const due = plan.fecha_reprogramada ?? plan.fecha_plan;
      const planDays = daysUntil(due);

      if (!estado.includes("cerrad") && !estado.includes("rechaz") && planDays < 0) {
        alerts.push({
          id: `${c.id}-plan-overdue-${plan.id_plan}`,
          codigo: c.id,
          title: "Plan de accion vencido",
          detail: `${plan.codigo_plan} vencio el ${formatDate(due)}.`,
          action: "Solicitar actualizacion al responsable o revisar prorroga.",
          severity: "critica",
          type: "sla",
          icon: ShieldAlert,
          caseRow: c,
          dueDate: due,
          days: planDays,
          planCode: plan.codigo_plan,
        });
      } else if (estado.includes("finaliz")) {
        alerts.push({
          id: `${c.id}-plan-final-${plan.id_plan}`,
          codigo: c.id,
          title: "Plan finalizado pendiente de revision",
          detail: `${plan.codigo_plan} fue finalizado por ${plan.areas.nombre_area}.`,
          action: "Revisar evidencias y aprobar o devolver el plan.",
          severity: "media",
          type: "validacion",
          icon: CheckCircle2,
          caseRow: c,
          planCode: plan.codigo_plan,
        });
      }
    }
  }

  return alerts.sort((a, b) => {
    const severity = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    if (severity !== 0) return severity;
    const aDays = a.days ?? 999;
    const bDays = b.days ?? 999;
    if (aDays !== bDays) return aDays - bDays;
    return +new Date(b.caseRow.createdAt) - +new Date(a.caseRow.createdAt);
  });
}

/** Barra apilada proporcional a cada severidad — reemplaza la grilla de tarjetas repetida en otras pantallas. */
function SeverityBar({ critical, alta, media }: { critical: number; alta: number; media: number }) {
  const total = Math.max(critical + alta + media, 1);
  const pct = (n: number) => `${(n / total) * 100}%`;
  return (
    <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
      {critical > 0 && <div className="bg-red-500" style={{ width: pct(critical) }} title={`${critical} criticas`} />}
      {alta > 0 && <div className="bg-amber-400" style={{ width: pct(alta) }} title={`${alta} alta`} />}
      {media > 0 && <div className="bg-brand-300" style={{ width: pct(media) }} title={`${media} media`} />}
    </div>
  );
}

function SeverityStat({ swatch, label, value }: { swatch: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", swatch)} />
      <span className="text-[12.5px] text-ink-soft">{label}</span>
      <span className="font-display text-[14px] font-bold text-ink">{value}</span>
    </div>
  );
}

function InlineStat({
  icon,
  label,
  value,
  suffix,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
  tone: "brand" | "warning" | "neutral";
}) {
  return (
    <div>
      <div
        className={cn(
          "grid h-8 w-8 place-items-center rounded-lg",
          tone === "brand" && "bg-brand-50 text-brand-700",
          tone === "warning" && "bg-warning-soft text-warning-ink",
          tone === "neutral" && "bg-surface-2 text-ink-soft"
        )}
      >
        {icon}
      </div>
      <p className="mt-2 font-display text-[20px] font-bold leading-none tracking-tight text-ink">
        {value}
        {suffix}
      </p>
      <p className="mt-1 text-[11.5px] text-ink-quiet">{label}</p>
    </div>
  );
}

function AlertRow({ alert }: { alert: AlertItem }) {
  const Icon = alert.icon;
  const meta = SEVERITY_META[alert.severity];
  const age = relativeTime(alert.caseRow.createdAt);

  return (
    <div className="grid gap-4 px-5 py-4 transition-colors hover:bg-surface/60 lg:grid-cols-[minmax(0,1fr)_220px_150px]">
      <div className="flex min-w-0 items-start gap-3">
        <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl border", meta.className)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/seguridad/casos/${alert.codigo}`} className="font-mono text-[12.5px] font-semibold text-brand-700 hover:underline">
              {alert.codigo}
            </Link>
            <Pill tone={meta.tone} dot>
              {meta.label}
            </Pill>
            <Pill tone="neutral">{TYPE_LABEL[alert.type]}</Pill>
            {alert.caseRow.risk && <RiskPill risk={alert.caseRow.risk} showCategory />}
          </div>
          <h3 className="mt-2 text-[14px] font-semibold leading-snug text-ink">{alert.title}</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{alert.detail}</p>
          <p className="mt-2 text-[12px] font-medium text-ink">{alert.action}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11.5px] text-ink-faint">
            <span>{alert.caseRow.area ?? "Sin area"}</span>
            <span>·</span>
            <span>{alert.caseRow.station || "Sin estacion"}</span>
            <span>·</span>
            <span>{age}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-[12.5px] text-ink-soft">
        <InfoLine label="Etapa" value={<StagePill stage={alert.caseRow.stage} />} />
        {alert.planCode && <InfoLine label="Plan" value={<span className="font-mono text-[11.5px] text-ink">{alert.planCode}</span>} />}
        {alert.dueDate && <InfoLine label="Fecha limite" value={formatDate(alert.dueDate)} />}
      </div>

      <div className="flex items-center lg:justify-end">
        <Link
          to={`/seguridad/casos/${alert.codigo}`}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-700 px-3 text-[12.5px] font-medium text-white shadow-sm transition-colors hover:bg-brand-800"
        >
          Atender
        </Link>
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11.5px] text-ink-faint">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function PriorityList({ alerts }: { alerts: AlertItem[] }) {
  if (alerts.length === 0) {
    return <p className="rounded-lg bg-surface p-3 text-[12.5px] text-ink-quiet">No hay acciones urgentes en este momento.</p>;
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <Link key={alert.id} to={`/seguridad/casos/${alert.codigo}`} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-surface">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-2 text-[11px] font-bold text-ink-soft">{index + 1}</span>
          <span className="min-w-0">
            <span className="block truncate text-[12.5px] font-semibold text-ink">{alert.title}</span>
            <span className="mt-0.5 block truncate font-mono text-[11px] text-brand-700">{alert.codigo}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

function Criterion({ tone, label, text }: { tone: "critical" | "warning" | "info"; label: string; text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={cn(
          "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
          tone === "critical" && "bg-critical",
          tone === "warning" && "bg-warning",
          tone === "info" && "bg-info"
        )}
      />
      <p>
        <span className="font-semibold text-ink">{label}: </span>
        {text}
      </p>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-0 divide-y divide-line-soft">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="flex items-start gap-4 px-5 py-4">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-2.5 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
