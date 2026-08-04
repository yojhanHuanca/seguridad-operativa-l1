import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface JwtPayload {
    id: number;
    email: string;
    roles: string;
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


