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

async function fetchAuditoriaCounts(): Promise<Record<string, number>> {
  const { data } = await api.get<ApiEnvelope<Record<string, number>>>("/auditoria/counts");
  return data.data ?? {};
}

/** Cuántos registros hay por tipo de acción — para la franja de resumen, no la tabla. */
export function useAuditoriaCounts() {
  return useQuery({ queryKey: ["auditoria-counts"], queryFn: fetchAuditoriaCounts });
}
