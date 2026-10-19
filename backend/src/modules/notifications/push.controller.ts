import type { Request, Response } from "express";
import { PushService } from "./push.service.js";
import { ApiResponse, safeErrorMessage } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";

export class PushController {
  static config(_req: Request, res: Response) {
    return res.json(ApiResponse.success("Configuración de notificaciones", PushService.config()));
  }

  static async status(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await PushService.estado(req.user!.id_usuario, req.body?.endpoint);
      return res.json(ApiResponse.success("Estado de notificaciones", data));
    } catch {
      return res.status(400).json(ApiResponse.error("No se pudo comprobar la suscripción"));
    }
  }

  static async test(req: AuthenticatedRequest, res: Response) {
    if (!PushService.habilitado) return res.status(503).json(ApiResponse.error("Las notificaciones push no están configuradas en el servidor"));
    try {
      await PushService.probar(req.user!.id_usuario, req.body?.endpoint);
      return res.json(ApiResponse.success("Aviso de prueba enviado"));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo enviar el aviso")));
    }
  }
  static async subscribe(req: Request, res: Response) {
    if (!PushService.habilitado) return res.status(503).json(ApiResponse.error("Las notificaciones push no están configuradas en el servidor"));
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
