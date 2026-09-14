import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ContingenciaShell } from "@/components/layout/ContingenciaShell";
import { Button } from "@/design-system/primitives/Button";
import { Card } from "@/design-system/primitives/Card";
import { useContingencia } from "@/features/contingencias/hooks/useContingencias";
import { CONTINGENCIA_FIELDS, eventoToDto } from "@/features/contingencias/fields";
import { apiErrorMessage } from "@/lib/api";

const SECTIONS = ["Datos generales", "Reporte", "Atención", "Traslado", "Datos de la atención", "Gestor de atención"];

export function Detalle() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: evento, isPending, error, refetch } = useContingencia(id ?? "");
  const values = evento ? eventoToDto(evento) : null;
  const calculated = evento ? [
    ["Tiempo de respuesta SPAA", evento.atencion?.tiempo_respuesta_spaa_minutos],
    ["Tiempo de llegada de ambulancia", evento.traslado?.tiempo_llegada_ambulancia_minutos],
    ["Evacuación", evento.traslado?.tiempo_evacuacion_minutos],
  ] as const : [];

  return <ContingenciaShell>
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => navigate("/contingencias/historial")}><ArrowLeft className="h-4 w-4" />Volver al historial</Button>
        {evento && <Button onClick={() => navigate("/contingencias/editar/" + evento.id_evento)}><Pencil className="h-4 w-4" />Editar</Button>}
      </div>
      {isPending ? <Card className="p-10 text-center text-[13px] text-ink-quiet" role="status">Cargando evento...</Card> : error ? <Card role="alert" className="space-y-3 p-8 text-center"><p>{apiErrorMessage(error, "No se pudo obtener el evento.")}</p><Button variant="outline" onClick={() => refetch()}>Reintentar</Button></Card> : evento && values ? <Card className="p-5 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-line pb-5">
          <h2 className="text-xl font-semibold text-ink">Registro de contingencia</h2>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">{evento.estado}</span>
          <p className="w-full text-sm text-ink-quiet">{evento.tipo_evento.trim()} · {evento.fecha} · {evento.hora_reporte}</p>
        </div>
        {SECTIONS.map((section) => <section key={section} className="border-b border-line py-5">
          <h3 className="mb-4 text-base font-semibold text-ink">{section}</h3>
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {CONTINGENCIA_FIELDS.filter((field) => field.section === section).map((field) => <div key={field.name} className={field.type === "textarea" ? "min-w-0 sm:col-span-2" : "min-w-0"}>
              <dt className="mb-1 text-xs text-ink-quiet">{field.label}</dt>
              <dd className="whitespace-pre-wrap break-words text-sm text-ink">{values[field.name] === "" || values[field.name] == null ? "Sin registrar" : String(values[field.name])}</dd>
            </div>)}
          </dl>
        </section>)}
        <section className="border-b border-line py-5"><h3 className="mb-4 font-semibold text-ink">Tiempos de atención</h3><dl className="grid gap-5 sm:grid-cols-3">{calculated.map(([label, value]) => <div key={label}><dt className="text-xs text-ink-quiet">{label}</dt><dd className="mt-1 text-sm text-ink">{value == null ? "Sin datos suficientes" : value + " min"}</dd></div>)}</dl></section>
        <dl className="grid gap-4 pt-5 text-xs text-ink-quiet sm:grid-cols-2">
          <div><dt>Creado</dt><dd>{new Date(evento.created_at).toLocaleString("es-PE")} · Usuario #{evento.created_by ?? "-"}</dd></div>
          <div><dt>Última actualización</dt><dd>{new Date(evento.updated_at).toLocaleString("es-PE")} · Usuario #{evento.updated_by ?? "-"}</dd></div>
        </dl>
      </Card> : <Card className="p-10 text-center text-[13px] text-ink-quiet">Evento no encontrado</Card>}
    </div>
  </ContingenciaShell>;
}

