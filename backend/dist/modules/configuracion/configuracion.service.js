import { z } from "zod";
import prisma from "../../lib/prisma.js";
import { AuditoriaService, diffCampos } from "../auditoria/auditoria.service.js";
import { codigoSopSequence } from "./codigo-sop.js";
import { SEQ_CASOS_SOP, SEQ_PLANES_ACCION, advanceSequenceAtLeast, currentSequenceValue, ensureSequence, nextSequenceValue, nextSequenceValues, } from "./sequences.js";
const CONFIG_KEYS = {
    sistemaNombre: "sistema.nombre",
    sistemaVersion: "sistema.version",
    expedientePrefijo: "numeracion.expedientes.prefijo",
    expedienteSecuencia: "numeracion.expedientes.secuencia",
    planPrefijo: "numeracion.planes.prefijo",
    planSecuencia: "numeracion.planes.secuencia",
    diasInvestigacion: "plazos.investigacion.dias",
    diasResponderPlanes: "plazos.planes.respuesta_dias",
    diasSolicitarProrroga: "plazos.prorroga.solicitud_dias",
    ultimaActualizacion: "sistema.ultima_actualizacion",
};
const DEFAULT_VALUES = {
    [CONFIG_KEYS.sistemaNombre]: "SIGMA L1",
    [CONFIG_KEYS.sistemaVersion]: "1.0.0",
    [CONFIG_KEYS.expedientePrefijo]: "SOP",
    [CONFIG_KEYS.expedienteSecuencia]: "0",
    [CONFIG_KEYS.planPrefijo]: "PLA",
    [CONFIG_KEYS.planSecuencia]: "0",
    [CONFIG_KEYS.diasInvestigacion]: "15",
    [CONFIG_KEYS.diasResponderPlanes]: "7",
    [CONFIG_KEYS.diasSolicitarProrroga]: "3",
    [CONFIG_KEYS.ultimaActualizacion]: "2025-01-15T03:00:00.000Z",
};
const DESCRIPTIONS = {
    [CONFIG_KEYS.sistemaNombre]: "Nombre visible del sistema.",
    [CONFIG_KEYS.sistemaVersion]: "Versión funcional mostrada en administración.",
    [CONFIG_KEYS.expedientePrefijo]: "Prefijo usado al generar nuevos expedientes/casos SOP.",
    [CONFIG_KEYS.expedienteSecuencia]: "Última secuencia usada para expedientes SOP.",
    [CONFIG_KEYS.planPrefijo]: "Prefijo usado al generar nuevos planes de acción.",
    [CONFIG_KEYS.planSecuencia]: "Última secuencia global usada para planes de acción.",
    [CONFIG_KEYS.diasInvestigacion]: "Días máximos de investigación.",
    [CONFIG_KEYS.diasResponderPlanes]: "Días para que el jefe de área responda planes.",
    [CONFIG_KEYS.diasSolicitarProrroga]: "Días máximos para solicitar una prórroga.",
    [CONFIG_KEYS.ultimaActualizacion]: "Fecha ISO de la última actualización manual de configuración.",
};
function defaultValue(key) {
    return DEFAULT_VALUES[key] ?? "";
}
const numberField = (label, min, max) => z.coerce
    .number({ error: `${label} debe ser numérico` })
    .int(`${label} debe ser un número entero`)
    .min(min, `${label} debe ser mayor o igual a ${min}`)
    .max(max, `${label} no puede superar ${max}`);
