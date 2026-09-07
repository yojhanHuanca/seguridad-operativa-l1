import { z } from "zod";
import { DatosOperativosRepository } from "./datos-operativos.repository.js";

const fechaSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD");
const numeroSchema = (label: string) => z.coerce.number({ error: `${label} debe ser numérico` }).finite().min(0, `${label} no puede ser negativo`).max(999999999999, `${label} es demasiado grande`);

const datosSchema = z.object({
  fecha: fechaSchema,
  qty_carreras: numeroSchema("QTY carreras"),
  qty_pasajeros: numeroSchema("QTY pasajeros"),
  km_comercial: numeroSchema("Km comercial"),
  km_no_comercial: numeroSchema("Km no comercial"),
  paradas_estacion: numeroSchema("Paradas en estación"),
});

function fechaUtc(fecha: string) {
  const partes = fecha.split("-").map(Number);
  const anio = partes[0];
  const mes = partes[1];
  const dia = partes[2];
  if (anio === undefined || mes === undefined || dia === undefined) throw new Error("La fecha no es válida");
  const resultado = new Date(Date.UTC(anio, mes - 1, dia));
  if (resultado.getUTCFullYear() !== anio || resultado.getUTCMonth() !== mes - 1 || resultado.getUTCDate() !== dia) {
    throw new Error("La fecha no es válida");
  }
  return resultado;
}

function validarFechaNoFutura(fecha: Date) {
  const ahora = new Date();
  const hoy = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate()));
  if (fecha > hoy) throw new Error("La fecha no puede ser posterior a hoy");
}

function serializar(item: {
  id_dato_operativo: number;
  fecha: Date;
  qty_carreras: unknown;
  qty_pasajeros: unknown;
  km_comercial: unknown;
  km_no_comercial: unknown;
  paradas_estacion: unknown;
  created_at: Date;
  updated_at: Date;
}) {
  return {
    ...item,
    qty_carreras: Number(item.qty_carreras),
    qty_pasajeros: Number(item.qty_pasajeros),
    km_comercial: Number(item.km_comercial),
    km_no_comercial: Number(item.km_no_comercial),
    paradas_estacion: Number(item.paradas_estacion),
  };
}

function parseId(id: unknown) {
  const value = Number(id);
  if (!Number.isInteger(value) || value <= 0) throw new Error("El registro solicitado no es válido");
  return value;
}

function parsePeriodo(value: unknown, label: string, minimo: Date, maximo: Date) {
  if (value == null || value === "") return undefined;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`${label} debe tener formato YYYY-MM-DD`);
  const fecha = fechaUtc(value);
  if (fecha < minimo || fecha > maximo) throw new Error(`${label} no es válida`);
  return fecha;
}

export class DatosOperativosService {
  static async list(query: { desde?: unknown; hasta?: unknown; page?: unknown; limit?: unknown }) {
    const minimo = new Date(Date.UTC(2000, 0, 1));
    const maximo = new Date(Date.UTC(2100, 11, 31));
    const desde = parsePeriodo(query.desde, "La fecha inicial", minimo, maximo);
    const hasta = parsePeriodo(query.hasta, "La fecha final", minimo, maximo);
    if (desde && hasta && desde > hasta) throw new Error("La fecha inicial no puede ser posterior a la fecha final");

    const page = Math.max(1, Math.floor(Number(query.page) || 1));
    const limit = Math.min(100, Math.max(1, Math.floor(Number(query.limit) || 25)));
    const filtros = { page, limit, ...(desde ? { desde } : {}), ...(hasta ? { hasta } : {}) };
    const result = await DatosOperativosRepository.findAll(filtros);
    return { items: result.items.map(serializar), total: result.total, page, limit };
  }

  static async create(input: unknown) {
    const parsed = datosSchema.parse(input);
    const fecha = fechaUtc(parsed.fecha);
    validarFechaNoFutura(fecha);
    const existente = await DatosOperativosRepository.findByFecha(fecha);
    if (existente) throw new Error("Ya existe un registro para esa fecha");
    return serializar(await DatosOperativosRepository.create({ ...parsed, fecha }));
  }

  static async update(id: unknown, input: unknown) {
    const parsed = datosSchema.parse(input);
    const idDato = parseId(id);
    const fecha = fechaUtc(parsed.fecha);
    validarFechaNoFutura(fecha);
    const existente = await DatosOperativosRepository.findByFecha(fecha);
    if (existente && existente.id_dato_operativo !== idDato) throw new Error("Ya existe otro registro para esa fecha");
    return serializar(await DatosOperativosRepository.update(idDato, { ...parsed, fecha }));
  }

  static async remove(id: unknown) {
    await DatosOperativosRepository.remove(parseId(id));
  }
}
