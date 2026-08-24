import { Logo } from "@/components/brand/Logo";
import { Card } from "@/design-system/primitives/Card";
import { SkeletonChart, SkeletonDonut } from "@/design-system/primitives/Skeleton";
import { DonutChart, HBarsChart, TrendBarChart } from "@/design-system/charts/Charts";
import { AlertTriangle, BarChart3, Building2, CalendarClock, ClipboardList, FileBarChart2, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/format";

/**
 * Las siete tarjetas de indicadores y el documento que se manda a imprimir.
 *
 * Viven acá y no en una página porque las usan dos paneles distintos con los
 * mismos números: Seguridad Operativa (todos los casos) y Jefe de Área (solo
 * los suyos). Cada panel calcula sus propios datos y arma el documento con
 * ellos; el layout de la hoja se define una sola vez.
 *
 * `dense` es la variante para el PDF: menos padding, textos y gráficos más
 * chicos, sin interactividad. Los altos de cada gráfico están calculados para
 * que las tarjetas de una misma fila cierren parejas en A4 apaisado.
 */

export interface MonthTrendItem {
  label: string;
  value: number;
  key: string;
}

function pct(value: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((value / total) * 1000) / 10}%`;
}

export function IndicadoresPrintDocument({
  systemName,
  panelLabel,
  titulo,
  generatedAt,
  periodLabel,
  totalReportes,
  reportesSubtitle,
  porTipo,
  cerradoVsProceso,
  planesSubtitle,
  planes,
  tendencia,
  tendenciaSubtitle,
  riesgoSubtitle,
  riesgo,
  riesgoTotal,
  planesAreaSubtitle,
  porArea,
  vencimientoSubtitle,
  vencimiento,
  reprogramacionSubtitle,
  reprogramacion,
}: {
  systemName: string;
  /** Panel del que sale el reporte: va en el volante y en el pie. */
  panelLabel: string;
  titulo: string;
  generatedAt: Date;
  periodLabel: string;
  totalReportes: number;
  reportesSubtitle: string;
  porTipo: { name: string; value: number }[];
  cerradoVsProceso: { name: string; value: number; color: string }[];
  planesSubtitle: string;
  planes: { total: number; abiertos: number; donut: { name: string; value: number; color: string }[] };
  tendencia: MonthTrendItem[];
  tendenciaSubtitle: string;
  riesgoSubtitle: string;
  riesgo: { name: string; value: number; color: string }[];
  riesgoTotal: number;
  planesAreaSubtitle: string;
  porArea: { name: string; value: number; color?: string }[];
  vencimientoSubtitle: string;
  vencimiento: { name: string; value: number; color?: string }[];
  reprogramacionSubtitle: string;
  reprogramacion: { name: string; value: number; color?: string }[];
}) {
  return (
    <section data-report-export="kpis" className="mx-auto bg-white px-1 py-1 text-ink">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size={34} withWordmark={false} />
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-800">{systemName} · {panelLabel}</p>
            <h1 className="mt-0.5 text-[16px] font-bold leading-tight text-ink">{titulo}</h1>
            <p className="text-[10px] text-ink-quiet">Línea 1 del Metro de Lima · {totalReportes} reportes · {periodLabel}</p>
          </div>
        </div>
        <p className="text-[10px] text-ink-quiet">Generado {formatDateTime(generatedAt)}</p>
      </header>
      <div className="mt-2 h-[2px] w-full bg-brand-700" />

      {/* "Reportes por Mes" ocupa media fila: son 12 barras y en un tercio del
          ancho quedaban pegadas. Va ancho, no alto. `items-start` evita que el
          grid la estire a la altura de "Total de Reportes SOP" (la más alta
          por su lista de tipos) — sin esto le quedaba un hueco vacío abajo. */}
      <div className="mt-2 grid grid-cols-4 items-start gap-2">
        <ReportesSopCard
          dense
          subtitle={reportesSubtitle}
          totalReportes={totalReportes}
          porTipo={porTipo}
          cerradoVsProceso={cerradoVsProceso}
          isLoading={false}
          activeReportType={null}
          activeReportStatus={null}
        />
        <TotalPlanesCard dense subtitle={planesSubtitle} planes={planes} isLoading={false} activePlanStatus={null} />
        <ReportesPorMesCard
          dense
          className="col-span-2"
          subtitle={tendenciaSubtitle}
          tendencia={tendencia}
          isLoading={false}
          activeMonth={null}
        />
      </div>

      <div className="mt-2 grid grid-cols-4 items-start gap-2">
        <RiesgoCard dense subtitle={riesgoSubtitle} riesgo={riesgo} riesgoTotal={riesgoTotal} isLoading={false} activeRisk={null} />
        <AreaCard dense subtitle={planesAreaSubtitle} porArea={porArea} isLoading={false} activeArea={null} />
        <VencimientoCard dense subtitle={vencimientoSubtitle} vencimiento={vencimiento} isLoading={false} activeDue={null} />
        <ReprogramacionCard dense subtitle={reprogramacionSubtitle} reprogramacion={reprogramacion} isLoading={false} activeReschedule={null} />
      </div>

      <footer className="mt-2 border-t border-line pt-1.5 text-[9px] text-ink-quiet">
        Documento generado por {systemName} · {panelLabel} · {formatDateTime(generatedAt)}
      </footer>
    </section>
  );
}

export function ReportesSopCard({
  subtitle,
  totalReportes,
  porTipo,
  cerradoVsProceso,
  isLoading,
  activeReportType,
  activeReportStatus,
  onSelectType,
  onSelectStatus,
  dense,
}: {
  subtitle: string;
  totalReportes: number;
  porTipo: { name: string; value: number }[];
  cerradoVsProceso: { name: string; value: number; color: string }[];
  isLoading: boolean;
  activeReportType: string | null;
  activeReportStatus: string | null;
  onSelectType?: (name: string) => void;
  onSelectStatus?: (name: string) => void;
  /** Versión compacta para que el PDF quepa en una sola hoja: menos padding, textos y gráfico más chicos. */
  dense?: boolean;
}) {
  return (
    <Card className={dense ? "p-2.5" : undefined}>
      <div className={cn("flex items-center gap-3", dense ? "mb-2 gap-2" : "mb-4")}>
        <span className={cn("grid shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700", dense ? "h-6 w-6" : "h-9 w-9")}>
          <FileBarChart2 className={dense ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} />
        </span>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight text-ink truncate", dense ? "text-[10.5px]" : "text-[15px]")}>Total de Reportes SOP</h2>
          {!dense && <p className="mt-0.5 text-[12.5px] text-ink-quiet">{subtitle}</p>}
        </div>
      </div>

      <p className={cn("font-display font-bold tabular-nums leading-none text-ink", dense ? "text-[20px]" : "text-[36px]")}>{totalReportes}</p>

      {porTipo.length > 0 && (
        <div className={cn("divide-y divide-line-soft rounded-lg border border-line-soft", dense ? "mt-2" : "mt-4")}>
          {!dense && (
            <div className="grid grid-cols-[1fr_auto] gap-3 bg-surface/60 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">
              <span>Tipo de Reporte</span>
              <span>QTY</span>
            </div>
          )}
          {porTipo.map((item) => {
            const rowClass = cn(
              "grid w-full grid-cols-[1fr_auto] text-left transition-colors",
              dense ? "gap-1.5 px-1.5 py-0.5 text-[8.5px]" : "gap-3 px-3 py-2 text-[13px]",
              onSelectType && "hover:bg-brand-50/60",
              activeReportType === item.name && "bg-brand-50"
            );
            const content = (
              <>
                <span className="truncate text-ink-soft">{item.name}</span>
                <span className="font-semibold tabular-nums text-ink">{item.value}</span>
              </>
            );
            return onSelectType ? (
              <button key={item.name} type="button" onClick={() => onSelectType(item.name)} className={rowClass}>
                {content}
              </button>
            ) : (
              <div key={item.name} className={rowClass}>
                {content}
              </div>
            );
          })}
        </div>
      )}

      <div className={dense ? "mt-2" : "mt-4"}>
        {isLoading ? (
          <SkeletonChart height={dense ? 165 : 140} />
        ) : (
          <TrendBarChart
            data={cerradoVsProceso.map((d) => ({ label: d.name, value: d.value, color: d.color }))}
            height={dense ? 165 : 140}
            barSize={dense ? 44 : 64}
            activeName={activeReportStatus}
            onItemClick={onSelectStatus}
            showLabels
            animated={!dense}
          />
        )}
      </div>
    </Card>
  );
}

export function TotalPlanesCard({
  subtitle,
  planes,
  isLoading,
  activePlanStatus,
  onSelectPlanStatus,
  dense,
}: {
  subtitle: string;
  planes: { total: number; abiertos: number; donut: { name: string; value: number; color: string }[] };
  isLoading: boolean;
  activePlanStatus: string | null;
  onSelectPlanStatus?: (name: string) => void;
  dense?: boolean;
}) {
  return (
    <Card className={dense ? "p-2.5" : undefined}>
      <div className={cn("flex items-center gap-3", dense ? "mb-2 gap-2" : "mb-4")}>
        <span className={cn("grid shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700", dense ? "h-6 w-6" : "h-9 w-9")}>
          <ClipboardList className={dense ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} />
        </span>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight text-ink truncate", dense ? "text-[10.5px]" : "text-[15px]")}>Total de Planes</h2>
          {!dense && <p className="mt-0.5 text-[12.5px] text-ink-quiet">{subtitle}</p>}
        </div>
      </div>

      <p className={cn("font-display font-bold tabular-nums leading-none text-ink", dense ? "text-[20px]" : "text-[36px]")}>
        {planes.abiertos} <span className={cn("font-medium text-ink-faint", dense ? "text-[11px]" : "text-[18px]")}>/ {planes.total}</span>
      </p>
      {!dense && <p className="mt-0.5 text-[11.5px] text-ink-quiet">#Abiertos / #Total</p>}

      {isLoading ? (
        <SkeletonDonut height={dense ? 100 : 220} />
      ) : planes.total === 0 ? (
        <div className={cn("grid place-items-center text-[13px] text-ink-quiet", dense ? "h-[100px]" : "h-[220px]")}>Sin planes aún</div>
      ) : (
        <>
          <DonutChart
            data={planes.donut}
            height={dense ? 150 : 220}
            innerRadius={dense ? 40 : 60}
            outerRadius={dense ? 64 : 90}
            activeName={activePlanStatus}
            onItemClick={onSelectPlanStatus}
            animated={!dense}
          />
          <LegendList data={planes.donut} total={planes.total} active={activePlanStatus} onSelect={onSelectPlanStatus} dense={dense} />
        </>
      )}
    </Card>
  );
}

export function RiesgoCard({
  subtitle,
  riesgo,
  riesgoTotal,
  isLoading,
  activeRisk,
  onSelectRisk,
  dense,
}: {
  subtitle: string;
  riesgo: { name: string; value: number; color: string }[];
  riesgoTotal: number;
  isLoading: boolean;
  activeRisk: string | null;
  onSelectRisk?: (name: string) => void;
  dense?: boolean;
}) {
  return (
    <Card className={dense ? "p-2.5" : undefined}>
      <div className={cn("flex items-center gap-3", dense ? "mb-2 gap-2" : "mb-4")}>
        <span className={cn("grid shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700", dense ? "h-6 w-6" : "h-9 w-9")}>
          <AlertTriangle className={dense ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} />
        </span>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight text-ink truncate", dense ? "text-[10.5px]" : "text-[15px]")}>Análisis de Riesgo</h2>
          {!dense && <p className="mt-0.5 text-[12.5px] text-ink-quiet">{subtitle}</p>}
        </div>
      </div>
      {isLoading ? (
        <SkeletonDonut height={dense ? 90 : 200} />
      ) : riesgoTotal === 0 ? (
        <div className={cn("grid place-items-center text-[13px] text-ink-quiet", dense ? "h-[90px]" : "h-[200px]")}>Sin casos abiertos con riesgo asignado</div>
      ) : (
        <>
          <DonutChart
            data={riesgo}
            height={dense ? 165 : 200}
            innerRadius={dense ? 44 : 60}
            outerRadius={dense ? 70 : 90}
            activeName={activeRisk}
            onItemClick={onSelectRisk}
            animated={!dense}
          />
          <LegendList data={riesgo} total={riesgoTotal} active={activeRisk} onSelect={onSelectRisk} dense={dense} />
        </>
      )}
    </Card>
  );
}

export function ReportesPorMesCard({
  subtitle,
  tendencia,
  isLoading,
  activeMonth,
  onSelectMonth,
  className,
  dense,
}: {
  subtitle: string;
  tendencia: MonthTrendItem[];
  isLoading: boolean;
  activeMonth: string | null;
  onSelectMonth?: (label: string) => void;
  className?: string;
  dense?: boolean;
}) {
  return (
    <Card className={cn("min-w-0", dense && "p-2.5", className)}>
      <div className={cn("flex items-center gap-3", dense ? "mb-2 gap-2" : "mb-4")}>
        <span className={cn("grid shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700", dense ? "h-6 w-6" : "h-9 w-9")}>
          <BarChart3 className={dense ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} />
        </span>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight text-ink truncate", dense ? "text-[10.5px]" : "text-[15px]")}>Reportes por Mes</h2>
          {!dense && <p className="mt-0.5 text-[12.5px] text-ink-quiet">{subtitle}</p>}
        </div>
      </div>
      {isLoading ? (
        <SkeletonChart height={dense ? 205 : 300} />
      ) : (
        <TrendBarChart
          data={tendencia}
          height={dense ? 205 : 300}
          activeName={activeMonth}
          onItemClick={onSelectMonth}
          showLabels={!dense}
          animated={!dense}
          allTicks
          xTickFontSize={dense ? 8.5 : 11}
        />
      )}
    </Card>
  );
}

export function AreaCard({
  subtitle,
  porArea,
  isLoading,
  activeArea,
  onSelectArea,
  dense,
}: {
  subtitle: string;
  porArea: { name: string; value: number; color?: string }[];
  isLoading: boolean;
  activeArea: string | null;
  onSelectArea?: (name: string) => void;
  dense?: boolean;
}) {
  // Cada área ocupa una fila del eje Y. Los 21px por fila son los que dejan el
  // gráfico a la altura de las otras tres tarjetas de la fila, sin hueco al pie.
  const height = dense ? Math.max(180, Math.min(240, porArea.length * 21)) : Math.max(200, porArea.length * 28);
  return (
    <Card className={dense ? "p-2.5" : undefined}>
      <div className={cn("flex items-center gap-3", dense ? "mb-2 gap-2" : "mb-4")}>
        <span className={cn("grid shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700", dense ? "h-6 w-6" : "h-9 w-9")}>
          <Building2 className={dense ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} />
        </span>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight text-ink truncate", dense ? "text-[10.5px]" : "text-[15px]")}>
            Planes de Acción Abiertos por Área
          </h2>
          {!dense && <p className="mt-0.5 text-[12.5px] text-ink-quiet">{subtitle}</p>}
        </div>
      </div>
      {isLoading ? (
        <SkeletonChart height={dense ? 90 : 260} />
      ) : porArea.length === 0 ? (
        <div className={cn("grid place-items-center text-[13px] text-ink-quiet", dense ? "h-[90px]" : "h-[260px]")}>Sin planes abiertos</div>
      ) : (
        <HBarsChart data={porArea} height={height} activeName={activeArea} onItemClick={onSelectArea} showLabels={!dense} animated={!dense} />
      )}
    </Card>
  );
}

export function VencimientoCard({
  subtitle,
  vencimiento,
  isLoading,
  activeDue,
  onSelectDue,
  dense,
}: {
  subtitle: string;
  vencimiento: { name: string; value: number; color?: string }[];
  isLoading: boolean;
  activeDue: string | null;
  onSelectDue?: (name: string) => void;
  dense?: boolean;
}) {
  return (
    <Card className={dense ? "p-2.5" : undefined}>
      <div className={cn("flex items-center gap-3", dense ? "mb-2 gap-2" : "mb-4")}>
        <span className={cn("grid shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700", dense ? "h-6 w-6" : "h-9 w-9")}>
          <CalendarClock className={dense ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} />
        </span>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight text-ink truncate", dense ? "text-[10.5px]" : "text-[15px]")}>
            Vencimiento de Planes Abiertos
          </h2>
          {!dense && <p className="mt-0.5 text-[12.5px] text-ink-quiet">{subtitle}</p>}
        </div>
      </div>
      {isLoading ? (
        <SkeletonChart height={dense ? 110 : 220} />
      ) : (
        <HBarsChart
          data={vencimiento}
          height={dense ? 231 : 220}
          activeName={activeDue}
          onItemClick={onSelectDue}
          showLabels={!dense}
          animated={!dense}
        />
      )}
    </Card>
  );
}

export function ReprogramacionCard({
  subtitle,
  reprogramacion,
  isLoading,
  activeReschedule,
  onSelectReschedule,
  dense,
}: {
  subtitle: string;
  reprogramacion: { name: string; value: number; color?: string }[];
  isLoading: boolean;
  activeReschedule: string | null;
  onSelectReschedule?: (name: string) => void;
  dense?: boolean;
}) {
  return (
    <Card className={dense ? "p-2.5" : undefined}>
      <div className={cn("flex items-center gap-3", dense ? "mb-2 gap-2" : "mb-4")}>
        <span className={cn("grid shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700", dense ? "h-6 w-6" : "h-9 w-9")}>
          <RefreshCcw className={dense ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} />
        </span>
        <div className="min-w-0">
          <h2 className={cn("font-semibold leading-tight text-ink truncate", dense ? "text-[10.5px]" : "text-[15px]")}>
            Reprogramación de Planes Abiertos
          </h2>
          {!dense && <p className="mt-0.5 text-[12.5px] text-ink-quiet">{subtitle}</p>}
        </div>
      </div>
      {isLoading ? (
        <SkeletonChart height={dense ? 110 : 220} />
      ) : reprogramacion.every((r) => r.value === 0) ? (
        <div className={cn("grid place-items-center text-[13px] text-ink-quiet", dense ? "h-[110px]" : "h-[220px]")}>Sin planes reprogramados</div>
      ) : (
        <HBarsChart
          data={reprogramacion}
          height={dense ? 180 : 220}
          activeName={activeReschedule}
          onItemClick={onSelectReschedule}
          showLabels={!dense}
          animated={!dense}
        />
      )}
    </Card>
  );
}


export function LegendList({
  data,
  total,
  active,
  onSelect,
  dense,
}: {
  data: { name: string; value: number; color: string }[];
  total: number;
  active: string | null;
  /** Sin esto (p. ej. en el PDF), la lista se dibuja como texto plano en vez de botones — la impresión oculta todo `<button>` dentro de `main`. */
  onSelect?: (label: string) => void;
  dense?: boolean;
}) {
  return (
    <div className={dense ? "mt-1.5 space-y-0.5" : "mt-3 space-y-1.5"}>
      {data.map((item) => {
        const rowClass = cn(
          "flex w-full min-w-0 items-center rounded-md text-left transition-colors",
          dense ? "gap-1 px-1 py-0.5 text-[8.5px]" : "gap-1.5 px-1.5 py-1 text-[11.5px]",
          "text-ink-soft",
          onSelect && "hover:bg-brand-50/60",
          active === item.name && "bg-brand-50"
        );
        const content = (
          <>
            <span className={cn("shrink-0 rounded-full", dense ? "h-1.5 w-1.5" : "h-2 w-2")} style={{ background: item.color }} />
            <span className="truncate">{item.name}</span>
            <span className="ml-auto tabular-nums text-ink-faint">
              {item.value} ({pct(item.value, total)})
            </span>
          </>
        );
        return onSelect ? (
          <button key={item.name} type="button" onClick={() => onSelect(item.name)} className={rowClass}>
            {content}
          </button>
        ) : (
          <div key={item.name} className={rowClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
