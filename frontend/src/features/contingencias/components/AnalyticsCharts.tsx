import { useId, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { distribution, formatMetric as fmt, heatmap } from '../analytics';
import type { ContingenciaEvento } from '../types';

const GREEN = '#07845c';
const palette = ['#096d51', '#359e91', '#a8c7b9', '#688f82', '#d5e4dc'];

export function ChartPanel({ title, subtitle, icon, action, children, className = '' }: {
  title: string; subtitle: string; icon: ReactNode; action?: ReactNode; children: ReactNode; className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section initial={reduce ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .35 }} className={'ctg-panel ' + className}>
      <header className="ctg-panel-heading">
        <span className="ctg-panel-icon">{icon}</span>
        <div className="min-w-0 flex-1"><h2>{title}</h2><p>{subtitle}</p></div>
        {action}
      </header>
      <div className="ctg-panel-body">{children}</div>
    </motion.section>
  );
}

export function EmptyChart({ message = 'Sin registros para esta selección' }: { message?: string }) {
  return <div className="ctg-empty">{message}</div>;
}

export function Sparkline({ values, label }: { values: (number | null)[]; label: string }) {
  const id = useId().replaceAll(':', '');
  const valid = values.filter((n): n is number => n !== null);
  if (!valid.length) return <span className="ctg-spark-empty">Sin tiempos</span>;
  const max = Math.max(1, ...valid), min = Math.min(0, ...valid);
  const segments: string[] = [];
  let segment = '';
  values.forEach((value, index) => {
    if (value === null) { if (segment) segments.push(segment); segment = ''; return; }
    const x = 2 + index / Math.max(1, values.length - 1) * 108;
    const y = 44 - (value - min) / (max - min) * 36;
    segment += (segment ? ' L' : 'M') + x + ',' + y;
  });
  if (segment) segments.push(segment);
  return <svg viewBox="0 0 112 50" className="ctg-spark" role="img" aria-label={label}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor={GREEN} stopOpacity=".12" /><stop offset="1" stopColor={GREEN} stopOpacity="0" /></linearGradient></defs>
    {segments.map((path, i) => <path key={i} d={path} fill="none" stroke={GREEN} strokeWidth="1.5" />)}
  </svg>;
}

export function Evolution({ data, dataKey, name, id, integer = false }: {
  data: { date: string; eventos: number; operacion: number | null }[];
  dataKey: 'eventos' | 'operacion'; name: string; id: string; integer?: boolean;
}) {
  const reduce = useReducedMotion();
  const gradient = useId().replaceAll(':', '');
  if (!data.some(row => row[dataKey] !== null && (dataKey === 'operacion' || row.eventos > 0))) return <EmptyChart />;
  return <div className="ctg-evolution" role="img" aria-label={'Evolución diaria de ' + name}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart key={id} data={data} margin={{ top: 14, right: 14, bottom: 8, left: -20 }}>
        <defs><linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1"><stop stopColor={GREEN} stopOpacity=".19" /><stop offset="1" stopColor={GREEN} stopOpacity=".015" /></linearGradient></defs>
        <CartesianGrid stroke="#edf1ef" />
        <XAxis dataKey="date" tickFormatter={value => String(value).slice(8)} axisLine={false} tickLine={false} minTickGap={12} tick={{ fontSize: 10, fill: '#738198' }} />
        <YAxis allowDecimals={!integer} axisLine={false} tickLine={false} tickFormatter={value => Intl.NumberFormat('es', { notation: 'compact' }).format(value)} tick={{ fontSize: 10, fill: '#738198' }} />
        <Tooltip contentStyle={{ background: '#076c4d', color: '#fff', border: 0, borderRadius: 6, fontSize: 12 }}
          itemStyle={{ color: '#fff' }} labelStyle={{ color: '#d2eee1' }}
          labelFormatter={value => String(value)} formatter={value => [typeof value === 'number' ? fmt(value) : 'Sin dato', name]} />
        <Area dataKey={dataKey} name={name} type="linear" stroke={GREEN} strokeWidth={1.8}
          fill={'url(#' + gradient + ')'} connectNulls={false} dot={{ r: 2.8, fill: GREEN, stroke: 'white', strokeWidth: 1 }}
          activeDot={{ r: 5, strokeWidth: 3, stroke: '#d0e9dc' }}
          isAnimationActive={!reduce} animationDuration={650} />
      </AreaChart>
    </ResponsiveContainer>
  </div>;
}

