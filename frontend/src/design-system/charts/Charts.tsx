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
  Line,
  LineChart,
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

/**
 * Props de animación para las series de recharts.
 *
 * recharts anima por defecto pero ignora `prefers-reduced-motion` — no consulta
 * el media query en ningún momento —, así que hay que apagarla a mano para
 * quien pidió menos movimiento. La duración se acerca a la de las variantes de
 * framer-motion para que el dibujado del gráfico y la entrada de la tarjeta que
 * lo contiene no vayan a ritmos distintos.
 */
function useSeriesAnimation() {
  const reduce = useReducedMotion();
  return {
    isAnimationActive: !reduce,
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
        <YAxis tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} width={32} />
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
}: {
  data: { label: string; value: number; color?: string }[];
  dataKey?: string;
  xKey?: string;
  color?: string;
  height?: number;
  barSize?: number;
}) {
  const anim = useSeriesAnimation();
  // Cada punto puede traer su propio `color` (p. ej. Cerrado en verde, En
  // Proceso en amarillo); si ninguno lo trae, todas las barras usan `color`.
  const hasPerBarColor = data.some((d) => d.color);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap={18}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.surface} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} dy={6} />
        <YAxis tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} width={36} allowDecimals={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={labelStyle}
          itemStyle={itemStyle}
          cursor={{ fill: CHART_COLORS.surface, fillOpacity: 0.4 }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} barSize={barSize} {...anim}>
          {hasPerBarColor && data.map((d, i) => <Cell key={i} fill={d.color ?? color} />)}
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

export function DonutChart({
  data,
  height = 220,
  innerRadius = 60,
  outerRadius = 90,
}: {
  data: { name: string; value: number; color: string }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}) {
  const anim = useSeriesAnimation();
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
          {...anim}
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
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
}: {
  data: { name: string; value: number; color?: string }[];
  height?: number;
}) {
  const anim = useSeriesAnimation();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 4 }} barCategoryGap={10}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.surface} horizontal={false} />
        <XAxis type="number" tick={{ fill: CHART_COLORS.inkFaint, fontSize: 11 }} tickLine={false} axisLine={false} />
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
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14} {...anim}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color ?? CHART_COLORS.brand} />
          ))}
        </Bar>
      </BarChart>
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
