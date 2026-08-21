import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { useCasesPaginated } from "@/features/cases/hooks/useCasesPaginated";
import { tablaDetalle } from "@/features/indicadores/lib/aggregations";
import { formatDate } from "@/lib/format";

const POR_PAGINA = 20;

/**
 * Una fila por (caso, plan), paginada en el servidor — no tiene sentido
 * bajar el histórico completo para armar un listado. Usada tanto por
 * `EstadisticasSection` (SO) como por el dashboard de Jefe de Área.
 */
export function DetalleTable() {
  const [pagina, setPagina] = useState(1);
  const { data: pageData, isLoading } = useCasesPaginated({
    sort: "recientes",
    page: pagina,
    limit: POR_PAGINA,
  });
  const total = pageData?.total ?? 0;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const detalle = useMemo(() => tablaDetalle(pageData?.items ?? []), [pageData]);

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 p-5 pb-3">
        <div>
          <h2 className="text-[15px] font-semibold text-ink leading-tight">Detalle de Reportes y Planes de Acción</h2>
          <p className="mt-0.5 text-[12.5px] text-ink-quiet">{total} casos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPagina(Math.max(1, paginaActual - 1))} disabled={paginaActual === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-[12px] text-ink-quiet">Página {paginaActual} de {totalPaginas}</span>
          <Button variant="outline" size="sm" onClick={() => setPagina(Math.min(totalPaginas, paginaActual + 1))} disabled={paginaActual === totalPaginas}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
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
  );
}
