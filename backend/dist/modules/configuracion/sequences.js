import prisma from "../../lib/prisma.js";
/**
 * Generador atómico de códigos vía secuencia de Postgres.
 *
 * Antes se buscaba "el máximo usado + 1" y se reintentaba la transacción si
 * otra en paralelo ya se había quedado con ese número (hasta 3 veces). Bajo
 * varias solicitudes simultáneas eso no alcanzaba — se veía como el error
 * "No se pudo generar un código SOP único". Una secuencia de Postgres
 * resuelve esto de raíz: el motor garantiza que cada `nextval()` devuelve un
 * número distinto sin importar cuántas transacciones lo pidan a la vez, sin
 * reintentos ni colisiones posibles.
 *
 * Los nombres de secuencia son constantes fijas del código (nunca vienen del
 * usuario), así que interpolarlas en el SQL es seguro.
 */
export const SEQ_CASOS_SOP = "casos_sop_secuencia_seq";
export const SEQ_PLANES_ACCION = "planes_accion_secuencia_seq";
export async function ensureSequence(client, name) {
    await client.$executeRawUnsafe(`CREATE SEQUENCE IF NOT EXISTS "${name}"`);
}
/** Nunca retrocede: si `minValue` es menor o igual al valor actual, no hace nada. */
export async function advanceSequenceAtLeast(client, name, minValue) {
    if (!Number.isFinite(minValue) || minValue < 1)
        return;
    await client.$executeRawUnsafe(`SELECT setval('${name}', GREATEST(${Math.trunc(minValue)}, (SELECT last_value FROM "${name}")))`);
}
export async function nextSequenceValue(client, name) {
    const rows = await client.$queryRawUnsafe(`SELECT nextval('${name}') AS nextval`);
    return Number(rows[0].nextval);
}
/**
 * Reserva `count` valores de una sola consulta (en vez de `count` idas y
 * vueltas), para la importación masiva — `generate_series` hace que Postgres
 * llame `nextval()` una vez por fila, así que devuelve `count` enteros
 * consecutivos ya "gastados" de la secuencia.
 */
export async function nextSequenceValues(client, name, count) {
    if (count <= 0)
        return [];
    const rows = await client.$queryRawUnsafe(`SELECT nextval('${name}') AS nextval FROM generate_series(1, ${Math.trunc(count)})`);
    return rows.map((row) => Number(row.nextval));
}
export async function currentSequenceValue(client, name) {
    const rows = await client.$queryRawUnsafe(`SELECT last_value FROM "${name}"`);
    return Number(rows[0].last_value);
}
//# sourceMappingURL=sequences.js.map