import { ClipboardList } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonDonut } from "@/design-system/primitives/Skeleton";
import { DonutChart } from "@/design-system/charts/Charts";
import { useIndicadores } from "@/features/indicadores/hooks/useIndicadores";

function pct(value: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((value / total) * 1000) / 10}%`;
}

/** Abiertos/Total de planes de acción, con dona. Usada tanto por `KpisSection` (SO) como por el dashboard de Jefe de Área. */
export function TotalPlanesCard() {
  const { data, isLoading } = useIndicadores();
  const planes = data?.planes ?? { total: 0, abiertos: 0, donut: [] };

  return (
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
  );
}
