import { useEffect, useId, useRef } from "react";
import { Button } from "@/design-system/primitives/Button";

export function ConfirmDialog({ open, title, description, confirmLabel, pending = false, error, onCancel, onConfirm }: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  pending?: boolean;
  error?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return <dialog ref={ref} aria-labelledby={titleId} aria-describedby={descriptionId}
    className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-md rounded-2xl border border-line bg-white p-0 text-ink shadow-xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    onCancel={event => { event.preventDefault(); if (!pending) onCancel(); }}
    onClick={event => { if (event.target === event.currentTarget && !pending) onCancel(); }}>
    <div className="p-5">
      <h2 id={titleId} className="text-lg font-semibold">{title}</h2>
      <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
      {error && <p role="alert" className="mt-3 rounded-lg bg-critical-soft p-3 text-sm text-critical-ink">{error}</p>}
    </div>
    <div className="flex justify-end gap-2 border-t border-line-soft bg-surface/50 p-4">
      <Button variant="outline" size="sm" onClick={onCancel} disabled={pending}>Cancelar</Button>
      <Button size="sm" onClick={onConfirm} disabled={pending}>{pending ? "Procesando..." : confirmLabel}</Button>
    </div>
  </dialog>;
}
