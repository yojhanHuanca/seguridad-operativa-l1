import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ConfiguracionGeneral, ConfiguracionPublica } from "../types";

export const DEFAULT_SYSTEM_NAME = "SIGMA L1";
export const DEFAULT_SYSTEM_VERSION = "1.0.0";

async function fetchConfiguracion(): Promise<ConfiguracionGeneral> {
  const { data } = await api.get<ApiEnvelope<ConfiguracionGeneral>>("/configuracion");
  if (!data.data) throw new Error("No se recibió configuración del servidor");
  return data.data;
}

async function fetchConfiguracionPublica(): Promise<ConfiguracionPublica> {
  const { data } = await api.get<ApiEnvelope<ConfiguracionPublica>>("/configuracion/publica");
  return data.data ?? { nombre: DEFAULT_SYSTEM_NAME, version: DEFAULT_SYSTEM_VERSION };
}

export function useConfiguracion() {
  return useQuery({
    queryKey: ["configuracion"],
    queryFn: fetchConfiguracion,
  });
}

export function useConfiguracionPublica() {
  return useQuery({
    queryKey: ["configuracion-publica"],
    queryFn: fetchConfiguracionPublica,
    staleTime: 5 * 60_000,
  });
}

export function nombreSistema(configuracion?: ConfiguracionGeneral | ConfiguracionPublica | null) {
  if (!configuracion) return DEFAULT_SYSTEM_NAME;
  if ("sistema" in configuracion) return configuracion.sistema.nombre.trim() || DEFAULT_SYSTEM_NAME;
  return configuracion.nombre.trim() || DEFAULT_SYSTEM_NAME;
}

export function useUpdateConfiguracion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ConfiguracionGeneral) => {
      const { data } = await api.patch<ApiEnvelope<ConfiguracionGeneral>>("/configuracion", payload);
      if (!data.data) throw new Error("No se recibió configuración actualizada");
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["configuracion"], data);
      queryClient.setQueryData(["configuracion-publica"], data.sistema);
      queryClient.invalidateQueries({ queryKey: ["auditoria"] });
      queryClient.invalidateQueries({ queryKey: ["auditoria-counts"] });
      queryClient.invalidateQueries({ queryKey: ["auditoria-tablas"] });
    },
  });
}
