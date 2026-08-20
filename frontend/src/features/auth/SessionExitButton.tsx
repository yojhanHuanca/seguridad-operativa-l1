import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { cn } from "@/lib/utils";

export function SessionExitButton({ withLabel = false, className }: { withLabel?: boolean; className?: string }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const exit = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <button type="button" onClick={exit} title="Cerrar sesión" aria-label="Cerrar sesión" className={cn("inline-flex h-9 items-center justify-center gap-2 rounded-lg px-2.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink", className)}>
      <LogOut className="h-4 w-4" />{withLabel && <span>Cerrar sesión</span>}
    </button>
  );
}
