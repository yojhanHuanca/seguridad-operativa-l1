import { beforeEach, describe, expect, it, vi } from "vitest";

const mock = vi.hoisted(() => ({
  source: vi.fn(), destinations: vi.fn(), pending: vi.fn(), updatePlan: vi.fn(), updateActivities: vi.fn(),
  audit: vi.fn(), timeline: vi.fn(), notifications: vi.fn(), push: vi.fn(), email: vi.fn(),
}));

const tx = {
  usuarios: { findUnique: mock.source, findMany: mock.destinations },
  planes_accion: { updateMany: mock.updatePlan },
  actividades_plan: { updateMany: mock.updateActivities },
  auditoria: { create: mock.audit },
  timeline_caso: { create: mock.timeline },
  notificaciones: { createMany: mock.notifications },
};

vi.mock("../../lib/prisma.js", () => ({ default: { $transaction: (fn: (client: typeof tx) => unknown) => fn(tx) } }));
vi.mock("./user-plan-responsibilities.js", () => ({ pendingPlansForUser: mock.pending }));
vi.mock("../notifications/push.service.js", () => ({ PushService: { enviarAUsuarios: mock.push } }));
vi.mock("../../utils/mailer.js", () => ({ enviarCorreoPlanReasignado: mock.email }));
vi.mock("../../config/env.js", () => ({ env: { FRONTEND_URL: "https://example.test" } }));

import { UsersHandoverService } from "./users-handover.service.js";

const actor = { id_usuario: 1, nombre: "Administrador", correo: "admin@example.test", rol: 1, rol_nombre: "Admin", id_area: null };
const plan = {
  id_plan: 7, id_caso: 9, codigo_plan: "SOP-9-PLA-01", id_area: 100, responsable: 2,
  actividades_plan: [{ id_actividad: 12 }], casos_sop: { codigo_sop: "SOP-9" }, areas: { nombre_area: "Estaciones" },
};
const body = { planes: [7], asignaciones: [{ id_plan: 7, id_usuario: 3 }], motivo: "Cambio de responsable" };

beforeEach(() => {
  vi.clearAllMocks();
  mock.source.mockResolvedValue({ nombre: "Jefe anterior" });
  mock.pending.mockResolvedValue([plan]);
  mock.destinations.mockResolvedValue([{ id_usuario: 3, nombre: "Jefe nuevo", correo: "nuevo@example.test", id_area: 200 }]);
  mock.updatePlan.mockResolvedValue({ count: 1 });
  mock.updateActivities.mockResolvedValue({ count: 1 });
  mock.email.mockResolvedValue(undefined);
});

describe("reasignación de responsabilidades", () => {
  it("acepta un jefe de otra área y conserva el área original del plan", async () => {
    await expect(UsersHandoverService.reasignar(2, body, actor)).resolves.toEqual({ planes: 1, actividades: 1, pendientesRestantes: 0, correosEnviados: 1, correosFallidos: 0 });
    expect(mock.destinations).toHaveBeenCalledWith(expect.objectContaining({
      where: { id_usuario: { in: [3] }, estado: "Activo", roles: { nombre_rol: "Jefe de Área" } },
    }));
    expect(mock.updatePlan).toHaveBeenCalledWith(expect.objectContaining({
      where: { id_plan: 7, responsable: 2 }, data: expect.objectContaining({ responsable: 3 }),
    }));
    expect(mock.updateActivities).toHaveBeenCalledWith(expect.objectContaining({
      where: { id_actividad: { in: [12] }, responsable: 2 }, data: { responsable: 3 },
    }));
    expect(mock.email).toHaveBeenCalledWith(expect.objectContaining({
      destino: "nuevo@example.test", codigoPlan: plan.codigo_plan,
      url: "https://example.test/jefe/planes/SOP-9?plan=7",
    }));
  });

  it("permite seleccionar solo un plan y conserva otro con el jefe original", async () => {
    mock.pending.mockResolvedValue([plan, { ...plan, id_plan: 8, codigo_plan: "SOP-9-PLA-02", actividades_plan: [] }]);
    await expect(UsersHandoverService.reasignar(2, body, actor)).resolves.toEqual({ planes: 1, actividades: 1, pendientesRestantes: 1, correosEnviados: 1, correosFallidos: 0 });
    expect(mock.updatePlan).toHaveBeenCalledTimes(1);
    expect(mock.updatePlan).toHaveBeenCalledWith(expect.objectContaining({ where: { id_plan: 7, responsable: 2 } }));
  });

  it("reasigna todos los planes seleccionados a un mismo jefe y avisa por cada plan", async () => {
    mock.pending.mockResolvedValue([plan, { ...plan, id_plan: 8, codigo_plan: "SOP-9-PLA-02", actividades_plan: [] }]);
    await expect(UsersHandoverService.reasignar(2, {
      ...body, planes: [7, 8], asignaciones: [{ id_plan: 7, id_usuario: 3 }, { id_plan: 8, id_usuario: 3 }],
    }, actor)).resolves.toEqual({ planes: 2, actividades: 1, pendientesRestantes: 0, correosEnviados: 2, correosFallidos: 0 });
    expect(mock.updatePlan).toHaveBeenCalledTimes(2);
    expect(mock.email).toHaveBeenCalledTimes(2);
  });

  it("informa un fallo de correo sin deshacer la reasignación confirmada", async () => {
    mock.email.mockRejectedValue(new Error("SMTP no disponible"));
    await expect(UsersHandoverService.reasignar(2, body, actor)).resolves.toEqual({ planes: 1, actividades: 1, pendientesRestantes: 0, correosEnviados: 0, correosFallidos: 1 });
    expect(mock.notifications).toHaveBeenCalled();
  });

  it("rechaza un destino que no cumpla el filtro de jefe activo", async () => {
    mock.destinations.mockResolvedValue([]);
    await expect(UsersHandoverService.reasignar(2, body, actor)).rejects.toThrow("Jefe de Área activo");
    expect(mock.updatePlan).not.toHaveBeenCalled();
    expect(mock.notifications).not.toHaveBeenCalled();
  });
});
