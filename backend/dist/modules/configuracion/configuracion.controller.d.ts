import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
export declare class ConfiguracionController {
    static publica(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static get(_req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static update(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=configuracion.controller.d.ts.map