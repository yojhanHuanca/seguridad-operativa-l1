import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import { EventosTable } from "@/features/eventos/components/EventosTable";
import { useEventosPaginated } from "@/features/eventos/hooks/useEventosPaginated";
import { useEventoCounts } from "@/features/eventos/hooks/useEventoCounts";
import { COLUMNAS_EVENTO_RESUMEN } from "@/features/eventos/lib/tabla";
import { type EstadoEvento } from "@/features/eventos/types";
import { cn } from "@/lib/utils";

const POR_PAGINA = 20;

/**
 * Solo lectura: el analista de SO consulta el registro cronológico de eventos
 * operativos de Línea 1, independiente de sus casos SOP abiertos. Crear,
 * editar, asignar o eliminar sigue siendo exclusivo del panel de Monitoreo —
 * esta pantalla no repite esos botones.
 */
export function SoEventosPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [estado, setEstado] = useState<EstadoEvento | "">("");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setPagina(1);
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const { data: counts } = useEventoCounts();
  const { data: pageData, isLoading } = useEventosPaginated({
    estado: estado || undefined,
    search: debouncedQuery.trim() || undefined,
    desde: desde || undefined,
    hasta: hasta || undefined,
    page: pagina,
    limit: POR_PAGINA,
  });

  const visibles = pageData?.items ?? [];
  const total = pageData?.total ?? 0;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const hayFiltros = Boolean(query || desde || hasta || estado);

  const estadoOpciones: { id: EstadoEvento | ""; label: string; count: number }[] = useMemo(
    () => [
      { id: "", label: "Todos", count: counts?.total ?? 0 },
      { id: "Registrado", label: "Registrados", count: counts?.registrados ?? 0 },
      { id: "En investigación", label: "En investigación", count: counts?.enInvestigacion ?? 0 },
      { id: "Cerrado", label: "Cerrados", count: counts?.cerrados ?? 0 },
    ],
    [counts]
  );

  const limpiarFiltros = () => {
    setQuery("");
    setDesde("");
    setHasta("");
    setEstado("");
    setPagina(1);
  };

  return (
    <SeguridadOperativaShell>
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[12px] font-medium text-brand-800">
          Registro operativo
        </div>
        <h1 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-ink">Eventos operativos</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] text-ink-quiet">
          Registro cronológico de eventos de Línea 1 relevados por Monitoreo, independiente de los casos SOP abiertos.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-ink-quiet">{total} registros{hayFiltros ? " con estos filtros" : ""}</p>
          {hayFiltros && (
            <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
              <RotateCcw className="h-4 w-4" /> Limpiar
            </Button>
          )}
        </div>

        <Card className="p-3">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
            <Field label="Buscar evento">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Descripción, tipo o lugar..." className="pl-9" />
              </div>
            </Field>
            <Field label="Desde">
              <Input value={desde} onChange={(e) => { setDesde(e.target.value); setPagina(1); }} type="date" />
            </Field>
            <Field label="Hasta">
              <Input value={hasta} onChange={(e) => { setHasta(e.target.value); setPagina(1); }} type="date" />
            </Field>
          </div>
          <div className="mt-3 flex min-w-0 flex-wrap gap-1 rounded-xl border border-line bg-white p-1">
            {estadoOpciones.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => { setEstado(option.id); setPagina(1); }}
                className={cn(
                  "flex h-8 items-center gap-2 rounded-lg px-2.5 text-[12px] font-medium transition-colors",
                  estado === option.id ? "bg-brand-700 text-white shadow-sm" : "text-ink-soft hover:bg-surface"
                )}
              >
                <span>{option.label}</span>
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10.5px]", estado === option.id ? "bg-white/20 text-white" : "bg-surface-2 text-ink-quiet")}>{option.count}</span>
              </button>
            ))}
          </div>
        </Card>

        <EventosTable
          eventos={visibles}
          columns={COLUMNAS_EVENTO_RESUMEN}
          isLoading={isLoading}
          emptyTitle="No se encontraron eventos"
          emptyDescription={hayFiltros ? "Ajusta los filtros para ampliar la búsqueda." : "Aún no hay registros de monitoreo."}
          onView={(e) => navigate(`/monitoreo/evento/${e.id_evento}`)}
        />

        {total > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12px] text-ink-quiet">
              Mostrando {(paginaActual - 1) * POR_PAGINA + 1}–{Math.min(paginaActual * POR_PAGINA, total)} de {total} eventos
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={paginaActual === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-[12px] text-ink-quiet">Página {paginaActual} de {totalPaginas}</span>
              <Button variant="outline" size="sm" onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </SeguridadOperativaShell>
  );
}
