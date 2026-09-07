import { describe, expect, it, vi, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Request, Response } from "express";

// El cliente real de Prisma generado no carga bajo vite-node en esta máquina
// (sí funciona en runtime con tsx), igual que ya evita el resto de la
// suite mockeando `lib/prisma.js`. Este test no toca la base de datos —
// `ApiResponse` solo necesita las clases de error de Prisma como referencia.
vi.mock("../generated/prisma/client.js", () => ({
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {},
    PrismaClientUnknownRequestError: class PrismaClientUnknownRequestError extends Error {},
    PrismaClientValidationError: class PrismaClientValidationError extends Error {},
    PrismaClientInitializationError: class PrismaClientInitializationError extends Error {},
    PrismaClientRustPanicError: class PrismaClientRustPanicError extends Error {},
  },
}));

const { verificarContenidoEvidencia, verificarContenidoAvatar } = await import("./upload.middleware.js");

const PNG_HEADER = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_HEADER = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
const PDF_HEADER = Buffer.from("%PDF-1.7\n");

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "upload-test-"));
const archivosCreados: string[] = [];

function crearArchivo(contenido: Buffer, nombre: string): string {
  const ruta = path.join(tmpDir, `${crypto_random()}-${nombre}`);
  fs.writeFileSync(ruta, contenido);
  archivosCreados.push(ruta);
  return ruta;
}

function crypto_random() {
  return Math.random().toString(36).slice(2);
}

function mockRes() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

afterEach(() => {
  for (const ruta of archivosCreados) {
    if (fs.existsSync(ruta)) fs.rmSync(ruta, { force: true });
  }
  archivosCreados.length = 0;
});

describe("verificarContenidoEvidencia", () => {
  it("deja pasar un archivo cuyo contenido real coincide con el mimetype declarado", () => {
    const ruta = crearArchivo(PNG_HEADER, "foto.png");
    const req = { files: [{ path: ruta, mimetype: "image/png", originalname: "foto.png" }] } as unknown as Request;
    const res = mockRes();
    const next = vi.fn();

    verificarContenidoEvidencia(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
    expect(fs.existsSync(ruta)).toBe(true);
  });

  it("rechaza un archivo cuyo contenido no coincide con el mimetype declarado (spoofing) y lo borra", () => {
    // Un ejecutable/script cualquiera, renombrado para declararse como imagen.
    const ruta = crearArchivo(Buffer.from("#!/bin/sh\necho hola\n"), "falso.jpg");
    const req = { files: [{ path: ruta, mimetype: "image/jpeg", originalname: "falso.jpg" }] } as unknown as Request;
    const res = mockRes();
    const next = vi.fn();

    verificarContenidoEvidencia(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(fs.existsSync(ruta)).toBe(false);
  });

  it("rechaza un PNG real declarado como PDF (mimetype no corresponde al contenido)", () => {
    const ruta = crearArchivo(PNG_HEADER, "imagen.pdf");
    const req = { files: [{ path: ruta, mimetype: "application/pdf", originalname: "imagen.pdf" }] } as unknown as Request;
    const res = mockRes();
    const next = vi.fn();

    verificarContenidoEvidencia(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(fs.existsSync(ruta)).toBe(false);
  });

  it("acepta un PDF real", () => {
    const ruta = crearArchivo(PDF_HEADER, "documento.pdf");
    const req = { files: [{ path: ruta, mimetype: "application/pdf", originalname: "documento.pdf" }] } as unknown as Request;
    const res = mockRes();
    const next = vi.fn();

    verificarContenidoEvidencia(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it("si un archivo del lote falla, borra también los demás que sí eran válidos", () => {
    const rutaValida = crearArchivo(JPEG_HEADER, "buena.jpg");
    const rutaInvalida = crearArchivo(Buffer.from("no es una imagen"), "mala.jpg");
    const req = {
      files: [
        { path: rutaValida, mimetype: "image/jpeg", originalname: "buena.jpg" },
        { path: rutaInvalida, mimetype: "image/jpeg", originalname: "mala.jpg" },
      ],
    } as unknown as Request;
    const res = mockRes();
    const next = vi.fn();

    verificarContenidoEvidencia(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(fs.existsSync(rutaValida)).toBe(false);
    expect(fs.existsSync(rutaInvalida)).toBe(false);
  });
});

describe("verificarContenidoAvatar", () => {
  it("deja pasar una foto de perfil real", () => {
    const ruta = crearArchivo(JPEG_HEADER, "avatar.jpg");
    const req = { file: { path: ruta, mimetype: "image/jpeg", originalname: "avatar.jpg" } } as unknown as Request;
    const res = mockRes();
    const next = vi.fn();

    verificarContenidoAvatar(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it("rechaza un archivo disfrazado de foto de perfil", () => {
    const ruta = crearArchivo(Buffer.from("contenido arbitrario"), "avatar.png");
    const req = { file: { path: ruta, mimetype: "image/png", originalname: "avatar.png" } } as unknown as Request;
    const res = mockRes();
    const next = vi.fn();

    verificarContenidoAvatar(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
