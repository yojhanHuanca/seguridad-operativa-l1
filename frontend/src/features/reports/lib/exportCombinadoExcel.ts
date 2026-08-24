import type { Worksheet } from "exceljs";
import { crearWorkbook, descargarWorkbook } from "@/lib/excelBranded";
import { isRiskLevel, riskCategory, type RiskCategory } from "@/features/cases/domain";
import { isPlanActivo, planDeadline } from "@/features/plans/lib/planDeadline";
import { daysUntil } from "@/lib/format";
import type { CaseListItem, PlanAccion } from "@/features/cases/types";

/**
 * Exportación "Casos + Planes" con el diseño de la plantilla BD del cliente:
 * una fila por plan de acción, con las columnas del caso (A-O) combinadas
 * verticalmente cuando un caso tiene varios planes — en vez de repetirlas en
 * cada fila, como hace el resto de exportaciones de la app.
 */

const COLUMNS = [
  "Nuevo código",
  "Fecha del hallazgo",
  "Fecha de evento",
  "Estado Hallazgo",
  "Días abierto",
  "Procedencia",
  "Tipo",
  "Descripción",
  "Responsable de Hallazgo/ Investigación/ RSO",
  "Tipo SOP",
  "Subtipo SOP",
  "Peligro",
  "Consecuencias",
  "Análisis de riesgo",
  "ACR",
  "Plan de Acción",
  "Descripción de Plan de Acción",
  "Área",
  "Responsable Plan de Acción",
  "Estado Plan de acción",
  "Fecha Plan",
  "Fecha reprogramada",
  "Días abierto plan de acción",
  "Anexos",
] as const;

const COLUMN_WIDTHS = [18, 14, 14, 13, 10, 16, 15, 60, 22, 15, 20, 22, 22, 20, 30, 20, 40, 16, 20, 16, 12, 14, 14, 12];

// Índices de columna (1-based).
const COL_CASO_FIRST = 1; // A
const COL_CASO_LAST = 15; // O
const COL_RIESGO = 14; // N
const COL_PLAN_FIRST = 16; // P
const COL_FECHA_PLAN = 21; // U
const COL_FECHA_REPROGRAMADA = 22; // V
const COL_DIAS_ABIERTO_PLAN = 23; // W

const AMARILLO = "FFFFFF00";
const NARANJA = "FFF4B183";
const VERDE = "FFC6E0B4";
const AZUL = "FFBDD7EE";
const BLANCO = "FFFFFFFF";

const RIESGO_FILL: Record<RiskCategory, string> = {
  inaceptable: "FFFDE2E1",
  no_deseable: "FFFCEEDC",
  aceptable_revision: "FFE4F0FC",
  aceptable_sin_revision: "FFE3F3E9",
};

const DATE_FMT = "dd/mm/yyyy";
const THIN = { style: "thin" as const, color: { argb: "FF9AA5A0" } };
const BORDER_ALL = { top: THIN, left: THIN, bottom: THIN, right: THIN };

/** Color del bloque de encabezado según la columna: A-K amarillo, L-O naranja, P-T verde, U-W blanco, X azul. */
function headerFillByColumn(col: number): string {
  if (col <= 11) return AMARILLO;
  if (col <= COL_CASO_LAST) return NARANJA;
  if (col <= 20) return VERDE;
  if (col <= COL_DIAS_ABIERTO_PLAN) return BLANCO;
  return AZUL;
}

function riesgoTexto(caso: CaseListItem): string {
  const riesgo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  if (!riesgo?.codigo) return "-";
  return `${riesgo.codigo}\n${riesgo.nombre}`;
}

function riesgoFill(caso: CaseListItem): string | null {
  const codigo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle?.codigo;
  if (!isRiskLevel(codigo)) return null;
  return RIESGO_FILL[riskCategory(codigo)];
}

