import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, FileText, Image as ImageIcon, Video, X } from "lucide-react";
import { abrirArchivoProtegido, useArchivoProtegido } from "@/lib/archivos";
import { cn } from "@/lib/utils";
import type { AnexoPlanCaso } from "../types";

/**
 * Piezas presentacionales chicas y sin estado de negocio, propias de la
 * pantalla de detalle de plan (Jefe de Área). Deliberadamente separadas de
 * `features/cases/components/CaseParts.tsx`: ese `InfoRow` tiene otra firma
 * (icono + value siempre string), así que no se reusa para no arriesgar el
 * layout ya afinado de esta pantalla.
 */

export function InfoRow({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="text-[14px] font-medium text-ink break-words">{value ?? "-"}</p>
    </div>
  );
}

export function SectionHeader({
  icon,
  title,
  open,
  onToggle,
  extra,
}: {
  icon: ReactNode;
  title: string;
  open: boolean;
  onToggle: () => void;
  /** Contenido centrado entre el título y el chevron (p. ej. la prioridad del plan). */
  extra?: ReactNode;
}) {
  return (
    <button type="button" onClick={onToggle} className="flex w-full items-center gap-4 text-left">
      <span className="flex flex-1 items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-brand-700">{icon}</span>
        <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
      </span>
      {extra && <span className="flex flex-1 justify-center">{extra}</span>}
      <span className="flex flex-1 items-center justify-end text-ink-quiet">
        {open ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
      </span>
    </button>
  );
}

export function InfoTile({ label, value, wide }: { label: string; value?: ReactNode; wide?: boolean }) {
  return (
    <div className={cn("rounded-lg border border-line-soft bg-surface/60 px-3 py-2", wide && "md:col-span-2")}>
      <p className="mb-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">{label}</p>
      <div className="text-[13px] leading-snug text-ink break-words">{value ?? "-"}</div>
    </div>
  );
}

function IconoArchivo({ tipo }: { tipo: string | null }) {
  if (tipo?.startsWith("image/")) return <ImageIcon className="h-4.5 w-4.5" />;
  if (tipo?.startsWith("video/")) return <Video className="h-4.5 w-4.5" />;
  return <FileText className="h-4.5 w-4.5" />;
}

/**
 * Miniatura real del adjunto en vez del icono genérico.
 *
 * Antes toda evidencia se veía igual —un cuadradito con el icono del tipo—,
 * así que al subir una foto no se veía la foto. Ahora la imagen se muestra, el
 * video renderiza su primer fotograma con `preload="metadata"` (sin descargar
 * el archivo entero) y el PDF su primera página con el visor nativo. Si algo
 * no carga, cae al icono de siempre.
 *
 * El contenido va con `pointer-events-none` para que el clic siga yendo al
 * enlace que abre el archivo completo.
 */
function VistaPreviaAnexo({ anexo }: { anexo: AnexoPlanCaso }) {
  const [falloCarga, setFalloCarga] = useState(false);
  const url = useArchivoProtegido(anexo.ruta_archivo);
  const tipo = anexo.tipo_archivo ?? "";
  const puedePrevisualizar = !!url && !falloCarga;

  const marco = "grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-2 text-ink-soft";

  if (puedePrevisualizar && tipo.startsWith("image/")) {
    return (
      <div className={marco}>
        <img src={url} alt={anexo.nombre_archivo ?? "Evidencia"} loading="lazy" onError={() => setFalloCarga(true)} className="h-full w-full object-cover" />
      </div>
    );
  }

  if (puedePrevisualizar && tipo.startsWith("video/")) {
    return (
      <div className={marco}>
        <video src={url} muted playsInline preload="metadata" onError={() => setFalloCarga(true)} className="pointer-events-none h-full w-full object-cover" />
      </div>
    );
  }

  if (puedePrevisualizar && tipo === "application/pdf") {
    return (
      <div className={marco}>
        {/* El visor nativo se escala para que entre la primera página. */}
        <iframe
          src={`${url}#toolbar=0&navpanes=0&view=FitH`}
          title={anexo.nombre_archivo ?? "Documento"}
          tabIndex={-1}
          className="pointer-events-none h-[224px] w-[224px] origin-top-left scale-[0.25] border-0 bg-white"
        />
      </div>
    );
  }

  return (
    <div className={marco}>
      <IconoArchivo tipo={anexo.tipo_archivo} />
    </div>
  );
}

/**
 * Versión compacta de la evidencia: solo la miniatura, para mostrarla en fila
 * debajo de los botones de carga sin que la tarjeta crezca a lo alto.
 */
export function MiniaturaAnexo({
  anexo,
  onQuitar,
  quitando,
}: {
  anexo: AnexoPlanCaso;
  /** Si viene, se muestra la × para descartar la evidencia. */
  onQuitar?: () => void;
  quitando?: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => anexo.ruta_archivo && abrirArchivoProtegido(anexo.ruta_archivo)}
        title={anexo.nombre_archivo ?? "Archivo adjunto"}
        className={cn(
          "block w-full text-left rounded-lg ring-1 ring-line-soft transition-shadow hover:ring-brand-300",
          !anexo.ruta_archivo && "pointer-events-none opacity-60"
        )}
      >
        <VistaPreviaAnexo anexo={anexo} />
      </button>

      {/* Solo aparece mientras la evidencia todavía se puede descartar; una vez
          enviada a SO el adjunto queda bloqueado igual que la descripción. */}
      {onQuitar && (
        <button
          type="button"
          onClick={onQuitar}
          disabled={quitando}
          title={`Quitar ${anexo.nombre_archivo ?? "evidencia"}`}
          aria-label={`Quitar ${anexo.nombre_archivo ?? "evidencia"}`}
          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white text-ink-quiet shadow ring-1 ring-line transition-colors hover:bg-critical hover:text-white disabled:opacity-50"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
