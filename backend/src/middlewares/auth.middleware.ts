import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";


export interface AuthTokenPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    es_responsable?: boolean;
    /** Puede faltar en tokens emitidos antes de este campo — ver areaDelActor(). */
    id_area?: number | null;
    /** Puede faltar en tokens viejos — ver nombreDelActor(). */
    nombre?: string;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthTokenPayload;
}

export const verifyToken =  (
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
    try {
        const decoded = jwt.verify(
            token, 
            env.JWT_SECRET
        );

    req.user = decoded as AuthTokenPayload;

    next();

    } catch {
        return res.status(401).json({
            success: false,
            message: "Token inválido",

        });
    }
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
