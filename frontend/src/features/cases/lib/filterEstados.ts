import type { CaseFilterId } from "./filters";

/**
 * Traduce cada `CaseFilterId` a los nombres literales de `estado_hallazgo`
 * que el backend puede filtrar directamente (`?estado=a,b,c`). Debe coincidir
 * con el `match` de cada filtro en `filters.ts`, que a su vez se basa en
 * `stageFromEstado`/`STAGE_BY_ESTADO` de `../domain.ts` — y con los mismos
 * grupos que arma `CaseRepository.counts()` en el backend. Si se agrega o
 * renombra un estado en cualquiera de esos lugares, hay que actualizar los
 * tres.
 */
export const ESTADOS_POR_FILTRO: Partial<Record<CaseFilterId, string[]>> = {
  nuevos: ["Recepción", "Evaluación", "En Proceso"],
  pendientes: ["Pendiente de Información"],
  investigacion: ["Investigación"],
  proceso: ["Plan de Acción", "Ejecución", "Prórroga Solicitada"],
  prorrogas: ["Prórroga Solicitada"],
  verificacion: ["Verificación"],
  cerrados: ["Cerrado", "Rechazado"],
  // "todos" no tiene entrada: sin restricción de estado.
};
