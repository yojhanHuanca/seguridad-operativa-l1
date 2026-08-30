import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Crown,
  KeyRound,
  Pencil,
  Radar,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Input, Select } from "@/design-system/primitives/Input";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useUserCounts } from "@/features/users/hooks/useUserCounts";
import { useRoles } from "@/features/users/hooks/useRoles";
import { useUpdateUser } from "@/features/users/hooks/useUserActions";
import { UserFormModal } from "@/features/users/components/UserFormModal";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Role, UserListItem } from "@/features/users/types";

type PermisoKey = "es_responsable" | "puede_reabrir_casos" | "puede_rechazar_reportes";
type PermissionFilter = "todos" | "con_permisos" | PermisoKey;

const POR_PAGINA = 15;
const ACCESS_LIMIT = 500;

const PERMISOS: { key: PermisoKey; label: string; shortLabel: string; hint: string }[] = [
  { key: "es_responsable", label: "Responsable SO", shortLabel: "RSO", hint: "Acceso responsable a Monitoreo y Eventos Operativos." },
  { key: "puede_reabrir_casos", label: "Reabrir casos", shortLabel: "Reabrir", hint: "Reapertura de expedientes cerrados." },
  { key: "puede_rechazar_reportes", label: "Rechazar reportes", shortLabel: "Rechazar", hint: "Rechazo de reportes antes del flujo de gestión." },
];

const ROLE_ORDER = ["Admin", "Seguridad Operativa", "Jefe de Área", "Monitorista"];
const ROLES_OCULTOS_ADMIN = new Set(["Reportante"]);

const ROL_STYLE: Record<string, { icon: typeof ShieldCheck; badge: string; dot: string; active: string }> = {
  Admin: { icon: Crown, badge: "bg-red-50 text-red-700 border-red-100", dot: "bg-red-500", active: "border-red-200 bg-red-50/70 text-red-800" },
  "Seguridad Operativa": {
    icon: ShieldCheck,
    badge: "bg-brand-50 text-brand-800 border-brand-100",
    dot: "bg-brand-600",
    active: "border-brand-200 bg-brand-50/80 text-brand-900",
  },
  "Jefe de Área": { icon: Briefcase, badge: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500", active: "border-blue-200 bg-blue-50/80 text-blue-800" },
  Monitorista: { icon: Radar, badge: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500", active: "border-amber-200 bg-amber-50/80 text-amber-800" },
};

const ROL_STYLE_DEFAULT = {
  icon: Users,
  badge: "bg-surface-2 text-ink-soft border-line",
  dot: "bg-ink-faint",
  active: "border-line-strong bg-surface text-ink",
};

const MATRIZ_PERMISOS: { modulo: string; accesos: Record<string, string> }[] = [
  {
    modulo: "Dashboard",
    accesos: {
      Admin: "Ver todo",
      "Seguridad Operativa": "Ver indicadores SO",
      "Jefe de Área": "Ver planes asignados",
      Monitorista: "Ver operación",
    },
  },
  {
    modulo: "Casos",
    accesos: {
      Admin: "Auditar",
      "Seguridad Operativa": "Gestionar flujo",
      "Jefe de Área": "Ver vinculados",
      Monitorista: "Derivar eventos",
    },
  },
  {
    modulo: "Planes de acción",
    accesos: {
      Admin: "Auditar",
      "Seguridad Operativa": "Crear y aprobar",
      "Jefe de Área": "Ejecutar",
      Monitorista: "Sin acceso",
    },
  },
  {
    modulo: "Auditoría",
    accesos: {
      Admin: "Ver y exportar",
      "Seguridad Operativa": "Sin acceso",
      "Jefe de Área": "Sin acceso",
      Monitorista: "Sin acceso",
    },
  },
  {
    modulo: "Importación",
    accesos: {
      Admin: "Importar histórico",
      "Seguridad Operativa": "Sin acceso",
      "Jefe de Área": "Sin acceso",
      Monitorista: "Sin acceso",
    },
  },
  {
    modulo: "Usuarios",
    accesos: {
      Admin: "Administrar",
      "Seguridad Operativa": "Sin acceso",
      "Jefe de Área": "Sin acceso",
      Monitorista: "Sin acceso",
    },
  },
  {
    modulo: "Reportes",
    accesos: {
      Admin: "Ver y exportar",
      "Seguridad Operativa": "Ver y exportar",
      "Jefe de Área": "Ver área",
      Monitorista: "Ver operación",
    },
  },
  {
    modulo: "Monitoreo",
    accesos: {
      Admin: "Ver",
      "Seguridad Operativa": "Solo Responsable SO",
      "Jefe de Área": "Sin acceso",
      Monitorista: "Gestionar",
    },
  },
];

function estadoActivo(estado: string | null) {
  return (estado ?? "Activo").toLowerCase() === "activo";
}

function initials(nombre: string) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function roleStyle(nombreRol?: string | null) {
  return nombreRol ? ROL_STYLE[nombreRol] ?? ROL_STYLE_DEFAULT : ROL_STYLE_DEFAULT;
}

function sortedRoles(roles: Role[]) {
  return roles.filter((role) => roleVisibleForAdmin(role.nombre_rol)).sort((a, b) => {
    const ai = ROLE_ORDER.indexOf(a.nombre_rol);
    const bi = ROLE_ORDER.indexOf(b.nombre_rol);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi) || a.nombre_rol.localeCompare(b.nombre_rol);
  });
}

function roleVisibleForAdmin(roleName?: string | null) {
  return !roleName || !ROLES_OCULTOS_ADMIN.has(roleName);
}

function userIsSO(user: UserListItem) {
  return user.roles?.nombre_rol === "Seguridad Operativa";
}

function userHasSpecialPermission(user: UserListItem) {
  return userIsSO(user) && PERMISOS.some((permiso) => Boolean(user[permiso.key]));
}

function permissionLabels(user: UserListItem) {
  if (!userIsSO(user)) return [];
  return PERMISOS.filter((permiso) => Boolean(user[permiso.key]));
}

function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full transition-colors duration-200",
        checked ? "bg-brand-700" : "bg-line-strong",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span
        className={cn(
          "inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-[19px]" : "translate-x-[3px]"
        )}
      />
    </button>
  );
}

