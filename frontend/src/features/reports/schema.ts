import { z } from "zod";

// Mismos campos que el wizard ya desplegado (sigma-l1-metromet.vercel.app).
export const reportFormSchema = z
  .object({
    id_tipo: z.coerce.number({ error: "Selecciona el tipo de evento" }).int().positive(),
    tipo_ubicacion: z.enum(["estacion", "patio_taller"]),
    id_lugar: z.coerce.number({ error: "Selecciona una estación o patio taller" }).int().positive(),
    id_lugar_especifico: z.coerce.number().int().positive().optional(),
    descripcion: z
      .string()
      .trim()
      .min(10, "Describe con al menos 10 caracteres")
      .max(300, "Máximo 300 caracteres"),
    modalidad: z.enum(["anonimo", "identificado"]),
    nombre_reportante: z.string().max(150).optional(),
    correo_reportante: z.string().email("Ingresa un correo válido").max(150).optional().or(z.literal("")),
    telefono_reportante: z.string().max(20).optional(),
  })
  .refine((data) => data.modalidad !== "identificado" || !!data.nombre_reportante?.trim(), {
    message: "El nombre completo es obligatorio para un reporte identificado",
    path: ["nombre_reportante"],
  });

export type ReportFormValues = z.infer<typeof reportFormSchema>;

export const REPORT_STEPS = ["tipo", "ubicacion", "descripcion", "evidencias", "envio"] as const;
export type ReportStep = (typeof REPORT_STEPS)[number];

export const STEP_FIELDS: Record<ReportStep, (keyof ReportFormValues)[]> = {
  tipo: ["id_tipo"],
  ubicacion: ["tipo_ubicacion", "id_lugar", "id_lugar_especifico"],
  descripcion: ["descripcion"],
  evidencias: [],
  envio: ["modalidad", "nombre_reportante", "correo_reportante", "telefono_reportante"],
};
