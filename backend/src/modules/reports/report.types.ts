// Mismos campos que el wizard ya desplegado (sigma-l1-metromet.vercel.app,
// portal Reportante → Nuevo reporte): Tipo, Ubicación (Estación|Patio Taller
// + lugar específico opcional), Descripción, Evidencias, Envío (anónimo o
// identificado).
export interface CreateReportDto {
  id_tipo: number; // catálogo "Tipo de Reporte" -> eventos_operativos.tipo_incidente
  id_lugar: number; // catálogo "Lugar de Incidente" (estación o taller) -> eventos_operativos.lugar_incidente
  id_lugar_especifico?: number | null | undefined; // catálogo "Lugar Específico" -> eventos_operativos.ubicacion
  descripcion: string; // máx. 300 caracteres, igual que el wizard
  modalidad: "anonimo" | "identificado";
  nombre_reportante?: string | null | undefined; // requerido si modalidad = identificado
  correo_reportante?: string | null | undefined;
  telefono_reportante?: string | null | undefined;
}

export interface UploadedFile {
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
}
