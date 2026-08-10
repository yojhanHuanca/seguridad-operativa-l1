import type { Request, Response } from "express";
export declare class NotificationController {
    static list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static markRead(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static markAllRead(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=notification.controller.d.ts.map