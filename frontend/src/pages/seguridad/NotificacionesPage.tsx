// Bandeja de notificaciones de Seguridad Operativa.
//
// A diferencia del Centro de Decisiones, aquí NO va lo que hay que decidir:
// va lo que ya pasó. Son eventos puntuales disparados por otras personas
// (el jefe aceptó un plan, pidió una prórroga, terminó la ejecución) que se
// marcan como leídos y se archivan. Lo accionable vive en /seguridad/decisiones
// y se deriva del estado del caso, no de eventos.
import { motion } from "framer-motion";
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  ClipboardList,
  CornerUpLeft,
  FileText,
  Inbox,
  MessageSquareWarning,
  Rocket,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { EmptyState } from "@/design-system/primitives/Progress";
import { Skeleton } from "@/design-system/primitives/Skeleton";
import { riseItem, staggerContainer } from "@/design-system/motion/variants";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  type Notificacion,
} from "@/features/notifications/hooks/useNotifications";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime, relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const ESTILO_POR_TIPO: Record<string, { icono: typeof Bell; tone: "brand" | "warning" | "critical" | "info" | "neutral" }> = {
  reporte_nuevo: { icono: Inbox, tone: "info" },
  plan_asignado: { icono: ClipboardList, tone: "brand" },
  plan_aceptado: { icono: CheckCircle2, tone: "brand" },
  prorroga_solicitada: { icono: Timer, tone: "warning" },
  prorroga_resuelta: { icono: Timer, tone: "brand" },
  ejecucion_completada: { icono: Rocket, tone: "brand" },
  plan_revisado: { icono: CheckCheck, tone: "brand" },
  caso_devuelto: { icono: CornerUpLeft, tone: "warning" },
  info_respondida: { icono: MessageSquareWarning, tone: "info" },
};

const POR_DEFECTO = { icono: FileText, tone: "neutral" as const };

export function SoNotificacionesPage() {
  const { data, isLoading } = useNotifications();
  const marcarLeida = useMarkNotificationRead();
  const marcarTodas = useMarkAllNotificationsRead();

  const items = data?.items ?? [];
  const noLeidas = data?.no_leidas ?? 0;

  return (
    <SeguridadOperativaShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-700 mb-1.5">Actividad del sistema</p>
          <h1 className="text-[22px] font-bold text-ink leading-tight tracking-tight">Notificaciones</h1>
          <p className="text-[13.5px] text-ink-quiet mt-1.5 max-w-2xl">
            Lo que hicieron las áreas y los reportantes. Para lo que requiere una decisión suya, vaya al Centro de Decisiones.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {noLeidas > 0 && (
            <Pill tone="critical" dot>
              {noLeidas} sin leer
            </Pill>
          )}
          <Button
            variant="ghost"
            size="sm"
            disabled={noLeidas === 0 || marcarTodas.isPending}
            onClick={() =>
              marcarTodas.mutate(undefined, {
                onSuccess: () => toast.success("Todas marcadas como leídas"),
                onError: (e) => toast.error(apiErrorMessage(e, "No se pudieron marcar")),
              })
            }
          >
            <CheckCheck className="h-4 w-4" /> Marcar todas como leídas
          </Button>
        </div>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-2.5 w-2/3" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={<Bell className="h-6 w-6" />}
            title="Sin notificaciones"
            description="Aquí aparecerán los avisos cuando un área acepte un plan, pida una prórroga o termine su ejecución."
          />
        ) : (
          <motion.div className="space-y-2.5" variants={staggerContainer} initial="hidden" animate="visible">
            {items.map((n) => (
              <FilaNotificacion
                key={n.id_notificacion}
                n={n}
                onLeer={() =>
                  marcarLeida.mutate(n.id_notificacion, {
                    onError: (e) => toast.error(apiErrorMessage(e, "No se pudo marcar como leída")),
                  })
                }
              />
            ))}
          </motion.div>
        )}
      </div>
    </SeguridadOperativaShell>
  );
}

function FilaNotificacion({ n, onLeer }: { n: Notificacion; onLeer: () => void }) {
  const estilo = ESTILO_POR_TIPO[n.tipo ?? ""] ?? POR_DEFECTO;
  const Icono = estilo.icono;
  const sinLeer = !n.leido;

  return (
    <motion.div variants={riseItem}>
      <Card className={cn("p-4 transition-colors", sinLeer && "border-brand-300 bg-brand-50/40")}>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "h-10 w-10 rounded-xl grid place-items-center shrink-0",
              estilo.tone === "critical" && "bg-critical-soft text-critical-ink",
              estilo.tone === "warning" && "bg-warning-soft text-warning-ink",
              estilo.tone === "info" && "bg-info-soft text-info-ink",
              estilo.tone === "brand" && "bg-brand-50 text-brand-700",
              estilo.tone === "neutral" && "bg-surface-2 text-ink-soft"
            )}
          >
            <Icono className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className={cn("text-[13.5px] leading-snug text-ink break-words", sinLeer ? "font-bold" : "font-semibold")}>{n.titulo}</p>
              {sinLeer && (
                <span className="h-2 w-2 rounded-full bg-brand-600 shrink-0" aria-label="Sin leer" />
              )}
            </div>
            <p className="mt-1 text-[12.5px] text-ink-soft leading-relaxed break-words">{n.mensaje}</p>
            {n.fecha && (
              <p className="mt-1.5 text-[11px] text-ink-faint" title={formatDateTime(n.fecha)}>
                {relativeTime(n.fecha)}
              </p>
            )}
          </div>

          {sinLeer && (
            <Button variant="ghost" size="sm" onClick={onLeer} className="shrink-0">
              Marcar leída
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
