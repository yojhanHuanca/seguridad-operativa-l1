import { expect, test } from '@playwright/test';

test('portal publico de reportes carga sin panel privado', async ({ page }) => {
  await page.goto('/reportes/nuevo');

  await expect(page.getByRole('heading', { name: /Reporta una condición de seguridad/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Iniciar reporte/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Consultar reporte/i })).toBeVisible();

  await expect(page.getByRole('button', { name: /Cambiar panel/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Mis reportes/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Notificaciones/i })).toHaveCount(0);
});

test('ruta antigua de reportes redirige al registro publico', async ({ page }) => {
  await page.goto('/reportes');

  await expect(page).toHaveURL(/\/reportes\/nuevo$/);
  await expect(page.getByRole('heading', { name: /Reporta una condición de seguridad/i })).toBeVisible();
});
