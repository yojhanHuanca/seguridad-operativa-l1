import type { Request, Response } from "express";
import { ZodError } from "zod";
import { NotificationService } from "./notification.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";

/** Misma convención que case.controller: valida el parámetro de ruta. */
function param(req: Request, name: string): string {
  const value = req.params[name];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Parámetro de ruta inválido: ${name}`);
  }
  return value;
}

function fallo(res: Response, error: unknown, mensaje: string) {
  if (error instanceof ZodError) {
    return res.status(400).json(ApiResponse.error("Datos inválidos", error.issues));
  }
  return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : mensaje));
}

export class NotificationController {
  static async list(req: Request, res: Response) {
    try {
      const data = await NotificationService.list(
        {
          soloNoLeidas: req.query.soloNoLeidas === "true" ? "true" : undefined,
          limit: typeof req.query.limit === "string" ? req.query.limit : undefined,
        },
        (req as AuthenticatedRequest).user
      );
      return res.json(ApiResponse.success("Notificaciones obtenidas correctamente", data));
    } catch (error) {
      return fallo(res, error, "No se pudieron obtener las notificaciones");
    }
  }

  static async markRead(req: Request, res: Response) {
    try {
      await NotificationService.markRead(param(req, "id"), (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Notificación marcada como leída"));
    } catch (error) {
      return fallo(res, error, "No se pudo marcar la notificación");
    }
  }

  static async markAllRead(req: Request, res: Response) {
    try {
      const r = await NotificationService.markAllRead((req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Notificaciones marcadas como leídas", { actualizadas: r.count }));
    } catch (error) {
      return fallo(res, error, "No se pudieron marcar las notificaciones");
    }
  }
}
