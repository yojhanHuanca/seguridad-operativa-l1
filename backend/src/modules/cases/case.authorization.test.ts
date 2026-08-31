import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../../lib/prisma.js", () => ({ default: {} }));

import type { Actor } from "../../utils/actor.js";
import { CaseRepository } from "./case.repository.js";
import { CaseService, PlanAjenoError } from "./case.service.js";

const jefe: Actor = {
  id_usuario: 10,
  correo: "jefe.area@unna.com.pe",
  rol: 3,
  rol_nombre: "Jefe de Área",
  id_area: 100,
  nombre: "Jefe Área 100",
};

const admin: Actor = {
  id_usuario: 1,
  correo: "admin@unna.com.pe",
  rol: 1,
  rol_nombre: "Admin",
  id_area: null,
  nombre: "Administrador",
};

function planAjeno(estado: "Plan de Acción" | "Ejecución") {
  return {
    id_plan: 77,
    id_caso: 9,
    id_area: 200,
    responsable: 20,
    codigo_plan: "SOP 9-2026-PLA-01",
    casos_sop: {
      codigo_sop: "SOP 9-2026",
      catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: estado },
    },
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("autorización de planes por idPlan", () => {
  it("impide que un Jefe acepte un plan de otra área", async () => {
    vi.spyOn(CaseRepository, "findPlanContexto").mockResolvedValue(planAjeno("Plan de Acción"));
    const aceptar = vi.spyOn(CaseRepository, "acceptPlanById");

    await expect(CaseService.acceptPlanById("77", {}, jefe)).rejects.toBeInstanceOf(PlanAjenoError);
    expect(aceptar).not.toHaveBeenCalled();
  });

  it("impide que un Jefe cierre un plan de otra área", async () => {
    vi.spyOn(CaseRepository, "findPlanContexto").mockResolvedValue(planAjeno("Ejecución"));
    const completar = vi.spyOn(CaseRepository, "completeExecutionByPlan");

    await expect(
      CaseService.completeExecutionByPlan("77", { descripcion: "Cierre documentado del plan" }, jefe)
    ).rejects.toBeInstanceOf(PlanAjenoError);
    expect(completar).not.toHaveBeenCalled();
  });

  it("permite que el Admin acepte cualquier plan", async () => {
    const plan = planAjeno("Plan de Acción");
    vi.spyOn(CaseRepository, "findPlanContexto").mockResolvedValue(plan);
    // El mock solo necesita devolver un valor identificable para el `toBe` de
    // abajo; no hace falta el objeto `planes_accion` completo que devuelve
    // Prisma en producción.
    vi.spyOn(CaseRepository, "acceptPlanById").mockResolvedValue(plan as never);

    await expect(CaseService.acceptPlanById("77", {}, admin)).resolves.toBe(plan);
  });

  it("permite que el Admin cierre cualquier plan", async () => {
    const plan = planAjeno("Ejecución");
    vi.spyOn(CaseRepository, "findPlanContexto").mockResolvedValue(plan);
    vi.spyOn(CaseRepository, "completeExecutionByPlan").mockResolvedValue(plan as never);

    await expect(
      CaseService.completeExecutionByPlan("77", { descripcion: "Cierre documentado del plan" }, admin)
    ).resolves.toBe(plan);
  });
});

describe("visibilidad de planes", () => {
  it("filtra al Jefe por su área y deja el listado global al Admin", async () => {
    const listar = vi.spyOn(CaseRepository, "findPlansByArea").mockResolvedValue([]);

    await CaseService.listPlans({}, jefe);
    expect(listar).toHaveBeenLastCalledWith({ id_area: 100 });

    await CaseService.listPlans({}, admin);
    expect(listar).toHaveBeenLastCalledWith({});
  });
});
