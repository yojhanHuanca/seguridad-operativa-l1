import { test, expect } from '@playwright/test';
import { loginAs, mockApi } from './helpers';

for (const scenario of ['conservar', 'cambiar', 'cancelar cambio'] as const) {
  test(`editar usuario: ${scenario} contraseña`, async ({ page }) => {
    await mockApi(page);
    await loginAs(page, 'Admin');
    const user = { id_usuario: 82, codigo_usuario: 'EMP-082', nombre: 'Ana García López', correo: 'ana@example.invalid', cargo: 'Analista', telefono: '', id_rol: 5, id_area: null, estado: 'Activo', roles: { id_rol: 5, nombre_rol: 'Monitorista' }, areas: null };
    const writes: Record<string, unknown>[] = [];
    await page.route('**/api/users?*', route => route.fulfill({ json: { success: true, data: [user], meta: { total: 1 } } }));
    await page.route('**/api/users/82', route => {
      writes.push(route.request().postDataJSON());
      return route.fulfill({ json: { success: true, data: user } });
    });
    await page.goto('/admin/usuarios');
    await page.getByRole('button', { name: 'Editar Ana García López' }).first().click();
    await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    await expect(page.getByText('Contraseña actual conservada', { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder('Nueva contraseña')).toHaveCount(0);
    if (scenario !== 'conservar') {
      await page.getByRole('checkbox', { name: 'Cambiar contraseña' }).check();
      await page.getByPlaceholder('Nueva contraseña').fill('123');
      await page.getByRole('button', { name: 'Guardar cambios' }).click();
      await expect(page.getByText('Define una contraseña de al menos 6 caracteres.', { exact: true })).toBeVisible();
      expect(writes).toHaveLength(0);
      await page.getByPlaceholder('Nueva contraseña').fill('Nueva-clave-123');
      if (scenario === 'cambiar') {
        await page.getByPlaceholder('Repite la contraseña temporal').fill('Distinta-123');
        await page.getByRole('button', { name: 'Guardar cambios' }).click();
        await expect(page.getByText('La confirmación no coincide con la nueva contraseña')).toBeVisible();
        expect(writes).toHaveLength(0);
        await page.getByPlaceholder('Repite la contraseña temporal').fill('Nueva-clave-123');
      }
      if (scenario === 'cancelar cambio') await page.getByRole('checkbox', { name: 'Cambiar contraseña' }).uncheck();
    }
    await page.getByRole('button', { name: 'Guardar cambios' }).click();
    await expect.poll(() => writes.length).toBe(1);
    if (scenario === 'cambiar') expect(writes[0]?.password).toBe('Nueva-clave-123');
    else expect(writes[0]).not.toHaveProperty('password');
    await expect(page.getByRole('heading', { name: 'Editar Ana García López' })).toHaveCount(0);
  });
}

test('crear usuario confirma la contraseña temporal antes de guardar', async ({ page }) => {
  await mockApi(page);
  await loginAs(page, 'Admin');
  const writes: Record<string, unknown>[] = [];
  await page.route('**/api/users', route => {
    writes.push(route.request().postDataJSON());
    return route.fulfill({ json: { success: true, data: { id_usuario: 82 } } });
  });
  await page.goto('/admin/usuarios');
  await page.getByRole('button', { name: 'Nuevo usuario', exact: true }).click();
  await page.getByPlaceholder('Ej. María Elena').fill('Ana');
  await page.getByPlaceholder('Ej. Pérez Ramírez').fill('García López');
  await page.getByPlaceholder('correo@lineauno.pe').fill('ana@example.invalid');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  const modalTitle = page.getByRole('heading', { name: 'Nuevo usuario', exact: true });
  await page.getByRole('combobox', { name: 'Rol *', exact: true }).selectOption('5');
  await page.getByPlaceholder('Contraseña de acceso').fill('Temporal-123');
  await page.getByRole('button', { name: 'Crear usuario', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('La confirmación no coincide');
  expect(writes).toHaveLength(0);
  await page.getByPlaceholder('Repite la contraseña temporal').fill('Temporal-123');
  await expect(page.getByText('El usuario deberá cambiar esta contraseña al iniciar sesión.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Crear usuario', exact: true }).click();
  await expect.poll(() => writes.length).toBe(1);
  expect(writes[0]).toMatchObject({ correo: 'ana@example.invalid', id_rol: 5, password: 'Temporal-123' });
  await expect(modalTitle).toHaveCount(0);
});
