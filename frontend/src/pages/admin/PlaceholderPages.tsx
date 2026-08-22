import { Cog, History } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ComingSoon } from "@/components/layout/ComingSoon";

export function AdminAuditoriaPage() {
  return (
    <AdminShell>
      <ComingSoon
        icon={History}
        title="Auditoría"
        description="Actividad global del sistema: quién hizo qué y cuándo, más allá del historial de un solo expediente."
        hideTitle
      />
    </AdminShell>
  );
}

export function AdminConfiguracionPage() {
  return (
    <AdminShell>
      <ComingSoon
        icon={Cog}
        title="Configuración"
        description="Parámetros del sistema, como los plazos de SLA por nivel de riesgo."
        hideTitle
      />
    </AdminShell>
  );
}
