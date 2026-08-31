// El backend ya firma cada acción con el usuario de la sesión e ignora este
// valor; se sigue mandando solo por compatibilidad con la firma de los hooks.
export const ACTOR = "Jefe de Área";

export const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime", "application/pdf"];
export const ACCEPT = TIPOS_PERMITIDOS.join(",");
export const ACCEPT_IMAGES = "image/jpeg,image/png,image/webp";
export const ACCEPT_VIDEOS = "video/mp4,video/quicktime";
export const ACCEPT_DOCUMENTS = "application/pdf";
export const MAX_ARCHIVOS = 10;
export const MAX_BYTES = 20 * 1024 * 1024;
