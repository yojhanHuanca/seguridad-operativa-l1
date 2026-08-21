import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";

export interface CountItem {
  name: string;
  value: number;
}

export interface ChartSlice {
  name: string;
  value: number;
  color: string;
}

export interface IndicadoresResponse {
  totalReportes: number;
  reportesPorTipo: CountItem[];
  reportesCerradoVsProceso: ChartSlice[];
  planes: { total: number; abiertos: number; donut: ChartSlice[] };
  tendenciaMensual: { label: string; value: number }[];
  analisisRiesgo: ChartSlice[];
  planesAbiertosPorArea: ChartSlice[];
  vencimientoPlanesAbiertos: ChartSlice[];
  reprogramacionPlanesAbiertos: ChartSlice[];
}

async function fetchIndicadores(): Promise<IndicadoresResponse> {
  const { data } = await api.get<ApiEnvelope<IndicadoresResponse>>("/dashboard/indicadores");
  if (!data.data) throw new Error(data.message);
  return data.data;
}

/**
 * Números y gráficos de KPIs + Estadísticas, calculados en el servidor
 * (`/dashboard/indicadores`) sobre todo el histórico de casos — antes esto
 * lo calculaba cada navegador después de descargarse la lista completa.
 */
export function useIndicadores() {
  return useQuery({ queryKey: ["indicadores"], queryFn: fetchIndicadores });
}
