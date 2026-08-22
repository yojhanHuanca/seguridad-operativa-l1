export declare class CatalogService {
    static getAllGroups(): Promise<({
        catalogo_detalle: {
            nombre: string;
            descripcion: string | null;
            codigo: string | null;
            orden: number | null;
            id_detalle: number;
            color: string | null;
        }[];
    } & {
        nombre: string;
        estado: boolean | null;
        descripcion: string | null;
        id_catalogo: number;
        codigo: string;
        created_at: Date | null;
    })[]>;
    static getGroupForAdmin(id_catalogo: number): Promise<{
        catalogo_detalle: {
            nombre: string;
            estado: boolean | null;
            descripcion: string | null;
            codigo: string | null;
            orden: number | null;
            id_detalle: number;
            color: string | null;
        }[];
    } & {
        nombre: string;
        estado: boolean | null;
        descripcion: string | null;
        id_catalogo: number;
        codigo: string;
        created_at: Date | null;
    }>;
    static createItem(id_catalogo: number, nombre_raw: string): Promise<{
        nombre: string;
        estado: boolean | null;
        descripcion: string | null;
        id_catalogo: number;
        codigo: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static updateItem(id_detalle: number, nombre_raw: string): Promise<{
        nombre: string;
        estado: boolean | null;
        descripcion: string | null;
        id_catalogo: number;
        codigo: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static setItemEstado(id_detalle: number, estado: boolean): Promise<{
        nombre: string;
        estado: boolean | null;
        descripcion: string | null;
        id_catalogo: number;
        codigo: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
}
//# sourceMappingURL=catalog.service.d.ts.map