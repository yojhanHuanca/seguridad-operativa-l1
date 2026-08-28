import webpush from "web-push";
import { env } from "../../config/env.js";
import { PushRepository } from "./push.repository.js";
// Sin claves configuradas, el push queda desactivado sin romper nada (mismo
// criterio que GOOGLE_CLIENT_ID/RESEND_API_KEY vacíos): guardar/eliminar
// suscripción funciona igual, pero no se manda nada.
const configured = Boolean(env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY);
if (configured) {
    webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);
}
export class PushService {
    static habilitado = configured;
    static async suscribir(id_usuario, sub) {
        if (!sub?.endpoint || !sub.keys?.p256dh || !sub.keys?.auth) {
            throw new Error("Suscripción push inválida");
        }
        await PushRepository.guardar(id_usuario, sub);
    }
    static async desuscribir(endpoint) {
        if (!endpoint)
            throw new Error("Falta el endpoint");
        await PushRepository.eliminar(endpoint);
    }
    /**
     * Best-effort: nunca lanza, igual que NotificationRepository.emitir (del
     * que se llama siempre, sin esperar la promesa). Si el navegador ya no
     * reconoce una suscripción (404/410 — el usuario desinstaló, revocó el
     * permiso, etc.), se borra sola en vez de seguir intentando para siempre.
     */
    static async enviarAUsuarios(ids, payload) {
        if (!configured || ids.length === 0)
            return;
        try {
            const subs = await PushRepository.listarPorUsuarios(ids);
            const mensaje = JSON.stringify(payload);
            await Promise.allSettled(subs.map(async (sub) => {
                try {
                    await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, mensaje);
                }
                catch (error) {
                    const status = error?.statusCode;
                    if (status === 404 || status === 410) {
                        await PushRepository.eliminar(sub.endpoint);
                    }
                    else {
                        console.error("[push] no se pudo enviar a", sub.endpoint, error);
                    }
                }
            }));
        }
        catch (error) {
            console.error("[push] error general al enviar", error);
        }
    }
}
//# sourceMappingURL=push.service.js.map