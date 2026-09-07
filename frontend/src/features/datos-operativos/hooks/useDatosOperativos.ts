import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";

export interface DatoOperativo {
  id_dato_operativo: number;
  fecha: string;
  qty_carreras: number;
  qty_pasajeros: number;
  km_comercial: number;
  km_no_comercial: number;
  paradas_estacion: number;
  created_at: string;
  updated_at: string;
}

export interface DatosOperativosInput {
  fecha: string;
  qty_carreras: number;
  qty_pasajeros: number;
  km_comercial: number;
  km_no_comercial: number;
  paradas_estacion: number;
}

interface DatosOperativosResponse {
  items: DatoOperativo[];
  total: number;
  page: number;
  limit: number;
}

export interface DatosOperativosFiltros {
  desde?: string;
  hasta?: string;
  page?: number;
  limit?: number;
}

async function fetchDatosOperativos(filtros: DatosOperativosFiltros): Promise<DatosOperativosResponse> {
  const { data } = await api.get<ApiEnvelope<DatosOperativosResponse>>("/datos-operativos", { params: filtros });
  if (!data.data) throw new Error(data.message);
  return data.data;
}

export function useDatosOperativos(filtros: DatosOperativosFiltros) {
  return useQuery({
    queryKey: ["datos-operativos", filtros],
    queryFn: () => fetchDatosOperativos(filtros),
  });
}

export function useCrearDatoOperativo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: DatosOperativosInput) => {
      const { data } = await api.post<ApiEnvelope<DatoOperativo>>("/datos-operativos", input);
      if (!data.data) throw new Error(data.message);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datos-operativos"] }),
  });
}

export function useActualizarDatoOperativo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: DatosOperativosInput }) => {
      const { data } = await api.put<ApiEnvelope<DatoOperativo>>(`/datos-operativos/${id}`, input);
      if (!data.data) throw new Error(data.message);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datos-operativos"] }),
  });
}

export function useEliminarDatoOperativo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/datos-operativos/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datos-operativos"] }),
  });
}
