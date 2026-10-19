import { test, expect, type Page } from '@playwright/test';
import { mockApi } from './helpers';

// El reportante público no tiene cuenta ni contraseña.
const roles = ['Admin', 'Seguridad Operativa', 'Jefe de Área', 'Monitorista', 'Gestión de Planes de Contingencia'];
async function startTemporarySession(page: Page, role: string) {
  await mockApi(page);
  await page.route('**/api/auth/login', route => route.fulfill({ json: { success: true, data: { token: 'temporary-session', usuario: {
    id_usuario: 91, codigo_usuario: 'EMP-TEST', nombre: 'Usuario temporal', correo: 'temporal@example.invalid',
    rol: role, estado: 'Activo', debe_cambiar_password: true,
  } } } }));
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Correo corporativo' }).fill('temporal@example.invalid');
  await page.getByPlaceholder('Ingresa tu contraseña').fill('Temporal-123');
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
  await expect(page).toHaveURL('/cambiar-contrasena');
}

for (const role of roles) {
  test(`${role}: completa el cambio temporal antes de acceder`, async ({ page }) => {
    const writes: Record<string, unknown>[] = [];
    await startTemporarySession(page, role);
    await page.route('**/api/profile/me/password', route => {
      writes.push(route.request().postDataJSON());
      return route.fulfill({ json: { success: true } });
    });
    // También se bloquea al escribir directamente una ruta protegida.
    await page.goto('/admin/usuarios');
    await expect(page).toHaveURL('/cambiar-contrasena');
    await expect(page.getByText('temporal@example.invalid', { exact: false })).toBeVisible();
    await page.getByLabel('Contraseña temporal', { exact: true }).fill('Temporal-123');
    await page.getByLabel('Nueva contraseña', { exact: true }).fill('Personal-123');
    await page.getByLabel('Confirmar nueva contraseña').fill('Distinta-123');
    await page.getByRole('button', { name: 'Guardar contraseña y volver a ingresar' }).click();
    await expect(page.getByRole('alert')).toContainText('La confirmación no coincide');
    expect(writes).toHaveLength(0);
    await page.getByLabel('Confirmar nueva contraseña').fill('Personal-123');
    await page.getByRole('button', { name: 'Guardar contraseña y volver a ingresar' }).click();
    await expect(page).toHaveURL('/login');
    expect(writes).toEqual([{ password_actual: 'Temporal-123', password_nueva: 'Personal-123', password_confirmacion: 'Personal-123' }]);
    expect(await page.evaluate(() => localStorage.getItem('sigma_auth_token'))).toBeNull();
    expect(await page.evaluate(() => localStorage.getItem('sigma_auth_user'))).toBeNull();
    await expect(page.getByRole('status')).toContainText('Ingresa con tu nueva contraseña');
  });
}

test('un error conserva el formulario; cancelar la salida mantiene la sesión', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await startTemporarySession(page, 'Monitorista');
  await page.route('**/api/profile/me/password', route => route.fulfill({ status: 400, json: { success: false, message: 'La contraseña actual no es correcta' } }));
  await page.getByLabel('Contraseña temporal', { exact: true }).fill('Incorrecta-123');
  await page.getByLabel('Nueva contraseña', { exact: true }).fill('Personal-123');
  await page.getByLabel('Confirmar nueva contraseña').fill('Personal-123');
  await page.getByRole('button', { name: 'Guardar contraseña y volver a ingresar' }).click();
  await expect(page.getByRole('alert')).toContainText('La contraseña actual no es correcta');
  await expect(page.getByLabel('Nueva contraseña', { exact: true })).toHaveValue('Personal-123');
  await page.getByRole('button', { name: 'Cerrar sesión', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: '¿Cerrar sesión?' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page).toHaveURL('/cambiar-contrasena');
  expect(await page.evaluate(() => localStorage.getItem('sigma_auth_token'))).toBe('temporary-session');
  await page.screenshot({ path: testInfo.outputPath('password-temporal-mobile.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('una sesión guardada desactualizada obedece la exigencia del servidor', async ({ page }) => {
  await mockApi(page);
  await page.route('**/api/auth/login', route => route.fulfill({ json: { success: true, data: { token: 'old-session', usuario: {
    id_usuario: 91, nombre: 'Usuario', correo: 'temporal@example.invalid', rol: 'Admin', estado: 'Activo', debe_cambiar_password: false,
  } } } }));
  await page.route('**/api/users?*', route => route.fulfill({ status: 403, json: { success: false, code: 'PASSWORD_CHANGE_REQUIRED', message: 'Debes cambiar tu contraseña temporal antes de continuar' } }));
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Correo corporativo' }).fill('temporal@example.invalid');
  await page.getByPlaceholder('Ingresa tu contraseña').fill('Temporal-123');
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
  await expect(page).toHaveURL('/cambiar-contrasena');
  await expect(page.getByLabel('Contraseña temporal', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('sigma_auth_user')!).debe_cambiar_password)).toBe(true);
});
