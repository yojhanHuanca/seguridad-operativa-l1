import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { posix } from 'node:path';
import { loginAs, mockApi } from './helpers';
import type { ImportacionPayload, ImportacionPreview } from '../src/features/importacion/types';

test('diseño empresarial visible antes de cargar un archivo', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  await page.route('**/api/importacion/historial**', route => route.fulfill({ json: { success: true, data: { items: [], total: 0 } } }));
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto('/admin/importacion');
  await expect(page.getByRole('heading', { name: 'Importaciones', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Casos SOP' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Todo listo para revisar tu archivo' })).toBeVisible();
  await expect(page.getByText('Prepara el cierre de SOP resueltos internamente')).toBeVisible();
  await page.screenshot({ path: '../outputs/importacion-rediseno.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('SOP: lee XLSX con prefijos OOXML y selecciona la hoja con datos', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  await page.goto('/admin/importacion');
  const source = await readFile('../outputs/2026-09-28-sop-import-sample/Ejemplo_importacion_SOP_10_datos.xlsx');
  const JSZip = (await import('jszip')).default;
  const archive = await JSZip.loadAsync(source);
  const spreadsheetNamespace = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  const relationshipNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const sheetEntry = archive.file('xl/worksheets/sheet1.xml');
  const contentTypesEntry = archive.file('[Content_Types].xml');
  if (!sheetEntry || !contentTypesEntry) throw new Error('La hoja SOP del archivo de prueba no está completa.');
  const sheetXml = (await sheetEntry.async('string')).replace('</worksheet>', '<tableParts count="1"><tablePart r:id="rIdTable" xmlns:r="' + relationshipNamespace + '" /></tableParts></worksheet>');
  archive.file('xl/worksheets/sheet1.xml', sheetXml);
  archive.file('xl/worksheets/_rels/sheet1.xml.rels', `<?xml version="1.0" encoding="utf-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Type="${relationshipNamespace}/table" Target="../tables/table1.xml" Id="rIdTable" /></Relationships>`);
  archive.file('xl/tables/table1.xml', `<?xml version="1.0" encoding="utf-8"?><table xmlns="${spreadsheetNamespace}" id="1" name="SopTestTable" displayName="SopTestTable" ref="A1:A11" headerRowCount="1"><tableColumns count="1"><tableColumn id="1" name="Código" /></tableColumns></table>`);
  archive.file('[Content_Types].xml', (await contentTypesEntry.async('string')).replace('</Types>', '<Override PartName="/xl/tables/table1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml" /></Types>'));
  await Promise.all(Object.keys(archive.files).filter(name => name.endsWith('.xml')).map(async name => {
    const entry = archive.file(name);
    if (!entry) return;
    let xml = await entry.async('string');
    if (xml.includes(`xmlns="${spreadsheetNamespace}"`)) {
      xml = xml.replace(`xmlns="${spreadsheetNamespace}"`, `xmlns:x="${spreadsheetNamespace}"`);
      xml = xml.replace(/(<\/?)([A-Za-z_][\w.-]*)(?=[\s/>])/g, '$1x:$2');
    }
    if (name.endsWith('.rels') && name.includes('/_rels/')) {
      const sourceDirectory = name.slice(0, name.indexOf('/_rels/'));
      xml = xml.replace(/Target="(?!https?:)([^"]+)"/g, (_match, target: string) => {
        const absolute = target.startsWith('/') ? target : posix.resolve('/', sourceDirectory, target);
        return `Target="${absolute}"`;
      });
    }
    archive.file(name, xml);
  }));
  const buffer = Buffer.from(await archive.generateAsync({ type: 'arraybuffer' }));
  await page.locator('input[type=file]').setInputFiles({
    name: 'Ejemplo_importacion_SOP_10_datos.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    buffer,
  });
  await expect(page.getByText('Ejemplo_importacion_SOP_10_datos.xlsx')).toBeVisible();
  await expect(page.getByLabel('Hoja que se importará')).toHaveValue('0');
  await expect(page.getByText('Casos SOP — 10 filas — 25 columnas')).toBeVisible();
});

