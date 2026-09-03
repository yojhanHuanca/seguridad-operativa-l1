import type { Request, Response } from "express";
export declare class ReportController {
    static getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getByCodigo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static responderInfo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=report.controller.d.ts.map