import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test.use({ timezoneId: 'America/Lima' });

test('los planes permiten comenzar hoy en Lima después del cambio de día UTC', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-11T02:15:00Z'));
  await mockApi(page);
  await loginAs(page, 'Seguridad Operativa');
  await page.route('**/api/cases/SOP%2099-2026', route => route.fulfill({ json: { success: true, data: {
    id_caso: 99, codigo_sop: 'SOP 99-2026', titulo: 'QA fecha de plan', descripcion: 'QA fecha de plan',
    fecha_hallazgo: '2026-10-10T00:00:00Z', created_at: '2026-10-10T20:00:00Z',
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: 'Plan de Acción' },
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: 'Condición Insegura' },
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { nombre: 'Hallazgo' },
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: { nombre: 'Reporte público' },
    anexos_caso: [], planes_accion: [], evento_caso: [], solicitudes_informacion: [], timeline_caso: [],
    investigacion_caso: null, areas: null,
  } } }));
  await page.goto('/seguridad/casos/SOP%2099-2026');
  const start = page.getByRole('textbox', { name: 'Fecha inicio de plan de acción *', exact: true });
  const end = page.getByRole('textbox', { name: 'Fecha fin de plan de acción *', exact: true });
  await expect(start).toHaveValue('2026-10-10');
  await expect(start).toHaveAttribute('min', '2026-10-10');
  await expect(end).toHaveValue('2026-10-17');
  await page.getByRole('button', { name: 'Agregar plan de acción', exact: true }).click();
  await expect(start.nth(1)).toHaveValue('2026-10-10');
  await expect(end.nth(1)).toHaveValue('2026-10-17');
});
