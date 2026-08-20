import { useRef, useState } from "react";
import { Plus, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { Field, Input, Textarea } from "@/design-system/primitives/Input";
import { compactPlanCodes } from "@/features/cases/lib/planLabels";
import { planEvidenceFiles as extractPlanEvidenceFiles } from "@/features/cases/lib/planEvidence";
import { useAddPlanEvidence, useCompleteExecutionByPlan, useRemovePlanEvidence } from "@/features/plans/hooks/usePlans";
import { useAddPlanComment } from "@/features/cases/hooks/useCaseActions";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AnexoPlanCaso, PlanItem } from "@/features/plans/types";
import { MAX_ACTUALIZACIONES, planFlow, planMensajes, planUpdates } from "@/features/plans/lib/planDetailFlow";
import { MiniaturaAnexo } from "@/features/plans/components/PlanDetailParts";
import { ACCEPT, ACCEPT_DOCUMENTS, ACCEPT_IMAGES, ACCEPT_VIDEOS, ACTOR, MAX_ARCHIVOS, MAX_BYTES, TIPOS_PERMITIDOS } from "./constants";

export function ClosureCard({
  plan,
  finalDescription,
  onFinalDescriptionChange,
  completeExec,
  onFinalizeSuccess,
  onRequestUpdate,
}: {
  plan: PlanItem;
  finalDescription: string;
  onFinalDescriptionChange: (value: string) => void;
  completeExec: ReturnType<typeof useCompleteExecutionByPlan>;
  /** Limpia el borrador guardado en localStorage; llamado tras finalizar con éxito. */
  onFinalizeSuccess: () => void;
  onRequestUpdate: () => void;
}) {
  const caso = plan.casos_sop;
  const flow = planFlow(plan);
  const mensajes = planMensajes(plan);
  const actualizaciones = planUpdates(plan);
  // Lo adjuntado al plan que todavía no forma parte de una actualización
  // adicional: es lo que el jefe acaba de subir en el formulario de cierre.
  const evidenciasDelCierre = extractPlanEvidenceFiles(plan, plan.casos_sop.timeline_caso ?? [], plan.casos_sop.anexos_caso ?? []);
  const registrosEnviados = actualizaciones.filter((a) => a.etiqueta !== "Actualización original");
  const puedeAgregarActualizacion = flow.finalizado && registrosEnviados.length < MAX_ACTUALIZACIONES;
  // Ya no se exige 100% de avance: el cliente indicó que un plan puede
  // ejecutarse y finalizarse el mismo día, así que el cierre depende solo del
  // estado del flujo y de que haya una descripción.
  const puedeFinalizar = flow.puedeTrabajar;

  const addEvidence = useAddPlanEvidence();
  const removeEvidence = useRemovePlanEvidence();
  const addPlanComment = useAddPlanComment(caso.codigo_sop);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [fileAccept, setFileAccept] = useState(ACCEPT);
  const [comentarioCierre, setComentarioCierre] = useState("");

  const quitarEvidencia = (anexo: AnexoPlanCaso) => {
    removeEvidence.mutate(
      { id_plan: plan.id_plan, id_anexo: anexo.id_anexo, actor: plan.usuarios?.nombre ?? ACTOR },
      {
        onSuccess: () => toast.success(`Se quitó ${anexo.nombre_archivo ?? "la evidencia"}`),
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo quitar la evidencia")),
      }
    );
  };

  const enviarComentario = () => {
    const texto = comentarioCierre.trim();
    if (!texto) {
      toast.error("Escribe un comentario antes de enviar.");
      return;
    }

    addPlanComment.mutate(
      { id_plan: plan.id_plan, texto, rol: "jefe", actor: plan.usuarios?.nombre ?? ACTOR },
      {
        onSuccess: () => {
          toast.success("Comentario enviado a Seguridad Operativa");
          setComentarioCierre("");
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo enviar el comentario")),
      }
    );
  };

  const finalizePlan = () => {
    if (!puedeFinalizar) {
      toast.error("El estado actual del plan no permite finalizarlo");
      return;
    }

    const descripcion = finalDescription.trim();
    if (descripcion.length < 10) {
      toast.error("Agrega una descripción final de al menos 10 caracteres");
      return;
    }

    completeExec.mutate(
      { id_plan: plan.id_plan, actor: ACTOR, descripcion, comentario: comentarioCierre.trim() || undefined },
      {
        onSuccess: () => {
          toast.success("Plan enviado a Seguridad Operativa para revisión");
          onFinalizeSuccess();
          setComentarioCierre("");
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo finalizar el plan")),
      }
    );
  };

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const lista = Array.from(files);

    if (lista.length > MAX_ARCHIVOS) {
      toast.error(`Máximo ${MAX_ARCHIVOS} archivos por vez.`);
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

    setSubiendo(true);
    addEvidence.mutate({ id_plan: plan.id_plan, files: lista, actor: ACTOR }, {
      onSuccess: () => toast.success(lista.length === 1 ? "Evidencia adjuntada" : `${lista.length} evidencias adjuntadas`),
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo adjuntar la evidencia")),
      onSettled: () => {
        setSubiendo(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  const openEvidencePicker = (accept: string) => {
    setFileAccept(accept);
    window.setTimeout(() => fileInputRef.current?.click(), 0);
  };

  if (!flow.puedeTrabajar && !flow.finalizado) return null;

  return (
    <Card className={cn("border-line-soft shadow-sm", puedeFinalizar && "border-brand-100 bg-brand-50/30")}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={fileAccept}
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
              <Save className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[17px] font-semibold text-ink">Cierre de ejecución</h2>
              <p className="mt-0.5 text-[13px] text-ink-quiet">
                Describa lo ejecutado y adjunte la evidencia que lo sustente.
              </p>
            </div>
          </div>
        </div>
        <Pill tone={flow.finalizado ? "warning" : "success"} dot>
          {flow.finalizado ? "En revisión SO" : "Listo para enviar"}
        </Pill>
      </div>

      {flow.finalizado ? (
        <div className="mt-4 rounded-lg border border-warning/30 bg-warning-soft px-3 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[13px] text-warning-ink">
              Este plan ya fue finalizado por el área y está pendiente de revisión final por Seguridad Operativa.
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled={!puedeAgregarActualizacion}
              onClick={onRequestUpdate}
            >
              <Plus className="h-4 w-4" /> Nueva actualización
            </Button>
          </div>
          {!puedeAgregarActualizacion && (
            <p className="mt-2 text-[12px] text-warning-ink/80">
              Ya se alcanzó el límite de actualizaciones adicionales para este plan.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {/* Opcional y solo en el cierre original: las actualizaciones
              posteriores llevan únicamente descripción y evidencias. */}
          {/* Una sola línea y sin repetir "opcional" en label, hint y
              placeholder: ocupaba tres veces el espacio que necesita. */}
          <Field label="Comentario (opcional)">
            {/* Hilo arriba y caja de escritura abajo, como un chat. El
                alto está acotado con scroll propio para que la
                conversación no empuje al resto del formulario. */}
            {mensajes.length > 0 && (
              <div className="mb-2 max-h-36 space-y-1.5 overflow-y-auto rounded-lg border border-line-soft bg-surface/60 p-2">
                {mensajes.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "rounded-md px-2.5 py-1.5",
                      m.rol === "seguridad" ? "bg-brand-50 ring-1 ring-brand-100" : "bg-white ring-1 ring-line-soft"
                    )}
                  >
                    <p className="text-[12.5px] leading-snug text-ink">{compactPlanCodes(m.texto)}</p>
                    <p className="mt-0.5 text-[10.5px] text-ink-faint">
                      {m.rol === "seguridad" ? "Seguridad Operativa" : m.autor}
                      {m.fecha ? ` · ${formatDateTime(m.fecha)}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Input
                value={comentarioCierre}
                onChange={(e) => setComentarioCierre(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && comentarioCierre.trim()) enviarComentario();
                }}
                disabled={addPlanComment.isPending}
                placeholder="Escriba un comentario para Seguridad Operativa"
                className="flex-1"
              />
              <Button size="md" disabled={!comentarioCierre.trim() || addPlanComment.isPending} onClick={enviarComentario}>
                <Plus className="h-4 w-4" /> Agregar
              </Button>
            </div>
          </Field>

          <Field label="Descripción final de ejecución" required>
            <Textarea
              value={finalDescription}
              onChange={(e) => onFinalDescriptionChange(e.target.value)}
              rows={4}
              disabled={!puedeFinalizar || completeExec.isPending}
              placeholder={
                puedeFinalizar
                  ? "Resume qué se ejecutó, qué evidencia se adjuntó y cualquier condición relevante para la revisión de SO."
                  : "Completa todas las actividades para habilitar el cierre del plan."
              }
            />
          </Field>

          <div className="rounded-xl border border-line-soft bg-white/70 px-4 py-3.5">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Evidencia final de soporte</p>
            <p className="mt-1 text-[13px] text-ink-quiet">
              Adjunta fotos, videos o documentos que sustenten el cierre antes de enviarlo a revisión.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="md"
                disabled={!puedeFinalizar || subiendo}
                onClick={() => openEvidencePicker(ACCEPT_IMAGES)}
              >
                <Upload className="h-4 w-4" /> Agregar Foto
              </Button>
              <Button
                variant="outline"
                size="md"
                disabled={!puedeFinalizar || subiendo}
                onClick={() => openEvidencePicker(ACCEPT_VIDEOS)}
              >
                <Upload className="h-4 w-4" /> Agregar Video
              </Button>
              <Button
                variant="outline"
                size="md"
                disabled={!puedeFinalizar || subiendo}
                onClick={() => openEvidencePicker(ACCEPT_DOCUMENTS)}
              >
                <Upload className="h-4 w-4" /> Agregar Documento
              </Button>
            </div>

            {/* Lo ya adjuntado, en fila y compacto: al subir varias no
                crece hacia abajo, se acomodan una al lado de la otra. */}
            {evidenciasDelCierre.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {evidenciasDelCierre.map((a) => (
                  <MiniaturaAnexo
                    key={a.id_anexo}
                    anexo={a}
                    quitando={removeEvidence.isPending}
                    onQuitar={() => quitarEvidencia(a)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
            <p className="text-[12.5px] text-ink-quiet">
              Seguridad Operativa revisará este plan individualmente; los otros planes del SOP no se bloquean.
            </p>
            <Button
              size="md"
              disabled={!puedeFinalizar || finalDescription.trim().length < 10 || completeExec.isPending}
              onClick={finalizePlan}
            >
              <Save className="h-4.5 w-4.5" /> Finalizar y enviar a SO
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
