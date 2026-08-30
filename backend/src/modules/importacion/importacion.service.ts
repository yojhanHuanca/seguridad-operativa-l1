import type { Prisma } from "../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { AuditoriaRepository } from "../auditoria/auditoria.repository.js";
import { ConfiguracionService } from "../configuracion/configuracion.service.js";
import { codigoSopSequence } from "../configuracion/codigo-sop.js";
import { SEQ_CASOS_SOP, advanceSequenceAtLeast } from "../configuracion/sequences.js";
import type {
  ImportacionIssue,
  ImportacionPayload,
  ImportacionPreview,
  ImportacionResult,
  ImportacionRow,
} from "./importacion.types.js";

const DIAS = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];

const REQUIRED_COLUMNS = ["Código", "Tipo", "Estado", "Fecha"];
const OPTIONAL_COLUMNS = [
  "Título",
  "Estación",
  "Reportante",
  "Área",
  "Riesgo",
  "Descripción",
  "Procedencia",
  "Tipo SOP",
  "Subtipo SOP",
  "Peligro",
  "Consecuencias",
  "ACR",
  "Responsable de Hallazgo",
  "Código Plan",
  "Descripción Plan",
  "Estado Plan",
  "Fecha Plan",
  "Fecha Reprogramada",
  "Área Plan",
  "Responsable Plan",
  "Observaciones Plan",
];

const CASE_ALIASES = {
  codigo: ["codigo", "código", "codigo sop", "código sop", "codigo_sop", "sop", "nuevo codigo", "nuevo código"],
  tipo: ["tipo", "tipo de reporte", "tipo_reporte"],
  titulo: ["titulo", "título", "title"],
  reportante: ["reportante", "nombre reportante", "nombre_reportante", "solicitante"],
  estacion: ["estacion", "estación", "lugar", "lugar incidente", "lugar_incidente"],
  area: ["area", "área", "area responsable", "área responsable", "area_responsable"],
  riesgo: ["riesgo", "analisis riesgo", "análisis riesgo", "analisis de riesgo", "análisis de riesgo"],
  estado: ["estado", "estado hallazgo", "estado_hallazgo"],
  fecha: ["fecha", "fecha hallazgo", "fecha_hallazgo", "fecha evento", "fecha_evento", "fecha del hallazgo", "fecha de evento"],
  descripcion: ["descripcion", "descripción", "detalle", "observacion", "observación"],
  procedencia: ["procedencia"],
  tipoSop: ["tipo sop", "tipo_sop"],
  subtipoSop: ["subtipo sop", "subtipo_sop", "subtipo"],
  peligro: ["peligro"],
  consecuencia: ["consecuencias", "consecuencia"],
  acr: ["acr"],
  responsableHallazgo: [
    "responsable de hallazgo",
    "responsable hallazgo",
    "responsable de hallazgo/ investigacion/ rso",
    "responsable de hallazgo/investigacion/rso",
    "responsable de investigacion",
    "responsable rso",
  ],
} as const;

const PLAN_ALIASES = {
  codigo: ["codigo plan", "código plan", "codigo_plan", "plan", "id plan", "plan de accion", "plan de acción"],
  descripcion: [
    "descripcion plan",
    "descripción plan",
    "descripcion_plan",
    "descripcion de plan de accion",
    "descripción de plan de acción",
  ],
  estado: ["estado plan", "estado_plan", "estado plan de accion", "estado plan de acción"],
  fecha: ["fecha plan", "fecha_plan", "vencimiento plan", "fecha vencimiento"],
  fechaReprogramada: ["fecha reprogramada", "fecha_reprogramada", "nueva fecha"],
  area: ["area plan", "área plan", "area_plan", "area responsable plan", "área responsable plan"],
  responsable: ["responsable plan", "responsable_plan", "responsable", "responsable plan de accion", "responsable plan de acción"],
  observaciones: ["observaciones plan", "observacion plan", "observación plan", "observaciones"],
} as const;

const DEFAULTS = {
  procedencia: "Incidencias",
  tipoSop: "Hallazgo",
  tipoCaso: "Observación",
  estadoPlan: "Cerrado",
} as const;

const EMPTY_RISK_VALUES = new Set(["", "sinevaluar", "sinriesgo", "naevaluar", "n/a", "na"]);

// La BD histórica escribe el riesgo como "4C Aceptable sin revisión" (código de matriz + nombre).
// El catálogo lo tiene separado (codigo="4C", nombre="Aceptable sin revisión"), así que se
// extrae el código inicial para resolverlo por "codigo" en vez de comparar la celda completa.
const RIESGO_CODE = /^([1-4][A-E])\b/i;
function extractRiesgoCode(value: string): string {
  const match = value.match(RIESGO_CODE);
  return match?.[1] ? match[1].toUpperCase() : value;
}

// La BD histórica usa palabras propias que no están en los catálogos actuales del sistema
// (compartidos con el formulario público de reporte). En vez de tocar esos catálogos, se
// traduce el valor de la BD histórica al equivalente que ya existe, solo para importación.
const TIPO_HALLAZGO_MAP: Record<string, string> = {
  noconformidad: "Hallazgo",
  observacion: "Hallazgo",
};
const ESTADO_HALLAZGO_MAP: Record<string, string> = {
  abierto: "En Proceso",
};
const ESTADO_PLAN_MAP: Record<string, string> = {
  abierto: "En Ejecución",
  enproceso: "En Ejecución",
  // El histórico marca así a los planes con prórroga pedida. Acá la prórroga
  // no es un estado del plan sino una solicitud aparte (`solicitudes_prorroga`),
  // y mientras se resuelve el plan sigue en ejecución.
  prorrogasolicitada: "En Ejecución",
};

function mapHistoricalValue(value: string, map: Record<string, string>): string {
  return map[normalizeText(value)] ?? value;
}

interface CatalogDetail {
  id_detalle: number;
  nombre: string;
  codigo: string | null;
  catalogo: string;
}

interface AreaRef {
  id_area: number;
  nombre_area: string;
}

interface UserRef {
  id_usuario: number;
  codigo_usuario: string;
  nombre: string;
  correo: string;
}

interface ParsedPlan {
  row: number;
  codigo: string | null;
  descripcion: string | null;
  estado: string | null;
  fecha: Date | null;
  fechaReprogramada: Date | null;
  area: string | null;
  responsable: string | null;
  observaciones: string | null;
}

