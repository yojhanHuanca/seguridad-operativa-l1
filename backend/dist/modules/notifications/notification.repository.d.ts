/**
 * Tipos de notificación. Viajan en la columna `tipo` (VarChar 50) y el front
 * los usa para elegir icono y color, así que son parte del contrato: no se
 * renombran sin tocar el cliente.
 */
export type TipoNotificacion = "reporte_nuevo" | "plan_asignado" | "plan_aceptado" | "prorroga_solicitada" | "prorroga_resuelta" | "ejecucion_completada" | "plan_revisado" | "caso_devuelto" | "info_respondida" | "evento_asignado";
/** Rol destinatario, o un usuario concreto cuando la notificación es personal. */
export type Destinatario = {
    rol: string;
} | {
    id_usuario: number;
};
/**
 * Cliente mínimo que necesita `emitir`. Igual que TimelineClient en el módulo
 * de casos: permite emitir dentro de una transacción o fuera de ella.
 */
type NotificationClient = {
    usuarios: {
        findMany: (args: {
            where: {
                roles: {
                    nombre_rol: string;
                };
                estado?: {
                    not: string;
                };
            };
            select: {
                id_usuario: true;
            };
        }) => Promise<{
            id_usuario: number;
        }[]>;
    };
    notificaciones: {
        createMany: (args: {
            data: {
                usuario: number;
                titulo: string;
                mensaje: string;
                tipo: string;
            }[];
        }) => Promise<unknown>;
    };
};
export interface NuevaNotificacion {
    para: Destinatario;
    tipo: TipoNotificacion;
    titulo: string;
    mensaje: string;
}
export declare class NotificationRepository {
    /**
     * Crea la notificación para todos los destinatarios que correspondan.
     *
     * Nunca lanza: una notificación es un efecto secundario del flujo, y que
     * falle no debe tumbar la transición del caso que la originó. Si algo sale
     * mal se registra en consola y el flujo continúa.
     *
     * TODO(auth): hoy el destinatario se resuelve por rol porque no hay sesión
     * real. Con login, las notificaciones de SO deberían ir al analista que
     * tiene el caso asignado y no a todos los del rol.
     */
    static emitir(client: NotificationClient, n: NuevaNotificacion): Promise<void>;
    /**
     * Pide `limit + 1` filas para saber si hay más sin una consulta de `count`
     * aparte — si vuelven de más, se recorta la última y `hasMore` queda true.
     */
    static listarPorUsuario(id_usuario: number, opts?: {
        soloNoLeidas?: boolean;
        limit?: number;
    }): Promise<{
        items: {
            usuario: number;
            fecha: Date | null;
            titulo: string | null;
            tipo: string | null;
            id_notificacion: number;
            mensaje: string | null;
            leido: boolean | null;
        }[];
        hasMore: boolean;
    }>;
    static contarNoLeidas(id_usuario: number): Promise<number>;
    /** Marca una notificación como leída, verificando que sea de ese usuario. */
    static marcarLeida(id_notificacion: number, id_usuario: number): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    static marcarTodasLeidas(id_usuario: number): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
}
export {};
//# sourceMappingURL=notification.repository.d.ts.map