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
