import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { toast } from "sonner";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { EventoFormFields } from "@/features/eventos/components/EventoFormFields";
import { useEventoFormState } from "@/features/eventos/hooks/useEventoFormState";
import { useEvento } from "@/features/eventos/hooks/useEventos";
import { useUpdateEvento } from "@/features/eventos/hooks/useEventoActions";
import { apiErrorMessage } from "@/lib/api";
import type { EventoListItem } from "@/features/eventos/types";

/**
 * Edición de evento como página completa (no modal): mismo formulario y
 * ancho que "Registrar evento", así los campos no se ven apretados como
 * pasaba en el modal.
 */
export function Editar() {
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
        <EditarFormulario evento={evento} />
      )}
    </MonitoristaShell>
  );
}

function EditarFormulario({ evento }: { evento: EventoListItem }) {
  const navigate = useNavigate();
  const updateEvento = useUpdateEvento();
  const { form, set, errors, rangoLabel, validate, toInput } = useEventoFormState(evento);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    updateEvento.mutate(
      { id_evento: evento.id_evento, ...toInput() },
      {
        onSuccess: () => {
          toast.success("Evento actualizado");
          navigate(-1);
        },
        onError: (err) => toast.error(apiErrorMessage(err, "No se pudo actualizar el evento")),
      }
    );
  };

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[19px] font-bold tracking-tight text-ink">Editar {evento.codigo_evento ?? "evento"}</h1>
          <p className="mt-0.5 text-[12.5px] text-ink-quiet">Corrige los datos del evento registrado. Los campos con * son obligatorios.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Volver
        </Button>
      </div>

      <form onSubmit={onSubmit}>
        <EventoFormFields form={form} set={set} errors={errors} rangoLabel={rangoLabel} />

        <div className="mt-3 flex items-center justify-end gap-2.5">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            <X className="h-4 w-4" /> Cancelar
          </Button>
          <Button type="submit" disabled={updateEvento.isPending}>
            <Save className="h-4 w-4" /> {updateEvento.isPending ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </>
  );
}
