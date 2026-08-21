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
