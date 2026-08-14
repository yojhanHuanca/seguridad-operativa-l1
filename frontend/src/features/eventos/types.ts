export const ESTADOS_EVENTO = ["Registrado", "En investigación", "Cerrado"] as const;
export type EstadoEvento = (typeof ESTADOS_EVENTO)[number];

export interface CreateEventoInput {
  fecha: string;
  hora: string;
  id_tipo_incidente: number;
  /** Se calculan solos, pero el usuario los puede corregir a mano. */
  anio?: number;
  mes?: number;
  semana?: number;
  dia?: string;
  id_rango_horario?: number;
  descripcion?: string;
  id_ubicacion?: number;
  id_tipo_via?: number;
  id_direccion_via?: number;
  id_lugar_incidente?: number;
  id_modelo_mr?: number;
  id_numero_mr?: number;
  numero_carrera?: string;
  id_personal_involucrado?: number;
  id_tipo_causa?: number;
  id_posible_causa?: number;
  informacion_adicional?: string;
  camara_monitoreada?: string;
  demora?: number;
}

export interface UpdateEventoInput extends Partial<CreateEventoInput> {
  id_evento: number;
  estado?: EstadoEvento;
}

export interface EventoCreado {
  id_evento: number;
  codigo_evento: string | null;
}

export interface EventoListItem {
  id_evento: number;
  codigo_evento: string | null;
  fecha: string;
  hora: string | null;
  anio: number | null;
  mes: number | null;
  semana: number | null;
  dia: string | null;
  descripcion: string | null;
  numero_carrera: string | null;
  informacion_adicional: string | null;
  camara_monitoreada: string | null;
  demora: string | null;
  estado: EstadoEvento;
  created_at: string | null;
  // Ids crudos (columnas propias de la fila) — sirven para precargar el formulario de edición.
  tipo_incidente: number;
  ubicacion: number | null;
  tipo_via: number | null;
  direccion_via: number | null;
  lugar_incidente: number | null;
  modelo_mr: number | null;
  numero_mr: number | null;
  personal_involucrado: number | null;
  tipo_causa: number | null;
  posible_causa: number | null;
  rango_horario: number | null;
  catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: { codigo: string | null; nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle: { nombre: string } | null;
  catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle: { nombre: string } | null;
  usuarios_eventos_monitoreo_usuario_registraTousuarios: { nombre: string } | null;
  usuarios_eventos_monitoreo_asignado_aTousuarios: { id_usuario: number; nombre: string; cargo: string | null } | null;
  id_caso_creado: number | null;
  casos_sop: { codigo_sop: string } | null;
}
