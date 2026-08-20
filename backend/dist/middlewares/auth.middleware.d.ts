import type { Request, Response, NextFunction } from "express";
export interface AuthTokenPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    /** Puede faltar en tokens viejos — ver nombreDelActor(). */
    nombre?: string;
    /** Puede faltar en tokens emitidos antes de este campo — ver areaDelActor(). */
    id_area?: number | null;
    /** Puede faltar en tokens emitidos antes de este campo — en ese caso no
     * hay sesión que comprobar, y el token sigue siendo válido igual que antes. */
    id_sesion?: number;
}
export interface AuthenticatedRequest extends Request {
    user?: AuthTokenPayload;
}
export declare const verifyToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const requireRoles: (...roles: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map