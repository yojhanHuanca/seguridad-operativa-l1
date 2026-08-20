export declare class EstacionService {
    static getAllEstaciones(): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }[]>;
    static createEstacion(nombre_estacion: string): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }>;
    static updateEstacion(id_estacion: number, nombre_estacion: string): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }>;
    static deleteEstacion(id_estacion: number): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }>;
}
//# sourceMappingURL=estacion.service.d.ts.map