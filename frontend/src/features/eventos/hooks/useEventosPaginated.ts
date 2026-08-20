import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { EstadoEvento, EventoListItem } from "../types";

/**
 * Variante paginada de `/eventos`, separada de `useEventos()` (`useEventos.ts`)
 * a propósito — esa la siguen usando sin cambios el Dashboard y Reportes de
 * Monitoreo, que necesitan el listado entero para sus propios agregados
 * (gráficos, exportación). Solo la tabla de `Historial` usa esta.
 */
export interface EventosPaginatedParams {
  estado?: EstadoEvento;
  search?: string;
  desde?: string;
  hasta?: string;
  page: number;
  limit: number;
}

export interface EventosPage {
  items: EventoListItem[];
  total: number;
}

async function fetchEventosPaginated(params: EventosPaginatedParams): Promise<EventosPage> {
  const { data } = await api.get<ApiEnvelope<EventoListItem[]>>("/eventos", {
    params: {
      estado: params.estado || undefined,
      search: params.search || undefined,
      desde: params.desde || undefined,
      hasta: params.hasta || undefined,
      page: params.page,
      limit: params.limit,
    },
  });
  return { items: data.data ?? [], total: data.meta?.total ?? data.data?.length ?? 0 };
}

export function useEventosPaginated(params: EventosPaginatedParams) {
  return useQuery({
    queryKey: ["eventos-paginado", params],
    queryFn: () => fetchEventosPaginated(params),
    placeholderData: (previous) => previous,
  });
}
