// Portado del prototipo SIGMA L1 (pages/seguridad/Dashboard.tsx), conectado a
// datos reales vía useCases() + toCaseRow en vez del store de localStorage.
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderClock,
  AlertTriangle,
  CheckCircle2,
  CalendarPlus,
  Activity,
  Train,
} from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Pill, RiskPill } from "@/design-system/primitives/Pill";
import { Skeleton } from "@/design-system/primitives/Skeleton";
import { CountUp } from "@/design-system/motion/motion";
import { riseItem, staggerContainer } from "@/design-system/motion/variants";
import { CHART_COLORS, HBarsChart } from "@/design-system/charts/Charts";
import { IncidentMap } from "@/pages/seguridad/IncidentMap";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow } from "@/features/cases/adapter";
import { STAGE_STATUS, riskCategory } from "@/features/cases/domain";
import { stationNamesFromCatalog } from "@/lib/stations";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { relativeTime } from "@/lib/format";

export function SoDashboardPage() {
  const [ahora] = useState(Date.now);
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
    const unaSemanaMs = 7 * 24 * 60 * 60 * 1000;
    const nuevos = cases.filter((c) => ahora - new Date(c.createdAt).getTime() <= unaSemanaMs);
    return {
      pendientes: open.length,
      critical: critical.length,
      cerrados: closed.length,
      nuevos: nuevos.length,
    };
  }, [ahora, cases]);

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
      <motion.div
        className="relative overflow-hidden rounded-[20px] text-white shadow-[var(--shadow-plate)] ring-1 ring-white/10 flex flex-col lg:flex-row"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Mensaje del centro de control, sobre la foto de la Línea 1 */}
        <div className="relative lg:w-[56%] px-6 py-7 sm:px-9 sm:py-8">
          <img src="/tren-linea1.png" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-700/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
          <div className="relative max-w-xl">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">Línea 1 · Metro de Lima</p>
            <h1 className="font-display text-balance text-[24px] font-bold leading-[1.15] tracking-[-0.015em] sm:text-[28px]">
              Centro de Control
              <br />
              Seguridad Operativa
            </h1>
            <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-white/85">
              Monitoreo en tiempo real de la seguridad operativa de Línea 1. La gestión detallada ocurre dentro del expediente de cada caso.
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/85">Datos en vivo</span>
            </div>
          </div>
        </div>

        {/* Indicadores: un solo panel, no 4 tarjetas repetidas — "Pendientes"
            queda como cifra protagonista porque es la que exige acción; las
            otras tres son lectura secundaria separada por divisores finos. */}
        <div className="relative lg:w-[44%] bg-gradient-to-br from-brand-900 to-brand-950 px-6 py-7 sm:px-8 flex flex-col justify-center gap-5">
          <div className="flex items-end gap-4 pb-4 border-b border-white/10">
            <div className="h-10 w-10 shrink-0 rounded-[11px] bg-white/10 grid place-items-center">
              <FolderClock className="h-5 w-5 text-brand-200" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-[34px] font-bold leading-none text-white">
                <CountUp value={stats.pendientes} />
              </p>
              <p className="mt-1 text-[12px] text-white/70">Casos pendientes · abiertos en el sistema</p>
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-1.5 pr-4">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-red-300" />
                <span className="text-[9.5px] font-semibold uppercase tracking-wide text-white/55">Críticos</span>
              </div>
              <p className="font-display text-[20px] font-bold text-red-300">
                <CountUp value={stats.critical} />
              </p>
            </div>
            <div className="flex flex-col gap-1.5 px-4 border-l border-white/10">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-200" />
                <span className="text-[9.5px] font-semibold uppercase tracking-wide text-white/55">Cerrados</span>
              </div>
              <p className="font-display text-[20px] font-bold text-white">
                <CountUp value={stats.cerrados} />
              </p>
            </div>
            <div className="flex flex-col gap-1.5 pl-4 border-l border-white/10">
              <div className="flex items-center gap-1.5">
                <CalendarPlus className="h-3.5 w-3.5 text-white/55" />
                <span className="text-[9.5px] font-semibold uppercase tracking-wide text-white/55">Nuevos · 7d</span>
              </div>
              <p className="font-display text-[20px] font-bold text-white">
                <CountUp value={stats.nuevos} />
              </p>
            </div>
          </div>
        </div>
      </motion.div>

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
