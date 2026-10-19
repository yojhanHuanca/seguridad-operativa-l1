import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, expect, it } from 'vitest';
import prisma from '../../src/lib/prisma.js';
import { ImportacionMonitoreoService as Monitor } from '../../src/modules/importacion/importacion-monitoreo.service.js';
import { ImportacionContingenciasService as Cont } from '../../src/modules/importacion/importacion-contingencias.service.js';
import { ImportacionHistorialService as History } from '../../src/modules/importacion/importacion-historial.service.js';
import { IndicadoresEventosService as Indicators } from '../../src/modules/eventos/indicadores.service.js';
import { ContingenciaService } from '../../src/modules/contingencias/contingencia.service.js';
import { ConfiguracionService } from '../../src/modules/configuracion/configuracion.service.js';

const run = randomUUID().slice(0, 8);
let actor: number | undefined;
const catalogIds: number[] = [];
const detailIds: number[] = [];
const operationIds: number[] = [];
const month = '2012-02';

beforeAll(async () => {
  expect((await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`)[0]?.name).toBe('seguridad_operativa_test');
  expect(await prisma.datos_operativos.count({ where: { fecha: { gte: new Date('2012-02-01Z'), lt: new Date('2012-03-01Z') } } })).toBe(0);
  actor = (await prisma.usuarios.create({ data: { codigo_usuario: `IND-${run}`, nombre: `QA indicadores ${run}`, correo: `ind-${run}@example.invalid`, estado: 'Inactivo' } })).id_usuario;
  const catalogs = [
    ['Tipo de incidente operativo', ['NO ABRE PUERTAS', 'ATRAPAMIENTO-DJ', 'ATROPELLO']],
    ['Ubicación', ['ESTACIÓN']], ['Lugar de Incidente', ['ANDÉN']], ['Tipo Causa', ['FACTOR EXTERNO']],
  ] as const;
  for (const [index, [name, items]] of catalogs.entries()) {
    let catalog = await prisma.catalogos.findUnique({ where: { nombre: name } });
    if (!catalog) { catalog = await prisma.catalogos.create({ data: { codigo: `IND-${run}-${index}`, nombre: name } }); catalogIds.push(catalog.id_catalogo); }
    for (const item of items) {
      if (!await prisma.catalogo_detalle.findFirst({ where: { id_catalogo: catalog.id_catalogo, nombre: item, estado: true } })) {
        detailIds.push((await prisma.catalogo_detalle.create({ data: { id_catalogo: catalog.id_catalogo, nombre: item, estado: true } })).id_detalle);
      }
    }
  }
  for (let day = 1; day <= 29; day++) operationIds.push((await prisma.datos_operativos.create({ data: {
    fecha: new Date(Date.UTC(2012, 1, day)), qty_carreras: 100, qty_pasajeros: 1000000, afluencia: 50000,
    km_comercial: 10000, km_no_comercial: 50, paradas_estacion: 100,
  } })).id_dato_operativo);
  await ConfiguracionService.bootstrapSequences();
}, 30000);

afterAll(async () => {
  try {
    if (actor) {
      await prisma.eventos_monitoreo.deleteMany({ where: { usuario_registra: actor } });
      await prisma.contingencia_eventos.deleteMany({ where: { created_by: actor } });
      await prisma.importaciones.deleteMany({ where: { usuario: actor } });
      await prisma.auditoria.deleteMany({ where: { usuario: actor } });
      await prisma.usuarios.delete({ where: { id_usuario: actor } });
    }
    if (operationIds.length) await prisma.datos_operativos.deleteMany({ where: { id_dato_operativo: { in: operationIds } } });
    if (detailIds.length) await prisma.catalogo_detalle.deleteMany({ where: { id_detalle: { in: detailIds } } });
    if (catalogIds.length) await prisma.catalogos.deleteMany({ where: { id_catalogo: { in: catalogIds } } });
  } finally { await prisma.$disconnect(); }
}, 30000);

it('importar cambia los conteos y tasas correctos; revertir restaura los indicadores originales', async () => {
  const initial = await Indicators.calcular({ anio: '2012', mes: '2' });
  const initialCont = (await ContingenciaService.monthlyIndicator({ mes: month })).items.find(row => row.mes === month)!;
  const monitorRows = ['NO ABRE PUERTAS', 'ATRAPAMIENTO-DJ', 'ATROPELLO'].map(type => ({ Fecha: '2012-02-15', 'Hora de evento': '10:00', 'Tipo de incidente operativo': type, 'Descripción del evento': `QA-${run}`, Ubicación: 'ESTACIÓN', 'Lugar de Incidente': 'ANDÉN', 'Tipo Causa': 'FACTOR EXTERNO' }));
  const contRows = ['Accidente', 'Accidente', 'Problemas de salud'].map(type => ({ Fecha: '2012-02-15', 'Hora de Reporte': '10:00', 'Tipo de evento': type, 'Lugar del evento': 'Estación QA', 'Lugar exacto del evento': 'Andén', 'Quién reporta': `QA-${run}` }));
  expect((await Monitor.importarMonitoreo(`${run}-M.xlsx`, monitorRows, actor!)).imported.eventos).toBe(3);
  expect((await Cont.importarContingencias(`${run}-C.xlsx`, contRows, actor!)).imported.eventos).toBe(3);
  const result = await Indicators.calcular({ anio: '2012', mes: '2' });
  expect(result.totalEventos.mes - initial.totalEventos.mes).toBe(3);
  expect(result.erroresOperativos.mes - initial.erroresOperativos.mes).toBe(1);
  expect(result.accidentabilidad.mes - initial.accidentabilidad.mes).toBe(1);
  expect(result.criticos.mes - initial.criticos.mes).toBe(1);
  expect(result.datosMes).toEqual({ kmComercial: 290000, afluenciaPasajeros: 29000000 });
  expect(result.indiceErrores.valor).toBe(3.45);
  expect(result.indiceAccidentabilidad.valor).toBe(0.03);
  const monthly = (await ContingenciaService.monthlyIndicator({ mes: month })).items.find(row => row.mes === month)!;
  expect(monthly.accidentes - initialCont.accidentes).toBe(2);
  expect(monthly.noAccidentes - initialCont.noAccidentes).toBe(1);
  expect(monthly.sinClasificar).toBe(initialCont.sinClasificar);
  expect(monthly.tasa).toBeCloseTo(3 / 1450000 * 1000000, 8);
  const rate = await ContingenciaService.rate({ desde: '2012-02-01', hasta: '2012-02-29' });
  expect(rate.eventos).toBe(monthly.total);
  expect(rate.tasa).toBeCloseTo(monthly.tasa!, 8);
  const loads = await prisma.importaciones.findMany({ where: { usuario: actor! } });
  for (const load of loads) await History.revertir(load.id_importacion, actor!, 'Reversión QA de prueba de indicadores importados', null);
  const reverted = await Indicators.calcular({ anio: '2012', mes: '2' });
  expect(reverted.totalEventos).toEqual(initial.totalEventos);
  expect(reverted.indiceErrores.valor).toBe(initial.indiceErrores.valor);
  expect(reverted.indiceAccidentabilidad.valor).toBe(initial.indiceAccidentabilidad.valor);
  expect((await ContingenciaService.monthlyIndicator({ mes: month })).items.find(row => row.mes === month)).toEqual(initialCont);
}, 30000);
