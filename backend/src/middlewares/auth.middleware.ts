import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AuthRepository } from "../modules/auth/auth.repository.js";


export interface AuthTokenPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    es_responsable?: boolean;
    /** Permisos puntuales dentro del rol — ver comentario en el modelo `usuarios`. */
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    /** Puede faltar en tokens emitidos antes de este campo — ver areaDelActor(). */
    id_area?: number | null;
    /** Puede faltar en tokens viejos — ver nombreDelActor(). */
    nombre?: string;
    /** Puede faltar en tokens emitidos antes de este campo — en ese caso no
     * hay sesión que comprobar, y el token sigue siendo válido igual que antes. */
    id_sesion?: number;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthTokenPayload;
}

export const verifyToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token no proporcionado",
        });
    }

    const token = authHeader.replace("Bearer ", "");
    let decoded: AuthTokenPayload;
    try {
        decoded = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
    } catch {
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
        } catch {
            return res.status(401).json({
                success: false,
                message: "Token inválido",
            });
        }
    }

    req.user = decoded;
    next();
};

/**
 * Autenticación opcional para endpoints públicos que pueden beneficiarse de
 * una sesión válida, pero no deben exigirla. Si no hay token, sigue como
 * usuario público; si hay token inválido, también sigue público para no romper
 * el QR por sesiones vencidas guardadas en el navegador.
 */
export const optionalVerifyToken = async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();

    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
        if (decoded.id_sesion) {
            const activa = await AuthRepository.sesionActiva(decoded.id_sesion);
            if (!activa) return next();
        }
        req.user = decoded;
    } catch {
        // El endpoint sigue siendo público; un token vencido no debe bloquear
        // el registro desde QR ni la consulta pública.
    }
    next();
};

export const requireRoles = (...roles: string[]) => (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    if (!req.user?.rol_nombre || !roles.some((role) => role.toLowerCase() === req.user!.rol_nombre.toLowerCase())) {
        return res.status(403).json({ success: false, message: "No tienes permisos para realizar esta acción" });
    }
    next();
};

/**
 * Deja pasar a los roles listados en `roles` sin condición, o a los listados
 * en `responsableRoles` solo si además tienen el flag `es_responsable` (ej.
 * el RSO de Seguridad Operativa "visitando" el panel de Monitoreo). Admin
 * siempre pasa.
 */
export const requireRolesOrResponsable = (roles: string[], responsableRoles: string[]) => (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    const rolNombre = req.user?.rol_nombre?.toLowerCase();
    if (!rolNombre) {
        return res.status(403).json({ success: false, message: "No tienes permisos para realizar esta acción" });
    }
    if (rolNombre === "admin") return next();
    if (roles.some((role) => role.toLowerCase() === rolNombre)) return next();
    if (req.user?.es_responsable && responsableRoles.some((role) => role.toLowerCase() === rolNombre)) return next();
    return res.status(403).json({ success: false, message: "No tienes permisos para realizar esta acción" });
};

/**
 * Como `requireRoles`, pero además exige un permiso puntual del usuario (ej.
 * `puede_reabrir_casos`) — no todo el rol lo tiene, solo a quien el Admin se
 * lo marcó en su ficha. Admin siempre pasa, sin necesitar el flag.
 */
export const requireRolesAndPermission = (
    roles: string[],
    permission: "puede_reabrir_casos" | "puede_rechazar_reportes",
) => (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    const rolNombre = req.user?.rol_nombre?.toLowerCase();
    if (!rolNombre || !roles.some((role) => role.toLowerCase() === rolNombre)) {
        return res.status(403).json({ success: false, message: "No tienes permisos para realizar esta acción" });
    }
    if (rolNombre === "admin" || req.user?.[permission]) return next();
    return res.status(403).json({ success: false, message: "No tienes el permiso para realizar esta acción" });
};
