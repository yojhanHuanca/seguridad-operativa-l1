export interface SeguimientoActividad {
  id_seguimiento: number;
  comentario: string | null;
  porcentaje: string | null;
  fecha: string | null;
  usuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
}

export interface AnexoPlanCaso {
  id_anexo: number;
  nombre_archivo: string | null;
  ruta_archivo: string | null;
  tipo_archivo: string | null;
  peso: string | null;
  fecha_subida: string | null;
}

export interface TimelinePlanCaso {
  id_evento: number;
  kind: string;
  actor: string;
  actor_rol: string;
  titulo: string;
  detalle: string | null;
  fecha: string | null;
}

export interface PlanActividad {
  id_actividad: number;
  descripcion: string;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  porcentaje: string | null;
  usuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
  catalogo_detalle: { nombre: string } | null;
  seguimientos: SeguimientoActividad[];
}

/** Plan de acción tal como lo ve el Jefe del Área, con su caso embebido. */
export interface PlanItem {
  id_plan: number;
  codigo_plan: string;
  descripcion: string;
  fecha_plan: string;
  fecha_reprogramada: string | null;
  observaciones: string | null;
  prorroga_motivo: string | null;
  prorroga_fecha: string | null;
  prorroga_estado: string | null;
  prorroga_fecha_sol: string | null;
  created_at: string | null;
  updated_at: string | null;
  areas: { id_area: number; nombre_area: string };
  usuarios: { id_usuario: number; nombre: string; cargo: string | null };
  catalogo_detalle: { nombre: string };
  actividades_plan: PlanActividad[];
  casos_sop: {
    id_caso: number;
    codigo_sop: string;
    titulo: string | null;
    descripcion: string;
    fecha_hallazgo: string;
    fecha_evento: string | null;
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle?: { nombre: string };
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: string };
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { codigo: string | null; nombre: string } | null;
    investigacion_caso: {
      causa_raiz: string;
      hallazgos: string;
      conclusiones: string;
      observaciones: string | null;
    } | null;
    timeline_caso: TimelinePlanCaso[];
    anexos_caso: AnexoPlanCaso[];
  };
}

