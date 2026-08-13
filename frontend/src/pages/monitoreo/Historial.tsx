import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, Eye, FileText, Pencil, Search, Trash2 } from "lucide-react";
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
import { ESTADO_TONE } from "@/features/eventos/lib/estado";
import { COLUMNAS_EVENTO, coincideBusqueda } from "@/features/eventos/lib/tabla";
import { exportarEventosExcel } from "@/features/eventos/lib/exportExcel";
import { sufijoFecha } from "@/lib/download";
import { apiErrorMessage } from "@/lib/api";
import type { EventoListItem } from "@/features/eventos/types";

const POR_PAGINA = 20;

export function Historial() {
  const navigate = useNavigate();
  const { data: eventos, isLoading } = useEventos();
  const deleteEvento = useDeleteEvento();
  const [query, setQuery] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [estado, setEstado] = useState("");
  const [pagina, setPagina] = useState(1);
  const [exportando, setExportando] = useState(false);
  const [borrando, setBorrando] = useState<EventoListItem | null>(null);

  const filtrados = useMemo(() => {
    return (eventos ?? []).filter((e) => {
      if (!coincideBusqueda(e, query)) return false;
      if (estado && e.estado !== estado) return false;
      const fecha = e.fecha.slice(0, 10);
      if (desde && fecha < desde) return false;
      if (hasta && fecha > hasta) return false;
      return true;
    });
  }, [eventos, query, desde, hasta, estado]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  const exportar = async () => {
    setExportando(true);
    try {
      await exportarEventosExcel(filtrados, `lista_eventos_${sufijoFecha()}.xlsx`);
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[20px] font-bold tracking-tight text-ink">Historial</h1>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">Todos los eventos registrados por Monitoreo.</p>
          </div>
          <Button variant="outline" size="sm" onClick={exportar} disabled={filtrados.length === 0 || exportando}>
            <Download className="h-4 w-4" /> {exportando ? "Generando…" : "Exportar Excel"}
          </Button>
        </div>

        <Card>
          <div className="grid gap-4 sm:grid-cols-4">
            <Field label="Buscar">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPagina(1);
                  }}
                  placeholder="Descripción, tipo o código…"
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
            <Field label="Estado">
              <Select
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value);
                  setPagina(1);
                }}
              >
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
                ) : visibles.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNAS_EVENTO.length + 2} className="px-3.5 py-10 text-center text-ink-quiet">
                      <FileText className="mx-auto mb-2 h-7 w-7 text-ink-faint" />
                      No se encontraron eventos con estos filtros.
                    </td>
                  </tr>
                ) : (
                  visibles.map((e) => (
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
