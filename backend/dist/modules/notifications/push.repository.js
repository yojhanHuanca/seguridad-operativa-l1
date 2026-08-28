import prisma from "../../lib/prisma.js";
export class PushRepository {
    /**
     * `upsert` por `endpoint` (no por usuario): un mismo navegador/dispositivo
     * puede volver a suscribirse (permiso revocado y vuelto a aceptar, u otro
     * usuario en el mismo equipo) y el endpoint es lo único realmente único.
     */
    static async guardar(id_usuario, sub) {
        return prisma.push_subscriptions.upsert({
            where: { endpoint: sub.endpoint },
            update: { usuario: id_usuario, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
            create: { usuario: id_usuario, endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
        });
    }
    static async eliminar(endpoint) {
        await prisma.push_subscriptions.deleteMany({ where: { endpoint } });
    }
    static async listarPorUsuarios(ids) {
        if (ids.length === 0)
            return [];
        return prisma.push_subscriptions.findMany({ where: { usuario: { in: ids } } });
    }
}
//# sourceMappingURL=push.repository.js.map