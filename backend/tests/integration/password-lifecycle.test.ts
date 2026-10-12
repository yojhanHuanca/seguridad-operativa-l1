import { createHash, randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { ipKeyGenerator } from "express-rate-limit";
import app from "../../src/app.js";
import prisma from "../../src/lib/prisma.js";
import { AuthRepository } from "../../src/modules/auth/auth.repository.js";
import { loginRateLimit } from "../../src/middlewares/loginRateLimit.middleware.js";

const run = randomUUID().slice(0, 8);
const temporary = `Temporal-${run}`;
const permanent = `Personal-${run}`;
const ids: number[] = [];
const createdRoles: number[] = [];
const roles = new Map<string, number>();
const roleNames = ["Admin", "Seguridad Operativa", "Jefe de Área", "Monitorista", "Gestión de Planes de Contingencia", "Reportante"];
let areaId: number;
let adminToken: string;

async function login(correo: string, password: string) {
  const response = await request(app).post("/api/auth/login").send({ correo, password }).expect(200);
  expect(response.body.data.usuario).not.toHaveProperty("password_hash");
  return response.body.data as { token: string; usuario: { debe_cambiar_password: boolean; rol: string } };
}

async function createUser(role: string) {
  const response = await request(app).post("/api/users").set("Authorization", `Bearer ${adminToken}`).send({
    nombre: `Ciclo ${role} ${run}`, correo: `${randomUUID()}@example.invalid`, password: temporary,
    id_rol: roles.get(role), ...(role === "Jefe de Área" ? { id_area: areaId } : {}),
    debe_cambiar_password: false, // El cliente no puede desactivar esta regla.
  }).expect(201);
  const user = response.body.data as { id_usuario: number; correo: string; debe_cambiar_password: boolean };
  ids.push(user.id_usuario);
  expect(user.debe_cambiar_password).toBe(true);
  expect(user).not.toHaveProperty("password_hash");
  return user;
}

async function change(token: string, current = temporary, next = permanent, confirmation = next) {
  return request(app).patch("/api/profile/me/password").set("Authorization", `Bearer ${token}`).send({
    password_actual: current, password_nueva: next, password_confirmacion: confirmation,
  });
}

beforeAll(async () => {
  const db = await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`;
  expect(db[0]?.name).toBe("seguridad_operativa_test");
  for (const name of roleNames) {
    let role = await prisma.roles.findUnique({ where: { nombre_rol: name } });
    if (!role) {
      role = await prisma.roles.create({ data: { nombre_rol: name } });
      createdRoles.push(role.id_rol);
    }
    roles.set(name, role.id_rol);
  }
  areaId = (await prisma.areas.create({ data: { nombre_area: `Contraseñas ${run}` } })).id_area;
  const admin = await prisma.usuarios.create({ data: {
    codigo_usuario: `PC-${run}`, nombre: `Admin existente ${run}`, correo: `admin-${run}@example.invalid`,
    password_hash: await bcrypt.hash(permanent, 10), id_rol: roles.get("Admin")!, estado: "Activo",
  } });
  ids.push(admin.id_usuario);
  const session = await login(admin.correo, permanent);
  expect(session.usuario.debe_cambiar_password).toBe(false);
  adminToken = session.token;
});

beforeEach(async () => {
  // Cada escenario tiene su propia cuota; los rechazos deliberados de una
  // prueba no deben impedir que la siguiente pruebe otro flujo de acceso.
  await Promise.all(["127.0.0.1", "::ffff:127.0.0.1", "::1"].map(ip => loginRateLimit.resetKey(ipKeyGenerator(ip))));
});

afterAll(async () => {
  try {
    await prisma.$transaction([
      prisma.auditoria.deleteMany({ where: { usuario: { in: ids } } }),
      prisma.password_resets.deleteMany({ where: { usuario: { in: ids } } }),
      prisma.sesiones.deleteMany({ where: { usuario: { in: ids } } }),
      prisma.usuarios.deleteMany({ where: { id_usuario: { in: ids } } }),
    ]);
    if (areaId) await prisma.areas.delete({ where: { id_area: areaId } });
    if (createdRoles.length) await prisma.roles.deleteMany({ where: { id_rol: { in: createdRoles }, usuarios: { none: {} } } });
  } finally {
    await prisma.$disconnect();
  }
});

describe("API real: contraseñas temporales y conservación de acceso", () => {
  it.each(roleNames)("%s: exige cambiar la clave temporal y conserva el rol", async role => {
    const user = await createUser(role);
    const initial = await login(user.correo, temporary);
    expect(initial.usuario).toMatchObject({ rol: role, debe_cambiar_password: true });
    const blocked = await request(app).get("/api/users/basicos").set("Authorization", `Bearer ${initial.token}`).expect(403);
    expect(blocked.body.code).toBe("PASSWORD_CHANGE_REQUIRED");
    await request(app).get("/api/profile/me").set("Authorization", `Bearer ${initial.token}`).expect(200);
    const result = await change(initial.token);
    expect(result.status).toBe(200);
    await request(app).get("/api/profile/me").set("Authorization", `Bearer ${initial.token}`).expect(401);
    await request(app).post("/api/auth/login").send({ correo: user.correo, password: temporary }).expect(401);
    const authenticated = await login(user.correo, permanent);
    expect(authenticated.usuario).toMatchObject({ rol: role, debe_cambiar_password: false });
    await request(app).get("/api/users/basicos").set("Authorization", `Bearer ${authenticated.token}`).expect(200);
    await request(app).get("/api/auditoria").set("Authorization", `Bearer ${authenticated.token}`).expect(role === "Admin" ? 200 : 403);
  });

  it("rechaza datos inválidos sin cambiar hash, sesiones ni estado temporal", async () => {
    const user = await createUser("Monitorista");
    const { token } = await login(user.correo, temporary);
    const before = await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: user.id_usuario } });
    for (const [actual, next, confirmation] of [
      [temporary, permanent, "distinta"], ["incorrecta", permanent, permanent],
      [temporary, temporary, temporary], [temporary, "123", "123"],
      [temporary, "é".repeat(37), "é".repeat(37)],
    ]) expect((await change(token, actual, next, confirmation)).status).toBe(400);
    const after = await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: user.id_usuario } });
    expect(after.password_hash).toBe(before.password_hash);
    expect(after.debe_cambiar_password).toBe(true);
    await request(app).get("/api/profile/me").set("Authorization", `Bearer ${token}`).expect(200);
    // Tampoco puede usar la ruta pública autenticada para saltar la restricción.
    const blocked = await request(app).post("/api/reports").set("Authorization", `Bearer ${token}`).send({}).expect(403);
    expect(blocked.body.code).toBe("PASSWORD_CHANGE_REQUIRED");
    await request(app).post("/api/auth/logout").set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("editar datos conserva la clave y restablecerla cierra sesiones e invalida enlaces", async () => {
    const user = await createUser("Monitorista");
    const first = await login(user.correo, temporary);
    expect((await change(first.token)).status).toBe(200);
    const sessionA = await login(user.correo, permanent);
    const sessionB = await login(user.correo, permanent);
    const before = await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: user.id_usuario } });
    await request(app).patch(`/api/users/${user.id_usuario}`).set("Authorization", `Bearer ${adminToken}`).send({ cargo: "Editado", password: "" }).expect(200);
    const after = await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: user.id_usuario } });
    expect(after.password_hash).toBe(before.password_hash);
    expect(after.debe_cambiar_password).toBe(false);
    await request(app).get("/api/profile/me").set("Authorization", `Bearer ${sessionA.token}`).expect(200);
    const reset = await prisma.password_resets.create({ data: { usuario: user.id_usuario, token_hash: createHash("sha256").update(randomUUID()).digest("hex"), expires_at: new Date(Date.now() + 60_000) } });
    await request(app).patch(`/api/users/${user.id_usuario}`).set("Authorization", `Bearer ${adminToken}`).send({ password: temporary }).expect(200);
    for (const { token } of [sessionA, sessionB]) await request(app).get("/api/profile/me").set("Authorization", `Bearer ${token}`).expect(401);
    expect((await prisma.password_resets.findUniqueOrThrow({ where: { id_reset: reset.id_reset } })).used_at).not.toBeNull();
    await request(app).post("/api/auth/login").send({ correo: user.correo, password: permanent }).expect(401);
    const limited = await login(user.correo, temporary);
    expect(limited.usuario.debe_cambiar_password).toBe(true);
    expect((await change(limited.token)).status).toBe(200);
    const audit = await prisma.auditoria.findMany({ where: { tabla_afectada: "usuarios", id_registro: user.id_usuario, accion: "editar" } });
    expect(audit.some(row => row.descripcion?.includes("Restableció la contraseña temporal"))).toBe(true);
    expect(audit.some(row => row.descripcion?.includes("cerró todas sus sesiones"))).toBe(true);
    const serialized = JSON.stringify(audit);
    for (const secret of [temporary, permanent, before.password_hash, "password_hash"]) expect(serialized).not.toContain(secret);
  });

  it("cambiar la clave propia invalida todas las sesiones y enlaces de recuperación", async () => {
    const user = await createUser("Seguridad Operativa");
    const first = await login(user.correo, temporary);
    const second = await login(user.correo, temporary);
    const resetToken = randomUUID();
    const reset = await prisma.password_resets.create({ data: { usuario: user.id_usuario, token_hash: createHash("sha256").update(resetToken).digest("hex"), expires_at: new Date(Date.now() + 60_000) } });
    expect((await change(first.token)).status).toBe(200);
    for (const { token } of [first, second]) await request(app).get("/api/profile/me").set("Authorization", `Bearer ${token}`).expect(401);
    expect((await prisma.password_resets.findUniqueOrThrow({ where: { id_reset: reset.id_reset } })).used_at).not.toBeNull();
    await request(app).post("/api/auth/reset-password").send({ token: resetToken, password: "No-cambiar-123" }).expect(400);
    expect((await login(user.correo, permanent)).usuario.debe_cambiar_password).toBe(false);
  });

  it("recuperar por enlace establece una clave personal y conserva el acceso existente", async () => {
    const user = await createUser("Gestión de Planes de Contingencia");
    const initial = await login(user.correo, temporary);
    const token = randomUUID();
    await prisma.password_resets.create({ data: { usuario: user.id_usuario, token_hash: createHash("sha256").update(token).digest("hex"), expires_at: new Date(Date.now() + 60_000) } });
    await request(app).post("/api/auth/reset-password").send({ token, password: permanent }).expect(200);
    await request(app).post("/api/auth/reset-password").send({ token, password: "Otra-clave-123" }).expect(400);
    await request(app).get("/api/profile/me").set("Authorization", `Bearer ${initial.token}`).expect(401);
    expect((await login(user.correo, permanent)).usuario.debe_cambiar_password).toBe(false);
  });

  it("dos solicitudes simultáneas no pueden consumir el mismo enlace", async () => {
    const user = await createUser("Monitorista");
    const token = randomUUID();
    await prisma.password_resets.create({ data: { usuario: user.id_usuario, token_hash: createHash("sha256").update(token).digest("hex"), expires_at: new Date(Date.now() + 60_000) } });
    const candidates = [permanent, `Distinta-${run}`];
    const responses = await Promise.all(candidates.map(password => request(app).post("/api/auth/reset-password").send({ token, password })));
    expect(responses.map(response => response.status).sort()).toEqual([200, 400]);
    const winner = responses.findIndex(response => response.status === 200);
    expect((await login(user.correo, candidates[winner]!)).usuario.debe_cambiar_password).toBe(false);
    await request(app).post("/api/auth/login").send({ correo: user.correo, password: candidates[1 - winner] }).expect(401);
  });

  it("no abre sesiones con una contraseña verificada antes de restablecerla", async () => {
    const user = await createUser("Monitorista");
    const before = await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: user.id_usuario } });
    await request(app).patch(`/api/users/${user.id_usuario}`).set("Authorization", `Bearer ${adminToken}`).send({ password: permanent }).expect(200);
    const count = await prisma.sesiones.count({ where: { usuario: user.id_usuario } });
    await expect(AuthRepository.crearSesion(user.id_usuario, before.password_hash)).rejects.toThrow(/credenciales cambiaron/);
    expect(await prisma.sesiones.count({ where: { usuario: user.id_usuario } })).toBe(count);
    expect((await login(user.correo, permanent)).usuario.debe_cambiar_password).toBe(true);
  });
});
