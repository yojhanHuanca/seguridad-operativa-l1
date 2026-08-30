export declare class CatalogService {
    static getAllGroups(): Promise<({
        catalogo_detalle: {
            nombre: string;
            descripcion: string | null;
            id_detalle: number;
            codigo: string | null;
            orden: number | null;
            color: string | null;
        }[];
    } & {
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        id_catalogo: number;
        codigo: string;
    })[]>;
    static getGroupForAdmin(id_catalogo: number): Promise<{
        catalogo_detalle: {
            nombre: string;
            estado: boolean | null;
            descripcion: string | null;
            id_detalle: number;
            codigo: string | null;
            orden: number | null;
            color: string | null;
        }[];
    } & {
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        id_catalogo: number;
        codigo: string;
    }>;
    static createItem(id_catalogo: number, nombre_raw: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        id_detalle: number;
        id_catalogo: number;
        codigo: string | null;
        orden: number | null;
        color: string | null;
    }>;
    static updateItem(id_detalle: number, nombre_raw: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        id_detalle: number;
        id_catalogo: number;
        codigo: string | null;
        orden: number | null;
        color: string | null;
    }>;
    static setItemEstado(id_detalle: number, estado: boolean): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        id_detalle: number;
        id_catalogo: number;
        codigo: string | null;
        orden: number | null;
        color: string | null;
    }>;
}
//# sourceMappingURL=catalog.service.d.ts.map