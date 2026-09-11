import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownWideNarrow, ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";
import { ContingenciaShell } from "@/components/layout/ContingenciaShell";
import { Button } from "@/design-system/primitives/Button";
import { Card } from "@/design-system/primitives/Card";
import { Field, Input, Select } from "@/design-system/primitives/Input";
import { ContingenciasTable } from "@/features/contingencias/components/ContingenciasTable";
import { useContingencias } from "@/features/contingencias/hooks/useContingencias";
import type { ContingenciaFiltros } from "@/features/contingencias/types";
import { apiErrorMessage } from "@/lib/api";

const PAGE_SIZE = 20;
export function Historial() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [estado, setEstado] = useState("");
  const [sortBy, setSortBy] = useState<ContingenciaFiltros["sortBy"]>("fecha");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => { setSearch(query); setPage(1); }, 350);
    return () => clearTimeout(timer);
  }, [query]);
  const { data, isPending, error, refetch } = useContingencias({ search, desde, hasta, estado, page, limit: PAGE_SIZE, sortBy, sortDir });
  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const reset = () => { setQuery(""); setSearch(""); setDesde(""); setHasta(""); setEstado(""); setPage(1); };
  const hasFilters = Boolean(query || desde || hasta || estado);
  return <ContingenciaShell>
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-ink-quiet">{total} registros{hasFilters ? " con estos filtros" : ""}</p>
        {hasFilters && <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="h-4 w-4" /> Limpiar</Button>}
      </div>

      <Card className="p-3">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr_0.8fr]">
          <Field label="Buscar evento">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Código, persona, tipo o lugar" className="pl-9" />
            </div>
          </Field>
          <Field label="Desde"><Input type="date" value={desde} max={hasta || undefined} onChange={(e) => { setDesde(e.target.value); setPage(1); }} /></Field>
          <Field label="Hasta"><Input type="date" value={hasta} min={desde || undefined} onChange={(e) => { setHasta(e.target.value); setPage(1); }} /></Field>
          <Field label="Estado"><Select value={estado} onChange={(e) => { setEstado(e.target.value); setPage(1); }}><option value="">Todos</option><option>Registrado</option><option>Revisado</option><option>Cerrado</option></Select></Field>
          <Field label="Ordenar por"><Select value={sortBy} onChange={(e) => { setSortBy(e.target.value as ContingenciaFiltros["sortBy"]); setPage(1); }}><option value="fecha">Fecha</option><option value="tipo_evento">Tipo de evento</option><option value="estado">Estado</option></Select></Field>
        </div>
        <div className="mt-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => { setSortDir(sortDir === "asc" ? "desc" : "asc"); setPage(1); }}><ArrowDownWideNarrow className="h-4 w-4" />{sortDir === "asc" ? "Ascendente" : "Descendente"}</Button>
        </div>
      </Card>

      <Card padded={false} className="overflow-hidden">
        {error ? <div role="alert" className="space-y-3 p-8 text-center"><p>{apiErrorMessage(error, "No se pudo cargar el historial.")}</p><Button variant="outline" onClick={() => refetch()}>Reintentar</Button></div> : <ContingenciasTable eventos={data?.items ?? []} isLoading={isPending} onView={(evento) => navigate("/contingencias/evento/" + evento.id_evento)} onEdit={(evento) => navigate("/contingencias/editar/" + evento.id_evento)} />}
      </Card>

      {total > 0 && <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-quiet"><p>{(page - 1) * PAGE_SIZE + 1} a {Math.min(page * PAGE_SIZE, total)} de {total}</p><div className="flex items-center gap-3"><Button variant="outline" aria-label="Página anterior" title="Página anterior" disabled={page <= 1} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button><span>Página {page} de {pages}</span><Button variant="outline" aria-label="Página siguiente" title="Página siguiente" disabled={page >= pages} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button></div></div>}
    </div>
  </ContingenciaShell>;
}