const configuracionSchema = z.object({
    sistema: z.object({
        nombre: z.string().trim().min(3, "El nombre del sistema debe tener al menos 3 caracteres").max(150),
        version: z.string().trim().min(1, "La versión es obligatoria").max(30),
    }),
    numeracion: z.object({
        prefijoExpedientes: z.string().trim().min(2, "El prefijo de expedientes es obligatorio").max(12),
        secuenciaExpedientes: numberField("La secuencia de expedientes", 0, 999999),
        prefijoPlanes: z.string().trim().min(2, "El prefijo de planes es obligatorio").max(12),
        secuenciaPlanes: numberField("La secuencia de planes", 0, 999999),
    }),
    plazos: z.object({
        diasMaxInvestigacion: numberField("Los días máximos de investigación", 1, 365),
        diasResponderPlanes: numberField("Los días para responder planes", 1, 365),
        diasSolicitarProrroga: numberField("Los días para solicitar prórroga", 1, 365),
    }),
});
function parseNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}
function sanitizePrefix(value, label) {
    const prefix = value.trim().replace(/\s+/g, "-").toUpperCase();
    if (!/^[A-Z0-9-]{2,12}$/.test(prefix)) {
        throw new Error(`${label} solo puede usar letras, números o guiones`);
    }
    return prefix;
}
function padSequence(value) {
    return String(value).padStart(2, "0");
}
function rowsToMap(rows) {
    const values = new Map();
    for (const row of rows) {
        if (row.nombre)
            values.set(row.nombre, row.valor ?? "");
    }
    return values;
}
function mapToConfiguracion(values, secuenciaExpedientes, secuenciaPlanes) {
    return {
        sistema: {
            nombre: values.get(CONFIG_KEYS.sistemaNombre) || defaultValue(CONFIG_KEYS.sistemaNombre),
            version: values.get(CONFIG_KEYS.sistemaVersion) || defaultValue(CONFIG_KEYS.sistemaVersion),
        },
        numeracion: {
            prefijoExpedientes: sanitizePrefix(values.get(CONFIG_KEYS.expedientePrefijo) || defaultValue(CONFIG_KEYS.expedientePrefijo), "El prefijo de expedientes"),
            secuenciaExpedientes,
            prefijoPlanes: sanitizePrefix(values.get(CONFIG_KEYS.planPrefijo) || defaultValue(CONFIG_KEYS.planPrefijo), "El prefijo de planes"),
            secuenciaPlanes,
        },
        plazos: {
            diasMaxInvestigacion: parseNumber(values.get(CONFIG_KEYS.diasInvestigacion), Number(defaultValue(CONFIG_KEYS.diasInvestigacion))),
            diasResponderPlanes: parseNumber(values.get(CONFIG_KEYS.diasResponderPlanes), Number(defaultValue(CONFIG_KEYS.diasResponderPlanes))),
            diasSolicitarProrroga: parseNumber(values.get(CONFIG_KEYS.diasSolicitarProrroga), Number(defaultValue(CONFIG_KEYS.diasSolicitarProrroga))),
        },
        meta: {
            ultimaActualizacion: values.get(CONFIG_KEYS.ultimaActualizacion) || defaultValue(CONFIG_KEYS.ultimaActualizacion) || null,
        },
    };
}
function payloadToEntries(config) {
    return [
        [CONFIG_KEYS.sistemaNombre, config.sistema.nombre],
        [CONFIG_KEYS.sistemaVersion, config.sistema.version],
        [CONFIG_KEYS.expedientePrefijo, config.numeracion.prefijoExpedientes],
        [CONFIG_KEYS.expedienteSecuencia, String(config.numeracion.secuenciaExpedientes)],
        [CONFIG_KEYS.planPrefijo, config.numeracion.prefijoPlanes],
        [CONFIG_KEYS.planSecuencia, String(config.numeracion.secuenciaPlanes)],
        [CONFIG_KEYS.diasInvestigacion, String(config.plazos.diasMaxInvestigacion)],
        [CONFIG_KEYS.diasResponderPlanes, String(config.plazos.diasResponderPlanes)],
        [CONFIG_KEYS.diasSolicitarProrroga, String(config.plazos.diasSolicitarProrroga)],
        [CONFIG_KEYS.ultimaActualizacion, config.meta.ultimaActualizacion ?? new Date().toISOString()],
    ];
}
async function upsertValue(client, nombre, valor) {
    return client.configuracion.upsert({
        where: { nombre },
        update: { valor, descripcion: DESCRIPTIONS[nombre] ?? null },
        create: { nombre, valor, descripcion: DESCRIPTIONS[nombre] ?? null },
    });
}
/**
 * Escanea la tabla para encontrar la secuencia más alta ya usada. Cara (trae
 * todos los códigos y los parsea en memoria), así que solo se llama una vez
 * al arrancar el servidor (`bootstrapSequences`) — el resto del tiempo la
 * fuente de verdad es la secuencia de Postgres, no un escaneo de la tabla.
 */
