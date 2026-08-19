import { useState } from "react";
import { Pencil, Plus, RotateCcw, Trash2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/design-system/primitives/Button";
import { cn } from "@/lib/utils";
import { apiErrorMessage } from "@/lib/api";
import { SimpleNameModal } from "./SimpleNameModal";
import type { SimpleCatalogItem } from "../types";

interface SimpleCatalogCardProps {
  title: string;
  itemLabel: string;
  items: SimpleCatalogItem[];
  isLoading: boolean;
  creating: boolean;
  updating: boolean;
  icon?: LucideIcon;
  onCreate: (nombre: string) => Promise<unknown>;
  onRename: (id: number, nombre: string) => Promise<unknown>;
  /** Si se pasa, "eliminar" hace soft-delete (toggle) y muestra ítems inactivos con opción de restaurar. */
  onDeactivate?: (id: number) => Promise<unknown>;
  onRestore?: (id: number) => Promise<unknown>;
  /** Si no hay onDeactivate, "eliminar" es un borrado real que el backend puede rechazar si está en uso. */
  onDelete?: (id: number) => Promise<unknown>;
}

const BADGE_TONES = [
  "bg-brand-100 text-brand-800",
  "bg-blue-50 text-blue-700",
  "bg-amber-50 text-amber-700",
  "bg-violet-50 text-violet-700",
  "bg-rose-50 text-rose-700",
  "bg-teal-50 text-teal-700",
];

function toneFor(nombre: string) {
  let hash = 0;
  for (let i = 0; i < nombre.length; i++) hash = (hash * 31 + nombre.charCodeAt(i)) >>> 0;
  return BADGE_TONES[hash % BADGE_TONES.length];
}

function initials(nombre: string) {
  const parts = nombre.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function SimpleCatalogCard({
  title,
  itemLabel,
  items,
  isLoading,
  creating,
  updating,
  icon: Icon,
  onCreate,
  onRename,
  onDeactivate,
  onRestore,
  onDelete,
}: SimpleCatalogCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SimpleCatalogItem | null>(null);

  const abrirCrear = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const abrirEditar = (item: SimpleCatalogItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const guardar = async (nombre: string) => {
    try {
      if (editing) {
        await onRename(editing.id, nombre);
        toast.success(`${itemLabel} actualizado`);
      } else {
        await onCreate(nombre);
        toast.success(`${itemLabel} creado`);
      }
      setModalOpen(false);
    } catch (error) {
      toast.error(apiErrorMessage(error, `No se pudo guardar el ${itemLabel.toLowerCase()}`));
    }
  };

  const eliminar = async (item: SimpleCatalogItem) => {
    try {
      if (onDeactivate) {
        await onDeactivate(item.id);
        toast.success(`${itemLabel} desactivado`);
      } else if (onDelete) {
        await onDelete(item.id);
        toast.success(`${itemLabel} eliminado`);
      }
    } catch (error) {
      toast.error(apiErrorMessage(error, `No se pudo eliminar "${item.nombre}"`));
    }
  };

  const restaurar = async (item: SimpleCatalogItem) => {
    if (!onRestore) return;
    try {
      await onRestore(item.id);
      toast.success(`${itemLabel} reactivado`);
    } catch (error) {
      toast.error(apiErrorMessage(error, "No se pudo reactivar"));
    }
  };

  const activos = items.filter((i) => i.activo !== false).length;

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface/60 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <Icon className="h-4.5 w-4.5" />
            </span>
          )}
          <div>
            <p className="text-[13.5px] font-semibold text-ink">{title}</p>
            <p className="mt-0.5 text-[11.5px] text-ink-quiet">
              {items.length} registrados{activos !== items.length ? ` · ${activos} activos` : ""}
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={abrirCrear}>
          <Plus className="h-4 w-4" /> Nuevo
        </Button>
      </div>

      {isLoading ? (
        <p className="p-8 text-center text-[13px] text-ink-quiet">Cargando...</p>
      ) : items.length === 0 ? (
        <p className="p-8 text-center text-[13px] text-ink-quiet">Sin registros todavía.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border border-line-soft bg-white px-3 py-2.5 transition-colors hover:border-line hover:bg-surface/50",
                item.activo === false && "opacity-60"
              )}
            >
              <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10.5px] font-semibold", toneFor(item.nombre))}>
                {initials(item.nombre)}
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-[12.5px] font-medium", item.activo === false ? "text-ink-faint line-through" : "text-ink")}>
                  {item.nombre}
                </p>
                {item.activo === false && <p className="text-[10.5px] font-medium text-ink-quiet">Inactivo</p>}
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => abrirEditar(item)}
                  className="grid h-7 w-7 place-items-center rounded-md text-ink-quiet hover:bg-surface-2 hover:text-brand-700"
                  aria-label={`Editar ${item.nombre}`}
                  title="Editar"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                {item.activo === false ? (
                  <button
                    type="button"
                    onClick={() => restaurar(item)}
                    className="grid h-7 w-7 place-items-center rounded-md text-ink-quiet hover:bg-surface-2 hover:text-brand-700"
                    aria-label={`Reactivar ${item.nombre}`}
                    title="Reactivar"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => eliminar(item)}
                    className="grid h-7 w-7 place-items-center rounded-md text-red-500 hover:bg-red-50 hover:text-red-700"
                    aria-label={`Eliminar ${item.nombre}`}
                    title="Eliminar"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <SimpleNameModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Editar ${itemLabel.toLowerCase()}` : `Nuevo ${itemLabel.toLowerCase()}`}
        fieldLabel="Nombre"
        initialValue={editing?.nombre ?? ""}
        pending={creating || updating}
        onSubmit={guardar}
      />
    </Card>
  );
}
