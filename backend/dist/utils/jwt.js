import jwt, {} from "jsonwebtoken";
import { env } from "../config/env.js";
export class JwtHelper {
    static generateToken(payload) {
        return jwt.sign(payload, env.JWT_SECRET, {
            // Antes quedaba "8h" escrito a mano acá; JWT_EXPIRES_IN del .env se
            // leía en env.ts pero nunca se usaba.
            expiresIn: env.JWT_EXPIRES_IN,
        });
    }
    static verifyToken(token) {
        return jwt.verify(token, env.JWT_SECRET);
    }
}
//# sourceMappingURL=jwt.js.map