import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ImportacionHistorialItem, ImportacionPayload, ImportacionPreview, ImportacionResult, ImportacionTipo } from "../types";

const ENDPOINTS: Record<ImportacionTipo, { validar: string; importar: string; queryKeys: string[] }> = {
  casos: {
    validar: "/importacion/casos/validar",
    importar: "/importacion/casos/importar",
    queryKeys: ["cases", "reports", "dashboard", "auditoria", "importaciones-historial"],
  },
  monitoreo: {
    validar: "/importacion/monitoreo/validar",
    importar: "/importacion/monitoreo/importar",
    queryKeys: ["eventos", "eventos-paginado", "evento-counts", "dashboard", "auditoria", "importaciones-historial"],
  },
  contingencias: {
    validar: "/importacion/contingencias/validar",
    importar: "/importacion/contingencias/importar",
    queryKeys: ["contingencias", "contingencia-catalogos", "dashboard", "auditoria", "importaciones-historial"],
  },
};

export async function validarImportacion(tipo: ImportacionTipo, payload: ImportacionPayload): Promise<ImportacionPreview> {
  const { data } = await api.post<ApiEnvelope<ImportacionPreview>>(ENDPOINTS[tipo].validar, payload);
  if (!data.data) throw new Error("La API no devolvió la validación del archivo");
  return data.data;
}

async function importarRegistros(tipo: ImportacionTipo, payload: ImportacionPayload): Promise<ImportacionResult> {
  const { data } = await api.post<ApiEnvelope<ImportacionResult>>(ENDPOINTS[tipo].importar, payload);
  if (!data.data) throw new Error("La API no devolvió el resultado de importación");
  return data.data;
}

export function useValidarImportacion(tipo: ImportacionTipo = "casos") {
  return useMutation({ mutationFn: (payload: ImportacionPayload) => validarImportacion(tipo, payload) });
}

export function useImportarRegistros(tipo: ImportacionTipo = "casos") {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ImportacionPayload) => importarRegistros(tipo, payload),
    onSuccess: () => {
      for (const queryKey of ENDPOINTS[tipo].queryKeys) {
        void queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    },
  });
}

export function useImportarCasos() {
  return useImportarRegistros("casos");
}

export function useHistorialImportaciones() {
  return useQuery({
    queryKey: ["importaciones-historial"],
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<{ items: ImportacionHistorialItem[]; total: number }>>("/importacion/historial");
      if (!data.data) throw new Error("La API no devolvió el historial");
      return data.data;
    },
  });
}

export function useRevertirImportacion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, motivo }: { id: number; motivo: string }) => {
      const { data } = await api.post<ApiEnvelope<{ eliminados: number }>>(`/importacion/historial/${id}/revertir`, { motivo });
      if (!data.data) throw new Error("La API no devolvió el resultado de la reversión");
      return data.data;
    },
    onSuccess: async () => {
      await Promise.all(["importaciones-historial", "cases", "eventos", "contingencias", "auditoria"].map(key => client.invalidateQueries({ queryKey: [key] })));
    },
  });
}
