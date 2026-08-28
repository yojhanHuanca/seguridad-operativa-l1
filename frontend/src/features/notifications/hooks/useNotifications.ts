import { useState } from "react";
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
  hasMore: boolean;
}

async function fetchNotifications(limit: number): Promise<BandejaNotificaciones> {
  const { data } = await api.get<ApiEnvelope<BandejaNotificaciones>>("/notifications", { params: { limit } });
  return data.data ?? { id_usuario: 0, no_leidas: 0, items: [], hasMore: false };
}

const PAGE_SIZE = 20;

/**
 * Bandeja del usuario conectado. El destinatario sale del token — no hace
 * falta pasarlo.
 *
 * "Cargar más" no pagina de verdad (no hay cursor): simplemente pide una
 * página más grande. Para una bandeja de notificaciones alcanza y evita
 * tener que fusionar páginas a mano contra el polling de 60s.
 */
export function useNotifications() {
  const [limit, setLimit] = useState(PAGE_SIZE);
  const query = useQuery({
    queryKey: ["notifications", limit],
    queryFn: () => fetchNotifications(limit),
    // Las notificaciones nacen de acciones de otras personas, así que no
    // llegan por invalidación local: hay que ir a buscarlas cada tanto.
    refetchInterval: 60_000,
  });

  return { ...query, cargarMas: () => setLimit((l) => l + PAGE_SIZE) };
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
