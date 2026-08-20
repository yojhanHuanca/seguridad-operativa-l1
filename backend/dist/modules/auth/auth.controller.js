import { ApiResponse } from "../../utils/ApiResponse.js";
import { AuthService } from "./auth.service.js";
export class AuthController {
    static async login(req, res) {
        try {
            const { correo, password } = req.body;
            if (!correo || !password) {
                return res.status(400).json(ApiResponse.error("Correo y contraseña son requeridos"));
            }
            const result = await AuthService.login(correo, password, req.ip, req.headers["user-agent"]);
            return res.status(200).json(ApiResponse.success("Inicio de sesión exitoso", result));
        }
        catch (error) {
            return res.status(401).json(ApiResponse.error(error instanceof Error
                ? error.message
                : "Credenciales inválidas", error));
        }
    }
    static async logout(req, res) {
        try {
            await AuthService.logout(req.user?.id_sesion);
            return res.status(200).json(ApiResponse.success("Sesión cerrada correctamente"));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("No se pudo cerrar la sesión", error));
        }
    }
    static async home(_req, res) {
        try {
            const result = await AuthService.home();
            return res.status(200).json(ApiResponse.success("Auth service status", result));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error(error instanceof Error ? error.message : "Error interno", error));
        }
    }
}
//# sourceMappingURL=auth.controller.js.map