import { useState } from "react";
import { AlertTriangle, CornerUpLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { useRollbackCase, type RollbackStageInput } from "@/features/cases/hooks/useCaseActions";
import { apiErrorMessage } from "@/lib/api";

interface StageRollbackButtonProps {
  codigo: string;
  destino: RollbackStageInput["destino"];
  label: string;
  title: string;
  description: string;
}

export function StageRollbackButton({ codigo, destino, label, title, description }: StageRollbackButtonProps) {
  const rollback = useRollbackCase(codigo);
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const motivoLimpio = motivo.trim();

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <CornerUpLeft className="h-4 w-4" /> {label}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        subtitle={`${codigo} · el historial y los datos cargados se conservan`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              disabled={motivoLimpio.length < 5 || rollback.isPending}
              onClick={() =>
                rollback.mutate(
                  { destino, motivo: motivoLimpio },
                  {
                    onSuccess: () => {
                      toast.success(`Caso devuelto a ${destino}`);
                      setOpen(false);
                      setMotivo("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo retroceder el caso")),
                  }
                )
              }
            >
              <CornerUpLeft className="h-4 w-4" /> Confirmar retroceso
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-warning/30 bg-warning-soft p-3 text-[12.5px] text-warning-ink">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{description}</p>
            </div>
          </div>
          <Field label="Motivo del retroceso" required hint="Este motivo quedará registrado en la línea de tiempo.">
            <Textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
              placeholder="Explique qué información se debe corregir antes de continuar…"
            />
          </Field>
        </div>
      </Modal>
    </>
  );
}
