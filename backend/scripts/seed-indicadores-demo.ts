/**
 * Datos de demostración para los indicadores de eventos operacionales.
 *
 * Reproduce los números del panel que envió el cliente, para poder ver la
 * pantalla funcionando antes de que carguen los datos reales. Todo lo que
 * crea queda marcado con el prefijo `DEMO-` en `codigo_evento`, así que se
 * borra por completo con:
 *
 *     npx tsx scripts/seed-indicadores-demo.ts --limpiar
 *
 * No es un seed del sistema: no se ejecuta solo ni forma parte del arranque.
 */
import "dotenv/config";
import prisma from "../src/lib/prisma.js";

const PREFIJO = "DEMO-";
const INDICADOR_KM = "Km comercial";
const INDICADOR_PASAJEROS = "Afluencia de pasajeros";

/** Los doce meses del panel del cliente: ago-25 a jul-26. */
const MESES = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(Date.UTC(2025, 7 + i, 1));
  return { anio: d.getUTCFullYear(), mes: d.getUTCMonth() + 1 };
});

/** Barras del gráfico de errores operativos. Julio en 0, como el panel. */
const ERRORES_POR_MES = [3, 2, 4, 3, 2, 4, 4, 5, 3, 1, 4, 0];
/** Barras del gráfico de accidentabilidad: los 2026 suman 395. */
const ACCIDENTES_POR_MES = [56, 79, 66, 45, 58, 68, 55, 58, 52, 52, 66, 44];
/** "Eventos sin DJ": 23 en julio y 196 en el año, como informa el panel. */
const SIN_DJ_POR_MES = [24, 30, 28, 20, 25, 30, 28, 30, 26, 26, 33, 23];
/** Eventos críticos en la vía, repartidos entre los tipos de la lista. */
const CRITICOS_POR_MES = [4, 3, 5, 2, 4, 6, 7, 8, 6, 5, 5, 8];

const TIPOS_ERROR = ["NO ABRE PUERTAS", "NO PARA EN ESTACIÓN", "PARADA INCORRECTA"];
const TIPOS_ACCIDENTE = ["ATRAPAMIENTO-DJ", "IMPACTO FÍSICO-DJ", "CAIDA EN ESTACIÓN-DJ"];
const TIPOS_ACCIDENTE_SIN_DJ = ["ATRAPAMIENTO", "IMPACTO FÍSICO", "CAIDA EN ESTACIÓN"];
const TIPOS_CRITICOS = ["INGRESO A LA VÍA", "INTENTO DE SUICIDIO", "ARROLLAMIENTO", "DESCARRILAMIENTO", "TALONAMIENTO", "COLISION MR -OBSTÁCULO"];
const UBICACIONES_CRITICAS = ["ESTACIÓN", "PASARELA", "INTERESTACIONAL", "PATIO"];

/**
 * Divisores elegidos para que el índice caiga donde lo muestra el panel:
 * ~6.9 errores por millón de km-coche y ~3.6 accidentes por millón de pasajeros.
 */
const KM_POR_MES = 422_000;
const PASAJEROS_POR_MES = 16_000_000;
const TOLERABLE_ERRORES = 12.7;
const TOLERABLE_ACCIDENTABILIDAD = 3.98;

async function limpiar() {
  const { count } = await prisma.eventos_monitoreo.deleteMany({ where: { codigo_evento: { startsWith: PREFIJO } } });
  const indicadores = await prisma.indicadores.findMany({
    where: { nombre: { in: [INDICADOR_KM, INDICADOR_PASAJEROS] } },
    select: { id_indicador: true },
  });
  const ids = indicadores.map((i) => i.id_indicador);
  await prisma.historial_indicadores.deleteMany({ where: { id_indicador: { in: ids } } });
  await prisma.metas_indicadores.deleteMany({ where: { id_indicador: { in: ids } } });
  await prisma.indicadores.deleteMany({ where: { id_indicador: { in: ids } } });
  console.log(`Borrados ${count} eventos de demostración y sus indicadores.`);
}

/** id_detalle de un valor de catálogo, buscado por nombre exacto. */
async function catalogo(nombreCatalogo: string): Promise<Map<string, number>> {
  const filas = await prisma.catalogo_detalle.findMany({
    where: { catalogos: { nombre: nombreCatalogo } },
    select: { id_detalle: true, nombre: true },
  });
  return new Map(filas.map((f) => [f.nombre, f.id_detalle]));
}

