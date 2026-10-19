import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

const profiles = [
  { role: 'Admin', route: '/admin/usuarios', name: 'admin' },
  { role: 'Seguridad Operativa', route: '/seguridad', name: 'seguridad' },
  { role: 'Jefe de Área', route: '/jefe', name: 'jefe' },
  { role: 'Monitorista', route: '/monitoreo', name: 'monitoreo' },
  { role: 'Admin', route: '/contingencias/registro', name: 'contingencias' },
] as const;

for (const profile of profiles) {
  test(`sidebar ${profile.name}: perfil, modo compacto y navegación móvil`, async ({ page }, testInfo) => {
    await mockApi(page);
    await loginAs(page, profile.role);
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.goto(profile.route);
    const sidebar = page.locator('[data-sidebar]:not([data-mobile])');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.locator('nav a[aria-current="page"]')).toHaveCount(1);
    await expect(sidebar.getByRole('link', { name: /Mi perfil/ })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`${profile.name}-desktop.png`) });
    await sidebar.getByRole('button', { name: 'Contraer menú', exact: true }).click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
    await expect(sidebar.getByRole('button', { name: 'Cerrar sesión', exact: true })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: /Mi perfil/ })).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
    const drawer = page.locator('[data-sidebar][data-mobile]');
    await expect(drawer).toBeVisible();
    await expect(drawer.locator('nav a[aria-current="page"]')).not.toHaveText('');
    await expect(drawer.getByText('Cerrar sesión', { exact: true })).toBeVisible();
    await expect(drawer.getByRole('button', { name: 'Cerrar sesión', exact: true })).toBeVisible();
    expect(await drawer.evaluate(element => element.getBoundingClientRect().right)).toBeLessThanOrEqual(390);
    await page.screenshot({ path: testInfo.outputPath(`${profile.name}-mobile.png`) });
    await drawer.getByRole('link', { name: /Mi perfil/ }).click();
    await expect(drawer).toHaveCount(0);
    await expect(page).toHaveURL(/\/perfil$/);
  });
}
