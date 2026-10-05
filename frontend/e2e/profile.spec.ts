import { test, expect, type Page } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

const roles = [
  { role: 'Admin', route: '/admin/perfil' },
  { role: 'Seguridad Operativa', route: '/seguridad/perfil' },
  { role: 'Jefe de Área', route: '/jefe/perfil' },
  { role: 'Monitorista', route: '/monitoreo/perfil' },
  { role: 'Gestión de Planes de Contingencia', route: '/contingencias/perfil' },
] as const;
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');
function profile(role: string) {
  return { id_usuario: 1, codigo_usuario: 'EMP-001', nombre: 'María García López', correo: 'maria@linea1.pe', cargo: 'Analista', telefono: '+51 999 000 123', foto_url: null as string | null, estado: 'Activo', ultimo_acceso: '2026-10-05T12:00:00Z', fecha_ingreso: '2025-01-01T12:00:00Z', roles: { nombre_rol: role }, areas: { nombre_area: 'Operaciones' } };
}
async function setup(page: Page, role: typeof roles[number]['role']) {
  await mockApi(page);
  await loginAs(page, role);
  const current = profile(role);
  await page.route('**/api/profile/me', route => {
    if (route.request().method() === 'PATCH') current.telefono = route.request().postDataJSON().telefono;
    return route.fulfill({ json: { success: true, data: current } });
  });
  await page.route('**/api/profile/me/actividad', route => route.fulfill({ json: { success: true, data: [{ label: 'Planes asignados', value: 12 }] } }));
  await page.route('**/api/profile/me/reciente', route => route.fulfill({ json: { success: true, data: [{ id_auditoria: 1, accion: 'editar', tabla_afectada: 'planes_accion', fecha: '2026-10-05T12:00:00Z' }] } }));
  await page.route('**/api/profile/me/sesiones', route => route.fulfill({ json: { success: true, data: [{ id_sesion: 1, actual: true, navegador: 'Chrome', dispositivo: null, fecha_inicio: '2026-10-05T12:00:00Z' }] } }));
  return current;
}

