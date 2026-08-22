import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";

export interface UserCounts {
  total: number;
  activos: number;
  conRol: number;
  sinRol: number;
  /** Usuarios asignados por rol, indexado por `id_rol` como texto. */
  porRol: Record<string, number>;
  /** Cuántos usuarios tienen cada permiso puntual activado (ver UserFormModal). */
  porPermiso: {
    es_responsable: number;
    puede_reabrir_casos: number;
    puede_rechazar_reportes: number;
  };
}

const VACIO: UserCounts = {
  total: 0,
  activos: 0,
  conRol: 0,
  sinRol: 0,
  porRol: {},
  porPermiso: { es_responsable: 0, puede_reabrir_casos: 0, puede_rechazar_reportes: 0 },
};

async function fetchUserCounts(): Promise<UserCounts> {
  const { data } = await api.get<ApiEnvelope<UserCounts>>("/users/counts");
  return { ...VACIO, ...data.data };
}

/** Conteos para las tarjetas de resumen y "Roles y Permisos" — solo `COUNT`, nunca trae filas. */
export function useUserCounts() {
  return useQuery({ queryKey: ["user-counts"], queryFn: fetchUserCounts });
}
