import prisma from "../../lib/prisma.js";

export class EstacionRepository {
  static async findAll() {
    return prisma.estaciones.findMany({
      orderBy: { nombre_estacion: "asc" },
    });
  }

  static async findByNombre(nombre_estacion: string) {
    return prisma.estaciones.findUnique({ where: { nombre_estacion } });
  }

  static async create(nombre_estacion: string) {
    return prisma.estaciones.create({ data: { nombre_estacion } });
  }

  static async update(id_estacion: number, nombre_estacion: string) {
    return prisma.estaciones.update({ where: { id_estacion }, data: { nombre_estacion } });
  }

  static async countUsage(id_estacion: number) {
    return prisma.incidencias.count({ where: { id_estacion } });
  }

  static async remove(id_estacion: number) {
    return prisma.estaciones.delete({ where: { id_estacion } });
  }
}
