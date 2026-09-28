import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  db: {
    catalogos: { findMany: vi.fn() }, areas: { findMany: vi.fn(), createMany: vi.fn() }, usuarios: { findMany: vi.fn(), createMany: vi.fn() },
    casos_sop: { findMany: vi.fn(), createManyAndReturn: vi.fn(), findUniqueOrThrow: vi.fn() },
    planes_accion: { findMany: vi.fn(), createManyAndReturn: vi.fn() }, actividades_plan: { createMany: vi.fn() }, eventos_operativos: { createManyAndReturn: vi.fn() }, evento_caso: { createMany: vi.fn() },
    timeline_caso: { createMany: vi.fn(), create: vi.fn() }, notificaciones: { create: vi.fn() }, importaciones: { update: vi.fn() }, $transaction: vi.fn(),
  }, sequence: vi.fn(), iniciar: vi.fn(), fallar: vi.fn(), audit: vi.fn(),
}));
vi.mock('../../lib/prisma.js', () => ({ default: mocks.db }));
vi.mock('../configuracion/configuracion.service.js', () => ({ ConfiguracionService: { nextCodigosPlanBulk: vi.fn().mockResolvedValue(new Map()), get: vi.fn().mockResolvedValue({ numeracion: { prefijoExpedientes: 'SOP' } }) } }));
vi.mock('../configuracion/sequences.js', () => ({ SEQ_CASOS_SOP: 'sop', advanceSequenceAtLeast: mocks.sequence }));
vi.mock('./importacion-historial.service.js', () => ({ ImportacionHistorialService: { iniciar: mocks.iniciar, fallar: mocks.fallar } }));
vi.mock('../auditoria/auditoria.repository.js', () => ({ AuditoriaRepository: { registrar: mocks.audit } }));
import { ImportacionService } from './importacion.service.js';
import type { ImportacionPayload } from './importacion.types.js';

