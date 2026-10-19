import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test('la bitácora conserva referencias libres y abrevia únicamente códigos completos de plan', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Seguridad Operativa');
  await page.route('**/api/cases/SOP%2099-2026', route => route.fulfill({ json: { success: true, data: {
    id_caso: 99, codigo_sop: 'SOP 99-2026', titulo: 'QA historial', descripcion: 'QA historial',
    fecha_hallazgo: '2026-10-10T00:00:00Z', created_at: '2026-10-10T20:00:00Z',
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: 'Plan de Acción' },
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: 'Observación' },
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { nombre: 'Hallazgo' },
    anexos_caso: [], planes_accion: [], evento_caso: [], solicitudes_informacion: [], investigacion_caso: null, areas: null,
    timeline_caso: [{ id_evento: 1, kind: 'comentario', actor: 'Usuario QA', actor_rol: 'seguridad',
      titulo: 'Nota de auditoría', fecha: '2026-10-10T20:00:00Z',
      detalle: 'Referencia QA-SMSL1-20261010-001 conservada. Plan SOP 99-2026-PLA-01 revisado.' }],
  } } }));
  await page.goto('/seguridad/casos/SOP%2099-2026');
  await page.getByRole('button', { name: 'Línea de tiempo', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Línea de tiempo', exact: true })).toContainText('Referencia QA-SMSL1-20261010-001 conservada. Plan PLA-01 revisado.');
});
