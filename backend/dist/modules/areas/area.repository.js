import prisma from "../../lib/prisma.js";
export class AreaRepository {
    static async findAll() {
        return prisma.areas.findMany({
            orderBy: { nombre_area: "asc" },
        });
    }
}
//# sourceMappingURL=area.repository.js.map