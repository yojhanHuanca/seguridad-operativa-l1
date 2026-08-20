/**
 * Resuelve de quién son las notificaciones que se piden.
 *
 * TODO(auth): mientras no exista sesión real, el cliente manda `?usuario=` o,
 * si no lo manda, se cae al primer usuario con rol de Seguridad Operativa —
 * el mismo criterio que ya usa el shell del front para decidir quién está
 * conectado. Con login esto debe salir de `req.user.id_usuario` y dejar de
 * aceptar el parámetro, porque hoy permite leer la bandeja de cualquiera.
 */
export declare function resolverUsuario(usuarioParam?: string): Promise<number>;
export declare class NotificationService {
    static list(query: {
        usuario?: string;
        soloNoLeidas?: string;
    }): Promise<{
        id_usuario: number;
        no_leidas: number;
        items: {
            usuario: number;
            fecha: Date | null;
            titulo: string | null;
            tipo: string | null;
            id_notificacion: number;
            mensaje: string | null;
            leido: boolean | null;
        }[];
    }>;
    static markRead(idNotificacion: string, query: {
        usuario?: string;
    }): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    static markAllRead(query: {
        usuario?: string;
    }): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
}
//# sourceMappingURL=notification.service.d.ts.map