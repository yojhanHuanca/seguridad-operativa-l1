import prisma from "../lib/prisma.js";
import type { AuthTokenPayload } from "../middlewares/auth.middleware.js";

/**
 * Quien está haciendo la petición, tal como viene del token. Los servicios lo
 * reciben para decidir qué puede ver — las rutas ya decidieron qué puede hacer.
 */
export type Actor = AuthTokenPayload;

const normalizar = (valor?: string | null) => (valor ?? "").trim().toLowerCase();

export function tieneRol(actor: Actor | undefined, rol: string) {
  return normalizar(actor?.rol_nombre) === normalizar(rol);
}

export const esReportante = (actor?: Actor) => tieneRol(actor, "Reportante");
export const esJefeDeArea = (actor?: Actor) => tieneRol(actor, "Jefe de Área");
export const esAdmin = (actor?: Actor) => tieneRol(actor, "Admin");

/**
 * Nombre con el que se firma el expediente.
 *
 * Antes esto lo mandaba el cliente en el cuerpo de cada petición, así que
 * cualquiera podía firmar una acción con el nombre de otra persona. Ahora sale
 * de la sesión; si el token es viejo y no trae el nombre, se resuelve contra
 * la base para no obligar a nadie a volver a iniciar sesión.
 */
export async function nombreDelActor(actor?: Actor): Promise<string> {
  if (!actor) return "Sistema";
  if (actor.nombre?.trim()) return actor.nombre.trim();

  const usuario = await prisma.usuarios.findUnique({
    where: { id_usuario: actor.id_usuario },
    select: { nombre: true },
  });
  return usuario?.nombre?.trim() || actor.correo || "Sistema";
}

/**
 * Área del usuario en sesión. Normalmente viaja en el token; los tokens
 * emitidos antes de que existiera ese campo no la traen, así que en ese caso
 * se resuelve contra la base y nadie queda obligado a volver a iniciar sesión.
 */
export async function areaDelActor(actor?: Actor): Promise<number | undefined> {
  if (!actor) return undefined;
  if (actor.id_area != null) return actor.id_area;

  const usuario = await prisma.usuarios.findUnique({
    where: { id_usuario: actor.id_usuario },
    select: { id_area: true },
  });
  return usuario?.id_area ?? undefined;
}
