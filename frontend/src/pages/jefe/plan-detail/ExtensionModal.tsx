import { useState } from "react";
import { Timer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Input, Textarea } from "@/design-system/primitives/Input";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { useRequestPlanExtension } from "@/features/plans/hooks/usePlans";
import { apiErrorMessage } from "@/lib/api";
import type { PlanItem } from "@/features/plans/types";
import { ACTOR } from "./constants";

function defaultExtensionDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 10);
}

export function ExtensionModal({ plan, open, onClose }: { plan: PlanItem; open: boolean; onClose: () => void }) {
  const requestExt = useRequestPlanExtension();
  const [nuevaFecha, setNuevaFecha] = useState(defaultExtensionDate);
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
      <Field label="Nueva fecha propuesta" required>
        <Input type="date" value={nuevaFecha} onChange={(e) => setNuevaFecha(e.target.value)} />
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
