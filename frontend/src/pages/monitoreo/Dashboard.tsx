import { useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, ClipboardList, FileSearch, Plus, Search, Trash2 } from "lucide-react";
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
import { COLUMNAS_EVENTO, coincideBusqueda, nombreLugar, nombreTipo } from "@/features/eventos/lib/tabla";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { EventoListItem } from "@/features/eventos/types";

const RECIENTES = 8;

function StatCard({ icon, label, value, tone, detail }: { icon: ReactNode; label: string; value: number; tone: string; detail?: string }) {
  return (
    <Card className="flex min-h-[92px] items-center gap-3.5">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
        <p className="text-[20px] font-bold text-ink">{value}</p>
        {detail && <p className="mt-0.5 truncate text-[11.5px] text-ink-quiet">{detail}</p>}
      </div>
    </Card>
  );
}

function contarPorTipo(eventos: EventoListItem[]) {
  const conteo = new Map<string, number>();
  for (const evento of eventos) {
    const key = nombreTipo(evento);
    conteo.set(key, (conteo.get(key) ?? 0) + 1);
  }
  return [...conteo.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Sin actividad";
}

function contarPorLugar(eventos: EventoListItem[]) {
  const conteo = new Map<string, number>();
  for (const evento of eventos) {
    const key = nombreLugar(evento);
    conteo.set(key, (conteo.get(key) ?? 0) + 1);
  }
  return [...conteo.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Sin actividad";
}

export function Dashboard() {
  const navigate = useNavigate();
  const { data: eventos, isLoading } = useEventos();
  const deleteEvento = useDeleteEvento();
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState<EstadoEvento | "">("");
  const [borrando, setBorrando] = useState<EventoListItem | null>(null);
  const [asignando, setAsignando] = useState<EventoListItem | null>(null);

  const lista = useMemo(() => eventos ?? [], [eventos]);
  const conteo = contarEventosPorEstado(lista);

  const filtrados = useMemo(() => {
    return lista.filter((e) => {
      if (estado && e.estado !== estado) return false;
      return coincideBusqueda(e, query);
    });
  }, [lista, query, estado]);

  const recientes = filtrados.slice(0, RECIENTES);
  const tipoPrincipal = contarPorTipo(lista);
  const lugarPrincipal = contarPorLugar(lista);
  const demorados = lista.filter((e) => Number(e.demora ?? 0) > 0).length;
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

  return (
    <MonitoristaShell>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-ink-quiet">{filtrados.length} eventos en vista</p>
          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <Link to="/monitoreo/nuevo">
              <Button size="sm">
                <Plus className="h-4 w-4" /> Registrar evento
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={<ClipboardList className="h-5 w-5" />} label="Eventos registrados" value={conteo.total} detail={tipoPrincipal} tone="bg-brand-50 text-brand-700" />
          <StatCard icon={<FileSearch className="h-5 w-5" />} label="En investigación" value={conteo.enInvestigacion} detail={lugarPrincipal} tone="bg-warning-soft text-warning-ink" />
          <StatCard icon={<AlertCircle className="h-5 w-5" />} label="Con demora" value={demorados} detail="Minutos reportados" tone="bg-critical-soft text-critical-ink" />
        </div>

        <Card className="p-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="flex-1">
              <Field label="Buscar evento">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Descripción, tipo o lugar..." className="pl-9" />
                </div>
              </Field>
            </div>
            <div className="flex min-w-0 flex-wrap gap-1 rounded-xl border border-line bg-white p-1">
              {estadoOpciones.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setEstado(option.id)}
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
          </div>
        </Card>

        <EventosTable
          eventos={recientes}
          columns={COLUMNAS_EVENTO}
          isLoading={isLoading}
          showEstado={false}
          emptyTitle="Sin eventos para esta vista"
          emptyDescription={query || estado ? "Ajusta los filtros para ampliar la búsqueda." : "Aún no hay registros de monitoreo."}
          onView={(e) => navigate(`/monitoreo/evento/${e.id_evento}`)}
          onEdit={(e) => navigate(`/monitoreo/editar/${e.id_evento}`)}
          onDelete={setBorrando}
          onAsignar={setAsignando}
        />

        {filtrados.length > RECIENTES && (
          <div className="flex items-center justify-center">
            <Link to="/monitoreo/historial">
              <Button variant="outline" size="sm">Ver todos ({filtrados.length})</Button>
            </Link>
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
