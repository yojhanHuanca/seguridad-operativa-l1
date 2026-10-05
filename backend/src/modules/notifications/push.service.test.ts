import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ send: vi.fn(), find: vi.fn(), save: vi.fn(), remove: vi.fn(), list: vi.fn() }));
vi.mock("web-push", () => ({ default: { setVapidDetails: vi.fn(), sendNotification: mocks.send } }));
vi.mock("../../config/env.js", () => ({ env: { VAPID_PUBLIC_KEY: "public", VAPID_PRIVATE_KEY: "private", VAPID_SUBJECT: "mailto:test@example.com" } }));
vi.mock("../../utils/logger.js", () => ({ default: { warn: vi.fn(), error: vi.fn() } }));
vi.mock("./push.repository.js", () => ({ PushRepository: { buscarPropia: mocks.find, guardar: mocks.save, eliminar: mocks.remove, listarPorUsuarios: mocks.list } }));
import { PushService } from "./push.service.js";
const endpoint = "https://push.example.com/device";
const keys = { p256dh: Buffer.from([4, ...Array(64).fill(0)]).toString("base64url"), auth: Buffer.alloc(16).toString("base64url") };
describe("Push por cuenta y dispositivo", () => {
  beforeEach(() => { vi.resetAllMocks(); });
  it("expone únicamente la clave pública", () => {
    expect(PushService.config()).toEqual({ habilitado: true, publicKey: "public" });
  });
  it("comprueba la suscripción del usuario autenticado", async () => {
    mocks.find.mockResolvedValue(null);
    expect(await PushService.estado(7, endpoint)).toEqual({ suscrita: false });
    expect(mocks.find).toHaveBeenCalledWith(endpoint, 7);
  });
  it("guarda una suscripción válida y rechaza claves inválidas", async () => {
    await PushService.suscribir(7, { endpoint, keys });
    expect(mocks.save).toHaveBeenCalledWith(7, { endpoint, keys });
    await expect(PushService.suscribir(7, { endpoint, keys: { ...keys, auth: "x" } })).rejects.toThrow("no es válida");
    expect(mocks.save).toHaveBeenCalledTimes(1);
  });
  it("rechaza endpoints inseguros sin consultar ni enviar", async () => {
    await expect(PushService.probar(7, "http://push.example.com/device")).rejects.toThrow("no es válido");
    expect(mocks.find).not.toHaveBeenCalled();
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("no envía un aviso a un dispositivo ajeno", async () => {
    mocks.find.mockResolvedValue(null);
    await expect(PushService.probar(7, endpoint)).rejects.toThrow("antes de probarlas");
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("envía la prueba con tiempo límite al dispositivo propio", async () => {
    mocks.find.mockResolvedValue({ endpoint, ...keys });
    await PushService.probar(7, endpoint);
    expect(mocks.send).toHaveBeenCalledWith({ endpoint, keys }, expect.any(String), { timeout: 10000 });
  });
  it("elimina únicamente la suscripción propia cuando caduca", async () => {
    mocks.find.mockResolvedValue({ endpoint, ...keys });
    mocks.send.mockRejectedValue({ statusCode: 410 });
    await expect(PushService.probar(7, endpoint)).rejects.toThrow("caducó");
    expect(mocks.remove).toHaveBeenCalledWith(endpoint, 7);
  });
  it("un fallo temporal no elimina la suscripción", async () => {
    mocks.find.mockResolvedValue({ endpoint, ...keys });
    mocks.send.mockRejectedValue({ statusCode: 503 });
    await expect(PushService.probar(7, endpoint)).rejects.toThrow("No se pudo enviar");
    expect(mocks.remove).not.toHaveBeenCalled();
  });
  it("desactivar conserva el filtro del usuario", async () => {
    await PushService.desuscribir(endpoint, 7);
    expect(mocks.remove).toHaveBeenCalledWith(endpoint, 7);
  });
});
