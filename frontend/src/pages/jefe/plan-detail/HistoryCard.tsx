import { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { formatDate } from "@/lib/format";
import type { PlanItem } from "@/features/plans/types";
import { planUpdates } from "@/features/plans/lib/planDetailFlow";
import { MiniaturaAnexo } from "@/features/plans/components/PlanDetailParts";

/** Incluye el cierre original, no solo las adicionales: el jefe tiene
    que poder releer lo que envio antes de agregar una correccion. */
export function HistoryCard({ plan }: { plan: PlanItem }) {
  const [historialAbierto, setHistorialAbierto] = useState(true);
  const actualizaciones = planUpdates(plan);

  if (actualizaciones.length === 0) return null;

  return (
    <Card className="border-line-soft shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">
            <FileText className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="text-[17px] font-semibold text-ink">Historial enviado</h2>
            <p className="mt-0.5 text-[13px] text-ink-quiet">
              Las descripciones ya enviadas quedan bloqueadas; cualquier corrección se agrega como nuevo registro.
            </p>
          </div>
        </div>

        {/* El historial puede llegar a cinco registros con sus evidencias:
            se puede plegar para no empujar el resto de la pantalla. */}
        <button
          type="button"
          onClick={() => setHistorialAbierto((v) => !v)}
          aria-expanded={historialAbierto}
          aria-label={historialAbierto ? "Ocultar historial" : "Mostrar historial"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
        >
          {historialAbierto ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {historialAbierto && (
        <div className="mt-4 space-y-3">
          {actualizaciones.map((registro) => (
            <div key={registro.id} className="rounded-xl border border-line-soft bg-surface/50 px-4 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-ink">{registro.etiqueta}</p>
                <span className="text-[12px] text-ink-faint">
                  {registro.fecha ? formatDate(registro.fecha) : "Sin fecha"}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-ink break-words">
                {registro.descripcion || "Sin descripción registrada."}
              </p>
              {registro.evidencias.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {registro.evidencias.map((anexo) => (
                    <MiniaturaAnexo key={anexo.id_anexo} anexo={anexo} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
