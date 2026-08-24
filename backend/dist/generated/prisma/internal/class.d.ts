import * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Actividades_plans
   * const actividades_plans = await prisma.actividades_plan.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options?: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Actividades_plans
 * const actividades_plans = await prisma.actividades_plan.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.actividades_plan`: Exposes CRUD operations for the **actividades_plan** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Actividades_plans
  * const actividades_plans = await prisma.actividades_plan.findMany()
  * ```
  */
    get actividades_plan(): Prisma.actividades_planDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.anexos_caso`: Exposes CRUD operations for the **anexos_caso** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Anexos_casos
      * const anexos_casos = await prisma.anexos_caso.findMany()
      * ```
      */
    get anexos_caso(): Prisma.anexos_casoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.areas`: Exposes CRUD operations for the **areas** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Areas
      * const areas = await prisma.areas.findMany()
      * ```
      */
    get areas(): Prisma.areasDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.auditoria`: Exposes CRUD operations for the **auditoria** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Auditorias
      * const auditorias = await prisma.auditoria.findMany()
      * ```
      */
    get auditoria(): Prisma.auditoriaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.bitacora`: Exposes CRUD operations for the **bitacora** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Bitacoras
      * const bitacoras = await prisma.bitacora.findMany()
      * ```
      */
    get bitacora(): Prisma.bitacoraDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.casos_sop`: Exposes CRUD operations for the **casos_sop** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Casos_sops
      * const casos_sops = await prisma.casos_sop.findMany()
      * ```
      */
    get casos_sop(): Prisma.casos_sopDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.catalogo_detalle`: Exposes CRUD operations for the **catalogo_detalle** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Catalogo_detalles
      * const catalogo_detalles = await prisma.catalogo_detalle.findMany()
      * ```
      */
    get catalogo_detalle(): Prisma.catalogo_detalleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.catalogos`: Exposes CRUD operations for the **catalogos** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Catalogos
      * const catalogos = await prisma.catalogos.findMany()
      * ```
      */
    get catalogos(): Prisma.catalogosDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.configuracion`: Exposes CRUD operations for the **configuracion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Configuracions
      * const configuracions = await prisma.configuracion.findMany()
      * ```
      */
    get configuracion(): Prisma.configuracionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.dashboard_indicadores`: Exposes CRUD operations for the **dashboard_indicadores** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Dashboard_indicadores
      * const dashboard_indicadores = await prisma.dashboard_indicadores.findMany()
      * ```
      */
    get dashboard_indicadores(): Prisma.dashboard_indicadoresDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.dashboards`: Exposes CRUD operations for the **dashboards** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Dashboards
      * const dashboards = await prisma.dashboards.findMany()
      * ```
      */
    get dashboards(): Prisma.dashboardsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.estaciones`: Exposes CRUD operations for the **estaciones** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Estaciones
      * const estaciones = await prisma.estaciones.findMany()
      * ```
      */
    get estaciones(): Prisma.estacionesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.evento_caso`: Exposes CRUD operations for the **evento_caso** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Evento_casos
      * const evento_casos = await prisma.evento_caso.findMany()
      * ```
      */
    get evento_caso(): Prisma.evento_casoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.eventos_operativos`: Exposes CRUD operations for the **eventos_operativos** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Eventos_operativos
      * const eventos_operativos = await prisma.eventos_operativos.findMany()
      * ```
      */
    get eventos_operativos(): Prisma.eventos_operativosDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.eventos_monitoreo`: Exposes CRUD operations for the **eventos_monitoreo** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Eventos_monitoreos
      * const eventos_monitoreos = await prisma.eventos_monitoreo.findMany()
      * ```
      */
    get eventos_monitoreo(): Prisma.eventos_monitoreoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.evidencias`: Exposes CRUD operations for the **evidencias** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Evidencias
      * const evidencias = await prisma.evidencias.findMany()
      * ```
      */
    get evidencias(): Prisma.evidenciasDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.evidencias_evento`: Exposes CRUD operations for the **evidencias_evento** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Evidencias_eventos
      * const evidencias_eventos = await prisma.evidencias_evento.findMany()
      * ```
      */
    get evidencias_evento(): Prisma.evidencias_eventoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.historial_indicadores`: Exposes CRUD operations for the **historial_indicadores** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Historial_indicadores
      * const historial_indicadores = await prisma.historial_indicadores.findMany()
      * ```
      */
    get historial_indicadores(): Prisma.historial_indicadoresDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.incidencias`: Exposes CRUD operations for the **incidencias** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Incidencias
      * const incidencias = await prisma.incidencias.findMany()
      * ```
      */
    get incidencias(): Prisma.incidenciasDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.indicadores`: Exposes CRUD operations for the **indicadores** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Indicadores
      * const indicadores = await prisma.indicadores.findMany()
      * ```
      */
    get indicadores(): Prisma.indicadoresDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.timeline_caso`: Exposes CRUD operations for the **timeline_caso** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Timeline_casos
      * const timeline_casos = await prisma.timeline_caso.findMany()
      * ```
      */
    get timeline_caso(): Prisma.timeline_casoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.investigacion_caso`: Exposes CRUD operations for the **investigacion_caso** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Investigacion_casos
      * const investigacion_casos = await prisma.investigacion_caso.findMany()
      * ```
      */
    get investigacion_caso(): Prisma.investigacion_casoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.investigaciones`: Exposes CRUD operations for the **investigaciones** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Investigaciones
      * const investigaciones = await prisma.investigaciones.findMany()
      * ```
      */
    get investigaciones(): Prisma.investigacionesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.logs_sistema`: Exposes CRUD operations for the **logs_sistema** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Logs_sistemas
      * const logs_sistemas = await prisma.logs_sistema.findMany()
      * ```
      */
    get logs_sistema(): Prisma.logs_sistemaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.metas_indicadores`: Exposes CRUD operations for the **metas_indicadores** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Metas_indicadores
      * const metas_indicadores = await prisma.metas_indicadores.findMany()
      * ```
      */
    get metas_indicadores(): Prisma.metas_indicadoresDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notificaciones`: Exposes CRUD operations for the **notificaciones** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notificaciones
      * const notificaciones = await prisma.notificaciones.findMany()
      * ```
      */
    get notificaciones(): Prisma.notificacionesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.planes_accion`: Exposes CRUD operations for the **planes_accion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Planes_accions
      * const planes_accions = await prisma.planes_accion.findMany()
      * ```
      */
    get planes_accion(): Prisma.planes_accionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.reporte_detalle`: Exposes CRUD operations for the **reporte_detalle** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reporte_detalles
      * const reporte_detalles = await prisma.reporte_detalle.findMany()
      * ```
      */
    get reporte_detalle(): Prisma.reporte_detalleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.reporte_estadistico`: Exposes CRUD operations for the **reporte_estadistico** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reporte_estadisticos
      * const reporte_estadisticos = await prisma.reporte_estadistico.findMany()
      * ```
      */
    get reporte_estadistico(): Prisma.reporte_estadisticoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.roles`: Exposes CRUD operations for the **roles** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Roles
      * const roles = await prisma.roles.findMany()
      * ```
      */
    get roles(): Prisma.rolesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.seguimientos`: Exposes CRUD operations for the **seguimientos** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Seguimientos
      * const seguimientos = await prisma.seguimientos.findMany()
      * ```
      */
    get seguimientos(): Prisma.seguimientosDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.sesiones`: Exposes CRUD operations for the **sesiones** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sesiones
      * const sesiones = await prisma.sesiones.findMany()
      * ```
      */
    get sesiones(): Prisma.sesionesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.solicitudes_informacion`: Exposes CRUD operations for the **solicitudes_informacion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Solicitudes_informacions
      * const solicitudes_informacions = await prisma.solicitudes_informacion.findMany()
      * ```
      */
    get solicitudes_informacion(): Prisma.solicitudes_informacionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.solicitudes_prorroga`: Exposes CRUD operations for the **solicitudes_prorroga** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Solicitudes_prorrogas
      * const solicitudes_prorrogas = await prisma.solicitudes_prorroga.findMany()
      * ```
      */
    get solicitudes_prorroga(): Prisma.solicitudes_prorrogaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.usuarios`: Exposes CRUD operations for the **usuarios** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Usuarios
      * const usuarios = await prisma.usuarios.findMany()
      * ```
      */
    get usuarios(): Prisma.usuariosDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.password_resets`: Exposes CRUD operations for the **password_resets** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Password_resets
      * const password_resets = await prisma.password_resets.findMany()
      * ```
      */
    get password_resets(): Prisma.password_resetsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(dirname: string): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map