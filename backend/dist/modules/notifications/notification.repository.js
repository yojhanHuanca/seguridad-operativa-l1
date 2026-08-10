import prisma from "../../lib/prisma.js";
export class NotificationRepository {
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
    static async emitir(client, n) {
        try {
            const ids = "id_usuario" in n.para
                ? [n.para.id_usuario]
                : (await client.usuarios.findMany({
                    where: { roles: { nombre_rol: n.para.rol }, estado: { not: "Inactivo" } },
                    select: { id_usuario: true },
                })).map((u) => u.id_usuario);
            if (ids.length === 0)
                return;
            await client.notificaciones.createMany({
                data: ids.map((usuario) => ({ usuario, titulo: n.titulo, mensaje: n.mensaje, tipo: n.tipo })),
            });
        }
        catch (error) {
            console.error("[notificaciones] no se pudo emitir", n.tipo, error);
        }
    }
    static async listarPorUsuario(id_usuario, soloNoLeidas = false) {
        return prisma.notificaciones.findMany({
            where: { usuario: id_usuario, ...(soloNoLeidas ? { leido: false } : {}) },
            orderBy: { fecha: "desc" },
            take: 100,
        });
    }
    static async contarNoLeidas(id_usuario) {
        return prisma.notificaciones.count({ where: { usuario: id_usuario, leido: false } });
    }
    /** Marca una notificación como leída, verificando que sea de ese usuario. */
    static async marcarLeida(id_notificacion, id_usuario) {
        const resultado = await prisma.notificaciones.updateMany({
            where: { id_notificacion, usuario: id_usuario },
            data: { leido: true },
        });
        if (resultado.count === 0)
            throw new Error("La notificación no existe o no pertenece al usuario");
        return resultado;
    }
    static async marcarTodasLeidas(id_usuario) {
        return prisma.notificaciones.updateMany({
            where: { usuario: id_usuario, leido: false },
            data: { leido: true },
        });
    }
}
//# sourceMappingURL=notification.repository.js.map