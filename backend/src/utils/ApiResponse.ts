import { Prisma } from "../generated/prisma/client.js";

const ERRORES_INTERNOS: (new (...args: never[]) => Error)[] = [
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
  TypeError,
  RangeError,
  SyntaxError,
];

/**
 * Decide si el `message` de una excepción es seguro para mandar al cliente.
 * Errores de Prisma/JS (overflow numérico, tipo incorrecto, etc.) exponen
 * rutas, nombres de columna o mensajes técnicos internos, así que siempre
 * caen al `fallback`. Un `Error` de negocio lanzado a propósito en el
 * código de la aplicación (p. ej. `new Error("El caso ... no existe")`) sí
 * es seguro y se muestra tal cual.
 */
export function safeErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && !ERRORES_INTERNOS.some((Clase) => error instanceof Clase)) {
    return error.message;
  }
  return fallback;
}

export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T,
    public errors?: unknown
  ) {}

  static success<T>(message: string, data?: T) {
    return new ApiResponse<T>(true, message, data);
  }

  /**
   * `errors` puede ser un objeto de validación ya sanitizado (p. ej.
   * `zodError.flatten().fieldErrors`) o la excepción cruda recién capturada.
   * Si es una excepción —incluye errores de Prisma, que heredan de Error—
   * se registra en el servidor pero nunca se manda al cliente: mandarla tal
   * cual exponía código/tabla/columna de Prisma y la versión del cliente en
   * el cuerpo de la respuesta HTTP.
   */
  static error(message: string, errors?: unknown) {
    if (errors instanceof Error) {
      console.error(`[${message}]`, errors);
      return new ApiResponse(false, message);
    }
    return new ApiResponse(false, message, undefined, errors);
  }
}