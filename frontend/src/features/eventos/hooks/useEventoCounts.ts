import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";

export interface EventoCounts {
  total: number;
  registrados: number;
  enInvestigacion: number;
  cerrados: number;
}

const VACIO: EventoCounts = { total: 0, registrados: 0, enInvestigacion: 0, cerrados: 0 };

async function fetchEventoCounts(): Promise<EventoCounts> {
  const { data } = await api.get<ApiEnvelope<EventoCounts>>("/eventos/counts");
  return { ...VACIO, ...data.data };
}

/** Conteos por estado para las pestañas del Historial, calculados en el servidor con `COUNT` — no trae filas. */
export function useEventoCounts() {
  return useQuery({ queryKey: ["evento-counts"], queryFn: fetchEventoCounts });
}
