import { useState } from "react";
import { LockKeyhole, Menu, X } from "lucide-react";
import { MetroBrand } from "./MetroBrand";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <MetroBrand compact />
        
        <div className="hidden md:flex items-center gap-8">
          {["Inicio", "Sistema", "Proceso", "Estadísticas"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[#00A651]"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          
          <a
            href="/login"
            className="flex items-center gap-2 rounded-lg border border-[#00A651] bg-[#00A651] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#008c45]"
          >
            <LockKeyhole className="size-4" />
            <span className="hidden sm:inline">Acceso</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-4 mx-6 rounded-xl border border-gray-200 bg-white p-5 shadow-xl">
          <div className="flex flex-col gap-2">
            {["Inicio", "Sistema", "Proceso", "Estadísticas"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-medium text-gray-600 transition-colors hover:text-[#00A651] hover:bg-gray-50 rounded-lg px-4 py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
