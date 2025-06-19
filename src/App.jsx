import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import DataJobs from '@/pages/DataJobs';
import CreateJob from '@/pages/CreateJob';
import EnrichmentPipelines from '@/pages/EnrichmentPipelines';
import Integrations from '@/pages/Integrations';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import LandingPage from '@/pages/LandingPage';
import { useAuth } from '@/contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/data-jobs" element={<DataJobs />} />
                  <Route path="/create-job" element={<CreateJob />} />
                  <Route path="/enrichment-pipelines" element={<EnrichmentPipelines />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/data-jobs" element={<DataJobs />} />
                <Route path="/create-job" element={<CreateJob />} />
                <Route path="/enrichment-pipelines" element={<EnrichmentPipelines />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Helmet>
        <title>DataFlow Pro - Automate. Enrich. Integrate.</title>
        <meta name="description" content="Professional data automation platform for modern data teams. Automate workflows, enrich data, and integrate seamlessly." />
      </Helmet>
      <Router>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
            <Toaster />
          </DataProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;