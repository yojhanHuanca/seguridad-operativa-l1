import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { EventoListItem } from "../types";

async function fetchEventos(): Promise<EventoListItem[]> {
  const { data } = await api.get<ApiEnvelope<EventoListItem[]>>("/eventos");
  return data.data ?? [];
}

export function useEventos() {
  return useQuery({ queryKey: ["eventos"], queryFn: fetchEventos });
}

async function fetchEvento(id: number): Promise<EventoListItem> {
  const { data } = await api.get<ApiEnvelope<EventoListItem>>(`/eventos/${id}`);
  if (!data.data) throw new Error(data.message);
  return data.data;
}

export function useEvento(id: number | undefined) {
  return useQuery({
    queryKey: ["eventos", id],
    queryFn: () => fetchEvento(id as number),
    enabled: id != null,
  });
}

async function fetchEventosAsignados(id_usuario: number): Promise<EventoListItem[]> {
  const { data } = await api.get<ApiEnvelope<EventoListItem[]>>(`/eventos/asignados/${id_usuario}`);
  return data.data ?? [];
}

/** Bandeja de eventos de Monitoreo asignados a una persona de Seguridad Operativa. */
export function useEventosAsignados(id_usuario: number | undefined) {
  return useQuery({
    queryKey: ["eventos", "asignados", id_usuario],
    queryFn: () => fetchEventosAsignados(id_usuario as number),
    enabled: id_usuario != null,
  });
}
