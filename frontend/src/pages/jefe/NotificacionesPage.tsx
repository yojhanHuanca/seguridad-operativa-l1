import { JefeShell } from "@/components/layout/JefeShell";
import { NotificationsInbox } from "@/features/notifications/components/NotificationsInbox";

export function JefeNotificacionesPage() {
  return (
    <JefeShell>
      <NotificationsInbox description="Avisos de Seguridad Operativa sobre tus planes de acción: nuevos planes asignados, prórrogas resueltas y revisiones." />
    </JefeShell>
  );
}
