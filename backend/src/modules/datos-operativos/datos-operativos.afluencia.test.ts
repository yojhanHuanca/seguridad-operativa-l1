import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('./datos-operativos.repository.js', () => ({ DatosOperativosRepository: { findByFecha: vi.fn(), create: vi.fn(), update: vi.fn() } }));
import { DatosOperativosService as service } from './datos-operativos.service.js';
import { DatosOperativosRepository as repo } from './datos-operativos.repository.js';
const input = { fecha: '2025-03-01', qty_carreras: 278, qty_pasajeros: 100, afluencia: 534200, km_comercial: 9000, km_no_comercial: 0, paradas_estacion: 7228 };
const stored = { ...input, fecha: new Date('2025-03-01T00:00:00Z'), id_dato_operativo: 1, created_at: new Date(), updated_at: new Date() };
beforeEach(() => { vi.resetAllMocks(); vi.mocked(repo.findByFecha).mockResolvedValue(null); vi.mocked(repo.create).mockResolvedValue(stored as never); vi.mocked(repo.update).mockResolvedValue(stored as never); });
describe('Afluencia diaria independiente de pasajeros', () => {
  it('guarda ambos valores distintos y devuelve afluencia numérica', async () => {
    const result = await service.create(input);
    expect(repo.create).toHaveBeenCalledWith(expect.objectContaining({ qty_pasajeros: 100, afluencia: 534200 }));
    expect(result).toMatchObject({ qty_pasajeros: 100, afluencia: 534200 });
  });
  it('actualiza la afluencia sin sustituir QTY pasajeros', async () => {
    await service.update('1', input);
    expect(repo.update).toHaveBeenCalledWith(1, expect.objectContaining({ qty_pasajeros: 100, afluencia: 534200 }));
  });
  it.each([-1, 0.5])('rechaza afluencia inválida %s', async afluencia => {
    await expect(service.create({ ...input, afluencia })).rejects.toThrow();
    expect(repo.create).not.toHaveBeenCalled();
  });
  it('mantiene pendientes los registros históricos sin afluencia', async () => {
    vi.mocked(repo.create).mockResolvedValue({ ...stored, afluencia: null } as never);
    const { afluencia, ...legacy } = input;
    const result = await service.create(legacy);
    expect(result.afluencia).toBeNull();
    expect(result.qty_pasajeros).toBe(100);
  });
});
