import { Building2 } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { SimpleCatalogCard } from "@/features/catalogs/components/SimpleCatalogCard";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useCreateArea, useDeleteArea, useUpdateArea } from "@/features/catalogs/hooks/useAreaActions";

export function AdminAreasPage() {
  const { data: areas = [], isLoading } = useAreas();
  const createArea = useCreateArea();
  const updateArea = useUpdateArea();
  const deleteArea = useDeleteArea();

  return (
    <AdminShell>
      <p className="text-[12.5px] text-ink-quiet">Áreas responsables usadas en usuarios, casos y planes de acción.</p>

      <div className="mt-4">
        <SimpleCatalogCard
          title="Áreas"
          itemLabel="Área"
          icon={Building2}
          items={areas.map((a) => ({ id: a.id_area, nombre: a.nombre_area }))}
          isLoading={isLoading}
          creating={createArea.isPending}
          updating={updateArea.isPending}
          onCreate={(nombre_area) => createArea.mutateAsync(nombre_area)}
          onRename={(id_area, nombre_area) => updateArea.mutateAsync({ id_area, nombre_area })}
          onDelete={(id_area) => deleteArea.mutateAsync(id_area)}
        />
      </div>
    </AdminShell>
  );
}
