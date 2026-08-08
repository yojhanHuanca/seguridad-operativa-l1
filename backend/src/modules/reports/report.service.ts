import { z } from "zod";
import { ReportRepository } from "./report.repository.js";
import type { UploadedFile } from "./report.types.js";

const idPositivo = z.coerce.number().int().positive();

export const createReportSchema = z
  .object({
    id_tipo: idPositivo,
    id_lugar: idPositivo,
    id_lugar_especifico: idPositivo.optional().nullable(),
    descripcion: z
      .string()
      .trim()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(300, "La descripción no puede superar los 300 caracteres"),
    modalidad: z.enum(["anonimo", "identificado"]),
    nombre_reportante: z.string().trim().max(150).optional().nullable(),
    correo_reportante: z.string().trim().email("Ingrese un correo válido").max(150).optional().nullable().or(z.literal("")),
    telefono_reportante: z.string().trim().max(20).optional().nullable(),
  })
  .refine((data) => data.modalidad !== "identificado" || !!data.nombre_reportante?.trim(), {
    message: "El nombre completo es obligatorio para un reporte identificado",
    path: ["nombre_reportante"],
  });

async function assertCatalogo(id_detalle: number, catalogoEsperado: string) {
  const detalle = await ReportRepository.findCatalogoDetalleById(id_detalle);
  if (!detalle) {
    throw new Error(`El valor de catálogo con id ${id_detalle} no existe`);
  }
  if (detalle.catalogos.nombre !== catalogoEsperado) {
    throw new Error(
      `El valor "${detalle.nombre}" no pertenece al catálogo "${catalogoEsperado}"`
    );
  }
}

export class ReportService {
  static async createReport(rawBody: unknown, files: UploadedFile[]) {
    const dto = createReportSchema.parse(rawBody);

    await assertCatalogo(dto.id_tipo, "Tipo de Reporte");
    await assertCatalogo(dto.id_lugar, "Lugar de Incidente");
    if (dto.id_lugar_especifico) await assertCatalogo(dto.id_lugar_especifico, "Lugar Específico");

    return ReportRepository.createFullReport(
      {
        ...dto,
        correo_reportante: dto.correo_reportante || null,
      },
      files
    );
  }

  static async listReports() {
    return ReportRepository.findAll();
  }

  static async getByCodigo(codigo_sop: string) {
    const caso = await ReportRepository.findByCodigo(codigo_sop);
    if (!caso) throw new Error(`El caso ${codigo_sop} no existe`);
    return caso;
  }
}
