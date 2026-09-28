import { beforeEach, expect, it, vi } from 'vitest';
const db = vi.hoisted(() => ({
  importaciones: { findUnique: vi.fn(), update: vi.fn() },
  casos_sop: { count: vi.fn(), deleteMany: vi.fn() },
  contingencia_eventos: { count: vi.fn(), deleteMany: vi.fn() },
  eventos_monitoreo: { count: vi.fn(), deleteMany: vi.fn() }, $transaction: vi.fn(),
}));
vi.mock('../../lib/prisma.js', () => ({ default: db }));
vi.mock('../auditoria/auditoria.repository.js', () => ({ AuditoriaRepository: { registrar: vi.fn() } }));
import { ImportacionHistorialService } from './importacion-historial.service.js';
beforeEach(() => {
  vi.resetAllMocks();
  db.$transaction.mockImplementation(async (fn: (tx: typeof db) => unknown) => fn(db));
  db.importaciones.findUnique.mockResolvedValue({ estado: 'completado', modulo: 'casos', completed_at: new Date(), reverted_at: null });
});
it('impide borrar SOP que ya tienen actividad o modificaciones', async () => {
  db.casos_sop.count.mockResolvedValue(1);
  await expect(ImportacionHistorialService.revertir(3, 1, 'Archivo equivocado', null)).rejects.toThrow('No se puede revertir');
  expect(db.casos_sop.deleteMany).not.toHaveBeenCalled();
  expect(db.importaciones.update).not.toHaveBeenCalled();
});
it('impide borrar eventos que ya fueron asignados', async () => {
  db.importaciones.findUnique.mockResolvedValue({ estado: 'completado', modulo: 'monitoreo', completed_at: new Date(), reverted_at: null });
  db.eventos_monitoreo.count.mockResolvedValue(1);
  await expect(ImportacionHistorialService.revertir(3, 1, 'Archivo equivocado', null)).rejects.toThrow('asignados');
  expect(db.eventos_monitoreo.deleteMany).not.toHaveBeenCalled();
});
