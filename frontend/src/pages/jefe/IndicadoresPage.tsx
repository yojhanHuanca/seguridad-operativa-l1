import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileBarChart2,
  RefreshCcw,
} from "lucide-react";
import { JefeShell } from "@/components/layout/JefeShell";
import { Button } from "@/design-system/primitives/Button";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonChart, SkeletonDonut } from "@/design-system/primitives/Skeleton";
import { CHART_COLORS, DonutChart, HBarsChart, TrendBarChart } from "@/design-system/charts/Charts";
import { useJefeAreaFilter } from "@/features/plans/hooks/useJefeAreaFilter";
import { usePlans } from "@/features/plans/hooks/usePlans";
import type { PlanItem } from "@/features/plans/types";
import { planDeadline } from "@/features/plans/lib/planDeadline";
import { isClosed, isInVerification } from "@/features/plans/lib/planStatus";
import { isRiskLevel, RISK_CATEGORY_LABELS, riskCategory, STAGE_STATUS, stageFromEstado, type RiskCategory } from "@/features/cases/domain";
import { cn } from "@/lib/utils";
import { daysUntil, formatDate } from "@/lib/format";

const ALL = "all";
const MONTH_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const MONTH_LONG = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

type SelectionKind = "reportType" | "reportStatus" | "month" | "planStatus" | "risk" | "planArea" | "due" | "reschedule";

interface DashboardSelection {
  kind: SelectionKind;
  label: string;
  source: string;
  value: string;
}

interface PlanReport {
  id: number;
  codigo: string;
  descripcion: string;
  fecha: string;
  tipo: string;
  estado: string;
  riesgoCodigo: string | null;
}

interface DetailRow {
  id: string;
  codigo: string;
  fechaEvento: string;
  descripcion: string;
  planCodigo: string;
  responsable: string;
  estadoPlan: string;
  descripcionPlan: string;
}

interface MonthTrendItem {
  label: string;
  value: number;
  key: string;
}

