import { useState } from "react";
import { AlertCircle, Mail, CornerUpLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { Field, Textarea } from "@/design-system/primitives/Input";
import { StageSection, DescriptionBlock } from "@/features/cases/components/CaseParts";
import { useRespondInfo } from "@/features/cases/hooks/useCaseActions";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime, relativeTime } from "@/lib/format";
import { EvidencePanel } from "./EvidencePanel";
import type { CaseDetail } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx → PendingInfoStage, más el bloque
// para registrar la respuesta (en el prototipo la responde el Reportante desde
// su portal; aquí la registra SO mientras ese portal no existe).
export function PendingInfoCard({ caso }: { caso: CaseDetail }) {
  const solicitud = caso.solicitudes_informacion.find((s) => !s.respondida);
  const historicas = caso.solicitudes_informacion.filter((s) => s.respondida);
  const [respuesta, setRespuesta] = useState("");
  const respond = useRespondInfo(caso.codigo_sop);

  if (!solicitud) return null;

  const vuelveA = solicitud.estado_previo ?? "Evaluación";

  return (
    <StageSection
      title="Esperando información del reportante"
      subtitle="El caso está pausado hasta que el reportante responda la solicitud."
      icon={<Mail className="h-5 w-5" />}
      action={<Pill tone="warning" dot>Pausado</Pill>}
    >
      <div className="rounded-lg bg-warning-soft border border-warning/25 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-warning-ink shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-ink">Solicitud enviada</p>
            <p className="text-[13px] text-ink-soft mt-1 leading-relaxed">{solicitud.mensaje}</p>
            <p className="text-[11.5px] text-ink-quiet mt-2">
              Solicitada {solicitud.fecha_solicitud ? relativeTime(solicitud.fecha_solicitud) : ""}
            </p>
          </div>
        </div>
        {/* El caso no retrocede: al responder vuelve exactamente a la etapa en
            la que se pausó, que el backend guarda como `estado_previo`. */}
        <div className="mt-3 pt-3 border-t border-warning/25 flex items-center gap-2 text-[12px] text-ink-soft">
          <CornerUpLeft className="h-3.5 w-3.5 text-warning-ink shrink-0" />
          Al recibir la respuesta, el caso vuelve a <span className="font-semibold text-ink">{vuelveA}</span>.
        </div>
      </div>

      <div className="mt-4">
        <DescriptionBlock description={caso.descripcion} />
      </div>

      {historicas.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2">
            Solicitudes anteriores ({historicas.length})
          </p>
          <div className="space-y-2">
            {historicas.map((s) => (
              <div key={s.id_solicitud} className="rounded-lg border border-line bg-surface/50 p-3">
                <p className="text-[12.5px] text-ink-soft">{s.mensaje}</p>
                {s.respuesta && (
                  <p className="mt-1.5 text-[12.5px] text-ink border-l-2 border-line-strong pl-2.5">{s.respuesta}</p>
                )}
                <p className="mt-1.5 text-[10.5px] text-ink-faint">
                  Respondida {s.fecha_respuesta ? formatDateTime(s.fecha_respuesta) : "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <EvidencePanel caso={caso} puedeAdjuntar compact />
      </div>

      <div className="mt-4 pt-4 border-t border-line-soft">
        <Field
          label="Registrar respuesta del reportante"
          hint="Transcriba lo que respondió el reportante. Al guardar, el caso vuelve a su etapa anterior."
        >
          <Textarea rows={3} placeholder="Detalle la información recibida…" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
        </Field>
        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            disabled={respond.isPending}
            onClick={() =>
              respond.mutate(
                { id_solicitud: solicitud.id_solicitud, respuesta: respuesta.trim() || undefined },
                {
                  onSuccess: () => {
                    toast.success(`Respuesta registrada, el caso vuelve a ${vuelveA}`);
                    setRespuesta("");
                  },
                  onError: (error) => toast.error(apiErrorMessage(error, "No se pudo registrar la respuesta")),
                }
              )
            }
          >
            Marcar como respondida
          </Button>
        </div>
      </div>
    </StageSection>
  );
}
