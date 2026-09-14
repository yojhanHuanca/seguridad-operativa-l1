import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownWideNarrow, ChevronLeft, ChevronRight, Download, FileSpreadsheet, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";
import { ContingenciaShell } from "@/components/layout/ContingenciaShell";
import { Button } from "@/design-system/primitives/Button";
import { Card } from "@/design-system/primitives/Card";
import { Field, Input, Select } from "@/design-system/primitives/Input";
import { contingenciasApi } from "@/features/contingencias/api";
import { ContingenciasTable } from "@/features/contingencias/components/ContingenciasTable";
import { exportarContingenciasExcel } from "@/features/contingencias/lib/exportExcel";
import { useContingencias, useDeleteContingencia } from "@/features/contingencias/hooks/useContingencias";
import type { ContingenciaFiltros, ContingenciaListItem } from "@/features/contingencias/types";
import { apiErrorMessage } from "@/lib/api";
import { sufijoFecha } from "@/lib/download";

const PAGE_SIZE = 20;
export function Historial() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [sortBy, setSortBy] = useState<ContingenciaFiltros["sortBy"]>("fecha");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { setSearch(query); setPage(1); }, 350);
    return () => clearTimeout(timer);
  }, [query]);
  const { data, isPending, error, refetch } = useContingencias({ search, desde, hasta, page, limit: PAGE_SIZE, sortBy, sortDir });
  const deleteContingencia = useDeleteContingencia();
  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const reset = () => { setQuery(""); setSearch(""); setDesde(""); setHasta(""); setPage(1); };
  const hasFilters = Boolean(query || desde || hasta);

  const handleDelete = (evento: ContingenciaListItem) => {
    const ok = window.confirm(`¿Eliminar este registro? Esta acción no se puede deshacer.`);
    if (!ok) return;

    deleteContingencia.mutate(evento.id_evento, {
      onSuccess: () => toast.success(`Registro eliminado`),
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo eliminar el registro")),
    });
  };

  const exportExcel = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const firstPage = await contingenciasApi.list({ search, desde, hasta, page: 1, limit: 100, sortBy, sortDir });
      const all = [...firstPage.items];
      const totalPages = Math.ceil(firstPage.total / 100);
      for (let nextPage = 2; nextPage <= totalPages; nextPage += 1) {
        const result = await contingenciasApi.list({ search, desde, hasta, page: nextPage, limit: 100, sortBy, sortDir });
        all.push(...result.items);
      }
      await exportarContingenciasExcel(all, `historial-contingencias-${sufijoFecha()}.xlsx`);
      toast.success("Excel de contingencias descargado");
    } catch (e) {
      toast.error(apiErrorMessage(e, "No se pudo generar el Excel"));
    } finally {
      setIsExporting(false);
    }
  };

  return <ContingenciaShell>
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-ink-quiet">{total} registros{hasFilters ? " con estos filtros" : ""}</p>
        <div className="flex flex-wrap items-center gap-2">
          {hasFilters && <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="h-4 w-4" /> Limpiar</Button>}
        </div>
      </div>

      <Card className="overflow-hidden border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50/50 p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-700 text-white shadow-[0_12px_28px_-18px_rgba(15,107,62,0.9)]">
              <FileSpreadsheet className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">Exportar historial en Excel</p>
              <p className="mt-1 text-[12.5px] text-ink-quiet">
                Descarga un archivo .xlsx con formato profesional, encabezado Línea 1 y el orden del Excel base.
              </p>
              <p className="mt-2 font-mono text-[12px] font-semibold text-brand-700">
                {total} registro{total === 1 ? "" : "s"} {hasFilters ? "filtrado" : "disponible"}{total === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            onClick={exportExcel}
            disabled={isExporting || isPending || total === 0}
            className="w-full shadow-[0_16px_32px_-22px_rgba(15,107,62,0.9)] sm:w-auto"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Generando Excel..." : "Descargar Excel"}
          </Button>
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr]">
          <Field label="Buscar evento">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="N°, persona, tipo o lugar" className="pl-9" />
            </div>
          </Field>
          <Field label="Desde"><Input type="date" value={desde} max={hasta || undefined} onChange={(e) => { setDesde(e.target.value); setPage(1); }} /></Field>
          <Field label="Hasta"><Input type="date" value={hasta} min={desde || undefined} onChange={(e) => { setHasta(e.target.value); setPage(1); }} /></Field>
          <Field label="Ordenar por"><Select value={sortBy} onChange={(e) => { setSortBy(e.target.value as ContingenciaFiltros["sortBy"]); setPage(1); }}><option value="fecha">Fecha</option><option value="tipo_evento">Tipo de evento</option></Select></Field>
        </div>
        <div className="mt-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => { setSortDir(sortDir === "asc" ? "desc" : "asc"); setPage(1); }}><ArrowDownWideNarrow className="h-4 w-4" />{sortDir === "asc" ? "Ascendente" : "Descendente"}</Button>
        </div>
      </Card>

      <Card padded={false} className="overflow-hidden">
        {error ? <div role="alert" className="space-y-3 p-8 text-center"><p>{apiErrorMessage(error, "No se pudo cargar el historial.")}</p><Button variant="outline" onClick={() => refetch()}>Reintentar</Button></div> : <ContingenciasTable eventos={data?.items ?? []} isLoading={isPending} isDeleting={deleteContingencia.isPending} onView={(evento) => navigate("/contingencias/evento/" + evento.id_evento)} onEdit={(evento) => navigate("/contingencias/editar/" + evento.id_evento)} onDelete={handleDelete} startIndex={(page - 1) * PAGE_SIZE} />}
      </Card>

      {total > 0 && <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-quiet"><p>{(page - 1) * PAGE_SIZE + 1} a {Math.min(page * PAGE_SIZE, total)} de {total}</p><div className="flex items-center gap-3"><Button variant="outline" aria-label="Página anterior" title="Página anterior" disabled={page <= 1} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button><span>Página {page} de {pages}</span><Button variant="outline" aria-label="Página siguiente" title="Página siguiente" disabled={page >= pages} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button></div></div>}
    </div>
  </ContingenciaShell>;
}


