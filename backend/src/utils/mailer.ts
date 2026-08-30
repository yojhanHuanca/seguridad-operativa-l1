import { Resend } from "resend";
import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env.js";
import { ConfiguracionService } from "../modules/configuracion/configuracion.service.js";

let client: Resend | null = null;
let smtpTransport: Transporter | null = null;
const DEFAULT_SYSTEM_NAME = "SIGMA L1";

function getClient() {
  if (!env.RESEND_API_KEY) return null;
  client ??= new Resend(env.RESEND_API_KEY);
  return client;
}

/**
 * `SMTP_HOST=ethereal` es un valor especial: crea al vuelo una bandeja de
 * prueba en https://ethereal.email (vía nodemailer, sin registro ni Docker) —
 * nada sale a un destinatario real, pero cada envío devuelve un link para ver
 * el correo tal cual habría llegado. Sirve para probar en desarrollo sin
 * depender de un dominio verificado en Resend ni de infraestructura local.
 */
async function getSmtpTransport(): Promise<Transporter | null> {
  if (!env.SMTP_HOST) return null;
  if (smtpTransport) return smtpTransport;

  if (env.SMTP_HOST === "ethereal") {
    const cuentaPrueba = await nodemailer.createTestAccount();
    smtpTransport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: { user: cuentaPrueba.user, pass: cuentaPrueba.pass },
    });
    return smtpTransport;
  }

  smtpTransport = nodemailer.createTransport({ host: env.SMTP_HOST, port: env.SMTP_PORT, secure: false });
  return smtpTransport;
}

/**
 * Punto único de envío: si hay un SMTP configurado para desarrollo (Ethereal
 * o un Mailpit local), el correo sale por ahí sin importar el destinatario.
 * Si no, cae a Resend (lo que corre en producción). Sin ninguno de los dos
 * configurados, no hay a dónde mandarlo.
 */
async function enviarCorreo(opts: { to: string; subject: string; html: string }) {
  const smtp = await getSmtpTransport();
  if (smtp) {
    const info = await smtp.sendMail({ from: env.EMAIL_FROM, to: opts.to, subject: opts.subject, html: opts.html });
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) console.log(`[mail] "${opts.subject}" para ${opts.to} — vista previa: ${previewUrl}`);
    return;
  }

  const resend = getClient();
  if (!resend) {
    throw new Error("El envío de correos no está configurado en el servidor");
  }
  const { error } = await resend.emails.send({ from: env.EMAIL_FROM, to: opts.to, subject: opts.subject, html: opts.html });
  if (error) {
    throw new Error(`No se pudo enviar el correo: ${error.message}`);
  }
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
  const systemName = await getSystemName();

  await enviarCorreo({
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
}

function formatearFecha(fecha: Date) {
  return new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(fecha);
}

export interface ActividadPlanCorreo {
  descripcion: string;
  fecha_fin: Date | null;
}

export interface PlanAsignadoCorreo {
  destino: string;
  nombreJefe: string;
  codigoPlan: string;
  codigoCaso: string;
  descripcionCaso: string;
  areaNombre: string;
  descripcionPlan: string;
  fechaLimite: Date;
  observaciones: string | null;
  actividades: ActividadPlanCorreo[];
  url: string;
}

/**
 * Aviso de plan de acción asignado, con el detalle completo del plan — no solo
 * un botón — para que el Jefe de Área sepa de qué se trata sin tener que
 * entrar primero. El botón sigue estando, para ir directo a aceptarlo.
 *
 * A diferencia de `enviarCorreoRecuperacion`, acá sí puede lanzar si Resend no
 * está configurado o falla el envío — es responsabilidad de quien llama
 * decidir qué hacer con eso. El criterio acordado es no bloquear la creación
 * del plan por esto: se llama después de que el plan ya quedó guardado, y un
 * error acá solo se registra en el log, nunca revierte nada.
 */
export async function enviarCorreoPlanAsignado(datos: PlanAsignadoCorreo) {
  const systemName = await getSystemName();

  const filasActividades = datos.actividades
    .map(
      (actividad) => `
        <tr>
          <td style="padding:8px 10px;border-bottom:1px solid #E3E8E5;font-size:13px;color:#182621;">${escapeHtml(actividad.descripcion)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #E3E8E5;font-size:12.5px;color:#5F6F68;white-space:nowrap;">${
            actividad.fecha_fin ? escapeHtml(formatearFecha(actividad.fecha_fin)) : "—"
          }</td>
        </tr>`,
    )
    .join("");

  const bloqueActividades = datos.actividades.length
    ? `
      <p style="margin:20px 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;color:#5F6F68;letter-spacing:0.04em;">Actividades del plan</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E3E8E5;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#EAF5EE;">
            <th style="padding:8px 10px;text-align:left;font-size:11px;text-transform:uppercase;color:#0F7A3D;">Descripción</th>
            <th style="padding:8px 10px;text-align:left;font-size:11px;text-transform:uppercase;color:#0F7A3D;">Fecha fin</th>
          </tr>
        </thead>
        <tbody>${filasActividades}</tbody>
      </table>`
    : "";

  const bloqueObservaciones = datos.observaciones
    ? `<p style="margin:16px 0 0;font-size:13px;color:#41504A;"><strong>Observaciones:</strong> ${escapeHtml(datos.observaciones)}</p>`
    : "";

  await enviarCorreo({
    to: datos.destino,
    subject: `Nuevo plan de acción asignado: ${datos.codigoPlan} — ${systemName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #12352A;">
        <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #0F7A3D; letter-spacing: 0.05em;">${escapeHtml(systemName)} · Seguridad Operativa</p>
        <h1 style="font-size: 20px; margin: 12px 0;">Tienes un nuevo plan de acción</h1>
        <p>Hola ${escapeHtml(datos.nombreJefe)},</p>
        <p>Seguridad Operativa te asignó un plan de acción para el área <strong>${escapeHtml(datos.areaNombre)}</strong>, correspondiente al caso <strong>${escapeHtml(datos.codigoCaso)}</strong>:</p>

        <div style="margin:20px 0;padding:16px;background:#F3F7F4;border-radius:10px;border:1px solid #E3E8E5;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;color:#5F6F68;letter-spacing:0.04em;">Plan ${escapeHtml(datos.codigoPlan)}</p>
          <p style="margin:0 0 12px;font-size:14px;color:#182621;">${escapeHtml(datos.descripcionPlan)}</p>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;color:#5F6F68;letter-spacing:0.04em;">Descripción del caso</p>
          <p style="margin:0 0 12px;font-size:13px;color:#41504A;">${escapeHtml(datos.descripcionCaso)}</p>
          <p style="margin:0;font-size:13px;color:#41504A;"><strong>Fecha límite:</strong> ${escapeHtml(formatearFecha(datos.fechaLimite))}</p>
          ${bloqueObservaciones}
        </div>

        ${bloqueActividades}

        <p style="margin:24px 0;">
          <a href="${escapeHtml(datos.url)}" style="background:#0F7A3D;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Ver y aceptar el plan</a>
        </p>
        <p style="font-size: 12px; color: #5F6F68;">Si el botón no funciona, entra a tu panel con tu correo y contraseña habituales — vas a ver este plan pendiente de aceptación.</p>
      </div>
    `,
  });
}
