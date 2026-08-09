import { Fragment, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Download, FolderKanban, Send, ChevronDown, ChevronUp, ClipboardList, CalendarDays, UserCircle, CheckCircle2 } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill, RiskPill, StagePill } from "@/design-system/primitives/Pill";
import { EmptyState } from "@/design-system/primitives/Progress";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow, type CaseRow } from "@/features/cases/adapter";
import { CASE_FILTERS, countByFilter, resolveFilter } from "@/features/cases/lib/filters";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { slaEstado, diasRestantes } from "@/features/cases/lib/sla";
import { EVENT_LABELS, TYPE_TONE } from "@/features/cases/domain";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

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

export function SoCasosPage() {
  const [params, setParams] = useSearchParams();
  const filtro = resolveFilter(params.get("filtro"));
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [sort, setSort] = useState<"recent" | "priority" | "sla">("recent");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: rawCases, isLoading } = useCases({});
  const { data: areas } = useAreas();

  const cases = useMemo(() => (rawCases ?? []).map(toCaseRow), [rawCases]);

  // Cambiar de pestaña no debe borrar lo que el usuario venía buscando.
  const setFilter = (id: string) => {
    const next = new URLSearchParams(params);
    if (id === "todos") next.delete("filtro");
    else next.set("filtro", id);
    setParams(next);
  };

  const filtered = useMemo(() => {
    let list = cases.filter(filtro.match);
    if (areaFilter) list = list.filter((c) => c.area === areaFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.station.toLowerCase().includes(q) ||
          c.reporter.toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    if (sort === "priority") {
      // Menor código de matriz = mayor severidad (1A es lo más grave).
      sorted.sort((a, b) => (a.risk ?? "zz").localeCompare(b.risk ?? "zz"));
    } else if (sort === "sla") {
      // Los casos sin SLA (aún sin evaluar) van al final.
      sorted.sort((a, b) => +new Date(a.slaDueDate ?? 8.64e15) - +new Date(b.slaDueDate ?? 8.64e15));
    } else {
      sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return sorted;
  }, [cases, filtro, areaFilter, query, sort]);

  const counts = useMemo(() => countByFilter(cases), [cases]);

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
          <Link to="/reportes/nuevo">
            <Button size="sm">
              <Send className="h-4 w-4" /> Nuevo Reporte
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => exportCsv(filtered)}>
            <Download className="h-4 w-4" /> Exportar lista
          </Button>
        </div>
      </div>

      {/* Pestañas — mismas que el menú lateral (features/cases/lib/filters.ts) */}
      <div className="mt-5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-line overflow-x-auto scrollbar-none">
          {CASE_FILTERS.map((f) => (
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
                {counts[f.id]}
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
          <table className="min-w-[1180px] w-full text-left">
            <thead>
              <tr className="bg-surface/60 border-b border-line">
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[150px]">Código</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[110px]">Tipo</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint">Título</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[115px]">Reportante</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[115px]">Estación</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Área</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[110px]">Riesgo</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[140px]">Estado</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {filtered.map((c) => {
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
                        <p className="text-[12.5px] text-ink-soft truncate">{c.area ?? "—"}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        {c.risk ? (
                          <RiskPill risk={c.risk} />
                        ) : (
                          <span className="text-[13px] text-ink-faint" title="Sin evaluar">
                            —
                          </span>
                        )}
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
                        <td colSpan={9} className="px-4 py-4">
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
                                        <p className="mt-1 line-clamp-2 text-[12.5px] font-medium leading-snug text-ink">{plan.descripcion}</p>
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

        {!isLoading && filtered.length === 0 && (
          <EmptyState
            className="m-4 border-0 bg-transparent"
            icon={<FolderKanban className="h-5 w-5" />}
            title="No hay casos en este filtro"
            description="Ajuste los filtros o el término de búsqueda para ver resultados."
          />
        )}
        {isLoading && <p className="p-6 text-center text-[13px] text-ink-quiet">Cargando casos…</p>}
      </Card>

      <p className="mt-3 text-[11.5px] text-ink-quiet">
        Mostrando {filtered.length} de {cases.length} casos · Filtro: {filtro.label}
      </p>
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
  const csv = [header, ...body]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `casos-sop-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
