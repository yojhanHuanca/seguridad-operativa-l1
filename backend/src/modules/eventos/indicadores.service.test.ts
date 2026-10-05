import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => {
  const tx = { indicadores: { findFirst: vi.fn(), create: vi.fn() }, historial_indicadores: { findMany: vi.fn(), create: vi.fn(), update: vi.fn(), deleteMany: vi.fn() } };
  return { tx, transaction: vi.fn(), indicadores: { findFirst: vi.fn() }, historial_indicadores: { findMany: vi.fn() }, datos_operativos: { findMany: vi.fn() }, metas_indicadores: { findFirst: vi.fn() }, eventos_monitoreo: { findMany: vi.fn() } };
});
vi.mock("../../lib/prisma.js", () => ({ default: { ...mocks, $transaction: mocks.transaction } }));
import { IndicadoresEventosService as service } from "./indicadores.service.js";
beforeEach(() => {
  vi.resetAllMocks();
  mocks.transaction.mockImplementation(async callback => callback(mocks.tx));
  mocks.tx.indicadores.findFirst.mockResolvedValue({ id_indicador: 1 });
  mocks.tx.historial_indicadores.findMany.mockResolvedValue([]);
  mocks.indicadores.findFirst.mockResolvedValue({ id_indicador: 1 });
  mocks.historial_indicadores.findMany.mockResolvedValue([{ fecha: new Date("2026-10-01Z"), valor: 1_000_000 }]);
  mocks.datos_operativos.findMany.mockResolvedValue([]);
  mocks.metas_indicadores.findFirst.mockResolvedValue(null);
  mocks.eventos_monitoreo.findMany.mockResolvedValue([]);
});
describe("indicadores: guardado y cálculo", () => {
  it.each([{ anio: 1999 }, { mes: 13 }, { mes: 0 }, { kmComercial: -1 }, { afluenciaPasajeros: "abc" }])("rechaza valores inválidos sin abrir transacción %j", async invalid => {
    await expect(service.guardarDatosMes({ anio: 2026, mes: 10, kmComercial: 100, afluenciaPasajeros: 200, ...invalid })).rejects.toThrow();
    expect(mocks.transaction).not.toHaveBeenCalled();
  });
  it("guarda ambos divisores con el cliente de la misma transacción", async () => {
    await service.guardarDatosMes({ anio: 2026, mes: 10, kmComercial: 12.345, afluenciaPasajeros: 0 });
    expect(mocks.tx.historial_indicadores.create).toHaveBeenCalledTimes(2);
    expect(mocks.tx.historial_indicadores.create.mock.calls[0]![0].data.valor).toBe(12.35);
    expect(mocks.tx.historial_indicadores.create.mock.calls[1]![0].data.valor).toBe(0);
    expect(mocks.indicadores.findFirst).not.toHaveBeenCalled();
  });
  it("propaga un fallo del segundo divisor al límite de transacción", async () => {
    mocks.tx.historial_indicadores.create.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error("Fallo del segundo divisor"));
    await expect(service.guardarDatosMes({ anio: 2026, mes: 10, kmComercial: 100, afluenciaPasajeros: 200 })).rejects.toThrow(/segundo divisor/);
    expect(mocks.transaction).toHaveBeenCalledTimes(1);
  });
  it("actualiza el valor mensual y elimina duplicados dentro de la transacción", async () => {
    mocks.tx.historial_indicadores.findMany.mockResolvedValue([{ id_historial: 5 }, { id_historial: 6 }]);
    await service.guardarDatosMes({ anio: 2026, mes: 10, kmComercial: 100, afluenciaPasajeros: 200 });
    expect(mocks.tx.historial_indicadores.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id_historial: 5 } }));
    expect(mocks.tx.historial_indicadores.deleteMany).toHaveBeenCalledWith({ where: { id_historial: { in: [6] } } });
  });
  it("calcula eventos e índices con denominador conocido", async () => {
    mocks.eventos_monitoreo.findMany.mockResolvedValue(["NO ABRE PUERTAS", "NO PARA EN ESTACIÓN", "OTRO"].map(nombre => ({ fecha: new Date("2026-10-05Z"), catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: { nombre } })));
    const result = await service.calcular({ anio: "2026", mes: "10" });
    expect(result.totalEventos).toEqual({ mes: 3, anual: 3 });
    expect(result.erroresOperativos).toEqual({ mes: 2, anual: 2 });
    expect(result.indiceErrores.valor).toBe(2);
  });
  it("los datos diarios reemplazan el divisor mensual sin sumarlo dos veces", async () => {
    mocks.datos_operativos.findMany.mockResolvedValue([{ fecha: new Date("2026-10-05Z"), km_comercial: 2_000_000, qty_pasajeros: 3_000_000 }]);
    mocks.eventos_monitoreo.findMany.mockResolvedValue([{ fecha: new Date("2026-10-05Z"), catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: { nombre: "NO ABRE PUERTAS" } }]);
    const result = await service.calcular({ anio: "2026", mes: "10" });
    expect(result.datosMes.kmComercial).toBe(2_000_000);
    expect(result.indiceErrores.valor).toBe(0.5);
  });
  it("sin divisor no presenta un índice falso de cero", async () => {
    mocks.historial_indicadores.findMany.mockResolvedValue([]);
    const result = await service.calcular({ anio: "2026", mes: "10" });
    expect(result.indiceErrores.valor).toBeNull();
  });
});
