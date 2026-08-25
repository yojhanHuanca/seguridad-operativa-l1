/* eslint-disable react-refresh/only-export-components */
// Portado del prototipo SIGMA L1 (design-system/charts/Charts.tsx), con la
// animación de entrada alineada al resto de la app.
import { useReducedMotion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  LabelList,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const CHART_COLORS = {
  brand: "#14814a",
  brandLight: "#6fbd86",
  brandSoft: "#d4ecd9",
  critical: "#d23a2c",
  warning: "#d99520",
  info: "#2c7be0",
  ink: "#41504a",
  inkFaint: "#a4aba6",
  surface: "#eef2f1",
};

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e3e8e5",
  boxShadow: "0 8px 30px -8px rgba(15,41,26,0.22)",
  fontSize: 12,
  padding: "8px 10px",
  background: "#fff",
};

const labelStyle = { color: "#767f79", fontSize: 11, marginBottom: 2 };
const itemStyle = { color: "#182621", fontSize: 12.5, padding: "1px 0" };

type ChartItemClick = (name: string) => void;

function recordFromChartPayload(item: unknown): Record<string, unknown> {
  const raw = item && typeof item === "object" && "payload" in item ? (item as { payload?: unknown }).payload : item;
  return raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
}

function valueFromRecord(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

/**
 * Props de animación para las series de recharts.
 *
 * recharts anima por defecto pero ignora `prefers-reduced-motion` — no consulta
 * el media query en ningún momento —, así que hay que apagarla a mano para
 * quien pidió menos movimiento. La duración se acerca a la de las variantes de
 * framer-motion para que el dibujado del gráfico y la entrada de la tarjeta que
 * lo contiene no vayan a ritmos distintos.
 *
 * `enabled: false` la apaga del todo. Lo usa el documento de impresión: al
 * llamar a `window.print()` el navegador congela el requestAnimationFrame, así
 * que la animación queda clavada en el frame 0 — barras de alto 0 y anillos sin
 * segmentos — y el PDF sale con los ejes dibujados pero sin ningún dato.
 */
function useSeriesAnimation(enabled = true) {
  const reduce = useReducedMotion();
  return {
    isAnimationActive: enabled && !reduce,
    animationDuration: 640,
    animationEasing: "ease-out" as const,
  };
}

export function TrendAreaChart({
  data,
  dataKey = "value",
  xKey = "label",
  color = CHART_COLORS.brand,
  height = 220,
}: {
  data: { label: string; value: number; value2?: number }[];
  dataKey?: string;
  xKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={`area-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.surface} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} dy={6} />
        <YAxis tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} width={32} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} itemStyle={itemStyle} cursor={{ stroke: color, strokeOpacity: 0.2 }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#area-${dataKey})`}
          dot={{ r: 0 }}
          activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TrendBarChart({
  data,
  dataKey = "value",
  xKey = "label",
  color = CHART_COLORS.brand,
  height = 220,
  barSize = 24,
  activeName,
  onItemClick,
  showLabels = false,
  animated = true,
  allTicks = false,
  xTickFontSize = 11,
}: {
  data: { label: string; value: number; color?: string }[];
  dataKey?: string;
  xKey?: string;
  color?: string;
  height?: number;
  barSize?: number;
  activeName?: string | null;
  onItemClick?: ChartItemClick;
  showLabels?: boolean;
  animated?: boolean;
  /** Dibuja una etiqueta por cada punto. Por defecto recharts saltea las que no le entran a lo ancho — en el PDF eso hacía desaparecer la mitad de los meses. */
  allTicks?: boolean;
  xTickFontSize?: number;
}) {
  const anim = useSeriesAnimation(animated);
  // Cada punto puede traer su propio `color` (p. ej. Cerrado en verde, En
  // Proceso en amarillo); si ninguno lo trae, todas las barras usan `color`.
  const hasPerBarColor = data.some((d) => d.color);
  const needsCells = hasPerBarColor || !!activeName;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap={18}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.surface} vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fill: CHART_COLORS.inkFaint, fontSize: xTickFontSize }}
          tickLine={false}
          axisLine={false}
          dy={6}
          interval={allTicks ? 0 : "preserveEnd"}
        />
        <YAxis tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} width={36} allowDecimals={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={labelStyle}
          itemStyle={itemStyle}
          cursor={{ fill: CHART_COLORS.surface, fillOpacity: 0.4 }}
        />
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={[4, 4, 0, 0]}
          barSize={barSize}
          onClick={
            onItemClick
              ? (item: unknown) => {
                  const label = valueFromRecord(recordFromChartPayload(item), xKey);
                  if (label) onItemClick(label);
                }
              : undefined
          }
          cursor={onItemClick ? "pointer" : undefined}
          {...anim}
        >
          {showLabels && <LabelList dataKey={dataKey} position="insideTop" fill="#ffffff" fontSize={11} fontWeight={700} />}
          {needsCells &&
            data.map((d, i) => {
              const label = valueFromRecord(d as unknown as Record<string, unknown>, xKey);
              return <Cell key={i} fill={d.color ?? color} opacity={activeName && activeName !== label ? 0.35 : 1} />;
            })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MiniLineChart({
  data,
  dataKey = "value",
  color = CHART_COLORS.brand,
  height = 60,
}: {
  data: { value: number }[];
  dataKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 4 }}>
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} isAnimationActive />
      </LineChart>
    </ResponsiveContainer>
  );
}

