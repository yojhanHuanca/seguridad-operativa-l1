import { z } from "zod";

// bcrypt only uses the first 72 bytes. Reject longer new credentials instead
// of silently accepting different passwords with the same effective value.
export const nuevaPasswordSchema = z.string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .max(72, "La contraseña no puede superar los 72 bytes")
  .refine(value => value.trim().length >= 6, "La contraseña debe tener al menos 6 caracteres")
  .refine(value => Buffer.byteLength(value, "utf8") <= 72, "La contraseña no puede superar los 72 bytes");

export const cambiarPasswordSchema = z.object({
  password_actual: z.string().min(1, "Ingresa tu contraseña actual"),
  password_nueva: nuevaPasswordSchema,
  password_confirmacion: z.string(),
}).refine(value => value.password_nueva === value.password_confirmacion, {
  message: "La confirmación no coincide con la nueva contraseña", path: ["password_confirmacion"],
});
