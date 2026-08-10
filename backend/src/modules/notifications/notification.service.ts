import { z } from "zod";
import prisma from "../../lib/prisma.js";
import { NotificationRepository } from "./notification.repository.js";

const idPositivo = z.coerce.number().int().positive();

/**
 * Resuelve de quién son las notificaciones que se piden.
 *
 * TODO(auth): mientras no exista sesión real, el cliente manda `?usuario=` o,
 * si no lo manda, se cae al primer usuario con rol de Seguridad Operativa —
 * el mismo criterio que ya usa el shell del front para decidir quién está
 * conectado. Con login esto debe salir de `req.user.id_usuario` y dejar de
 * aceptar el parámetro, porque hoy permite leer la bandeja de cualquiera.
 */
export async function resolverUsuario(usuarioParam?: string): Promise<number> {
  if (usuarioParam) return idPositivo.parse(usuarioParam);

  const so = await prisma.usuarios.findFirst({
    where: { roles: { nombre_rol: "Seguridad Operativa" } },
    select: { id_usuario: true },
    orderBy: { id_usuario: "asc" },
  });
  if (!so) throw new Error("No hay ningún usuario con rol Seguridad Operativa");
  return so.id_usuario;
}

export class NotificationService {
  static async list(query: { usuario?: string; soloNoLeidas?: string }) {
    const id = await resolverUsuario(query.usuario);
    const soloNoLeidas = query.soloNoLeidas === "true";
    const [items, noLeidas] = await Promise.all([
      NotificationRepository.listarPorUsuario(id, soloNoLeidas),
      NotificationRepository.contarNoLeidas(id),
    ]);
    return { id_usuario: id, no_leidas: noLeidas, items };
  }

  static async markRead(idNotificacion: string, query: { usuario?: string }) {
    const id = await resolverUsuario(query.usuario);
    return NotificationRepository.marcarLeida(idPositivo.parse(idNotificacion), id);
  }

  static async markAllRead(query: { usuario?: string }) {
    const id = await resolverUsuario(query.usuario);
    return NotificationRepository.marcarTodasLeidas(id);
  }
}
