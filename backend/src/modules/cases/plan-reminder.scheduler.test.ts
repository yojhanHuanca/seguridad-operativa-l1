import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  planFindMany: vi.fn(),
  reminderCreateMany: vi.fn(),
  reminderFindMany: vi.fn(),
  reminderUpdateMany: vi.fn(),
  reminderUpdate: vi.fn(),
  transaction: vi.fn(),
  notificationCreate: vi.fn(),
  push: vi.fn(),
  sendEmail: vi.fn(),
}));

vi.mock("../../lib/prisma.js", () => ({
  default: {
    $transaction: mocks.transaction,
    notificaciones: { create: mocks.notificationCreate },
    planes_accion: { findMany: mocks.planFindMany },
    plan_recordatorios: {
      createMany: mocks.reminderCreateMany,
      findMany: mocks.reminderFindMany,
      updateMany: mocks.reminderUpdateMany,
      update: mocks.reminderUpdate,
    },
  },
}));
vi.mock("../../utils/mailer.js", () => ({ enviarCorreoRecordatorioPlan: mocks.sendEmail }));
vi.mock("../notifications/push.service.js", () => ({ PushService: { enviarAUsuarios: mocks.push } }));
vi.mock("../../utils/logger.js", () => ({ default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock("../../config/env.js", () => ({ env: { FRONTEND_URL: "https://sigma.example" } }));

import { procesarRecordatoriosPlanes } from "./plan-reminder.scheduler.js";

const fecha = (day: number) => new Date(Date.UTC(2026, 10, day));
const plan = (id: number, dueDay: number, estado = "En ejecución") => ({
  id_plan: id,
  codigo_plan: `PLAN-${id}`,
  descripcion: `Descripción ${id}`,
  fecha_plan: fecha(dueDay),
  fecha_reprogramada: null,
  actividades_plan: [],
  catalogo_detalle: { nombre: estado },
  usuarios: { id_usuario: id, correo: `responsable${id}@example.test`, nombre: `Responsable ${id}` },
  casos_sop: { codigo_sop: `SOP-${id}` },
});

describe("recordatorios de vencimiento de planes", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-04T12:00:00.000Z"));
    mocks.planFindMany.mockReset();
    mocks.reminderCreateMany.mockReset().mockResolvedValue({ count: 3 });
    mocks.reminderFindMany.mockReset().mockResolvedValue([]);
    mocks.reminderUpdateMany.mockReset();
    mocks.reminderUpdate.mockReset();
    mocks.transaction.mockReset().mockImplementation(async callback => callback({
      plan_recordatorios: { updateMany: mocks.reminderUpdateMany },
      notificaciones: { create: mocks.notificationCreate },
    }));
    mocks.notificationCreate.mockReset().mockResolvedValue({});
    mocks.push.mockReset().mockResolvedValue(undefined);
    mocks.sendEmail.mockReset().mockResolvedValue(undefined);
  });

  it("registra los hitos de 5, 3 y 1 día e ignora planes ya cerrados", async () => {
    mocks.planFindMany.mockResolvedValueOnce([
      plan(1, 9),
      plan(2, 7),
      plan(3, 5),
      plan(4, 9, "Cerrado"),
    ]).mockResolvedValueOnce([]);

    await procesarRecordatoriosPlanes();

    expect(mocks.reminderCreateMany).toHaveBeenCalledWith({
      data: [
        { id_plan: 1, dias_antes: 5, fecha_limite: fecha(9) },
        { id_plan: 2, dias_antes: 3, fecha_limite: fecha(7) },
        { id_plan: 3, dias_antes: 1, fecha_limite: fecha(5) },
      ],
      skipDuplicates: true,
    });
    expect(mocks.sendEmail).not.toHaveBeenCalled();
  });

  it("envía y marca el recordatorio una sola vez para el responsable", async () => {
    const recordPlan = plan(12, 9);
    mocks.planFindMany.mockResolvedValueOnce([]);
    mocks.reminderFindMany.mockResolvedValueOnce([{
      id_recordatorio: 51,
      id_plan: 12,
      dias_antes: 5,
      fecha_limite: fecha(9),
      plan: recordPlan,
    }]);
    mocks.reminderUpdateMany.mockResolvedValue({ count: 1 });
    mocks.reminderUpdate.mockResolvedValue({});

    await procesarRecordatoriosPlanes();

    expect(mocks.sendEmail).toHaveBeenCalledWith(expect.objectContaining({
      destino: "responsable12@example.test",
      codigoPlan: "PLAN-12",
      diasRestantes: 5,
      fechaLimite: fecha(9),
      url: "https://sigma.example/jefe/planes/SOP-12?plan=12",
    }));
    expect(mocks.notificationCreate).toHaveBeenCalledWith({ data: expect.objectContaining({ usuario: 12, tipo: "plan_por_vencer" }) });
    expect(mocks.push).toHaveBeenCalledWith([12], expect.objectContaining({ title: expect.stringContaining("PLAN-12") }));
    expect(mocks.reminderUpdate).toHaveBeenCalledWith(expect.objectContaining({
      where: { id_recordatorio: 51 },
      data: expect.objectContaining({ estado: "enviado", sent_at: expect.any(Date) }),
    }));
  });

  it("restablece el aviso a pendiente cuando el proveedor de correo falla", async () => {
    mocks.planFindMany.mockResolvedValueOnce([]);
    mocks.reminderFindMany.mockResolvedValueOnce([{
      id_recordatorio: 77,
      dias_antes: 3,
      fecha_limite: fecha(7),
      plan: plan(7, 7),
    }]);
    mocks.reminderUpdateMany.mockResolvedValue({ count: 1 });
    mocks.sendEmail.mockRejectedValueOnce(new Error("Proveedor no disponible"));
    mocks.reminderUpdate.mockResolvedValue({});

    await procesarRecordatoriosPlanes();

    expect(mocks.notificationCreate).toHaveBeenCalledTimes(1);
    expect(mocks.push).toHaveBeenCalledTimes(1);
    expect(mocks.reminderUpdate).toHaveBeenCalledWith({
      where: { id_recordatorio: 77 },
      data: { estado: "pendiente", claimed_at: null },
    });
  });

  it("no duplica el aviso al reintentar un correo fallido", async () => {
    mocks.planFindMany.mockResolvedValue([]);
    mocks.reminderFindMany.mockResolvedValue([{
      id_recordatorio: 77,
      dias_antes: 3,
      fecha_limite: fecha(7),
      plan: plan(7, 7),
    }]);
    mocks.reminderUpdateMany.mockResolvedValueOnce({ count: 1 }).mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 1 }).mockResolvedValueOnce({ count: 0 });
    mocks.sendEmail.mockRejectedValueOnce(new Error("Proveedor no disponible"));
    mocks.reminderUpdate.mockResolvedValue({});

    await procesarRecordatoriosPlanes();
    await procesarRecordatoriosPlanes();

    expect(mocks.notificationCreate).toHaveBeenCalledTimes(1);
    expect(mocks.push).toHaveBeenCalledTimes(1);
    expect(mocks.sendEmail).toHaveBeenCalledTimes(2);
  });
});
