import { beforeEach, describe, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({
  db: {
    catalogo_detalle: { findMany: vi.fn() }, eventos_monitoreo: { findMany: vi.fn() }, contingencia_eventos: { findMany: vi.fn() },
    importacion_locks: { create: vi.fn(), updateMany: vi.fn(), deleteMany: vi.fn() },
    $executeRaw: vi.fn(), $transaction: vi.fn(),
  },
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
  mocks.db.$transaction.mockImplementation((callback: (tx: typeof mocks.db) => unknown) => callback(mocks.db));
  mocks.db.importacion_locks.create.mockResolvedValue({});
  mocks.db.importacion_locks.updateMany.mockResolvedValue({ count: 1 });
  mocks.db.importacion_locks.deleteMany.mockResolvedValue({ count: 1 });
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
  it('reconoce los encabezados cortos que publica la plantilla de contingencias', async () => {
    await Cont.importarContingencias('plantilla.xlsx', [{ ...contingency,
      'Medio de comunicación': 'Radio', 'Estado del usuario': 'Consciente',
      'Hora llamada PCO': '10:00', 'Hora llegada SPAA': '10:05', 'Hora inicio SPAA': '10:06', 'Hora término atención': '10:10',
      'Estación partida SPAA': 'Central', 'Medio transporte SPAA': 'A pie',
      'Estación partida ambulancia': 'Base', 'Estación llegada ambulancia': 'Central',
      'Hora llamada ambulancia': '10:11', 'Hora llegada estación': '10:15',
      'Hora salida centro salud': '10:16', 'Hora llegada centro médico': '10:30', 'Hora retiro centro médico': '10:40', 'Hora retorno puesto': '11:00',
      'Hora llamada ambulancia terceros': '10:10', 'Hora llegada ambulancia terceros': '10:15', 'Hora inicio traslado terceros': '10:20',
      'Reporte PCO': 'PCO-001', 'Reporte cliente': 'CLIENTE-001', 'Zona lesión': 'Brazo', 'Categoría paciente': 'Adulto',
      'Tipo declaración jurada': 'Simple', 'Número declaración jurada': '001', 'Breve descripción': 'Detalle íntegro',
      'Casos sospechosos COVID': 'No', 'Estación origen usuario': 'Origen', 'Estación destino usuario': 'Destino',
    }], 1);
    expect(mocks.contingency).toHaveBeenCalledWith(expect.objectContaining({
      medio_comunicacion_primer_reporte: 'Radio', estado_usuario_reportado: 'Consciente',
      hora_llamado_pco_sppa: '10:00', hora_llegada_spaa: '10:05', hora_inicio_spaa: '10:06', hora_termino_atencion_inicio_traslado: '10:10',
      estacion_partida_spaa: 'Central', medio_transporte_spaa: 'A pie', estacion_partida_ambulancia: 'Base', estacion_llegada_ambulancia: 'Central',
      hora_llamado_ambulancia: '10:11', hora_llegada_estacion: '10:15', hora_salida_centro_salud: '10:16', hora_llegada_centro_medico: '10:30', hora_retiro_centro_medico: '10:40', hora_retorno_puesto: '11:00',
      hora_llamado_ambulancia_tercero: '10:10', hora_llegada_ambulancia_terceros: '10:15', hora_inicio_traslado_ambulancia_terceros: '10:20',
      reporte_pco: 'PCO-001', reporte_cliente: 'CLIENTE-001', zona_lesion: 'Brazo', categoria_paciente: 'Adulto',
      tipo_declaracion_jurada: 'Simple', nro_declaracion_jurada: '001', breve_descripcion_hecho: 'Detalle íntegro', casos_sospechosos_covid_19: 'No', estacion_origen_usuario: 'Origen', estacion_destino_usuario: 'Destino',
    }), 1, expect.objectContaining({ preserveImportedValues: true }));
  });

  it('informa la última fila fallida de 3000 y limita la concurrencia sin perder las restantes', async () => {
    let active = 0;
    let peak = 0;
    mocks.monitor.mockImplementation(async (dto: { descripcion: string }) => {
      active++;
      peak = Math.max(peak, active);
      await new Promise<void>(resolve => setImmediate(resolve));
      active--;
      if (dto.descripcion === 'Fila 2999') throw new Error('Fallo simulado');
      return {};
    });
    const rows = Array.from({ length: 3000 }, (_, i) => ({ ...monitoring, 'Descripción del evento': `Fila ${i}` }));
    const result = await Monitor.importarMonitoreo('3000.xlsx', rows, 1);
    expect(result.imported).toMatchObject({ eventos: 2999, skipped: 0 });
    expect(result.resumen.errores).toBe(1);
    expect(result.issues).toContainEqual(expect.objectContaining({ row: 3001, field: 'Guardado' }));
    expect(mocks.complete).toHaveBeenCalledWith(3, expect.objectContaining({ importados: 2999, errores: 1 }));
    expect(peak).toBeLessThanOrEqual(10);
    expect(mocks.db.importacion_locks.deleteMany).toHaveBeenCalledOnce();
  });
  it('envía los campos de monitoreo a sus destinos sin sustituir los valores importados', async () => {
    await Monitor.importarMonitoreo('datos.xlsx', [{ ...monitoring, 'Información adicional': 'Detalle completo', 'Cámara monitoreada': 'CAM-01', 'Nro. Carrera': '001', DEMORA: '2.5', Año: '2026', Mes: '9', Sem: '36', Día: 'martes' }], 7);
    expect(mocks.monitor).toHaveBeenCalledWith(expect.objectContaining({
      fecha: '2026-09-01', hora: '10:00', id_tipo_incidente: 1, id_ubicacion: 2, id_lugar_incidente: 3,
      descripcion: 'Prueba', informacion_adicional: 'Detalle completo', camara_monitoreada: 'CAM-01', numero_carrera: '001', demora: 2.5, anio: 2026, mes: 9, semana: 36, dia: 'martes',
    }), 7, { preserveImportedValues: true, idImportacion: 3 });
  });
  it('rechaza modelo y unidad incompatibles en la vista previa del Excel', async () => {
    const existing = await mocks.db.catalogo_detalle.findMany();
    mocks.db.catalogo_detalle.findMany.mockResolvedValue([...existing,
      { id_detalle: 10, nombre: 'ALSTOM', catalogos: { nombre: 'Modelo MR' } },
      { id_detalle: 11, nombre: 'ANSALDO', catalogos: { nombre: 'Modelo MR' } },
      { id_detalle: 12, nombre: 'T45', clasificacion_mr: 'ANSALDO', catalogos: { nombre: 'Nro. MR' } },
    ]);
    const invalid = await Monitor.validarMonitoreo('test.xlsx', [{ ...monitoring, 'Modelo MR': 'ALSTOM', 'Nro. MR': 'T45' }]);
    expect(invalid.canImport).toBe(false);
    expect(invalid.issues.some(issue => issue.message.includes('no corresponde'))).toBe(true);
    const valid = await Monitor.validarMonitoreo('test.xlsx', [{ ...monitoring, 'Modelo MR': 'ANSALDO', 'Nro. MR': 'T45' }]);
    expect(valid.canImport).toBe(true);
  });
  it('guarda cada fila igual como un evento independiente en ambos módulos', async () => {
    const mon = await Monitor.importarMonitoreo('test', [monitoring, monitoring], 1, 'Hoja 2');
    const con = await Cont.importarContingencias('test', [contingency, contingency], 1);
    expect(mon.imported).toMatchObject({ eventos: 2, skipped: 0 });
    expect(con.imported).toMatchObject({ eventos: 2, skipped: 0 });
    expect(mocks.monitor).toHaveBeenCalledTimes(2);
    expect(mocks.contingency).toHaveBeenCalledTimes(2);
    expect(mocks.start).toHaveBeenCalledWith('monitoreo', 'test', 1, 2, 'Hoja 2');
  });
  it('permite volver a cargar monitoreo aunque coincida con un evento almacenado', async () => {
    mocks.db.eventos_monitoreo.findMany.mockResolvedValue([{ fecha: new Date('2026-09-01'), hora: new Date('1970-01-01T10:00Z'), tipo_incidente: 1, descripcion: 'Prueba', ubicacion: 2, lugar_incidente: 3 }]);
    const result = await Monitor.validarMonitoreo('otro.xlsx', [monitoring]);
    expect(result.resumen.duplicados).toBe(0);
    expect(result.canImport).toBe(true);
    await Monitor.importarMonitoreo('otro.xlsx', [monitoring], 1);
    expect(mocks.monitor).toHaveBeenCalledOnce();
  });
  it('conserva todas las atenciones sin fusionarlas con las almacenadas', async () => {
    mocks.db.contingencia_eventos.findMany.mockResolvedValue([{ fecha: new Date('2026-09-01'), hora_reporte: new Date('1970-01-01T10:00Z'), tipo_evento: 'Atención', lugar_evento: 'Estación', lugar_exacto_evento: 'Andén', quien_reporta: 'Prueba', estado: 'Registrado', persona: { nombre_persona: 'Persona privada', dni: '12345678' } }]);
    const result = await Cont.validarContingencias('test', [contingency, { ...contingency, DNI: '87654321' }]);
    expect(result.resumen.duplicados).toBe(0);
    expect(result.resumen.listos).toBe(2);
    await Cont.importarContingencias('test', [contingency, { ...contingency, DNI: '87654321' }], 1);
    expect(mocks.contingency).toHaveBeenCalledTimes(2);
    expect(mocks.contingency).toHaveBeenNthCalledWith(1, expect.objectContaining({ nombre_persona: 'Persona privada', dni: '12345678', lugar_evento: 'Estación', lugar_exacto_evento: 'Andén' }), 1, expect.objectContaining({ preserveImportedValues: true }));
    expect(mocks.contingency).toHaveBeenNthCalledWith(2, expect.objectContaining({ dni: '87654321' }), 1, expect.anything());
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
    expect(result.issues.some(i => i.field === 'Edad' || i.field === 'edad')).toBe(true);
  });
  it('no confunde registros que difieren después de 120 caracteres o en signos', () => {
    const prefix = 'a'.repeat(121);
    expect(importFingerprint(['text'], { text: prefix + '1' })).not.toBe(importFingerprint(['text'], { text: prefix + '2' }));
    expect(importFingerprint(['text'], { text: '1.2' })).not.toBe(importFingerprint(['text'], { text: '12' }));
  });
});
