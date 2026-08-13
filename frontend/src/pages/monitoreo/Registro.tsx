import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Save, X } from "lucide-react";
import { toast } from "sonner";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { EventoFormFields } from "@/features/eventos/components/EventoFormFields";
import { useEventoFormState } from "@/features/eventos/hooks/useEventoFormState";
import { useCreateEvento } from "@/features/eventos/hooks/useEventoActions";
import { apiErrorMessage } from "@/lib/api";

export function Registro() {
  const navigate = useNavigate();
  const createEvento = useCreateEvento();
  const [success, setSuccess] = useState<string | null>(null);
  const { form, set, errors, rangoLabel, validate, toInput, reset } = useEventoFormState();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createEvento.mutate(toInput(), {
      onSuccess: (evento) => {
        toast.success("Evento registrado");
        setSuccess(evento?.codigo_evento ?? "Evento registrado");
      },
      onError: (err) => toast.error(apiErrorMessage(err, "No se pudo registrar el evento")),
    });
  };

  if (success) {
    return (
      <MonitoristaShell>
        <div className="mx-auto max-w-xl">
          <Card className="flex flex-col items-center gap-3 p-10 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
              <Check className="h-7 w-7" />
            </div>
            <h2 className="text-[19px] font-bold text-ink">Evento registrado correctamente</h2>
            <p className="text-[13px] text-ink-quiet">
              Código <span className="font-mono font-semibold text-ink">{success}</span>
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSuccess(null);
                  reset();
                }}
              >
                Registrar otro evento
              </Button>
              <Button size="sm" onClick={() => navigate("/monitoreo")}>
                Volver al dashboard
              </Button>
            </div>
          </Card>
        </div>
      </MonitoristaShell>
    );
  }

  return (
    <MonitoristaShell>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[12.5px] text-ink-quiet">
          Complete la información del evento operativo. Los campos con * son obligatorios.
        </p>
        <Button variant="ghost" size="sm" onClick={() => navigate("/monitoreo")}>
          <ArrowLeft className="h-4 w-4" /> Volver
        </Button>
      </div>

      <form onSubmit={onSubmit}>
        <EventoFormFields form={form} set={set} errors={errors} rangoLabel={rangoLabel} />

        <div className="mt-3 flex items-center justify-end gap-2.5">
          <Button variant="outline" type="button" onClick={() => navigate("/monitoreo")}>
            <X className="h-4 w-4" /> Cancelar
          </Button>
          <Button type="submit" disabled={createEvento.isPending}>
            <Save className="h-4 w-4" /> {createEvento.isPending ? "Guardando…" : "Registrar evento"}
          </Button>
        </div>
      </form>
    </MonitoristaShell>
  );
}
