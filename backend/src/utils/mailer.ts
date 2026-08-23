import { Resend } from "resend";
import { env } from "../config/env.js";
import { ConfiguracionService } from "../modules/configuracion/configuracion.service.js";

let client: Resend | null = null;
const DEFAULT_SYSTEM_NAME = "SIGMA L1";

function getClient() {
  if (!env.RESEND_API_KEY) return null;
  client ??= new Resend(env.RESEND_API_KEY);
  return client;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function getSystemName() {
  try {
    const configuracion = await ConfiguracionService.publica();
    return configuracion.nombre.trim() || DEFAULT_SYSTEM_NAME;
  } catch {
    return DEFAULT_SYSTEM_NAME;
  }
}

/** true si el correo se pudo pedir a Resend (no garantiza que ya llegó a la bandeja). */
export async function enviarCorreoRecuperacion(destino: string, nombre: string, resetUrl: string) {
  const resend = getClient();
  if (!resend) {
    throw new Error("El envío de correos no está configurado en el servidor");
  }
  const systemName = await getSystemName();

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: destino,
    subject: `Recupera tu contraseña — ${systemName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #12352A;">
        <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #0F7A3D; letter-spacing: 0.05em;">${escapeHtml(systemName)} · Seguridad Operativa</p>
        <h1 style="font-size: 20px; margin: 12px 0;">Recupera tu contraseña</h1>
        <p>Hola ${escapeHtml(nombre)},</p>
        <p>Pediste restablecer tu contraseña. Este link vale por 30 minutos y solo se puede usar una vez:</p>
        <p style="margin: 24px 0;">
          <a href="${escapeHtml(resetUrl)}" style="background:#0F7A3D;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Elegir nueva contraseña</a>
        </p>
        <p style="font-size: 12px; color: #5F6F68;">Si tú no pediste esto, ignora este correo — tu contraseña actual sigue funcionando igual.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`No se pudo enviar el correo: ${error.message}`);
  }
}
