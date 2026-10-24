import { beforeEach, describe, expect, it, vi } from "vitest";
const db = vi.hoisted(() => ({
  areas: { findMany: vi.fn() }, roles: { findMany: vi.fn() }, usuarios: { findMany: vi.fn() },
  auditoria: { createMany: vi.fn() }, $transaction: vi.fn(),
}));
vi.mock("../../lib/prisma.js", () => ({ default: db }));
vi.mock("../../utils/bcrypt.js", () => ({ BcryptHelper: { hash: vi.fn(async () => "hash-secreto") } }));
vi.mock("./users.repository.js", () => ({ UserRepository: { createWithGeneratedCode: vi.fn() } }));
import { UserRepository } from "./users.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { UsersImportService } from "./users-import.service.js";

const actor = { id_usuario: 1, correo: "admin@example.invalid", rol: 1, rol_nombre: "Admin" };
const input = () => ({
  filename: "usuarios.xlsx", hoja: "Personal",
  rows: [{ row: 2, nombre: "Persona de prueba", cargo: "Analista", unidad_organizativa: "Unidad A", correo: "persona@example.invalid", telefono: "", jefe_inmediato: "Responsable de unidad", id_rol: 4 }],
  areas: [{ unidad_organizativa: "Unidad A", id_area: 10 }],
});

beforeEach(() => {
  vi.clearAllMocks();
  db.areas.findMany.mockResolvedValue([{ id_area: 10, nombre_area: "Operaciones" }]);
  db.roles.findMany.mockResolvedValue([
    { id_rol: 1, nombre_rol: "Admin" }, { id_rol: 2, nombre_rol: "Monitorista" },
    { id_rol: 3, nombre_rol: "Reportante" }, { id_rol: 4, nombre_rol: "Jefe de Área" },
    { id_rol: 5, nombre_rol: "Seguridad Operativa" }, { id_rol: 6, nombre_rol: "Gestión de Planes de Contingencia" },
  ]);
  db.usuarios.findMany.mockReset().mockResolvedValue([]);
  db.$transaction.mockImplementation(async callback => callback(db));
  db.auditoria.createMany.mockReset().mockResolvedValue({ count: 1 });
  vi.mocked(UserRepository.createWithGeneratedCode).mockReset().mockImplementation(async data => ({ id_usuario: 11, codigo_usuario: "EMP-0011", correo: data.correo }) as never);
});

