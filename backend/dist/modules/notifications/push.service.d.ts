import { type SuscripcionPush } from "./push.repository.js";
export interface PushPayload {
    title: string;
    body: string;
}
export declare class PushService {
    static readonly habilitado: boolean;
    static suscribir(id_usuario: number, sub: SuscripcionPush): Promise<void>;
    static desuscribir(endpoint: string): Promise<void>;
    /**
     * Best-effort: nunca lanza, igual que NotificationRepository.emitir (del
     * que se llama siempre, sin esperar la promesa). Si el navegador ya no
     * reconoce una suscripción (404/410 — el usuario desinstaló, revocó el
     * permiso, etc.), se borra sola en vez de seguir intentando para siempre.
     */
    static enviarAUsuarios(ids: number[], payload: PushPayload): Promise<void>;
}
//# sourceMappingURL=push.service.d.ts.map