import prisma from "../../lib/prisma.js";

/**
 * Indicadores de eventos operacionales del panel de Monitoreo.
 *
 * Traduce las medidas DAX del Power BI que hoy usa Seguridad Operacional. Los
 * nombres de tipo de incidente, ubicación y causa se comparan tal cual están en
 * el catálogo — se verificó que coinciden letra por letra con los del archivo
 * del cliente, tildes incluidas.
 *
 * Las listas de abajo son la parte que cambia si el cliente ajusta su criterio,
 * así que están juntas y con el nombre de la medida DAX de la que salen.
 */

/** `#Errores_Operativos_Tulsa`. Sin filtro de causa, igual que el original. */
const TIPOS_ERROR_OPERATIVO = ["NO ABRE PUERTAS", "NO PARA EN ESTACIÓN", "PARADA INCORRECTA"];

/** `#Accidentabilidad_Tulsa_Mensual_Externo_total_1`, que sí filtra por causa. */
const TIPOS_ACCIDENTABILIDAD = ["ATRAPAMIENTO-DJ", "IMPACTO FÍSICO-DJ", "CAIDA EN ESTACIÓN-DJ"];

/**
 * Los mismos tres tipos pero sin el sufijo `-DJ`, que en el panel del cliente
 * se muestran aparte como "Eventos sin DJ". Son catálogos distintos, no una
 * variante de escritura: el índice de accidentabilidad usa solo los `-DJ`.
 */
const TIPOS_ACCIDENTABILIDAD_SIN_DJ = ["ATRAPAMIENTO", "IMPACTO FÍSICO", "CAIDA EN ESTACIÓN"];
const CAUSA_EXTERNA = "FACTOR EXTERNO";

/** Ubicaciones que acotan los eventos críticos, comunes a todas sus medidas. */
const UBICACIONES_CRITICAS = ["ESTACIÓN", "PASARELA", "INTERESTACIONAL", "PATIO"];

/**
 * `Catalogo_EventosCriticos` + `Criticos_Semanal_porItem`: cada renglón de la
 * lista y los tipos de incidente que suma.
 *
 * "COLISION MR - MR" y "COLISION MR" están en el DAX del cliente pero no en el
 * catálogo (solo existe "COLISION MR -OBSTÁCULO"), así que hoy no suman nada ni
 * allá ni acá. Se dejan escritos para que se vea que no es un olvido: hay que
 * confirmar con el cliente si faltan en el catálogo o sobran en la fórmula.
 */
const EVENTOS_CRITICOS: { etiqueta: string; tipos: string[] }[] = [
  { etiqueta: "Atropello/ Embestido", tipos: ["ATROPELLO"] },
  { etiqueta: "Colisiones", tipos: ["COLISION MR -OBSTÁCULO", "COLISION MR - MR", "COLISION MR"] },
  { etiqueta: "Descarrilamientos", tipos: ["DESCARRILAMIENTO"] },
  { etiqueta: "Ingresos a la vía", tipos: ["INGRESO A LA VÍA"] },
  { etiqueta: "Intentos de suicidio", tipos: ["INTENTO DE SUICIDIO"] },
  { etiqueta: "Suicidios (Arrollamientos)", tipos: ["ARROLLAMIENTO"] },
  { etiqueta: "Talonamientos", tipos: ["TALONAMIENTO"] },
];

const TIPOS_CRITICOS = [...new Set(EVENTOS_CRITICOS.flatMap((item) => item.tipos))];

/** Nombres en `indicadores` de los divisores que alguien carga mes a mes. */
const INDICADOR_KM = "Km comercial";
const INDICADOR_PASAJEROS = "Afluencia de pasajeros";

export interface SerieMensual {
  key: string;
  label: string;
  /** Cantidad de eventos del mes: son las barras del gráfico. */
  eventos: number;
  /** Índice móvil de 12 meses terminado en ese mes, o `null` si falta el divisor. */
  indice: number | null;
}

export interface IndicadorEventos {
  mes: number;
  anual: number;
}

export interface IndicadoresEventosResponse {
  periodo: { anio: number; mes: number | null };
  totalEventos: IndicadorEventos;
  erroresOperativos: IndicadorEventos;
  accidentabilidad: IndicadorEventos;
  /** Los tipos sin sufijo `-DJ`: se informan aparte y no entran al índice. */
  accidentabilidadSinDj: IndicadorEventos;
  criticos: IndicadorEventos & { detalle: { etiqueta: string; mes: number; anual: number }[] };
  indiceErrores: { valor: number | null; tolerable: number | null; unidad: string; serie: SerieMensual[] };
  indiceAccidentabilidad: { valor: number | null; tolerable: number | null; unidad: string; serie: SerieMensual[] };
  /** Divisores que faltan cargar; la pantalla lo avisa en vez de mostrar cero. */
  faltanDatos: string[];
}

