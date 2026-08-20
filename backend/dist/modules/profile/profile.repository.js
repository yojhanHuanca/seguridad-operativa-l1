import prisma from "../../lib/prisma.js";
const PUBLIC_SELECT = {
    id_usuario: true,
    codigo_usuario: true,
    nombre: true,
    correo: true,
    cargo: true,
    telefono: true,
    estado: true,
    foto_url: true,
    ultimo_acceso: true,
    fecha_ingreso: true,
    id_area: true,
    id_rol: true,
    roles: { select: { nombre_rol: true } },
    areas: { select: { nombre_area: true } },
};
export class ProfileRepository {
    static async findById(id_usuario) {
        return prisma.usuarios.findUnique({ where: { id_usuario }, select: PUBLIC_SELECT });
    }
    static async findPasswordHash(id_usuario) {
        return prisma.usuarios.findUnique({
            where: { id_usuario },
            select: { password_hash: true },
        });
    }
    static async updateContact(id_usuario, data) {
        return prisma.usuarios.update({ where: { id_usuario }, data, select: PUBLIC_SELECT });
    }
    static async updatePassword(id_usuario, password_hash) {
        return prisma.usuarios.update({ where: { id_usuario }, data: { password_hash } });
    }
    static async countCasosResponsable(id_usuario) {
        return prisma.casos_sop.count({ where: { responsable_hallazgo: id_usuario } });
    }
    static async countCasosCreados(id_usuario) {
        return prisma.casos_sop.count({ where: { created_by: id_usuario } });
    }
    static async countPlanesAsignados(id_usuario) {
        return prisma.planes_accion.count({ where: { responsable: id_usuario } });
    }
    static async countPlanesCerrados(id_usuario) {
        return prisma.planes_accion.count({
            where: { responsable: id_usuario, catalogo_detalle: { nombre: "Cerrado" } },
        });
    }
    static async countEventosRegistrados(id_usuario) {
        return prisma.eventos_monitoreo.count({ where: { usuario_registra: id_usuario } });
    }
    static async countUsuariosActivos() {
        return prisma.usuarios.count({ where: { estado: "Activo" } });
    }
    static async countAreas() {
        return prisma.areas.count();
    }
}
//# sourceMappingURL=profile.repository.js.map