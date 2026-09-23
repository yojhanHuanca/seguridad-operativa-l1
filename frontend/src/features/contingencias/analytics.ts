import type { ContingenciaEvento } from './types';

export const formatMetric = (value: number) => value.toLocaleString('es-PE', { maximumFractionDigits: 1 });
export const dayKey = (date: string) => date.slice(0, 10);
export const monthKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
const dateKey = (year: number, month: number, day: number) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

// Date-only operational records are civil dates, not UTC timestamps to shift to Lima.
export function periodFor(month: string, today = new Date()) {
  const [year, number] = month.split('-').map(Number);
  const previous = new Date(year, number - 2, 1, 12);
  const currentMonth = monthKey(today);
  const days = new Date(year, number, 0).getDate();
  const elapsed = month === currentMonth ? today.getDate() : days;
  const priorDays = new Date(year, number - 1, 0).getDate();
  return {
    start: `${month}-01`,
    end: dateKey(year, number, elapsed),
    days: elapsed,
    previousStart: `${monthKey(previous)}-01`,
    previousEnd: dateKey(previous.getFullYear(), previous.getMonth() + 1, month === currentMonth ? Math.min(elapsed, priorDays) : priorDays),
    comparable: month <= currentMonth,
    partial: month === currentMonth,
    previousLabel: previous.toLocaleDateString('es-PE', { month: 'short', year: 'numeric' }),
  };
}

export function minuteOfDay(value?: string | null) {
  const match = value?.match(/(?:T|^)(\d{2}):(\d{2})(?::\d{2})?/);
  if (!match || +match[1] > 23 || +match[2] > 59) return null;
  return +match[1] * 60 + +match[2];
}

export function duration(start?: string | null, end?: string | null) {
  const a = minuteOfDay(start), b = minuteOfDay(end);
  // Overnight time-only pairs cannot be resolved without the end date.
  return a === null || b === null || b < a ? null : b - a;
}

export function quantile(sorted: number[], fraction: number): number | null {
  if (!sorted.length) return null;
  const index = (sorted.length - 1) * fraction;
  const low = Math.floor(index), high = Math.ceil(index);
  return sorted[low] + (sorted[high] - sorted[low]) * (index - low);
}

export function distribution(values: number[]) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  return { min: sorted[0], q1: quantile(sorted, .25)!, median: quantile(sorted, .5)!, q3: quantile(sorted, .75)!, max: sorted[sorted.length - 1], n: sorted.length };
}

export function eventTimes(events: ContingenciaEvento[]) {
  const valid = (values: (number | null)[]) => values.filter((n): n is number => n !== null);
  return [
    { name: 'Reporte → atención', values: valid(events.map(e => duration(e.hora_reporte, e.atencion?.hora_inicio_spaa))) },
    { name: 'Atención', values: valid(events.map(e => duration(e.atencion?.hora_inicio_spaa, e.atencion?.hora_termino_atencion_inicio_traslado || e.hora_termino_ae))) },
    { name: 'Ambulancia', values: valid(events.map(e => duration(e.traslado?.hora_llamado_ambulancia, e.traslado?.hora_llegada_estacion))) },
  ];
}

export function countBy(events: ContingenciaEvento[], field: 'tipo_evento' | 'lugar_evento') {
  const counts = new Map<string, number>();
  events.forEach(e => { const name = e[field]?.trim() || 'Sin dato'; counts.set(name, (counts.get(name) || 0) + 1); });
  return [...counts].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
}

export function summarize(events: ContingenciaEvento[]) {
  const times = eventTimes(events);
  return [events.length, times[1].values.length ? times[1].values.reduce((a, b) => a + b, 0) / 60 : null, distribution(times[0].values)?.median ?? null, countBy(events, 'lugar_evento').filter(row => row.name !== 'Sin dato').length];
}

export function heatmap(events: ContingenciaEvento[]) {
  const cells = Array.from({ length: 7 }, () => Array<number>(6).fill(0));
  let excluded = 0;
  for (const event of events) {
    const minutes = minuteOfDay(event.hora_reporte);
    const date = new Date(dayKey(event.fecha) + 'T12:00:00');
    if (minutes === null || !Number.isFinite(date.getTime())) { excluded++; continue; }
    cells[(date.getDay() + 6) % 7][Math.floor(minutes / 240)]++;
  }
  return { cells, excluded, max: Math.max(0, ...cells.flat()) };
}

export function percentChange(current: number | null, previous: number | null) {
  return current === null || previous === null || previous === 0 ? null : (current - previous) / previous * 100;
}
