import { expect, test } from '@playwright/test';
import { mockApi } from './helpers';

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
