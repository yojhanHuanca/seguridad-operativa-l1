import type { Actor } from "../../utils/actor.js";
export declare class NotificationService {
    static list(query: {
        soloNoLeidas?: string;
    }, actor?: Actor): Promise<{
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
    static markRead(idNotificacion: string, actor?: Actor): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    static markAllRead(actor?: Actor): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
}
//# sourceMappingURL=notification.service.d.ts.map