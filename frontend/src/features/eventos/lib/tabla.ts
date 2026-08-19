import type { ReactNode } from "react";
import { formatDate, formatTime } from "@/lib/format";
import type { EventoListItem } from "../types";

// Encabezados y orden exactos de la hoja "LISTA DE EVENTOS" del Excel del
// cliente ("Base para proyecto plataforma SOP.xlsm") — no inventar columnas
// nuevas ni reordenar, para que el CSV se pueda pegar directo en ese archivo.
export const CSV_HEADERS = [
  "Fecha", "Hora de evento", "Año", "Mes", "Mes_1", "Sem", "Día", "Rango horario",
  "Tipo de incidente operativo", "Descripción del evento", "Ubicación", "Tipo de vía",
  "Dirección de vía", "Lugar de Incidente", "Modelo MR", "Nro. MR", "Nro. Carrera",
  "Personal o falla Involucrado", "Tipo Causa", "Posible Causa", "Información adicional",
  "Cámara monitoreada", "DEMORA",
];

const MESES_ABR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DIAS_ABR: Record<string, string> = {
  Domingo: "dom", Lunes: "lun", Martes: "mar", Miércoles: "mié", Jueves: "jue", Viernes: "vie", Sábado: "sáb",
};

export function fechaEvento(iso: string) {
  const d = new Date(iso);
  const dia = String(d.getUTCDate()).padStart(2, "0");
  const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${d.getUTCFullYear()}`;
}

export function horaEvento(iso: string | null) {
  if (!iso) return "";
  const match = iso.match(/T(\d{2}:\d{2})/);
  return match?.[1] ?? formatTime(iso);
}

export function nombreTipo(e: EventoListItem) {
  return e.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "Sin tipo";
}

export function nombreLugar(e: EventoListItem) {
  return e.catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?.nombre ?? "Sin lugar";
}

export function nombreUbicacion(e: EventoListItem) {
  return e.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre ?? "Sin ubicación";
}

export function nombreAsignado(e: EventoListItem) {
  return e.usuarios_eventos_monitoreo_asignado_aTousuarios?.nombre ?? null;
}

export function resumenEvento(e: EventoListItem) {
  return [nombreLugar(e), nombreUbicacion(e)].filter(Boolean).join(" · ");
}

export function filaCsv(e: EventoListItem) {
  return [
    fechaEvento(e.fecha),
    horaEvento(e.hora),
    e.anio,
    e.mes ? MESES_ABR[e.mes - 1] : "",
    e.mes ? String(e.mes).padStart(2, "0") : "",
    e.semana,
    e.dia ? (DIAS_ABR[e.dia] ?? e.dia) : "",
    e.catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre,
    e.descripcion,
    e.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?.nombre,
    e.numero_carrera,
    e.catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?.nombre,
    e.catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?.nombre,
    e.informacion_adicional,
    e.camara_monitoreada,
    e.demora,
  ];
}

export function coincideBusqueda(evento: EventoListItem, query: string) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return (
    (evento.descripcion ?? "").toLowerCase().includes(q) ||
    (evento.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "").toLowerCase().includes(q) ||
    (evento.catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?.nombre ?? "").toLowerCase().includes(q) ||
    (evento.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre ?? "").toLowerCase().includes(q) ||
    (evento.camara_monitoreada ?? "").toLowerCase().includes(q)
  );
}

export const COLUMNAS_EVENTO_RESUMEN: { header: string; render: (e: EventoListItem) => ReactNode; nowrap?: boolean; className?: string }[] = [
  { header: "Fecha", render: (e) => formatDate(e.fecha), nowrap: true },
  { header: "Hora", render: (e) => horaEvento(e.hora) || "—", nowrap: true },
  { header: "Tipo", render: nombreTipo, nowrap: true },
  { header: "Lugar", render: resumenEvento, nowrap: true },
  { header: "Descripción", render: (e) => e.descripcion || "—" },
];

/**
 * Columnas de la tabla en pantalla — mismo orden y contenido que el Excel
 * (CSV_HEADERS), más Estado y Acciones al final, que son propias de la app.
 * Compartidas entre el Dashboard y el Historial para no duplicar la tabla.
 */
export const COLUMNAS_EVENTO: { header: string; render: (e: EventoListItem) => ReactNode; nowrap?: boolean; className?: string }[] = [
  { header: "Fecha", render: (e) => fechaEvento(e.fecha), nowrap: true },
  { header: "Hora de evento", render: (e) => horaEvento(e.hora) || "—", nowrap: true },
  { header: "Año", render: (e) => e.anio ?? "—", nowrap: true },
  { header: "Mes", render: (e) => (e.mes ? MESES_ABR[e.mes - 1] : "—"), nowrap: true },
  { header: "Mes_1", render: (e) => (e.mes ? String(e.mes).padStart(2, "0") : "—"), nowrap: true },
  { header: "Sem", render: (e) => e.semana ?? "—", nowrap: true },
  { header: "Día", render: (e) => e.dia ?? "—", nowrap: true },
  { header: "Rango horario", render: (e) => e.catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Tipo de incidente operativo", render: (e) => e.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Descripción del evento", render: (e) => e.descripcion || "—" },
  { header: "Ubicación", render: (e) => e.catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Tipo de vía", render: (e) => e.catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Dirección de vía", render: (e) => e.catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Lugar de Incidente", render: (e) => e.catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Modelo MR", render: (e) => e.catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Nro. MR", render: (e) => e.catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Nro. Carrera", render: (e) => e.numero_carrera ?? "—", nowrap: true },
  { header: "Personal o falla Involucrado", render: (e) => e.catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Tipo Causa", render: (e) => e.catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Posible Causa", render: (e) => e.catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle?.nombre ?? "—", nowrap: true },
  { header: "Información adicional", render: (e) => e.informacion_adicional || "—" },
  { header: "Cámara monitoreada", render: (e) => e.camara_monitoreada ?? "—", nowrap: true },
  { header: "DEMORA", render: (e) => e.demora ?? "—", nowrap: true },
];
