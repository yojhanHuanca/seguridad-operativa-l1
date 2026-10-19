import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import logger from "../utils/logger.js";

const MAX_PENDING_PREVIEWS = 200;
const PREVIEW_SUFFIX = ".preview.webp";

type PreviewJob = { path: string };
const jobs: PreviewJob[] = [];
let processing = false;

async function createPreview(sourcePath: string): Promise<void> {
  const previewPath = `${sourcePath}${PREVIEW_SUFFIX}`;
  try {
    const source = await fs.stat(sourcePath);
    await sharp(sourcePath, { limitInputPixels: 40_000_000, failOn: "error" })
      .rotate()
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(previewPath);

    const preview = await fs.stat(previewPath);
    // A preview that is larger provides no benefit. Keep the original as the
    // only copy in that case.
    if (preview.size >= source.size) await fs.rm(previewPath, { force: true });
  } catch (error) {
    await fs.rm(previewPath, { force: true }).catch(() => undefined);
    logger.warn({ errorName: error instanceof Error ? error.name : "UnknownError" }, "Image preview optimization failed");
  }
}

async function drainQueue(): Promise<void> {
  if (processing) return;
  processing = true;
  try {
    while (jobs.length > 0) {
      const job = jobs.shift();
      if (job) await createPreview(job.path);
    }
  } finally {
    processing = false;
    if (jobs.length > 0) void drainQueue();
  }
}

/** Queue a lightweight WebP preview without delaying the evidence upload. */
export function enqueueImagePreviews(files: Express.Multer.File[]): void {
  for (const file of files) {
    if (!file.mimetype.startsWith("image/")) continue;
    if (jobs.length >= MAX_PENDING_PREVIEWS) {
      logger.warn("Image preview queue is full; original evidence remains available");
      break;
    }
    jobs.push({ path: path.resolve(file.path) });
  }
  void drainQueue();
}

export const IMAGE_PREVIEW_SUFFIX = PREVIEW_SUFFIX;