const row = { Código: 'SOP 54-2026', Tipo: 'Hallazgo', Estado: 'Plan de Acción', Fecha: '2026-09-01', Descripción: 'Hallazgo de prueba', Área: 'Operaciones', 'Código Plan': 'SOP 54-2026-PLA-01', 'Descripción Plan': 'Inspeccionar', 'Estado Plan': 'Enviado', 'Responsable Plan': 'Jefe Uno', 'Área Plan': 'Operaciones' };
const payload = (accion: 'asignar' | 'cerrar' = 'asignar'): ImportacionPayload => ({ filename: 'prueba.xlsx', rows: [{ ...row }], decisionesSop: [{ codigo: row.Código, accion, motivo: 'Regularización del histórico' }] });
beforeEach(() => {
  vi.clearAllMocks();
  let id = 0;
  mocks.db.catalogos.findMany.mockResolvedValue(Object.entries({ Procedencia: ['Incidencias'], 'Tipo SOP': ['Hallazgo'], Tipo: ['Observación'], 'Tipo de Reporte': ['Hallazgo'], 'Estado Hallazgo': ['Plan de Acción', 'Ejecución', 'Verificación', 'Cerrado'], 'Estado Plan de acción': ['Enviado', 'En Ejecución', 'Cerrado'], 'Estado Actividad': ['Pendiente', 'En progreso'] }).map(([nombre, values]) => ({ nombre, catalogo_detalle: values.map(nombre => ({ nombre, codigo: null, id_detalle: ++id })) })));
  mocks.db.areas.findMany.mockResolvedValue([{ id_area: 1, nombre_area: 'Operaciones' }]);
  mocks.db.usuarios.findMany.mockResolvedValue([{ id_usuario: 2, codigo_usuario: 'J01', nombre: 'Jefe Uno', correo: 'prueba@example.test', estado: 'Activo', id_area: 1, roles: { nombre_rol: 'Jefe de Área' } }]);
  mocks.db.casos_sop.findMany.mockResolvedValue([]);
  mocks.db.planes_accion.findMany.mockResolvedValue([]);
  mocks.db.planes_accion.createManyAndReturn.mockImplementation(async ({ data }) => data.map((item: object) => ({ ...item, id_plan: 111 })));
  mocks.db.casos_sop.createManyAndReturn.mockResolvedValue([{ id_caso: 100, codigo_sop: row.Código }]);
  mocks.db.casos_sop.findUniqueOrThrow.mockResolvedValue({ id_caso: 100 });
  mocks.db.eventos_operativos.createManyAndReturn.mockResolvedValue([{ id_evento: 101 }]);
  mocks.iniciar.mockResolvedValue({ id_importacion: 9 });
  mocks.db.$transaction.mockImplementation(async (fn: (tx: typeof mocks.db) => unknown) => fn(mocks.db));
});
describe('Importación SOP protegida', () => {
  it('asigna a un jefe activo, conserva códigos y avanza la secuencia a 54', async () => {
    const input = payload(); const original = structuredClone(input.rows);
    const result = await ImportacionService.importar(input, 1, null);
    expect(result.imported.casos).toBe(1);
    expect(input.rows).toEqual(original);
    expect(mocks.db.casos_sop.createManyAndReturn.mock.calls[0]![0].data[0].codigo_sop).toBe(row.Código);
    expect(mocks.db.planes_accion.createManyAndReturn.mock.calls[0]![0].data[0]).toMatchObject({ codigo_plan: row['Código Plan'], id_area: 1, responsable: 2 });
    expect(mocks.sequence).toHaveBeenCalledWith(mocks.db, 'sop', 54);
    expect(mocks.db.notificaciones.create).toHaveBeenCalledOnce();
    expect(mocks.db.actividades_plan.createMany.mock.calls[0]![0].data[0]).toMatchObject({ id_plan: 111, descripcion: row["Descripción Plan"], responsable: 2, porcentaje: 0 });
    expect(mocks.db.timeline_caso.create).toHaveBeenCalledOnce();
    expect(result.canImport).toBe(false);
  });
  it('rechaza destinos de otra área antes de cualquier escritura', async () => {
    mocks.db.usuarios.findMany.mockResolvedValue([{ id_usuario: 2, nombre: 'Jefe Uno', codigo_usuario: 'J01', correo: '', estado: 'Activo', id_area: 7, roles: { nombre_rol: 'Jefe de Área' } }]);
    await expect(ImportacionService.importar(payload(), 1, null)).rejects.toThrow('errores de validación');
    expect(mocks.db.$transaction).not.toHaveBeenCalled();
    expect(mocks.iniciar).not.toHaveBeenCalled();
  });
  it('impide aplicar decisiones a SOP existentes', async () => {
    mocks.db.casos_sop.findMany.mockResolvedValue([{ codigo_sop: row.Código }]);
    const preview = await ImportacionService.validar(payload('cerrar'));
    expect(preview.canImport).toBe(false);
    expect(preview.cases[0]?.editable).toBe(false);
  });
  it('cierra el SOP y sus planes sin asignar ni notificar', async () => {
    const preview = await ImportacionService.validar(payload('cerrar'));
    expect(preview.cases[0]).toMatchObject({ estado: 'Cerrado', estadoOriginal: 'Plan de Acción' });
    expect(preview.cases[0]?.planesDetalle?.[0]?.estado).toBe('Cerrado');
    await ImportacionService.importar(payload('cerrar'), 1, null);
    expect(mocks.db.notificaciones.create).not.toHaveBeenCalled();
  });
  it('sin decisión conserva la etapa y el estado originales', async () => {
    const preview = await ImportacionService.validar({ filename: 'test', rows: [row] });
    expect(preview.cases[0]?.estado).toBe(row.Estado);
    expect(preview.cases[0]?.planesDetalle?.[0]?.estado).toBe(row['Estado Plan']);
  });
  it('detecta códigos de plan repetidos en diferentes filas', async () => {
    const preview = await ImportacionService.validar({ filename: 'test', rows: [row, row] });
    expect(preview.canImport).toBe(false);
    expect(preview.issues.some(i => i.row === 3 && i.field === 'Código Plan')).toBe(true);
  });
});
