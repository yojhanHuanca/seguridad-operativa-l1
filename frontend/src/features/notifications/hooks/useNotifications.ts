import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";

/** Debe coincidir con TipoNotificacion del backend: decide icono y color. */
export type TipoNotificacion =
  | "reporte_nuevo"
  | "plan_asignado"
  | "plan_aceptado"
  | "prorroga_solicitada"
  | "prorroga_resuelta"
  | "ejecucion_completada"
  | "plan_revisado"
  | "caso_devuelto"
  | "info_respondida"
  | "evento_asignado";

export interface Notificacion {
  id_notificacion: number;
  usuario: number;
  titulo: string | null;
  mensaje: string | null;
  tipo: string | null;
  leido: boolean | null;
  fecha: string | null;
}

interface BandejaNotificaciones {
  id_usuario: number;
  no_leidas: number;
  items: Notificacion[];
}

async function fetchNotifications(): Promise<BandejaNotificaciones> {
  const { data } = await api.get<ApiEnvelope<BandejaNotificaciones>>("/notifications");
  return data.data ?? { id_usuario: 0, no_leidas: 0, items: [] };
}

/**
 * Bandeja del usuario conectado.
 *
 * TODO(auth): el backend resuelve hoy el destinatario por rol porque no hay
 * sesión; cuando exista login, la clave de la query debe incluir el usuario
 * para no compartir caché entre cuentas.
 */
export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    // Las notificaciones nacen de acciones de otras personas, así que no
    // llegan por invalidación local: hay que ir a buscarlas cada tanto.
    refetchInterval: 60_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.patch(`/notifications/${id}/read`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.patch("/notifications/read-all");
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}
