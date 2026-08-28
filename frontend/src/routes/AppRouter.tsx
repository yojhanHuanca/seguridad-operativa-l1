import { lazy, Suspense, type ComponentType } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";

function lazyNamed(loader: () => Promise<Record<string, unknown>>, exportName: string) {
  return lazy(async () => ({ default: (await loader())[exportName] as ComponentType }));
}

const Landing = lazyNamed(() => import("@/pages/Landing"), "Landing");
const LoginPage = lazyNamed(() => import("@/pages/Login"), "LoginPage");
const ForgotPasswordPage = lazyNamed(() => import("@/pages/ForgotPassword"), "ForgotPasswordPage");
const ResetPasswordPage = lazyNamed(() => import("@/pages/ResetPassword"), "ResetPasswordPage");
const NewReportPage = lazyNamed(() => import("@/pages/reports/NewReportPage"), "NewReportPage");
const ConsultarReportePage = lazyNamed(() => import("@/pages/reports/ConsultarReportePage"), "ConsultarReportePage");
const SoDashboardPage = lazyNamed(() => import("@/pages/seguridad/DashboardPage"), "SoDashboardPage");
const SoCasosPage = lazyNamed(() => import("@/pages/seguridad/CasosPage"), "SoCasosPage");
const CaseDetailPage = lazyNamed(() => import("@/pages/seguridad/CaseDetailPage"), "CaseDetailPage");
const ReportExportPage = lazyNamed(() => import("@/pages/seguridad/ReportExportPage"), "ReportExportPage");
const SoKpisPage = lazyNamed(() => import("@/pages/seguridad/reportes/KpisPage"), "SoKpisPage");
const SoNotificacionesPage = lazyNamed(() => import("@/pages/seguridad/NotificacionesPage"), "SoNotificacionesPage");
const EventosAsignadosPage = lazyNamed(() => import("@/pages/seguridad/EventosAsignadosPage"), "EventosAsignadosPage");
const SoAlertasPage = lazyNamed(() => import("@/pages/seguridad/AlertasPage"), "SoAlertasPage");
const SoEventosPage = lazyNamed(() => import("@/pages/seguridad/EventosOperativosPage"), "SoEventosPage");
const SoPlanesAccionPage = lazyNamed(() => import("@/pages/seguridad/PlaceholderPages"), "SoPlanesAccionPage");
const SoPerfilPage = lazyNamed(() => import("@/pages/seguridad/PerfilPage"), "SoPerfilPage");
const JefeHome = lazyNamed(() => import("@/pages/jefe/JefeHome"), "JefeHome");
const PlanDetail = lazyNamed(() => import("@/pages/jefe/PlanDetail"), "PlanDetail");
const JefeIndicadoresPage = lazyNamed(() => import("@/pages/jefe/IndicadoresPage"), "JefeIndicadoresPage");
const JefeNotificacionesPage = lazyNamed(() => import("@/pages/jefe/NotificacionesPage"), "JefeNotificacionesPage");
const JefePerfilPage = lazyNamed(() => import("@/pages/jefe/PerfilPage"), "JefePerfilPage");
const MonitoreoDashboardPage = lazyNamed(() => import("@/pages/monitoreo/Dashboard"), "Dashboard");
const MonitoreoRegistroPage = lazyNamed(() => import("@/pages/monitoreo/Registro"), "Registro");
const MonitoreoHistorialPage = lazyNamed(() => import("@/pages/monitoreo/Historial"), "Historial");
const MonitoreoReportesPage = lazyNamed(() => import("@/pages/monitoreo/Reportes"), "Reportes");
const MonitoreoIndicadoresPage = lazyNamed(() => import("@/pages/monitoreo/Indicadores"), "Indicadores");
const MonitoreoDetallePage = lazyNamed(() => import("@/pages/monitoreo/Detalle"), "Detalle");
const MonitoreoEditarPage = lazyNamed(() => import("@/pages/monitoreo/Editar"), "Editar");
const MonitoreoPerfilPage = lazyNamed(() => import("@/pages/monitoreo/Perfil"), "Perfil");
const AdminUsuariosPage = lazyNamed(() => import("@/pages/admin/UsuariosPage"), "AdminUsuariosPage");
const AdminAreasPage = lazyNamed(() => import("@/pages/admin/AreasPage"), "AdminAreasPage");
const AdminEstacionesPage = lazyNamed(() => import("@/pages/admin/EstacionesPage"), "AdminEstacionesPage");
const AdminMaterialRodantePage = lazyNamed(() => import("@/pages/admin/MaterialRodantePage"), "AdminMaterialRodantePage");
const AdminConfiguracionPage = lazyNamed(() => import("@/pages/admin/ConfiguracionPage"), "AdminConfiguracionPage");
const AdminAuditoriaPage = lazyNamed(() => import("@/pages/AuditoriaPage"), "AdminAuditoriaPage");
const AdminPerfilPage = lazyNamed(() => import("@/pages/admin/PerfilPage"), "AdminPerfilPage");
const AdminImportacionPage = lazyNamed(() => import("@/pages/admin/ImportacionPage"), "AdminImportacionPage");
const NotFoundPage = lazyNamed(() => import("@/pages/NotFound"), "NotFoundPage");

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface px-6 text-[13px] font-medium text-ink-quiet">
      Cargando...
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/inicio" element={<Navigate to="/" replace />} />
          <Route path="/reportes" element={<Navigate to="/reportes/nuevo" replace />} />
          {/* Pública, sin sesión: quien reporta llega desde un QR/URL, sin cuenta. */}
          <Route path="/reportes/nuevo" element={<NewReportPage />} />
          {/* Pública, sin sesión: seguimiento por código para quien reportó sin cuenta. */}
          <Route path="/reportes/consulta" element={<ConsultarReportePage />} />
          <Route path="/reportes/mis-reportes" element={<Navigate to="/reportes/consulta" replace />} />
          <Route path="/reportes/notificaciones" element={<Navigate to="/reportes/consulta" replace />} />
          <Route path="/reportes/perfil" element={<Navigate to="/reportes/nuevo" replace />} />

          {/* Portal de Seguridad Operativa (Analista SO) — sin login todavía */}
          <Route path="/seguridad" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoDashboardPage /></ProtectedRoute>} />
          <Route path="/seguridad/casos" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoCasosPage /></ProtectedRoute>} />
          <Route path="/seguridad/casos/:codigo" element={<ProtectedRoute roles={["Seguridad Operativa"]}><CaseDetailPage /></ProtectedRoute>} />
          <Route path="/seguridad/alertas" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoAlertasPage /></ProtectedRoute>} />
          <Route path="/seguridad/planes-accion" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoPlanesAccionPage /></ProtectedRoute>} />
          <Route path="/seguridad/eventos" element={<ProtectedRoute roles={["Seguridad Operativa"]} requireResponsable><SoEventosPage /></ProtectedRoute>} />
          <Route path="/seguridad/reportes" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoKpisPage /></ProtectedRoute>} />
          <Route path="/seguridad/reportes/kpis" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoKpisPage /></ProtectedRoute>} />
          <Route path="/seguridad/reportes/exportar" element={<ProtectedRoute roles={["Seguridad Operativa"]}><ReportExportPage /></ProtectedRoute>} />
          <Route path="/seguridad/notificaciones" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoNotificacionesPage /></ProtectedRoute>} />
          <Route path="/seguridad/eventos-asignados" element={<ProtectedRoute roles={["Seguridad Operativa"]}><EventosAsignadosPage /></ProtectedRoute>} />
          <Route path="/seguridad/perfil" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoPerfilPage /></ProtectedRoute>} />

          {/* Portal Jefe de Área — sin login todavía; el área se elige a mano */}
          <Route path="/jefe" element={<ProtectedRoute roles={["Jefe de Área"]}><JefeHome /></ProtectedRoute>} />
          <Route path="/jefe/planes/:codigo" element={<ProtectedRoute roles={["Jefe de Área"]}><PlanDetail /></ProtectedRoute>} />
          <Route path="/jefe/indicadores" element={<ProtectedRoute roles={["Jefe de Área"]}><JefeIndicadoresPage /></ProtectedRoute>} />
          <Route path="/jefe/notificaciones" element={<ProtectedRoute roles={["Jefe de Área"]}><JefeNotificacionesPage /></ProtectedRoute>} />
          <Route path="/jefe/perfil" element={<ProtectedRoute roles={["Jefe de Área"]}><JefePerfilPage /></ProtectedRoute>} />

          {/* Panel de Monitoreo — en construcción, portado desde el prototipo */}
          <Route path="/monitoreo" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoDashboardPage /></ProtectedRoute>} />
          <Route path="/monitoreo/nuevo" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoRegistroPage /></ProtectedRoute>} />
          <Route path="/monitoreo/historial" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoHistorialPage /></ProtectedRoute>} />
          <Route path="/monitoreo/evento/:id" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoDetallePage /></ProtectedRoute>} />
          <Route path="/monitoreo/editar/:id" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoEditarPage /></ProtectedRoute>} />
          <Route path="/monitoreo/reportes" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoReportesPage /></ProtectedRoute>} />
          <Route path="/monitoreo/indicadores" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoIndicadoresPage /></ProtectedRoute>} />
          <Route path="/monitoreo/perfil" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoPerfilPage /></ProtectedRoute>} />

          {/* Panel de Administrador — sin login todavía */}
          <Route path="/admin" element={<ProtectedRoute roles={["Admin"]}><AdminUsuariosPage /></ProtectedRoute>} />
          <Route path="/admin/usuarios" element={<ProtectedRoute roles={["Admin"]}><AdminUsuariosPage /></ProtectedRoute>} />
          <Route path="/admin/roles" element={<ProtectedRoute roles={["Admin"]}><AdminUsuariosPage /></ProtectedRoute>} />
          <Route path="/admin/catalogos" element={<ProtectedRoute roles={["Admin"]}><AdminAreasPage /></ProtectedRoute>} />
          <Route path="/admin/estaciones" element={<ProtectedRoute roles={["Admin"]}><AdminEstacionesPage /></ProtectedRoute>} />
          <Route path="/admin/material-rodante" element={<ProtectedRoute roles={["Admin"]}><AdminMaterialRodantePage /></ProtectedRoute>} />
          <Route path="/admin/importacion" element={<ProtectedRoute roles={["Admin"]}><AdminImportacionPage /></ProtectedRoute>} />
          <Route path="/admin/auditoria" element={<ProtectedRoute roles={["Admin"]}><AdminAuditoriaPage /></ProtectedRoute>} />
          <Route path="/admin/configuracion" element={<ProtectedRoute roles={["Admin"]}><AdminConfiguracionPage /></ProtectedRoute>} />
          <Route path="/admin/perfil" element={<ProtectedRoute roles={["Admin"]}><AdminPerfilPage /></ProtectedRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
