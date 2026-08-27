import { z } from "zod";
import prisma from "../../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";
import { AuditoriaService, diffCampos } from "../auditoria/auditoria.service.js";
import { codigoSopSequence } from "./codigo-sop.js";

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
  [CONFIG_KEYS.expedienteSecuencia]: "Última secuencia usada para expedientes SOP.",
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

async function maxCaseSequence(client: DbClient, prefix: string) {
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

async function nextAvailableCaseCode(client: DbClient, prefix: string, year: number, fromSequence: number) {
  let sequence = fromSequence;

  while (true) {
    sequence += 1;
    const codigo = `${prefix} ${padSequence(sequence)}-${year}`;
    const exists = await client.casos_sop.findUnique({
      where: { codigo_sop: codigo },
      select: { codigo_sop: true },
    });
    if (!exists) return { codigo, sequence };
  }
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
    const prefix = sanitizePrefix(values.get(CONFIG_KEYS.expedientePrefijo) || defaultValue(CONFIG_KEYS.expedientePrefijo), "El prefijo de expedientes");
    const [secuenciaCasos, planesTotales] = await Promise.all([maxCaseSequence(client, prefix), client.planes_accion.count()]);

    return mapToConfiguracion(
      values,
      Math.max(parseNumber(values.get(CONFIG_KEYS.expedienteSecuencia), Number(defaultValue(CONFIG_KEYS.expedienteSecuencia))), secuenciaCasos),
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
    const actual = await maxCaseSequence(client, prefix);
    const { codigo, sequence } = await nextAvailableCaseCode(client, prefix, year, Math.max(configured, actual));

    await upsertValue(client, CONFIG_KEYS.expedienteSecuencia, String(sequence));
    return codigo;
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

  /**
   * Códigos de plan para muchos casos de una sola vez, para la importación
   * masiva.
   *
   * `nextCodigosPlan` sirve para un caso suelto, pero hace una lectura de
   * configuración, un `count` y un `findUnique` por cada código: llamarla en
   * un bucle de diez mil casos son decenas de miles de consultas en serie, y
   * la transacción se cae por tiempo antes de terminar. Acá se lee la
   * configuración una vez, se traen de golpe los códigos ya ocupados y el
   * resto se resuelve en memoria.
   */
  static async nextCodigosPlanBulk(client: DbClient, pedidos: { codigoSop: string; cantidad: number }[]): Promise<Map<string, string[]>> {
    const out = new Map<string, string[]>();
    const total = pedidos.reduce((suma, pedido) => suma + pedido.cantidad, 0);
    if (total <= 0) return out;

    const values = await ConfiguracionService.readValues(client);
    const prefix = sanitizePrefix(values.get(CONFIG_KEYS.planPrefijo) || defaultValue(CONFIG_KEYS.planPrefijo), "El prefijo de planes");
    const configured = parseNumber(values.get(CONFIG_KEYS.planSecuencia), Number(defaultValue(CONFIG_KEYS.planSecuencia)));
    const actual = await client.planes_accion.count();

    // Los códigos llevan el del caso adelante, así que solo pueden chocar con
    // planes del mismo caso: alcanza con traer los de esos casos.
    const ocupados = new Set(
      (
        await client.planes_accion.findMany({
          where: { OR: pedidos.map((pedido) => ({ codigo_plan: { startsWith: `${pedido.codigoSop}-${prefix}-` } })) },
          select: { codigo_plan: true },
        })
      ).map((plan) => plan.codigo_plan),
    );

    let cursor = Math.max(configured, actual);
    for (const pedido of pedidos) {
      const codigos: string[] = [];
      while (codigos.length < pedido.cantidad) {
        cursor += 1;
        const candidate = `${pedido.codigoSop}-${prefix}-${padSequence(cursor)}`;
        if (ocupados.has(candidate)) continue;
        ocupados.add(candidate);
        codigos.push(candidate);
      }
      out.set(pedido.codigoSop, codigos);
    }

    await upsertValue(client, CONFIG_KEYS.planSecuencia, String(cursor));
    return out;
  }

  static async nextCodigoPlan(client: DbClient, codigoSop: string): Promise<string> {
    const [codigo] = await ConfiguracionService.nextCodigosPlan(client, codigoSop, 1);
    if (!codigo) throw new Error("No se pudo generar el código del plan");
    return codigo;
  }
}