function casoValores(caso: CaseListItem): (string | number | Date)[] {
  return [
    caso.codigo_sop,
    new Date(caso.fecha_hallazgo),
    caso.fecha_evento ? new Date(caso.fecha_evento) : "-",
    caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre,
    caso.dias_abierto ?? "-",
    caso.catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle?.nombre ?? "-",
    caso.catalogo_detalle_casos_sop_tipoTocatalogo_detalle?.nombre ?? "-",
    caso.descripcion,
    caso.usuarios_casos_sop_responsable_hallazgoTousuarios?.nombre ?? "-",
    caso.catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle?.nombre ?? "-",
    caso.catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle?.nombre ?? "-",
    caso.peligro ?? "-",
    caso.consecuencia ?? "-",
    riesgoTexto(caso),
    caso.acr ?? "-",
  ];
}

function writePlanRow(sheet: Worksheet, row: number, plan: PlanAccion) {
  const valores: Array<[number, string | number | Date]> = [
    [COL_PLAN_FIRST, plan.codigo_plan],
    [COL_PLAN_FIRST + 1, plan.descripcion],
    [COL_PLAN_FIRST + 2, plan.areas.nombre_area],
    [COL_PLAN_FIRST + 3, plan.usuarios.nombre],
    [COL_PLAN_FIRST + 4, plan.catalogo_detalle.nombre],
    [COL_FECHA_PLAN, new Date(plan.fecha_plan)],
  ];
  if (plan.fecha_reprogramada) valores.push([COL_FECHA_REPROGRAMADA, new Date(plan.fecha_reprogramada)]);

  valores.forEach(([col, valor]) => {
    const cell = sheet.getCell(row, col);
    cell.value = valor;
    if (col === COL_FECHA_PLAN || col === COL_FECHA_REPROGRAMADA) cell.numFmt = DATE_FMT;
  });

  // "Días abierto plan de acción" solo tiene sentido mientras el plan sigue
  // activo — un plan cerrado ya no tiene un plazo corriendo que mostrar.
  if (!isPlanActivo(plan)) return;
  const dias = daysUntil(planDeadline(plan));
  const cell = sheet.getCell(row, COL_DIAS_ABIERTO_PLAN);
  cell.value = dias;
  cell.font = { name: "Arial Narrow", size: 11, bold: true, color: { argb: dias < 0 ? "FFFFFFFF" : "FF000000" } };
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: dias < 0 ? "FFFF0000" : dias <= 7 ? "FFFFC000" : "FF00B050" },
  };
}

export async function exportarCombinadoExcel(casos: CaseListItem[], fileName: string) {
  const workbook = await crearWorkbook();
  const sheet = workbook.addWorksheet("Casos y planes");

  sheet.columns = COLUMN_WIDTHS.map((width, i) => ({ key: COLUMNS[i], width }));
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };

  const headerRow = sheet.getRow(1);
  headerRow.height = 30;
  COLUMNS.forEach((label, i) => {
    const col = i + 1;
    const cell = sheet.getCell(1, col);
    cell.value = label;
    cell.font = { name: "Arial Narrow", size: 10, bold: true, color: { argb: "FF000000" } };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: headerFillByColumn(col) } };
    cell.border = BORDER_ALL;
  });

  let currentRow = 2;
  for (const caso of casos) {
    const planes = caso.planes_accion;
    const groupStart = currentRow;
    const groupSize = Math.max(1, planes.length);

    casoValores(caso).forEach((valor, i) => {
      const col = COL_CASO_FIRST + i;
      const cell = sheet.getCell(groupStart, col);
      cell.value = valor;
      if (col === COL_RIESGO) {
        const fill = riesgoFill(caso);
        if (fill) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: fill } };
      }
      if (col === 2 || col === 3) cell.numFmt = DATE_FMT;
      if (groupSize > 1) sheet.mergeCells(groupStart, col, groupStart + groupSize - 1, col);
    });

    planes.forEach((plan, i) => writePlanRow(sheet, groupStart + i, plan));
    currentRow += groupSize;

    for (let row = groupStart; row < currentRow; row++) {
      for (let col = 1; col <= COLUMNS.length; col++) {
        const cell = sheet.getCell(row, col);
        cell.border = BORDER_ALL;
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        cell.font ??= { name: "Arial Narrow", size: 11 };
      }
    }
  }

  await descargarWorkbook(workbook, fileName);
}
