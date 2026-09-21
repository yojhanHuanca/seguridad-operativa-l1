import { ContingenciaRepository } from "../contingencias/contingencia.repository.js";
import { createContingenciaSchema, type CreateContingenciaDto } from "../contingencias/contingencia.types.js";
import type {
  ImportacionCasePreview,
  ImportacionIssue,
  ImportacionPreview,
  ImportacionRow,
  ImportacionResult,
} from "./importacion.types.js";

interface ContingenciaRow extends ImportacionRow {}

const INSERT_CHUNK = 500;
const MAX_CONCURRENT = 10;

function normalizeText(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 120);
}

function cleanCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).trim();
}

function getCell(row: ContingenciaRow, aliases: readonly string[]): string {
  for (const [key, value] of Object.entries(row)) {
    const normalizedKey = normalizeText(key);
    for (const alias of aliases) {
      if (normalizedKey === normalizeText(alias)) return cleanCell(value);
    }
  }
  return "";
}

function isEmptyRow(row: ContingenciaRow): boolean {
  return Object.values(row).every((value) => cleanCell(value) === "");
}

function addIssue(issues: ImportacionIssue[], issue: ImportacionIssue): void {
  issues.push(issue);
}

function requiredIssue(row: number, field: string, value: string): ImportacionIssue {
  return { row, field, severity: "error", message: `El campo "${field}" es obligatorio.`, value: cleanCell(value) || null };
}

function maxLengthIssue(row: number, field: string, value: string, max: number): ImportacionIssue {
  return { row, field, severity: "error", message: `El campo "${field}" supera el máximo de ${max} caracteres.`, value };
}