const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const hours = ['00–04', '04–08', '08–12', '12–16', '16–20', '20–24'];

export function HourHeatmap({ events }: { events: ContingenciaEvento[] }) {
  const { cells, max, excluded } = heatmap(events);
  const [detail, setDetail] = useState('');
  if (!max) return <EmptyChart message={events.length ? 'Sin horas de reporte válidas' : undefined} />;
  return <>
    <div className="ctg-heatmap" role="group" aria-label="Eventos por día de semana y franja horaria">
      {cells.map((row, day) => <div className="ctg-heat-row" key={day}>
        <span className="ctg-heat-day">{weekdays[day]}</span>
        {row.map((count, hour) => {
          const text = weekdays[day] + ' · ' + hours[hour] + ': ' + count + ' eventos';
          return <button key={hour} type="button" className="ctg-heat-cell" aria-label={text} title={text}
            style={{ background: count ? 'hsl(158 49% ' + (92 - count / max * 65) + '%)' : '#f1f5f2' }}
            onMouseEnter={() => setDetail(text)} onFocus={() => setDetail(text)} onClick={() => setDetail(text)} />;
        })}
      </div>)}
      <div className="ctg-heat-row ctg-heat-hours"><span />{hours.map(hour => <span key={hour}>{hour}</span>)}</div>
    </div>
    <div className="ctg-heat-legend"><span>0</span><div /><span>{max} eventos</span></div>
    <p className="ctg-chart-note ctg-heat-detail" aria-live="polite">{detail || 'Explora una celda para consultar su frecuencia.'}</p>
    {excluded > 0 && <p className="ctg-chart-note">{excluded} eventos sin hora válida, excluidos del mapa.</p>}
  </>;
}

type Count = { name: string; value: number };
type Tile = Count & { x: number; y: number; w: number; h: number; index: number };

// Binary treemap: every rectangle area is exactly proportional to its count.
function tiles(rows: (Count & { index: number })[], x = 0, y = 0, w = 100, h = 100): Tile[] {
  if (!rows.length) return [];
  if (rows.length === 1) return [{ ...rows[0], x, y, w, h }];
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  let pivot = 1, sum = rows[0].value;
  while (pivot < rows.length - 1 && sum + rows[pivot].value / 2 < total / 2) sum += rows[pivot++].value;
  const ratio = sum / total;
  return w >= h
    ? [...tiles(rows.slice(0, pivot), x, y, w * ratio, h), ...tiles(rows.slice(pivot), x + w * ratio, y, w * (1 - ratio), h)]
    : [...tiles(rows.slice(0, pivot), x, y, w, h * ratio), ...tiles(rows.slice(pivot), x, y + h * ratio, w, h * (1 - ratio))];
}

export function TypeTreemap({ rows, total, onSelect }: { rows: Count[]; total: number; onSelect: (value: string) => void }) {
  if (!total) return <EmptyChart />;
  const grouped = rows.length > 4 ? [...rows.slice(0, 4), { name: 'Otros tipos', value: rows.slice(4).reduce((sum, row) => sum + row.value, 0) }] : rows;
  const layout = tiles(grouped.map((row, index) => ({ ...row, index })));
  return <>
    <div className="ctg-treemap" aria-label="Distribución proporcional por tipo">
      {layout.map(tile => <button key={tile.index} className="ctg-tile"
        disabled={tile.name === 'Sin dato' || (rows.length > 4 && tile.index === 4)}
        onClick={() => onSelect(tile.name)}
        title={tile.name + ': ' + tile.value + ' eventos (' + fmt(tile.value / total * 100) + '%)'}
        style={{ left: tile.x + '%', top: tile.y + '%', width: tile.w + '%', height: tile.h + '%', background: palette[tile.index], color: tile.index === 2 || tile.index === 4 ? '#17352c' : '#fff' }}>
        {tile.w > 17 && tile.h > 15 && <><span>{tile.name}</span><strong>{fmt(tile.value / total * 100)}%</strong>{tile.h > 25 && <small>{tile.value} eventos</small>}</>}
      </button>)}
    </div>
    <details className="ctg-chart-details"><summary>Ver todos los tipos ({rows.length})</summary>
      {rows.map(row => <button key={row.name} disabled={row.name === 'Sin dato'} onClick={() => onSelect(row.name)}><span>{row.name}</span><strong>{row.value} · {fmt(row.value / total * 100)}%</strong></button>)}
    </details>
  </>;
}

