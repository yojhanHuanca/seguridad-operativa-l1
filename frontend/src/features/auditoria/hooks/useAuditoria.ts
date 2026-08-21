import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { AuditoriaItem } from "../types";

export interface AuditoriaParams {
  usuario?: number;
  tabla?: string;
  accion?: string;
  search?: string;
  desde?: string;
  hasta?: string;
  page: number;
  limit: number;
}

export interface AuditoriaPage {
  items: AuditoriaItem[];
  total: number;
}

async function fetchAuditoria(params: AuditoriaParams): Promise<AuditoriaPage> {
  const { data } = await api.get<ApiEnvelope<AuditoriaItem[]>>("/auditoria", {
    params: {
      usuario: params.usuario,
      tabla: params.tabla || undefined,
      accion: params.accion || undefined,
      search: params.search || undefined,
      desde: params.desde || undefined,
      hasta: params.hasta || undefined,
      page: params.page,
      limit: params.limit,
    },
  });
  return { items: data.data ?? [], total: data.meta?.total ?? data.data?.length ?? 0 };
}

/** Descarga el CSV con los mismos filtros que la tabla y dispara el guardado en el navegador. */
export async function descargarAuditoriaCsv(params: Omit<AuditoriaParams, "page" | "limit">) {
  const { data } = await api.get<Blob>("/auditoria/export", {
    params: {
      usuario: params.usuario,
      tabla: params.tabla || undefined,
      accion: params.accion || undefined,
      search: params.search || undefined,
      desde: params.desde || undefined,
      hasta: params.hasta || undefined,
    },
    responseType: "blob",
  });
  const url = URL.createObjectURL(data);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = `auditoria_${new Date().toISOString().slice(0, 10)}.csv`;
  enlace.click();
  URL.revokeObjectURL(url);
}

export function useAuditoria(params: AuditoriaParams) {
  return useQuery({
    queryKey: ["auditoria", params],
    queryFn: () => fetchAuditoria(params),
    placeholderData: (previous) => previous,
  });
}

async function fetchTablas(): Promise<string[]> {
  const { data } = await api.get<ApiEnvelope<string[]>>("/auditoria/tablas");
  return data.data ?? [];
}

/** Nombres de tabla que ya tienen algún registro — para llenar el filtro. */
export function useAuditoriaTablas() {
  return useQuery({ queryKey: ["auditoria-tablas"], queryFn: fetchTablas });
}
