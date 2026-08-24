import { z } from "zod";
import prisma from "../../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";
import { AuditoriaService, diffCampos } from "../auditoria/auditoria.service.js";

type DbClient = typeof prisma | Prisma.TransactionClient;

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
} as const;

const DEFAULT_VALUES: Record<string, string> = {
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

const DESCRIPTIONS: Record<string, string> = {
  [CONFIG_KEYS.sistemaNombre]: "Nombre visible del sistema.",
  [CONFIG_KEYS.sistemaVersion]: "Versión funcional mostrada en administración.",
  [CONFIG_KEYS.expedientePrefijo]: "Prefijo usado al generar nuevos expedientes/casos SOP.",
  [CONFIG_KEYS.expedienteSecuencia]: "Última secuencia usada para expedientes del año actual.",
  [CONFIG_KEYS.planPrefijo]: "Prefijo usado al generar nuevos planes de acción.",
  [CONFIG_KEYS.planSecuencia]: "Última secuencia global usada para planes de acción.",
  [CONFIG_KEYS.diasInvestigacion]: "Días máximos de investigación.",
  [CONFIG_KEYS.diasResponderPlanes]: "Días para que el jefe de área responda planes.",
  [CONFIG_KEYS.diasSolicitarProrroga]: "Días máximos para solicitar una prórroga.",
  [CONFIG_KEYS.ultimaActualizacion]: "Fecha ISO de la última actualización manual de configuración.",
};

function defaultValue(key: string): string {
  return DEFAULT_VALUES[key] ?? "";
}

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

const numberField = (label: string, min: number, max: number) =>
  z.coerce
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

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}

function sanitizePrefix(value: string, label: string): string {
  const prefix = value.trim().replace(/\s+/g, "-").toUpperCase();
  if (!/^[A-Z0-9-]{2,12}$/.test(prefix)) {
    throw new Error(`${label} solo puede usar letras, números o guiones`);
  }
  return prefix;
}

function padSequence(value: number): string {
  return String(value).padStart(2, "0");
}

function rowsToMap(rows: { nombre: string | null; valor: string | null }[]) {
  const values = new Map<string, string>();
  for (const row of rows) {
    if (row.nombre) values.set(row.nombre, row.valor ?? "");
  }
  return values;
}

