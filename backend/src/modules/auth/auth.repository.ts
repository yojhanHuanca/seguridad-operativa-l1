import prisma from "../../lib/prisma.js";

export class AuthRepository {
  static async healthCheck() {
    return await prisma.$queryRaw`SELECT 1`;
  }
}
