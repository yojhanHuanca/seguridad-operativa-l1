import { z } from "zod";
import { ConfiguracionService } from "./configuracion.service.js";
import { ApiResponse, safeErrorMessage } from "../../utils/ApiResponse.js";
function errorMessage(error, fallback) {
    if (error instanceof z.ZodError) {
        return error.issues[0]?.message ?? fallback;
    }
    return safeErrorMessage(error, fallback);
}
export class ConfiguracionController {
    static async publica(_req, res) {
        try {
            const configuracion = await ConfiguracionService.publica();
            res.set({
                'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
                'CDN-Cache-Control': 'public, max-age=300',
            });
            return res.json(ApiResponse.success("Identidad del sistema obtenida correctamente", configuracion));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("Error al obtener la identidad del sistema", error));
        }
    }
    static async get(_req, res) {
        try {
            const configuracion = await ConfiguracionService.get();
            return res.json(ApiResponse.success("Configuración obtenida correctamente", configuracion));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("Error al obtener la configuración", error));
        }
    }
    static async update(req, res) {
        try {
            const configuracion = await ConfiguracionService.update(req.body, {
                usuario: req.user?.id_usuario ?? null,
                ip: req.ip ?? null,
                user_agent: req.get("user-agent") ?? null,
            });
            return res.json(ApiResponse.success("Configuración actualizada correctamente", configuracion));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(errorMessage(error, "Error al actualizar la configuración")));
        }
    }
}
//# sourceMappingURL=configuracion.controller.js.map