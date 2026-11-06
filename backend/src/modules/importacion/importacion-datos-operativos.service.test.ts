import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  catalogos: { findFirst: vi.fn() },
  datos_operativos: { findMany: vi.fn(), createMany: vi.fn() },
  importaciones: { create: vi.fn(), update: vi.fn() },
  $transaction: vi.fn(),
}));
const config = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("../../lib/prisma.js", () => ({ default: db }));
vi.mock("../configuracion/configuracion.service.js", () => ({ ConfiguracionService: config }));
vi.mock("./import-lock.js", () => ({ withImportLock: (_: string, work: () => Promise<unknown>) => work() }));

import { ImportacionDatosOperativosService as service } from "./importacion-datos-operativos.service.js";

const input = {
  filename: "septiembre.xlsx",
  hoja: "Datos Operativos",
  rows: [
    { Fecha: "2025-09-01", "QTY carreras": "278", "QTY pasajeros": "120", "Km comercial": "", "Km no comercial": "0", "Paradas en estación": "", "Afluencia diaria": "500" },
    { Fecha: "2025-09-02", "QTY carreras": "100", "QTY pasajeros": "80", "Km comercial": "3200", "Km no comercial": "2", "Paradas en estación": "2600", "Afluencia diaria": "400" },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
  config.get.mockResolvedValue({ operacion: { kmPorCarrera: 33.128331 } });
  db.catalogos.findFirst.mockResolvedValue(null);
  db.datos_operativos.findMany.mockResolvedValue([]);
  db.importaciones.create.mockResolvedValue({ id_importacion: 9 });
  db.datos_operativos.createMany.mockResolvedValue({ count: 2 });
  db.importaciones.update.mockResolvedValue({});
  db.$transaction.mockImplementation((work: (tx: typeof db) => Promise<unknown>) => work(db));
});

describe("importación de datos operativos", () => {
  it("guarda los valores calculados y conserva los reales", async () => {
    const preview = await service.validar(input);
    expect(preview.operativos[0]).toMatchObject({ kmComercial: 9210, paradas: 7228, afluencia: 500, status: "valid" });
    expect(preview.operativos[1]).toMatchObject({ kmComercial: 3200, paradas: 2600, afluencia: 400, status: "valid" });
    const result = await service.importar(input, 1, preview.kmPorCarrera, preview.estaciones);
    expect(result.imported.eventos).toBe(2);
    expect(db.datos_operativos.createMany).toHaveBeenCalledWith({ data: [
      expect.objectContaining({ id_importacion: 9, qty_carreras: 278, qty_pasajeros: 120, afluencia: 500, km_comercial: 9210, paradas_estacion: 7228 }),
      expect.objectContaining({ id_importacion: 9, qty_carreras: 100, qty_pasajeros: 80, afluencia: 400, km_comercial: 3200, paradas_estacion: 2600 }),
    ] });
  });

  it("omite una fecha existente y rechaza un cambio de configuración", async () => {
    db.datos_operativos.findMany.mockResolvedValue([{ fecha: new Date("2025-09-01T00:00:00Z") }]);
    const preview = await service.validar(input);
    expect(preview.resumen).toMatchObject({ listos: 1, duplicados: 1 });
    config.get.mockResolvedValue({ operacion: { kmPorCarrera: 34 } });
    await expect(service.importar(input, 1, 33.128331, 26)).rejects.toThrow("cambió");
    expect(db.datos_operativos.createMany).not.toHaveBeenCalled();
  });
});
