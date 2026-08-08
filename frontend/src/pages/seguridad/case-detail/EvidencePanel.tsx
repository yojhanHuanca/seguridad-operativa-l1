import { useRef, useState } from "react";
import { Download, FileText, Image as ImageIcon, Paperclip, Upload, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { useAddCaseEvidence } from "@/features/cases/hooks/useCaseActions";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AnexoCaso, CaseDetail } from "@/features/cases/types";

// Origen del backend para resolver las rutas `/uploads/...` que devuelve la API.
export const API_ORIGIN = (import.meta.env.VITE_API_URL ?? "http://localhost:3000/api").replace(/\/api\/?$/, "");

// Mismos límites que valida el backend (middlewares/upload.middleware.ts):
// rechazar aquí evita un viaje al servidor para un archivo que va a fallar.
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime", "application/pdf"];
const ACCEPT = TIPOS_PERMITIDOS.join(",");
const MAX_ARCHIVOS = 10;
const MAX_BYTES = 25 * 1024 * 1024;

function IconoArchivo({ tipo }: { tipo: string | null }) {
  if (tipo?.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
  if (tipo?.startsWith("video/")) return <Video className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function FilaAnexo({ anexo }: { anexo: AnexoCaso }) {
  return (
    <a
      href={`${API_ORIGIN}${anexo.ruta_archivo}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-surface transition-colors group cursor-pointer"
    >
      <div className="h-8 w-8 rounded-lg bg-surface-2 text-ink-soft grid place-items-center shrink-0">
        <IconoArchivo tipo={anexo.tipo_archivo} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-ink truncate">{anexo.nombre_archivo}</p>
        <p className="text-[10.5px] text-ink-quiet">
          {anexo.peso ? `${anexo.peso} KB` : ""}
          {anexo.peso && anexo.fecha_subida ? " · " : ""}
          {anexo.fecha_subida ? formatDateTime(anexo.fecha_subida) : ""}
        </p>
      </div>
      <Download className="h-3.5 w-3.5 text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

/**
 * Evidencias del expediente: listado y adjunto de nuevos archivos.
 *
 * `puedeAdjuntar` lo decide la máquina de estados (lib/workflow.ts): un caso
 * cerrado o rechazado se consulta pero ya no admite archivos nuevos.
 */
export function EvidencePanel({
  caso,
  puedeAdjuntar,
  compact = false,
}: {
  caso: CaseDetail;
  puedeAdjuntar: boolean;
  /** Versión reducida para incrustar dentro de una etapa. */
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const upload = useAddCaseEvidence(caso.codigo_sop);

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const lista = Array.from(files);

    if (lista.length > MAX_ARCHIVOS) {
      toast.error(`Máximo ${MAX_ARCHIVOS} archivos por vez.`);
      return;
    }
    const pesado = lista.find((f) => f.size > MAX_BYTES);
    if (pesado) {
      toast.error(`"${pesado.name}" supera los 25 MB permitidos.`);
      return;
    }
    const invalido = lista.find((f) => !TIPOS_PERMITIDOS.includes(f.type));
    if (invalido) {
      toast.error(`"${invalido.name}" no es un tipo permitido (imagen, video MP4/MOV o PDF).`);
      return;
    }

    setSubiendo(true);
    upload.mutate(lista, {
      onSuccess: () => toast.success(lista.length === 1 ? "Evidencia adjuntada" : `${lista.length} evidencias adjuntadas`),
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo adjuntar la evidencia")),
      onSettled: () => {
        setSubiendo(false);
        if (inputRef.current) inputRef.current.value = "";
      },
    });
  };

  const botonAdjuntar = puedeAdjuntar && (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      <Button
        variant="outline"
        size="sm"
        disabled={subiendo}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-4 w-4" /> {subiendo ? "Subiendo…" : "Adjuntar evidencia"}
      </Button>
    </>
  );

  if (compact) {
    return (
      <div className="rounded-lg border border-line bg-surface/50 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint flex items-center gap-1.5">
            <Paperclip className="h-3.5 w-3.5" />
            Evidencias ({caso.anexos_caso.length})
          </p>
          {botonAdjuntar}
        </div>
        {caso.anexos_caso.length > 0 && (
          <div className="mt-1.5 -mx-1">
            {caso.anexos_caso.map((a) => (
              <FilaAnexo key={a.id_anexo} anexo={a} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className={cn("space-y-1.5", caso.anexos_caso.length === 0 && "space-y-0")}>
        {caso.anexos_caso.length === 0 && (
          <p className="text-[12px] text-ink-faint p-2">Sin evidencias adjuntas.</p>
        )}
        {caso.anexos_caso.map((a) => (
          <FilaAnexo key={a.id_anexo} anexo={a} />
        ))}
      </div>

      {puedeAdjuntar ? (
        <div className="pt-3 border-t border-line-soft flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[11.5px] text-ink-quiet">
            Imágenes, video MP4/MOV o PDF · hasta {MAX_ARCHIVOS} archivos de 25 MB.
          </p>
          {botonAdjuntar}
        </div>
      ) : (
        <p className="pt-3 border-t border-line-soft text-[11.5px] text-ink-faint">
          El expediente está archivado: no admite nuevas evidencias.
        </p>
      )}
    </div>
  );
}
