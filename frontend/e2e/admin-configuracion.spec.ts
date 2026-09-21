import { expect, test, type Page } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

const initial = {
  sistema: { nombre: 'SMS L1', version: '1.0.0' },
  numeracion: { prefijoExpedientes: 'SOP', secuenciaExpedientes: 56, prefijoPlanes: 'PLA', secuenciaPlanes: 28 },
  plazos: { diasMaxInvestigacion: 15, diasResponderPlanes: 7, diasSolicitarProrroga: 3 },
  operacion: { kmPorCarrera: 33.128331 },
  meta: { ultimaActualizacion: '2026-09-21T15:00:00.000Z' },
};

async function setup(page: Page, failure = false) {
  await mockApi(page);
  await loginAs(page, 'Admin');
  let saved = structuredClone(initial);
  const writes: typeof initial[] = [];
  await page.route('**/api/configuracion', async route => {
    if (route.request().method() === 'PATCH') {
      writes.push(route.request().postDataJSON());
      if (failure) return route.fulfill({ status: 500, json: { message: 'No se pudo guardar la configuración' } });
      saved = { ...route.request().postDataJSON(), meta: { ultimaActualizacion: '2026-09-21T16:00:00.000Z' } };
    }
    return route.fulfill({ json: { success: true, data: saved } });
  });
  await page.goto('/admin/configuracion');
  await expect(page.getByRole('heading', { name: 'Centro de configuración' })).toBeVisible();
  return writes;
}