interface ParsedCase {
  row: number;
  codigo: string;
  tipo: string;
  /** Opcional: la planilla histórica no trae columna "Título". */
  titulo: string | null;
  reportante: string | null;
  estacion: string;
  area: string | null;
  riesgo: string | null;
  estado: string;
  fecha: Date | null;
  descripcion: string;
  /** Estos seis son opcionales: sin su columna, se resuelven a los valores por defecto de siempre. */
  procedencia: string | null;
  tipoSop: string | null;
  subtipoSop: string | null;
  peligro: string | null;
  consecuencia: string | null;
  acr: string | null;
  responsableHallazgo: string | null;
  plans: ParsedPlan[];
}

interface PreparedPlan {
  row: number;
  codigo: string | null;
  descripcion: string;
  estadoId: number;
  fecha: Date;
  fechaReprogramada: Date | null;
  areaId: number;
  responsableId: number;
  observaciones: string | null;
}

interface PreparedCase {
  row: number;
  codigo: string;
  tipo: string;
  /** Opcional: la planilla histórica no trae columna "Título". */
  titulo: string | null;
  reportante: string | null;
  estacion: string;
  area: string | null;
  riesgo: string | null;
  estado: string;
  fecha: Date;
  descripcion: string;
  ids: {
    tipoReporte: number;
    estadoHallazgo: number;
    estacion: number | null;
    ubicacion: number | null;
    area: number | null;
    riesgo: number | null;
    procedencia: number;
    tipoSop: number;
    subtipoSop: number | null;
    tipoCaso: number;
    reportanteUsuario: number | null;
    responsableHallazgo: number | null;
  };
  peligro: string | null;
  consecuencia: string | null;
  acr: string | null;
  plans: PreparedPlan[];
}

interface BuildContext {
  catalogos: CatalogDetail[];
  areas: AreaRef[];
  usuarios: UserRef[];
  existingCodes: Set<string>;
  existingPlanCodes: Set<string>;
}

interface BuildResult {
  preview: ImportacionPreview;
  prepared: PreparedCase[];
}

type TxClient = Prisma.TransactionClient;

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function cleanCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "number" || typeof value === "boolean") return String(value).trim();
  return String(value).trim();
}

function displayValue(value: unknown): string | null {
  const clean = cleanCell(value);
  return clean || null;
}

function aliasesMatch(key: string, aliases: readonly string[]): boolean {
  const normalized = normalizeText(key);
  return aliases.some((alias) => normalized === normalizeText(alias));
}

function getCell(row: ImportacionRow, aliases: readonly string[]): string {
  for (const [key, value] of Object.entries(row)) {
    if (aliasesMatch(key, aliases)) return cleanCell(value);
  }
  return "";
}

function hasColumn(rows: ImportacionRow[], aliases: readonly string[]): boolean {
  return rows.some((row) => Object.keys(row).some((key) => aliasesMatch(key, aliases)));
}

function isEmptyRow(row: ImportacionRow): boolean {
  return Object.values(row).every((value) => cleanCell(value) === "");
}

function addIssue(issues: ImportacionIssue[], issue: ImportacionIssue): void {
  issues.push(issue);
}

function parseDate(value: string): Date | null {
  const raw = value.trim();
  if (!raw) return null;

  const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) return buildDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));

  const numeric = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (numeric) {
    const yearRaw = Number(numeric[3]);
    const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
    return buildDate(year, Number(numeric[2]), Number(numeric[1]));
  }

  const months: Record<string, number> = {
    ene: 1,
    enero: 1,
    feb: 2,
    febrero: 2,
    mar: 3,
    marzo: 3,
    abr: 4,
    abril: 4,
    may: 5,
    mayo: 5,
    jun: 6,
    junio: 6,
    jul: 7,
    julio: 7,
    ago: 8,
    agosto: 8,
    sep: 9,
    sept: 9,
    set: 9,
    septiembre: 9,
    setiembre: 9,
    oct: 10,
    octubre: 10,
    nov: 11,
    noviembre: 11,
    dic: 12,
    diciembre: 12,
  };
  const human = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/);
  if (human) return buildDate(Number(human[3]), months[human[2] ?? ""] ?? 0, Number(human[1]));

  const fallback = new Date(raw);
  if (!Number.isNaN(fallback.getTime())) {
    return buildDate(fallback.getFullYear(), fallback.getMonth() + 1, fallback.getDate());
  }
  return null;
}

