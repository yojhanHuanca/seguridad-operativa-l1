// Adaptador entre la API real (casos_sop + eventos_operativos + catálogos,
// normalizado en Postgres) y la forma plana que consumen los componentes
// portados del prototipo. Aísla la traducción en un solo lugar: las pantallas
// portadas no saben nada de Prisma ni de nombres de relaciones.
import { stageFromEstado, tipoEventoFromNombre, type RiskLevel, type Stage, type TipoSOP } from "./domain";
import { criterioAceptabilidad, slaDueDate } from "./lib/sla";
import type { CaseListItem, PlanAccion } from "./types";

export interface CaseRow {
  /** codigo_sop es el identificador real visible y de ruta. */
  id: string;
  stage: Stage;
  /** Nombre crudo del estado; distingue pausas que `stage` colapsa. */
  estado: string;
  type: TipoSOP;
  title: string;
  /** Segunda línea bajo el título: lugar específico dentro de la estación. */
  location: string;
  reporter: string;
  station: string;
  area: string | null;
  risk: RiskLevel | null;
  /** Categoría del riesgo ("Inaceptable", "No deseable"…); null sin evaluar. */
  riskCategoria: string | null;
  createdAt: string;
  /**
   * Fecha límite derivada del riesgo; null mientras el caso no se evalúe.
   *
   * En la bandeja el plazo se cuenta desde `fecha_hallazgo` porque el listado
   * no trae la bitácora y no hay forma de saber cuándo se evaluó. En el
   * expediente sí se usa la fecha real de evaluación (ver lib/sla.ts). Para que
   * ambas coincidan al día exacto, el backend tendría que exponer la fecha de
   * evaluación en el listado.
   */
  slaDueDate: string | null;
  /**
   * El prototipo modela la prórroga como un objeto aparte del caso; nosotros
   * la guardamos como un estado propio ("Prórroga Solicitada"), que a efectos
   * de etapa sigue siendo Ejecución. Este flag conserva esa distinción.
   */
  prorrogaSolicitada: boolean;
  evidencias: number;
  planes: PlanAccion[];
}

/**
 * El prototipo siempre muestra un título; nuestros casos lo tienen opcional
 * (el wizard del reportante no lo pide). Se deriva uno legible en vez de
 * dejar la celda vacía.
 */
function deriveTitle(c: CaseListItem, tipoLabel: string, station: string): string {
  if (c.titulo?.trim()) return c.titulo;
  if (station) return `${tipoLabel} en ${station}`;
  return c.descripcion;
}

export function toCaseRow(c: CaseListItem): CaseRow {
  const estadoNombre = c.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
  const evento = c.evento_caso[0]?.eventos_operativos;
  const station = evento?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre ?? "";
  // El tipo real es el que eligió el reportante (o corrigió SO), guardado en
  // el evento operativo — no `tipo_sop`, que quedaba fijo en "Hallazgo" y
  // nunca se actualizaba.
  const tipoNombre = evento?.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?.nombre;
  const type = tipoEventoFromNombre(tipoNombre);
  const riesgo = c.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;

  return {
    id: c.codigo_sop,
    stage: stageFromEstado(estadoNombre),
    estado: estadoNombre,
    type,
    title: deriveTitle(c, tipoNombre ?? "Caso", station),
    location: evento?.catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle?.nombre ?? "",
    reporter: c.nombre_reportante?.trim() || "Reporte Anónimo",
    station,
    area: c.areas?.nombre_area ?? null,
    risk: (riesgo?.codigo as RiskLevel | undefined) ?? null,
    riskCategoria: riesgo ? criterioAceptabilidad(riesgo.nombre, riesgo.codigo) ?? riesgo.nombre : null,
    createdAt: c.created_at,
    slaDueDate: slaDueDate(c.fecha_hallazgo, riesgo?.nombre, riesgo?.codigo),
    prorrogaSolicitada: estadoNombre === "Prórroga Solicitada",
    evidencias: c.anexos_caso.length,
    planes: c.planes_accion ?? [],
  };
}