test('SOP: exige revalidación, protege terminados y envía decisiones separadas del archivo', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  const writes: ImportacionPayload[] = [];
  const preview: ImportacionPreview = { filename: 'prueba.csv', canImport: true, requiredColumns: ['Código', 'Tipo', 'Estado', 'Fecha'], optionalColumns: [], issues: [], resumen: { totalFilas: 2, casosDetectados: 2, planesDetectados: 1, listos: 2, duplicados: 0, errores: 0, advertencias: 0 }, cases: [
    { row: 2, codigo: 'SOP 54-2026', titulo: 'Prueba', tipo: 'Hallazgo', estado: 'Plan de Acción', estadoOriginal: 'Plan de Acción', estacion: '', area: 'Operaciones', riesgo: null, fecha: '2026-09-01', planes: 1, status: 'valid', editable: true, planesDetalle: [{ row: 2, codigo: 'SOP 54-2026-PLA-01', area: 'Operaciones', responsable: 'Jefe Uno', estado: 'Enviado', estadoOriginal: 'Enviado', editable: true }] },
    { row: 3, codigo: 'SOP 55-2026', titulo: 'Terminado', tipo: 'Hallazgo', estado: 'Cerrado', estadoOriginal: 'Cerrado', estacion: '', area: null, riesgo: null, fecha: '2026-09-01', planes: 0, status: 'valid', editable: false },
  ] };
  await page.route('**/api/importacion/**', async route => {
    if (route.request().url().includes('historial')) return route.fulfill({ json: { success: true, data: { items: [], total: 0 } } });
    const body = route.request().postDataJSON() as ImportacionPayload;
    const result = structuredClone(preview);
    if (body.decisionesSop?.[0]?.accion === 'cerrar') {
      result.cases[0].estado = 'Cerrado'; result.cases[0].planesDetalle![0].estado = 'Cerrado';
    }
    if (route.request().url().endsWith('/importar')) { writes.push(body); result.canImport = false; }
    return route.fulfill({ json: { success: true, data: { ...result, ...(writes.length ? { imported: { casos: 2, eventos: 2, planes: 1, skipped: 0 } } : {}) } } });
  });
  await page.goto('/admin/importacion');
  await page.locator('input[type=file]').setInputFiles({ name: 'prueba.csv', mimeType: 'text/csv', buffer: Buffer.from('Código,Tipo,Estado,Fecha\nSOP 54-2026,Hallazgo,Plan de Acción,2026-09-01\nSOP 55-2026,Hallazgo,Cerrado,2026-09-01') });
  await page.getByRole('button', { name: 'Validar', exact: true }).click();
  await expect(page.getByLabel('Seleccionar SOP 55-2026')).toBeDisabled();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: '../outputs/importacion-rediseno-con-sop.png', fullPage: true });
  await page.getByLabel('Motivo de los cambios').fill('Regularización histórica verificada');
  await page.getByLabel('Seleccionar SOP 54-2026').check();
  await page.getByRole('button', { name: 'Cerrar SOP y sus planes' }).click();
  await expect(page.getByRole('alertdialog')).toContainText('1 SOP');
  await page.getByRole('button', { name: 'Preparar y revisar' }).click();
  await expect(page.getByLabel('Estado SOP 54-2026-PLA-01 fila 2')).toHaveValue('Cerrado');
  await expect(page.getByLabel('Estado SOP 54-2026-PLA-01 fila 2')).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Asignar a jefes de área' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Importar casos', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Validar', exact: true }).click();
  await page.getByRole('button', { name: 'Importar casos', exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar importación', exact: true }).click();
  await expect(page.getByText('Importación completada:', { exact: true })).toBeVisible();
  expect(writes).toHaveLength(1);
  expect(writes[0].rows[0].Estado).toBe('Plan de Acción');
  expect(writes[0].decisionesSop).toEqual([{ codigo: 'SOP 54-2026', accion: 'cerrar', motivo: 'Regularización histórica verificada' }]);
  expect(writes[0].hoja).toBe('CSV');
  await expect(page.getByRole('button', { name: 'Importar casos', exact: true })).toBeDisabled();
});

test('Contingencias: oculta valores privados y comunica una carga parcial', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  const preview = { filename: 'cont.csv', canImport: true, requiredColumns: [], optionalColumns: [], issues: [], cases: [], resumen: { totalFilas: 2, casosDetectados: 2, planesDetectados: 0, listos: 2, duplicados: 0, errores: 0, advertencias: 0 } };
  await page.route('**/api/importacion/**', async route => {
    if (route.request().url().includes('historial')) return route.fulfill({ json: { success: true, data: { items: [], total: 0 } } });
    const importing = route.request().url().endsWith('/importar');
    return route.fulfill({ json: { success: true, data: importing ? { ...preview, canImport: false, resumen: { ...preview.resumen, errores: 1 }, issues: [{ row: 3, field: 'Guardado', severity: 'error', message: 'No se pudo guardar esta fila. Revalida antes de reintentar.', value: null }], imported: { casos: 0, eventos: 1, planes: 0, skipped: 0 } } : preview } });
  });
  await page.goto('/admin/importacion');
  await page.locator('input[type=file]').setInputFiles({ name: 'cont.csv', mimeType: 'text/csv', buffer: Buffer.from('Fecha,Hora de Reporte,Tipo de evento,Lugar del evento,Nombre persona,DNI\n2026-09-01,10:00,Atención,Estación,PERSONA PRIVADA,12345678\n2026-09-01,11:00,Atención,Estación,PERSONA PRIVADA,12345678') });
  await page.getByRole('button', { name: 'Validar', exact: true }).click();
  await expect(page.getByText('Dato protegido').first()).toBeVisible();
  await expect(page.getByText('PERSONA PRIVADA', { exact: true })).toHaveCount(0);
  await expect(page.getByText('12345678', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Importar contingencias', exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar importación', exact: true }).click();
  await expect(page.getByText('Importación con errores:', { exact: true })).toBeVisible();
  await expect(page.getByText('1 errores · 0 omitidos')).toBeVisible();
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descargar diagnóstico' }).click();
  const download = await downloadEvent;
  const ExcelJS = await import('exceljs');
  const workbook = new ExcelJS.default.Workbook();
  await workbook.xlsx.readFile((await download.path())!);
  expect(workbook.worksheets).toHaveLength(1);
  const content = JSON.stringify(workbook.worksheets[0].getSheetValues());
  expect(content).toContain('Guardado');
  expect(content).not.toContain('PERSONA PRIVADA');
  expect(content).not.toContain('12345678');
});