function buildDate(year: number, month: number, day: number): Date | null {
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return null;
  return date;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function planHasData(row: ImportacionRow): boolean {
  return Object.values(PLAN_ALIASES).some((aliases) => getCell(row, aliases).trim() !== "");
}

function buildParsedCases(payload: ImportacionPayload, issues: ImportacionIssue[]): ParsedCase[] {
  const missingColumns = [
    { label: "Código", aliases: CASE_ALIASES.codigo },
    { label: "Tipo", aliases: CASE_ALIASES.tipo },
    { label: "Estado", aliases: CASE_ALIASES.estado },
    { label: "Fecha", aliases: CASE_ALIASES.fecha },
  ].filter((column) => !hasColumn(payload.rows, column.aliases));

  for (const column of missingColumns) {
    addIssue(issues, {
      row: 1,
      field: column.label,
      severity: "error",
      message: `Falta la columna obligatoria "${column.label}".`,
      value: null,
    });
  }

  const byCode = new Map<string, ParsedCase>();
  const parsed: ParsedCase[] = [];

  payload.rows.forEach((row, index) => {
    const rowNumber = index + 2;
    if (isEmptyRow(row)) return;

    const codigo = getCell(row, CASE_ALIASES.codigo);
    const tipo = getCell(row, CASE_ALIASES.tipo);
    const tituloRaw = getCell(row, CASE_ALIASES.titulo);
    const descripcionRaw = getCell(row, CASE_ALIASES.descripcion);
    // Sin columna "Título" el caso queda sin título, y la pantalla deriva uno
    // legible de la descripción. Antes se guardaban acá los primeros 200
    // caracteres de la descripción, que es el largo de la columna: eso dejaba
    // en la base un título cortado a mitad de palabra, que después se mostraba
    // como encabezado del expediente.
    const titulo = tituloRaw || null;
    const estacion = getCell(row, CASE_ALIASES.estacion);
    const estado = getCell(row, CASE_ALIASES.estado);
    const fechaRaw = getCell(row, CASE_ALIASES.fecha);
    const fecha = parseDate(fechaRaw);
    const reportante = getCell(row, CASE_ALIASES.reportante) || null;
    const area = getCell(row, CASE_ALIASES.area) || null;
    const riesgo = getCell(row, CASE_ALIASES.riesgo) || null;
    const descripcion = descripcionRaw || titulo || "";
    const procedencia = getCell(row, CASE_ALIASES.procedencia) || null;
    const tipoSop = getCell(row, CASE_ALIASES.tipoSop) || null;
    const subtipoSop = getCell(row, CASE_ALIASES.subtipoSop) || null;
    const peligro = getCell(row, CASE_ALIASES.peligro) || null;
    const consecuencia = getCell(row, CASE_ALIASES.consecuencia) || null;
    const acr = getCell(row, CASE_ALIASES.acr) || null;
    const responsableHallazgo = getCell(row, CASE_ALIASES.responsableHallazgo) || null;

    if (!codigo) addIssue(issues, requiredIssue(rowNumber, "Código", codigo));
    if (!tipo) addIssue(issues, requiredIssue(rowNumber, "Tipo", tipo));
    // El título pasó a ser opcional; la descripción es la que no puede faltar,
    // porque es de donde sale el encabezado del caso.
    if (!descripcion) addIssue(issues, requiredIssue(rowNumber, "Descripción", descripcion));
    if (!estado) addIssue(issues, requiredIssue(rowNumber, "Estado", estado));
    if (!fechaRaw) {
      addIssue(issues, requiredIssue(rowNumber, "Fecha", fechaRaw));
    } else if (!fecha) {
      addIssue(issues, {
        row: rowNumber,
        field: "Fecha",
        severity: "error",
        message: "La fecha no tiene un formato reconocido.",
        value: fechaRaw,
      });
    }
    if (codigo.length > 30) addIssue(issues, maxLengthIssue(rowNumber, "Código", codigo, 30));
    if (titulo && titulo.length > 200) addIssue(issues, maxLengthIssue(rowNumber, "Título", titulo, 200));
    if (reportante && reportante.length > 150) addIssue(issues, maxLengthIssue(rowNumber, "Reportante", reportante, 150));
    // ACR (análisis de causa raíz) es texto libre: el histórico trae párrafos
    // enteros. La columna era VarChar(50) y rechazaba casi todas las filas.

    const normalizedCode = codigo ? normalizeText(codigo) : "";
    const repeated = normalizedCode ? byCode.get(normalizedCode) : undefined;
    const parsedPlan = parsePlan(row, rowNumber, fecha, estado, area, issues);

    if (repeated) {
      if (parsedPlan) {
        repeated.plans.push(parsedPlan);
      } else {
        addIssue(issues, {
          row: rowNumber,
          field: "Código",
          severity: "error",
          message: `El código "${codigo}" está repetido en el archivo sin datos de plan.`,
          value: codigo,
        });
      }
      return;
    }

    const parsedCase: ParsedCase = {
      row: rowNumber,
      codigo,
      tipo,
      titulo,
      reportante,
      estacion,
      area,
      riesgo,
      estado,
      fecha,
      descripcion,
      procedencia,
      tipoSop,
      subtipoSop,
      peligro,
      consecuencia,
      acr,
      responsableHallazgo,
      plans: parsedPlan ? [parsedPlan] : [],
    };

    byCode.set(normalizedCode, parsedCase);
    parsed.push(parsedCase);
  });

  return parsed;
}

function requiredIssue(row: number, field: string, value: string): ImportacionIssue {
  return {
    row,
    field,
    severity: "error",
    message: `El campo "${field}" es obligatorio.`,
    value: displayValue(value),
  };
}

function maxLengthIssue(row: number, field: string, value: string, max: number): ImportacionIssue {
  return {
    row,
    field,
    severity: "error",
    message: `El campo "${field}" supera el máximo de ${max} caracteres.`,
    value,
  };
}

function parsePlan(
  row: ImportacionRow,
  rowNumber: number,
  fallbackDate: Date | null,
  caseState: string,
  caseArea: string | null,
  issues: ImportacionIssue[],
): ParsedPlan | null {
  if (!planHasData(row)) return null;

  const codigo = getCell(row, PLAN_ALIASES.codigo) || null;
  const descripcion = getCell(row, PLAN_ALIASES.descripcion) || null;
  const estado = getCell(row, PLAN_ALIASES.estado) || null;
  const fechaRaw = getCell(row, PLAN_ALIASES.fecha);
  const fecha = fechaRaw ? parseDate(fechaRaw) : fallbackDate;
  const fechaReprogramadaRaw = getCell(row, PLAN_ALIASES.fechaReprogramada);
  const fechaReprogramada = fechaReprogramadaRaw ? parseDate(fechaReprogramadaRaw) : null;
  const area = getCell(row, PLAN_ALIASES.area) || caseArea;
  const responsable = getCell(row, PLAN_ALIASES.responsable) || null;
  const observaciones = getCell(row, PLAN_ALIASES.observaciones) || null;

  if (!descripcion) addIssue(issues, requiredIssue(rowNumber, "Descripción Plan", descripcion ?? ""));
  if (!responsable) addIssue(issues, requiredIssue(rowNumber, "Responsable Plan", responsable ?? ""));
  if (!area) addIssue(issues, requiredIssue(rowNumber, "Área Plan", area ?? ""));
  if (fechaRaw && !fecha) {
    addIssue(issues, {
      row: rowNumber,
      field: "Fecha Plan",
      severity: "error",
      message: "La fecha del plan no tiene un formato reconocido.",
      value: fechaRaw,
    });
  }
  if (fechaReprogramadaRaw && !fechaReprogramada) {
    addIssue(issues, {
      row: rowNumber,
      field: "Fecha Reprogramada",
      severity: "error",
      message: "La fecha reprogramada no tiene un formato reconocido.",
      value: fechaReprogramadaRaw,
    });
  }
  if (!codigo) {
    addIssue(issues, {
      row: rowNumber,
      field: "Código Plan",
      severity: "warning",
      message: "No vino código de plan; se asignará uno con la numeración centralizada al importar.",
      value: null,
    });
  }
  if (!estado && normalizeText(caseState) !== "cerrado") {
    addIssue(issues, {
      row: rowNumber,
      field: "Estado Plan",
      severity: "warning",
      message: `No vino estado de plan; se usará "${DEFAULTS.estadoPlan}" para importación histórica.`,
      value: null,
    });
  }
  if (!fechaRaw && fallbackDate) {
    addIssue(issues, {
      row: rowNumber,
      field: "Fecha Plan",
      severity: "warning",
      message: "No vino fecha de plan; se usará la fecha del caso.",
      value: formatDate(fallbackDate),
    });
  }
  if (codigo && codigo.length > 50) addIssue(issues, maxLengthIssue(rowNumber, "Código Plan", codigo, 50));

  return {
    row: rowNumber,
    codigo,
    descripcion,
    estado: estado || DEFAULTS.estadoPlan,
    fecha,
    fechaReprogramada,
    area,
    responsable,
    observaciones,
  };
}

async function getBuildContext(parsed: ParsedCase[]): Promise<BuildContext> {
  const [catalogos, areas, usuarios, existingCases, existingPlans] = await Promise.all([
    // Sin filtrar por `estado`: los valores que solo existen en el histórico se
    // guardan desactivados para no ofrecerlos al registrar un reporte nuevo,
    // pero la importación igual tiene que poder reconocerlos.
    prisma.catalogos.findMany({
      include: { catalogo_detalle: { select: { id_detalle: true, nombre: true, codigo: true } } },
    }),
    prisma.areas.findMany({ select: { id_area: true, nombre_area: true } }),
    prisma.usuarios.findMany({ select: { id_usuario: true, codigo_usuario: true, nombre: true, correo: true } }),
    // Se traen todos los códigos, no solo los del archivo, porque la
    // comparación es normalizada y no se puede hacer con un `in` de SQL: el
    // histórico escribe el mismo caso como "SOP 01-2024" y sus planes como
    // "SOP-01-2024-PLA-01". Con la comparación exacta anterior, ese caso no se
    // reconocía como ya importado y sus planes chocaban igual, dejando un error
    // que bloqueaba el archivo entero. Son cadenas cortas: traerlas todas pesa
    // poco incluso con decenas de miles de casos.
    prisma.casos_sop.findMany({ select: { codigo_sop: true } }),
    prisma.planes_accion.findMany({ select: { codigo_plan: true } }),
  ]);

  return {
    catalogos: catalogos.flatMap((catalogo) =>
      catalogo.catalogo_detalle.map((detalle) => ({
        id_detalle: detalle.id_detalle,
        nombre: detalle.nombre,
        codigo: detalle.codigo,
        catalogo: catalogo.nombre,
      })),
    ),
    areas,
    usuarios,
    existingCodes: new Set(existingCases.map((item) => normalizeText(item.codigo_sop))),
    existingPlanCodes: new Set(existingPlans.map((item) => normalizeText(item.codigo_plan))),
  };
}

function resolveCatalog(
  ctx: BuildContext,
  catalogName: string,
  value: string,
  row: number,
  field: string,
  issues: ImportacionIssue[],
): CatalogDetail | null {
  const found = ctx.catalogos.find(
    (item) =>
      normalizeText(item.catalogo) === normalizeText(catalogName) &&
      (normalizeText(item.nombre) === normalizeText(value) || (item.codigo ? normalizeText(item.codigo) === normalizeText(value) : false)),
  );

  if (!found) {
    addIssue(issues, {
      row,
      field,
      severity: "error",
      message: `No existe "${value}" en el catálogo "${catalogName}".`,
      value,
    });
  }
  return found ?? null;
}

/**
 * Como `resolveCatalog`, pero para columnas opcionales de la BD histórica
 * (Procedencia, Tipo SOP, Subtipo SOP): si el valor no viene o no coincide
 * con ningún detalle del catálogo, no bloquea la fila — solo avisa y cae al
 * `fallback` (el valor por defecto, o `null` si el campo es opcional de verdad).
 */
function resolveCatalogOrDefault(
  ctx: BuildContext,
  catalogName: string,
  value: string | null,
  fallback: CatalogDetail | null,
  row: number,
  field: string,
  issues: ImportacionIssue[],
): CatalogDetail | null {
  if (!value) return fallback;
  const found = ctx.catalogos.find(
    (item) =>
      normalizeText(item.catalogo) === normalizeText(catalogName) &&
      (normalizeText(item.nombre) === normalizeText(value) || (item.codigo ? normalizeText(item.codigo) === normalizeText(value) : false)),
  );
  if (!found) {
    addIssue(issues, {
      row,
      field,
      severity: "warning",
      // Los catálogos ampliables se completan solos al importar; el resto sí
      // cae al valor por defecto, y conviene que el aviso lo diga distinto.
      message: (CATALOGOS_AMPLIABLES as readonly string[]).includes(catalogName)
        ? `No existe "${value}" en el catálogo "${catalogName}"; se agregará desactivado al importar y el caso conservará su clasificación.`
        : `No existe "${value}" en el catálogo "${catalogName}"; se usará el valor por defecto.`,
      value,
    });
    return fallback;
  }
  return found;
}

function resolveRequiredDefault(ctx: BuildContext, catalogName: string, value: string, issues: ImportacionIssue[]): CatalogDetail | null {
  const found = ctx.catalogos.find(
    (item) => normalizeText(item.catalogo) === normalizeText(catalogName) && normalizeText(item.nombre) === normalizeText(value),
  );
  if (!found) {
    addIssue(issues, {
      row: 1,
      field: catalogName,
      severity: "error",
      message: `Falta el valor base "${value}" en el catálogo "${catalogName}".`,
      value,
    });
  }
  return found ?? null;
}

function resolveArea(ctx: BuildContext, value: string | null, row: number, field: string, issues: ImportacionIssue[]): AreaRef | null {
  if (!value) return null;
  const direct = ctx.areas.find((area) => normalizeText(area.nombre_area) === normalizeText(value));
  // La BD histórica a veces junta dos áreas responsables en una celda ("MR / INGENIERIA");
  // si no hay coincidencia exacta, se prueba cada parte separada por "/".
  const found =
    direct ??
    (value.includes("/")
      ? value
          .split("/")
          .map((part) => part.trim())
          .filter(Boolean)
          .map((part) => ctx.areas.find((area) => normalizeText(area.nombre_area) === normalizeText(part)))
          .find((match): match is AreaRef => Boolean(match))
      : undefined);

  if (!found) {
    // Aviso, no error: no bloquea la importación de los demás casos/planes del archivo.
    // El caso puede guardarse sin área; un plan sin área reconocida se omite (el área es obligatoria en planes_accion).
    addIssue(issues, {
      row,
      field,
      severity: "warning",
      message: `No existe el área "${value}"; se creará al importar.`,
      value,
    });
  }
  return found ?? null;
}

function resolveUser(ctx: BuildContext, value: string | null): UserRef | null {
  if (!value) return null;
  return (
    ctx.usuarios.find(
      (usuario) =>
        normalizeText(usuario.nombre) === normalizeText(value) ||
        normalizeText(usuario.correo) === normalizeText(value) ||
        normalizeText(usuario.codigo_usuario) === normalizeText(value),
    ) ?? null
  );
}

/**
 * Catálogos donde un valor desconocido del histórico se da de alta solo para
 * ese archivo, en vez de reemplazarlo por el valor por defecto.
 *
 * Son los tres que solo clasifican: no cambian cómo se comporta el sistema. El
 * estado del caso o del plan queda afuera a propósito — inventar un estado
 * rompería el flujo de trabajo, así que ahí un valor desconocido sigue siendo
 * un error que hay que corregir en la planilla.
 */
const CATALOGOS_AMPLIABLES = ["Procedencia", "Tipo SOP", "Subtipo SOP"] as const;

interface ReferenciasCreadas {
  usuarios: number;
  areas: number;
  catalogos: number;
}

/**
 * Da de alta lo que el archivo menciona y el sistema todavía no tiene.
 *
 * El histórico nombra gente que ya no trabaja acá, áreas que se reorganizaron y
 * clasificaciones viejas. Antes, cada una de esas menciones costaba datos: un
 * plan cuyo responsable no existía se descartaba entero (el responsable es
 * obligatorio en `planes_accion`), y una clasificación desconocida se cambiaba
 * en silencio por el valor por defecto, dejando el archivo mal clasificado sin
 * ningún rastro.
 *
 * Todo lo que se crea acá nace inactivo: no aparece al registrar un reporte
 * nuevo ni al asignar un plan, pero el caso histórico conserva su dato real.
 * Corre solo al importar, nunca al validar — la vista previa no escribe nada.
 */
async function crearReferenciasFaltantes(payload: ImportacionPayload): Promise<ReferenciasCreadas> {
  const parsed = buildParsedCases(payload, []);
  const ctx = await getBuildContext(parsed);
  const creadas: ReferenciasCreadas = { usuarios: 0, areas: 0, catalogos: 0 };

  const nombresUsuario = new Set<string>();
  const nombresArea = new Set<string>();
  const valoresCatalogo = new Map<string, Set<string>>();

  const anotarArea = (valor: string | null) => {
    if (valor?.trim() && !resolveArea(ctx, valor, 0, "", [])) nombresArea.add(valor.trim());
  };
  const anotarUsuario = (valor: string | null) => {
    if (valor?.trim() && !isAnonymousReporter(valor) && !resolveUser(ctx, valor)) nombresUsuario.add(valor.trim());
  };

  for (const item of parsed) {
    anotarUsuario(item.responsableHallazgo);
    anotarArea(item.area);
    for (const catalogo of CATALOGOS_AMPLIABLES) {
      const valor = catalogo === "Procedencia" ? item.procedencia : catalogo === "Tipo SOP" ? item.tipoSop : item.subtipoSop;
      if (!valor?.trim()) continue;
      const existe = ctx.catalogos.some(
        (detalle) => normalizeText(detalle.catalogo) === normalizeText(catalogo) && normalizeText(detalle.nombre) === normalizeText(valor),
      );
      if (existe) continue;
      if (!valoresCatalogo.has(catalogo)) valoresCatalogo.set(catalogo, new Set());
      valoresCatalogo.get(catalogo)!.add(valor.trim());
    }
    for (const plan of item.plans) {
      anotarUsuario(plan.responsable);
      anotarArea(plan.area);
    }
  }

  if (nombresArea.size === 0 && nombresUsuario.size === 0 && valoresCatalogo.size === 0) return creadas;

  await prisma.$transaction(
    async (tx) => {
      if (nombresArea.size > 0) {
        const { count } = await tx.areas.createMany({
          data: [...nombresArea].map((nombre) => ({ nombre_area: nombre.slice(0, 100) })),
          skipDuplicates: true,
        });
        creadas.areas = count;
      }

      if (nombresUsuario.size > 0) {
        // El correo y el código son únicos y obligatorios: se derivan del nombre
        // con un sufijo del archivo histórico, que no colisiona con los reales.
        const base = await tx.usuarios.count();
        const { count } = await tx.usuarios.createMany({
          data: [...nombresUsuario].map((nombre, i) => ({
            codigo_usuario: `HIST-${String(base + i + 1).padStart(5, "0")}`,
            nombre: nombre.slice(0, 150),
            correo: `${slugCorreo(nombre)}.${base + i + 1}@historico.local`,
            estado: "Inactivo",
          })),
          skipDuplicates: true,
        });
        creadas.usuarios = count;
      }

      for (const [catalogo, valores] of valoresCatalogo) {
        const cab = await tx.catalogos.findFirst({ where: { nombre: catalogo }, select: { id_catalogo: true } });
        if (!cab) continue;
        const { count } = await tx.catalogo_detalle.createMany({
          data: [...valores].map((nombre) => ({ id_catalogo: cab.id_catalogo, nombre: nombre.slice(0, 200), estado: false })),
          skipDuplicates: true,
        });
        creadas.catalogos += count;
      }
    },
    { timeout: IMPORT_TIMEOUT_MS, maxWait: 30_000 },
  );

  return creadas;
}

/**
 * Convierte los errores de escritura de Postgres en algo accionable.
 *
 * Cuando la base de un entorno todavía no tiene aplicado el último cambio de
 * schema, el insert masivo falla con "value too long for the column's type" y
 * ni siquiera dice cuál columna (Postgres no la reporta en un INSERT de miles
 * de filas). Sin este mensaje, el único indicio es un error de Prisma en
 * pantalla que no lleva a ningún lado.
 */
function traducirErrorDeEscritura(error: unknown): Error {
  const mensaje = error instanceof Error ? error.message : String(error);
  if (/too long for the column/i.test(mensaje)) {
    return new Error(
      "La base de datos rechazó un valor por ser demasiado largo para su columna. " +
        "Suele pasar cuando el entorno todavía no tiene aplicado el último cambio de esquema: " +
        "ejecute `npx prisma db push` contra esa base y vuelva a intentar.",
    );
  }
  if (/Transaction (already closed|not found)|timed out/i.test(mensaje)) {
    return new Error(
      "La importación superó el tiempo máximo de la transacción. Reintente; si el archivo es muy grande, divídalo en dos partes.",
    );
  }
  return error instanceof Error ? error : new Error(mensaje);
}

/** Parte local de un correo derivada del nombre: solo letras, números y puntos. */
function slugCorreo(nombre: string): string {
  return (
    normalizeText(nombre)
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/^\.+|\.+$/g, "")
      .slice(0, 40) || "usuario"
  );
}

