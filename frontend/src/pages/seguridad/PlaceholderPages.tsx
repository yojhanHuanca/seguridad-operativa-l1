import { Activity, AlertTriangle, ListChecks, UserCircle2 } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { ComingSoon } from "@/components/layout/ComingSoon";

export function SoAlertasPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon
        icon={AlertTriangle}
        title="Alertas"
        description="Avisos de casos críticos, plazos por vencer e incumplimientos de SLA."
      />
    </SeguridadOperativaShell>
  );
}

export function SoPlanesAccionPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon
        icon={ListChecks}
        title="Planes de Acción"
        description="Vista consolidada de los planes de acción de todas las áreas y su avance."
        points={[
          "Seguimiento de actividades por responsable y área",
          "Verificación de evidencias de ejecución",
          "Cierre o reapertura de planes según corresponda",
        ]}
      />
    </SeguridadOperativaShell>
  );
}

export function SoEventosPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon
        icon={Activity}
        title="Eventos Operativos"
        description="Registro cronológico de eventos operativos de Línea 1, independiente de los casos SOP abiertos."
      />
    </SeguridadOperativaShell>
  );
}

// Notificaciones ya está implementada en ./NotificacionesPage.

export function SoPerfilPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon icon={UserCircle2} title="Mi Perfil" description="Datos de la cuenta y preferencias de la sesión." />
    </SeguridadOperativaShell>
  );
}
