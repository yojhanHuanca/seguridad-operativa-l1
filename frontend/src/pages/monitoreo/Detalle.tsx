import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ClipboardList, Pencil } from "lucide-react";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { useEvento } from "@/features/eventos/hooks/useEventos";
import { ESTADO_TONE } from "@/features/eventos/lib/estado";
import { CSV_HEADERS, filaCsv, nombreTipo, nombreUbicacion } from "@/features/eventos/lib/tabla";
import { cn } from "@/lib/utils";
import type { EventoListItem } from "@/features/eventos/types";

const CAMPOS_AMPLIOS = new Set([
  "Tipo de incidente operativo",
  "Descripción del evento",
  "Personal o falla Involucrado",
  "Información adicional",
]);

function valorDetalle(value: unknown) {
  if (value === 0) return "0";
  if (value == null || value === "") return "—";
  return String(value);
}

function datosEnOrdenExcel(evento: EventoListItem) {
  const fila = filaCsv(evento);
  return CSV_HEADERS.map((label, index) => ({ label, value: fila[index] }));
}

function Dato({ label, value }: { label: string; value: unknown }) {
  const amplio = CAMPOS_AMPLIOS.has(label);

  return (
    <div className={cn("min-w-0 rounded-lg border border-line-soft bg-surface/45 px-3 py-2.5", amplio && "md:col-span-2 xl:col-span-3")}>
      <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-0.5 break-words text-[13px] font-medium text-ink">{valorDetalle(value)}</p>
    </div>
  );
}

export function Detalle() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const idEvento = Number(id);
  const { data: evento, isLoading } = useEvento(Number.isFinite(idEvento) ? idEvento : undefined);

  return (
    <MonitoristaShell>
      {isLoading ? (
        <Card className="p-10 text-center text-[13px] text-ink-quiet">Cargando evento...</Card>
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
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <Pill tone={ESTADO_TONE[evento.estado] ?? "neutral"} dot>{evento.estado}</Pill>
              <p className="truncate text-[13px] text-ink-quiet">{nombreUbicacion(evento)} · {nombreTipo(evento)}</p>
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
            <CardHeader icon={<ClipboardList className="h-4.5 w-4.5" />} title="LISTA DE EVENTOS" className="mb-3" />
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-6">
              {datosEnOrdenExcel(evento).map((item) => (
                <Dato key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </Card>
        </>
      )}
    </MonitoristaShell>
  );
}