function isAnonymousReporter(value: string | null): boolean {
  return !value || ["reporteanonimo", "anonimo", "anonymous", "n/a", "na"].includes(normalizeText(value));
}

function buildPreparedCases(parsed: ParsedCase[], ctx: BuildContext, issues: ImportacionIssue[]): PreparedCase[] {
  const prepared: PreparedCase[] = [];
  const defaultProcedencia = resolveRequiredDefault(ctx, "Procedencia", DEFAULTS.procedencia, issues);
  const defaultTipoSop = resolveRequiredDefault(ctx, "Tipo SOP", DEFAULTS.tipoSop, issues);
  const defaultTipoCaso = resolveRequiredDefault(ctx, "Tipo", DEFAULTS.tipoCaso, issues);

  for (const item of parsed) {
    if (!item.codigo || !item.tipo || !item.descripcion || !item.estado || !item.fecha) continue;

    if (ctx.existingCodes.has(normalizeText(item.codigo))) {
      addIssue(issues, {
        row: item.row,
        field: "Código",
        severity: "warning",
        message: `El caso "${item.codigo}" ya existe en el sistema y se omitirá para evitar duplicados.`,
        value: item.codigo,
      });
      continue;
    }

    const tipoReporte = resolveCatalog(ctx, "Tipo de Reporte", mapHistoricalValue(item.tipo, TIPO_HALLAZGO_MAP), item.row, "Tipo", issues);
    const estadoHallazgo = resolveCatalog(ctx, "Estado Hallazgo", mapHistoricalValue(item.estado, ESTADO_HALLAZGO_MAP), item.row, "Estado", issues);
    // La estación es opcional: la BD histórica no registra un lugar por caso.
    const estacion = item.estacion ? resolveCatalog(ctx, "Lugar de Incidente", item.estacion, item.row, "Estación", issues) : null;
    const area = resolveArea(ctx, item.area, item.row, "Área", issues);
    const riesgo =
      item.riesgo && !EMPTY_RISK_VALUES.has(normalizeText(item.riesgo))
        ? resolveCatalog(ctx, "Análisis de riesgo", extractRiesgoCode(item.riesgo), item.row, "Riesgo", issues)
        : null;
    const ubicacion = resolveUbicacionDesdeTitulo(ctx, item.titulo);
    const reportanteUsuario = isAnonymousReporter(item.reportante) ? null : resolveUser(ctx, item.reportante);
    // Estas tres, si la columna viene y no se reconoce, caen al valor por
    // defecto de siempre (o a null en subtipo, que no tiene uno) — no bloquean
    // el caso, para no romper archivos que ya funcionaban sin estas columnas.
    const procedencia = resolveCatalogOrDefault(ctx, "Procedencia", item.procedencia, defaultProcedencia, item.row, "Procedencia", issues);
    const tipoSop = resolveCatalogOrDefault(ctx, "Tipo SOP", item.tipoSop, defaultTipoSop, item.row, "Tipo SOP", issues);
    const subtipoSop = resolveCatalogOrDefault(ctx, "Subtipo SOP", item.subtipoSop, null, item.row, "Subtipo SOP", issues);
    const responsableHallazgo = resolveUser(ctx, item.responsableHallazgo);
    if (item.responsableHallazgo && !responsableHallazgo) {
      addIssue(issues, {
        row: item.row,
        field: "Responsable de Hallazgo",
        severity: "warning",
        message: `No existe un usuario para "${item.responsableHallazgo}"; se creará como usuario inactivo al importar.`,
        value: item.responsableHallazgo,
      });
    }

    const preparedPlans = buildPreparedPlans(item, ctx, issues);

    if (!tipoReporte || !estadoHallazgo || !procedencia || !tipoSop || !defaultTipoCaso) continue;

    prepared.push({
      row: item.row,
      codigo: item.codigo,
      tipo: item.tipo,
      titulo: item.titulo,
      reportante: isAnonymousReporter(item.reportante) ? null : item.reportante,
      estacion: item.estacion,
      area: item.area,
      riesgo: item.riesgo && !EMPTY_RISK_VALUES.has(normalizeText(item.riesgo)) ? item.riesgo : null,
      estado: item.estado,
      fecha: item.fecha,
      descripcion: item.descripcion,
      peligro: item.peligro,
      consecuencia: item.consecuencia,
      acr: item.acr,
      ids: {
        tipoReporte: tipoReporte.id_detalle,
        estadoHallazgo: estadoHallazgo.id_detalle,
        estacion: estacion?.id_detalle ?? null,
        ubicacion: ubicacion?.id_detalle ?? null,
        area: area?.id_area ?? null,
        riesgo: riesgo?.id_detalle ?? null,
        procedencia: procedencia.id_detalle,
        tipoSop: tipoSop.id_detalle,
        subtipoSop: subtipoSop?.id_detalle ?? null,
        tipoCaso: defaultTipoCaso.id_detalle,
        reportanteUsuario: reportanteUsuario?.id_usuario ?? null,
        responsableHallazgo: responsableHallazgo?.id_usuario ?? null,
      },
      plans: preparedPlans,
    });
  }

  return prepared;
}

