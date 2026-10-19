import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import prisma from '../../src/lib/prisma.js';
import { ConfiguracionService } from '../../src/modules/configuracion/configuracion.service.js';
import { ImportacionMonitoreoService as Monitor } from '../../src/modules/importacion/importacion-monitoreo.service.js';
import { ImportacionContingenciasService as Cont } from '../../src/modules/importacion/importacion-contingencias.service.js';
import type { ImportacionRow } from '../../src/modules/importacion/importacion.types.js';

const run = randomUUID().slice(0, 8);
const count = 3000;
let actor: number | undefined;
const createdCatalogs: number[] = [];
const details: number[] = [];
const names: Record<string, string> = {};
const monitorRows: ImportacionRow[] = [];
const contingencyRows: ImportacionRow[] = [];

beforeAll(async () => {
  const database = await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`;
  expect(database[0]?.name).toBe('seguridad_operativa_test');
  // Fixture de autoría sin contraseña ni rol: no se simula una sesión ni se otorgan permisos.
  actor = (await prisma.usuarios.create({ data: { codigo_usuario: `VOL-${run}`, nombre: `QA volumen ${run}`, correo: `vol-${run}@example.invalid`, estado: 'Inactivo' } })).id_usuario;
  for (const [i, name] of ['Tipo de incidente operativo', 'Ubicación', 'Lugar de Incidente'].entries()) {
    let catalog = await prisma.catalogos.findUnique({ where: { nombre: name } });
    if (!catalog) {
      catalog = await prisma.catalogos.create({ data: { codigo: `VOL-${run}-${i}`, nombre: name } });
      createdCatalogs.push(catalog.id_catalogo);
    }
    const detail = await prisma.catalogo_detalle.create({ data: { id_catalogo: catalog.id_catalogo, nombre: `QA-${run}-${i}`, estado: true } });
    details.push(detail.id_detalle);
    names[name] = detail.nombre;
  }
  await ConfiguracionService.bootstrapSequences();
  for (let i = 0; i < count; i++) {
    monitorRows.push({ Fecha: '2026-10-18', 'Hora de evento': '10:15', 'Tipo de incidente operativo': names['Tipo de incidente operativo']!, Ubicación: names.Ubicación!, 'Lugar de Incidente': names['Lugar de Incidente']!, 'Descripción del evento': `QA-${run}-M-${i}`, 'Información adicional': `Información íntegra ${i}`, 'Nro. Carrera': String(i).padStart(5, '0'), 'Cámara monitoreada': 'CAM-QA', DEMORA: String(i % 20), Año: '2026', Mes: '10', Sem: '42', Día: 'domingo' });
    contingencyRows.push({ Fecha: '2026-10-18', 'Hora de Reporte': '10:15', 'TIPO DE EVENTO': 'Atención QA', 'LUGAR DEL EVENTO': 'Estación QA', 'LUGAR EXACTO DEL EVENTO': 'Andén QA', 'Quién reporta': `QA-${run}`, 'Nombre persona': `Persona ficticia ${i}`, DNI: `QA${String(i).padStart(6, '0')}`, Edad: String(i % 90), Sexo: 'Femenino', 'Diagnóstico presuntivo': `Diagnóstico simulado ${i}`, Observación: `QA-${run}-C-${i}`, 'Atención inicial': 'Primeros auxilios', 'Atención final': 'Observación', 'Hora llamada PCO': '10:15', 'Hora llegada SPAA': '10:20', 'Estación partida SPAA': 'Estación QA', 'Medio transporte SPAA': 'A pie', 'Reporte PCO': `PCO-${i}`, 'Reporte cliente': `CLIENTE-${i}`, 'Zona lesión': 'Brazo', 'Categoría paciente': 'Adulto', Registro: `Registro QA ${i}`, Estado: 'Registrado' });
  }
}, 30000);

afterAll(async () => {
  try {
    if (actor) {
      await prisma.eventos_monitoreo.deleteMany({ where: { usuario_registra: actor } });
      await prisma.contingencia_eventos.deleteMany({ where: { created_by: actor } });
      await prisma.importaciones.deleteMany({ where: { usuario: actor } });
      await prisma.usuarios.delete({ where: { id_usuario: actor } });
    }
    if (details.length) await prisma.catalogo_detalle.deleteMany({ where: { id_detalle: { in: details } } });
    if (createdCatalogs.length) await prisma.catalogos.deleteMany({ where: { id_catalogo: { in: createdCatalogs } } });
  } finally { await prisma.$disconnect(); }
}, 30000);

describe('Volumen real en PostgreSQL: 3000 filas por módulo', () => {
  it('monitoreo: valida y persiste las 3000 filas con campos y códigos correctos', async () => {
    const start = performance.now();
    const preview = await Monitor.validarMonitoreo(`vol-${run}-M.xlsx`, monitorRows);
    expect(preview.resumen).toMatchObject({ totalFilas: count, listos: count, duplicados: 0, errores: 0 });
    const validationMs = performance.now() - start;
    const saveStart = performance.now();
    const result = await Monitor.importarMonitoreo(`vol-${run}-M.xlsx`, monitorRows, actor!, 'Datos');
    const saveMs = performance.now() - saveStart;
    expect(result.imported).toMatchObject({ eventos: count, skipped: 0 });
    expect(result.resumen.errores).toBe(0);
    const saved = await prisma.eventos_monitoreo.findMany({ where: { usuario_registra: actor! } });
    expect(saved).toHaveLength(count);
    expect(new Set(saved.map(row => row.codigo_evento)).size).toBe(count);
    const byDescription = new Map(saved.map(row => [row.descripcion, row]));
    for (let i = 0; i < count; i++) expect(byDescription.get(`QA-${run}-M-${i}`)).toMatchObject({ numero_carrera: String(i).padStart(5, '0'), informacion_adicional: `Información íntegra ${i}`, demora: expect.anything(), tipo_incidente: details[0], ubicacion: details[1], lugar_incidente: details[2] });
    const history = await prisma.importaciones.findFirstOrThrow({ where: { usuario: actor!, modulo: 'monitoreo' } });
    expect(history).toMatchObject({ estado: 'completado', filas_total: count, importados: count, errores: 0 });
    expect(await prisma.importacion_locks.count({ where: { modulo: 'monitoreo' } })).toBe(0);
    console.log(JSON.stringify({ module: 'monitoreo', rows: count, validationMs: Math.round(validationMs), saveMs: Math.round(saveMs) }));
  }, 180000);

  it('contingencias: persiste 3000 eventos y sus datos personales, clínicos y de atención', async () => {
    const start = performance.now();
    const preview = await Cont.validarContingencias(`vol-${run}-C.xlsx`, contingencyRows);
    expect(preview.resumen).toMatchObject({ totalFilas: count, listos: count, duplicados: 0, errores: 0 });
    const validationMs = performance.now() - start;
    const saveStart = performance.now();
    const result = await Cont.importarContingencias(`vol-${run}-C.xlsx`, contingencyRows, actor!, 'Datos');
    const saveMs = performance.now() - saveStart;
    expect(result.imported).toMatchObject({ eventos: count, skipped: 0 });
    expect(result.resumen.errores).toBe(0);
    const saved = await prisma.contingencia_eventos.findMany({ where: { created_by: actor! }, include: { persona: true, diagnostico: true, atencion: true, cierre: true } });
    expect(saved).toHaveLength(count);
    const byObservation = new Map(saved.map(row => [row.cierre?.observacion, row]));
    for (let i = 0; i < count; i++) {
      const row = byObservation.get(`QA-${run}-C-${i}`);
      expect(row?.persona).toMatchObject({ nombre_persona: `Persona ficticia ${i}`, dni: `QA${String(i).padStart(6, '0')}`, edad: i % 90 });
      expect(row?.diagnostico).toMatchObject({ diagnostico_presuntivo: `Diagnóstico simulado ${i}`, reporte_pco: `PCO-${i}`, reporte_cliente: `CLIENTE-${i}`, zona_lesion: 'Brazo' });
      expect(row?.atencion).toMatchObject({ estacion_partida_spaa: 'Estación QA', medio_transporte_spaa: 'A pie' });
      expect(row?.atencion?.hora_llamado_pco_sppa?.toISOString().slice(11, 16)).toBe('10:15');
    }
    const history = await prisma.importaciones.findFirstOrThrow({ where: { usuario: actor!, modulo: 'contingencias' } });
    expect(history).toMatchObject({ estado: 'completado', filas_total: count, importados: count, errores: 0 });
    expect(await prisma.importacion_locks.count({ where: { modulo: 'contingencias' } })).toBe(0);
    console.log(JSON.stringify({ module: 'contingencias', rows: count, validationMs: Math.round(validationMs), saveMs: Math.round(saveMs) }));
  }, 180000);

  it('un error en la fila 3001 impide guardar un archivo incompleto', async () => {
    const rows = monitorRows.map(row => ({ ...row }));
    rows[count - 1]!.Fecha = 'fecha inválida';
    const before = await prisma.importaciones.count({ where: { usuario: actor! } });
    const preview = await Monitor.validarMonitoreo('invalid.xlsx', rows);
    expect(preview.canImport).toBe(false);
    expect(preview.issues.some(issue => issue.row === 3001 && issue.severity === 'error')).toBe(true);
    await expect(Monitor.importarMonitoreo('invalid.xlsx', rows, actor!)).rejects.toThrow('errores de validación');
    expect(await prisma.importaciones.count({ where: { usuario: actor! } })).toBe(before);
    expect(await prisma.importacion_locks.count({ where: { modulo: 'monitoreo' } })).toBe(0);
  }, 180000);
});
