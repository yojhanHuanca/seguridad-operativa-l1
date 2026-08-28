import prisma from "../../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";
type DbClient = typeof prisma | Prisma.TransactionClient;
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
export declare const SEQ_CASOS_SOP = "casos_sop_secuencia_seq";
export declare const SEQ_PLANES_ACCION = "planes_accion_secuencia_seq";
export declare function ensureSequence(client: DbClient, name: string): Promise<void>;
/** Nunca retrocede: si `minValue` es menor o igual al valor actual, no hace nada. */
export declare function advanceSequenceAtLeast(client: DbClient, name: string, minValue: number): Promise<void>;
export declare function nextSequenceValue(client: DbClient, name: string): Promise<number>;
/**
 * Reserva `count` valores de una sola consulta (en vez de `count` idas y
 * vueltas), para la importación masiva — `generate_series` hace que Postgres
 * llame `nextval()` una vez por fila, así que devuelve `count` enteros
 * consecutivos ya "gastados" de la secuencia.
 */
export declare function nextSequenceValues(client: DbClient, name: string, count: number): Promise<number[]>;
export declare function currentSequenceValue(client: DbClient, name: string): Promise<number>;
export {};
//# sourceMappingURL=sequences.d.ts.map