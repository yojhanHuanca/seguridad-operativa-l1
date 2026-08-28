// Bandeja de notificaciones de Seguridad Operativa.
//
// Acá va lo que ya pasó, no lo que hay que decidir: son eventos puntuales
// disparados por otras personas (el jefe aceptó un plan, pidió una prórroga,
// terminó la ejecución, se te asignó un evento de Monitoreo) que se marcan
// como leídos y se archivan. Lo accionable de cada caso se resuelve desde su
// propio expediente (/seguridad/casos/:codigo).
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { NotificationsInbox } from "@/features/notifications/components/NotificationsInbox";

export function SoNotificacionesPage() {
  return (
    <SeguridadOperativaShell>
      <NotificationsInbox description="Lo que hicieron las áreas y los reportantes. Para lo que requiere una decisión suya, vaya al Centro de Decisiones." />
    </SeguridadOperativaShell>
  );
}