async function sembrar() {
  await limpiar();

  const [tipos, ubicaciones, causas] = await Promise.all([
    catalogo("Tipo de incidente operativo"),
    catalogo("Ubicación"),
    catalogo("Tipo Causa"),
  ]);
  const causaExterna = causas.get("FACTOR EXTERNO");
  if (!causaExterna) throw new Error('Falta el valor "FACTOR EXTERNO" en el catálogo "Tipo Causa"');

  const usuario = await prisma.usuarios.findFirst({ where: { estado: "Activo" }, select: { id_usuario: true } });

  const idDe = (nombre: string) => {
    const id = tipos.get(nombre);
    if (!id) throw new Error(`Falta "${nombre}" en el catálogo "Tipo de incidente operativo"`);
    return id;
  };

  const eventos: { codigo_evento: string; fecha: Date; tipo_incidente: number; ubicacion?: number; tipo_causa?: number }[] = [];
  let n = 0;
  const agregar = (anio: number, mes: number, tipo: string, extra: { ubicacion?: number; tipo_causa?: number } = {}) => {
    n += 1;
    eventos.push({
      codigo_evento: `${PREFIJO}${String(n).padStart(5, "0")}`,
      // Repartidos dentro del mes para que las fechas no sean todas iguales.
      fecha: new Date(Date.UTC(anio, mes - 1, (n % 27) + 1)),
      tipo_incidente: idDe(tipo),
      ...extra,
    });
  };

  MESES.forEach(({ anio, mes }, i) => {
    for (let k = 0; k < (ERRORES_POR_MES[i] ?? 0); k++) {
      agregar(anio, mes, TIPOS_ERROR[k % TIPOS_ERROR.length]!);
    }
    for (let k = 0; k < (ACCIDENTES_POR_MES[i] ?? 0); k++) {
      agregar(anio, mes, TIPOS_ACCIDENTE[k % TIPOS_ACCIDENTE.length]!, { tipo_causa: causaExterna });
    }
    // Los "sin DJ" van aparte: se informan solos y no entran al índice.
    for (let k = 0; k < (SIN_DJ_POR_MES[i] ?? 0); k++) {
      agregar(anio, mes, TIPOS_ACCIDENTE_SIN_DJ[k % TIPOS_ACCIDENTE_SIN_DJ.length]!, { tipo_causa: causaExterna });
    }
    for (let k = 0; k < (CRITICOS_POR_MES[i] ?? 0); k++) {
      agregar(anio, mes, TIPOS_CRITICOS[k % TIPOS_CRITICOS.length]!, {
        ubicacion: ubicaciones.get(UBICACIONES_CRITICAS[k % UBICACIONES_CRITICAS.length]!),
      });
    }
  });

  await prisma.eventos_monitoreo.createMany({
    data: eventos.map((e) => ({ ...e, usuario_registra: usuario?.id_usuario ?? null, estado: "Registrado" })),
  });

  // Divisores y umbrales. El panel compara contra la meta del año anterior.
  for (const [nombre, unidad, valorMes, meta] of [
    [INDICADOR_KM, "km", KM_POR_MES, TOLERABLE_ERRORES],
    [INDICADOR_PASAJEROS, "pasajeros", PASAJEROS_POR_MES, TOLERABLE_ACCIDENTABILIDAD],
  ] as const) {
    const indicador = await prisma.indicadores.create({
      data: { nombre, unidad_medida: unidad, tipo: "exposicion", activo: true, descripcion: "Divisor de los índices de eventos operacionales" },
    });
    await prisma.historial_indicadores.createMany({
      data: MESES.map(({ anio, mes }) => ({
        id_indicador: indicador.id_indicador,
        fecha: new Date(Date.UTC(anio, mes - 1, 1)),
        valor: valorMes,
      })),
    });
    await prisma.metas_indicadores.createMany({
      data: [2025, 2026].map((anio) => ({ id_indicador: indicador.id_indicador, anio, valor_meta: meta })),
    });
  }

  const ultimo = MESES[MESES.length - 1]!;
  console.log(`Creados ${eventos.length} eventos de demostración entre ago-2025 y jul-2026.`);
  console.log(`Divisores cargados: ${KM_POR_MES.toLocaleString("es-PE")} km y ${PASAJEROS_POR_MES.toLocaleString("es-PE")} pasajeros por mes.`);
  // La ventana replica la del panel del cliente y termina en julio 2026, así
  // que la pantalla abre en el mes actual y se ve vacía si no se avisa.
  console.log(`\n>> Abrí /monitoreo/indicadores y poné el filtro en ${String(ultimo.mes).padStart(2, "0")}/${ultimo.anio}: la demo termina ahí.`);
}

const accion = process.argv.includes("--limpiar") ? limpiar : sembrar;
await accion();
await prisma.$disconnect();