function resolveUbicacionDesdeTitulo(ctx: BuildContext, titulo: string | null): CatalogDetail | null {
  if (!titulo) return null;
  const tail = titulo.split("·").pop()?.trim();
  if (!tail || normalizeText(tail) === normalizeText(titulo)) return null;
  return (
    ctx.catalogos.find(
      (item) => normalizeText(item.catalogo) === normalizeText("Lugar Específico") && normalizeText(item.nombre) === normalizeText(tail),
    ) ?? null
  );
}

function buildPreparedPlans(item: ParsedCase, ctx: BuildContext, issues: ImportacionIssue[]): PreparedPlan[] {
  const result: PreparedPlan[] = [];

  item.plans.forEach((plan) => {
    if (!plan.descripcion || !plan.fecha || !plan.responsable) return;

    const codigo = plan.codigo?.trim() || null;
    if (codigo && ctx.existingPlanCodes.has(normalizeText(codigo))) {
      // Si el caso ya está importado, sus planes tampoco se van a insertar: no
      // hay conflicto real que reportar. Antes esto era un error y bastaba con
      // un caso repetido en la planilla para bloquear el archivo entero.
      const casoYaExiste = ctx.existingCodes.has(normalizeText(item.codigo));
      addIssue(issues, {
        row: plan.row,
        field: "Código Plan",
        severity: casoYaExiste ? "warning" : "error",
        message: casoYaExiste
          ? `El plan "${codigo}" ya existe: pertenece al caso "${item.codigo}", que también se omitirá.`
          : `El plan "${codigo}" ya existe en el sistema.`,
        value: codigo,
      });
      return;
    }

    const estado = resolveCatalog(
      ctx,
      "Estado Plan de acción",
      mapHistoricalValue(plan.estado || DEFAULTS.estadoPlan, ESTADO_PLAN_MAP),
      plan.row,
      "Estado Plan",
      issues,
    );
    const area = resolveArea(ctx, plan.area || item.area, plan.row, "Área Plan", issues);
    const responsable = resolveUser(ctx, plan.responsable);
    if (!responsable) {
      // No bloquea la importación del caso: el plan se omite (no se inventa un responsable)
      // y queda como aviso para crear a esa persona como usuario más adelante si hace falta.
      addIssue(issues, {
        row: plan.row,
        field: "Responsable Plan",
        severity: "warning",
        message: `No existe un usuario para el responsable "${plan.responsable}"; se creará como usuario inactivo al importar y el plan conservará su responsable.`,
        value: plan.responsable,
      });
    }

    if (!estado || !area || !responsable) return;

    result.push({
      row: plan.row,
      codigo,
      descripcion: plan.descripcion,
      estadoId: estado.id_detalle,
      fecha: plan.fecha,
      fechaReprogramada: plan.fechaReprogramada,
      areaId: area.id_area,
      responsableId: responsable.id_usuario,
      observaciones: plan.observaciones,
    });
  });

  return result;
}

