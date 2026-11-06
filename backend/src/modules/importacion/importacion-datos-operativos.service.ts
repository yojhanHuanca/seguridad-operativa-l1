import prisma from "../../lib/prisma.js";
import { ConfiguracionService } from "../configuracion/configuracion.service.js";
import { withImportLock } from "./import-lock.js";

type Row = Record<string, string | number | boolean | null | undefined>;
type Payload = { filename: string | null; hoja?: string | undefined; rows: Row[] };
const required = ["Fecha", "QTY carreras", "QTY pasajeros", "Km no comercial", "Afluencia diaria"];
const optional = ["Km comercial", "Paradas en estación"];
const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const field = (r: Row, key: string) => Object.entries(r).find(([name]) => normalize(name) === normalize(key))?.[1];
const blank = (v: unknown) => v == null || String(v).trim() === "";
function numeric(v: unknown, integer: boolean): number | null {
  if (blank(v)) return null;
  let s = String(v).trim().replace(/\s/g, "");
  if (s.includes(",") && s.includes(".")) s = s.lastIndexOf(",") > s.lastIndexOf(".") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
  else if (s.includes(",")) s = /^\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, "") : s.replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 && n <= 999999999999 && (!integer || Number.isInteger(n)) ? n : null;
}
function dateValue(v: unknown): { iso: string; date: Date } | null {
  const s = String(v ?? "").trim();
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s) ?? /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (!m) return null;
  const iso = s.includes("/") ? `${m[3]}-${m[2]!.padStart(2, "0")}-${m[1]!.padStart(2, "0")}` : s;
  const date = new Date(`${iso}T00:00:00.000Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== iso || iso > new Date().toISOString().slice(0, 10)) return null;
  return { iso, date };
}
const roundKm = (n: number) => Math.round(n);
async function stationCount() {
  const catalog = await prisma.catalogos.findFirst({ where: { nombre: "Lugar de Incidente", estado: true }, select: { catalogo_detalle: { where: { estado: true }, select: { nombre: true, codigo: true } } } });
  if (!catalog) return 26;
  return catalog.catalogo_detalle.filter(item => item.codigo !== "PATIO" && !/^(taller|patio taller|patio de maniobras|maniobras bayovar|exteriores)/i.test(item.nombre.trim())).length;
}

export class ImportacionDatosOperativosService {
  static async validar(payload: Payload) {
    const [config, estaciones] = await Promise.all([ConfiguracionService.get(), stationCount()]);
    const kmPorCarrera = config.operacion.kmPorCarrera;
    const issues: { row: number; field: string; severity: "error" | "warning"; message: string; value: string | null }[] = [];
    const headers = new Set(Object.keys(payload.rows[0] ?? {}).map(normalize));
    for (const name of required) if (!headers.has(normalize(name))) issues.push({ row: 1, field: name, severity: "error", message: "Falta la columna obligatoria.", value: null });
    const seen = new Set<string>();
    const dates = payload.rows.map(r => dateValue(field(r, "Fecha"))?.date).filter((v): v is Date => !!v);
    const existing = new Set((await prisma.datos_operativos.findMany({ where: { fecha: { in: dates } }, select: { fecha: true } })).map(x => x.fecha.toISOString().slice(0, 10)));
    const operativos = payload.rows.map((row, i) => {
      const rowNumber = i + 2;
      const before = issues.length;
      const fecha = dateValue(field(row, "Fecha"));
      if (!fecha) issues.push({ row: rowNumber, field: "Fecha", severity: "error", message: "Fecha inválida o futura.", value: String(field(row, "Fecha") ?? "") });
      const values: Record<string, number | null> = {};
      for (const [name, integer] of [["QTY carreras", true], ["QTY pasajeros", true], ["Km no comercial", false], ["Afluencia diaria", true], ["Km comercial", false], ["Paradas en estación", true]] as const) {
        const raw = field(row, name);
        const value = numeric(raw, integer);
        if (value === null && (required.includes(name) || !blank(raw))) issues.push({ row: rowNumber, field: name, severity: "error", message: blank(raw) ? "Campo obligatorio vacío." : "Se requiere un número no negativo válido.", value: String(raw ?? "") });
        values[name] = value;
      }
      let status: "valid" | "error" | "skipped" = issues.length > before ? "error" : "valid";
      if (fecha && status === "valid" && (seen.has(fecha.iso) || existing.has(fecha.iso))) {
        status = "skipped";
        issues.push({ row: rowNumber, field: "Fecha", severity: "warning", message: "La fecha ya existe y se omitirá.", value: fecha.iso });
      }
      if (fecha && status === "valid") seen.add(fecha.iso);
      const km = values["Km comercial"] ?? (values["QTY carreras"] == null ? null : roundKm(values["QTY carreras"]! * kmPorCarrera));
      const paradas = values["Paradas en estación"] ?? (values["QTY carreras"] == null ? null : values["QTY carreras"]! * estaciones);
      return { row: rowNumber, fecha: fecha?.iso ?? "", carreras: values["QTY carreras"], pasajeros: values["QTY pasajeros"], kmComercial: km, kmNoComercial: values["Km no comercial"], paradas, afluencia: values["Afluencia diaria"], kmCalculado: values["Km comercial"] === null, paradasCalculadas: values["Paradas en estación"] === null, status };
    });
    const errores = issues.filter(x => x.severity === "error").length;
    const advertencias = issues.filter(x => x.severity === "warning").length;
    const listos = operativos.filter(x => x.status === "valid").length;
    const duplicados = operativos.filter(x => x.status === "skipped").length;
    return { filename: payload.filename, resumen: { totalFilas: payload.rows.length, casosDetectados: payload.rows.length, planesDetectados: 0, listos, duplicados, errores, advertencias }, issues, cases: operativos.map(x => ({ row: x.row, codigo: x.fecha, titulo: `Datos del ${x.fecha}`, tipo: "Operación diaria", estado: x.status === "skipped" ? "Duplicado" : "Registro diario", estacion: "—", area: null, riesgo: null, fecha: x.fecha, planes: 0, status: x.status })), operativos, kmPorCarrera, estaciones, canImport: listos > 0, requiredColumns: required, optionalColumns: optional };
  }

  static async importar(payload: Payload, userId: number, expectedKm: number, expectedStations: number) {
    return withImportLock("datos_operativos", async () => {
      const currentKm = (await ConfiguracionService.get()).operacion.kmPorCarrera;
      if (currentKm !== expectedKm) throw new Error("El kilometraje por carrera cambió. Valida nuevamente el archivo.");
      const preview = await this.validar(payload);
      if (!preview.canImport) throw new Error("No hay fechas válidas nuevas para importar. Valida nuevamente.");
      if (preview.kmPorCarrera !== expectedKm || preview.estaciones !== expectedStations) throw new Error("La configuración operativa cambió. Valida nuevamente.");
      const ready = preview.operativos.filter(x => x.status === "valid");
      const saved = await prisma.$transaction(async tx => {
        const config = await ConfiguracionService.get(tx);
        if (config.operacion.kmPorCarrera !== expectedKm) throw new Error("La configuración cambió. Valida nuevamente.");
        if (await stationCount() !== expectedStations) throw new Error("El catálogo de estaciones cambió. Valida nuevamente.");
        const found = await tx.datos_operativos.findMany({ where: { fecha: { in: ready.map(x => new Date(`${x.fecha}T00:00:00.000Z`)) } }, select: { fecha: true } });
        if (found.length) throw new Error("Algunas fechas ya fueron registradas. Valida nuevamente.");
        const carga = await tx.importaciones.create({ data: { modulo: "datos_operativos", archivo: payload.filename || "Sin nombre", hoja: payload.hoja || null, usuario: userId, filas_total: payload.rows.length } });
        await tx.datos_operativos.createMany({ data: ready.map(x => ({ id_importacion: carga.id_importacion, fecha: new Date(`${x.fecha}T00:00:00.000Z`), qty_carreras: x.carreras!, qty_pasajeros: x.pasajeros!, afluencia: x.afluencia!, km_comercial: x.kmComercial!, km_no_comercial: x.kmNoComercial!, paradas_estacion: x.paradas! })) });
        await tx.importaciones.update({ where: { id_importacion: carga.id_importacion }, data: { estado: preview.resumen.errores ? "completado_con_errores" : "completado", completed_at: new Date(), importados: ready.length, duplicados: preview.resumen.duplicados, errores: preview.resumen.errores, resumen: { kmPorCarrera: expectedKm, registros: ready.length, errores: preview.resumen.errores } } });
        return carga.id_importacion;
      }, { timeout: 30000, isolationLevel: "Serializable" });
      return { ...preview, idImportacion: saved, canImport: false, imported: { casos: 0, eventos: ready.length, planes: 0, skipped: preview.resumen.duplicados } };
    });
  }
}
