import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, FileText, Mail, MapPin, Plus, Search, Sparkles } from "lucide-react";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EstadoPill } from "@/features/reports/components/EstadoPill";
import { useReportsPaginated, type ReportsPaginatedParams } from "@/features/reports/hooks/useReportsPaginated";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "activos", label: "Activos" },
  { id: "pendientes_info", label: "Con solicitudes" },
  { id: "cerrados", label: "Cerrados" },
] as const;

const PAGE_SIZE = 8;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

export function MyReportsPage() {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("todos");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const nuevoCodigo = params.get("nuevo");
  const codigoParam = params.get("codigo");

  // El código en la URL (venir desde "Ver detalle" de otra pantalla) cuenta
  // como búsqueda inicial, igual que si el usuario la hubiera tecleado.
  useEffect(() => {
    if (!codigoParam) return;
    const timer = window.setTimeout(() => setQuery(codigoParam), 0);
    return () => window.clearTimeout(timer);
  }, [codigoParam]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => setPage(1), 0);
    return () => window.clearTimeout(timer);
  }, [filter, debouncedQuery]);

  const { data: pageData, isLoading } = useReportsPaginated({
    filter: filter === "todos" ? undefined : filter,
    search: debouncedQuery.trim() || undefined,
    page,
    limit: PAGE_SIZE,
  } satisfies ReportsPaginatedParams);

  const reports = pageData?.items ?? [];
  const total = pageData?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + reports.length, total);

  return (
    <ReportanteShell>
      {nuevoCodigo && (
        <Card className="mb-5 border-brand-200 bg-brand-50">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-700 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-brand-900">Reporte registrado con éxito</p>
              <p className="mt-0.5 text-[13px] text-brand-800/80">
                Su caso <span className="font-mono font-semibold">{nuevoCodigo}</span> fue creado. Seguridad Operativa continuará con la evaluación.
              </p>
            </div>
            <button onClick={() => setParams({})} className="text-[12px] font-medium text-brand-700 hover:text-brand-900">
              Cerrar aviso
            </button>
          </div>
        </Card>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-ink">Mis reportes</h1>
          <p className="mt-1 text-[13px] text-ink-quiet">Consulte el estado de los casos registrados.</p>
        </div>
        <Link to="/reportes/nuevo">
          <Button size="sm">
            <Plus className="h-4 w-4" /> Nuevo reporte
          </Button>
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-line bg-white p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-8 rounded-md px-3 text-[12.5px] font-medium transition-colors",
                filter === f.id ? "bg-brand-700 text-white" : "text-ink-soft hover:bg-surface"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex h-10 min-w-[220px] max-w-sm flex-1 items-center gap-2 rounded-lg border border-line bg-white px-3">
          <Search className="h-4 w-4 shrink-0 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por código, título o descripción…"
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-ink-faint"
          />
        </div>
      </div>

      {isLoading ? (
        <Card className="mt-5 p-10 text-center text-sm text-ink-quiet">Cargando reportes…</Card>
      ) : total === 0 ? (
        <Card className="mt-5 flex flex-col items-center gap-2 border-dashed p-12 text-center">
          <FileText className="h-8 w-8 text-ink-faint" />
          <p className="text-sm font-semibold text-ink">No se encontraron reportes</p>
          <p className="text-[13px] text-ink-quiet">Pruebe con otro filtro o registre una nueva incidencia.</p>
        </Card>
      ) : (
        <>
          <div className="mt-5 space-y-3">
            {reports.map((r) => {
              const evento = r.evento_caso[0]?.eventos_operativos;
              const estacion = evento?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre;
              const tipo = evento?.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?.nombre;
              const solicitudPendiente = r.solicitudes_informacion?.find((s) => !s.respondida);
              return (
                <Card key={r.id_caso} hover className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[12.5px] font-semibold text-brand-700">{r.codigo_sop}</span>
                        {tipo && (
                          <>
                            <span className="text-[12px] text-ink-faint">·</span>
                            <span className="text-[12px] text-ink-soft">{tipo}</span>
                          </>
                        )}
                        <span className="text-[12px] text-ink-faint">·</span>
                        <span className="text-[12px] text-ink-quiet">{formatDate(r.created_at)}</span>
                      </div>
                      <p className="mt-1 text-[15px] font-semibold leading-snug text-ink">{r.titulo || r.descripcion}</p>
                      {estacion && (
                        <p className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-quiet">
                          <MapPin className="h-3.5 w-3.5" /> {estacion}
                        </p>
                      )}
                    </div>
                    <EstadoPill estado={r.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre} />
                  </div>
                  {solicitudPendiente && (
                    <div className="mt-4 rounded-lg border border-warning/25 bg-warning-soft/40 p-3.5">
                      <div className="flex items-start gap-2.5">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-warning-ink" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[12.5px] font-semibold text-warning-ink">Seguridad Operativa solicita información</p>
                          <p className="mt-0.5 line-clamp-2 break-all text-[12px] text-ink-soft">{solicitudPendiente.mensaje}</p>
                          <Link to="/reportes/notificaciones">
                            <Button variant="secondary" size="sm" className="mt-2.5">
                              Responder solicitud <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11.5px] text-ink-quiet">
              Mostrando {pageStart + 1}-{pageEnd} de {total} reportes
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Página siguiente"
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </ReportanteShell>
  );
}
