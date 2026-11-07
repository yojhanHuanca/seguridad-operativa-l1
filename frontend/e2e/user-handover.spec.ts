import { expect, test, type Page } from "@playwright/test";
import { loginAs, mockApi } from "./helpers";

async function setup(page: Page, failTransfer = false) {
  await mockApi(page);
  await loginAs(page, "Admin");
  const source = { id_usuario: 82, codigo_usuario: "EMP-0082", nombre: "Jefe Saliente", correo: "saliente@example.invalid",
    id_rol: 3, id_area: 1, estado: "Activo", roles: { nombre_rol: "Jefe de Área" }, areas: { nombre_area: "Operaciones" }, es_responsable: false };
  const replacements = [
    source,
    { ...source, id_usuario: 83, nombre: "Jefe Reemplazo" },
    { ...source, id_usuario: 84, id_area: 2, nombre: "Jefe Otra Área" },
    { ...source, id_usuario: 85, estado: "Inactivo", nombre: "Jefe Inactivo" },
    { ...source, id_usuario: 86, id_rol: 5, roles: { nombre_rol: "Monitorista" }, nombre: "Monitorista" },
  ];
  let pending = true;
  const transfers: Record<string, unknown>[] = [];
  const updates: Record<string, unknown>[] = [];
  await page.route("**/api/users?*", route => route.fulfill({ json: { success: true, data: [source], meta: { total: 1 } } }));
  await page.route("**/api/users/basicos", route => route.fulfill({ json: { success: true, data: replacements } }));
  await page.route("**/api/users/82/pending-plans", route => route.fulfill({ json: { success: true, data: pending ? [
    { id_plan: 10, codigo_plan: "SOP 1-2026-PLA-01", id_area: 1, areas: { nombre_area: "Operaciones" }, actividades_plan: [{ id_actividad: 20 }] },
  ] : [] } }));
  await page.route("**/api/users/82/reassign-plans", route => {
    transfers.push(route.request().postDataJSON());
    if (failTransfer) return route.fulfill({ status: 409, json: { success: false, message: "Los planes pendientes cambiaron. Actualiza la revisión antes de reasignar." } });
    pending = false;
    return route.fulfill({ json: { success: true, data: { planes: 1, actividades: 1 } } });
  });
  await page.route("**/api/users/82", route => {
    const body = route.request().postDataJSON();
    updates.push(body);
    if (pending) return route.fulfill({ status: 400, json: { success: false, message: "Reasigna primero sus planes y actividades pendientes." } });
    Object.assign(source, body);
    return route.fulfill({ json: { success: true, data: source } });
  });
  await page.goto("/admin/usuarios");
  await page.getByRole("button", { name: "Editar Jefe Saliente", exact: true }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("combobox", { name: "Estado", exact: true }).selectOption("Inactivo");
  return { source, transfers, updates };
}

test("reasignar primero y desactivar después conserva el formulario y filtra reemplazos válidos", async ({ page }) => {
  const result = await setup(page);
  await page.getByRole("button", { name: "Guardar cambios", exact: true }).click();
  await expect(page.getByText("Reasigna primero sus planes y actividades pendientes.", { exact: true })).toBeVisible();
  expect(result.source.estado).toBe("Activo");
  await page.getByRole("button", { name: "Reasignar planes pendientes", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Reasignar planes pendientes", exact: true });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await dialog.getByRole("checkbox", { name: "SOP 1-2026-PLA-01", exact: true }).check();
  const replacement = dialog.getByRole("combobox", { name: "Reemplazo para SOP 1-2026-PLA-01", exact: true });
  await expect(replacement.locator("option")).toHaveText([
    "Selecciona al jefe de reemplazo",
    "Jefe Reemplazo · Operaciones",
    "Jefe Otra Área · Operaciones",
  ]);
  await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Estado", exact: true })).toHaveValue("Inactivo");
  expect(result.transfers).toEqual([]);
  await page.getByRole("button", { name: "Reasignar planes pendientes", exact: true }).click();
  await replacement.selectOption("83");
  await dialog.getByRole("textbox", { name: "Motivo de la reasignación", exact: true }).fill("abc");
  await expect(dialog.getByRole("button", { name: "Confirmar reasignación", exact: true })).toBeDisabled();
  await dialog.getByRole("textbox", { name: "Motivo de la reasignación", exact: true }).fill("Transferencia por cambio de jefe");
  await dialog.getByRole("button", { name: "Confirmar reasignación", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  expect(result.transfers).toEqual([{ planes: [10], asignaciones: [{ id_plan: 10, id_usuario: 83 }], motivo: "Transferencia por cambio de jefe" }]);
  expect(result.source.estado).toBe("Activo");
  await expect(page.getByRole("combobox", { name: "Estado", exact: true })).toHaveValue("Inactivo");
  await page.getByRole("button", { name: "Guardar cambios", exact: true }).click();
  await expect.poll(() => result.source.estado).toBe("Inactivo");
  expect(result.updates).toHaveLength(2);
});

test("una reasignación rechazada no se reintenta sola ni desactiva al jefe", async ({ page }) => {
  const result = await setup(page, true);
  await page.getByRole("button", { name: "Reasignar planes pendientes", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Reasignar planes pendientes", exact: true });
  await dialog.getByRole("checkbox", { name: "SOP 1-2026-PLA-01", exact: true }).check();
  await dialog.getByRole("combobox", { name: "Reemplazo para SOP 1-2026-PLA-01", exact: true }).selectOption("83");
  await dialog.getByRole("textbox", { name: "Motivo de la reasignación", exact: true }).fill("Transferencia por cambio de jefe");
  await dialog.getByRole("button", { name: "Confirmar reasignación", exact: true }).click();
  await expect(dialog.getByRole("alert")).toContainText("Los planes pendientes cambiaron");
  expect(result.transfers).toHaveLength(1);
  expect(result.updates).toHaveLength(0);
  expect(result.source.estado).toBe("Activo");
  await expect(dialog).toBeVisible();
});
