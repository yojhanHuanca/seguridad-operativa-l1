import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';
import type { PlanItem } from '../src/features/plans/types';

function planFixture(stage: string, status = 'En Ejecución', extension: string | null = null, risk = '4E'): PlanItem {
  return {
    id_plan: 999, codigo_plan: 'PLA-999', descripcion: 'Plan QA de regresión', fecha_plan: '2026-10-18',
    fecha_reprogramada: null, observaciones: null, prorroga_motivo: null, prorroga_fecha: null,
    prorroga_estado: extension, prorroga_fecha_sol: null, created_at: '2026-10-11', updated_at: '2026-10-11',
    areas: { id_area: 2, nombre_area: 'Mantenimiento' }, usuarios: { id_usuario: 3, nombre: 'Jefe QA', cargo: null },
    catalogo_detalle: { nombre: status }, actividades_plan: [],
    casos_sop: {
      id_caso: 999, codigo_sop: 'SOP 999-2026', titulo: 'Caso QA', descripcion: 'Prueba de etapas y riesgo',
      fecha_hallazgo: '2026-10-11', fecha_evento: null,
      catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: stage },
      catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { codigo: risk, nombre: 'Catálogo QA' },
      investigacion_caso: null, timeline_caso: [], anexos_caso: [],
    },
  };
}

for (const scenario of [
  { stage: 'Plan de Acción', status: 'En Ejecución', extension: null, allowed: false },
  { stage: 'Ejecución', status: 'En Ejecución', extension: null, allowed: true },
  { stage: 'Ejecución', status: 'Enviado', extension: null, allowed: false },
  { stage: 'Ejecución', status: 'En Ejecución', extension: 'pendiente', allowed: false },
  { stage: 'Verificación', status: 'Finalizado', extension: null, allowed: false },
]) {
  test(`prórroga: caso ${scenario.stage}, plan ${scenario.status}, solicitud ${scenario.extension ?? 'ninguna'}`, async ({ page }) => {
    await mockApi(page);
    await loginAs(page, 'Jefe de Área');
    await page.route('**/api/cases/planes?*', route => route.fulfill({ json: { success: true, data: [planFixture(scenario.stage, scenario.status, scenario.extension)] } }));
    await page.goto('/jefe/planes/SOP%20999-2026?plan=999');
    await expect(page.getByText('Información del Plan', { exact: true })).toBeVisible();
    const button = page.getByRole('button', { name: 'Solicitar Prórroga', exact: true });
    if (!scenario.allowed) await expect(button).toHaveCount(0);
    else {
      await button.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByLabel('Nueva fecha propuesta')).toHaveAttribute('min', '2026-10-19');
      await page.getByLabel('Nueva fecha propuesta').fill('2026-10-18');
      await page.getByLabel('Justificación').fill('Motivo QA de la ampliación de plazo');
      await expect(page.getByRole('button', { name: 'Enviar solicitud' })).toBeDisabled();
      await page.getByLabel('Nueva fecha propuesta').fill('2026-10-19');
      await expect(page.getByRole('button', { name: 'Enviar solicitud' })).toBeEnabled();
    }
  });
}

for (const [risk, label] of [['1A', 'Alto'], ['3B', 'Grave'], ['3C', 'Medio'], ['4E', 'Bajo']]) {
  test(`el plan conserva la categoría de riesgo de la matriz: ${risk} ${label}`, async ({ page }) => {
    await mockApi(page);
    await loginAs(page, 'Jefe de Área');
    await page.route('**/api/cases/planes?*', route => route.fulfill({ json: { success: true, data: [planFixture('Ejecución', 'En Ejecución', null, risk)] } }));
    await page.goto('/jefe');
    await expect(page.getByRole('row').filter({ hasText: 'SOP 999-2026' }).getByText(label, { exact: true })).toBeVisible();
    await page.goto('/jefe/planes/SOP%20999-2026?plan=999');
    const card = page.locator('div').filter({ has: page.getByText('Información del Plan', { exact: true }) });
    await expect(card.getByText(label, { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Media', { exact: true })).toHaveCount(0);
  });
}
