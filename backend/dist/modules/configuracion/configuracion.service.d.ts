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
     * masiva. Se numeran dentro de cada SOP: si un caso importado no trae código
     * de plan, sus planes generados empiezan en PLA-01 para ese caso.
     */
    static nextCodigosPlanBulk(client: DbClient, pedidos: {
        codigoSop: string;
        cantidad: number;
        codigosExistentes?: string[];
    }[]): Promise<Map<string, string[]>>;
    static nextCodigoPlan(client: DbClient, codigoSop: string): Promise<string>;
    /**
     * Crea la secuencia de Postgres de SOP si no existe y la adelanta hasta el
     * máximo ya usado en la base. Los planes no usan secuencia global: reinician
     * su numeración dentro de cada SOP.
     */
    static bootstrapSequences(client?: DbClient): Promise<void>;
}
export {};
//# sourceMappingURL=configuracion.service.d.ts.map