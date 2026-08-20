import type { Request, Response } from "express";
export declare class EventoController {
    static getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getCounts(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAsignados(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static asignar(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static remove(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=evento.controller.d.ts.map