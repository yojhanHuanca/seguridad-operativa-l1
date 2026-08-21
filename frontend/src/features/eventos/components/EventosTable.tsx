import type { ReactNode } from "react";
import { Eye, FileText, Pencil, ShieldAlert, Trash2 } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { Pill } from "@/design-system/primitives/Pill";
import { EmptyState } from "@/design-system/primitives/Progress";
import { cn } from "@/lib/utils";
import { ESTADO_TONE } from "../lib/estado";
import { nombreAsignado } from "../lib/tabla";
import type { EventoListItem } from "../types";

export interface EventoColumn {
  header: string;
  render: (evento: EventoListItem) => ReactNode;
  nowrap?: boolean;
  className?: string;
}

export function EventosTable({
  eventos,
  columns,
  isLoading,
  emptyTitle,
  emptyDescription,
  showEstado = true,
  onView,
  onEdit,
  onDelete,
  onAsignar,
}: {
  eventos: EventoListItem[];
  columns: EventoColumn[];
  isLoading?: boolean;
  emptyTitle: string;
  emptyDescription?: string;
  showEstado?: boolean;
  onView: (evento: EventoListItem) => void;
  /** Si no se pasan, la tabla queda de solo lectura (sin lápiz ni papelera) — ej. la vista de Seguridad Operativa. */
  onEdit?: (evento: EventoListItem) => void;
  onDelete?: (evento: EventoListItem) => void;
  /** Seguridad Operativa toma el evento y abre el hallazgo (caso SOP) desde acá mismo. */
  onAsignar?: (evento: EventoListItem) => void;
}) {
  const colSpan = columns.length + (showEstado ? 2 : 1);

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="max-h-[620px] overflow-auto">
        <table
          className={cn(
            "w-full border-separate border-spacing-0 text-left text-[12.5px]",
            columns.length > 12 ? "min-w-[2600px]" : "min-w-[980px]"
          )}
        >
          <thead className="sticky top-0 z-20">
            <tr className="border-b border-line bg-surface text-[10.5px] uppercase tracking-wide text-ink-quiet">
              {columns.map((col, index) => (
                <th
                  key={col.header}
                  className={cn(
                    "whitespace-nowrap border-b border-line bg-surface px-3 py-2.5 font-semibold",
                    index === 0 && "sticky left-0 z-30 shadow-[1px_0_0_var(--color-line)]"
                  )}
                >
                  {col.header}
                </th>
              ))}
              {showEstado && <th className="whitespace-nowrap border-b border-line bg-surface px-3 py-2.5 font-semibold">Estado</th>}
              <th className="sticky right-0 z-30 whitespace-nowrap border-b border-line bg-surface px-3 py-2.5 text-right font-semibold shadow-[-1px_0_0_var(--color-line)]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={colSpan} className="px-3.5 py-10 text-center text-ink-quiet">
                  Cargando eventos...
                </td>
              </tr>
            ) : eventos.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="p-4">
                  <EmptyState icon={<FileText className="h-5 w-5" />} title={emptyTitle} description={emptyDescription} className="border-0 bg-transparent py-10" />
                </td>
              </tr>
            ) : (
              eventos.map((evento) => (
                <tr key={evento.id_evento} className="group">
                  {columns.map((col, index) => {
                    const value = col.render(evento);
                    return (
                      <td
                        key={col.header}
                        className={cn(
                          "border-b border-line-soft bg-white px-3 py-2.5 align-top text-ink-soft transition-colors group-hover:bg-surface/70",
                          col.nowrap ? "whitespace-nowrap" : "max-w-[280px]",
                          index === 0 && "sticky left-0 z-10 bg-white shadow-[1px_0_0_var(--color-line-soft)] group-hover:bg-surface/70",
                          col.className
                        )}
                        title={!col.nowrap && typeof value === "string" ? value : undefined}
                      >
                        <span className={col.nowrap ? undefined : "line-clamp-2"}>{value}</span>
                      </td>
                    );
                  })}
                  {showEstado && (
                    <td className="whitespace-nowrap border-b border-line-soft bg-white px-3 py-2.5 transition-colors group-hover:bg-surface/70">
                      <Pill tone={ESTADO_TONE[evento.estado]} dot>{evento.estado}</Pill>
                    </td>
                  )}
                  <td className="sticky right-0 z-10 whitespace-nowrap border-b border-line-soft bg-white px-3 py-2.5 transition-colors group-hover:bg-surface/70">
                    <div className="flex items-center justify-end gap-1">
                      {onAsignar && (
                        nombreAsignado(evento) ? (
                          <span
                            title={`Ya asignado a ${nombreAsignado(evento)} — solo se puede asignar una vez`}
                            className="grid h-7 w-7 place-items-center rounded-lg text-ink-faint"
                            aria-label={`Ya asignado a ${nombreAsignado(evento)}`}
                          >
                            <ShieldAlert className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onAsignar(evento)}
                            title="Asignar a Seguridad Operativa"
                            className="grid h-7 w-7 place-items-center rounded-lg text-brand-700 transition-colors hover:bg-brand-50"
                            aria-label="Asignar a Seguridad Operativa"
                          >
                            <ShieldAlert className="h-3.5 w-3.5" />
                          </button>
                        )
                      )}
                      <button
                        type="button"
                        onClick={() => onView(evento)}
                        title="Ver detalle"
                        className="grid h-7 w-7 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
                        aria-label="Ver detalle"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(evento)}
                          title="Editar evento"
                          className="grid h-7 w-7 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
                          aria-label="Editar evento"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(evento)}
                          title="Eliminar evento"
                          className="grid h-7 w-7 place-items-center rounded-lg text-critical-ink transition-colors hover:bg-critical-soft"
                          aria-label="Eliminar evento"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
