import { expect, test, type Page } from "@playwright/test";
import { loginAs, mockApi } from "./helpers";
import type { UserImportPayload, UserImportPreview } from "../src/features/users/import/types";
import { usersPrefixedWorkbook } from "./fixtures/users-prefixed-workbook";

test("lee el Excel entregado con prefijos y conserva teléfonos sin crear cuentas", async ({ page }) => {
  await start(page);
  const writes: string[] = [];
  let validated: UserImportPayload | undefined;
  await page.route("**/api/importacion/usuarios/**", route => {
    if (!route.request().url().endsWith("/validar")) {
      writes.push(route.request().url());
      return route.abort();
    }
    validated = route.request().postDataJSON();
    return route.fulfill({ json: { success: true, data: preview(validated!) } });
  });
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles({
    name: "usuarios-prueba-importacion.xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    buffer: usersPrefixedWorkbook,
  });
  await expect(page.getByLabel("Hoja de usuarios").locator("option")).toHaveText([
    "Usuarios válidos — 9 usuarios", "Errores intencionales — 4 usuarios",
  ]);
  await page.getByLabel("Hoja de usuarios").selectOption("1");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByText("4 usuarios", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: "Volver", exact: true }).click();
  await page.getByLabel("Hoja de usuarios").selectOption("0");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByLabel("Aplicar el mismo rol a todos").selectOption("5");
  await page.getByRole("button", { name: "Aplicar a 9 usuarios", exact: true }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByText("No hay Jefes de Área en este lote.", { exact: false })).toBeVisible();
  await expect(page.getByLabel(/^Área para /)).toHaveCount(0);
  await page.getByRole("button", { name: "Validar y continuar", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Confirma la creación de usuarios" })).toBeVisible();
  expect(validated?.rows).toHaveLength(9);
  expect(validated?.rows.map(row => row.telefono)).toEqual(
    Array.from({ length: 9 }, (_, i) => i % 3 === 2 ? "" : String(i + 1).padStart(9, "0")),
  );
  expect(validated?.rows.every(row => row.correo.endsWith("@example.invalid"))).toBe(true);
  expect(validated?.areas).toEqual([]);
  expect(writes).toEqual([]);
});

test("un Excel corrupto falla sin enviar datos y permite seleccionar otro", async ({ page }) => {
  await start(page);
  let requests = 0;
  await page.route("**/api/importacion/usuarios/**", route => { requests++; return route.abort(); });
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles({
    name: "corrupto.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    buffer: Buffer.from([0x50, 0x4b, 3, 4, 0, 0]),
  });
  await expect(page.getByRole("alert")).toContainText("No se pudo leer el libro de Excel");
  await expect(page.getByRole("button", { name: "Continuar", exact: true })).toBeDisabled();
  await upload(page);
  await expect(page.getByRole("alert")).toHaveCount(0);
  expect(requests).toBe(0);
});

async function workbook() {
  const ExcelJS = (await import("exceljs")).default;
  const book = new ExcelJS.Workbook();
  book.addWorksheet("Guía").getCell("A1").value = "Utiliza solo las columnas amarillas de Personal";
  const sheet = book.addWorksheet("Personal");
  sheet.addRow(["DNI o CE", "Apellidos y Nombres", "Rol/Puesto", "Área de personal", "Unidad Organizativa", "LABORAL Información de correo electrónico Correo electrónico", "PERSONAL Información de correo electrónico Correo electrónico", "Celular Personal", "Jefe inmediato", "Fecha de nacimiento"]);
  [2, 3, 5, 6, 8, 9].forEach(column => { sheet.getCell(1, column).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF00" } }; });
  sheet.addRow(["NO_IMPORTAR_DNI", "Persona Prueba Uno", "Analista", "NO_IMPORTAR_AREA_PERSONAL", "Unidad A", "persona1@example.invalid", "NO_IMPORTAR_EMAIL_PERSONAL", "900000001", "Jefatura A", "NO_IMPORTAR_NACIMIENTO"]);
  sheet.addRow(["NO_IMPORTAR_DNI", "Persona Prueba Dos", "Supervisor", "NO_IMPORTAR_AREA_PERSONAL", "Unidad B", "persona2@example.invalid", "NO_IMPORTAR_EMAIL_PERSONAL", "", "Jefatura B", "NO_IMPORTAR_NACIMIENTO"]);
  return { book, sheet };
}

async function start(page: Page) {
  await mockApi(page);
  await loginAs(page, "Admin");
  await page.goto("/admin/usuarios/importar");
}

async function upload(page: Page) {
  const { book } = await workbook();
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles({ name: "padron.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", buffer: Buffer.from(await book.xlsx.writeBuffer()) });
  await expect(page.getByText("padron.xlsx", { exact: true })).toBeVisible();
}

function preview(body: UserImportPayload): UserImportPreview {
  return {
    filename: body.filename, hoja: body.hoja, canImport: true, issues: [],
    resumen: { total: body.rows.length, listos: body.rows.length, errores: 0 },
    rows: body.rows.map(row => {
      const area = row.id_rol === 3 ? body.areas.find(item => item.unidad_organizativa === row.unidad_organizativa) : undefined;
      return { ...row, id_area: area?.id_area ?? null, area: area ? (area.id_area === 1 ? "Operaciones" : "Mantenimiento") : null, rol: row.id_rol === 3 ? "Jefe de Área" : "Monitorista" };
    }),
  };
}

test("Seguridad Operativa, Monitorista y Contingencias no solicitan área", async ({ page }) => {
  await mockApi(page);
  await page.route("**/api/roles", route => route.fulfill({ json: { success: true, data: [
    { id_rol: 2, nombre_rol: "Seguridad Operativa" }, { id_rol: 3, nombre_rol: "Jefe de Área" },
    { id_rol: 5, nombre_rol: "Monitorista" }, { id_rol: 6, nombre_rol: "Gestión de Planes de Contingencia" },
  ] } }));
  await loginAs(page, "Admin");
  await page.goto("/admin/usuarios/importar");
  let validated: UserImportPayload | undefined;
  await page.route("**/api/importacion/usuarios/validar", route => {
    validated = route.request().postDataJSON();
    return route.fulfill({ json: { success: true, data: preview(validated!) } });
  });
  const { book, sheet } = await workbook();
  sheet.addRow((sheet.getRow(2).values as unknown[]).slice(1));
  sheet.getCell("F4").value = "persona3@example.invalid";
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles({
    name: "roles-sin-area.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    buffer: Buffer.from(await book.xlsx.writeBuffer()),
  });
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  for (const [row, role] of [[2, "2"], [3, "5"], [4, "6"]] as const) {
    await page.getByLabel(`Rol de fila ${row}`, { exact: true }).selectOption(role);
  }
  await expect(page.getByText("No aplica área", { exact: true })).toHaveCount(3);
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByLabel(/^Área para /)).toHaveCount(0);
  await page.getByRole("button", { name: "Validar y continuar", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Confirma la creación de usuarios" })).toBeVisible();
  expect(validated?.areas).toEqual([]);
  expect(validated?.rows.map(row => row.id_rol)).toEqual([2, 5, 6]);
});

test("compartir unidad con un jefe no asigna área a un Monitorista", async ({ page }) => {
  await start(page);
  const { book, sheet } = await workbook();
  sheet.getCell("E3").value = "Unidad A";
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles({
    name: "unidad-compartida.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    buffer: Buffer.from(await book.xlsx.writeBuffer()),
  });
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByLabel("Rol de fila 2", { exact: true }).selectOption("3");
  await page.getByLabel("Rol de fila 3", { exact: true }).selectOption("5");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  const unit = page.getByRole("row").filter({ has: page.getByRole("cell", { name: "Unidad A", exact: true }) });
  await expect(unit.getByRole("cell", { name: "1", exact: true })).toBeVisible();
  await page.getByLabel("Área para Unidad A", { exact: true }).selectOption("1");
  await page.getByRole("button", { name: "Volver", exact: true }).click();
  const first = page.getByRole("row").filter({ has: page.getByLabel("Rol de fila 2", { exact: true }) });
  const second = page.getByRole("row").filter({ has: page.getByLabel("Rol de fila 3", { exact: true }) });
  await expect(first.getByText("Operaciones", { exact: true })).toBeVisible();
  await expect(second.getByText("No aplica área", { exact: true })).toBeVisible();
});

test("se abre desde Gestión de Usuarios y responde en móvil", async ({ page }) => {
  await mockApi(page);
  await loginAs(page, "Admin");
  await page.goto("/admin/usuarios");
  await page.getByRole("link", { name: "Importar desde Excel", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Importación de usuarios", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Gestión de Usuarios", exact: true })).toHaveAttribute("aria-current", "page");
  await page.setViewportSize({ width: 390, height: 844 });
  await upload(page);
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Revisa los datos y asigna los roles", exact: true })).toBeVisible();
  await page.getByLabel("Aplicar el mismo rol a todos").selectOption("3");
  await page.getByRole("button", { name: "Aplicar a 2 usuarios", exact: true }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Áreas de los Jefes de Área", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.screenshot({ path: "../outputs/importacion-usuarios-areas.png", fullPage: true });
});

test("solo transmite columnas amarillas, exige áreas/roles y crea únicamente al confirmar", async ({ page }) => {
  await start(page);
  const validations: UserImportPayload[] = [];
  const writes: UserImportPayload[] = [];
  await page.route("**/api/importacion/usuarios/validar", route => {
    const body = route.request().postDataJSON() as UserImportPayload;
    validations.push(body);
    return route.fulfill({ json: { success: true, data: preview(body) } });
  });
  await page.route("**/api/importacion/usuarios/importar", route => {
    writes.push(route.request().postDataJSON());
    return route.fulfill({ status: 201, json: { success: true, data: { batchId: "prueba-lote", created: 2, credentials: [
      { row: 2, id_usuario: 90, codigo_usuario: "EMP-0090", correo: "persona1@example.invalid", password_temporal: "Temporal-Prueba-1" },
      { row: 3, id_usuario: 91, codigo_usuario: "EMP-0091", correo: "persona2@example.invalid", password_temporal: "Temporal-Prueba-2" },
    ] } } });
  });
  await upload(page);
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByRole("button", { name: "Continuar", exact: true })).toBeDisabled();
  await page.getByLabel("Aplicar el mismo rol a todos").selectOption("5");
  await page.getByRole("button", { name: "Aplicar a 2 usuarios", exact: true }).click();
  await page.getByLabel("Rol de fila 3", { exact: true }).selectOption("3");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByLabel("Área para Unidad A", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Validar y continuar", exact: true })).toBeDisabled();
  await page.getByLabel("Área para Unidad B", { exact: true }).selectOption("2");
  await page.getByRole("button", { name: "Validar y continuar", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Confirma la creación de usuarios" })).toBeVisible();
  expect(writes).toHaveLength(0);
  expect(validations).toHaveLength(1);
  expect(JSON.stringify(validations[0])).not.toContain("NO_IMPORTAR");
  expect(Object.keys(validations[0]!.rows[0]!).sort()).toEqual(["row", "nombre", "cargo", "unidad_organizativa", "correo", "telefono", "jefe_inmediato", "id_rol"].sort());
  expect(validations[0]!.rows.map(row => row.id_rol)).toEqual([5, 3]);
  expect(validations[0]!.areas).toEqual([{ unidad_organizativa: "Unidad B", id_area: 2 }]);
  await expect(page.getByText("No aplica área", { exact: true })).toHaveCount(1);
  await page.getByRole("button", { name: "Volver", exact: true }).click();
  await page.getByRole("button", { name: "Volver", exact: true }).click();
  await page.getByLabel("Rol de fila 3", { exact: true }).selectOption("5");
  await expect(page.getByRole("button", { name: "Crear 2 usuarios", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: "Validar y continuar", exact: true }).click();
  await expect(page.getByRole("button", { name: "Crear 2 usuarios", exact: true })).toBeEnabled();
  expect(validations).toHaveLength(2);
  expect(validations[1]!.areas).toEqual([]);
  await page.getByRole("button", { name: "Crear 2 usuarios", exact: true }).click();
  await expect(page.getByRole("heading", { name: "2 usuarios creados", exact: true })).toBeVisible();
  expect(writes).toHaveLength(1);
  await expect(page.getByText("Temporal-Prueba-1", { exact: true })).toHaveCount(0);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar accesos temporales", exact: true }).click();
  expect((await downloadPromise).suggestedFilename()).toMatch(/^accesos-temporales-.*\.csv$/);
});

test("un conflicto de BD vuelve a revisión y requiere validar otra vez", async ({ page }) => {
  await start(page);
  await page.route("**/api/importacion/usuarios/validar", route => route.fulfill({ json: { success: true, data: preview(route.request().postDataJSON()) } }));
  await page.route("**/api/importacion/usuarios/importar", route => {
    const result = preview(route.request().postDataJSON());
    result.canImport = false;
    result.issues = [{ row: 2, field: "correo", message: "El correo ya está registrado." }];
    return route.fulfill({ status: 409, json: { success: false, message: "La cuenta ya existe. Vuelve a revisar.", data: result } });
  });
  await upload(page);
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByLabel("Aplicar el mismo rol a todos").selectOption("5");
  await page.getByRole("button", { name: "Aplicar a 2 usuarios", exact: true }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: "Validar y continuar", exact: true }).click();
  await page.getByRole("button", { name: "Crear 2 usuarios", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Revisa los datos y asigna los roles", exact: true })).toBeVisible();
  await expect(page.getByText("Fila 2: El correo ya está registrado.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Crear 2 usuarios", exact: true })).toHaveCount(0);
});

for (const prefixed of [false, true]) {
test(`rechaza fórmulas en campos amarillos sin enviar datos (prefijos: ${prefixed})`, async ({ page }) => {
  await start(page);
  let requests = 0;
  await page.route("**/api/importacion/usuarios/**", route => { requests++; return route.abort(); });
  const { book, sheet } = await workbook();
  sheet.getCell("B2").value = { formula: '"Persona"', result: "Persona" };
  let buffer = Buffer.from(await book.xlsx.writeBuffer());
  if (prefixed) {
    const JSZip = (await import("jszip")).default;
    const archive = await JSZip.loadAsync(buffer);
    const entry = archive.file("xl/workbook.xml")!;
    archive.file("xl/workbook.xml", (await entry.async("string"))
      .replace('xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"', 'xmlns:x="http://schemas.openxmlformats.org/spreadsheetml/2006/main"')
      .replace(/(<\/?)([A-Za-z_][\w.-]*)(?=[\s/>])/g, "$1x:$2"));
    buffer = Buffer.from(await archive.generateAsync({ type: "arraybuffer" }));
  }
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles({ name: "formulas.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", buffer });
  await expect(page.getByRole("alert")).toContainText("contiene una fórmula");
  expect(requests).toBe(0);
});
}

test("el formato original se puede revisar sin importar datos reales", async ({ page }) => {
  const sample = process.env.USER_IMPORT_SAMPLE;
  test.skip(!sample, "Define USER_IMPORT_SAMPLE para revisar un archivo privado local.");
  await start(page);
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles(sample!);
  await expect(page.getByLabel("Hoja de usuarios").locator("option:checked")).toHaveText(/1 usuarios/);
  await expect(page.getByRole("button", { name: "Continuar", exact: true })).toBeEnabled();
});

test("no sustituye el correo laboral por una columna de correo personal", async ({ page }) => {
  await start(page);
  const { book, sheet } = await workbook();
  sheet.getCell("F1").value = "LABORAL Correo PERSONAL";
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles({ name: "sin-correo-laboral.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", buffer: Buffer.from(await book.xlsx.writeBuffer()) });
  await expect(page.getByRole("alert")).toContainText("seis columnas amarillas");
  await expect(page.getByRole("button", { name: "Continuar", exact: true })).toBeDisabled();
});
