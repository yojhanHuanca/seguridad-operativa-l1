import { useId } from 'react';
import { Bar, CartesianGrid, ComposedChart, LabelList, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ContingenciaMonthlyIndicator } from '../api';

const number = (value: number) => value.toLocaleString('es-PE', { maximumFractionDigits: 0 });
const rate = (value: number) => value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const monthLabel = (value: string) => new Date(`${value}-01T12:00:00Z`).toLocaleDateString('es-PE', { month: 'short', year: '2-digit', timeZone: 'UTC' });

export function MonthlyIndicatorChart({ data }: { data: ContingenciaMonthlyIndicator }) {
  const id = useId().replaceAll(':', '');
  const missing = data.items.filter(row => row.tasa === null);
  const highestRate = Math.max(0, ...data.items.map(row => row.tasa ?? 0));
  const rateStep = highestRate > 0 ? 10 ** Math.floor(Math.log10(highestRate)) : 1;
  const rateMaximum = highestRate > 0 ? Math.ceil(highestRate * 1.1 / rateStep) * rateStep : 1;
  return <>
    <div className="ctg-monthly-toolbar">
      <div className="ctg-monthly-legend" aria-label="Leyenda del gráfico">
        <span className="ctg-monthly-legend-rate"><i className="ctg-monthly-line" />Eventos por millón</span>
        <span><i style={{ background: '#19647e' }} />Accidente <b>B</b></span>
        <span><i style={{ background: '#ee762f' }} />No accidente <b>A</b></span>
      </div>
      <span className={'ctg-monthly-status' + (missing.length ? ' is-pending' : '')}>{missing.length ? `${data.items.length - missing.length}/${data.items.length} meses con tasa` : 'Afluencia completa'}</span>
    </div>
    <div className="ctg-monthly-axis-titles"><span>ATENCIONES TOTALES · A + B</span><span>EVENTOS POR MILLÓN DE PASAJEROS</span></div>
    <div className="ctg-monthly-scroll">
      <div className="ctg-monthly-chart" role="img" aria-label="Atenciones mensuales: columnas apiladas de no accidente A y accidente B, y línea verde de eventos por millón de pasajeros">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.items} margin={{ top: 38, right: 12, left: 0, bottom: 8 }} barCategoryGap="32%">
            <defs>
              <linearGradient id={`${id}-orange`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f38c48" /><stop offset="1" stopColor="#ee762f" /></linearGradient>
              <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#237791" /><stop offset="1" stopColor="#19647e" /></linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e4eae7" strokeDasharray="4 5" />
            <XAxis dataKey="mes" tickFormatter={monthLabel} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} tickMargin={12} tickLine={false} axisLine={{ stroke: '#dce5df' }} interval={0} height={44} />
            <YAxis yAxisId="events" allowDecimals={false} domain={[0, 'auto']} tick={{ fontSize: 11, fill: '#84938a' }} tickLine={false} axisLine={false} width={48} tickMargin={10} />
            <YAxis yAxisId="rate" orientation="right" domain={[0, rateMaximum]} tickFormatter={rate} tick={{ fontSize: 11, fill: '#247333' }} tickLine={false} axisLine={false} width={56} tickMargin={10} />
            <Tooltip cursor={{ fill: '#07845c', fillOpacity: .035 }} content={({ active, payload }) => {
              const row = payload?.[0]?.payload as ContingenciaMonthlyIndicator['items'][number] | undefined;
              if (!active || !row) return null;
              return <div className="ctg-monthly-tooltip"><h3>{monthLabel(row.mes)}</h3>
                <p><span>No accidente A</span><strong>{number(row.noAccidentes)}</strong></p>
                <p><span>Accidente B</span><strong>{number(row.accidentes)}</strong></p>
                <p><span>Total de atenciones</span><strong>{number(row.total)}</strong></p>
                <p><span>Afluencia</span><strong>{number(row.afluencia)}</strong></p>
                <p className="ctg-monthly-tooltip-rate"><span>Eventos por millón</span><strong>{row.tasa === null ? 'Pendiente' : rate(row.tasa)}</strong></p>
                <small>{row.diasRegistrados} de {row.diasEsperados} días con afluencia</small>
              </div>;
            }} />
            <Bar yAxisId="events" dataKey="noAccidentes" name="NO ACCIDENTE “A”" stackId="atenciones" fill={`url(#${id}-orange)`} maxBarSize={100} isAnimationActive={false}>
              <LabelList dataKey="noAccidentes" position="insideTop" offset={12} fill="#57331d" fontWeight={600} fontSize={12} formatter={value => Number(value) > 0 ? number(Number(value)) : ''} />
            </Bar>
            <Bar yAxisId="events" dataKey="accidentes" name="ACCIDENTE “B”" stackId="atenciones" fill={`url(#${id}-blue)`} radius={[6, 6, 0, 0]} maxBarSize={100} isAnimationActive={false}>
              <LabelList dataKey="accidentes" position="center" fill="#fff" stroke="#19647e" strokeWidth={3} paintOrder="stroke" fontWeight={600} fontSize={12} formatter={value => Number(value) > 0 ? number(Number(value)) : ''} />
            </Bar>
            <Line yAxisId="rate" dataKey="tasa" name="Eventos por millón" type="linear" stroke="#247333" strokeWidth={3} connectNulls={false} dot={{ r: 4, fill: '#fff', stroke: '#247333', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#247333', stroke: '#e0f0e5', strokeWidth: 4 }} isAnimationActive={false}>
              <LabelList dataKey="tasa" position="top" offset={25} fill="#247333" stroke="#fff" strokeWidth={4} paintOrder="stroke" fontWeight={650} fontSize={12} formatter={value => typeof value === 'number' ? rate(value) : ''} />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  </>;
}
