import { BarChart3, FileBarChart2 } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonChart } from "@/design-system/primitives/Skeleton";
import { TrendBarChart } from "@/design-system/charts/Charts";
import { useIndicadores } from "@/features/indicadores/hooks/useIndicadores";
import { TotalPlanesCard } from "./TotalPlanesCard";

/**
 * Total de reportes por tipo, Cerrado/En Proceso, Total de planes y
 * tendencia mensual. Sin envoltorio de panel a propósito — lo usan tanto
 * `SoKpisPage` (dentro de `SeguridadOperativaShell`) como la pantalla de
 * Indicadores del Jefe de Área (dentro de `JefeShell`): mismo dashboard,
 * pedido igual por el cliente para ambos perfiles.
 */
export function KpisSection() {
  const { data, isLoading } = useIndicadores();

  const porTipo = data?.reportesPorTipo ?? [];
  const cerradoVsProceso = data?.reportesCerradoVsProceso ?? [];
  const tendencia = data?.tendenciaMensual ?? [];
  const totalReportes = data?.totalReportes ?? 0;

  return (
    <>
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

        <TotalPlanesCard />
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
    </>
  );
}
