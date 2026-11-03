import { expect, test, type Page } from "@playwright/test";
import { loginAs, mockApi } from "./helpers";
import type { UserImportPayload } from "../src/features/users/import/types";
test.setTimeout(90_000);

export async function browserDrafts(page: Page) {
  return page.evaluate(() => new Promise<{ id: string; owner: string; path: string; value: unknown }[]>((resolve, reject) => {
    const request = indexedDB.open("sms-l1-workspace-v1", 1);
    request.onsuccess = () => {
      const db = request.result;
      const read = db.transaction("drafts").objectStore("drafts").getAll();
      read.onsuccess = () => { resolve(read.result); db.close(); };
      read.onerror = () => reject(read.error);
    };
    request.onerror = () => reject(request.error);
  }));
}

async function saved(page: Page, text: string) {
  await expect.poll(async () => JSON.stringify(await browserDrafts(page))).toContain(text);
}

async function userWorkbook() {
  const ExcelJS = (await import("exceljs")).default;
  const book = new ExcelJS.Workbook();
  const sheet = book.addWorksheet("Personal");
  sheet.addRow(["Apellidos y Nombres", "Rol/Puesto", "Unidad Organizativa", "Correo laboral", "Celular Personal", "Jefe inmediato", "DNI"]);
  sheet.addRow(["Persona Uno", "Supervisor", "Unidad A", "uno@example.invalid", "000000001", "Jefatura A", "NO_CONSERVAR_DNI"]);
  sheet.addRow(["Persona Dos", "Supervisor", "Unidad B", "dos@example.invalid", "000000002", "Jefatura B", "NO_CONSERVAR_DNI"]);
  return { name: "padron-recuperable.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", buffer: Buffer.from(await book.xlsx.writeBuffer()) };
}

test("recupera Excel, roles y áreas; exige validar otra vez y no crea usuarios al recargar", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Admin");
  let validations = 0; let writes = 0;
  await page.route("**/api/importacion/usuarios/**", route => {
    if (!route.request().url().endsWith("/validar")) { writes++; return route.abort(); }
    validations++;
    const body: UserImportPayload = route.request().postDataJSON();
    return route.fulfill({ json: { success: true, data: { ...body, canImport: true, issues: [], resumen: { total: 2, listos: 2, errores: 0 }, rows: body.rows.map(row => ({ ...row, id_area: 1, area: "Operaciones", rol: "Jefe de Área" })) } } });
  });
  await page.goto("/admin/usuarios/importar");
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles(await userWorkbook());
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByLabel("Aplicar el mismo rol a todos").selectOption("3");
  await page.getByRole("button", { name: "Aplicar a 2 usuarios" }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByLabel("Área para Unidad A").selectOption("1");
  await page.getByLabel("Área para Unidad B").selectOption("2");
  await page.getByRole("button", { name: "Validar y continuar", exact: true }).click();
  await expect(page.getByRole("button", { name: "Crear 2 usuarios", exact: true })).toBeEnabled();
  await saved(page, 'users-import:step');
  expect(JSON.stringify(await browserDrafts(page))).not.toContain("NO_CONSERVAR_DNI");
  await page.reload();
  await expect(page.getByLabel("Área para Unidad A")).toHaveValue("1");
  await expect(page.getByLabel("Área para Unidad B")).toHaveValue("2");
  await expect(page.getByText("padron-recuperable.xlsx", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Crear 2 usuarios", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Volver", exact: true }).click();
  await expect(page.getByLabel("Rol de fila 2")).toHaveValue("3");
  await expect(page.getByLabel("Rol de fila 3")).toHaveValue("3");
  expect(validations).toBe(1); expect(writes).toBe(0);
});

