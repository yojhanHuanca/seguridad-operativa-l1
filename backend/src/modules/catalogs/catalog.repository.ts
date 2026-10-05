import prisma from "../../lib/prisma.js";

export class CatalogRepository {
  static async countUnitReferences(id_detalle: number) {
    const counts = await Promise.all([
      prisma.eventos_monitoreo.count({ where: { numero_mr: id_detalle } }),
      prisma.eventos_operativos.count({ where: { numero_mr: id_detalle } }),
    ]);
    return counts.reduce((total, count) => total + count, 0);
  }
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
            codigo: true, clasificacion_mr: true,
            nombre: true,
            descripcion: true,
            color: true,
            orden: true,
          },
        },
      },
    });
  }

  static async findGroupWithAllDetalle(id_catalogo: number) {
    return prisma.catalogos.findUnique({
      where: { id_catalogo },
      include: {
        catalogo_detalle: {
          orderBy: { orden: "asc" },
          select: { id_detalle: true, codigo: true, clasificacion_mr: true, nombre: true, descripcion: true, color: true, orden: true, estado: true },
        },
      },
    });
  }

  static findGroup(id_catalogo: number) { return prisma.catalogos.findUnique({ where: { id_catalogo } }); }
  static listNames(id_catalogo: number) { return prisma.catalogo_detalle.findMany({ where: { id_catalogo }, select: { id_detalle: true, nombre: true } }); }
  static async findDetalleById(id_detalle: number) {
    return prisma.catalogo_detalle.findUnique({
      where: { id_detalle },
      include: { catalogos: { select: { nombre: true } } },
    });
  }

  static async findDetalleByNombre(id_catalogo: number, nombre: string) {
    return prisma.catalogo_detalle.findFirst({ where: { id_catalogo, nombre } });
  }

  static async createDetalle(id_catalogo: number, nombre: string, clasificacion_mr?: string) {
    const count = await prisma.catalogo_detalle.count({ where: { id_catalogo } });
    return prisma.catalogo_detalle.create({
      data: { id_catalogo, nombre, ...(clasificacion_mr !== undefined ? { clasificacion_mr } : {}), orden: count + 1 },
    });
  }

  static async updateDetalle(id_detalle: number, nombre: string, clasificacion_mr?: string) {
    return prisma.catalogo_detalle.update({ where: { id_detalle }, data: { nombre, ...(clasificacion_mr !== undefined ? { clasificacion_mr } : {}) } });
  }

  static async setDetalleEstado(id_detalle: number, estado: boolean) {
    return prisma.catalogo_detalle.update({ where: { id_detalle }, data: { estado } });
  }
}
