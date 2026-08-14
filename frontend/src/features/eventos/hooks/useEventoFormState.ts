import { useMemo, useState } from "react";
import type { CreateEventoInput, EventoListItem } from "../types";

export interface EventoFormState {
  /** Texto libre "DD/MM/AAAA" — así se puede pegar directo desde el Excel. */
  fecha: string;
  /** Texto libre "HH:MM" — mismo motivo. */
  hora: string;
  // Los siguientes 5 se calculan solos a partir de fecha+hora, pero quedan
  // editables: el sistema los rellena automático y el usuario los puede
  // corregir a mano si hace falta (se piden así, no bloqueados).
  anio: string;
  mes: string;
  semana: string;
  dia: string;
  idRangoHorario: string;
  idTipoIncidente: string;
  descripcion: string;
  idUbicacion: string;
  idTipoVia: string;
  idDireccionVia: string;
  idLugarIncidente: string;
  idModeloMr: string;
  idNumeroMr: string;
  numeroCarrera: string;
  idPersonalInvolucrado: string;
  idTipoCausa: string;
  idPosibleCausa: string;
  informacionAdicional: string;
  camaraMonitoreada: string;
  demora: string;
}

const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

/** "12/08/2026" (o "12-08-2026") → {año, mes, día}, o null si no calza. */
function parseFecha(texto: string): { year: number; month: number; day: number } | null {
  const m = texto.trim().match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

/** "8:5" / "08:05" → "08:05", o null si no calza. */
function parseHora(texto: string): { hour: number; minute: number } | null {
  const m = texto.trim().match(/^(\d{1,2}):(\d{1,2})$/);
  if (!m) return null;
  const hour = Number(m[1]);
  const minute = Number(m[2]);
  if (hour > 23 || minute > 59) return null;
  return { hour, minute };
}

/** Fecha en formato pegado del Excel → ISO "AAAA-MM-DD" para el backend. */
export function fechaAIso(texto: string): string | null {
  const p = parseFecha(texto);
  if (!p) return null;
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

/** Hora en formato pegado → "HH:MM" (2 dígitos) para el backend. */
export function horaAIso(texto: string): string | null {
  const p = parseHora(texto);
  if (!p) return null;
  return `${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}`;
}

/** "08:00 - 09:59", mismo formato con el que está sembrado el catálogo "Rango horario". */
export function rangoHorarioLabel(hour: number): string {
  const inicio = Math.floor(hour / 2) * 2;
  return `${String(inicio).padStart(2, "0")}:00 - ${String(inicio + 1).padStart(2, "0")}:59`;
}

/** Recalcula año/mes/semana/día/rango a partir de fecha+hora — mismo cálculo que el backend. */
function calcularDerivados(fechaTexto: string, horaTexto: string) {
  const f = parseFecha(fechaTexto);
  const h = parseHora(horaTexto);
  if (!f) return null;

  const d = new Date(Date.UTC(f.year, f.month - 1, f.day));
  const inicioAnio = Date.UTC(f.year, 0, 1);
  const semana = Math.floor((d.getTime() - inicioAnio) / 86_400_000 / 7) + 1;
  return {
    anio: String(f.year),
    mes: String(f.month),
    semana: String(semana),
    dia: DIAS[d.getUTCDay()] ?? "",
    rangoLabel: h ? rangoHorarioLabel(h.hour) : null,
  };
}

function fechaDesdeIso(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}

function estadoVacio(): EventoFormState {
  const hoy = new Date();
  return {
    fecha: fechaDesdeIso(hoy.toISOString()),
    hora: hoy.toTimeString().slice(0, 5),
    anio: "",
    mes: "",
    semana: "",
    dia: "",
    idRangoHorario: "",
    idTipoIncidente: "",
    descripcion: "",
    idUbicacion: "",
    idTipoVia: "",
    idDireccionVia: "",
    idLugarIncidente: "",
    idModeloMr: "",
    idNumeroMr: "",
    numeroCarrera: "",
    idPersonalInvolucrado: "",
    idTipoCausa: "",
    idPosibleCausa: "",
    informacionAdicional: "",
    camaraMonitoreada: "",
    demora: "",
  };
}

function estadoDesdeEvento(evento: EventoListItem): EventoFormState {
  return {
    fecha: fechaDesdeIso(evento.fecha),
    hora: evento.hora ? evento.hora.slice(11, 16) : "",
    anio: evento.anio != null ? String(evento.anio) : "",
    mes: evento.mes != null ? String(evento.mes) : "",
    semana: evento.semana != null ? String(evento.semana) : "",
    dia: evento.dia ?? "",
    idRangoHorario: evento.rango_horario != null ? String(evento.rango_horario) : "",
    idTipoIncidente: String(evento.tipo_incidente),
    descripcion: evento.descripcion ?? "",
    idUbicacion: evento.ubicacion ? String(evento.ubicacion) : "",
    idTipoVia: evento.tipo_via ? String(evento.tipo_via) : "",
    idDireccionVia: evento.direccion_via ? String(evento.direccion_via) : "",
    idLugarIncidente: evento.lugar_incidente ? String(evento.lugar_incidente) : "",
    idModeloMr: evento.modelo_mr ? String(evento.modelo_mr) : "",
    idNumeroMr: evento.numero_mr ? String(evento.numero_mr) : "",
    numeroCarrera: evento.numero_carrera ?? "",
    idPersonalInvolucrado: evento.personal_involucrado ? String(evento.personal_involucrado) : "",
    idTipoCausa: evento.tipo_causa ? String(evento.tipo_causa) : "",
    idPosibleCausa: evento.posible_causa ? String(evento.posible_causa) : "",
    informacionAdicional: evento.informacion_adicional ?? "",
    camaraMonitoreada: evento.camara_monitoreada ?? "",
    demora: evento.demora ?? "",
  };
}

function completarDerivados(form: EventoFormState): EventoFormState {
  const derivados = calcularDerivados(form.fecha, form.hora);
  if (!derivados) return form;
  return {
    ...form,
    anio: derivados.anio,
    mes: derivados.mes,
    semana: derivados.semana,
    dia: derivados.dia,
  };
}

export function useEventoFormState(eventoInicial?: EventoListItem) {
  const [form, setForm] = useState<EventoFormState>(() => completarDerivados(eventoInicial ? estadoDesdeEvento(eventoInicial) : estadoVacio()));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof EventoFormState>(key: K, value: EventoFormState[K]) =>
    setForm((f) => {
      const siguiente = { ...f, [key]: value };
      return key === "fecha" || key === "hora" ? completarDerivados(siguiente) : siguiente;
    });

  const derivados = useMemo(() => calcularDerivados(form.fecha, form.hora), [form.fecha, form.hora]);
  const rangoLabel = derivados?.rangoLabel ?? null;

  const reset = () => {
    setForm(completarDerivados(eventoInicial ? estadoDesdeEvento(eventoInicial) : estadoVacio()));
    setErrors({});
  };

  const validate = () => {
    const nuevosErrores: Record<string, string> = {};
    if (!fechaAIso(form.fecha)) nuevosErrores.fecha = "Formato DD/MM/AAAA";
    if (!horaAIso(form.hora)) nuevosErrores.hora = "Formato HH:MM";
    if (!form.idTipoIncidente) nuevosErrores.idTipoIncidente = "Obligatorio";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "Obligatorio";
    if (!form.idUbicacion) nuevosErrores.idUbicacion = "Obligatorio";
    if (!form.idTipoVia) nuevosErrores.idTipoVia = "Obligatorio";
    if (!form.idDireccionVia) nuevosErrores.idDireccionVia = "Obligatorio";
    if (!form.idLugarIncidente) nuevosErrores.idLugarIncidente = "Obligatorio";
    if (!form.idModeloMr) nuevosErrores.idModeloMr = "Obligatorio";
    if (!form.idNumeroMr) nuevosErrores.idNumeroMr = "Obligatorio";
    if (!form.idPersonalInvolucrado) nuevosErrores.idPersonalInvolucrado = "Obligatorio";
    if (!form.idTipoCausa) nuevosErrores.idTipoCausa = "Obligatorio";
    if (!form.idPosibleCausa) nuevosErrores.idPosibleCausa = "Obligatorio";
    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const toInput = (): CreateEventoInput => ({
    fecha: fechaAIso(form.fecha) as string,
    hora: horaAIso(form.hora) as string,
    id_tipo_incidente: Number(form.idTipoIncidente),
    anio: form.anio ? Number(form.anio) : undefined,
    mes: form.mes ? Number(form.mes) : undefined,
    semana: form.semana ? Number(form.semana) : undefined,
    dia: form.dia.trim() || undefined,
    id_rango_horario: form.idRangoHorario ? Number(form.idRangoHorario) : undefined,
    descripcion: form.descripcion.trim() || undefined,
    id_ubicacion: form.idUbicacion ? Number(form.idUbicacion) : undefined,
    id_tipo_via: form.idTipoVia ? Number(form.idTipoVia) : undefined,
    id_direccion_via: form.idDireccionVia ? Number(form.idDireccionVia) : undefined,
    id_lugar_incidente: form.idLugarIncidente ? Number(form.idLugarIncidente) : undefined,
    id_modelo_mr: form.idModeloMr ? Number(form.idModeloMr) : undefined,
    id_numero_mr: form.idNumeroMr ? Number(form.idNumeroMr) : undefined,
    numero_carrera: form.numeroCarrera.trim() || undefined,
    id_personal_involucrado: form.idPersonalInvolucrado ? Number(form.idPersonalInvolucrado) : undefined,
    id_tipo_causa: form.idTipoCausa ? Number(form.idTipoCausa) : undefined,
    id_posible_causa: form.idPosibleCausa ? Number(form.idPosibleCausa) : undefined,
    informacion_adicional: form.informacionAdicional.trim() || undefined,
    camara_monitoreada: form.camaraMonitoreada.trim() || undefined,
    demora: form.demora.trim() ? Number(form.demora) : undefined,
  });

  return { form, set, errors, derivados, rangoLabel, reset, validate, toInput };
}
