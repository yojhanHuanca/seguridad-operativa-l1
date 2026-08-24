import prisma from "../../lib/prisma.js";
export class AuthRepository {
    static async findByEmail(correo) {
        return await prisma.usuarios.findUnique({
            where: {
                correo,
            },
            include: {
                roles: true,
                areas: true,
            },
        });
    }
    static async updateUltimoAcceso(id_usuario) {
        return prisma.usuarios.update({ where: { id_usuario }, data: { ultimo_acceso: new Date() } });
    }
    static async healthCheck() {
        await prisma.$queryRaw `SELECT 1`;
        return true;
    }
    static async crearSesion(usuario, direccion_ip, navegador) {
        return prisma.sesiones.create({
            data: {
                usuario,
                fecha_inicio: new Date(),
                estado: "activa",
                direccion_ip: direccion_ip ?? null,
                navegador: navegador ?? null,
            },
        });
    }
    static async cerrarSesion(id_sesion) {
        // No usa `update` a secas: si el id no existe (token viejo con un
        // id_sesion inválido, o ya cerrada dos veces) no debe tumbar el logout.
        return prisma.sesiones.updateMany({
            where: { id_sesion },
            data: { estado: "cerrada", fecha_fin: new Date() },
        });
    }
    static async sesionActiva(id_sesion) {
        const sesion = await prisma.sesiones.findUnique({ where: { id_sesion }, select: { estado: true } });
        return sesion?.estado === "activa";
    }
    /** Al resetear la contraseña se cierran todas las sesiones activas — si alguien más tenía el token viejo, queda afuera. */
    static async cerrarTodasLasSesiones(usuario) {
        return prisma.sesiones.updateMany({
            where: { usuario, estado: "activa" },
            data: { estado: "cerrada", fecha_fin: new Date() },
        });
    }
    static async crearPasswordReset(usuario, token_hash, expires_at) {
        return prisma.password_resets.create({ data: { usuario, token_hash, expires_at } });
    }
    static async findPasswordResetVigente(token_hash) {
        return prisma.password_resets.findFirst({
            where: { token_hash, used_at: null, expires_at: { gt: new Date() } },
        });
    }
    static async marcarPasswordResetUsado(id_reset) {
        return prisma.password_resets.update({ where: { id_reset }, data: { used_at: new Date() } });
    }
    /** Invalida cualquier link de recuperación anterior sin usar: solo el más reciente debe servir. */
    static async invalidarPasswordResetsPendientes(usuario) {
        return prisma.password_resets.updateMany({
            where: { usuario, used_at: null },
            data: { used_at: new Date() },
        });
    }
}
//# sourceMappingURL=auth.repository.js.map