import jwt from "jsonwebtoken";
interface JwtPayload {
    id: number;
    email: string;
    roles: string;
}
export declare class JwtHelper {
    static generateToken(payload: JwtPayload): string;
    static verifyToken(token: string): string | jwt.JwtPayload;
}
export {};
//# sourceMappingURL=jwt.d.ts.map