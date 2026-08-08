import jwt from "jsonwebtoken";
interface JwtPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
}
export declare class JwtHelper {
    static generateToken(payload: JwtPayload): string;
    static verifyToken(token: string): string | jwt.JwtPayload;
}
export {};
//# sourceMappingURL=jwt.d.ts.map