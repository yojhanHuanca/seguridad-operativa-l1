import prisma from "../../lib/prisma.js";
export class UserRepository {
    static async findAll() {
        return prisma.usuarios.findMany({
            select: {
                id_usuario: true,
                codigo_usuario: true,
                nombre: true,
                correo: true,
                cargo: true,
                telefono: true,
                estado: true,
                roles: {
                    select: {
                        nombre_rol: true,
                    },
                },
            },
            orderBy: {
                id_usuario: "asc",
            },
        });
    }
    static async findById(id) {
        return await prisma.usuarios.findUnique({
            where: {
                id_usuario: id,
            },
            include: {
                roles: true,
                areas: true,
            },
        });
    }
    static async create(data) {
        return await prisma.usuarios.create({
            data: {
                codigo_usuario: data.codigo_usuario,
                nombre: data.nombre,
                correo: data.correo,
                password_hash: data.password_hash,
                cargo: data.cargo ?? null,
                telefono: data.telefono ?? null,
                id_area: data.id_area,
                id_rol: data.id_rol,
                estado: "Activo",
            },
        });
    }
    static async findByEmail(email) {
        return await prisma.usuarios.findUnique({
            where: {
                correo: email,
            },
        });
    }
    static async findByCodigo(codigo) {
        return await prisma.usuarios.findUnique({
            where: {
                codigo_usuario: codigo,
            },
        });
    }
}
//# sourceMappingURL=users.repository.js.map