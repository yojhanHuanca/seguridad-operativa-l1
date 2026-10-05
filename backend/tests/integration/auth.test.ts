import { randomUUID } from "node:crypto";
import { access, unlink } from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcrypt";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../../src/app.js";
import prisma from "../../src/lib/prisma.js";

const runId = randomUUID().slice(0, 8);
const password = `Test-${randomUUID()}`;
const users: { id: number; correo: string; rol: string }[] = [];
const createdRoles: number[] = [];
const uploadedAvatars: string[] = [];
const testedRoles = ["Admin", "Monitorista", "Gestión de Planes de Contingencia", "Seguridad Operativa", "Jefe de Área", "Reportante"];

async function login(correo: string) {
  const response = await request(app).post("/api/auth/login").send({ correo, password }).expect(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data.token).toEqual(expect.any(String));
  return response.body.data.token as string;
}

beforeAll(async () => {
  const database = await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`;
  expect(database[0]?.name).toBe("seguridad_operativa_test");
  const password_hash = await bcrypt.hash(password, 10);
  for (const rol of testedRoles) {
    let role = await prisma.roles.findUnique({ where: { nombre_rol: rol } });
    if (!role) {
      role = await prisma.roles.create({ data: { nombre_rol: rol } });
      createdRoles.push(role.id_rol);
    }
    const correo = `Cuenta${users.length}-${runId}@example.invalid`;
    const user = await prisma.usuarios.create({ data: {
      codigo_usuario: `T-${rol[0]}-${runId}`,
      nombre: `Prueba ${rol} ${runId}`, correo, password_hash,
      estado: "Activo", id_rol: role.id_rol,
    } });
    users.push({ id: user.id_usuario, correo, rol });
  }
});

afterAll(async () => {
  try {
    const ids = users.map(user => user.id);
    if (ids.length) {
      await prisma.$transaction([
        prisma.auditoria.deleteMany({ where: { usuario: { in: ids } } }),
        prisma.sesiones.deleteMany({ where: { usuario: { in: ids } } }),
        prisma.usuarios.deleteMany({ where: { id_usuario: { in: ids } } }),
      ]);
    }
    if (createdRoles.length) await prisma.roles.deleteMany({ where: { id_rol: { in: createdRoles }, usuarios: { none: {} } } });
  } finally {
    for (const file of uploadedAvatars) await unlink(file).catch(() => undefined);
    await prisma.$disconnect();
  }
});

describe("API real: autenticación, PostgreSQL y permisos", () => {
  it.each(testedRoles)("%s: correo sin distinción de mayúsculas conserva rol y permisos", async rol => {
    const user = users.find(u => u.rol === rol)!;
    for (const email of [user.correo.toLowerCase(), ` ${user.correo.toUpperCase()} `]) {
      const token = await login(email);
      const payload = JSON.parse(Buffer.from(token.split(".")[1]!, "base64url").toString());
      expect(payload).toMatchObject({ id_usuario: user.id, rol_nombre: rol });
      await request(app).get("/api/profile/me/sesiones").set("Authorization", `Bearer ${token}`).expect(200);
      await request(app).get("/api/auditoria").set("Authorization", `Bearer ${token}`).expect(rol === "Admin" ? 200 : 403);
      await request(app).post("/api/auth/logout").set("Authorization", `Bearer ${token}`).expect(200);
      await request(app).get("/api/profile/me/sesiones").set("Authorization", `Bearer ${token}`).expect(401);
    }
  });
  it("contingencias inicia sesión con un correo histórico que contiene mayúsculas", async () => {
    const user = users.find(u => u.rol === "Gestión de Planes de Contingencia")!;
    for (const email of [user.correo.toLowerCase(), ` ${user.correo.toUpperCase()} `]) {
      const token = await login(email);
      await request(app).get("/api/contingencias/catalogos").set("Authorization", `Bearer ${token}`).expect(200);
      await request(app).post("/api/auth/logout").set("Authorization", `Bearer ${token}`).expect(200);
    }
  });
  it("no crea otra cuenta con el mismo correo en distinta capitalización", async () => {
    const user = users.find(u => u.rol === "Gestión de Planes de Contingencia")!;
    const role = await prisma.roles.findUniqueOrThrow({ where: { nombre_rol: user.rol } });
    const token = await login(users[0]!.correo);
    await request(app).post("/api/users").set("Authorization", `Bearer ${token}`).send({ nombre: "Duplicado", correo: user.correo.toLowerCase(), password, id_rol: role.id_rol }).expect(400);
    expect(await prisma.usuarios.count({ where: { correo: { equals: user.correo, mode: "insensitive" } } })).toBe(1);
  });
  it("material rodante guarda la clasificación, evita duplicados y conserva ids", async () => {
    const token = await login(users[0]!.correo);
    const monitorToken = await login(users[1]!.correo);
    let group = await prisma.catalogos.findUnique({ where: { codigo: "NUMERO_MR" } });
    const createdGroup = !group;
    group ??= await prisma.catalogos.create({ data: { codigo: "NUMERO_MR", nombre: "Nro. MR" } });
    const code = `T${900000 + parseInt(runId.slice(0, 4), 16)}`;
    let unitId: number | undefined;
    try {
      await request(app).post(`/api/catalogs/${group.id_catalogo}/detalle`).set("Authorization", `Bearer ${monitorToken}`).send({ nombre: code, clasificacion_mr: "ANSALDO" }).expect(403);
      await request(app).post(`/api/catalogs/${group.id_catalogo}/detalle`).set("Authorization", `Bearer ${token}`).send({ nombre: code }).expect(400);
      const create = await request(app).post(`/api/catalogs/${group.id_catalogo}/detalle`).set("Authorization", `Bearer ${token}`).send({ nombre: code.toLowerCase(), clasificacion_mr: "ANSALDO" }).expect(201);
      unitId = create.body.data.id_detalle;
      expect(create.body.data).toMatchObject({ nombre: code, clasificacion_mr: "ANSALDO" });
      await request(app).post(`/api/catalogs/${group.id_catalogo}/detalle`).set("Authorization", `Bearer ${token}`).send({ nombre: `T0${code.slice(1)}`, clasificacion_mr: "ALSTOM" }).expect(400);
      const updated = await request(app).patch(`/api/catalogs/detalle/${unitId}`).set("Authorization", `Bearer ${token}`).send({ nombre: code, clasificacion_mr: "ALSTOM" }).expect(200);
      expect(updated.body.data).toMatchObject({ id_detalle: unitId, clasificacion_mr: "ALSTOM" });
      await request(app).delete(`/api/catalogs/detalle/${unitId}`).set("Authorization", `Bearer ${token}`).expect(200);
      const publicCatalogs = await request(app).get("/api/catalogs").expect(200);
      expect(publicCatalogs.body.data.find((g: { id_catalogo: number }) => g.id_catalogo === group!.id_catalogo).catalogo_detalle.some((i: { id_detalle: number }) => i.id_detalle === unitId)).toBe(false);
      await request(app).post(`/api/catalogs/detalle/${unitId}/restaurar`).set("Authorization", `Bearer ${token}`).expect(200);
      expect(await prisma.catalogo_detalle.findUnique({ where: { id_detalle: unitId! } })).toMatchObject({ estado: true, clasificacion_mr: "ALSTOM" });
    } finally {
      if (unitId) await prisma.catalogo_detalle.delete({ where: { id_detalle: unitId } });
      if (createdGroup) await prisma.catalogos.delete({ where: { id_catalogo: group.id_catalogo } });
    }
  });
  it("push protege la configuración y la pertenencia de cada dispositivo", async () => {
    await request(app).get("/api/push/config").expect(401);
    const owner = users[0]!;
    const other = users[1]!;
    const ownerToken = await login(owner.correo);
    const otherToken = await login(other.correo);
    const endpoint = `https://push.example.invalid/${runId}`;
    await prisma.push_subscriptions.create({ data: { usuario: owner.id, endpoint, p256dh: "fixture", auth: "fixture" } });
    try {
      const config = await request(app).get("/api/push/config").set("Authorization", `Bearer ${ownerToken}`).expect(200);
      expect(Object.keys(config.body.data).sort()).toEqual(["habilitado", "publicKey"]);
      const own = await request(app).post("/api/push/status").set("Authorization", `Bearer ${ownerToken}`).send({ endpoint }).expect(200);
      expect(own.body.data.suscrita).toBe(true);
      const foreign = await request(app).post("/api/push/status").set("Authorization", `Bearer ${otherToken}`).send({ endpoint }).expect(200);
      expect(foreign.body.data.suscrita).toBe(false);
      await request(app).post("/api/push/unsubscribe").set("Authorization", `Bearer ${otherToken}`).send({ endpoint }).expect(200);
      expect(await prisma.push_subscriptions.count({ where: { endpoint } })).toBe(1);
      await request(app).post("/api/push/unsubscribe").set("Authorization", `Bearer ${ownerToken}`).send({ endpoint }).expect(200);
      expect(await prisma.push_subscriptions.count({ where: { endpoint } })).toBe(0);
    } finally {
      await prisma.push_subscriptions.deleteMany({ where: { endpoint } });
    }
  });
  it("health comprueba la conexión real", async () => {
    const response = await request(app).get("/api/health").expect(200);
    expect(response.body).toMatchObject({ status: "OK", database: "Connected" });
  });

  it("rechaza solicitudes sin token y con token inválido", async () => {
    await request(app).get("/api/auditoria").expect(401);
    await request(app).get("/api/auditoria").set("Authorization", "Bearer invalido").expect(401);
  });

  it("rechaza login sin datos o con contraseña incorrecta sin abrir sesión", async () => {
    const user = users[0]!;
    const before = await prisma.sesiones.count({ where: { usuario: user.id } });
    await request(app).post("/api/auth/login").send({}).expect(400);
    await request(app).post("/api/auth/login").send({ correo: user.correo, password: "incorrecta" }).expect(401);
    expect(await prisma.sesiones.count({ where: { usuario: user.id } })).toBe(before);
  });

  it("Admin inicia sesión, consulta auditoría y pierde acceso después del logout", async () => {
    const user = users.find(user => user.rol === "Admin")!;
    const token = await login(user.correo);
    const tokenSession = JSON.parse(Buffer.from(token.split(".")[1]!, "base64url").toString()) as { id_sesion: number };
    const session = await prisma.sesiones.findUnique({ where: { id_sesion: tokenSession.id_sesion } });
    expect(session).not.toBeNull();
    expect(await prisma.auditoria.count({ where: { usuario: user.id, accion: "login" } })).toBeGreaterThan(0);
    const response = await request(app).get("/api/auditoria").set("Authorization", `Bearer ${token}`).expect(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    await request(app).post("/api/auth/logout").set("Authorization", `Bearer ${token}`).expect(200);
    expect(await prisma.sesiones.findUnique({ where: { id_sesion: session!.id_sesion } })).toMatchObject({ estado: "cerrada" });
    await request(app).get("/api/auditoria").set("Authorization", `Bearer ${token}`).expect(401);
  });

  it("Monitorista autenticado no puede consultar auditoría", async () => {
    const token = await login(users.find(user => user.rol === "Monitorista")!.correo);
    const response = await request(app).get("/api/auditoria").set("Authorization", `Bearer ${token}`).expect(403);
    expect(response.body.success).toBe(false);
  });

  it("el perfil exige sesión y solo devuelve la actividad y las sesiones del actor", async () => {
    for (const path of ["/api/profile/me/reciente", "/api/profile/me/sesiones"]) {
      await request(app).get(path).expect(401);
    }
    const actor = users.find(user => user.rol === "Monitorista")!;
    const other = users.find(user => user.rol === "Admin")!;
    const token = await login(actor.correo);
    const entries = await Promise.all(Array.from({ length: 10 }, (_, index) => prisma.auditoria.create({
      data: { usuario: actor.id, accion: "editar", tabla_afectada: "perfil_prueba", descripcion: `Privado-${index}`, datos_nuevos: { secreto: true } },
    })));
    const otherEntry = await prisma.auditoria.create({ data: { usuario: other.id, accion: "crear", tabla_afectada: "otro_usuario" } });
    const recent = await request(app).get("/api/profile/me/reciente").set("Authorization", `Bearer ${token}`).expect(200);
    expect(recent.body.data).toHaveLength(8);
    const ownIds = new Set(entries.map(entry => entry.id_auditoria));
    for (const entry of recent.body.data) {
      expect(ownIds.has(entry.id_auditoria)).toBe(true);
      expect(entry.id_auditoria).not.toBe(otherEntry.id_auditoria);
      expect(Object.keys(entry).sort()).toEqual(["accion", "fecha", "id_auditoria", "tabla_afectada"]);
    }
    const sessions = await request(app).get("/api/profile/me/sesiones").set("Authorization", `Bearer ${token}`).expect(200);
    expect(sessions.body.data.filter((session: { actual: boolean }) => session.actual)).toHaveLength(1);
    for (const session of sessions.body.data) {
      const stored = await prisma.sesiones.findUnique({ where: { id_sesion: session.id_sesion } });
      expect(stored?.usuario).toBe(actor.id);
      expect(stored?.estado).toBe("activa");
    }
  });

  it("el directorio compartido incluye la foto sin exponer datos de contacto", async () => {
    const actor = users.find(user => user.rol === "Monitorista")!;
    await prisma.usuarios.update({ where: { id_usuario: actor.id }, data: { foto_url: "/uploads/avatars/prueba.png" } });
    const token = await login(actor.correo);
    const response = await request(app).get("/api/users/basicos").set("Authorization", `Bearer ${token}`).expect(200);
    const row = response.body.data.find((user: { id_usuario: number }) => user.id_usuario === actor.id);
    expect(row.foto_url).toBe("/uploads/avatars/prueba.png");
    expect(row).not.toHaveProperty("correo");
    expect(row).not.toHaveProperty("telefono");
    expect(row).not.toHaveProperty("password_hash");
  });

  it("subir, cambiar y eliminar una foto limpia el archivo y solo modifica la cuenta autenticada", async () => {
    const actor = users.find(user => user.rol === "Monitorista")!;
    const other = users.find(user => user.rol === "Admin")!;
    const otherBefore = await prisma.usuarios.findUnique({ where: { id_usuario: other.id }, select: { foto_url: true } });
    const token = await login(actor.correo);
    const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=", "base64");
    await request(app).delete("/api/profile/me/foto").expect(401);
    const upload = async () => {
      const response = await request(app).post("/api/profile/me/foto").set("Authorization", `Bearer ${token}`).attach("foto", png, { filename: "perfil.png", contentType: "image/png" }).expect(200);
      const url = response.body.data.foto_url as string;
      expect(url).toMatch(/^\/uploads\/avatars\/[a-f0-9-]{36}\.png$/);
      const file = path.resolve(process.cwd(), "uploads", "avatars", path.basename(url));
      uploadedAvatars.push(file);
      await access(file);
      return { url, file };
    };
    const first = await upload();
    const second = await upload();
    expect(second.url).not.toBe(first.url);
    await expect(access(first.file)).rejects.toMatchObject({ code: "ENOENT" });
    await request(app).get(second.url.replace("/uploads/", "/api/archivos/")).set("Authorization", `Bearer ${token}`).expect(200);
    await request(app).delete("/api/profile/me/foto").set("Authorization", `Bearer ${token}`).send({ id_usuario: other.id }).expect(200);
    await expect(access(second.file)).rejects.toMatchObject({ code: "ENOENT" });
    expect(await prisma.usuarios.findUnique({ where: { id_usuario: actor.id }, select: { foto_url: true } })).toEqual({ foto_url: null });
    expect(await prisma.usuarios.findUnique({ where: { id_usuario: other.id }, select: { foto_url: true } })).toEqual(otherBefore);
    const removed = await request(app).delete("/api/profile/me/foto").set("Authorization", `Bearer ${token}`).expect(200);
    expect(removed.body.data.foto_url).toBeNull();
  });
});
