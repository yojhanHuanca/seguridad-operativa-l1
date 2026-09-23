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
  });
}

export function useAuditoriaActores() {
  return useQuery({
    queryKey: ["auditoria-actores"],
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<{ id_usuario: number; nombre: string; codigo_usuario: string; estado: string | null }[]>>("/auditoria/actores");
      return data.data ?? [];
    },
  });
}

export async function exportarAuditoria(params: Omit<AuditoriaParams, "page" | "limit">) {
  // Text preserves JSON error envelopes while avoiding a second, unauthenticated download.
  const { data } = await api.get<string>("/auditoria/export", { params, responseType: "text" });
  const url = URL.createObjectURL(new Blob([data], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `auditoria_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
