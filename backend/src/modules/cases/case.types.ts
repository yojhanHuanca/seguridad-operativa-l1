// Acciones del workflow de Gestión de Casos (perfil Seguridad Operativa),
// verificado contra el detalle de caso de sigma-l1-metromet.vercel.app:
// Evaluación -> Investigación -> Plan de Acción -> Ejecución -> Verificación -> Cierre.

export interface EvaluateCaseDto {
  id_riesgo: number; // catálogo "Análisis de riesgo" -> casos_sop.analisis_riesgo
  id_area?: number | null | undefined; // areas.id_area -> casos_sop.area_responsable
  id_responsable?: number | null | undefined; // usuarios.id_usuario -> casos_sop.responsable_hallazgo
  clasificacion: string; // texto libre del selector de Evaluación -> casos_sop.clasificacion
  descripcion_evento: string; // casos_sop.descripcion_evento -> se copia como hallazgos al guardar la investigación
  peligro?: string | null | undefined;
  consecuencia?: string | null | undefined;
  observaciones?: string | null | undefined;
  requiere_investigacion: boolean; // decide si el caso pasa a Investigación o directo a Plan de Acción
}

export interface RejectCaseDto {
  motivo?: string | null | undefined;
}

export interface ObservationDto {
  texto: string;
}

export interface RequestInfoDto {
  mensaje: string;
}

export interface RespondInfoDto {
  respuesta?: string | null | undefined;
}

export interface SaveInvestigationDto {
  causa_raiz: string;
  conclusiones: string;
  observaciones?: string | null | undefined;
  investigador?: number | null | undefined;
}

export interface CreatePlanActivityDto {
  id_actividad?: number | undefined;
  descripcion: string;
  responsable?: number | null | undefined;
  fecha_inicio?: string | null | undefined;
  fecha_fin?: string | null | undefined;
}

export interface CreatePlanDto {
  descripcion: string;
  id_area: number;
  responsable: number;
  fecha_plan: string;
  observaciones?: string | null | undefined;
  actividades: CreatePlanActivityDto[];
}

export interface CaseListFilters {
  estados?: string[] | undefined;
  /** Casos con un plan de acción activo vencido. Reemplaza a `estados` cuando viene. */
  vencidos?: boolean | undefined;
  area?: number | undefined;
  search?: string | undefined;
  sort?: "recientes" | "prioridad" | "sla" | undefined;
  /** Ambos opcionales y deben venir juntos: sin ellos, `findAll` devuelve
   * todo (comportamiento de siempre) — así los consumidores existentes
   * (dashboard, indicadores, mapa, exportar, badge del sidebar) no cambian
   * en nada. Solo la lista paginada de CasosPage los manda. */
  page?: number | undefined;
  limit?: number | undefined;
}

export interface UploadedFile {
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
}

/** Tipos de evento de bitácora — mismos `kind` que el timeline del prototipo. */
export type TimelineKind =
  | "creado"
  | "info_solicitada"
  | "info_recibida"
  | "aprobado"
  | "rechazado"
  | "derivado"
  | "investigacion"
  | "plan_propuesto"
  | "plan_aprobado"
  | "plan_ajustado"
  | "ejecucion"
  | "ampliacion"
  | "seguimiento"
  /** Actualización adicional que el jefe apila sobre un plan ya cerrado. */
  | "actualizacion"
  | "cierre"
  | "reapertura"
  | "retroceso"
  | "comentario"
  | "sancion";

export interface TimelineEntry {
  kind: TimelineKind;
  actor: string;
  actor_rol: "seguridad" | "reportante" | "jefe";
  titulo: string;
  detalle?: string | null | undefined;
}

export interface CommentDto {
  texto: string;
}

export interface RollbackStageDto {
  destino: "Evaluación" | "Investigación";
  motivo: string;
}
