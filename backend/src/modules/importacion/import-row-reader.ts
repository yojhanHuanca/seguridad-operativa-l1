import type { ImportacionRow } from './importacion.types.js';

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');

/** Indexa encabezados, nunca valores: una corrección de celda se lee siempre de nuevo. */
export function createImportRowReader(aliases: Record<string, readonly string[]>) {
  const fields = new Map<string, string[]>();
  for (const [field, names] of Object.entries(aliases)) for (const name of names) {
    const key = normalize(name);
    const matching = fields.get(key) ?? [];
    if (!matching.includes(field)) matching.push(field);
    fields.set(key, matching);
  }
  const cache = new WeakMap<ImportacionRow, { keys: string[]; headers: Map<string, string> }>();
  return (row: ImportacionRow, field: string): string => {
    const keys = Object.keys(row);
    let entry = cache.get(row);
    if (!entry || keys.length !== entry.keys.length || keys.some((key, i) => key !== entry!.keys[i])) {
      const headers = new Map<string, string>();
      for (const key of keys) for (const name of fields.get(normalize(key)) ?? []) {
        if (!headers.has(name)) headers.set(name, key);
      }
      entry = { keys, headers };
      cache.set(row, entry);
    }
    const key = entry.headers.get(field);
    const value: unknown = key === undefined ? undefined : row[key];
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return value == null ? '' : String(value).trim();
  };
}
