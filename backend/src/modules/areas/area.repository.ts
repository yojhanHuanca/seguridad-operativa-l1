import prisma from "../../lib/prisma.js";

export class AreaRepository {
  static async findAll() {
    return prisma.areas.findMany({
      orderBy: { nombre_area: "asc" },
    });
  }

  static async findByNombre(nombre_area: string) {
    return prisma.areas.findUnique({ where: { nombre_area } });
  }

  static async create(nombre_area: string) {
    return prisma.areas.create({ data: { nombre_area } });
  }

  static async update(id_area: number, nombre_area: string) {
    return prisma.areas.update({ where: { id_area }, data: { nombre_area } });
  }

  static async countUsage(id_area: number) {
    const [usuarios, casos_sop, planes_accion, incidencias] = await Promise.all([
      prisma.usuarios.count({ where: { id_area } }),
      prisma.casos_sop.count({ where: { area_responsable: id_area } }),
      prisma.planes_accion.count({ where: { id_area } }),
      prisma.incidencias.count({ where: { id_area_responsable: id_area } }),
    ]);
    return usuarios + casos_sop + planes_accion + incidencias;
  }

  static async remove(id_area: number) {
    return prisma.areas.delete({ where: { id_area } });
  }
}
