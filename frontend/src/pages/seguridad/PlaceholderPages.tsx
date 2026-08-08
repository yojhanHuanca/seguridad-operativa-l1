import { Activity, AlertTriangle, BarChart3, Bell, Gavel, ListChecks, UserCircle2 } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { ComingSoon } from "@/components/layout/ComingSoon";

export function SoDecisionesPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon
        icon={Gavel}
        title="Centro de Decisiones"
        description="Bandeja unificada de acciones que requieren su aprobación."
        points={[
          "Aprobar, rechazar o solicitar información adicional sobre un reporte",
          "Evaluar el caso con la matriz de riesgo y asignar investigador",
          "Aprobar o rechazar planes de acción enviados por los jefes de área",
          "Gestionar solicitudes de ampliación de plazo (SLA)",
        ]}
      />
    </SeguridadOperativaShell>
  );
}

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

export function SoReportesPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon
        icon={BarChart3}
        title="Reportes e Indicadores"
        description="Estadísticas del sistema y generación del expediente de caso en PDF."
      />
    </SeguridadOperativaShell>
  );
}

export function SoNotificacionesPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon icon={Bell} title="Notificaciones" description="Avisos sobre nuevos reportes, plazos y respuestas de las áreas." />
    </SeguridadOperativaShell>
  );
}

export function SoPerfilPage() {
  return (
    <SeguridadOperativaShell>
      <ComingSoon icon={UserCircle2} title="Mi Perfil" description="Datos de la cuenta y preferencias de la sesión." />
    </SeguridadOperativaShell>
  );
}
