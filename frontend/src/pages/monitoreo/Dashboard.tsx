import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2, ClipboardList, Download, Eye, FileSearch, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input, Select } from "@/design-system/primitives/Input";
import { Pill } from "@/design-system/primitives/Pill";
import { Modal } from "@/design-system/primitives/Modal";
import { useEventos } from "@/features/eventos/hooks/useEventos";
import { useDeleteEvento } from "@/features/eventos/hooks/useEventoActions";
import { ESTADOS_EVENTO } from "@/features/eventos/types";
import { ESTADO_TONE, contarEventosPorEstado } from "@/features/eventos/lib/estado";
import { COLUMNAS_EVENTO, coincideBusqueda } from "@/features/eventos/lib/tabla";
import { exportarEventosExcel } from "@/features/eventos/lib/exportExcel";
import { sufijoFecha } from "@/lib/download";
import { apiErrorMessage } from "@/lib/api";
import type { EventoListItem } from "@/features/eventos/types";

const RECIENTES = 8;

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: string }) {
  return (
    <Card className="flex items-center gap-3.5">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
        <p className="text-[20px] font-bold text-ink">{value}</p>
      </div>
    </Card>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { data: eventos, isLoading } = useEventos();
  const deleteEvento = useDeleteEvento();
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("");
  const [borrando, setBorrando] = useState<EventoListItem | null>(null);
  const [exportando, setExportando] = useState(false);

  const lista = eventos ?? [];
  const conteo = contarEventosPorEstado(lista);

  const filtrados = useMemo(() => {
    return lista.filter((e) => {
      if (estado && e.estado !== estado) return false;
      return coincideBusqueda(e, query);
    });
  }, [lista, query, estado]);

  const recientes = filtrados.slice(0, RECIENTES);

  const exportar = async () => {
    setExportando(true);
    try {
      await exportarEventosExcel(filtrados, `eventos_monitoreo_${sufijoFecha()}.xlsx`);
    } catch {
      toast.error("No se pudo generar el Excel");
    } finally {
      setExportando(false);
    }
  };

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
        <div className="flex flex-wrap items-center justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={exportar} disabled={filtrados.length === 0 || exportando}>
            <Download className="h-4 w-4" /> {exportando ? "Generando…" : "Exportar Excel"}
          </Button>
          <Link to="/monitoreo/nuevo">
            <Button size="sm">
              <Plus className="h-4 w-4" /> Registrar Evento
            </Button>
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<ClipboardList className="h-5 w-5" />} label="Eventos registrados" value={conteo.total} tone="bg-brand-50 text-brand-700" />
          <StatCard icon={<AlertCircle className="h-5 w-5" />} label="Registrados (pendientes)" value={conteo.registrados} tone="bg-info-soft text-info-ink" />
          <StatCard icon={<FileSearch className="h-5 w-5" />} label="En investigación" value={conteo.enInvestigacion} tone="bg-warning-soft text-warning-ink" />
          <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Cerrados" value={conteo.cerrados} tone="bg-green-100 text-green-800" />
        </div>

        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Buscar">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Descripción, tipo o código…" className="pl-9" />
              </div>
            </Field>
            <Field label="Estado">
              <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="">Todos los estados</option>
                {ESTADOS_EVENTO.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </Select>
            </Field>
          </div>
        </Card>

        <Card padded={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-line bg-surface text-[10.5px] uppercase tracking-wide text-ink-quiet">
                  {COLUMNAS_EVENTO.map((col) => (
                    <th key={col.header} className="whitespace-nowrap px-3 py-2.5 font-semibold">{col.header}</th>
                  ))}
                  <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Estado</th>
                  <th className="whitespace-nowrap px-3 py-2.5 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={COLUMNAS_EVENTO.length + 2} className="px-3.5 py-8 text-center text-ink-quiet">Cargando eventos…</td>
                  </tr>
                ) : recientes.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNAS_EVENTO.length + 2} className="px-3.5 py-10 text-center text-ink-quiet">Sin eventos registrados todavía.</td>
                  </tr>
                ) : (
                  recientes.map((e) => (
                    <tr key={e.id_evento} className="border-b border-line-soft last:border-0 hover:bg-surface">
                      {COLUMNAS_EVENTO.map((col) => (
                        <td
                          key={col.header}
                          className={col.nowrap ? "whitespace-nowrap px-3 py-2.5 text-ink-soft" : "max-w-[220px] truncate px-3 py-2.5 text-ink-soft"}
                          title={col.nowrap ? undefined : String(col.render(e) ?? "")}
                        >
                          {col.render(e)}
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-3 py-2.5">
                        <Pill tone={ESTADO_TONE[e.estado]} dot>{e.estado}</Pill>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5">
                        <div className="flex items-center justify-end gap-1">
                          <button type="button" onClick={() => navigate(`/monitoreo/evento/${e.id_evento}`)} className="grid h-7 w-7 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink" aria-label="Ver">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => navigate(`/monitoreo/editar/${e.id_evento}`)} className="grid h-7 w-7 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink" aria-label="Editar">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => setBorrando(e)} className="grid h-7 w-7 place-items-center rounded-lg text-critical-ink transition-colors hover:bg-critical-soft" aria-label="Eliminar">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {filtrados.length > RECIENTES && (
          <div className="flex justify-center">
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
        subtitle={borrando ? `${borrando.codigo_evento ?? "Este evento"} se eliminará permanentemente.` : undefined}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setBorrando(null)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmarBorrado} disabled={deleteEvento.isPending}>
              <Trash2 className="h-4 w-4" /> {deleteEvento.isPending ? "Eliminando…" : "Eliminar"}
            </Button>
          </>
        }
      >
        <p className="text-[13px] text-ink-soft">Esta acción no se puede deshacer.</p>
      </Modal>
    </MonitoristaShell>
  );
}
