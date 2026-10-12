import { expect, test } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test('contingencias: horas rápidas sincronizadas y controles con identificadores únicos', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Gestión de Planes de Contingencia');
  await page.route('**/api/contingencias/catalogos', route => route.fulfill({ json: { success: true, data: [
    { id_catalogo: 1, codigo: 'tipo_de_evento', nombre: 'Tipo de evento', items: [{ id_item: 1, valor: 'Accidente' }] },
  ] } }));
  await page.clock.install({ time: new Date('2026-10-11T15:00:00Z') });
  await page.goto('/contingencias/registro');
  await expect(page.getByRole('heading', { name: 'Registrar contingencia', exact: true })).toBeVisible();
  const reportTimes = page.locator('input[name="hora_reporte"]');
  await page.getByRole('button', { name: 'Ahora', exact: true }).first().click();
  await expect(reportTimes.nth(0)).not.toHaveValue('');
  await expect(reportTimes.nth(1)).toHaveValue(await reportTimes.nth(0).inputValue());
  await page.getByRole('button', { name: '+5', exact: true }).nth(1).click();
  await expect(page.locator('input[name="hora_llamado_pco_sppa"]')).not.toHaveValue('');
  await page.getByRole('button', { name: 'N/A', exact: true }).nth(1).click();
  await expect(page.locator('input[name="hora_llamado_pco_sppa"]')).toHaveValue('');
  await page.getByRole('button', { name: /Datos de la atención Persona, diagnóstico/ }).click();
  await expect(page.locator('textarea[name="breve_descripcion_hecho"]')).toBeVisible();
  const ids = await page.locator('input[id], select[id], textarea[id]').evaluateAll(elements => elements.map(element => element.id));
  expect(new Set(ids).size).toBe(ids.length);
});
