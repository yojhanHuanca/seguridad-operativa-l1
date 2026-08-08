import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Bell, CheckCircle2, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReports } from "@/features/reports/hooks/useReports";
import { useRespondInfo } from "@/features/cases/hooks/useCaseActions";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ReportListItem, SolicitudInformacion } from "@/features/reports/types";

interface RequestItem {
  report: ReportListItem;
  solicitud: SolicitudInformacion;
}

function formatDate(iso: string | null) {
  if (!iso) return "Fecha no disponible";
  return new Date(iso).toLocaleString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildRequestItems(reports: ReportListItem[] | undefined): RequestItem[] {
  return (reports ?? [])
    .flatMap((report) =>
      (report.solicitudes_informacion ?? []).map((solicitud) => ({ report, solicitud }))
    )
    .sort((a, b) => {
      const left = new Date(a.solicitud.fecha_solicitud ?? 0).getTime();
      const right = new Date(b.solicitud.fecha_solicitud ?? 0).getTime();
      return right - left;
    });
}

function PendingRequestCard({ item }: { item: RequestItem }) {
  const [respuesta, setRespuesta] = useState("");
  const respond = useRespondInfo(item.report.codigo_sop);
  const canSubmit = respuesta.trim().length >= 3;

  return (
    <Card className="border-warning/25 bg-warning-soft/30 p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning-ink">
          <Mail className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[12.5px] font-semibold text-ink">{item.report.codigo_sop}</span>
            <span className="text-[12px] text-ink-faint">·</span>
            <span className="truncate text-[12.5px] font-medium text-ink">{item.report.titulo || item.report.descripcion}</span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Solicitud:</span> {item.solicitud.mensaje}
          </p>
          <p className="mt-1.5 text-[11.5px] text-ink-quiet">Solicitada {formatDate(item.solicitud.fecha_solicitud)}</p>

          <div className="mt-3 space-y-2.5">
            <Textarea
              value={respuesta}
              onChange={(event) => setRespuesta(event.target.value)}
              placeholder="Escriba su respuesta para que Seguridad Operativa pueda continuar con la evaluación…"
              rows={4}
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11.5px] text-ink-quiet">Mínimo 3 caracteres. La respuesta quedará en el historial del caso.</p>
              <Button
                size="sm"
                disabled={!canSubmit || respond.isPending}
                onClick={() => {
                  respond.mutate(
                    { id_solicitud: item.solicitud.id_solicitud, respuesta: respuesta.trim() },
                    {
                      onSuccess: () => {
                        toast.success("Respuesta enviada a Seguridad Operativa");
                        setRespuesta("");
                      },
                      onError: (error) => toast.error(apiErrorMessage(error, "No se pudo enviar la respuesta")),
                    }
                  );
                }}
              >
                <Send className="h-4 w-4" /> Enviar respuesta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function NotificationRow({ item }: { item: RequestItem }) {
  const answered = item.solicitud.respondida;
  return (
    <Card className={cn("flex flex-row items-start gap-3 p-4", answered ? "bg-surface/40" : "bg-white")}>
      <div
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
          answered ? "bg-brand-50 text-brand-700" : "bg-warning-soft text-warning-ink"
        )}
      >
        {answered ? <CheckCircle2 className="h-4.5 w-4.5" /> : <AlertCircle className="h-4.5 w-4.5" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13.5px] font-semibold text-ink">
            {answered ? "Información enviada" : "Información solicitada"}
          </p>
          {!answered && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
        </div>
        <p className="mt-0.5 text-[12.5px] text-ink-soft">
          {item.report.codigo_sop} · {item.solicitud.mensaje}
        </p>
        {answered && item.solicitud.respuesta && (
          <p className="mt-1 rounded-lg bg-white/70 p-2 text-[12px] text-ink-soft">
            <span className="font-semibold text-ink">Respuesta:</span> {item.solicitud.respuesta}
          </p>
        )}
        <p className="mt-1 text-[11.5px] text-ink-faint">
          {answered ? formatDate(item.solicitud.fecha_respuesta) : formatDate(item.solicitud.fecha_solicitud)}
        </p>
      </div>
      <Link to={`/reportes/mis-reportes?codigo=${encodeURIComponent(item.report.codigo_sop)}`} className="shrink-0">
        <Button variant="ghost" size="sm">Ver caso</Button>
      </Link>
    </Card>
  );
}

export function NotificationsPage() {
  const { data: reports, isLoading } = useReports();
  const items = useMemo(() => buildRequestItems(reports), [reports]);
  const pending = items.filter((item) => !item.solicitud.respondida);

  return (
    <ReportanteShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-ink">Notificaciones</h1>
          <p className="mt-1 text-[13px] text-ink-quiet">
            Avisos sobre sus casos y solicitudes de Seguridad Operativa.
          </p>
        </div>
        {pending.length > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-3 py-1.5 text-[12px] font-semibold text-warning-ink">
            <Bell className="h-3.5 w-3.5" /> {pending.length} pendiente(s)
          </span>
        )}
      </div>

      {isLoading ? (
        <Card className="mt-5 p-10 text-center text-sm text-ink-quiet">Cargando notificaciones…</Card>
      ) : items.length === 0 ? (
        <Card className="mt-5 flex flex-col items-center gap-2 border-dashed p-14 text-center">
          <Bell className="h-8 w-8 text-ink-faint" />
          <p className="text-sm font-semibold text-ink">Sin notificaciones por ahora</p>
          <p className="max-w-sm text-[13px] text-ink-quiet">
            Cuando Seguridad Operativa solicite información sobre un reporte, aparecerá aquí para que pueda responder.
          </p>
        </Card>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="mt-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-warning-ink">
                Requiere su respuesta
              </p>
              <div className="space-y-3">
                {pending.map((item) => (
                  <PendingRequestCard key={item.solicitud.id_solicitud} item={item} />
                ))}
              </div>
            </div>
          )}

          <p className="mb-2.5 mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Actividad reciente
          </p>
          <div className="space-y-2">
            {items.map((item) => (
              <NotificationRow key={item.solicitud.id_solicitud} item={item} />
            ))}
          </div>
        </>
      )}
    </ReportanteShell>
  );
}