function RoleBadge({ roleName }: { roleName?: string | null }) {
  const style = roleStyle(roleName);
  const Icon = style.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10.5px] font-semibold", style.badge)}>
      <Icon className="h-3.5 w-3.5" />
      {roleName ?? "Sin asignar"}
    </span>
  );
}

function StatusBadge({ estado }: { estado: string | null }) {
  return (
    <span className={cn("inline-flex rounded-md px-2 py-1 text-[10.5px] font-medium", estadoActivo(estado) ? "bg-brand-50 text-brand-800" : "bg-surface-2 text-ink-quiet")}>
      {estado ?? "Activo"}
    </span>
  );
}

function UserIdentity({ user }: { user: UserListItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-[10.5px] font-semibold text-brand-800">{initials(user.nombre)}</span>
      <div className="min-w-0">
        <p className="truncate font-medium text-ink">{user.nombre}</p>
        <p className="mt-0.5 truncate text-[10.5px] text-ink-faint">{user.correo}</p>
      </div>
    </div>
  );
}

function AccessRoleTabs({
  roles,
  counts,
  value,
  onChange,
}: {
  roles: Role[];
  counts: ReturnType<typeof useUserCounts>["data"];
  value: string;
  onChange: (value: string) => void;
}) {
  const visibleRoles = sortedRoles(roles);
  const visibleTotal = (counts?.sinRol ?? 0) + visibleRoles.reduce((total, role) => total + (counts?.porRol[String(role.id_rol)] ?? 0), 0);

  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto rounded-xl border border-line bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("todos")}
        className={cn(
          "flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-[12.5px] font-semibold transition-colors",
          value === "todos" ? "bg-ink text-white" : "text-ink-soft hover:bg-surface"
        )}
      >
        Todos
        <span className={cn("rounded-full px-1.5 py-0.5 text-[10.5px]", value === "todos" ? "bg-white/15 text-white" : "bg-surface-2 text-ink-quiet")}>
          {visibleTotal}
        </span>
      </button>
      {visibleRoles.map((role) => {
        const active = value === String(role.id_rol);
        const style = roleStyle(role.nombre_rol);
        const count = counts?.porRol[String(role.id_rol)] ?? 0;
        return (
          <button
            key={role.id_rol}
            type="button"
            onClick={() => onChange(String(role.id_rol))}
            className={cn(
              "flex h-9 shrink-0 items-center gap-2 rounded-lg border px-3 text-[12.5px] font-semibold transition-colors",
              active ? style.active : "border-transparent text-ink-soft hover:bg-surface"
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", style.dot)} />
            {role.nombre_rol}
            <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[10.5px] text-ink-quiet">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

function AccessUsersTable({
  users,
  isLoading,
  permissionFilter,
  updatePending,
  onToggle,
  onEdit,
}: {
  users: UserListItem[];
  isLoading: boolean;
  permissionFilter: PermissionFilter;
  updatePending: boolean;
  onToggle: (user: UserListItem, permiso: PermisoKey, checked: boolean) => void;
  onEdit: (user: UserListItem) => void;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-line px-4 py-3">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink"><KeyRound className="h-4 w-4 text-brand-700" /> Usuarios y permisos especiales</p>
        <p className="mt-0.5 text-[11.5px] text-ink-quiet">
          {isLoading ? "Cargando cuentas..." : `${users.length} ${users.length === 1 ? "cuenta encontrada" : "cuentas encontradas"}`}
          {permissionFilter !== "todos" ? " · filtro de permisos aplicado" : ""}
        </p>
      </div>
      {isLoading ? (
        <p className="p-8 text-center text-[13px] text-ink-quiet">Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center gap-2 p-9 text-center">
          <Users className="h-7 w-7 text-ink-faint" />
          <p className="text-[13px] font-semibold text-ink">No se encontraron usuarios</p>
          <p className="text-[11.5px] text-ink-quiet">Prueba con otro rol, estado o búsqueda.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-line bg-surface text-[10.5px] uppercase tracking-wide text-ink-quiet">
                <th className="px-4 py-3 font-semibold">Usuario</th>
                <th className="px-4 py-3 font-semibold">Rol</th>
                <th className="px-4 py-3 font-semibold">Área</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold">Permisos activados</th>
                <th className="px-4 py-3 font-semibold">Último acceso</th>
                <th className="px-4 py-3 text-center font-semibold">RSO</th>
                <th className="px-4 py-3 text-center font-semibold">Reabrir</th>
                <th className="px-4 py-3 text-center font-semibold">Rechazar</th>
                <th className="px-4 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isSO = userIsSO(user);
                const labels = permissionLabels(user);
                return (
                  <tr key={user.id_usuario} className="border-b border-line-soft last:border-0 hover:bg-surface/70">
                    <td className="px-4 py-3"><UserIdentity user={user} /></td>
                    <td className="px-4 py-3"><RoleBadge roleName={user.roles?.nombre_rol} /></td>
                    <td className="px-4 py-3 text-ink-soft">{user.areas?.nombre_area ?? "—"}</td>
                    <td className="px-4 py-3"><StatusBadge estado={user.estado} /></td>
                    <td className="px-4 py-3">
                      {labels.length > 0 ? (
                        <div className="flex max-w-[260px] flex-wrap gap-1.5">
                          {labels.map((permiso) => (
                            <span key={permiso.key} className="rounded-md bg-brand-50 px-2 py-1 text-[10.5px] font-medium text-brand-800">
                              {permiso.shortLabel}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-ink-faint">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[11.5px] text-ink-soft">{user.ultimo_acceso ? formatDateTime(user.ultimo_acceso) : "Sin registro"}</td>
                    {PERMISOS.map((permiso) => (
                      <td key={permiso.key} className="px-4 py-3">
                        <div className="flex justify-center">
                          <Toggle
                            checked={Boolean(user[permiso.key])}
                            onChange={(checked) => onToggle(user, permiso.key, checked)}
                            label={`${permiso.label} — ${user.nombre}`}
                            disabled={!isSO || updatePending}
                          />
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => onEdit(user)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-ink-quiet hover:bg-surface-2 hover:text-brand-700"
                          aria-label={`Editar ${user.nombre}`}
                          title="Editar usuario"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function PermissionMatrix({ roles }: { roles: Role[] }) {
  const ordered = sortedRoles(roles).filter((role) => ROLE_ORDER.includes(role.nombre_rol));
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-line px-4 py-3">
        <p className="text-[13px] font-semibold text-ink">Matriz de permisos por módulo</p>
        <p className="mt-0.5 text-[11.5px] text-ink-quiet">Permisos efectivos por perfil principal.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-line bg-surface text-[10.5px] uppercase tracking-wide text-ink-quiet">
              <th className="w-[190px] px-4 py-3 font-semibold">Módulo</th>
              {ordered.map((role) => (
                <th key={role.id_rol} className="px-4 py-3 font-semibold">{role.nombre_rol}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIZ_PERMISOS.map((row) => (
              <tr key={row.modulo} className="border-b border-line-soft last:border-0">
                <td className="px-4 py-3 font-semibold text-ink">{row.modulo}</td>
                {ordered.map((role) => {
                  const value = row.accesos[role.nombre_rol] ?? "Sin acceso";
                  const enabled = value !== "Sin acceso";
                  return (
                    <td key={role.id_rol} className="px-4 py-3">
                      <span className={cn("inline-flex rounded-md px-2 py-1 text-[11px] font-medium", enabled ? "bg-brand-50 text-brand-800" : "bg-surface-2 text-ink-faint")}>
                        {value}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function AdminUsuariosPage() {
  const location = useLocation();
  const rolesView = location.pathname === "/admin/roles";
  const { data: roles = [] } = useRoles();
  const { data: counts } = useUserCounts();
  const updateUser = useUpdateUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UserListItem | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [roleFilter, setRoleFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState<"todos" | "activo" | "inactivo">("todos");
  const [permissionFilter, setPermissionFilter] = useState<PermissionFilter>("todos");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setPagina(1);
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const { data: pageData, isLoading } = useUsers({
    search: debouncedQuery.trim() || undefined,
    rol: roleFilter !== "todos" ? Number(roleFilter) : undefined,
    estado: statusFilter !== "todos" ? statusFilter : undefined,
    page: rolesView ? 1 : pagina,
    limit: rolesView ? ACCESS_LIMIT : POR_PAGINA,
  });

  const pageUsers = useMemo(() => pageData?.items ?? [], [pageData]);
  const visibleAccessUsers = useMemo(() => {
    if (!rolesView) return pageUsers;
    return pageUsers.filter((user) => roleVisibleForAdmin(user.roles?.nombre_rol));
  }, [pageUsers, rolesView]);
  const accessUsers = useMemo(() => {
    if (!rolesView) return pageUsers;
    if (permissionFilter === "todos") return visibleAccessUsers;
    if (permissionFilter === "con_permisos") return visibleAccessUsers.filter(userHasSpecialPermission);
    return visibleAccessUsers.filter((user) => Boolean(user[permissionFilter]));
  }, [pageUsers, permissionFilter, rolesView, visibleAccessUsers]);

  const total = pageData?.total ?? 0;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);

  const abrirCrear = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const abrirEditar = (user: UserListItem) => {
    setEditing(user);
    setModalOpen(true);
  };

  const setRoleAndReset = (value: string) => {
    setRoleFilter(value);
    setPagina(1);
  };

  const setStatusAndReset = (value: "todos" | "activo" | "inactivo") => {
    setStatusFilter(value);
    setPagina(1);
  };

  const togglePermiso = (user: UserListItem, permiso: PermisoKey, checked: boolean) => {
    if (!userIsSO(user)) {
      toast.warning("Los permisos especiales solo aplican a Seguridad Operativa");
      return;
    }
    updateUser.mutate(
      { id_usuario: user.id_usuario, [permiso]: checked },
      {
        onSuccess: () => toast.success("Permiso actualizado"),
        onError: (error) => toast.error(apiErrorMessage(error, "No se pudo actualizar el permiso")),
      }
    );
  };

  return (
    <AdminShell>
      {rolesView ? (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[12.5px] text-ink-quiet">Control de accesos, permisos especiales y perfiles del sistema.</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11.5px] text-ink-quiet">
                <span className="rounded-md bg-surface px-2 py-1">{counts?.activos ?? 0} activos</span>
                <span className="rounded-md bg-surface px-2 py-1">{counts?.porPermiso.es_responsable ?? 0} responsables SO</span>
                <span className="rounded-md bg-surface px-2 py-1">{counts?.porPermiso.puede_reabrir_casos ?? 0} pueden reabrir</span>
                <span className="rounded-md bg-surface px-2 py-1">{counts?.porPermiso.puede_rechazar_reportes ?? 0} pueden rechazar</span>
              </div>
            </div>
            <Button size="sm" onClick={abrirCrear}>
              <UserPlus className="h-4 w-4" /> Nuevo usuario
            </Button>
          </div>

          <div className="mt-5">
            <AccessRoleTabs roles={roles} counts={counts} value={roleFilter} onChange={setRoleAndReset} />
          </div>

          <div className="mt-4 grid gap-3 rounded-2xl border border-line bg-white p-4 lg:grid-cols-[minmax(260px,1fr)_190px_230px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar usuario, correo o área"
                className="pl-9"
                autoComplete="off"
                name="buscar-usuarios-accesos"
              />
            </div>
            <Select value={statusFilter} onChange={(event) => setStatusAndReset(event.target.value as typeof statusFilter)} aria-label="Filtrar por estado">
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </Select>
            <Select value={permissionFilter} onChange={(event) => setPermissionFilter(event.target.value as PermissionFilter)} aria-label="Filtrar por permiso">
              <option value="todos">Todos los permisos</option>
              <option value="con_permisos">Con permisos especiales</option>
              {PERMISOS.map((permiso) => (
                <option key={permiso.key} value={permiso.key}>{permiso.label}</option>
              ))}
            </Select>
          </div>

          <div className="mt-4">
            <AccessUsersTable
              users={accessUsers}
              isLoading={isLoading}
              permissionFilter={permissionFilter}
              updatePending={updateUser.isPending}
              onToggle={togglePermiso}
              onEdit={abrirEditar}
            />
          </div>

          <div className="mt-4">
            <PermissionMatrix roles={roles} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="text-[12.5px] text-ink-quiet">{counts?.total ?? 0} usuarios registrados · {counts?.activos ?? 0} activos</p>
            <Button size="sm" onClick={abrirCrear}>
              <UserPlus className="h-4 w-4" /> Nuevo usuario
            </Button>
          </div>

          <div className="mt-5 grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-[minmax(260px,1fr)_minmax(190px,1fr)_minmax(170px,1fr)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar usuario"
                className="pl-9"
                autoComplete="off"
                name="buscar-usuarios"
              />
            </div>
            <Select value={roleFilter} onChange={(event) => setRoleAndReset(event.target.value)} aria-label="Filtrar por rol">
              <option value="todos">Todos los roles</option>
              {sortedRoles(roles).map((role) => <option key={role.id_rol} value={role.id_rol}>{role.nombre_rol}</option>)}
            </Select>
            <Select value={statusFilter} onChange={(event) => setStatusAndReset(event.target.value as typeof statusFilter)} aria-label="Filtrar por estado">
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </Select>
          </div>

          {isLoading ? (
            <Card className="mt-4 p-8 text-center text-[13px] text-ink-quiet">Cargando usuarios...</Card>
          ) : pageUsers.length === 0 ? (
            <Card className="mt-4 flex flex-col items-center gap-2 border-dashed p-9 text-center">
              <Users className="h-7 w-7 text-ink-faint" />
              <p className="text-[13px] font-semibold text-ink">No se encontraron usuarios</p>
              <p className="text-[11.5px] text-ink-quiet">Prueba con otros filtros o registra una cuenta nueva.</p>
            </Card>
          ) : (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="mt-4 overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-[1060px] w-full text-left text-[12.5px]">
                    <thead>
                      <tr className="border-b border-line bg-surface text-[11px] text-ink-quiet">
                        <th className="px-4 py-3 font-semibold">Código</th>
                        <th className="px-4 py-3 font-semibold">Nombre</th>
                        <th className="px-4 py-3 font-semibold">Teléfono</th>
                        <th className="px-4 py-3 font-semibold">Área</th>
                        <th className="px-4 py-3 font-semibold">Cargo</th>
                        <th className="px-4 py-3 font-semibold">Rol</th>
                        <th className="px-4 py-3 font-semibold">Estado</th>
                        <th className="px-4 py-3 text-right font-semibold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageUsers.map((user) => (
                        <tr key={user.id_usuario} className="border-b border-line-soft last:border-0 hover:bg-surface">
                          <td className="px-4 py-3 font-mono text-[10.5px] text-ink-soft">{user.codigo_usuario}</td>
                          <td className="px-4 py-3"><UserIdentity user={user} /></td>
                          <td className="px-4 py-3 text-ink-soft">{user.telefono || "—"}</td>
                          <td className="px-4 py-3 text-ink-soft">{user.areas?.nombre_area ?? "—"}</td>
                          <td className="px-4 py-3 text-ink-soft">{user.cargo || "—"}</td>
                          <td className="px-4 py-3"><RoleBadge roleName={user.roles?.nombre_rol} /></td>
                          <td className="px-4 py-3"><StatusBadge estado={user.estado} /></td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => abrirEditar(user)}
                                className="grid h-8 w-8 place-items-center rounded-lg text-ink-quiet hover:bg-surface-2 hover:text-brand-700"
                                aria-label={`Editar ${user.nombre}`}
                                title="Editar usuario"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {total > 0 && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[12px] text-ink-quiet">
                    Mostrando {(paginaActual - 1) * POR_PAGINA + 1}–{Math.min(paginaActual * POR_PAGINA, total)} de {total} usuarios
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={paginaActual === 1}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-[12px] text-ink-quiet">Página {paginaActual} de {totalPaginas}</span>
                    <Button variant="outline" size="sm" onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}

      <UserFormModal open={modalOpen} onClose={() => setModalOpen(false)} user={editing} />
    </AdminShell>
  );
}
