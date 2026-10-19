import webpush from "web-push";
import { env } from "../../config/env.js";
import { PushRepository, type SuscripcionPush } from "./push.repository.js";
import logger from "../../utils/logger.js";
import { z } from "zod";

const endpointSchema = z.string().max(500).url().refine(value => {
  const url = new URL(value);
  return url.protocol === "https:" && !url.username && !url.password;
}, "El servicio de notificaciones no es válido");
const subscriptionSchema = z.object({
  endpoint: endpointSchema,
  keys: z.object({
    p256dh: z.string().regex(/^[A-Za-z0-9_-]+={0,2}$/).max(200).refine(value => {
      const key = Buffer.from(value, "base64url");
      return key.length === 65 && key[0] === 4;
    }, "La clave del dispositivo no es válida"),
    auth: z.string().regex(/^[A-Za-z0-9_-]+={0,2}$/).max(200).refine(value => Buffer.from(value, "base64url").length === 16, "La clave de autenticación no es válida"),
  }),
});

// Sin claves configuradas se rechaza la activación; eliminar sigue disponible.
const configured = Boolean(env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY);
if (configured) {
  webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);
}

function parseEndpoint(endpoint: unknown) {
  const result = endpointSchema.safeParse(endpoint);
  if (!result.success) throw new Error("El servicio de notificaciones no es válido");
  return result.data;
}

export interface PushPayload {
  title: string;
  body: string;
}

export class PushService {
  static readonly habilitado = configured;

  static config() {
    return { habilitado: configured, publicKey: configured ? env.VAPID_PUBLIC_KEY : null };
  }

  static async estado(id_usuario: number, endpoint: unknown) {
    const url = parseEndpoint(endpoint);
    return { suscrita: Boolean(await PushRepository.buscarPropia(url, id_usuario)) };
  }

  static async suscribir(id_usuario: number, sub: SuscripcionPush) {
    if (!configured) throw new Error("Las notificaciones push no están configuradas en el servidor");
    const result = subscriptionSchema.safeParse(sub);
    if (!result.success) throw new Error("La suscripción del dispositivo no es válida. Vuelve a activarla.");
    await PushRepository.guardar(id_usuario, result.data);
  }

  static async desuscribir(endpoint: string, id_usuario: number) {
    await PushRepository.eliminar(parseEndpoint(endpoint), id_usuario);
  }

  static async probar(id_usuario: number, endpoint: unknown) {
    if (!configured) throw new Error("Las notificaciones push no están configuradas en el servidor");
    const url = parseEndpoint(endpoint);
    const sub = await PushRepository.buscarPropia(url, id_usuario);
    if (!sub) throw new Error("Activa las notificaciones en este dispositivo antes de probarlas");
    try {
      await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, JSON.stringify({ title: "SMS L1", body: "Las notificaciones de este dispositivo están conectadas." }), { timeout: 10_000 });
    } catch (error) {
      const status = (error as { statusCode?: number }).statusCode;
      if (status === 404 || status === 410) {
        await PushRepository.eliminar(sub.endpoint, id_usuario);
        throw new Error("La suscripción caducó. Desactiva y vuelve a activar las notificaciones");
      }
      logger.warn({ statusCode: status }, "Push test failed");
      throw new Error("No se pudo enviar el aviso de prueba. Inténtalo nuevamente");
    }
  }

  /**
   * Best-effort: nunca lanza, igual que NotificationRepository.emitir (del
   * que se llama siempre, sin esperar la promesa). Si el navegador ya no
   * reconoce una suscripción (404/410 — el usuario desinstaló, revocó el
   * permiso, etc.), se borra sola en vez de seguir intentando para siempre.
   */
  static async enviarAUsuarios(ids: number[], payload: PushPayload): Promise<void> {
    if (!configured || ids.length === 0) return;
    try {
      const subs = await PushRepository.listarPorUsuarios(ids);
      const mensaje = JSON.stringify(payload);
      await Promise.allSettled(
        subs.map(async (sub) => {
          try {
            await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, mensaje, { timeout: 10_000 });
          } catch (error) {
            const status = (error as { statusCode?: number })?.statusCode;
            if (status === 404 || status === 410) {
              await PushRepository.eliminar(sub.endpoint);
            } else {
              logger.warn({ statusCode: status }, "Push delivery failed");
            }
          }
        })
      );
    } catch (error) {
      logger.error({ errorName: error instanceof Error ? error.name : "UnknownError" }, "Push dispatch failed");
    }
  }
}
