import { api } from "@/lib/api";

export async function pushTimeout<T>(promise: Promise<T>, message = "El navegador tardó demasiado. Recarga la página e inténtalo nuevamente.", milliseconds = 12_000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([promise, new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(message)), milliseconds);
    })]);
  } finally {
    clearTimeout(timer);
  }
}

export function pushPublicKey(value: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - value.length % 4) % 4);
  const bytes = Uint8Array.from(atob((value + padding).replace(/-/g, "+").replace(/_/g, "/")), character => character.charCodeAt(0));
  if (bytes.length !== 65 || bytes[0] !== 4) throw new Error("La configuración de notificaciones no es válida. Contacta al administrador.");
  return bytes;
}

/** Remove this browser's subscription before its authenticated session is closed. */
export async function disconnectDevicePush() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const registration = await pushTimeout(navigator.serviceWorker.getRegistration("/"), undefined, 3_000);
    const subscription = registration ? await pushTimeout(registration.pushManager.getSubscription(), undefined, 3_000) : null;
    if (!subscription) return;
    await Promise.allSettled([
      api.post("/push/unsubscribe", { endpoint: subscription.endpoint }, { timeout: 3_000 }),
      pushTimeout(subscription.unsubscribe(), undefined, 3_000),
    ]);
    const notifications = registration ? await pushTimeout(registration.getNotifications(), undefined, 3_000) : [];
    notifications?.forEach(notification => notification.close());
  } catch {
    // Signing out remains possible when the device is offline.
  }
}

