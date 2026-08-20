import { ProfileService } from "./profile.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export class ProfileController {
    static async getMe(req, res) {
        try {
            const user = await ProfileService.getMe(req.user.id_usuario);
            return res.json(ApiResponse.success("Perfil obtenido correctamente", user));
        }
        catch (error) {
            return res.status(404).json(ApiResponse.error(error instanceof Error ? error.message : "Perfil no encontrado"));
        }
    }
    static async updateMe(req, res) {
        try {
            const { telefono } = req.body ?? {};
            const user = await ProfileService.updateContact(req.user.id_usuario, { telefono: telefono ?? undefined });
            return res.json(ApiResponse.success("Perfil actualizado correctamente", user));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "No se pudo actualizar el perfil"));
        }
    }
    static async uploadFoto(req, res) {
        try {
            const file = req.file;
            if (!file)
                throw new Error("No se recibió ninguna imagen");
            const foto_url = `/uploads/avatars/${file.filename}`;
            const user = await ProfileService.updateContact(req.user.id_usuario, { foto_url });
            return res.json(ApiResponse.success("Foto de perfil actualizada", user));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "No se pudo subir la foto"));
        }
    }
    static async changePassword(req, res) {
        try {
            const { password_actual, password_nueva } = req.body ?? {};
            if (!password_actual || !password_nueva) {
                throw new Error("Ingresa tu contraseña actual y la nueva");
            }
            await ProfileService.changePassword(req.user.id_usuario, password_actual, password_nueva);
            return res.json(ApiResponse.success("Contraseña actualizada correctamente"));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "No se pudo cambiar la contraseña"));
        }
    }
    static async getActividad(req, res) {
        try {
            const actividad = await ProfileService.getActividad(req.user.id_usuario, req.user.rol_nombre);
            return res.json(ApiResponse.success("Actividad obtenida correctamente", actividad));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error(error instanceof Error ? error.message : "No se pudo obtener la actividad"));
        }
    }
}
//# sourceMappingURL=profile.controller.js.map