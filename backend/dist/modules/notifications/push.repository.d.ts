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
    /**
     * `id_usuario` es opcional a propósito: cuando lo llama el usuario desde
     * `/push/unsubscribe` va con su propio id, para que no pueda borrar la
     * suscripción de otro con solo adivinar/copiar un endpoint ajeno. Cuando lo
     * llama `PushService.enviarAUsuarios` para autolimpiar un endpoint que el
     * navegador ya rechazó (404/410), no hace falta —ese endpoint salió de
     * `listarPorUsuarios`, no de un body de cliente.
     */
    static eliminar(endpoint: string, id_usuario?: number): Promise<void>;
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