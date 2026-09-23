import { test, expect } from '@playwright/test';
import { distribution, duration, heatmap, periodFor, percentChange } from '../src/features/contingencias/analytics';
import type { ContingenciaEvento } from '../src/features/contingencias/types';

test('tiempos vacíos, cero real y cruces ambiguos', () => {
  expect(duration(null, '10:20')).toBeNull();
  expect(duration('10:00', '10:00')).toBe(0);
  expect(duration('23:50', '00:10')).toBeNull();
  expect(duration('25:00', '26:00')).toBeNull();
  expect(duration('10:00', '10:20')).toBe(20);
  expect(distribution([])).toBeNull();
  expect(distribution([0, 10, 20, 30])).toEqual({ min: 0, q1: 7.5, median: 15, q3: 22.5, max: 30, n: 4 });
  expect(distribution([8])?.median).toBe(8);
});

test('comparación del mes en curso, año nuevo y febrero bisiesto', () => {
  const period = periodFor('2026-09', new Date(2026, 8, 22));
  expect(period.end).toBe('2026-09-22');
  expect(period.previousEnd).toBe('2026-08-22');
  expect(periodFor('2026-01', new Date(2026, 8, 22)).previousStart).toBe('2025-12-01');
  expect(periodFor('2024-02', new Date(2026, 8, 22)).days).toBe(29);
  expect(percentChange(2, 0)).toBeNull();
  expect(percentChange(null, 5)).toBeNull();
  expect(percentChange(15, 10)).toBe(50);
});

test('heatmap respeta días y límites horarios, sin convertir vacíos en medianoche', () => {
  const events = [
    { fecha: '2026-09-21', hora_reporte: '00:00' },
    { fecha: '2026-09-21', hora_reporte: '04:00' },
    { fecha: '2026-09-20', hora_reporte: '23:59' },
    { fecha: '2026-09-20', hora_reporte: null },
  ] as ContingenciaEvento[];
  const map = heatmap(events);
  expect(map.cells[0][0]).toBe(1);
  expect(map.cells[0][1]).toBe(1);
  expect(map.cells[6][5]).toBe(1);
  expect(map.cells.flat().reduce((a,b) => a+b, 0)).toBe(3);
  expect(map.excluded).toBe(1);
});
