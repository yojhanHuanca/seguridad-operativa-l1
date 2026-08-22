import { ZodError } from "zod";
import { NotificationService } from "./notification.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
/** Misma convención que case.controller: valida el parámetro de ruta. */
function param(req, name) {
    const value = req.params[name];
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`Parámetro de ruta inválido: ${name}`);
    }
    return value;
}
function fallo(res, error, mensaje) {
    if (error instanceof ZodError) {
        return res.status(400).json(ApiResponse.error("Datos inválidos", error.issues));
    }
    return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : mensaje));
}
export class NotificationController {
    static async list(req, res) {
        try {
            const data = await NotificationService.list(req.query.soloNoLeidas === "true" ? { soloNoLeidas: "true" } : {}, req.user);
            return res.json(ApiResponse.success("Notificaciones obtenidas correctamente", data));
        }
        catch (error) {
            return fallo(res, error, "No se pudieron obtener las notificaciones");
        }
    }
    static async markRead(req, res) {
        try {
            await NotificationService.markRead(param(req, "id"), req.user);
            return res.json(ApiResponse.success("Notificación marcada como leída"));
        }
        catch (error) {
            return fallo(res, error, "No se pudo marcar la notificación");
        }
    }
    static async markAllRead(req, res) {
        try {
            const r = await NotificationService.markAllRead(req.user);
            return res.json(ApiResponse.success("Notificaciones marcadas como leídas", { actualizadas: r.count }));
        }
        catch (error) {
            return fallo(res, error, "No se pudieron marcar las notificaciones");
        }
    }
}
//# sourceMappingURL=notification.controller.js.map