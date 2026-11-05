import { expect, test } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test('un borrador antiguo sin propietario no se muestra a la cuenta actual', async ({ page }) => {
  await mockApi(page);
  await page.route('**/api/contingencias/catalogos', route => route.fulfill({ json: { success: true, data: [{ id_catalogo: 1, codigo: 'tipo_de_evento', nombre: 'Tipo de evento', items: [{ id_item: 1, valor: 'Accidente' }] }] } }));
  await loginAs(page, 'Gestión de Planes de Contingencia');
  await page.addInitScript(() => localStorage.setItem('contingencia-draft', JSON.stringify({ fecha: '2000-01-01' })));
  await page.goto('/contingencias/registro');
  await expect(page.getByRole('heading', { name: 'Registrar contingencia', exact: true })).toBeVisible();
  await expect(page.locator('input[type="date"]').first()).not.toHaveValue('2000-01-01');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('contingencia-draft')!).fecha)).toBe('2000-01-01');
});

test('el borrador persiste al recargar y queda separado de otra cuenta', async ({ page }) => {
  await mockApi(page);
  await page.route('**/api/contingencias/catalogos', route => route.fulfill({ json: { success: true, data: [{ id_catalogo: 1, codigo: 'tipo_de_evento', nombre: 'Tipo de evento', items: [{ id_item: 1, valor: 'Accidente' }] }] } }));
  await loginAs(page, 'Gestión de Planes de Contingencia');
  await page.addInitScript(() => {
    if (!localStorage.getItem('contingencia-draft:5')) localStorage.setItem('contingencia-draft:5', JSON.stringify({ fecha: '2026-10-08' }));
    if (!localStorage.getItem('contingencia-draft:6')) localStorage.setItem('contingencia-draft:6', JSON.stringify({ fecha: '2026-10-09' }));
  });
  await page.goto('/contingencias/registro');
  await expect(page.locator('input[type="date"]').first()).toHaveValue('2026-10-08');
  await page.locator('input[type="date"]').first().fill('2026-10-07');
  await expect.poll(() => page.evaluate(() => new Promise<string>((resolve, reject) => {
    const request = indexedDB.open('sms-l1-workspace-v1', 1);
    request.onsuccess = () => {
      const db = request.result;
      const read = db.transaction('drafts').objectStore('drafts').getAll();
      read.onsuccess = () => { resolve(JSON.stringify(read.result)); db.close(); };
      read.onerror = () => reject(read.error);
    };
    request.onerror = () => reject(request.error);
  }))).toContain('2026-10-07');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('contingencia-draft:6')!).fecha)).toBe('2026-10-09');
  await page.reload();
  await expect(page.locator('input[type="date"]').first()).toHaveValue('2026-10-07');
});

test('migra un borrador anterior aunque se recargue sin editar ningún campo', async ({ page }) => {
  await mockApi(page);
  await page.route('**/api/contingencias/catalogos', route => route.fulfill({ json: { success: true, data: [{ id_catalogo: 1, codigo: 'tipo_de_evento', nombre: 'Tipo de evento', items: [{ id_item: 1, valor: 'Accidente' }] }] } }));
  await loginAs(page, 'Gestión de Planes de Contingencia');
  await page.addInitScript(() => {
    if (sessionStorage.getItem('legacy-draft-seeded')) return;
    localStorage.setItem('contingencia-draft:5', JSON.stringify({ fecha: '2026-10-06' }));
    sessionStorage.setItem('legacy-draft-seeded', '1');
  });
  await page.goto('/contingencias/registro');
  await expect(page.locator('input[type="date"]').first()).toHaveValue('2026-10-06');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('contingencia-draft:5'))).toBeNull();
  await page.reload();
  await expect(page.locator('input[type="date"]').first()).toHaveValue('2026-10-06');
});
