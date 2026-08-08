import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";


export interface AuthenticatedRequest extends Request {
    user?: any;
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

    req.user = decoded;

    next();

    } catch {
        return res.status(401).json({
            success: false,
            message: "Token inválido",

        });
    }
};