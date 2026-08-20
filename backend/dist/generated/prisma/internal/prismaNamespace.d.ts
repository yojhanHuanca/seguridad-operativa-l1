import * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
 * Metrics
 */
export type Metrics = runtime.Metrics;
export type Metric<T> = runtime.Metric<T>;
export type MetricHistogram = runtime.MetricHistogram;
export type MetricHistogramBucket = runtime.MetricHistogramBucket;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 6.19.3
 * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly actividades_plan: "actividades_plan";
    readonly anexos_caso: "anexos_caso";
    readonly areas: "areas";
    readonly auditoria: "auditoria";
    readonly bitacora: "bitacora";
    readonly casos_sop: "casos_sop";
    readonly catalogo_detalle: "catalogo_detalle";
    readonly catalogos: "catalogos";
    readonly configuracion: "configuracion";
    readonly dashboard_indicadores: "dashboard_indicadores";
    readonly dashboards: "dashboards";
    readonly estaciones: "estaciones";
    readonly evento_caso: "evento_caso";
    readonly eventos_operativos: "eventos_operativos";
    readonly eventos_monitoreo: "eventos_monitoreo";
    readonly evidencias: "evidencias";
    readonly evidencias_evento: "evidencias_evento";
    readonly historial_indicadores: "historial_indicadores";
    readonly incidencias: "incidencias";
    readonly indicadores: "indicadores";
    readonly timeline_caso: "timeline_caso";
    readonly investigacion_caso: "investigacion_caso";
    readonly investigaciones: "investigaciones";
    readonly logs_sistema: "logs_sistema";
    readonly metas_indicadores: "metas_indicadores";
    readonly notificaciones: "notificaciones";
    readonly planes_accion: "planes_accion";
    readonly reporte_detalle: "reporte_detalle";
    readonly reporte_estadistico: "reporte_estadistico";
    readonly roles: "roles";
    readonly seguimientos: "seguimientos";
    readonly sesiones: "sesiones";
    readonly solicitudes_informacion: "solicitudes_informacion";
    readonly solicitudes_prorroga: "solicitudes_prorroga";
    readonly usuarios: "usuarios";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "actividades_plan" | "anexos_caso" | "areas" | "auditoria" | "bitacora" | "casos_sop" | "catalogo_detalle" | "catalogos" | "configuracion" | "dashboard_indicadores" | "dashboards" | "estaciones" | "evento_caso" | "eventos_operativos" | "eventos_monitoreo" | "evidencias" | "evidencias_evento" | "historial_indicadores" | "incidencias" | "indicadores" | "timeline_caso" | "investigacion_caso" | "investigaciones" | "logs_sistema" | "metas_indicadores" | "notificaciones" | "planes_accion" | "reporte_detalle" | "reporte_estadistico" | "roles" | "seguimientos" | "sesiones" | "solicitudes_informacion" | "solicitudes_prorroga" | "usuarios";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        actividades_plan: {
            payload: Prisma.$actividades_planPayload<ExtArgs>;
            fields: Prisma.actividades_planFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.actividades_planFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.actividades_planFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>;
                };
                findFirst: {
                    args: Prisma.actividades_planFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.actividades_planFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>;
                };
                findMany: {
                    args: Prisma.actividades_planFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>[];
                };
                create: {
                    args: Prisma.actividades_planCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>;
                };
                createMany: {
                    args: Prisma.actividades_planCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.actividades_planCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>[];
                };
                delete: {
                    args: Prisma.actividades_planDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>;
                };
                update: {
                    args: Prisma.actividades_planUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>;
                };
                deleteMany: {
                    args: Prisma.actividades_planDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.actividades_planUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.actividades_planUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>[];
                };
                upsert: {
                    args: Prisma.actividades_planUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$actividades_planPayload>;
                };
                aggregate: {
                    args: Prisma.Actividades_planAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateActividades_plan>;
                };
                groupBy: {
                    args: Prisma.actividades_planGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Actividades_planGroupByOutputType>[];
                };
                count: {
                    args: Prisma.actividades_planCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Actividades_planCountAggregateOutputType> | number;
                };
            };
        };
        anexos_caso: {
            payload: Prisma.$anexos_casoPayload<ExtArgs>;
            fields: Prisma.anexos_casoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.anexos_casoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.anexos_casoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>;
                };
                findFirst: {
                    args: Prisma.anexos_casoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.anexos_casoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>;
                };
                findMany: {
                    args: Prisma.anexos_casoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>[];
                };
                create: {
                    args: Prisma.anexos_casoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>;
                };
                createMany: {
                    args: Prisma.anexos_casoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.anexos_casoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>[];
                };
                delete: {
                    args: Prisma.anexos_casoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>;
                };
                update: {
                    args: Prisma.anexos_casoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>;
                };
                deleteMany: {
                    args: Prisma.anexos_casoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.anexos_casoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.anexos_casoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>[];
                };
                upsert: {
                    args: Prisma.anexos_casoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anexos_casoPayload>;
                };
                aggregate: {
                    args: Prisma.Anexos_casoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAnexos_caso>;
                };
                groupBy: {
                    args: Prisma.anexos_casoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Anexos_casoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.anexos_casoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Anexos_casoCountAggregateOutputType> | number;
                };
            };
        };
        areas: {
            payload: Prisma.$areasPayload<ExtArgs>;
            fields: Prisma.areasFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.areasFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.areasFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>;
                };
                findFirst: {
                    args: Prisma.areasFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.areasFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>;
                };
                findMany: {
                    args: Prisma.areasFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>[];
                };
                create: {
                    args: Prisma.areasCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>;
                };
                createMany: {
                    args: Prisma.areasCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.areasCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>[];
                };
                delete: {
                    args: Prisma.areasDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>;
                };
                update: {
                    args: Prisma.areasUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>;
                };
                deleteMany: {
                    args: Prisma.areasDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.areasUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.areasUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>[];
                };
                upsert: {
                    args: Prisma.areasUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$areasPayload>;
                };
                aggregate: {
                    args: Prisma.AreasAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAreas>;
                };
                groupBy: {
                    args: Prisma.areasGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AreasGroupByOutputType>[];
                };
                count: {
                    args: Prisma.areasCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AreasCountAggregateOutputType> | number;
                };
            };
        };
        auditoria: {
            payload: Prisma.$auditoriaPayload<ExtArgs>;
            fields: Prisma.auditoriaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.auditoriaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.auditoriaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>;
                };
                findFirst: {
                    args: Prisma.auditoriaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.auditoriaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>;
                };
                findMany: {
                    args: Prisma.auditoriaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>[];
                };
                create: {
                    args: Prisma.auditoriaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>;
                };
                createMany: {
                    args: Prisma.auditoriaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.auditoriaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>[];
                };
                delete: {
                    args: Prisma.auditoriaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>;
                };
                update: {
                    args: Prisma.auditoriaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>;
                };
                deleteMany: {
                    args: Prisma.auditoriaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.auditoriaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.auditoriaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>[];
                };
                upsert: {
                    args: Prisma.auditoriaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auditoriaPayload>;
                };
                aggregate: {
                    args: Prisma.AuditoriaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditoria>;
                };
                groupBy: {
                    args: Prisma.auditoriaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditoriaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.auditoriaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditoriaCountAggregateOutputType> | number;
                };
            };
        };
        bitacora: {
            payload: Prisma.$bitacoraPayload<ExtArgs>;
            fields: Prisma.bitacoraFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.bitacoraFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.bitacoraFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>;
                };
                findFirst: {
                    args: Prisma.bitacoraFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.bitacoraFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>;
                };
                findMany: {
                    args: Prisma.bitacoraFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>[];
                };
                create: {
                    args: Prisma.bitacoraCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>;
                };
                createMany: {
                    args: Prisma.bitacoraCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.bitacoraCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>[];
                };
                delete: {
                    args: Prisma.bitacoraDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>;
                };
                update: {
                    args: Prisma.bitacoraUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>;
                };
                deleteMany: {
                    args: Prisma.bitacoraDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.bitacoraUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.bitacoraUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>[];
                };
                upsert: {
                    args: Prisma.bitacoraUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$bitacoraPayload>;
                };
                aggregate: {
                    args: Prisma.BitacoraAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBitacora>;
                };
                groupBy: {
                    args: Prisma.bitacoraGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BitacoraGroupByOutputType>[];
                };
                count: {
                    args: Prisma.bitacoraCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BitacoraCountAggregateOutputType> | number;
                };
            };
        };
        casos_sop: {
            payload: Prisma.$casos_sopPayload<ExtArgs>;
            fields: Prisma.casos_sopFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.casos_sopFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.casos_sopFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>;
                };
                findFirst: {
                    args: Prisma.casos_sopFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.casos_sopFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>;
                };
                findMany: {
                    args: Prisma.casos_sopFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>[];
                };
                create: {
                    args: Prisma.casos_sopCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>;
                };
                createMany: {
                    args: Prisma.casos_sopCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.casos_sopCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>[];
                };
                delete: {
                    args: Prisma.casos_sopDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>;
                };
                update: {
                    args: Prisma.casos_sopUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>;
                };
                deleteMany: {
                    args: Prisma.casos_sopDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.casos_sopUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.casos_sopUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>[];
                };
                upsert: {
                    args: Prisma.casos_sopUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$casos_sopPayload>;
                };
                aggregate: {
                    args: Prisma.Casos_sopAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCasos_sop>;
                };
                groupBy: {
                    args: Prisma.casos_sopGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Casos_sopGroupByOutputType>[];
                };
                count: {
                    args: Prisma.casos_sopCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Casos_sopCountAggregateOutputType> | number;
                };
            };
        };
        catalogo_detalle: {
            payload: Prisma.$catalogo_detallePayload<ExtArgs>;
            fields: Prisma.catalogo_detalleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.catalogo_detalleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.catalogo_detalleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>;
                };
                findFirst: {
                    args: Prisma.catalogo_detalleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.catalogo_detalleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>;
                };
                findMany: {
                    args: Prisma.catalogo_detalleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>[];
                };
                create: {
                    args: Prisma.catalogo_detalleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>;
                };
                createMany: {
                    args: Prisma.catalogo_detalleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.catalogo_detalleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>[];
                };
                delete: {
                    args: Prisma.catalogo_detalleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>;
                };
                update: {
                    args: Prisma.catalogo_detalleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>;
                };
                deleteMany: {
                    args: Prisma.catalogo_detalleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.catalogo_detalleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.catalogo_detalleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>[];
                };
                upsert: {
                    args: Prisma.catalogo_detalleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogo_detallePayload>;
                };
                aggregate: {
                    args: Prisma.Catalogo_detalleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCatalogo_detalle>;
                };
                groupBy: {
                    args: Prisma.catalogo_detalleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Catalogo_detalleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.catalogo_detalleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Catalogo_detalleCountAggregateOutputType> | number;
                };
            };
        };
        catalogos: {
            payload: Prisma.$catalogosPayload<ExtArgs>;
            fields: Prisma.catalogosFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.catalogosFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.catalogosFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>;
                };
                findFirst: {
                    args: Prisma.catalogosFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.catalogosFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>;
                };
                findMany: {
                    args: Prisma.catalogosFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>[];
                };
                create: {
                    args: Prisma.catalogosCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>;
                };
                createMany: {
                    args: Prisma.catalogosCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.catalogosCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>[];
                };
                delete: {
                    args: Prisma.catalogosDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>;
                };
                update: {
                    args: Prisma.catalogosUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>;
                };
                deleteMany: {
                    args: Prisma.catalogosDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.catalogosUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.catalogosUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>[];
                };
                upsert: {
                    args: Prisma.catalogosUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$catalogosPayload>;
                };
                aggregate: {
                    args: Prisma.CatalogosAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCatalogos>;
                };
                groupBy: {
                    args: Prisma.catalogosGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CatalogosGroupByOutputType>[];
                };
                count: {
                    args: Prisma.catalogosCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CatalogosCountAggregateOutputType> | number;
                };
            };
        };
        configuracion: {
            payload: Prisma.$configuracionPayload<ExtArgs>;
            fields: Prisma.configuracionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.configuracionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.configuracionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>;
                };
                findFirst: {
                    args: Prisma.configuracionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.configuracionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>;
                };
                findMany: {
                    args: Prisma.configuracionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>[];
                };
                create: {
                    args: Prisma.configuracionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>;
                };
                createMany: {
                    args: Prisma.configuracionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.configuracionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>[];
                };
                delete: {
                    args: Prisma.configuracionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>;
                };
                update: {
                    args: Prisma.configuracionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>;
                };
                deleteMany: {
                    args: Prisma.configuracionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.configuracionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.configuracionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>[];
                };
                upsert: {
                    args: Prisma.configuracionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$configuracionPayload>;
                };
                aggregate: {
                    args: Prisma.ConfiguracionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConfiguracion>;
                };
                groupBy: {
                    args: Prisma.configuracionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfiguracionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.configuracionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfiguracionCountAggregateOutputType> | number;
                };
            };
        };
        dashboard_indicadores: {
            payload: Prisma.$dashboard_indicadoresPayload<ExtArgs>;
            fields: Prisma.dashboard_indicadoresFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.dashboard_indicadoresFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.dashboard_indicadoresFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>;
                };
                findFirst: {
                    args: Prisma.dashboard_indicadoresFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.dashboard_indicadoresFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>;
                };
                findMany: {
                    args: Prisma.dashboard_indicadoresFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>[];
                };
                create: {
                    args: Prisma.dashboard_indicadoresCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>;
                };
                createMany: {
                    args: Prisma.dashboard_indicadoresCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.dashboard_indicadoresCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>[];
                };
                delete: {
                    args: Prisma.dashboard_indicadoresDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>;
                };
                update: {
                    args: Prisma.dashboard_indicadoresUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>;
                };
                deleteMany: {
                    args: Prisma.dashboard_indicadoresDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.dashboard_indicadoresUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.dashboard_indicadoresUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>[];
                };
                upsert: {
                    args: Prisma.dashboard_indicadoresUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboard_indicadoresPayload>;
                };
                aggregate: {
                    args: Prisma.Dashboard_indicadoresAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDashboard_indicadores>;
                };
                groupBy: {
                    args: Prisma.dashboard_indicadoresGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Dashboard_indicadoresGroupByOutputType>[];
                };
                count: {
                    args: Prisma.dashboard_indicadoresCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Dashboard_indicadoresCountAggregateOutputType> | number;
                };
            };
        };
        dashboards: {
            payload: Prisma.$dashboardsPayload<ExtArgs>;
            fields: Prisma.dashboardsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.dashboardsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.dashboardsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>;
                };
                findFirst: {
                    args: Prisma.dashboardsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.dashboardsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>;
                };
                findMany: {
                    args: Prisma.dashboardsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>[];
                };
                create: {
                    args: Prisma.dashboardsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>;
                };
                createMany: {
                    args: Prisma.dashboardsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.dashboardsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>[];
                };
                delete: {
                    args: Prisma.dashboardsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>;
                };
                update: {
                    args: Prisma.dashboardsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>;
                };
                deleteMany: {
                    args: Prisma.dashboardsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.dashboardsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.dashboardsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>[];
                };
                upsert: {
                    args: Prisma.dashboardsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$dashboardsPayload>;
                };
                aggregate: {
                    args: Prisma.DashboardsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDashboards>;
                };
                groupBy: {
                    args: Prisma.dashboardsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DashboardsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.dashboardsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DashboardsCountAggregateOutputType> | number;
                };
            };
        };
        estaciones: {
            payload: Prisma.$estacionesPayload<ExtArgs>;
            fields: Prisma.estacionesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.estacionesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.estacionesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>;
                };
                findFirst: {
                    args: Prisma.estacionesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.estacionesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>;
                };
                findMany: {
                    args: Prisma.estacionesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>[];
                };
                create: {
                    args: Prisma.estacionesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>;
                };
                createMany: {
                    args: Prisma.estacionesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.estacionesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>[];
                };
                delete: {
                    args: Prisma.estacionesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>;
                };
                update: {
                    args: Prisma.estacionesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>;
                };
                deleteMany: {
                    args: Prisma.estacionesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.estacionesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.estacionesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>[];
                };
                upsert: {
                    args: Prisma.estacionesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$estacionesPayload>;
                };
                aggregate: {
                    args: Prisma.EstacionesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEstaciones>;
                };
                groupBy: {
                    args: Prisma.estacionesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EstacionesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.estacionesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EstacionesCountAggregateOutputType> | number;
                };
            };
        };
        evento_caso: {
            payload: Prisma.$evento_casoPayload<ExtArgs>;
            fields: Prisma.evento_casoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.evento_casoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.evento_casoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>;
                };
                findFirst: {
                    args: Prisma.evento_casoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.evento_casoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>;
                };
                findMany: {
                    args: Prisma.evento_casoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>[];
                };
                create: {
                    args: Prisma.evento_casoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>;
                };
                createMany: {
                    args: Prisma.evento_casoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.evento_casoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>[];
                };
                delete: {
                    args: Prisma.evento_casoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>;
                };
                update: {
                    args: Prisma.evento_casoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>;
                };
                deleteMany: {
                    args: Prisma.evento_casoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.evento_casoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.evento_casoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>[];
                };
                upsert: {
                    args: Prisma.evento_casoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evento_casoPayload>;
                };
                aggregate: {
                    args: Prisma.Evento_casoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEvento_caso>;
                };
                groupBy: {
                    args: Prisma.evento_casoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Evento_casoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.evento_casoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Evento_casoCountAggregateOutputType> | number;
                };
            };
        };
        eventos_operativos: {
            payload: Prisma.$eventos_operativosPayload<ExtArgs>;
            fields: Prisma.eventos_operativosFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.eventos_operativosFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.eventos_operativosFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>;
                };
                findFirst: {
                    args: Prisma.eventos_operativosFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.eventos_operativosFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>;
                };
                findMany: {
                    args: Prisma.eventos_operativosFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>[];
                };
                create: {
                    args: Prisma.eventos_operativosCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>;
                };
                createMany: {
                    args: Prisma.eventos_operativosCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.eventos_operativosCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>[];
                };
                delete: {
                    args: Prisma.eventos_operativosDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>;
                };
                update: {
                    args: Prisma.eventos_operativosUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>;
                };
                deleteMany: {
                    args: Prisma.eventos_operativosDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.eventos_operativosUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.eventos_operativosUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>[];
                };
                upsert: {
                    args: Prisma.eventos_operativosUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_operativosPayload>;
                };
                aggregate: {
                    args: Prisma.Eventos_operativosAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEventos_operativos>;
                };
                groupBy: {
                    args: Prisma.eventos_operativosGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Eventos_operativosGroupByOutputType>[];
                };
                count: {
                    args: Prisma.eventos_operativosCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Eventos_operativosCountAggregateOutputType> | number;
                };
            };
        };
        eventos_monitoreo: {
            payload: Prisma.$eventos_monitoreoPayload<ExtArgs>;
            fields: Prisma.eventos_monitoreoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.eventos_monitoreoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.eventos_monitoreoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>;
                };
                findFirst: {
                    args: Prisma.eventos_monitoreoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.eventos_monitoreoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>;
                };
                findMany: {
                    args: Prisma.eventos_monitoreoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>[];
                };
                create: {
                    args: Prisma.eventos_monitoreoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>;
                };
                createMany: {
                    args: Prisma.eventos_monitoreoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.eventos_monitoreoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>[];
                };
                delete: {
                    args: Prisma.eventos_monitoreoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>;
                };
                update: {
                    args: Prisma.eventos_monitoreoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>;
                };
                deleteMany: {
                    args: Prisma.eventos_monitoreoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.eventos_monitoreoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.eventos_monitoreoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>[];
                };
                upsert: {
                    args: Prisma.eventos_monitoreoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$eventos_monitoreoPayload>;
                };
                aggregate: {
                    args: Prisma.Eventos_monitoreoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEventos_monitoreo>;
                };
                groupBy: {
                    args: Prisma.eventos_monitoreoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Eventos_monitoreoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.eventos_monitoreoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Eventos_monitoreoCountAggregateOutputType> | number;
                };
            };
        };
        evidencias: {
            payload: Prisma.$evidenciasPayload<ExtArgs>;
            fields: Prisma.evidenciasFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.evidenciasFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.evidenciasFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>;
                };
                findFirst: {
                    args: Prisma.evidenciasFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.evidenciasFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>;
                };
                findMany: {
                    args: Prisma.evidenciasFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>[];
                };
                create: {
                    args: Prisma.evidenciasCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>;
                };
                createMany: {
                    args: Prisma.evidenciasCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.evidenciasCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>[];
                };
                delete: {
                    args: Prisma.evidenciasDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>;
                };
                update: {
                    args: Prisma.evidenciasUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>;
                };
                deleteMany: {
                    args: Prisma.evidenciasDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.evidenciasUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.evidenciasUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>[];
                };
                upsert: {
                    args: Prisma.evidenciasUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidenciasPayload>;
                };
                aggregate: {
                    args: Prisma.EvidenciasAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEvidencias>;
                };
                groupBy: {
                    args: Prisma.evidenciasGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EvidenciasGroupByOutputType>[];
                };
                count: {
                    args: Prisma.evidenciasCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EvidenciasCountAggregateOutputType> | number;
                };
            };
        };
        evidencias_evento: {
            payload: Prisma.$evidencias_eventoPayload<ExtArgs>;
            fields: Prisma.evidencias_eventoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.evidencias_eventoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.evidencias_eventoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>;
                };
                findFirst: {
                    args: Prisma.evidencias_eventoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.evidencias_eventoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>;
                };
                findMany: {
                    args: Prisma.evidencias_eventoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>[];
                };
                create: {
                    args: Prisma.evidencias_eventoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>;
                };
                createMany: {
                    args: Prisma.evidencias_eventoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.evidencias_eventoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>[];
                };
                delete: {
                    args: Prisma.evidencias_eventoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>;
                };
                update: {
                    args: Prisma.evidencias_eventoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>;
                };
                deleteMany: {
                    args: Prisma.evidencias_eventoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.evidencias_eventoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.evidencias_eventoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>[];
                };
                upsert: {
                    args: Prisma.evidencias_eventoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$evidencias_eventoPayload>;
                };
                aggregate: {
                    args: Prisma.Evidencias_eventoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEvidencias_evento>;
                };
                groupBy: {
                    args: Prisma.evidencias_eventoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Evidencias_eventoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.evidencias_eventoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Evidencias_eventoCountAggregateOutputType> | number;
                };
            };
        };
        historial_indicadores: {
            payload: Prisma.$historial_indicadoresPayload<ExtArgs>;
            fields: Prisma.historial_indicadoresFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.historial_indicadoresFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.historial_indicadoresFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>;
                };
                findFirst: {
                    args: Prisma.historial_indicadoresFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.historial_indicadoresFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>;
                };
                findMany: {
                    args: Prisma.historial_indicadoresFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>[];
                };
                create: {
                    args: Prisma.historial_indicadoresCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>;
                };
                createMany: {
                    args: Prisma.historial_indicadoresCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.historial_indicadoresCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>[];
                };
                delete: {
                    args: Prisma.historial_indicadoresDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>;
                };
                update: {
                    args: Prisma.historial_indicadoresUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>;
                };
                deleteMany: {
                    args: Prisma.historial_indicadoresDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.historial_indicadoresUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.historial_indicadoresUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>[];
                };
                upsert: {
                    args: Prisma.historial_indicadoresUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historial_indicadoresPayload>;
                };
                aggregate: {
                    args: Prisma.Historial_indicadoresAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHistorial_indicadores>;
                };
                groupBy: {
                    args: Prisma.historial_indicadoresGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Historial_indicadoresGroupByOutputType>[];
                };
                count: {
                    args: Prisma.historial_indicadoresCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Historial_indicadoresCountAggregateOutputType> | number;
                };
            };
        };
        incidencias: {
            payload: Prisma.$incidenciasPayload<ExtArgs>;
            fields: Prisma.incidenciasFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.incidenciasFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.incidenciasFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>;
                };
                findFirst: {
                    args: Prisma.incidenciasFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.incidenciasFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>;
                };
                findMany: {
                    args: Prisma.incidenciasFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>[];
                };
                create: {
                    args: Prisma.incidenciasCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>;
                };
                createMany: {
                    args: Prisma.incidenciasCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.incidenciasCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>[];
                };
                delete: {
                    args: Prisma.incidenciasDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>;
                };
                update: {
                    args: Prisma.incidenciasUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>;
                };
                deleteMany: {
                    args: Prisma.incidenciasDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.incidenciasUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.incidenciasUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>[];
                };
                upsert: {
                    args: Prisma.incidenciasUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$incidenciasPayload>;
                };
                aggregate: {
                    args: Prisma.IncidenciasAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIncidencias>;
                };
                groupBy: {
                    args: Prisma.incidenciasGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IncidenciasGroupByOutputType>[];
                };
                count: {
                    args: Prisma.incidenciasCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IncidenciasCountAggregateOutputType> | number;
                };
            };
        };
        indicadores: {
            payload: Prisma.$indicadoresPayload<ExtArgs>;
            fields: Prisma.indicadoresFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.indicadoresFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.indicadoresFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>;
                };
                findFirst: {
                    args: Prisma.indicadoresFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.indicadoresFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>;
                };
                findMany: {
                    args: Prisma.indicadoresFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>[];
                };
                create: {
                    args: Prisma.indicadoresCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>;
                };
                createMany: {
                    args: Prisma.indicadoresCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.indicadoresCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>[];
                };
                delete: {
                    args: Prisma.indicadoresDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>;
                };
                update: {
                    args: Prisma.indicadoresUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>;
                };
                deleteMany: {
                    args: Prisma.indicadoresDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.indicadoresUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.indicadoresUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>[];
                };
                upsert: {
                    args: Prisma.indicadoresUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$indicadoresPayload>;
                };
                aggregate: {
                    args: Prisma.IndicadoresAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIndicadores>;
                };
                groupBy: {
                    args: Prisma.indicadoresGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IndicadoresGroupByOutputType>[];
                };
                count: {
                    args: Prisma.indicadoresCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IndicadoresCountAggregateOutputType> | number;
                };
            };
        };
        timeline_caso: {
            payload: Prisma.$timeline_casoPayload<ExtArgs>;
            fields: Prisma.timeline_casoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.timeline_casoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.timeline_casoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>;
                };
                findFirst: {
                    args: Prisma.timeline_casoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.timeline_casoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>;
                };
                findMany: {
                    args: Prisma.timeline_casoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>[];
                };
                create: {
                    args: Prisma.timeline_casoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>;
                };
                createMany: {
                    args: Prisma.timeline_casoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.timeline_casoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>[];
                };
                delete: {
                    args: Prisma.timeline_casoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>;
                };
                update: {
                    args: Prisma.timeline_casoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>;
                };
                deleteMany: {
                    args: Prisma.timeline_casoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.timeline_casoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.timeline_casoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>[];
                };
                upsert: {
                    args: Prisma.timeline_casoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$timeline_casoPayload>;
                };
                aggregate: {
                    args: Prisma.Timeline_casoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTimeline_caso>;
                };
                groupBy: {
                    args: Prisma.timeline_casoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Timeline_casoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.timeline_casoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Timeline_casoCountAggregateOutputType> | number;
                };
            };
        };
        investigacion_caso: {
            payload: Prisma.$investigacion_casoPayload<ExtArgs>;
            fields: Prisma.investigacion_casoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.investigacion_casoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.investigacion_casoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>;
                };
                findFirst: {
                    args: Prisma.investigacion_casoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.investigacion_casoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>;
                };
                findMany: {
                    args: Prisma.investigacion_casoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>[];
                };
                create: {
                    args: Prisma.investigacion_casoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>;
                };
                createMany: {
                    args: Prisma.investigacion_casoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.investigacion_casoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>[];
                };
                delete: {
                    args: Prisma.investigacion_casoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>;
                };
                update: {
                    args: Prisma.investigacion_casoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>;
                };
                deleteMany: {
                    args: Prisma.investigacion_casoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.investigacion_casoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.investigacion_casoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>[];
                };
                upsert: {
                    args: Prisma.investigacion_casoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacion_casoPayload>;
                };
                aggregate: {
                    args: Prisma.Investigacion_casoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInvestigacion_caso>;
                };
                groupBy: {
                    args: Prisma.investigacion_casoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Investigacion_casoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.investigacion_casoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Investigacion_casoCountAggregateOutputType> | number;
                };
            };
        };
        investigaciones: {
            payload: Prisma.$investigacionesPayload<ExtArgs>;
            fields: Prisma.investigacionesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.investigacionesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.investigacionesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>;
                };
                findFirst: {
                    args: Prisma.investigacionesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.investigacionesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>;
                };
                findMany: {
                    args: Prisma.investigacionesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>[];
                };
                create: {
                    args: Prisma.investigacionesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>;
                };
                createMany: {
                    args: Prisma.investigacionesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.investigacionesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>[];
                };
                delete: {
                    args: Prisma.investigacionesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>;
                };
                update: {
                    args: Prisma.investigacionesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>;
                };
                deleteMany: {
                    args: Prisma.investigacionesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.investigacionesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.investigacionesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>[];
                };
                upsert: {
                    args: Prisma.investigacionesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$investigacionesPayload>;
                };
                aggregate: {
                    args: Prisma.InvestigacionesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInvestigaciones>;
                };
                groupBy: {
                    args: Prisma.investigacionesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InvestigacionesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.investigacionesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InvestigacionesCountAggregateOutputType> | number;
                };
            };
        };
        logs_sistema: {
            payload: Prisma.$logs_sistemaPayload<ExtArgs>;
            fields: Prisma.logs_sistemaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.logs_sistemaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.logs_sistemaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>;
                };
                findFirst: {
                    args: Prisma.logs_sistemaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.logs_sistemaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>;
                };
                findMany: {
                    args: Prisma.logs_sistemaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>[];
                };
                create: {
                    args: Prisma.logs_sistemaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>;
                };
                createMany: {
                    args: Prisma.logs_sistemaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.logs_sistemaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>[];
                };
                delete: {
                    args: Prisma.logs_sistemaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>;
                };
                update: {
                    args: Prisma.logs_sistemaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>;
                };
                deleteMany: {
                    args: Prisma.logs_sistemaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.logs_sistemaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.logs_sistemaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>[];
                };
                upsert: {
                    args: Prisma.logs_sistemaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$logs_sistemaPayload>;
                };
                aggregate: {
                    args: Prisma.Logs_sistemaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogs_sistema>;
                };
                groupBy: {
                    args: Prisma.logs_sistemaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Logs_sistemaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.logs_sistemaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Logs_sistemaCountAggregateOutputType> | number;
                };
            };
        };
        metas_indicadores: {
            payload: Prisma.$metas_indicadoresPayload<ExtArgs>;
            fields: Prisma.metas_indicadoresFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.metas_indicadoresFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.metas_indicadoresFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>;
                };
                findFirst: {
                    args: Prisma.metas_indicadoresFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.metas_indicadoresFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>;
                };
                findMany: {
                    args: Prisma.metas_indicadoresFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>[];
                };
                create: {
                    args: Prisma.metas_indicadoresCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>;
                };
                createMany: {
                    args: Prisma.metas_indicadoresCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.metas_indicadoresCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>[];
                };
                delete: {
                    args: Prisma.metas_indicadoresDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>;
                };
                update: {
                    args: Prisma.metas_indicadoresUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>;
                };
                deleteMany: {
                    args: Prisma.metas_indicadoresDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.metas_indicadoresUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.metas_indicadoresUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>[];
                };
                upsert: {
                    args: Prisma.metas_indicadoresUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$metas_indicadoresPayload>;
                };
                aggregate: {
                    args: Prisma.Metas_indicadoresAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMetas_indicadores>;
                };
                groupBy: {
                    args: Prisma.metas_indicadoresGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Metas_indicadoresGroupByOutputType>[];
                };
                count: {
                    args: Prisma.metas_indicadoresCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Metas_indicadoresCountAggregateOutputType> | number;
                };
            };
        };
        notificaciones: {
            payload: Prisma.$notificacionesPayload<ExtArgs>;
            fields: Prisma.notificacionesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.notificacionesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.notificacionesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>;
                };
                findFirst: {
                    args: Prisma.notificacionesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.notificacionesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>;
                };
                findMany: {
                    args: Prisma.notificacionesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>[];
                };
                create: {
                    args: Prisma.notificacionesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>;
                };
                createMany: {
                    args: Prisma.notificacionesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.notificacionesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>[];
                };
                delete: {
                    args: Prisma.notificacionesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>;
                };
                update: {
                    args: Prisma.notificacionesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>;
                };
                deleteMany: {
                    args: Prisma.notificacionesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.notificacionesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.notificacionesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>[];
                };
                upsert: {
                    args: Prisma.notificacionesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificacionesPayload>;
                };
                aggregate: {
                    args: Prisma.NotificacionesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificaciones>;
                };
                groupBy: {
                    args: Prisma.notificacionesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificacionesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.notificacionesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificacionesCountAggregateOutputType> | number;
                };
            };
        };
        planes_accion: {
            payload: Prisma.$planes_accionPayload<ExtArgs>;
            fields: Prisma.planes_accionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.planes_accionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.planes_accionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>;
                };
                findFirst: {
                    args: Prisma.planes_accionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.planes_accionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>;
                };
                findMany: {
                    args: Prisma.planes_accionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>[];
                };
                create: {
                    args: Prisma.planes_accionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>;
                };
                createMany: {
                    args: Prisma.planes_accionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.planes_accionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>[];
                };
                delete: {
                    args: Prisma.planes_accionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>;
                };
                update: {
                    args: Prisma.planes_accionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>;
                };
                deleteMany: {
                    args: Prisma.planes_accionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.planes_accionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.planes_accionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>[];
                };
                upsert: {
                    args: Prisma.planes_accionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$planes_accionPayload>;
                };
                aggregate: {
                    args: Prisma.Planes_accionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlanes_accion>;
                };
                groupBy: {
                    args: Prisma.planes_accionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Planes_accionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.planes_accionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Planes_accionCountAggregateOutputType> | number;
                };
            };
        };
        reporte_detalle: {
            payload: Prisma.$reporte_detallePayload<ExtArgs>;
            fields: Prisma.reporte_detalleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.reporte_detalleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.reporte_detalleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>;
                };
                findFirst: {
                    args: Prisma.reporte_detalleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.reporte_detalleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>;
                };
                findMany: {
                    args: Prisma.reporte_detalleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>[];
                };
                create: {
                    args: Prisma.reporte_detalleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>;
                };
                createMany: {
                    args: Prisma.reporte_detalleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.reporte_detalleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>[];
                };
                delete: {
                    args: Prisma.reporte_detalleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>;
                };
                update: {
                    args: Prisma.reporte_detalleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>;
                };
                deleteMany: {
                    args: Prisma.reporte_detalleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.reporte_detalleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.reporte_detalleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>[];
                };
                upsert: {
                    args: Prisma.reporte_detalleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_detallePayload>;
                };
                aggregate: {
                    args: Prisma.Reporte_detalleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReporte_detalle>;
                };
                groupBy: {
                    args: Prisma.reporte_detalleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Reporte_detalleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.reporte_detalleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Reporte_detalleCountAggregateOutputType> | number;
                };
            };
        };
        reporte_estadistico: {
            payload: Prisma.$reporte_estadisticoPayload<ExtArgs>;
            fields: Prisma.reporte_estadisticoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.reporte_estadisticoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.reporte_estadisticoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>;
                };
                findFirst: {
                    args: Prisma.reporte_estadisticoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.reporte_estadisticoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>;
                };
                findMany: {
                    args: Prisma.reporte_estadisticoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>[];
                };
                create: {
                    args: Prisma.reporte_estadisticoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>;
                };
                createMany: {
                    args: Prisma.reporte_estadisticoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.reporte_estadisticoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>[];
                };
                delete: {
                    args: Prisma.reporte_estadisticoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>;
                };
                update: {
                    args: Prisma.reporte_estadisticoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>;
                };
                deleteMany: {
                    args: Prisma.reporte_estadisticoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.reporte_estadisticoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.reporte_estadisticoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>[];
                };
                upsert: {
                    args: Prisma.reporte_estadisticoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$reporte_estadisticoPayload>;
                };
                aggregate: {
                    args: Prisma.Reporte_estadisticoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReporte_estadistico>;
                };
                groupBy: {
                    args: Prisma.reporte_estadisticoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Reporte_estadisticoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.reporte_estadisticoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Reporte_estadisticoCountAggregateOutputType> | number;
                };
            };
        };
        roles: {
            payload: Prisma.$rolesPayload<ExtArgs>;
            fields: Prisma.rolesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.rolesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.rolesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                findFirst: {
                    args: Prisma.rolesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.rolesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                findMany: {
                    args: Prisma.rolesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                create: {
                    args: Prisma.rolesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                createMany: {
                    args: Prisma.rolesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.rolesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                delete: {
                    args: Prisma.rolesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                update: {
                    args: Prisma.rolesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                deleteMany: {
                    args: Prisma.rolesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.rolesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.rolesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                upsert: {
                    args: Prisma.rolesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                aggregate: {
                    args: Prisma.RolesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoles>;
                };
                groupBy: {
                    args: Prisma.rolesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.rolesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolesCountAggregateOutputType> | number;
                };
            };
        };
        seguimientos: {
            payload: Prisma.$seguimientosPayload<ExtArgs>;
            fields: Prisma.seguimientosFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.seguimientosFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.seguimientosFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>;
                };
                findFirst: {
                    args: Prisma.seguimientosFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.seguimientosFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>;
                };
                findMany: {
                    args: Prisma.seguimientosFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>[];
                };
                create: {
                    args: Prisma.seguimientosCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>;
                };
                createMany: {
                    args: Prisma.seguimientosCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.seguimientosCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>[];
                };
                delete: {
                    args: Prisma.seguimientosDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>;
                };
                update: {
                    args: Prisma.seguimientosUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>;
                };
                deleteMany: {
                    args: Prisma.seguimientosDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.seguimientosUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.seguimientosUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>[];
                };
                upsert: {
                    args: Prisma.seguimientosUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$seguimientosPayload>;
                };
                aggregate: {
                    args: Prisma.SeguimientosAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSeguimientos>;
                };
                groupBy: {
                    args: Prisma.seguimientosGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SeguimientosGroupByOutputType>[];
                };
                count: {
                    args: Prisma.seguimientosCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SeguimientosCountAggregateOutputType> | number;
                };
            };
        };
        sesiones: {
            payload: Prisma.$sesionesPayload<ExtArgs>;
            fields: Prisma.sesionesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.sesionesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.sesionesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>;
                };
                findFirst: {
                    args: Prisma.sesionesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.sesionesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>;
                };
                findMany: {
                    args: Prisma.sesionesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>[];
                };
                create: {
                    args: Prisma.sesionesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>;
                };
                createMany: {
                    args: Prisma.sesionesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.sesionesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>[];
                };
                delete: {
                    args: Prisma.sesionesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>;
                };
                update: {
                    args: Prisma.sesionesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>;
                };
                deleteMany: {
                    args: Prisma.sesionesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.sesionesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.sesionesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>[];
                };
                upsert: {
                    args: Prisma.sesionesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sesionesPayload>;
                };
                aggregate: {
                    args: Prisma.SesionesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSesiones>;
                };
                groupBy: {
                    args: Prisma.sesionesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SesionesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.sesionesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SesionesCountAggregateOutputType> | number;
                };
            };
        };
        solicitudes_informacion: {
            payload: Prisma.$solicitudes_informacionPayload<ExtArgs>;
            fields: Prisma.solicitudes_informacionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.solicitudes_informacionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.solicitudes_informacionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>;
                };
                findFirst: {
                    args: Prisma.solicitudes_informacionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.solicitudes_informacionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>;
                };
                findMany: {
                    args: Prisma.solicitudes_informacionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>[];
                };
                create: {
                    args: Prisma.solicitudes_informacionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>;
                };
                createMany: {
                    args: Prisma.solicitudes_informacionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.solicitudes_informacionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>[];
                };
                delete: {
                    args: Prisma.solicitudes_informacionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>;
                };
                update: {
                    args: Prisma.solicitudes_informacionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>;
                };
                deleteMany: {
                    args: Prisma.solicitudes_informacionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.solicitudes_informacionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.solicitudes_informacionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>[];
                };
                upsert: {
                    args: Prisma.solicitudes_informacionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_informacionPayload>;
                };
                aggregate: {
                    args: Prisma.Solicitudes_informacionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSolicitudes_informacion>;
                };
                groupBy: {
                    args: Prisma.solicitudes_informacionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitudes_informacionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.solicitudes_informacionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitudes_informacionCountAggregateOutputType> | number;
                };
            };
        };
        solicitudes_prorroga: {
            payload: Prisma.$solicitudes_prorrogaPayload<ExtArgs>;
            fields: Prisma.solicitudes_prorrogaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.solicitudes_prorrogaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.solicitudes_prorrogaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>;
                };
                findFirst: {
                    args: Prisma.solicitudes_prorrogaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.solicitudes_prorrogaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>;
                };
                findMany: {
                    args: Prisma.solicitudes_prorrogaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>[];
                };
                create: {
                    args: Prisma.solicitudes_prorrogaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>;
                };
                createMany: {
                    args: Prisma.solicitudes_prorrogaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.solicitudes_prorrogaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>[];
                };
                delete: {
                    args: Prisma.solicitudes_prorrogaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>;
                };
                update: {
                    args: Prisma.solicitudes_prorrogaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>;
                };
                deleteMany: {
                    args: Prisma.solicitudes_prorrogaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.solicitudes_prorrogaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.solicitudes_prorrogaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>[];
                };
                upsert: {
                    args: Prisma.solicitudes_prorrogaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_prorrogaPayload>;
                };
                aggregate: {
                    args: Prisma.Solicitudes_prorrogaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSolicitudes_prorroga>;
                };
                groupBy: {
                    args: Prisma.solicitudes_prorrogaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitudes_prorrogaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.solicitudes_prorrogaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitudes_prorrogaCountAggregateOutputType> | number;
                };
            };
        };
        usuarios: {
            payload: Prisma.$usuariosPayload<ExtArgs>;
            fields: Prisma.usuariosFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.usuariosFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.usuariosFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                findFirst: {
                    args: Prisma.usuariosFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.usuariosFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                findMany: {
                    args: Prisma.usuariosFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>[];
                };
                create: {
                    args: Prisma.usuariosCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                createMany: {
                    args: Prisma.usuariosCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.usuariosCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>[];
                };
                delete: {
                    args: Prisma.usuariosDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                update: {
                    args: Prisma.usuariosUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                deleteMany: {
                    args: Prisma.usuariosDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.usuariosUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.usuariosUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>[];
                };
                upsert: {
                    args: Prisma.usuariosUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                aggregate: {
                    args: Prisma.UsuariosAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsuarios>;
                };
                groupBy: {
                    args: Prisma.usuariosGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuariosGroupByOutputType>[];
                };
                count: {
                    args: Prisma.usuariosCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuariosCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Actividades_planScalarFieldEnum: {
    readonly id_actividad: "id_actividad";
    readonly id_plan: "id_plan";
    readonly descripcion: "descripcion";
    readonly responsable: "responsable";
    readonly fecha_inicio: "fecha_inicio";
    readonly fecha_fin: "fecha_fin";
    readonly porcentaje: "porcentaje";
    readonly estado: "estado";
    readonly created_at: "created_at";
};
export type Actividades_planScalarFieldEnum = (typeof Actividades_planScalarFieldEnum)[keyof typeof Actividades_planScalarFieldEnum];
export declare const Anexos_casoScalarFieldEnum: {
    readonly id_anexo: "id_anexo";
    readonly id_caso: "id_caso";
    readonly nombre_archivo: "nombre_archivo";
    readonly ruta_archivo: "ruta_archivo";
    readonly tipo_archivo: "tipo_archivo";
    readonly peso: "peso";
    readonly fecha_subida: "fecha_subida";
    readonly usuario_subida: "usuario_subida";
};
export type Anexos_casoScalarFieldEnum = (typeof Anexos_casoScalarFieldEnum)[keyof typeof Anexos_casoScalarFieldEnum];
export declare const AreasScalarFieldEnum: {
    readonly id_area: "id_area";
    readonly nombre_area: "nombre_area";
};
export type AreasScalarFieldEnum = (typeof AreasScalarFieldEnum)[keyof typeof AreasScalarFieldEnum];
export declare const AuditoriaScalarFieldEnum: {
    readonly id_auditoria: "id_auditoria";
    readonly tabla_afectada: "tabla_afectada";
    readonly id_registro: "id_registro";
    readonly accion: "accion";
    readonly descripcion: "descripcion";
    readonly usuario: "usuario";
    readonly ip: "ip";
    readonly fecha: "fecha";
};
export type AuditoriaScalarFieldEnum = (typeof AuditoriaScalarFieldEnum)[keyof typeof AuditoriaScalarFieldEnum];
export declare const BitacoraScalarFieldEnum: {
    readonly id_bitacora: "id_bitacora";
    readonly usuario: "usuario";
    readonly modulo: "modulo";
    readonly accion: "accion";
    readonly descripcion: "descripcion";
    readonly fecha: "fecha";
    readonly datos_previos: "datos_previos";
    readonly datos_nuevos: "datos_nuevos";
};
export type BitacoraScalarFieldEnum = (typeof BitacoraScalarFieldEnum)[keyof typeof BitacoraScalarFieldEnum];
export declare const Casos_sopScalarFieldEnum: {
    readonly id_caso: "id_caso";
    readonly codigo_sop: "codigo_sop";
    readonly titulo: "titulo";
    readonly nombre_reportante: "nombre_reportante";
    readonly correo_reportante: "correo_reportante";
    readonly telefono_reportante: "telefono_reportante";
    readonly fecha_hallazgo: "fecha_hallazgo";
    readonly fecha_evento: "fecha_evento";
    readonly estado_hallazgo: "estado_hallazgo";
    readonly dias_abierto: "dias_abierto";
    readonly procedencia: "procedencia";
    readonly tipo: "tipo";
    readonly descripcion: "descripcion";
    readonly responsable_hallazgo: "responsable_hallazgo";
    readonly tipo_sop: "tipo_sop";
    readonly subtipo_sop: "subtipo_sop";
    readonly peligro: "peligro";
    readonly consecuencia: "consecuencia";
    readonly descripcion_evento: "descripcion_evento";
    readonly clasificacion: "clasificacion";
    readonly analisis_riesgo: "analisis_riesgo";
    readonly acr: "acr";
    readonly area_responsable: "area_responsable";
    readonly responsable_plan: "responsable_plan";
    readonly estado_plan: "estado_plan";
    readonly fecha_plan: "fecha_plan";
    readonly fecha_reprogramada: "fecha_reprogramada";
    readonly dias_abierto_plan: "dias_abierto_plan";
    readonly observaciones: "observaciones";
    readonly created_by: "created_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Casos_sopScalarFieldEnum = (typeof Casos_sopScalarFieldEnum)[keyof typeof Casos_sopScalarFieldEnum];
export declare const Catalogo_detalleScalarFieldEnum: {
    readonly id_detalle: "id_detalle";
    readonly id_catalogo: "id_catalogo";
    readonly codigo: "codigo";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly orden: "orden";
    readonly color: "color";
    readonly estado: "estado";
    readonly created_at: "created_at";
};
export type Catalogo_detalleScalarFieldEnum = (typeof Catalogo_detalleScalarFieldEnum)[keyof typeof Catalogo_detalleScalarFieldEnum];
export declare const CatalogosScalarFieldEnum: {
    readonly id_catalogo: "id_catalogo";
    readonly codigo: "codigo";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly estado: "estado";
    readonly created_at: "created_at";
};
export type CatalogosScalarFieldEnum = (typeof CatalogosScalarFieldEnum)[keyof typeof CatalogosScalarFieldEnum];
export declare const ConfiguracionScalarFieldEnum: {
    readonly id_config: "id_config";
    readonly nombre: "nombre";
    readonly valor: "valor";
    readonly descripcion: "descripcion";
};
export type ConfiguracionScalarFieldEnum = (typeof ConfiguracionScalarFieldEnum)[keyof typeof ConfiguracionScalarFieldEnum];
export declare const Dashboard_indicadoresScalarFieldEnum: {
    readonly id: "id";
    readonly id_dashboard: "id_dashboard";
    readonly id_indicador: "id_indicador";
    readonly posicion: "posicion";
};
export type Dashboard_indicadoresScalarFieldEnum = (typeof Dashboard_indicadoresScalarFieldEnum)[keyof typeof Dashboard_indicadoresScalarFieldEnum];
export declare const DashboardsScalarFieldEnum: {
    readonly id_dashboard: "id_dashboard";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly activo: "activo";
    readonly created_at: "created_at";
};
export type DashboardsScalarFieldEnum = (typeof DashboardsScalarFieldEnum)[keyof typeof DashboardsScalarFieldEnum];
export declare const EstacionesScalarFieldEnum: {
    readonly id_estacion: "id_estacion";
    readonly nombre_estacion: "nombre_estacion";
};
export type EstacionesScalarFieldEnum = (typeof EstacionesScalarFieldEnum)[keyof typeof EstacionesScalarFieldEnum];
export declare const Evento_casoScalarFieldEnum: {
    readonly id: "id";
    readonly id_evento: "id_evento";
    readonly id_caso: "id_caso";
    readonly fecha_conversion: "fecha_conversion";
    readonly usuario: "usuario";
};
export type Evento_casoScalarFieldEnum = (typeof Evento_casoScalarFieldEnum)[keyof typeof Evento_casoScalarFieldEnum];
export declare const Eventos_operativosScalarFieldEnum: {
    readonly id_evento: "id_evento";
    readonly codigo_evento: "codigo_evento";
    readonly fecha: "fecha";
    readonly hora: "hora";
    readonly anio: "anio";
    readonly mes: "mes";
    readonly semana: "semana";
    readonly dia: "dia";
    readonly rango_horario: "rango_horario";
    readonly tipo_incidente: "tipo_incidente";
    readonly descripcion: "descripcion";
    readonly ubicacion: "ubicacion";
    readonly tipo_via: "tipo_via";
    readonly direccion_via: "direccion_via";
    readonly lugar_incidente: "lugar_incidente";
    readonly modelo_mr: "modelo_mr";
    readonly numero_mr: "numero_mr";
    readonly numero_carrera: "numero_carrera";
    readonly personal_involucrado: "personal_involucrado";
    readonly tipo_causa: "tipo_causa";
    readonly posible_causa: "posible_causa";
    readonly informacion_adicional: "informacion_adicional";
    readonly camara_monitoreada: "camara_monitoreada";
    readonly demora: "demora";
    readonly estado: "estado";
    readonly usuario_registra: "usuario_registra";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Eventos_operativosScalarFieldEnum = (typeof Eventos_operativosScalarFieldEnum)[keyof typeof Eventos_operativosScalarFieldEnum];
export declare const Eventos_monitoreoScalarFieldEnum: {
    readonly id_evento: "id_evento";
    readonly codigo_evento: "codigo_evento";
    readonly fecha: "fecha";
    readonly hora: "hora";
    readonly anio: "anio";
    readonly mes: "mes";
    readonly semana: "semana";
    readonly dia: "dia";
    readonly rango_horario: "rango_horario";
    readonly tipo_incidente: "tipo_incidente";
    readonly descripcion: "descripcion";
    readonly ubicacion: "ubicacion";
    readonly tipo_via: "tipo_via";
    readonly direccion_via: "direccion_via";
    readonly lugar_incidente: "lugar_incidente";
    readonly modelo_mr: "modelo_mr";
    readonly numero_mr: "numero_mr";
    readonly numero_carrera: "numero_carrera";
    readonly personal_involucrado: "personal_involucrado";
    readonly tipo_causa: "tipo_causa";
    readonly posible_causa: "posible_causa";
    readonly informacion_adicional: "informacion_adicional";
    readonly camara_monitoreada: "camara_monitoreada";
    readonly demora: "demora";
    readonly estado: "estado";
    readonly usuario_registra: "usuario_registra";
    readonly asignado_a: "asignado_a";
    readonly id_caso_creado: "id_caso_creado";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Eventos_monitoreoScalarFieldEnum = (typeof Eventos_monitoreoScalarFieldEnum)[keyof typeof Eventos_monitoreoScalarFieldEnum];
export declare const EvidenciasScalarFieldEnum: {
    readonly id_evidencia: "id_evidencia";
    readonly id_incidencia: "id_incidencia";
    readonly ruta_archivo: "ruta_archivo";
    readonly tipo_archivo: "tipo_archivo";
    readonly fecha_subida: "fecha_subida";
};
export type EvidenciasScalarFieldEnum = (typeof EvidenciasScalarFieldEnum)[keyof typeof EvidenciasScalarFieldEnum];
export declare const Evidencias_eventoScalarFieldEnum: {
    readonly id_evidencia: "id_evidencia";
    readonly id_evento: "id_evento";
    readonly nombre_archivo: "nombre_archivo";
    readonly ruta_archivo: "ruta_archivo";
    readonly tipo_archivo: "tipo_archivo";
    readonly peso: "peso";
    readonly usuario: "usuario";
    readonly fecha_subida: "fecha_subida";
};
export type Evidencias_eventoScalarFieldEnum = (typeof Evidencias_eventoScalarFieldEnum)[keyof typeof Evidencias_eventoScalarFieldEnum];
export declare const Historial_indicadoresScalarFieldEnum: {
    readonly id_historial: "id_historial";
    readonly id_indicador: "id_indicador";
    readonly fecha: "fecha";
    readonly valor: "valor";
    readonly observacion: "observacion";
};
export type Historial_indicadoresScalarFieldEnum = (typeof Historial_indicadoresScalarFieldEnum)[keyof typeof Historial_indicadoresScalarFieldEnum];
export declare const IncidenciasScalarFieldEnum: {
    readonly id_incidencia: "id_incidencia";
    readonly codigo_incidencia: "codigo_incidencia";
    readonly tipo_evento: "tipo_evento";
    readonly descripcion: "descripcion";
    readonly nivel_riesgo: "nivel_riesgo";
    readonly estado: "estado";
    readonly fecha_registro: "fecha_registro";
    readonly fecha_limite: "fecha_limite";
    readonly id_usuario_reporta: "id_usuario_reporta";
    readonly id_estacion: "id_estacion";
    readonly id_area_responsable: "id_area_responsable";
};
export type IncidenciasScalarFieldEnum = (typeof IncidenciasScalarFieldEnum)[keyof typeof IncidenciasScalarFieldEnum];
export declare const IndicadoresScalarFieldEnum: {
    readonly id_indicador: "id_indicador";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly tipo: "tipo";
    readonly unidad_medida: "unidad_medida";
    readonly formula: "formula";
    readonly activo: "activo";
};
export type IndicadoresScalarFieldEnum = (typeof IndicadoresScalarFieldEnum)[keyof typeof IndicadoresScalarFieldEnum];
export declare const Timeline_casoScalarFieldEnum: {
    readonly id_evento: "id_evento";
    readonly id_caso: "id_caso";
    readonly kind: "kind";
    readonly actor: "actor";
    readonly actor_rol: "actor_rol";
    readonly titulo: "titulo";
    readonly detalle: "detalle";
    readonly fecha: "fecha";
};
export type Timeline_casoScalarFieldEnum = (typeof Timeline_casoScalarFieldEnum)[keyof typeof Timeline_casoScalarFieldEnum];
export declare const Investigacion_casoScalarFieldEnum: {
    readonly id_investigacion: "id_investigacion";
    readonly id_caso: "id_caso";
    readonly hallazgos: "hallazgos";
    readonly causa_raiz: "causa_raiz";
    readonly conclusiones: "conclusiones";
    readonly observaciones: "observaciones";
    readonly investigador: "investigador";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Investigacion_casoScalarFieldEnum = (typeof Investigacion_casoScalarFieldEnum)[keyof typeof Investigacion_casoScalarFieldEnum];
export declare const InvestigacionesScalarFieldEnum: {
    readonly id_investigacion: "id_investigacion";
    readonly id_incidencia: "id_incidencia";
    readonly causa_raiz: "causa_raiz";
    readonly plan_accion: "plan_accion";
    readonly id_usuario_investigador: "id_usuario_investigador";
    readonly fecha_investigacion: "fecha_investigacion";
};
export type InvestigacionesScalarFieldEnum = (typeof InvestigacionesScalarFieldEnum)[keyof typeof InvestigacionesScalarFieldEnum];
export declare const Logs_sistemaScalarFieldEnum: {
    readonly id_log: "id_log";
    readonly modulo: "modulo";
    readonly nivel: "nivel";
    readonly mensaje: "mensaje";
    readonly stack_trace: "stack_trace";
    readonly usuario: "usuario";
    readonly fecha: "fecha";
};
export type Logs_sistemaScalarFieldEnum = (typeof Logs_sistemaScalarFieldEnum)[keyof typeof Logs_sistemaScalarFieldEnum];
export declare const Metas_indicadoresScalarFieldEnum: {
    readonly id_meta: "id_meta";
    readonly id_indicador: "id_indicador";
    readonly anio: "anio";
    readonly mes: "mes";
    readonly valor_meta: "valor_meta";
};
export type Metas_indicadoresScalarFieldEnum = (typeof Metas_indicadoresScalarFieldEnum)[keyof typeof Metas_indicadoresScalarFieldEnum];
export declare const NotificacionesScalarFieldEnum: {
    readonly id_notificacion: "id_notificacion";
    readonly usuario: "usuario";
    readonly titulo: "titulo";
    readonly mensaje: "mensaje";
    readonly tipo: "tipo";
    readonly leido: "leido";
    readonly fecha: "fecha";
};
export type NotificacionesScalarFieldEnum = (typeof NotificacionesScalarFieldEnum)[keyof typeof NotificacionesScalarFieldEnum];
export declare const Planes_accionScalarFieldEnum: {
    readonly id_plan: "id_plan";
    readonly id_caso: "id_caso";
    readonly codigo_plan: "codigo_plan";
    readonly descripcion: "descripcion";
    readonly id_area: "id_area";
    readonly responsable: "responsable";
    readonly estado: "estado";
    readonly fecha_plan: "fecha_plan";
    readonly fecha_reprogramada: "fecha_reprogramada";
    readonly dias_abierto: "dias_abierto";
    readonly observaciones: "observaciones";
    readonly prorroga_motivo: "prorroga_motivo";
    readonly prorroga_fecha: "prorroga_fecha";
    readonly prorroga_estado: "prorroga_estado";
    readonly prorroga_fecha_sol: "prorroga_fecha_sol";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Planes_accionScalarFieldEnum = (typeof Planes_accionScalarFieldEnum)[keyof typeof Planes_accionScalarFieldEnum];
export declare const Reporte_detalleScalarFieldEnum: {
    readonly id_detalle: "id_detalle";
    readonly id_reporte: "id_reporte";
    readonly indicador: "indicador";
    readonly valor: "valor";
    readonly observacion: "observacion";
};
export type Reporte_detalleScalarFieldEnum = (typeof Reporte_detalleScalarFieldEnum)[keyof typeof Reporte_detalleScalarFieldEnum];
export declare const Reporte_estadisticoScalarFieldEnum: {
    readonly id_reporte: "id_reporte";
    readonly nombre: "nombre";
    readonly descripcion: "descripcion";
    readonly fecha_inicio: "fecha_inicio";
    readonly fecha_fin: "fecha_fin";
    readonly generado_por: "generado_por";
    readonly fecha_generacion: "fecha_generacion";
};
export type Reporte_estadisticoScalarFieldEnum = (typeof Reporte_estadisticoScalarFieldEnum)[keyof typeof Reporte_estadisticoScalarFieldEnum];
export declare const RolesScalarFieldEnum: {
    readonly id_rol: "id_rol";
    readonly nombre_rol: "nombre_rol";
};
export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum];
export declare const SeguimientosScalarFieldEnum: {
    readonly id_seguimiento: "id_seguimiento";
    readonly id_actividad: "id_actividad";
    readonly comentario: "comentario";
    readonly porcentaje: "porcentaje";
    readonly fecha: "fecha";
    readonly usuario: "usuario";
};
export type SeguimientosScalarFieldEnum = (typeof SeguimientosScalarFieldEnum)[keyof typeof SeguimientosScalarFieldEnum];
export declare const SesionesScalarFieldEnum: {
    readonly id_sesion: "id_sesion";
    readonly usuario: "usuario";
    readonly fecha_inicio: "fecha_inicio";
    readonly fecha_fin: "fecha_fin";
    readonly direccion_ip: "direccion_ip";
    readonly navegador: "navegador";
    readonly dispositivo: "dispositivo";
    readonly estado: "estado";
};
export type SesionesScalarFieldEnum = (typeof SesionesScalarFieldEnum)[keyof typeof SesionesScalarFieldEnum];
export declare const Solicitudes_informacionScalarFieldEnum: {
    readonly id_solicitud: "id_solicitud";
    readonly id_caso: "id_caso";
    readonly mensaje: "mensaje";
    readonly respuesta: "respuesta";
    readonly respondida: "respondida";
    readonly estado_previo: "estado_previo";
    readonly fecha_solicitud: "fecha_solicitud";
    readonly fecha_respuesta: "fecha_respuesta";
};
export type Solicitudes_informacionScalarFieldEnum = (typeof Solicitudes_informacionScalarFieldEnum)[keyof typeof Solicitudes_informacionScalarFieldEnum];
export declare const Solicitudes_prorrogaScalarFieldEnum: {
    readonly id_prorroga: "id_prorroga";
    readonly id_incidencia: "id_incidencia";
    readonly motivo: "motivo";
    readonly nueva_fecha_propuesta: "nueva_fecha_propuesta";
    readonly estado_solicitud: "estado_solicitud";
    readonly fecha_solicitud: "fecha_solicitud";
};
export type Solicitudes_prorrogaScalarFieldEnum = (typeof Solicitudes_prorrogaScalarFieldEnum)[keyof typeof Solicitudes_prorrogaScalarFieldEnum];
export declare const UsuariosScalarFieldEnum: {
    readonly id_usuario: "id_usuario";
    readonly codigo_usuario: "codigo_usuario";
    readonly nombre: "nombre";
    readonly cargo: "cargo";
    readonly correo: "correo";
    readonly password_hash: "password_hash";
    readonly telefono: "telefono";
    readonly estado: "estado";
    readonly fecha_ingreso: "fecha_ingreso";
    readonly foto_url: "foto_url";
    readonly ultimo_acceso: "ultimo_acceso";
    readonly es_responsable: "es_responsable";
    readonly id_area: "id_area";
    readonly id_rol: "id_rol";
};
export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Decimal'
 */
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
/**
 * Reference to a field of type 'Decimal[]'
 */
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export type Datasource = {
    url?: string;
};
export type Datasources = {
    db?: Datasource;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
}
export type GlobalOmitConfig = {
    actividades_plan?: Prisma.actividades_planOmit;
    anexos_caso?: Prisma.anexos_casoOmit;
    areas?: Prisma.areasOmit;
    auditoria?: Prisma.auditoriaOmit;
    bitacora?: Prisma.bitacoraOmit;
    casos_sop?: Prisma.casos_sopOmit;
    catalogo_detalle?: Prisma.catalogo_detalleOmit;
    catalogos?: Prisma.catalogosOmit;
    configuracion?: Prisma.configuracionOmit;
    dashboard_indicadores?: Prisma.dashboard_indicadoresOmit;
    dashboards?: Prisma.dashboardsOmit;
    estaciones?: Prisma.estacionesOmit;
    evento_caso?: Prisma.evento_casoOmit;
    eventos_operativos?: Prisma.eventos_operativosOmit;
    eventos_monitoreo?: Prisma.eventos_monitoreoOmit;
    evidencias?: Prisma.evidenciasOmit;
    evidencias_evento?: Prisma.evidencias_eventoOmit;
    historial_indicadores?: Prisma.historial_indicadoresOmit;
    incidencias?: Prisma.incidenciasOmit;
    indicadores?: Prisma.indicadoresOmit;
    timeline_caso?: Prisma.timeline_casoOmit;
    investigacion_caso?: Prisma.investigacion_casoOmit;
    investigaciones?: Prisma.investigacionesOmit;
    logs_sistema?: Prisma.logs_sistemaOmit;
    metas_indicadores?: Prisma.metas_indicadoresOmit;
    notificaciones?: Prisma.notificacionesOmit;
    planes_accion?: Prisma.planes_accionOmit;
    reporte_detalle?: Prisma.reporte_detalleOmit;
    reporte_estadistico?: Prisma.reporte_estadisticoOmit;
    roles?: Prisma.rolesOmit;
    seguimientos?: Prisma.seguimientosOmit;
    sesiones?: Prisma.sesionesOmit;
    solicitudes_informacion?: Prisma.solicitudes_informacionOmit;
    solicitudes_prorroga?: Prisma.solicitudes_prorrogaOmit;
    usuarios?: Prisma.usuariosOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map