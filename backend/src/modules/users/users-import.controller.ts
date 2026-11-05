import type { Response } from "express";
import { ZodError } from "zod";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { UsersImportService, UsersImportValidationError } from "./users-import.service.js";

export class UsersImportController {
  static async validar(req: AuthenticatedRequest, res: Response) {
    res.setHeader("Cache-Control", "no-store");
    try {
      return res.json(ApiResponse.success("Validación de usuarios", await UsersImportService.validar(req.body)));
    } catch (error) {
      return res.status(error instanceof ZodError ? 400 : 500).json(ApiResponse.error(
        error instanceof ZodError ? "Formato inválido: utiliza solo los seis campos amarillos y hasta 200 filas." : "No se pudo validar el archivo. Intenta nuevamente.",
      ));
    }
  }

  static async importar(req: AuthenticatedRequest, res: Response) {
    res.setHeader("Cache-Control", "no-store");
    if (!req.user) return res.status(401).json(ApiResponse.error("Sesión requerida"));
    try {
      return res.status(201).json(ApiResponse.success("Usuarios importados", await UsersImportService.importar(req.body, req.user, req.ip)));
    } catch (error) {
      if (error instanceof UsersImportValidationError) {
        return res.status(409).json({ ...ApiResponse.error(error.message), data: error.preview });
      }
      if (error instanceof ZodError) return res.status(400).json(ApiResponse.error("Formato de importación inválido."));
      return res.status(409).json(ApiResponse.error("No se pudo completar la carga. Consulta Gestión de Usuarios y vuelve a validar el archivo antes de reintentar."));
    }
  }
}
