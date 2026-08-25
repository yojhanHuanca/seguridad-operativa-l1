import { useState, type ReactNode } from "react";
import { AlertTriangle, CalendarDays, ChevronLeft, ChevronRight, Gauge, Printer, ShieldAlert, TrainFront, TriangleAlert } from "lucide-react";
import { MonitoristaShell } from "@/components/layout/MonitoristaShell";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/design-system/primitives/Button";
import { SkeletonChart } from "@/design-system/primitives/Skeleton";
import { IndiceComposedChart } from "@/design-system/charts/Charts";
import { useIndicadoresEventos, type ConteoMesAnual, type IndicadoresEventos, type IndiceEventos } from "@/features/eventos/hooks/useIndicadoresEventos";
import { useIndicadoresPrint } from "@/features/indicadores/hooks/useIndicadoresPrint";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MESES_CORTO = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const DETALLE_INTERNOS = ["Tren no abre puertas", "Tren no para en estación", "Parada incorrecta"];
const DETALLE_EXTERNOS = ["Caída en estación", "Impacto físico", "Atasco en puerta de coches"];

export function Indicadores() {
  const hoy = new Date();
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth() + 1);
  const { data, isLoading } = useIndicadoresEventos(anio, mes);
  const { printActive, printReport } = useIndicadoresPrint(`Indicadores de Eventos Operacionales ${MESES[mes - 1]} ${anio}`);

  const total = data?.totalEventos;
  const totalFactoresMes = (data?.erroresOperativos.mes ?? 0) + (data?.accidentabilidad.mes ?? 0);
  const pct = (parte: ConteoMesAnual | undefined) =>
    totalFactoresMes > 0 && parte ? formatPercent(Math.round((parte.mes / totalFactoresMes) * 1000) / 10) : "—";

  return (
    <MonitoristaShell>
      <div data-report-export-root={printActive ? "active" : "idle"}>
        {printActive && data && (
          <EventosPrintDocument data={data} periodo={`${MESES[mes - 1]} ${anio}`} anio={anio} generatedAt={new Date()} />
        )}

        <div data-report-export-screen>
      {/* Sin título propio: el shell ya muestra "Indicadores" arriba (viene del
          breadcrumb de MonitoristaShell) — repetirlo acá quedaba dos veces en
          la misma pantalla. Solo el filtro y la acción de descarga. */}
      <div className="mb-5 flex flex-wrap items-center justify-end gap-3">
          <MesSelector mes={mes} anio={anio} onChangeMes={setMes} onChangeAnio={setAnio} />
          <Button variant="outline" size="sm" onClick={printReport} disabled={!data}>
            <Printer className="h-4 w-4" /> Descargar PDF
          </Button>
      </div>

      {data && data.faltanDatos.length > 0 && (
        <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-warning/20 bg-warning-soft px-4 py-3">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning-ink" />
          <p className="text-[12.5px] leading-relaxed text-warning-ink">
            Faltan cargar {data.faltanDatos.join(" y ")} por mes. Los conteos de eventos son correctos, pero los índices no se pueden calcular
            sin esos valores: el índice es la cantidad de eventos dividida por esa exposición, por millón.
          </p>
        </div>
      )}

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,410px)_1fr]">
        <div className="grid gap-4">
          <div className="justify-self-center rounded-md bg-info-soft px-6 py-1.5 text-[15px] font-bold uppercase tracking-wide text-info-ink">
            {MESES[mes - 1]} {anio}
          </div>

          <Bloque icon={<TrainFront className="h-4 w-4" />} titulo="Total de eventos operativos">
            <Cifra mes={total?.mes} anual={total?.anual} isLoading={isLoading} grande />
          </Bloque>

          {/* Sin eventos en el mes no hay porcentaje que repartir: la frase se
              cambia por una explicación, en vez de quedar "El — de los eventos
              se asocian... y el — a factores externos". */}
          <p className="px-1 text-[12px] leading-relaxed text-ink-soft">
            {totalFactoresMes > 0 ? (
              <>
                El <Resaltado>{pct(data?.erroresOperativos)}</Resaltado> de los eventos se asocian a factores internos y el{" "}
                <Resaltado>{pct(data?.accidentabilidad)}</Resaltado> a factores externos.
              </>
            ) : (
              <span className="text-ink-quiet">
                Todavía no hay eventos de factores internos ni externos en {MESES[mes - 1]} {anio}.
              </span>
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Bloque icon={<Gauge className="h-4 w-4" />} titulo="Factores internos">
              <p className="text-[12.5px] font-bold text-brand-700">Errores operativos</p>
              <Lista items={DETALLE_INTERNOS} />
              <Cifra mes={data?.erroresOperativos.mes} anual={data?.erroresOperativos.anual} isLoading={isLoading} />
            </Bloque>

            <Bloque icon={<ShieldAlert className="h-4 w-4" />} titulo="Factores externos" tono="info">
              <p className="text-[12.5px] font-bold text-info-ink">Accidentabilidad (pasajeros)</p>
              <Lista items={DETALLE_EXTERNOS} />
              <Cifra mes={data?.accidentabilidad.mes} anual={data?.accidentabilidad.anual} isLoading={isLoading} sufijo="Total DJ anual" />
              <p className="mt-1.5 rounded-md bg-surface px-2 py-1.5 text-center text-[10.5px] leading-snug text-ink-quiet">
                Eventos sin DJ: <strong className="text-ink">{data?.accidentabilidadSinDj.mes ?? 0}</strong> mensual y{" "}
                <strong className="text-ink">{data?.accidentabilidadSinDj.anual ?? 0}</strong> anual.
              </p>
            </Bloque>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Bloque icon={<Gauge className="h-4 w-4" />} titulo="Índice de errores operativos">
              <ValorIndice indice={data?.indiceErrores} />
            </Bloque>
            <Bloque icon={<ShieldAlert className="h-4 w-4" />} titulo="Índice de accidentabilidad" tono="info">
              <ValorIndice indice={data?.indiceAccidentabilidad} />
            </Bloque>
          </div>

          <Bloque icon={<AlertTriangle className="h-4 w-4" />} titulo="Eventos críticos en la vía" tono="critical">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              {/* El desglose es del mes, no del año: en el panel del cliente
                  los valores de la lista suman el `#MES` de la derecha. */}
              <div>
                {(data?.criticos.detalle ?? []).map((item) => (
                  <div
                    key={item.etiqueta}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-sm px-1 py-[3px] text-[11.5px]",
                      item.mes > 0 ? "bg-critical-soft font-medium text-ink" : "text-ink-quiet",
                    )}
                  >
                    <span className="truncate">{item.etiqueta}</span>
                    {item.mes > 0 && <span className="shrink-0 text-[11px] font-bold tabular-nums text-critical-ink">{item.mes}</span>}
                  </div>
                ))}
              </div>
              <Cifra mes={data?.criticos.mes} anual={data?.criticos.anual} isLoading={isLoading} />
            </div>
          </Bloque>
        </div>

        <div className="grid gap-5">
          <GraficoIndice
            titulo={`Índice de errores operativos ${data?.indiceErrores.unidad ?? ""}`}
            indice={data?.indiceErrores}
            etiquetaBarras="#Errores Operativos"
            etiquetaUmbral={`Umbral tolerable (1σ) ${anio - 1}`}
            anioUmbral={anio - 1}
            isLoading={isLoading}
          />
          <GraficoIndice
            titulo={`Índice de accidentabilidad ${data?.indiceAccidentabilidad.unidad ?? ""}`}
            indice={data?.indiceAccidentabilidad}
            etiquetaBarras="Total Accidentabilidad"
            etiquetaUmbral={`Umbral tolerable (1σ) ${anio - 1}`}
            anioUmbral={anio - 1}
            isLoading={isLoading}
          />
        </div>
      </div>
        </div>
      </div>
    </MonitoristaShell>
  );
}

