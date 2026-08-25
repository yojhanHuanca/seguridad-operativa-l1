import { useMemo, useRef, useState } from "react";
import type { CellValue } from "exceljs";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  RefreshCw,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/design-system/primitives/Button";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useImportarCasos, useValidarImportacion } from "@/features/importacion/hooks/useImportacion";
import type { ImportacionPayload, ImportacionPreview, ImportacionResult, ImportacionRow } from "@/features/importacion/types";

const ACCEPTED_EXTENSIONS = [".csv", ".xlsx", ".xlsm"];

interface ParsedFile {
  filename: string;
  rows: ImportacionRow[];
}

function detectDelimiter(text: string): string {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const comma = (firstLine.match(/,/g) ?? []).length;
  const semicolon = (firstLine.match(/;/g) ?? []).length;
  return semicolon > comma ? ";" : ",";
}

function parseCsv(text: string): string[][] {
  const delimiter = detectDelimiter(text);
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const source = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === delimiter && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== undefined) {
      cell += char;
    }
  }

  if (cell || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }

  return rows.filter((item) => item.some((value) => value.trim() !== ""));
}

function cellToText(value: CellValue): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value !== "object") return String(value).trim();

  const record = value as unknown as Record<string, unknown>;
  if (typeof record.text === "string") return record.text.trim();
  if ("result" in record) return cellToText(record.result as CellValue);

  if (Array.isArray(record.richText)) {
    return record.richText
      .map((part) => {
        if (typeof part !== "object" || part === null) return "";
        const text = (part as { text?: unknown }).text;
        return typeof text === "string" ? text : "";
      })
      .join("")
      .trim();
  }

  return String(value).trim();
}

function matrixToRows(matrix: string[][]): ImportacionRow[] {
  const headers = matrix[0]?.map((header, index) => header.trim() || `Columna ${index + 1}`) ?? [];
  if (headers.length === 0) throw new Error("El archivo no tiene encabezados.");

  return matrix.slice(1).reduce<ImportacionRow[]>((acc, row) => {
    const item = headers.reduce<ImportacionRow>((record, header, index) => {
      record[header] = row[index]?.trim() ?? "";
      return record;
    }, {});
    if (Object.values(item).some((value) => String(value ?? "").trim() !== "")) acc.push(item);
    return acc;
  }, []);
}

async function parseXlsx(file: File): Promise<ImportacionRow[]> {
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const worksheet = workbook.worksheets[0];
  if (!worksheet) throw new Error("El archivo no tiene hojas.");

  const matrix: string[][] = [];
  worksheet.eachRow({ includeEmpty: false }, (sheetRow) => {
    const rowValues: string[] = [];
    sheetRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      rowValues[colNumber - 1] = cellToText(cell.value);
    });
    matrix.push(rowValues);
  });

  return matrixToRows(matrix);
}

async function parseFile(file: File): Promise<ParsedFile> {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!ACCEPTED_EXTENSIONS.includes(extension)) {
    throw new Error("Formato no soportado. Usa CSV, XLSX o XLSM.");
  }

  const rows = extension === ".csv" ? matrixToRows(parseCsv(await file.text())) : await parseXlsx(file);
  if (rows.length === 0) throw new Error("El archivo no contiene filas para importar.");

  return { filename: file.name, rows };
}

function payloadFromParsed(parsed: ParsedFile | null): ImportacionPayload | null {
  if (!parsed) return null;
  return { filename: parsed.filename, rows: parsed.rows };
}

function StatTile({ label, value, tone = "neutral" }: { label: string; value: number | string; tone?: "neutral" | "good" | "warn" | "bad" }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white px-4 py-3",
        tone === "good" && "border-emerald-200 bg-emerald-50/50",
        tone === "warn" && "border-amber-200 bg-amber-50/60",
        tone === "bad" && "border-red-200 bg-red-50/60",
        tone === "neutral" && "border-line",
      )}
    >
      <p className="text-[11px] font-medium text-ink-quiet">{label}</p>
      <p className="mt-1 text-[21px] font-bold tracking-tight text-ink">{value}</p>
    </div>
  );
}

