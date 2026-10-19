import { beforeEach, describe, expect, it, vi } from "vitest";

const mock = vi.hoisted(() => ({
  env: { SMTP_HOST: "", SMTP_PORT: 1025, SMTP_USER: "", SMTP_PASS: "", SMTP_SECURE: false, RESEND_API_KEY: "test-key", EMAIL_FROM: "SMS L1 <qa@example.com>" },
  sendMail: vi.fn(), createTransport: vi.fn(), sendResend: vi.fn(),
}));
vi.mock("../config/env.js", () => ({ env: mock.env }));
vi.mock("./logger.js", () => ({ default: { info: vi.fn() } }));
vi.mock("../modules/configuracion/configuracion.service.js", () => ({ ConfiguracionService: { publica: async () => ({ nombre: "SMS L1" }) } }));
vi.mock("nodemailer", () => ({ default: { createTransport: mock.createTransport, getTestMessageUrl: () => false } }));
vi.mock("resend", () => ({ Resend: class { emails = { send: mock.sendResend }; } }));

async function send() {
  const { enviarCorreoRecuperacion } = await import("./mailer.js");
  await enviarCorreoRecuperacion("qa@example.invalid", "Usuario QA", "http://localhost:5173/reset-password?token=test");
}

beforeEach(() => {
  vi.resetModules(); vi.clearAllMocks();
  Object.assign(mock.env, { SMTP_HOST: "", SMTP_PORT: 1025, SMTP_USER: "", SMTP_PASS: "", SMTP_SECURE: false, RESEND_API_KEY: "test-key" });
  mock.createTransport.mockReturnValue({ sendMail: mock.sendMail });
  mock.sendMail.mockResolvedValue({ messageId: "test" });
  mock.sendResend.mockResolvedValue({ data: { id: "test" }, error: null });
});

describe("Envío de correo por SMTP autenticado", () => {
  it("conserva Resend cuando no se configura SMTP", async () => {
    await send(); expect(mock.sendResend).toHaveBeenCalledOnce(); expect(mock.createTransport).not.toHaveBeenCalled();
  });
  it("conserva Mailpit sin autenticación", async () => {
    mock.env.SMTP_HOST = "mailpit";
    await send(); expect(mock.createTransport).toHaveBeenCalledWith({ host: "mailpit", port: 1025, secure: false });
    expect(mock.sendResend).not.toHaveBeenCalled();
  });
  it("envía por Gmail con autenticación y TLS en 465", async () => {
    Object.assign(mock.env, { SMTP_HOST: "smtp.gmail.com", SMTP_PORT: 465, SMTP_SECURE: true, SMTP_USER: "qa@gmail.com", SMTP_PASS: "app-password" });
    await send(); expect(mock.createTransport).toHaveBeenCalledWith({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: "qa@gmail.com", pass: "app-password" } });
    expect(mock.sendMail).toHaveBeenCalledOnce(); expect(mock.sendResend).not.toHaveBeenCalled();
  });
  it("exige STARTTLS para enviar credenciales en 587", async () => {
    Object.assign(mock.env, { SMTP_HOST: "smtp.gmail.com", SMTP_PORT: 587, SMTP_USER: "qa@gmail.com", SMTP_PASS: "app-password" });
    await send(); expect(mock.createTransport).toHaveBeenCalledWith(expect.objectContaining({ secure: false, requireTLS: true }));
  });
  it.each([
    { SMTP_USER: "", SMTP_PASS: "" },
    { SMTP_USER: "qa@gmail.com", SMTP_PASS: "" },
    { SMTP_USER: "", SMTP_PASS: "app-password" },
  ])("rechaza credenciales de Gmail incompletas: %j", async credentials => {
    Object.assign(mock.env, { SMTP_HOST: "smtp.gmail.com", ...credentials });
    await expect(send()).rejects.toThrow("SMTP_USER y SMTP_PASS");
    expect(mock.createTransport).not.toHaveBeenCalled(); expect(mock.sendResend).not.toHaveBeenCalled();
  });
  it("no disimula un rechazo del servidor SMTP usando otro proveedor", async () => {
    Object.assign(mock.env, { SMTP_HOST: "smtp.gmail.com", SMTP_PORT: 465, SMTP_SECURE: true, SMTP_USER: "qa@gmail.com", SMTP_PASS: "app-password" });
    mock.sendMail.mockRejectedValue(new Error("SMTP rechazó la autenticación"));
    await expect(send()).rejects.toThrow("SMTP rechazó la autenticación"); expect(mock.sendResend).not.toHaveBeenCalled();
  });
});