function parseDate(value: string): Date | null {
  const raw = value.trim();
  if (!raw) return null;
  const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    const year = Number(iso[1]);
    const month = Number(iso[2]);
    const day = Number(iso[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return null;
    return date;
  }
  const fallback = new Date(raw);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function parseTime(value: string): string | null {
  const raw = value.trim();
  if (!raw) return null;
  if (/^([01]\d|2[0-3]):[0-5]\d$/.test(raw)) return raw;
  return null;
}

const ALIASES: Record<string, readonly string[]> = {
  fecha: ["Fecha", "FECHA", "fecha"],
  hora_reporte: ["Hora de Reporte", "HORA DE REPORTE", "Hora de reporte", "hora_reporte"],
  tipo_evento: ["TIPO DE EVENTO", "tipo_de_evento", "Tipo de evento", "tipo evento"],
  lugar_evento: ["LUGAR DEL EVENTO", "lugar_del_evento", "Lugar del evento", "lugar evento"],
  lugar_exacto_evento: ["LUGAR EXACTO DEL EVENTO", "lugar_exacto_del_evento", "Lugar exacto del evento", "lugar exacto evento"],
  quien_reporta: ["QUIEN REPORTA (PRIMER REPORTE)", "quien_reporta_primer_reporte", "Quién reporta", "quien reporta"],
  medio_comunicacion_primer_reporte: ["MEDIO DE COMUNICACIÓN DEL PRIMER REPORTE", "medio_de_comunicacion_del_primer_reporte", "Medio de comunicación del primer reporte", "medio comunicacion"],
  estado_usuario_reportado: ["ESTADO DEL USUARIO REPORTADO", "estado_del_usuario_reportado", "Estado del usuario reportado"],
  acepta_atencion: ["ACEPTA ATENCION", "acepta_atencion", "Acepta atención"],
  atencion_inicial: ["ATENCION INICIAL", "atencion_inicial", "Atención inicial"],
  atencion_final: ["ATENCION FINAL", "atencion_final", "Atención final"],
  nivel_inicial: ["NIVEL INICIAL", "nivel_inicial", "Nivel inicial"],
  nivel_final: ["NIVEL FINAL", "nivel_final", "Nivel final"],
  hora_llamado_pco_sppa: ["HORA DE LLAMADO DEL PCO AL SPAA", "hora_llamado_pco_sppa", "Hora de llamado del PCO al SPAA"],
  hora_llegada_spaa: ["HORA DE LLEGADA DEL SPAA", "hora_llegada_spaa", "Hora de llegada del SPAA"],
  hora_inicio_spaa: ["HORA DE INICIO DEL SPAA", "hora_inicio_spaa", "Hora de inicio del SPAA"],
  hora_termino_atencion_inicio_traslado: ["HORA DE TERMINO DE ATENCIÓN / INICIO DE TRASLADO", "HORA DE TERMINO POR AE", "hora_termino_atencion_inicio_traslado", "Hora de término de atención / inicio de traslado"],
  estacion_partida_spaa: ["ESTACIÓN DE PARTIDA DEL SPAA", "estacion_de_partida_del_spaa", "Estación de partida del SPAA"],
  medio_transporte_spaa: ["MEDIO DE TRANSPORTE DEL SPAA", "medio_de_transporte_del_spaa", "Medio de transporte del SPAA"],
  trasladado_por: ["TRASLADADO POR", "trasladado_por", "Trasladado por"],
  estacion_partida_ambulancia: ["ESTACIÓN DE PARTIDA DE LA AMBULANCIA", "estacion_de_partida_de_la_ambulancia", "Estación de partida de la ambulancia"],
  estacion_llegada_ambulancia: ["ESTACIÓN DE LLEGADA DE LA AMBULANCIA", "estacion_de_llegada_de_la_ambulancia", "Estación de llegada de la ambulancia"],
  hora_llamado_ambulancia: ["HORA DE LLAMADO DE LA AMBULANCIA", "hora_llamado_ambulancia", "Hora de llamado de la ambulancia"],
  hora_llegada_estacion: ["HORA DE LLEGADA A LA ESTACIÓN", "hora_llegada_estacion", "Hora de llegada a la estación"],
  hora_salida_centro_salud: ["HORA DE SALIDA HACIA EL CENTRO DE SALUD", "hora_salida_centro_salud", "Hora de salida hacia el centro de salud"],
  hora_llegada_centro_medico: ["HORA DE LLEGADA AL CENTRO MÉDICO", "hora_llegada_centro_medico", "Hora de llegada al centro médico"],
  hora_retiro_centro_medico: ["HORA DE RETIRO DEL CENTRO MÉDICO", "hora_retiro_centro_medico", "Hora de retiro del centro médico"],
  hora_retorno_puesto: ["HORA DE RETORNO AL PUESTO", "hora_retorno_puesto", "Hora de retorno al puesto"],
  hora_llamado_ambulancia_tercero: ["HORA DE LLAMADO A AMBULANCIA DE TERCEROS", "hora_llamado_ambulancia_tercero", "Hora de llamado a ambulancia de terceros"],
  hora_llegada_ambulancia_terceros: ["HORA DE LLEGADA DE AMBULANCIA DE TERCEROS", "hora_llegada_ambulancia_terceros", "Hora de llegada de ambulancia de terceros"],
  hora_inicio_traslado_ambulancia_terceros: ["HORA DE INICIO DE TRASLADO DE AMBULANCIA DE TERCEROS", "hora_inicio_traslado_ambulancia_terceros", "Hora de inicio de traslado de ambulancia de terceros"],
  centro_salud: ["CENTRO DE SALUD", "centro_salud", "Centro de salud"],
  nombre_persona: ["NOMBRE DEL PASAJERO O TRANSEÚNTE", "Nombre del Cliente", "nombre_persona", "Nombre del pasajero o transeúnte"],
  dni: ["DNI", "DNI CLIENTE", "dni", "D.N.I."],
  sexo: ["SEXO", "sexo", "Sexo"],
  edad: ["EDAD", "edad", "Edad"],
  tarjeta_cliente: ["TARJETA CLIENTE", "tarjeta_cliente", "Tarjeta cliente"],
  reporte_pco: ["REPORTE DEL PCO", "reporte_del_pco", "Reporte del PCO"],
  reporte_cliente: ["REPORTE AL CLIENTE", "reporte_al_cliente", "Reporte al cliente"],
  diagnostico_presuntivo: ["DIAGNOSTICO PRESUNTIVO", "diagnostico_presuntivo", "Diagnóstico presuntivo"],
  sintomas_presentados: ["SÍNTOMAS PRESENTADOS", "sintomas_presentados", "Síntomas presentados"],
  zona_lesion: ["ZONA DE LA LESION", "zona_de_la_lesion", "Zona de la lesión"],
  categoria_paciente: ["CATEGORIA DE PACIENTE", "categoria_de_paciente", "Categoría de paciente"],
  nombre_personal_salud: ["NOMBRE DEL PERSONAL DE SALUD", "nombre_personal_salud", "Nombre del personal de salud"],
  tipo_declaracion_jurada: ["TIPO DE DECLARACIÓN JURADA", "tipo_de_declaracion_jurada", "Tipo de declaración jurada"],
  nro_declaracion_jurada: ["NÚMERO DE DECLARACIÓN JURADA", "nro_declaracion_jurada", "Número de declaración jurada"],
  breve_descripcion_hecho: ["BREVE DESCRIPCIÓN DEL HECHO", "breve_descripcion_hecho", "Breve descripción del hecho"],
  reserva_camaras: ["RESERVA DE CÁMARAS", "reserva_camaras", "Reserva de cámaras"],
  observacion: ["OBSERVACIÓN", "observacion", "Observación"],
  registro: ["REGISTRO", "registro", "Registro"],
  revision: ["REVISIÓN", "revision", "Revisión"],
  casos_sospechosos_covid_19: ["CASOS SOSPECHOSOS COVID-19", "casos_sospechosos_covid_19", "Casos sospechosos COVID-19"],
  estado: ["ESTADO", "estado", "Estado"],
  extranjero: ["EXTRANJERO", "extranjero", "Extranjero"],
  estacion_origen_usuario: ["ESTACIÓN DE ORIGEN DEL USUARIO", "estacion_de_origen_del_usuario", "Estación de origen del usuario"],
  estacion_destino_usuario: ["ESTACIÓN DE DESTINO DEL USUARIO", "ESTACION DE DESTINO DEL USURIO", "estacion_de_destino_del_usuario", "Estación de destino del usuario"],
  acompanante: ["ACOMPLEÑANTE", "acompanante", "Acompañante"],
  numero_dni_acompanante: ["NÚMERO DE DNI DEL ACOMPLEÑANTE", "numero_dni_acompanante", "Número de DNI del acompañante"],
};

const REQUIRED_COLUMNS: string[] = [
  "Fecha", "Hora de Reporte", "TIPO DE EVENTO", "LUGAR DEL EVENTO",
  "LUGAR EXACTO DEL EVENTO", "Quién reporta",
];

const ALL_COLUMNS: string[] = [
  "Fecha", "Hora de Reporte", "TIPO DE EVENTO", "LUGAR DEL EVENTO",
  "LUGAR EXACTO DEL EVENTO", "Quién reporta", "Medio de comunicación",
  "Estado del usuario", "Acepta atención", "Atención inicial",
  "Atención final", "Nivel inicial", "Nivel final", "Hora llamada PCO",
  "Hora llegada SPAA", "Hora inicio SPAA", "Hora término atención",
  "Estación partida SPAA", "Medio transporte SPAA", "Trasladado por",
  "Estación partida ambulancia", "Estación llegada ambulancia",
  "Hora llamada ambulancia", "Hora llegada estación",
  "Hora salida centro salud", "Hora llegada centro médico",
  "Hora retiro centro médico", "Hora retorno puesto",
  "Hora llamada ambulancia terceros", "Hora llegada ambulancia terceros",
  "Hora inicio traslado terceros", "Centro de salud",
  "Nombre persona", "DNI", "Sexo", "Edad", "Tarjeta cliente",
  "Reporte PCO", "Reporte cliente", "Diagnóstico presuntivo",
  "Síntomas presentados", "Zona lesión", "Categoría paciente",
  "Nombre personal salud", "Tipo declaración jurada",
  "Número declaración jurada", "Breve descripción",
  "Reserva cámaras", "Observación", "Registro", "Revisión",
  "Casos sospechosos COVID", "Estado", "Extranjero",
  "Estación origen usuario", "Estación destino usuario",
  "Acompañante", "Número DNI acompañante",
];

function getFieldValue(row: ContingenciaRow, field: string): string {
  const aliases = ALIASES[field];
  if (!aliases) return "";
  return getCell(row, aliases);
}

function rowToDto(row: ContingenciaRow): CreateContingenciaDto {
  const fecha = parseDate(getFieldValue(row, "fecha"));
  const hora_reporte = parseTime(getFieldValue(row, "hora_reporte"));

  return {
    fecha: fecha ? fecha.toISOString().slice(0, 10) : "",
    hora_reporte: hora_reporte ?? "",
    tipo_evento: getFieldValue(row, "tipo_evento") || "",
    lugar_evento: getFieldValue(row, "lugar_evento") || "",
    lugar_exacto_evento: getFieldValue(row, "lugar_exacto_evento") || "",
    quien_reporta: getFieldValue(row, "quien_reporta") || "",
    medio_comunicacion_primer_reporte: getFieldValue(row, "medio_comunicacion_primer_reporte") || undefined,
    estado_usuario_reportado: getFieldValue(row, "estado_usuario_reportado") || undefined,
    acepta_atencion: getFieldValue(row, "acepta_atencion") || undefined,
    atencion_inicial: getFieldValue(row, "atencion_inicial") || undefined,
    atencion_final: getFieldValue(row, "atencion_final") || undefined,
    nivel_inicial: getFieldValue(row, "nivel_inicial") || undefined,
    nivel_final: getFieldValue(row, "nivel_final") || undefined,
    hora_termino_ae: parseTime(getFieldValue(row, "hora_termino_atencion_inicio_traslado")) ?? undefined,
    hora_llamado_pco_sppa: parseTime(getFieldValue(row, "hora_llamado_pco_sppa")) ?? undefined,
    hora_llegada_spaa: parseTime(getFieldValue(row, "hora_llegada_spaa")) ?? undefined,
    hora_inicio_spaa: parseTime(getFieldValue(row, "hora_inicio_spaa")) ?? undefined,
    estacion_partida_spaa: getFieldValue(row, "estacion_partida_spaa") || undefined,
    medio_transporte_spaa: getFieldValue(row, "medio_transporte_spaa") || undefined,
    trasladado_por: getFieldValue(row, "trasladado_por") || undefined,
    estacion_partida_ambulancia: getFieldValue(row, "estacion_partida_ambulancia") || undefined,
    estacion_llegada_ambulancia: getFieldValue(row, "estacion_llegada_ambulancia") || undefined,
    hora_llamado_ambulancia: parseTime(getFieldValue(row, "hora_llamado_ambulancia")) ?? undefined,
    hora_llegada_estacion: parseTime(getFieldValue(row, "hora_llegada_estacion")) ?? undefined,
    hora_salida_centro_salud: parseTime(getFieldValue(row, "hora_salida_centro_salud")) ?? undefined,
    hora_llegada_centro_medico: parseTime(getFieldValue(row, "hora_llegada_centro_medico")) ?? undefined,
    hora_retiro_centro_medico: parseTime(getFieldValue(row, "hora_retiro_centro_medico")) ?? undefined,
    hora_retorno_puesto: parseTime(getFieldValue(row, "hora_retorno_puesto")) ?? undefined,
    hora_llamado_ambulancia_tercero: parseTime(getFieldValue(row, "hora_llamado_ambulancia_tercero")) ?? undefined,
    hora_llegada_ambulancia_terceros: parseTime(getFieldValue(row, "hora_llegada_ambulancia_terceros")) ?? undefined,
    hora_inicio_traslado_ambulancia_terceros: parseTime(getFieldValue(row, "hora_inicio_traslado_ambulancia_terceros")) ?? undefined,
    centro_salud: getFieldValue(row, "centro_salud") || undefined,
    nombre_persona: getFieldValue(row, "nombre_persona") || undefined,
    dni: getFieldValue(row, "dni") || undefined,
    sexo: getFieldValue(row, "sexo") || undefined,
    edad: getFieldValue(row, "edad") ? Number(getFieldValue(row, "edad")) : undefined,
    tarjeta_cliente: getFieldValue(row, "tarjeta_cliente") || undefined,
    categoria_paciente: getFieldValue(row, "categoria_paciente") || undefined,
    extranjero: getFieldValue(row, "extranjero") || undefined,
    estacion_origen_usuario: getFieldValue(row, "estacion_origen_usuario") || undefined,
    estacion_destino_usuario: getFieldValue(row, "estacion_destino_usuario") || undefined,
    acompanante: getFieldValue(row, "acompanante") || undefined,
    numero_dni_acompanante: getFieldValue(row, "numero_dni_acompanante") || undefined,
    reporte_pco: getFieldValue(row, "reporte_pco") || undefined,
    reporte_cliente: getFieldValue(row, "reporte_cliente") || undefined,
    diagnostico_presuntivo: getFieldValue(row, "diagnostico_presuntivo") || undefined,
    sintomas_presentados: getFieldValue(row, "sintomas_presentados") || undefined,
    zona_lesion: getFieldValue(row, "zona_lesion") || undefined,
    nombre_personal_salud: getFieldValue(row, "nombre_personal_salud") || undefined,
    tipo_declaracion_jurada: getFieldValue(row, "tipo_declaracion_jurada") || undefined,
    nro_declaracion_jurada: getFieldValue(row, "nro_declaracion_jurada") || undefined,
    breve_descripcion_hecho: getFieldValue(row, "breve_descripcion_hecho") || undefined,
    reserva_camaras: getFieldValue(row, "reserva_camaras") || undefined,
    observacion: getFieldValue(row, "observacion") || undefined,
    registro: getFieldValue(row, "registro") || undefined,
    revision: getFieldValue(row, "revision") || undefined,
    casos_sospechosos_covid_19: getFieldValue(row, "casos_sospechosos_covid_19") || undefined,
    estado: (getFieldValue(row, "estado") || "Registrado") as "Registrado" | "Revisado" | "Cerrado",
  };
}

function findDuplicates(rows: ContingenciaRow[]): Set<number> {
  const duplicateRows = new Set<number>();
  const seenRows = new Set<string>();
  rows.forEach((row, index) => {
    if (isEmptyRow(row)) return;
    const signature = Object.keys(ALIASES).map((field) => normalizeText(getFieldValue(row, field))).join("|");
    if (seenRows.has(signature)) duplicateRows.add(index + 2);
    seenRows.add(signature);
  });
  return duplicateRows;
}

function validateField(row: ContingenciaRow, rowNumber: number, issues: ImportacionIssue[]): boolean {
  let valid = true;

  const requiredTextFields: Array<[string, string]> = [
    ["tipo_evento", "Tipo de evento"],
    ["lugar_evento", "Lugar del evento"],
    ["lugar_exacto_evento", "Lugar exacto del evento"],
    ["quien_reporta", "Quién reporta"],
  ];

  for (const [field, label] of requiredTextFields) {
    const value = getFieldValue(row, field);
    if (!value) {
      addIssue(issues, requiredIssue(rowNumber, label, value));
      valid = false;
    }
  }

  const fecha = parseDate(getFieldValue(row, "fecha"));
  if (!fecha) {
    addIssue(issues, { row: rowNumber, field: "Fecha", severity: "error", message: "La fecha no tiene un formato reconocido (YYYY-MM-DD).", value: getFieldValue(row, "fecha") });
    valid = false;
  }

  const horaReporte = parseTime(getFieldValue(row, "hora_reporte"));
  if (!horaReporte) {
    addIssue(issues, { row: rowNumber, field: "Hora de Reporte", severity: "error", message: "La hora de reporte no tiene un formato válido (HH:MM).", value: getFieldValue(row, "hora_reporte") });
    valid = false;
  }

  const maxLenFields: Record<string, number> = {
    tipo_evento: 100, lugar_evento: 160, lugar_exacto_evento: 180, quien_reporta: 120,
    medio_comunicacion_primer_reporte: 180, estado_usuario_reportado: 80, acepta_atencion: 20,
    atencion_inicial: 120, atencion_final: 120, nivel_inicial: 60, nivel_final: 60,
    estacion_partida_spaa: 160, medio_transporte_spaa: 120, trasladado_por: 120,
    estacion_partida_ambulancia: 160, estacion_llegada_ambulancia: 180,
    centro_salud: 180, nombre_persona: 180, dni: 20, sexo: 10,
    tarjeta_cliente: 60, categoria_paciente: 120, extranjero: 10,
    estacion_origen_usuario: 160, estacion_destino_usuario: 160, acompanante: 80,
    numero_dni_acompanante: 20, reporte_pco: 180, reporte_cliente: 180,
    diagnostico_presuntivo: 220, zona_lesion: 120, nombre_personal_salud: 180,
    tipo_declaracion_jurada: 20, nro_declaracion_jurada: 80,
    breve_descripcion_hecho: 5000, reserva_camaras: 120, observacion: 5000,
    registro: 120, revision: 120, casos_sospechosos_covid_19: 120,
  };

  for (const [field, max] of Object.entries(maxLenFields)) {
    const value = getFieldValue(row, field);
    if (value && value.length > max) {
      addIssue(issues, { row: rowNumber, field, severity: "error", message: `El campo "${field}" supera el máximo de ${max} caracteres.`, value });
      valid = false;
    }
  }

  const edadValue = getFieldValue(row, "edad");
  if (edadValue && Number.isNaN(Number(edadValue))) {
    addIssue(issues, { row: rowNumber, field: "Edad", severity: "error", message: "La edad debe ser un número válido.", value: edadValue });
    valid = false;
  }

  return valid;
}

async function buildPreview(payload: { filename: string | null; rows: ContingenciaRow[] }): Promise<ImportacionPreview> {
  const issues: ImportacionIssue[] = [];
  const { rows, filename } = payload;

  const columnasExcel = Object.keys(rows[0] || {}).map(normalizeText);
  const faltantes = REQUIRED_COLUMNS.filter((col) => !columnasExcel.includes(normalizeText(col)));
  if (faltantes.length > 0) {
    throw new Error(`Faltan columnas obligatorias: ${faltantes.join(", ")}`);
  }

  const duplicateRows = findDuplicates(rows);

  const parsed: Array<{ row: number; dto: CreateContingenciaDto; valid: boolean }> = [];
  const validRows: ContingenciaRow[] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    if (isEmptyRow(row)) return;

    const dto = rowToDto(row);
    const isValid = validateField(row, rowNumber, issues);

    if (duplicateRows.has(rowNumber)) {
      addIssue(issues, { row: rowNumber, field: "Fecha/Tipo", severity: "warning", message: "Registro duplicado en el archivo.", value: dto.tipo_evento });
    }

    parsed.push({ row: rowNumber, dto, valid: isValid });
    if (isValid && !duplicateRows.has(rowNumber)) {
      validRows.push(row);
    }
  });

  const errores = issues.filter((i) => i.severity === "error").length;
  const advertencias = issues.filter((i) => i.severity === "warning").length;

  const cases: ImportacionCasePreview[] = parsed.map((p) => ({
    row: p.row,
    codigo: `PC-${new Date().getUTCFullYear()}-${p.row}`,
    titulo: p.dto.tipo_evento || "Sin tipo",
    tipo: p.dto.tipo_evento || "Sin tipo",
    estado: p.dto.estado || "Registrado",
    estacion: p.dto.lugar_evento || "Sin lugar",
    area: null,
    riesgo: null,
    fecha: p.dto.fecha || "Sin fecha",
    planes: 0,
    status: !p.valid ? "error" : duplicateRows.has(p.row) ? "skipped" : "valid",
  }));

  return {
    filename,
    resumen: {
      totalFilas: rows.filter((r) => !isEmptyRow(r)).length,
      casosDetectados: parsed.length,
      planesDetectados: 0,
      listos: validRows.length,
      duplicados: duplicateRows.size,
      errores,
      advertencias,
    },
    issues,
    cases,
    canImport: errores === 0 && validRows.length > 0,
    requiredColumns: REQUIRED_COLUMNS,
    optionalColumns: ALL_COLUMNS.filter((col) => !REQUIRED_COLUMNS.includes(col)),
  };
}

