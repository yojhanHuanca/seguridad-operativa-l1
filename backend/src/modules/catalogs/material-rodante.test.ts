import { beforeEach, describe, expect, it, vi } from "vitest";
const mock = vi.hoisted(() => ({ names: vi.fn(), duplicate: vi.fn(), group: vi.fn(), create: vi.fn(), update: vi.fn(), detail: vi.fn(), references: vi.fn(), eventDetail: vi.fn() }));
vi.mock("./catalog.repository.js", () => ({ CatalogRepository: { countUnitReferences: mock.references, findGroup: mock.group, findDetalleByNombre: mock.duplicate, listNames: mock.names, createDetalle: mock.create, updateDetalle: mock.update, findDetalleById: mock.detail } }));
vi.mock("../../lib/prisma.js", () => ({ default: {} }));
vi.mock("../eventos/evento.repository.js", () => ({ EventoRepository: { findCatalogoDetalleById: mock.eventDetail } }));
import { CatalogService } from "./catalog.service.js";
import { validarMaterialRodante } from "../eventos/evento.service.js";
describe("Material rodante", () => {
  beforeEach(() => { vi.clearAllMocks(); mock.group.mockResolvedValue({ codigo: "NUMERO_MR" }); mock.names.mockResolvedValue([]); mock.duplicate.mockResolvedValue(null); });
  it.each(["ALSTOM", "ANSALDO", "AUXILIAR"])("persiste la clasificación explícita %s", async classification => {
    await CatalogService.createItem(1, "t045", classification);
    expect(mock.create).toHaveBeenCalledWith(1, "T45", classification);
  });
  it("exige clasificación y no deduce el fabricante por el código", async () => {
    await expect(CatalogService.createItem(1, "T45")).rejects.toThrow("Selecciona");
    expect(mock.create).not.toHaveBeenCalled();
  });
  it("rechaza códigos equivalentes aunque la unidad esté inactiva", async () => {
    mock.names.mockResolvedValue([{ id_detalle: 2, nombre: "T1" }]);
    await expect(CatalogService.createItem(1, "t001", "ALSTOM")).rejects.toThrow("Ya existe");
  });
  it("permite editar conservando el identificador", async () => {
    mock.detail.mockResolvedValue({ id_catalogo: 1 }); mock.names.mockResolvedValue([{ id_detalle: 2, nombre: "T1" }]);
    await CatalogService.updateItem(2, "T01", "ALSTOM");
    expect(mock.update).toHaveBeenCalledWith(2, "T1", "ALSTOM");
  });
  it("no cambia la clasificación de una unidad con historial", async () => {
    mock.detail.mockResolvedValue({ id_catalogo: 1, clasificacion_mr: "ANSALDO" });
    mock.references.mockResolvedValue(1);
    await expect(CatalogService.updateItem(2, "T1", "ALSTOM")).rejects.toThrow("coherencia del historial");
    expect(mock.update).not.toHaveBeenCalled();
  });
  it("no admite clasificación en otros catálogos", async () => {
    mock.group.mockResolvedValue({ codigo: "ESTACIONES" });
    await expect(CatalogService.createItem(1, "Estación", "ALSTOM")).rejects.toThrow("solo corresponde");
  });
  it("rechaza un nombre de auxiliar en un tren", async () => {
    await expect(CatalogService.createItem(1, "V-GRUA", "ANSALDO")).rejects.toThrow("código como");
  });
  it("impide combinar una unidad y otro fabricante", async () => {
    mock.eventDetail.mockImplementation(async id => id === 1 ? { nombre: "T45", estado: true, clasificacion_mr: "ANSALDO", catalogos: { nombre: "Nro. MR" } } : { nombre: "ALSTOM", estado: true, catalogos: { nombre: "Modelo MR" } });
    await expect(validarMaterialRodante(2, 1)).rejects.toThrow("no corresponde");
  });
  it("auxiliares usan el modelo no aplica", async () => {
    mock.eventDetail.mockImplementation(async id => id === 1 ? { nombre: "V-GRUA", estado: true, clasificacion_mr: "AUXILIAR", catalogos: { nombre: "Nro. MR" } } : { nombre: "N/A", estado: true, catalogos: { nombre: "Modelo MR" } });
    await expect(validarMaterialRodante(2, 1)).resolves.toBeUndefined();
  });
  it("bloquea unidades sin clasificar o desactivadas", async () => {
    mock.eventDetail.mockResolvedValue({ nombre: "T45", estado: true, clasificacion_mr: null, catalogos: { nombre: "Nro. MR" } });
    await expect(validarMaterialRodante(2, 1)).rejects.toThrow("no tiene clasificación");
    mock.eventDetail.mockResolvedValue({ nombre: "T45", estado: false, clasificacion_mr: "ALSTOM", catalogos: { nombre: "Nro. MR" } });
    await expect(validarMaterialRodante(2, 1)).rejects.toThrow("desactivada");
  });
});

