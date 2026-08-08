export interface EvaluateCaseDto {
    id_riesgo: number;
    id_area?: number | null | undefined;
    id_responsable?: number | null | undefined;
    clasificacion: string;
    peligro?: string | null | undefined;
    consecuencia?: string | null | undefined;
    observaciones?: string | null | undefined;
    requiere_investigacion: boolean;
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
    hallazgos: string;
    causa_raiz: string;
    conclusiones: string;
    observaciones?: string | null | undefined;
    investigador?: number | null | undefined;
}
export interface CreatePlanActivityDto {
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
    area?: number | undefined;
    search?: string | undefined;
    sort?: "recientes" | "prioridad" | "sla" | undefined;
}
export interface UploadedFile {
    originalname: string;
    filename: string;
    mimetype: string;
    size: number;
}
/** Tipos de evento de bitácora — mismos `kind` que el timeline del prototipo. */
export type TimelineKind = "creado" | "info_solicitada" | "info_recibida" | "aprobado" | "rechazado" | "derivado" | "investigacion" | "plan_propuesto" | "plan_aprobado" | "plan_ajustado" | "ejecucion" | "ampliacion" | "seguimiento" | "cierre" | "reapertura" | "comentario" | "sancion";
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
//# sourceMappingURL=case.types.d.ts.map