test("recupera un alta manual y su paso; nunca conserva la contraseña", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Admin");
  await page.goto("/admin/usuarios");
  await page.getByRole("button", { name: "Nuevo usuario", exact: true }).click();
  await page.getByLabel("Nombres", { exact: false }).first().fill("Nombre borrador");
  await page.getByLabel("Apellidos", { exact: false }).fill("Prueba");
  await page.getByLabel("Correo electrónico", { exact: false }).fill("borrador@example.invalid");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("dialog").getByRole("combobox", { name: "Rol", exact: false }).selectOption("5");
  await page.getByPlaceholder("Contraseña de acceso", { exact: true }).fill("NO_PERSISTIR_Secreto!123");
  await saved(page, "Nombre borrador");
  expect(JSON.stringify(await browserDrafts(page))).not.toContain("NO_PERSISTIR_Secreto");
  await page.reload();
  await expect(page.getByRole("dialog", { name: "Nuevo usuario", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("combobox", { name: "Rol", exact: false })).toHaveValue("5");
  await expect(page.getByPlaceholder("Contraseña de acceso", { exact: true })).toHaveValue("");
  await page.getByRole("button", { name: "Atrás", exact: true }).click();
  await expect(page.getByLabel("Nombres", { exact: false }).first()).toHaveValue("Nombre borrador");
});

test("el registro operativo conserva campos al recargar y al volver de otra pantalla", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Monitorista");
  await page.goto("/monitoreo/nuevo");
  await page.getByPlaceholder("Describa el evento...").fill("Descripción operativa pendiente de guardar");
  await page.getByPlaceholder("Ej. 1234").fill("0088");
  await saved(page, "Descripción operativa pendiente");
  await page.reload();
  await expect(page.getByPlaceholder("Describa el evento...")).toHaveValue("Descripción operativa pendiente de guardar");
  await expect(page.getByPlaceholder("Ej. 1234")).toHaveValue("0088");
  await page.goto("/monitoreo/historial"); await page.goto("/monitoreo/nuevo");
  await expect(page.getByPlaceholder("Describa el evento...")).toHaveValue("Descripción operativa pendiente de guardar");
});

test("configuración conserva pestaña, cambios y base para detectar conflictos", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Admin");
  await page.goto("/admin/configuracion");
  await page.getByLabel("Nombre del sistema", { exact: false }).fill("Nombre sin guardar");
  await page.getByRole("tab", { name: "Operación", exact: true }).click();
  await page.getByLabel("Kilómetros por carrera").fill("35.2");
  await saved(page, "Nombre sin guardar");
  page.on("dialog", dialog => dialog.accept());
  await page.reload();
  await expect(page.getByLabel("Kilómetros por carrera")).toHaveValue("35.2");
  await page.getByRole("tab", { name: /^General/ }).click();
  await expect(page.getByLabel("Nombre del sistema", { exact: false })).toHaveValue("Nombre sin guardar");
});

const caseData = (state: string, id = 99) => ({
  id_caso: id, codigo_sop: `SOP ${id}-2026`, titulo: "Caso de ensayo", descripcion: "Descripción inicial del caso",
  fecha_hallazgo: "2026-10-10T00:00:00Z", created_at: "2026-10-10T20:00:00Z",
  catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: state },
  catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: "Condición Insegura" },
  catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { nombre: "Hallazgo" },
  catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: { nombre: "Reporte público" },
  analisis_riesgo: 40, catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { id_detalle: 40, codigo: "4E", nombre: "Bajo" },
  anexos_caso: [], planes_accion: [], evento_caso: [], solicitudes_informacion: [], timeline_caso: [], investigacion_caso: null, areas: null,
});

for (const [state, placeholder] of [
  ["Evaluación", "Describa las causas posibles identificadas…"],
  ["Investigación", "¿Cuál es la causa originaria del evento?"],
  ["Plan de Acción", "Detalle de la actividad..."],
]) {
  test(`${state}: conserva redacción al recargar y la separa de otro expediente`, async ({ page }) => {
    await mockApi(page); await loginAs(page, "Seguridad Operativa");
    for (const id of [99, 100]) await page.route(`**/api/cases/SOP%20${id}-2026`, route => route.fulfill({ json: { success: true, data: caseData(state, id) } }));
    await page.goto("/seguridad/casos/SOP%2099-2026");
    await page.getByPlaceholder(placeholder).fill("Trabajo pendiente del expediente 99");
    await saved(page, "Trabajo pendiente del expediente 99");
    await page.reload();
    await expect(page.getByPlaceholder(placeholder)).toHaveValue("Trabajo pendiente del expediente 99");
    await page.goto("/seguridad/casos/SOP%20100-2026");
    await expect(page.getByPlaceholder(placeholder)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByPlaceholder(placeholder)).not.toHaveValue("Trabajo pendiente del expediente 99");
    await page.goto("/seguridad/casos/SOP%2099-2026");
    await expect(page.getByPlaceholder(placeholder)).toHaveValue("Trabajo pendiente del expediente 99");
  });
}

