import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
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
    limits: { fileSize: 25 * 1024 * 1024, files: 10 },
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
//# sourceMappingURL=upload.middleware.js.map