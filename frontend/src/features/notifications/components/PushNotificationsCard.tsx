import { Bell, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { usePushSubscription, type PushEstado } from "../hooks/usePushSubscription";

const descriptions: Record<PushEstado, string> = {
  cargando: "Comprobando las notificaciones de este dispositivo…",
  "no-soportado": "Este navegador no admite notificaciones push. Puedes consultar los avisos en la bandeja de la plataforma.",
  "no-seguro": "Para activar los avisos, abre la plataforma mediante HTTPS o localhost.",
  "sin-clave": "El servidor no tiene habilitadas las notificaciones push. Solicita al administrador que revise su configuración.",
  denegado: "El navegador bloqueó los avisos. Permítelos en la configuración de este sitio y luego comprueba el permiso.",
  inactivo: "Activa los avisos y acepta el permiso del navegador para recibir novedades en este dispositivo.",
  activo: "Activadas para tu cuenta en este dispositivo.",
  error: "No se pudo comprobar la configuración. Reintenta para conocer el estado real.",
};

export function PushNotificationsCard() {
  const { estado, error, busy, activar, desactivar, probar, revisar } = usePushSubscription();
  const run = async (action: () => Promise<boolean>, message: string) => {
    if (await action()) toast.success(message);
  };
  return <Card>
    <CardHeader icon={<Bell className="h-4.5 w-4.5" />} title="Notificaciones push" subtitle="Configura los avisos de tu cuenta en este dispositivo." />
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="max-w-md text-[12.5px] leading-relaxed text-ink-quiet" aria-live="polite">{descriptions[estado]}</p>
      <div className="flex flex-wrap gap-2">
        {estado === "inactivo" && <Button size="sm" disabled={busy} onClick={() => void run(activar, "Notificaciones activadas en este dispositivo")}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}Activar notificaciones</Button>}
        {estado === "activo" && <>
          <Button size="sm" variant="outline" disabled={busy} onClick={() => void run(probar, "Aviso de prueba enviado. Revisa las notificaciones de este dispositivo.")}>Probar aviso</Button>
          <Button size="sm" variant="outline" disabled={busy} onClick={() => void run(desactivar, "Notificaciones desactivadas en este dispositivo")}>Desactivar</Button>
        </>}
        {(estado === "denegado" || estado === "error" || estado === "sin-clave") && <Button size="sm" variant="outline" disabled={busy} onClick={() => void revisar()}>{estado === "denegado" ? "Comprobar permiso" : "Reintentar"}</Button>}
      </div>
    </div>
    {error && <p role="alert" className="mt-3 text-[12.5px] text-critical-ink">{error}</p>}
    <p className="mt-3 text-[11.5px] text-ink-faint">La bandeja de la plataforma sigue disponible aunque los avisos de este dispositivo estén desactivados.</p>
  </Card>;
}
