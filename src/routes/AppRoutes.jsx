import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import ContentModerationPage from '../pages/ContentModerationPage';
import ReportsPage from '../pages/ReportsPage';
import VerificationPage from '../pages/VerificationPage';
import MessageSafetyPage from '../pages/MessageSafetyPage';
import SupportAgentDeskPage from '../pages/SupportAgentDeskPage';
import RolesPermissionsPage from '../pages/RolesPermissionsPage';
import AuditLogsPage from '../pages/AuditLogsPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Wrapper */}
      <Route element={<MainLayout />}>
        {/* Default redirect to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Individual Routes mapping to their respective pages */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/moderation" element={<ContentModerationPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/message-safety" element={<MessageSafetyPage />} />
        <Route path="/support" element={<SupportAgentDeskPage />} />
        <Route path="/roles-permissions" element={<RolesPermissionsPage />} />
        <Route path="/audit-logs" element={<AuditLogsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
