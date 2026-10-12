import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

const profiles = [
  { role: 'Monitorista', path: '/monitoreo/datos-operativos' },
  { role: 'Seguridad Operativa', path: '/seguridad/datos-operativos' },
  { role: 'Gestión de Planes de Contingencia', path: '/contingencias/datos-operativos' },
] as const;

for (const profile of profiles) {
  test(`${profile.role}: datos operativos conserva el panel y permite registrar, editar, filtrar y eliminar`, async ({ page }) => {
    await mockApi(page);
    // SO también tiene acceso sin el permiso adicional de responsable.
    await loginAs(page, profile.role, { es_responsable: false });
    type RecordData = { id_dato_operativo: number; fecha: string; qty_carreras: number; qty_pasajeros: number; afluencia: number; km_comercial: number; km_no_comercial: number; paradas_estacion: number; created_at: string; updated_at: string };
    let items: RecordData[] = [];
    let deletes = 0;
    const periods: string[] = [];
    await page.route('**/api/datos-operativos**', route => {
      const req = route.request();
      const url = new URL(req.url());
      if (req.method() === 'POST') {
        items = [{ ...req.postDataJSON(), id_dato_operativo: 41, created_at: '2026-10-10T12:00:00Z', updated_at: '2026-10-10T12:00:00Z' }];
        return route.fulfill({ status: 201, json: { success: true, data: items[0] } });
      }
      if (req.method() === 'PUT') {
        items[0] = { ...items[0], ...req.postDataJSON() };
        return route.fulfill({ json: { success: true, data: items[0] } });
      }
      if (req.method() === 'DELETE') {
        deletes++;
        items = [];
        return route.fulfill({ json: { success: true } });
      }
      periods.push(url.searchParams.toString());
      return route.fulfill({ json: { success: true, data: { items, total: items.length, page: 1, limit: 25 } } });
    });
    await page.goto(profile.path.replace('/datos-operativos', ''));
    await page.getByRole('link', { name: 'Datos Operativos', exact: true }).first().click();
    await expect(page).toHaveURL(profile.path);
    await expect(page.getByRole('heading', { name: 'Registrar dato operativo', exact: true })).toBeVisible();
    const form = page.locator('form');
    await form.getByLabel('Fecha', { exact: false }).fill('2026-01-15');
    await form.getByLabel(/QTY carreras/).fill('10');
    await form.getByLabel(/QTY pasajeros/).fill('1000');
    await form.getByLabel(/Afluencia diaria/).fill('900');
    await form.getByRole('button', { name: 'Registrar dato', exact: true }).click();
    await expect(page.getByText('Dato operativo registrado', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Editar dato', exact: true }).click();
    await expect(form.getByLabel(/QTY pasajeros/)).toHaveValue('1,000');
    await form.getByLabel(/QTY pasajeros/).fill('1100');
    await form.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
    await expect(page.getByRole('cell', { name: '1,100', exact: true })).toBeVisible();
    await page.getByLabel('Desde', { exact: true }).fill('2026-01-01');
    await page.getByLabel('Hasta', { exact: true }).fill('2026-01-31');
    await expect.poll(() => periods.some(period => period.includes('desde=2026-01-01') && period.includes('hasta=2026-01-31'))).toBe(true);
    await page.getByRole('button', { name: 'Eliminar dato', exact: true }).click();
    await expect(page.getByText(/¿Eliminar el registro/)).toBeVisible();
    await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
    expect(deletes).toBe(0);
    await expect(page.getByRole('cell', { name: '1,100', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Eliminar dato', exact: true }).click();
    await page.getByRole('button', { name: 'Eliminar', exact: true }).click();
    await expect(page.getByText('Dato operativo eliminado', { exact: true })).toBeVisible();
    await expect(page.getByText('No hay datos operativos para mostrar.', { exact: true })).toBeVisible();
    expect(deletes).toBe(1);
    await expect(page).toHaveURL(profile.path);
  });
}
