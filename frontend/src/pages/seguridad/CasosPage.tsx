import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Download, FolderKanban, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ClipboardList, CalendarDays, UserCircle, CheckCircle2 } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill, StagePill } from "@/design-system/primitives/Pill";
import { EmptyState } from "@/design-system/primitives/Progress";
import { NuevoReporteModal } from "@/features/reports/components/NuevoReporteModal";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useCasesPaginated } from "@/features/cases/hooks/useCasesPaginated";
import { useCaseCounts } from "@/features/cases/hooks/useCaseCounts";
import { toCaseRow, type CaseRow } from "@/features/cases/adapter";
import { CASE_FILTERS, resolveFilter } from "@/features/cases/lib/filters";
import { ESTADOS_POR_FILTRO } from "@/features/cases/lib/filterEstados";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { slaEstado, diasRestantes } from "@/features/cases/lib/sla";
import { EVENT_LABELS, TYPE_TONE } from "@/features/cases/domain";
import { formatDate } from "@/lib/format";
import { downloadCsv, sufijoFecha } from "@/lib/download";
import { api, type ApiEnvelope } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { CaseListItem } from "@/features/cases/types";

/**
 * Acción rápida por etapa. Todas llevan al expediente —es donde se ejecuta el
 * flujo—, pero el texto nombra el paso real que toca, en vez de sugerir que la
 * transición ocurre desde la bandeja.
 */
const QUICK_ACTION: Partial<Record<CaseRow["stage"], string>> = {
  recepcion: "Revisar",
  evaluacion: "Evaluar",
  pendiente_info: "Ver solicitud",
  investigacion: "Investigar",
  plan_accion: "Ver plan",
  verificacion: "Verificar",
};

const PAGE_SIZE = 8;
const TAB_FILTER_IDS = ["todos", "prorrogas", "investigacion", "verificacion"] as const;
const SORT_A_BACKEND = { recent: "recientes", priority: "prioridad", sla: "sla" } as const;

