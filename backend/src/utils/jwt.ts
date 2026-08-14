import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface JwtPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
}

export class JwtHelper {
  static generateToken(payload: JwtPayload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "8h",
    });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
  }
}


