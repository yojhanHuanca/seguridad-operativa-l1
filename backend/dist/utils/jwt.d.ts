import jwt from "jsonwebtoken";
interface JwtPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    nombre?: string;
    id_area?: number | null;
    /** Fila en `sesiones` que representa este login — permite invalidar el
     * token de inmediato al cerrar sesión, ver `verifyToken`. */
    id_sesion?: number;
}
export declare class JwtHelper {
    static generateToken(payload: JwtPayload): string;
    static verifyToken(token: string): string | jwt.JwtPayload;
}
export {};
//# sourceMappingURL=jwt.d.ts.map