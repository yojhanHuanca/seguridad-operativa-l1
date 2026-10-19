import { beforeEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({
  db: { catalogos: { upsert: vi.fn() }, catalogo_detalle: { findFirst: vi.fn(), create: vi.fn() }, roles: { upsert: vi.fn() }, areas: { upsert: vi.fn() }, usuarios: { count: vi.fn(), findFirst: vi.fn(), create: vi.fn() }, $transaction: vi.fn() },
  hash: vi.fn(), contingencias: vi.fn(),
}));
vi.mock('../lib/prisma.js', () => ({ default: mocks.db }));
vi.mock('../utils/bcrypt.js', () => ({ BcryptHelper: { hash: mocks.hash } }));
vi.mock('../modules/contingencias/contingencia.repository.js', () => ({ ContingenciaRepository: { ensureCatalogosIniciales: mocks.contingencias } }));
import { BootstrapService as service } from './bootstrap.service.js';
beforeEach(() => {
  vi.resetAllMocks();
  mocks.db.$transaction.mockImplementation(callback => callback(mocks.db));
  mocks.db.usuarios.count.mockResolvedValue(0);
  mocks.db.usuarios.findFirst.mockResolvedValue(null);
  mocks.db.roles.upsert.mockResolvedValue({ id_rol: 1 });
  mocks.db.areas.upsert.mockResolvedValue({ id_area: 1 });
  mocks.hash.mockResolvedValue('hash-de-prueba');
});
it('rechaza una inicialización sin credenciales antes de tocar la base', async () => {
  await expect(service.createInitialAdmin({})).rejects.toThrow('INITIAL_ADMIN_EMAIL');
  await expect(service.createInitialAdmin({ email: 'admin@example.invalid', password: 'corta' })).rejects.toThrow('INITIAL_ADMIN_PASSWORD');
  expect(mocks.db.$transaction).not.toHaveBeenCalled();
});
it('no cambia cuentas ni contraseñas cuando ya existe un administrador', async () => {
  mocks.db.usuarios.count.mockResolvedValue(1);
  await expect(service.createInitialAdmin({ email: 'admin@example.invalid', password: 'Clave-unicamente-de-prueba' })).rejects.toThrow('Ya existe un administrador');
  expect(mocks.db.usuarios.create).not.toHaveBeenCalled();
  expect(mocks.db.roles.upsert).not.toHaveBeenCalled();
});
it('no eleva privilegios de una cuenta que ya utiliza ese correo', async () => {
  mocks.db.usuarios.findFirst.mockResolvedValue({ id_usuario: 8 });
  await expect(service.createInitialAdmin({ email: 'admin@example.invalid', password: 'Clave-unicamente-de-prueba' })).rejects.toThrow('ya pertenece');
  expect(mocks.db.usuarios.create).not.toHaveBeenCalled();
});
it('crea solo el administrador inicial y exige cambiar su contraseña', async () => {
  await service.createInitialAdmin({ email: '  Admin@example.invalid ', password: 'Clave-unicamente-de-prueba' });
  expect(mocks.db.usuarios.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ correo: 'admin@example.invalid', password_hash: 'hash-de-prueba', debe_cambiar_password: true }) }));
  expect(mocks.db.$transaction).toHaveBeenCalledWith(expect.any(Function), { isolationLevel: 'Serializable' });
});
it('la inicialización de catálogos conserva los existentes y no crea usuarios', async () => {
  mocks.db.catalogos.upsert.mockResolvedValue({ id_catalogo: 1 });
  mocks.db.catalogo_detalle.findFirst.mockResolvedValue({ id_detalle: 1 });
  await service.seedCatalogs();
  expect(mocks.db.catalogo_detalle.create).not.toHaveBeenCalled();
  expect(mocks.db.usuarios.create).not.toHaveBeenCalled();
  for (const call of mocks.db.catalogos.upsert.mock.calls) expect(call[0].update).toEqual({});
  expect(mocks.contingencias).toHaveBeenCalledOnce();
});
