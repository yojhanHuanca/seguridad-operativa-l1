import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";


interface AuthTokenPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
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
