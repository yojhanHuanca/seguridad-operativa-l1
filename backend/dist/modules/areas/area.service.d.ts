export declare class AreaService {
    static getAllAreas(): Promise<{
        id_area: number;
        nombre_area: string;
    }[]>;
    static createArea(nombre_area: string): Promise<{
        id_area: number;
        nombre_area: string;
    }>;
    static updateArea(id_area: number, nombre_area: string): Promise<{
        id_area: number;
        nombre_area: string;
    }>;
    static deleteArea(id_area: number): Promise<{
        id_area: number;
        nombre_area: string;
    }>;
}
//# sourceMappingURL=area.service.d.ts.map