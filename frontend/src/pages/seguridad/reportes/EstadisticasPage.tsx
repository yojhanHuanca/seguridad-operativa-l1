import { useMemo } from "react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { useCases } from "@/features/cases/hooks/useCases";
import { tablaDetalle } from "@/features/indicadores/lib/aggregations";
import { formatDate } from "@/lib/format";

/**
 * Detalle fila por fila de reportes y sus planes. Los gráficos que antes
 * acompañaban a esta tabla se consolidaron en KPIs por pedido del cliente:
 * acá queda la consulta de detalle, que es lo que no se puede leer en un
 * gráfico.
 */
export function SoEstadisticasPage() {
  const { data: rawCases, isLoading } = useCases({});
  const cases = useMemo(() => rawCases ?? [], [rawCases]);
  const detalle = useMemo(() => tablaDetalle(cases), [cases]);

  return (
    <SeguridadOperativaShell>
      <Card padded={false} className="overflow-hidden">
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