describe("importación de usuarios", () => {
  it("validar es de solo lectura y distingue cargo, área y rol", async () => {
    const data = input();
    data.rows[0]!.cargo = "JEFE DE SEGURIDAD";
    data.rows[0]!.id_rol = 2;
    data.rows[0]!.correo = "PERSONA@example.invalid";
    const preview = await UsersImportService.validar(data);
    expect(preview.canImport).toBe(true);
    expect(preview.rows[0]).toMatchObject({ id_area: null, area: null, id_rol: 2, rol: "Monitorista", correo: "persona@example.invalid" });
    expect(UserRepository.createWithGeneratedCode).not.toHaveBeenCalled();
    expect(BcryptHelper.hash).not.toHaveBeenCalled();
    expect(db.$transaction).not.toHaveBeenCalled();
  });
  it.each(["dni", "fecha_nacimiento", "correo_personal", "password", "es_responsable"])("rechaza el campo no autorizado %s", async field => {
    const data = input();
    Object.assign(data.rows[0]!, { [field]: "dato-no-autorizado" });
    await expect(UsersImportService.validar(data)).rejects.toThrow();
    expect(db.usuarios.findMany).not.toHaveBeenCalled();
  });
  it("bloquea una unidad sin equivalencia, sin crear ni hashear cuentas", async () => {
    const data = { ...input(), areas: [] };
    const preview = await UsersImportService.validar(data);
    expect(preview.issues).toEqual(expect.arrayContaining([expect.objectContaining({ row: 2, field: "id_area" })]));
    await expect(UsersImportService.importar(data, actor)).rejects.toThrow(/No se creó/);
    expect(UserRepository.createWithGeneratedCode).not.toHaveBeenCalled();
    expect(BcryptHelper.hash).not.toHaveBeenCalled();
  });
  it("bloquea correos repetidos sin distinguir mayúsculas", async () => {
    const data = input();
    data.rows.push({ ...data.rows[0]!, row: 3, correo: "PERSONA@example.invalid" });
    const preview = await UsersImportService.validar(data);
    expect(preview.canImport).toBe(false);
    expect(preview.issues.filter(issue => issue.field === "correo")).toHaveLength(2);
  });
  it("no actualiza cuentas existentes ni acepta roles externos o áreas inexistentes", async () => {
    db.usuarios.findMany.mockResolvedValue([{ correo: "PERSONA@example.invalid" }]);
    const data = input();
    data.rows[0]!.id_rol = 3;
    data.areas[0]!.id_area = 999;
    const preview = await UsersImportService.validar(data);
    expect(preview.issues.map(issue => issue.field)).toEqual(expect.arrayContaining(["id_rol", "correo"]));
    expect(preview.canImport).toBe(false);
  });
  it("revalida dentro de la transacción si la BD cambió después de la revisión", async () => {
    db.usuarios.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([{ correo: "persona@example.invalid" }]);
    await expect(UsersImportService.importar(input(), actor)).rejects.toThrow(/No se creó/);
    expect(UserRepository.createWithGeneratedCode).not.toHaveBeenCalled();
    expect(db.auditoria.createMany).not.toHaveBeenCalled();
  });
  it("crea con área y datos amarillos, genera claves distintas y audita sin credenciales", async () => {
    const data = input();
    data.rows.push({ ...data.rows[0]!, row: 3, correo: "otra@example.invalid" });
    const result = await UsersImportService.importar(data, actor, "127.0.0.1");
    expect(result.created).toBe(2);
    expect(new Set(result.credentials.map(item => item.password_temporal)).size).toBe(2);
    expect(UserRepository.createWithGeneratedCode).toHaveBeenCalledWith(expect.objectContaining({
      unidad_organizativa: "Unidad A", jefe_inmediato: "Responsable de unidad", id_area: 10, id_rol: 4, password_hash: "hash-secreto",
    }), db);
    const audit = JSON.stringify(db.auditoria.createMany.mock.calls);
    for (const user of result.credentials) expect(audit).not.toContain(user.password_temporal);
    expect(audit).not.toContain("hash-secreto");
    expect(audit).not.toContain("password");
    expect(db.$transaction).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({ isolationLevel: "Serializable" }));
  });

  it.each([1, 2, 5, 6])("el rol interno %s se importa sin área y conserva su unidad laboral", async id_rol => {
    const data = { ...input(), areas: [] };
    data.rows[0]!.id_rol = id_rol;
    const validation = await UsersImportService.validar(data);
    expect(validation.canImport).toBe(true);
    expect(validation.rows[0]).toMatchObject({ id_area: null, area: null, unidad_organizativa: "Unidad A" });
    await UsersImportService.importar(data, actor);
    expect(UserRepository.createWithGeneratedCode).toHaveBeenCalledWith(expect.objectContaining({ id_area: null, id_rol }), db);
  });

  it("una unidad compartida asigna área solo al jefe, no a sus compañeros", async () => {
    const data = input();
    data.rows.push({ ...data.rows[0]!, row: 3, correo: "monitor@example.invalid", id_rol: 2 });
    const validation = await UsersImportService.validar(data);
    expect(validation.canImport).toBe(true);
    expect(validation.rows.map(row => row.id_area)).toEqual([10, null]);
  });

  it("ignora equivalencias ajenas o ambiguas para los roles que no tienen área", async () => {
    const data = input();
    data.rows[0]!.id_rol = 5;
    data.areas.push({ unidad_organizativa: "Unidad A", id_area: 999 });
    const validation = await UsersImportService.validar(data);
    expect(validation.canImport).toBe(true);
    expect(validation.rows[0]!.id_area).toBeNull();
  });

  it("bloquea un Jefe de Área con área inexistente o equivalencia ambigua", async () => {
    const data = input();
    data.areas[0]!.id_area = 999;
    expect((await UsersImportService.validar(data)).canImport).toBe(false);
    data.areas.push({ unidad_organizativa: "Unidad A", id_area: 10 });
    const validation = await UsersImportService.validar(data);
    expect(validation.issues).toContainEqual(expect.objectContaining({ field: "id_area" }));
    expect(validation.canImport).toBe(false);
  });
});
