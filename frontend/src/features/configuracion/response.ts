import { z } from "zod";
import type { ConfiguracionGeneral, ConfiguracionPublica } from "./types";

const identitySchema = z.object({
  nombre: z.string().trim().min(1),
  version: z.string().trim().min(1),
});

const configurationSchema = z.object({
  sistema: identitySchema,
  numeracion: z.object({
    prefijoExpedientes: z.string().min(1),
    secuenciaExpedientes: z.number().int().nonnegative(),
    prefijoPlanes: z.string().min(1),
    secuenciaPlanes: z.number().int().nonnegative(),
  }),
  plazos: z.object({
    diasMaxInvestigacion: z.number().int().positive(),
    diasResponderPlanes: z.number().int().positive(),
    diasSolicitarProrroga: z.number().int().positive(),
  }),
  // Older deployments did not return this section. Preserve the reference
  // value already used by the previous configuration screen in that case.
  operacion: z.object({ kmPorCarrera: z.number().positive() }).nullish()
    .transform(value => value ?? { kmPorCarrera: 33.128331 }),
  meta: z.object({ ultimaActualizacion: z.string().nullable() }),
});

export class ConfigurationResponseError extends Error {
  constructor() {
    super("El servidor devolvió una configuración incompleta o incompatible. Verifica la versión del servidor y vuelve a cargar la página.");
    this.name = "ConfigurationResponseError";
  }
}

export function parseConfiguration(value: unknown): ConfiguracionGeneral {
  const result = configurationSchema.safeParse(value);
  if (!result.success) throw new ConfigurationResponseError();
  return result.data;
}

export function parsePublicConfiguration(value: unknown): ConfiguracionPublica {
  const result = identitySchema.safeParse(value);
  if (!result.success) throw new ConfigurationResponseError();
  return result.data;
}
