import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AuthRepository } from "../modules/auth/auth.repository.js";
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token no proporcionado",
        });
    }
    const token = authHeader.replace("Bearer ", "");
    let decoded;
    try {
        decoded = jwt.verify(token, env.JWT_SECRET);
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Token inválido",
        });
    }
    // Cerrar sesión invalida el token de inmediato, aunque le queden horas de
    // vigencia firmada. Sin esto "cerrar sesión" no invalidaba nada del lado
    // del servidor: el token seguía sirviendo hasta que expirara solo.
    if (decoded.id_sesion) {
        try {
            const activa = await AuthRepository.sesionActiva(decoded.id_sesion);
            if (!activa) {
                return res.status(401).json({
                    success: false,
                    message: "La sesión fue cerrada, vuelve a iniciar sesión",
                });
            }
        }
        catch {
            return res.status(401).json({
                success: false,
                message: "Token inválido",
            });
        }
    }
    req.user = decoded;
    next();
};
export const requireRoles = (...roles) => (req, res, next) => {
    if (!req.user?.rol_nombre || !roles.some((role) => role.toLowerCase() === req.user.rol_nombre.toLowerCase())) {
        return res.status(403).json({ success: false, message: "No tienes permisos para realizar esta acción" });
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map