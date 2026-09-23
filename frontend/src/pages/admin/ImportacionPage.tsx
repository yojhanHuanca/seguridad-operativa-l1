import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Download,
  FileSpreadsheet,
  History,
  RefreshCw,
  RotateCcw,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/design-system/primitives/Button";
import { IMPORTACION_MODULOS } from "@/features/importacion/importacionConfig";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useHistorialImportaciones, useImportarRegistros, useRevertirImportacion, useValidarImportacion } from "@/features/importacion/hooks/useImportacion";
import type { ImportacionPayload, ImportacionPreview, ImportacionResult, ImportacionRow, ImportacionTipo } from "@/features/importacion/types";
import {
  cellToImportText,
  downloadErrorWorkbook,
  downloadOfficialTemplate,
  normalizeImportHeader,
  type ImportSheet,
  type ParsedImportFile,
} from "@/features/importacion/importacionExcel";

const ACCEPTED_EXTENSIONS = [".csv", ".xlsx", ".xlsm"] as const;

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

function matrixToSheet(name: string, matrix: string[][]): ImportSheet {
  const headers = matrix[0]?.map((header, index) => header.trim() || `Columna ${index + 1}`) ?? [];
  if (headers.length === 0) throw new Error("El archivo no tiene encabezados.");
  const rows = matrix.slice(1).reduce<ImportacionRow[]>((acc, row) => {
    const item = headers.reduce<ImportacionRow>((record, header, index) => {
      record[header] = row[index]?.trim() ?? "";
      return record;
    }, {});
    if (Object.values(item).some((value) => String(value ?? "").trim() !== "")) acc.push(item);
    return acc;
  }, []);
  return { name, headers, rows };
}

async function parseXlsx(file: File): Promise<ImportSheet[]> {
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const sheets = workbook.worksheets.flatMap((worksheet) => {
    const matrix: string[][] = [];
    worksheet.eachRow({ includeEmpty: false }, (sheetRow) => {
      const rowValues: string[] = [];
      sheetRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        rowValues[colNumber - 1] = cellToImportText(cell.value);
      });
      if (rowValues.some(Boolean)) matrix.push(rowValues);
    });
    return matrix.length > 1 ? [matrixToSheet(worksheet.name, matrix)] : [];
  });
  if (!sheets.length) throw new Error("El archivo no contiene hojas con encabezados y datos.");
  return sheets;
}

async function parseFile(file: File): Promise<ParsedImportFile> {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!(ACCEPTED_EXTENSIONS as readonly string[]).includes(extension)) {
    throw new Error("Formato no soportado. Usa CSV, XLSX o XLSM.");
  }

  const sheets = extension === ".csv" ? [matrixToSheet("CSV", parseCsv(await file.text()))] : await parseXlsx(file);
  if (!sheets.some(sheet => sheet.rows.length > 0)) throw new Error("El archivo no contiene filas para importar.");
  return { filename: file.name, sheets };
}

function payloadFromParsed(parsed: ParsedImportFile | null, sheetIndex: number): ImportacionPayload | null {
  const sheet = parsed?.sheets[sheetIndex];
  if (!parsed || !sheet) return null;
  return { filename: parsed.filename, rows: sheet.rows };
}

