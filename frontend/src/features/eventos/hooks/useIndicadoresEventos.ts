import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";

export interface SerieMensual {
  key: string;
  label: string;
  eventos: number;
  /** `null` cuando falta cargar el divisor del índice, que no es lo mismo que cero. */
  indice: number | null;
}

export interface ConteoMesAnual {
  mes: number;
  anual: number;
}

export interface IndiceEventos {
  valor: number | null;
  tolerable: number | null;
  unidad: string;
  serie: SerieMensual[];
}

export interface IndicadoresEventos {
  periodo: { anio: number; mes: number | null };
  totalEventos: ConteoMesAnual;
  erroresOperativos: ConteoMesAnual;
  accidentabilidad: ConteoMesAnual;
  accidentabilidadSinDj: ConteoMesAnual;
  criticos: ConteoMesAnual & { detalle: { etiqueta: string; mes: number; anual: number }[] };
  indiceErrores: IndiceEventos;
  indiceAccidentabilidad: IndiceEventos;
  faltanDatos: string[];
}

async function fetchIndicadores(anio: number, mes: number): Promise<IndicadoresEventos> {
  const { data } = await api.get<ApiEnvelope<IndicadoresEventos>>("/eventos/indicadores", { params: { anio, mes } });
  if (!data.data) throw new Error(data.message);
  return data.data;
}

export function useIndicadoresEventos(anio: number, mes: number) {
  return useQuery({
    queryKey: ["eventos", "indicadores", anio, mes],
    queryFn: () => fetchIndicadores(anio, mes),
  });
}
