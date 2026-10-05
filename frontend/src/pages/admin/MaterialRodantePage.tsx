import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, TrainFront, Wrench } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/AdminShell";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Input, Select } from "@/design-system/primitives/Input";
import { api, apiErrorMessage } from "@/lib/api";
import { UnitEditModal } from "@/features/catalogs/components/UnitEditModal";
import { UnitGridCard } from "@/features/catalogs/components/UnitGridCard";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { useCatalogGroupAdmin, useDeactivateCatalogItem, useRestoreCatalogItem, type CatalogDetalleAdmin } from "@/features/catalogs/hooks/useCatalogGroupAdmin";

const groups = [{ key: "ALSTOM", name: "ALSTOM" }, { key: "ANSALDO", name: "ANSALDO" }, { key: "AUXILIAR", name: "Vehículos auxiliares" }, { key: "", name: "Sin clasificar" }];
export function AdminMaterialRodantePage() {
  const catalogs = useCatalogs();
  const id = catalogs.byName.get("Nro. MR")?.id_catalogo;
  const units = useCatalogGroupAdmin(id);
  const client = useQueryClient();
  const [editing, setEditing] = useState<CatalogDetalleAdmin | null>(null);
  const [search, setSearch] = useState("");
  const [classification, setClassification] = useState("");
  const [status, setStatus] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deactivate = useDeactivateCatalogItem(id);
  const restore = useRestoreCatalogItem(id);
  const save = useMutation({
    mutationFn: async (data: { nombre: string; clasificacion_mr?: string }) => {
      if (!id || !editing) throw new Error("No se pudo cargar el catálogo");
      if (editing.id_detalle === 0) await api.post(`/catalogs/${id}/detalle`, data);
      else await api.patch(`/catalogs/detalle/${editing.id_detalle}`, data);
    },
    onSuccess: async () => {
      await Promise.all([client.invalidateQueries({ queryKey: ["catalog-group-admin", id] }), client.invalidateQueries({ queryKey: ["catalogs"] })]);
      toast.success(editing?.id_detalle === 0 ? "Unidad registrada" : "Unidad actualizada");
      setEditing(null);
    },
    onError: cause => toast.error(apiErrorMessage(cause, "No se pudo guardar la unidad")),
  });
  const pending = save.isPending || deactivate.isPending || restore.isPending;
  const all = (units.data?.catalogo_detalle ?? []).filter(item => item.nombre.trim().toUpperCase() !== "N/A");
  const visible = all.filter(item => item.nombre.toLowerCase().includes(search.toLowerCase().trim()) && (!classification || (item.clasificacion_mr ?? "") === (classification === "UNCLASSIFIED" ? "" : classification)) && (!status || (item.estado !== false) === (status === "active")));
  const grouped = groups.map(group => ({ title: group.name, items: visible.filter(item => (item.clasificacion_mr ?? "") === group.key).sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { numeric: true })) })).filter(group => group.items.length);
  const toggle = async () => {
    if (!editing) return;
    setError(null);
    try {
      if (editing.estado === false) await restore.mutateAsync(editing.id_detalle);
      else await deactivate.mutateAsync(editing.id_detalle);
      toast.success(editing.estado === false ? "Unidad reactivada" : "Unidad desactivada");
      setConfirm(false); setEditing(null);
    } catch (cause) { setError(apiErrorMessage(cause, "No se pudo actualizar la unidad")); }
  };
  return <AdminShell>
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-3 h-4 w-4 text-ink-faint" /><Input aria-label="Buscar unidad" placeholder="Buscar código de unidad…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
      <Select aria-label="Filtrar clasificación" className="w-full sm:w-auto" value={classification} onChange={e => setClassification(e.target.value)}><option value="">Todas las clasificaciones</option>{groups.map(g => <option key={g.key} value={g.key || "UNCLASSIFIED"}>{g.name}</option>)}</Select>
      <Select aria-label="Filtrar estado" className="w-full sm:w-auto" value={status} onChange={e => setStatus(e.target.value)}><option value="">Activas e inactivas</option><option value="active">Activas</option><option value="inactive">Inactivas</option></Select>
    </div>
    {catalogs.isLoading || units.isLoading ? <LoadingState label="Cargando material rodante" compact /> : catalogs.isError || units.isError || !id ? <Card><p role="alert">No se pudo cargar el catálogo de material rodante.</p><Button onClick={() => { void catalogs.refetch(); void units.refetch(); }} variant="outline">Reintentar</Button></Card> : <UnitGridCard showStatus title="Material rodante" icon={classification === "AUXILIAR" ? Wrench : TrainFront} groups={grouped} onCreate={() => setEditing({ id_detalle: 0, nombre: "", estado: true, clasificacion_mr: groups.some(g => g.key === classification) ? classification : "" })} onSelect={setEditing} />}
    <UnitEditModal materialRodante open={!!editing && !confirm} item={editing} onClose={() => setEditing(null)} pending={pending} onSave={(nombre, clasificacion_mr) => save.mutate({ nombre, clasificacion_mr })} onToggleActivo={() => { setError(null); setConfirm(true); }} />
    <ConfirmDialog open={confirm} title={editing?.estado === false ? "¿Reactivar unidad?" : "¿Desactivar unidad?"} description="Los eventos existentes conservarán su referencia. Una unidad desactivada no estará disponible para nuevos registros." confirmLabel={editing?.estado === false ? "Reactivar" : "Desactivar"} pending={pending} error={error} onCancel={() => setConfirm(false)} onConfirm={() => void toggle()} />
  </AdminShell>;
}
