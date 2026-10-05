import { describe, expect, it, vi, beforeEach } from "vitest";
import jwt from "jsonwebtoken";
import type { Response } from "express";

vi.mock("../config/env.js", () => ({ env: { JWT_SECRET: "test-secret", JWT_EXPIRES_IN: "8h" } }));

const actorSesionMock = vi.fn();
vi.mock("../modules/auth/auth.repository.js", () => ({
  AuthRepository: { obtenerActorDeSesion: actorSesionMock },
}));

const { verifyToken, optionalVerifyToken, requireRoles, requireRolesOrResponsable, requireRolesAndPermission } =
  await import("./auth.middleware.js");
import type { AuthTokenPayload } from "./auth.middleware.js";

function mockRes() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

function tokenPara(payload: object) {
  return jwt.sign(payload, "test-secret");
}

const SO: AuthTokenPayload = { id_usuario: 1, correo: "so@x.pe", rol: 2, rol_nombre: "Seguridad Operativa" };
const JEFE: AuthTokenPayload = { id_usuario: 2, correo: "jefe@x.pe", rol: 3, rol_nombre: "Jefe de Área" };
const ADMIN: AuthTokenPayload = { id_usuario: 3, correo: "admin@x.pe", rol: 1, rol_nombre: "Admin" };

beforeEach(() => {
  actorSesionMock.mockReset();
});

