import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Search, FileSearch, Mail, MapPin, MessageCircle, CheckCircle2, Clock, Send } from "lucide-react";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EstadoPill } from "@/features/reports/components/EstadoPill";
import { EvidencePicker } from "@/features/reports/components/EvidencePicker";
import { useConsultarReporte } from "@/features/reports/hooks/useConsultarReporte";
import { useResponderInfoPublico } from "@/features/reports/hooks/useResponderInfoPublico";
import { leerReportesLocales } from "@/features/reports/lib/misReportesLocal";
import { apiErrorMessage } from "@/lib/api";

const APP_TIME_ZONE = "America/Lima";

function formatFecha(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric", timeZone: APP_TIME_ZONE });
}

/**
 * Formulario de respuesta, sin cuenta: el código SOP de la página es la única
 * llave, la misma que ya usa esta pantalla para consultar. Colapsado por
 * defecto para no abrumar a alguien que solo vino a ver el estado.
 */
function ResponderSolicitudForm({ codigo, idSolicitud }: { codigo: string; idSolicitud: number }) {
  const [abierto, setAbierto] = useState(false);
  const [respuesta, setRespuesta] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const responder = useResponderInfoPublico(codigo);

  if (!abierto) {
    return (
      <Button size="sm" className="mt-2.5" onClick={() => setAbierto(true)}>
        <Send className="h-3.5 w-3.5" /> Responder
      </Button>
    );
  }

  return (
    <div className="mt-3 space-y-3">
      <Textarea
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe la información que te pidieron…"
        rows={3}
        className="bg-white"
      />
      <EvidencePicker files={files} setFiles={setFiles} />
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          disabled={!respuesta.trim() || responder.isPending}
          onClick={() =>
            responder.mutate(
              { id_solicitud: idSolicitud, respuesta: respuesta.trim(), files },
              {
                onSuccess: () => toast.success("Tu respuesta fue enviada a Seguridad Operativa"),
                onError: (e) => toast.error(apiErrorMessage(e, "No se pudo enviar tu respuesta")),
              }
            )
          }
        >
          <Send className="h-3.5 w-3.5" /> {responder.isPending ? "Enviando..." : "Enviar respuesta"}
        </Button>
        <Button size="sm" variant="ghost" disabled={responder.isPending} onClick={() => setAbierto(false)}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

/**
 * Seguimiento sin cuenta: quien reportó sin loguearse usa el código que se le
 * mostró al enviar su reporte como única llave — sin password, igual que un
 * número de seguimiento de un envío.
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
              placeholder="Código mostrado al registrar"
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
          <Card className="mt-4 overflow-hidden p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[13px] font-semibold text-brand-700">{reporte.codigo_sop}</p>
                <h2 className="mt-1 text-[16px] font-semibold text-ink">
                  {reporte.catalogo_detalle_casos_sop_tipoTocatalogo_detalle?.nombre ?? "Reporte"}
                </h2>
              </div>
              <EstadoPill estado={reporte.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle?.nombre ?? "—"} />
            </div>

            <p className="mt-3 min-w-0 whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink-soft [overflow-wrap:anywhere]">{reporte.descripcion}</p>

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
                      <p className="mt-1 min-w-0 whitespace-pre-wrap text-[13px] text-ink [overflow-wrap:anywhere]">{solicitud.mensaje}</p>
                      {solicitud.respondida ? (
                        <div className="mt-2 rounded-lg bg-brand-50 p-2.5">
                          <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-brand-800">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Respondido {formatFecha(solicitud.fecha_respuesta)}
                          </p>
                          <p className="mt-1 min-w-0 whitespace-pre-wrap text-[13px] text-ink-soft [overflow-wrap:anywhere]">{solicitud.respuesta}</p>
                        </div>
                      ) : (
                        <div className="mt-2 rounded-lg bg-warning-soft border border-warning/25 p-3">
                          <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-warning-ink">
                            <Mail className="h-3.5 w-3.5" /> Pendiente de tu respuesta
                          </p>
                          <ResponderSolicitudForm codigo={reporte.codigo_sop} idSolicitud={solicitud.id_solicitud} />
                        </div>
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
