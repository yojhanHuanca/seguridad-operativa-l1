import { useUsers } from "./useUsers";
import type { UserListItem } from "../types";

export interface CurrentSoUser {
  user: UserListItem | null;
  nombre: string;
  cargo: string;
  correo: string;
  iniciales: string;
  isLoading: boolean;
}

/**
 * Analista de Seguridad Operativa "en sesión".
 *
 * TODO(auth): mientras no exista login real se resuelve por rol —el primer
 * usuario con el rol de Seguridad Operativa—, igual que el resto del portal.
 * Cuando haya sesión, esta función es el único punto que hay que cambiar: la
 * cabecera, el menú y el registro de reportes ya leen de aquí, así que todos
 * mostrarán y firmarán con el mismo usuario.
 */
export function useCurrentSoUser(): CurrentSoUser {
  const { data: page, isLoading } = useUsers({ page: 1, limit: 1000 });
  const users = page?.items;

  const user =
    users?.find((u) => u.roles?.nombre_rol === "Seguridad Operativa") ??
    users?.find((u) => u.cargo?.toLowerCase().includes("seguridad operativa")) ??
    null;

  const nombre = user?.nombre ?? "Analista SO";

  return {
    user,
    nombre,
    cargo: user?.cargo ?? "Seguridad Operativa",
    correo: user?.correo ?? "",
    iniciales: initialsFromName(nombre),
    isLoading,
  };
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