const RADIAN = Math.PI / 180;

/** Etiqueta de porcentaje sobre el arco de cada porción — se omite en porciones muy angostas para no amontonar texto. */
function renderDonutPercentLabel(props: unknown) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props as {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  };
  if (percent < 0.04) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${Math.round(percent * 1000) / 10}%`}
    </text>
  );
}

export function DonutChart({
  data,
  height = 220,
  innerRadius = 60,
  outerRadius = 90,
  activeName,
  onItemClick,
  animated = true,
  showPercentLabels = false,
}: {
  data: { name: string; value: number; color: string }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  activeName?: string | null;
  onItemClick?: ChartItemClick;
  animated?: boolean;
  /** Muestra el % de cada porción directo sobre el arco, en vez de solo en la leyenda. */
  showPercentLabels?: boolean;
}) {
  const anim = useSeriesAnimation(animated);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          stroke="#fff"
          strokeWidth={2}
          label={showPercentLabels ? renderDonutPercentLabel : undefined}
          labelLine={false}
          onClick={
            onItemClick
              ? (item: unknown) => {
                  const name = valueFromRecord(recordFromChartPayload(item), "name");
                  if (name) onItemClick(name);
                }
              : undefined
          }
          cursor={onItemClick ? "pointer" : undefined}
          {...anim}
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} opacity={activeName && activeName !== d.name ? 0.35 : 1} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} itemStyle={itemStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function HBarsChart({
  data,
  height = 220,
  activeName,
  onItemClick,
  showLabels = false,
  animated = true,
}: {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  activeName?: string | null;
  onItemClick?: ChartItemClick;
  showLabels?: boolean;
  animated?: boolean;
}) {
  const anim = useSeriesAnimation(animated);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 4 }} barCategoryGap={10}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.surface} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, "dataMax"]}
          tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: CHART_COLORS.ink, fontSize: 11.5 }}
          tickLine={false}
          axisLine={false}
          width={110}
          interval={0}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={labelStyle}
          itemStyle={itemStyle}
          cursor={{ fill: CHART_COLORS.surface, fillOpacity: 0.5 }}
        />
        <Bar
          dataKey="value"
          radius={[0, 6, 6, 0]}
          barSize={14}
          onClick={
            onItemClick
              ? (item: unknown) => {
                  const name = valueFromRecord(recordFromChartPayload(item), "name");
                  if (name) onItemClick(name);
                }
              : undefined
          }
          cursor={onItemClick ? "pointer" : undefined}
          {...anim}
        >
          {showLabels && <LabelList dataKey="value" position="insideRight" fill="#ffffff" fontSize={11} fontWeight={700} />}
          {data.map((d, i) => (
            <Cell key={i} fill={d.color ?? CHART_COLORS.brand} opacity={activeName && activeName !== d.name ? 0.35 : 1} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * Barras de cantidad más dos líneas sobre un segundo eje: el índice móvil y su
 * umbral tolerable. Es el gráfico de los indicadores de eventos operacionales.
 *
 * Los dos ejes son necesarios porque las series viven en escalas distintas —
 * decenas de eventos contra un índice de un dígito—; con un solo eje la línea
 * quedaría pegada al piso. El umbral es una línea horizontal punteada en vez de
 * `ReferenceLine` para que aparezca en la leyenda junto a las otras dos.
 */
/** Etiqueta del índice sobre la línea, dentro de una cajita blanca como en el panel del cliente. */
// El tipo de `content` de recharts admite valores que acá no se dan (arrays,
// null), así que se recibe suelto y se normaliza.
function EtiquetaIndice(props: { x?: unknown; y?: unknown; value?: unknown }) {
  const x = Number(props.x);
  const y = Number(props.y);
  if (props.value == null || Number.isNaN(x) || Number.isNaN(y)) return null;
  const texto = String(props.value);
  // Cajita blanca redondeada detrás del número, como en el panel del cliente:
  // la línea y las barras pasan por detrás, y sin el fondo sólido el valor se
  // vuelve ilegible cuando cae encima de una barra.
  const ancho = texto.length * 7 + 10;
  return (
    <g>
      <rect x={x - ancho / 2} y={y - 21} width={ancho} height={16} rx={3} fill="#ffffff" />
      <text x={x} y={y - 9.5} textAnchor="middle" fill={CHART_COLORS.brand} fontSize={11} fontWeight={700}>
        {texto}
      </text>
    </g>
  );
}

export function IndiceComposedChart({
  data,
  height = 280,
  tolerable,
  etiquetaBarras = "Eventos",
  etiquetaIndice = "Rolling 12M Año en curso (Tendencia)",
  etiquetaUmbral = "Umbral tolerable (1σ)",
  animated = true,
}: {
  data: { label: string; eventos: number; indice: number | null }[];
  height?: number;
  tolerable?: number | null;
  etiquetaBarras?: string;
  etiquetaIndice?: string;
  etiquetaUmbral?: string;
  animated?: boolean;
}) {
  const anim = useSeriesAnimation(animated);
  const conUmbral = data.map((d) => ({ ...d, umbral: tolerable ?? null }));
  const hayIndice = data.some((d) => d.indice != null);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={conUmbral} margin={{ top: 28, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.surface} vertical={false} />
        <XAxis dataKey="label" tick={{ fill: CHART_COLORS.ink, fontSize: 10.5 }} tickLine={false} axisLine={false} dy={6} interval={0} />
        <YAxis yAxisId="cantidad" tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} width={36} allowDecimals={false} />
        <YAxis
          yAxisId="indice"
          orientation="right"
          tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} itemStyle={itemStyle} cursor={{ fill: CHART_COLORS.surface, fillOpacity: 0.4 }} />
        {/* Sin iconType fijo: cada serie usa su propio ícono de leyenda —
            círculo para la barra, línea (con el mismo patrón de trazo) para
            el umbral y el índice — igual que en el panel del cliente. */}
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
        <Bar
          yAxisId="cantidad"
          dataKey="eventos"
          name={etiquetaBarras}
          legendType="circle"
          fill={CHART_COLORS.info}
          radius={[3, 3, 0, 0]}
          maxBarSize={42}
          {...anim}
        >
          {/* Dentro de la barra y abajo, como en el panel del cliente. */}
          <LabelList dataKey="eventos" position="insideBottom" fill="#ffffff" fontSize={11} fontWeight={700} offset={8} />
        </Bar>
        {tolerable != null && (
          <Line
            yAxisId="indice"
            type="monotone"
            dataKey="umbral"
            name={etiquetaUmbral}
            stroke={CHART_COLORS.warning}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 2, fill: CHART_COLORS.ink, stroke: CHART_COLORS.ink }}
            {...anim}
          />
        )}
        {hayIndice && (
          <Line
            yAxisId="indice"
            type="monotone"
            dataKey="indice"
            name={etiquetaIndice}
            stroke={CHART_COLORS.brand}
            strokeWidth={2.5}
            dot={false}
            connectNulls
            {...anim}
          >
            <LabelList dataKey="indice" content={EtiquetaIndice} />
          </Line>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function GaugeChart({ value, height = 180, label }: { value: number; height?: number; label?: string }) {
  const data = [{ name: "sla", value, fill: value >= 85 ? CHART_COLORS.brand : value >= 70 ? CHART_COLORS.warning : CHART_COLORS.critical }];
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart innerRadius="72%" outerRadius="100%" data={data} startAngle={210} endAngle={-30} cx="50%" cy="55%">
          <RadialBar background={{ fill: CHART_COLORS.surface }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[28px] font-bold tabular-nums text-ink leading-none">{value}%</span>
        {label && <span className="text-[11px] text-ink-quiet mt-1">{label}</span>}
      </div>
    </div>
  );
}
