import type { CellValue, Worksheet } from "exceljs";
import { IMPORTACION_MODULOS } from "./importacionConfig";
import type { ImportacionIssue, ImportacionRow, ImportacionTipo } from "./types";

export interface ImportSheet {
  name: string;
  headers: string[];
  rows: ImportacionRow[];
}

export interface ParsedImportFile {
  filename: string;
  sheets: ImportSheet[];
}

const EXAMPLES: Record<Exclude<ImportacionTipo, "casos">, Record<string, string | number | Date>> = {
  monitoreo: {
    Fecha: new Date("2026-09-01T00:00:00Z"),
    "Hora de evento": "08:30",
    "Tipo de incidente operativo": "Accidente",
    "Descripción del evento": "Ejemplo: incidencia atendida en estación",
    Ubicación: "Estación",
    "Lugar de Incidente": "Andén",
  },
  contingencias: {
    Fecha: new Date("2026-09-01T00:00:00Z"),
    "Hora de Reporte": "08:30",
    "TIPO DE EVENTO": "Problemas de salud",
    "LUGAR DEL EVENTO": "Estación Central",
    "LUGAR EXACTO DEL EVENTO": "Andén 1",
    "Quién reporta": "Personal de estación",
  },
};

export const normalizeImportHeader = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");

function splitColumns(value: string) {
  return value.split(",").map(item => item.trim()).filter(Boolean);
}

function save(buffer: ArrayBuffer, filename: string) {
  const url = URL.createObjectURL(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function styleDataSheet(sheet: Worksheet, requiredCount: number) {
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: sheet.columnCount } };
  sheet.getRow(1).height = 34;
  sheet.getRow(1).eachCell((cell, column) => {
    cell.font = { bold: true, color: { argb: column <= requiredCount ? "FF065F46" : "FF475569" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: column <= requiredCount ? "FFD1FAE5" : "FFF1F5F9" } };
    cell.alignment = { vertical: "middle", wrapText: true };
    cell.border = { bottom: { style: "thin", color: { argb: "FFCBD5E1" } } };
  });
  sheet.columns.forEach(column => { column.width = 23; });
  sheet.getColumn(1).width = 15;
}

export async function downloadOfficialTemplate(tipo: "monitoreo" | "contingencias") {
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "SIGMA L1";
  const config = IMPORTACION_MODULOS[tipo];
  const required = splitColumns(config.requiredFallback);
  const optional = splitColumns(config.optionalFallback);
  const instructions = workbook.addWorksheet("Instrucciones", { views: [{ state: "frozen", ySplit: 4 }] });
  instructions.mergeCells("A1:F1");
  instructions.getCell("A1").value = `Plantilla oficial de ${config.label}`;
  instructions.getCell("A1").font = { bold: true, size: 18, color: { argb: "FFFFFFFF" } };
  instructions.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF08783E" } };
  instructions.getCell("A3").value = "Cómo completar la plantilla";
  instructions.getCell("A3").font = { bold: true, size: 13 };
  const notes = [
    "Completa únicamente la hoja Datos. No cambies los nombres de las columnas.",
    "Las columnas verdes son obligatorias. Las columnas grises son opcionales.",
    "Usa fechas con formato AAAA-MM-DD y horas con formato HH:mm.",
    "La fila 2 es un ejemplo: reemplázala o elimínala antes de importar.",
    "La validación no guarda información. La carga se realiza solo después de confirmar.",
  ];
  notes.forEach((note, index) => { instructions.getCell(index + 5, 1).value = `${index + 1}. ${note}`; });
  instructions.getColumn(1).width = 105;
  instructions.getRows(5, notes.length)?.forEach(row => { row.height = 26; row.alignment = { vertical: "middle", wrapText: true }; });

  const data = workbook.addWorksheet("Datos");
  data.addRow([...required, ...optional]);
  const example = EXAMPLES[tipo];
  data.addRow([...required, ...optional].map(header => example[header] ?? ""));
  styleDataSheet(data, required.length);
  data.getColumn(required.findIndex(header => normalizeImportHeader(header) === "fecha") + 1).numFmt = "yyyy-mm-dd";
  data.getRow(2).font = { italic: true, color: { argb: "FF64748B" } };
  save(await workbook.xlsx.writeBuffer() as ArrayBuffer, `plantilla-${tipo}.xlsx`);
}

export async function downloadErrorWorkbook(parsed: ParsedImportFile, sheetIndex: number, issues: ImportacionIssue[]) {
  const source = parsed.sheets[sheetIndex];
  if (!source) return;
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  const data = workbook.addWorksheet(source.name.slice(0, 25) || "Datos");
  data.addRow([...source.headers, "ERROR DE IMPORTACIÓN"]);
  const issuesByRow = new Map<number, ImportacionIssue[]>();
  issues.forEach(issue => issuesByRow.set(issue.row, [...(issuesByRow.get(issue.row) ?? []), issue]));
  source.rows.forEach((row, index) => {
    const rowIssues = issuesByRow.get(index + 2) ?? [];
    const excelRow = data.addRow([...source.headers.map(header => row[header] ?? ""), rowIssues.map(issue => issue.message).join(" | ")]);
    rowIssues.forEach(issue => {
      const column = source.headers.findIndex(header => normalizeImportHeader(header) === normalizeImportHeader(issue.field));
      if (column >= 0) excelRow.getCell(column + 1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFECACA" } };
    });
  });
  styleDataSheet(data, source.headers.length);
  data.getColumn(source.headers.length + 1).width = 55;
  const summary = workbook.addWorksheet("Resumen de errores");
  summary.addRow(["Fila", "Nivel", "Campo", "Mensaje", "Valor"]);
  issues.forEach(issue => summary.addRow([issue.row, issue.severity === "error" ? "Error" : "Advertencia", issue.field, issue.message, issue.value ?? ""]));
  styleDataSheet(summary, 4);
  save(await workbook.xlsx.writeBuffer() as ArrayBuffer, `errores-${parsed.filename.replace(/\.[^.]+$/, "")}.xlsx`);
}

export function cellToImportText(value: CellValue): string {
  if (value == null) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value !== "object") return String(value).trim();
  if ("result" in value) return cellToImportText(value.result as CellValue);
  if ("richText" in value) return value.richText.map(part => part.text).join("").trim();
  if ("text" in value) return value.text.trim();
  return "";
}
