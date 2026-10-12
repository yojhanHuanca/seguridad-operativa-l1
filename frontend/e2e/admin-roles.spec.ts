import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test('roles carga todas las páginas sin superar el límite de la API y permite filtrar al jefe', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  const users = Array.from({ length: 101 }, (_, index) => ({
    id_usuario: index + 10, codigo_usuario: `QA-${index}`, nombre: `QA Usuario ${index}`,
    correo: `qa-${index}@example.invalid`, cargo: 'QA', telefono: null,
    id_rol: index === 100 ? 3 : 2, id_area: index === 100 ? 2 : null, estado: 'Activo',
    roles: { nombre_rol: index === 100 ? 'Jefe de Área' : 'Seguridad Operativa' },
    areas: index === 100 ? { id_area: 2, nombre_area: 'Mantenimiento' } : null,
  }));
  const requests: { page: number; limit: number; rol: string | null }[] = [];
  await page.route('**/api/users?*', route => {
    const url = new URL(route.request().url());
    const request = { page: Number(url.searchParams.get('page')), limit: Number(url.searchParams.get('limit')), rol: url.searchParams.get('rol') };
    requests.push(request);
    if (request.limit > 100) return route.fulfill({ status: 500, json: { success: false, message: 'Límite máximo: 100' } });
    const filtered = request.rol ? users.filter(user => user.id_rol === Number(request.rol)) : users;
    return route.fulfill({ json: { success: true, data: filtered.slice((request.page - 1) * request.limit, request.page * request.limit), meta: { total: filtered.length } } });
  });
  await page.goto('/admin/roles');
  await expect(page.getByRole('button', { name: 'Editar QA Usuario 100', exact: true })).toBeVisible();
  expect(requests.some(request => request.page === 2)).toBe(true);
  expect(requests.every(request => request.limit <= 100)).toBe(true);
  await page.getByRole('button', { name: /Jefe de Área/ }).click();
  await expect.poll(() => requests.some(request => request.rol === '3')).toBe(true);
  await expect(page.getByRole('button', { name: 'Editar QA Usuario 100', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Editar QA Usuario 0', exact: true })).toHaveCount(0);
});

test('roles distingue un fallo de carga de una búsqueda sin resultados', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  await page.route('**/api/users?*', route => route.fulfill({ status: 500, json: { success: false, message: 'Fallo QA' } }));
  await page.goto('/admin/roles');
  await expect(page.getByRole('alert').filter({ hasText: 'No se pudieron cargar los usuarios' })).toBeVisible();
  await expect(page.getByText('No se encontraron usuarios', { exact: true })).toHaveCount(0);
});
