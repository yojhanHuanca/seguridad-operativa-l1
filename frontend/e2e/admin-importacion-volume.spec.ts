import { expect, test } from '@playwright/test';
import { loginAs, mockApi } from './helpers';
import type { ImportacionPayload, ImportacionPreview } from '../src/features/importacion/types';

for (const module of ['monitoreo', 'contingencias'] as const) {
  test(`${module}: lee un XLSX real de 3000 filas y envía todas al módulo correcto`, async ({ page }) => {
    test.setTimeout(60000);
    await mockApi(page);
    await loginAs(page, 'Admin');
    const ExcelJS = (await import('exceljs')).default;
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet('Guía').getCell('A2').value = 'Completar Datos';
    const sheet = workbook.addWorksheet('Datos');
    const headers = module === 'monitoreo'
      ? ['Fecha', 'Hora de evento', 'Tipo de incidente operativo', 'Descripción del evento', 'Ubicación', 'Lugar de Incidente', 'Año', 'Mes', 'Sem', 'Día', 'Nro. Carrera', 'Cámara monitoreada', 'Información adicional']
      : ['Fecha', 'Hora de Reporte', 'Tipo de evento', 'Lugar del evento', 'Lugar exacto del evento', 'Quién reporta', 'Nombre persona', 'DNI', 'Edad', 'Diagnóstico presuntivo', 'Observación', 'Registro', 'Reporte PCO'];
    sheet.addRow(headers);
    for (let i = 1; i <= 3000; i++) {
      const date = new Date('2026-10-18T00:00:00Z');
      const time = new Date('1899-12-30T10:15:00Z');
      sheet.addRow(module === 'monitoreo'
        ? [date, time, 'Incidente QA', `Descripción ${i}`, 'Estación QA', 'Andén QA', 2026, 10, 42, 'domingo', String(i).padStart(5, '0'), 'CAM-QA', `Detalle íntegro ${i}`]
        : [date, time, 'Atención QA', 'Estación QA', 'Andén QA', 'Operador QA', `Persona ficticia ${i}`, String(i).padStart(8, '0'), 30, 'Simulado', `Observación ${i}`, 'Registro QA', `Detalle íntegro ${i}`]);
    }
    sheet.getColumn(1).numFmt = 'yyyy-mm-dd';
    sheet.getColumn(2).numFmt = 'hh:mm';
    const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
    const preview: ImportacionPreview = {
      filename: `${module}-3000.xlsx`, canImport: true, requiredColumns: [], optionalColumns: [], issues: [],
      resumen: { totalFilas: 3000, casosDetectados: 3000, planesDetectados: 0, listos: 3000, duplicados: 0, errores: 0, advertencias: 0 },
      cases: Array.from({ length: 3000 }, (_, i) => ({ row: i + 2, codigo: `QA-${i}`, titulo: `Resultado ${i + 1}`, tipo: 'QA', estado: 'Registrado', estacion: 'Estación QA', area: null, riesgo: null, fecha: '2026-10-18', planes: 0, status: 'valid' })),
    };
    const writes: ImportacionPayload[] = [];
    let validation: ImportacionPayload | undefined;
    await page.route('**/api/importacion/**', route => {
      const url = route.request().url();
      if (url.includes('historial')) return route.fulfill({ json: { success: true, data: { items: [], total: 0 } } });
      expect(url).toContain(`/importacion/${module}/`);
      const payload = route.request().postDataJSON() as ImportacionPayload;
      if (url.endsWith('/validar')) validation = payload;
      if (url.endsWith('/importar')) writes.push(payload);
      return route.fulfill({ json: { success: true, data: url.endsWith('/importar')
        ? { ...preview, canImport: false, imported: { eventos: 3000, casos: 0, planes: 0, skipped: 0 } }
        : preview } });
    });
    await page.goto('/admin/importacion');
    await page.locator('input[type=file]').setInputFiles({ name: `${module}-3000.xlsx`, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', buffer });
    await page.getByRole('button', { name: 'Validar', exact: true }).click();
    await expect(page.getByLabel('Página de filas')).toBeVisible();
    await page.getByLabel('Página de filas').selectOption('29');
    await expect(page.getByText('Detalle íntegro 3000', { exact: true })).toBeVisible();
    await page.getByLabel('Página de resultados').selectOption('29');
    await expect(page.getByText('Resultado 3000', { exact: true })).toBeVisible();
    // La paginación limita el DOM, nunca el contenido que se envía al servidor.
    expect(await page.locator('tbody tr').count()).toBeLessThan(205);
    expect(validation?.rows).toHaveLength(3000);
    expect(validation?.rows[2999]?.Fecha).toBe('2026-10-18');
    expect(validation?.rows[2999]?.[headers[1]]).toBe('10:15');
    if (module === 'contingencias') expect(validation?.rows[2999]?.DNI).toBe('00003000');
    await page.getByRole('button', { name: module === 'monitoreo' ? 'Importar monitoreo' : 'Importar contingencias', exact: true }).click();
    await page.getByRole('button', { name: 'Confirmar importación', exact: true }).click();
    await expect(page.getByText('Importación completada:', { exact: true })).toBeVisible();
    expect(writes).toHaveLength(1);
    expect(writes[0].rows).toHaveLength(3000);
    expect(writes[0].rows[2999]?.[headers[12]]).toBe('Detalle íntegro 3000');
  });
}
