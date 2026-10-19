import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { UserListItem } from "../types";

export interface UsersParams {
  search?: string;
  rol?: number;
  estado?: "activo" | "inactivo";
  page: number;
  limit: number;
  /** Roles y permisos filtra permisos en memoria; necesita todas las páginas. */
  all?: boolean;
}

export interface UsersPage {
  items: UserListItem[];
  total: number;
}

async function fetchUsers(params: UsersParams): Promise<UsersPage> {
  const limit = params.all ? 100 : params.limit;
  const fetchPage = async (page: number): Promise<UsersPage> => {
    const { data } = await api.get<ApiEnvelope<UserListItem[]>>("/users", {
      params: {
        search: params.search || undefined,
        rol: params.rol,
        estado: params.estado,
        page,
        limit,
      },
    });
    return { items: data.data ?? [], total: data.meta?.total ?? data.data?.length ?? 0 };
  };

  const result = await fetchPage(params.all ? 1 : params.page);
  if (!params.all) return result;
  for (let page = 2; result.items.length < result.total; page += 1) {
    const next = await fetchPage(page);
    if (next.items.length === 0) throw new Error("El listado de usuarios cambió durante la carga. Intenta nuevamente.");
    result.items.push(...next.items);
    result.total = next.total;
  }
  return result;
}

export function useUsers(params: UsersParams) {
  return useQuery({
    queryKey: ["users-paginado", params],
    queryFn: () => fetchUsers(params),
    placeholderData: (previous) => previous,
  });
}
