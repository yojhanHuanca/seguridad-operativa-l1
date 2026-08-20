import { useAuth } from "@/features/auth/auth";
import { useUsersBasicos } from "./useUsersBasicos";
import type { UserBasic } from "../types";

export interface CurrentSoUser {
  user: UserBasic | null;
  nombre: string;
  cargo: string;
  correo: string;
  iniciales: string;
  isLoading: boolean;
}

/**
 * Analista de Seguridad Operativa en sesión — se resuelve por el usuario
 * autenticado (useAuth), buscando su registro en el directorio reducido para
 * completar el cargo. La cabecera, el menú y el registro de reportes leen de
 * acá, así que todos muestran y firman con la cuenta que realmente inició
 * sesión, no con "el primer SO que haya en la base".
 *
 * El correo sale del token, no del directorio: `/users/basicos` ya no expone
 * datos de contacto.
 */
export function useCurrentSoUser(): CurrentSoUser {
  const { user: authUser } = useAuth();
  const { data: users, isLoading } = useUsersBasicos();

  const user = users?.find((u) => u.id_usuario === authUser?.id_usuario) ?? null;

  const nombre = user?.nombre ?? authUser?.nombre ?? "Analista SO";

  return {
    user,
    nombre,
    cargo: user?.cargo ?? "Seguridad Operativa",
    correo: authUser?.correo ?? "",
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
