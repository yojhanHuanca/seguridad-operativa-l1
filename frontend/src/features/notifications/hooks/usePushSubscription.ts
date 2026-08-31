import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export type PushEstado = "cargando" | "no-soportado" | "sin-clave" | "denegado" | "inactivo" | "activo";

/**
 * Notificaciones push del navegador/celular. `sin-clave` sale si el admin
 * todavía no configuró VITE_VAPID_PUBLIC_KEY — mismo criterio que el botón
 * de Google: la función se auto-oculta en vez de romper el resto de Mi
 * Perfil. En iPhone, Apple exige que el sitio esté "agregado a inicio" para
 * que el permiso de notificaciones siquiera aparezca — restricción de Apple,
 * no de este código.
 */
export function usePushSubscription() {
  const soportado = typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
  const [estado, setEstado] = useState<PushEstado>("cargando");

  const revisar = useCallback(async () => {
    if (!soportado) return setEstado("no-soportado");
    if (!VAPID_PUBLIC_KEY) return setEstado("sin-clave");
    if (Notification.permission === "denied") return setEstado("denegado");
    const registration = await navigator.serviceWorker.getRegistration();
    const sub = await registration?.pushManager.getSubscription();
    setEstado(sub ? "activo" : "inactivo");
  }, [soportado]);

  useEffect(() => {
    const timer = window.setTimeout(() => void revisar(), 0);
    return () => window.clearTimeout(timer);
  }, [revisar]);

  const activar = useCallback(async () => {
    if (!soportado || !VAPID_PUBLIC_KEY) return;
    const permiso = await Notification.requestPermission();
    if (permiso !== "granted") {
      setEstado("denegado");
      return;
    }
    const registration = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
    const json = sub.toJSON();
    await api.post("/push/subscribe", { endpoint: json.endpoint, keys: json.keys });
    setEstado("activo");
  }, [soportado]);

  const desactivar = useCallback(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const sub = await registration?.pushManager.getSubscription();
    if (sub) {
      await api.post("/push/unsubscribe", { endpoint: sub.endpoint });
      await sub.unsubscribe();
    }
    setEstado("inactivo");
  }, []);

  return { estado, activar, desactivar };
}
