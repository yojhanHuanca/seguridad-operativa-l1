import { expect, test } from '@playwright/test';
import { mockApi } from './helpers';

test('la consulta pública conserva el título del reporte registrado', async ({ page }) => {
  await mockApi(page);
  await page.route('**/api/reports/consulta/SOP-TITULO', route => route.fulfill({ json: { success: true, data: {
    codigo_sop: 'SOP-TITULO', titulo: 'Condición Insegura en Villa El Salvador · Andén', descripcion: 'Reporte QA',
    created_at: '2026-10-10T20:00:00Z', anexos_caso: [], solicitudes_informacion: [], evento_caso: [],
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: 'Recepción' },
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: 'Observación' },
  } } }));
  await page.goto('/reportes/consulta?codigo=SOP-TITULO');
  await expect(page.getByRole('heading', { name: 'Condición Insegura en Villa El Salvador · Andén', exact: true })).toBeVisible();
});

test('portal publico de reportes carga sin panel privado', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/reportes/nuevo');

  await expect(page.getByRole('heading', { name: /Reporta una condición de seguridad/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Iniciar reporte/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Consultar reporte/i })).toBeVisible();

  await expect(page.getByRole('button', { name: /Cambiar panel/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Mis reportes/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Notificaciones/i })).toHaveCount(0);
  await expect(page).toHaveURL(/\/reportes\/nuevo$/);
  expect(await page.evaluate(() => localStorage.getItem('sigma_auth_token'))).toBeNull();
});

test('sin cookie la consulta rechazada informa la restricción y no pide login', async ({ page }) => {
  await mockApi(page);
  await page.route('**/api/reports/consulta/SOP-AJENO', route => route.fulfill({ status: 403, json: {
    success: false, message: 'Este reporte solo puede consultarse desde el dispositivo donde fue registrado',
  } }));
  await page.goto('/reportes/consulta?codigo=SOP-AJENO');
  await expect(page.getByText('Este reporte solo puede consultarse desde el dispositivo donde fue registrado', { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/reportes\/consulta\?codigo=SOP-AJENO$/);
  await expect(page.getByText(/conserva las cookies/)).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('sigma_auth_token'))).toBeNull();
});

test('ruta antigua de reportes redirige al registro publico', async ({ page }) => {
  await page.goto('/reportes');

  await expect(page).toHaveURL(/\/reportes\/nuevo$/);
  await expect(page.getByRole('heading', { name: /Reporta una condición de seguridad/i })).toBeVisible();
});

test('la solicitud pública de información no muestra ni solicita fotos de usuarios', async ({ page }) => {
  await mockApi(page);
  let avatarRequests = 0;
  page.on('request', request => { if (/avatars|users\/basicos|profile\/me/.test(request.url())) avatarRequests++; });
  await page.route('**/api/reports/consulta/SOP-PRIVADO', route => route.fulfill({ json: { success: true, data: {
    codigo_sop: 'SOP-PRIVADO', descripcion: 'Reporte de prueba', fecha_hallazgo: '2026-10-05T12:00:00Z', areas: null, anexos_caso: [], evento_caso: [],
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: 'Pendiente de Información' },
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: 'Hallazgo' },
    solicitudes_informacion: [{ id_solicitud: 1, mensaje: 'Indica la hora del incidente', respondida: false, fecha_solicitud: '2026-10-05T12:00:00Z', respuesta: null }],
    usuarios: { nombre: 'Usuario privado', foto_url: '/uploads/avatars/privado.png' },
  } } }));
  await page.goto('/reportes/consulta?codigo=SOP-PRIVADO');
  await expect(page.getByText('Indica la hora del incidente', { exact: true })).toBeVisible();
  await expect(page.getByText('Usuario privado', { exact: true })).toHaveCount(0);
  await expect(page.locator('img[alt="Usuario privado"], img[src*="avatars"]')).toHaveCount(0);
  expect(avatarRequests).toBe(0);
});
