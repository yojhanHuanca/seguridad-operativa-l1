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
  '/admin/usuarios/importar',
  '/admin/auditoria',
  '/admin/configuracion',
  '/admin/perfil',
];

const seguridadRoutes = [
  '/seguridad',
  '/seguridad/casos',
  '/seguridad/planes-accion',
  '/seguridad/eventos',
  // "/seguridad/reportes/estadisticas" se eliminó: todos los gráficos se
  // consolidaron en KPIs y la ruta ya no existe (ver AppRouter.tsx).
  '/seguridad/reportes/kpis',
  '/seguridad/reportes/indicadores-operativos',
  '/seguridad/reportes/exportar',
  '/seguridad/notificaciones',
  '/seguridad/eventos-asignados',
  '/seguridad/datos-operativos',
  '/seguridad/perfil',
];

const jefeRoutes = [
  '/jefe',
  '/jefe/indicadores',
  '/jefe/notificaciones',
  '/jefe/perfil',
];

const monitoreoRoutes = [
  '/monitoreo',
  '/monitoreo/nuevo',
  '/monitoreo/historial',
  '/monitoreo/reportes',
  '/monitoreo/indicadores',
  '/monitoreo/datos-operativos',
  '/monitoreo/perfil',
];

const contingenciasRoutes = [
  '/contingencias/registro', '/contingencias/historial', '/contingencias/indicadores',
  '/contingencias/perfil',
];

test.beforeEach(async ({ page }) => {
  await mockApi(page);
});

for (const route of publicRoutes) {
  test(`publico: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expectNoRuntimeCrash(page);
    // La aserción "no terminó en /login" no aplica a /login mismo: visitar esa
    // ruta a propósito y quedarse ahí es el comportamiento correcto, no un
    // redirect por falta de sesión.
    if (route !== '/login') {
      await expect(page).not.toHaveURL(/\/login$/);
    }
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

for (const route of contingenciasRoutes) {
  test(`contingencias: ${route}`, async ({ page }) => {
    await loginAs(page, 'Gestión de Planes de Contingencia');
    await page.goto(route);
    await expectNoRuntimeCrash(page);
    await expect(page).toHaveURL(route);
  });
}

for (const route of ['/admin/usuarios', '/admin/usuarios/importar', '/seguridad', '/jefe', '/monitoreo', '/contingencias/registro']) {
  test(`sin sesión no se puede acceder a ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveURL('/login');
    await expectNoRuntimeCrash(page);
  });
}

for (const example of [
  { role: 'Monitorista', target: '/admin/usuarios/importar', home: '/monitoreo' },
  { role: 'Jefe de Área', target: '/admin/configuracion', home: '/jefe' },
  { role: 'Gestión de Planes de Contingencia', target: '/seguridad/casos', home: '/contingencias/registro' },
  { role: 'Seguridad Operativa', target: '/admin/roles', home: '/seguridad' },
] as const) {
  test(`${example.role} no puede abrir ${example.target}`, async ({ page }) => {
    await loginAs(page, example.role);
    await page.goto(example.target);
    await expect(page).toHaveURL(example.home);
    await expectNoRuntimeCrash(page);
  });
}

test('Seguridad Operativa sin permiso responsable no entra a Monitoreo ni Eventos', async ({ page }) => {
  await loginAs(page, 'Seguridad Operativa', { es_responsable: false });
  for (const route of ['/monitoreo', '/seguridad/eventos']) {
    await page.goto(route);
    await expect(page).toHaveURL('/seguridad');
    await expectNoRuntimeCrash(page);
  }
});

test('Contingencias mantiene la importación masiva y no expone el formulario diario de datos operativos', async ({ page }) => {
  await loginAs(page, 'Gestión de Planes de Contingencia');
  await page.goto('/contingencias/registro');
  await expect(page.getByRole('link', { name: 'Datos Operativos', exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: 'Importación masiva', exact: true }).click();
  await expect(page).toHaveURL('/contingencias/importacion');
  await expect(page.getByRole('tab', { name: 'Datos operativos', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Contingencias', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Casos SOP', exact: true })).toHaveCount(0);
  await page.goto('/contingencias/datos-operativos');
  await expect(page.getByRole('heading', { name: 'Página no encontrada', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Registrar dato operativo', exact: true })).toHaveCount(0);
});
