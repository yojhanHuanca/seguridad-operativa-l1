import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Save, X } from "lucide-react";
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
      onSuccess: () => {
        toast.success("Evento registrado");
        setSuccess("ok");
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
      <form onSubmit={onSubmit}>
        <EventoFormFields form={form} set={set} errors={errors} rangoLabel={rangoLabel} />

        <div className="mt-4 flex items-center justify-end gap-2.5 rounded-lg border border-line bg-white p-3 shadow-[var(--shadow-card)]">
          <Button variant="outline" type="button" onClick={() => navigate("/monitoreo")}>
            <X className="h-4 w-4" /> Cancelar
          </Button>
          <Button type="submit" disabled={createEvento.isPending}>
            <Save className="h-4 w-4" /> {createEvento.isPending ? "Guardando..." : "Registrar evento"}
          </Button>
        </div>
      </form>
    </MonitoristaShell>
  );
}
