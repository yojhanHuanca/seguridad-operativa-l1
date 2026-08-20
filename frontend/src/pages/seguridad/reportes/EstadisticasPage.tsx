import { useMemo } from "react";
import { AlertTriangle, Building2, CalendarClock, RefreshCcw } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonChart, SkeletonDonut } from "@/design-system/primitives/Skeleton";
import { DonutChart, HBarsChart } from "@/design-system/charts/Charts";
import { useCases } from "@/features/cases/hooks/useCases";
import {
  analisisRiesgo,
  planesAbiertosPorArea,
  reprogramacionPlanesAbiertos,
  tablaDetalle,
  vencimientoPlanesAbiertos,
} from "@/features/indicadores/lib/aggregations";
import { formatDate } from "@/lib/format";

function pct(value: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((value / total) * 1000) / 10}%`;
}

export function SoEstadisticasPage() {
  const { data: rawCases, isLoading } = useCases({});
  const cases = useMemo(() => rawCases ?? [], [rawCases]);

  const riesgo = useMemo(() => analisisRiesgo(cases), [cases]);
  const riesgoTotal = useMemo(() => riesgo.reduce((sum, r) => sum + r.value, 0), [riesgo]);
  const porArea = useMemo(() => planesAbiertosPorArea(cases), [cases]);
  const vencimiento = useMemo(() => vencimientoPlanesAbiertos(cases), [cases]);
  const reprogramacion = useMemo(() => reprogramacionPlanesAbiertos(cases), [cases]);
  const detalle = useMemo(() => tablaDetalle(cases), [cases]);

  return (
    <SeguridadOperativaShell>
      <div>
        <h1 className="text-[22px] font-bold text-ink tracking-tight">Estadísticas</h1>
        <p className="mt-1 text-[13px] text-ink-quiet">
          Riesgo, distribución por área y vencimientos de los planes de acción abiertos.
        </p>
      </div>

      {/* Misma fila de 4 bloques que el mockup: Riesgo | Planes por Área | Vencimiento | Reprogramación. */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
      </div>

      <Card padded={false} className="mt-5 overflow-hidden">
        <div className="p-5 pb-3">
          <h2 className="text-[15px] font-semibold text-ink leading-tight">Detalle de Reportes y Planes de Acción</h2>
          <p className="mt-0.5 text-[12.5px] text-ink-quiet">{detalle.length} registros</p>
        </div>
        <div className="max-h-[520px] overflow-auto">
          <table className="min-w-[980px] w-full text-left">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-surface/60 border-b border-line">
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Código</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[110px]">Fecha</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint">Descripción</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Plan de Acción</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[150px]">Responsable</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Estado del Plan</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint">Descripción del Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-[13px] text-ink-quiet">
                    Cargando…
                  </td>
                </tr>
              ) : detalle.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-[13px] text-ink-quiet">
                    Sin registros
                  </td>
                </tr>
              ) : (
                detalle.map((row) => (
                  <tr key={row.id} className="hover:bg-surface/40 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-[13px] font-semibold text-brand-700">{row.codigo}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-[12.5px] text-ink-soft">{formatDate(row.fechaEvento)}</td>
                    <td className="px-4 py-3 text-[12.5px] text-ink-soft max-w-[280px] truncate">{row.descripcion}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-[12.5px] text-ink">{row.planCodigo ?? "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-[12.5px] text-ink-soft">{row.responsable ?? "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-[12.5px] text-ink-soft">{row.estadoPlan ?? "-"}</td>
                    <td className="px-4 py-3 text-[12.5px] text-ink-soft max-w-[280px] truncate">{row.descripcionPlan ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </SeguridadOperativaShell>
  );
}