function detectImportType(rows: ImportacionRow[]): ImportacionTipo | null {
  const headers = new Set(Object.keys(rows[0] ?? {}).map(normalizeImportHeader));
  if (headers.has("tipodeincidenteoperativo") && headers.has("horadeevento")) return "monitoreo";
  if (headers.has("tipodeevento") && headers.has("horadereporte") && headers.has("lugardelevento")) return "contingencias";
  if (headers.has("codigo") && headers.has("tipo") && headers.has("estado")) return "casos";
  return null;
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

function CellPreview({ sheet, preview }: { sheet: ImportSheet; preview: ImportacionPreview }) {
  const visibleHeaders = sheet.headers.slice(0, 12);
  const visibleRows = sheet.rows.slice(0, 100);
  const issueMap = new Map<string, typeof preview.issues>();
  preview.issues.forEach(issue => {
    const key = `${issue.row}:${normalizeImportHeader(issue.field)}`;
    issueMap.set(key, [...(issueMap.get(key) ?? []), issue]);
  });
  return (
    <Card className="mt-5 overflow-hidden rounded-lg border border-line bg-white p-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface px-4 py-3">
        <div><p className="text-[13px] font-semibold text-ink">Vista previa por celdas</p><p className="mt-0.5 text-[11.5px] text-ink-quiet">Verde: válido · amarillo: advertencia · rojo: error · gris: vacío opcional</p></div>
        <span className="text-[11.5px] text-ink-quiet">Primeras {visibleRows.length} filas</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-max text-left text-[12px]">
          <thead><tr className="border-b border-line">{["Fila", ...visibleHeaders].map(header => <th key={header} className="whitespace-nowrap bg-white px-3 py-2.5 font-semibold text-ink">{header}</th>)}</tr></thead>
          <tbody>{visibleRows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-line-soft last:border-0">
            <td className="bg-surface px-3 py-2 font-mono text-ink-quiet">{rowIndex + 2}</td>
            {visibleHeaders.map(header => {
              const value = String(row[header] ?? "").trim();
              const issues = issueMap.get(`${rowIndex + 2}:${normalizeImportHeader(header)}`) ?? [];
              const error = issues.find(issue => issue.severity === "error");
              const warning = issues.find(issue => issue.severity === "warning");
              const title = (error ?? warning)?.message;
              return <td key={header} title={title} className={cn("max-w-[260px] px-3 py-2 align-top", error ? "bg-red-50 text-red-800 ring-1 ring-inset ring-red-200" : warning ? "bg-amber-50 text-amber-800" : value ? "bg-emerald-50/45 text-ink" : "bg-slate-50 text-ink-faint")}>
                <span className="block max-w-[240px] truncate">{value || "Vacío"}</span>{title && <span className="mt-1 block max-w-[240px] text-[10.5px] font-medium">{title}</span>}
              </td>;
            })}
          </tr>)}</tbody>
        </table>
      </div>
      {(sheet.rows.length > visibleRows.length || sheet.headers.length > visibleHeaders.length) && <p className="border-t border-line px-4 py-2 text-[11.5px] text-ink-quiet">La vista está limitada para mantener la página rápida. La validación considera todas las filas y columnas.</p>}
    </Card>
  );
}

