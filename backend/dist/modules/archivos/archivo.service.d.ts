import { type Actor } from "../../utils/actor.js";
export declare class ArchivoNoAccesibleError extends Error {
}
export declare class ArchivoNoEncontradoError extends Error {
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
export declare function rutaDeArchivoPermitido(carpeta: string, archivo: string, actor?: Actor): Promise<string>;
//# sourceMappingURL=archivo.service.d.ts.map