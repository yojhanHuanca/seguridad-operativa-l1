import { z } from "zod";
import { NotificationRepository } from "./notification.repository.js";
const idPositivo = z.coerce.number().int().positive();
/**
 * Bandeja de quien está en sesión. Antes esto salía de un `?usuario=` que
 * mandaba el cliente (y si no venía, del primer usuario con rol Seguridad
 * Operativa), así que cualquiera podía leer y marcar como leída la bandeja de
 * cualquier otro. Ahora el destinatario es siempre el del token.
 */
function usuarioEnSesion(actor) {
    if (!actor?.id_usuario)
        throw new Error("Sesión no válida");
    return actor.id_usuario;
}
export class NotificationService {
    static async list(query, actor) {
        const id = usuarioEnSesion(actor);
        const soloNoLeidas = query.soloNoLeidas === "true";
        const [items, noLeidas] = await Promise.all([
            NotificationRepository.listarPorUsuario(id, soloNoLeidas),
            NotificationRepository.contarNoLeidas(id),
        ]);
        return { id_usuario: id, no_leidas: noLeidas, items };
    }
    static async markRead(idNotificacion, actor) {
        const id = usuarioEnSesion(actor);
        return NotificationRepository.marcarLeida(idPositivo.parse(idNotificacion), id);
    }
    static async markAllRead(actor) {
        const id = usuarioEnSesion(actor);
        return NotificationRepository.marcarTodasLeidas(id);
    }
}
//# sourceMappingURL=notification.service.js.map