export function AdminImportacionPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [parsed, setParsed] = useState<ParsedImportFile | null>(null);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [preview, setPreview] = useState<ImportacionPreview | null>(null);
  const [result, setResult] = useState<ImportacionResult | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [revertingId, setRevertingId] = useState<number | null>(null);
  const [revertReason, setRevertReason] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);
  const [tipoImportacion, setTipoImportacion] = useState<ImportacionTipo>("casos");
  const modulo = IMPORTACION_MODULOS[tipoImportacion];
  const validar = useValidarImportacion(tipoImportacion);
  const importar = useImportarRegistros(tipoImportacion);
  const historial = useHistorialImportaciones();
  const revertir = useRevertirImportacion();

  const selectedSheet = parsed?.sheets[sheetIndex] ?? null;
  const payload = useMemo(() => payloadFromParsed(parsed, sheetIndex), [parsed, sheetIndex]);
  const pending = validar.isPending || importar.isPending;
  const serverError = validar.error
    ? apiErrorMessage(validar.error, "No se pudo validar el archivo")
    : importar.error
      ? apiErrorMessage(importar.error, "No se pudo importar el archivo")
      : null;

  function cambiarTipoImportacion(tipo: ImportacionTipo) {
    if (tipo === tipoImportacion) return;
    setTipoImportacion(tipo);
    setParsed(null);
    setSheetIndex(0);
    setPreview(null);
    setResult(null);
    setConfirming(false);
    setParseError(null);
    validar.reset();
    importar.reset();
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleFileChange(file: File | undefined) {
    if (!file) return;
    setParseError(null);
    setPreview(null);
    setResult(null);
    validar.reset();
    importar.reset();

    try {
      const next = await parseFile(file);
      const firstDataSheet = next.sheets.findIndex(sheet => detectImportType(sheet.rows) !== null);
      const nextSheetIndex = firstDataSheet >= 0 ? firstDataSheet : 0;
      const detectedType = detectImportType(next.sheets[nextSheetIndex]?.rows ?? []) ?? tipoImportacion;
      setTipoImportacion(detectedType);
      setParsed(next);
      setSheetIndex(nextSheetIndex);
    } catch (error) {
      setParsed(null);
      setParseError(error instanceof Error ? error.message : "No se pudo leer el archivo");
    } finally { if (inputRef.current) inputRef.current.value = ""; }
  }

  async function handleValidate() {
    if (!payload) return;
    setResult(null);
    validar.reset();
    importar.reset();
    const validation = await validar.mutateAsync(payload);
    setPreview(validation);
  }

  function handleSheetChange(index: number) {
    setSheetIndex(index);
    setPreview(null);
    setResult(null);
    setConfirming(false);
    validar.reset();
    importar.reset();
    const nextType = detectImportType(parsed?.sheets[index]?.rows ?? []);
    if (nextType) setTipoImportacion(nextType);
  }

  async function handleImport() {
    if (!payload || !preview?.canImport) return;
    const imported = await importar.mutateAsync(payload);
    setResult(imported);
    setPreview(imported);
    setConfirming(false);
    const totalImportados = imported.imported.eventos + imported.imported.casos + imported.imported.planes;
    toast.success("Importación completada correctamente", {
      description: `${totalImportados.toLocaleString("es-PE")} registro${totalImportados === 1 ? "" : "s"} de ${modulo.label} importado${totalImportados === 1 ? "" : "s"}. Los datos fueron guardados sin recalcularse.`,
      duration: 6000,
    });
  }

  const importBlockedReason = !preview
    ? "Primero valida la hoja seleccionada."
    : preview.resumen.errores > 0
      ? `Corrige ${preview.resumen.errores} error${preview.resumen.errores === 1 ? "" : "es"} antes de importar.`
      : preview.resumen.listos === 0
        ? "No hay filas nuevas listas para importar. Revisa si todas están duplicadas."
        : null;

  return (
    <AdminShell>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-[12.5px] text-ink-quiet">{modulo.description}</p>
        <ValidationBadge preview={preview} />
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-3">
        {(Object.keys(IMPORTACION_MODULOS) as ImportacionTipo[]).map((tipo) => (
          <button
            key={tipo}
            type="button"
            onClick={() => cambiarTipoImportacion(tipo)}
            className={cn(
              "rounded-xl border px-4 py-3 text-left transition-all",
              tipoImportacion === tipo
                ? "border-brand-700 bg-brand-700 text-white shadow-sm"
                : "border-line bg-white text-ink-soft hover:border-brand-200 hover:bg-brand-50"
            )}
          >
            <span className="block text-sm font-semibold">{IMPORTACION_MODULOS[tipo].label}</span>
            <span className={cn("mt-1 block text-xs", tipoImportacion === tipo ? "text-white/80" : "text-ink-quiet")}>Importar datos para este módulo</span>
          </button>
        ))}
      </div>

      {(tipoImportacion === "monitoreo" || tipoImportacion === "contingencias") && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand-100 bg-brand-50/60 px-4 py-3">
          <div>
            <p className="text-[13px] font-semibold text-ink">Plantilla oficial de {modulo.label}</p>
            <p className="mt-0.5 text-[12px] text-ink-quiet">Incluye instrucciones, encabezados reconocidos y una fila de ejemplo.</p>
          </div>
          <Button type="button" variant="outline" onClick={() => void downloadOfficialTemplate(tipoImportacion)}>
            <Download className="h-4 w-4" /> Descargar plantilla
          </Button>
        </div>
      )}

      <Card className="mt-5 gap-0 overflow-hidden rounded-lg border border-line bg-white p-0">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="border-b border-line-soft p-5 lg:border-b-0 lg:border-r">
            <label className="flex min-h-[158px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface px-4 py-6 text-center transition-colors hover:border-brand-600 hover:bg-brand-50/40">
              <UploadCloud className="h-8 w-8 text-brand-700" />
              <span className="mt-3 text-[14px] font-semibold text-ink">Seleccionar archivo</span>
              <span className="mt-1 text-[12px] text-ink-quiet">CSV, XLSX o XLSM · máximo 100 000 filas</span>
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
              <div className="mt-4 space-y-3 text-[12.5px] text-ink-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-ink-faint" />
                  <span className="font-medium text-ink">{parsed.filename}</span>
                  <span>{parsed.sheets.length} hoja{parsed.sheets.length === 1 ? "" : "s"} con datos</span>
                </div>
                <label className="block max-w-xl">
                  <span className="mb-1.5 block font-medium text-ink">Hoja que se importará</span>
                  <select value={sheetIndex} onChange={event => handleSheetChange(Number(event.target.value))} className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink">
                    {parsed.sheets.map((sheet, index) => <option key={`${sheet.name}-${index}`} value={index}>{sheet.name} — {sheet.rows.length} filas — {sheet.headers.length} columnas</option>)}
                  </select>
                </label>
                {selectedSheet && <p className="text-ink-quiet">Columnas encontradas: {selectedSheet.headers.join(", ")}</p>}
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
              <Button type="button" onClick={() => setConfirming(true)} disabled={!payload || !preview?.canImport || pending}>
                {importar.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                {modulo.importButton}
              </Button>
            </div>
            {importBlockedReason && <p className="mt-2 text-[12px] font-medium text-amber-700">{importBlockedReason}</p>}
            <div className="mt-4 rounded-lg border border-line bg-surface p-3 text-[12px] text-ink-quiet">
              <p className="font-medium text-ink-soft">Columnas obligatorias</p>
              <p className="mt-1">{preview?.requiredColumns.join(", ") ?? modulo.requiredFallback}</p>
              <p className="mt-3 font-medium text-ink-soft">Columnas opcionales reconocidas</p>
              <p className="mt-1">
                {preview?.optionalColumns.join(", ") ?? modulo.optionalFallback}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <ResultBanner result={result} />

      {confirming && preview && selectedSheet && (
        <div role="dialog" aria-modal="true" aria-labelledby="confirmar-importacion" className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
          <div className="w-full max-w-xl rounded-xl border border-line bg-white p-6 shadow-2xl">
            <h2 id="confirmar-importacion" className="text-lg font-bold text-ink">Confirmar importación</h2>
            <div className="mt-4 grid gap-2 rounded-lg bg-surface p-4 text-[13px] text-ink-soft sm:grid-cols-2">
              <p><span className="block text-xs text-ink-quiet">Archivo</span><strong className="text-ink">{parsed?.filename}</strong></p>
              <p><span className="block text-xs text-ink-quiet">Hoja</span><strong className="text-ink">{selectedSheet.name}</strong></p>
              <p><span className="block text-xs text-ink-quiet">Filas encontradas</span><strong className="text-ink">{preview.resumen.totalFilas}</strong></p>
              <p><span className="block text-xs text-ink-quiet">Registros nuevos</span><strong className="text-emerald-700">{preview.resumen.listos}</strong></p>
              <p><span className="block text-xs text-ink-quiet">Duplicados omitidos</span><strong className="text-amber-700">{preview.resumen.duplicados}</strong></p>
              <p><span className="block text-xs text-ink-quiet">Errores</span><strong className="text-ink">{preview.resumen.errores}</strong></p>
            </div>
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-[12.5px] text-emerald-900">
              Se crearán {preview.resumen.listos} registros nuevos. No se modificarán registros existentes y los valores históricos se conservarán sin recalcularse.
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setConfirming(false)}>Cancelar</Button>
              <Button type="button" onClick={() => void handleImport()} disabled={pending}>{importar.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />} Confirmar importación</Button>
            </div>
          </div>
        </div>
      )}

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

          {selectedSheet && <CellPreview sheet={selectedSheet} preview={preview} />}

          {preview.issues.length > 0 && (
            <Card className="mt-5 overflow-hidden rounded-lg border border-line bg-white p-0">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface px-4 py-3">
                <div><p className="text-[13px] font-semibold text-ink">Validación</p><p className="mt-0.5 text-[11.5px] text-ink-quiet">Corrige los errores antes de confirmar la carga.</p></div>
                {parsed && <Button type="button" variant="outline" onClick={() => void downloadErrorWorkbook(parsed, sheetIndex, preview.issues)}><Download className="h-4 w-4" /> Descargar Excel con errores</Button>}
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
              <p className="text-[13px] font-semibold text-ink">{modulo.detectedTitle}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-[12.5px]">
                <thead className="border-b border-line bg-white text-[11px] uppercase text-ink-faint">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Estado</th>
                    <th className="px-4 py-3 font-semibold">{tipoImportacion === "casos" ? "Código" : "N°"}</th>
                    <th className="px-4 py-3 font-semibold">Título</th>
                    <th className="px-4 py-3 font-semibold">Tipo</th>
                    <th className="px-4 py-3 font-semibold">Estación</th>
                    <th className="px-4 py-3 font-semibold">Flujo</th>
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Planes</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.cases.map((item, rowIndex) => {
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
                        <td className="px-4 py-3 font-mono text-[11.5px] text-ink">{tipoImportacion === "casos" ? item.codigo : rowIndex + 1}</td>
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

      <Card className="mt-6 overflow-hidden rounded-lg border border-line bg-white p-0">
        <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
          <History className="h-4 w-4 text-brand-700" />
          <div><p className="text-[13px] font-semibold text-ink">Historial de importaciones</p><p className="mt-0.5 text-[11.5px] text-ink-quiet">Trazabilidad de archivos cargados y operaciones revertidas.</p></div>
        </div>
        {historial.isLoading ? <p className="p-5 text-sm text-ink-quiet">Cargando historial…</p> : historial.isError ? <p className="p-5 text-sm text-red-700">No se pudo cargar el historial. La migración de base de datos debe estar aplicada.</p> : (
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-[12.5px]">
            <thead className="border-b border-line text-[11px] uppercase text-ink-faint"><tr>{["Fecha", "Usuario", "Módulo", "Archivo / hoja", "Importados", "Estado", "Acción"].map(label => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}</tr></thead>
            <tbody>{historial.data?.items.map(item => <tr key={item.id_importacion} className="border-b border-line-soft last:border-0">
              <td className="px-4 py-3 text-ink-soft">{new Date(item.created_at).toLocaleString("es-PE")}</td>
              <td className="px-4 py-3 font-medium text-ink">{item.creador.nombre}</td>
              <td className="px-4 py-3 text-ink-soft">{IMPORTACION_MODULOS[item.modulo]?.label ?? item.modulo}</td>
              <td className="px-4 py-3"><span className="block font-medium text-ink">{item.archivo}</span>{item.hoja && <span className="text-ink-quiet">{item.hoja}</span>}</td>
              <td className="px-4 py-3 text-ink-soft">{item.importados}</td>
              <td className="px-4 py-3"><span className={cn("rounded-md px-2 py-1 text-[11px] font-semibold", item.estado === "revertido" ? "bg-slate-100 text-slate-700" : item.estado === "fallido" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700")}>{item.estado.replaceAll("_", " ")}</span></td>
              <td className="px-4 py-3"><Button type="button" variant="outline" disabled={!item.estado.startsWith("completado")} onClick={() => { setRevertingId(item.id_importacion); setRevertReason(""); }}><RotateCcw className="h-3.5 w-3.5" /> Revertir</Button></td>
            </tr>)}</tbody>
          </table>{historial.data?.items.length === 0 && <p className="p-5 text-sm text-ink-quiet">Todavía no existen importaciones registradas.</p>}</div>
        )}
      </Card>

      {revertingId !== null && (
        <div role="dialog" aria-modal="true" aria-labelledby="revertir-importacion" className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
          <div className="w-full max-w-lg rounded-xl border border-line bg-white p-6 shadow-2xl">
            <h2 id="revertir-importacion" className="text-lg font-bold text-ink">Revertir importación</h2>
            <p className="mt-2 text-sm text-ink-soft">Se eliminarán exclusivamente los registros vinculados a esta carga. La acción quedará registrada en Auditoría.</p>
            <label className="mt-4 block text-sm font-medium text-ink">Motivo de la reversión<textarea value={revertReason} onChange={event => setRevertReason(event.target.value)} rows={3} maxLength={500} className="mt-2 w-full rounded-lg border border-line px-3 py-2 text-sm" placeholder="Describe por qué debe revertirse esta importación" /></label>
            {revertir.error && <p role="alert" className="mt-3 text-sm text-red-700">{apiErrorMessage(revertir.error, "No se pudo revertir la importación")}</p>}
            <div className="mt-5 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setRevertingId(null)} disabled={revertir.isPending}>Cancelar</Button><Button type="button" disabled={revertReason.trim().length < 10 || revertir.isPending} onClick={() => void revertir.mutateAsync({ id: revertingId, motivo: revertReason.trim() }).then(result => { toast.success(`${result.eliminados} registros eliminados`); setRevertingId(null); })}>{revertir.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />} Confirmar reversión</Button></div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
