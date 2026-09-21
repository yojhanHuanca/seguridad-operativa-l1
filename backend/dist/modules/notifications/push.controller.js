import { PushService } from "./push.service.js";
import { ApiResponse, safeErrorMessage } from "../../utils/ApiResponse.js";
export class PushController {
    static async subscribe(req, res) {
        try {
            const actor = req.user;
            if (!actor?.id_usuario)
                throw new Error("Sesión no válida");
            await PushService.suscribir(actor.id_usuario, req.body);
            return res.json(ApiResponse.success("Suscripción a notificaciones push guardada"));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo guardar la suscripción")));
        }
    }
    static async unsubscribe(req, res) {
        try {
            const actor = req.user;
            if (!actor?.id_usuario)
                throw new Error("Sesión no válida");
            await PushService.desuscribir(req.body?.endpoint, actor.id_usuario);
            return res.json(ApiResponse.success("Suscripción a notificaciones push eliminada"));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo eliminar la suscripción")));
        }
    }
}
//# sourceMappingURL=push.controller.js.map