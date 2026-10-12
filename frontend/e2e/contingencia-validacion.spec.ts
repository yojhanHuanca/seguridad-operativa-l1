import { expect, test } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test('un error oculto abre su sección, enfoca el campo e impide guardar', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Gestión de Planes de Contingencia');
  const catalogs = [
    ['tipo_de_evento', 'Accidente'],
    ['lugar_del_evento', 'Parque Industrial'],
    ['lugar_exacto_del_evento', 'Explanada'],
    ['quien_reporta_primer_reporte', 'AGENTE DE ESTACION'],
  ];
  await page.route('**/api/contingencias/catalogos', route => route.fulfill({ json: {
    success: true,
    data: catalogs.map(([codigo, valor], index) => ({
      id_catalogo: index + 1, codigo, nombre: codigo,
      items: [{ id_item: index + 1, valor }],
    })),
  } }));
  let saves = 0;
  await page.route('**/api/contingencias', route => {
    if (route.request().method() === 'POST') saves += 1;
    return route.fulfill({ status: 400, json: { success: false, message: 'No debe enviarse un formulario inválido' } });
  });
  await page.goto('/contingencias/registro');
  await page.locator('#cont-hora_reporte').fill('10:00');
  await page.locator('#cont-tipo_evento').selectOption('Accidente');
  await page.locator('#cont-lugar_evento').selectOption('Parque Industrial');
  await page.locator('#cont-lugar_exacto_evento').selectOption('Explanada');
  await page.locator('#cont-quien_reporta').selectOption('AGENTE DE ESTACION');
  const section = page.getByRole('button', { name: /Datos de la atención Persona, diagnóstico/ });
  await section.click();
  await page.getByRole('spinbutton', { name: 'Edad', exact: true }).fill('1.5');
  await section.click();
  await expect(page.getByRole('spinbutton', { name: 'Edad', exact: true })).not.toBeVisible();
  await page.getByRole('button', { name: 'Finalizar registro', exact: true }).first().click();
  const age = page.getByRole('spinbutton', { name: 'Edad', exact: true });
  await expect(age).toBeVisible();
  await expect(age).toBeFocused();
  await expect(age).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Ingresa un número entero válido', { exact: true })).toBeVisible();
  expect(saves).toBe(0);
  await age.fill('');
  await expect(page.getByText(/Revisa los campos se[nñ]alados antes de guardar/)).not.toBeVisible();
  expect(saves).toBe(0);
});
