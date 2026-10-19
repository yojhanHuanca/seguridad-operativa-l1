import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/features/auth/auth";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useUsersBasicos } from "@/features/users/hooks/useUsersBasicos";

/** Authenticated photo, cached per viewer, with initials on failure. */
export function UserAvatar({ nombre, fotoUrl, userId, className }: {
  nombre: string; fotoUrl?: string | null | undefined; userId?: number | null | undefined; className?: string;
}) {
  const { user, token } = useAuth();
  const { data: users } = useUsersBasicos(Boolean(userId && fotoUrl === undefined));
  const photo = fotoUrl === undefined ? users?.find(person => person.id_usuario === userId)?.foto_url : fotoUrl;
  const { data: blob } = useQuery({
    queryKey: ["avatar", user?.id_usuario, photo],
    enabled: Boolean(photo && token),
    staleTime: 5 * 60_000,
    retry: false,
    queryFn: async () => {
      const path = photo!.replace(/^\/?uploads\//, "/archivos/").replace(/^(?!\/)/, "/");
      const { data } = await api.get<Blob>(path, { responseType: "blob" });
      return data;
    },
  });
  const image = useRef<HTMLImageElement>(null);
  const [failedBlob, setFailedBlob] = useState<Blob | null>(null);
  useEffect(() => {
    if (!blob || !image.current) return;
    const src = URL.createObjectURL(blob);
    image.current.src = src;
    return () => URL.revokeObjectURL(src);
  }, [blob]);
  return <span className={cn("relative inline-grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-100 text-xs font-bold text-brand-800", className)} aria-label={nombre}>
    {blob && blob !== failedBlob ? <img ref={image} alt={nombre} className="h-full w-full object-cover" onError={() => setFailedBlob(blob)} /> : <span aria-hidden>{initials(nombre)}</span>}
  </span>;
}
