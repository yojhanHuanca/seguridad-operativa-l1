import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { UserBasic } from "../types";

/**
 * Directorio reducido (nombre, cargo, área, rol) que devuelve `/users/basicos`.
 *
 * Es el que deben usar los selectores de responsable de cualquier panel: el
 * padrón completo (`useUsers`, con correo y teléfono) quedó restringido al
 * Admin, así que pedirlo desde otro rol devuelve 403.
 */
async function fetchUsersBasicos(): Promise<UserBasic[]> {
  const { data } = await api.get<ApiEnvelope<UserBasic[]>>("/users/basicos");
  return data.data ?? [];
}

export function useUsersBasicos() {
  return useQuery({ queryKey: ["users", "basicos"], queryFn: fetchUsersBasicos });
}