async function buildPreview(payload: ImportacionPayload): Promise<BuildResult> {
  const issues: ImportacionIssue[] = [];
  const parsed = buildParsedCases(payload, issues);
  const ctx = await getBuildContext(parsed);
  const prepared = buildPreparedCases(parsed, ctx, issues);
  const errorRows = new Set(issues.filter((issue) => issue.severity === "error").map((issue) => issue.row));
  const duplicateRows = new Set(
    issues
      .filter((issue) => issue.field === "Código" && issue.message.includes("se omitirá"))
      .map((issue) => issue.row),
  );
  const cases = parsed.map((item) => ({
    row: item.row,
    codigo: item.codigo || "Sin código",
    titulo: item.titulo || "Sin título",
    tipo: item.tipo || "Sin tipo",
    estado: item.estado || "Sin estado",
    estacion: item.estacion || "Sin estación",
    area: item.area,
    riesgo: item.riesgo && !EMPTY_RISK_VALUES.has(normalizeText(item.riesgo)) ? item.riesgo : null,
    fecha: item.fecha ? formatDate(item.fecha) : "Fecha inválida",
    planes: item.plans.length,
    status: errorRows.has(item.row) ? ("error" as const) : duplicateRows.has(item.row) ? ("skipped" as const) : ("valid" as const),
  }));

  const errores = issues.filter((issue) => issue.severity === "error").length;
  const advertencias = issues.filter((issue) => issue.severity === "warning").length;

  return {
    preview: {
      filename: payload.filename,
      resumen: {
        totalFilas: payload.rows.filter((row) => !isEmptyRow(row)).length,
        casosDetectados: parsed.length,
        planesDetectados: parsed.reduce((total, item) => total + item.plans.length, 0),
        listos: prepared.length,
        duplicados: duplicateRows.size,
        errores,
        advertencias,
      },
      issues,
      cases,
      canImport: errores === 0 && prepared.length > 0,
      requiredColumns: REQUIRED_COLUMNS,
      optionalColumns: OPTIONAL_COLUMNS,
    },
    prepared,
  };
}

