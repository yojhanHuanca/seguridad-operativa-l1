import {
  BRAND_BORDER,
  THIN_BORDER,
  TITLE_FILL,
  aplicarEncabezadoReporte,
  columnLetter,
  crearWorkbook,
  descargarWorkbook,
} from "@/lib/excelBranded";
import { CONTINGENCIA_FIELDS } from "../fields";
import type { ContingenciaListItem } from "../types";

const GROUP_ROW = 6;
const HEADER_ROW = 7;
const DATA_START_ROW = 8;
const TEXTAREA_FIELDS = new Set(["breve_descripcion_hecho", "observacion", "sintomas_presentados"]);

const EXCEL_LABELS: Record<string, string> = {
  fecha: "Fecha",
  hora_reporte: "Hora de Reporte",
  tipo_evento: "TIPO DE EVENTO",
  lugar_evento: "LUGAR DEL EVENTO",
  lugar_exacto_evento: "LUGAR EXACTO DEL EVENTO",
  quien_reporta: "QUIEN REPORTA (PRIMER REPORTE)",
  medio_comunicacion_primer_reporte: "MEDIO DE COMUNICACIÓN DEL PRIMER REPORTE",
  estado_usuario_reportado: "ESTADO DEL USUARIO REPORTADO",
  acepta_atencion: "ACEPTA ATENCION",
  atencion_inicial: "ATENCION INICIAL",
  atencion_final: "ATENCION FINAL",
  nivel_inicial: "NIVEL INICIAL",
  nivel_final: "NIVEL FINAL",
  hora_llamado_pco_sppa: "Hora de Llamado del PCO al SPPA (personal de salud)",
  hora_llegada_spaa: "Hora de llegada del SPAA",
  hora_inicio_spaa: "Hora inicio atencion del SPPA",
  hora_termino_atencion_inicio_traslado: "Hora de termino de Atención / Inicio de Traslado",
  estacion_partida_spaa: "Estación de Partida del SPAA",
  medio_transporte_spaa: "Medio de transporte del SPAA",
  trasladado_por: "TRASLADADO POR",
  estacion_partida_ambulancia: "ESTACIÓN DE PARTIDA DE LA AMBULANCIA",
  estacion_llegada_ambulancia: "ESTACIÓN DE LLEGADA DE LA AMBULANCIA",
  hora_llamado_ambulancia: "HORA DE LLAMADO DE LA AMBULANCIA",
  hora_llegada_estacion: "HORA DE LLEGADA A LA ESTACIÓN",
  hora_salida_centro_salud: "HORA DE SALIDA HACIA EL CENTRO DE SALUD",
  hora_llegada_centro_medico: "HORA DE LLEGADA AL CENTRO MÉDICO",
  hora_retiro_centro_medico: "HORA DE RETIRO DEL CENTRO MEDICO",
  hora_retorno_puesto: "HORA DE RETORNO AL PUESTO",
  hora_llamado_ambulancia_tercero: "HORA DE LLAMADO A AMBULANCIA TERCERO (SAMU/BOMBERO)",
  hora_llegada_ambulancia_terceros: "HORA DE LLEGADA DE AMBULANCIA TERCEROS",
  hora_inicio_traslado_ambulancia_terceros: "HORA DE INICIO DE TRASLADO LA AMBULANCIA TERCEROS",
  nombre_persona: "NOMBRE DEL PASAJERO O TRANSEUNTE",
  dni: "DNI DEL PASAJERO O TRANSEUNTE",
  sexo: "SEXO",
  edad: "EDAD",
  tarjeta_cliente: "TARJETA CLIENTE",
  reporte_pco: "REPORTE DEL PCO",
  reporte_cliente: "REPORTE AL CLIENTE",
  diagnostico_presuntivo: "DIAGNOSTICO PRESUNTIVO",
  sintomas_presentados: "SINTOMAS PRESENTADOS",
  zona_lesion: "ZONA DE LA LESION",
  categoria_paciente: "CATEGORIA DE PACIENTE",
  nombre_personal_salud: "NOMBRE DEL PERSONAL DEL SALUD",
  tipo_declaracion_jurada: "TIPO DE DECLARACIÓN JURADA",
  nro_declaracion_jurada: "Nro DECLARACION JURADA",
  breve_descripcion_hecho: "BREVE DESCRIPCION DEL HECHO",
  extranjero: "EXTRANJERO",
  estacion_origen_usuario: "ESTACIÓN DE ORIGEN DEL USUARIO",
  estacion_destino_usuario: "ESTACION DE DESTINO DEL USURIO",
  acompanante: "ACOMPAÑANTE",
  numero_dni_acompanante: "NUMERO DE DNI",
  reserva_camaras: "RESERVA DE CAMARAS",
  observacion: "OBSERVACION",
  registro: "REGISTRO",
  revision: "REVISION",
};
const GROUPS = [
  { title: "CONTROL", start: 1, end: 2, fill: "FFEAF5EE", font: "FF12352A" },
  { title: "DATOS GENERALES DEL EVENTO", start: 3, end: 15, fill: "FF8EA1B7", font: "FF000000" },
  { title: "SOPORTE DE PRIMEROS AUXILIOS (Personal de Salud)", start: 16, end: 22, fill: "FF8EA1B7", font: "FF000000" },
  { title: "TRASALADO AMBULANCIA", start: 23, end: 33, fill: "FFD9D9D9", font: "FF000000", headerFill: "FFFFF2CC" },
  { title: "DATOS DE LA ATENCIÓN", start: 34, end: 55, fill: "FF70AD47", font: "FF000000", headerFill: "FFE2F0D9" },
  { title: "GESTOR DE ATENCION", start: 56, end: 57, fill: "FFFFC1FF", font: "FF000000", headerFill: "FFFFC1FF" },
];

