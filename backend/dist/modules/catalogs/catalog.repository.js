import prisma from "../../lib/prisma.js";
export class CatalogRepository {
    static async findAllGroups() {
        return prisma.catalogos.findMany({
            where: { estado: true },
            orderBy: { nombre: "asc" },
            include: {
                catalogo_detalle: {
                    where: { estado: true },
                    orderBy: { orden: "asc" },
                    select: {
                        id_detalle: true,
                        codigo: true,
                        nombre: true,
                        descripcion: true,
                        color: true,
                        orden: true,
                    },
                },
            },
        });
    }
    static async findGroupWithAllDetalle(id_catalogo) {
        return prisma.catalogos.findUnique({
            where: { id_catalogo },
            include: {
                catalogo_detalle: {
                    orderBy: { orden: "asc" },
                    select: { id_detalle: true, codigo: true, nombre: true, descripcion: true, color: true, orden: true, estado: true },
                },
            },
        });
    }
    static async findDetalleById(id_detalle) {
        return prisma.catalogo_detalle.findUnique({
            where: { id_detalle },
            include: { catalogos: { select: { nombre: true } } },
        });
    }
    static async findDetalleByNombre(id_catalogo, nombre) {
        return prisma.catalogo_detalle.findFirst({ where: { id_catalogo, nombre } });
    }
    static async createDetalle(id_catalogo, nombre) {
        const count = await prisma.catalogo_detalle.count({ where: { id_catalogo } });
        return prisma.catalogo_detalle.create({
            data: { id_catalogo, nombre, orden: count + 1 },
        });
    }
    static async updateDetalle(id_detalle, nombre) {
        return prisma.catalogo_detalle.update({ where: { id_detalle }, data: { nombre } });
    }
    static async setDetalleEstado(id_detalle, estado) {
        return prisma.catalogo_detalle.update({ where: { id_detalle }, data: { estado } });
    }
}
//# sourceMappingURL=catalog.repository.js.map