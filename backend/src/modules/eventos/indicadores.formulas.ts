/**
 * Traducción pura de las medidas DAX del Power BI de eventos operacionales
 * que hoy usa Seguridad Operacional. Ninguna función de acá toca la base de
 * datos — es la parte con lógica de negocio real (fórmulas, ventanas de
 * fechas), separada a propósito de `indicadores.service.ts` (que sí consulta
 * Prisma) para poder testearla sin depender de una base ni de que el cliente
 * de Prisma esté generado.
 *
 * Los nombres de tipo de incidente, ubicación y causa se comparan tal cual
 * están en el catálogo — se verificó que coinciden letra por letra con los
 * del archivo del cliente, tildes incluidas.
 *
 * Las listas de abajo son la parte que cambia si el cliente ajusta su
 * criterio, así que están juntas y con el nombre de la medida DAX de la que
 * salen.
 */

/** `#Errores_Operativos_Tulsa`. Sin filtro de causa, igual que el original. */
export const TIPOS_ERROR_OPERATIVO = ["NO ABRE PUERTAS", "NO PARA EN ESTACIÓN", "PARADA INCORRECTA"];

/** `#Accidentabilidad_Tulsa_Mensual_Externo_total_1`, que sí filtra por causa. */
export const TIPOS_ACCIDENTABILIDAD = ["ATRAPAMIENTO-DJ", "IMPACTO FÍSICO-DJ", "CAIDA EN ESTACIÓN-DJ"];

/**
 * Los mismos tres tipos pero sin el sufijo `-DJ`, que en el panel del cliente
 * se muestran aparte como "Eventos sin DJ". Son catálogos distintos, no una
 * variante de escritura: el índice de accidentabilidad usa solo los `-DJ`.
 */
export const TIPOS_ACCIDENTABILIDAD_SIN_DJ = ["ATRAPAMIENTO", "IMPACTO FÍSICO", "CAIDA EN ESTACIÓN"];
export const CAUSA_EXTERNA = "FACTOR EXTERNO";

/** Ubicaciones que acotan los eventos críticos, comunes a todas sus medidas. */
export const UBICACIONES_CRITICAS = ["ESTACIÓN", "PASARELA", "INTERESTACIONAL", "PATIO"];

/**
 * `Catalogo_EventosCriticos` + `Criticos_Semanal_porItem`: cada renglón de la
 * lista y los tipos de incidente que suma.
 *
 * "COLISION MR - MR" y "COLISION MR" están en el DAX del cliente pero no en el
 * catálogo (solo existe "COLISION MR -OBSTÁCULO"), así que hoy no suman nada ni
 * allá ni acá. Se dejan escritos para que se vea que no es un olvido: hay que
 * confirmar con el cliente si faltan en el catálogo o sobran en la fórmula.
 */
export const EVENTOS_CRITICOS: { etiqueta: string; tipos: string[] }[] = [
  { etiqueta: "Atropello/ Embestido", tipos: ["ATROPELLO"] },
  { etiqueta: "Colisiones", tipos: ["COLISION MR -OBSTÁCULO", "COLISION MR - MR", "COLISION MR"] },
  { etiqueta: "Descarrilamientos", tipos: ["DESCARRILAMIENTO"] },
  { etiqueta: "Ingresos a la vía", tipos: ["INGRESO A LA VÍA"] },
  { etiqueta: "Intentos de suicidio", tipos: ["INTENTO DE SUICIDIO"] },
  { etiqueta: "Suicidios (Arrollamientos)", tipos: ["ARROLLAMIENTO"] },
  { etiqueta: "Talonamientos", tipos: ["TALONAMIENTO"] },
];

export const TIPOS_CRITICOS = [...new Set(EVENTOS_CRITICOS.flatMap((item) => item.tipos))];

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
  datosMes: { kmComercial: number | null; afluenciaPasajeros: number | null };
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

export const mesKey = (anio: number, mes: number) => `${anio}-${String(mes).padStart(2, "0")}`;
export const mesLabel = (anio: number, mes: number) => `${MES_CORTO[mes - 1]}-${String(anio).slice(2)}`;

/** Los doce meses que terminan en el mes indicado, del más viejo al más nuevo. */
export function ventana12Meses(anio: number, mes: number): { anio: number; mes: number }[] {
  const out: { anio: number; mes: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(anio, mes - 1 - i, 1));
    out.push({ anio: d.getUTCFullYear(), mes: d.getUTCMonth() + 1 });
  }
  return out;
}

export interface EventoPlano {
  anio: number;
  mes: number;
  tipo: string;
  ubicacion: string | null;
  causa: string | null;
}

/** Suma por mes de los eventos que cumplen el filtro, indexada por `anio-mes`. */
export function contarPorMes(eventos: EventoPlano[], cumple: (e: EventoPlano) => boolean): Map<string, number> {
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
export function construirSerie(
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

export const esErrorOperativo = (e: EventoPlano) => TIPOS_ERROR_OPERATIVO.includes(e.tipo);
export const esAccidentabilidad = (e: EventoPlano) => TIPOS_ACCIDENTABILIDAD.includes(e.tipo) && e.causa === CAUSA_EXTERNA;
export const esAccidentabilidadSinDj = (e: EventoPlano) => TIPOS_ACCIDENTABILIDAD_SIN_DJ.includes(e.tipo) && e.causa === CAUSA_EXTERNA;
export const esCritico = (e: EventoPlano) =>
  TIPOS_CRITICOS.includes(e.tipo) && !!e.ubicacion && UBICACIONES_CRITICAS.includes(e.ubicacion);
