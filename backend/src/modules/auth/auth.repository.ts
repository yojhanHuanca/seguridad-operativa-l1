import prisma from "../../lib/prisma.js";

export class AuthRepository {

  static async findByEmail(correo: string) {
    return await prisma.usuarios.findUnique({
      where: {
        correo,
      },
      include: {
        roles: true,
        areas: true,
      },
    });
  }

  static async healthCheck() {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  }

}