function pct(value: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((value / total) * 1000) / 10}%`;
}

export function JefeIndicadoresPage() {
  const areaFiltro = useJefeAreaFilter();
  const { data: rawPlans, isLoading } = usePlans(areaFiltro);
  const [selectedYear, setSelectedYear] = useState<string>(ALL);
  const [selectedMonth, setSelectedMonth] = useState<string>(ALL);
  const [selection, setSelection] = useState<DashboardSelection | null>(null);
  const plans = useMemo(() => rawPlans ?? [], [rawPlans]);

  const filteredPlans = useMemo(
    () => plans.filter((plan) => matchesDateFilters(plan, selectedYear, selectedMonth)),
    [plans, selectedMonth, selectedYear]
  );
  const reports = useMemo(() => uniqueReports(filteredPlans), [filteredPlans]);
  const porTipo = useMemo(() => countReportTypes(reports), [reports]);
  const cerradoVsProceso = useMemo(() => reportStatusChart(reports), [reports]);
  const planTotals = useMemo(() => planStatusTotals(filteredPlans), [filteredPlans]);
  const tendencia = useMemo(() => monthlyTrend(filteredPlans, selectedYear, selectedMonth), [filteredPlans, selectedMonth, selectedYear]);
  const riesgo = useMemo(() => riskChart(reports), [reports]);
  const riesgoTotal = useMemo(() => riesgo.reduce((sum, item) => sum + item.value, 0), [riesgo]);
  const porArea = useMemo(() => plansByArea(filteredPlans), [filteredPlans]);
  const vencimiento = useMemo(() => dueChart(filteredPlans), [filteredPlans]);
  const reprogramacion = useMemo(() => rescheduleChart(filteredPlans), [filteredPlans]);
  const detailRows = useMemo(() => buildDetailRows(filteredPlans, selection), [filteredPlans, selection]);

  const periodLabel = selectedMonth !== ALL ? monthSelectLabel(selectedMonth) : selectedYear !== ALL ? `el año ${selectedYear}` : "todo el historial";
  const reportesSubtitle =
    selectedMonth !== ALL || selectedYear !== ALL ? `Reportes vinculados a tus planes en ${periodLabel}` : "Reportes vinculados a tus planes";
  const planesSubtitle =
    selectedMonth !== ALL || selectedYear !== ALL ? `Planes de tu área vinculados a ${periodLabel}` : "Abiertos sobre el total de planes de tu área";
  const tendenciaSubtitle =
    selectedMonth !== ALL
      ? `Reportes vinculados en ${periodLabel}`
      : selectedYear !== ALL
        ? `Cantidad mensual de reportes vinculados en ${selectedYear}`
        : "Cantidad de reportes vinculados, últimos 12 meses";
  const riesgoSubtitle = selectedMonth !== ALL || selectedYear !== ALL ? `SOP abiertos vinculados a ${periodLabel}` : "Riesgo de los SOP abiertos vinculados";
  const planesAreaSubtitle = selectedMonth !== ALL || selectedYear !== ALL ? `Planes abiertos vinculados a ${periodLabel}` : "Cantidad de planes abiertos por área";
  const vencimientoSubtitle = selectedMonth !== ALL || selectedYear !== ALL ? `Planes abiertos vinculados a ${periodLabel}` : "Días hasta (o desde) la fecha límite vigente";
  const reprogramacionSubtitle =
    selectedMonth !== ALL || selectedYear !== ALL ? `Planes abiertos reprogramados vinculados a ${periodLabel}` : "Cuánto se extendió la fecha límite original";

  const selectItem = (kind: SelectionKind, label: string, source: string, value = label) => {
    setSelection((current) => (current?.kind === kind && current.value === value ? null : { kind, label, source, value }));
  };

  const clearSelection = () => setSelection(null);
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth(ALL);
    clearSelection();
  };
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    if (month !== ALL) setSelectedYear(ALL);
    clearSelection();
  };
  const activeFor = (kind: SelectionKind) => (selection?.kind === kind ? selection.label : null);

  return (
    <JefeShell>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-[18px] font-bold leading-tight text-ink">Indicadores | Jefe de Área</h2>
          <p className="mt-1 text-[12.5px] text-ink-quiet">
            {planTotals.total} planes · {reports.length} reportes · {periodLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <MonthFilter label="Mes - Año" value={selectedMonth} onChange={handleMonthChange} />
          <YearFilter label="Año" value={selectedYear} onChange={handleYearChange} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <FileBarChart2 className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold leading-tight text-ink">Total de Reportes SOP</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{reportesSubtitle}</p>
            </div>
          </div>

          <p className="font-display text-[36px] font-bold tabular-nums leading-none text-ink">{reports.length}</p>

          {porTipo.length > 0 && (
            <div className="mt-4 divide-y divide-line-soft rounded-lg border border-line-soft">
              <div className="grid grid-cols-[1fr_auto] gap-3 bg-surface/60 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">
                <span>Tipo de Reporte</span>
                <span>QTY</span>
              </div>
              {porTipo.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => selectItem("reportType", item.name, "Tipo de reporte")}
                  className={cn(
                    "grid w-full grid-cols-[1fr_auto] gap-3 px-3 py-2 text-left text-[13px] transition-colors hover:bg-brand-50/60",
                    selection?.kind === "reportType" && selection.value === item.name && "bg-brand-50"
                  )}
                >
                  <span className="truncate text-ink-soft">{item.name}</span>
                  <span className="font-semibold tabular-nums text-ink">{item.value}</span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-4">
            {isLoading ? (
              <SkeletonChart height={140} />
            ) : (
              <TrendBarChart
                data={cerradoVsProceso}
                height={140}
                barSize={64}
                activeName={activeFor("reportStatus")}
                onItemClick={(label) => selectItem("reportStatus", label, "Estado de reporte")}
                showLabels
              />
            )}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <ClipboardList className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold leading-tight text-ink">Total de Planes</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{planesSubtitle}</p>
            </div>
          </div>

          <p className="font-display text-[36px] font-bold tabular-nums leading-none text-ink">
            {planTotals.abiertos} <span className="text-[18px] font-medium text-ink-faint">/ {planTotals.total}</span>
          </p>
          <p className="mt-0.5 text-[11.5px] text-ink-quiet">#Abiertos / #Total</p>

          {isLoading ? (
            <SkeletonDonut height={220} />
          ) : planTotals.total === 0 ? (
            <div className="grid h-[220px] place-items-center text-[13px] text-ink-quiet">Sin planes aún</div>
          ) : (
            <>
              <DonutChart
                data={planTotals.donut}
                height={220}
                activeName={activeFor("planStatus")}
                onItemClick={(label) => selectItem("planStatus", label, "Estado de plan")}
              />
              <LegendList
                data={planTotals.donut}
                total={planTotals.total}
                active={selection?.kind === "planStatus" ? selection.value : null}
                onSelect={(label) => selectItem("planStatus", label, "Estado de plan")}
              />
            </>
          )}
        </Card>
      </div>

      <Card className="mt-5 min-w-0">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <BarChart3 className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold leading-tight text-ink">Reportes por Mes</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">{tendenciaSubtitle}</p>
          </div>
        </div>
        {isLoading ? (
          <SkeletonChart height={300} />
        ) : (
          <TrendBarChart
            data={tendencia}
            height={300}
            activeName={activeFor("month")}
            onItemClick={(label) => {
              const item = tendencia.find((month) => month.label === label);
              if (item) selectItem("month", label, "Reportes por mes", item.key);
            }}
            showLabels
          />
        )}
      </Card>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <AlertTriangle className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold leading-tight text-ink">Análisis de Riesgo</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{riesgoSubtitle}</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonDonut height={200} />
          ) : riesgoTotal === 0 ? (
            <div className="grid h-[200px] place-items-center text-[13px] text-ink-quiet">Sin casos abiertos con riesgo asignado</div>
          ) : (
            <>
              <DonutChart data={riesgo} height={200} activeName={activeFor("risk")} onItemClick={(label) => selectItem("risk", label, "Análisis de riesgo")} />
              <LegendList data={riesgo} total={riesgoTotal} active={selection?.kind === "risk" ? selection.value : null} onSelect={(label) => selectItem("risk", label, "Análisis de riesgo")} />
            </>
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <Building2 className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold leading-tight text-ink">Planes de Acción Abiertos por Área</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{planesAreaSubtitle}</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonChart height={260} />
          ) : porArea.length === 0 ? (
            <div className="grid h-[260px] place-items-center text-[13px] text-ink-quiet">Sin planes abiertos</div>
          ) : (
            <HBarsChart data={porArea} height={Math.max(200, porArea.length * 28)} activeName={activeFor("planArea")} onItemClick={(label) => selectItem("planArea", label, "Planes abiertos por área")} showLabels />
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <CalendarClock className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold leading-tight text-ink">Vencimiento de Planes Abiertos</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{vencimientoSubtitle}</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonChart height={220} />
          ) : (
            <HBarsChart data={vencimiento} height={220} activeName={activeFor("due")} onItemClick={(label) => selectItem("due", label, "Vencimiento de planes abiertos")} showLabels />
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <RefreshCcw className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold leading-tight text-ink">Reprogramación de Planes Abiertos</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">{reprogramacionSubtitle}</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonChart height={220} />
          ) : reprogramacion.every((item) => item.value === 0) ? (
            <div className="grid h-[220px] place-items-center text-[13px] text-ink-quiet">Sin planes reprogramados</div>
          ) : (
            <HBarsChart data={reprogramacion} height={220} activeName={activeFor("reschedule")} onItemClick={(label) => selectItem("reschedule", label, "Reprogramación de planes abiertos")} showLabels />
          )}
        </Card>
      </div>

      <Card padded={false} className="mt-5 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-3">
          <div>
            <h2 className="text-[15px] font-semibold leading-tight text-ink">Detalle de Reportes y Planes de Acción</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">
              {detailRows.length} registros
              {selection ? ` · ${selection.source}: ${selection.label}` : ""}
            </p>
          </div>
          {selection && (
            <Button type="button" variant="outline" size="sm" onClick={clearSelection}>
              Limpiar selección
            </Button>
          )}
        </div>
        <div className="max-h-[520px] overflow-auto">
          <table className="min-w-[980px] w-full text-left">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-line bg-surface/60">
                <th className="w-[130px] px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Nuevo Código</th>
                <th className="w-[120px] px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Fecha de evento</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Descripción</th>
                <th className="w-[140px] px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Plan de Acción</th>
                <th className="w-[170px] px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Responsable Plan de Acción</th>
                <th className="w-[150px] px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Estado Plan de Acción</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Descripción de Plan de Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-[13px] text-ink-quiet">
                    Cargando...
                  </td>
                </tr>
              ) : detailRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-[13px] text-ink-quiet">
                    Sin registros
                  </td>
                </tr>
              ) : (
                detailRows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-surface/40">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[13px] font-semibold text-brand-700">{row.codigo}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-[12.5px] text-ink-soft">{formatDate(row.fechaEvento)}</td>
                    <td className="max-w-[280px] truncate px-4 py-3 text-[12.5px] text-ink-soft">{row.descripcion}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[12.5px] text-ink">{row.planCodigo}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-[12.5px] text-ink-soft">{row.responsable}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-[12.5px] text-ink-soft">{row.estadoPlan}</td>
                    <td className="max-w-[280px] truncate px-4 py-3 text-[12.5px] text-ink-soft">{row.descripcionPlan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </JefeShell>
  );
}

function MonthFilter({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => parseMonthKey(value)?.year ?? new Date().getFullYear());

  useEffect(() => {
    const parsed = parseMonthKey(value);
    if (parsed) setViewYear(parsed.year);
  }, [value]);

  return (
    <div className="relative grid gap-1 text-[11px] font-semibold text-ink-quiet">
      <span>{label}</span>
      <button type="button" onClick={() => setOpen((current) => !current)} className="inline-flex h-9 min-w-[168px] items-center justify-between gap-3 rounded-lg border border-line-strong bg-white px-3 text-[12.5px] font-medium text-ink transition-colors hover:border-brand-300 focus-visible:border-brand-600 focus-visible:outline-none">
        <span>{value === ALL ? "Todas" : monthSelectLabel(value)}</span>
        <CalendarDays className="h-4 w-4 text-ink-quiet" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[292px] rounded-lg border border-line-strong bg-white p-3 shadow-[var(--shadow-pop)]">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setViewYear((year) => year - 1)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink" aria-label="Año anterior">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[13px] font-bold text-ink">{viewYear}</span>
            <button type="button" onClick={() => setViewYear((year) => year + 1)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink" aria-label="Año siguiente">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            {MONTH_SHORT.map((month, index) => {
              const monthValue = `${viewYear}-${String(index + 1).padStart(2, "0")}`;
              const active = value === monthValue;
              return (
                <button key={monthValue} type="button" onClick={() => { onChange(monthValue); setOpen(false); }} className={cn("h-9 rounded-lg text-[12.5px] font-semibold transition-colors", active ? "bg-brand-700 text-white" : "text-ink-soft hover:bg-brand-50 hover:text-brand-800")}>
                  {month}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-3">
            <button type="button" onClick={() => { onChange(ALL); setOpen(false); }} className="text-[12px] font-semibold text-brand-700 hover:text-brand-800">Borrar</button>
            <button type="button" onClick={() => { onChange(currentMonthKey()); setOpen(false); }} className="text-[12px] font-semibold text-brand-700 hover:text-brand-800">Este mes</button>
          </div>
        </div>
      )}
    </div>
  );
}

function YearFilter({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const [viewStart, setViewStart] = useState(() => yearBlockStart(value === ALL ? currentYear : Number(value)));

  useEffect(() => {
    if (value !== ALL) setViewStart(yearBlockStart(Number(value)));
  }, [value]);

  const years = Array.from({ length: 12 }, (_, index) => viewStart + index);

  return (
    <div className="relative grid gap-1 text-[11px] font-semibold text-ink-quiet">
      <span>{label}</span>
      <button type="button" onClick={() => setOpen((current) => !current)} className="inline-flex h-9 min-w-[116px] items-center justify-between gap-3 rounded-lg border border-line-strong bg-white px-3 text-[12.5px] font-medium text-ink transition-colors hover:border-brand-300 focus-visible:border-brand-600 focus-visible:outline-none">
        <span>{value === ALL ? "Todas" : value}</span>
        <CalendarDays className="h-4 w-4 text-ink-quiet" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[252px] rounded-lg border border-line-strong bg-white p-3 shadow-[var(--shadow-pop)]">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setViewStart((start) => start - 12)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink" aria-label="Años anteriores">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[13px] font-bold text-ink">{viewStart} - {viewStart + 11}</span>
            <button type="button" onClick={() => setViewStart((start) => start + 12)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink" aria-label="Años siguientes">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {years.map((year) => {
              const active = value === String(year);
              return (
                <button key={year} type="button" onClick={() => { onChange(String(year)); setOpen(false); }} className={cn("h-9 rounded-lg text-[12.5px] font-semibold transition-colors", active ? "bg-brand-700 text-white" : year === currentYear ? "border border-brand-200 text-brand-800 hover:bg-brand-50" : "text-ink-soft hover:bg-brand-50 hover:text-brand-800")}>
                  {year}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-3">
            <button type="button" onClick={() => { onChange(ALL); setOpen(false); }} className="text-[12px] font-semibold text-brand-700 hover:text-brand-800">Borrar</button>
            <button type="button" onClick={() => { onChange(String(currentYear)); setOpen(false); }} className="text-[12px] font-semibold text-brand-700 hover:text-brand-800">Este año</button>
          </div>
        </div>
      )}
    </div>
  );
}

function LegendList({ data, total, active, onSelect }: { data: { name: string; value: number; color: string }[]; total: number; active: string | null; onSelect: (label: string) => void }) {
  return (
    <div className="mt-3 space-y-1.5">
      {data.map((item) => (
        <button key={item.name} type="button" onClick={() => onSelect(item.name)} className={cn("flex w-full min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[11.5px] text-ink-soft transition-colors hover:bg-brand-50/60", active === item.name && "bg-brand-50")}>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }} />
          <span className="truncate">{item.name}</span>
          <span className="ml-auto tabular-nums text-ink-faint">{item.value} ({pct(item.value, total)})</span>
        </button>
      ))}
    </div>
  );
}

function uniqueReports(plans: PlanItem[]): PlanReport[] {
  const map = new Map<number, PlanReport>();
  plans.forEach((plan) => {
    const caso = plan.casos_sop;
    if (map.has(caso.id_caso)) return;
    map.set(caso.id_caso, {
      id: caso.id_caso,
      codigo: caso.codigo_sop,
      descripcion: caso.descripcion,
      fecha: indicatorDate(plan),
      tipo: caso.catalogo_detalle_casos_sop_tipoTocatalogo_detalle?.nombre ?? "Sin tipo",
      estado: caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre,
      riesgoCodigo: caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?.codigo ?? null,
    });
  });
  return [...map.values()];
}

function countReportTypes(reports: PlanReport[]) {
  const map = new Map<string, number>();
  reports.forEach((report) => map.set(report.tipo, (map.get(report.tipo) ?? 0) + 1));
  return [...map.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

function reportStatusChart(reports: PlanReport[]) {
  let cerrado = 0;
  let enProceso = 0;
  reports.forEach((report) => {
    const status = reportStatusLabel(report);
    if (status === "Cerrado") cerrado++;
    else if (status === "En Proceso") enProceso++;
  });
  return [
    { label: "Cerrado", value: cerrado, color: CHART_COLORS.brand },
    { label: "En Proceso", value: enProceso, color: CHART_COLORS.warning },
  ];
}

function planStatusTotals(plans: PlanItem[]) {
  let cerrado = 0;
  let enValidacion = 0;
  let enProceso = 0;
  plans.forEach((plan) => {
    const status = planStatusLabel(plan);
    if (status === "Cerrado") cerrado++;
    else if (status === "En Validación") enValidacion++;
    else enProceso++;
  });
  const total = cerrado + enValidacion + enProceso;
  return {
    total,
    abiertos: enValidacion + enProceso,
    donut: [
      { name: "Cerrado", value: cerrado, color: CHART_COLORS.brand },
      { name: "En Proceso", value: enProceso, color: CHART_COLORS.warning },
      { name: "En Validación", value: enValidacion, color: CHART_COLORS.info },
    ],
  };
}

function riskChart(reports: PlanReport[]) {
  const counts: Record<RiskCategory, number> = {
    inaceptable: 0,
    no_deseable: 0,
    aceptable_revision: 0,
    aceptable_sin_revision: 0,
  };
  reports.forEach((report) => {
    if (reportStatusLabel(report) !== "En Proceso" || !isRiskLevel(report.riesgoCodigo)) return;
    counts[riskCategory(report.riesgoCodigo)]++;
  });
  const order: RiskCategory[] = ["inaceptable", "no_deseable", "aceptable_revision", "aceptable_sin_revision"];
  const colors: Record<RiskCategory, string> = {
    inaceptable: CHART_COLORS.critical,
    no_deseable: CHART_COLORS.warning,
    aceptable_revision: CHART_COLORS.info,
    aceptable_sin_revision: CHART_COLORS.brand,
  };
  return order.map((key) => ({ name: RISK_CATEGORY_LABELS[key], value: counts[key], color: colors[key] }));
}

function plansByArea(plans: PlanItem[]) {
  const map = new Map<string, number>();
  plans.forEach((plan) => {
    if (planStatusLabel(plan) === "Cerrado") return;
    const name = plan.areas.nombre_area;
    map.set(name, (map.get(name) ?? 0) + 1);
  });
  return [...map.entries()].map(([name, value]) => ({ name, value, color: CHART_COLORS.brand })).sort((a, b) => b.value - a.value);
}

function dueChart(plans: PlanItem[]) {
  const labels = ["Vence 0-30 días", "Vencido 0-30 días", "Vence 1-3 meses", "Vencido 30-90 días", "Vencido 90-160 días"];
  const colors = [CHART_COLORS.brand, CHART_COLORS.warning, CHART_COLORS.info, CHART_COLORS.critical, CHART_COLORS.critical];
  return labels.map((name, index) => ({ name, value: plans.filter((plan) => dueBucket(plan) === name).length, color: colors[index] }));
}

function rescheduleChart(plans: PlanItem[]) {
  const labels = ["1 hasta 3 meses", "3 hasta 6 meses", "6 hasta 12 meses"];
  return labels.map((name) => ({ name, value: plans.filter((plan) => rescheduleBucket(plan) === name).length, color: CHART_COLORS.info }));
}

function monthlyTrend(plans: PlanItem[], selectedYear: string, selectedMonth: string): MonthTrendItem[] {
  const reports = uniqueReports(plans);
  const buckets = new Map<string, number>();
  reports.forEach((report) => {
    const key = monthKey(report.fecha);
    if (key) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  });

  if (selectedMonth !== ALL) {
    const parsed = parseMonthKey(selectedMonth);
    if (!parsed) return [];
    return [{ key: selectedMonth, label: shortMonthLabel(parsed.year, parsed.month), value: buckets.get(selectedMonth) ?? 0 }];
  }

  if (selectedYear !== ALL) {
    const year = Number(selectedYear);
    return Array.from({ length: 12 }, (_, month) => {
      const key = `${year}-${String(month + 1).padStart(2, "0")}`;
      return { key, label: shortMonthLabel(year, month), value: buckets.get(key) ?? 0 };
    });
  }

  const out: MonthTrendItem[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    out.push({ key, label: shortMonthLabel(year, month), value: buckets.get(key) ?? 0 });
  }
  return out;
}

function buildDetailRows(plans: PlanItem[], selection: DashboardSelection | null): DetailRow[] {
  return plans
    .filter((plan) => planMatchesSelection(plan, selection))
    .map((plan) => ({
      id: `${plan.casos_sop.codigo_sop}-${plan.id_plan}`,
      codigo: plan.casos_sop.codigo_sop,
      fechaEvento: indicatorDate(plan),
      descripcion: plan.casos_sop.descripcion,
      planCodigo: plan.codigo_plan,
      responsable: plan.usuarios.nombre,
      estadoPlan: plan.catalogo_detalle.nombre,
      descripcionPlan: plan.descripcion,
    }))
    .sort((a, b) => +new Date(b.fechaEvento) - +new Date(a.fechaEvento));
}

function planMatchesSelection(plan: PlanItem, selection: DashboardSelection | null): boolean {
  if (!selection) return true;
  if (selection.kind === "reportType") return reportType(plan) === selection.value;
  if (selection.kind === "reportStatus") return reportStatusLabel(reportFromPlan(plan)) === selection.value;
  if (selection.kind === "month") return monthKey(indicatorDate(plan)) === selection.value;
  if (selection.kind === "planStatus") return planStatusLabel(plan) === selection.value;
  if (selection.kind === "risk") return riskLabel(reportFromPlan(plan)) === selection.value;
  if (selection.kind === "planArea") return planStatusLabel(plan) !== "Cerrado" && plan.areas.nombre_area === selection.value;
  if (selection.kind === "due") return dueBucket(plan) === selection.value;
  if (selection.kind === "reschedule") return rescheduleBucket(plan) === selection.value;
  return true;
}

function reportFromPlan(plan: PlanItem): PlanReport {
  return {
    id: plan.casos_sop.id_caso,
    codigo: plan.casos_sop.codigo_sop,
    descripcion: plan.casos_sop.descripcion,
    fecha: indicatorDate(plan),
    tipo: reportType(plan),
    estado: plan.casos_sop.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre,
    riesgoCodigo: plan.casos_sop.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?.codigo ?? null,
  };
}

function reportType(plan: PlanItem): string {
  return plan.casos_sop.catalogo_detalle_casos_sop_tipoTocatalogo_detalle?.nombre ?? "Sin tipo";
}

function reportStatusLabel(report: PlanReport): "Cerrado" | "En Proceso" | null {
  const status = STAGE_STATUS[stageFromEstado(report.estado)];
  if (status === "cerrado") return "Cerrado";
  if (status === "abierto") return "En Proceso";
  return null;
}

function riskLabel(report: PlanReport): string | null {
  if (reportStatusLabel(report) !== "En Proceso" || !isRiskLevel(report.riesgoCodigo)) return null;
  return RISK_CATEGORY_LABELS[riskCategory(report.riesgoCodigo)];
}

function planStatusLabel(plan: PlanItem): "Cerrado" | "En Proceso" | "En Validación" {
  if (isClosed(plan)) return "Cerrado";
  if (isInVerification(plan)) return "En Validación";
  return "En Proceso";
}

function dueBucket(plan: PlanItem): string | null {
  if (planStatusLabel(plan) === "Cerrado") return null;
  const days = daysUntil(planDeadline(plan));
  if (days >= 0 && days <= 30) return "Vence 0-30 días";
  if (days > 30 && days <= 90) return "Vence 1-3 meses";
  if (days < 0 && days >= -30) return "Vencido 0-30 días";
  if (days < -30 && days >= -90) return "Vencido 30-90 días";
  if (days < -90) return "Vencido 90-160 días";
  return null;
}

function rescheduleBucket(plan: PlanItem): string | null {
  if (planStatusLabel(plan) === "Cerrado" || !plan.fecha_reprogramada) return null;
  const months = (new Date(plan.fecha_reprogramada).getTime() - new Date(plan.fecha_plan).getTime()) / (30 * 86400000);
  if (months >= 1 && months < 3) return "1 hasta 3 meses";
  if (months >= 3 && months < 6) return "3 hasta 6 meses";
  if (months >= 6 && months <= 12) return "6 hasta 12 meses";
  return null;
}

function matchesDateFilters(plan: PlanItem, selectedYear: string, selectedMonth: string): boolean {
  const parts = dateParts(indicatorDate(plan));
  if (!parts) return false;
  if (selectedYear !== ALL && String(parts.year) !== selectedYear) return false;
  if (selectedMonth !== ALL && monthKey(indicatorDate(plan)) !== selectedMonth) return false;
  return true;
}

function indicatorDate(plan: PlanItem): string {
  return plan.casos_sop.fecha_evento ?? plan.casos_sop.fecha_hallazgo;
}

function dateParts(iso: string): { year: number; month: number } | null {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
}

function monthKey(iso: string): string | null {
  const parts = dateParts(iso);
  if (!parts) return null;
  return `${parts.year}-${String(parts.month + 1).padStart(2, "0")}`;
}

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function parseMonthKey(value: string): { year: number; month: number } | null {
  if (!/^\d{4}-\d{2}$/.test(value)) return null;
  const [year, month] = value.split("-").map(Number);
  if (!year || month < 1 || month > 12) return null;
  return { year, month: month - 1 };
}

function yearBlockStart(year: number): number {
  return year - (year % 12);
}

function monthSelectLabel(key: string): string {
  const parsed = parseMonthKey(key);
  if (!parsed) return "Todas";
  return `${MONTH_LONG[parsed.month]} ${parsed.year}`;
}

function shortMonthLabel(year: number, month: number): string {
  return `${MONTH_SHORT[month]} ${String(year).slice(2)}`;
}
