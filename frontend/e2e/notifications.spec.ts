import { test, expect, type Page } from '@playwright/test';
import { loginAs, mockApi } from './helpers';
const publicKey = Buffer.from([4, ...Array(64).fill(0)]).toString('base64url');
async function setup(page: Page, permission: 'default' | 'granted' | 'denied' = 'default', answer: 'default' | 'granted' | 'denied' = 'granted', existing = false) {
  await mockApi(page);
  await loginAs(page, 'Admin');
  await page.route('**/api/profile/me', route => route.fulfill({ json: { success: true, data: { id_usuario: 1, nombre: 'Usuario de prueba', roles: { nombre_rol: 'Admin' }, estado: 'Activo' } } }));
  await page.route('**/api/push/config', route => route.fulfill({ json: { success: true, data: { habilitado: true, publicKey } } }));
  await page.route('**/api/push/status', route => route.fulfill({ json: { success: true, data: { suscrita: false } } }));
  await page.route('**/api/push/subscribe', route => route.fulfill({ json: { success: true } }));
  await page.route('**/api/push/unsubscribe', route => route.fulfill({ json: { success: true } }));
  await page.route('**/api/push/test', route => route.fulfill({ json: { success: true } }));
  await page.addInitScript(({ permission, answer, existing }) => {
    let current = permission;
    let subscribed = existing;
    const subscription = { endpoint: 'https://push.example.com/device', options: {}, toJSON: () => ({ endpoint: 'https://push.example.com/device', keys: { auth: 'test', p256dh: 'test' } }), unsubscribe: async () => { subscribed = false; return true; } };
    const registration = { pushManager: { getSubscription: async () => subscribed ? subscription : null, subscribe: async () => { subscribed = true; return subscription; } }, getNotifications: async () => [] };
    Object.defineProperty(window, 'Notification', { configurable: true, value: { get permission() { return current; }, requestPermission: async () => { current = answer; return answer; } } });
    Object.defineProperty(window, 'PushManager', { configurable: true, value: class {} });
    // register is deliberately not the active registration: the hook must await ready.
    Object.defineProperty(navigator, 'serviceWorker', { configurable: true, value: { register: async () => ({}), ready: Promise.resolve(registration), getRegistration: async () => registration, addEventListener: () => {}, removeEventListener: () => {} } });
  }, { permission, answer, existing });
  await page.goto('/admin/perfil');
  await page.getByRole('button', { name: 'Notificaciones', exact: true }).click();
}

test('activar, probar y desactivar confirma el registro en el servidor', async ({ page }) => {
  await setup(page);
  await page.getByRole('button', { name: 'Activar notificaciones', exact: true }).click();
  await expect(page.getByText('Activadas para tu cuenta en este dispositivo.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Probar aviso', exact: true }).click();
  await expect(page.getByText('Aviso de prueba enviado. Revisa las notificaciones de este dispositivo.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Desactivar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Activar notificaciones', exact: true })).toBeVisible();
});
test('cerrar el permiso no anuncia una activación exitosa', async ({ page }) => {
  await setup(page, 'default', 'default');
  let saves = 0;
  await page.route('**/api/push/subscribe', route => { saves++; return route.fulfill({ json: { success: true } }); });
  await page.getByRole('button', { name: 'Activar notificaciones', exact: true }).click();
  await expect(page.getByText('No concediste el permiso.', { exact: false })).toBeVisible();
  await expect(page.getByText('Notificaciones activadas en este dispositivo', { exact: true })).toHaveCount(0);
  expect(saves).toBe(0);
});
test('permiso bloqueado explica cómo corregirlo', async ({ page }) => {
  await setup(page, 'denied');
  await expect(page.getByText('El navegador bloqueó los avisos.', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Comprobar permiso' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Activar notificaciones' })).toHaveCount(0);
});
test('una suscripción del navegador ajena no figura como activa', async ({ page }) => {
  await setup(page, 'granted', 'granted', true);
  await expect(page.getByRole('button', { name: 'Activar notificaciones' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Probar aviso' })).toHaveCount(0);
});
test('fallo al guardar no muestra éxito ni deja una nueva suscripción local', async ({ page }) => {
  await setup(page);
  await page.route('**/api/push/subscribe', route => route.fulfill({ status: 503, json: { success: false, message: 'Servidor de avisos no disponible' } }));
  await page.getByRole('button', { name: 'Activar notificaciones' }).click();
  await expect(page.getByText('Servidor de avisos no disponible', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Activar notificaciones' })).toBeEnabled();
  expect(await page.evaluate(async () => (await navigator.serviceWorker.getRegistration('/'))?.pushManager.getSubscription())).toBeNull();
});
test('cerrar sesión desconecta los avisos antes de invalidar la cuenta', async ({ page }) => {
  await setup(page, 'granted', 'granted', true);
  const order: string[] = [];
  await page.route('**/api/push/unsubscribe', route => { order.push('push'); return route.fulfill({ json: { success: true } }); });
  await page.route('**/api/auth/logout', route => { order.push('logout'); return route.fulfill({ json: { success: true } }); });
  await page.getByRole('button', { name: 'Cerrar sesión', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Sí, cerrar sesión', exact: true }).click();
  await expect(page).toHaveURL(/\/login/);
  expect(order).toEqual(['push', 'logout']);
});

test('la bandeja muestra el error y permite recuperar la carga', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Seguridad Operativa');
  let failing = true;
  await page.route('**/api/notifications?*', route => route.fulfill(failing
    ? { status: 500, json: { success: false, message: 'Error temporal' } }
    : { json: { success: true, data: { id_usuario: 1, no_leidas: 0, items: [], hasMore: false } } }));
  await page.goto('/seguridad/notificaciones');
  await expect(page.getByText('No se pudieron cargar las notificaciones.', { exact: true })).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Sin notificaciones', { exact: true })).toHaveCount(0);
  failing = false;
  await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
  await expect(page.getByText('Sin notificaciones', { exact: true })).toBeVisible();
});
