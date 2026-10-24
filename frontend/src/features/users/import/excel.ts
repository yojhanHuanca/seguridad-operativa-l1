import type { Cell } from "exceljs";
import { readExcelWorkbook } from "@/lib/readExcelWorkbook";
import type { UserImportFile, UserImportResult, UserImportRow } from "./types";

export const MAX_USER_IMPORT_ROWS = 200;
export const YELLOW_FIELDS = [
  { key: "nombre", label: "Apellidos y Nombres" },
  { key: "cargo", label: "Rol/Puesto" },
  { key: "unidad_organizativa", label: "Unidad Organizativa" },
  { key: "correo", label: "Correo laboral" },
  { key: "telefono", label: "Celular Personal" },
  { key: "jefe_inmediato", label: "Jefe inmediato" },
] as const;
type Field = typeof YELLOW_FIELDS[number]["key"];
const normalizeHeader = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

function fieldForHeader(value: string): Field | undefined {
  const key = normalizeHeader(value);
  const workEmailHeaders = ["correolaboral", "laboralinformaciondecorreoelectronicocorreoelectronico", "laboralinformacindecorreoelectrnicocorreoelectrnico"];
  if (workEmailHeaders.includes(key)) return "correo";
  return YELLOW_FIELDS.find(field => normalizeHeader(field.label) === key)?.key;
}

function readCell(cell: Cell): string {
  const value = cell.value;
  if (value == null) return "";
  if (typeof value === "object" && ("formula" in value || "sharedFormula" in value)) {
    throw new Error(`La celda ${cell.address} contiene una fórmula. Pega su valor como texto antes de importar.`);
  }
  if (typeof value === "object" && "richText" in value) return value.richText.map(part => part.text).join("").trim();
  if (typeof value === "object" && "hyperlink" in value) return String(value.text ?? "").trim();
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

export async function parseUserImportFile(file: File): Promise<UserImportFile> {
  if (!/\.xlsx$/i.test(file.name)) throw new Error("Selecciona un archivo Excel .xlsx.");
  if (file.size > 5 * 1024 * 1024) throw new Error("El archivo no puede superar 5 MB.");
  const buffer = await file.arrayBuffer();
  const signature = new Uint8Array(buffer, 0, Math.min(4, buffer.byteLength));
  if (signature[0] !== 0x50 || signature[1] !== 0x4b || signature[2] !== 3 || signature[3] !== 4) throw new Error("El archivo no tiene el formato de un Excel .xlsx válido.");
  const workbook = await readExcelWorkbook(buffer);
  const sheets: UserImportFile["sheets"] = [];
  for (const sheet of workbook.worksheets) {
    if (sheet.state !== "visible") continue;
    let columns: Partial<Record<Field, number>> = {};
    let headerRow = 0;
    for (let row = 1; row <= Math.min(sheet.rowCount, 20); row++) {
      const found: Partial<Record<Field, number>> = {};
      const repeated = new Set<Field>();
      for (let col = 1; col <= Math.min(sheet.columnCount, 100); col++) {
        const field = fieldForHeader(sheet.getCell(row, col).text);
        if (field) {
          if (found[field]) repeated.add(field);
          found[field] = col;
        }
      }
      if (YELLOW_FIELDS.every(field => found[field.key])) {
        if (repeated.size) throw new Error(`La hoja ${sheet.name} tiene columnas amarillas repetidas. Conserva una sola columna para cada campo.`);
        columns = found;
        headerRow = row;
        break;
      }
    }
    if (!headerRow) continue;
    if (sheet.rowCount > 10_000) throw new Error(`La hoja ${sheet.name} supera 10 000 filas. Copia el bloque de usuarios a un archivo nuevo.`);
    const rows: UserImportRow[] = [];
    for (let rowNumber = headerRow + 1; rowNumber <= sheet.rowCount; rowNumber++) {
      // Leer y conservar solo las seis columnas autorizadas, aun si el archivo
      // incluye DNI, fechas, correo personal u otros datos del padrón.
      const values = Object.fromEntries(YELLOW_FIELDS.map(field => [field.key, readCell(sheet.getCell(rowNumber, columns[field.key]!))])) as Record<Field, string>;
      if (!Object.values(values).some(Boolean)) continue;
      rows.push({ row: rowNumber, ...values, id_rol: null });
      if (rows.length > MAX_USER_IMPORT_ROWS) throw new Error(`Importa hasta ${MAX_USER_IMPORT_ROWS} usuarios por archivo. Divide la hoja en bloques más pequeños.`);
    }
    if (rows.length) sheets.push({ name: sheet.name, rows });
  }
  if (!sheets.length) throw new Error("No se encontró una hoja con usuarios y las seis columnas amarillas del formato recibido.");
  return { filename: file.name, sheets };
}

export function downloadTemporaryAccess(result: UserImportResult) {
  const escape = (value: string) => `"${(/^[=+\-@\t\r]/.test(value) ? "'" : "") + value.replace(/"/g, '""')}"`;
  const rows = [
    ["Código de usuario", "Correo laboral", "Contraseña temporal"],
    ...result.credentials.map(user => [user.codigo_usuario, user.correo, user.password_temporal]),
  ];
  const url = URL.createObjectURL(new Blob(["\uFEFF", rows.map(row => row.map(escape).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `accesos-temporales-${result.batchId.slice(0, 8)}.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
