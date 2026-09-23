import { describe, expect, it, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";

vi.mock("../../config/env.js", () => ({ env: {} }));
vi.mock("../auth/auth.repository.js", () => ({ AuthRepository: {} }));
vi.mock("./auditoria.controller.js", () => ({ AuditoriaController: {
  getAll: vi.fn(), getTablas: vi.fn(), getActores: vi.fn(), getCounts: vi.fn(), exportarCsv: vi.fn(),
} }));
const { default: router } = await import("./auditoria.routes.js");

describe("acceso a auditoría", () => {
  it.each(["/", "/tablas", "/actores", "/counts", "/export"])("protege %s con el middleware real de roles", path => {
    const route = router.stack.find(layer => layer.route?.path === path)!.route!;
    const guard = route.stack[0]!.handle as (req: Request, res: Response, next: NextFunction) => void;
    for (const role of [undefined, "Monitorista", "Seguridad Operativa", "Jefe de Área", "Admin"]) {
      const next = vi.fn();
      const json = vi.fn();
      const status = vi.fn().mockReturnValue({ json });
      guard({ user: role ? { rol_nombre: role } : undefined } as unknown as Request, { status } as unknown as Response, next);
      if (role === "Admin") expect(next).toHaveBeenCalledOnce();
      else {
        expect(status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
      }
    }
  });
});
