import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";

export interface CatalogDetalleAdmin {
  id_detalle: number;
  nombre: string;
  estado: boolean;
}

interface CatalogGroupAdmin {
  id_catalogo: number;
  nombre: string;
  catalogo_detalle: CatalogDetalleAdmin[];
}

async function fetchGroupAdmin(id_catalogo: number): Promise<CatalogGroupAdmin> {
  const { data } = await api.get<ApiEnvelope<CatalogGroupAdmin>>(`/catalogs/${id_catalogo}/admin`);
  if (!data.data) throw new Error("Catálogo no encontrado");
  return data.data;
}

/** Ítems (activos e inactivos) de un grupo de catálogo, para administrarlo desde el panel de Admin. */
export function useCatalogGroupAdmin(id_catalogo: number | undefined) {
  return useQuery({
    queryKey: ["catalog-group-admin", id_catalogo],
    queryFn: () => fetchGroupAdmin(id_catalogo!),
    enabled: id_catalogo != null,
  });
}

function useCatalogGroupMutation<TInput>(id_catalogo: number | undefined, fn: (input: TInput) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog-group-admin", id_catalogo] });
      queryClient.invalidateQueries({ queryKey: ["catalogs"] });
    },
  });
}

export function useCreateCatalogItem(id_catalogo: number | undefined) {
  return useCatalogGroupMutation<string>(id_catalogo, async (nombre) => {
    const { data } = await api.post(`/catalogs/${id_catalogo}/detalle`, { nombre });
    return data;
  });
}

export function useRenameCatalogItem(id_catalogo: number | undefined) {
  return useCatalogGroupMutation<{ id_detalle: number; nombre: string }>(id_catalogo, async ({ id_detalle, nombre }) => {
    const { data } = await api.patch(`/catalogs/detalle/${id_detalle}`, { nombre });
    return data;
  });
}

export function useDeactivateCatalogItem(id_catalogo: number | undefined) {
  return useCatalogGroupMutation<number>(id_catalogo, async (id_detalle) => {
    const { data } = await api.delete(`/catalogs/detalle/${id_detalle}`);
    return data;
  });
}

export function useRestoreCatalogItem(id_catalogo: number | undefined) {
  return useCatalogGroupMutation<number>(id_catalogo, async (id_detalle) => {
    const { data } = await api.post(`/catalogs/detalle/${id_detalle}/restaurar`);
    return data;
  });
}
