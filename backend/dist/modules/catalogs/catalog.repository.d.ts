export declare class CatalogRepository {
    static findAllGroups(): Promise<({
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
        created_at: Date | null;
        descripcion: string | null;
        codigo: string;
        id_catalogo: number;
    })[]>;
    static findGroupWithAllDetalle(id_catalogo: number): Promise<({
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
        created_at: Date | null;
        descripcion: string | null;
        codigo: string;
        id_catalogo: number;
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
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }) | null>;
    static findDetalleByNombre(id_catalogo: number, nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    } | null>;
    static createDetalle(id_catalogo: number, nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static updateDetalle(id_detalle: number, nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static setDetalleEstado(id_detalle: number, estado: boolean): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
}
//# sourceMappingURL=catalog.repository.d.ts.map