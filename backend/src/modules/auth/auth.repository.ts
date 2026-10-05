import prisma from "../../lib/prisma.js";

export class AuthRepository {

  static async findByEmail(correo: string) {
    const matches = await prisma.usuarios.findMany({
      where: {
        correo: { equals: correo.trim(), mode: "insensitive" },
      },
      include: {
        roles: true,
        areas: true,
      },
      take: 2,
    });
    // Never authenticate an arbitrary account if legacy records differ only
    // by email casing. New accounts reject those duplicates on creation.
    return matches.length === 1 ? matches[0]! : null;
  }

  static async updateUltimoAcceso(id_usuario: number) {
    return prisma.usuarios.update({ where: { id_usuario }, data: { ultimo_acceso: new Date() } });
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

  /** Devuelve la autorización vigente de una sesión, sin confiar en roles o permisos del JWT. */
  static async obtenerActorDeSesion(id_sesion: number, id_usuario: number) {
    const sesion = await prisma.sesiones.findFirst({
      where: { id_sesion, usuario: id_usuario, estado: "activa" },
      select: {
        usuarios: {
          select: {
            id_usuario: true,
            correo: true,
            nombre: true,
            id_rol: true,
            id_area: true,
            estado: true,
            es_responsable: true,
            puede_reabrir_casos: true,
            puede_rechazar_reportes: true,
            roles: { select: { nombre_rol: true } },
          },
        },
      },
    });
    const usuario = sesion?.usuarios;
    if (!usuario || usuario.estado?.toLowerCase() !== "activo" || usuario.id_rol == null || !usuario.roles) return null;
    return {
      id_usuario: usuario.id_usuario,
      correo: usuario.correo,
      nombre: usuario.nombre,
      rol: usuario.id_rol,
      rol_nombre: usuario.roles.nombre_rol,
      id_area: usuario.id_area,
      es_responsable: usuario.es_responsable,
      puede_reabrir_casos: usuario.puede_reabrir_casos,
      puede_rechazar_reportes: usuario.puede_rechazar_reportes,
      id_sesion,
    };
  }

  /** Al resetear la contraseña se cierran todas las sesiones activas — si alguien más tenía el token viejo, queda afuera. */
  static async cerrarTodasLasSesiones(usuario: number) {
    return prisma.sesiones.updateMany({
      where: { usuario, estado: "activa" },
      data: { estado: "cerrada", fecha_fin: new Date() },
    });
  }

  static async crearPasswordReset(usuario: number, token_hash: string, expires_at: Date) {
    return prisma.password_resets.create({ data: { usuario, token_hash, expires_at } });
  }

  static async findPasswordResetVigente(token_hash: string) {
    return prisma.password_resets.findFirst({
      where: { token_hash, used_at: null, expires_at: { gt: new Date() } },
    });
  }

  static async marcarPasswordResetUsado(id_reset: number) {
    return prisma.password_resets.update({ where: { id_reset }, data: { used_at: new Date() } });
  }

  /** Invalida cualquier link de recuperación anterior sin usar: solo el más reciente debe servir. */
  static async invalidarPasswordResetsPendientes(usuario: number) {
    return prisma.password_resets.updateMany({
      where: { usuario, used_at: null },
      data: { used_at: new Date() },
    });
  }

}
