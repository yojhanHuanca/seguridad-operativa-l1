import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../../lib/prisma.js", () => ({ default: {} }));
vi.mock("./evento.repository.js", () => ({ EventoRepository: { create: vi.fn(), update: vi.fn(), findById: vi.fn(), findAll: vi.fn(), findCatalogoDetalleById: vi.fn(), asignar: vi.fn() } }));
vi.mock("../users/users.repository.js", () => ({ UserRepository: { findById: vi.fn() } }));
vi.mock("../notifications/notification.repository.js", () => ({ NotificationRepository: { emitir: vi.fn() } }));
vi.mock("../auditoria/auditoria.service.js", () => ({ AuditoriaService: { registrar: vi.fn() } }));
import { EventoService } from "./evento.service.js";
import { EventoRepository as repo } from "./evento.repository.js";
import { UserRepository } from "../users/users.repository.js";
import { NotificationRepository } from "../notifications/notification.repository.js";
const body = { fecha: "2026-10-05", hora: "09:30", id_tipo_incidente: 1 };
beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(repo.findCatalogoDetalleById).mockResolvedValue({ nombre: "Incidente", catalogos: { nombre: "Tipo de incidente operativo" } } as never);
  vi.mocked(repo.findById).mockResolvedValue({ id_evento: 5, estado: "Registrado", asignado_a: null } as never);
  vi.mocked(repo.create).mockResolvedValue({ id_evento: 5 } as never);
  vi.mocked(UserRepository.findById).mockResolvedValue({ id_usuario: 9, nombre: "SO", estado: "Activo", roles: { nombre_rol: "Seguridad Operativa" } } as never);
});
describe("eventos: registro, edición y asignación", () => {
  it.each([{ fecha: "2026-02-30" }, { hora: "25:90" }, { demora: -1 }, { demora: 100000000 }, { id_tipo_incidente: 0 }])("rechaza datos inválidos sin guardar %j", async invalid => {
    await expect(EventoService.createEvento({ ...body, ...invalid })).rejects.toThrow();
    expect(repo.create).not.toHaveBeenCalled();
  });
  it("no permite catálogos cruzados", async () => {
    await expect(EventoService.createEvento({ ...body, id_ubicacion: 1 })).rejects.toThrow(/no pertenece/);
    expect(repo.create).not.toHaveBeenCalled();
  });
  it("no permite referencias inexistentes", async () => {
    vi.mocked(repo.findCatalogoDetalleById).mockResolvedValue(null);
    await expect(EventoService.createEvento(body)).rejects.toThrow(/no existe/);
  });
  it("no permite editar un evento inexistente", async () => {
    vi.mocked(repo.findById).mockResolvedValue(null);
    await expect(EventoService.updateEvento(5, { descripcion: "Corrección" })).rejects.toThrow(/no encontrado/);
    expect(repo.update).not.toHaveBeenCalled();
  });
  it("conserva filtros de estado, fechas y paginación", async () => {
    await EventoService.getAllEventos({ estado: "Cerrado", search: "tren", desde: "2026-01-01", hasta: "2026-10-05", page: "2", limit: "10" });
    expect(repo.findAll).toHaveBeenCalledWith(expect.objectContaining({ estado: "Cerrado", search: "tren", page: 2, limit: 10 }));
  });
  it("rechaza reasignar un evento ya asignado", async () => {
    vi.mocked(repo.findById).mockResolvedValue({ asignado_a: 8 } as never);
    await expect(EventoService.asignarEvento(5, { id_usuario: 9 })).rejects.toThrow(/una vez/);
    expect(repo.asignar).not.toHaveBeenCalled();
  });
  it.each(["Monitorista", "Jefe de Área"])("no asigna eventos a %s", async rol => {
    vi.mocked(UserRepository.findById).mockResolvedValue({ nombre: "Usuario", estado: "Activo", roles: { nombre_rol: rol } } as never);
    await expect(EventoService.asignarEvento(5, { id_usuario: 9 })).rejects.toThrow(/rol/);
    expect(NotificationRepository.emitir).not.toHaveBeenCalled();
  });
  it("no asigna ni notifica a una cuenta inactiva", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue({ nombre: "SO", estado: "Inactivo", roles: { nombre_rol: "Seguridad Operativa" } } as never);
    await expect(EventoService.asignarEvento(5, { id_usuario: 9 })).rejects.toThrow(/inactiv/i);
    expect(repo.asignar).not.toHaveBeenCalled();
    expect(NotificationRepository.emitir).not.toHaveBeenCalled();
  });
  it("asigna al destinatario activo y pone el evento en investigación", async () => {
    await EventoService.asignarEvento(5, { id_usuario: 9 });
    expect(repo.asignar).toHaveBeenCalledWith(5, 9);
    expect(repo.update).toHaveBeenCalledWith(5, { estado: "En investigación" });
  });
});
