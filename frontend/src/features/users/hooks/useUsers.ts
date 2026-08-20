import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { UserListItem } from "../types";

/**
 * Padrón completo, paginado en el servidor — a diferencia de Casos SOP,
 * Reportes o Planes de Acción, acá no hay ninguna otra pantalla que necesite
 * el listado entero para agregados propios, así que no tiene sentido dejar
 * un hook sin paginar en paralelo (terminaría sin consumidores, como pasó
 * con `usePlansPaginated` antes de conectarla a `JefeHome`).
 */
export interface UsersParams {
  search?: string;
  rol?: number;
  estado?: "activo" | "inactivo";
  page: number;
  limit: number;
}

export interface UsersPage {
  items: UserListItem[];
  total: number;
}

async function fetchUsers(params: UsersParams): Promise<UsersPage> {
  const { data } = await api.get<ApiEnvelope<UserListItem[]>>("/users", {
    params: {
      search: params.search || undefined,
      rol: params.rol,
      estado: params.estado,
      page: params.page,
      limit: params.limit,
    },
  });
  return { items: data.data ?? [], total: data.meta?.total ?? data.data?.length ?? 0 };
}

export function useUsers(params: UsersParams) {
  return useQuery({
    queryKey: ["users-paginado", params],
    queryFn: () => fetchUsers(params),
    placeholderData: (previous) => previous,
  });
}
