import { useCallback, useEffect, useRef, useState } from "react";
import { api, apiErrorMessage, type ApiEnvelope } from "@/lib/api";
import { useAuth } from "@/features/auth/auth";
import { pushPublicKey, pushTimeout } from "../lib/push";

export type PushEstado = "cargando" | "no-soportado" | "no-seguro" | "sin-clave" | "denegado" | "inactivo" | "activo" | "error";
interface PushConfig { habilitado: boolean; publicKey: string | null; }

export function usePushSubscription() {
  const { user } = useAuth();
  const [estado, setEstado] = useState<PushEstado>("cargando");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const working = useRef(false);
  const key = useRef("");
  const revision = useRef(0);
  const supported = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  const secure = window.isSecureContext;

  const revisar = useCallback(async () => {
    if (working.current) return;
    const current = ++revision.current;
    key.current = "";
    const update = (next: PushEstado) => { if (current === revision.current) setEstado(next); };
    setError(null);
    if (!secure) return update("no-seguro");
    if (!supported) return update("no-soportado");
    try {
      const { data } = await api.get<ApiEnvelope<PushConfig>>("/push/config", { timeout: 10_000 });
      if (current !== revision.current) return;
      if (!data.data?.habilitado || !data.data.publicKey) { key.current = ""; return update("sin-clave"); }
      pushPublicKey(data.data.publicKey);
      key.current = data.data.publicKey;
      if (Notification.permission === "denied") return update("denegado");
      if (Notification.permission !== "granted") return update("inactivo");
      const registration = await pushTimeout(navigator.serviceWorker.getRegistration("/"));
      const subscription = registration ? await pushTimeout(registration.pushManager.getSubscription()) : null;
      if (!subscription) return update("inactivo");
      const { data: status } = await api.post<ApiEnvelope<{ suscrita: boolean }>>("/push/status", { endpoint: subscription.endpoint }, { timeout: 10_000 });
      update(status.data?.suscrita ? "activo" : "inactivo");
    } catch (cause) {
      if (current === revision.current) { setError(apiErrorMessage(cause, cause instanceof Error ? cause.message : "No se pudo comprobar la configuración de notificaciones")); update("error"); }
    }
  }, [supported, secure, user?.id_usuario]);

  useEffect(() => {
    setEstado("cargando");
    void revisar();
    const focus = () => void revisar();
    window.addEventListener("focus", focus);
    return () => { revision.current++; window.removeEventListener("focus", focus); };
  }, [revisar]);

  const activar = async (): Promise<boolean> => {
    if (working.current || !supported || !secure || !key.current) return false;
    working.current = true;
    revision.current++;
    setBusy(true);
    setError(null);
    let created: PushSubscription | null = null;
    try {
      // Request permission directly from the click, before any network await.
      const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
      if (permission !== "granted") {
        setEstado(permission === "denied" ? "denegado" : "inactivo");
        if (permission === "default") setError("No concediste el permiso. Puedes volver a intentarlo cuando quieras.");
        return false;
      }
      await pushTimeout(navigator.serviceWorker.register("/sw.js", { scope: "/" }));
      const registration = await pushTimeout(navigator.serviceWorker.ready);
      let subscription = await pushTimeout(registration.pushManager.getSubscription());
      const publicKey = pushPublicKey(key.current);
      const previousKey = subscription?.options.applicationServerKey;
      if (subscription && previousKey && !new Uint8Array(previousKey).every((byte, index) => byte === publicKey[index])) {
        await api.post("/push/unsubscribe", { endpoint: subscription.endpoint }, { timeout: 10_000 });
        if (!await pushTimeout(subscription.unsubscribe())) throw new Error("No se pudo renovar la suscripción. Inténtalo nuevamente.");
        subscription = null;
      }
      if (!subscription) {
        subscription = await pushTimeout(registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: publicKey }));
        created = subscription;
      }
      const json = subscription.toJSON();
      await api.post("/push/subscribe", { endpoint: json.endpoint, keys: json.keys }, { timeout: 10_000 });
      setEstado("activo");
      return true;
    } catch (cause) {
      if (created) await pushTimeout(created.unsubscribe()).catch(() => undefined);
      const denied = Notification.permission === "denied";
      setEstado(denied ? "denegado" : "inactivo");
      setError(apiErrorMessage(cause, cause instanceof Error ? cause.message : "No se pudieron activar las notificaciones. Inténtalo nuevamente."));
      return false;
    } finally { working.current = false; setBusy(false); }
  };

  const desactivar = async (): Promise<boolean> => {
    if (working.current) return false;
    working.current = true;
    revision.current++;
    setBusy(true);
    setError(null);
    try {
      const registration = await pushTimeout(navigator.serviceWorker.getRegistration("/"));
      const subscription = registration ? await pushTimeout(registration.pushManager.getSubscription()) : null;
      if (subscription) {
        await api.post("/push/unsubscribe", { endpoint: subscription.endpoint }, { timeout: 10_000 });
        setEstado("inactivo");
        if (!await pushTimeout(subscription.unsubscribe())) throw new Error("Se desactivaron en el servidor, pero el navegador no pudo cancelar la suscripción. Puedes reintentar.");
      }
      setEstado("inactivo");
      return true;
    } catch (cause) {
      setError(apiErrorMessage(cause, cause instanceof Error ? cause.message : "No se pudieron desactivar las notificaciones"));
      return false;
    } finally { working.current = false; setBusy(false); }
  };

  const probar = async (): Promise<boolean> => {
    if (working.current) return false;
    working.current = true;
    setBusy(true);
    setError(null);
    try {
      const registration = await pushTimeout(navigator.serviceWorker.getRegistration("/"));
      const subscription = registration ? await pushTimeout(registration.pushManager.getSubscription()) : null;
      if (!subscription) throw new Error("Activa las notificaciones antes de enviar un aviso de prueba.");
      await api.post("/push/test", { endpoint: subscription.endpoint }, { timeout: 15_000 });
      return true;
    } catch (cause) {
      setError(apiErrorMessage(cause, cause instanceof Error ? cause.message : "No se pudo enviar el aviso de prueba"));
      return false;
    } finally { working.current = false; setBusy(false); }
  };

  return { estado, error, busy, activar, desactivar, probar, revisar };
}
