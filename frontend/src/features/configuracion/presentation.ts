import type { ConfiguracionGeneral } from "./types";

export const CONFIG_FIELDS = [
  { group: "sistema", key: "nombre", label: "Nombre del sistema" },
  { group: "sistema", key: "version", label: "Versión" },
  { group: "numeracion", key: "prefijoExpedientes", label: "Prefijo de expedientes" },
  { group: "numeracion", key: "secuenciaExpedientes", label: "Secuencia de expedientes" },
  { group: "numeracion", key: "prefijoPlanes", label: "Prefijo de planes" },
  { group: "operacion", key: "kmPorCarrera", label: "Kilómetros por carrera" },
] as const;

export interface ConfigChange {
  label: string;
  before: string;
  after: string;
  group: string;
}

function fieldValue(source: unknown, group: string, key: string): unknown {
  if (!source || typeof source !== "object") return undefined;
  const section = (source as Record<string, unknown>)[group];
  return section && typeof section === "object" ? (section as Record<string, unknown>)[key] : undefined;
}

export function configChanges(before: unknown, after: unknown): ConfigChange[] {
  return CONFIG_FIELDS.flatMap(({ group, key, label }) => {
    const oldValue = fieldValue(before, group, key);
    const newValue = fieldValue(after, group, key);
    if (newValue === undefined || Object.is(oldValue, newValue)) return [];
    return [{ label, group, before: displayValue(oldValue), after: displayValue(newValue) }];
  });
}

function displayValue(value: unknown) {
  if (value === undefined || value === null || value === "" || (typeof value === "number" && !Number.isFinite(value))) return "—";
  return String(value);
}

export function cleanPrefix(value: string) {
  return value.toUpperCase().replace(/\s+/g, "-").replace(/[^A-Z0-9-]/g, "").slice(0, 12);
}

export function normalizeConfig(config: ConfiguracionGeneral): ConfiguracionGeneral {
  return {
    ...config,
    sistema: { nombre: config.sistema.nombre.trim(), version: config.sistema.version.trim() },
    numeracion: { ...config.numeracion },
    operacion: { ...config.operacion },
  };
}

export function configErrors(config: ConfiguracionGeneral, saved: ConfiguracionGeneral): Record<string, string> {
  const errors: Record<string, string> = {};
  if (config.sistema.nombre.trim().length < 3) errors.nombre = "Ingresa al menos 3 caracteres.";
  if (!config.sistema.version.trim()) errors.version = "Ingresa la versión del sistema.";
  for (const key of ["prefijoExpedientes", "prefijoPlanes"] as const) {
    if (!/^[A-Z0-9-]{2,12}$/.test(config.numeracion[key])) errors[key] = "Usa de 2 a 12 letras, números o guiones.";
  }
  const sequence = config.numeracion.secuenciaExpedientes;
  if (!Number.isInteger(sequence) || sequence < saved.numeracion.secuenciaExpedientes || sequence > 999999) {
    errors.secuenciaExpedientes = `Ingresa un entero entre ${saved.numeracion.secuenciaExpedientes} y 999999. La secuencia no puede retroceder.`;
  }
  const km = config.operacion.kmPorCarrera;
  if (!Number.isFinite(km) || km < 0.01 || km > 100) errors.kmPorCarrera = "Ingresa un valor entre 0.01 y 100 km.";
  return errors;
}