describe("verifyToken", () => {
  it("rechaza sin cabecera Authorization", async () => {
    const req = { headers: {} } as unknown as Parameters<typeof verifyToken>[0];
    const res = mockRes();
    const next = vi.fn();
    await verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rechaza un token con firma inválida", async () => {
    const req = { headers: { authorization: "Bearer no-es-un-jwt-valido" } } as unknown as Parameters<typeof verifyToken>[0];
    const res = mockRes();
    const next = vi.fn();
    await verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rechaza tokens antiguos sin identificador de sesión", async () => {
    const token = tokenPara(SO);
    const req = { headers: { authorization: `Bearer ${token}` } } as unknown as Parameters<typeof verifyToken>[0];
    const res = mockRes();
    const next = vi.fn();
    await verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("cierra la puerta si la sesión ya fue cerrada del lado del servidor, aunque el JWT siga firmado y vigente", async () => {
    actorSesionMock.mockResolvedValue(null);
    const token = tokenPara({ ...SO, id_sesion: 55 });
    const req = { headers: { authorization: `Bearer ${token}` } } as unknown as Parameters<typeof verifyToken>[0];
    const res = mockRes();
    const next = vi.fn();
    await verifyToken(req, res, next);
    expect(actorSesionMock).toHaveBeenCalledWith(55, 1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("deja pasar cuando la sesión sigue activa", async () => {
    actorSesionMock.mockResolvedValue({ ...SO, id_sesion: 56 });
    const token = tokenPara({ ...SO, id_sesion: 56 });
    const req = { headers: { authorization: `Bearer ${token}` } } as unknown as Parameters<typeof verifyToken>[0];
    const res = mockRes();
    const next = vi.fn();
    await verifyToken(req, res, next);
    expect(next).toHaveBeenCalledOnce();
    expect(req.user?.rol_nombre).toBe("Seguridad Operativa");
  });

  it("usa rol y permisos actuales de base, no los reclamos antiguos del JWT", async () => {
    actorSesionMock.mockResolvedValue({ ...JEFE, id_sesion: 57 });
    const token = tokenPara({ ...ADMIN, id_sesion: 57 });
    const req = { headers: { authorization: `Bearer ${token}` } } as unknown as Parameters<typeof verifyToken>[0];
    const next = vi.fn();
    await verifyToken(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
    expect(req.user?.rol_nombre).toBe("Jefe de Área");
  });
});

describe("optionalVerifyToken", () => {
  it("sigue como público sin cabecera, sin bloquear la petición", async () => {
    const req = { headers: {} } as unknown as Parameters<typeof optionalVerifyToken>[0];
    const next = vi.fn();
    await optionalVerifyToken(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
    expect(req.user).toBeUndefined();
  });

  it("sigue como público con un token vencido/inválido, en vez de bloquear el QR público", async () => {
    const req = { headers: { authorization: "Bearer basura" } } as unknown as Parameters<typeof optionalVerifyToken>[0];
    const next = vi.fn();
    await optionalVerifyToken(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
    expect(req.user).toBeUndefined();
  });

  it("pobla req.user cuando el token sí es válido", async () => {
    actorSesionMock.mockResolvedValue({ ...SO, id_sesion: 58 });
    const token = tokenPara({ ...SO, id_sesion: 58 });
    const req = { headers: { authorization: `Bearer ${token}` } } as unknown as Parameters<typeof optionalVerifyToken>[0];
    const next = vi.fn();
    await optionalVerifyToken(req, mockRes(), next);
    expect(req.user?.id_usuario).toBe(1);
  });

  it("no adjunta como usuario un token válido cuya sesión fue revocada", async () => {
    actorSesionMock.mockResolvedValue(null);
    const token = tokenPara({ ...SO, id_sesion: 59 });
    const req = { headers: { authorization: `Bearer ${token}` } } as unknown as Parameters<typeof optionalVerifyToken>[0];
    const next = vi.fn();
    await optionalVerifyToken(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
    expect(req.user).toBeUndefined();
  });
});

describe("requireRoles", () => {
  it("deja pasar un rol permitido (comparación sin distinguir mayúsculas)", () => {
    const req = { user: { ...JEFE, rol_nombre: "jefe de área" } } as unknown as Parameters<ReturnType<typeof requireRoles>>[0];
    const next = vi.fn();
    requireRoles("Jefe de Área", "Admin")(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
  });

  it("rechaza con 403 un rol fuera de la lista", () => {
    const req = { user: SO } as unknown as Parameters<ReturnType<typeof requireRoles>>[0];
    const res = mockRes();
    const next = vi.fn();
    requireRoles("Jefe de Área", "Admin")(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("rechaza sin sesión (req.user vacío)", () => {
    const req = {} as unknown as Parameters<ReturnType<typeof requireRoles>>[0];
    const res = mockRes();
    const next = vi.fn();
    requireRoles("Admin")(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("requireRolesOrResponsable", () => {
  it("Admin siempre pasa, sin necesitar es_responsable", () => {
    const req = { user: ADMIN } as unknown as Parameters<ReturnType<typeof requireRolesOrResponsable>>[0];
    const next = vi.fn();
    requireRolesOrResponsable(["Monitorista"], ["Seguridad Operativa"])(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
  });

  it("deja pasar al rol de responsable listado si tiene el flag es_responsable", () => {
    const req = { user: { ...SO, es_responsable: true } } as unknown as Parameters<ReturnType<typeof requireRolesOrResponsable>>[0];
    const next = vi.fn();
    requireRolesOrResponsable(["Monitorista"], ["Seguridad Operativa"])(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
  });

  it("rechaza al rol de responsable listado si NO tiene el flag es_responsable", () => {
    // Este es el caso real que motiva el flag: no cualquiera de SO puede
    // entrar a Monitoreo, solo a quien el Admin marcó como responsable.
    const req = { user: { ...SO, es_responsable: false } } as unknown as Parameters<ReturnType<typeof requireRolesOrResponsable>>[0];
    const res = mockRes();
    const next = vi.fn();
    requireRolesOrResponsable(["Monitorista"], ["Seguridad Operativa"])(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("requireRolesAndPermission", () => {
  it("Admin pasa sin tener el permiso puntual marcado", () => {
    const req = { user: ADMIN } as unknown as Parameters<ReturnType<typeof requireRolesAndPermission>>[0];
    const next = vi.fn();
    requireRolesAndPermission(["Seguridad Operativa", "Admin"], "puede_reabrir_casos")(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
  });

  it("un rol permitido sin el permiso puntual queda en 403, no en el rol genérico", () => {
    const req = { user: { ...SO, puede_reabrir_casos: false } } as unknown as Parameters<ReturnType<typeof requireRolesAndPermission>>[0];
    const res = mockRes();
    const next = vi.fn();
    requireRolesAndPermission(["Seguridad Operativa", "Admin"], "puede_reabrir_casos")(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("un rol permitido con el permiso puntual marcado pasa", () => {
    const req = { user: { ...SO, puede_reabrir_casos: true } } as unknown as Parameters<ReturnType<typeof requireRolesAndPermission>>[0];
    const next = vi.fn();
    requireRolesAndPermission(["Seguridad Operativa", "Admin"], "puede_reabrir_casos")(req, mockRes(), next);
    expect(next).toHaveBeenCalledOnce();
  });

  it("un rol fuera de la lista no pasa aunque tenga el flag marcado", () => {
    const req = { user: { ...JEFE, puede_reabrir_casos: true } } as unknown as Parameters<ReturnType<typeof requireRolesAndPermission>>[0];
    const res = mockRes();
    const next = vi.fn();
    requireRolesAndPermission(["Seguridad Operativa", "Admin"], "puede_reabrir_casos")(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
