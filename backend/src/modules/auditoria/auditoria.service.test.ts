import { describe, expect, it, vi } from "vitest";

const findParaExportarMock = vi.fn();
vi.mock("./auditoria.repository.js", () => ({
  AuditoriaRepository: { findParaExportar: findParaExportarMock },
}));

const { AuditoriaService, diffCampos } = await import("./auditoria.service.js");

describe("diffCampos", () => {
  it("solo deja los campos que cambiaron, no los que se repiten", () => {
    const resultado = diffCampos({ nombre: "Ana", cargo: "SO" }, { nombre: "Ana", cargo: "Jefe" });
    expect(resultado).toEqual({ antes: { cargo: "SO" }, despues: { cargo: "Jefe" } });
  });

  it("devuelve null si no hubo ningún cambio real", () => {
    expect(diffCampos({ nombre: "Ana" }, { nombre: "Ana" })).toBeNull();
  });

  it("devuelve null si falta 'antes' o 'después' (no hay nada que comparar)", () => {
    expect(diffCampos(null, { nombre: "Ana" })).toBeNull();
    expect(diffCampos({ nombre: "Ana" }, null)).toBeNull();
    expect(diffCampos(undefined, undefined)).toBeNull();
  });

  it("trata null y undefined como el mismo valor ausente, no como un cambio", () => {
    expect(diffCampos({ telefono: null }, { telefono: undefined })).toBeNull();
  });

  it("detecta cambios dentro de objetos anidados por comparación estructural (JSON)", () => {
    const resultado = diffCampos(
      { permisos: { puede_reabrir_casos: false } },
      { permisos: { puede_reabrir_casos: true } }
    );
    expect(resultado).toEqual({
      antes: { permisos: { puede_reabrir_casos: false } },
      despues: { permisos: { puede_reabrir_casos: true } },
    });
  });

  it("incluye campos eliminados del objeto nuevo", () => {
    const resultado = diffCampos({ nombre: "Ana", extra: "x" }, { nombre: "Beto" });
    expect(resultado).toEqual({ antes: { nombre: "Ana", extra: "x" }, despues: { nombre: "Beto", extra: null } });
  });
});

describe("AuditoriaService.exportarCsv", () => {
  it("rechaza más de 20 000 filas sin devolver un CSV parcial", async () => {
    findParaExportarMock.mockResolvedValue(Array(20001).fill({}));
    await expect(AuditoriaService.exportarCsv({})).rejects.toThrow("supera 20 000");
  });

  it("incluye exactamente 20 000 filas y neutraliza fórmulas de hojas de cálculo", async () => {
    findParaExportarMock.mockResolvedValue(Array(20000).fill({
      fecha: null, usuarios: { nombre: '=HYPERLINK("malicioso")', cargo: null },
      accion: "editar", tabla_afectada: "usuarios", descripcion: "@SUM(1)",
    }));
    const csv = await AuditoriaService.exportarCsv({});
    expect(csv.split("\n")).toHaveLength(20001);
    expect(csv).toContain("'@SUM(1)");
    expect(csv).toContain("'=HYPERLINK");
  });

  it("rechaza fechas inexistentes, rangos invertidos, acciones y actores inválidos", async () => {
    for (const query of [{ desde: "2026-02-30" }, { desde: "2026-09-02", hasta: "2026-09-01" }, { accion: "hack" }, { usuario: "-1" }]) {
      await expect(AuditoriaService.exportarCsv(query)).rejects.toThrow();
    }
  });

  it("exporta con todos los filtros e ignora la página", async () => {
    findParaExportarMock.mockResolvedValue([]);
    await AuditoriaService.exportarCsv({ usuario: "7", tabla: "usuarios", accion: "editar", desde: "2026-09-01", hasta: "2026-09-02", search: "Ana", ...{ page: "2", limit: "30" } });
    expect(findParaExportarMock).toHaveBeenLastCalledWith({ usuario: 7, tabla: "usuarios", accion: "editar", desde: "2026-09-01", hasta: "2026-09-02", search: "Ana" });
  });
  it("arranca con BOM y encabezado en español, y trae los campos en el orden documentado", async () => {
    findParaExportarMock.mockResolvedValue([
      {
        fecha: new Date("2026-09-01T10:00:00.000Z"),
        usuarios: { nombre: "Hector Hinostroza", cargo: "RSO" },
        accion: "editar",
        tabla_afectada: "casos_sop",
        id_registro: 42,
        descripcion: "Cerró el caso SOP 10-2026",
        ip: "127.0.0.1",
        datos_previos: null,
        datos_nuevos: null,
      },
    ]);

    const csv = await AuditoriaService.exportarCsv({});
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    const [encabezado, fila] = csv.slice(1).split("\n");
    expect(encabezado).toBe(
      "Fecha,Usuario,Cargo,Acción,Tabla,ID registro,Descripción,IP,Datos anteriores,Datos nuevos"
    );
    expect(fila).toContain("Hector Hinostroza");
    expect(fila).toContain("casos_sop");
  });

  it("escapa comas, comillas y saltos de línea dentro de un campo (descripción libre)", async () => {
    findParaExportarMock.mockResolvedValue([
      {
        fecha: null,
        usuarios: { nombre: "Ana", cargo: null },
        accion: "crear",
        tabla_afectada: "reportes",
        id_registro: null,
        descripcion: 'Reporte con "comillas", una coma y\nsalto de línea',
        ip: null,
        datos_previos: null,
        datos_nuevos: null,
      },
    ]);

    const csv = await AuditoriaService.exportarCsv({});
    expect(csv).toContain('"Reporte con ""comillas"", una coma y\nsalto de línea"');
  });
});
