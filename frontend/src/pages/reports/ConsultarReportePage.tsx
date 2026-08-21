import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, FileSearch, Mail, MapPin, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EstadoPill } from "@/features/reports/components/EstadoPill";
import { useConsultarReporte } from "@/features/reports/hooks/useConsultarReporte";
import { leerReportesLocales } from "@/features/reports/lib/misReportesLocal";
import { apiErrorMessage } from "@/lib/api";

function formatFecha(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Seguimiento sin cuenta: quien reportó sin loguearse usa el código que se le
 * mostró al enviar su reporte (ej. SOP-15-2026) como única llave — sin
 * password, igual que un número de seguimiento de un envío.
 */
export function ConsultarReportePage() {
  const [params] = useSearchParams();
  const [input, setInput] = useState(params.get("codigo") ?? "");
  const [buscado, setBuscado] = useState<string | null>(params.get("codigo"));
  const [guardados] = useState(() => leerReportesLocales());

  const { data: reporte, isLoading, isError, error } = useConsultarReporte(buscado);

  const buscar = (codigoDirecto?: string) => {
    const codigo = (codigoDirecto ?? input).trim();
    if (!codigo) return;
    setInput(codigo);
    setBuscado(codigo);
  };

  const lugar = reporte?.evento_caso?.[0]?.eventos_operativos?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre;

  return (
    <ReportanteShell>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <FileSearch className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-[22px] font-bold tracking-tight text-ink">Consultar mi reporte</h1>
          <p className="mt-1.5 text-[13.5px] text-ink-quiet">
            Ingresa el código que se te mostró al enviar tu reporte — no necesitas cuenta ni contraseña.
          </p>
        </div>

        <Card className="p-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscar()}
              placeholder="Ej. SOP-15-2026"
              className="flex-1 font-mono uppercase"
            />
            <Button onClick={() => buscar()} disabled={!input.trim() || isLoading}>
              <Search className="h-4 w-4" /> {isLoading ? "Buscando..." : "Consultar"}
            </Button>
          </div>
        </Card>

        {guardados.length > 0 && (
          <Card className="mt-4 p-4">
            <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
              <Clock className="h-3.5 w-3.5" /> Reportes hechos desde este dispositivo
            </p>
            <div className="flex flex-wrap gap-2">
              {guardados.map((r) => (
                <button
                  key={r.codigo}
                  type="button"
                  onClick={() => buscar(r.codigo)}
                  className="rounded-lg border border-line bg-surface/50 px-3 py-1.5 font-mono text-[12.5px] font-medium text-ink-soft transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                >
                  {r.codigo}
                </button>
              ))}
            </div>
            <p className="mt-2.5 text-[11px] text-ink-faint">
              Esta lista solo vive en este navegador — si cambias de dispositivo, usa el código directamente.
            </p>
          </Card>
        )}

        {isError && (
          <Card className="mt-4 border-critical/25 bg-critical-soft p-4 text-[13px] text-critical-ink">
            {apiErrorMessage(error, "No se encontró ningún reporte con ese código")}
          </Card>
        )}

        {reporte && (
          <Card className="mt-4 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[13px] font-semibold text-brand-700">{reporte.codigo_sop}</p>
                <h2 className="mt-1 text-[16px] font-semibold text-ink">
                  {reporte.catalogo_detalle_casos_sop_tipoTocatalogo_detalle?.nombre ?? "Reporte"}
                </h2>
              </div>
              <EstadoPill estado={reporte.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?.nombre ?? "—"} />
            </div>

            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{reporte.descripcion}</p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-ink-quiet">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {lugar ?? reporte.areas?.nombre_area ?? "Sin ubicación"}
              </span>
              <span>Registrado: {formatFecha(reporte.created_at)}</span>
            </div>

            {reporte.solicitudes_informacion.length > 0 && (
              <div className="mt-5 border-t border-line-soft pt-4">
                <p className="mb-2.5 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
                  <MessageCircle className="h-4 w-4" /> Comunicación con Seguridad Operativa
                </p>
                <div className="space-y-3">
                  {reporte.solicitudes_informacion.map((solicitud) => (
                    <div key={solicitud.id_solicitud} className="rounded-lg border border-line bg-surface/50 p-3">
                      <p className="text-[11.5px] text-ink-quiet">{formatFecha(solicitud.fecha_solicitud)} · Seguridad Operativa pidió información</p>
                      <p className="mt-1 text-[13px] text-ink">{solicitud.mensaje}</p>
                      {solicitud.respondida ? (
                        <div className="mt-2 rounded-lg bg-brand-50 p-2.5">
                          <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-brand-800">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Respondido {formatFecha(solicitud.fecha_respuesta)}
                          </p>
                          <p className="mt-1 text-[13px] text-ink-soft">{solicitud.respuesta}</p>
                        </div>
                      ) : (
                        <p className="mt-2 flex items-center gap-1.5 text-[11.5px] font-medium text-warning-ink">
                          <Mail className="h-3.5 w-3.5" /> Pendiente de tu respuesta — contacta a Seguridad Operativa con tu código a la mano.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </ReportanteShell>
  );
}
