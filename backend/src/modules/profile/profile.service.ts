import { ProfileRepository } from "./profile.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { unlink } from "node:fs/promises";
import path from "node:path";
import logger from "../../utils/logger.js";

export class ProfileService {
  static async replaceAvatar(id_usuario: number, foto_url: string | null) {
    const previous = await this.getMe(id_usuario);
    const user = await ProfileRepository.updateContact(id_usuario, { foto_url });
    const oldPhoto = previous.foto_url;
    // Only server-generated avatar filenames may be removed, never arbitrary paths.
    const file = oldPhoto?.match(/^\/uploads\/avatars\/([a-f0-9-]{36}\.(?:jpg|png|webp))$/i)?.[1];
    if (file && oldPhoto !== foto_url) {
      try {
        if (await ProfileRepository.countAvatarReferences(oldPhoto!) === 0) {
          await unlink(path.resolve(process.cwd(), "uploads", "avatars", file));
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          logger.warn({ userId: id_usuario }, "No se pudo limpiar una foto reemplazada");
        }
      }
    }
    return user;
  }
  static async getSessions(id_usuario: number, currentId?: number) {
    const sessions = await ProfileRepository.sessions(id_usuario);
    return sessions.map(session => ({ ...session, actual: session.id_sesion === currentId }));
  }
  static getRecent(id_usuario: number) {
    return ProfileRepository.recent(id_usuario);
  }
  static async getMe(id_usuario: number) {
    const user = await ProfileRepository.findById(id_usuario);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  static async updateContact(id_usuario: number, data: { telefono?: string | null; foto_url?: string | null }) {
    return ProfileRepository.updateContact(id_usuario, data);
  }

  static async changePassword(id_usuario: number, actual: string, nueva: string) {
    if (nueva.trim().length < 6) throw new Error("La nueva contraseña debe tener al menos 6 caracteres");

    const row = await ProfileRepository.findPasswordHash(id_usuario);
    if (!row?.password_hash) throw new Error("Tu cuenta todavía no tiene una contraseña configurada; pedile al administrador que te asigne una");

    const valida = await BcryptHelper.compare(actual, row.password_hash);
    if (!valida) throw new Error("La contraseña actual no es correcta");

    const password_hash = await BcryptHelper.hash(nueva);
    await ProfileRepository.updatePassword(id_usuario, password_hash);
  }

  static async getActividad(id_usuario: number, rol_nombre: string) {
    const rol = rol_nombre.toLowerCase();

    if (rol === "seguridad operativa") {
      const [aCargo, creados] = await Promise.all([
        ProfileRepository.countCasosResponsable(id_usuario),
        ProfileRepository.countCasosCreados(id_usuario),
      ]);
      return [
        { label: "Casos a tu cargo", value: aCargo },
        { label: "Casos que registraste", value: creados },
      ];
    }

    if (rol === "jefe de área") {
      const [asignados, cerrados] = await Promise.all([
        ProfileRepository.countPlanesAsignados(id_usuario),
        ProfileRepository.countPlanesCerrados(id_usuario),
      ]);
      return [
        { label: "Planes asignados", value: asignados },
        { label: "Planes cerrados", value: cerrados },
      ];
    }

    if (rol === "monitorista") {
      const eventos = await ProfileRepository.countEventosRegistrados(id_usuario);
      return [{ label: "Eventos registrados", value: eventos }];
    }

    if (rol === "reportante") {
      const reportes = await ProfileRepository.countCasosCreados(id_usuario);
      return [{ label: "Reportes enviados", value: reportes }];
    }

    if (rol === "gestión de planes de contingencia") {
      const registrados = await ProfileRepository.countContingenciasRegistradas(id_usuario);
      return [{ label: "Contingencias registradas", value: registrados }];
    }

    if (rol === "admin") {
      const [usuarios, areas] = await Promise.all([
        ProfileRepository.countUsuariosActivos(),
        ProfileRepository.countAreas(),
      ]);
      return [
        { label: "Usuarios activos", value: usuarios },
        { label: "Áreas configuradas", value: areas },
      ];
    }

    return [];
  }
}

