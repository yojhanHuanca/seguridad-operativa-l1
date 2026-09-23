import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, CalendarDays, Clock3, Download, Filter, Info, MapPin, PieChart, RefreshCcw, Timer, TrendingUp, X } from 'lucide-react';
import { ContingenciaShell } from '@/components/layout/ContingenciaShell';
import { LoadingState } from '@/components/feedback/LoadingState';
import { contingenciasApi } from '@/features/contingencias/api';
import type { ContingenciaEvento } from '@/features/contingencias/types';
import type { DatoOperativo } from '@/features/datos-operativos/hooks/useDatosOperativos';
import { api, type ApiEnvelope } from '@/lib/api';
import { countBy, dayKey, distribution, eventTimes, formatMetric as fmt, heatmap, monthKey, percentChange, periodFor, summarize } from '@/features/contingencias/analytics';
import { ChartPanel, Evolution, HourHeatmap, PlaceDotplot, ResponseBoxplot, Sparkline, TypeTreemap } from '@/features/contingencias/components/AnalyticsCharts';
import './indicadores.css';

type OperationMetric = 'qty_pasajeros' | 'qty_carreras' | 'km_comercial';
const metricNames: Record<OperationMetric, string> = { qty_pasajeros: 'Pasajeros', qty_carreras: 'Carreras', km_comercial: 'Km comerciales' };
const kpis = [
  { label: 'Eventos registrados', icon: Activity, suffix: '' },
  { label: 'Atención acumulada', icon: Clock3, suffix: ' h' },
  { label: 'Respuesta mediana', icon: Timer, suffix: ' min' },
  { label: 'Lugares con eventos', icon: MapPin, suffix: '' },
];
async function loadEvents(desde: string, hasta: string) {
  const rows: ContingenciaEvento[] = [];
  for (let page = 1; ; page++) {
    const result = await contingenciasApi.list({ desde, hasta, page, limit: 100 });
    rows.push(...result.items);
    if (rows.length >= result.total || !result.items.length) return rows;
  }
}

async function loadOperations(desde: string, hasta: string) {
  const rows: DatoOperativo[] = [];
  for (let page = 1; ; page++) {
    const { data } = await api.get<ApiEnvelope<{ items: DatoOperativo[]; total: number }>>("/datos-operativos", {
      params: { desde, hasta, page, limit: 100 },
    });
    if (!data.data) throw new Error("No se pudieron cargar los datos operativos");
    rows.push(...data.data.items);
    if (rows.length >= data.data.total || !data.data.items.length) return rows;
  }
}

