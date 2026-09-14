import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ImportacionPayload, ImportacionPreview, ImportacionResult, ImportacionTipo } from "../types";

const ENDPOINTS: Record<ImportacionTipo, { validar: string; importar: string; queryKeys: string[] }> = {
  casos: {
    validar: "/importacion/casos/validar",
    importar: "/importacion/casos/importar",
    queryKeys: ["cases", "reports", "dashboard", "auditoria"],
  },
  monitoreo: {
    validar: "/importacion/monitoreo/validar",
    importar: "/importacion/monitoreo/importar",
    queryKeys: ["eventos", "eventos-paginado", "evento-counts", "dashboard", "auditoria"],
  },
  contingencias: {
    validar: "/importacion/contingencias/validar",
    importar: "/importacion/contingencias/importar",
    queryKeys: ["contingencias", "contingencia-catalogos", "dashboard", "auditoria"],
  },
};

async function validarImportacion(tipo: ImportacionTipo, payload: ImportacionPayload): Promise<ImportacionPreview> {
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
