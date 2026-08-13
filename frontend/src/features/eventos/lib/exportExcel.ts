import ExcelJS from "exceljs";
import { downloadBlob } from "@/lib/download";
import { CSV_HEADERS, filaCsv } from "./tabla";
import type { EventoListItem } from "../types";

/**
 * .xlsx real (no CSV) con el mismo formato de la hoja "LISTA DE EVENTOS" del
 * cliente: encabezado en negrita con fondo, columnas con ancho legible y fila
 * de encabezado congelada. Un CSV se abre en Excel sin ningún formato; esto
 * sí se ve como una hoja de cálculo de verdad al descargarlo.
 */
export async function exportarEventosExcel(eventos: EventoListItem[], fileName: string) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "SIGMA L1";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Lista de eventos", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = CSV_HEADERS.map((header) => ({
    header,
    key: header,
    width: Math.max(14, Math.min(32, header.length + 4)),
  }));

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F7A3D" } };
  headerRow.alignment = { vertical: "middle" };
  headerRow.height = 20;

  for (const evento of eventos) {
    sheet.addRow(filaCsv(evento));
  }

  const thinBorder = { style: "thin" as const, color: { argb: "FFE0E0E0" } };
  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = { top: thinBorder, left: thinBorder, bottom: thinBorder, right: thinBorder };
    });
  });

  // Filas alternadas para que se lea fácil, igual que una tabla dinámica de Excel.
  for (let i = 2; i <= sheet.rowCount; i++) {
    if (i % 2 === 0) {
      sheet.getRow(i).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F7F4" } };
    }
  }

  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: CSV_HEADERS.length } };

  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(
    new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    fileName
  );
}
