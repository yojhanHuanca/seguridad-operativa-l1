import { test, expect } from '@playwright/test';
import { mockApi } from './helpers';

const events = Array.from({ length: 22 }, (_, day) =>
  Array.from({ length: 3 + day % 9 }, (_, index) => {
    const hour = (index * 4 + day % 3) % 23;
    const minute = 2 + (day * 3 + index * 7) % 25;
    return {
      id_evento: day * 20 + index,
      fecha: '2026-09-' + String(day + 1).padStart(2, '0'),
      lugar_evento: ['La Cultura', 'Gamarra', 'Atocongo', 'San Borja Sur', 'Villa El Salvador'][index % 5],
      tipo_evento: index % 4 < 2 ? 'Atención médica' : index % 4 === 2 ? 'Caídas' : 'Otros',
      hora_reporte: String(hour).padStart(2, '0') + ':00',
      atencion: { hora_inicio_spaa: String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0'), hora_termino_atencion_inicio_traslado: String(hour).padStart(2, '0') + ':50' },
      traslado: index % 2 ? null : { hora_llamado_ambulancia: '10:00', hora_llegada_estacion: '10:' + String(10 + index * 4).padStart(2, '0') },
    };
  })
).flat();
const previous = events.slice(0, 90).map(row => ({ ...row, fecha: row.fecha.replace('2026-09', '2026-08') }));
const operations = Array.from({ length: 22 }, (_, i) => ({
  fecha: '2026-09-' + String(i + 1).padStart(2, '0'),
  qty_pasajeros: 540000 + i * 1000, qty_carreras: 520, km_comercial: 17227,
}));

for (const width of [1600, 390]) {
  test('diseño aprobado, filtros, paginación y CSV a ' + width + 'px', async ({ page }) => {
    test.setTimeout(60000);
    await page.clock.setFixedTime(new Date('2026-09-22T12:00:00-05:00'));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 1050 });
    const errors: string[] = [];
    const pages: number[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await mockApi(page);
    await page.addInitScript(() => {
      localStorage.setItem('sigma_auth_token', 'token-e2e');
      localStorage.setItem('sigma_auth_user', JSON.stringify({ id_usuario: 6, nombre: 'Prueba', rol: 'Gestión de Planes de Contingencia', estado: 'Activo', area: 'Operaciones' }));
    });
    await page.route('**/api/contingencias?**', route => {
      const number = Number(new URL(route.request().url()).searchParams.get('page'));
      pages.push(number);
      const all = [...previous, ...events];
      return route.fulfill({ json: { success: true, data: all.slice((number - 1) * 100, number * 100), meta: { total: all.length } } });
    });
    await page.route('**/api/datos-operativos?**', route => route.fulfill({ json: { success: true, data: { items: operations, total: operations.length } } }));
    await page.goto('/contingencias/indicadores');
    for (const name of ['Evolución diaria', 'Concentración horaria', 'Distribución por tipo', 'Tiempos de respuesta', 'Eventos por lugar']) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    }
    await expect(page.locator('.ctg-kpi-value').first()).toHaveText(String(events.length));
    expect(pages).toContain(3);
    await expect(page.locator('.ctg-heat-cell')).toHaveCount(42);
    await page.locator('.ctg-heat-cell').first().focus();
    await expect(page.locator('.ctg-heat-detail')).toContainText('Lun');
    await page.getByRole('button', { name: 'Operación', exact: true }).click();
    await page.getByLabel('Medida operativa').selectOption('qty_carreras');
    await expect(page.getByLabel('Medida operativa')).toHaveValue('qty_carreras');
    await page.getByRole('button', { name: 'Eventos', exact: true }).click();
    await page.getByRole('button', { name: 'Filtros', exact: true }).click();
    await page.getByLabel('Lugar', { exact: true }).selectOption('La Cultura');
    const selected = events.filter(row => row.lugar_evento === 'La Cultura').length;
    await expect(page.locator('.ctg-kpi-value').first()).toHaveText(String(selected));
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Exportar', exact: true }).click();
    const stream = await (await download).createReadStream();
    let csv = '';
    for await (const chunk of stream!) csv += chunk.toString();
    expect(csv).toContain('"Resumen","Eventos","' + selected + '"');
    expect(csv).toContain('"Filtro","Lugar","La Cultura"');
    await page.getByRole('button', { name: 'Restablecer', exact: true }).click();
    await page.getByRole('button', { name: 'Filtros', exact: true }).click();
    await expect(page.locator('.ctg-kpi-value').first()).toHaveText(String(events.length));
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    // Allow chart SVG transitions to settle for the design review capture.
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'test-results/contingencias-approved-' + width + '.png', fullPage: true });
    await page.route('**/api/contingencias?**', route => route.fulfill({ json: { success: true, data: [], meta: { total: 0 } } }));
    await page.route('**/api/datos-operativos?**', route => route.fulfill({ json: { success: true, data: { items: [], total: 0 } } }));
    await page.getByRole('button', { name: 'Actualizar estadísticas' }).click();
    await expect(page.getByRole('button', { name: 'Exportar', exact: true })).toBeDisabled();
    await expect(page.getByText('Sin registros para esta selección').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}
