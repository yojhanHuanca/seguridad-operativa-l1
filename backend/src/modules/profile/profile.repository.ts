import prisma from "../../lib/prisma.js";

const PUBLIC_SELECT = {
  id_usuario: true,
  codigo_usuario: true,
  nombre: true,
  correo: true,
  cargo: true,
  telefono: true,
  estado: true,
  foto_url: true,
  ultimo_acceso: true,
  fecha_ingreso: true,
  id_area: true,
  id_rol: true,
  roles: { select: { nombre_rol: true } },
  areas: { select: { nombre_area: true } },
} as const;

export class ProfileRepository {
  static async findById(id_usuario: number) {
    return prisma.usuarios.findUnique({ where: { id_usuario }, select: PUBLIC_SELECT });
  }

  static async findPasswordHash(id_usuario: number) {
    return prisma.usuarios.findUnique({
      where: { id_usuario },
      select: { password_hash: true },
    });
  }

  static async updateContact(id_usuario: number, data: { telefono?: string | null; foto_url?: string | null }) {
    return prisma.usuarios.update({ where: { id_usuario }, data, select: PUBLIC_SELECT });
  }

  static async updatePassword(id_usuario: number, password_hash: string) {
    return prisma.usuarios.update({ where: { id_usuario }, data: { password_hash } });
  }

  static async countCasosResponsable(id_usuario: number) {
    return prisma.casos_sop.count({ where: { responsable_hallazgo: id_usuario } });
  }

  static async countCasosCreados(id_usuario: number) {
    return prisma.casos_sop.count({ where: { created_by: id_usuario } });
  }

  static async countPlanesAsignados(id_usuario: number) {
    return prisma.planes_accion.count({ where: { responsable: id_usuario } });
  }

  static async countPlanesCerrados(id_usuario: number) {
    return prisma.planes_accion.count({
      where: { responsable: id_usuario, catalogo_detalle: { nombre: "Cerrado" } },
    });
  }

  static async countEventosRegistrados(id_usuario: number) {
    return prisma.eventos_monitoreo.count({ where: { usuario_registra: id_usuario } });
  }

  static async countUsuariosActivos() {
    return prisma.usuarios.count({ where: { estado: "Activo" } });
  }

  static async countAreas() {
    return prisma.areas.count();
  }
}
