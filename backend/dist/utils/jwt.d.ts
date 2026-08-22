import jwt from "jsonwebtoken";
interface JwtPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    es_responsable?: boolean;
    /** Permisos puntuales dentro del rol — ver comentario en el modelo `usuarios`. */
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    /** Área del usuario: el backend filtra por ella lo que ve un Jefe de Área. */
    id_area?: number | null;
    /** Nombre con el que se firma el expediente. */
    nombre?: string;
    /** Fila en `sesiones` que representa este login; falta en tokens emitidos
     * antes de este campo — ver `verifyToken`, que no exige sesión en ese caso. */
    id_sesion?: number;
}
export declare class JwtHelper {
    static generateToken(payload: JwtPayload): string;
    static verifyToken(token: string): string | jwt.JwtPayload;
}
export {};
//# sourceMappingURL=jwt.d.ts.map