import { ProfileRepository } from "./profile.repository.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
export class ProfileService {
    static async getMe(id_usuario) {
        const user = await ProfileRepository.findById(id_usuario);
        if (!user)
            throw new Error("Usuario no encontrado");
        return user;
    }
    static async updateContact(id_usuario, data) {
        return ProfileRepository.updateContact(id_usuario, data);
    }
    static async changePassword(id_usuario, actual, nueva) {
        if (nueva.trim().length < 6)
            throw new Error("La nueva contraseña debe tener al menos 6 caracteres");
        const row = await ProfileRepository.findPasswordHash(id_usuario);
        if (!row?.password_hash)
            throw new Error("Tu cuenta todavía no tiene una contraseña configurada; pedile al administrador que te asigne una");
        const valida = await BcryptHelper.compare(actual, row.password_hash);
        if (!valida)
            throw new Error("La contraseña actual no es correcta");
        const password_hash = await BcryptHelper.hash(nueva);
        await ProfileRepository.updatePassword(id_usuario, password_hash);
    }
    static async getActividad(id_usuario, rol_nombre) {
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
//# sourceMappingURL=profile.service.js.map