import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

interface JwtPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    /** Fila en `sesiones` que representa este login — permite invalidar el
     * token de inmediato al cerrar sesión, ver `verifyToken`. */
    id_sesion?: number;
}

export class JwtHelper {
  static generateToken(payload: JwtPayload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: (env.JWT_EXPIRES_IN ?? "8h") as NonNullable<SignOptions["expiresIn"]>,
    });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
  }
}


