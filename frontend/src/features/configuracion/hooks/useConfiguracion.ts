import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ConfiguracionGeneral, ConfiguracionPublica } from "../types";
import { parseConfiguration, parsePublicConfiguration } from "../response";

export const DEFAULT_SYSTEM_NAME = "SMS L1";
export const DEFAULT_SYSTEM_VERSION = "1.0.0";

async function fetchConfiguracion(): Promise<ConfiguracionGeneral> {
  const { data } = await api.get<ApiEnvelope<ConfiguracionGeneral>>("/configuracion");
  if (!data.data) throw new Error("No se recibió configuración del servidor");
  return parseConfiguration(data.data);
}

async function fetchConfiguracionPublica(): Promise<ConfiguracionPublica> {
  const { data } = await api.get<ApiEnvelope<ConfiguracionPublica>>("/configuracion/publica");
  return parsePublicConfiguration(data.data);
}

function getCachedPublicConfig(): ConfiguracionPublica | undefined {
  try {
    const cached = localStorage.getItem("configuracion-publica-cache");
    if (cached) return JSON.parse(cached) as ConfiguracionPublica;
  } catch {
    // ignore parse errors
  }
  return undefined;
}

export function useConfiguracion() {
  return useQuery({
    queryKey: ["configuracion"],
    queryFn: fetchConfiguracion,
    placeholderData: () => undefined,
  });
}

export function useConfiguracionPublica() {
  const cached = getCachedPublicConfig();
  return useQuery({
    queryKey: ["configuracion-publica"],
    queryFn: fetchConfiguracionPublica,
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    placeholderData: cached,
    initialData: cached,
  });
}

export function nombreSistema(configuracion?: ConfiguracionGeneral | ConfiguracionPublica | null) {
  if (!configuracion) return DEFAULT_SYSTEM_NAME;
  const nombre = "sistema" in configuracion ? configuracion.sistema?.nombre : configuracion.nombre;
  return typeof nombre === "string" ? nombre.trim() || DEFAULT_SYSTEM_NAME : DEFAULT_SYSTEM_NAME;
}

export function useUpdateConfiguracion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ConfiguracionGeneral) => {
      const { data } = await api.patch<ApiEnvelope<ConfiguracionGeneral>>("/configuracion", payload);
      if (!data.data) throw new Error("No se recibió configuración actualizada");
      return parseConfiguration(data.data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["configuracion"], data);
      queryClient.setQueryData(["configuracion-publica"], data.sistema);
      try {
        localStorage.setItem("configuracion-publica-cache", JSON.stringify(data.sistema));
      } catch {
        // ignore
      }
      queryClient.invalidateQueries({ queryKey: ["auditoria"] });
      queryClient.invalidateQueries({ queryKey: ["auditoria-counts"] });
      queryClient.invalidateQueries({ queryKey: ["auditoria-tablas"] });
    },
  });
}
