export interface CreateReportDto {
    id_tipo: number;
    id_lugar: number;
    id_lugar_especifico?: number | null | undefined;
    descripcion: string;
    modalidad: "anonimo" | "identificado";
    nombre_reportante?: string | null | undefined;
    correo_reportante?: string | null | undefined;
    telefono_reportante?: string | null | undefined;
}
export interface UploadedFile {
    originalname: string;
    filename: string;
    mimetype: string;
    size: number;
}
//# sourceMappingURL=report.types.d.ts.map