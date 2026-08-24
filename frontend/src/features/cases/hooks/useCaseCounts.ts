import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { CaseFilterId } from "../lib/filters";

export type CaseCounts = Record<CaseFilterId, number>;

const VACIO: CaseCounts = {
  todos: 0,
  nuevos: 0,
  vencidos: 0,
  investigacion: 0,
  proceso: 0,
  prorrogas: 0,
  verificacion: 0,
  cerrados: 0,
};

async function fetchCaseCounts(area?: number): Promise<CaseCounts> {
  const { data } = await api.get<ApiEnvelope<Partial<CaseCounts>>>("/cases/counts", {
    params: { area },
  });
  return { ...VACIO, ...data.data };
}

/** Conteos por pestaña, calculados en el servidor con `COUNT` — no trae filas. */
export function useCaseCounts(area?: number) {
  return useQuery({
    queryKey: ["case-counts", area],
    queryFn: () => fetchCaseCounts(area),
  });
}
