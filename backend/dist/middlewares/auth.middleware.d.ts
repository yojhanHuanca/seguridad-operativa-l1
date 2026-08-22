import type { Request, Response, NextFunction } from "express";
export interface AuthTokenPayload {
    id_usuario: number;
    correo: string;
    rol: number | null;
    rol_nombre: string;
    es_responsable?: boolean;
    /** Permisos puntuales dentro del rol — ver comentario en el modelo `usuarios`. */
    puede_reabrir_casos?: boolean;
    puede_rechazar_reportes?: boolean;
    /** Puede faltar en tokens emitidos antes de este campo — ver areaDelActor(). */
    id_area?: number | null;
    /** Puede faltar en tokens viejos — ver nombreDelActor(). */
    nombre?: string;
    /** Puede faltar en tokens emitidos antes de este campo — en ese caso no
     * hay sesión que comprobar, y el token sigue siendo válido igual que antes. */
    id_sesion?: number;
}
export interface AuthenticatedRequest extends Request {
    user?: AuthTokenPayload;
}
export declare const verifyToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const requireRoles: (...roles: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
/**
 * Deja pasar a los roles listados en `roles` sin condición, o a los listados
 * en `responsableRoles` solo si además tienen el flag `es_responsable` (ej.
 * el RSO de Seguridad Operativa "visitando" el panel de Monitoreo). Admin
 * siempre pasa.
 */
export declare const requireRolesOrResponsable: (roles: string[], responsableRoles: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
/**
 * Como `requireRoles`, pero además exige un permiso puntual del usuario (ej.
 * `puede_reabrir_casos`) — no todo el rol lo tiene, solo a quien el Admin se
 * lo marcó en su ficha. Admin siempre pasa, sin necesitar el flag.
 */
export declare const requireRolesAndPermission: (roles: string[], permission: "puede_reabrir_casos" | "puede_rechazar_reportes") => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map