export interface CreateReportDto {
    id_tipo: number;
    id_lugar: number;
    id_lugar_especifico?: number | null | undefined;
    descripcion: string;
    modalidad: "anonimo" | "identificado";
    nombre_reportante?: string | null | undefined;
    correo_reportante?: string | null | undefined;
    telefono_reportante?: string | null | undefined;
    origen?: OrigenReporte | undefined;
    /** Evento de Monitoreo que dio origen a este hallazgo, si vino de "Eventos asignados". */
    id_evento_monitoreo?: number | undefined;
}
/**
 * Desde dónde se registró el reporte. Cambia la bitácora y el aviso, no los
 * campos: un reporte creado por el analista en el panel de Seguridad Operativa
 * queda firmado por él, no como "registrado por trabajador".
 */
export type OrigenReporte = "reportante" | "seguridad_operativa";
export interface UploadedFile {
    originalname: string;
    filename: string;
    mimetype: string;
    size: number;
}
//# sourceMappingURL=report.types.d.ts.map