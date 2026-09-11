import type { ContingenciaEvento, CreateContingenciaDto } from "./types";

export interface ContingenciaField {
  name: keyof CreateContingenciaDto;
  column: string;
  label: string;
  step: number;
  section: string;
  type?: "date" | "time" | "number" | "textarea";
  catalog?: string;
  max?: number;
  required?: boolean;
}

export const PASOS_CONTINGENCIA = ["Datos generales", "Primeros auxilios", "Traslado y ambulancia", "Datos de la persona", "Atención y diagnóstico", "Descripción y cierre"];

// Columnas de Eventos 2026. A, B y BI:BK son identificador, mes y cálculos.
export const CONTINGENCIA_FIELDS: ContingenciaField[] = [
  { column: "C", name: "fecha", label: "Fecha", step: 0, section: "Datos generales", type: "date", required: true },
  { column: "D", name: "hora_reporte", label: "Hora de reporte", step: 0, section: "Datos generales", type: "time", required: true },
  { column: "E", name: "tipo_evento", label: "Tipo de evento", step: 0, section: "Datos generales", catalog: "tipo_de_evento", required: true },
  { column: "F", name: "lugar_evento", label: "Lugar del evento", step: 0, section: "Datos generales", catalog: "lugar_del_evento", required: true },
  { column: "G", name: "lugar_exacto_evento", label: "Lugar exacto del evento", step: 0, section: "Datos generales", catalog: "lugar_exacto_del_evento", required: true },
  { column: "H", name: "quien_reporta", label: "Quién reporta", step: 0, section: "Reporte", catalog: "quien_reporta_primer_reporte", required: true },
  { column: "I", name: "medio_comunicacion_primer_reporte", label: "Medio de comunicación del primer reporte", step: 0, section: "Reporte", catalog: "medio_de_comunicacion_del_primer_reporte" },
  { column: "J", name: "estado_usuario_reportado", label: "Estado del usuario reportado", step: 0, section: "Reporte", catalog: "estado_del_usuario_reportado" },
  { column: "K", name: "acepta_atencion", label: "Acepta atención", step: 0, section: "Atención", catalog: "acepta_atencion" },
  { column: "L", name: "atencion_inicial", label: "Atención inicial", step: 0, section: "Atención", catalog: "atencion_inicial" },
  { column: "M", name: "atencion_final", label: "Atención final", step: 0, section: "Atención", catalog: "atencion_final" },
  { column: "N", name: "nivel_inicial", label: "Nivel inicial", step: 0, section: "Atención", catalog: "nivel_inicial" },
  { column: "O", name: "nivel_final", label: "Nivel final", step: 0, section: "Atención", catalog: "nivel_final" },
  { column: "P", name: "hora_termino_ae", label: "Hora de término por AE", step: 0, section: "Atención", type: "time" },
  { column: "Q", name: "hora_llamado_pco_sppa", label: "Hora de llamado del PCO al SPPA", step: 1, section: "Atención", type: "time" },
  { column: "R", name: "hora_llegada_spaa", label: "Hora de llegada del SPAA", step: 1, section: "Atención", type: "time" },
  { column: "S", name: "hora_inicio_spaa", label: "Hora de inicio del SPAA", step: 1, section: "Atención", type: "time" },
  { column: "T", name: "hora_termino_atencion_inicio_traslado", label: "Hora de término de atención / inicio de traslado", step: 1, section: "Atención", type: "time" },
  { column: "U", name: "estacion_partida_spaa", label: "Estación de partida del SPAA", step: 1, section: "Atención", catalog: "estacion_de_partida_del_spaa" },
  { column: "V", name: "medio_transporte_spaa", label: "Medio de transporte del SPAA", step: 1, section: "Atención", catalog: "medio_de_transporte_del_spaa" },
  { column: "W", name: "trasladado_por", label: "Trasladado por", step: 1, section: "Traslado", catalog: "trasladado_por" },
  { column: "X", name: "estacion_partida_ambulancia", label: "Estación de partida de la ambulancia", step: 2, section: "Traslado", catalog: "estacion_de_partida_de_la_ambulancia" },
  { column: "Y", name: "estacion_llegada_ambulancia", label: "Estación de llegada de la ambulancia", step: 2, section: "Traslado", catalog: "estacion_de_llegada_de_la_ambulancia" },
  { column: "Z", name: "hora_llamado_ambulancia", label: "Hora de llamado de la ambulancia", step: 2, section: "Traslado", type: "time" },
  { column: "AA", name: "hora_llegada_estacion", label: "Hora de llegada a la estación", step: 2, section: "Traslado", type: "time" },
  { column: "AB", name: "hora_salida_centro_salud", label: "Hora de salida hacia el centro de salud", step: 2, section: "Traslado", type: "time" },
  { column: "AC", name: "hora_llegada_centro_medico", label: "Hora de llegada al centro médico", step: 2, section: "Traslado", type: "time" },
  { column: "AD", name: "hora_retiro_centro_medico", label: "Hora de retiro del centro médico", step: 2, section: "Traslado", type: "time" },
  { column: "AE", name: "hora_retorno_puesto", label: "Hora de retorno al puesto", step: 2, section: "Traslado", type: "time" },
  { column: "AF", name: "hora_llamado_ambulancia_tercero", label: "Hora de llamado a ambulancia de terceros", step: 2, section: "Traslado", type: "time" },
  { column: "AG", name: "hora_llegada_ambulancia_terceros", label: "Hora de llegada de ambulancia de terceros", step: 2, section: "Traslado", type: "time" },
  { column: "AH", name: "hora_inicio_traslado_ambulancia_terceros", label: "Hora de inicio de traslado de ambulancia de terceros", step: 2, section: "Traslado", type: "time" },
  { column: "AI", name: "centro_salud", label: "Centro de salud", step: 2, section: "Traslado", max: 180 },
  { column: "AJ", name: "nombre_persona", label: "Nombre del pasajero o transeúnte", step: 3, section: "Datos de la persona", max: 180 },
  { column: "AK", name: "dni", label: "DNI", step: 3, section: "Datos de la persona", max: 20 },
  { column: "AL", name: "sexo", label: "Sexo", step: 3, section: "Datos de la persona", catalog: "sexo" },
  { column: "AM", name: "edad", label: "Edad", step: 3, section: "Datos de la persona", type: "number" },
  { column: "AN", name: "tarjeta_cliente", label: "Tarjeta cliente", step: 3, section: "Datos de la persona", max: 60 },
  { column: "AO", name: "reporte_pco", label: "Reporte del PCO", step: 4, section: "Diagnóstico", catalog: "reporte_del_pco" },
  { column: "AP", name: "reporte_cliente", label: "Reporte al cliente", step: 4, section: "Diagnóstico", catalog: "reporte_al_cliente" },
  { column: "AQ", name: "diagnostico_presuntivo", label: "Diagnóstico presuntivo", step: 4, section: "Diagnóstico", catalog: "diagnostico_presuntivo" },
  { column: "AR", name: "sintomas_presentados", label: "Síntomas presentados", step: 4, section: "Diagnóstico", type: "textarea", max: 3000 },
  { column: "AS", name: "zona_lesion", label: "Zona de la lesión", step: 4, section: "Diagnóstico", catalog: "zona_de_la_lesion" },
  { column: "AT", name: "categoria_paciente", label: "Categoría de paciente", step: 3, section: "Datos de la persona", catalog: "categoria_de_paciente" },
  { column: "AU", name: "nombre_personal_salud", label: "Nombre del personal de salud", step: 4, section: "Diagnóstico", max: 180 },
  { column: "AV", name: "tipo_declaracion_jurada", label: "Tipo de declaración jurada", step: 4, section: "Declaración jurada", catalog: "tipo_de_declaracion_jurada" },
  { column: "AW", name: "nro_declaracion_jurada", label: "Número de declaración jurada", step: 4, section: "Declaración jurada", max: 80 },
  { column: "AX", name: "breve_descripcion_hecho", label: "Breve descripción del hecho", step: 5, section: "Descripción", type: "textarea", max: 5000 },
  { column: "AY", name: "extranjero", label: "Extranjero", step: 3, section: "Datos de la persona", catalog: "extranjero" },
  { column: "AZ", name: "estacion_origen_usuario", label: "Estación de origen del usuario", step: 3, section: "Datos de la persona", catalog: "estacion_de_origen_del_usuario" },
  { column: "BA", name: "estacion_destino_usuario", label: "Estación de destino del usuario", step: 3, section: "Datos de la persona", catalog: "estacion_de_destino_del_usuario" },
  { column: "BB", name: "acompanante", label: "Acompañante", step: 3, section: "Datos de la persona", catalog: "acompanante" },
  { column: "BC", name: "numero_dni_acompanante", label: "Número de DNI del acompañante", step: 3, section: "Datos de la persona", max: 20 },
  { column: "BD", name: "reserva_camaras", label: "Reserva de cámaras", step: 5, section: "Observaciones", max: 120 },
  { column: "BE", name: "observacion", label: "Observación", step: 5, section: "Observaciones", type: "textarea", max: 5000 },
  { column: "BF", name: "registro", label: "Registro", step: 5, section: "Registro y revisión", max: 120 },
  { column: "BG", name: "revision", label: "Revisión", step: 5, section: "Registro y revisión", max: 120 },
  { column: "BH", name: "casos_sospechosos_covid_19", label: "Casos sospechosos COVID-19", step: 5, section: "Observaciones", max: 120 },
];

export type ContingenciaFormValues = Record<keyof CreateContingenciaDto, string>;

export function formValues(initial: Partial<CreateContingenciaDto> = {}): ContingenciaFormValues {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const values = Object.fromEntries(CONTINGENCIA_FIELDS.map(({ name }) => [name, String(initial[name] ?? "")])) as ContingenciaFormValues;
  return { ...values, fecha: initial.fecha ?? today, estado: initial.estado ?? "Registrado" };
}

export function eventoToDto(evento: ContingenciaEvento): CreateContingenciaDto {
  const flattened = { ...evento, ...evento.atencion, ...evento.traslado, ...evento.persona, ...evento.diagnostico, ...evento.cierre };
  const values = Object.fromEntries(CONTINGENCIA_FIELDS.map(({ name }) => [name, flattened[name] ?? ""])) as unknown as CreateContingenciaDto;
  return { ...values, edad: evento.persona?.edad ?? undefined, estado: evento.estado };
}
