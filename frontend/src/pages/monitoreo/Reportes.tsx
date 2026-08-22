import { useMemo, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  Download,
  Filter,
  FileSpreadsheet,
  FileText,
  MapPin,
  RotateCcw,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input, Select } from "@/design-system/primitives/Input";
import { useEventos } from "@/features/eventos/hooks/useEventos";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { ESTADOS_EVENTO } from "@/features/eventos/types";
import { contarEventosPorEstado } from "@/features/eventos/lib/estado";
import { exportarEventosExcel, exportarResumenExcel, type ResumenExcelRow } from "@/features/eventos/lib/exportExcel";
import { sufijoFecha } from "@/lib/download";
import type { EventoListItem } from "@/features/eventos/types";

const nombreUbicacion = (e: EventoListItem) => e.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre ?? "Sin ubicación";
const nombreTipoIncidente = (e: EventoListItem) => e.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "Sin tipo";
const nombreRegistrador = (e: EventoListItem) => e.usuarios_eventos_monitoreo_usuario_registraTousuarios?.nombre ?? "Sin registrador";

function resumenPor(eventos: EventoListItem[], clave: (e: EventoListItem) => string): ResumenExcelRow[] {
  const total = eventos.length;
  const conteo = new Map<string, number>();

  for (const evento of eventos) {
    const etiqueta = clave(evento).trim() || "Sin dato";
    conteo.set(etiqueta, (conteo.get(etiqueta) ?? 0) + 1);
  }

  return [...conteo.entries()]
    .map(([etiqueta, cantidad]) => ({
      etiqueta,
      cantidad,
      porcentaje: total > 0 ? cantidad / total : 0,
    }))
    .sort((a, b) => b.cantidad - a.cantidad || a.etiqueta.localeCompare(b.etiqueta, "es"));
}

interface ReporteBase {
  id: string;
  icon: LucideIcon;
  tone: string;
  titulo: string;
  descripcion: string;
  archivo: string;
}

interface ReporteResumen extends ReporteBase {
  tipo: "resumen";
  etiquetaHeader: string;
  construir: (eventos: EventoListItem[]) => ResumenExcelRow[];
}

type ReportePredefinido = ReporteResumen;

const REPORTES_PREDEFINIDOS: ReportePredefinido[] = [
  {
    id: "ubicacion",
    tipo: "resumen",
    icon: MapPin,
    tone: "bg-green-100 text-green-800",
    titulo: "Reporte por ubicación",
    descripcion: "Resumen de cantidad y porcentaje por estación o patio.",
    archivo: "reporte_por_ubicacion",
    etiquetaHeader: "Ubicación",
    construir: (eventos) => resumenPor(eventos, nombreUbicacion),
  },
  {
    id: "tendencias",
    tipo: "resumen",
    icon: TrendingUp,
    tone: "bg-purple-100 text-purple-800",
    titulo: "Reporte de tendencias",
    descripcion: "Resumen de cantidad y porcentaje por tipo de incidente.",
    archivo: "reporte_tendencias",
    etiquetaHeader: "Tipo de incidente",
    construir: (eventos) => resumenPor(eventos, nombreTipoIncidente),
  },
  {
    id: "registradores",
    tipo: "resumen",
    icon: Users,
    tone: "bg-critical-soft text-critical-ink",
    titulo: "Reporte por registrador",
    descripcion: "Resumen de cantidad y porcentaje por usuario registrador.",
    archivo: "reporte_por_registrador",
    etiquetaHeader: "Registrador",
    construir: (eventos) => resumenPor(eventos, nombreRegistrador),
  },
];

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

