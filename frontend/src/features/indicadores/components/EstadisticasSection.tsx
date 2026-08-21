import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonDonut } from "@/design-system/primitives/Skeleton";
import { DonutChart } from "@/design-system/charts/Charts";
import { useIndicadores } from "@/features/indicadores/hooks/useIndicadores";
import { PlanesCharts } from "./PlanesCharts";
import { DetalleTable } from "./DetalleTable";

function pct(value: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((value / total) * 1000) / 10}%`;
}

/**
 * Riesgo, planes por área, vencimiento, reprogramación y la tabla de
 * detalle — el dashboard completo de Seguridad Operativa. El de Jefe de
 * Área usa `PlanesCharts` + `DetalleTable` directo, sin el riesgo: esa
 * clasificación del reporte SOP es trabajo de SO, no algo que el Jefe de
 * Área ejecute.
 */
export function EstadisticasSection() {
  const { data, isLoading } = useIndicadores();
  const riesgo = useMemo(() => data?.analisisRiesgo ?? [], [data]);
  const riesgoTotal = useMemo(() => riesgo.reduce((sum, r) => sum + r.value, 0), [riesgo]);

  return (
    <>
      {/* Misma fila de 4 bloques que el mockup: Riesgo | Planes por Área | Vencimiento | Reprogramación. */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <AlertTriangle className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-ink leading-tight">Análisis de Riesgo</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">Matriz de evaluación de los SOP abiertos</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonDonut height={200} />
          ) : riesgoTotal === 0 ? (
            <div className="grid h-[200px] place-items-center text-[13px] text-ink-quiet">Sin casos abiertos con riesgo asignado</div>
          ) : (
            <>
              <DonutChart data={riesgo} height={200} />
              <div className="mt-3 space-y-1.5">
                {riesgo.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-[11.5px] text-ink-soft min-w-0">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.color }} />
                    <span className="truncate">{d.name}</span>
                    <span className="ml-auto tabular-nums text-ink-faint">
                      {d.value} ({pct(d.value, riesgoTotal)})
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        <PlanesCharts />
      </div>

      <div className="mt-5">
        <DetalleTable />
      </div>
    </>
  );
}
