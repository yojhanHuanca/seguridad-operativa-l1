import { test, expect, type Page } from '@playwright/test';
import { loginAs, mockApi } from './helpers';
async function setup(page: Page) {
  await mockApi(page); await loginAs(page, 'Admin');
  const items = [
    { id_detalle: 1, nombre: 'T1', clasificacion_mr: 'ANSALDO', estado: true },
    { id_detalle: 2, nombre: 'T6', clasificacion_mr: 'ALSTOM', estado: true },
    { id_detalle: 3, nombre: 'V-GRUA', clasificacion_mr: 'AUXILIAR', estado: true },
    { id_detalle: 4, nombre: 'T99', clasificacion_mr: null, estado: false },
  ];
  await page.route('**/api/catalogs', route => route.fulfill({ json: { success: true, data: [{ id_catalogo: 9, nombre: 'Nro. MR', codigo: 'NUMERO_MR', catalogo_detalle: items.filter(i => i.estado) }] } }));
  await page.route('**/api/catalogs/9/admin', route => route.fulfill({ json: { success: true, data: { id_catalogo: 9, catalogo_detalle: items } } }));
  await page.route('**/api/catalogs/9/detalle', route => {
    const body = route.request().postDataJSON();
    items.push({ id_detalle: items.length + 1, nombre: body.nombre, clasificacion_mr: body.clasificacion_mr, estado: true });
    return route.fulfill({ status: 201, json: { success: true, data: items.at(-1) } });
  });
  await page.route('**/api/catalogs/detalle/*', route => {
    const id = Number(route.request().url().split('/').at(-1)); const item = items.find(i => i.id_detalle === id)!;
    if (route.request().method() === 'DELETE') item.estado = false;
    else Object.assign(item, route.request().postDataJSON());
    return route.fulfill({ json: { success: true, data: item } });
  });
  await page.goto('/admin/material-rodante');
  return items;
}
test('alta exige clasificación y respeta el fabricante elegido para T45', async ({ page }) => {
  const items = await setup(page);
  await page.getByRole('button', { name: 'Nueva unidad', exact: true }).click();
  await page.getByRole('textbox', { name: 'Código de unidad' }).fill('T45');
  await page.getByRole('button', { name: 'Guardar', exact: true }).click();
  await expect(page.getByText('Selecciona la clasificación de la unidad.', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Clasificación de la unidad' }).selectOption('ANSALDO');
  await page.getByRole('button', { name: 'Guardar', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Nueva unidad', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'T45 Activa', exact: true })).toBeVisible();
  expect(items.at(-1)?.clasificacion_mr).toBe('ANSALDO');
  await page.getByRole('combobox', { name: 'Filtrar clasificación' }).selectOption('ANSALDO');
  await expect(page.getByRole('button', { name: 'T45 Activa', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'T6 Activa', exact: true })).toHaveCount(0);
});
test('edición conserva clasificación y cancelar desactivación no cambia la unidad', async ({ page }) => {
  const items = await setup(page);
  await page.getByRole('button', { name: 'T6 Activa', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Clasificación de la unidad' })).toHaveValue('ALSTOM');
  await page.getByRole('button', { name: 'Desactivar', exact: true }).click();
  await page.getByRole('dialog', { name: '¿Desactivar unidad?' }).getByRole('button', { name: 'Cancelar' }).click();
  expect(items[1].estado).toBe(true);
  await page.getByRole('button', { name: 'Desactivar', exact: true }).click();
  await page.getByRole('dialog', { name: '¿Desactivar unidad?' }).getByRole('button', { name: 'Desactivar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'T6 Inactiva', exact: true })).toBeVisible();
  expect(items[1].id_detalle).toBe(2);
});
test('búsqueda, auxiliares y unidades sin clasificar funcionan en móvil', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 }); await setup(page);
  await page.getByRole('combobox', { name: 'Filtrar clasificación' }).selectOption('AUXILIAR');
  await expect(page.getByRole('button', { name: 'V-GRUA Activa', exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Filtrar clasificación' }).selectOption('UNCLASSIFIED');
  await expect(page.getByRole('button', { name: 'T99 Inactiva', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Buscar unidad' }).fill('INEXISTENTE');
  await expect(page.getByText('No hay unidades que coincidan con los filtros.', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('material-rodante-mobile.png'), fullPage: true });
});
test('un fallo al guardar conserva código y clasificación para reintentar', async ({ page }) => {
  await setup(page);
  await page.route('**/api/catalogs/9/detalle', route => route.fulfill({ status: 400, json: { success: false, message: 'Ya existe una unidad con ese código' } }));
  await page.getByRole('button', { name: 'Nueva unidad', exact: true }).click();
  await page.getByRole('textbox', { name: 'Código de unidad' }).fill('T6');
  await page.getByRole('combobox', { name: 'Clasificación de la unidad' }).selectOption('ALSTOM');
  await page.getByRole('button', { name: 'Guardar', exact: true }).click();
  await expect(page.getByText('Ya existe una unidad con ese código', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Código de unidad' })).toHaveValue('T6');
  await expect(page.getByRole('combobox', { name: 'Clasificación de la unidad' })).toHaveValue('ALSTOM');
});

test('eventos filtra las unidades por fabricante y borra la selección al cambiarlo', async ({ page }) => {
  await mockApi(page); await loginAs(page, 'Monitorista');
  await page.route('**/api/catalogs', route => route.fulfill({ json: { success: true, data: [
    { id_catalogo: 8, nombre: 'Modelo MR', catalogo_detalle: [{ id_detalle: 80, nombre: 'ALSTOM' }, { id_detalle: 81, nombre: 'ANSALDO' }, { id_detalle: 82, nombre: 'N/A' }] },
    { id_catalogo: 9, nombre: 'Nro. MR', catalogo_detalle: [{ id_detalle: 1, nombre: 'T1', clasificacion_mr: 'ANSALDO' }, { id_detalle: 2, nombre: 'T6', clasificacion_mr: 'ALSTOM' }, { id_detalle: 3, nombre: 'V-GRUA', clasificacion_mr: 'AUXILIAR' }, { id_detalle: 4, nombre: 'N/A' }] },
  ] } }));
  await page.goto('/monitoreo/nuevo');
  const section = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Operación ferroviaria' }) });
  const model = section.locator('select').nth(0);
  const unit = section.locator('select').nth(1);
  await model.selectOption('80');
  await expect(unit.locator('option', { hasText: /^T6$/ })).toHaveCount(1);
  await expect(unit.locator('option', { hasText: /^T1$/ })).toHaveCount(0);
  await unit.selectOption('2');
  await model.selectOption('81');
  await expect(unit).toHaveValue('');
  await expect(unit.locator('option', { hasText: /^T1$/ })).toHaveCount(1);
  await expect(unit.locator('option', { hasText: /^T6$/ })).toHaveCount(0);
  await model.selectOption('82');
  await expect(unit.locator('option', { hasText: /^V-GRUA$/ })).toHaveCount(1);
});
