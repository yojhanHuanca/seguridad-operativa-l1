import { createHash } from 'node:crypto';

/** Exact content comparison: preserve punctuation and every character. */
export function importFingerprint(fields: string[], record: Record<string, unknown>): string {
  const values = fields.map(field => {
    const value = record[field];
    if (value instanceof Date) return field === 'fecha' ? value.toISOString().slice(0, 10) : value.toISOString().slice(11, 16);
    return value == null ? '' : String(value).trim();
  });
  return createHash('sha256').update(JSON.stringify(values)).digest('hex');
}

export function dateRange(dates: (Date | null)[]) {
  const valid = dates.filter((date): date is Date => date !== null);
  if (!valid.length) return null;
  let min = valid[0]!, max = min;
  for (const date of valid) { if (date < min) min = date; if (date > max) max = date; }
  return { gte: min, lte: max };
}
