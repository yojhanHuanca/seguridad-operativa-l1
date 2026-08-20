import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { CaseListItem } from "../types";

/**
 * Variante paginada de `/cases`, separada a propósito de `useCases()`
 * (`useCases.ts`) — esa la siguen usando sin cambios el dashboard, los
 * indicadores, el mapa de incidentes, exportar y el badge del sidebar, que
 * necesitan el listado completo para sus totales/agregados. Solo la tabla de
 * `CasosPage` usa esta.
 */
export interface CasesPaginatedParams {
  estado?: string[];
  area?: number;
  search?: string;
  sort?: "recientes" | "prioridad" | "sla";
  page: number;
  limit: number;
}

export interface CasesPage {
  items: CaseListItem[];
  total: number;
}

async function fetchCasesPaginated(params: CasesPaginatedParams): Promise<CasesPage> {
  const { data } = await api.get<ApiEnvelope<CaseListItem[]>>("/cases", {
    params: {
      estado: params.estado?.length ? params.estado.join(",") : undefined,
      area: params.area,
      search: params.search || undefined,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
  return { items: data.data ?? [], total: data.meta?.total ?? data.data?.length ?? 0 };
}

export function useCasesPaginated(params: CasesPaginatedParams) {
  return useQuery({
    queryKey: ["cases-paginated", params],
    queryFn: () => fetchCasesPaginated(params),
    placeholderData: (previous) => previous,
  });
}
