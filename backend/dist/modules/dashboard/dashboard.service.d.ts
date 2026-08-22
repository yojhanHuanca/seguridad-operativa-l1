import type { IndicadoresResponse } from "./dashboard.types.js";
/**
 * Todas las agregaciones de KPIs + Estadísticas en una sola consulta liviana:
 * solo los campos que se necesitan (sin evidencias, sin línea de tiempo, sin
 * historial de comentarios), calculadas acá en vez de en cada navegador.
 *
 * Es la misma lógica que antes vivía en
 * `frontend/src/features/indicadores/lib/aggregations.ts` sobre el listado
 * completo de casos — se mantiene ese archivo para la tabla de detalle
 * (que sí necesita fila por fila), pero los números y gráficos ya no
 * requieren bajar el histórico completo al navegador.
 */
export declare class DashboardService {
    static getIndicadores(): Promise<IndicadoresResponse>;
}
//# sourceMappingURL=dashboard.service.d.ts.map