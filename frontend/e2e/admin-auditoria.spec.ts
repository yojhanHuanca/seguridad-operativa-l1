import { test, expect, type Page } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

async function setup(page: Page) {
  await mockApi(page);
  await loginAs(page, 'Admin');
  const requests: URL[] = [];
  await page.route('**/api/auditoria**', async route => {
    const url = new URL(route.request().url());
    requests.push(url);
    let data: unknown;
    if (url.pathname.endsWith('/actores')) data = [{ id_usuario: 7, nombre: 'Ana Inactiva', codigo_usuario: 'U7', estado: 'Inactivo' }];
    else if (url.pathname.endsWith('/tablas')) data = ['usuarios'];
    else if (url.pathname.endsWith('/counts')) data = { editar: 31 };
    else if (url.pathname.endsWith('/export')) return route.fulfill({ contentType: 'text/csv', body: '\uFEFFFecha,Usuario\n2026,Ana\n2026,Otra página' });
    else data = [{ id_auditoria: 1, accion: 'editar', tabla_afectada: 'usuarios', fecha: '2026-09-02T04:59:59Z', usuarios: { nombre: 'Ana Inactiva', cargo: null }, descripcion: 'Cambió permisos', datos_previos: { permisos: { leer: true }, eliminado: 'valor anterior' }, datos_nuevos: { permisos: { leer: false } } }];
    return route.fulfill({ json: { success: true, data, meta: { total: 31 } } });
  });
  await page.goto('/admin/auditoria');
  await expect(page.getByRole('button', { name: 'Detalle de auditoría 1' })).toBeVisible();
  return requests;
}

test('filtros reales y CSV completo independiente de la página', async ({ page }) => {
  const requests = await setup(page);
  await page.getByLabel('Usuario', { exact: true }).selectOption('7');
  await page.getByLabel('Módulo', { exact: true }).selectOption('usuarios');
  await page.getByLabel('Desde', { exact: true }).fill('2026-09-01');
  await page.getByLabel('Hasta', { exact: true }).fill('2026-09-02');
  await page.getByRole('button', { name: /Editó/ }).click();
  await page.getByLabel('Buscar auditoría').fill('Ana');
  await expect(page.getByRole('button', { name: 'Exportar CSV filtrado' })).toBeEnabled();
  await page.getByRole('button', { name: 'Página siguiente' }).click();
  await expect(page.getByText('Página 2 de 2')).toBeVisible();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar CSV filtrado' }).click();
  const file = await download;
  const stream = await file.createReadStream();
  let csv = '';
  for await (const chunk of stream!) csv += chunk.toString();
  expect(csv).toContain('Otra página');
  const query = requests.findLast(u => u.pathname.endsWith('/export'))!.searchParams;
  expect(Object.fromEntries(query)).toEqual({ usuario: '7', tabla: 'usuarios', desde: '2026-09-01', hasta: '2026-09-02', accion: 'editar', search: 'Ana' });
  await page.getByRole('button', { name: 'Limpiar filtros' }).click();
  await expect(page.getByLabel('Usuario', { exact: true })).toHaveValue('');
  await expect(page.getByText('Página 1 de 2')).toBeVisible();
});

test('detalle accesible conserva objetos y campos eliminados', async ({ page }) => {
  await setup(page);
  const toggle = page.getByRole('button', { name: 'Detalle de auditoría 1' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('"leer": false', { exact: false })).toBeVisible();
  await expect(page.getByText('Eliminado', { exact: true })).toBeVisible();
  await expect(page.getByText('valor anterior', { exact: true })).toBeVisible();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('muestra error de exportación y permite recuperar errores de carga', async ({ page }) => {
  await setup(page);
  await page.route('**/api/auditoria/export**', route => route.fulfill({ status: 400, json: { message: 'El resultado supera 20 000 registros. Reduce los filtros.' } }));
  await page.getByRole('button', { name: 'Exportar CSV filtrado' }).click();
  await expect(page.getByRole('alert')).toContainText('supera 20 000');
  await page.route('**/api/auditoria?**', route => route.fulfill({ status: 500, json: { message: 'Error' } }));
  await page.getByLabel('Buscar auditoría').fill('falla');
  await expect(page.getByText('No se pudo cargar la auditoría.', { exact: false })).toBeVisible({ timeout: 15000 });
  await page.unroute('**/api/auditoria?**');
  await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Detalle de auditoría 1' })).toBeVisible();
});

test('un rol no Admin no accede a auditoría', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Monitorista');
  await page.goto('/admin/auditoria');
  await expect(page.getByRole('button', { name: 'Exportar CSV filtrado' })).toHaveCount(0);
  await expect(page).not.toHaveURL(/\/admin\/auditoria$/);
});

test('carga visible e intervalo inválido impide exportar', async ({ page }) => {
  await setup(page);
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/auditoria?**', async route => {
    await pending;
    await route.fulfill({ json: { success: true, data: [], meta: { total: 0 } } });
  });
  await page.getByLabel('Desde', { exact: true }).fill('2026-09-03');
  await expect(page.getByText('Cargando auditoría')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Exportar CSV filtrado' })).toBeDisabled();
  release();
  await page.getByLabel('Hasta', { exact: true }).fill('2026-09-01');
  await expect(page.getByText('La fecha desde no puede ser posterior a hasta.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Exportar CSV filtrado' })).toBeDisabled();
});
