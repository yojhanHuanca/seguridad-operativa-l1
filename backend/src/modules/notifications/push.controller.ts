import type { Request, Response } from "express";
import { PushService } from "./push.service.js";
import { ApiResponse, safeErrorMessage } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";

export class PushController {
  static async subscribe(req: Request, res: Response) {
    try {
      const actor = (req as AuthenticatedRequest).user;
      if (!actor?.id_usuario) throw new Error("Sesión no válida");
      await PushService.suscribir(actor.id_usuario, req.body);
      return res.json(ApiResponse.success("Suscripción a notificaciones push guardada"));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo guardar la suscripción")));
    }
  }

  static async unsubscribe(req: Request, res: Response) {
    try {
      const actor = (req as AuthenticatedRequest).user;
      if (!actor?.id_usuario) throw new Error("Sesión no válida");
      await PushService.desuscribir(req.body?.endpoint, actor.id_usuario);
      return res.json(ApiResponse.success("Suscripción a notificaciones push eliminada"));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo eliminar la suscripción")));
    }
  }
}
