import type { Request, Response } from "express";
export declare class CatalogController {
    static getAll(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getGroupForAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static removeItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static restoreItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=catalog.controller.d.ts.map