async function maxCaseSequence(client, prefix) {
    const codigos = await client.casos_sop.findMany({
        where: {
            codigo_sop: { startsWith: prefix, mode: "insensitive" },
        },
        select: { codigo_sop: true },
    });
    return codigos.reduce((max, { codigo_sop }) => {
        const sequence = codigoSopSequence(codigo_sop, prefix);
        return sequence == null ? max : Math.max(max, sequence);
    }, 0);
}
export class ConfiguracionService {
    static async readValues(client = prisma) {
        const rows = await client.configuracion.findMany({
            where: { nombre: { in: Object.values(CONFIG_KEYS) } },
            select: { nombre: true, valor: true },
        });
        return rowsToMap(rows);
    }
    static async get(client = prisma) {
        const values = await ConfiguracionService.readValues(client);
        const [secuenciaCasos, secuenciaPlanes] = await Promise.all([
            currentSequenceValue(client, SEQ_CASOS_SOP),
            currentSequenceValue(client, SEQ_PLANES_ACCION),
        ]);
        return mapToConfiguracion(values, secuenciaCasos, secuenciaPlanes);
    }
    static async publica(client = prisma) {
        const values = await ConfiguracionService.readValues(client);
        return {
            nombre: values.get(CONFIG_KEYS.sistemaNombre) || defaultValue(CONFIG_KEYS.sistemaNombre),
            version: values.get(CONFIG_KEYS.sistemaVersion) || defaultValue(CONFIG_KEYS.sistemaVersion),
        };
    }
    static async update(rawBody, audit = {}) {
        const parsed = configuracionSchema.parse(rawBody);
        const next = {
            sistema: {
                nombre: parsed.sistema.nombre,
                version: parsed.sistema.version,
            },
            numeracion: {
                prefijoExpedientes: sanitizePrefix(parsed.numeracion.prefijoExpedientes, "El prefijo de expedientes"),
                secuenciaExpedientes: parsed.numeracion.secuenciaExpedientes,
                prefijoPlanes: sanitizePrefix(parsed.numeracion.prefijoPlanes, "El prefijo de planes"),
                secuenciaPlanes: parsed.numeracion.secuenciaPlanes,
            },
            plazos: parsed.plazos,
            meta: {
                ultimaActualizacion: new Date().toISOString(),
            },
        };
        const previous = await ConfiguracionService.get();
        const saved = await prisma.$transaction(async (tx) => {
            for (const [key, value] of payloadToEntries(next)) {
                await upsertValue(tx, key, value);
            }
            // La secuencia de Postgres es la fuente de verdad real; esto solo deja
            // que un admin "adelante" el contador a mano (p.ej. para saltar un
            // rango) sin arriesgar reusar un número ya emitido — nunca retrocede.
            await advanceSequenceAtLeast(tx, SEQ_CASOS_SOP, next.numeracion.secuenciaExpedientes);
            await advanceSequenceAtLeast(tx, SEQ_PLANES_ACCION, next.numeracion.secuenciaPlanes);
            return ConfiguracionService.get(tx);
        });
        const diff = diffCampos({
            sistema: previous.sistema,
            numeracion: previous.numeracion,
            plazos: previous.plazos,
        }, {
            sistema: saved.sistema,
            numeracion: saved.numeracion,
            plazos: saved.plazos,
        });
        await AuditoriaService.registrar({
            tabla: "configuracion",
            accion: "editar",
            descripcion: "Actualizó la configuración general del sistema",
            usuario: audit.usuario ?? null,
            ip: audit.ip,
            user_agent: audit.user_agent,
            antes: diff?.antes ?? null,
            despues: diff?.despues ?? null,
        });
        return saved;
    }
    static async nextCodigoExpediente(client, fecha) {
        const year = fecha.getUTCFullYear();
        const values = await ConfiguracionService.readValues(client);
        const prefix = sanitizePrefix(values.get(CONFIG_KEYS.expedientePrefijo) || defaultValue(CONFIG_KEYS.expedientePrefijo), "El prefijo de expedientes");
        const sequence = await nextSequenceValue(client, SEQ_CASOS_SOP);
        return `${prefix} ${padSequence(sequence)}-${year}`;
    }
    static async nextCodigosPlan(client, codigoSop, cantidad) {
        if (cantidad <= 0)
            return [];
        const values = await ConfiguracionService.readValues(client);
        const prefix = sanitizePrefix(values.get(CONFIG_KEYS.planPrefijo) || defaultValue(CONFIG_KEYS.planPrefijo), "El prefijo de planes");
        const secuencias = await nextSequenceValues(client, SEQ_PLANES_ACCION, cantidad);
        return secuencias.map((sequence) => `${codigoSop}-${prefix}-${padSequence(sequence)}`);
    }
    /**
     * Códigos de plan para muchos casos de una sola vez, para la importación
     * masiva. Antes esto necesitaba traer de golpe los códigos ya ocupados y
     * resolver colisiones a mano en memoria; con la secuencia de Postgres cada
     * código ya sale único, así que alcanza con reservar de una vez tantos
     * valores como códigos se piden en total.
     */
    static async nextCodigosPlanBulk(client, pedidos) {
        const out = new Map();
        const total = pedidos.reduce((suma, pedido) => suma + pedido.cantidad, 0);
        if (total <= 0)
            return out;
        const values = await ConfiguracionService.readValues(client);
        const prefix = sanitizePrefix(values.get(CONFIG_KEYS.planPrefijo) || defaultValue(CONFIG_KEYS.planPrefijo), "El prefijo de planes");
        const secuencias = await nextSequenceValues(client, SEQ_PLANES_ACCION, total);
        let cursor = 0;
        for (const pedido of pedidos) {
            const codigos = secuencias
                .slice(cursor, cursor + pedido.cantidad)
                .map((sequence) => `${pedido.codigoSop}-${prefix}-${padSequence(sequence)}`);
            cursor += pedido.cantidad;
            out.set(pedido.codigoSop, codigos);
        }
        return out;
    }
    static async nextCodigoPlan(client, codigoSop) {
        const [codigo] = await ConfiguracionService.nextCodigosPlan(client, codigoSop, 1);
        if (!codigo)
            throw new Error("No se pudo generar el código del plan");
        return codigo;
    }
    /**
     * Crea las secuencias de Postgres si no existen y las adelanta hasta el
     * máximo ya usado en la base (escaneando `casos_sop`/`planes_accion`) y
     * hasta lo que haya configurado un admin a mano. Se llama una sola vez al
     * arrancar el servidor — después de esto la secuencia misma es la fuente
     * de verdad, no hace falta volver a escanear la tabla en cada reporte.
     */
    static async bootstrapSequences(client = prisma) {
        await ensureSequence(client, SEQ_CASOS_SOP);
        await ensureSequence(client, SEQ_PLANES_ACCION);
        const values = await ConfiguracionService.readValues(client);
        const prefix = sanitizePrefix(values.get(CONFIG_KEYS.expedientePrefijo) || defaultValue(CONFIG_KEYS.expedientePrefijo), "El prefijo de expedientes");
        const configuradoCasos = parseNumber(values.get(CONFIG_KEYS.expedienteSecuencia), 0);
        const configuradoPlanes = parseNumber(values.get(CONFIG_KEYS.planSecuencia), 0);
        const [maxCasos, totalPlanes] = await Promise.all([maxCaseSequence(client, prefix), client.planes_accion.count()]);
        await advanceSequenceAtLeast(client, SEQ_CASOS_SOP, Math.max(configuradoCasos, maxCasos));
        await advanceSequenceAtLeast(client, SEQ_PLANES_ACCION, Math.max(configuradoPlanes, totalPlanes));
    }
}
//# sourceMappingURL=configuracion.service.js.map