async function importContingencias(filename: string, rows: ContingenciaRow[], userId: number): Promise<ImportacionResult> {
  const preview = await buildPreview({ filename, rows });

  if (!preview.canImport) {
    throw new Error("El archivo tiene errores de validación. Corrige los datos antes de importar.");
  }

  const validRows = rows.filter((row) => {
    if (isEmptyRow(row)) return false;
    return validateField(row, 0, []);
  });

  let importados = 0;
  const importErrors: ImportacionIssue[] = [];
  const actor = { id_usuario: userId, correo: "importacion", rol: null, rol_nombre: "Admin" };

  const lotes = Array.from({ length: Math.ceil(validRows.length / INSERT_CHUNK) }, (_, i) =>
    validRows.slice(i * INSERT_CHUNK, (i + 1) * INSERT_CHUNK)
  );

  for (const lote of lotes) {
    const promises: Promise<void>[] = [];
    for (const row of lote) {
      promises.push((async () => {
        try {
          const dto = rowToDto(row);
          const parsed = createContingenciaSchema.parse(dto);
          await ContingenciaRepository.create(parsed, actor.id_usuario, { preserveImportedValues: true });
          importados++;
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          importErrors.push({ row: 0, field: "General", severity: "error", message: msg, value: null });
        }
      })());

      if (promises.length >= MAX_CONCURRENT) {
        await Promise.all(promises);
        promises.length = 0;
      }
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
  }

  return {
    ...preview,
    imported: {
      casos: 0,
      eventos: importados,
      planes: 0,
      skipped: preview.resumen.duplicados,
    },
    filename,
    issues: [...preview.issues, ...importErrors],
  };
}

export class ImportacionContingenciasService {
  static async validarContingencias(filename: string, rows: ContingenciaRow[]): Promise<ImportacionPreview> {
    return buildPreview({ filename, rows });
  }

  static async importarContingencias(filename: string, rows: ContingenciaRow[], userId: number): Promise<ImportacionResult> {
    return importContingencias(filename, rows, userId);
  }
}