export function ResponseBoxplot({ rows }: { rows: { name: string; values: number[] }[] }) {
  const stats = rows.map(row => ({ name: row.name, stats: distribution(row.values) }));
  const maximum = Math.max(1, ...stats.map(row => row.stats?.max ?? 0));
  const scaleMax = Math.max(5, Math.ceil(maximum / 5) * 5);
  const x = (value: number) => 126 + value / scaleMax * 272;
  const reduce = useReducedMotion();
  if (!stats.some(row => row.stats)) return <EmptyChart message="Sin tiempos válidos para calcular la distribución" />;
  return <>
    <div className="ctg-box-legend"><i />Mediana <span />Rango intercuartílico</div>
    <svg viewBox="0 0 430 255" className="ctg-boxplot" role="img" aria-label="Distribución de tiempos: mínimo, cuartiles, mediana y máximo">
      {Array.from({ length: 6 }, (_, index) => {
        const value = scaleMax * index / 5;
        return <g key={index}><line x1={x(value)} x2={x(value)} y1="35" y2="218" stroke="#edf1f0" /><text x={x(value)} y="235" textAnchor="middle" fill="#738198" fontSize="10">{fmt(value)}</text></g>;
      })}
      {stats.map((row, index) => {
        const y = 62 + index * 66, stat = row.stats;
        return <g key={row.name}><text x="3" y={y + 3} fontSize="10.5" fill="#233449">{row.name}</text>
          {stat ? <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: index * .08 }}>
            <title>{row.name}: mínimo {fmt(stat.min)}, Q1 {fmt(stat.q1)}, mediana {fmt(stat.median)}, Q3 {fmt(stat.q3)}, máximo {fmt(stat.max)} minutos; {stat.n} registros</title>
            <line x1={x(stat.min)} x2={x(stat.max)} y1={y} y2={y} stroke="#7c9aa5" />
            {[stat.min, stat.max].map((value, i) => <line key={i} x1={x(value)} x2={x(value)} y1={y - 8} y2={y + 8} stroke="#7c9aa5" />)}
            <rect x={x(stat.q1)} y={y - 12} width={Math.max(1, x(stat.q3) - x(stat.q1))} height="24" fill="#b9ddcf" />
            <line x1={x(stat.median)} x2={x(stat.median)} y1={y - 12} y2={y + 12} stroke={GREEN} strokeWidth="2" />
            <circle cx={x(stat.median)} cy={y} r="3" fill={GREEN} />
            <text x={x(stat.median)} y={y - 20} textAnchor="middle" fontSize="10" fill="#233449">{fmt(stat.median)} min</text>
          </motion.g> : <text x="250" y={y + 3} textAnchor="middle" fontSize="10" fill="#738198">Sin datos</text>}
        </g>;
      })}
      <text x="265" y="253" textAnchor="middle" fontSize="10" fill="#738198">Minutos</text>
    </svg>
    <p className="ctg-chart-note">Extremos: mínimo y máximo. La caja contiene el 50% central de los tiempos.</p>
    <details className="ctg-chart-details"><summary>Muestras y valores exactos</summary>{stats.map(row => <p key={row.name}>{row.name}: {row.stats ? row.stats.n + ' registros · mediana ' + fmt(row.stats.median) + ' min · Q1 ' + fmt(row.stats.q1) + ' · Q3 ' + fmt(row.stats.q3) : 'Sin datos'}</p>)}</details>
  </>;
}

export function PlaceDotplot({ rows, onSelect }: { rows: Count[]; onSelect: (value: string) => void }) {
  const shown = rows.slice(0, 5);
  const max = Math.max(4, Math.ceil(Math.max(0, ...shown.map(row => row.value)) / 4) * 4);
  if (!shown.length) return <EmptyChart />;
  return <>
    <div className="ctg-dotplot">
      {shown.map(row => <button className="ctg-dot-row" key={row.name} onClick={() => onSelect(row.name)} disabled={row.name === 'Sin dato'} title={row.name + ': ' + row.value + ' eventos'}>
        <span className="ctg-dot-name">{row.name}</span><span className="ctg-dot-track"><span className="ctg-dot-stem" style={{ width: row.value / max * 86 + '%' }}><i /><strong>{row.value}</strong></span></span>
      </button>)}
      <div className="ctg-dot-axis"><span /> <div>{[0, .25, .5, .75, 1].map(value => <span key={value}>{fmt(max * value)}</span>)}</div></div>
    </div>
    <p className="ctg-chart-note text-center">Número de eventos · selecciona un lugar para filtrar</p>
  </>;
}
