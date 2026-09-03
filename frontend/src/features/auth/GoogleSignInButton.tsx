import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Tipado mínimo de la parte de Google Identity Services (GSI) que usamos —
 * no hay @types oficiales, y traer el paquete completo para esto es de más.
 */
interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdApi {
  initialize: (config: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, string>) => void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdApi } };
  }
}

const SCRIPT_ID = "google-identity-services";

function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve) => existing.addEventListener("load", () => resolve(), { once: true }));
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar Google Identity Services"));
    document.head.appendChild(script);
  });
}

/**
 * Botón oficial de "Iniciar sesión con Google". Se auto-oculta si no hay
 * VITE_GOOGLE_CLIENT_ID configurado — así el login normal sigue funcionando
 * en cualquier entorno donde todavía no se dio de alta el Client ID en
 * Google Cloud Console, sin romper nada.
 */
export function GoogleSignInButton({ onCredential, disabled }: { onCredential: (credential: string) => void; disabled?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;

    // El botón de Google no acepta un ancho en porcentaje, solo píxeles —
    // con un valor fijo (los 396px de antes) se salía del formulario en
    // pantallas angostas. Se mide el contenedor real y se vuelve a pedir el
    // botón si el usuario cambia de tamaño de ventana (p.ej. gira el celular).
    const anchoBoton = () => {
      const disponible = containerRef.current?.getBoundingClientRect().width ?? 396;
      return Math.round(Math.min(400, Math.max(200, disponible)));
    };

    let renderScheduled = false;
    const render = () => {
      if (cancelled || !window.google || !containerRef.current) return;
      containerRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(containerRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "signin_with",
        logo_alignment: "center",
        width: String(anchoBoton()),
      });
      setReady(true);
    };

    loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google || !containerRef.current) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => onCredential(response.credential),
        });
        render();
      })
      .catch(() => setReady(false));

    const onResize = () => {
      if (renderScheduled) return;
      renderScheduled = true;
      window.requestAnimationFrame(() => {
        renderScheduled = false;
        render();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  if (!clientId) return null;

  return (
    <div className="w-full">
      <div className="my-3 flex items-center gap-3 text-[11px] font-medium uppercase text-ink-faint">
        <span className="h-px flex-1 bg-line-soft" />
        o
        <span className="h-px flex-1 bg-line-soft" />
      </div>
      {/* El botón lo dibuja Google directo en el DOM del contenedor, así que la
          entrada se anima por fuera, con la opacidad, en vez del contenido en sí. */}
      <motion.div
        ref={containerRef}
        initial={false}
        animate={{ opacity: !ready ? 0 : disabled ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
        className={disabled ? "pointer-events-none" : ""}
      />
    </div>
  );
}
