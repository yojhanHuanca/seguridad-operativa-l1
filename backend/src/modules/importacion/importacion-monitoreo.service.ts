import prisma from "../../lib/prisma.js";
import { EventoRepository } from "../eventos/evento.repository.js";
import type { CreateEventoDto } from "../eventos/evento.types.js";
import type { ImportacionIssue, ImportacionPreview, ImportacionRow, ImportacionResult } from "./importacion.types.js";
import { ImportacionHistorialService } from "./importacion-historial.service.js";

interface MonitoreoRow extends ImportacionRow {}

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

function getCell(row: MonitoreoRow, aliases: readonly string[]): string {
  for (const [key, value] of Object.entries(row)) {
    const normalizedKey = normalizeText(key);
    for (const alias of aliases) {
      if (normalizedKey === normalizeText(alias)) return cleanCell(value);
    }
  }
  return "";
}

function isEmptyRow(row: MonitoreoRow): boolean {
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

function parseDecimal(value: string): number | null {
  const raw = value.trim();
  if (!raw) return null;
  const num = Number(raw);
  return Number.isNaN(num) ? null : num;
}

const ALIASES: Record<string, readonly string[]> = {
  fecha: ["Fecha", "FECHA", "fecha"],
  hora: ["Hora de evento", "HORA DE EVENTO", "hora", "hora_evento"],
  tipo_incidente: ["TIPO DE INCIDENTE OPERATIVO", "tipo_de_incidente_operativo", "Tipo de incidente operativo", "tipo incidente operativo"],
  descripcion: ["DESCRIPCION DEL EVENTO", "descripcion_del_evento", "Descripción del evento", "descripcion del evento"],
  ubicacion: ["UBICACION", "ubicacion", "Ubicación"],
  lugar_incidente: ["LUGAR DE INCIDENTE", "lugar_del_incidente", "Lugar de Incidente", "lugar incidente"],
  anio: ["AÑO", "año", "Ano"],
  mes: ["MES", "mes", "Mes"],
  mes1: ["MES_1", "mes_1", "Mes_1"],
  semana: ["SEMANA", "semana", "Sem"],
  dia: ["DÍA", "dia", "Dia"],
  rango_horario: ["RANGO HORARIO", "rango_horario", "Rango horario"],
  tipo_via: ["TIPO DE VÍA", "tipo_de_via", "Tipo de vía", "tipo via"],
  direccion_via: ["DIRECCIÓN DE VÍA", "direccion_de_via", "Dirección de vía", "direccion via"],
  modelo_mr: ["MODELO MR", "modelo_mr", "Modelo MR"],
  numero_mr: ["NRO. MR", "nro_mr", "Nro. MR", "numero_mr"],
  numero_carrera: ["NRO. CARRERA", "nro_carrera", "Nro. Carrera", "numero_carrera"],
  personal_involucrado: ["PERSONAL O FALLA INVOLUCRADO", "personal_o_falla_involucrado", "Personal o falla Involucrado", "personal_involucrado"],
  tipo_causa: ["TIPO CAUSA", "tipo_causa", "Tipo Causa"],
  posible_causa: ["POSIBLE CAUSA", "posible_causa", "Posible Causa"],
  informacion_adicional: ["INFORMACIÓN ADICIONAL", "informacion_adicional", "Información adicional"],
  camara_monitoreada: ["CÁMARA MONITOREADA", "camara_monitoreada", "Cámara monitoreada", "camara monitoreada"],
  demora: ["DEMORA", "demora", "Demora"],
};

const REQUIRED_COLUMNS: string[] = [
  "Fecha", "Hora de evento", "TIPO DE INCIDENTE OPERATIVO",
  "DESCRIPCION DEL EVENTO", "UBICACION", "LUGAR DE INCIDENTE",
];

const ALL_COLUMNS: string[] = [
  "Fecha", "Hora de evento", "Tipo de incidente operativo",
  "Descripción del evento", "Ubicación", "Lugar de Incidente",
  "Año", "Mes", "Mes_1", "Sem", "Día", "Rango horario",
  "Tipo de vía", "Dirección de vía", "Modelo MR", "Nro. MR",
  "Nro. Carrera", "Personal o falla Involucrado", "Tipo Causa",
  "Posible Causa", "Información adicional", "Cámara monitoreada", "DEMORA",
];

interface CatalogCache {
  catalogos: Record<string, Record<string, number>>;
}

function getFieldValue(row: MonitoreoRow, field: string): string {
  const aliases = ALIASES[field];
  if (!aliases) return "";
  return getCell(row, aliases);
}

function rowToDto(row: MonitoreoRow): CreateEventoDto {
  const fecha = parseDate(getFieldValue(row, "fecha"));
  const hora = parseTime(getFieldValue(row, "hora"));

  return {
    fecha: fecha ? fecha.toISOString().slice(0, 10) : "",
    hora: hora ?? "",
    id_tipo_incidente: 0,
    descripcion: getFieldValue(row, "descripcion") || undefined,
    id_ubicacion: 0,
    id_tipo_via: 0,
    id_direccion_via: 0,
    id_lugar_incidente: 0,
    id_modelo_mr: 0,
    id_numero_mr: 0,
    numero_carrera: getFieldValue(row, "numero_carrera") || undefined,
    id_personal_involucrado: 0,
    id_tipo_causa: 0,
    id_posible_causa: 0,
    informacion_adicional: getFieldValue(row, "informacion_adicional") || undefined,
    camara_monitoreada: getFieldValue(row, "camara_monitoreada") || undefined,
    demora: parseDecimal(getFieldValue(row, "demora")) ?? undefined,
    anio: getFieldValue(row, "anio") ? Number(getFieldValue(row, "anio")) : undefined,
    mes: getFieldValue(row, "mes") ? Number(getFieldValue(row, "mes")) : undefined,
    semana: getFieldValue(row, "semana") ? Number(getFieldValue(row, "semana")) : undefined,
    dia: getFieldValue(row, "dia") || undefined,
    id_rango_horario: 0,
  };
}

function validarCatalogosCache(row: MonitoreoRow, catalogos: CatalogCache): void {
  const CATALOGOS_POR_CAMPO: Record<string, string> = {
    tipo_incidente: "Tipo de incidente operativo",
    ubicacion: "Ubicación",
    tipo_via: "Tipo de vía",
    direccion_via: "Dirección de vía",
    lugar_incidente: "Lugar de Incidente",
    modelo_mr: "Modelo MR",
    numero_mr: "Nro. MR",
    personal_involucrado: "Personal o falla Involucrado",
    tipo_causa: "Tipo Causa",
    posible_causa: "Posible Causa",
    rango_horario: "Rango horario",
  };

  for (const [campo, codigoCatalogo] of Object.entries(CATALOGOS_POR_CAMPO)) {
    const valorTexto = getFieldValue(row, campo);
    if (!valorTexto) continue;
    const existe = catalogos.catalogos[codigoCatalogo]?.[normalizeText(valorTexto)];
    if (!existe) {
      throw new Error(`El valor "${valorTexto.trim()}" no pertenece al catálogo "${codigoCatalogo}".`);
    }
  }
}

function validateField(row: MonitoreoRow, rowNumber: number, issues: ImportacionIssue[], catalogos: CatalogCache): boolean {
  let valid = true;

  const fecha = parseDate(getFieldValue(row, "fecha"));
  if (!fecha) {
    addIssue(issues, { row: rowNumber, field: "Fecha", severity: "error", message: "La fecha no tiene un formato reconocido (YYYY-MM-DD).", value: getFieldValue(row, "fecha") });
    valid = false;
  }

  const horaReporte = parseTime(getFieldValue(row, "hora"));
  if (!horaReporte) {
    addIssue(issues, { row: rowNumber, field: "Hora de evento", severity: "error", message: "La hora de evento no tiene un formato válido (HH:MM).", value: getFieldValue(row, "hora") });
    valid = false;
  }

  const maxLenFields: Record<string, number> = {
    descripcion: 2000, informacion_adicional: 2000, camara_monitoreada: 50, numero_carrera: 30,
  };

  for (const [field, max] of Object.entries(maxLenFields)) {
    const value = getFieldValue(row, field);
    if (value && value.length > max) {
      addIssue(issues, { row: rowNumber, field, severity: "error", message: `El campo "${field}" supera el máximo de ${max} caracteres.`, value });
      valid = false;
    }
  }

  const demoraValue = getFieldValue(row, "demora");
  if (demoraValue && Number.isNaN(Number(demoraValue))) {
    addIssue(issues, { row: rowNumber, field: "Demora", severity: "error", message: "La demora debe ser un número válido.", value: demoraValue });
    valid = false;
  }

  const tipoEvento = getFieldValue(row, "tipo_incidente");
  if (!tipoEvento) {
    addIssue(issues, { row: rowNumber, field: "Tipo de incidente operativo", severity: "error", message: 'El campo "Tipo de incidente operativo" es obligatorio.', value: "" });
    valid = false;
  }

  const descripcion = getFieldValue(row, "descripcion");
  if (!descripcion) {
    addIssue(issues, { row: rowNumber, field: "Descripción del evento", severity: "error", message: 'El campo "Descripción del evento" es obligatorio.', value: "" });
    valid = false;
  }

  const ubicacion = getFieldValue(row, "ubicacion");
  if (!ubicacion) {
    addIssue(issues, { row: rowNumber, field: "Ubicación", severity: "error", message: 'El campo "Ubicación" es obligatorio.', value: "" });
    valid = false;
  }

  const lugarIncidente = getFieldValue(row, "lugar_incidente");
  if (!lugarIncidente) {
    addIssue(issues, { row: rowNumber, field: "Lugar de Incidente", severity: "error", message: 'El campo "Lugar de Incidente" es obligatorio.', value: "" });
    valid = false;
  }

  try {
    validarCatalogosCache(row, catalogos);
  } catch (error) {
    addIssue(issues, { row: rowNumber, field: "catálogo", severity: "error", message: error instanceof Error ? error.message : "Valor no válido en catálogo", value: "" });
    valid = false;
  }

  return valid;
}

function findDuplicates(rows: MonitoreoRow[]): Set<number> {
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

async function loadCatalogos(): Promise<CatalogCache> {
  const catalogos = await prisma.catalogo_detalle.findMany({
    include: { catalogos: { select: { nombre: true } } },
    where: { estado: true },
  });

  const cache: CatalogCache = { catalogos: {} };
  const catalogoNames = [
    "Tipo de incidente operativo", "Ubicación", "Tipo de vía",
    "Dirección de vía", "Lugar de Incidente", "Modelo MR",
    "Nro. MR", "Personal o falla Involucrado", "Tipo Causa",
    "Posible Causa", "Rango horario",
  ];

  for (const detalle of catalogos) {
    const nombreCatalogo = detalle.catalogos?.nombre ?? "";
    if (!catalogoNames.includes(nombreCatalogo)) continue;
    if (!cache.catalogos[nombreCatalogo]) {
      cache.catalogos[nombreCatalogo] = {};
    }
    cache.catalogos[nombreCatalogo][normalizeText(detalle.nombre)] = detalle.id_detalle;
  }

  return cache;
}

async function buildPreview(payload: { filename: string | null; rows: MonitoreoRow[] }, catalogos: CatalogCache): Promise<ImportacionPreview> {
  const issues: ImportacionIssue[] = [];
  const { rows, filename } = payload;

  const columnasExcel = Object.keys(rows[0] || {}).map(normalizeText);
  const faltantes = REQUIRED_COLUMNS.filter((col) => !columnasExcel.includes(normalizeText(col)));
  if (faltantes.length > 0) {
    throw new Error(`Faltan columnas obligatorias: ${faltantes.join(", ")}`);
  }

  const duplicateRows = findDuplicates(rows);

  const parsed: Array<{ row: number; valid: boolean }> = [];
  const validRows: MonitoreoRow[] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    if (isEmptyRow(row)) return;

    const isValid = validateField(row, rowNumber, issues, catalogos);

    if (duplicateRows.has(rowNumber)) {
      addIssue(issues, { row: rowNumber, field: "Fecha/Tipo", severity: "warning", message: "Registro duplicado en el archivo.", value: getFieldValue(row, "tipo_incidente") });
    }

    parsed.push({ row: rowNumber, valid: isValid });
    if (isValid && !duplicateRows.has(rowNumber)) {
      validRows.push(row);
    }
  });

  const errores = issues.filter((i) => i.severity === "error").length;
  const advertencias = issues.filter((i) => i.severity === "warning").length;

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
    cases: parsed.map((p) => ({
      row: p.row,
      codigo: `EVT-${new Date().getUTCFullYear()}-${p.row}`,
      titulo: getFieldValue(rows[p.row - 2] || {}, "descripcion") || "Sin descripción",
      tipo: getFieldValue(rows[p.row - 2] || {}, "tipo_incidente") || "Sin tipo",
      estado: "Registrado",
      estacion: getFieldValue(rows[p.row - 2] || {}, "ubicacion") || "Sin ubicación",
      area: null,
      riesgo: null,
      fecha: getFieldValue(rows[p.row - 2] || {}, "fecha") || "Sin fecha",
      planes: 0,
      status: !p.valid ? "error" : duplicateRows.has(p.row) ? "skipped" : "valid",
    })),
    canImport: errores === 0 && validRows.length > 0,
    requiredColumns: REQUIRED_COLUMNS,
    optionalColumns: ALL_COLUMNS.filter((col) => !REQUIRED_COLUMNS.includes(col)),
  };
}

