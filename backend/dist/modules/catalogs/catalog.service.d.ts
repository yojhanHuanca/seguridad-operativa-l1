export declare class CatalogService {
    static getAllGroups(): Promise<({
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
}
//# sourceMappingURL=catalog.service.d.ts.map