import { useEffect, useId, useLayoutEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Portado tal cual del prototipo SIGMA L1 (design-system/primitives/Modal.tsx).
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({ open, onClose, title, subtitle, footer, children, size = "md" }: ModalProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const titleId = useId();

  useLayoutEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      )).filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        e.preventDefault();
        dialog.focus();
      } else if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [open]);

  // El modal no se desmonta al cambiar de un registro a otro sin cerrarse
  // entre medio (ej. "Ver detalle" de dos eventos distintos), así que el
  // scroll del cuerpo se quedaba donde estaba y el contenido nuevo arrancaba
  // a medio camino. Se resetea cada vez que abre o que cambia el título, y se
  // hace en layout (antes de pintar) para que nunca se alcance a ver el salto.
  useLayoutEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [open, title]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Diálogo"}
        tabIndex={-1}
        className={cn(
          "relative flex max-h-[calc(100vh-6rem)] w-full flex-col rounded-2xl bg-white border border-line shadow-[var(--shadow-pop)] animate-[riseUp_0.25s_ease-out] outline-none",
          SIZES[size]
        )}
      >
        {(title || subtitle) && (
          <div className="flex shrink-0 items-start justify-between gap-4 p-5 border-b border-line-soft">
            <div className="min-w-0">
              {title && <h2 id={titleId} className="text-[16px] font-semibold text-ink leading-tight">{title}</h2>}
              {subtitle && <p className="text-[13px] text-ink-quiet mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 h-8 w-8 grid place-items-center rounded-lg text-ink-quiet hover:bg-surface-2 hover:text-ink transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
        {footer && (
          <div className="flex shrink-0 items-center justify-end gap-2 p-4 border-t border-line-soft bg-surface/50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
