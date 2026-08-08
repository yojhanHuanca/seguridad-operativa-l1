// Filtros de la bandeja de Gestión de Reportes.
//
// Fuente única compartida por el menú lateral y las pestañas de la bandeja.
// Antes cada uno tenía su propia lista y los ids no coincidían: el sidebar
// enlazaba a `?filtro=nuevo`, `?filtro=pendiente` y `?filtro=cerrado`, mientras
// que la bandeja los llamaba `nuevos`, `pendientes` y `cerrados`, así que esos
// tres botones caían silenciosamente en "Todos". Teniendo un solo array, los
// ids ya no pueden desincronizarse.
import type { Stage } from "../domain";

export type CaseFilterId =
  | "todos"
  | "nuevos"
  | "pendientes"
  | "investigacion"
  | "proceso"
  | "prorrogas"
  | "verificacion"
  | "cerrados";

/**
 * Forma mínima que necesita un filtro. `CaseRow` la cumple estructuralmente,
 * así que este módulo no depende del adaptador (y no hay ciclo de imports).
 */
export interface FiltrableCase {
  stage: Stage;
  prorrogaSolicitada: boolean;
}

export interface CaseFilter {
  id: CaseFilterId;
  /** Etiqueta única: la misma en el sidebar y en la pestaña. */
  label: string;
  /** Etiqueta corta para la pestaña, cuando la del sidebar es muy larga. */
  tabLabel?: string;
  match: (c: FiltrableCase) => boolean;
  /** Aparece en el grupo "Gestión de Reportes" del menú lateral. */
  sidebar: boolean;
}

export const CASE_FILTERS: CaseFilter[] = [
  {
    id: "todos",
    label: "Todos los reportes",
    tabLabel: "Todos",
    match: () => true,
    sidebar: true,
  },
  {
    id: "nuevos",
    label: "Reportes Nuevos",
    match: (c) => c.stage === "recepcion" || c.stage === "evaluacion",
    sidebar: true,
  },
  {
    id: "pendientes",
    label: "Pendientes de Información",
    tabLabel: "Pendientes de Info.",
    match: (c) => c.stage === "pendiente_info",
    sidebar: true,
  },
  {
    id: "investigacion",
    label: "En Investigación",
    match: (c) => c.stage === "investigacion",
    sidebar: true,
  },
  {
    id: "proceso",
    label: "En Proceso",
    match: (c) => c.stage === "plan_accion" || c.stage === "ejecucion",
    sidebar: true,
  },
  {
    id: "prorrogas",
    label: "Prórrogas Solicitadas",
    // "Prórroga Solicitada" se guarda como estado propio del caso, pero a
    // efectos de etapa sigue siendo Ejecución: es un subconjunto de "En Proceso".
    match: (c) => c.stage === "ejecucion" && c.prorrogaSolicitada,
    sidebar: true,
  },
  {
    id: "verificacion",
    label: "En Verificación",
    match: (c) => c.stage === "verificacion",
    sidebar: true,
  },
  {
    id: "cerrados",
    label: "Cerrados y Rechazados",
    tabLabel: "Cerrados",
    match: (c) => c.stage === "cierre" || c.stage === "rechazado",
    sidebar: true,
  },
];

const POR_ID = new Map(CASE_FILTERS.map((f) => [f.id, f]));

/** Resuelve el filtro de la querystring; cae en "Todos" si el id no existe. */
export function resolveFilter(id: string | null): CaseFilter {
  return (id && POR_ID.get(id as CaseFilterId)) || CASE_FILTERS[0];
}

/** Enlace del sidebar hacia la bandeja con el filtro ya aplicado. */
export function filterHref(id: CaseFilterId): string {
  return id === "todos" ? "/seguridad/casos" : `/seguridad/casos?filtro=${id}`;
}

/** Conteo por filtro, para los badges del sidebar y de las pestañas. */
export function countByFilter(cases: FiltrableCase[]): Record<CaseFilterId, number> {
  const out = {} as Record<CaseFilterId, number>;
  for (const f of CASE_FILTERS) out[f.id] = cases.filter(f.match).length;
  return out;
}
