import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function SessionExitButton({ withLabel = false, className }: { withLabel?: boolean; className?: string }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const running = useRef(false);

  const exit = async () => {
    if (running.current) return;
    running.current = true;
    setPending(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } finally {
      running.current = false;
      setPending(false);
    }
  };

  return (
    <><button type="button" onClick={() => setConfirming(true)} title="Cerrar sesión" aria-label="Cerrar sesión" className={cn("inline-flex h-9 items-center justify-center gap-2 rounded-lg px-2.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink", className)}>
      <LogOut className="h-4 w-4" />{withLabel && <span>Cerrar sesión</span>}
    </button><ConfirmDialog open={confirming} title="¿Cerrar sesión?" description="Saldrás de tu cuenta. Guarda los cambios pendientes antes de continuar." confirmLabel="Sí, cerrar sesión" pending={pending} onCancel={() => setConfirming(false)} onConfirm={() => void exit()} /></>
  );
}
