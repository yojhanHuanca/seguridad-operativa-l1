export declare class CatalogRepository {
    static findAllGroups(): Promise<({
        catalogo_detalle: {
            nombre: string;
            codigo: string | null;
            descripcion: string | null;
            orden: number | null;
            id_detalle: number;
            color: string | null;
        }[];
    } & {
        nombre: string;
        estado: boolean | null;
        id_catalogo: number;
        codigo: string;
        descripcion: string | null;
        created_at: Date | null;
    })[]>;
    static findDetalleById(id_detalle: number): Promise<({
        catalogos: {
            nombre: string;
        };
    } & {
        nombre: string;
        estado: boolean | null;
        id_catalogo: number;
        codigo: string | null;
        descripcion: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }) | null>;
}
//# sourceMappingURL=catalog.repository.d.ts.map