function value(input: unknown) {
  return input == null || input === "" ? "" : String(input);
}

function fieldValue(evento: ContingenciaListItem, name: string) {
  if (name in evento) return value(evento[name as keyof ContingenciaListItem]);
  if (evento.atencion && name in evento.atencion) return value(evento.atencion[name as keyof typeof evento.atencion]);
  if (evento.traslado && name in evento.traslado) return value(evento.traslado[name as keyof typeof evento.traslado]);
  if (evento.persona && name in evento.persona) return value(evento.persona[name as keyof typeof evento.persona]);
  if (evento.diagnostico && name in evento.diagnostico) return value(evento.diagnostico[name as keyof typeof evento.diagnostico]);
  if (evento.cierre && name in evento.cierre) return value(evento.cierre[name as keyof typeof evento.cierre]);
  return "";
}

function groupForColumn(column: number) {
  return GROUPS.find((group) => column >= group.start && column <= group.end);
}

function fill(argb: string) {
  return { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb } };
}


function textHeight(text: string, width: number) {
  if (!text) return 21;
  const lines = text.split(/\r?\n/).reduce((total, line) => total + Math.max(1, Math.ceil(line.length / Math.max(12, width - 2))), 0);
  return Math.min(120, Math.max(21, lines * 15 + 6));
}

function fitColumnsAndRows(sheet: ReturnType<import("exceljs").Workbook["addWorksheet"]>, headers: string[]) {
  const maxWidths = headers.map((header) => Math.max(12, Math.min(34, header.length + 4)));
  for (let rowNumber = DATA_START_ROW; rowNumber <= sheet.rowCount; rowNumber += 1) {
    const row = sheet.getRow(rowNumber);
    row.eachCell({ includeEmpty: false }, (cell, columnNumber) => {
      const text = String(cell.value ?? "");
      const current = maxWidths[columnNumber - 1] ?? 12;
      maxWidths[columnNumber - 1] = Math.min(60, Math.max(current, Math.ceil(Math.min(text.length + 4, 60))));
    });
  }

  maxWidths.forEach((width, index) => {
    sheet.getColumn(index + 1).width = width;
  });

  for (let rowNumber = DATA_START_ROW; rowNumber <= sheet.rowCount; rowNumber += 1) {
    const row = sheet.getRow(rowNumber);
    let height = 21;
    row.eachCell({ includeEmpty: false }, (cell, columnNumber) => {
      height = Math.max(height, textHeight(String(cell.value ?? ""), maxWidths[columnNumber - 1] ?? 18));
    });
    row.height = height;
  }
}

