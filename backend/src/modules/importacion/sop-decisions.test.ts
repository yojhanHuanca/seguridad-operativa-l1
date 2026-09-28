import { describe, expect, it } from 'vitest';
import { applySopDecision } from './sop-decisions.js';
const source = { codigo: 'SOP 10', estado: 'Plan de Acción', plans: [{ row: 2, estado: 'Enviado', codigo: 'PLA-1' }, { row: 3, estado: 'Cerrado', codigo: 'PLA-2' }] };
const motivo = 'Revisión de carga histórica';
describe('Decisiones sobre el histórico', () => {
  it('protege SOP terminados y existentes', () => {
    expect(() => applySopDecision({ ...source, estado: 'Cerrado' }, { codigo: source.codigo, accion: 'cerrar', motivo }, false)).toThrow('protegido');
    expect(() => applySopDecision(source, { codigo: source.codigo, accion: 'cerrar', motivo }, true)).toThrow('protegido');
  });
  it('protege planes terminados y filas ajenas', () => {
    for (const row of [3, 90]) expect(() => applySopDecision(source, { codigo: source.codigo, accion: 'planes', motivo, planes: [{ row, estado: 'Enviado' }] }, false)).toThrow();
  });
  it('cambia un único plan sin mutar el origen ni cerrar automáticamente el SOP', () => {
    const next = applySopDecision(source, { codigo: source.codigo, accion: 'planes', motivo, planes: [{ row: 2, estado: 'Cerrado' }] }, false);
    expect(next.estado).toBe('Verificación');
    expect(source.plans[0]?.estado).toBe('Enviado');
    expect(next.plans.map(p => p.codigo)).toEqual(['PLA-1', 'PLA-2']);
  });
});
