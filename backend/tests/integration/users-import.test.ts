import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import app from "../../src/app.js";
import prisma from "../../src/lib/prisma.js";
import { UserRepository } from "../../src/modules/users/users.repository.js";

const run = randomUUID().slice(0, 8);
const domain = `${run}.example.invalid`;
const password = `Import!${run}A9`;
const tokens: Record<string, string> = {};
const roleIds: Record<string, number> = {};
const newRoles: number[] = [];
let areaId: number;
let adminId: number;

function payload(prefix = "nuevo") {
  return {
    filename: "padron-prueba.xlsx", hoja: "Datos",
    rows: [0, 1].map(index => ({
      row: index + 2, nombre: `Persona Prueba ${index}`, cargo: "Analista",
      unidad_organizativa: "Unidad de prueba", correo: `${prefix}-${index}@${domain}`,
      telefono: index ? "" : "900000000", jefe_inmediato: "Jefatura de prueba", id_rol: roleIds["Monitorista"],
    })),
    areas: [{ unidad_organizativa: "Unidad de prueba", id_area: areaId }],
  };
}

beforeAll(async () => {
  const db = await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`;
  expect(db[0]?.name).toBe("seguridad_operativa_test");
  const area = await prisma.areas.create({ data: { nombre_area: `Área importación ${run}` } });
  areaId = area.id_area;
  const password_hash = await bcrypt.hash(password, 10);
  for (const name of ["Admin", "Monitorista", "Seguridad Operativa", "Jefe de Área", "Gestión de Planes de Contingencia"]) {
    let role = await prisma.roles.findUnique({ where: { nombre_rol: name } });
    if (!role) { role = await prisma.roles.create({ data: { nombre_rol: name } }); newRoles.push(role.id_rol); }
    roleIds[name] = role.id_rol;
    const user = await prisma.usuarios.create({ data: { codigo_usuario: `TI-${role.id_rol}-${run}`, nombre: `Actor ${name}`, correo: `actor-${role.id_rol}@${domain}`, password_hash, id_rol: role.id_rol, estado: "Activo" } });
    if (name === "Admin") adminId = user.id_usuario;
    const login = await request(app).post("/api/auth/login").send({ correo: user.correo, password }).expect(200);
    tokens[name] = login.body.data.token;
  }
});

afterAll(async () => {
  vi.restoreAllMocks();
  try {
    const users = await prisma.usuarios.findMany({ where: { correo: { endsWith: `@${domain}` } }, select: { id_usuario: true } });
    const ids = users.map(user => user.id_usuario);
    await prisma.$transaction([
      prisma.auditoria.deleteMany({ where: { usuario: { in: ids } } }),
      prisma.sesiones.deleteMany({ where: { usuario: { in: ids } } }),
      prisma.usuarios.deleteMany({ where: { id_usuario: { in: ids } } }),
    ]);
    if (areaId) await prisma.areas.delete({ where: { id_area: areaId } });
    if (newRoles.length) await prisma.roles.deleteMany({ where: { id_rol: { in: newRoles }, usuarios: { none: {} } } });
  } finally { await prisma.$disconnect(); }
});

describe("API real: importación de usuarios", () => {
  it("Admin no se desactiva ni pierde su acceso por un cambio accidental propio", async () => {
    for (const body of [{ estado: "Inactivo" }, { id_rol: roleIds.Monitorista }]) {
      const response = await request(app).patch(`/api/users/${adminId}`).set("Authorization", `Bearer ${tokens.Admin}`).send(body).expect(400);
      expect(response.body.message).toContain("propia cuenta");
      await request(app).get("/api/users/counts").set("Authorization", `Bearer ${tokens.Admin}`).expect(200);
    }
  });
  it("alta y edición manual respetan la misma regla de áreas que la importación", async () => {
    const created = await request(app).post("/api/users").set("Authorization", `Bearer ${tokens.Admin}`).send({
      nombre: "Prueba manual", correo: `manual@${domain}`, password,
      id_rol: roleIds.Monitorista, id_area: areaId,
    }).expect(201);
    const id = created.body.data.id_usuario;
    expect(created.body.data.id_area).toBeNull();
    await request(app).patch(`/api/users/${id}`).set("Authorization", `Bearer ${tokens.Admin}`).send({ id_rol: roleIds["Jefe de Área"] }).expect(400);
    const chief = await request(app).patch(`/api/users/${id}`).set("Authorization", `Bearer ${tokens.Admin}`).send({ id_rol: roleIds["Jefe de Área"], id_area: areaId }).expect(200);
    expect(chief.body.data.id_area).toBe(areaId);
    const monitor = await request(app).patch(`/api/users/${id}`).set("Authorization", `Bearer ${tokens.Admin}`).send({ id_rol: roleIds.Monitorista, id_area: areaId }).expect(200);
    expect(monitor.body.data.id_area).toBeNull();
  });
  it("requiere sesión Admin en validar e importar", async () => {
    for (const action of ["validar", "importar"]) {
      await request(app).post(`/api/importacion/usuarios/${action}`).send(payload()).expect(401);
      for (const role of ["Monitorista", "Seguridad Operativa"]) {
        await request(app).post(`/api/importacion/usuarios/${action}`).set("Authorization", `Bearer ${tokens[role]}`).send(payload()).expect(403);
      }
    }
  });
  it("valida sin escribir y rechaza campos ajenos a las seis columnas", async () => {
    const before = await prisma.usuarios.count();
    const validation = await request(app).post("/api/importacion/usuarios/validar").set("Authorization", `Bearer ${tokens.Admin}`).send(payload()).expect(200);
    expect(validation.body.data.canImport).toBe(true);
    expect(validation.headers["cache-control"]).toBe("no-store");
    expect(await prisma.usuarios.count()).toBe(before);
    const invalid = payload();
    Object.assign(invalid.rows[0]!, { dni: "DATO-NO-AUTORIZADO" });
    await request(app).post("/api/importacion/usuarios/validar").set("Authorization", `Bearer ${tokens.Admin}`).send(invalid).expect(400);
    expect(await prisma.usuarios.count()).toBe(before);
  });
  it("no importa si falta un área o un rol explícito", async () => {
    const invalid = { ...payload(), areas: [] };
    invalid.rows[0]!.id_rol = roleIds["Jefe de Área"];
    const response = await request(app).post("/api/importacion/usuarios/importar").set("Authorization", `Bearer ${tokens.Admin}`).send(invalid).expect(409);
    expect(response.body.data.issues).toEqual(expect.arrayContaining([expect.objectContaining({ field: "id_area" })]));
    expect(await prisma.usuarios.count({ where: { correo: { startsWith: "nuevo-", endsWith: `@${domain}` } } })).toBe(0);
  });
  it("guarda los datos amarillos, área y rol; protege claves, auditoría y reimportación", async () => {
    const data = payload();
    data.rows[0]!.id_rol = roleIds["Jefe de Área"];
    const response = await request(app).post("/api/importacion/usuarios/importar").set("Authorization", `Bearer ${tokens.Admin}`).send(data).expect(201);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.body.data.created).toBe(2);
    const credentials = response.body.data.credentials as { id_usuario: number; password_temporal: string }[];
    expect(new Set(credentials.map(item => item.password_temporal)).size).toBe(2);
    for (const item of credentials) {
      const user = await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: item.id_usuario } });
      const isHead = user.correo === data.rows[0]!.correo;
      expect(user).toMatchObject({ unidad_organizativa: "Unidad de prueba", jefe_inmediato: "Jefatura de prueba", id_area: isHead ? areaId : null, id_rol: isHead ? roleIds["Jefe de Área"] : roleIds.Monitorista, debe_cambiar_password: true, es_responsable: false, puede_reabrir_casos: false, puede_rechazar_reportes: false });
      expect(await bcrypt.compare(item.password_temporal, user.password_hash!)).toBe(true);
      expect(user.codigo_usuario).toMatch(/^EMP-\d+$/);
      expect(item).not.toHaveProperty("password_hash");
      const audit = await prisma.auditoria.findFirstOrThrow({ where: { tabla_afectada: "usuarios", id_registro: user.id_usuario, usuario: adminId } });
      expect(JSON.stringify(audit)).not.toContain(item.password_temporal);
      expect(JSON.stringify(audit)).not.toContain(user.password_hash);
    }
    const basic = await request(app).get("/api/users/basicos").set("Authorization", `Bearer ${tokens.Monitorista}`).expect(200);
    const listed = basic.body.data.find((user: { id_usuario: number }) => user.id_usuario === credentials[0]!.id_usuario);
    expect(listed).not.toHaveProperty("jefe_inmediato");
    expect(listed).not.toHaveProperty("correo");
    await request(app).post("/api/importacion/usuarios/importar").set("Authorization", `Bearer ${tokens.Admin}`).send(data).expect(409);
    expect(await prisma.usuarios.count({ where: { correo: { startsWith: "nuevo-", endsWith: `@${domain}` } } })).toBe(2);
    const login = await request(app).post("/api/auth/login").send({ correo: data.rows[0]!.correo, password: credentials[0]!.password_temporal }).expect(200);
    expect(login.body.data.usuario.debe_cambiar_password).toBe(true);
    const blocked = await request(app).get("/api/users").set("Authorization", `Bearer ${login.body.data.token}`).expect(403);
    expect(blocked.body.code).toBe("PASSWORD_CHANGE_REQUIRED");
    await request(app).patch(`/api/users/${credentials[0]!.id_usuario}`).set("Authorization", `Bearer ${tokens.Admin}`).send({ nombre: "Nombre actualizado" }).expect(200);
    expect((await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: credentials[0]!.id_usuario } })).id_area).toBe(areaId);
  });
  it("Monitorista, Seguridad Operativa y Contingencias se guardan sin área", async () => {
    const base = payload("sinarea");
    const names = ["Monitorista", "Seguridad Operativa", "Gestión de Planes de Contingencia"];
    const data = { ...base, areas: [], rows: names.map((name, index) => ({
      ...base.rows[0]!, row: index + 2, correo: `sinarea-${index}@${domain}`, id_rol: roleIds[name],
    })) };
    const validation = await request(app).post("/api/importacion/usuarios/validar").set("Authorization", `Bearer ${tokens.Admin}`).send(data).expect(200);
    expect(validation.body.data.canImport).toBe(true);
    expect(validation.body.data.rows.every((row: { id_area: number | null }) => row.id_area === null)).toBe(true);
    await request(app).post("/api/importacion/usuarios/importar").set("Authorization", `Bearer ${tokens.Admin}`).send(data).expect(201);
    const saved = await prisma.usuarios.findMany({ where: { correo: { startsWith: "sinarea-", endsWith: `@${domain}` } } });
    expect(saved).toHaveLength(3);
    expect(saved.every(user => user.id_area === null && user.unidad_organizativa === "Unidad de prueba")).toBe(true);
  });
  it("revierte todo el lote si falla la segunda cuenta", async () => {
    const original = UserRepository.createWithGeneratedCode;
    const auditBefore = await prisma.auditoria.count({ where: { usuario: adminId, tabla_afectada: "usuarios" } });
    const spy = vi.spyOn(UserRepository, "createWithGeneratedCode").mockImplementationOnce((data, tx) => original(data, tx)).mockRejectedValueOnce(new Error("Fallo simulado de segunda cuenta"));
    try {
      const response = await request(app).post("/api/importacion/usuarios/importar").set("Authorization", `Bearer ${tokens.Admin}`).send(payload("rollback")).expect(409);
      expect(JSON.stringify(response.body)).not.toContain("Fallo simulado");
      expect(await prisma.usuarios.count({ where: { correo: { startsWith: "rollback-", endsWith: `@${domain}` } } })).toBe(0);
      expect(await prisma.auditoria.count({ where: { usuario: adminId, tabla_afectada: "usuarios" } })).toBe(auditBefore);
    } finally { spy.mockRestore(); }
  });
  it("dos confirmaciones simultáneas crean un solo lote", async () => {
    const data = payload("concurrente");
    const responses = await Promise.all([0, 1].map(() => request(app)
      .post("/api/importacion/usuarios/importar")
      .set("Authorization", `Bearer ${tokens.Admin}`)
      .send(data)));
    expect(responses.map(response => response.status).sort()).toEqual([201, 409]);
    expect(await prisma.usuarios.count({ where: { correo: { startsWith: "concurrente-", endsWith: `@${domain}` } } })).toBe(2);
  });
});