/**
 * Documento para `window.print()` — mismo patrón que el de KPIs
 * (`useIndicadoresPrint` + `data-report-export="kpis"`): hoja A4 apaisada,
 * gráficos sin animación porque `window.print()` congela el rAF y los deja
 * clavados en el frame 0, y todo fuera de pantalla mientras se monta para que
 * los gráficos midan su ancho real antes de imprimir.
 *
 * Reutiliza los mismos bloques de la pantalla (misma lógica, mismos
 * componentes) en vez de reconstruir el layout aparte, así que un cambio en
 * los datos nunca deja a la pantalla y al PDF diciendo cosas distintas.
 */
function EventosPrintDocument({
  data,
  periodo,
  anio,
  generatedAt,
}: {
  data: IndicadoresEventos;
  periodo: string;
  anio: number;
  generatedAt: Date;
}) {
  const total = data.totalEventos;
  const totalFactoresMes = data.erroresOperativos.mes + data.accidentabilidad.mes;
  const pct = (parte: ConteoMesAnual) => (totalFactoresMes > 0 ? formatPercent(Math.round((parte.mes / totalFactoresMes) * 1000) / 10) : "—");

  return (
    <section data-report-export="kpis" className="mx-auto bg-white px-2 py-2 text-ink">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size={30} withWordmark={false} />
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-800">SIGMA L1 · Monitoreo</p>
            <h1 className="mt-0.5 text-[15px] font-bold leading-tight text-ink">Indicadores | Eventos operacionales</h1>
            <p className="text-[10px] text-ink-quiet">
              Línea 1 del Metro de Lima · {total.mes} eventos · {periodo}
            </p>
          </div>
        </div>
        <p className="text-[10px] text-ink-quiet">Generado {formatDateTime(generatedAt)}</p>
      </header>
      <div className="mt-2 h-[2px] w-full bg-brand-700" />

      <div className="mt-2 grid grid-cols-[minmax(0,280px)_1fr] items-start gap-3">
        <div className="grid gap-2">
          <Bloque icon={<TrainFront className="h-3.5 w-3.5" />} titulo="Total de eventos operativos">
            <Cifra mes={total.mes} anual={total.anual} isLoading={false} grande />
          </Bloque>

          <p className="px-1 text-[10.5px] leading-snug text-ink-soft">
            {totalFactoresMes > 0 ? (
              <>
                El <Resaltado>{pct(data.erroresOperativos)}</Resaltado> de los eventos se asocian a factores internos y el{" "}
                <Resaltado>{pct(data.accidentabilidad)}</Resaltado> a factores externos.
              </>
            ) : (
              <span className="text-ink-quiet">Sin eventos de factores internos ni externos en {periodo}.</span>
            )}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <Bloque icon={<Gauge className="h-3.5 w-3.5" />} titulo="Factores internos">
              <p className="text-[10.5px] font-bold text-brand-700">Errores operativos</p>
              <Cifra mes={data.erroresOperativos.mes} anual={data.erroresOperativos.anual} isLoading={false} />
            </Bloque>
            <Bloque icon={<ShieldAlert className="h-3.5 w-3.5" />} titulo="Factores externos" tono="info">
              <p className="text-[10.5px] font-bold text-info-ink">Accidentabilidad (pasajeros)</p>
              <Cifra mes={data.accidentabilidad.mes} anual={data.accidentabilidad.anual} isLoading={false} sufijo="Total DJ anual" />
            </Bloque>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Bloque icon={<Gauge className="h-3.5 w-3.5" />} titulo="Índice de errores operativos">
              <ValorIndice indice={data.indiceErrores} />
            </Bloque>
            <Bloque icon={<ShieldAlert className="h-3.5 w-3.5" />} titulo="Índice de accidentabilidad" tono="info">
              <ValorIndice indice={data.indiceAccidentabilidad} />
            </Bloque>
          </div>

          <Bloque icon={<AlertTriangle className="h-3.5 w-3.5" />} titulo="Eventos críticos en la vía" tono="critical">
            <div className="grid grid-cols-[1fr_auto] items-center gap-3">
              <div>
                {data.criticos.detalle.map((item) => (
                  <div
                    key={item.etiqueta}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-sm px-1 py-[1.5px] text-[10px]",
                      item.mes > 0 ? "bg-critical-soft font-medium text-ink" : "text-ink-quiet",
                    )}
                  >
                    <span className="truncate">{item.etiqueta}</span>
                    {item.mes > 0 && <span className="shrink-0 font-bold tabular-nums text-critical-ink">{item.mes}</span>}
                  </div>
                ))}
              </div>
              <Cifra mes={data.criticos.mes} anual={data.criticos.anual} isLoading={false} />
            </div>
          </Bloque>
        </div>

        <div className="grid gap-2">
          <GraficoIndice
            titulo={`Índice de errores operativos ${data.indiceErrores.unidad}`}
            indice={data.indiceErrores}
            etiquetaBarras="#Errores Operativos"
            etiquetaUmbral={`Umbral tolerable (1σ) ${anio - 1}`}
            anioUmbral={anio - 1}
            isLoading={false}
            animated={false}
            height={190}
          />
          <GraficoIndice
            titulo={`Índice de accidentabilidad ${data.indiceAccidentabilidad.unidad}`}
            indice={data.indiceAccidentabilidad}
            etiquetaBarras="Total Accidentabilidad"
            etiquetaUmbral={`Umbral tolerable (1σ) ${anio - 1}`}
            anioUmbral={anio - 1}
            isLoading={false}
            animated={false}
            height={190}
          />
        </div>
      </div>

      <footer className="mt-2 border-t border-line pt-1.5 text-[9px] text-ink-quiet">
        Documento generado por SIGMA L1 · Monitoreo · {formatDateTime(generatedAt)}
      </footer>
    </section>
  );
}