function mapToConfiguracion(values: Map<string, string>, secuenciaExpedientes: number, secuenciaPlanes: number): ConfiguracionGeneral {
  return {
    sistema: {
      nombre: values.get(CONFIG_KEYS.sistemaNombre) || defaultValue(CONFIG_KEYS.sistemaNombre),
      version: values.get(CONFIG_KEYS.sistemaVersion) || defaultValue(CONFIG_KEYS.sistemaVersion),
    },
    numeracion: {
      prefijoExpedientes: sanitizePrefix(
        values.get(CONFIG_KEYS.expedientePrefijo) || defaultValue(CONFIG_KEYS.expedientePrefijo),
        "El prefijo de expedientes"
      ),
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

function payloadToEntries(config: ConfiguracionGeneral) {
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
  ] as const;
}

async function upsertValue(client: DbClient, nombre: string, valor: string) {
  return client.configuracion.upsert({
    where: { nombre },
    update: { valor, descripcion: DESCRIPTIONS[nombre] ?? null },
    create: { nombre, valor, descripcion: DESCRIPTIONS[nombre] ?? null },
  });
}

async function currentYearCaseCount(client: DbClient, year: number) {
  const inicioAnio = new Date(Date.UTC(year, 0, 1));
  const finAnio = new Date(Date.UTC(year + 1, 0, 1));
  return client.casos_sop.count({ where: { fecha_hallazgo: { gte: inicioAnio, lt: finAnio } } });
}

export class ConfiguracionService {
  private static async readValues(client: DbClient = prisma) {
    const rows = await client.configuracion.findMany({
      where: { nombre: { in: Object.values(CONFIG_KEYS) } },
      select: { nombre: true, valor: true },
    });
    return rowsToMap(rows);
  }

  static async get(client: DbClient = prisma): Promise<ConfiguracionGeneral> {
    const values = await ConfiguracionService.readValues(client);
    const year = new Date().getUTCFullYear();
    const [casosDelAnio, planesTotales] = await Promise.all([currentYearCaseCount(client, year), client.planes_accion.count()]);

    return mapToConfiguracion(
      values,
      Math.max(parseNumber(values.get(CONFIG_KEYS.expedienteSecuencia), Number(defaultValue(CONFIG_KEYS.expedienteSecuencia))), casosDelAnio),
      Math.max(parseNumber(values.get(CONFIG_KEYS.planSecuencia), Number(defaultValue(CONFIG_KEYS.planSecuencia))), planesTotales)
    );
  }

  static async publica(client: DbClient = prisma): Promise<ConfiguracionPublica> {
    const values = await ConfiguracionService.readValues(client);
    return {
      nombre: values.get(CONFIG_KEYS.sistemaNombre) || defaultValue(CONFIG_KEYS.sistemaNombre),
      version: values.get(CONFIG_KEYS.sistemaVersion) || defaultValue(CONFIG_KEYS.sistemaVersion),
    };
  }

  static async update(rawBody: unknown, audit: ConfiguracionAuditContext = {}) {
    const parsed = configuracionSchema.parse(rawBody);
    const next: ConfiguracionGeneral = {
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
      return ConfiguracionService.get(tx);
    });

    const diff = diffCampos(
      {
        sistema: previous.sistema,
        numeracion: previous.numeracion,
        plazos: previous.plazos,
      },
      {
        sistema: saved.sistema,
        numeracion: saved.numeracion,
        plazos: saved.plazos,
      }
    );

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

  static async nextCodigoExpediente(client: DbClient, fecha: Date): Promise<string> {
    const year = fecha.getUTCFullYear();
    const values = await ConfiguracionService.readValues(client);
    const prefix = sanitizePrefix(values.get(CONFIG_KEYS.expedientePrefijo) || defaultValue(CONFIG_KEYS.expedientePrefijo), "El prefijo de expedientes");
    const configured = parseNumber(values.get(CONFIG_KEYS.expedienteSecuencia), Number(defaultValue(CONFIG_KEYS.expedienteSecuencia)));
    const actual = await currentYearCaseCount(client, year);
    const next = Math.max(configured, actual) + 1;

    await upsertValue(client, CONFIG_KEYS.expedienteSecuencia, String(next));
    return `${prefix} ${padSequence(next)}-${year}`;
  }

  static async nextCodigosPlan(client: DbClient, codigoSop: string, cantidad: number): Promise<string[]> {
    if (cantidad <= 0) return [];

    const values = await ConfiguracionService.readValues(client);
    const prefix = sanitizePrefix(values.get(CONFIG_KEYS.planPrefijo) || defaultValue(CONFIG_KEYS.planPrefijo), "El prefijo de planes");
    const configured = parseNumber(values.get(CONFIG_KEYS.planSecuencia), Number(defaultValue(CONFIG_KEYS.planSecuencia)));
    const actual = await client.planes_accion.count();
    const codigos: string[] = [];
    let cursor = Math.max(configured, actual);

    while (codigos.length < cantidad) {
      cursor += 1;
      const candidate = `${codigoSop}-${prefix}-${padSequence(cursor)}`;
      const exists = await client.planes_accion.findUnique({
        where: { codigo_plan: candidate },
        select: { codigo_plan: true },
      });
      if (!exists) codigos.push(candidate);
    }

    await upsertValue(client, CONFIG_KEYS.planSecuencia, String(cursor));
    return codigos;
  }

  static async nextCodigoPlan(client: DbClient, codigoSop: string): Promise<string> {
    const [codigo] = await ConfiguracionService.nextCodigosPlan(client, codigoSop, 1);
    if (!codigo) throw new Error("No se pudo generar el código del plan");
    return codigo;
  }
}
