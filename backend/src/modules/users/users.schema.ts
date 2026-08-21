import { z } from "zod";

const idPositivo = z.coerce.number().int().positive();

export const createUserSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(150),
  correo: z.string().trim().email("Ingrese un correo válido").max(150),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(100),
  cargo: z.string().trim().max(100).optional(),
  telefono: z.string().trim().max(20).optional(),
  id_area: idPositivo,
  id_rol: idPositivo,
  es_responsable: z.boolean().optional(),
  puede_reabrir_casos: z.boolean().optional(),
  puede_rechazar_reportes: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(150).optional(),
  correo: z.string().trim().email("Ingrese un correo válido").max(150).optional(),
  cargo: z.string().trim().max(100).optional(),
  telefono: z.string().trim().max(20).optional(),
  id_area: idPositivo.optional(),
  id_rol: idPositivo.optional(),
  estado: z.string().trim().max(30).optional(),
  es_responsable: z.boolean().optional(),
  puede_reabrir_casos: z.boolean().optional(),
  puede_rechazar_reportes: z.boolean().optional(),
  // Opcional: si viene vacío o no viene, la contraseña actual se conserva.
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(100).optional().or(z.literal("")),
});

export const idParamSchema = idPositivo;
