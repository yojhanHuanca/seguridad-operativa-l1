import { useRef, useState } from "react";
import { Save, Upload } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { useAddPlanUpdate } from "@/features/plans/hooks/usePlans";
import { apiErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import type { PlanItem } from "@/features/plans/types";
import { MAX_ACTUALIZACIONES, planUpdates } from "@/features/plans/lib/planDetailFlow";
import { ACCEPT, ACCEPT_DOCUMENTS, ACCEPT_IMAGES, ACCEPT_VIDEOS, MAX_ARCHIVOS, MAX_BYTES, TIPOS_PERMITIDOS } from "./constants";

export function UpdateModal({ plan, open, onClose }: { plan: PlanItem; open: boolean; onClose: () => void }) {
  const addUpdate = useAddPlanUpdate();
  const adicionales = planUpdates(plan).filter((a) => a.etiqueta !== "Actualización original").length;

  const [updateDescription, setUpdateDescription] = useState("");
  const [updateFiles, setUpdateFiles] = useState<File[]>([]);
  const [updateAccept, setUpdateAccept] = useState(ACCEPT);
  const updateFileRef = useRef<HTMLInputElement>(null);

  const cerrarActualizacion = () => {
    onClose();
    setUpdateDescription("");
    setUpdateFiles([]);
  };

  const openUpdatePicker = (accept: string) => {
    setUpdateAccept(accept);
    window.setTimeout(() => updateFileRef.current?.click(), 0);
  };

  /**
   * Igual criterio que `ClosureCard.onFiles` / `EvidencePanel.onFiles`: se
   * valida al elegir el archivo, no al enviar. Antes esto faltaba acá — se
   * aceptaba cualquier archivo sin avisar y recién fallaba al hacer clic en
   * "Registrar actualización", tumbando de un solo golpe también las
   * evidencias válidas que sí venían junto con la que sobraba.
   */
  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const lista = Array.from(files);

    if (updateFiles.length + lista.length > MAX_ARCHIVOS) {
      toast.error(`Máximo ${MAX_ARCHIVOS} archivos por actualización.`);
      return;
    }
    const pesado = lista.find((f) => f.size > MAX_BYTES);
    if (pesado) {
      toast.error(`"${pesado.name}" supera los 25 MB permitidos.`);
      return;
    }
    const invalido = lista.find((f) => !TIPOS_PERMITIDOS.includes(f.type));
    if (invalido) {
      toast.error(`"${invalido.name}" no es un tipo permitido (imagen, video MP4/MOV o PDF).`);
      return;
    }

    setUpdateFiles((prev) => [...prev, ...lista]);
  };

  const enviarActualizacion = () => {
    addUpdate.mutate(
      {
        id_plan: plan.id_plan,
        descripcion: updateDescription.trim(),
        files: updateFiles,
        actor: plan.usuarios?.nombre ?? "Jefe de Área",
      },
      {
        onSuccess: () => {
          toast.success("Actualización registrada y bloqueada");
          cerrarActualizacion();
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo registrar la actualización")),
      }
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={cerrarActualizacion}
        title="Agregar nueva actualización"
        subtitle={`${shortPlanCode(plan.codigo_plan)} · quedan ${MAX_ACTUALIZACIONES - adicionales} de ${MAX_ACTUALIZACIONES}`}
        footer={
          <>
            <Button variant="ghost" onClick={cerrarActualizacion}>
              Cancelar
            </Button>
            <Button
              disabled={updateDescription.trim().length < 10 || addUpdate.isPending}
              onClick={enviarActualizacion}
            >
              <Save className="h-4.5 w-4.5" /> Registrar actualización
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Advertencia obligatoria antes de crear cada actualización. */}
          <p className="rounded-lg border border-warning/30 bg-warning-soft px-3 py-3 text-[13px] text-warning-ink">
            La información ya registrada no podrá modificarse. Esta actualización se agrega al mismo plan{" "}
            {shortPlanCode(plan.codigo_plan)} y, una vez enviada, también quedará bloqueada.
          </p>

          <Field label="Descripción de la actualización" required>
            <Textarea
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              rows={4}
              disabled={addUpdate.isPending}
              placeholder="Describa la información que agrega sobre la ejecución de este plan."
            />
          </Field>

          <div className="rounded-xl border border-line-soft bg-white/70 px-4 py-3.5">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Evidencias de esta actualización</p>
            <p className="mt-1 text-[13px] text-ink-quiet">
              Se guardan junto a este nuevo registro; las evidencias anteriores no se modifican.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="md"
                disabled={addUpdate.isPending || updateFiles.length >= MAX_ARCHIVOS}
                onClick={() => openUpdatePicker(ACCEPT_IMAGES)}
              >
                <Upload className="h-4 w-4" /> Agregar Foto
              </Button>
              <Button
                variant="outline"
                size="md"
                disabled={addUpdate.isPending || updateFiles.length >= MAX_ARCHIVOS}
                onClick={() => openUpdatePicker(ACCEPT_VIDEOS)}
              >
                <Upload className="h-4 w-4" /> Agregar Video
              </Button>
              <Button
                variant="outline"
                size="md"
                disabled={addUpdate.isPending || updateFiles.length >= MAX_ARCHIVOS}
                onClick={() => openUpdatePicker(ACCEPT_DOCUMENTS)}
              >
                <Upload className="h-4 w-4" /> Agregar Documento
              </Button>
            </div>
            {updateFiles.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {updateFiles.map((file, index) => (
                  <li
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-surface/70 px-3 py-2 text-[12.5px] text-ink"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      className="shrink-0 text-[11.5px] font-medium text-critical hover:underline"
                      onClick={() => setUpdateFiles((prev) => prev.filter((_, idx) => idx !== index))}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>

      <input
        ref={updateFileRef}
        type="file"
        multiple
        accept={updateAccept}
        className="hidden"
        onChange={(e) => {
          onFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </>
  );
}
