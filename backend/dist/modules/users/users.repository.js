import prisma from "../../lib/prisma.js";
export class UserRepository {
    static async findAll() {
        return prisma.usuarios.findMany({
            include: {
                roles: true,
                areas: true,
            },
            orderBy: {
                id_usuario: "asc",
            },
        });
    }
}
//# sourceMappingURL=users.repository.js.map