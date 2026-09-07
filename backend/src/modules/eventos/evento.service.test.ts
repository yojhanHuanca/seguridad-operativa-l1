import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/prisma.js", () => ({ default: {} }));

const findByAsignadoMock = vi.fn().mockResolvedValue([]);
vi.mock("./evento.repository.js", () => ({
  EventoRepository: { findByAsignado: findByAsignadoMock },
}));
vi.mock("../users/users.repository.js", () => ({ UserRepository: {} }));
vi.mock("../notifications/notification.repository.js", () => ({ NotificationRepository: {} }));
vi.mock("../auditoria/auditoria.service.js", () => ({ AuditoriaService: { registrar: vi.fn() } }));

const { EventoService } = await import("./evento.service.js");

import type { Actor } from "../../utils/actor.js";

const SO: Actor = { id_usuario: 10, correo: "so@x.pe", rol: 2, rol_nombre: "Seguridad Operativa" };
const ADMIN: Actor = { id_usuario: 1, correo: "admin@x.pe", rol: 1, rol_nombre: "Admin" };

describe("EventoService.getAsignados", () => {
  it("a un rol normal (SO) le devuelve SU PROPIA bandeja, aunque el id de la ruta pida la de otro", async () => {
    findByAsignadoMock.mockClear();
    await EventoService.getAsignados(999, SO);
    // El id de la ruta (999) se ignora: solo importa quién está autenticado.
    expect(findByAsignadoMock).toHaveBeenCalledWith(SO.id_usuario);
  });

  it("a un rol normal sin id propio en el token, cae al id de la ruta como respaldo", async () => {
    findByAsignadoMock.mockClear();
    const sinId = { ...SO, id_usuario: undefined } as unknown as Actor;
    await EventoService.getAsignados(999, sinId);
    expect(findByAsignadoMock).toHaveBeenCalledWith(999);
  });

  it("al Admin sí le respeta el id de la ruta: puede ver la bandeja de cualquiera", async () => {
    findByAsignadoMock.mockClear();
    await EventoService.getAsignados(999, ADMIN);
    expect(findByAsignadoMock).toHaveBeenCalledWith(999);
  });

  it("sin actor autenticado, usa el id de la ruta (no hay sesión de la que respaldarse)", async () => {
    findByAsignadoMock.mockClear();
    await EventoService.getAsignados(999, undefined);
    expect(findByAsignadoMock).toHaveBeenCalledWith(999);
  });
});