/**
 * Postgres acepta 65535 parámetros por sentencia. Con ~25 columnas por fila,
 * mil filas por lote dejan margen de sobra y siguen siendo pocas sentencias:
 * un archivo de diez mil casos son diez inserciones, no diez mil.
 */
const INSERT_CHUNK = 1000;

/** Diez minutos: un histórico completo entra en segundos, pero el margen evita
 *  que una base lenta o un archivo enorme corte la importación por la mitad. */
const IMPORT_TIMEOUT_MS = 10 * 60 * 1000;

function enLotes<T>(items: T[], tamano: number): T[][] {
  const lotes: T[][] = [];
  for (let i = 0; i < items.length; i += tamano) lotes.push(items.slice(i, i + tamano));
  return lotes;
}

/**
 * Inserta todos los casos del archivo con operaciones masivas.
 *
 * Antes se insertaba caso por caso: cinco consultas por fila, en serie. Diez
 * mil casos eran cincuenta mil idas y vueltas a la base — minutos de reloj — y
 * la transacción se caía por tiempo mucho antes de terminar. Acá cada tipo de
 * registro se inserta de una sola vez por lote, así el costo depende de la
 * cantidad de lotes y no de la cantidad de filas.
 *
 * `createManyAndReturn` es lo que hace posible el cambio: devuelve los ids
 * recién creados, que es lo que obligaba a insertar de a uno para poder
 * colgarle a cada caso su evento y sus planes.
 */
