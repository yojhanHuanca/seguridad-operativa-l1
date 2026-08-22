export declare class AreaRepository {
    static findAll(): Promise<{
        id_area: number;
        nombre_area: string;
    }[]>;
    static findByNombre(nombre_area: string): Promise<{
        id_area: number;
        nombre_area: string;
    } | null>;
    static create(nombre_area: string): Promise<{
        id_area: number;
        nombre_area: string;
    }>;
    static update(id_area: number, nombre_area: string): Promise<{
        id_area: number;
        nombre_area: string;
    }>;
    static countUsage(id_area: number): Promise<number>;
    static remove(id_area: number): Promise<{
        id_area: number;
        nombre_area: string;
    }>;
}
//# sourceMappingURL=area.repository.d.ts.map