export async function exportarContingenciasExcel(eventos: ContingenciaListItem[], fileName: string) {
  const workbook = await crearWorkbook();
  const sheet = workbook.addWorksheet("Historial contingencias");
  const headers = ["ITEM", "Mes", ...CONTINGENCIA_FIELDS.map((field) => EXCEL_LABELS[String(field.name)] ?? field.label)];

  sheet.columns = headers.map((header, index) => ({
    key: `col_${index}`,
    width: Math.max(13, Math.min(34, header.length + 5)),
  }));

  await aplicarEncabezadoReporte(workbook, sheet, {
    title: "Historial de contingencias",
    subtitle: "Línea 1 · Gestión de Planes de Contingencia",
    totalLabel: `${eventos.length} registro${eventos.length === 1 ? "" : "s"} exportado${eventos.length === 1 ? "" : "s"}`,
    totalColumnas: headers.length,
  });

  sheet.views = [{ state: "frozen", ySplit: HEADER_ROW }];

  for (const group of GROUPS) {
    sheet.mergeCells(`${columnLetter(group.start)}${GROUP_ROW}:${columnLetter(group.end)}${GROUP_ROW}`);
    const cell = sheet.getCell(GROUP_ROW, group.start);
    cell.value = group.title;
    cell.fill = fill(group.fill);
    cell.font = { bold: true, size: 12, color: { argb: group.font } };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = { top: BRAND_BORDER, left: THIN_BORDER, bottom: BRAND_BORDER, right: THIN_BORDER };
  }

  sheet.getRow(GROUP_ROW).height = 24;
  sheet.getRow(HEADER_ROW).values = headers;
  sheet.getRow(HEADER_ROW).height = 56;

  for (let column = 1; column <= headers.length; column += 1) {
    const group = groupForColumn(column);
    const headerCell = sheet.getCell(HEADER_ROW, column);
    headerCell.fill = fill(group?.headerFill ?? (group?.fill === "FFEAF5EE" ? "FFEAF5EE" : "FFD9E2F3"));
    headerCell.font = { bold: true, color: { argb: "FF000000" } };
    headerCell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    headerCell.border = { top: THIN_BORDER, left: THIN_BORDER, bottom: BRAND_BORDER, right: THIN_BORDER };
  }

  eventos.forEach((evento, index) => {
    sheet.addRow([
      index + 1,
      evento.mes ?? "",
      ...CONTINGENCIA_FIELDS.map((field) => fieldValue(evento, field.name)),
    ]);
  });

  for (let rowNumber = DATA_START_ROW; rowNumber <= sheet.rowCount; rowNumber += 1) {
    const row = sheet.getRow(rowNumber);
    row.height = 21;
    for (let column = 1; column <= headers.length; column += 1) {
      const cell = row.getCell(column);
      cell.border = { top: THIN_BORDER, left: THIN_BORDER, bottom: THIN_BORDER, right: THIN_BORDER };
      cell.alignment = { vertical: "top", horizontal: column <= 2 ? "center" : "left", wrapText: true };
      if (rowNumber % 2 === 0) cell.fill = TITLE_FILL;
    }
  }

  fitColumnsAndRows(sheet, headers);
  sheet.getColumn(1).width = 10;
  sheet.getColumn(2).width = 10;

  CONTINGENCIA_FIELDS.forEach((field, index) => {
    const column = sheet.getColumn(index + 3);
    if (field.type === "date") column.numFmt = "yyyy-mm-dd";
    if (field.type === "number") column.numFmt = "0";
    if (TEXTAREA_FIELDS.has(String(field.name))) column.width = Math.max(column.width ?? 42, 48);
  });

  sheet.autoFilter = { from: { row: HEADER_ROW, column: 1 }, to: { row: HEADER_ROW, column: headers.length } };
  await descargarWorkbook(workbook, fileName);
}