for (const { role, route } of roles) {
  test(`perfil ${role}: datos, pestañas y diseño móvil`, async ({ page }, testInfo) => {
    const errors: Error[] = [];
    page.on('pageerror', error => errors.push(error));
    await setup(page, role);
    await page.setViewportSize({ width: 1440, height: 1024 });
    await page.goto(route);
    await expect(page.getByRole('heading', { name: 'María García López' })).toBeVisible();
    await expect(page.getByText('Planes asignados', { exact: true }).last()).toBeVisible();
    await expect(page.getByText('Actualización de registro', { exact: true })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath('perfil-desktop.png'), fullPage: true });
    await page.getByRole('button', { name: 'Seguridad', exact: true }).click();
    await page.getByRole('button', { name: 'Ver sesiones', exact: true }).click();
    await expect(page.getByText('Esta sesión', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Actividad', exact: true }).click();
    await expect(page.getByText('Actualización de registro', { exact: true })).toHaveCount(1);
    await page.getByRole('button', { name: 'Notificaciones', exact: true }).click();
    await expect(page.getByText('Los avisos push se configuran', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'Información personal', exact: true }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole('button', { name: 'Editar contacto', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('perfil-mobile.png'), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('opciones móviles y foto inválida conservan el perfil', async ({ page }, testInfo) => {
  await setup(page, 'Admin');
  let uploads = 0;
  await page.route('**/api/profile/me/foto', route => { uploads++; return route.fulfill({ json: { success: true } }); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/admin/perfil');
  await page.getByRole('button', { name: 'Cambiar foto de perfil' }).click();
  const options = page.getByRole('dialog', { name: 'Foto de perfil', exact: true });
  const bounds = await options.boundingBox();
  expect(bounds!.width).toBeLessThanOrEqual(390);
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  await page.locator('input[type=file]').setInputFiles({ name: 'incorrecto.pdf', mimeType: 'application/pdf', buffer: Buffer.from('archivo') });
  await expect(page.getByText('La foto debe ser JPG, PNG o WEBP.', { exact: true })).toBeVisible();
  await expect(options).toBeVisible();
  expect(uploads).toBe(0);
  await page.locator('input[type=file]').setInputFiles({ name: 'vacia.png', mimeType: 'image/png', buffer: Buffer.alloc(0) });
  await expect(page.getByText('La foto está vacía. Elige otra imagen.', { exact: true })).toBeVisible();
  expect(uploads).toBe(0);
  await page.screenshot({ path: testInfo.outputPath('foto-opciones-mobile.png') });
  await page.keyboard.press('Escape');
  await expect(options).not.toBeVisible();
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
  await page.locator('[data-sidebar][data-mobile]').getByRole('button', { name: 'Cerrar sesión', exact: true }).click();
  const confirm = page.getByRole('dialog', { name: '¿Cerrar sesión?' });
  await expect(confirm).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('confirmar-salida-mobile.png') });
  await confirm.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page).toHaveURL('/admin/perfil');
});

test('guardar teléfono, cancelar y validar contraseña sin enviar datos inválidos', async ({ page }) => {
  await setup(page, 'Admin');
  let passwordRequests = 0;
  await page.route('**/api/profile/me/password', route => { passwordRequests++; return route.fulfill({ json: { success: true } }); });
  await page.goto('/admin/perfil');
  await page.getByRole('button', { name: 'Editar contacto' }).click();
  await page.getByPlaceholder('9XXXXXXXX').fill('incorrecto');
  await page.getByRole('button', { name: 'Guardar', exact: true }).click();
  await expect(page.getByText('Ingresa un teléfono válido.')).toBeVisible();
  await page.getByPlaceholder('9XXXXXXXX').fill('+51 999 123 456');
  await page.getByRole('button', { name: 'Guardar', exact: true }).click();
  await expect(page.getByRole('button', { name: '+51 999 123 456', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Editar contacto' }).click();
  await page.getByPlaceholder('9XXXXXXXX').fill('999888777');
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page.getByRole('button', { name: '+51 999 123 456', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Cambiar', exact: true }).click();
  await page.getByPlaceholder('Actual', { exact: true }).fill('actual123');
  await page.getByPlaceholder('Mínimo 6 caracteres').fill('nueva123');
  await page.getByPlaceholder('Repite la nueva contraseña').fill('distinta');
  await page.getByRole('button', { name: 'Actualizar contraseña' }).click();
  await expect(page.getByText('La confirmación no coincide con la nueva contraseña')).toBeVisible();
  expect(passwordRequests).toBe(0);
  await page.getByPlaceholder('Repite la nueva contraseña').fill('nueva123');
  await page.getByRole('button', { name: 'Actualizar contraseña' }).click();
  await expect(page.getByText('Contraseña actualizada', { exact: true })).toBeVisible();
  await expect(page.getByPlaceholder('Actual', { exact: true })).toHaveValue('');
  expect(passwordRequests).toBe(1);
});

test('subir foto actualiza el perfil, menú y directorio; archivo faltante conserva iniciales', async ({ page }) => {
  const current = await setup(page, 'Admin');
  await page.route('**/api/profile/me/foto', route => {
    current.foto_url = '/uploads/avatars/maria.png';
    return route.fulfill({ json: { success: true, data: current } });
  });
  await page.route('**/api/archivos/avatars/maria.png', route => route.fulfill({ contentType: 'image/png', body: png }));
  await page.goto('/admin/perfil');
  await page.locator('input[type=file]').setInputFiles({ name: 'maria.png', mimeType: 'image/png', buffer: png });
  await expect(page.getByText('Foto de perfil actualizada', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cambiar foto de perfil' }).getByRole('img')).toBeVisible();
  await expect(page.locator('.sidebar-account').getByRole('img', { name: 'Admin Prueba' })).toBeVisible();
  const other = { ...current, id_usuario: 9, nombre: 'Jefe sin foto', foto_url: '/uploads/avatars/faltante.png' };
  await page.route('**/api/users?*', route => route.fulfill({ json: { success: true, data: [current, other], meta: { total: 2 } } }));
  await page.route('**/api/archivos/avatars/faltante.png', route => route.fulfill({ status: 404 }));
  await page.goto('/admin/usuarios');
  await expect(page.getByRole('row').filter({ hasText: 'María García López' }).getByRole('img', { name: 'María García López' })).toBeVisible();
  const fallback = page.getByRole('row').filter({ hasText: 'Jefe sin foto' });
  await expect(fallback.getByText('JF', { exact: true })).toBeVisible();
  await expect(fallback.getByRole('img')).toHaveCount(0);
});

test('fallo de carga muestra reintento sin indicadores falsos', async ({ page }) => {
  await setup(page, 'Admin');
  await page.route('**/api/profile/me/actividad', route => route.fulfill({ status: 500, json: { success: false } }));
  await page.goto('/admin/perfil');
  await expect(page.getByText('No se pudieron cargar los indicadores.')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('No hay indicadores disponibles para este rol.')).toHaveCount(0);
});

test('asignar un plan muestra la foto del jefe en búsqueda y selección sin cambiar el responsable', async ({ page }) => {
  await setup(page, 'Seguridad Operativa');
  const chief = { ...profile('Jefe de Área'), id_usuario: 9, id_area: 1, id_rol: 3, foto_url: '/uploads/avatars/jefe.png' };
  await page.route('**/api/users/basicos', route => route.fulfill({ json: { success: true, data: [chief] } }));
  let photoRequests = 0;
  await page.route('**/api/archivos/avatars/jefe.png', route => {
    photoRequests++;
    expect(route.request().headers().authorization).toBe('Bearer token-e2e');
    return route.fulfill({ contentType: 'image/png', body: png });
  });
  const detail = {
    id_caso: 1, codigo_sop: 'SOP-TEST', titulo: 'Prueba del responsable', descripcion: 'Detalle del hallazgo', fecha_hallazgo: '2026-10-05T12:00:00Z', created_at: '2026-10-05T12:00:00Z', nombre_reportante: null,
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: 'Plan de Acción', color: null },
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: 'Condición Insegura' },
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { nombre: 'Hallazgo' },
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: { nombre: 'Interno' },
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: null,
    areas: { id_area: 1, nombre_area: 'Operaciones' },
    planes_accion: [], solicitudes_informacion: [], timeline_caso: [], evento_caso: [], anexos_caso: [], investigacion_caso: null,
  };
  await page.route('**/api/cases/SOP-TEST', route => route.fulfill({ json: { success: true, data: detail } }));
  await page.goto('/seguridad/casos/SOP-TEST');
  const search = page.getByPlaceholder('Buscar por nombre, cargo o código...');
  await expect(search).toBeVisible();
  await search.fill('María');
  const result = page.getByRole('button').filter({ has: page.getByText('María García López', { exact: true }) });
  await expect(result.getByRole('img', { name: 'María García López' })).toBeVisible();
  await result.click();
  await expect(page.getByRole('button', { name: 'Quitar', exact: true })).toBeVisible();
  await expect(page.getByPlaceholder('Buscar otro responsable...')).toBeVisible();
  await expect(page.getByRole('img', { name: 'María García López' })).toHaveCount(1);
  expect(photoRequests).toBe(1);
});

test('opciones de foto: cancelar eliminación, volver a iniciales y subir otra', async ({ page }) => {
  const current = await setup(page, 'Admin');
  current.foto_url = '/uploads/avatars/maria.png';
  await page.route('**/api/archivos/avatars/maria.png', route => route.fulfill({ contentType: 'image/png', body: png }));
  let deletions = 0;
  await page.route('**/api/profile/me/foto', route => {
    if (route.request().method() === 'DELETE') { deletions++; current.foto_url = null; }
    else current.foto_url = '/uploads/avatars/maria.png';
    return route.fulfill({ json: { success: true, data: current } });
  });
  await page.goto('/admin/perfil');
  await page.getByRole('button', { name: 'Cambiar foto de perfil' }).click();
  const options = page.getByRole('dialog', { name: 'Foto de perfil', exact: true });
  await expect(options.getByRole('button', { name: 'Cambiar foto', exact: true })).toBeVisible();
  await options.getByRole('button', { name: 'Eliminar foto', exact: true }).click();
  const confirmation = page.getByRole('dialog', { name: '¿Eliminar tu foto de perfil?' });
  await confirmation.getByRole('button', { name: 'Cancelar', exact: true }).click();
  expect(deletions).toBe(0);
  await expect(options.getByRole('img')).toBeVisible();
  await options.getByRole('button', { name: 'Eliminar foto', exact: true }).click();
  await confirmation.getByRole('button', { name: 'Sí, eliminar foto', exact: true }).click();
  await expect(page.getByText('Foto de perfil eliminada', { exact: true })).toBeVisible();
  expect(deletions).toBe(1);
  await expect(page.getByRole('button', { name: 'Cambiar foto de perfil' }).getByRole('img')).toHaveCount(0);
  await expect(page.locator('.sidebar-account').getByRole('img')).toHaveCount(0);
  await page.getByRole('button', { name: 'Cambiar foto de perfil' }).click();
  await expect(options.getByText('Sin foto de perfil', { exact: true })).toBeVisible();
  await expect(options.getByRole('button', { name: 'Eliminar foto', exact: true })).toHaveCount(0);
  await expect(options.getByRole('button', { name: 'Subir foto', exact: true })).toBeVisible();
  await page.locator('input[type=file]').setInputFiles({ name: 'nueva.png', mimeType: 'image/png', buffer: png });
  await expect(options).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Cambiar foto de perfil' }).getByRole('img')).toBeVisible();
});

test('si falla eliminar, conserva foto y permite reintentar', async ({ page }) => {
  const current = await setup(page, 'Admin');
  current.foto_url = '/uploads/avatars/maria.png';
  await page.route('**/api/archivos/avatars/maria.png', route => route.fulfill({ contentType: 'image/png', body: png }));
  await page.route('**/api/profile/me/foto', route => route.fulfill({ status: 500, json: { success: false, message: 'No se pudo eliminar la foto' } }));
  await page.goto('/admin/perfil');
  await page.getByRole('button', { name: 'Cambiar foto de perfil' }).click();
  await page.getByRole('button', { name: 'Eliminar foto', exact: true }).click();
  await page.getByRole('button', { name: 'Sí, eliminar foto', exact: true }).click();
  await expect(page.getByText('No se pudo eliminar la foto', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sí, eliminar foto', exact: true })).toBeEnabled();
  await page.getByRole('dialog', { name: '¿Eliminar tu foto de perfil?' }).getByRole('button', { name: 'Cancelar' }).click();
  await expect(page.getByRole('dialog', { name: 'Foto de perfil', exact: true }).getByRole('img')).toBeVisible();
});

for (const { role, route } of roles) {
  test(`cerrar sesión ${role}: confirmar antes de salir y cancelar sin perder la cuenta`, async ({ page }) => {
    await setup(page, role);
    let exits = 0;
    await page.route('**/api/auth/logout', route => { exits++; return route.fulfill({ json: { success: true } }); });
    await page.goto(route);
    const exit = page.locator('[data-sidebar]:not([data-mobile])').getByRole('button', { name: 'Cerrar sesión', exact: true });
    await exit.click();
    const confirmation = page.getByRole('dialog', { name: '¿Cerrar sesión?' });
    await expect(confirmation).toBeVisible();
    expect(exits).toBe(0);
    await confirmation.getByRole('button', { name: 'Cancelar', exact: true }).click();
    await expect(confirmation).not.toBeVisible();
    await expect(page).toHaveURL(route);
    expect(await page.evaluate(() => localStorage.getItem('sigma_auth_token'))).toBe('token-e2e');
    await exit.click();
    await page.keyboard.press('Escape');
    await expect(confirmation).not.toBeVisible();
    expect(exits).toBe(0);
    await exit.click();
    await confirmation.getByRole('button', { name: 'Sí, cerrar sesión', exact: true }).click();
    await expect(page).toHaveURL('/login');
    expect(exits).toBe(1);
    expect(await page.evaluate(() => localStorage.getItem('sigma_auth_token'))).toBeNull();
  });
}


