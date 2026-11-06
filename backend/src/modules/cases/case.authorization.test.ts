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
  it("incluye el área del Jefe y los planes asignados directamente de otras áreas", async () => {
    const listar = vi.spyOn(CaseRepository, "findPlansByArea").mockResolvedValue({ data: [], total: undefined });

    await CaseService.listPlans({}, jefe);
    expect(listar).toHaveBeenLastCalledWith({ id_area: 100, id_responsable: 10 });

    await CaseService.listPlans({}, admin);
    expect(listar).toHaveBeenLastCalledWith({});
  });

  it("permite al Jefe operar un plan de otra área si es el responsable asignado", async () => {
    const plan = { ...planAjeno("Plan de Acción"), responsable: jefe.id_usuario };
    vi.spyOn(CaseRepository, "findPlanContexto").mockResolvedValue(plan);
    const aceptar = vi.spyOn(CaseRepository, "acceptPlanById").mockResolvedValue(plan as never);

    await expect(CaseService.acceptPlanById("77", {}, jefe)).resolves.toBe(plan);
    expect(aceptar).toHaveBeenCalled();
  });

  it("permite actualizar una actividad propia de un plan de otra área", async () => {
    const plan = { ...planAjeno("Ejecución"), responsable_actividad: jefe.id_usuario };
    vi.spyOn(CaseRepository, "findActividadContexto").mockResolvedValue(plan);
    const actualizar = vi.spyOn(CaseRepository, "updateActivity").mockResolvedValue(plan as never);

    await expect(CaseService.updateActivity("12", { estado: "En progreso" }, jefe)).resolves.toBe(plan);
    expect(actualizar).toHaveBeenCalled();
  });
});

describe("transiciones condicionales del SOP", () => {
  it("pasa al repositorio el estado observado para que la transacción descarte cambios simultáneos", async () => {
    vi.spyOn(CaseRepository, "findBasicByCodigo").mockResolvedValue({
      id_caso: 9,
      codigo_sop: "SOP 9-2026",
      catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { id_detalle: 41, nombre: "Recepción" },
    } as never);
    const aprobar = vi.spyOn(CaseRepository, "approve").mockResolvedValue({ id_caso: 9 } as never);

    await CaseService.approve("SOP 9-2026", admin);

    expect(aprobar).toHaveBeenCalledWith(9, 41, "Administrador");
  });
});
