// Portado del prototipo SIGMA L1 (pages/seguridad/Dashboard.tsx), conectado a
// datos reales vía useCases() + toCaseRow en vez del store de localStorage.
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FolderClock,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  TrendingUp,
  Train,
} from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { WelcomeBanner } from "@/components/layout/WelcomeBanner";
import { Card } from "@/design-system/primitives/Card";
import { Pill, RiskPill } from "@/design-system/primitives/Pill";
import { Progress } from "@/design-system/primitives/Progress";
import { Skeleton, SkeletonChart, SkeletonDonut } from "@/design-system/primitives/Skeleton";
import { CountUp } from "@/design-system/motion/motion";
import { riseItem, staggerContainer } from "@/design-system/motion/variants";
import { CHART_COLORS, DonutChart, HBarsChart, TrendBarChart } from "@/design-system/charts/Charts";
import { IncidentMap } from "@/pages/seguridad/IncidentMap";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow } from "@/features/cases/adapter";
import { STAGE_STATUS, EVENT_LABELS, riskCategory } from "@/features/cases/domain";
import { stationNamesFromCatalog } from "@/lib/stations";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/format";

export function SoDashboardPage() {
  const { data: rawCases, isLoading } = useCases();
  const cases = useMemo(() => (rawCases ?? []).map(toCaseRow), [rawCases]);
  const { byName: catalogsByName } = useCatalogs();
  const STATIONS = useMemo(
    () => stationNamesFromCatalog(catalogsByName.get("Lugar de Incidente")?.catalogo_detalle ?? []),
    [catalogsByName]
  );

  const stats = useMemo(() => {
    const open = cases.filter((c) => STAGE_STATUS[c.stage] === "abierto");
    const closed = cases.filter((c) => c.stage === "cierre");
    const critical = open.filter((c) => c.risk && riskCategory(c.risk) === "inaceptable");
    const approved = cases.filter((c) => ["investigacion", "plan_accion", "ejecucion", "verificacion", "cierre"].includes(c.stage));
    return {
      pendientes: open.length,
      critical: critical.length,
      cerrados: closed.length,
      aprobados: approved.length,
    };
  }, [cases]);

  const trend = useMemo(() => {
    const months = 12;
    const out: { label: string; value: number }[] = [];
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth();
      const count = cases.filter((c) => {
        const caseDate = new Date(c.createdAt);
        return caseDate.getFullYear() === year && caseDate.getMonth() === month;
      }).length;
      out.push({ label: `${monthNames[month]} ${year.toString().slice(2)}`, value: count });
    }
    return out;
  }, [cases]);

  const byType = useMemo(() => {
    const map = new Map<string, number>();
    cases.forEach((c) => map.set(c.type, (map.get(c.type) ?? 0) + 1));
    const palette = [CHART_COLORS.brand, CHART_COLORS.info, CHART_COLORS.warning, CHART_COLORS.critical, CHART_COLORS.brandLight];
    return Array.from(map.entries()).map(([type, value], i) => ({
      name: EVENT_LABELS[type as keyof typeof EVENT_LABELS],
      value,
      color: palette[i % palette.length],
    }));
  }, [cases]);

  const byStation = useMemo(() => {
    const map = new Map<string, number>();
    STATIONS.forEach((s) => map.set(s, 0));
    cases.forEach((c) => {
      if (c.station && map.has(c.station)) map.set(c.station, (map.get(c.station) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({
        name,
        value,
        color: value > 2 ? CHART_COLORS.critical : value > 0 ? CHART_COLORS.warning : CHART_COLORS.brandLight,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 12);
  }, [cases, STATIONS]);

  const recent = useMemo(() => [...cases].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 7), [cases]);

  return (
    <SeguridadOperativaShell>
      <WelcomeBanner
        photoSrc="/tren-linea1.png"
        greeting="Centro de Control · Seguridad Operativa"
        subtitle="Monitoreo en tiempo real de la seguridad operativa de Línea 1. La gestión detallada ocurre dentro del expediente de cada caso."
        meta={
          <>
            <Pill tone="brand" dot>
              {stats.pendientes} casos pendientes
            </Pill>
            {stats.critical > 0 && (
              <Pill tone="critical" dot>
                {stats.critical} críticos
              </Pill>
            )}
          </>
        }
      />

      <motion.div
        className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <KpiCard icon={<FolderClock className="h-4.5 w-4.5" />} label="Pendientes" value={stats.pendientes} delta="Abiertos" deltaTone="info" />
        <KpiCard
          icon={<AlertTriangle className="h-4.5 w-4.5" />}
          label="Críticos"
          value={stats.critical}
          delta="Riesgo alto"
          deltaTone={stats.critical ? "critical" : "brand"}
          tone={stats.critical ? "critical" : "brand"}
        />
        <KpiCard icon={<CheckCircle2 className="h-4.5 w-4.5" />} label="Cerrados" value={stats.cerrados} delta="Histórico" deltaTone="brand" tone="brand" />
        <KpiCard icon={<ShieldCheck className="h-4.5 w-4.5" />} label="Aprobados" value={stats.aprobados} delta="En curso" deltaTone="brand" />
      </motion.div>

      <div className="mt-5 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="shrink-0 h-9 w-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-ink leading-tight truncate">Tendencia de casos · últimos 12 meses</h3>
                <p className="text-[12.5px] text-ink-quiet mt-0.5">Casos reportados por mes</p>
              </div>
            </div>
            <Pill tone="brand" dot>
              Último año
            </Pill>
          </div>
          {isLoading ? <SkeletonChart height={240} /> : <TrendBarChart data={trend} height={240} />}
        </Card>
        <Card>
          <div className="flex items-start gap-3 mb-4">
            <div className="shrink-0 h-9 w-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
              <Activity className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-ink leading-tight truncate">Distribución por tipo</h3>
              <p className="text-[12.5px] text-ink-quiet mt-0.5">Composición del total de casos</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonDonut height={200} />
          ) : byType.length === 0 ? (
            <div className="h-[200px] grid place-items-center text-[13px] text-ink-quiet">Sin datos aún</div>
          ) : (
            <>
              <DonutChart data={byType} height={200} />
              <motion.div
                className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {byType.map((d) => (
                  <motion.div
                    key={d.name}
                    variants={riseItem}
                    className="flex items-center gap-1.5 text-[11.5px] text-ink-soft min-w-0"
                  >
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="truncate">{d.name}</span>
                    <span className="ml-auto tabular-nums text-ink-faint">{d.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </Card>
      </div>

      <div className="mt-5">
        <IncidentMap />
      </div>

      <div className="mt-5">
        <Card>
          <div className="flex items-start gap-3 mb-4">
            <div className="shrink-0 h-9 w-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
              <Train className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-ink leading-tight truncate">Casos por estación</h3>
              <p className="text-[12.5px] text-ink-quiet mt-0.5">Top 12 ubicaciones con mayor actividad · Línea 1</p>
            </div>
          </div>
          <HBarsChart data={byStation} height={300} />
        </Card>
      </div>

      <Card className="mt-5" padded={false}>
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="shrink-0 h-9 w-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
                <Activity className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-ink leading-tight truncate">Actividad reciente</h3>
                <p className="text-[12.5px] text-ink-quiet mt-0.5">Últimos casos registrados en el sistema</p>
              </div>
            </div>
            <Pill tone="neutral">Tiempo real</Pill>
          </div>
        </div>
        <motion.div
          className="divide-y divide-line-soft max-h-[280px] overflow-y-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-2/5" />
                    <Skeleton className="h-2.5 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <p className="p-5 text-[13px] text-ink-quiet text-center">Aún no hay casos registrados.</p>
          ) : (
            recent.map((c) => (
              <motion.div key={c.id} variants={riseItem} className="flex items-start gap-3 p-4">
                <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0 text-[12px] font-semibold bg-brand-100 text-brand-800">
                  {initialsOf(c.reporter)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] text-ink">
                    <span className="font-semibold">{c.reporter}</span> <span className="text-ink-soft">· Reporte registrado</span>
                  </p>
                  <p className="text-[11.5px] text-ink-quiet mt-0.5">
                    <a href={`/seguridad/casos/${c.id}`} className="font-mono text-brand-700 hover:underline">
                      {c.id}
                    </a>{" "}
                    · {relativeTime(c.createdAt)}
                  </p>
                </div>
                {c.risk && <RiskPill risk={c.risk} />}
              </motion.div>
            ))
          )}
        </motion.div>
      </Card>
    </SeguridadOperativaShell>
  );
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function KpiCard({
  icon,
  label,
  value,
  suffix,
  delta,
  deltaTone,
  tone = "neutral",
  gauge,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  delta?: string;
  deltaTone?: "brand" | "critical" | "warning" | "info" | "neutral";
  tone?: "neutral" | "brand" | "critical" | "warning";
  gauge?: number;
}) {
  return (
    <motion.div variants={riseItem} whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
      <Card className="p-4 h-full">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "h-9 w-9 rounded-lg grid place-items-center shrink-0",
            tone === "brand" && "bg-brand-50 text-brand-700",
            tone === "critical" && "bg-critical-soft text-critical-ink",
            tone === "warning" && "bg-warning-soft text-warning-ink",
            tone === "neutral" && "bg-surface-2 text-ink-soft"
          )}
        >
          {icon}
        </div>
        {delta && (
          <span
            className={cn(
              "text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full",
              deltaTone === "brand" && "bg-brand-50 text-brand-800",
              deltaTone === "critical" && "bg-critical-soft text-critical-ink",
              deltaTone === "warning" && "bg-warning-soft text-warning-ink",
              deltaTone === "info" && "bg-info-soft text-info-ink",
              (!deltaTone || deltaTone === "neutral") && "bg-surface-2 text-ink-quiet"
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <p className="font-display mt-3 text-[23px] font-bold tabular-nums text-ink leading-none tracking-[-0.02em]">
        <CountUp value={value} suffix={suffix} />
      </p>
      <p className="text-[12px] text-ink-quiet mt-1.5">{label}</p>
      {gauge !== undefined && (
        <div className="mt-3">
          <Progress value={gauge} tone={gauge >= 85 ? "brand" : "warning"} showLabel />
        </div>
      )}
      </Card>
    </motion.div>
  );
}