function ValidationBadge({ preview }: { preview: ImportacionPreview | null }) {
  if (!preview) return null;
  if (preview.resumen.errores > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 text-[12px] font-semibold text-red-700 ring-1 ring-red-200">
        <XCircle className="h-3.5 w-3.5" /> Con errores
      </span>
    );
  }
  if (!preview.canImport && preview.resumen.duplicados > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-[12px] font-semibold text-amber-700 ring-1 ring-amber-200">
        <AlertTriangle className="h-3.5 w-3.5" /> Sin casos nuevos
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
      <CheckCircle2 className="h-3.5 w-3.5" /> Listo para importar
    </span>
  );
}

function ResultBanner({ result }: { result: ImportacionResult | null }) {
  if (!result) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      <span className="font-semibold">Importación completada:</span>
      <span>{result.imported.casos} casos</span>
      <span>{result.imported.eventos} eventos</span>
      <span>{result.imported.planes} planes</span>
    </div>
  );
}

export function AdminImportacionPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [preview, setPreview] = useState<ImportacionPreview | null>(null);
  const [result, setResult] = useState<ImportacionResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const validar = useValidarImportacion();
  const importar = useImportarCasos();

  const payload = useMemo(() => payloadFromParsed(parsed), [parsed]);
  const pending = validar.isPending || importar.isPending;
  const serverError = validar.error
    ? apiErrorMessage(validar.error, "No se pudo validar el archivo")
    : importar.error
      ? apiErrorMessage(importar.error, "No se pudo importar el archivo")
      : null;

  async function handleFileChange(file: File | undefined) {
    if (!file) return;
    setParseError(null);
    setPreview(null);
    setResult(null);
    validar.reset();
    importar.reset();

    try {
      const next = await parseFile(file);
      setParsed(next);
      const validation = await validar.mutateAsync({ filename: next.filename, rows: next.rows });
      setPreview(validation);
    } catch (error) {
      setParsed(null);
      setParseError(error instanceof Error ? error.message : "No se pudo leer el archivo");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleValidate() {
    if (!payload) return;
    setResult(null);
    validar.reset();
    importar.reset();
    const validation = await validar.mutateAsync(payload);
    setPreview(validation);
  }

  async function handleImport() {
    if (!payload || !preview?.canImport) return;
    const imported = await importar.mutateAsync(payload);
    setResult(imported);
    setPreview(imported);
  }

  return (
    <AdminShell>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-[12.5px] text-ink-quiet">Carga controlada de casos SOP desde CSV, XLSX o XLSM.</p>
        <ValidationBadge preview={preview} />
      </div>

      <Card className="mt-5 gap-0 overflow-hidden rounded-lg border border-line bg-white p-0">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="border-b border-line-soft p-5 lg:border-b-0 lg:border-r">
            <label className="flex min-h-[158px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface px-4 py-6 text-center transition-colors hover:border-brand-600 hover:bg-brand-50/40">
              <UploadCloud className="h-8 w-8 text-brand-700" />
              <span className="mt-3 text-[14px] font-semibold text-ink">Seleccionar archivo</span>
              <span className="mt-1 text-[12px] text-ink-quiet">CSV, XLSX o XLSM · máximo 10 000 filas</span>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx,.xlsm"
                className="sr-only"
                onChange={(event) => {
                  void handleFileChange(event.target.files?.[0]);
                }}
              />
            </label>
            {parsed && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12.5px] text-ink-soft">
                <FileSpreadsheet className="h-4 w-4 text-ink-faint" />
                <span className="font-medium text-ink">{parsed.filename}</span>
                <span>{parsed.rows.length} filas leídas</span>
              </div>
            )}
            {(parseError || serverError) && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{parseError || serverError}</span>
              </div>
            )}
          </div>

          <div className="p-5">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Acciones</p>
            <div className="mt-3 grid gap-2">
              <Button type="button" variant="outline" onClick={() => void handleValidate()} disabled={!payload || pending}>
                {validar.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Validar
              </Button>
              <Button type="button" onClick={() => void handleImport()} disabled={!payload || !preview?.canImport || pending}>
                {importar.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                Importar casos
              </Button>
            </div>
            <div className="mt-4 rounded-lg border border-line bg-surface p-3 text-[12px] text-ink-quiet">
              <p className="font-medium text-ink-soft">Columnas obligatorias</p>
              <p className="mt-1">{preview?.requiredColumns.join(", ") ?? "Código, Tipo, Estado, Fecha"}</p>
              <p className="mt-3 font-medium text-ink-soft">Columnas opcionales reconocidas</p>
              <p className="mt-1">
                {preview?.optionalColumns.join(", ") ??
                  "Título, Estación, Reportante, Área, Riesgo, Descripción, Procedencia, Tipo SOP, Subtipo SOP, Peligro, Consecuencias, ACR, Responsable de Hallazgo, Código Plan, Descripción Plan, Estado Plan, Fecha Plan, Fecha Reprogramada, Área Plan, Responsable Plan, Observaciones Plan"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <ResultBanner result={result} />

      {preview && (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
            <StatTile label="Filas" value={preview.resumen.totalFilas} />
            <StatTile label="Casos" value={preview.resumen.casosDetectados} />
            <StatTile label="Listos" value={preview.resumen.listos} tone="good" />
            <StatTile label="Duplicados" value={preview.resumen.duplicados} tone={preview.resumen.duplicados > 0 ? "warn" : "neutral"} />
            <StatTile label="Planes" value={preview.resumen.planesDetectados} />
            <StatTile label="Advertencias" value={preview.resumen.advertencias} tone="warn" />
            <StatTile label="Errores" value={preview.resumen.errores} tone={preview.resumen.errores > 0 ? "bad" : "neutral"} />
          </div>

          {preview.issues.length > 0 && (
            <Card className="mt-5 overflow-hidden rounded-lg border border-line bg-white p-0">
              <div className="border-b border-line bg-surface px-4 py-3">
                <p className="text-[13px] font-semibold text-ink">Validación</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-[12.5px]">
                  <thead className="border-b border-line bg-white text-[11px] uppercase text-ink-faint">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Fila</th>
                      <th className="px-4 py-3 font-semibold">Nivel</th>
                      <th className="px-4 py-3 font-semibold">Campo</th>
                      <th className="px-4 py-3 font-semibold">Mensaje</th>
                      <th className="px-4 py-3 font-semibold">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.issues.map((issue, index) => (
                      <tr key={`${issue.row}-${issue.field}-${index}`} className="border-b border-line-soft last:border-0">
                        <td className="px-4 py-3 font-mono text-[11.5px] text-ink-soft">{issue.row}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold",
                              issue.severity === "error" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700",
                            )}
                          >
                            {issue.severity === "error" ? <XCircle className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                            {issue.severity === "error" ? "Error" : "Aviso"}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-ink">{issue.field}</td>
                        <td className="px-4 py-3 text-ink-soft">{issue.message}</td>
                        <td className="px-4 py-3 text-ink-quiet">{issue.value ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          <Card className="mt-5 overflow-hidden rounded-lg border border-line bg-white p-0">
            <div className="border-b border-line bg-surface px-4 py-3">
              <p className="text-[13px] font-semibold text-ink">Casos detectados</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-[12.5px]">
                <thead className="border-b border-line bg-white text-[11px] uppercase text-ink-faint">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Estado</th>
                    <th className="px-4 py-3 font-semibold">Código</th>
                    <th className="px-4 py-3 font-semibold">Título</th>
                    <th className="px-4 py-3 font-semibold">Tipo</th>
                    <th className="px-4 py-3 font-semibold">Estación</th>
                    <th className="px-4 py-3 font-semibold">Flujo</th>
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Planes</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.cases.map((item) => {
                    const tone =
                      item.status === "valid"
                        ? "bg-emerald-50 text-emerald-700"
                        : item.status === "skipped"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700";
                    const label = item.status === "valid" ? "OK" : item.status === "skipped" ? "Omitido" : "Revisar";
                    const Icon = item.status === "valid" ? CheckCircle2 : item.status === "skipped" ? AlertTriangle : XCircle;

                    return (
                      <tr key={`${item.codigo}-${item.row}`} className="border-b border-line-soft last:border-0 hover:bg-surface">
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold", tone)}>
                            <Icon className="h-3.5 w-3.5" />
                            {label}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11.5px] text-ink">{item.codigo}</td>
                        <td className="max-w-[320px] px-4 py-3 font-medium text-ink">{item.titulo}</td>
                        <td className="px-4 py-3 text-ink-soft">{item.tipo}</td>
                        <td className="px-4 py-3 text-ink-soft">{item.estacion}</td>
                        <td className="px-4 py-3 text-ink-soft">{item.estado}</td>
                        <td className="px-4 py-3 text-ink-soft">{item.fecha}</td>
                        <td className="px-4 py-3 text-ink-soft">{item.planes}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </AdminShell>
  );
}
