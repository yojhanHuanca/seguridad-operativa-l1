import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileJson,
  FileSpreadsheet,
  FileText,
  Layers3,
  Printer,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  Table2,
  X,
} from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Logo } from "@/components/brand/Logo";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input, Select } from "@/design-system/primitives/Input";
import { Pill, StagePill } from "@/design-system/primitives/Pill";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow } from "@/features/cases/adapter";
import { CASE_FILTERS, type CaseFilterId } from "@/features/cases/lib/filters";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { planDeadline } from "@/features/plans/lib/planDeadline";
import { EVENT_LABELS } from "@/features/cases/domain";
import { formatDate, formatDateTime } from "@/lib/format";
import { exportarTablaExcel } from "@/lib/excelBranded";
import { cn } from "@/lib/utils";
import type { CaseListItem, PlanAccion } from "@/features/cases/types";
import { nombreSistema, useConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";

type ExportScope = "casos" | "planes" | "combinado";

const SCOPE_META: Record<ExportScope, { label: string; pill: string; sheetName: string; noun: string }> = {
  casos: { label: "Casos SOP", pill: "Solo casos SOP", sheetName: "Casos SOP", noun: "caso" },
  planes: { label: "Planes de acción", pill: "Solo planes de acción", sheetName: "Planes de acción", noun: "plan" },
  combinado: { label: "Casos + Planes", pill: "Casos con sus planes", sheetName: "Casos y planes", noun: "fila" },
};
type DatePreset = "today" | "7d" | "30d" | "month";

const DATE_PRESETS: Array<{ id: DatePreset; label: string }> = [
  { id: "today", label: "Hoy" },
  { id: "7d", label: "7 dias" },
  { id: "30d", label: "30 dias" },
  { id: "month", label: "Mes actual" },
];

interface ExportCase {
  source: CaseListItem;
  row: ReturnType<typeof toCaseRow>;
  areas: string[];
}

interface ExportRow {
  [key: string]: string | number;
}

export function ReportExportPage() {
  const [query, setQuery] = useState("");
  const [filterId, setFilterId] = useState<CaseFilterId>("todos");
  const [area, setArea] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [scope, setScope] = useState<ExportScope>("casos");
  const [printActive, setPrintActive] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  const { data: rawCases, isLoading } = useCases({});
  const { data: areas } = useAreas();
  const { data: configuracion } = useConfiguracion();
  const systemName = nombreSistema(configuracion);

  const cases = useMemo<ExportCase[]>(
    () =>
      (rawCases ?? []).map((source) => ({
        source,
        row: toCaseRow(source),
        areas: caseAreas(source),
      })),
    [rawCases]
  );

  const activeFilter = CASE_FILTERS.find((item) => item.id === filterId) ?? CASE_FILTERS[0];

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return cases
      .filter((item) => activeFilter.match(item.row))
      .filter((item) => !area || item.areas.includes(area))
      .filter((item) => withinDateRange(item.source.created_at, from, to))
      .filter((item) => {
        if (!q) return true;
        const haystack = [
          item.row.id,
          item.row.title,
          item.row.reporter,
          item.row.station,
          item.row.location,
          item.row.estado,
          item.row.risk,
          item.row.riskCategoria,
          ...item.areas,
        ]
          .filter(Boolean)
          .join(" ");
        return normalizeText(haystack).includes(q);
      })
      .sort((a, b) => compareBySopCode(a.row.id, b.row.id, a.source.created_at, b.source.created_at));
  }, [activeFilter, area, cases, from, query, to]);

  const exportRows = useMemo(() => buildRows(filtered, scope), [filtered, scope]);
  const fileStamp = new Date().toISOString().slice(0, 10);
  const fileName = `reportes-sop-${scope}-${fileStamp}`;

  const stats = useMemo(() => {
    const conPlanes = filtered.filter((item) => item.source.planes_accion.length > 0).length;
    const cerrados = filtered.filter((item) => item.row.stage === "cierre").length;
    const prorrogas = filtered.filter((item) => item.row.prorrogaSolicitada).length;
    return { total: filtered.length, conPlanes, cerrados, prorrogas };
  }, [filtered]);

  const activeCriteria = useMemo(() => {
    const criteria: Array<{ id: string; label: string; value: string; onClear: () => void }> = [];
    if (filterId !== "todos") {
      criteria.push({
        id: "estado",
        label: "Estado",
        value: activeFilter.tabLabel ?? activeFilter.label,
        onClear: () => setFilterId("todos"),
      });
    }
    if (area) {
      criteria.push({ id: "area", label: "Area", value: area, onClear: () => setArea("") });
    }
    if (query.trim()) {
      criteria.push({ id: "busqueda", label: "Busqueda", value: query.trim(), onClear: () => setQuery("") });
    }
    if (from || to) {
      criteria.push({
        id: "fecha",
        label: "Fechas",
        value: `${from || "inicio"} - ${to || "hoy"}`,
        onClear: () => {
          setFrom("");
          setTo("");
        },
      });
    }
    return criteria;
  }, [activeFilter, area, filterId, from, query, to]);

  useEffect(() => {
    if (!printActive) return;
    const cleanup = () => setPrintActive(false);
    window.addEventListener("afterprint", cleanup, { once: true });
    return () => window.removeEventListener("afterprint", cleanup);
  }, [printActive]);

  const resetFilters = () => {
    setQuery("");
    setFilterId("todos");
    setArea("");
    setFrom("");
    setTo("");
    setScope("casos");
  };

  const applyDatePreset = (preset: DatePreset) => {
    const today = new Date();
    const start = new Date(today);
    if (preset === "today") {
      setFrom(toDateInput(today));
      setTo(toDateInput(today));
      return;
    }
    if (preset === "month") {
      setFrom(toDateInput(new Date(today.getFullYear(), today.getMonth(), 1)));
      setTo(toDateInput(today));
      return;
    }
    start.setDate(today.getDate() - (preset === "7d" ? 6 : 29));
    setFrom(toDateInput(start));
    setTo(toDateInput(today));
  };

  const printReport = () => {
    if (exportRows.length === 0) return;
    setPrintActive(true);
    window.setTimeout(() => window.print(), 0);
  };

  const downloadExcel = async () => {
    if (exportRows.length === 0) return;
    const meta = SCOPE_META[scope];
    setExportingExcel(true);
    try {
      await exportarTablaExcel({
        sheetName: meta.sheetName,
        columnas: Object.keys(exportRows[0] ?? {}),
        filas: exportRows,
        fileName: `${fileName}.xlsx`,
        title: `Exportación · ${meta.label}`,
        subtitle: `${systemName} · Línea 1 · Metro de Lima · ${activeFilter.tabLabel ?? activeFilter.label}`,
        totalLabel: `${filtered.length} reporte${filtered.length === 1 ? "" : "s"} · ${exportRows.length} ${meta.noun}${exportRows.length === 1 ? "" : "s"}`,
      });
    } finally {
      setExportingExcel(false);
    }
  };

  return (
    <SeguridadOperativaShell>
      <div data-report-export-root={printActive ? "active" : "idle"}>
        {printActive && (
          <ReportExportPrintDocument
            items={filtered}
            rows={exportRows}
            scope={scope}
            stats={stats}
            totalCases={filtered.length}
            generatedAt={new Date()}
            systemName={systemName}
            filterLabel={activeFilter.tabLabel ?? activeFilter.label}
            criteria={
              activeCriteria.length
                ? activeCriteria.map(({ label, value }) => ({ label, value }))
                : [{ label: "Alcance", value: "Todos los reportes disponibles" }]
            }
          />
        )}

        <div data-report-export-screen>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <StatChip icon={<FileText className="h-3.5 w-3.5" />} label="Filtrados" value={stats.total} tone="brand" />
              <StatChip icon={<ClipboardList className="h-3.5 w-3.5" />} label="Con planes" value={stats.conPlanes} />
              <StatChip icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Cerrados" value={stats.cerrados} />
              <StatChip icon={<CalendarDays className="h-3.5 w-3.5" />} label="Prórrogas" value={stats.prorrogas} tone={stats.prorrogas > 0 ? "warning" : "neutral"} />
              <StatChip icon={<BarChart3 className="h-3.5 w-3.5" />} label="Filas a exportar" value={exportRows.length} tone="info" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" disabled={exportRows.length === 0} onClick={() => downloadJson(exportRows, fileName)}>
                <FileJson className="h-4 w-4" /> JSON
              </Button>
              <Button variant="outline" size="sm" disabled={exportRows.length === 0} onClick={printReport}>
                <Printer className="h-4 w-4" /> PDF
              </Button>
              <Button variant="outline" size="sm" disabled={exportRows.length === 0} onClick={() => downloadCsv(exportRows, fileName)}>
                <Table2 className="h-4 w-4" /> CSV
              </Button>
              <Button size="sm" disabled={exportRows.length === 0 || exportingExcel} onClick={() => void downloadExcel()}>
                <FileSpreadsheet className="h-4 w-4" /> {exportingExcel ? "Generando..." : "Descargar Excel"}
              </Button>
            </div>
          </div>
          <p className="mt-2 max-w-3xl text-[12.5px] leading-relaxed text-ink-quiet">
            Genere archivos con información real del flujo SOP. La exportación respeta los filtros aplicados y no agrega datos manuales.
          </p>

          <Card padded={false} className="mt-5 overflow-hidden">
            <div className="border-b border-line bg-white px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <SlidersHorizontal className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-ink">Filtros de exportación</p>
                    <p className="mt-0.5 text-[12.5px] text-ink-quiet">
                      Configure el archivo antes de descargarlo. La vista previa se actualiza al instante.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={activeCriteria.length ? "brand" : "neutral"}>{activeCriteria.length} filtros activos</Pill>
                  <Pill tone="info">{SCOPE_META[scope].pill}</Pill>
                </div>
              </div>

              <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(280px,1fr)_auto] xl:items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-11 pl-9 text-[14px]"
                    placeholder="Buscar por código SOP, título, estación, reportante, riesgo o área..."
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ScopeButton active={scope === "casos"} icon={<Table2 className="h-4 w-4" />} label="Casos SOP" onClick={() => setScope("casos")} />
                  <ScopeButton active={scope === "planes"} icon={<ClipboardList className="h-4 w-4" />} label="Planes de acción" onClick={() => setScope("planes")} />
                  <ScopeButton active={scope === "combinado"} icon={<Layers3 className="h-4 w-4" />} label="Casos + Planes" onClick={() => setScope("combinado")} />
                </div>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border-b border-line p-4 lg:border-b-0 lg:border-r">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Estado del reporte</p>
                  <span className="text-[11.5px] text-ink-quiet">{activeFilter.tabLabel ?? activeFilter.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CASE_FILTERS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilterId(item.id)}
                      className={cn(
                        "h-9 rounded-lg border px-3 text-[12.5px] font-medium transition-all",
                        filterId === item.id
                          ? "border-brand-700 bg-brand-700 text-white shadow-sm"
                          : "border-line bg-white text-ink-soft hover:border-brand-200 hover:bg-brand-50"
                      )}
                    >
                      {item.tabLabel ?? item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <Field label="Área responsable">
                    <Select value={area} onChange={(event) => setArea(event.target.value)}>
                      <option value="">Todas las áreas</option>
                      {(areas ?? []).map((item) => (
                        <option key={item.id_area} value={item.nombre_area}>
                          {item.nombre_area}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <div className="rounded-lg border border-line bg-surface/40 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Salida del archivo</p>
                    <p className="mt-1 text-[13px] font-semibold text-ink">{exportRows.length} filas</p>
                    <p className="text-[11.5px] text-ink-quiet">{filtered.length} reportes incluidos</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Fecha de creación</p>
                  <CalendarDays className="h-4 w-4 text-ink-faint" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {DATE_PRESETS.map((preset) => (
                    <DatePresetButton key={preset.id} label={preset.label} onClick={() => applyDatePreset(preset.id)} />
                  ))}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Desde">
                    <Input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
                  </Field>
                  <Field label="Hasta">
                    <Input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
                  </Field>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/45 px-4 py-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                {activeCriteria.length === 0 ? (
                  <span className="text-[12.5px] text-ink-quiet">Sin filtros adicionales. Se exportará el universo disponible.</span>
                ) : (
                  activeCriteria.map((criterion) => (
                    <FilterChip key={criterion.id} label={criterion.label} value={criterion.value} onClear={criterion.onClear} />
                  ))
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <RefreshCcw className="h-4 w-4" /> Restablecer
              </Button>
            </div>
          </Card>

          <Card padded={false} className="mt-5 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div>
                <p className="text-[14px] font-semibold text-ink">Vista previa</p>
                <p className="text-[12px] text-ink-quiet">
                  {exportRows.length} filas listas para exportar · {filtered.length} reportes incluidos
                </p>
              </div>
              <Pill tone={exportRows.length > 0 ? "brand" : "warning"} dot>
                {exportRows.length > 0 ? "Listo para descargar" : "Sin resultados"}
              </Pill>
            </div>

            {isLoading ? (
              <p className="p-8 text-center text-[13px] text-ink-quiet">Cargando reportes...</p>
            ) : exportRows.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-ink-soft">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <p className="mt-3 text-[14px] font-semibold text-ink">No hay información para exportar</p>
                <p className="mt-1 text-[12.5px] text-ink-quiet">Ajuste los filtros para incluir reportes en el archivo.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {scope === "casos" ? (
                  <SummaryPreview rows={filtered.slice(0, 10)} />
                ) : scope === "planes" ? (
                  <PlanOnlyPreview rows={filtered} />
                ) : (
                  <PlanPreview rows={filtered.slice(0, 10)} />
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </SeguridadOperativaShell>
  );
}

function StatChip({
  icon,
  label,
  value,
  tone = "neutral",
}: {
  icon: ReactNode;
  label: string;
  value: number;
  tone?: "neutral" | "brand" | "warning" | "info";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2",
        tone === "brand" && "border-brand-200 bg-brand-50/70",
        tone === "warning" && "border-warning/30 bg-warning-soft/60",
        tone === "info" && "border-line bg-white",
        tone === "neutral" && "border-line bg-white"
      )}
    >
      <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-soft", tone === "brand" && "bg-white text-brand-700")}>
        {icon}
      </span>
      <span>
        <span className="block font-mono text-[15px] font-bold leading-none text-ink tabular-nums">{value}</span>
        <span className="mt-0.5 block text-[10.5px] font-medium text-ink-faint">{label}</span>
      </span>
    </div>
  );
}

function ScopeButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-3.5 text-[12.5px] font-semibold transition-all",
        active
          ? "border-brand-700 bg-brand-700 text-white shadow-sm"
          : "border-line bg-white text-ink-soft hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function DatePresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 rounded-lg border border-line bg-white px-3 text-[12px] font-medium text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
    >
      {label}
    </button>
  );
}

function FilterChip({ label, value, onClear }: { label: string; value: string; onClear: () => void }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-2.5 pr-1 text-[11.5px] text-ink-soft">
      <span className="shrink-0 font-semibold text-ink-faint">{label}:</span>
      <span className="max-w-[220px] truncate font-medium text-ink">{value}</span>
      <button
        type="button"
        onClick={onClear}
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
        aria-label={`Quitar filtro ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function SummaryPreview({ rows }: { rows: ExportCase[] }) {
  return (
    <table className="min-w-[980px] w-full text-left">
      <thead>
        <tr className="bg-surface/60 border-b border-line">
          <PreviewTh>Código</PreviewTh>
          <PreviewTh>Estado</PreviewTh>
          <PreviewTh>Tipo</PreviewTh>
          <PreviewTh>Título</PreviewTh>
          <PreviewTh>Estación</PreviewTh>
          <PreviewTh>Área</PreviewTh>
          <PreviewTh>Riesgo</PreviewTh>
          <PreviewTh>Fecha</PreviewTh>
        </tr>
      </thead>
      <tbody className="divide-y divide-line-soft">
        {rows.map((item) => (
          <tr key={item.row.id} className="hover:bg-surface/40">
            <PreviewTd className="font-mono font-semibold text-brand-700">{item.row.id}</PreviewTd>
            <PreviewTd><StagePill stage={item.row.stage} /></PreviewTd>
            <PreviewTd>{EVENT_LABELS[item.row.type]}</PreviewTd>
            <PreviewTd className="max-w-[280px] truncate font-medium text-ink">{item.row.title}</PreviewTd>
            <PreviewTd>{item.row.station || "—"}</PreviewTd>
            <PreviewTd>{item.areas.join(", ") || "—"}</PreviewTd>
            <PreviewTd>{item.row.risk ? `${item.row.risk} · ${item.row.riskCategoria ?? ""}` : "Sin evaluar"}</PreviewTd>
            <PreviewTd>{formatDate(item.source.created_at)}</PreviewTd>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PlanOnlyPreview({ rows }: { rows: ExportCase[] }) {
  const plans = rows.flatMap((item) => item.source.planes_accion.map((plan) => ({ item, plan }))).slice(0, 10);
  if (plans.length === 0) {
    return <p className="p-8 text-center text-[13px] text-ink-quiet">Ninguno de los reportes filtrados tiene planes de acción.</p>;
  }
  return (
    <table className="min-w-[980px] w-full text-left">
      <thead>
        <tr className="bg-surface/60 border-b border-line">
          <PreviewTh>Plan</PreviewTh>
          <PreviewTh>Código SOP</PreviewTh>
          <PreviewTh>Área</PreviewTh>
          <PreviewTh>Responsable</PreviewTh>
          <PreviewTh>Estado</PreviewTh>
          <PreviewTh>Avance</PreviewTh>
          <PreviewTh>Fecha límite</PreviewTh>
          <PreviewTh>Prórroga</PreviewTh>
        </tr>
      </thead>
      <tbody className="divide-y divide-line-soft">
        {plans.map(({ item, plan }) => (
          <tr key={plan.id_plan} className="hover:bg-surface/40">
            <PreviewTd className="font-mono font-semibold text-brand-700">{shortPlanCode(plan.codigo_plan)}</PreviewTd>
            <PreviewTd className="font-mono">{item.row.id}</PreviewTd>
            <PreviewTd>{plan.areas.nombre_area}</PreviewTd>
            <PreviewTd>{plan.usuarios.nombre}</PreviewTd>
            <PreviewTd>{plan.catalogo_detalle.nombre}</PreviewTd>
            <PreviewTd>{planProgress(plan)}%</PreviewTd>
            <PreviewTd>{formatDate(planDeadline(plan))}</PreviewTd>
            <PreviewTd>{plan.prorroga_estado ?? "Sin solicitud"}</PreviewTd>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PlanPreview({ rows }: { rows: ExportCase[] }) {
  const plans = rows.reduce<Array<{ item: ExportCase; plan: PlanAccion | null }>>((acc, item) => {
    if (item.source.planes_accion.length === 0) acc.push({ item, plan: null });
    else item.source.planes_accion.forEach((plan) => acc.push({ item, plan }));
    return acc;
  }, []).slice(0, 10);
  return (
    <table className="min-w-[980px] w-full text-left">
      <thead>
        <tr className="bg-surface/60 border-b border-line">
          <PreviewTh>Código SOP</PreviewTh>
          <PreviewTh>Plan</PreviewTh>
          <PreviewTh>Área</PreviewTh>
          <PreviewTh>Responsable</PreviewTh>
          <PreviewTh>Estado plan</PreviewTh>
          <PreviewTh>Avance</PreviewTh>
          <PreviewTh>Fecha límite</PreviewTh>
          <PreviewTh>Reporte</PreviewTh>
        </tr>
      </thead>
      <tbody className="divide-y divide-line-soft">
        {plans.map(({ item, plan }) => (
          <tr key={`${item.row.id}-${plan?.id_plan ?? "sin-plan"}`} className="hover:bg-surface/40">
            <PreviewTd className="font-mono font-semibold text-brand-700">{item.row.id}</PreviewTd>
            <PreviewTd className="font-mono font-semibold">{plan ? shortPlanCode(plan.codigo_plan) : "—"}</PreviewTd>
            <PreviewTd>{plan?.areas.nombre_area ?? (item.areas.join(", ") || "—")}</PreviewTd>
            <PreviewTd>{plan?.usuarios.nombre ?? "—"}</PreviewTd>
            <PreviewTd>{plan?.catalogo_detalle.nombre ?? "Sin plan de acción"}</PreviewTd>
            <PreviewTd>{plan ? `${planProgress(plan)}%` : "—"}</PreviewTd>
            <PreviewTd>{plan ? formatDate(planDeadline(plan)) : "—"}</PreviewTd>
            <PreviewTd className="max-w-[280px] truncate font-medium text-ink">{item.row.title}</PreviewTd>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ReportExportPrintDocument({
  items,
  rows,
  scope,
  stats,
  totalCases,
  generatedAt,
  systemName,
  filterLabel,
  criteria,
}: {
  items: ExportCase[];
  rows: ExportRow[];
  scope: ExportScope;
  stats: { total: number; conPlanes: number; cerrados: number; prorrogas: number };
  totalCases: number;
  generatedAt: Date;
  systemName: string;
  filterLabel: string;
  criteria: Array<{ label: string; value: string }>;
}) {
  const planRows = items.flatMap((item) => item.source.planes_accion.map((plan) => ({ item, plan })));
  return (
    <section data-report-export className="mx-auto bg-white px-1 py-1 text-ink">
      <header className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <Logo size={52} withWordmark={false} />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-800">{systemName} · Seguridad Operativa</p>
            <h1 className="mt-1 text-[25px] font-bold leading-tight text-ink">Exportación de Reportes SOP</h1>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">Línea 1 del Metro de Lima · Documento de control interno</p>
          </div>
        </div>
        <div className="min-w-[190px] rounded-lg border border-line bg-surface/40 p-3 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Generado</p>
          <p className="mt-1 text-[12px] font-semibold text-ink">{formatDateTime(generatedAt)}</p>
          <p className="mt-1 text-[11px] text-ink-quiet">{SCOPE_META[scope].pill}</p>
        </div>
      </header>
      <div className="mt-5 h-[3px] w-full bg-brand-700" />

      <section className="mt-5 grid grid-cols-5 gap-2">
        <PrintMetric label="Reportes" value={stats.total} />
        <PrintMetric label="Con planes" value={stats.conPlanes} />
        <PrintMetric label="Cerrados" value={stats.cerrados} />
        <PrintMetric label="Prórrogas" value={stats.prorrogas} />
        <PrintMetric label="Filas" value={rows.length} />
      </section>

      <section className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4">
        <div className="rounded-lg border border-line p-3">
          <h2 className="text-[13px] font-bold text-brand-800">Alcance del documento</h2>
          <div className="mt-3 grid gap-2">
            <PrintField label="Contenido" value={SCOPE_META[scope].pill} />
            <PrintField label="Estado base" value={filterLabel} />
            <PrintField label="Reportes incluidos" value={String(totalCases)} />
          </div>
        </div>
        <div className="rounded-lg border border-line p-3">
          <h2 className="text-[13px] font-bold text-brand-800">Criterios aplicados</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {criteria.map((criterion) => (
              <PrintField key={`${criterion.label}-${criterion.value}`} label={criterion.label} value={criterion.value} />
            ))}
          </div>
        </div>
      </section>

      {scope !== "planes" && (
        <section className="mt-6">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-2">
            <div>
              <h2 className="text-[17px] font-bold text-brand-800">Reportes incluidos</h2>
              <p className="mt-0.5 text-[11px] text-ink-quiet">
                Datos generales del expediente SOP, estado, ubicación, área responsable, riesgo y cantidad de planes.
              </p>
            </div>
            <p className="text-[11px] font-semibold text-ink-quiet">{items.length} reportes</p>
          </div>
          <PrintSummaryTable items={items} />
        </section>
      )}

      {scope !== "casos" && (
        <section className="mt-6">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-2">
            <div>
              <h2 className="text-[17px] font-bold text-brand-800">Planes de acción vinculados</h2>
              <p className="mt-0.5 text-[11px] text-ink-quiet">
                Detalle de planes asociados a los reportes incluidos: responsable, área, estado, avance y fecha límite.
              </p>
            </div>
            <p className="text-[11px] font-semibold text-ink-quiet">{planRows.length} planes</p>
          </div>
          {planRows.length > 0 ? (
            <PrintPlansTable rows={planRows} />
          ) : (
            <p className="mt-3 rounded-lg border border-line bg-surface/40 p-3 text-[11px] text-ink-quiet">
              Los reportes incluidos no tienen planes de acción registrados.
            </p>
          )}
        </section>
      )}

      <footer className="mt-8 border-t border-line pt-3 text-[11px] text-ink-quiet">
        Documento generado por {systemName} · Seguridad Operativa · {formatDateTime(generatedAt)}
      </footer>
    </section>
  );
}

/** Los mismos 15 campos del "hallazgo" que trae el histórico oficial (BD), en el mismo orden y con el mismo nombre de columna. */
function hallazgoColumns(item: ExportCase) {
  const riesgo = item.row.risk ? `${item.row.risk} — ${item.row.riskCategoria ?? ""}` : "Sin evaluar";
  return {
    "Nuevo código": item.row.id,
    "Fecha del hallazgo": formatDate(item.source.fecha_hallazgo),
    "Fecha de evento": item.source.fecha_evento ? formatDate(item.source.fecha_evento) : "—",
    "Estado Hallazgo": item.row.estado,
    "Días abierto": item.source.dias_abierto ?? "—",
    "Procedencia": item.source.catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?.nombre ?? "—",
    "Tipo": item.source.catalogo_detalle_casos_sop_tipoTocatalogo_detalle?.nombre ?? "—",
    "Descripción": item.source.descripcion,
    "Responsable de Hallazgo/ Investigación/ RSO": item.source.usuarios_casos_sop_responsable_hallazgoTousuarios?.nombre ?? "—",
    "Tipo SOP": item.source.catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?.nombre ?? "—",
    "Subtipo SOP": item.source.catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?.nombre ?? "—",
    "Peligro": item.source.peligro ?? "—",
    "Consecuencias": item.source.consecuencia ?? "—",
    "Análisis de riesgo": riesgo,
    "ACR": item.source.acr ?? "—",
  };
}

/** Extra que ya calculábamos y que no está en la plantilla oficial — se agrega al final, sin pisar el formato de referencia. */
function hallazgoExtra(item: ExportCase) {
  return {
    "Reportante": item.row.reporter,
    "Estación": item.row.station || "—",
    "Ubicación": item.row.location || "—",
    "Fecha creación": formatDateTime(item.source.created_at),
    "Evidencias": item.row.evidencias,
    "Prórroga solicitada": item.row.prorrogaSolicitada ? "Sí" : "No",
  };
}

function planColumns(plan: PlanAccion) {
  return {
    "Plan de Acción": shortPlanCode(plan.codigo_plan),
    "Descripción de Plan de Acción": plan.descripcion,
    "Área": plan.areas.nombre_area,
    "Responsable Plan de Acción": plan.usuarios.nombre,
    "Estado Plan de acción": plan.catalogo_detalle.nombre,
  };
}

function planExtra(plan: PlanAccion) {
  return {
    "Cargo responsable": plan.usuarios.cargo ?? "—",
    "Avance": `${planProgress(plan)}%`,
    "Actividades": plan.actividades_plan.length,
    "Fecha límite": formatDate(planDeadline(plan)),
    "Prórroga": plan.prorroga_estado ?? "Sin solicitud",
  };
}

const SIN_PLAN_COLUMNS = {
  "Plan de Acción": "—",
  "Descripción de Plan de Acción": "—",
  "Área": "—",
  "Responsable Plan de Acción": "—",
  "Estado Plan de acción": "Sin plan de acción",
};

const SIN_PLAN_EXTRA = {
  "Cargo responsable": "—",
  "Avance": "—",
  "Actividades": 0,
  "Fecha límite": "—",
  "Prórroga": "Sin solicitud",
};

function buildRows(items: ExportCase[], scope: ExportScope): ExportRow[] {
  if (scope === "planes") {
    return items.flatMap((item) =>
      item.source.planes_accion.map((plan) => ({
        "Nuevo código": item.row.id,
        ...planColumns(plan),
        ...planExtra(plan),
        "Título del reporte": item.row.title,
      })),
    );
  }

  if (scope === "combinado") {
    return items.flatMap((item) => {
      const hallazgo = hallazgoColumns(item);
      const extra = hallazgoExtra(item);
      if (item.source.planes_accion.length === 0) {
        return [{ ...hallazgo, ...SIN_PLAN_COLUMNS, ...extra, ...SIN_PLAN_EXTRA }];
      }
      return item.source.planes_accion.map((plan) => ({
        ...hallazgo,
        ...planColumns(plan),
        ...extra,
        ...planExtra(plan),
      }));
    });
  }

  return items.map((item) => ({ ...hallazgoColumns(item), ...hallazgoExtra(item) }));
}

function PrintSummaryTable({ items }: { items: ExportCase[] }) {
  return (
    <table className="mt-3 w-full border-collapse text-left text-[10.5px]">
      <thead>
        <tr className="bg-surface">
          <PrintTh>Código</PrintTh>
          <PrintTh>Estado</PrintTh>
          <PrintTh>Tipo</PrintTh>
          <PrintTh>Título / estación</PrintTh>
          <PrintTh>Área responsable</PrintTh>
          <PrintTh>Riesgo</PrintTh>
          <PrintTh>Planes</PrintTh>
          <PrintTh>Fecha</PrintTh>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.row.id}>
            <PrintTd className="font-mono font-semibold text-brand-800">{item.row.id}</PrintTd>
            <PrintTd>{item.row.estado}</PrintTd>
            <PrintTd>{EVENT_LABELS[item.row.type]}</PrintTd>
            <PrintTd>
              <span className="font-semibold">{item.row.title}</span>
              <br />
              <span className="text-ink-quiet">{[item.row.station, item.row.location].filter(Boolean).join(" · ") || "—"}</span>
            </PrintTd>
            <PrintTd>{item.areas.join(", ") || "—"}</PrintTd>
            <PrintTd>{item.row.risk ? `${item.row.risk} — ${item.row.riskCategoria ?? ""}` : "Sin evaluar"}</PrintTd>
            <PrintTd>{item.source.planes_accion.length}</PrintTd>
            <PrintTd>{formatDate(item.source.created_at)}</PrintTd>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PrintPlansTable({ rows }: { rows: Array<{ item: ExportCase; plan: PlanAccion }> }) {
  return (
    <table className="mt-3 w-full border-collapse text-left text-[10.5px]">
      <thead>
        <tr className="bg-surface">
          <PrintTh>SOP</PrintTh>
          <PrintTh>Plan</PrintTh>
          <PrintTh>Reporte</PrintTh>
          <PrintTh>Área</PrintTh>
          <PrintTh>Responsable</PrintTh>
          <PrintTh>Estado</PrintTh>
          <PrintTh>Avance</PrintTh>
          <PrintTh>Límite</PrintTh>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ item, plan }) => (
          <tr key={`${item.row.id}-${plan.id_plan}`}>
            <PrintTd className="font-mono font-semibold text-brand-800">{item.row.id}</PrintTd>
            <PrintTd className="font-mono font-semibold">{shortPlanCode(plan.codigo_plan)}</PrintTd>
            <PrintTd>{item.row.title}</PrintTd>
            <PrintTd>{plan.areas.nombre_area}</PrintTd>
            <PrintTd>
              <span className="font-semibold">{plan.usuarios.nombre}</span>
              <br />
              <span className="text-ink-quiet">{plan.usuarios.cargo ?? "—"}</span>
            </PrintTd>
            <PrintTd>{plan.catalogo_detalle.nombre}</PrintTd>
            <PrintTd>{planProgress(plan)}%</PrintTd>
            <PrintTd>{formatDate(planDeadline(plan))}</PrintTd>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function caseAreas(caso: CaseListItem): string[] {
  return Array.from(
    new Set(
      [caso.areas?.nombre_area, ...caso.planes_accion.map((plan) => plan.areas?.nombre_area)]
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value))
    )
  );
}

function withinDateRange(value: string, from: string, to: string): boolean {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return false;
  if (from && time < new Date(`${from}T00:00:00`).getTime()) return false;
  if (to && time > new Date(`${to}T23:59:59.999`).getTime()) return false;
  return true;
}

function toDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function planProgress(plan: PlanAccion): number {
  if (plan.actividades_plan.length === 0) return 0;
  const total = plan.actividades_plan.length;
  const sum = plan.actividades_plan.reduce((acc, activity) => acc + Number(activity.porcentaje ?? 0), 0);
  return Math.round(sum / total);
}

/** Orden ascendente por número/año del código SOP, como en el histórico oficial — no por fecha de creación. */
function sopSortKey(id: string): { year: number; num: number } | null {
  const match = id.match(/(\d+)\s*-\s*(\d+)/);
  if (!match) return null;
  return { num: Number(match[1]), year: Number(match[2]) };
}

function compareBySopCode(idA: string, idB: string, createdAtA: string, createdAtB: string): number {
  const a = sopSortKey(idA);
  const b = sopSortKey(idB);
  if (a && b) {
    if (a.year !== b.year) return a.year - b.year;
    return a.num - b.num;
  }
  return +new Date(createdAtA) - +new Date(createdAtB);
}

function normalizeText(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function downloadCsv(rows: ExportRow[], fileName: string) {
  if (rows.length === 0) return;
  const columns = Object.keys(rows[0]);
  const lines = [
    columns,
    ...rows.map((row) => columns.map((column) => row[column] ?? "")),
  ].map((row) => row.map(toCsvCell).join(";"));
  const csv = `sep=;\r\n${lines.join("\r\n")}`;
  downloadBlob(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" }), `${fileName}.csv`);
}

function downloadJson(rows: ExportRow[], fileName: string) {
  if (rows.length === 0) return;
  downloadBlob(new Blob([JSON.stringify(rows, null, 2)], { type: "application/json;charset=utf-8;" }), `${fileName}.json`);
}

function toCsvCell(value: string | number): string {
  const clean = String(value)
    .replace(/\r?\n|\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const safe = /^[=+\-@]/.test(clean) ? `'${clean}` : clean;
  return `"${safe.replace(/"/g, '""')}"`;
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function PreviewTh({ children }: { children: ReactNode }) {
  return <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{children}</th>;
}

function PreviewTd({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 text-[12.5px] text-ink-soft", className)}>{children}</td>;
}

function PrintField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-brand-700 pl-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[12px] text-ink">{value || "—"}</p>
    </div>
  );
}

function PrintMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-line bg-surface/35 px-3 py-2">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 font-mono text-[18px] font-bold text-ink tabular-nums">{value}</p>
    </div>
  );
}

function PrintTh({ children }: { children: ReactNode }) {
  return <th className="border border-line px-2 py-1.5 font-semibold text-ink">{children}</th>;
}

function PrintTd({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("border border-line px-2 py-1.5 align-top text-ink", className)}>{children}</td>;
}
