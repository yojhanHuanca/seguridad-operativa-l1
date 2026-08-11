export interface CaseListItem {
  id_caso: number;
  codigo_sop: string;
  titulo: string | null;
  descripcion: string;
  nombre_reportante: string | null;
  fecha_hallazgo: string;
  fecha_evento: string | null;
  created_at: string;
  catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: string; color: string | null };
  catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: string };
  catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { nombre: string };
  catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { id_detalle?: number; codigo: string | null; nombre: string; orden: number | null } | null;
  areas: { id_area: number; nombre_area: string } | null;
  anexos_caso: { id_anexo: number }[];
  planes_accion: PlanAccion[];
  evento_caso: {
    eventos_operativos: {
      catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { nombre: string } | null;
      catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { nombre: string } | null;
      catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: { nombre: string } | null;
    };
  }[];
}

export interface ActividadPlan {
  id_actividad: number;
  descripcion: string;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  porcentaje: string | null;
  usuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
  catalogo_detalle: { nombre: string } | null;
  seguimientos: {
    id_seguimiento: number;
    comentario: string | null;
    porcentaje: string | null;
    fecha: string | null;
    usuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
  }[];
}

export interface PlanAccion {
  id_plan: number;
  codigo_plan: string;
  descripcion: string;
  fecha_plan: string;
  fecha_reprogramada: string | null;
  observaciones: string | null;
  /** Solicitud de ampliación pendiente de decisión de SO. */
  prorroga_motivo: string | null;
  prorroga_fecha: string | null;
  prorroga_estado: string | null;
  prorroga_fecha_sol: string | null;
  areas: { id_area: number; nombre_area: string };
  usuarios: { id_usuario: number; nombre: string; cargo: string | null };
  catalogo_detalle: { nombre: string };
  actividades_plan: ActividadPlan[];
}

export interface InvestigacionCaso {
  hallazgos: string;
  causa_raiz: string;
  conclusiones: string;
  observaciones: string | null;
  usuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
  updated_at: string | null;
}

export interface TimelineEvento {
  id_evento: number;
  kind: string;
  actor: string;
  actor_rol: string;
  titulo: string;
  detalle: string | null;
  fecha: string | null;
}

export interface SolicitudInformacion {
  id_solicitud: number;
  mensaje: string;
  respuesta: string | null;
  respondida: boolean;
  /** Estado al que vuelve el caso cuando el reportante responde. */
  estado_previo: string | null;
  fecha_solicitud: string | null;
  fecha_respuesta: string | null;
}

export interface AnexoCaso {
  id_anexo: number;
  nombre_archivo: string | null;
  ruta_archivo: string | null;
  tipo_archivo: string | null;
  peso: string | null;
  fecha_subida: string | null;
}

export interface EventoOperativoDetalle {
  descripcion: string | null;
  informacion_adicional: string | null;
  fecha: string;
  hora: string | null;
  catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle: { nombre: string } | null;
}

export interface CaseDetail extends CaseListItem {
  peligro: string | null;
  consecuencia: string | null;
  descripcion_evento: string | null;
  clasificacion: string | null;
  acr: string | null;
  observaciones: string | null;
  catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: { nombre: string };
  catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_casos_sop_estado_planTocatalogo_detalle: { nombre: string } | null;
  usuarios_casos_sop_responsable_hallazgoTousuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
  usuarios_casos_sop_responsable_planTousuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
  anexos_caso: AnexoCaso[];
  investigacion_caso: InvestigacionCaso | null;
  solicitudes_informacion: SolicitudInformacion[];
  timeline_caso: TimelineEvento[];
  planes_accion: PlanAccion[];
  evento_caso: { eventos_operativos: EventoOperativoDetalle }[];
}

