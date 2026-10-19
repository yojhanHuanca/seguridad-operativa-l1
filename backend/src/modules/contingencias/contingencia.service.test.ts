import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../../lib/prisma.js", () => ({ default: {} }));
vi.mock("./contingencia.repository.js", () => ({ ContingenciaRepository: { findAll: vi.fn(), findById: vi.fn(), findCatalogos: vi.fn(), create: vi.fn(), update: vi.fn(), remove: vi.fn() } }));
vi.mock("../auditoria/auditoria.service.js", () => ({ AuditoriaService: { registrar: vi.fn() } }));
import { ContingenciaService as service } from "./contingencia.service.js";
import { ContingenciaRepository as repo } from "./contingencia.repository.js";
const now = new Date("2026-10-05T09:30:00Z");
const row = { id_evento: 5, fecha: now, hora_reporte: now, hora_termino_ae: null, created_at: now, updated_at: now, atencion: null, traslado: null, persona: null };
beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(repo.findAll).mockResolvedValue({ items: [row], total: 1 } as never);
  vi.mocked(repo.findById).mockResolvedValue(row as never);
  vi.mocked(repo.findCatalogos).mockResolvedValue([]);
});
describe("contingencias: filtros, datos y tiempos", () => {
  it.each([{ page: "0" }, { page: "1.5" }, { limit: "101" }, { limit: "0" }, { desde: "2026-02-30" }, { hasta: "ayer" }, { desde: "2026-10-05", hasta: "2026-01-01" }])("rechaza consultas inválidas %j", async query => {
    await expect(service.list(query)).rejects.toThrow();
    expect(repo.findAll).not.toHaveBeenCalled();
  });
  it("aplica límites, estado, fechas y orden sin perder el total", async () => {
    const result = await service.list({ page: "2", limit: "10", estado: "Cerrado", desde: "2026-01-01", hasta: "2026-10-05", sortBy: "estado", sortDir: "asc" });
    expect(result.total).toBe(1);
    expect(repo.findAll).toHaveBeenCalledWith(expect.objectContaining({ page: 2, limit: 10, estado: "Cerrado", sortBy: "estado", sortDir: "asc" }));
    expect(result.items[0]).toMatchObject({ fecha: "2026-10-05", hora_reporte: "09:30" });
  });
  it.each([0, -1, "abc", 1.5])("rechaza ids inválidos %s", async id => {
    await expect(service.getById(id)).rejects.toThrow(/válido/);
    expect(repo.findById).not.toHaveBeenCalled();
  });
  it("no consulta un evento inexistente", async () => {
    vi.mocked(repo.findById).mockResolvedValue(null);
    await expect(service.getById(5)).rejects.toThrow(/no encontrado/);
  });
  it("calcula tiempos de respuesta y evacuación sin cambiar la fecha", async () => {
    const time = (hour: string) => new Date(`1970-01-01T${hour}:00Z`);
    vi.mocked(repo.findById).mockResolvedValue({ ...row, atencion: { hora_llamado_pco_sppa: time("09:00"), hora_llegada_spaa: time("09:12") }, traslado: { hora_llamado_ambulancia: time("09:15"), hora_llegada_estacion: time("09:35"), hora_salida_centro_salud: time("10:00") } } as never);
    const result = await service.getById(5);
    expect(result.atencion?.tiempo_respuesta_spaa_minutos).toBe(12);
    expect(result.traslado?.tiempo_llegada_ambulancia_minutos).toBe(20);
    expect(result.traslado?.tiempo_evacuacion_minutos).toBe(25);
  });
  it.each([{ fecha: "2026-02-30" }, { hora_reporte: "25:60" }, { edad: -1 }])("rechaza registros inválidos %j", async invalid => {
    await expect(service.create({ fecha: "2026-10-05", hora_reporte: "09:30", tipo_evento: "Evento", lugar_evento: "VES", lugar_exacto_evento: "Exteriores", quien_reporta: "PCO", ...invalid })).rejects.toThrow();
    expect(repo.create).not.toHaveBeenCalled();
  });
});
