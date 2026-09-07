import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const UPLOAD_DIR = path.resolve(process.cwd(), "uploads", "casos");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "application/pdf",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const unique = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

export const uploadEvidencia = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024, files: 10 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`));
      return;
    }
    cb(null, true);
  },
});

const AVATAR_DIR = path.resolve(process.cwd(), "uploads", "avatars");
fs.mkdirSync(AVATAR_DIR, { recursive: true });

const ALLOWED_AVATAR_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

const avatarStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, AVATAR_DIR),
  filename: (_req, file, cb) => {
    const unique = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_AVATAR_MIME.has(file.mimetype)) {
      cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`));
      return;
    }
    cb(null, true);
  },
});

/**
 * `fileFilter` de multer solo ve el `mimetype` que declaró el cliente — el
 * campo del formulario, fácil de falsificar (un .php renombrado a .jpg pasa
 * ese filtro sin problema). Esto lee los primeros bytes del archivo YA
 * escrito en disco y los compara contra la firma real del formato; si no
 * coinciden, se borra el archivo y se corta la petición antes del controller.
 */
const FIRMAS: Array<{ mime: string; coincide: (buf: Buffer) => boolean }> = [
  { mime: "image/jpeg", coincide: (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    mime: "image/png",
    coincide: (b) => b.length >= 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  },
  {
    mime: "image/webp",
    coincide: (b) => b.length >= 12 && b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP",
  },
  { mime: "application/pdf", coincide: (b) => b.length >= 5 && b.subarray(0, 5).toString("ascii") === "%PDF-" },
  { mime: "video/mp4", coincide: (b) => b.length >= 8 && b.subarray(4, 8).toString("ascii") === "ftyp" },
  {
    // Un .mov grabado por celular también trae caja "ftyp"; uno más viejo
    // puede arrancar directo con un átomo QuickTime sin esa caja.
    mime: "video/quicktime",
    coincide: (b) =>
      (b.length >= 8 && b.subarray(4, 8).toString("ascii") === "ftyp") ||
      (b.length >= 8 && ["moov", "mdat", "wide", "free", "skip"].includes(b.subarray(4, 8).toString("ascii"))),
  },
];

function coincideConMime(cabecera: Buffer, mime: string): boolean {
  const firma = FIRMAS.find((f) => f.mime === mime);
  return firma ? firma.coincide(cabecera) : false;
}

function leerCabecera(rutaArchivo: string): Buffer {
  const cabecera = Buffer.alloc(16);
  const fd = fs.openSync(rutaArchivo, "r");
  try {
    fs.readSync(fd, cabecera, 0, cabecera.length, 0);
  } finally {
    fs.closeSync(fd);
  }
  return cabecera;
}

function verificarContenidoReal(obtenerArchivos: (req: Request) => Express.Multer.File[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const archivos = obtenerArchivos(req);
    for (const archivo of archivos) {
      let esValido: boolean;
      try {
        esValido = coincideConMime(leerCabecera(archivo.path), archivo.mimetype);
      } catch {
        esValido = false;
      }

      if (!esValido) {
        for (const a of archivos) fs.rmSync(a.path, { force: true });
        return res.status(400).json(
          ApiResponse.error(`El archivo "${archivo.originalname}" no corresponde a su tipo declarado (${archivo.mimetype})`)
        );
      }
    }
    next();
  };
}

/** Va después de `uploadEvidencia.array(...)` en la ruta. */
export const verificarContenidoEvidencia = verificarContenidoReal(
  (req) => (req.files as Express.Multer.File[] | undefined) ?? []
);

/** Va después de `uploadAvatar.single(...)` en la ruta. */
export const verificarContenidoAvatar = verificarContenidoReal((req) => (req.file ? [req.file] : []));
