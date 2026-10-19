import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./auth.middleware.js";

export function requireUpdatedPassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user?.debe_cambiar_password) return next();
  if ((req.method === "GET" && req.path === "/profile/me") ||
      (req.method === "PATCH" && req.path === "/profile/me/password")) return next();
  return res.status(403).json({ success: false, code: "PASSWORD_CHANGE_REQUIRED", message: "Debes cambiar tu contraseña temporal antes de continuar" });
}
