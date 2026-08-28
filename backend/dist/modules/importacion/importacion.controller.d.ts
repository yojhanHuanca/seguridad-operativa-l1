import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
export declare class ImportacionController {
    static validar(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static importar(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=importacion.controller.d.ts.map