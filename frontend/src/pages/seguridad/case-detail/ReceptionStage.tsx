import { useState } from "react";
import { Check, X, Mail, Send, StickyNote, Inbox, FileSearch } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { Pill } from "@/design-system/primitives/Pill";
import { StageSection, DescriptionBlock } from "@/features/cases/components/CaseParts";
import { useApproveCase, useRejectCase, useRequestInfo, useAddObservation } from "@/features/cases/hooks/useCaseActions";
import { apiErrorMessage } from "@/lib/api";
import { relativeTime } from "@/lib/format";
import { EvaluationForm } from "./EvaluationForm";
import { EvidencePanel } from "./EvidencePanel";
import type { CaseDetail } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx → ReceptionStage.
// Cubre Recepción y Evaluación: es la misma tarjeta, cambia el copy y el cuerpo.
export function ReceptionStage({ caso, isRecepcion }: { caso: CaseDetail; isRecepcion: boolean }) {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [obsOpen, setObsOpen] = useState(false);
  const [observation, setObservation] = useState("");

  const approve = useApproveCase(caso.codigo_sop);
  const reject = useRejectCase(caso.codigo_sop);
  const requestInfo = useRequestInfo(caso.codigo_sop);
  const addObservation = useAddObservation(caso.codigo_sop);

  const pendiente = caso.solicitudes_informacion.find((s) => !s.respondida);

  return (
    <div className="space-y-4">
      <StageSection
        title={isRecepcion ? "Recepción y Revisión de Reporte" : "Evaluación del Caso"}
        subtitle={
          isRecepcion
            ? "Revise toda la información del reporte, evidencias y descripción. Apruebe para avanzar a Evaluación."
            : "Analice la gravedad, defina prioridad y clasifique el caso. Determine si requiere investigación."
        }
        icon={isRecepcion ? <Inbox className="h-5 w-5" /> : <FileSearch className="h-5 w-5" />}
        action={<Pill tone="info" dot>{isRecepcion ? "Pendiente de aprobación" : "En evaluación"}</Pill>}
      >
        <DescriptionBlock description={caso.descripcion} />

        {pendiente && (
          <div className="mt-4 rounded-lg bg-warning-soft border border-warning/30 p-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-warning-ink shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-warning-ink">Información adicional solicitada</p>
                <p className="text-[12.5px] text-ink-soft mt-1">{pendiente.mensaje}</p>
                <p className="text-[11px] text-ink-faint mt-1.5">
                  Solicitada {pendiente.fecha_solicitud ? relativeTime(pendiente.fecha_solicitud) : ""}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Las evidencias son parte de la revisión: se ven y se amplían aquí
            mismo, sin tener que abrir el modal de la cabecera. */}
        <div className="mt-4">
          <EvidencePanel caso={caso} puedeAdjuntar compact />
        </div>

        {isRecepcion ? (
          <div className="mt-5 pt-5 border-t border-line-soft flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              disabled={approve.isPending}
              onClick={() =>
                approve.mutate(undefined, {
                  onSuccess: () => toast.success("Reporte aprobado, pasó a Evaluación"),
                  onError: (e) => toast.error(apiErrorMessage(e, "No se pudo aprobar el reporte")),
                })
              }
            >
              <Check className="h-4 w-4" /> Aprobar reporte
            </Button>
            <Button variant="outline" size="sm" onClick={() => setInfoOpen(true)}>
              <Mail className="h-4 w-4" /> Solicitar información
            </Button>
            <Button variant="outline" size="sm" onClick={() => setObsOpen(true)}>
              <StickyNote className="h-4 w-4" /> Registrar observación
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setRejectOpen(true)} className="text-critical hover:bg-critical-soft">
              <X className="h-4 w-4" /> Rechazar
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <EvaluationForm caso={caso} />
            </div>
            {/* En Evaluación también se puede pausar el caso o descartarlo: al
                responder la solicitud el caso vuelve a Evaluación, no a Recepción. */}
            <div className="mt-4 pt-4 border-t border-line-soft flex items-center gap-2 flex-wrap">
              <span className="text-[11.5px] text-ink-quiet mr-auto">¿Falta información o el caso no procede?</span>
              <Button variant="outline" size="sm" onClick={() => setInfoOpen(true)}>
                <Mail className="h-4 w-4" /> Solicitar información
              </Button>
              <Button variant="outline" size="sm" onClick={() => setObsOpen(true)}>
                <StickyNote className="h-4 w-4" /> Registrar observación
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setRejectOpen(true)} className="text-critical hover:bg-critical-soft">
                <X className="h-4 w-4" /> Rechazar
              </Button>
            </div>
          </>
        )}
      </StageSection>

      <Modal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        title="Rechazar reporte"
        subtitle={`${caso.codigo_sop} · indique el motivo (obligatorio)`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setRejectOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              disabled={!reason.trim() || reject.isPending}
              onClick={() =>
                reject.mutate(
                  { motivo: reason.trim() },
                  {
                    onSuccess: () => {
                      toast.success("Reporte rechazado");
                      setRejectOpen(false);
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo rechazar el reporte")),
                  }
                )
              }
            >
              <X className="h-4 w-4" /> Confirmar rechazo
            </Button>
          </>
        }
      >
        <Field label="Motivo del rechazo" required>
          <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explique por qué el reporte no procede…" rows={4} />
        </Field>
      </Modal>

      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Solicitar información al reportante"
        subtitle={`${caso.codigo_sop} · el caso queda en pausa hasta recibir respuesta`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setInfoOpen(false)}>
              Cancelar
            </Button>
            <Button
              disabled={!question.trim() || requestInfo.isPending}
              onClick={() =>
                requestInfo.mutate(
                  { mensaje: question.trim() },
                  {
                    onSuccess: () => {
                      toast.success("Solicitud enviada, el caso queda en pausa");
                      setInfoOpen(false);
                      setQuestion("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo enviar la solicitud")),
                  }
                )
              }
            >
              <Send className="h-4 w-4" /> Enviar solicitud
            </Button>
          </>
        }
      >
        <Field
          label="¿Qué información necesita?"
          required
          hint={`Al responder, el caso volverá a ${isRecepcion ? "Recepción" : "Evaluación"}.`}
        >
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ej. Detallar personal involucrado y adjuntar copia del permiso de trabajo…"
            rows={4}
          />
        </Field>
      </Modal>

      <Modal
        open={obsOpen}
        onClose={() => setObsOpen(false)}
        title="Registrar observación de revisión"
        subtitle={`${caso.codigo_sop} · queda en la bitácora del expediente`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setObsOpen(false)}>
              Cancelar
            </Button>
            <Button
              disabled={!observation.trim() || addObservation.isPending}
              onClick={() =>
                addObservation.mutate(
                  { texto: observation.trim() },
                  {
                    onSuccess: () => {
                      toast.success("Observación registrada");
                      setObsOpen(false);
                      setObservation("");
                    },
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo registrar la observación")),
                  }
                )
              }
            >
              <StickyNote className="h-4 w-4" /> Guardar observación
            </Button>
          </>
        }
      >
        <Field label="Observación" required>
          <Textarea value={observation} onChange={(e) => setObservation(e.target.value)} rows={4} placeholder="Anote sus observaciones de la revisión…" />
        </Field>
      </Modal>
    </div>
  );
}
