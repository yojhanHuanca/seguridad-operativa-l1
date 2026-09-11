import { eventoToDto } from "@/features/contingencias/fields";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ContingenciaShell } from "@/components/layout/ContingenciaShell";
import { Button } from "@/design-system/primitives/Button";
import { ContingenciaForm } from "@/features/contingencias/components/ContingenciaForm";
import { useContingencia } from "@/features/contingencias/hooks/useContingencias";
import { useUpdateContingencia } from "@/features/contingencias/hooks/useContingencias";
import { apiErrorMessage } from "@/lib/api";
import type { CreateContingenciaDto } from "@/features/contingencias/types";

export function Editar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: evento, isLoading } = useContingencia(id!);
  const updateContingencia = useUpdateContingencia();

  if (isLoading) {
    return (
      <ContingenciaShell>
        <div className="flex items-center justify-center py-12">
          <div className="text-[13px] text-ink-quiet">Cargando...</div>
        </div>
      </ContingenciaShell>
    );
  }

  if (!evento) {
    return (
      <ContingenciaShell>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-[15px] font-semibold text-ink">Evento no encontrado</p>
        </div>
      </ContingenciaShell>
    );
  }

  const initialData = eventoToDto(evento);

  const handleSubmit = (data: CreateContingenciaDto) => {
    updateContingencia.mutate(
      { id: id!, dto: data },
      {
        onSuccess: () => {
          toast.success("Evento actualizado correctamente");
          navigate(`/contingencias/evento/${id}`);
        },
        onError: (err) => toast.error(apiErrorMessage(err, "No se pudo actualizar el evento")),
      }
    );
  };

  return (
    <ContingenciaShell>
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/contingencias/evento/${id}`)}>
          <ArrowLeft className="h-4 w-4" /> Volver al detalle
        </Button>
      </div>
      <ContingenciaForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/contingencias/evento/${id}`)}
        isSubmitting={updateContingencia.isPending}
      />
    </ContingenciaShell>
  );
}
