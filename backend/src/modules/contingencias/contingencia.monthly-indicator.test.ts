import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('./contingencia.repository.js', () => ({ ContingenciaRepository: { findMonthlyIndicatorInputs: vi.fn() } }));
vi.mock('../auditoria/auditoria.service.js', () => ({ AuditoriaService: {} }));
import { ContingenciaRepository as repo } from './contingencia.repository.js';
import { ContingenciaService as service } from './contingencia.service.js';

afterEach(() => { vi.useRealTimers(); vi.resetAllMocks(); });
function fixture(options: { missing?: boolean; zero?: boolean; unknown?: boolean } = {}) {
  return {
    eventos: [
      { fecha: new Date('2024-11-01T00:00:00Z'), tipo_evento: 'Accidente ', _count: { _all: 120 } },
      { fecha: new Date('2024-11-02T00:00:00Z'), tipo_evento: 'Problemas de salud', _count: { _all: 450 } },
      ...(options.unknown ? [{ fecha: new Date('2024-11-01T00:00:00Z'), tipo_evento: 'Otro', _count: { _all: 1 } }] : []),
    ],
    operacion: Array.from({ length: options.missing ? 29 : 30 }, (_, i) => ({ fecha: new Date(Date.UTC(2024, 10, i + 1)), qty_pasajeros: 999, afluencia: options.zero ? 0 : i === 0 ? 17_091_272 : 0 })),
  };
}
describe('Indicador mensual A + B y afluencia', () => {
  it('reproduce la fórmula del Excel, agrupa por mes y conserva 12 meses en el cambio de año', async () => {
    vi.mocked(repo.findMonthlyIndicatorInputs).mockResolvedValue(fixture() as never);
    const result = await service.monthlyIndicator({ mes: '2025-03' });
    expect(result.desde).toBe('2024-04-01');
    expect(result.hasta).toBe('2025-03-31');
    expect(result.items).toHaveLength(12);
    const november = result.items.find(row => row.mes === '2024-11')!;
    expect(november).toMatchObject({ accidentes: 120, noAccidentes: 450, total: 570, afluencia: 17_091_272, diasEsperados: 30 });
    expect(november.tasa).toBeCloseTo(33.35035543, 5);
  });
  it.each([{ missing: true }, { zero: true }, { unknown: true }])('no inventa una tasa si falta afluencia, es cero o hay tipos sin clasificar: %j', async options => {
    vi.mocked(repo.findMonthlyIndicatorInputs).mockResolvedValue(fixture(options) as never);
    const result = await service.monthlyIndicator({ mes: '2025-03' });
    expect(result.items.find(row => row.mes === '2024-11')?.tasa).toBeNull();
  });
  it('usa el día de Lima como corte del mes actual', async () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-06T02:00:00Z'));
    vi.mocked(repo.findMonthlyIndicatorInputs).mockResolvedValue({ eventos: [], operacion: [] });
    const result = await service.monthlyIndicator({ mes: '2026-10' });
    expect(result.hasta).toBe('2026-10-05');
    expect(result.items.at(-1)?.diasEsperados).toBe(5);
  });
  it.each(['2026-13', '2026-00', 'texto', '0000-01'])('rechaza meses inválidos %s', async mes => {
    await expect(service.monthlyIndicator({ mes })).rejects.toThrow();
    expect(repo.findMonthlyIndicatorInputs).not.toHaveBeenCalled();
  });
});
