import ExcelJS from "exceljs";
import { downloadBlob } from "@/lib/download";
import { CSV_HEADERS, filaCsv } from "./tabla";
import type { EventoListItem } from "../types";

export interface ResumenExcelRow {
  etiqueta: string;
  cantidad: number;
  porcentaje: number;
}

const HEADER_FILL = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: "FF0F7A3D" } };
const TITLE_FILL = { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: "FFEAF5EE" } };
const THIN_BORDER = { style: "thin" as const, color: { argb: "FFE0E0E0" } };
const BRAND_BORDER = { style: "medium" as const, color: { argb: "FF0F7A3D" } };
const TABLE_HEADER_ROW = 6;

function columnLetter(columnNumber: number) {
  let n = columnNumber;
  let letter = "";
  while (n > 0) {
    const remainder = (n - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    n = Math.floor((n - 1) / 26);
  }
  return letter;
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function cargarLogoBase64() {
  try {
    const response = await fetch("/logo-linea1.png");
    if (!response.ok) return null;
    return await blobToDataUrl(await response.blob());
  } catch {
    return null;
  }
}

function crearWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Seguridad Operativa";
  workbook.lastModifiedBy = "Seguridad Operativa";
  workbook.created = new Date();
  workbook.modified = new Date();
  return workbook;
}

async function aplicarEncabezadoReporte(
  workbook: ExcelJS.Workbook,
  sheet: ExcelJS.Worksheet,
  {
    title,
    subtitle,
    totalLabel,
    totalColumnas,
  }: {
    title: string;
    subtitle: string;
    totalLabel: string;
    totalColumnas: number;
  }
) {
  const lastColumn = Math.max(3, totalColumnas);
  const lastColumnLetter = columnLetter(lastColumn);
  const generatedAt = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  sheet.views = [{ state: "frozen", ySplit: TABLE_HEADER_ROW }];
  sheet.pageSetup = {
    orientation: totalColumnas > 8 ? "landscape" : "portrait",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    margins: { left: 0.35, right: 0.35, top: 0.45, bottom: 0.45, header: 0.2, footer: 0.2 },
  };

  for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= lastColumn; col++) {
      sheet.getCell(row, col).fill = row === 5 ? HEADER_FILL : TITLE_FILL;
    }
  }

  sheet.mergeCells(`A1:A4`);
  sheet.mergeCells(`B1:${lastColumnLetter}1`);
  sheet.mergeCells(`B2:${lastColumnLetter}2`);
  sheet.mergeCells(`B3:${lastColumnLetter}3`);
  sheet.mergeCells(`B4:${lastColumnLetter}4`);

  const logoBase64 = await cargarLogoBase64();
  if (logoBase64) {
    const imageId = workbook.addImage({ base64: logoBase64, extension: "png" });
    sheet.addImage(imageId, {
      tl: { col: 0.15, row: 0.25 },
      ext: { width: 112, height: 75 },
    });
  } else {
    const logoCell = sheet.getCell("A1");
    logoCell.value = "Línea 1";
    logoCell.font = { bold: true, size: 18, color: { argb: "FF0F7A3D" } };
    logoCell.alignment = { vertical: "middle", horizontal: "center" };
  }

  sheet.getCell("B1").value = "Seguridad Operativa · Línea 1";
  sheet.getCell("B1").font = { bold: true, size: 18, color: { argb: "FF12352A" } };
  sheet.getCell("B1").alignment = { vertical: "middle" };

  sheet.getCell("B2").value = title;
  sheet.getCell("B2").font = { bold: true, size: 14, color: { argb: "FF0F7A3D" } };
  sheet.getCell("B2").alignment = { vertical: "middle" };

  sheet.getCell("B3").value = subtitle;
  sheet.getCell("B3").font = { size: 11, color: { argb: "FF5F6F68" } };

  sheet.getCell("B4").value = `${totalLabel} · Generado: ${generatedAt}`;
  sheet.getCell("B4").font = { bold: true, size: 11, color: { argb: "FF34463D" } };

  sheet.getRow(1).height = 26;
  sheet.getRow(2).height = 22;
  sheet.getRow(3).height = 20;
  sheet.getRow(4).height = 20;
  sheet.getRow(5).height = 7;
  sheet.getColumn(1).width = Math.max(sheet.getColumn(1).width ?? 14, 18);

  for (let col = 1; col <= lastColumn; col++) {
    sheet.getCell(5, col).border = { bottom: BRAND_BORDER };
  }
}

