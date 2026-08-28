import prisma from "../../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";
type DbClient = typeof prisma | Prisma.TransactionClient;
export interface ConfiguracionGeneral {
    sistema: {
        nombre: string;
        version: string;
    };
    numeracion: {
        prefijoExpedientes: string;
        secuenciaExpedientes: number;
        prefijoPlanes: string;
        secuenciaPlanes: number;
    };
    plazos: {
        diasMaxInvestigacion: number;
        diasResponderPlanes: number;
        diasSolicitarProrroga: number;
    };
    meta: {
        ultimaActualizacion: string | null;
    };
}
export interface ConfiguracionAuditContext {
    usuario?: number | null;
    ip?: string | null;
    user_agent?: string | null;
}
export interface ConfiguracionPublica {
    nombre: string;
    version: string;
}
export declare class ConfiguracionService {
    private static readValues;
    static get(client?: DbClient): Promise<ConfiguracionGeneral>;
    static publica(client?: DbClient): Promise<ConfiguracionPublica>;
    static update(rawBody: unknown, audit?: ConfiguracionAuditContext): Promise<ConfiguracionGeneral>;
    static nextCodigoExpediente(client: DbClient, fecha: Date): Promise<string>;
    static nextCodigosPlan(client: DbClient, codigoSop: string, cantidad: number): Promise<string[]>;
    /**
     * Códigos de plan para muchos casos de una sola vez, para la importación
     * masiva. Antes esto necesitaba traer de golpe los códigos ya ocupados y
     * resolver colisiones a mano en memoria; con la secuencia de Postgres cada
     * código ya sale único, así que alcanza con reservar de una vez tantos
     * valores como códigos se piden en total.
     */
    static nextCodigosPlanBulk(client: DbClient, pedidos: {
        codigoSop: string;
        cantidad: number;
    }[]): Promise<Map<string, string[]>>;
    static nextCodigoPlan(client: DbClient, codigoSop: string): Promise<string>;
    /**
     * Crea las secuencias de Postgres si no existen y las adelanta hasta el
     * máximo ya usado en la base (escaneando `casos_sop`/`planes_accion`) y
     * hasta lo que haya configurado un admin a mano. Se llama una sola vez al
     * arrancar el servidor — después de esto la secuencia misma es la fuente
     * de verdad, no hace falta volver a escanear la tabla en cada reporte.
     */
    static bootstrapSequences(client?: DbClient): Promise<void>;
}
export {};
//# sourceMappingURL=configuracion.service.d.ts.map