const MES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const mesKey = (anio: number, mes: number) => `${anio}-${String(mes).padStart(2, "0")}`;
const mesLabel = (anio: number, mes: number) => `${MES_CORTO[mes - 1]}-${String(anio).slice(2)}`;

/** Los doce meses que terminan en el mes indicado, del más viejo al más nuevo. */
function ventana12Meses(anio: number, mes: number): { anio: number; mes: number }[] {
  const out: { anio: number; mes: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(anio, mes - 1 - i, 1));
    out.push({ anio: d.getUTCFullYear(), mes: d.getUTCMonth() + 1 });
  }
  return out;
}

interface EventoPlano {
  anio: number;
  mes: number;
  tipo: string;
  ubicacion: string | null;
  causa: string | null;
}

/** Suma por mes de los eventos que cumplen el filtro, indexada por `anio-mes`. */
function contarPorMes(eventos: EventoPlano[], cumple: (e: EventoPlano) => boolean): Map<string, number> {
  const out = new Map<string, number>();
  for (const evento of eventos) {
    if (!cumple(evento)) continue;
    const key = mesKey(evento.anio, evento.mes);
    out.set(key, (out.get(key) ?? 0) + 1);
  }
  return out;
}

const sumaVentana = (porMes: Map<string, number>, ventana: { anio: number; mes: number }[]) =>
  ventana.reduce((total, { anio, mes }) => total + (porMes.get(mesKey(anio, mes)) ?? 0), 0);

/**
 * Serie de doce meses con el índice móvil, que es la línea verde del gráfico.
 *
 * El índice de un mes no es el de ese mes solo: es la suma de eventos de los
 * doce meses que terminan ahí, dividida por la exposición de esos mismos doce
 * meses (`Indice_..._Rolling12M`). Por eso la línea es suave aunque las barras
 * salten. Sin divisor cargado devuelve `null`, no cero: son cosas distintas.
 */
function construirSerie(
  eventosPorMes: Map<string, number>,
  divisorPorMes: Map<string, number>,
  anio: number,
  mes: number,
): SerieMensual[] {
  return ventana12Meses(anio, mes).map(({ anio: a, mes: m }) => {
    const ventana = ventana12Meses(a, m);
    const eventos12 = sumaVentana(eventosPorMes, ventana);
    const divisor12 = sumaVentana(divisorPorMes, ventana);
    return {
      key: mesKey(a, m),
      label: mesLabel(a, m),
      eventos: eventosPorMes.get(mesKey(a, m)) ?? 0,
      indice: divisor12 > 0 ? Math.round((eventos12 / divisor12) * 1_000_000 * 100) / 100 : null,
    };
  });
}

/** Valores mensuales de un indicador cargado a mano (km recorridos, pasajeros). */
async function divisorPorMes(nombreIndicador: string): Promise<Map<string, number>> {
  const indicador = await prisma.indicadores.findFirst({
    where: { nombre: nombreIndicador },
    select: { id_indicador: true },
  });
  const out = new Map<string, number>();
  if (!indicador) return out;

  const valores = await prisma.historial_indicadores.findMany({
    where: { id_indicador: indicador.id_indicador },
    select: { fecha: true, valor: true },
  });
  for (const { fecha, valor } of valores) {
    if (!fecha || valor == null) continue;
    const key = mesKey(fecha.getUTCFullYear(), fecha.getUTCMonth() + 1);
    out.set(key, (out.get(key) ?? 0) + Number(valor));
  }
  return out;
}

/** Meta anual del indicador. El panel del cliente compara contra la del año previo. */
async function metaDelAnio(nombreIndicador: string, anio: number): Promise<number | null> {
  const indicador = await prisma.indicadores.findFirst({
    where: { nombre: nombreIndicador },
    select: { id_indicador: true },
  });
  if (!indicador) return null;
  const meta = await prisma.metas_indicadores.findFirst({
    where: { id_indicador: indicador.id_indicador, anio },
    select: { valor_meta: true },
  });
  return meta?.valor_meta == null ? null : Number(meta.valor_meta);
}

