import { expect, test } from '@playwright/test';
import { expectNoRuntimeCrash, loginAs, mockApi } from './helpers';

const publicRoutes = [
  '/',
  '/login',
  '/forgot-password',
  '/reportes/nuevo',
  '/reportes/consulta',
];

const adminRoutes = [
  '/admin/usuarios',
  '/admin/roles',
  '/admin/catalogos',
  '/admin/estaciones',
  '/admin/material-rodante',
  '/admin/importacion',
  '/admin/auditoria',
  '/admin/configuracion',
  '/admin/perfil',
];

const seguridadRoutes = [
  '/seguridad',
  '/seguridad/casos',
  '/seguridad/alertas',
  '/seguridad/planes-accion',
  '/seguridad/eventos',
  '/seguridad/reportes/kpis',
  '/seguridad/reportes/estadisticas',
  '/seguridad/reportes/exportar',
  '/seguridad/notificaciones',
  '/seguridad/perfil',
];

const jefeRoutes = [
  '/jefe',
  '/jefe/indicadores',
  '/jefe/perfil',
];

const monitoreoRoutes = [
  '/monitoreo',
  '/monitoreo/nuevo',
  '/monitoreo/historial',
  '/monitoreo/reportes',
  '/monitoreo/perfil',
];

test.beforeEach(async ({ page }) => {
  await mockApi(page);
});

for (const route of publicRoutes) {
  test(`publico: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expectNoRuntimeCrash(page);
    await expect(page).not.toHaveURL(/\/login$/);
  });
}

for (const route of adminRoutes) {
  test(`admin: ${route}`, async ({ page }) => {
    await loginAs(page, 'Admin');
    await page.goto(route);
    await expectNoRuntimeCrash(page);
    await expect(page).not.toHaveURL(/\/login$/);
  });
}

for (const route of seguridadRoutes) {
  test(`seguridad operativa: ${route}`, async ({ page }) => {
    await loginAs(page, 'Seguridad Operativa');
    await page.goto(route);
    await expectNoRuntimeCrash(page);
    await expect(page).not.toHaveURL(/\/login$/);
  });
}

for (const route of jefeRoutes) {
  test(`jefe de area: ${route}`, async ({ page }) => {
    await loginAs(page, 'Jefe de Área');
    await page.goto(route);
    await expectNoRuntimeCrash(page);
    await expect(page).not.toHaveURL(/\/login$/);
  });
}

for (const route of monitoreoRoutes) {
  test(`monitoreo: ${route}`, async ({ page }) => {
    await loginAs(page, 'Monitorista');
    await page.goto(route);
    await expectNoRuntimeCrash(page);
    await expect(page).not.toHaveURL(/\/login$/);
  });
}
