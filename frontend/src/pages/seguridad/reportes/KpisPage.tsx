import { useMemo } from "react";
import { BarChart3, ClipboardList, FileBarChart2 } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonChart, SkeletonDonut } from "@/design-system/primitives/Skeleton";
import { DonutChart, TrendBarChart } from "@/design-system/charts/Charts";
import { useCases } from "@/features/cases/hooks/useCases";
import { reportesCerradoVsProceso, reportesPorTipo, tendenciaMensual, totalPlanes } from "@/features/indicadores/lib/aggregations";

function pct(value: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((value / total) * 1000) / 10}%`;
}

export function SoKpisPage() {
  const { data: rawCases, isLoading } = useCases({});
  const cases = useMemo(() => rawCases ?? [], [rawCases]);

  const porTipo = useMemo(() => reportesPorTipo(cases), [cases]);
  const cerradoVsProceso = useMemo(() => reportesCerradoVsProceso(cases), [cases]);
  const planes = useMemo(() => totalPlanes(cases), [cases]);
  const tendencia = useMemo(() => tendenciaMensual(cases, 12), [cases]);
  const totalReportes = cases.length;

  return (
    <SeguridadOperativaShell>
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <FileBarChart2 className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-ink leading-tight">Total de Reportes SOP</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">Todos los reportes registrados en el sistema</p>
            </div>
          </div>

          <p className="font-display text-[36px] font-bold tabular-nums leading-none text-ink">{totalReportes}</p>

          {porTipo.length > 0 && (
            <div className="mt-4 divide-y divide-line-soft rounded-lg border border-line-soft">
              <div className="grid grid-cols-[1fr_auto] gap-3 bg-surface/60 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">
                <span>Tipo de Reporte</span>
                <span>QTY</span>
              </div>
              {porTipo.map((t) => (
                <div key={t.name} className="grid grid-cols-[1fr_auto] gap-3 px-3 py-2 text-[13px]">
                  <span className="text-ink-soft">{t.name}</span>
                  <span className="font-semibold text-ink tabular-nums">{t.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            {isLoading ? (
              <SkeletonChart height={140} />
            ) : (
              <TrendBarChart
                data={cerradoVsProceso.map((d) => ({ label: d.name, value: d.value, color: d.color }))}
                height={140}
                barSize={64}
              />
            )}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <ClipboardList className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-ink leading-tight">Total de Planes</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-quiet">Abiertos sobre el total de planes de acción</p>
            </div>
          </div>

          <p className="font-display text-[36px] font-bold tabular-nums leading-none text-ink">
            {planes.abiertos} <span className="text-[18px] font-medium text-ink-faint">/ {planes.total}</span>
          </p>
          <p className="mt-0.5 text-[11.5px] text-ink-quiet">#Abiertos / #Total</p>

          {isLoading ? (
            <SkeletonDonut height={220} />
          ) : planes.total === 0 ? (
            <div className="grid h-[220px] place-items-center text-[13px] text-ink-quiet">Sin planes aún</div>
          ) : (
            <>
              <DonutChart data={planes.donut} height={220} />
              <div className="mt-3 space-y-1.5">
                {planes.donut.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-[11.5px] text-ink-soft min-w-0">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.color }} />
                    <span className="truncate">{d.name}</span>
                    <span className="ml-auto tabular-nums text-ink-faint">
                      {d.value} ({pct(d.value, planes.total)})
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Aparte y abajo, con más espacio: son ~12 barras, apretarlo junto a las
          otras dos tarjetas lo dejaba ilegible. */}
      <Card className="mt-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <BarChart3 className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-ink leading-tight">Reportes por Mes</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-quiet">Cantidad de reportes SOP registrados, últimos 12 meses</p>
          </div>
        </div>
        {isLoading ? <SkeletonChart height={300} /> : <TrendBarChart data={tendencia} height={300} />}
      </Card>
    </SeguridadOperativaShell>
  );
}