async function importMonitoreo(filename: string, rows: MonitoreoRow[], userId: number): Promise<ImportacionResult> {
  const catalogos = await loadCatalogos();

  const preview = await buildPreview({ filename, rows }, catalogos);

  if (!preview.canImport) {
    throw new Error("El archivo tiene errores de validación. Corrige los datos antes de importar.");
  }

  const validRows = rows.filter((row) => {
    if (isEmptyRow(row)) return false;
    return validateField(row, 0, [], catalogos);
  });

  let importados = 0;
  const importErrors: ImportacionIssue[] = [];

  const actor = { id_usuario: userId, correo: "importacion", rol: null, rol_nombre: "Admin" };
  const carga = await ImportacionHistorialService.iniciar("monitoreo", filename, userId, rows.length);

  const lotes = Array.from({ length: Math.ceil(validRows.length / INSERT_CHUNK) }, (_, i) =>
    validRows.slice(i * INSERT_CHUNK, (i + 1) * INSERT_CHUNK)
  );

  for (const lote of lotes) {
    const promises: Promise<void>[] = [];
    for (const row of lote) {
      promises.push((async () => {
        try {
          const dto = rowToDto(row);

          const tipoIncidenteValor = getFieldValue(row, "tipo_incidente");
          const ubicacionValor = getFieldValue(row, "ubicacion");
          const tipoViaValor = getFieldValue(row, "tipo_via");
          const direccionViaValor = getFieldValue(row, "direccion_via");
          const lugarIncidenteValor = getFieldValue(row, "lugar_incidente");
          const modeloMrValor = getFieldValue(row, "modelo_mr");
          const numeroMrValor = getFieldValue(row, "numero_mr");
          const personalValor = getFieldValue(row, "personal_involucrado");
          const tipoCausaValor = getFieldValue(row, "tipo_causa");
          const posibleCausaValor = getFieldValue(row, "posible_causa");
          const rangoHorarioValor = getFieldValue(row, "rango_horario");

          const eventoDto: CreateEventoDto = {
            fecha: dto.fecha,
            hora: dto.hora,
            id_tipo_incidente: catalogos.catalogos["Tipo de incidente operativo"]?.[normalizeText(tipoIncidenteValor)] ?? 0,
            descripcion: dto.descripcion,
            id_ubicacion: catalogos.catalogos["Ubicación"]?.[normalizeText(ubicacionValor)] ?? undefined,
            id_tipo_via: catalogos.catalogos["Tipo de vía"]?.[normalizeText(tipoViaValor)] ?? undefined,
            id_direccion_via: catalogos.catalogos["Dirección de vía"]?.[normalizeText(direccionViaValor)] ?? undefined,
            id_lugar_incidente: catalogos.catalogos["Lugar de Incidente"]?.[normalizeText(lugarIncidenteValor)] ?? undefined,
            id_modelo_mr: catalogos.catalogos["Modelo MR"]?.[normalizeText(modeloMrValor)] ?? undefined,
            id_numero_mr: catalogos.catalogos["Nro. MR"]?.[normalizeText(numeroMrValor)] ?? undefined,
            numero_carrera: dto.numero_carrera,
            id_personal_involucrado: catalogos.catalogos["Personal o falla Involucrado"]?.[normalizeText(personalValor)] ?? undefined,
            id_tipo_causa: catalogos.catalogos["Tipo Causa"]?.[normalizeText(tipoCausaValor)] ?? undefined,
            id_posible_causa: catalogos.catalogos["Posible Causa"]?.[normalizeText(posibleCausaValor)] ?? undefined,
            informacion_adicional: dto.informacion_adicional,
            camara_monitoreada: dto.camara_monitoreada,
            demora: dto.demora,
            anio: dto.anio,
            mes: dto.mes,
            semana: dto.semana,
            dia: dto.dia,
            id_rango_horario: catalogos.catalogos["Rango horario"]?.[normalizeText(rangoHorarioValor)] ?? undefined,
          };

          await EventoRepository.create(eventoDto, actor.id_usuario, { preserveImportedValues: true, idImportacion: carga.id_importacion });
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

  const result = {
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
  await ImportacionHistorialService.completar(carga.id_importacion, { importados, duplicados: preview.resumen.duplicados, errores: importErrors.length, resumen: result.imported });
  return result;
}

export class ImportacionMonitoreoService {
  static async validarMonitoreo(filename: string, rows: MonitoreoRow[]): Promise<ImportacionPreview> {
    const catalogos = await loadCatalogos();
    return buildPreview({ filename, rows }, catalogos);
  }

  static async importarMonitoreo(filename: string, rows: MonitoreoRow[], userId: number): Promise<ImportacionResult> {
    return importMonitoreo(filename, rows, userId);
  }
}
