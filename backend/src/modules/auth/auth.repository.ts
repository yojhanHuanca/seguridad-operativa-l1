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

  static async crearSesion(usuario: number, direccion_ip?: string, navegador?: string) {
    return prisma.sesiones.create({
      data: {
        usuario,
        fecha_inicio: new Date(),
        estado: "activa",
        direccion_ip: direccion_ip ?? null,
        navegador: navegador ?? null,
      },
    });
  }

  static async cerrarSesion(id_sesion: number) {
    // No usa `update` a secas: si el id no existe (token viejo con un
    // id_sesion inválido, o ya cerrada dos veces) no debe tumbar el logout.
    return prisma.sesiones.updateMany({
      where: { id_sesion },
      data: { estado: "cerrada", fecha_fin: new Date() },
    });
  }

  static async sesionActiva(id_sesion: number) {
    const sesion = await prisma.sesiones.findUnique({ where: { id_sesion }, select: { estado: true } });
    return sesion?.estado === "activa";
  }

}
