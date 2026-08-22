import { JefeShell } from "@/components/layout/JefeShell";
import { TotalPlanesCard } from "@/features/indicadores/components/TotalPlanesCard";
import { PlanesCharts } from "@/features/indicadores/components/PlanesCharts";
import { DetalleTable } from "@/features/indicadores/components/DetalleTable";

/**
 * Solo los indicadores de planes de acción — sin total de reportes SOP,
 * cerrado/en proceso, tendencia mensual ni análisis de riesgo: esos son
 * clasificación del reporte que hace Seguridad Operativa al evaluarlo, no
 * algo que el Jefe de Área ejecute. Lo que sí necesita es el seguimiento de
 * SUS planes: cuántos tiene abiertos, cuáles vencen, cuáles reprogramó.
 */
export function JefeIndicadoresPage() {
  return (
    <JefeShell>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <TotalPlanesCard />
        <PlanesCharts />
      </div>

      <div className="mt-5">
        <DetalleTable />
      </div>
    </JefeShell>
  );
}
