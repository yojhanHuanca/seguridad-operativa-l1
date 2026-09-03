import prisma from "../../lib/prisma.js";
import {
  construirSerie,
  contarPorMes,
  esAccidentabilidad,
  esAccidentabilidadSinDj,
  esCritico,
  esErrorOperativo,
  EVENTOS_CRITICOS,
  mesKey,
  UBICACIONES_CRITICAS,
  type EventoPlano,
  type IndicadoresEventosResponse,
} from "./indicadores.formulas.js";

/**
 * Indicadores de eventos operacionales del panel de Monitoreo — la parte que
 * consulta la base. Las fórmulas en sí (traducción de las medidas DAX del
 * Power BI del cliente) están en `indicadores.formulas.ts`, sin dependencia de
 * Prisma, para poder testearlas sin una base de datos.
 */

/** Nombres en `indicadores` de los divisores que alguien carga mes a mes. */
const INDICADOR_KM = "Km comercial";
const INDICADOR_PASAJEROS = "Afluencia de pasajeros";

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

async function indicadorPorNombre(nombreIndicador: string) {
  const existente = await prisma.indicadores.findFirst({
    where: { nombre: nombreIndicador },
    select: { id_indicador: true },
  });
  if (existente) return existente;

  return prisma.indicadores.create({
    data: {
      nombre: nombreIndicador,
      descripcion: `Valor mensual de ${nombreIndicador.toLowerCase()} para indicadores operacionales`,
      tipo: "Divisor",
      unidad_medida: nombreIndicador === INDICADOR_KM ? "km" : "pasajeros",
      activo: true,
    },
    select: { id_indicador: true },
  });
}

function fechaMes(anio: number, mes: number) {
  return new Date(Date.UTC(anio, mes - 1, 1));
}

function validarPeriodo(anio: unknown, mes: unknown) {
  const year = Number(anio);
  const month = Number(mes);
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    throw new Error("Selecciona un año válido");
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("Selecciona un mes válido");
  }
  return { anio: year, mes: month };
}

function validarValor(nombre: string, valor: unknown) {
  const number = Number(valor);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${nombre} debe ser un número mayor o igual a cero`);
  }
  return Math.round(number * 100) / 100;
}

async function valorDelMes(nombreIndicador: string, anio: number, mes: number): Promise<number | null> {
  const indicador = await prisma.indicadores.findFirst({
    where: { nombre: nombreIndicador },
    select: { id_indicador: true },
  });
  if (!indicador) return null;
  const desde = fechaMes(anio, mes);
  const hasta = new Date(Date.UTC(anio, mes, 1));
  const valores = await prisma.historial_indicadores.findMany({
    where: {
      id_indicador: indicador.id_indicador,
      fecha: { gte: desde, lt: hasta },
    },
    select: { valor: true },
  });
  const total = valores.reduce((sum, item) => sum + Number(item.valor ?? 0), 0);
  return valores.length > 0 ? Math.round(total * 100) / 100 : null;
}

async function guardarValorMensual(nombreIndicador: string, anio: number, mes: number, valor: number) {
  const indicador = await indicadorPorNombre(nombreIndicador);
  const desde = fechaMes(anio, mes);
  const hasta = new Date(Date.UTC(anio, mes, 1));
  const existentes = await prisma.historial_indicadores.findMany({
    where: {
      id_indicador: indicador.id_indicador,
      fecha: { gte: desde, lt: hasta },
    },
    select: { id_historial: true },
    orderBy: { id_historial: "asc" },
  });

  if (existentes.length === 0) {
    await prisma.historial_indicadores.create({
      data: {
        id_indicador: indicador.id_indicador,
        fecha: desde,
        valor,
        observacion: "Carga manual desde Indicadores",
      },
    });
    return;
  }

  const [primero, ...duplicados] = existentes;
  if (!primero) return;
  await prisma.historial_indicadores.update({
    where: { id_historial: primero.id_historial },
    data: {
      fecha: desde,
      valor,
      observacion: "Carga manual desde Indicadores",
    },
  });
  if (duplicados.length > 0) {
    await prisma.historial_indicadores.deleteMany({
      where: { id_historial: { in: duplicados.map((item) => item.id_historial) } },
    });
  }
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
  static async guardarDatosMes(input: { anio?: unknown; mes?: unknown; kmComercial?: unknown; afluenciaPasajeros?: unknown }) {
    const { anio, mes } = validarPeriodo(input.anio, input.mes);
    const kmComercial = validarValor("Km comercial", input.kmComercial);
    const afluenciaPasajeros = validarValor("Afluencia de pasajeros", input.afluenciaPasajeros);

    await prisma.$transaction(async () => {
      await guardarValorMensual(INDICADOR_KM, anio, mes, kmComercial);
      await guardarValorMensual(INDICADOR_PASAJEROS, anio, mes, afluenciaPasajeros);
    });

    return { anio, mes, kmComercial, afluenciaPasajeros };
  }

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
    const keyMes = mesKey(anio, mes);

    const faltanDatos: string[] = [];
    if (!kmPorMes.has(keyMes)) faltanDatos.push(INDICADOR_KM);
    if (!pasajerosPorMes.has(keyMes)) faltanDatos.push(INDICADOR_PASAJEROS);

    return {
      periodo: { anio, mes },
      datosMes: {
        kmComercial: await valorDelMes(INDICADOR_KM, anio, mes),
        afluenciaPasajeros: await valorDelMes(INDICADOR_PASAJEROS, anio, mes),
      },
      totalEventos: contar(() => true),
      erroresOperativos: contar(esErrorOperativo),
      accidentabilidad: contar(esAccidentabilidad),
      accidentabilidadSinDj: contar(esAccidentabilidadSinDj),
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
