import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

test.use({ timezoneId: 'America/Lima' });

test('la fecha inicial y el día corresponden a la misma hora local de Lima', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-11T02:15:00Z'));
  await mockApi(page);
  await loginAs(page, 'Monitorista');
  await page.goto('/monitoreo/nuevo');
  await expect(page.getByPlaceholder('DD/MM/AAAA')).toHaveValue('10/10/2026');
  await expect(page.getByPlaceholder('HH:MM')).toHaveValue('21:15');
  await expect(page.getByRole('textbox', { name: 'Día', exact: true })).toHaveValue('Sábado');
});

test('una fecha imposible se rechaza antes de enviar el evento', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Monitorista');
  await page.goto('/monitoreo/nuevo');
  await page.getByPlaceholder('DD/MM/AAAA').fill('31/02/2026');
  await page.getByRole('button', { name: 'Registrar evento', exact: true }).click();
  await expect(page.getByText('Formato DD/MM/AAAA', { exact: true })).toBeVisible();
});
