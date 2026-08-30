export interface SuscripcionPush {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}
export declare class PushRepository {
    /**
     * `upsert` por `endpoint` (no por usuario): un mismo navegador/dispositivo
     * puede volver a suscribirse (permiso revocado y vuelto a aceptar, u otro
     * usuario en el mismo equipo) y el endpoint es lo único realmente único.
     */
    static guardar(id_usuario: number, sub: SuscripcionPush): Promise<{
        usuario: number;
        created_at: Date | null;
        auth: string;
        id_suscripcion: number;
        endpoint: string;
        p256dh: string;
    }>;
    static eliminar(endpoint: string): Promise<void>;
    static listarPorUsuarios(ids: number[]): Promise<{
        usuario: number;
        created_at: Date | null;
        auth: string;
        id_suscripcion: number;
        endpoint: string;
        p256dh: string;
    }[]>;
}
//# sourceMappingURL=push.repository.d.ts.map