function Bloque({
  icon,
  titulo,
  tono = "brand",
  children,
}: {
  icon?: ReactNode;
  titulo: string;
  tono?: "brand" | "info" | "critical";
  children: ReactNode;
}) {
  const fondo = tono === "info" ? "bg-info" : tono === "critical" ? "bg-critical" : "bg-brand-700";
  // Sin tarjeta blanca ni borde ni sombra: la franja de color va directo sobre
  // el fondo de la página, con el contenido debajo — así está en el panel del
  // cliente, los bloques flotan en vez de ir "encajonados".
  return (
    <div>
      <div className={cn("flex items-center justify-center gap-1.5 rounded-t-md px-3 py-1.5", fondo)}>
        {icon && <span className="text-white/85">{icon}</span>}
        <p className="text-center text-[11px] font-bold uppercase tracking-wide text-white">{titulo}</p>
      </div>
      <div className="px-1 pb-1 pt-2.5">{children}</div>
    </div>
  );
}

/** Porcentaje resaltado dentro de la frase. Los dos van del mismo color, como en el panel del cliente. */
function Resaltado({ children }: { children: ReactNode }) {
  return <strong className="rounded bg-info-soft px-1 font-bold text-info-ink">{children}</strong>;
}

function Cifra({
  mes,
  anual,
  isLoading,
  grande,
  sufijo = "Total anual",
}: {
  mes?: number;
  anual?: number;
  isLoading: boolean;
  grande?: boolean;
  sufijo?: string;
}) {
  return (
    <div className="mt-1 flex flex-col items-center text-center">
      <p className={cn("flex items-baseline gap-2 font-display font-bold leading-none tabular-nums text-ink", grande ? "text-[38px]" : "text-[27px]")}>
        <span>{isLoading ? "—" : (mes ?? 0)}</span>
        <span className={cn("font-normal text-ink-faint", grande ? "text-[30px]" : "text-[22px]")}>/</span>
        <span>{isLoading ? "—" : (anual ?? 0)}</span>
      </p>
      <p className="mt-1.5 flex items-baseline gap-3 text-[9.5px] font-semibold uppercase tracking-wide text-ink-faint">
        <span>#Mes</span>
        <span>#{sufijo}</span>
      </p>
    </div>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-0.5">
      {items.map((item) => (
        <li key={item} className="text-[11px] leading-snug text-ink-quiet">
          - {item}.
        </li>
      ))}
    </ul>
  );
}