function aplicarEstiloTabla(sheet: ExcelJS.Worksheet, totalColumnas: number) {
  const headerRow = sheet.getRow(TABLE_HEADER_ROW);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  headerRow.height = 24;

  for (let col = 1; col <= totalColumnas; col++) {
    sheet.getCell(TABLE_HEADER_ROW, col).fill = HEADER_FILL;
  }

  for (let rowNumber = TABLE_HEADER_ROW; rowNumber <= sheet.rowCount; rowNumber++) {
    const row = sheet.getRow(rowNumber);
    row.eachCell({ includeEmpty: false }, (cell) => {
      cell.border = { top: THIN_BORDER, left: THIN_BORDER, bottom: THIN_BORDER, right: THIN_BORDER };
      if (rowNumber > TABLE_HEADER_ROW) {
        cell.alignment = { vertical: "top", wrapText: true };
      }
    });
  }

  for (let i = TABLE_HEADER_ROW + 1; i <= sheet.rowCount; i++) {
    if (i % 2 === 0) {
      for (let col = 1; col <= totalColumnas; col++) {
        sheet.getCell(i, col).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F7F4" } };
      }
    }
  }

  sheet.autoFilter = { from: { row: TABLE_HEADER_ROW, column: 1 }, to: { row: TABLE_HEADER_ROW, column: totalColumnas } };
}

async function descargarWorkbook(workbook: ExcelJS.Workbook, fileName: string) {
  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(
    new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    fileName
  );
}

/**
 * .xlsx real (no CSV) con el mismo formato de la hoja "LISTA DE EVENTOS" del
 * cliente: encabezado en negrita con fondo, columnas con ancho legible y fila
 * de encabezado congelada. Un CSV se abre en Excel sin ningún formato; esto
 * sí se ve como una hoja de cálculo de verdad al descargarlo.
 */
export async function exportarEventosExcel(eventos: EventoListItem[], fileName: string) {
  const workbook = crearWorkbook();

  const sheet = workbook.addWorksheet("Lista de eventos");

  sheet.columns = CSV_HEADERS.map((header) => ({
    key: header,
    width: Math.max(14, Math.min(32, header.length + 4)),
  }));

  await aplicarEncabezadoReporte(workbook, sheet, {
    title: "Lista de eventos de monitoreo",
    subtitle: "Línea 1 · Metro de Lima · Reporte operativo",
    totalLabel: `${eventos.length} evento${eventos.length === 1 ? "" : "s"} exportado${eventos.length === 1 ? "" : "s"}`,
    totalColumnas: CSV_HEADERS.length,
  });

  sheet.getRow(TABLE_HEADER_ROW).values = CSV_HEADERS;

  for (const evento of eventos) {
    sheet.addRow(filaCsv(evento));
  }

  aplicarEstiloTabla(sheet, CSV_HEADERS.length);
  await descargarWorkbook(workbook, fileName);
}

export async function exportarResumenExcel(rows: ResumenExcelRow[], fileName: string, etiquetaHeader: string) {
  const workbook = crearWorkbook();
  const totalEventos = rows.reduce((sum, row) => sum + row.cantidad, 0);

  const sheet = workbook.addWorksheet("Resumen");

  sheet.columns = [
    { key: "etiqueta", width: Math.max(26, etiquetaHeader.length + 6) },
    { key: "cantidad", width: 22 },
    { key: "porcentaje", width: 18 },
  ];

  await aplicarEncabezadoReporte(workbook, sheet, {
    title: `Resumen por ${etiquetaHeader.toLowerCase()}`,
    subtitle: "Línea 1 · Metro de Lima · Reporte estadístico",
    totalLabel: `${rows.length} grupo${rows.length === 1 ? "" : "s"} · ${totalEventos} evento${totalEventos === 1 ? "" : "s"}`,
    totalColumnas: 3,
  });

  sheet.getRow(TABLE_HEADER_ROW).values = [etiquetaHeader, "Cantidad de eventos", "% del total"];

  for (const row of rows) {
    sheet.addRow({
      etiqueta: row.etiqueta,
      cantidad: row.cantidad,
      porcentaje: row.porcentaje,
    });
  }

  sheet.getColumn("cantidad").numFmt = "0";
  sheet.getColumn("porcentaje").numFmt = "0.00%";
  sheet.getColumn("cantidad").alignment = { horizontal: "right" };
  sheet.getColumn("porcentaje").alignment = { horizontal: "right" };

  aplicarEstiloTabla(sheet, 3);
  await descargarWorkbook(workbook, fileName);
}
