import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/features/auth/auth";
import { SessionExitButton } from "@/features/auth/SessionExitButton";
import { useMyProfile } from "@/features/profile/hooks/useProfile";
import { UserAvatar } from "@/components/ui/UserAvatar";

export function SidebarAccount({ collapsed, to, role, onNavigate }: {
  collapsed: boolean; to: string; role: string; onNavigate?: (() => void) | undefined;
}) {
  const { user } = useAuth();
  const name = user?.nombre?.trim() || role;
  const { data: profile } = useMyProfile();
  return (
    <div className="sidebar-account">
      <Link to={to} onClick={onNavigate} className="sidebar-account-link" title={collapsed ? `Mi perfil · ${name}` : undefined} aria-label={`Mi perfil · ${name}`}>
        <UserAvatar nombre={name} fotoUrl={profile?.foto_url} className="sidebar-avatar" />
        {!collapsed && <><span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-semibold text-ink">{name}</span><span className="mt-1 block truncate text-[11px] text-ink-soft">{role}</span></span><ChevronRight className="h-4 w-4 shrink-0 text-ink-quiet" /></>}
      </Link>
      <SessionExitButton withLabel={!collapsed} className="sidebar-exit" />
    </div>
  );
}
