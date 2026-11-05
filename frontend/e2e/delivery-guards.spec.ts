import { expect, test } from "@playwright/test";
import { loginAs, mockApi } from "./helpers";

for (const stored of ["{}", "null", '{"rol":4}', "{incompleto"]) {
  test(`una sesión dañada vuelve al login sin pantalla blanca (${stored})`, async ({ page }) => {
    await mockApi(page);
    await page.addInitScript(value => {
      localStorage.setItem("sigma_auth_user", value);
      localStorage.setItem("sigma_auth_token", "sesion-antigua");
    }, stored);
    await page.goto("/admin/usuarios");
    await expect(page).toHaveURL("/login");
    await expect(page.getByRole("button", { name: "Iniciar sesión", exact: true })).toBeVisible();
    await expect(page.getByTestId("app-recovery")).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem("sigma_auth_token"))).toBeNull();
  });
}

test("un fallo al cargar una pantalla ofrece recuperación sin exponer el error técnico", async ({ page }) => {
  await mockApi(page);
  await loginAs(page, "Admin");
  const chunk = /UsuariosPage[^/]*\.(?:js|tsx)(?:\?.*)?$/;
  await page.route(chunk, route => route.abort("failed"));
  await page.goto("/admin/usuarios");
  await expect(page.getByRole("heading", { name: "No pudimos cargar esta pantalla" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Recargar página" })).toBeEnabled();
  await expect(page.getByText("Failed to fetch", { exact: false })).toHaveCount(0);
  await page.unroute(chunk);
  await page.getByRole("button", { name: "Recargar página" }).click();
  await expect(page.getByRole("button", { name: "Nuevo usuario", exact: true })).toBeVisible();
  await expect(page.getByTestId("app-recovery")).toHaveCount(0);
});

test("el login distingue servidor inaccesible de contraseña incorrecta", async ({ page }) => {
  await mockApi(page);
  await page.route("**/api/auth/login", route => route.abort("failed"));
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Correo corporativo" }).fill("prueba@example.invalid");
  await page.getByPlaceholder("Ingresa tu contraseña").fill("Prueba-123");
  await page.getByRole("button", { name: "Iniciar sesión", exact: true }).click();
  await expect(page.getByText(/No se pudo conectar con el servidor/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Iniciar sesión", exact: true })).toBeEnabled();
  await expect(page.getByRole("textbox", { name: "Correo corporativo" })).toHaveValue("prueba@example.invalid");
});

test("alta manual y cambio de rol solo muestran y guardan área para un jefe", async ({ page }) => {
  await mockApi(page);
  await loginAs(page, "Admin");
  let saved: Record<string, unknown> | undefined;
  await page.route("**/api/users", route => {
    saved = route.request().postDataJSON();
    return route.fulfill({ json: { success: true, data: { id_usuario: 99 } } });
  });
  await page.goto("/admin/usuarios");
  await page.getByRole("button", { name: "Nuevo usuario", exact: true }).click();
  await page.getByPlaceholder("Ej. María Elena").fill("Ana");
  await page.getByPlaceholder("Ej. Pérez Ramírez").fill("Prueba Usuario");
  await page.getByPlaceholder("correo@lineauno.pe").fill("alta@example.invalid");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  const role = page.getByRole("combobox", { name: "Rol *", exact: true });
  const area = page.getByRole("combobox", { name: /^Área \*/ });
  await role.selectOption("3");
  await page.getByPlaceholder("Contraseña de acceso").fill("Temporal-123");
  await page.getByPlaceholder("Repite la contraseña temporal").fill("Temporal-123");
  await page.getByRole("button", { name: "Crear usuario", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Selecciona un área");
  expect(saved).toBeUndefined();
  await area.selectOption("1");
  for (const id of ["2", "5", "6"]) {
    await role.selectOption(id);
    await expect(area).toHaveCount(0);
  }
  await role.selectOption("3");
  await expect(area).toHaveValue("");
  await role.selectOption("5");
  await page.getByRole("button", { name: "Crear usuario", exact: true }).click();
  await expect.poll(() => saved?.id_rol).toBe(5);
  expect(saved?.id_area).toBeNull();
});

test("matriz de permisos incluye Contingencias y no ofrece reportes al jefe", async ({ page }) => {
  await mockApi(page);
  await loginAs(page, "Admin");
  await page.goto("/admin/roles");
  const matrix = page.getByRole("table").filter({ has: page.getByRole("columnheader", { name: "Módulo", exact: true }) });
  await expect(matrix).toBeVisible();
  const headers = await matrix.getByRole("columnheader").allTextContents();
  expect(headers).toContain("Gestión de Planes de Contingencia");
  const jefeColumn = headers.indexOf("Jefe de Área");
  const reports = matrix.getByRole("row").filter({ has: page.getByRole("cell", { name: "Reportes", exact: true }) });
  await expect(reports.getByRole("cell").nth(jefeColumn)).toHaveText("Sin acceso");
});

for (const example of [
  { route: "/monitoreo/datos-operativos", endpoint: "**/api/datos-operativos?*", retry: "Reintentar historial de datos", message: "No se pudieron cargar los datos operativos", empty: "No hay datos operativos para mostrar." },
  { route: "/admin/importacion", endpoint: "**/api/importacion/historial?*", retry: "Reintentar historial de importaciones", message: "No se pudo cargar el historial", empty: "Todavía no existen importaciones registradas." },
]) {
  test(`una respuesta incompleta no simula datos vacíos y permite recuperar ${example.route}`, async ({ page }) => {
    await mockApi(page);
    await loginAs(page, "Admin");
    let valid = false;
    await page.route(example.endpoint, route => route.fulfill({ json: { success: true, data: valid ? { items: [], total: 0, page: 1, limit: 20 } : [] } }));
    await page.goto(example.route);
    await expect(page.getByRole("alert").filter({ hasText: example.message })).toBeVisible();
    await expect(page.getByText(example.empty, { exact: true })).toHaveCount(0);
    await expect(page.getByTestId("app-recovery")).toHaveCount(0);
    valid = true;
    await page.getByRole("button", { name: example.retry, exact: true }).click();
    await expect(page.getByText(example.empty, { exact: true })).toBeVisible();
    await expect(page.getByRole("alert").filter({ hasText: example.message })).toHaveCount(0);
  });
}