function ValorIndice({ indice }: { indice: IndiceEventos | undefined }) {
  return (
    <div className="text-center">
      <p className="font-display text-[33px] font-bold leading-none tabular-nums text-brand-600">{indice?.valor ?? "—"}</p>
      <p className="mt-1.5 text-[10.5px] text-ink-quiet">{indice?.unidad}</p>
    </div>
  );
}

function GraficoIndice({
  titulo,
  indice,
  etiquetaBarras,
  etiquetaUmbral,
  anioUmbral,
  isLoading,
  animated = true,
  height = 300,
}: {
  titulo: string;
  indice: IndiceEventos | undefined;
  etiquetaBarras: string;
  etiquetaUmbral: string;
  /** Año del que sale el umbral: el anterior al filtrado. */
  anioUmbral: number;
  isLoading: boolean;
  /** El PDF lo apaga: `window.print()` congela el rAF y la animación de recharts
   *  queda en el frame 0 — barras y línea sin dibujar. */
  animated?: boolean;
  height?: number;
}) {
  return (
    <div className="rounded-lg bg-surface p-3">
      <div className="relative flex min-h-7 items-center justify-center">
        <p className="text-center text-[14px] font-bold text-ink sm:px-24">{titulo}</p>
        {indice?.tolerable != null && (
          <span className="absolute right-0 rounded px-2.5 py-1 text-[11.5px] font-bold text-white" style={{ background: "#b8860f" }}>
            Tolerable {anioUmbral} &lt; {indice.tolerable}
          </span>
        )}
      </div>
      <div className="mt-2">
        {isLoading ? (
          <SkeletonChart height={height} />
        ) : (
          <IndiceComposedChart
            data={indice?.serie ?? []}
            tolerable={indice?.tolerable ?? null}
            etiquetaBarras={etiquetaBarras}
            etiquetaUmbral={etiquetaUmbral}
            height={height}
            animated={animated}
          />
        )}
      </div>
    </div>
  );
}

