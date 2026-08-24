import { useRef, useState } from "react";
import { Camera, FileText, Image as ImageIcon, Video, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 25;
const MAX_FILES = 10;
const ACCEPTED_IMAGES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_VIDEOS = ["video/mp4", "video/quicktime"];
const ACCEPTED_DOCUMENTS = ["application/pdf"];
const ACCEPTED = [...ACCEPTED_IMAGES, ...ACCEPTED_VIDEOS, ...ACCEPTED_DOCUMENTS];

function iconFor(type: string) {
  if (type.startsWith("video/")) return Video;
  if (type === "application/pdf") return FileText;
  return ImageIcon;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Zona de adjuntos del reporte: arrastrar y soltar, o elegir foto/video/PDF.
 * Las mismas reglas (tipos, 25 MB, 10 archivos) para el wizard del trabajador
 * y para el registro desde el panel de Seguridad Operativa.
 */
export function EvidencePicker({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: File[] = [...files];
    const disponibles = Math.max(MAX_FILES - files.length, 0);

    if (disponibles === 0) {
      toast.error(`Solo puedes adjuntar hasta ${MAX_FILES} archivos.`);
      return;
    }

    let omitidosPorLimite = 0;
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) {
        omitidosPorLimite++;
        continue;
      }
      if (!ACCEPTED.includes(file.type)) {
        toast.error(`Tipo de archivo no permitido: ${file.name}`);
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} supera los ${MAX_SIZE_MB} MB permitidos`);
        continue;
      }
      if (next.some((item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) {
        toast.error(`${file.name} ya fue adjuntado`);
        continue;
      }
      next.push(file);
    }
    if (omitidosPorLimite > 0) {
      toast.error(`Se omitieron ${omitidosPorLimite} archivo(s) porque el máximo es ${MAX_FILES}.`);
    }
    setFiles(next);
  };

  const removeFile = (index: number) => setFiles(files.filter((_, i) => i !== index));

  return (
    <>
      <div
        className={cn(
          "rounded-xl border-2 border-dashed p-6 text-center transition-colors duration-200",
          isDragging ? "border-brand-400 bg-brand-50/60" : "border-input bg-secondary/30"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <div
          className={cn(
            "mx-auto grid h-12 w-12 place-items-center rounded-xl border transition-colors duration-200",
            isDragging ? "border-brand-300 bg-white text-brand-700" : "border-input bg-card text-brand-700"
          )}
        >
          <Camera className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-medium text-ink">Arrastra archivos o adjunta desde tu equipo</p>
        <p className="mt-1 text-xs text-ink-quiet">
          JPG, PNG, WEBP, MP4, MOV o PDF · máximo {MAX_FILES} archivos de {MAX_SIZE_MB} MB
        </p>
        <input
          ref={photoInputRef}
          type="file"
          multiple
          accept={ACCEPTED_IMAGES.join(",")}
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
        <input
          ref={videoInputRef}
          type="file"
          multiple
          accept={ACCEPTED_VIDEOS.join(",")}
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
        <input
          ref={documentInputRef}
          type="file"
          multiple
          accept={ACCEPTED_DOCUMENTS.join(",")}
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => photoInputRef.current?.click()}>
            <ImageIcon className="h-4 w-4" /> Adjuntar foto
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
            <Video className="h-4 w-4" /> Adjuntar video
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => documentInputRef.current?.click()}>
            <FileText className="h-4 w-4" /> Adjuntar PDF
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-3.5 space-y-2">
          <p className="text-right text-[11.5px] text-ink-quiet">
            {files.length}/{MAX_FILES} archivos adjuntos
          </p>
          {files.map((file, i) => {
            const Icon = iconFor(file.type);
            return (
              <div
                key={`${file.name}-${i}`}
                className="flex animate-in items-center gap-3 rounded-lg border border-border bg-card p-3 fade-in slide-in-from-top-1 duration-200"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-ink-soft">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{file.name}</p>
                  <p className="text-xs text-ink-quiet">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink-quiet transition-colors hover:bg-secondary hover:text-destructive active:scale-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
