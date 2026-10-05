import { useEffect, useId, useRef } from "react";
import { Camera, Trash2, X } from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/design-system/primitives/Button";

export function AvatarOptions({ open, nombre, photo, pending, error, onClose, onPick, onRemove }: {
  open: boolean; nombre: string; photo: string | null; pending: boolean;
  onClose: () => void; onPick: () => void; onRemove: () => void;
  error?: string | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return <dialog ref={ref} aria-labelledby={titleId}
    className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-md rounded-2xl border border-line bg-white p-5 text-ink shadow-xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    onCancel={event => { event.preventDefault(); if (!pending) onClose(); }}>
    <div className="flex items-center justify-between gap-3">
      <h2 id={titleId} className="text-lg font-semibold">Foto de perfil</h2>
      <Button size="sm" variant="ghost" aria-label="Cerrar opciones de foto" onClick={onClose} disabled={pending}><X className="h-4 w-4" /></Button>
    </div>
    <div className="my-5 flex items-center gap-4">
      <UserAvatar nombre={nombre} fotoUrl={photo} className="h-20 w-20 text-xl" />
      <div><p className="text-sm font-medium">{photo ? "Tu foto actual" : "Sin foto de perfil"}</p><p className="mt-1 text-xs leading-relaxed text-ink-quiet">{photo ? "Puedes cambiarla o volver a mostrar tus iniciales." : "Se muestran tus iniciales cuando no tienes una foto."}</p></div>
    </div>
    <p className="mb-4 text-xs text-ink-quiet">JPG, PNG o WEBP · Máximo 5 MB.</p>
    {error && <p role="alert" className="mb-4 rounded-lg bg-critical-soft p-3 text-sm text-critical-ink">{error}</p>}
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={onPick} disabled={pending}><Camera className="h-4 w-4" />{pending ? "Procesando..." : photo ? "Cambiar foto" : "Subir foto"}</Button>
      {photo && <Button size="sm" variant="outline" onClick={onRemove} disabled={pending}><Trash2 className="h-4 w-4" />Eliminar foto</Button>}
    </div>
  </dialog>;
}
