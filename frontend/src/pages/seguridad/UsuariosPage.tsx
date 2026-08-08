import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/features/users/hooks/useUsers";

export function SoUsuariosPage() {
  const { data: users, isLoading } = useUsers();

  return (
    <SeguridadOperativaShell>
      <div>
        <h1 className="font-display text-[19px] font-bold tracking-[-0.01em] text-ink">Administración de Usuarios</h1>
        <p className="mt-0.5 text-[12px] text-ink-quiet">Personal registrado en el sistema, con su rol y área asignada.</p>
      </div>

      {isLoading ? (
        <Card className="mt-4 p-8 text-center text-[13px] text-ink-quiet">Cargando usuarios…</Card>
      ) : !users || users.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-2 border-dashed p-10 text-center">
          <Users className="h-7 w-7 text-ink-faint" />
          <p className="text-[13px] font-semibold text-ink">Aún no hay usuarios registrados</p>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
          <Card className="mt-4 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-line bg-surface text-[10.5px] uppercase tracking-wide text-ink-quiet">
                    <th className="px-3.5 py-2.5 font-semibold">Código</th>
                    <th className="px-3.5 py-2.5 font-semibold">Nombre</th>
                    <th className="px-3.5 py-2.5 font-semibold">Correo</th>
                    <th className="px-3.5 py-2.5 font-semibold">Rol</th>
                    <th className="px-3.5 py-2.5 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id_usuario} className="border-b border-line-soft last:border-0 hover:bg-surface">
                      <td className="px-3.5 py-2.5 font-mono text-[11.5px] text-ink-soft">{u.codigo_usuario}</td>
                      <td className="px-3.5 py-2.5 font-medium text-ink">{u.nombre}</td>
                      <td className="px-3.5 py-2.5 text-ink-soft">{u.correo}</td>
                      <td className="px-3.5 py-2.5 text-ink-soft">{u.roles?.nombre_rol ?? "—"}</td>
                      <td className="px-3.5 py-2.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-[3px] text-[10.5px] font-medium text-brand-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                          {u.estado ?? "Activo"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}
    </SeguridadOperativaShell>
  );
}
