import {
  aplicarEncabezadoReporte,
  aplicarEstiloTabla,
  crearWorkbook,
  descargarWorkbook,
  TABLE_HEADER_ROW,
} from "@/lib/excelBranded";
import { CSV_HEADERS, filaCsv } from "./tabla";
import type { EventoListItem } from "../types";

export interface ResumenExcelRow {
  etiqueta: string;
  cantidad: number;
  porcentaje: number;
}

/**
 * .xlsx real (no CSV) con el mismo formato de la hoja "LISTA DE EVENTOS" del
 * cliente: encabezado en negrita con fondo, columnas con ancho legible y fila
 * de encabezado congelada. Un CSV se abre en Excel sin ningún formato; esto
 * sí se ve como una hoja de cálculo de verdad al descargarlo.
 */
export async function exportarEventosExcel(eventos: EventoListItem[], fileName: string) {
  const workbook = await crearWorkbook();

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
  const workbook = await crearWorkbook();
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
