import { useAuth } from "@/features/auth/auth";

/**
 * Un Jefe de Área solo debe ver los planes de su propia área. El Admin
 * (incluso "viendo como" Jefe de Área vía el switcher) ve todos, sin filtrar,
 * porque su id_area no representa una área operativa real.
 */
export function useJefeAreaFilter(): number | undefined {
  const { user } = useAuth();
  if (user?.rol === "Jefe de Área") return user.id_area ?? undefined;
  return undefined;
}
