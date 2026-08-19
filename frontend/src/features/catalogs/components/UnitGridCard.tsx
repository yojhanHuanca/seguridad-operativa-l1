import { Plus, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/design-system/primitives/Button";
import { cn } from "@/lib/utils";
import type { CatalogDetalleAdmin } from "../hooks/useCatalogGroupAdmin";

/**
 * Un solo clic en la unidad abre el modal de edición (renombrar / activar /
 * desactivar) — nada escondido detrás de un hover, todo a la vista.
 */
function UnitButton({ item, onSelect }: { item: CatalogDetalleAdmin; onSelect: () => void }) {
  const activo = item.estado !== false;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex h-11 items-center justify-center rounded-lg border px-2 text-[12.5px] font-bold transition-colors",
        activo
          ? "border-brand-200 bg-brand-50/70 text-brand-800 hover:border-brand-400 hover:bg-brand-50"
          : "border-line-soft bg-surface text-ink-faint line-through hover:border-line-strong"
      )}
      title={activo ? item.nombre : `${item.nombre} (inactiva)`}
    >
      <span className="truncate">{item.nombre}</span>
    </button>
  );
}

export interface UnitGroup {
  title: string;
  items: CatalogDetalleAdmin[];
}

export function UnitGridCard({
  title,
  icon: Icon,
  groups,
  onCreate,
  onSelect,
}: {
  title: string;
  icon?: LucideIcon;
  groups: UnitGroup[];
  onCreate: () => void;
  onSelect: (item: CatalogDetalleAdmin) => void;
}) {
  const total = groups.reduce((acc, g) => acc + g.items.length, 0);

  if (total === 0) {
    return (
      <Card className="p-8 text-center text-[13px] text-ink-quiet">
        Sin registros todavía.
        <div className="mt-3">
          <Button size="sm" variant="outline" onClick={onCreate}>
            <Plus className="h-4 w-4" /> Nuevo
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] text-ink-quiet">{total} registradas en total · {title}</p>
        <Button size="sm" variant="outline" onClick={onCreate}>
          <Plus className="h-4 w-4" /> Nuevo
        </Button>
      </div>

      {groups.map((group) => {
        const activas = group.items.filter((i) => i.estado !== false).length;
        return (
          <Card key={group.title} className="overflow-hidden p-0">
            <div className="flex items-center gap-2.5 border-b border-line bg-surface/60 px-4 py-3">
              {Icon && (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-4 w-4" />
                </span>
              )}
              <div>
                <p className="text-[13px] font-semibold text-ink">{group.title}</p>
                <p className="mt-0.5 text-[11px] text-ink-quiet">
                  {group.items.length} unidades · {activas} activas
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {group.items.map((item) => (
                <UnitButton key={item.id_detalle} item={item} onSelect={() => onSelect(item)} />
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