function MesSelector({
  mes,
  anio,
  onChangeMes,
  onChangeAnio,
}: {
  mes: number;
  anio: number;
  onChangeMes: (mes: number) => void;
  onChangeAnio: (anio: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(anio);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setViewYear(anio);
          setOpen((current) => !current);
        }}
        className="inline-flex h-9 min-w-[168px] items-center justify-between gap-3 rounded-lg border border-line-strong bg-white px-3 text-[12.5px] font-medium text-ink transition-colors hover:border-brand-300 focus-visible:border-brand-600 focus-visible:outline-none"
      >
        <span>
          {MESES_CORTO[mes - 1]} {anio}
        </span>
        <CalendarDays className="h-4 w-4 text-ink-quiet" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[292px] rounded-lg border border-line-strong bg-white p-3 shadow-[var(--shadow-pop)]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewYear((y) => y - 1)}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink"
              aria-label="Año anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[13px] font-bold text-ink">{viewYear}</span>
            <button
              type="button"
              onClick={() => setViewYear((y) => y + 1)}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink"
              aria-label="Año siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {MESES_CORTO.map((nombre, i) => {
              const active = viewYear === anio && mes === i + 1;
              return (
                <button
                  key={nombre}
                  type="button"
                  onClick={() => {
                    onChangeAnio(viewYear);
                    onChangeMes(i + 1);
                    setOpen(false);
                  }}
                  className={cn(
                    "h-9 rounded-lg text-[12.5px] font-semibold transition-colors",
                    active ? "bg-brand-700 text-white" : "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
                  )}
                >
                  {nombre}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function formatPercent(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
}
