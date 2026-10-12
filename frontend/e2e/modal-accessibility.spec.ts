import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test('el modal de usuario tiene nombre accesible, contiene el foco y lo devuelve al cerrar', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  await page.goto('/admin/usuarios');
  const trigger = page.getByRole('button', { name: 'Nuevo usuario', exact: true });
  // El recorrido es por teclado; WebKit no enfoca botones con un clic de ratón.
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Nuevo usuario', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await expect(dialog).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Continuar', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Cerrar', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
