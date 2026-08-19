import { z } from "zod";
import { ReportRepository } from "./report.repository.js";
import type { UploadedFile } from "./report.types.js";
import { esReportante, type Actor } from "../../utils/actor.js";

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
    origen: z.enum(["reportante", "seguridad_operativa"]).default("reportante"),
    /** Si el hallazgo se creó desde "Eventos asignados" de Monitoreo, el evento que le dio origen. */
    id_evento_monitoreo: idPositivo.optional(),
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
  static async createReport(rawBody: unknown, files: UploadedFile[], id_usuario_creador?: number) {
    const dto = createReportSchema.parse(rawBody);

    await assertCatalogo(dto.id_tipo, "Tipo de Reporte");
    await assertCatalogo(dto.id_lugar, "Lugar de Incidente");
    if (dto.id_lugar_especifico) await assertCatalogo(dto.id_lugar_especifico, "Lugar Específico");

    return ReportRepository.createFullReport(
      {
        ...dto,
        correo_reportante: dto.correo_reportante || null,
      },
      files,
      id_usuario_creador
    );
  }

  /**
   * El Reportante solo ve lo que él registró; Seguridad Operativa, Jefe de
   * Área y Admin ven todos los casos porque los tienen que gestionar.
   */
  static async listReports(actor?: Actor) {
    if (esReportante(actor)) return ReportRepository.findAllByCreator(actor!.id_usuario);
    return ReportRepository.findAll();
  }

  static async getByCodigo(codigo_sop: string, actor?: Actor) {
    const caso = await ReportRepository.findByCodigo(codigo_sop);
    if (!caso) throw new Error(`El caso ${codigo_sop} no existe`);
    // Mismo criterio que el listado: un reportante no puede abrir el caso de otro.
    if (esReportante(actor) && caso.created_by !== actor!.id_usuario) {
      throw new Error(`El caso ${codigo_sop} no existe`);
    }
    return caso;
  }
}
