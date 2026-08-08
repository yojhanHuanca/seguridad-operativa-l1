export interface CatalogItem {
  id_detalle: number;
  codigo: string | null;
  nombre: string;
  descripcion: string | null;
  color: string | null;
  orden: number | null;
}

export interface CatalogGroup {
  id_catalogo: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  catalogo_detalle: CatalogItem[];
}

export interface Area {
  id_area: number;
  nombre_area: string;
}

export interface CreateReportResult {
  codigo_sop: string;
  id_caso: number;
  id_evento: number;
}

export interface SolicitudInformacion {
  id_solicitud: number;
  mensaje: string;
  respuesta: string | null;
  respondida: boolean;
  fecha_solicitud: string | null;
  fecha_respuesta: string | null;
}

export interface ReportListItem {
  id_caso: number;
  codigo_sop: string;
  titulo: string | null;
  descripcion: string;
  fecha_hallazgo: string;
  fecha_evento: string | null;
  created_at: string;
  catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: string; color: string | null };
  catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: string };
  catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { nombre: string };
  areas: { nombre_area: string } | null;
  anexos_caso: { id_anexo: number }[];
  solicitudes_informacion: SolicitudInformacion[];
  evento_caso: {
    eventos_operativos: {
      catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { nombre: string } | null;
      catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { nombre: string } | null;
    };
  }[];
}
