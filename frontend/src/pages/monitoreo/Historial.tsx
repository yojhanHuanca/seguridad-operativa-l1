import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, RotateCcw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import { Modal } from "@/design-system/primitives/Modal";
import { EventosTable } from "@/features/eventos/components/EventosTable";
import { AsignarEventoModal } from "@/features/eventos/components/AsignarEventoModal";
import { useEventos } from "@/features/eventos/hooks/useEventos";
import { useDeleteEvento } from "@/features/eventos/hooks/useEventoActions";
import { type EstadoEvento } from "@/features/eventos/types";
import { contarEventosPorEstado } from "@/features/eventos/lib/estado";
import { COLUMNAS_EVENTO, coincideBusqueda } from "@/features/eventos/lib/tabla";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { EventoListItem } from "@/features/eventos/types";

const POR_PAGINA = 20;

export function Historial() {
  const navigate = useNavigate();
  const { data: eventos, isLoading } = useEventos();
  const deleteEvento = useDeleteEvento();
  const [query, setQuery] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [estado, setEstado] = useState<EstadoEvento | "">("");
  const [pagina, setPagina] = useState(1);
  const [borrando, setBorrando] = useState<EventoListItem | null>(null);
  const [asignando, setAsignando] = useState<EventoListItem | null>(null);
  const lista = eventos ?? [];
  const conteo = contarEventosPorEstado(lista);

  const filtrados = useMemo(() => {
    return lista.filter((e) => {
      if (!coincideBusqueda(e, query)) return false;
      if (estado && e.estado !== estado) return false;
      const fecha = e.fecha.slice(0, 10);
      if (desde && fecha < desde) return false;
      if (hasta && fecha > hasta) return false;
      return true;
    });
  }, [lista, query, desde, hasta, estado]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);
  const hayFiltros = Boolean(query || desde || hasta || estado);
  const estadoOpciones: { id: EstadoEvento | ""; label: string; count: number }[] = [
    { id: "", label: "Todos", count: lista.length },
    { id: "Registrado", label: "Registrados", count: conteo.registrados },
    { id: "En investigación", label: "En investigación", count: conteo.enInvestigacion },
    { id: "Cerrado", label: "Cerrados", count: conteo.cerrados },
  ];

  const confirmarBorrado = () => {
    if (!borrando) return;
    deleteEvento.mutate(borrando.id_evento, {
      onSuccess: () => {
        toast.success("Evento eliminado");
        setBorrando(null);
      },
      onError: (err) => toast.error(apiErrorMessage(err, "No se pudo eliminar el evento")),
    });
  };

  const limpiarFiltros = () => {
    setQuery("");
    setDesde("");
    setHasta("");
    setEstado("");
    setPagina(1);
  };

  return (
    <MonitoristaShell>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-ink-quiet">{filtrados.length} de {lista.length} registros visibles</p>
          <div className="flex items-center gap-2">
            {hayFiltros && (
              <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
                <RotateCcw className="h-4 w-4" /> Limpiar
              </Button>
            )}
          </div>
        </div>

        <Card className="p-3">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
            <Field label="Buscar evento">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPagina(1);
                  }}
                  placeholder="Descripción, tipo o lugar..."
                  className="pl-9"
                />
              </div>
            </Field>
            <Field label="Desde">
              <Input
                type="date"
                value={desde}
                onChange={(e) => {
                  setDesde(e.target.value);
                  setPagina(1);
                }}
              />
            </Field>
            <Field label="Hasta">
              <Input
                type="date"
                value={hasta}
                onChange={(e) => {
                  setHasta(e.target.value);
                  setPagina(1);
                }}
              />
            </Field>
          </div>
          <div className="mt-3 flex min-w-0 flex-wrap gap-1 rounded-xl border border-line bg-white p-1">
            {estadoOpciones.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  setEstado(option.id);
                  setPagina(1);
                }}
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
          columns={COLUMNAS_EVENTO}
          isLoading={isLoading}
          emptyTitle="No se encontraron eventos"
          emptyDescription={hayFiltros ? "Ajusta los filtros para ampliar la búsqueda." : "Aún no hay registros de monitoreo."}
          onView={(e) => navigate(`/monitoreo/evento/${e.id_evento}`)}
          onEdit={(e) => navigate(`/monitoreo/editar/${e.id_evento}`)}
          onDelete={setBorrando}
          onAsignar={setAsignando}
        />

        {filtrados.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12px] text-ink-quiet">
              Mostrando {(paginaActual - 1) * POR_PAGINA + 1}–{Math.min(paginaActual * POR_PAGINA, filtrados.length)} de {filtrados.length} eventos
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

      <Modal
        open={!!borrando}
        onClose={() => setBorrando(null)}
        title="Eliminar evento"
        subtitle={borrando ? "Este evento se eliminará permanentemente." : undefined}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setBorrando(null)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmarBorrado} disabled={deleteEvento.isPending}>
              <Trash2 className="h-4 w-4" /> {deleteEvento.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </>
        }
      >
        <p className="text-[13px] text-ink-soft">Esta acción no se puede deshacer.</p>
      </Modal>

      <AsignarEventoModal evento={asignando} onClose={() => setAsignando(null)} />
    </MonitoristaShell>
  );
}
