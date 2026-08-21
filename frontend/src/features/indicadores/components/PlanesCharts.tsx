import { Building2, CalendarClock, RefreshCcw } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonChart } from "@/design-system/primitives/Skeleton";
import { HBarsChart } from "@/design-system/charts/Charts";
import { useIndicadores } from "@/features/indicadores/hooks/useIndicadores";

/**
 * Planes por Área, Vencimiento y Reprogramación — sin Análisis de Riesgo,
 * que es clasificación del reporte SOP (trabajo de SO), no algo que el Jefe
 * de Área ejecute. Usada por `EstadisticasSection` (SO, junto al riesgo) y
 * por el dashboard de Jefe de Área (sola).
 */
export function PlanesCharts() {
  const { data, isLoading } = useIndicadores();
  const porArea = data?.planesAbiertosPorArea ?? [];
  const vencimiento = data?.vencimientoPlanesAbiertos ?? [];
  const reprogramacion = data?.reprogramacionPlanesAbiertos ?? [];

  return (
    <>
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <Building2 className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-ink leading-tight">Planes de Acción Abiertos por Área</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">Cantidad de planes en curso, por área responsable</p>
          </div>
        </div>
        {isLoading ? (
          <SkeletonChart height={260} />
        ) : porArea.length === 0 ? (
          <div className="grid h-[260px] place-items-center text-[13px] text-ink-quiet">Sin planes abiertos</div>
        ) : (
          <HBarsChart data={porArea} height={Math.max(200, porArea.length * 28)} />
        )}
      </Card>

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <CalendarClock className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-ink leading-tight">Vencimiento de Planes Abiertos</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">Días hasta (o desde) la fecha límite vigente</p>
          </div>
        </div>
        {isLoading ? <SkeletonChart height={220} /> : <HBarsChart data={vencimiento} height={220} />}
      </Card>

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <RefreshCcw className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-ink leading-tight">Reprogramación de Planes Abiertos</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">Cuánto se extendió la fecha límite original</p>
          </div>
        </div>
        {isLoading ? (
          <SkeletonChart height={220} />
        ) : reprogramacion.every((r) => r.value === 0) ? (
          <div className="grid h-[220px] place-items-center text-[13px] text-ink-quiet">Sin planes reprogramados</div>
        ) : (
          <HBarsChart data={reprogramacion} height={220} />
        )}
      </Card>
    </>
  );
}