test('revisa y guarda cambios entre pestañas conservando parámetros ocultos', async ({ page }) => {
  const writes = await setup(page);
  await page.getByLabel('Nombre del sistema', { exact: false }).fill('SMS Corporativo');
  await page.getByRole('tab', { name: 'Operación' }).click();
  await page.getByLabel('Kilómetros por carrera').fill('34.5');
  await page.getByRole('button', { name: 'Revisar cambios' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('SMS L1');
  await expect(dialog).toContainText('SMS Corporativo');
  await expect(dialog).toContainText('33.128331');
  await expect(dialog).toContainText('34.5');
  expect(writes).toHaveLength(0);
  await dialog.getByRole('button', { name: 'Confirmar y guardar' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByText('Todos los cambios guardados')).toBeVisible();
  expect(writes).toHaveLength(1);
  expect(writes[0].plazos).toEqual(initial.plazos);
  expect(writes[0].numeracion.secuenciaPlanes).toBe(28);
  expect(writes[0].operacion.kmPorCarrera).toBe(34.5);
  await page.reload();
  await expect(page.getByLabel('Nombre del sistema', { exact: false })).toHaveValue('SMS Corporativo');
});

test('valida numeración y permite descartar el borrador sin escribir', async ({ page }) => {
  const writes = await setup(page);
  await page.getByRole('tab', { name: 'Numeración' }).click();
  const sequence = page.getByLabel('Secuencia de expedientes');
  await expect(sequence).toBeDisabled();
  await page.getByRole('button', { name: 'Habilitar ajuste' }).click();
  await sequence.fill('12');
  await expect(page.getByText(/La secuencia no puede retroceder/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Revisar cambios' })).toBeDisabled();
  await sequence.fill('60');
  await expect(page.getByText(`SOP 61-${new Date().getUTCFullYear()}`, { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'General' }).click();
  await expect(page.getByText('1 cambio sin guardar')).toBeVisible();
  await page.getByRole('button', { name: 'Descartar' }).click();
  await page.getByRole('tab', { name: 'Numeración' }).click();
  await expect(sequence).toHaveValue('56');
  await expect(sequence).toBeDisabled();
  expect(writes).toHaveLength(0);
  await expect(page.getByText(/Días máximos|Días para responder|Días para solicitar/)).toHaveCount(0);
});

test('conserva el borrador si falla el guardado y permite volver a editar', async ({ page }) => {
  await setup(page, true);
  await page.getByLabel('Nombre del sistema', { exact: false }).fill('Nombre pendiente');
  await page.getByRole('button', { name: 'Revisar cambios' }).click();
  await page.getByRole('button', { name: 'Confirmar y guardar' }).click();
  await expect(page.getByText('No se pudo guardar la configuración', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Volver a editar' }).click();
  await expect(page.getByLabel('Nombre del sistema', { exact: false })).toHaveValue('Nombre pendiente');
  await expect(page.getByText('1 cambio sin guardar')).toBeVisible();
});

test('muestra auditoría filtrada de configuración con antes y después', async ({ page }) => {
  await setup(page);
  await page.route('**/api/auditoria?**', async route => {
    expect(new URL(route.request().url()).searchParams.get('tabla')).toBe('configuracion');
    await route.fulfill({ json: { success: true, meta: { total: 1 }, data: [{
      id_auditoria: 1, tabla_afectada: 'configuracion', accion: 'editar',
      fecha: '2026-09-21T15:00:00.000Z', usuarios: { nombre: 'Ana Administradora', cargo: 'Administración' },
      descripcion: 'Actualizó la configuración general del sistema',
      datos_previos: { sistema: { nombre: 'Nombre anterior', version: '1.0.0' } },
      datos_nuevos: { sistema: { nombre: 'SMS L1', version: '1.0.0' } },
    }] } });
  });
  await page.getByRole('tab', { name: 'Historial' }).click();
  await page.locator('summary').click();
  await expect(page.getByText('Ana Administradora')).toBeVisible();
  await expect(page.getByText('Nombre anterior')).toBeVisible();
  await expect(page.getByText('Antes', { exact: true })).toBeVisible();
});

test('error de carga no ofrece valores por defecto para guardar', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  await page.route('**/api/configuracion', route => route.fulfill({ status: 500, json: { message: 'Sin conexión' } }));
  await page.goto('/admin/configuracion');
  await expect(page.getByText('No se pudo cargar la configuración.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Intentar nuevamente' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Revisar cambios' })).toHaveCount(0);
});

test('compatibilidad con configuración anterior sin parámetros operativos', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  const runtimeErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  const legacy: Partial<typeof initial> = structuredClone(initial);
  delete legacy.operacion;
  await page.route('**/api/configuracion', route => route.fulfill({ json: { success: true, data: legacy } }));
  await page.goto('/admin/configuracion');
  await expect(page.getByRole('heading', { name: 'Centro de configuración' })).toBeVisible();
  await page.getByRole('tab', { name: 'Operación' }).click();
  await expect(page.getByLabel('Kilómetros por carrera')).toHaveValue('33.128331');
  expect(runtimeErrors).toEqual([]);
});

test('respuesta incompleta al guardar no rompe los paneles ni pierde el borrador', async ({ page }) => {
  await setup(page);
  const runtimeErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  await page.route('**/api/configuracion', route => route.fulfill({ json: {
    success: true,
    data: route.request().method() === 'PATCH' ? { updated: true } : initial,
  } }));
  await page.getByLabel('Nombre del sistema', { exact: false }).fill('Nombre pendiente');
  await page.getByRole('button', { name: 'Revisar cambios' }).click();
  await page.getByRole('button', { name: 'Confirmar y guardar' }).click();
  await expect(page.getByText(/El servidor devolvió una configuración incompleta/)).toBeVisible();
  await page.getByRole('button', { name: 'Volver a editar' }).click();
  await expect(page.getByLabel('Nombre del sistema', { exact: false })).toHaveValue('Nombre pendiente');
  expect(runtimeErrors).toEqual([]);
});

test('diseño adaptable y navegación por teclado', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await setup(page);
  await expect(page.getByRole('link', { name: 'Configuración', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.screenshot({ path: testInfo.outputPath('configuracion-desktop.png'), fullPage: true });
  await page.getByRole('tab', { name: 'General' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Numeración' })).toHaveAttribute('aria-selected', 'true');
  await page.screenshot({ path: testInfo.outputPath('configuracion-numeracion.png'), fullPage: true });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    for (const name of ['General', 'Numeración', 'Operación', 'Historial']) {
      await page.getByRole('tab', { name, exact: true }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
  await page.getByRole('tab', { name: 'General' }).click();
  await page.getByLabel('Nombre del sistema', { exact: false }).fill('Cambio móvil');
  await page.getByRole('button', { name: 'Revisar cambios' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('configuracion-mobile.png') });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
