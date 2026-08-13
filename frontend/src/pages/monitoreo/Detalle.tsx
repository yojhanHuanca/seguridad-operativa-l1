import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { formatDate, formatTime } from "@/lib/format";
import { useEvento } from "@/features/eventos/hooks/useEventos";
import { ESTADO_TONE } from "@/features/eventos/lib/estado";

function Dato({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div>
      <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[13px] text-ink">{value || value === 0 ? value : "—"}</p>
    </div>
  );
}

/**
 * Vista previa del evento como página completa (no modal): grilla compacta,
 * en el mismo orden del Excel, con espacio suficiente para leer cada dato
 * (a diferencia del modal anterior, que quedaba muy apretado).
 */
export function Detalle() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const idEvento = Number(id);
  const { data: evento, isLoading } = useEvento(Number.isFinite(idEvento) ? idEvento : undefined);

  return (
    <MonitoristaShell>
      {isLoading ? (
        <Card className="p-10 text-center text-[13px] text-ink-quiet">Cargando evento…</Card>
      ) : !evento ? (
        <Card className="p-10 text-center">
          <p className="text-[14px] font-semibold text-ink">Evento no encontrado</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/monitoreo")}>
            <ArrowLeft className="h-4 w-4" /> Volver
          </Button>
        </Card>
      ) : (
        <>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[19px] font-bold tracking-tight text-ink">{evento.codigo_evento ?? "Evento"}</h1>
                <Pill tone={ESTADO_TONE[evento.estado] ?? "neutral"} dot>{evento.estado}</Pill>
              </div>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">
                {evento.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "Sin tipo de incidente"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/monitoreo/editar/${evento.id_evento}`)}>
                <Pencil className="h-4 w-4" /> Editar
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" /> Volver
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <Dato label="Fecha" value={formatDate(evento.fecha)} />
              <Dato label="Hora" value={evento.hora ? formatTime(evento.hora) : null} />
              <Dato label="Año" value={evento.anio} />
              <Dato label="Mes" value={evento.mes} />
              <Dato label="Sem" value={evento.semana} />
              <Dato label="Día" value={evento.dia} />

              <Dato label="Rango horario" value={evento.catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?.nombre} />
              <div className="col-span-2">
                <Dato label="Tipo de incidente" value={evento.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre} />
              </div>

              <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6">
                <Dato label="Descripción del evento" value={evento.descripcion} />
              </div>

              <Dato label="Ubicación" value={evento.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre} />
              <Dato label="Tipo de vía" value={evento.catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?.nombre} />
              <Dato label="Dirección de vía" value={evento.catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?.nombre} />
              <Dato label="Lugar del incidente" value={evento.catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?.nombre} />
              <Dato label="Modelo MR" value={evento.catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?.nombre} />
              <Dato label="N.° MR" value={evento.catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?.nombre} />

              <Dato label="N.° de carrera" value={evento.numero_carrera} />
              <div className="col-span-2">
                <Dato label="Personal o falla involucrado" value={evento.catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?.nombre} />
              </div>
              <Dato label="Tipo de causa" value={evento.catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?.nombre} />
              <div className="col-span-2">
                <Dato label="Posible causa" value={evento.catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?.nombre} />
              </div>

              <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6">
                <Dato label="Información adicional" value={evento.informacion_adicional} />
              </div>

              <Dato label="Cámara" value={evento.camara_monitoreada} />
              <Dato label="Demora (min)" value={evento.demora} />
              <Dato label="Registrado por" value={evento.usuarios?.nombre} />
            </div>
          </Card>
        </>
      )}
    </MonitoristaShell>
  );
}
