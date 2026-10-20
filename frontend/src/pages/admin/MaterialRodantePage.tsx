import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, TrainFront, Wrench } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/AdminShell";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Input, Select } from "@/design-system/primitives/Input";
import { api, apiErrorMessage, type ApiEnvelope } from "@/lib/api";
import { UnitEditModal } from "@/features/catalogs/components/UnitEditModal";
import { UnitGridCard } from "@/features/catalogs/components/UnitGridCard";
import { SimpleNameModal } from "@/features/catalogs/components/SimpleNameModal";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { useCatalogGroupAdmin, useDeactivateCatalogItem, useRestoreCatalogItem, type CatalogDetalleAdmin } from "@/features/catalogs/hooks/useCatalogGroupAdmin";

const AUXILIAR = { value: "AUXILIAR", label: "Vehículos auxiliares / No aplica" };

export function AdminMaterialRodantePage() {
  const catalogs = useCatalogs();
  const id = catalogs.byName.get("Nro. MR")?.id_catalogo;
  const modelId = catalogs.byName.get("Modelo MR")?.id_catalogo;
  const units = useCatalogGroupAdmin(id);
  const models = useCatalogGroupAdmin(modelId);
  const client = useQueryClient();
  const [editing, setEditing] = useState<CatalogDetalleAdmin | null>(null);
  const [search, setSearch] = useState("");
  const [classification, setClassification] = useState("");
  const [status, setStatus] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [typeModalOpen, setTypeModalOpen] = useState(false);
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
  const createType = useMutation({
    mutationFn: async (nombre: string) => {
      if (!modelId) throw new Error("No se encontró el catálogo de tipos de tren");
      const { data } = await api.post<ApiEnvelope<unknown>>(`/catalogs/${modelId}/detalle`, { nombre });
      return data;
    },
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ["catalog-group-admin", modelId] }),
        client.invalidateQueries({ queryKey: ["catalogs"] }),
      ]);
      toast.success("Tipo o marca de tren registrado");
      setTypeModalOpen(false);
    },
    onError: cause => toast.error(apiErrorMessage(cause, "No se pudo registrar el tipo de tren")),
  });
  const pending = save.isPending || deactivate.isPending || restore.isPending;
  const all = (units.data?.catalogo_detalle ?? []).filter(item => item.nombre.trim().toUpperCase() !== "N/A");
  const activeModels = (models.data?.catalogo_detalle ?? []).filter(item => item.estado !== false);
  const modelNames = activeModels.map(item => item.nombre.trim().toUpperCase()).filter(name => name !== "N/A");
  const fromModels = modelNames.map(name => ({ value: name, label: name }));
  const currentTypes = all.map(item => item.clasificacion_mr).filter((value): value is string => !!value && value !== "AUXILIAR");
  const unknownExisting = [...new Set(currentTypes)].filter(name => !fromModels.some(option => option.value === name)).map(name => ({ value: name, label: `${name} (en uso)` }));
  const classificationOptions = [...fromModels, ...unknownExisting, AUXILIAR];
  const groups = [
    ...classificationOptions.map(option => ({ key: option.value, name: option.label })),
    { key: "", name: "Sin clasificar" },
  ];
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
  const cargando = catalogs.isLoading || units.isLoading || models.isLoading;
  const errorCarga = catalogs.isError || units.isError || models.isError || !id || !modelId;

  return <AdminShell>
    <div className="space-y-5">
      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface/60 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700"><TrainFront className="h-4.5 w-4.5" /></span>
            <div>
              <h2 className="text-[13.5px] font-semibold text-ink">Tipos y marcas de tren</h2>
              <p className="mt-0.5 text-[11.5px] text-ink-quiet">Agrega fabricantes o tipos para clasificarlos al registrar nuevas unidades.</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setTypeModalOpen(true)} disabled={!modelId || createType.isPending}>
            <Plus className="h-4 w-4" /> Agregar tipo o marca
          </Button>
        </div>
        {models.isLoading ? <LoadingState label="Cargando tipos de tren" compact /> : models.isError ? <p role="alert" className="px-4 py-3 text-[12.5px] text-critical">No se pudieron cargar los tipos de tren.</p> : <div className="flex flex-wrap gap-2 p-4">
          {activeModels.map(item => <span key={item.id_detalle} className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink-soft">{item.nombre.trim().toUpperCase() === "N/A" ? "Vehículos auxiliares / No aplica" : item.nombre}</span>)}
          {activeModels.length === 0 && <p className="text-[12.5px] text-ink-quiet">Todavía no hay tipos registrados.</p>}
        </div>}
      </Card>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-3 h-4 w-4 text-ink-faint" /><Input aria-label="Buscar unidad" placeholder="Buscar código de unidad…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
        <Select aria-label="Filtrar clasificación" className="w-full sm:w-auto" value={classification} onChange={e => setClassification(e.target.value)}><option value="">Todas las clasificaciones</option>{groups.filter(g => g.key).map(g => <option key={g.key} value={g.key}>{g.name}</option>)}<option value="UNCLASSIFIED">Sin clasificar</option></Select>
        <Select aria-label="Filtrar estado" className="w-full sm:w-auto" value={status} onChange={e => setStatus(e.target.value)}><option value="">Activas e inactivas</option><option value="active">Activas</option><option value="inactive">Inactivas</option></Select>
      </div>
      {cargando ? <LoadingState label="Cargando material rodante" compact /> : errorCarga ? <Card><p role="alert">No se pudo cargar el catálogo de material rodante.</p><Button onClick={() => { void catalogs.refetch(); void units.refetch(); void models.refetch(); }} variant="outline">Reintentar</Button></Card> : <UnitGridCard showStatus title="Material rodante" icon={classification === "AUXILIAR" ? Wrench : TrainFront} groups={grouped} onCreate={() => setEditing({ id_detalle: 0, nombre: "", estado: true, clasificacion_mr: groups.some(g => g.key === classification) ? classification : "" })} onSelect={setEditing} />}
    </div>
    <SimpleNameModal open={typeModalOpen} onClose={() => { if (!createType.isPending) setTypeModalOpen(false); }} title="Agregar tipo o marca de tren" fieldLabel="Nombre del tipo o marca" maxLength={30} pending={createType.isPending} onSubmit={nombre => createType.mutate(nombre)} />
    <UnitEditModal materialRodante classificationOptions={classificationOptions} open={!!editing && !confirm} item={editing} onClose={() => setEditing(null)} pending={pending} onSave={(nombre, clasificacion_mr) => save.mutate({ nombre, clasificacion_mr })} onToggleActivo={() => { setError(null); setConfirm(true); }} />
    <ConfirmDialog open={confirm} title={editing?.estado === false ? "¿Reactivar unidad?" : "¿Desactivar unidad?"} description="Los eventos existentes conservarán su referencia. Una unidad desactivada no estará disponible para nuevos registros." confirmLabel={editing?.estado === false ? "Reactivar" : "Desactivar"} pending={pending} error={error} onCancel={() => setConfirm(false)} onConfirm={() => void toggle()} />
  </AdminShell>;
}
