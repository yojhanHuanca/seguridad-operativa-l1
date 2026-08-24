import { useState } from "react";
import { Timer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Input, Textarea } from "@/design-system/primitives/Input";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { useConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";
import { useRequestPlanExtension } from "@/features/plans/hooks/usePlans";
import { planDeadline } from "@/features/plans/lib/planDeadline";
import { apiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { PlanItem } from "@/features/plans/types";
import { ACTOR } from "./constants";

function soloFecha(value?: string | null) {
  return value ? value.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

function addDays(value: string, days: number) {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + Math.max(1, days));
  return date.toISOString().slice(0, 10);
}

export function ExtensionModal({ plan, open, onClose }: { plan: PlanItem; open: boolean; onClose: () => void }) {
  const requestExt = useRequestPlanExtension();
  const { data: configuracion } = useConfiguracion();
  const diasProrroga = configuracion?.plazos.diasSolicitarProrroga ?? 7;
  const plazoVigente = soloFecha(planDeadline(plan));
  const fechaMinima = addDays(plazoVigente, 1);
  const fechaMaxima = addDays(plazoVigente, diasProrroga);
  const sugerida = fechaMaxima;
  const draftKey = `${plan.id_plan}:${plazoVigente}:${diasProrroga}`;
  const [draftFecha, setDraftFecha] = useState<{ key: string; value: string }>(() => ({ key: draftKey, value: sugerida }));
  const nuevaFecha = draftFecha.key === draftKey ? draftFecha.value : sugerida;
  const [justificacion, setJustificacion] = useState("");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Solicitar ampliación de plazo"
      subtitle={`${shortPlanCode(plan.codigo_plan)} · la decide Seguridad Operativa`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={!nuevaFecha || justificacion.trim().length < 5 || requestExt.isPending}
            onClick={() =>
              requestExt.mutate(
                { id_plan: plan.id_plan, nueva_fecha: nuevaFecha, justificacion: justificacion.trim(), actor: ACTOR },
                {
                  onSuccess: () => {
                    toast.success("Ampliación solicitada, pendiente de decisión de SO");
                    onClose();
                    setJustificacion("");
                    setDraftFecha({ key: draftKey, value: sugerida });
                  },
                  onError: (e) => toast.error(apiErrorMessage(e, "No se pudo solicitar la ampliación")),
                }
              )
            }
          >
            <Timer className="h-4.5 w-4.5" /> Enviar solicitud
          </Button>
        </>
      }
    >
      <Field
        label="Nueva fecha propuesta"
        required
        hint={`Máximo permitido: ${formatDate(fechaMaxima)} (${diasProrroga} día(s) adicionales al plazo vigente).`}
      >
        <Input
          type="date"
          min={fechaMinima}
          max={fechaMaxima}
          value={nuevaFecha}
          onChange={(e) => setDraftFecha({ key: draftKey, value: e.target.value })}
        />
      </Field>
      <Field label="Justificación" required className="mt-4">
        <Textarea
          value={justificacion}
          onChange={(e) => setJustificacion(e.target.value)}
          rows={4}
          placeholder="Explique por qué necesita más tiempo..."
        />
      </Field>
    </Modal>
  );
}
