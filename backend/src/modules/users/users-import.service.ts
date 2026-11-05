import { randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import prisma from "../../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";
import type { Actor } from "../../utils/actor.js";
import { BcryptHelper } from "../../utils/bcrypt.js";
import { UserRepository } from "./users.repository.js";

export const MAX_IMPORT_USERS = 200;
const text = z.string().trim().max(500);
// Lista cerrada: ningún dato de las otras columnas del padrón se acepta.
export const usersImportSchema = z.object({
  filename: z.string().trim().min(1).max(255),
  hoja: z.string().trim().min(1).max(100),
  rows: z.array(z.object({
    row: z.number().int().min(2).max(1_048_576),
    nombre: text,
    cargo: text,
    unidad_organizativa: text,
    correo: text,
    telefono: text,
    jefe_inmediato: text,
    id_rol: z.number().int().positive().nullable(),
  }).strict()).min(1).max(MAX_IMPORT_USERS),
  areas: z.array(z.object({ unidad_organizativa: text, id_area: z.number().int().positive() }).strict()).max(MAX_IMPORT_USERS),
}).strict();

type Payload = z.infer<typeof usersImportSchema>;
type Client = Pick<Prisma.TransactionClient, "areas" | "roles" | "usuarios">;
export type ImportUserRow = Payload["rows"][number];
export interface UserImportIssue { row: number; field: string; message: string }

export const unidadKey = (value: string) => value.normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase();

async function buildPreview(payload: Payload, client: Client) {
  const emails = [...new Set(payload.rows.map(row => row.correo.toLowerCase()).filter(Boolean))];
  const [areas, roles, existing] = await Promise.all([
    client.areas.findMany({ select: { id_area: true, nombre_area: true } }),
    client.roles.findMany({ select: { id_rol: true, nombre_rol: true } }),
    client.usuarios.findMany({
      where: { OR: emails.map(correo => ({ correo: { equals: correo, mode: "insensitive" as const } })) },
      select: { correo: true },
    }),
  ]);
  const existingEmails = new Set(existing.map(user => user.correo.toLowerCase()));
  const emailCounts = new Map<string, number>();
  const rowCounts = new Map<number, number>();
  payload.rows.forEach(row => {
    const email = row.correo.toLowerCase();
    emailCounts.set(email, (emailCounts.get(email) ?? 0) + 1);
    rowCounts.set(row.row, (rowCounts.get(row.row) ?? 0) + 1);
  });
  const mappings = new Map<string, number>();
  const ambiguous = new Set<string>();
  for (const mapping of payload.areas) {
    const key = unidadKey(mapping.unidad_organizativa);
    if (mappings.has(key) && mappings.get(key) !== mapping.id_area) ambiguous.add(key);
    mappings.set(key, mapping.id_area);
  }
  const issues: UserImportIssue[] = [];
  const rows = payload.rows.map(source => {
    const row = { ...source, correo: source.correo.toLowerCase() };
    const issue = (field: string, message: string) => issues.push({ row: row.row, field, message });
    const role = roles.find(item => item.id_rol === row.id_rol);
    const isAreaHead = role?.nombre_rol === "Jefe de Área";
    // La unidad del padrón es un dato laboral, no una asignación de permisos.
    // Incluso si llega una equivalencia antigua/manipulada, solo un Jefe recibe área.
    const areaId = isAreaHead ? mappings.get(unidadKey(row.unidad_organizativa)) : undefined;
    const area = isAreaHead ? areas.find(item => item.id_area === areaId) : undefined;
    if (!z.string().min(2).max(150).safeParse(row.nombre).success) issue("nombre", "Completa el nombre (entre 2 y 150 caracteres).");
    if (!row.cargo || row.cargo.length > 100) issue("cargo", "Completa el puesto (máximo 100 caracteres).");
    if (!row.unidad_organizativa || row.unidad_organizativa.length > 150) issue("unidad_organizativa", "Completa la unidad organizativa (máximo 150 caracteres).");
    if (!z.string().email().max(150).safeParse(row.correo).success) issue("correo", "Indica un correo laboral válido (máximo 150 caracteres).");
    if (row.telefono.length > 20) issue("telefono", "El celular no puede superar 20 caracteres.");
    if (row.jefe_inmediato.length > 150) issue("jefe_inmediato", "El jefe inmediato no puede superar 150 caracteres.");
    if (isAreaHead && (!area || ambiguous.has(unidadKey(row.unidad_organizativa)))) issue("id_area", "Asigna una única área existente a la unidad del Jefe de Área.");
    if (!role || role.nombre_rol === "Reportante") issue("id_rol", "Selecciona un rol interno de la plataforma.");
    if ((emailCounts.get(row.correo) ?? 0) > 1) issue("correo", "Este correo se repite en el archivo.");
    if (existingEmails.has(row.correo)) issue("correo", "El correo ya está registrado. La importación no modifica cuentas existentes.");
    if ((rowCounts.get(row.row) ?? 0) > 1) issue("row", "El número de fila está repetido.");
    return { ...row, id_area: area?.id_area ?? null, area: area?.nombre_area ?? null, rol: role?.nombre_rol ?? null };
  });
  const invalidRows = new Set(issues.map(issue => issue.row));
  return {
    filename: payload.filename,
    hoja: payload.hoja,
    rows,
    issues,
    canImport: issues.length === 0,
    resumen: { total: rows.length, listos: rows.filter(row => !invalidRows.has(row.row)).length, errores: issues.length },
  };
}

export type UsersImportPreview = Awaited<ReturnType<typeof buildPreview>>;
export class UsersImportValidationError extends Error {
  constructor(public preview: UsersImportPreview) {
    super("Revisa los errores del archivo antes de importar. No se creó ninguna cuenta.");
  }
}

export class UsersImportService {
  static async validar(body: unknown) {
    return buildPreview(usersImportSchema.parse(body), prisma);
  }

  static async importar(body: unknown, actor: Actor, ip?: string) {
    const payload = usersImportSchema.parse(body);
    const preview = await buildPreview(payload, prisma);
    if (!preview.canImport) throw new UsersImportValidationError(preview);

    // Hash fuera de la transacción; las claves no se guardan en el archivo ni
    // en auditoría. Se entregan una sola vez al Admin que confirma la carga.
    const credentials: { row: number; password_temporal: string; password_hash: string }[] = [];
    for (let offset = 0; offset < payload.rows.length; offset += 4) {
      const prepared = await Promise.all(payload.rows.slice(offset, offset + 4).map(async row => {
        const password_temporal = `Sop!${randomBytes(18).toString("base64url")}9aA`;
        return { row: row.row, password_temporal, password_hash: await BcryptHelper.hash(password_temporal) };
      }));
      credentials.push(...prepared);
    }
    const batchId = randomUUID();
    return prisma.$transaction(async tx => {
      // La validación del navegador nunca autoriza por sí sola el guardado.
      // Se vuelve a comprobar contra la BD dentro de la misma transacción.
      const current = await buildPreview(payload, tx);
      if (!current.canImport) throw new UsersImportValidationError(current);
      const created = [];
      for (const row of current.rows) {
        const credential = credentials.find(item => item.row === row.row)!;
        const user = await UserRepository.createWithGeneratedCode({
          nombre: row.nombre,
          cargo: row.cargo,
          unidad_organizativa: row.unidad_organizativa,
          correo: row.correo,
          telefono: row.telefono || null,
          jefe_inmediato: row.jefe_inmediato || null,
          id_area: row.id_area,
          id_rol: row.id_rol!,
          password_hash: credential.password_hash,
        }, tx);
        created.push({ row: row.row, id_usuario: user.id_usuario, codigo_usuario: user.codigo_usuario, correo: user.correo, password_temporal: credential.password_temporal });
      }
      await tx.auditoria.createMany({ data: created.map(user => ({
        tabla_afectada: "usuarios",
        id_registro: user.id_usuario,
        accion: "crear",
        descripcion: `Importación de usuarios: lote ${batchId}, fila ${user.row}`,
        usuario: actor.id_usuario,
        ip: ip ?? null,
        datos_nuevos: { lote: batchId, codigo_usuario: user.codigo_usuario, id_area: current.rows.find(row => row.row === user.row)!.id_area, id_rol: current.rows.find(row => row.row === user.row)!.id_rol },
      })) });
      return { batchId, created: created.length, credentials: created };
    }, { isolationLevel: "Serializable", maxWait: 10_000, timeout: 120_000 });
  }
}
