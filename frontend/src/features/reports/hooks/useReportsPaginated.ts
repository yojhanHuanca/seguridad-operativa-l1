import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ReportListItem } from "../types";

/**
 * Variante paginada de `/reports`, separada de `useReports()` (`useReports.ts`)
 * a propósito — esa la siguen usando sin cambios `ReportanteShell` (badge),
 * `ReportanteHomePage` (resumen) y `NotificationsPage` (solicitudes de
 * información completas), que necesitan el listado entero. Solo la tabla de
 * `MyReportsPage` usa esta.
 */
export interface ReportsPaginatedParams {
  filter?: "activos" | "pendientes_info" | "cerrados";
  search?: string;
  page: number;
  limit: number;
}

export interface ReportsPage {
  items: ReportListItem[];
  total: number;
}

async function fetchReportsPaginated(params: ReportsPaginatedParams): Promise<ReportsPage> {
  const { data } = await api.get<ApiEnvelope<ReportListItem[]>>("/reports", {
    params: {
      filter: params.filter,
      search: params.search || undefined,
      page: params.page,
      limit: params.limit,
    },
  });
  return { items: data.data ?? [], total: data.meta?.total ?? data.data?.length ?? 0 };
}

export function useReportsPaginated(params: ReportsPaginatedParams) {
  return useQuery({
    queryKey: ["reports-paginated", params],
    queryFn: () => fetchReportsPaginated(params),
    placeholderData: (previous) => previous,
  });
}
