import { describe, it, expect, vi } from "vitest";

const { findMany, count, actores } = vi.hoisted(() => ({ findMany: vi.fn().mockResolvedValue([]), count: vi.fn().mockResolvedValue(0), actores: vi.fn().mockResolvedValue([]) }));
vi.mock("../../lib/prisma.js", () => ({ default: { auditoria: { findMany, count }, usuarios: { findMany: actores } } }));
const { AuditoriaRepository } = await import("./auditoria.repository.js");

describe("consultas de auditoría", () => {
  it("comparte filtros e incluye hasta el último instante del día de Lima", async () => {
    const filters = { usuario: 7, tabla: "usuarios", accion: "editar" as const, desde: "2026-09-01", hasta: "2026-09-01" };
    await AuditoriaRepository.findAll({ ...filters, page: 2, limit: 30 });
    const list = findMany.mock.lastCall![0];
    expect(list.where).toEqual({ usuario: 7, tabla_afectada: "usuarios", accion: "editar", fecha: { gte: new Date("2026-09-01T05:00:00Z"), lt: new Date("2026-09-02T05:00:00Z") } });
    expect(list.skip).toBe(30);
    await AuditoriaRepository.findParaExportar(filters);
    const exported = findMany.mock.lastCall![0];
    expect(exported.where).toEqual(list.where);
    expect(exported.skip).toBeUndefined();
    expect(exported.take).toBe(20001);
  });
  it("obtiene actores reales sin excluir usuarios inactivos", async () => {
    await AuditoriaRepository.findActores();
    expect(actores.mock.lastCall![0].where).toEqual({ auditoria: { some: {} } });
  });
});
