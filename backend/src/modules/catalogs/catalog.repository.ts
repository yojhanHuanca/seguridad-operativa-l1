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

  static async findDetalleById(id_detalle: number) {
    return prisma.catalogo_detalle.findUnique({
      where: { id_detalle },
      include: { catalogos: { select: { nombre: true } } },
    });
  }
}