export class IndicadoresEventosService {
  static async calcular(query: { anio?: string; mes?: string }): Promise<IndicadoresEventosResponse> {
    const hoy = new Date();
    const anio = Number(query.anio) || hoy.getUTCFullYear();
    const mesPedido = Number(query.mes);
    const mes = mesPedido >= 1 && mesPedido <= 12 ? mesPedido : hoy.getUTCMonth() + 1;

    // Se traen los eventos de la ventana móvil completa (doce meses hacia atrás)
    // y del año seleccionado, que es lo máximo que necesita cualquier medida.
    const desde = new Date(Date.UTC(Math.min(anio, anio) - 1, mes - 12, 1));
    const hasta = new Date(Date.UTC(anio, 12, 31));

    // Se lee `eventos_monitoreo`, que es la "LISTA DE EVENTOS" del cliente: lo
    // que registra el Monitorista, con las mismas 23 columnas que exporta el
    // panel. `eventos_operativos` es otra cosa — el evento que origina un caso
    // SOP —, y encima la importación histórica le guarda en `tipo_incidente` el
    // tipo de reporte del caso ("Accidente", "Observación"), que no pertenece al
    // catálogo de incidentes operativos y ensuciaría todos los conteos.
    const filas = await prisma.eventos_monitoreo.findMany({
      where: { fecha: { gte: desde, lte: hasta } },
      select: {
        fecha: true,
        catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: { select: { nombre: true } },
        catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: { select: { nombre: true } },
        catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: { select: { nombre: true } },
      },
    });

    const eventos: EventoPlano[] = filas.map((fila) => ({
      anio: fila.fecha.getUTCFullYear(),
      mes: fila.fecha.getUTCMonth() + 1,
      tipo: fila.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "",
      ubicacion: fila.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre ?? null,
      causa: fila.catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?.nombre ?? null,
    }));

    const delMes = (e: EventoPlano) => e.anio === anio && e.mes === mes;
    const delAnio = (e: EventoPlano) => e.anio === anio;
    const contar = (cumple: (e: EventoPlano) => boolean) => ({
      mes: eventos.filter((e) => delMes(e) && cumple(e)).length,
      anual: eventos.filter((e) => delAnio(e) && cumple(e)).length,
    });

    const esErrorOperativo = (e: EventoPlano) => TIPOS_ERROR_OPERATIVO.includes(e.tipo);
    const esAccidentabilidad = (e: EventoPlano) => TIPOS_ACCIDENTABILIDAD.includes(e.tipo) && e.causa === CAUSA_EXTERNA;
    const esCritico = (e: EventoPlano) => TIPOS_CRITICOS.includes(e.tipo) && !!e.ubicacion && UBICACIONES_CRITICAS.includes(e.ubicacion);

    const [kmPorMes, pasajerosPorMes, metaKm, metaPasajeros] = await Promise.all([
      divisorPorMes(INDICADOR_KM),
      divisorPorMes(INDICADOR_PASAJEROS),
      // El umbral que muestra el panel es el del año anterior al consultado.
      metaDelAnio(INDICADOR_KM, anio - 1),
      metaDelAnio(INDICADOR_PASAJEROS, anio - 1),
    ]);

    const serieErrores = construirSerie(contarPorMes(eventos, esErrorOperativo), kmPorMes, anio, mes);
    const serieAccidentes = construirSerie(contarPorMes(eventos, esAccidentabilidad), pasajerosPorMes, anio, mes);
    const ultimo = <T,>(items: T[]): T | undefined => items[items.length - 1];

    const faltanDatos: string[] = [];
    if (kmPorMes.size === 0) faltanDatos.push(INDICADOR_KM);
    if (pasajerosPorMes.size === 0) faltanDatos.push(INDICADOR_PASAJEROS);

    return {
      periodo: { anio, mes },
      totalEventos: contar(() => true),
      erroresOperativos: contar(esErrorOperativo),
      accidentabilidad: contar(esAccidentabilidad),
      accidentabilidadSinDj: contar((e) => TIPOS_ACCIDENTABILIDAD_SIN_DJ.includes(e.tipo) && e.causa === CAUSA_EXTERNA),
      criticos: {
        ...contar(esCritico),
        detalle: EVENTOS_CRITICOS.map(({ etiqueta, tipos }) => {
          const cumple = (e: EventoPlano) => tipos.includes(e.tipo) && !!e.ubicacion && UBICACIONES_CRITICAS.includes(e.ubicacion);
          return { etiqueta, ...contar(cumple) };
        }),
      },
      indiceErrores: {
        valor: ultimo(serieErrores)?.indice ?? null,
        tolerable: metaKm,
        unidad: "x 1MM km-co",
        serie: serieErrores,
      },
      indiceAccidentabilidad: {
        valor: ultimo(serieAccidentes)?.indice ?? null,
        tolerable: metaPasajeros,
        unidad: "x 1MM pasajeros",
        serie: serieAccidentes,
      },
      faltanDatos,
    };
  }
}