async function createImportedCases(
  tx: TxClient,
  items: PreparedCase[],
  actorId: number,
): Promise<{ casos: number; eventos: number; planes: number }> {
  if (items.length === 0) return { casos: 0, eventos: 0, planes: 0 };

  // Los códigos de plan se resuelven todos juntos antes de insertar: pedirlos
  // caso por caso era el otro punto donde la importación se iba en consultas.
  const pedidos = items
    .map((item) => ({
      codigoSop: item.codigo,
      cantidad: item.plans.filter((plan) => !plan.codigo).length,
      codigosExistentes: item.plans.map((plan) => plan.codigo).filter((codigo): codigo is string => Boolean(codigo)),
    }))
    .filter((pedido) => pedido.cantidad > 0);
  const codigosGenerados = await ConfiguracionService.nextCodigosPlanBulk(tx, pedidos);

  const ahora = new Date();
  let planes = 0;

  for (const lote of enLotes(items, INSERT_CHUNK)) {
    const casos = await tx.casos_sop.createManyAndReturn({
      data: lote.map((item) => ({
        codigo_sop: item.codigo,
        titulo: item.titulo,
        nombre_reportante: item.reportante,
        fecha_hallazgo: item.fecha,
        fecha_evento: item.fecha,
        estado_hallazgo: item.ids.estadoHallazgo,
        dias_abierto: 0,
        procedencia: item.ids.procedencia,
        tipo: item.ids.tipoCaso,
        descripcion: item.descripcion,
        tipo_sop: item.ids.tipoSop,
        subtipo_sop: item.ids.subtipoSop,
        peligro: item.peligro,
        consecuencia: item.consecuencia,
        acr: item.acr,
        analisis_riesgo: item.ids.riesgo,
        area_responsable: item.ids.area,
        responsable_hallazgo: item.ids.responsableHallazgo,
        created_by: item.ids.reportanteUsuario,
        created_at: item.fecha,
        updated_at: ahora,
      })),
      select: { id_caso: true, codigo_sop: true },
    });

    // Se empareja por código y no por posición: `codigo_sop` es único, así que
    // el vínculo no depende de en qué orden devuelva las filas la base.
    const idPorCodigo = new Map(casos.map((caso) => [caso.codigo_sop, caso.id_caso]));
    const idDe = (item: PreparedCase) => {
      const id = idPorCodigo.get(item.codigo);
      if (id == null) throw new Error(`No se pudo recuperar el caso ${item.codigo} recién creado`);
      return id;
    };

    const eventos = await tx.eventos_operativos.createManyAndReturn({
      data: lote.map((item) => ({
        fecha: item.fecha,
        anio: item.fecha.getUTCFullYear(),
        mes: item.fecha.getUTCMonth() + 1,
        dia: DIAS[item.fecha.getUTCDay()] ?? null,
        tipo_incidente: item.ids.tipoReporte,
        lugar_incidente: item.ids.estacion,
        ubicacion: item.ids.ubicacion,
        descripcion: item.descripcion,
        usuario_registra: actorId,
        created_at: item.fecha,
        updated_at: ahora,
      })),
      select: { id_evento: true },
    });

    // Los eventos no tienen clave natural, así que acá sí se empareja por
    // posición. Es una sola sentencia INSERT ... RETURNING por lote, y Postgres
    // devuelve las filas en el mismo orden en que se enviaron.
    await tx.evento_caso.createMany({
      data: lote.map((item, i) => {
        const evento = eventos[i];
        if (!evento) throw new Error(`No se pudo recuperar el evento del caso ${item.codigo}`);
        return {
          id_evento: evento.id_evento,
          id_caso: idDe(item),
          usuario: actorId,
          fecha_conversion: ahora,
        };
      }),
    });

    const planesDelLote = lote.flatMap((item) => {
      const generados = [...(codigosGenerados.get(item.codigo) ?? [])];
      return item.plans.map((plan) => {
        const codigoPlan = plan.codigo ?? generados.shift();
        if (!codigoPlan) throw new Error(`No se pudo generar un código de plan para el caso ${item.codigo}`);
        return {
          id_caso: idDe(item),
          codigo_plan: codigoPlan,
          descripcion: plan.descripcion,
          id_area: plan.areaId,
          responsable: plan.responsableId,
          estado: plan.estadoId,
          fecha_plan: plan.fecha,
          fecha_reprogramada: plan.fechaReprogramada,
          dias_abierto: 0,
          observaciones: plan.observaciones,
          created_at: item.fecha,
          updated_at: ahora,
        };
      });
    });

    for (const lotePlanes of enLotes(planesDelLote, INSERT_CHUNK)) {
      await tx.planes_accion.createMany({ data: lotePlanes });
    }
    planes += planesDelLote.length;

    await tx.timeline_caso.createMany({
      data: lote.map((item) => ({
        id_caso: idDe(item),
        kind: "creado",
        actor: "Importación histórica",
        actor_rol: "admin",
        titulo: "Caso importado desde archivo histórico",
        detalle: `${item.codigo} fue importado con ${item.plans.length} plan(es) de acción.`,
        fecha: ahora,
      })),
    });
  }

  // Los casos importados traen su codigo_sop tal cual del Excel — nunca pasan
  // por `nextCodigoExpediente` — así que la secuencia de Postgres que genera
  // los códigos nuevos no se entera sola de hasta dónde llegó el histórico.
  // Sin este paso, el primer caso creado desde la web después de importar
  // podría repetir un número ya usado en el archivo.
  const { numeracion } = await ConfiguracionService.get(tx);
  const maxImportado = items.reduce((max, item) => {
    const sequence = codigoSopSequence(item.codigo, numeracion.prefijoExpedientes);
    return sequence == null ? max : Math.max(max, sequence);
  }, 0);
  if (maxImportado > 0) await advanceSequenceAtLeast(tx, SEQ_CASOS_SOP, maxImportado);

  return { casos: items.length, eventos: items.length, planes };
}

export class ImportacionService {
  static async validar(payload: ImportacionPayload): Promise<ImportacionPreview> {
    const { preview } = await buildPreview(payload);
    return preview;
  }

  static async importar(payload: ImportacionPayload, actorId: number, ip: string | null): Promise<ImportacionResult> {
    // Primero se dan de alta las personas, áreas y clasificaciones que el
    // archivo menciona y todavía no existen; recién después se arma la
    // importación, para que esas filas ya no se descarten ni se reclasifiquen.
    const referencias = await crearReferenciasFaltantes(payload);
    const { preview, prepared } = await buildPreview(payload);
    if (!preview.canImport) {
      if (preview.resumen.errores === 0 && prepared.length === 0) {
        throw new Error("No hay casos nuevos para importar. Los registros del archivo ya existen o fueron omitidos.");
      }
      throw new Error("El archivo tiene errores de validación. Corrige los datos antes de importar.");
    }

    // Todo el archivo entra en una sola transacción: o se importa completo o no
    // se importa nada. El `timeout` es explícito porque el de Prisma son cinco
    // segundos, insuficiente para un archivo del tamaño real del histórico.
    const imported = await prisma
      .$transaction(
        async (tx) => {
          const { casos, eventos, planes } = await createImportedCases(tx, prepared, actorId);
          return { casos, eventos, planes, skipped: 0 };
        },
        { timeout: IMPORT_TIMEOUT_MS, maxWait: 30_000 },
      )
      .catch((error: unknown) => {
        throw traducirErrorDeEscritura(error);
      });

    await AuditoriaRepository.registrar({
      tabla: "importacion_historica",
      accion: "crear",
      usuario: actorId,
      ip,
      descripcion:
        `Archivo ${payload.filename ?? "sin nombre"} importado: ${imported.casos} caso(s), ${imported.eventos} evento(s), ${imported.planes} plan(es).` +
        (referencias.usuarios + referencias.areas + referencias.catalogos > 0
          ? ` Se dieron de alta ${referencias.usuarios} usuario(s), ${referencias.areas} área(s) y ${referencias.catalogos} valor(es) de catálogo del histórico.`
          : ""),
    });

    return {
      ...preview,
      imported,
    };
  }
}
