import type { EstadoEvento, EventoListItem } from "../types";

/**
 * Solo 3 estados posibles (confirmado con el cliente): Registrado (inicial),
 * En investigación (cuando Seguridad Operativa lo asigna) y Cerrado (cuando
 * se cierran todos los planes de acción). No inventar estados nuevos.
 */
export const ESTADO_TONE: Record<EstadoEvento, "info" | "warning" | "success"> = {
  Registrado: "info",
  "En investigación": "warning",
  Cerrado: "success",
};

/** Conteo por estado — usado en el Dashboard y en Reportes para las mismas 4 tarjetas de estadísticas. */
export function contarEventosPorEstado(eventos: EventoListItem[]) {
  return {
    total: eventos.length,
    registrados: eventos.filter((e) => e.estado === "Registrado").length,
    enInvestigacion: eventos.filter((e) => e.estado === "En investigación").length,
    cerrados: eventos.filter((e) => e.estado === "Cerrado").length,
  };
}
