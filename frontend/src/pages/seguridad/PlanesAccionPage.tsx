import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ClipboardList, UserCircle, CalendarDays } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Pill } from "@/design-system/primitives/Pill";
import { EmptyState, Progress } from "@/design-system/primitives/Progress";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { usePlansPaginated } from "@/features/plans/hooks/usePlans";
import {
  isClosed,
  isExecuting,
  isInVerification,
  isPendingAcceptance,
  isRejected,
  hasPendingExtension,
} from "@/features/plans/lib/planStatus";
import { planDeadline, isPlanVencido } from "@/features/plans/lib/planDeadline";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { daysUntil, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PlanItem } from "@/features/plans/types";

const PAGE_SIZE = 10;

type Tone = "neutral" | "brand" | "critical" | "warning" | "info" | "success";

function statusInfo(p: PlanItem): { label: string; tone: Tone } {
  if (isRejected(p)) return { label: "Rechazado", tone: "critical" };
  if (isClosed(p)) return { label: "Cerrado", tone: "neutral" };
  if (isInVerification(p)) return { label: "En Verificación", tone: "warning" };
  if (hasPendingExtension(p)) return { label: "Prórroga pendiente", tone: "warning" };
  if (isExecuting(p)) return { label: "En Ejecución", tone: "brand" };
  if (isPendingAcceptance(p)) return { label: "Pendiente de aceptación", tone: "info" };
  return { label: p.catalogo_detalle.nombre, tone: "neutral" };
}

function progresoDelPlan(p: PlanItem): number {
  const total = p.actividades_plan.length;
  if (!total) return 0;
  const avance = p.actividades_plan.reduce((acc, a) => {
    const estado = (a.catalogo_detalle?.nombre ?? "").toLowerCase();
    return acc + (estado.includes("complet") ? 100 : estado.includes("progreso") ? 50 : 0);
  }, 0);
  return Math.round(avance / total);
}

export function SoPlanesAccionPage() {
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [soloVencidos, setSoloVencidos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: areas } = useAreas();
  const areaId = areas?.find((a) => a.nombre_area === areaFilter)?.id_area;

  const setAreaFilterAndResetPage = (value: string) => {
    setAreaFilter(value);
    setCurrentPage(1);
  };
  const toggleSoloVencidos = () => {
    setSoloVencidos((v) => !v);
    setCurrentPage(1);
  };

  const { data: pageData, isLoading } = usePlansPaginated({
    area: areaId,
    vencidos: soloVencidos,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const planes = pageData?.items ?? [];
  const total = pageData?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pageStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + planes.length, total);

  return (
    <SeguridadOperativaShell>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <p className="max-w-2xl text-[13px] text-ink-quiet">
          Vista consolidada de los planes de acción de todas las áreas y su avance. Abra el caso para verificar
          evidencias, cerrar o reabrir un plan.
        </p>
      </div>

      <Card className="mt-4 p-3 flex items-center gap-3 flex-wrap">
        <FilterSelect
          value={areaFilter}
          onChange={setAreaFilterAndResetPage}
          ariaLabel="Filtrar por área"
          options={[{ value: "", label: "Todas las áreas" }, ...(areas ?? []).map((a) => ({ value: a.nombre_area, label: a.nombre_area }))]}
        />
        <button
          type="button"
          onClick={toggleSoloVencidos}
          className={cn(
            "h-9 px-3.5 rounded-lg text-[12.5px] font-medium transition-all border",
            soloVencidos ? "bg-critical text-white border-critical" : "bg-white text-ink-soft border-line hover:border-line-strong"
          )}
        >
          Solo vencidos
        </button>
      </Card>

      <Card padded={false} className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left">
            <thead>
              <tr className="bg-surface/60 border-b border-line">
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Plan</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint">Caso</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[140px]">Área / responsable</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[150px]">Estado</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[130px]">Avance</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-faint w-[110px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {planes.map((plan) => {
                const status = statusInfo(plan);
                const deadline = planDeadline(plan);
                const vencido = isPlanVencido(plan);
                const avance = progresoDelPlan(plan);
                return (
                  <tr key={plan.id_plan} className="group hover:bg-surface/40 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="font-mono text-[13.5px] font-bold leading-tight text-brand-700">{shortPlanCode(plan.codigo_plan)}</p>
                    </td>
                    <td className="px-4 py-3.5 max-w-[300px]">
                      <Link
                        to={`/seguridad/casos/${encodeURIComponent(plan.casos_sop.codigo_sop)}`}
                        className="font-mono text-[12.5px] font-semibold text-brand-700 hover:underline"
                      >
                        {plan.casos_sop.codigo_sop}
                      </Link>
                      <p className="text-[12.5px] text-ink truncate mt-0.5">{plan.casos_sop.titulo?.trim() || plan.casos_sop.descripcion}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-[12.5px] font-medium text-ink-soft truncate">{plan.areas.nombre_area}</p>
                      <p className="inline-flex items-center gap-1 text-[11.5px] text-ink-quiet truncate mt-0.5">
                        <UserCircle className="h-3.5 w-3.5 shrink-0" /> {plan.usuarios.nombre}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col items-start gap-1">
                        <Pill tone={status.tone} dot>{status.label}</Pill>
                        {vencido && (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-critical">
                            <CalendarDays className="h-3 w-3" /> Vencido hace {Math.abs(daysUntil(deadline))}d
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Progress value={avance} showLabel />
                      <p className={cn("mt-1 text-[10.5px]", vencido ? "font-semibold text-critical" : "text-ink-quiet")}>
                        Vence {formatDate(deadline)}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        to={`/seguridad/casos/${encodeURIComponent(plan.casos_sop.codigo_sop)}`}
                        className="text-[12.5px] font-medium text-brand-700 hover:underline"
                      >
                        Ver caso
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!isLoading && total === 0 && (
          <EmptyState
            className="m-4 border-0 bg-transparent"
            icon={<ClipboardList className="h-5 w-5" />}
            title="No hay planes de acción en este filtro"
            description="Ajuste el área o el filtro de vencidos para ver resultados."
          />
        )}
        {isLoading && <p className="p-6 text-center text-[13px] text-ink-quiet">Cargando planes…</p>}

        {!isLoading && total > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-4 py-3">
            <p className="text-[11.5px] text-ink-quiet">
              Mostrando {pageStart + 1}-{pageEnd} de {total} planes
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Página anterior"
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="min-w-[86px] text-center text-[12px] font-medium text-ink-soft">
                  Página {page} de {totalPages}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={page === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Página siguiente"
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </SeguridadOperativaShell>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="h-9 pl-3 pr-8 rounded-lg bg-white border border-line text-[12.5px] text-ink-soft appearance-none cursor-pointer hover:border-line-strong focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23767f79' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
