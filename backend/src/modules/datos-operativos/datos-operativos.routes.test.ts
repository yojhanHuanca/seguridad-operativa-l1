import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../config/env.js", () => ({ env: {} }));
vi.mock("../../generated/prisma/client.js", async () => ({ Prisma: await import("@prisma/client/runtime/library") }));
vi.mock("../auth/auth.repository.js", () => ({ AuthRepository: {} }));
vi.mock("./datos-operativos.service.js", () => ({ DatosOperativosService: {
  list: vi.fn(), create: vi.fn(), update: vi.fn(), remove: vi.fn(),
} }));
import router from "./datos-operativos.routes.js";
import { DatosOperativosService } from "./datos-operativos.service.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";

function appFor(role?: string) {
  const app = express();
  app.use(express.json());
  // La sesión ya fue validada en el router principal. Aquí se prueba el
  // permiso del módulo con su middleware y controlador reales.
  app.use((req, _res, next) => {
    if (role) (req as AuthenticatedRequest).user = { rol_nombre: role, es_responsable: false } as NonNullable<AuthenticatedRequest["user"]>;
    next();
  });
  app.use("/api/datos-operativos", router);
  return app;
}

describe("Datos operativos: permisos y eliminación", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each(["Monitorista", "Seguridad Operativa", "Gestión de Planes de Contingencia", "Admin"])("%s conserva las cuatro funciones", async role => {
    const app = appFor(role);
    await request(app).get("/api/datos-operativos").expect(200);
    await request(app).post("/api/datos-operativos").send({}).expect(201);
    await request(app).put("/api/datos-operativos/41").send({}).expect(200);
    const response = await request(app).delete("/api/datos-operativos/41").expect(200);
    expect(response.body.message).toBe("Dato operativo eliminado correctamente");
    expect(DatosOperativosService.remove).toHaveBeenCalledExactlyOnceWith("41");
  });

  it.each([undefined, "Jefe de Área", "Reportante"])("no permite gestionar sin rol autorizado: %s", async role => {
    const app = appFor(role);
    await request(app).get("/api/datos-operativos").expect(403);
    await request(app).post("/api/datos-operativos").send({}).expect(403);
    await request(app).put("/api/datos-operativos/41").send({}).expect(403);
    await request(app).delete("/api/datos-operativos/41").expect(403);
    expect(DatosOperativosService.remove).not.toHaveBeenCalled();
  });

  it("informa un fallo de eliminación sin devolver éxito", async () => {
    vi.mocked(DatosOperativosService.remove).mockRejectedValueOnce(new Error("No se pudo eliminar el dato operativo"));
    const response = await request(appFor("Monitorista")).delete("/api/datos-operativos/41").expect(400);
    expect(response.body.success).toBe(false);
  });
});
