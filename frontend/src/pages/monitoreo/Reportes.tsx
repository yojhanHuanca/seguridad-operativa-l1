import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  FileSpreadsheet,
  FileText,
  MapPin,
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
import { exportarEventosExcel } from "@/features/eventos/lib/exportExcel";
import { sufijoFecha } from "@/lib/download";
import type { EventoListItem } from "@/features/eventos/types";

const nombreUbicacion = (e: EventoListItem) => e.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre ?? "";
const nombreTipoIncidente = (e: EventoListItem) => e.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "";
const nombreRegistrador = (e: EventoListItem) => e.usuarios?.nombre ?? "";

function ordenarPor(eventos: EventoListItem[], clave: (e: EventoListItem) => string) {
  return [...eventos].sort((a, b) => clave(a).localeCompare(clave(b), "es"));
}

interface ReportePredefinido {
  id: string;
  icon: LucideIcon;
  tone: string;
  titulo: string;
  descripcion: string;
  archivo: string;
  construir: (eventos: EventoListItem[]) => EventoListItem[];
}

const REPORTES_PREDEFINIDOS: ReportePredefinido[] = [
  {
    id: "mensual",
    icon: Calendar,
    tone: "bg-info-soft text-info-ink",
    titulo: "Reporte mensual",
    descripcion: "Eventos registrados en el mes en curso.",
    archivo: "reporte_mensual",
    construir: (eventos) => {
      const hoy = new Date();
      return eventos.filter((e) => {
        const d = new Date(e.fecha);
        return d.getUTCMonth() === hoy.getUTCMonth() && d.getUTCFullYear() === hoy.getUTCFullYear();
      });
    },
  },
  {
    id: "ubicacion",
    icon: MapPin,
    tone: "bg-green-100 text-green-800",
    titulo: "Reporte por ubicación",
    descripcion: "Todos los eventos, agrupados por estación o patio.",
    archivo: "reporte_por_ubicacion",
    construir: (eventos) => ordenarPor(eventos, nombreUbicacion),
  },
  {
    id: "tendencias",
    icon: TrendingUp,
    tone: "bg-purple-100 text-purple-800",
    titulo: "Reporte de tendencias",
    descripcion: "Eventos agrupados por tipo de incidente, para detectar patrones.",
    archivo: "reporte_tendencias",
    construir: (eventos) => ordenarPor(eventos, nombreTipoIncidente),
  },
  {
    id: "criticos",
    icon: AlertTriangle,
    tone: "bg-warning-soft text-warning-ink",
    titulo: "Incidentes críticos",
    descripcion: "Eventos que aún no se cierran: Registrado o En investigación.",
    archivo: "reporte_incidentes_criticos",
    construir: (eventos) => eventos.filter((e) => e.estado !== "Cerrado"),
  },
  {
    id: "registradores",
    icon: Users,
    tone: "bg-critical-soft text-critical-ink",
    titulo: "Reporte por registrador",
    descripcion: "Todos los eventos, agrupados por quién los registró.",
    archivo: "reporte_por_registrador",
    construir: (eventos) => ordenarPor(eventos, nombreRegistrador),
  },
  {
    id: "consolidado",
    icon: Building2,
    tone: "bg-brand-50 text-brand-700",
    titulo: "Reporte consolidado",
    descripcion: "Todos los eventos registrados, sin filtrar.",
    archivo: "reporte_consolidado",
    construir: (eventos) => eventos,
  },
];

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

export function Reportes() {
  const { data: eventos, isLoading } = useEventos();
  const catalogs = useCatalogs();
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [generando, setGenerando] = useState<string | null>(null);

  const lista = eventos ?? [];
  const conteo = contarEventosPorEstado(lista);
  const tiposIncidente = catalogs.byName.get("Tipo de incidente operativo")?.catalogo_detalle ?? [];

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

  const exportar = async (id: string, eventosAExportar: EventoListItem[], archivo: string) => {
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

  return (
    <MonitoristaShell>
      <div className="space-y-5">
        <div>
          <h1 className="text-[20px] font-bold tracking-tight text-ink">Reportes</h1>
          <p className="mt-0.5 text-[12.5px] text-ink-quiet">Genere reportes en Excel a partir de los eventos registrados por Monitoreo.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<FileText className="h-5 w-5" />} label="Total de eventos" value={conteo.total} tone="bg-brand-50 text-brand-700" />
          <StatCard icon={<Clock className="h-5 w-5" />} label="Registrados" value={conteo.registrados} tone="bg-info-soft text-info-ink" />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="En investigación" value={conteo.enInvestigacion} tone="bg-warning-soft text-warning-ink" />
          <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Cerrados" value={conteo.cerrados} tone="bg-green-100 text-green-800" />
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

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-[12px] text-ink-quiet">{filtradosPersonalizado.length} eventos coinciden con estos filtros.</p>
            <Button onClick={() => exportar("personalizado", filtradosPersonalizado, "reporte_personalizado")} disabled={generando === "personalizado"}>
              <Download className="h-4 w-4" /> {generando === "personalizado" ? "Generando…" : "Generar reporte Excel"}
            </Button>
          </div>
        </Card>

        <div>
          <h2 className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-ink">
            <FileText className="h-4 w-4 text-brand-700" /> Reportes predefinidos
          </h2>

          {isLoading ? (
            <Card className="p-8 text-center text-[13px] text-ink-quiet">Cargando eventos…</Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REPORTES_PREDEFINIDOS.map((reporte) => (
                <Card key={reporte.id} hover className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${reporte.tone}`}>
                      <reporte.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13.5px] font-semibold text-ink">{reporte.titulo}</h3>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-quiet">{reporte.descripcion}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full"
                        disabled={generando === reporte.id}
                        onClick={() => exportar(reporte.id, reporte.construir(lista), reporte.archivo)}
                      >
                        <Download className="h-4 w-4" /> {generando === reporte.id ? "Generando…" : "Descargar"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="bg-surface/60 p-4">
          <div className="flex items-start gap-3">
            <FileSpreadsheet className="h-5 w-5 shrink-0 text-ink-quiet" />
            <p className="text-[12px] leading-relaxed text-ink-quiet">
              <span className="font-medium text-ink">Nota:</span> todos los reportes se generan en formato Excel (.xlsx), con el
              mismo orden de columnas que la hoja "LISTA DE EVENTOS" del cliente. Los datos se toman directamente del sistema
              de monitoreo, en tiempo real.
            </p>
          </div>
        </Card>
      </div>
    </MonitoristaShell>
  );
}
