import prisma from "../../lib/prisma.js";
export class RoleRepository {
    static async findAll() {
        return prisma.roles.findMany({
            select: { id_rol: true, nombre_rol: true },
            orderBy: { id_rol: "asc" },
        });
    }
}
//# sourceMappingURL=role.repository.js.map