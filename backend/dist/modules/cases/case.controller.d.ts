import type { Request, Response } from "express";
export declare class CaseController {
    static getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getPlans(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getByCodigo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static approve(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addObservation(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static evaluate(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static reject(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static requestInfo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static respondInfo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static saveInvestigation(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static close(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static acceptPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static completeExecution(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static keepPending(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static reopen(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updatePlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateActivity(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static requestExtension(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static reviewExtension(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addComment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addEvidence(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=case.controller.d.ts.map