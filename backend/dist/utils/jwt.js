import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export class JwtHelper {
    static generateToken(payload) {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: "8h",
        });
    }
    static verifyToken(token) {
        return jwt.verify(token, env.JWT_SECRET);
    }
}
//# sourceMappingURL=jwt.js.map