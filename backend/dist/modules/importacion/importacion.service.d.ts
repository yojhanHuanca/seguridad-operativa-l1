import type { ImportacionPayload, ImportacionPreview, ImportacionResult } from "./importacion.types.js";
export declare class ImportacionService {
    static validar(payload: ImportacionPayload): Promise<ImportacionPreview>;
    static importar(payload: ImportacionPayload, actorId: number, ip: string | null): Promise<ImportacionResult>;
}
//# sourceMappingURL=importacion.service.d.ts.map