test("el borrador de Monitoreo no aparece en otra cuenta y salir lo elimina", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Monitorista");
  await page.goto("/monitoreo/nuevo");
  await page.getByPlaceholder("Describa el evento...").fill("Trabajo privado del monitorista");
  await saved(page, "Trabajo privado del monitorista");
  await page.evaluate(() => {
    const user = JSON.parse(localStorage.getItem("sigma_auth_user")!);
    localStorage.setItem("sigma_auth_user", JSON.stringify({ ...user, id_usuario: 987 }));
  });
  // La navegación SPA del proveedor de autenticación conserva su cuenta hasta
  // recargar; se usa una nueva init script para representar otra sesión real.
  await page.addInitScript(() => {
    const user = JSON.parse(localStorage.getItem("sigma_auth_user")!);
    localStorage.setItem("sigma_auth_user", JSON.stringify({ ...user, id_usuario: 987 }));
  });
  await page.reload();
  await expect(page.getByPlaceholder("Describa el evento...")).toHaveValue("");
  await page.getByRole("button", { name: "Cerrar sesión", exact: true }).click();
  await page.getByRole("dialog", { name: "¿Cerrar sesión?", exact: true }).getByRole("button", { name: "Sí, cerrar sesión", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect.poll(async () => JSON.stringify(await browserDrafts(page))).not.toContain("Trabajo privado del monitorista");
});

test("si IndexedDB falla, avisa y permite seguir trabajando", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Monitorista");
  await page.addInitScript(() => { Object.defineProperty(window, "indexedDB", { get() { throw new Error("Storage disabled"); } }); });
  await page.goto("/monitoreo/nuevo");
  await expect(page.getByRole("alert")).toContainText("no pudo conservar el borrador");
  await page.getByPlaceholder("Describa el evento...").fill("Se puede seguir editando");
  await expect(page.getByPlaceholder("Describa el evento...")).toHaveValue("Se puede seguir editando");
});

