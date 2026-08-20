import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

/**
 * Cualquier URL que no matchee ninguna ruta cae acá (antes renderizaba una
 * pantalla en blanco). No sabemos con qué rol/sesión llegó quien la ve, así
 * que no asume ningún panel — solo manda a "/", que resuelve a Landing o al
 * panel correspondiente según haya o no sesión activa.
 */
export function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface px-6">
      <div className="text-center">
        <Logo className="justify-center" />
        <div className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <Compass className="h-8 w-8" />
        </div>
        <p className="mt-6 text-[64px] font-bold leading-none tracking-tight text-ink">404</p>
        <h1 className="mt-3 text-[19px] font-semibold text-ink">Página no encontrada</h1>
        <p className="mt-2 text-[13.5px] text-ink-quiet">La dirección a la que intentaste entrar no existe o fue movida.</p>
        <Link
          to="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-brand-700 px-5 text-[13.5px] font-medium text-white transition-colors hover:bg-brand-800"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