export function SoCasosPage() {
  const [params, setParams] = useSearchParams();
  const filtro = resolveFilter(params.get("filtro"));
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [sort, setSort] = useState<"recent" | "priority" | "sla">("recent");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nuevoOpen, setNuevoOpen] = useState(false);
  const [exportando, setExportando] = useState(false);

  const { data: areas } = useAreas();
  const areaId = useMemo(() => areas?.find((a) => a.nombre_area === areaFilter)?.id_area, [areas, areaFilter]);

  // La búsqueda ya no es un filtro en memoria: cada tecleo dispararía un
  // pedido al servidor, así que se espera una pausa antes de mandarla.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedId(null);
  }, [filtro.id, areaFilter, debouncedQuery, sort]);

  const { data: counts } = useCaseCounts(areaId);

  const { data: pageData, isLoading } = useCasesPaginated({
    estado: ESTADOS_POR_FILTRO[filtro.id],
    area: areaId,
    search: debouncedQuery.trim() || undefined,
    sort: SORT_A_BACKEND[sort],
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const cases = useMemo(() => (pageData?.items ?? []).map(toCaseRow), [pageData]);
  const total = pageData?.total ?? 0;

  // Cambiar de pestaña no debe borrar lo que el usuario venía buscando.
  const setFilter = (id: string) => {
    const next = new URLSearchParams(params);
    if (id === "todos") next.delete("filtro");
    else next.set("filtro", id);
    setParams(next);
  };

  const tabFilters = useMemo(
    () => TAB_FILTER_IDS.map((id) => CASE_FILTERS.find((f) => f.id === id)).filter((f): f is (typeof CASE_FILTERS)[number] => Boolean(f)),
    []
  );
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pageStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + cases.length, total);

  const goToPage = (nextPage: number) => {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
    setExpandedId(null);
  };

  return (
    <SeguridadOperativaShell>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] font-bold text-ink tracking-tight">Gestión de Reportes</h1>
          <p className="text-[13px] text-ink-quiet mt-1">
            Todos los reportes del sistema. Abra el expediente para gestionar el flujo completo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setNuevoOpen(true)}>
            <Plus className="h-4 w-4" /> Nuevo Reporte
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={exportando}
            onClick={async () => {
              setExportando(true);
              try {
                const rows = await fetchAllForExport({
                  estado: ESTADOS_POR_FILTRO[filtro.id],
                  area: areaId,
                  search: debouncedQuery.trim() || undefined,
                  sort: SORT_A_BACKEND[sort],
                });
                exportCsv(rows.map(toCaseRow));
              } finally {
                setExportando(false);
              }
            }}
          >
            <Download className="h-4 w-4" /> {exportando ? "Exportando…" : "Exportar lista"}
          </Button>
        </div>
      </div>

      {/* Pestañas — mismas que el menú lateral (features/cases/lib/filters.ts) */}
      <div className="mt-5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-line overflow-x-auto scrollbar-none">
          {tabFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-9 px-3.5 rounded-lg text-[12.5px] font-medium transition-all flex items-center gap-2 whitespace-nowrap",
                filtro.id === f.id ? "bg-brand-700 text-white shadow-sm" : "text-ink-soft hover:bg-surface"
              )}
            >
              {f.tabLabel ?? f.label}
              <span
                className={cn(
                  "tabular-nums text-[10.5px] px-1.5 rounded-full",
                  filtro.id === f.id ? "bg-white/20" : "bg-surface-2 text-ink-quiet"
                )}
              >
                {counts?.[f.id] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <Card className="mt-4 p-3 flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[220px] flex items-center gap-2 h-9 px-3 rounded-lg bg-surface border border-line">
          <Search className="h-4 w-4 text-ink-faint shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por código, título, estación o reportante…"
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-ink-faint"
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterSelect
            value={areaFilter}
            onChange={setAreaFilter}
            options={[
              { value: "", label: "Todas las áreas" },
              ...(areas ?? []).map((a) => ({ value: a.nombre_area, label: a.nombre_area })),
            ]}
          />
          <FilterSelect
            value={sort}
            onChange={(v) => setSort(v as typeof sort)}
            options={[
              { value: "recent", label: "Más recientes" },
              { value: "priority", label: "Por prioridad" },
              { value: "sla", label: "Por SLA" },
            ]}
          />
        </div>
      </Card>

      {/* Table */}
      <Card padded={false} className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[940px] w-full text-left">
            <thead>
              <tr className="bg-surface/60 border-b border-line">
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[150px]">Código</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[110px]">Tipo</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint">Título</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[115px]">Reportante</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[115px]">Estación</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[140px]">Estado</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {cases.map((c) => {
                const sla = slaEstado(c.slaDueDate, c.stage);
                const hasPlan = c.planes.length > 0;
                const isExpanded = expandedId === c.id;
                return (
                  <Fragment key={c.id}>
                    <tr className="group hover:bg-surface/40 transition-colors">
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Link
                          to={`/seguridad/casos/${encodeURIComponent(c.id)}`}
                          className="inline-block font-mono text-[14px] font-bold leading-tight text-brand-700 hover:underline cursor-pointer"
                        >
                          {c.id}
                        </Link>
                        <p className="text-[10.5px] text-ink-faint mt-0.5">{formatDate(c.createdAt)}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn("inline-flex px-2 py-1 rounded-md text-[11px] font-medium", TYPE_TONE[c.type])}>
                          {EVENT_LABELS[c.type]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 max-w-[300px]">
                        <p className="text-[13px] font-semibold text-ink truncate">{c.title}</p>
                        <p className="text-[11px] text-ink-quiet truncate mt-0.5">{c.location}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-[12.5px] text-ink-soft truncate">{c.reporter}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-[12.5px] text-ink-soft truncate">{c.station}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col items-start gap-1">
                          <StagePill stage={c.stage} />
                          {c.prorrogaSolicitada && (
                            <span className="text-[10.5px] font-medium text-warning-ink">Prórroga solicitada</span>
                          )}
                          {(sla === "overdue" || sla === "soon") && c.slaDueDate && (
                            <Pill tone={sla === "overdue" ? "critical" : "warning"}>
                              {sla === "overdue"
                                ? `SLA vencido ${Math.abs(diasRestantes(c.slaDueDate))}d`
                                : `SLA ${diasRestantes(c.slaDueDate)}d`}
                            </Pill>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/seguridad/casos/${encodeURIComponent(c.id)}`}
                            className="text-[12.5px] font-medium text-brand-700 hover:underline"
                          >
                            {c.prorrogaSolicitada ? "Resolver prórroga" : (QUICK_ACTION[c.stage] ?? "Ver detalle")}
                          </Link>
                          {hasPlan && (
                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? null : c.id)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                              aria-label={isExpanded ? "Ocultar plan" : "Ver plan"}
                            >
                              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && hasPlan && (
                      <tr className="bg-surface/60">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
                            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                              <ClipboardList className="h-3.5 w-3.5" /> Planes de acción vinculados
                            </p>
                            <div className="space-y-2">
                              {c.planes.map((plan) => {
                                const total = plan.actividades_plan.length;
                                const completadas = plan.actividades_plan.filter(
                                  (actividad) => actividad.catalogo_detalle?.nombre === "Completado" || Number(actividad.porcentaje ?? 0) >= 100
                                ).length;
                                const avance = total > 0 ? Math.round((completadas / total) * 100) : 0;
                                const fechaObjetivo = plan.fecha_reprogramada ?? plan.fecha_plan;

                                return (
                                  <div key={plan.id_plan} className="rounded-lg border border-line-soft p-3 transition-colors hover:bg-surface/40">
                                    <div className="flex items-start gap-3">
                                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                                        <ClipboardList className="h-4 w-4" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <p className="font-mono text-[12px] font-semibold text-brand-700">{shortPlanCode(plan.codigo_plan)}</p>
                                          <Pill tone={plan.prorroga_estado === "pendiente" ? "warning" : "brand"} dot>
                                            {plan.prorroga_estado === "pendiente" ? "Prórroga pendiente" : plan.catalogo_detalle.nombre}
                                          </Pill>
                                        </div>
                                        <p className="mt-1 line-clamp-2 break-all text-[12.5px] font-medium leading-snug text-ink">{plan.descripcion}</p>
                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-ink-quiet">
                                          <span className="inline-flex items-center gap-1"><UserCircle className="h-3.5 w-3.5" /> {plan.usuarios.nombre}</span>
                                          <span>{plan.areas.nombre_area}</span>
                                          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> vence {formatDate(fechaObjetivo)}</span>
                                          <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> {completadas}/{total} actividades</span>
                                        </div>
                                        {total > 0 && (
                                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                                            <div className="h-full rounded-full bg-brand-700 transition-all" style={{ width: `${avance}%` }} />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {!isLoading && total === 0 && (
          <EmptyState
            className="m-4 border-0 bg-transparent"
            icon={<FolderKanban className="h-5 w-5" />}
            title="No hay casos en este filtro"
            description="Ajuste los filtros o el término de búsqueda para ver resultados."
          />
        )}
        {isLoading && <p className="p-6 text-center text-[13px] text-ink-quiet">Cargando casos…</p>}

        {!isLoading && total > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-4 py-3">
            <p className="text-[11.5px] text-ink-quiet">
              Mostrando {pageStart + 1}-{pageEnd} de {total} casos · Total general: {counts?.todos ?? 0} · Filtro: {filtro.label}
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => goToPage(page - 1)}
                  aria-label="Página anterior"
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="min-w-[86px] text-center text-[12px] font-medium text-ink-soft">
                  Página {page} de {totalPages}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={page === totalPages}
                  onClick={() => goToPage(page + 1)}
                  aria-label="Página siguiente"
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      <NuevoReporteModal open={nuevoOpen} onClose={() => setNuevoOpen(false)} />
    </SeguridadOperativaShell>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 pl-3 pr-8 rounded-lg bg-white border border-line text-[12.5px] text-ink-soft appearance-none cursor-pointer hover:border-line-strong focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23767f79' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * "Exportar lista" siempre exportó TODO lo que matchea el filtro actual, no
 * solo la página visible — así que acá sí se pide sin `page`/`limit` (mismo
 * endpoint, mismos filtros), a propósito y solo cuando el usuario lo pide.
 */
async function fetchAllForExport(params: {
  estado?: string[];
  area?: number;
  search?: string;
  sort?: "recientes" | "prioridad" | "sla";
}): Promise<CaseListItem[]> {
  const { data } = await api.get<ApiEnvelope<CaseListItem[]>>("/cases", {
    params: {
      estado: params.estado?.length ? params.estado.join(",") : undefined,
      area: params.area,
      search: params.search,
      sort: params.sort,
    },
  });
  return data.data ?? [];
}

function exportCsv(rows: CaseRow[]) {
  const header = ["Código", "Tipo", "Título", "Reportante", "Estación", "Área", "Riesgo", "Estado", "Fecha"];
  const body = rows.map((c) => [
    c.id,
    EVENT_LABELS[c.type],
    c.title,
    c.reporter,
    c.station,
    c.area ?? "",
    c.risk ? `${c.risk} — ${c.riskCategoria ?? ""}` : "Sin evaluar",
    c.estado,
    formatDate(c.createdAt),
  ]);
  downloadCsv(`casos-sop-${sufijoFecha()}.csv`, header, body);
}
