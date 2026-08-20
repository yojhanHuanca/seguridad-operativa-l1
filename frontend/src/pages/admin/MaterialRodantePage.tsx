import { useState } from "react";
import { TrainFront, Wrench } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/AdminShell";
import { cn } from "@/lib/utils";
import { apiErrorMessage } from "@/lib/api";
import { UnitEditModal } from "@/features/catalogs/components/UnitEditModal";
import { UnitGridCard, type UnitGroup } from "@/features/catalogs/components/UnitGridCard";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import {
  useCatalogGroupAdmin,
  useCreateCatalogItem,
  useDeactivateCatalogItem,
  useRenameCatalogItem,
  useRestoreCatalogItem,
  type CatalogDetalleAdmin,
} from "@/features/catalogs/hooks/useCatalogGroupAdmin";

// La flota real de Línea 1: ANSALDO es T01-T05, ALSTOM es T06 en adelante
// (confirmado con el cliente). El catálogo no guarda a qué fabricante
// pertenece cada unidad (son dos catálogos separados, sin relación en la
// base), así que se agrupan por este corte fijo — cualquier unidad que se
// agregue de T06 para arriba cae en ALSTOM por defecto.
const CORTE_FABRICANTE = 5;

function numeroDeSerie(nombre: string): number | null {
  const m = nombre.trim().match(/^T0*(\d+)$/i);
  return m ? Number(m[1]) : null;
}

// "Auxiliar" es todo lo que no sea una serie T## ni el placeholder "N/A" —
// así cualquier nombre que se le ocurra escribir al Admin siempre aparece en
// alguna pestaña, nunca queda invisible por no matchear un patrón fijo.
const esVehiculoAuxiliar = (nombre: string) => numeroDeSerie(nombre) === null && nombre.trim().toUpperCase() !== "N/A";

type Tab = "series" | "auxiliares";

export function AdminMaterialRodantePage() {
  const [tab, setTab] = useState<Tab>("series");
  const [editing, setEditing] = useState<CatalogDetalleAdmin | null>(null);

  const { byName, isLoading: loadingGroups } = useCatalogs();
  const idModelo = byName.get("Modelo MR")?.id_catalogo;
  const idNumero = byName.get("Nro. MR")?.id_catalogo;

  const { data: modeloGroup } = useCatalogGroupAdmin(idModelo);
  const { data: numeroGroup, isLoading: loadingNumero } = useCatalogGroupAdmin(idNumero);

  const createItem = useCreateCatalogItem(idNumero);
  const renameItem = useRenameCatalogItem(idNumero);
  const deactivateItem = useDeactivateCatalogItem(idNumero);
  const restoreItem = useRestoreCatalogItem(idNumero);
  const pending = createItem.isPending || renameItem.isPending || deactivateItem.isPending || restoreItem.isPending;

  const items = numeroGroup?.catalogo_detalle ?? [];
  const fabricantes = (modeloGroup?.catalogo_detalle ?? []).filter((m) => m.nombre.trim().toUpperCase() !== "N/A");

  const series = items.filter((i) => numeroDeSerie(i.nombre) !== null);
  const auxiliares = items.filter((i) => esVehiculoAuxiliar(i.nombre));

  const alstom = fabricantes.find((f) => f.nombre.trim().toUpperCase() === "ALSTOM");
  const ansaldo = fabricantes.find((f) => f.nombre.trim().toUpperCase() === "ANSALDO");

  const seriesGroups: UnitGroup[] =
    alstom && ansaldo
      ? [
          { title: alstom.nombre, items: series.filter((i) => (numeroDeSerie(i.nombre) ?? 0) > CORTE_FABRICANTE) },
          { title: ansaldo.nombre, items: series.filter((i) => (numeroDeSerie(i.nombre) ?? 0) <= CORTE_FABRICANTE) },
        ]
      : [{ title: "Series", items: series }];

  const auxiliaresGroups: UnitGroup[] = [{ title: "Vehículos auxiliares", items: auxiliares }];

  const abrirCrear = () => setEditing({ id_detalle: 0, nombre: "", estado: true });
  const esNuevo = editing?.id_detalle === 0;

  const guardar = async (nombre: string) => {
    if (!editing) return;
    try {
      if (esNuevo) {
        await createItem.mutateAsync(nombre);
        toast.success("Unidad creada");
      } else {
        await renameItem.mutateAsync({ id_detalle: editing.id_detalle, nombre });
        toast.success("Unidad actualizada");
      }
      setEditing(null);
    } catch (error) {
      toast.error(apiErrorMessage(error, "No se pudo guardar la unidad"));
    }
  };

  const toggleActivo = async () => {
    if (!editing || esNuevo) return;
    try {
      if (editing.estado !== false) {
        await deactivateItem.mutateAsync(editing.id_detalle);
        toast.success(`${editing.nombre} desactivada`);
      } else {
        await restoreItem.mutateAsync(editing.id_detalle);
        toast.success(`${editing.nombre} reactivada`);
      }
      setEditing(null);
    } catch (error) {
      toast.error(apiErrorMessage(error, "No se pudo actualizar la unidad"));
    }
  };

  return (
    <AdminShell>
      <p className="text-[12.5px] text-ink-quiet">
        Trenes y vehículos auxiliares de Línea 1 usados al registrar eventos operativos.
      </p>

      <div className="mt-4 mb-4 flex items-center gap-1 rounded-xl border border-line bg-white p-1 w-fit">
        <button
          type="button"
          onClick={() => setTab("series")}
          className={cn(
            "flex h-9 items-center gap-2 rounded-lg px-3.5 text-[12.5px] font-medium transition-colors",
            tab === "series" ? "bg-brand-700 text-white shadow-sm" : "text-ink-soft hover:bg-surface"
          )}
        >
          <TrainFront className="h-4 w-4" /> Trenes (Series)
        </button>
        <button
          type="button"
          onClick={() => setTab("auxiliares")}
          className={cn(
            "flex h-9 items-center gap-2 rounded-lg px-3.5 text-[12.5px] font-medium transition-colors",
            tab === "auxiliares" ? "bg-brand-700 text-white shadow-sm" : "text-ink-soft hover:bg-surface"
          )}
        >
          <Wrench className="h-4 w-4" /> Vehículos Auxiliares
        </button>
      </div>

      {loadingGroups || loadingNumero ? (
        <p className="p-8 text-center text-[13px] text-ink-quiet">Cargando...</p>
      ) : (
        <UnitGridCard
          title={tab === "series" ? "Trenes (Series)" : "Vehículos Auxiliares"}
          icon={tab === "series" ? TrainFront : Wrench}
          groups={tab === "series" ? seriesGroups : auxiliaresGroups}
          onCreate={abrirCrear}
          onSelect={setEditing}
        />
      )}

      <UnitEditModal
        open={!!editing}
        onClose={() => setEditing(null)}
        item={editing}
        pending={pending}
        onSave={guardar}
        onToggleActivo={toggleActivo}
      />
    </AdminShell>
  );
}
