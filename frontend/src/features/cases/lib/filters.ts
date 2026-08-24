// Filtros de la bandeja de Gestión de Reportes.
//
// Fuente única compartida por el menú lateral y las pestañas de la bandeja.
// Antes cada uno tenía su propia lista y los ids no coincidían: el sidebar
// enlazaba a `?filtro=nuevo`, `?filtro=pendiente` y `?filtro=cerrado`, mientras
// que la bandeja los llamaba `nuevos`, `pendientes` y `cerrados`, así que esos
// tres botones caían silenciosamente en "Todos". Teniendo un solo array, los
// ids ya no pueden desincronizarse.
import type { Stage } from "../domain";
import { isPlanVencido, type PlanDeadlineSource, type PlanEstadoSource } from "@/features/plans/lib/planDeadline";

export type CaseFilterId =
  | "todos"
  | "nuevos"
  | "vencidos"
  | "investigacion"
  | "proceso"
  | "prorrogas"
  | "verificacion"
  | "cerrados";

/** Forma mínima de un plan de acción que necesita el filtro "vencidos". */
export interface FiltrablePlan extends PlanDeadlineSource, PlanEstadoSource {}

/**
 * Forma mínima que necesita un filtro. `CaseRow` la cumple estructuralmente,
 * así que este módulo no depende del adaptador (y no hay ciclo de imports).
 */
export interface FiltrableCase {
  stage: Stage;
  prorrogaSolicitada: boolean;
  planes: FiltrablePlan[];
}

/** Etapas en las que un caso puede tener un plan de acción con plazo vigente. */
const VENCIDO_STAGES = new Set<Stage>(["plan_accion", "ejecucion", "verificacion"]);

export interface CaseFilter {
  id: CaseFilterId;
  /** Etiqueta única: la misma en el sidebar y en la pestaña. */
  label: string;
  /** Etiqueta corta para la pestaña, cuando la del sidebar es muy larga. */
  tabLabel?: string;
  match: (c: FiltrableCase) => boolean;
  /** Aparece en el grupo "Gestión de Reportes" del menú lateral. */
  sidebar: boolean;
  /** Aparece como filtro rápido horizontal en la bandeja. */
  tab: boolean;
}

export const CASE_FILTERS: CaseFilter[] = [
  {
    id: "todos",
    label: "Todos los reportes",
    tabLabel: "Todos",
    match: () => true,
    sidebar: false,
    tab: true,
  },
  {
    id: "nuevos",
    label: "Reportes Nuevos",
    match: (c) => c.stage === "recepcion" || c.stage === "evaluacion",
    sidebar: true,
    tab: false,
  },
  {
    id: "vencidos",
    label: "Planes de acción vencidos",
    match: (c) => VENCIDO_STAGES.has(c.stage) && c.planes.some(isPlanVencido),
    sidebar: true,
    tab: false,
  },
  {
    id: "investigacion",
    label: "En Investigación",
    match: (c) => c.stage === "investigacion",
    sidebar: false,
    tab: true,
  },
  {
    id: "proceso",
    label: "Reportes en proceso",
    tabLabel: "En Proceso",
    match: (c) => c.stage === "plan_accion" || c.stage === "ejecucion",
    sidebar: true,
    tab: false,
  },
  {
    id: "prorrogas",
    label: "Prórrogas Solicitadas",
    // "Prórroga Solicitada" se guarda como estado propio del caso, pero a
    // efectos de etapa sigue siendo Ejecución: es un subconjunto de "En Proceso".
    match: (c) => c.stage === "ejecucion" && c.prorrogaSolicitada,
    sidebar: false,
    tab: true,
  },
  {
    id: "verificacion",
    label: "En Verificación",
    match: (c) => c.stage === "verificacion",
    sidebar: false,
    tab: true,
  },
  {
    id: "cerrados",
    label: "Reportes Cerrados",
    tabLabel: "Cerrados",
    match: (c) => c.stage === "cierre" || c.stage === "rechazado",
    sidebar: true,
    tab: false,
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