test("el reporte público conserva texto, paso y archivo sin enviarse", async ({ page }) => {
  await mockApi(page);
  let writes = 0;
  await page.route("**/api/reports", route => { writes++; return route.abort(); });
  await page.goto("/reportes/nuevo");
  await page.getByRole("button", { name: "Nuevo reporte", exact: true }).click();
  await page.getByRole("radio", { name: "Accidente", exact: true }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Villa El Salvador", exact: true }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByPlaceholder("Describe brevemente lo que observaste y el riesgo que podría generar.").fill("Descripción pública que debe recuperarse antes de enviarla.");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.locator('input[type="file"][accept*="pdf"]').setInputFiles({ name: "evidencia.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 evidencia sintetica") });
  await expect(page.getByText("evidencia.pdf", { exact: true })).toBeVisible();
  await saved(page, "Descripción pública que debe recuperarse");
  await page.reload();
  await expect(page.getByText("evidencia.pdf", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Atrás", exact: true }).click();
  await expect(page.getByPlaceholder("Describe brevemente lo que observaste y el riesgo que podría generar.")).toHaveValue("Descripción pública que debe recuperarse antes de enviarla.");
  expect(writes).toBe(0);
});

test("la importación histórica recupera decisiones pero no restaura autorización para importar", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Admin");
  let writes = 0;
  await page.route("**/api/importacion/historial**", route => route.fulfill({ json: { success: true, data: { items: [], total: 0 } } }));
  await page.route("**/api/importacion/casos/importar", route => { writes++; return route.abort(); });
  await page.route("**/api/importacion/casos/validar", route => route.fulfill({ json: { success: true, data: {
    filename: "historico.csv", canImport: true, requiredColumns: [], optionalColumns: [], issues: [],
    cases: [{ row: 2, codigo: "QA-1", titulo: "Caso histórico", tipo: "Hallazgo", estado: "Recepción", estadoOriginal: "Recepción", estacion: "VES", area: "Operaciones", riesgo: "Bajo", fecha: "2026-10-12", planes: 1, editable: true, status: "valid", planesDetalle: [] }],
    resumen: { totalFilas: 1, casosDetectados: 1, planesDetectados: 1, listos: 1, duplicados: 0, errores: 0, advertencias: 0 },
  } } }));
  await page.goto("/admin/importacion");
  await page.locator('input[type="file"]').setInputFiles({ name: "historico.csv", mimeType: "text/csv", buffer: Buffer.from("Código,Tipo,Estado,Fecha\nQA-1,Hallazgo,Recepción,2026-10-12") });
  await page.getByRole("button", { name: "Validar", exact: true }).click();
  await page.getByLabel("Motivo de los cambios").fill("Se prepara un cierre histórico de ensayo");
  await page.getByLabel("Seleccionar QA-1", { exact: true }).check();
  await page.getByRole("button", { name: "Cerrar SOP y sus planes", exact: true }).click();
  await page.getByRole("button", { name: "Preparar y revisar", exact: true }).click();
  await saved(page, "Se prepara un cierre histórico");
  await page.reload();
  await expect(page.getByText("historico.csv", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Motivo de los cambios")).toHaveValue("Se prepara un cierre histórico de ensayo");
  await expect(page.getByLabel("Seleccionar QA-1", { exact: true })).toBeChecked();
  await expect(page.getByRole("button", { name: "Importar casos", exact: true })).toBeDisabled();
  expect(writes).toBe(0);
});

test("un borrador vencido se descarta al recuperar la página", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Monitorista");
  await page.goto("/monitoreo/nuevo");
  await page.getByPlaceholder("Describa el evento...").fill("Borrador vencido de ensayo");
  await saved(page, "Borrador vencido de ensayo");
  await page.evaluate(() => new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("sms-l1-workspace-v1", 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("drafts", "readwrite");
      const store = tx.objectStore("drafts"); const read = store.getAll();
      read.onsuccess = () => { for (const record of read.result) store.put({ ...record, updatedAt: Date.now() - 25 * 60 * 60 * 1000 }); };
      tx.oncomplete = () => { db.close(); resolve(); }; tx.onerror = () => reject(tx.error);
    };
  }));
  await page.reload();
  await expect(page.getByPlaceholder("Describa el evento...")).toHaveValue("");
});

test("recupera una carga terminada sin guardar sus contraseñas ni repetirla", async ({ page }) => {
  await mockApi(page); await loginAs(page, "Admin");
  let writes = 0;
  await page.route("**/api/importacion/usuarios/validar", route => {
    const body: UserImportPayload = route.request().postDataJSON();
    return route.fulfill({ json: { success: true, data: { ...body, canImport: true, issues: [], resumen: { total: 2, listos: 2, errores: 0 }, rows: body.rows.map(row => ({ ...row, id_area: null, area: null, rol: "Monitorista" })) } } });
  });
  await page.route("**/api/importacion/usuarios/importar", route => {
    writes++;
    return route.fulfill({ status: 201, json: { success: true, data: { batchId: "lote-completado-de-ensayo", created: 2, credentials: [{ row: 2, id_usuario: 101, codigo_usuario: "QA-101", correo: "uno@example.invalid", password_temporal: "NO_PERSISTIR_ACCESO_TEMPORAL" }] } } });
  });
  await page.goto("/admin/usuarios/importar");
  await page.getByLabel("Archivo Excel de usuarios").setInputFiles(await userWorkbook());
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByLabel("Aplicar el mismo rol a todos").selectOption("5");
  await page.getByRole("button", { name: "Aplicar a 2 usuarios" }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: "Validar y continuar", exact: true }).click();
  await page.getByRole("button", { name: "Crear 2 usuarios", exact: true }).click();
  await expect(page.getByRole("heading", { name: "2 usuarios creados", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Descargar accesos temporales", exact: true }).click();
  await saved(page, "lote-completado-de-ensayo");
  expect(JSON.stringify(await browserDrafts(page))).not.toContain("NO_PERSISTIR_ACCESO_TEMPORAL");
  await page.reload();
  await expect(page.getByRole("heading", { name: "2 usuarios creados", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Crear 2 usuarios", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Descargar accesos temporales", exact: true })).toHaveCount(0);
  expect(writes).toBe(1);
});