export function Reportes() {
  const { data: eventos, isLoading } = useEventos();
  const catalogs = useCatalogs();
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [generando, setGenerando] = useState<string | null>(null);

  const lista = useMemo(() => eventos ?? [], [eventos]);
  const conteo = contarEventosPorEstado(lista);
  const tiposIncidente = catalogs.byName.get("Tipo de incidente operativo")?.catalogo_detalle ?? [];
  const hayFiltros = Boolean(desde || hasta || tipoFiltro || estadoFiltro);

  const filtradosPersonalizado = useMemo(() => {
    return lista.filter((e) => {
      if (estadoFiltro && e.estado !== estadoFiltro) return false;
      if (tipoFiltro && String(e.tipo_incidente) !== tipoFiltro) return false;
      const fecha = e.fecha.slice(0, 10);
      if (desde && fecha < desde) return false;
      if (hasta && fecha > hasta) return false;
      return true;
    });
  }, [lista, estadoFiltro, tipoFiltro, desde, hasta]);

  const exportarEventos = async (id: string, eventosAExportar: EventoListItem[], archivo: string) => {
    if (eventosAExportar.length === 0) {
      toast.error("No hay eventos que coincidan con este reporte");
      return;
    }
    setGenerando(id);
    try {
      await exportarEventosExcel(eventosAExportar, `${archivo}_${sufijoFecha()}.xlsx`);
    } catch {
      toast.error("No se pudo generar el reporte");
    } finally {
      setGenerando(null);
    }
  };

  const exportarResumen = async (id: string, rows: ResumenExcelRow[], archivo: string, etiquetaHeader: string) => {
    if (rows.length === 0) {
      toast.error("No hay eventos que coincidan con este reporte");
      return;
    }
    setGenerando(id);
    try {
      await exportarResumenExcel(rows, `${archivo}_${sufijoFecha()}.xlsx`, etiquetaHeader);
    } catch {
      toast.error("No se pudo generar el reporte");
    } finally {
      setGenerando(null);
    }
  };

  const limpiarFiltros = () => {
    setDesde("");
    setHasta("");
    setTipoFiltro("");
    setEstadoFiltro("");
  };

  return (
    <MonitoristaShell>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-ink-quiet">{lista.length} eventos disponibles · {filtradosPersonalizado.length} en el reporte personalizado</p>
          {hayFiltros && (
            <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
              <RotateCcw className="h-4 w-4" /> Limpiar filtros
            </Button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={<FileText className="h-5 w-5" />} label="Total de eventos" value={conteo.total} detail="Base completa" tone="bg-brand-50 text-brand-700" />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="En investigación" value={conteo.enInvestigacion} detail="En curso" tone="bg-warning-soft text-warning-ink" />
          <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Cerrados" value={conteo.cerrados} detail="Finalizados" tone="bg-green-100 text-green-800" />
        </div>

        <Card>
          <CardHeader
            icon={<Filter className="h-4.5 w-4.5" />}
            title="Generador de reportes personalizado"
            subtitle="Filtre los eventos y genere un reporte a la medida."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Fecha desde">
              <Input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
            </Field>
            <Field label="Fecha hasta">
              <Input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
            </Field>
            <Field label="Tipo de incidente">
              <Select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)} disabled={catalogs.isLoading}>
                <option value="">Todos los tipos</option>
                {tiposIncidente.map((item) => (
                  <option key={item.id_detalle} value={item.id_detalle}>{item.nombre}</option>
                ))}
              </Select>
            </Field>
            <Field label="Estado">
              <Select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
                <option value="">Todos los estados</option>
                {ESTADOS_EVENTO.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
            <p className="text-[12px] text-ink-quiet">{filtradosPersonalizado.length} eventos coinciden con estos filtros.</p>
            <Button onClick={() => exportarEventos("personalizado", filtradosPersonalizado, "reporte_personalizado")} disabled={generando === "personalizado"}>
              <Download className="h-4 w-4" /> {generando === "personalizado" ? "Generando..." : "Generar reporte Excel"}
            </Button>
          </div>
        </Card>

        <div>
          <h2 className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-ink">
            <FileText className="h-4 w-4 text-brand-700" /> Reportes predefinidos
          </h2>

          {isLoading ? (
            <Card className="p-8 text-center text-[13px] text-ink-quiet">Cargando eventos...</Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REPORTES_PREDEFINIDOS.map((reporte) => {
                const rows = reporte.construir(lista);
                const total = rows.reduce((sum, row) => sum + row.cantidad, 0);
                const meta = {
                  total,
                  totalLabel: `${rows.length} grupos · ${total} eventos`,
                  onDownload: () => exportarResumen(reporte.id, rows, reporte.archivo, reporte.etiquetaHeader),
                };
                return (
                  <Card key={reporte.id} hover className="p-5">
                    <div className="flex items-start gap-3.5">
                      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${reporte.tone}`}>
                        <reporte.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13.5px] font-semibold text-ink">{reporte.titulo}</h3>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-ink-quiet">{reporte.descripcion}</p>
                        <p className="mt-2 font-mono text-[12px] font-semibold text-brand-700">{meta.totalLabel}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          disabled={generando === reporte.id || meta.total === 0}
                          onClick={meta.onDownload}
                        >
                          <Download className="h-4 w-4" /> {generando === reporte.id ? "Generando..." : "Descargar"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <Card className="bg-surface/60 p-4">
          <div className="flex items-start gap-3">
            <FileSpreadsheet className="h-5 w-5 shrink-0 text-ink-quiet" />
            <p className="text-[12px] leading-relaxed text-ink-quiet">
              <span className="font-medium text-ink">Nota:</span> todos los reportes se generan en formato Excel (.xlsx), con el
              generador personalizado en formato listado y los reportes predefinidos como hojas resumen. Los datos se toman
              directamente del sistema de monitoreo, en tiempo real.
            </p>
          </div>
        </Card>
      </div>
    </MonitoristaShell>
  );
}
