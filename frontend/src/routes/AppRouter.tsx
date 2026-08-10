import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReportanteHomePage } from "@/pages/reports/ReportanteHomePage";
import { NewReportPage } from "@/pages/reports/NewReportPage";
import { MyReportsPage } from "@/pages/reports/MyReportsPage";
import { NotificationsPage } from "@/pages/reports/NotificationsPage";
import { SoDashboardPage } from "@/pages/seguridad/DashboardPage";
import { SoCasosPage } from "@/pages/seguridad/CasosPage";
import { CaseDetailPage } from "@/pages/seguridad/CaseDetailPage";
import { JefeHome } from "@/pages/jefe/JefeHome";
import { PlanDetail } from "@/pages/jefe/PlanDetail";
import { SoUsuariosPage } from "@/pages/seguridad/UsuariosPage";
import { ReportExportPage } from "@/pages/seguridad/ReportExportPage";
import { SoDecisionesPage } from "@/pages/seguridad/DecisionesPage";
import { SoNotificacionesPage } from "@/pages/seguridad/NotificacionesPage";
import {
  SoAlertasPage,
  SoEventosPage,
  SoPerfilPage,
  SoPlanesAccionPage,
  SoReportesPage,
} from "@/pages/seguridad/PlaceholderPages";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sin login todavía — se redirige directo al portal del trabajador */}
        <Route path="/" element={<Navigate to="/reportes" replace />} />
        <Route path="/reportes" element={<ReportanteHomePage />} />
        <Route path="/reportes/nuevo" element={<NewReportPage />} />
        <Route path="/reportes/mis-reportes" element={<MyReportsPage />} />
        <Route path="/reportes/notificaciones" element={<NotificationsPage />} />

        {/* Portal de Seguridad Operativa (Analista SO) — sin login todavía */}
        <Route path="/seguridad" element={<SoDashboardPage />} />
        <Route path="/seguridad/casos" element={<SoCasosPage />} />
        <Route path="/seguridad/casos/:codigo" element={<CaseDetailPage />} />
        <Route path="/seguridad/usuarios" element={<SoUsuariosPage />} />
        <Route path="/seguridad/decisiones" element={<SoDecisionesPage />} />
        <Route path="/seguridad/alertas" element={<SoAlertasPage />} />
        <Route path="/seguridad/planes-accion" element={<SoPlanesAccionPage />} />
        <Route path="/seguridad/eventos" element={<SoEventosPage />} />
        <Route path="/seguridad/reportes" element={<SoReportesPage />} />
        <Route path="/seguridad/reportes/kpis" element={<SoReportesPage />} />
        <Route path="/seguridad/reportes/estadisticas" element={<SoReportesPage />} />
        <Route path="/seguridad/reportes/exportar" element={<ReportExportPage />} />
        <Route path="/seguridad/notificaciones" element={<SoNotificacionesPage />} />
        <Route path="/seguridad/perfil" element={<SoPerfilPage />} />

        {/* Portal Jefe de Área — sin login todavía; el área se elige a mano */}
        <Route path="/jefe" element={<JefeHome />} />
        <Route path="/jefe/planes/:codigo" element={<PlanDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
