import type { ReactNode } from "react";
import { Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { EmptyState } from "@/design-system/primitives/Progress";
import { cn } from "@/lib/utils";
import { CONTINGENCIA_FIELDS, type ContingenciaField } from "../fields";
import type { ContingenciaListItem } from "../types";

interface Props {
  eventos: ContingenciaListItem[];
  isLoading?: boolean;
  onView: (evento: ContingenciaListItem) => void;
  onEdit: (evento: ContingenciaListItem) => void;
  onDelete: (evento: ContingenciaListItem) => void;
  isDeleting?: boolean;
  startIndex?: number;
}

type ContingenciaColumn = {
  header: string;
  render: (evento: ContingenciaListItem, index: number) => ReactNode;
  nowrap?: boolean;
  className?: string;
};

const value = (input: unknown) => input == null || input === "" ? "—" : String(input);

function fieldValue(evento: ContingenciaListItem, field: ContingenciaField) {
  if (field.name in evento) return value(evento[field.name as keyof ContingenciaListItem]);
  if (evento.atencion && field.name in evento.atencion) return value(evento.atencion[field.name as keyof typeof evento.atencion]);
  if (evento.traslado && field.name in evento.traslado) return value(evento.traslado[field.name as keyof typeof evento.traslado]);
  if (evento.persona && field.name in evento.persona) return value(evento.persona[field.name as keyof typeof evento.persona]);
  if (evento.diagnostico && field.name in evento.diagnostico) return value(evento.diagnostico[field.name as keyof typeof evento.diagnostico]);
  if (evento.cierre && field.name in evento.cierre) return value(evento.cierre[field.name as keyof typeof evento.cierre]);
  return "—";
}

const COLUMNAS_CONTINGENCIA: ContingenciaColumn[] = [
  { header: "N°", render: (evento) => evento.id_evento, nowrap: true, className: "font-semibold text-ink" },
  { header: "Mes", render: (evento) => evento.mes ?? "—", nowrap: true },
  ...CONTINGENCIA_FIELDS.map((field): ContingenciaColumn => ({
    header: field.label,
    render: (evento) => fieldValue(evento, field),
    nowrap: field.type !== "textarea" && !["breve_descripcion_hecho", "observacion", "sintomas_presentados"].includes(field.name),
  })),
];

export function ContingenciasTable({ eventos, isLoading, onView, onEdit, onDelete, isDeleting = false, startIndex = 0 }: Props) {
  const colSpan = COLUMNAS_CONTINGENCIA.length + 1;

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="max-h-[620px] overflow-auto">
        <table className="w-full min-w-[7600px] border-separate border-spacing-0 text-left text-[12.5px]">
          <caption className="sr-only">Historial de eventos de contingencia</caption>
          <thead className="sticky top-0 z-20">
            <tr className="border-b border-line bg-surface text-[10.5px] uppercase tracking-wide text-ink-quiet">
              {COLUMNAS_CONTINGENCIA.map((col, index) => (
                <th
                  key={col.header}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap border-b border-line bg-surface px-3 py-2.5 font-semibold",
                    index === 0 && "sticky left-0 z-30 shadow-[1px_0_0_var(--color-line)]"
                  )}
                >
                  {col.header}
                </th>
              ))}
              <th className="sticky right-0 z-30 whitespace-nowrap border-b border-line bg-surface px-3 py-2.5 text-right font-semibold shadow-[-1px_0_0_var(--color-line)]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={colSpan} className="px-3.5 py-10 text-center text-ink-quiet">
                  Cargando registros...
                </td>
              </tr>
            ) : eventos.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="p-4">
                  <EmptyState icon={<FileText className="h-5 w-5" />} title="No se encontraron eventos" description="Ajusta los filtros para ampliar la búsqueda." className="border-0 bg-transparent py-10" />
                </td>
              </tr>
            ) : (
              eventos.map((evento, rowIndex) => (
                <tr key={evento.id_evento} className="group">
                  {COLUMNAS_CONTINGENCIA.map((col, index) => {
                    const rendered = col.render(evento, startIndex + rowIndex);
                    return (
                      <td
                        key={col.header}
                        className={cn(
                          "border-b border-line-soft bg-white px-3 py-2.5 align-top text-ink-soft transition-colors group-hover:bg-surface/70",
                          col.nowrap ? "whitespace-nowrap" : "max-w-[320px]",
                          index === 0 && "sticky left-0 z-10 bg-white shadow-[1px_0_0_var(--color-line-soft)] group-hover:bg-surface/70",
                          col.className
                        )}
                        title={!col.nowrap && typeof rendered === "string" ? rendered : undefined}
                      >
                        <span className={col.nowrap ? undefined : "line-clamp-2"}>{rendered}</span>
                      </td>
                    );
                  })}
                  <td className="sticky right-0 z-10 whitespace-nowrap border-b border-line-soft bg-white px-3 py-2.5 transition-colors group-hover:bg-surface/70">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="Ver detalle"
                        aria-label={"Ver detalle del registro " + (startIndex + rowIndex + 1)}
                        onClick={() => onView(evento)}
                        className="grid h-7 w-7 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Editar"
                        aria-label={"Editar registro " + (startIndex + rowIndex + 1)}
                        onClick={() => onEdit(evento)}
                        className="grid h-7 w-7 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Eliminar"
                        aria-label={"Eliminar registro " + (startIndex + rowIndex + 1)}
                        onClick={() => onDelete(evento)}
                        disabled={isDeleting}
                        className="grid h-7 w-7 place-items-center rounded-lg text-critical-ink transition-colors hover:bg-critical-soft disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
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


