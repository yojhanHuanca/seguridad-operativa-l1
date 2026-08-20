export declare class EstacionRepository {
    static findAll(): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }[]>;
    static findByNombre(nombre_estacion: string): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    } | null>;
    static create(nombre_estacion: string): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }>;
    static update(id_estacion: number, nombre_estacion: string): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }>;
    static countUsage(id_estacion: number): Promise<number>;
    static remove(id_estacion: number): Promise<{
        id_estacion: number;
        nombre_estacion: string;
    }>;
}
//# sourceMappingURL=estacion.repository.d.ts.map