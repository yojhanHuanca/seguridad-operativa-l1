import prisma from "../../lib/prisma.js";
export class EstacionRepository {
    static async findAll() {
        return prisma.estaciones.findMany({
            orderBy: { nombre_estacion: "asc" },
        });
    }
    static async findByNombre(nombre_estacion) {
        return prisma.estaciones.findUnique({ where: { nombre_estacion } });
    }
    static async create(nombre_estacion) {
        return prisma.estaciones.create({ data: { nombre_estacion } });
    }
    static async update(id_estacion, nombre_estacion) {
        return prisma.estaciones.update({ where: { id_estacion }, data: { nombre_estacion } });
    }
    static async countUsage(id_estacion) {
        return prisma.incidencias.count({ where: { id_estacion } });
    }
    static async remove(id_estacion) {
        return prisma.estaciones.delete({ where: { id_estacion } });
    }
}
//# sourceMappingURL=estacion.repository.js.map