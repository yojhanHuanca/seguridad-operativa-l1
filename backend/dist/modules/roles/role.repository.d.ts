export declare class RoleRepository {
    static findAll(): Promise<{
        id_rol: number;
        nombre_rol: string;
    }[]>;
    static findById(id: number): Promise<{
        id_rol: number;
        nombre_rol: string;
    }>;
}
//# sourceMappingURL=role.repository.d.ts.map