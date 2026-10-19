import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../../lib/prisma.js", () => ({ default: {} }));
vi.mock("./users.repository.js", () => ({ UserRepository: { findAll: vi.fn(), findById: vi.fn(), findByEmail: vi.fn(), update: vi.fn(), createWithGeneratedCode: vi.fn() } }));
vi.mock("../roles/role.repository.js", () => ({ RoleRepository: { findById: vi.fn() } }));
vi.mock("../auth/auth.repository.js", () => ({ AuthRepository: { cerrarTodasLasSesiones: vi.fn() } }));
vi.mock("../../utils/bcrypt.js", () => ({ BcryptHelper: { hash: vi.fn() } }));
vi.mock("../auditoria/auditoria.service.js", () => ({ AuditoriaService: { registrar: vi.fn() }, diffCampos: vi.fn() }));
import { UsersService } from "./users.service.js";
import { UserRepository as repo } from "./users.repository.js";
import { RoleRepository } from "../roles/role.repository.js";
import { AuthRepository } from "../auth/auth.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { AuditoriaService } from "../auditoria/auditoria.service.js";
const current = { id_usuario: 5, nombre: "Ana", correo: "ana@example.invalid", id_rol: 2, id_area: null, estado: "Activo", roles: { nombre_rol: "Seguridad Operativa" }, password_hash: "hash-anterior", es_responsable: false, puede_reabrir_casos: false, puede_rechazar_reportes: false };
const body = { nombre: "Ana", correo: "ana@example.invalid", password: "segura123", id_rol: 2 };
beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(repo.findById).mockResolvedValue(current as never);
  vi.mocked(repo.update).mockResolvedValue(current as never);
  vi.mocked(repo.createWithGeneratedCode).mockResolvedValue(current as never);
  vi.mocked(BcryptHelper.hash).mockResolvedValue("hash-nuevo");
  vi.mocked(RoleRepository.findById).mockResolvedValue({ nombre_rol: "Seguridad Operativa" } as never);
});
describe("usuarios: cambios de acceso", () => {
  it.each([{ estado: "Inactivo" }, { id_rol: 3 }, { id_area: 9 }, { password: "nueva123" }, { puede_reabrir_casos: true }, { puede_rechazar_reportes: true }, { es_responsable: true }])("revoca sesiones ante cambios sensibles %j", async change => {
    await UsersService.updateUser(5, change);
    expect(AuthRepository.cerrarTodasLasSesiones).toHaveBeenCalledWith(5);
    expect(vi.mocked(AuthRepository.cerrarTodasLasSesiones).mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(repo.update).mock.invocationCallOrder[0]!);
  });
  it("editar el nombre conserva las sesiones y la contraseña", async () => {
    await UsersService.updateUser(5, { nombre: "Ana María", password: "" });
    expect(AuthRepository.cerrarTodasLasSesiones).not.toHaveBeenCalled();
    expect(BcryptHelper.hash).not.toHaveBeenCalled();
    expect(repo.update).toHaveBeenCalledWith(5, { nombre: "Ana María", id_area: null });
  });
  it("no guarda permisos si falla la revocación", async () => {
    vi.mocked(AuthRepository.cerrarTodasLasSesiones).mockRejectedValue(new Error("Fallo de conexión"));
    await expect(UsersService.updateUser(5, { puede_reabrir_casos: true })).rejects.toThrow();
    expect(repo.update).not.toHaveBeenCalled();
  });
  it("al salir de Seguridad Operativa elimina permisos especiales y área", async () => {
    vi.mocked(RoleRepository.findById).mockResolvedValue({ nombre_rol: "Monitorista" } as never);
    await UsersService.updateUser(5, { id_rol: 3, puede_reabrir_casos: true, id_area: 8 });
    expect(repo.update).toHaveBeenCalledWith(5, expect.objectContaining({ id_area: null, es_responsable: false, puede_reabrir_casos: false, puede_rechazar_reportes: false }));
  });
  it("un jefe debe tener área antes de guardar", async () => {
    vi.mocked(RoleRepository.findById).mockResolvedValue({ nombre_rol: "Jefe de Área" } as never);
    await expect(UsersService.updateUser(5, { id_rol: 3 })).rejects.toThrow(/área/);
    expect(repo.update).not.toHaveBeenCalled();
  });
  it("no admite correo duplicado al editar", async () => {
    vi.mocked(repo.findByEmail).mockResolvedValue({ id_usuario: 6 } as never);
    await expect(UsersService.updateUser(5, { correo: "otro@example.invalid" })).rejects.toThrow(/registrado/);
    expect(repo.update).not.toHaveBeenCalled();
  });
  it("no admite correo duplicado al crear", async () => {
    vi.mocked(repo.findByEmail).mockResolvedValue(current as never);
    await expect(UsersService.createUser(body)).rejects.toThrow(/registrado/);
    expect(repo.createWithGeneratedCode).not.toHaveBeenCalled();
  });
  it.each([{ password: "123" }, { correo: "invalido" }, { nombre: "a" }, { id_rol: -1 }])("no escribe usuarios inválidos %j", async invalid => {
    await expect(UsersService.createUser({ ...body, ...invalid })).rejects.toThrow();
    expect(repo.createWithGeneratedCode).not.toHaveBeenCalled();
  });
  it("audita la creación sin guardar contraseñas ni hashes en auditoría", async () => {
    await UsersService.createUser(body, { id_usuario: 1, correo: "admin@example.invalid", rol: 1, rol_nombre: "Admin" });
    const audit = vi.mocked(AuditoriaService.registrar).mock.calls[0]![0];
    expect(audit.despues).not.toHaveProperty("password_hash");
    expect(audit.despues).not.toHaveProperty("password");
  });
  it("aplica filtros y paginación válidos", async () => {
    await UsersService.getAllUsers({ search: "Ana", rol: "2", estado: "inactivo", page: "2", limit: "10" });
    expect(repo.findAll).toHaveBeenCalledWith(expect.objectContaining({ search: "Ana", rol: 2, estado: "inactivo", page: 2, limit: 10 }));
  });
});
