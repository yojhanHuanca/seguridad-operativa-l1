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

// Columnas de Base de datos. A es ITEM; el formulario inicia en B y llega hasta BD.
export const CONTINGENCIA_FIELDS: ContingenciaField[] = [
  { column: "B", name: "fecha", label: "Fecha", step: 0, section: "Datos generales", type: "date", required: true },
  { column: "C", name: "hora_reporte", label: "Hora de reporte", step: 0, section: "Datos generales", type: "time", required: true },
  { column: "D", name: "tipo_evento", label: "Tipo de evento", step: 0, section: "Datos generales", catalog: "tipo_de_evento", required: true },
  { column: "E", name: "lugar_evento", label: "Lugar del evento", step: 0, section: "Datos generales", catalog: "lugar_del_evento", required: true },
  { column: "F", name: "lugar_exacto_evento", label: "Lugar exacto del evento", step: 0, section: "Datos generales", catalog: "lugar_exacto_del_evento", required: true },
  { column: "G", name: "quien_reporta", label: "Quién reporta", step: 0, section: "Reporte", catalog: "quien_reporta_primer_reporte", required: true },
  { column: "H", name: "medio_comunicacion_primer_reporte", label: "Medio de comunicación del primer reporte", step: 0, section: "Reporte", catalog: "medio_de_comunicacion_del_primer_reporte" },
  { column: "I", name: "estado_usuario_reportado", label: "Estado del usuario reportado", step: 0, section: "Reporte", catalog: "estado_del_usuario_reportado" },
  { column: "J", name: "acepta_atencion", label: "Acepta atención", step: 0, section: "Atención", catalog: "acepta_atencion" },
  { column: "K", name: "atencion_inicial", label: "Atención inicial", step: 0, section: "Atención", catalog: "atencion_inicial" },
  { column: "L", name: "atencion_final", label: "Atención final", step: 0, section: "Atención", catalog: "atencion_final" },
  { column: "M", name: "nivel_inicial", label: "Nivel inicial", step: 0, section: "Atención", catalog: "nivel_inicial" },
  { column: "N", name: "nivel_final", label: "Nivel final", step: 0, section: "Atención", catalog: "nivel_final" },
  { column: "O", name: "hora_llamado_pco_sppa", label: "Hora de llamado del PCO al SPPA", step: 1, section: "Atención", type: "time" },
  { column: "P", name: "hora_llegada_spaa", label: "Hora de llegada del SPAA", step: 1, section: "Atención", type: "time" },
  { column: "Q", name: "hora_inicio_spaa", label: "Hora de inicio del SPAA", step: 1, section: "Atención", type: "time" },
  { column: "R", name: "hora_termino_atencion_inicio_traslado", label: "Hora de término de atención / inicio de traslado", step: 1, section: "Atención", type: "time" },
  { column: "S", name: "estacion_partida_spaa", label: "Estación de partida del SPAA", step: 1, section: "Atención", catalog: "estacion_de_partida_del_spaa" },
  { column: "T", name: "medio_transporte_spaa", label: "Medio de transporte del SPAA", step: 1, section: "Atención", catalog: "medio_de_transporte_del_spaa" },
  { column: "U", name: "trasladado_por", label: "Trasladado por", step: 1, section: "Traslado", catalog: "trasladado_por" },
  { column: "V", name: "estacion_partida_ambulancia", label: "Estación de partida de la ambulancia", step: 2, section: "Traslado", catalog: "estacion_de_partida_de_la_ambulancia" },
  { column: "W", name: "estacion_llegada_ambulancia", label: "Estación de llegada de la ambulancia", step: 2, section: "Traslado", catalog: "estacion_de_llegada_de_la_ambulancia" },
  { column: "X", name: "hora_llamado_ambulancia", label: "Hora de llamado de la ambulancia", step: 2, section: "Traslado", type: "time" },
  { column: "Y", name: "hora_llegada_estacion", label: "Hora de llegada a la estación", step: 2, section: "Traslado", type: "time" },
  { column: "Z", name: "hora_salida_centro_salud", label: "Hora de salida hacia el centro de salud", step: 2, section: "Traslado", type: "time" },
  { column: "AA", name: "hora_llegada_centro_medico", label: "Hora de llegada al centro médico", step: 2, section: "Traslado", type: "time" },
  { column: "AB", name: "hora_retiro_centro_medico", label: "Hora de retiro del centro médico", step: 2, section: "Traslado", type: "time" },
  { column: "AC", name: "hora_retorno_puesto", label: "Hora de retorno al puesto", step: 2, section: "Traslado", type: "time" },
  { column: "AD", name: "hora_llamado_ambulancia_tercero", label: "Hora de llamado a ambulancia de terceros", step: 2, section: "Traslado", type: "time" },
  { column: "AE", name: "hora_llegada_ambulancia_terceros", label: "Hora de llegada de ambulancia de terceros", step: 2, section: "Traslado", type: "time" },
  { column: "AF", name: "hora_inicio_traslado_ambulancia_terceros", label: "Hora de inicio de traslado de ambulancia de terceros", step: 2, section: "Traslado", type: "time" },
  { column: "AG", name: "nombre_persona", label: "Nombre del pasajero o transeúnte", step: 3, section: "Datos de la atención", max: 180 },
  { column: "AH", name: "dni", label: "DNI", step: 3, section: "Datos de la atención", max: 20 },
  { column: "AI", name: "sexo", label: "Sexo", step: 3, section: "Datos de la atención", catalog: "sexo" },
  { column: "AJ", name: "edad", label: "Edad", step: 3, section: "Datos de la atención", type: "number" },
  { column: "AK", name: "tarjeta_cliente", label: "Tarjeta cliente", step: 3, section: "Datos de la atención", max: 60 },
  { column: "AL", name: "reporte_pco", label: "Reporte del PCO", step: 4, section: "Datos de la atención", catalog: "reporte_del_pco" },
  { column: "AM", name: "reporte_cliente", label: "Reporte al cliente", step: 4, section: "Datos de la atención", catalog: "reporte_al_cliente" },
  { column: "AN", name: "diagnostico_presuntivo", label: "Diagnóstico presuntivo", step: 4, section: "Datos de la atención", catalog: "diagnostico_presuntivo" },
  { column: "AO", name: "sintomas_presentados", label: "Síntomas presentados", step: 4, section: "Datos de la atención", type: "textarea", max: 3000 },
  { column: "AP", name: "zona_lesion", label: "Zona de la lesión", step: 4, section: "Datos de la atención", catalog: "zona_de_la_lesion" },
  { column: "AQ", name: "categoria_paciente", label: "Categoría de paciente", step: 3, section: "Datos de la atención", catalog: "categoria_de_paciente" },
  { column: "AR", name: "nombre_personal_salud", label: "Nombre del personal de salud", step: 4, section: "Datos de la atención", max: 180 },
  { column: "AS", name: "tipo_declaracion_jurada", label: "Tipo de declaración jurada", step: 4, section: "Datos de la atención", catalog: "tipo_de_declaracion_jurada" },
  { column: "AT", name: "nro_declaracion_jurada", label: "Número de declaración jurada", step: 4, section: "Datos de la atención", max: 80 },
  { column: "AU", name: "breve_descripcion_hecho", label: "Breve descripción del hecho", step: 5, section: "Datos de la atención", type: "textarea", max: 5000 },
  { column: "AV", name: "extranjero", label: "Extranjero", step: 3, section: "Datos de la atención", catalog: "extranjero" },
  { column: "AW", name: "estacion_origen_usuario", label: "Estación de origen del usuario", step: 3, section: "Datos de la atención", catalog: "estacion_de_origen_del_usuario" },
  { column: "AX", name: "estacion_destino_usuario", label: "Estación de destino del usuario", step: 3, section: "Datos de la atención", catalog: "estacion_de_destino_del_usuario" },
  { column: "AY", name: "acompanante", label: "Acompañante", step: 3, section: "Datos de la atención", catalog: "acompanante" },
  { column: "AZ", name: "numero_dni_acompanante", label: "Número de DNI del acompañante", step: 3, section: "Datos de la atención", max: 20 },
  { column: "BA", name: "reserva_camaras", label: "Reserva de cámaras", step: 5, section: "Datos de la atención", max: 120 },
  { column: "BB", name: "observacion", label: "Observación", step: 5, section: "Datos de la atención", type: "textarea", max: 5000 },
  { column: "BC", name: "registro", label: "Registro", step: 5, section: "Gestor de atención", max: 120 },
  { column: "BD", name: "revision", label: "Revisión", step: 5, section: "Gestor de atención", max: 120 },
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
