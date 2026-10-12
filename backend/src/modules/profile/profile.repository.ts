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
  debe_cambiar_password: true,
  roles: { select: { nombre_rol: true } },
  areas: { select: { nombre_area: true } },
} as const;

export class ProfileRepository {
  static countAvatarReferences(foto_url: string) {
    return prisma.usuarios.count({ where: { foto_url } });
  }
  static sessions(id_usuario: number) {
    return prisma.sesiones.findMany({
      where: { usuario: id_usuario, estado: "activa" },
      orderBy: { id_sesion: "desc" },
      take: 20,
      select: { id_sesion: true, fecha_inicio: true, navegador: true, dispositivo: true },
    });
  }
  static recent(id_usuario: number) {
    return prisma.auditoria.findMany({
      where: { usuario: id_usuario },
      orderBy: [{ fecha: "desc" }, { id_auditoria: "desc" }],
      take: 8,
      select: { id_auditoria: true, accion: true, tabla_afectada: true, fecha: true },
    });
  }
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

  static async updatePassword(id_usuario: number, password_hash: string, previousHash: string) {
    return prisma.$transaction(async tx => {
      const updated = await tx.usuarios.updateMany({
        where: { id_usuario, password_hash: previousHash },
        data: { password_hash, debe_cambiar_password: false },
      });
      if (updated.count !== 1) throw new Error("La contraseña cambió mientras se procesaba. Vuelve a iniciar sesión.");
      await tx.sesiones.updateMany({ where: { usuario: id_usuario, estado: "activa" }, data: { estado: "cerrada", fecha_fin: new Date() } });
      await tx.password_resets.updateMany({ where: { usuario: id_usuario, used_at: null }, data: { used_at: new Date() } });
      await tx.auditoria.create({ data: {
        tabla_afectada: "usuarios", id_registro: id_usuario, usuario: id_usuario,
        accion: "editar", descripcion: "Cambió su contraseña y cerró todas sus sesiones",
      } });
    });
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

  static countContingenciasRegistradas(id_usuario: number) {
    return prisma.contingencia_eventos.count({ where: { created_by: id_usuario } });
  }

  static async countUsuariosActivos() {
    return prisma.usuarios.count({ where: { estado: "Activo" } });
  }

  static async countAreas() {
    return prisma.areas.count();
  }
}

