import { expect, test } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test('ambulancia SPAA permite registrar y enviar el retiro del centro médico', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Gestión de Planes de Contingencia');
  const catalogs = [
    ['tipo_de_evento', 'Accidente'],
    ['lugar_del_evento', 'Parque Industrial'],
    ['lugar_exacto_del_evento', 'Explanada'],
    ['quien_reporta_primer_reporte', 'AGENTE DE ESTACION'],
    ['trasladado_por', 'AMBULANCIA SPAA'],
  ];
  await page.route('**/api/contingencias/catalogos', route => route.fulfill({ json: {
    success: true,
    data: catalogs.map(([codigo, valor], index) => ({
      id_catalogo: index + 1, codigo, nombre: codigo,
      items: [{ id_item: index + 1, valor }],
    })),
  } }));
  let submitted: Record<string, unknown> | undefined;
  await page.route('**/api/contingencias', route => {
    if (route.request().method() === 'POST') submitted = route.request().postDataJSON();
    return route.fulfill({ status: 400, json: { success: false, message: 'Fin de la prueba de envío' } });
  });
  await page.goto('/contingencias/registro');
  await page.getByRole('button', { name: 'Ambulancia SPAA', exact: true }).click();
  const withdrawal = page.getByRole('textbox', { name: 'Hora de retiro del centro médico', exact: true });
  await expect(withdrawal).toBeVisible();
  await page.locator('#cont-hora_reporte').fill('10:00');
  await page.locator('#cont-tipo_evento').selectOption('Accidente');
  await page.locator('#cont-lugar_evento').selectOption('Parque Industrial');
  await page.locator('#cont-lugar_exacto_evento').selectOption('Explanada');
  await page.locator('#cont-quien_reporta').selectOption('AGENTE DE ESTACION');
  await page.getByRole('textbox', { name: 'Hora de llegada al centro médico', exact: true }).fill('10:40');
  await withdrawal.fill('10:50');
  await page.getByRole('textbox', { name: 'Hora de retorno al puesto', exact: true }).fill('11:00');
  await page.getByRole('button', { name: 'Finalizar registro', exact: true }).first().click();
  await expect.poll(() => submitted).toMatchObject({
    trasladado_por: 'AMBULANCIA SPAA',
    hora_llegada_centro_medico: '10:40',
    hora_retiro_centro_medico: '10:50',
    hora_retorno_puesto: '11:00',
  });
});
