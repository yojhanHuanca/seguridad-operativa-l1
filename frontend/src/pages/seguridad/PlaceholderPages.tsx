import { ListChecks } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { ComingSoon } from "@/components/layout/ComingSoon";

export function SoPlanesAccionPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon
        icon={ListChecks}
        title="Planes de Acción"
        description="Vista consolidada de los planes de acción de todas las áreas y su avance."
        hideTitle
        points={[
          "Seguimiento de actividades por responsable y área",
          "Verificación de evidencias de ejecución",
          "Cierre o reapertura de planes según corresponda",
        ]}
      />
    </SeguridadOperativaShell>
  );
}

// Alertas ya está implementada en ./AlertasPage.
// Eventos Operativos ya está implementada en ./EventosOperativosPage.
// Notificaciones ya está implementada en ./NotificacionesPage.
// Mi Perfil ya está implementada en ./PerfilPage.
