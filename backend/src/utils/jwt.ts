import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

interface JwtPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    es_responsable?: boolean;
    /** Área del usuario: el backend filtra por ella lo que ve un Jefe de Área. */
    id_area?: number | null;
    /** Nombre con el que se firma el expediente. */
    nombre?: string;
    /** Fila en `sesiones` que representa este login; falta en tokens emitidos
     * antes de este campo — ver `verifyToken`, que no exige sesión en ese caso. */
    id_sesion?: number;
}

export class JwtHelper {
  static generateToken(payload: JwtPayload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      // Antes quedaba "8h" escrito a mano acá; JWT_EXPIRES_IN del .env se
      // leía en env.ts pero nunca se usaba.
      expiresIn: env.JWT_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>,
    });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
  }
}


