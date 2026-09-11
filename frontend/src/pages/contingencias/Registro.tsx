import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { ContingenciaShell } from "@/components/layout/ContingenciaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { ContingenciaForm } from "@/features/contingencias/components/ContingenciaForm";
import { useCreateContingencia } from "@/features/contingencias/hooks/useContingencias";
import { apiErrorMessage } from "@/lib/api";
import type { CreateContingenciaDto } from "@/features/contingencias/types";

export function Registro() {
  const navigate = useNavigate();
  const createContingencia = useCreateContingencia();
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (data: CreateContingenciaDto) => {
    createContingencia.mutate(data, {
      onSuccess: () => {
        toast.success("Evento de contingencia registrado correctamente");
        setSuccess("ok");
      },
      onError: (err) => toast.error(apiErrorMessage(err, "No se pudo registrar el evento")),
    });
  };

  if (success) {
    return (
      <ContingenciaShell>
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
                onClick={() => setSuccess(null)}
              >
                Registrar otro evento
              </Button>
              <Button size="sm" onClick={() => navigate("/contingencias/historial")}>
                Ver historial
              </Button>
            </div>
          </Card>
        </div>
      </ContingenciaShell>
    );
  }

  return (
    <ContingenciaShell>
      <ContingenciaForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/contingencias/historial")}
        isSubmitting={createContingencia.isPending}
      />
    </ContingenciaShell>
  );
}
