/**
 * Carga el umbral tolerable de un indicador para un año, en `metas_indicadores`.
 *
 * No hay pantalla en la app para esto todavía — el panel de indicadores de
 * eventos operacionales muestra el umbral del año anterior al filtrado (así lo
 * pide el cliente: filtrando 2026 se ve "Tolerable 2025"), y por ahora ese
 * valor solo se puede cargar desde acá. Sirve tanto para los dos indicadores
 * de hoy ("Km comercial", "Afluencia de pasajeros") como para cualquiera que
 * se agregue después.
 *
 * Uso:
 *   npx tsx scripts/set-umbral-tolerable.ts "Km comercial" 2025 12.7
 *   npx tsx scripts/set-umbral-tolerable.ts "Afluencia de pasajeros" 2025 3.98
 */
import "dotenv/config";
import prisma from "../src/lib/prisma.js";

const [nombreIndicador, anioRaw, valorRaw] = process.argv.slice(2);
const anio = Number(anioRaw);
const valor = Number(valorRaw);

if (!nombreIndicador || !Number.isInteger(anio) || !Number.isFinite(valor)) {
  console.error('Uso: npx tsx scripts/set-umbral-tolerable.ts "<nombre del indicador>" <año> <valor>');
  process.exit(1);
}

// `nombre` no es una columna única en el schema, así que se busca primero en
// vez de usar `upsert` — evita crear un duplicado si ya existe.
const indicador =
  (await prisma.indicadores.findFirst({ where: { nombre: nombreIndicador } })) ??
  (await prisma.indicadores.create({
    data: { nombre: nombreIndicador, tipo: "exposicion", activo: true, descripcion: "Divisor de los índices de eventos operacionales" },
  }));

const existente = await prisma.metas_indicadores.findFirst({ where: { id_indicador: indicador.id_indicador, anio } });
if (existente) {
  await prisma.metas_indicadores.update({ where: { id_meta: existente.id_meta }, data: { valor_meta: valor } });
  console.log(`Actualizado: "${nombreIndicador}" ${anio} -> ${valor} (antes era ${existente.valor_meta})`);
} else {
  await prisma.metas_indicadores.create({ data: { id_indicador: indicador.id_indicador, anio, valor_meta: valor } });
  console.log(`Creado: "${nombreIndicador}" ${anio} -> ${valor}`);
}

await prisma.$disconnect();
