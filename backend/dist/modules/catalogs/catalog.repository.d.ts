export declare class CatalogRepository {
    static findAllGroups(): Promise<({
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
    static findGroupWithAllDetalle(id_catalogo: number): Promise<({
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
    }) | null>;
    static findDetalleById(id_detalle: number): Promise<({
        catalogos: {
            nombre: string;
        };
    } & {
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        id_detalle: number;
        id_catalogo: number;
        codigo: string | null;
        orden: number | null;
        color: string | null;
    }) | null>;
    static findDetalleByNombre(id_catalogo: number, nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        id_detalle: number;
        id_catalogo: number;
        codigo: string | null;
        orden: number | null;
        color: string | null;
    } | null>;
    static createDetalle(id_catalogo: number, nombre: string): Promise<{
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
    static updateDetalle(id_detalle: number, nombre: string): Promise<{
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
    static setDetalleEstado(id_detalle: number, estado: boolean): Promise<{
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
//# sourceMappingURL=catalog.repository.d.ts.map