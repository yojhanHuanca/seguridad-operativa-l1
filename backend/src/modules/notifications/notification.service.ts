import { z } from "zod";
import { NotificationRepository } from "./notification.repository.js";
import type { Actor } from "../../utils/actor.js";

const idPositivo = z.coerce.number().int().positive();

/**
 * Bandeja de quien está en sesión. Antes esto salía de un `?usuario=` que
 * mandaba el cliente (y si no venía, del primer usuario con rol Seguridad
 * Operativa), así que cualquiera podía leer y marcar como leída la bandeja de
 * cualquier otro. Ahora el destinatario es siempre el del token.
 */
function usuarioEnSesion(actor?: Actor): number {
  if (!actor?.id_usuario) throw new Error("Sesión no válida");
  return actor.id_usuario;
}

export class NotificationService {
  static async list(query: { soloNoLeidas?: string | undefined; limit?: string | undefined }, actor?: Actor) {
    const id = usuarioEnSesion(actor);
    const soloNoLeidas = query.soloNoLeidas === "true";
    // Tope en 100 para que nadie pida una página gigante por accidente.
    const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);
    const [{ items, hasMore }, noLeidas] = await Promise.all([
      NotificationRepository.listarPorUsuario(id, { soloNoLeidas, limit }),
      NotificationRepository.contarNoLeidas(id),
    ]);
    return { id_usuario: id, no_leidas: noLeidas, items, hasMore };
  }

  static async markRead(idNotificacion: string, actor?: Actor) {
    const id = usuarioEnSesion(actor);
    return NotificationRepository.marcarLeida(idPositivo.parse(idNotificacion), id);
  }

  static async markAllRead(actor?: Actor) {
    const id = usuarioEnSesion(actor);
    return NotificationRepository.marcarTodasLeidas(id);
  }
}
