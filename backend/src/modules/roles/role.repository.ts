import prisma from "../../lib/prisma.js";

export class RoleRepository {
  static async findAll() {
    return prisma.roles.findMany({
      select: { id_rol: true, nombre_rol: true },
      orderBy: { id_rol: "asc" },
    });
  }

  static async findById(id: number) {
    return prisma.roles.findUnique({
      where: { id_rol: id },
      select: { id_rol: true, nombre_rol: true },
    });
  }
}
