import { useEffect, useState } from "react";
import { api } from "./api";
import { downloadBlob } from "./download";

/**
 * Los archivos subidos ya no se sirven como estáticos públicos: se piden a
 * `/api/archivos`, que exige sesión. Como una etiqueta `<img src>` no manda la
 * cabecera Authorization, hay que traerlos por axios y convertirlos en un
 * object URL — de ahí el hook de abajo en lugar de una simple URL.
 *
 * La base de datos guarda rutas con la forma `/uploads/casos/<archivo>`; acá
 * se traducen al endpoint autenticado equivalente.
 */
function rutaApi(rutaArchivo: string): string {
  return rutaArchivo.replace(/^\/?uploads\//, "/archivos/").replace(/^(?!\/)/, "/");
}

async function traerBlob(rutaArchivo: string): Promise<Blob> {
  const { data } = await api.get<Blob>(rutaApi(rutaArchivo), { responseType: "blob" });
  return data;
}

/**
 * URL utilizable en `<img>` / `<a>` para un archivo protegido.
 *
 * Devuelve cadena vacía mientras carga o si el archivo no está permitido, así
 * que quien lo use debe tolerar el vacío (mostrar un ícono, por ejemplo).
 */
export function useArchivoProtegido(rutaArchivo: string | null | undefined): string {
  // El estado guarda de qué archivo es la URL, no solo la URL. Así, cuando la
  // ruta cambia, el render devuelve vacío en lugar del object URL anterior,
  // que la limpieza del efecto ya revocó.
  const [cargado, setCargado] = useState<{ ruta: string; url: string } | null>(null);

  useEffect(() => {
    if (!rutaArchivo) return;

    let objectUrl = "";
    let cancelado = false;

    traerBlob(rutaArchivo)
      .then((blob) => {
        if (cancelado) return;
        objectUrl = URL.createObjectURL(blob);
        setCargado({ ruta: rutaArchivo, url: objectUrl });
      })
      .catch(() => {
        // Sin permiso o archivo faltante: quien use el hook cae a su ícono.
      });

    // Revocar al desmontar evita que el navegador retenga en memoria cada
    // evidencia que se abrió durante la sesión.
    return () => {
      cancelado = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [rutaArchivo]);

  return cargado && cargado.ruta === rutaArchivo ? cargado.url : "";
}

/** Descarga un archivo protegido con su nombre original. */
export async function descargarArchivoProtegido(rutaArchivo: string, nombreArchivo: string) {
  downloadBlob(await traerBlob(rutaArchivo), nombreArchivo);
}

/** Abre un archivo protegido en otra pestaña. */
export async function abrirArchivoProtegido(rutaArchivo: string) {
  const url = URL.createObjectURL(await traerBlob(rutaArchivo));
  window.open(url, "_blank", "noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
