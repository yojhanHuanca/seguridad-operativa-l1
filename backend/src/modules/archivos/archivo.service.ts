import path from "node:path";
import fs from "node:fs";
import prisma from "../../lib/prisma.js";
import { esReportante, type Actor } from "../../utils/actor.js";
import { casoVisibleParaJefe } from "../cases/case.visibility.js";

/** Raíz física de los archivos subidos. Nada se sirve fuera de acá. */
const UPLOADS_ROOT = path.resolve(process.cwd(), "uploads");

/** Carpetas que el endpoint acepta; cualquier otra se rechaza de plano. */
const CARPETAS_VALIDAS = new Set(["casos", "avatars"]);

export class ArchivoNoAccesibleError extends Error {}
export class ArchivoNoEncontradoError extends Error {}

/**
 * Traduce `casos/<uuid>.jpg` a una ruta absoluta dentro de `uploads/`.
 *
 * Rechaza cualquier cosa que se salga de la raíz (`..`, rutas absolutas,
 * enlaces raros): la comprobación se hace sobre la ruta ya resuelta, que es la
 * única forma confiable de detectar un escape de directorio.
 */
function resolverRuta(carpeta: string, archivo: string): string {
  if (!CARPETAS_VALIDAS.has(carpeta)) throw new ArchivoNoEncontradoError("Archivo no encontrado");

  const destino = path.resolve(UPLOADS_ROOT, carpeta, archivo);
  const raizCarpeta = path.resolve(UPLOADS_ROOT, carpeta);
  if (destino !== raizCarpeta && !destino.startsWith(raizCarpeta + path.sep)) {
    throw new ArchivoNoEncontradoError("Archivo no encontrado");
  }
  return destino;
}

/**
 * Decide si el actor puede ver este archivo y devuelve la ruta en disco.
 *
 * - `avatars/`: cualquier sesión válida (las fotos se muestran en la cabecera
 *   y en los selectores de responsable).
 * - `casos/`: mismo criterio que el expediente. Seguridad Operativa, Jefe de
 *   Área y Admin pueden ver las evidencias; el trabajador que reporta, solo
 *   las de los casos que él registró. Cualquier otro rol, no.
 */
export async function rutaDeArchivoPermitido(
  carpeta: string,
  archivo: string,
  actor?: Actor,
  preview = false
): Promise<string> {
  const destino = resolverRuta(carpeta, archivo);
  if (carpeta === "avatars") return destino;

  const anexo = await prisma.anexos_caso.findFirst({
    where: { ruta_archivo: `/uploads/${carpeta}/${archivo}` },
    select: { casos_sop: { select: {
      created_by: true, area_responsable: true,
      planes_accion: { select: { responsable: true, id_area: true } },
    } } },
  });
  if (!anexo) throw new ArchivoNoEncontradoError("Archivo no encontrado");

  if (esReportante(actor)) {
    if (anexo.casos_sop?.created_by !== actor?.id_usuario) {
      throw new ArchivoNoAccesibleError("No tienes permiso para ver este archivo");
    }
    return rutaDeVista(destino, preview);
  }

  const rol = (actor?.rol_nombre ?? "").trim().toLowerCase();
  if (["seguridad operativa", "jefe de área", "admin"].includes(rol)) {
    if (!await casoVisibleParaJefe(anexo.casos_sop, actor)) {
      throw new ArchivoNoAccesibleError("No tienes permiso para ver este archivo");
    }
    return rutaDeVista(destino, preview);
  }
  throw new ArchivoNoAccesibleError("No tienes permiso para ver este archivo");
}

function rutaDeVista(original: string, preview: boolean): string {
  if (!preview) return original;
  const optimizada = `${original}.preview.webp`;
  return fs.existsSync(optimizada) ? optimizada : original;
}
