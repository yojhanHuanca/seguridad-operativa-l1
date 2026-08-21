import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ImportacionPayload, ImportacionPreview, ImportacionResult } from "../types";

async function validarImportacion(payload: ImportacionPayload): Promise<ImportacionPreview> {
  const { data } = await api.post<ApiEnvelope<ImportacionPreview>>("/importacion/casos/validar", payload);
  if (!data.data) throw new Error("La API no devolvió la validación del archivo");
  return data.data;
}

async function importarCasos(payload: ImportacionPayload): Promise<ImportacionResult> {
  const { data } = await api.post<ApiEnvelope<ImportacionResult>>("/importacion/casos/importar", payload);
  if (!data.data) throw new Error("La API no devolvió el resultado de importación");
  return data.data;
}

export function useValidarImportacion() {
  return useMutation({ mutationFn: validarImportacion });
}

export function useImportarCasos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: importarCasos,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["cases"] });
      void queryClient.invalidateQueries({ queryKey: ["reports"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      void queryClient.invalidateQueries({ queryKey: ["auditoria"] });
    },
  });
}
