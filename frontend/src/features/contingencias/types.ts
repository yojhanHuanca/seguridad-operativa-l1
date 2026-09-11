export interface ContingenciaEvento {
  id_evento: number;
  codigo_evento: string;
  fecha: string;
  hora_reporte: string | null;
  mes: number;
  tipo_evento: string;
  lugar_evento: string;
  lugar_exacto_evento: string;
  quien_reporta: string;
  medio_comunicacion_primer_reporte: string | null;
  estado_usuario_reportado: string | null;
  acepta_atencion: string | null;
  atencion_inicial: string | null;
  atencion_final: string | null;
  nivel_inicial: string | null;
  nivel_final: string | null;
  hora_termino_ae: string | null;
  estado: "Registrado" | "Revisado" | "Cerrado";
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  atencion: ContingenciaAtencion | null;
  traslado: ContingenciaTraslado | null;
  persona: ContingenciaPersona | null;
  diagnostico: ContingenciaDiagnostico | null;
  cierre: ContingenciaCierre | null;
}

export interface ContingenciaAtencion {
  id_atencion: number;
  id_evento: number;
  hora_llamado_pco_sppa: string | null;
  hora_llegada_spaa: string | null;
  hora_inicio_spaa: string | null;
  hora_termino_atencion_inicio_traslado: string | null;
  estacion_partida_spaa: string | null;
  medio_transporte_spaa: string | null;
  trasladado_por: string | null;
  tiempo_respuesta_spaa_minutos: number | null;
}

export interface ContingenciaTraslado {
  id_traslado: number;
  id_evento: number;
  estacion_partida_ambulancia: string | null;
  estacion_llegada_ambulancia: string | null;
  hora_llamado_ambulancia: string | null;
  hora_llegada_estacion: string | null;
  hora_salida_centro_salud: string | null;
  hora_llegada_centro_medico: string | null;
  hora_retiro_centro_medico: string | null;
  hora_retorno_puesto: string | null;
  hora_llamado_ambulancia_tercero: string | null;
  hora_llegada_ambulancia_terceros: string | null;
  hora_inicio_traslado_ambulancia_terceros: string | null;
  centro_salud: string | null;
  tiempo_llegada_ambulancia_minutos: number | null;
  tiempo_evacuacion_minutos: number | null;
}

export interface ContingenciaPersona {
  id_persona: number;
  id_evento: number;
  nombre_persona: string | null;
  dni: string | null;
  sexo: string | null;
  edad: number | null;
  tarjeta_cliente: string | null;
  categoria_paciente: string | null;
  extranjero: string | null;
  estacion_origen_usuario: string | null;
  estacion_destino_usuario: string | null;
  acompanante: string | null;
  numero_dni_acompanante: string | null;
}

export interface ContingenciaDiagnostico {
  id_diagnostico: number;
  id_evento: number;
  reporte_pco: string | null;
  reporte_cliente: string | null;
  diagnostico_presuntivo: string | null;
  sintomas_presentados: string | null;
  zona_lesion: string | null;
  nombre_personal_salud: string | null;
  tipo_declaracion_jurada: string | null;
  nro_declaracion_jurada: string | null;
}

export interface ContingenciaCierre {
  id_cierre: number;
  id_evento: number;
  breve_descripcion_hecho: string | null;
  reserva_camaras: string | null;
  observacion: string | null;
  registro: string | null;
  revision: string | null;
  casos_sospechosos_covid_19: string | null;
}

export interface ContingenciaListItem {
  id_evento: number;
  codigo_evento: string;
  fecha: string;
  hora_reporte: string | null;
  quien_reporta: string | null;
  tipo_evento: string;
  lugar_evento: string;
  lugar_exacto_evento: string;
  estado: "Registrado" | "Revisado" | "Cerrado";
  persona: { nombre_persona: string | null; dni: string | null; categoria_paciente: string | null } | null;
  cierre: { registro: string | null; revision: string | null } | null;
}

export interface ContingenciaCatalogo {
  id_catalogo: number;
  codigo: string;
  nombre: string;
  hoja_excel: string;
  columna_excel: string;
  estado: boolean;
  items: ContingenciaCatalogoItem[];
}

export interface ContingenciaCatalogoItem {
  id_item: number;
  valor: string;
  orden: number;
  estado: boolean;
}

export interface CreateContingenciaDto {
  fecha: string;
  hora_reporte: string;
  tipo_evento: string;
  lugar_evento: string;
  lugar_exacto_evento: string;
  quien_reporta: string;
  medio_comunicacion_primer_reporte?: string;
  estado_usuario_reportado?: string;
  acepta_atencion?: string;
  atencion_inicial?: string;
  atencion_final?: string;
  nivel_inicial?: string;
  nivel_final?: string;
  hora_termino_ae?: string;
  estado?: "Registrado" | "Revisado" | "Cerrado";
  hora_llamado_pco_sppa?: string;
  hora_llegada_spaa?: string;
  hora_inicio_spaa?: string;
  hora_termino_atencion_inicio_traslado?: string;
  estacion_partida_spaa?: string;
  medio_transporte_spaa?: string;
  trasladado_por?: string;
  estacion_partida_ambulancia?: string;
  estacion_llegada_ambulancia?: string;
  hora_llamado_ambulancia?: string;
  hora_llegada_estacion?: string;
  hora_salida_centro_salud?: string;
  hora_llegada_centro_medico?: string;
  hora_retiro_centro_medico?: string;
  hora_retorno_puesto?: string;
  hora_llamado_ambulancia_tercero?: string;
  hora_llegada_ambulancia_terceros?: string;
  hora_inicio_traslado_ambulancia_terceros?: string;
  centro_salud?: string;
  nombre_persona?: string;
  dni?: string;
  sexo?: string;
  edad?: number;
  tarjeta_cliente?: string;
  categoria_paciente?: string;
  extranjero?: string;
  estacion_origen_usuario?: string;
  estacion_destino_usuario?: string;
  acompanante?: string;
  numero_dni_acompanante?: string;
  reporte_pco?: string;
  reporte_cliente?: string;
  diagnostico_presuntivo?: string;
  sintomas_presentados?: string;
  zona_lesion?: string;
  nombre_personal_salud?: string;
  tipo_declaracion_jurada?: string;
  nro_declaracion_jurada?: string;
  breve_descripcion_hecho?: string;
  reserva_camaras?: string;
  observacion?: string;
  registro?: string;
  revision?: string;
  casos_sospechosos_covid_19?: string;
}

export type UpdateContingenciaDto = CreateContingenciaDto;

export interface ContingenciaFiltros {
  search?: string;
  estado?: string;
  desde?: string;
  hasta?: string;
  page?: number;
  limit?: number;
  sortBy?: "fecha" | "tipo_evento" | "estado";
  sortDir?: "asc" | "desc";
}

export interface ContingenciaPageResponse {
  items: ContingenciaListItem[];
  total: number;
}
