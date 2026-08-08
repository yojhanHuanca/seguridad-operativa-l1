import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, Clock, CheckCircle2, FileText, Mail, MapPin, Plus } from "lucide-react";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { WelcomeBanner } from "@/components/layout/WelcomeBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EstadoPill } from "@/features/reports/components/EstadoPill";
import { useReports } from "@/features/reports/hooks/useReports";
import { cn } from "@/lib/utils";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.round(diffMs / 60000);
  if (min < 1) return "hace instantes";
  if (min < 60) return `hace ${min} min`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `hace ${hr} h`;
  return `hace ${Math.round(hr / 24)} d`;
}

export function ReportanteHomePage() {
  const { data: reports, isLoading } = useReports();

  const total = reports?.length ?? 0;
  const activos = reports?.filter((r) => r.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre !== "Cerrado").length ?? 0;
  const cerrados = reports?.filter((r) => r.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre === "Cerrado").length ?? 0;
  const solicitudesPendientes = reports?.filter((r) => r.solicitudes_informacion?.some((s) => !s.respondida)).length ?? 0;

  const stats = [
    { label: "Reportes registrados", value: total, icon: FileText, tone: "brand" as const },
    { label: "En seguimiento", value: activos, icon: Clock, tone: "warning" as const },
    { label: "Cerrados", value: cerrados, icon: CheckCircle2, tone: "neutral" as const },
    { label: "Solicitudes pendientes", value: solicitudesPendientes, icon: Mail, tone: "info" as const },
  ];

  return (
    <ReportanteShell>
      <WelcomeBanner
        photoSrc="/tren-linea1.png"
        greeting="Portal del Trabajador"
        subtitle="Registre una nueva incidencia o siga el estado de los reportes. Su aporte mantiene la operación segura."
        meta={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11.5px] font-medium text-white">
            {activos} reporte(s) en seguimiento
          </span>
        }
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="relative overflow-hidden border-0 bg-brand-gradient p-6 text-white lg:col-span-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Acción rápida</p>
          <h3 className="mt-2 text-[20px] font-bold leading-tight">¿Detectó una situación de riesgo?</h3>
          <p className="mt-2 text-[13px] text-white/80">Registre un nuevo reporte en minutos con el asistente guiado.</p>
          <Link to="/reportes/nuevo" className="mt-5 inline-block">
            <span className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-[13px] font-semibold text-brand-800 transition-colors hover:bg-white/90">
              <Plus className="h-4 w-4" /> Registrar reporte
            </span>
          </Link>
        </Card>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {stats.map((s) => (
            <Card key={s.label} className="flex items-center gap-4 p-5">
              <div
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                  s.tone === "brand" && "bg-brand-50 text-brand-700",
                  s.tone === "neutral" && "bg-secondary text-ink-soft",
                  s.tone === "warning" && "bg-warning-soft text-warning-ink",
                  s.tone === "info" && "bg-info-soft text-info-ink"
                )}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[26px] font-bold leading-none tabular-nums text-ink">{isLoading ? "…" : s.value}</p>
                <p className="mt-1 text-[12px] text-ink-quiet">{s.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {solicitudesPendientes > 0 && (
        <Card className="mt-5 border-warning/25 bg-warning-soft/40 p-5">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-warning/15 text-warning-ink">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-ink">Seguridad Operativa solicita información</p>
              <p className="mt-0.5 text-[12.5px] text-ink-soft">
                Responda las solicitudes pendientes para que sus reportes continúen el flujo de evaluación.
              </p>
              <Link to="/reportes/notificaciones">
                <Button variant="secondary" size="sm" className="mt-3">
                  Responder solicitudes <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold tracking-tight text-ink">Reportes recientes</h2>
          <p className="mt-0.5 text-[12.5px] text-ink-quiet">Estado actual de los últimos casos registrados</p>
        </div>
        <Link to="/reportes/mis-reportes">
          <Button variant="outline" size="sm">
            Ver todos <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <Card className="mt-4 p-10 text-center text-sm text-ink-quiet">Cargando reportes…</Card>
      ) : total === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-3 border-dashed p-12 text-center">
          <FileText className="h-8 w-8 text-ink-faint" />
          <p className="text-sm font-semibold text-ink">Aún no hay reportes registrados</p>
          <p className="text-[13px] text-ink-quiet">Cuando registre una incidencia, aparecerá aquí con su código de caso y estado.</p>
          <Link to="/reportes/nuevo">
            <Button size="sm">
              <Plus className="h-4 w-4" /> Registrar mi primer reporte
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="mt-4 space-y-3">
          {reports!.slice(0, 5).map((r) => {
            const evento = r.evento_caso[0]?.eventos_operativos;
            const estacion = evento?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre;
            const tipo = evento?.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?.nombre;
            return (
              <Card key={r.id_caso} hover className="flex items-center gap-4 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[12px] font-semibold text-brand-700">{r.codigo_sop}</span>
                    {tipo && (
                      <>
                        <span className="text-[12px] text-ink-faint">·</span>
                        <span className="text-[12px] text-ink-soft">{tipo}</span>
                      </>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[13.5px] font-semibold text-ink">{r.titulo || r.descripcion}</p>
                  {estacion && (
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-ink-quiet">
                      <MapPin className="h-3 w-3" /> {estacion} · {timeAgo(r.created_at)}
                    </p>
                  )}
                </div>
                <EstadoPill estado={r.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre} />
              </Card>
            );
          })}
        </div>
      )}
    </ReportanteShell>
  );
}
