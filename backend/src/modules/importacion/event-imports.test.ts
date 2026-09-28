import { beforeEach, describe, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({
  db: { catalogo_detalle: { findMany: vi.fn() }, eventos_monitoreo: { findMany: vi.fn() }, contingencia_eventos: { findMany: vi.fn() } },
  monitor: vi.fn(), contingency: vi.fn(), start: vi.fn(), complete: vi.fn(),
}));
vi.mock('../../lib/prisma.js', () => ({ default: mocks.db }));
vi.mock('../eventos/evento.repository.js', () => ({ EventoRepository: { create: mocks.monitor } }));
vi.mock('../contingencias/contingencia.repository.js', () => ({ ContingenciaRepository: { create: mocks.contingency } }));
vi.mock('./importacion-historial.service.js', () => ({ ImportacionHistorialService: { iniciar: mocks.start, completar: mocks.complete } }));
import { ImportacionMonitoreoService as Monitor } from './importacion-monitoreo.service.js';
import { ImportacionContingenciasService as Cont } from './importacion-contingencias.service.js';
import { importFingerprint } from './import-fingerprint.js';
const monitoring = { Fecha: '2026-09-01', 'Hora de evento': '10:00', 'Tipo de incidente operativo': 'Incidente', 'Descripción del evento': 'Prueba', Ubicación: 'Estación', 'Lugar de Incidente': 'Andén' };
const contingency = { Fecha: '2026-09-01', 'Hora de Reporte': '10:00', 'Tipo de evento': 'Atención', 'Lugar del evento': 'Estación', 'Lugar exacto del evento': 'Andén', 'Quién reporta': 'Prueba', 'Nombre persona': 'Persona privada', DNI: '12345678' };
beforeEach(() => {
  vi.resetAllMocks();
  mocks.db.catalogo_detalle.findMany.mockResolvedValue([
    { id_detalle: 1, nombre: 'Incidente', catalogos: { nombre: 'Tipo de incidente operativo' } },
    { id_detalle: 2, nombre: 'Estación', catalogos: { nombre: 'Ubicación' } },
    { id_detalle: 3, nombre: 'Andén', catalogos: { nombre: 'Lugar de Incidente' } },
  ]);
  mocks.db.eventos_monitoreo.findMany.mockResolvedValue([]);
  mocks.db.contingencia_eventos.findMany.mockResolvedValue([]);
  mocks.start.mockResolvedValue({ id_importacion: 3 });
});
describe('Importación de eventos', () => {
  it('omite duplicados realmente durante la escritura de ambos módulos', async () => {
    const mon = await Monitor.importarMonitoreo('test', [monitoring, monitoring], 1, 'Hoja 2');
    const con = await Cont.importarContingencias('test', [contingency, contingency], 1);
    expect(mon.imported).toMatchObject({ eventos: 1, skipped: 1 });
    expect(con.imported).toMatchObject({ eventos: 1, skipped: 1 });
    expect(mocks.monitor).toHaveBeenCalledOnce();
    expect(mocks.contingency).toHaveBeenCalledOnce();
    expect(mocks.start).toHaveBeenCalledWith('monitoreo', 'test', 1, 2, 'Hoja 2');
  });
  it('reconoce un evento almacenado, sin depender del nombre del archivo', async () => {
    mocks.db.eventos_monitoreo.findMany.mockResolvedValue([{ fecha: new Date('2026-09-01'), hora: new Date('1970-01-01T10:00Z'), tipo_incidente: 1, descripcion: 'Prueba', ubicacion: 2, lugar_incidente: 3 }]);
    const result = await Monitor.validarMonitoreo('otro.xlsx', [monitoring]);
    expect(result.resumen.duplicados).toBe(1);
    expect(result.canImport).toBe(false);
  });
  it('compara datos clínicos completos para no fusionar personas o hechos distintos', async () => {
    mocks.db.contingencia_eventos.findMany.mockResolvedValue([{ fecha: new Date('2026-09-01'), hora_reporte: new Date('1970-01-01T10:00Z'), tipo_evento: 'Atención', lugar_evento: 'Estación', lugar_exacto_evento: 'Andén', quien_reporta: 'Prueba', estado: 'Registrado', persona: { nombre_persona: 'Persona privada', dni: '12345678' } }]);
    const result = await Cont.validarContingencias('test', [contingency, { ...contingency, DNI: '87654321' }]);
    expect(result.resumen.duplicados).toBe(1);
    expect(result.resumen.listos).toBe(1);
  });
  it('identifica la fila de un fallo parcial sin devolver datos personales del error', async () => {
    mocks.contingency.mockRejectedValueOnce(new Error('DNI 12345678 Persona privada'));
    const result = await Cont.importarContingencias('test', [contingency, {}, { ...contingency, 'Hora de Reporte': '11:00' }], 1);
    expect(result.resumen.errores).toBe(1);
    expect(result.imported.eventos).toBe(1);
    expect(result.issues.find(i => i.field === 'Guardado')?.row).toBe(2);
    expect(JSON.stringify(result)).not.toContain('12345678');
    expect(result.canImport).toBe(false);
  });
  it('bloquea horas opcionales y edades inválidas durante la vista previa', async () => {
    const result = await Cont.validarContingencias('test', [{ ...contingency, Edad: '-2', hora_inicio_spaa: '25:99' }]);
    expect(result.canImport).toBe(false);
    expect(result.issues.some(i => i.field === 'hora_inicio_spaa')).toBe(true);
    expect(result.issues.every(i => i.value === null)).toBe(true);
  });
  it('no confunde registros que difieren después de 120 caracteres o en signos', () => {
    const prefix = 'a'.repeat(121);
    expect(importFingerprint(['text'], { text: prefix + '1' })).not.toBe(importFingerprint(['text'], { text: prefix + '2' }));
    expect(importFingerprint(['text'], { text: '1.2' })).not.toBe(importFingerprint(['text'], { text: '12' }));
  });
});
