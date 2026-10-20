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

async function fetchEventosAsignados(id_usuario: number | undefined, todos: boolean): Promise<EventoListItem[]> {
  const ruta = todos ? "/eventos/asignados" : `/eventos/asignados/${id_usuario}`;
  const { data } = await api.get<ApiEnvelope<EventoListItem[]>>(ruta);
  return data.data ?? [];
}

/** Bandeja personal de SO; Admin puede consultar la bandeja global de asignaciones. */
export function useEventosAsignados(id_usuario: number | undefined, todos = false) {
  return useQuery({
    queryKey: ["eventos", "asignados", todos ? "todos" : id_usuario],
    queryFn: () => fetchEventosAsignados(id_usuario, todos),
    enabled: todos || id_usuario != null,
  });
}
