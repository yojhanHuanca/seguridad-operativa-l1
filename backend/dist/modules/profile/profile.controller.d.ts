import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
export declare class ProfileController {
    static getMe(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateMe(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static uploadFoto(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static changePassword(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getActividad(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=profile.controller.d.ts.map