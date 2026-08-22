/**
 * Descarga de archivos generados en el navegador.
 *
 * Hay dos detalles que parecen ceremonia pero no lo son:
 *
 * 1. El ancla se agrega al documento antes de hacer click. Chrome tolera un
 *    ancla suelta, pero Firefox ignora el click si el elemento no está en el
 *    DOM y la descarga no ocurre nunca.
 * 2. `revokeObjectURL` se difiere un tick. Revocar justo después del click
 *    corre una carrera contra el inicio de la descarga: si el navegador aún
 *    no leyó el blob, el archivo sale vacío o se cancela.
 */
export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

/**
 * Serializa filas a CSV y lo descarga.
 *
 * Antepone BOM porque Excel en Windows —que es donde se van a abrir estos
 * archivos— interpreta el CSV como ANSI sin él, y los acentos y la Ñ salen
 * rotos ("Código" → "CÃ³digo").
 */
export function downloadCsv(fileName: string, header: string[], rows: (string | number | null | undefined)[][]) {
  const escapar = (celda: string | number | null | undefined) => `"${String(celda ?? "").replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((fila) => fila.map(escapar).join(",")).join("\r\n");
  downloadBlob(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" }), fileName);
}

/** Sufijo de fecha para nombres de archivo: `casos-sop-2026-08-09.csv`. */
export function sufijoFecha(): string {
  return new Date().toISOString().slice(0, 10);
}
