import { z } from "zod";
import { ReportRepository } from "./report.repository.js";
import { esReportante } from "../../utils/actor.js";
import { CaseRepository } from "../cases/case.repository.js";
const idPositivo = z.coerce.number().int().positive();
const telefonoSchema = z
    .string()
    .trim()
    .max(20, "El teléfono no puede superar los 20 caracteres")
    .optional()
    .nullable()
    .refine((value) => !value || /^[0-9+\s()-]{6,20}$/.test(value), {
    message: "Ingrese un teléfono válido",
});
const normalizarRol = (rol) => (rol ?? "").trim().toLowerCase();
const puedeRegistrarComoSO = (actor) => {
    const rol = normalizarRol(actor?.rol_nombre);
    return rol === "seguridad operativa" || rol === "admin";
};
export const createReportSchema = z
    .object({
    id_tipo: idPositivo,
    id_lugar: idPositivo,
    id_lugar_especifico: idPositivo.optional().nullable(),
    descripcion: z
        .string()
        .trim()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede superar los 500 caracteres"),
    modalidad: z.enum(["anonimo", "identificado"]),
    nombre_reportante: z.string().trim().max(150).optional().nullable(),
    correo_reportante: z.string().trim().email("Ingrese un correo válido").max(150).optional().nullable().or(z.literal("")),
    telefono_reportante: telefonoSchema,
    origen: z.enum(["reportante", "seguridad_operativa"]).default("reportante"),
    /** Si el hallazgo se creó desde "Eventos asignados" de Monitoreo, el evento que le dio origen. */
    id_evento_monitoreo: idPositivo.optional(),
})
    .refine((data) => data.modalidad !== "identificado" || !!data.nombre_reportante?.trim(), {
    message: "El nombre completo es obligatorio para un reporte identificado",
    path: ["nombre_reportante"],
});
const responderInfoSchema = z.object({
    id_solicitud: idPositivo,
    respuesta: z.string().trim().min(3, "Escribe la respuesta").max(1000),
});
async function assertCatalogo(id_detalle, catalogoEsperado) {
    const detalle = await ReportRepository.findCatalogoDetalleById(id_detalle);
    if (!detalle) {
        throw new Error(`El valor de catálogo con id ${id_detalle} no existe`);
    }
    if (detalle.catalogos.nombre !== catalogoEsperado) {
        throw new Error(`El valor "${detalle.nombre}" no pertenece al catálogo "${catalogoEsperado}"`);
    }
}
export class ReportService {
    static async createReport(rawBody, files, actor) {
        const dto = createReportSchema.parse(rawBody);
        const id_usuario_creador = actor?.id_usuario;
        if (dto.origen === "seguridad_operativa" && !puedeRegistrarComoSO(actor)) {
            throw new Error("Debes iniciar sesión como Seguridad Operativa para registrar un reporte desde ese panel");
        }
        if (dto.id_evento_monitoreo != null && dto.origen !== "seguridad_operativa") {
            throw new Error("Un evento de monitoreo solo puede vincularse desde el panel de Seguridad Operativa");
        }
        await assertCatalogo(dto.id_tipo, "Tipo de Reporte");
        await assertCatalogo(dto.id_lugar, "Lugar de Incidente");
        if (dto.id_lugar_especifico)
            await assertCatalogo(dto.id_lugar_especifico, "Lugar Específico");
        return ReportRepository.createFullReport({
            ...dto,
            correo_reportante: dto.correo_reportante || null,
        }, files, id_usuario_creador);
    }
    /**
     * El Reportante solo ve lo que él registró; Seguridad Operativa, Jefe de
     * Área y Admin ven todos los casos porque los tienen que gestionar.
     */
    static async listReports(actor, query) {
        if (!esReportante(actor)) {
            const data = await ReportRepository.findAll();
            return { data, total: undefined };
        }
        const filter = query?.filter === "activos" || query?.filter === "pendientes_info" || query?.filter === "cerrados"
            ? query.filter
            : undefined;
        const page = Number(query?.page);
        const limit = Number(query?.limit);
        const paginar = Number.isInteger(page) && page > 0 && Number.isInteger(limit) && limit > 0;
        return ReportRepository.findAllByCreator(actor.id_usuario, {
            ...(filter ? { filter } : {}),
            ...(query?.search ? { search: query.search } : {}),
            ...(paginar ? { page, limit } : {}),
        });
    }
    /**
     * El reportante responde una solicitud de información sin cuenta ni sesión:
     * el código SOP es la misma llave que ya usa para consultar su caso (como
     * un número de seguimiento). Funciona igual para anónimos e identificados,
     * hayan dejado correo o no — el correo es solo el aviso extra, no un
     * requisito para poder responder.
     */
    static async responderInfoPublico(codigo_sop, rawBody, files) {
        const dto = responderInfoSchema.parse(rawBody);
        const caso = await ReportRepository.findPublicByCodigo(codigo_sop);
        if (!caso)
            throw new Error(`El caso ${codigo_sop} no existe`);
        const solicitud = caso.solicitudes_informacion.find((s) => s.id_solicitud === dto.id_solicitud && !s.respondida);
        if (!solicitud)
            throw new Error("Esa solicitud de información no existe o ya fue respondida");
        const actualizada = await CaseRepository.respondInfo(caso.id_caso, dto.id_solicitud, { respuesta: dto.respuesta });
        await ReportRepository.agregarEvidencias(caso.id_caso, files);
        return actualizada;
    }
    static async getByCodigo(codigo_sop, actor) {
        if (!actor) {
            const casoPublico = await ReportRepository.findPublicByCodigo(codigo_sop);
            if (!casoPublico)
                throw new Error(`El caso ${codigo_sop} no existe`);
            return casoPublico;
        }
        const caso = await ReportRepository.findByCodigo(codigo_sop);
        if (!caso)
            throw new Error(`El caso ${codigo_sop} no existe`);
        // Mismo criterio que el listado: un reportante no puede abrir el caso de otro.
        if (esReportante(actor) && caso.created_by !== actor.id_usuario) {
            throw new Error(`El caso ${codigo_sop} no existe`);
        }
        return caso;
    }
}
//# sourceMappingURL=report.service.js.map