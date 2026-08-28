import type { Request, Response } from "express";
export declare class PushController {
    static subscribe(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static unsubscribe(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=push.controller.d.ts.map