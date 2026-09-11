import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" || value == null ? undefined : value);
// Conserva los valores exactos de los catálogos del Excel, incluidos sus espacios.
const texto = (max: number) => z.preprocess(emptyToUndefined, z.string().max(max).optional());
const textoRequerido = (label: string, max: number) =>
  z.string({ error: `${label} es obligatorio` }).max(max).refine((value) => value.trim().length > 0, `${label} es obligatorio`);
export const fechaContingenciaSchema = z.iso.date("La fecha debe ser una fecha válida (YYYY-MM-DD)");
const horaValida = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe ser válida (HH:MM)");
const hora = z.preprocess(emptyToUndefined, horaValida.optional());

const campos = {
  fecha: fechaContingenciaSchema,
  hora_reporte: horaValida,
  tipo_evento: textoRequerido("El tipo de evento", 100),
  lugar_evento: textoRequerido("El lugar del evento", 160),
  lugar_exacto_evento: textoRequerido("El lugar exacto del evento", 180),
  quien_reporta: textoRequerido("Quién reporta", 120),
  medio_comunicacion_primer_reporte: texto(180),
  estado_usuario_reportado: texto(80),
  acepta_atencion: texto(20),
  atencion_inicial: texto(120),
  atencion_final: texto(120),
  nivel_inicial: texto(60),
  nivel_final: texto(60),
  hora_termino_ae: hora,
  estado: z.preprocess(emptyToUndefined, z.enum(["Registrado", "Revisado", "Cerrado"]).optional()),

  hora_llamado_pco_sppa: hora,
  hora_llegada_spaa: hora,
  hora_inicio_spaa: hora,
  hora_termino_atencion_inicio_traslado: hora,
  estacion_partida_spaa: texto(160),
  medio_transporte_spaa: texto(120),
  trasladado_por: texto(120),

  estacion_partida_ambulancia: texto(160),
  estacion_llegada_ambulancia: texto(180),
  hora_llamado_ambulancia: hora,
  hora_llegada_estacion: hora,
  hora_salida_centro_salud: hora,
  hora_llegada_centro_medico: hora,
  hora_retiro_centro_medico: hora,
  hora_retorno_puesto: hora,
  hora_llamado_ambulancia_tercero: hora,
  hora_llegada_ambulancia_terceros: hora,
  hora_inicio_traslado_ambulancia_terceros: hora,
  centro_salud: texto(180),

  nombre_persona: texto(180),
  dni: texto(20),
  sexo: texto(10),
  edad: z.preprocess(emptyToUndefined, z.number().int().min(0).max(2147483647).optional()),
  tarjeta_cliente: texto(60),
  categoria_paciente: texto(120),
  extranjero: texto(10),
  estacion_origen_usuario: texto(160),
  estacion_destino_usuario: texto(160),
  acompanante: texto(80),
  numero_dni_acompanante: texto(20),

  reporte_pco: texto(180),
  reporte_cliente: texto(180),
  diagnostico_presuntivo: texto(220),
  sintomas_presentados: texto(3000),
  zona_lesion: texto(120),
  nombre_personal_salud: texto(180),
  tipo_declaracion_jurada: texto(20),
  nro_declaracion_jurada: texto(80),

  breve_descripcion_hecho: texto(5000),
  reserva_camaras: texto(120),
  observacion: texto(5000),
  registro: texto(120),
  revision: texto(120),
  casos_sospechosos_covid_19: texto(120),
};

export const createContingenciaSchema = z.object(campos);
export const updateContingenciaSchema = z.object(campos);

export type CreateContingenciaDto = z.infer<typeof createContingenciaSchema>;
export type UpdateContingenciaDto = z.infer<typeof updateContingenciaSchema>;

export const ESTADOS_CONTINGENCIA = ["Registrado", "Revisado", "Cerrado"] as const;
