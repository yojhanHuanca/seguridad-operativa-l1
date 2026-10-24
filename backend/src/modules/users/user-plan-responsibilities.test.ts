import { describe, expect, it, vi } from "vitest";
import { assertChiefCanChangeAccess, pendingPlansForUser } from "./user-plan-responsibilities.js";

const chief = { roles: { nombre_rol: "Jefe de Área" }, id_rol: 3, id_area: 8, estado: "Activo" };
describe("responsabilidades antes de cambiar el acceso", () => {
  it.each([{ estado: "Inactivo" }, { id_rol: 5 }, { id_area: 9 }])("bloquea cambios con responsabilidades abiertas %j", async change => {
    const findMany = vi.fn().mockResolvedValue([{ id_plan: 1 }]);
    await expect(assertChiefCanChangeAccess({ planes_accion: { findMany } } as never, 2, chief, change)).rejects.toThrow(/Reasigna primero/);
  });
  it("no exige reasignar al editar datos personales ni consulta planes de otros roles", async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    await assertChiefCanChangeAccess({ planes_accion: { findMany } } as never, 2, chief, {});
    await assertChiefCanChangeAccess({ planes_accion: { findMany } } as never, 2, { ...chief, roles: { nombre_rol: "Monitorista" } }, { estado: "Inactivo" });
    expect(findMany).not.toHaveBeenCalled();
  });
  it("permite el cambio después de transferir todas las responsabilidades", async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    await expect(assertChiefCanChangeAccess({ planes_accion: { findMany } } as never, 2, chief, { estado: "Inactivo" })).resolves.toBeUndefined();
  });
  it("revisa planes y actividades propias y excluye el historial terminado", async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    await pendingPlansForUser({ planes_accion: { findMany } } as never, 22);
    const query = findMany.mock.calls[0]![0];
    expect(query.where.NOT.catalogo_detalle.nombre.in).toEqual(["Cerrado", "Rechazado"]);
    expect(query.where.OR[0]).toEqual({ responsable: 22 });
    expect(query.where.OR[1].actividades_plan.some.responsable).toBe(22);
    expect(query.select.actividades_plan.where.OR[1].catalogo_detalle.nombre.notIn).toContain("Completado");
  });
});
