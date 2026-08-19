import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { CaseListItem } from "../types";

export interface CaseListParams {
  estado?: string[];
  area?: number;
  search?: string;
  sort?: "recientes" | "prioridad" | "sla";
}

async function fetchCases(params: CaseListParams): Promise<CaseListItem[]> {
  const { data } = await api.get<ApiEnvelope<CaseListItem[]>>("/cases", {
    params: {
      estado: params.estado?.length ? params.estado.join(",") : undefined,
      area: params.area,
      search: params.search || undefined,
      sort: params.sort,
    },
  });
  return data.data ?? [];
}

export function useCases(params: CaseListParams = {}) {
  return useQuery({
    queryKey: ["cases", params],
    queryFn: () => fetchCases(params),
  });
}