export function Indicadores() {
  const [month, setMonth] = useState(() => monthKey(new Date()));
  const [station, setStation] = useState('');
  const [tipo, setTipo] = useState('');
  const [view, setView] = useState<'eventos' | 'operacion'>('eventos');
  const [metric, setMetric] = useState<OperationMetric>('qty_pasajeros');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const reduce = useReducedMotion();
  const period = periodFor(month);
  const eventsQuery = useQuery({
    queryKey: ['contingencias', 'estadisticas', period.previousStart, period.end],
    queryFn: () => loadEvents(period.previousStart, period.end),
    staleTime: 60_000,
  });
  const opsQuery = useQuery({
    queryKey: ['datos-operativos', 'estadisticas', period.start, period.end],
    queryFn: () => loadOperations(period.start, period.end),
    staleTime: 60_000,
  });

  const analytics = useMemo(() => {
    const all = eventsQuery.data ?? [];
    const matches = (e: ContingenciaEvento) => (!station || e.lugar_evento?.trim() === station) && (!tipo || e.tipo_evento?.trim() === tipo);
    const inPeriod = (e: ContingenciaEvento, start: string, end: string) => dayKey(e.fecha) >= start && dayKey(e.fecha) <= end;
    const currentAll = all.filter(e => inPeriod(e, period.start, period.end));
    const events = currentAll.filter(matches);
    const previous = all.filter(e => inPeriod(e, period.previousStart, period.previousEnd) && matches(e));
    const operations = (opsQuery.data ?? []).filter(row => dayKey(row.fecha) >= period.start && dayKey(row.fecha) <= period.end);
    const daily = Array.from({ length: period.days }, (_, index) => {
      const date = month + '-' + String(index + 1).padStart(2, '0');
      const records = events.filter(e => dayKey(e.fecha) === date);
      const ops = operations.filter(row => dayKey(row.fecha) === date);
      const values = ops.map(row => row[metric]).filter((value): value is number => value !== null && value !== undefined && Number.isFinite(Number(value)));
      return { date, eventos: records.length, operacion: values.length ? values.reduce((sum, value) => sum + Number(value), 0) : null, summary: summarize(records) };
    });
    return { currentAll, events, previous, operations, daily, summary: summarize(events), previousSummary: summarize(previous), times: eventTimes(events), types: countBy(events, 'tipo_evento'), places: countBy(events, 'lugar_evento') };
  }, [eventsQuery.data, opsQuery.data, month, metric, station, tipo, period.start, period.end, period.previousStart, period.previousEnd, period.days]);

  const refresh = () => { void eventsQuery.refetch(); void opsQuery.refetch(); };
  const busy = eventsQuery.isFetching || opsQuery.isFetching;
  const loading = eventsQuery.isPending;
  const error = eventsQuery.isError;
  const filtered = !!station || !!tipo;
  const exportSummary = () => {
    const hourly = heatmap(analytics.events);
    const rows = [
      ['Sección', 'Concepto', 'Valor'],
      ['Periodo', 'Desde', period.start], ['Periodo', 'Hasta', period.end],
      ['Filtro', 'Lugar', station || 'Todos'], ['Filtro', 'Tipo', tipo || 'Todos'],
      ['Resumen', 'Eventos', String(analytics.events.length)],
      ...kpis.slice(1).map((kpi, index) => ['Resumen', kpi.label, analytics.summary[index + 1] === null ? 'Sin dato' : String(analytics.summary[index + 1])]),
      ...analytics.types.map(row => ['Tipo', row.name, String(row.value)]),
      ...analytics.places.map(row => ['Lugar', row.name, String(row.value)]),
      ...hourly.cells.flatMap((row, day) => row.map((value, hour) => ['Concentración horaria', ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][day] + ' / ' + hour * 4 + '–' + (hour + 1) * 4 + ' h', String(value)])),
      ['Concentración horaria', 'Sin hora válida (excluidos)', String(hourly.excluded)],
      ...analytics.times.flatMap(row => {
        const stats = distribution(row.values);
        return [['Muestra de tiempos', row.name, String(row.values.length)], ...(['min', 'q1', 'median', 'q3', 'max'] as const).map(key => ['Tiempo (min)', row.name + ' / ' + key, stats ? String(stats[key]) : 'Sin dato'])];
      }),
      ...analytics.daily.map(row => ['Evolución diaria', row.date, String(row.eventos)]),
      ...analytics.daily.map(row => ['Operación global / ' + metricNames[metric], row.date, row.operacion === null ? 'Sin dato' : String(row.operacion)]),
    ];
    const csv = rows.map(row => row.map(value => '"' + value.replace(/^[=+@-]/, "'$&").replaceAll('"', '""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'contingencias-' + month + '.csv'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const chooseMonth = (value: string) => { if (/^\d{4}-\d{2}$/.test(value) && +value.slice(5) >= 1 && +value.slice(5) <= 12) { setMonth(value); setStation(''); setTipo(''); } };

  return (
    <ContingenciaShell>
      <div className="ctg-analytics">
        <header className="ctg-heading">
          <div><h1>Indicadores de contingencias</h1><p>Frecuencia, distribución y tiempos de atención</p></div>
          <div className="ctg-actions">
            <label className="ctg-month"><CalendarDays /><input type="month" aria-label="Periodo" value={month} onChange={e => chooseMonth(e.target.value)} /></label>
            <button className="ctg-button" aria-expanded={filtersOpen} aria-controls="ctg-filters" onClick={() => setFiltersOpen(!filtersOpen)}><Filter />Filtros{filtered ? ' · ' + [station, tipo].filter(Boolean).length : ''}</button>
            <button className="ctg-button" aria-label="Actualizar estadísticas" onClick={refresh} disabled={busy}><RefreshCcw className={busy ? 'animate-spin' : ''} /></button>
            <button className="ctg-button" onClick={exportSummary} disabled={loading || error || opsQuery.isPending || opsQuery.isError || busy || (!analytics.events.length && !analytics.operations.length)}><Download />Exportar</button>
          </div>
        </header>
        {(filtersOpen || filtered) && <div id="ctg-filters" className="ctg-filters">
          {filtersOpen && <>
            <label>Lugar<select aria-label="Lugar" value={station} onChange={e => setStation(e.target.value)}><option value="">Todos los lugares</option>{countBy(analytics.currentAll, 'lugar_evento').filter(row => row.name !== 'Sin dato').map(row => <option key={row.name}>{row.name}</option>)}</select></label>
            <label>Tipo<select aria-label="Tipo" value={tipo} onChange={e => setTipo(e.target.value)}><option value="">Todos los tipos</option>{countBy(analytics.currentAll, 'tipo_evento').filter(row => row.name !== 'Sin dato').map(row => <option key={row.name}>{row.name}</option>)}</select></label>
          </>}
          {!filtersOpen && <span className="text-xs">{[station, tipo].filter(Boolean).join(' · ')}</span>}
          <button className="ctg-button" onClick={() => { setStation(''); setTipo(''); }}><X />Restablecer</button>
        </div>}
        {loading ? <LoadingState label="Preparando indicadores de contingencias" /> : error ? <div className="ctg-error" role="alert">No se pudieron cargar las contingencias. <button className="ctg-button" onClick={refresh}>Reintentar</button></div> : <>
          <div className="ctg-kpis">
            {kpis.map((kpi, index) => {
              const value = analytics.summary[index];
              const change = period.comparable && analytics.previous.length ? percentChange(value, analytics.previousSummary[index]) : null;
              return <motion.div key={kpi.label} className="ctg-kpi" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: index * .05 }}>
                <div className="ctg-kpi-title"><kpi.icon />{kpi.label}</div>
                <div className="ctg-kpi-main"><strong className="ctg-kpi-value">{value === null ? '—' : fmt(value) + kpi.suffix}</strong><Sparkline values={analytics.daily.map(row => row.summary[index])} label={'Serie diaria de ' + kpi.label} /></div>
                <div className="ctg-kpi-note">{change === null ? <span>Sin base comparable anterior</span> : <><strong>{change > 0 ? '↑ ' : change < 0 ? '↓ ' : ''}{fmt(Math.abs(change))}%</strong><span>vs. {period.previousLabel}{period.partial ? ' · mismo corte' : ''}</span></>}</div>
              </motion.div>;
            })}
          </div>
          <div className="ctg-top-grid">
            <ChartPanel title="Evolución diaria" subtitle={view === 'eventos' ? 'Número de eventos registrados por día.' : 'Volumen operativo de toda la línea.'} icon={<TrendingUp />}
              action={<div className="ctg-tabs" aria-label="Serie del gráfico"><button aria-pressed={view === 'eventos'} onClick={() => setView('eventos')}>Eventos</button><button aria-pressed={view === 'operacion'} onClick={() => setView('operacion')}>Operación</button></div>}>
              {view === 'operacion' && <div className="ctg-op-selector"><span>Datos operativos</span><select aria-label="Medida operativa" value={metric} onChange={e => setMetric(e.target.value as OperationMetric)}>{Object.entries(metricNames).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>}
              {view === 'operacion' && opsQuery.isPending ? <LoadingState label="Cargando operación" /> : view === 'operacion' && opsQuery.isError ? <div className="ctg-error" role="alert">No se pudo cargar la operación. <button className="ctg-button" onClick={() => void opsQuery.refetch()}>Reintentar</button></div> : <Evolution data={analytics.daily} dataKey={view} name={view === 'eventos' ? 'Eventos' : metricNames[metric]} integer={view === 'eventos' || metric !== 'km_comercial'} id={[month, station, tipo, view, metric].join('|')} />}
              <p className="ctg-chart-note text-center">{view === 'eventos' ? 'Día del mes · ' + (period.partial ? 'acumulado hasta ' + period.end : month) : 'Solo filtro de fechas. Los días sin datos no son cero; no representa pasajeros afectados.'}</p>
            </ChartPanel>
            <ChartPanel title="Concentración horaria" subtitle="Eventos por día de la semana y franja horaria." icon={<Clock3 />}><HourHeatmap key={[month, station, tipo].join('|')} events={analytics.events} /></ChartPanel>
          </div>
          <div className="ctg-bottom-grid">
            <ChartPanel title="Distribución por tipo" subtitle="Participación sobre el total de eventos." icon={<PieChart />}><TypeTreemap rows={analytics.types} total={analytics.events.length} onSelect={setTipo} /></ChartPanel>
            <ChartPanel title="Tiempos de respuesta" subtitle="Distribución de tiempos por etapa (minutos)." icon={<Timer />}><ResponseBoxplot rows={analytics.times} /></ChartPanel>
            <ChartPanel title="Eventos por lugar" subtitle="Los 5 lugares con mayor número de eventos." icon={<MapPin />}><PlaceDotplot rows={analytics.places} onSelect={setStation} /></ChartPanel>
          </div>
          <footer className="ctg-footer"><Info /><span>Los tiempos faltantes o con término anterior al inicio se excluyen; cero minutos sí cuenta. No se utilizan estados de cierre.<br />Atención acumulada: suma de tiempos válidos, no horas de interrupción. Comparaciones sobre registros disponibles{period.partial ? ', con igual corte de días cuando existe en el mes anterior' : ''}.</span></footer>
        </>}
      </div>
    </ContingenciaShell>
  );
}
