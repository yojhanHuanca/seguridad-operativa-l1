import { Cog, ListTree } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ComingSoon } from "@/components/layout/ComingSoon";

export function AdminCatalogosPage() {
  return (
    <AdminShell>
      <ComingSoon
        icon={ListTree}
        title="Catálogos"
        description="Áreas, tipos de incidente, estaciones y niveles de riesgo, editables sin tocar la base de datos."
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
      />
    </AdminShell>
  );
}
