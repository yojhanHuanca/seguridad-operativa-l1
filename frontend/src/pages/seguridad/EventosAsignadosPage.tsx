import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ClipboardList, FileText, ShieldAlert } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { Modal } from "@/design-system/primitives/Modal";
import { EmptyState } from "@/design-system/primitives/Progress";
import { useEventosAsignados } from "@/features/eventos/hooks/useEventos";
import { useCurrentSoUser } from "@/features/users/hooks/useCurrentSoUser";
import { ESTADO_TONE } from "@/features/eventos/lib/estado";
import { CSV_HEADERS, filaCsv, nombreLugar, nombreTipo } from "@/features/eventos/lib/tabla";
import { NuevoReporteModal } from "@/features/reports/components/NuevoReporteModal";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EventoListItem } from "@/features/eventos/types";

function valorDetalle(value: unknown) {
  if (value === 0) return "0";
  if (value == null || value === "") return "—";
  return String(value);
}

function datosEnOrdenExcel(evento: EventoListItem) {
  const fila = filaCsv(evento);
  return CSV_HEADERS.map((label, index) => ({ label, value: fila[index] }));
}

type Pestana = "pendientes" | "historial";

export function EventosAsignadosPage() {
  const { user, isLoading: cargandoUsuario } = useCurrentSoUser();
  const { data: eventos, isLoading } = useEventosAsignados(user?.id_usuario);
  const [viendo, setViendo] = useState<EventoListItem | null>(null);
  const [creandoPara, setCreandoPara] = useState<EventoListItem | null>(null);
  const [pestana, setPestana] = useState<Pestana>("pendientes");

  const lista = eventos ?? [];
  // Ya se creó un hallazgo desde este evento en cuanto tiene un caso
  // vinculado (id_caso_creado) — ahí pasa de "por hacer" a historial, para
  // no repetir la misma tarjeta con las mismas opciones para siempre.
  const pendientes = lista.filter((e) => !e.id_caso_creado);
  const historial = lista.filter((e) => e.id_caso_creado);
  const visibles = pestana === "pendientes" ? pendientes : historial;

  return (
    <SeguridadOperativaShell>
      <div className="mb-4">
        <p className="text-[13px] text-ink-quiet">
          Eventos de Monitoreo que le asignaron a {user?.nombre ?? "usted"}. Revise el detalle y registre el hallazgo
          correspondiente.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-1 rounded-xl border border-line bg-white p-1 w-fit">
        <button
          type="button"
          onClick={() => setPestana("pendientes")}
          className={cn(
            "flex h-8 items-center gap-2 rounded-lg px-3 text-[12.5px] font-medium transition-colors",
            pestana === "pendientes" ? "bg-brand-700 text-white shadow-sm" : "text-ink-soft hover:bg-surface"
          )}
        >
          Pendientes
          <span className={cn("rounded-full px-1.5 py-0.5 text-[10.5px]", pestana === "pendientes" ? "bg-white/20 text-white" : "bg-surface-2 text-ink-quiet")}>
            {pendientes.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setPestana("historial")}
          className={cn(
            "flex h-8 items-center gap-2 rounded-lg px-3 text-[12.5px] font-medium transition-colors",
            pestana === "historial" ? "bg-brand-700 text-white shadow-sm" : "text-ink-soft hover:bg-surface"
          )}
        >
          Historial
          <span className={cn("rounded-full px-1.5 py-0.5 text-[10.5px]", pestana === "historial" ? "bg-white/20 text-white" : "bg-surface-2 text-ink-quiet")}>
            {historial.length}
          </span>
        </button>
      </div>

      {isLoading || cargandoUsuario ? (
        <Card className="p-8 text-center text-[13px] text-ink-quiet">Cargando…</Card>
      ) : visibles.length === 0 ? (
        <Card>
          <EmptyState
            icon={pestana === "pendientes" ? <ShieldAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            title={pestana === "pendientes" ? "No tiene eventos pendientes" : "Todavía no hay hallazgos registrados"}
            description={
              pestana === "pendientes"
                ? "Cuando Monitoreo le asigne un evento, aparecerá acá."
                : "Los eventos desde los que ya registró un hallazgo aparecen acá, con acceso directo a su expediente."
            }
          />
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {visibles.map((evento) => (
            <Card key={evento.id_evento} className="flex flex-col p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={ESTADO_TONE[evento.estado] ?? "neutral"} dot>{evento.estado}</Pill>
                </div>
                <p className="mt-1.5 truncate text-[13.5px] font-semibold text-ink">
                  {nombreTipo(evento)} · {nombreLugar(evento)}
                </p>
                <p className="mt-1 line-clamp-2 text-[12.5px] text-ink-quiet">{evento.descripcion || "Sin descripción."}</p>
                <p className="mt-1 text-[11.5px] text-ink-faint">{formatDate(evento.fecha)}</p>
              </div>
              <div className="mt-3 flex flex-col gap-2 border-t border-line-soft pt-3">
                {evento.casos_sop ? (
                  <Link to={`/seguridad/casos/${encodeURIComponent(evento.casos_sop.codigo_sop)}`}>
                    <Button size="sm" className="w-full">
                      <CheckCircle2 className="h-4 w-4" /> Ver hallazgo · {evento.casos_sop.codigo_sop}
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" className="w-full" onClick={() => setCreandoPara(evento)}>
                    <ClipboardList className="h-4 w-4" /> Crear hallazgo
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full" onClick={() => setViendo(evento)}>
                  <FileText className="h-4 w-4" /> Ver detalle
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!viendo}
        onClose={() => setViendo(null)}
        title={viendo ? `${nombreTipo(viendo)} · ${nombreLugar(viendo)}` : ""}
        subtitle="Detalle del evento asignado, en el mismo orden del Excel de Monitoreo."
        size="lg"
      >
        {viendo && (
          <>
            <CardHeader icon={<ClipboardList className="h-4.5 w-4.5" />} title="LISTA DE EVENTOS" className="mb-3" />
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
              {datosEnOrdenExcel(viendo).map((item) => (
                <div key={item.label} className="min-w-0 rounded-lg border border-line-soft bg-surface/45 px-3 py-2.5">
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">{item.label}</p>
                  <p className="mt-0.5 break-words text-[13px] font-medium text-ink">{valorDetalle(item.value)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </Modal>

      <NuevoReporteModal
        open={!!creandoPara}
        onClose={() => setCreandoPara(null)}
        idEventoMonitoreo={creandoPara?.id_evento}
      />
    </SeguridadOperativaShell>
  );
}
