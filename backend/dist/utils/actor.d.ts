import type { AuthTokenPayload } from "../middlewares/auth.middleware.js";
/**
 * Quien está haciendo la petición, tal como viene del token. Los servicios lo
 * reciben para decidir qué puede ver — las rutas ya decidieron qué puede hacer.
 */
export type Actor = AuthTokenPayload;
export declare function tieneRol(actor: Actor | undefined, rol: string): boolean;
export declare const esReportante: (actor?: Actor) => boolean;
export declare const esJefeDeArea: (actor?: Actor) => boolean;
export declare const esAdmin: (actor?: Actor) => boolean;
/**
 * Nombre con el que se firma el expediente.
 *
 * Antes esto lo mandaba el cliente en el cuerpo de cada petición, así que
 * cualquiera podía firmar una acción con el nombre de otra persona. Ahora sale
 * de la sesión; si el token es viejo y no trae el nombre, se resuelve contra
 * la base para no obligar a nadie a volver a iniciar sesión.
 */
export declare function nombreDelActor(actor?: Actor): Promise<string>;
/**
 * Área del usuario en sesión. Normalmente viaja en el token; los tokens
 * emitidos antes de que existiera ese campo no la traen, así que en ese caso
 * se resuelve contra la base y nadie queda obligado a volver a iniciar sesión.
 */
export declare function areaDelActor(actor?: Actor): Promise<number | undefined>;
//# sourceMappingURL=actor.d.ts.map