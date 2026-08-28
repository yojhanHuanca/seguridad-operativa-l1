// Lista de notificaciones, compartida entre roles (hoy Seguridad Operativa y
// Jefe de Área). Cada shell decide su propio layout y texto de cabecera; acá
// vive solo el listado, los estados de carga/vacío, agrupar repetidas y
// marcar como leída.
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  CornerUpLeft,
  FileText,
  Inbox,
  Loader2,
  MessageSquareWarning,
  Rocket,
  ShieldAlert,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
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
  evento_asignado: { icono: ShieldAlert, tone: "brand" },
};

const ETIQUETA_POR_TIPO: Record<string, string> = {
  reporte_nuevo: "reportes nuevos",
  plan_asignado: "planes asignados",
  plan_aceptado: "planes aceptados",
  prorroga_solicitada: "solicitudes de prórroga",
  prorroga_resuelta: "prórrogas resueltas",
  ejecucion_completada: "actualizaciones de ejecución",
  plan_revisado: "planes revisados",
  caso_devuelto: "casos devueltos",
  info_respondida: "respuestas de reportantes",
  evento_asignado: "eventos asignados",
};

const POR_DEFECTO = { icono: FileText, tone: "neutral" as const };

/**
 * Agrupa notificaciones consecutivas del mismo tipo en un solo bloque
 * plegable — sin esto, un día con muchos reportes nuevos deja la bandeja con
 * la misma fila repetida veinte veces seguidas. Solo agrupa bloques de 3 o
 * más: dos notificaciones seguidas no molestan, no vale la pena plegarlas.
 */
type Grupo = { tipo: string; items: Notificacion[] };
function agruparConsecutivas(items: Notificacion[]): (Notificacion | Grupo)[] {
  const resultado: (Notificacion | Grupo)[] = [];
  let i = 0;
  while (i < items.length) {
    const tipo = items[i]!.tipo ?? "";
    let j = i + 1;
    while (j < items.length && (items[j]!.tipo ?? "") === tipo) j++;
    const bloque = items.slice(i, j);
    if (bloque.length >= 3) resultado.push({ tipo, items: bloque });
    else resultado.push(...bloque);
    i = j;
  }
  return resultado;
}

export function NotificationsInbox({ description }: { description: string }) {
  const { data, isLoading, cargarMas, isFetching } = useNotifications();
  const marcarLeida = useMarkNotificationRead();
  const marcarTodas = useMarkAllNotificationsRead();

  const items = data?.items ?? [];
  const noLeidas = data?.no_leidas ?? 0;
  const grupos = agruparConsecutivas(items);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="max-w-2xl text-[13.5px] text-ink-quiet">{description}</p>
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
            description="Aquí aparecerán los avisos cuando haya novedades en tus casos o planes de acción."
          />
        ) : (
          <>
            <motion.div className="space-y-2.5" variants={staggerContainer} initial="hidden" animate="visible">
              {grupos.map((g) =>
                "items" in g ? (
                  <GrupoNotificacion
                    key={`grupo-${g.tipo}-${g.items[0]!.id_notificacion}`}
                    grupo={g}
                    onLeer={(id) =>
                      marcarLeida.mutate(id, {
                        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo marcar como leída")),
                      })
                    }
                  />
                ) : (
                  <FilaNotificacion
                    key={g.id_notificacion}
                    n={g}
                    onLeer={() =>
                      marcarLeida.mutate(g.id_notificacion, {
                        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo marcar como leída")),
                      })
                    }
                  />
                )
              )}
            </motion.div>

            {data?.hasMore && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" onClick={cargarMas} disabled={isFetching}>
                  {isFetching ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                  Cargar más
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
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

function GrupoNotificacion({ grupo, onLeer }: { grupo: Grupo; onLeer: (id: number) => void }) {
  const [abierto, setAbierto] = useState(false);
  const estilo = ESTILO_POR_TIPO[grupo.tipo] ?? POR_DEFECTO;
  const Icono = estilo.icono;
  const sinLeer = grupo.items.filter((n) => !n.leido);
  const etiqueta = ETIQUETA_POR_TIPO[grupo.tipo] ?? "notificaciones";
  const masReciente = grupo.items[0];

  return (
    <motion.div variants={riseItem}>
      <Card className={cn("overflow-hidden p-0 transition-colors", sinLeer.length > 0 && "border-brand-300")}>
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className={cn("flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-surface", sinLeer.length > 0 && "bg-brand-50/40")}
        >
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
              <p className={cn("text-[13.5px] leading-snug text-ink", sinLeer.length > 0 ? "font-bold" : "font-semibold")}>
                {grupo.items.length} {etiqueta}
              </p>
              {sinLeer.length > 0 && (
                <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
                  {sinLeer.length}
                </span>
              )}
            </div>
            <p className="mt-1 text-[12.5px] text-ink-soft leading-relaxed break-words">
              Más reciente: {masReciente!.mensaje}
            </p>
            {masReciente!.fecha && (
              <p className="mt-1.5 text-[11px] text-ink-faint" title={formatDateTime(masReciente!.fecha)}>
                {relativeTime(masReciente!.fecha)}
              </p>
            )}
          </div>

          <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform", abierto && "rotate-180")} />
        </button>

        {abierto && (
          <div className="space-y-2 border-t border-line-soft bg-surface/40 p-3">
            {grupo.items.map((n) => (
              <FilaNotificacion key={n.id_notificacion} n={n} onLeer={() => onLeer(n.id_notificacion)} />
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
