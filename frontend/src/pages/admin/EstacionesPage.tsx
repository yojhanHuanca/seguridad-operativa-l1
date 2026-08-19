import { MapPinned, Wrench } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { SimpleCatalogCard } from "@/features/catalogs/components/SimpleCatalogCard";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import {
  useCatalogGroupAdmin,
  useCreateCatalogItem,
  useDeactivateCatalogItem,
  useRenameCatalogItem,
  useRestoreCatalogItem,
} from "@/features/catalogs/hooks/useCatalogGroupAdmin";
import { esTaller } from "@/lib/stations";

export function AdminEstacionesPage() {
  const { byName, isLoading: loadingGroups } = useCatalogs();
  const idCatalogo = byName.get("Lugar de Incidente")?.id_catalogo;

  const { data: group, isLoading: loadingItems } = useCatalogGroupAdmin(idCatalogo);
  const createItem = useCreateCatalogItem(idCatalogo);
  const renameItem = useRenameCatalogItem(idCatalogo);
  const deactivateItem = useDeactivateCatalogItem(idCatalogo);
  const restoreItem = useRestoreCatalogItem(idCatalogo);
  const isLoading = loadingGroups || loadingItems;

  const detalle = group?.catalogo_detalle ?? [];
  const estaciones = detalle.filter((d) => !esTaller(d.nombre) && d.nombre.trim().toLowerCase() !== "exteriores");
  const talleres = detalle.filter((d) => esTaller(d.nombre));

  return (
    <AdminShell>
      <p className="text-[12.5px] text-ink-quiet">
        Estaciones y talleres de la Línea 1 usados al registrar reportes, eventos y casos — la misma lista aparece en
        el mapa de Seguridad Operativa. Son dos cosas distintas, por eso van separadas: una estación es una parada de
        la línea; un taller es un patio de mantenimiento.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <SimpleCatalogCard
          title="Estaciones"
          itemLabel="Estación"
          icon={MapPinned}
          items={estaciones.map((d) => ({ id: d.id_detalle, nombre: d.nombre, activo: d.estado }))}
          isLoading={isLoading}
          creating={createItem.isPending}
          updating={renameItem.isPending}
          onCreate={(nombre) => createItem.mutateAsync(nombre)}
          onRename={(id_detalle, nombre) => renameItem.mutateAsync({ id_detalle, nombre })}
          onDeactivate={(id_detalle) => deactivateItem.mutateAsync(id_detalle)}
          onRestore={(id_detalle) => restoreItem.mutateAsync(id_detalle)}
        />

        <SimpleCatalogCard
          title="Talleres"
          itemLabel="Taller"
          icon={Wrench}
          items={talleres.map((d) => ({ id: d.id_detalle, nombre: d.nombre, activo: d.estado }))}
          isLoading={isLoading}
          creating={createItem.isPending}
          updating={renameItem.isPending}
          // El nombre tiene que empezar con "Taller" para que el mapa lo reconozca como tal y no como una parada más.
          onCreate={(nombre) => createItem.mutateAsync(nombre.trim().toLowerCase().startsWith("taller") ? nombre.trim() : `Taller ${nombre.trim()}`)}
          onRename={(id_detalle, nombre) => renameItem.mutateAsync({ id_detalle, nombre: nombre.trim().toLowerCase().startsWith("taller") ? nombre.trim() : `Taller ${nombre.trim()}` })}
          onDeactivate={(id_detalle) => deactivateItem.mutateAsync(id_detalle)}
          onRestore={(id_detalle) => restoreItem.mutateAsync(id_detalle)}
        />
      </div>
    </AdminShell>
  );
}
