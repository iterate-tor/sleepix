import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Index } from "./pages/Index";
import { Onboarding } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminUserManagement } from "./pages/AdminUserManagement";
import { AdminCampaignManagement } from "./pages/AdminCampaignManagement";
import { AdminSettings } from "./pages/AdminSettings";
import { EmployeeLogin } from "./pages/EmployeeLogin";
import { EmployeeSettings } from "./pages/EmployeeSettings";
import { EmployeeAssessments } from "./pages/EmployeeAssessments";
import { EmployeeGoals } from "./pages/EmployeeGoals";
import { EmployeeCampaigns } from "./pages/EmployeeCampaigns";
import { Integrations } from "./pages/Integrations";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

function App() {
  // Persistent auth state management with localStorage
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(() => {
    return localStorage.getItem("userAuthenticated") === "true";
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuthenticated") === "true";
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem("onboardingCompleted") === "true";
  });

  // Update localStorage whenever auth state changes
  useEffect(() => {
    localStorage.setItem("userAuthenticated", isUserAuthenticated.toString());
  }, [isUserAuthenticated]);

  useEffect(() => {
    localStorage.setItem("adminAuthenticated", isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem(
      "onboardingCompleted",
      hasCompletedOnboarding.toString(),
    );
  }, [hasCompletedOnboarding]);

  const handleUserLogin = () => {
    setIsUserAuthenticated(true);
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleOnboardingComplete = () => {
    setIsUserAuthenticated(true);
    setHasCompletedOnboarding(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          {/* Default route - landing page */}
          <Route path="/" element={<Index />} />

          {/* Employee routes */}
          <Route
            path="/login"
            element={
              isUserAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <EmployeeLogin onLogin={handleUserLogin} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={<Onboarding onComplete={handleOnboardingComplete} />}
          />
          <Route
            path="/dashboard"
            element={
              isUserAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/integrations"
            element={
              isUserAuthenticated ? (
                <Integrations />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isUserAuthenticated ? (
                <EmployeeSettings />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/assessments"
            element={
              isUserAuthenticated ? (
                <EmployeeAssessments />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/goals"
            element={
              isUserAuthenticated ? (
                <EmployeeGoals />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/campaigns"
            element={
              isUserAuthenticated ? (
                <EmployeeCampaigns />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/login"
            element={
              isAdminAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isAdminAuthenticated ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              isAdminAuthenticated ? (
                <AdminUserManagement />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/campaigns"
            element={
              isAdminAuthenticated ? (
                <AdminCampaignManagement />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/settings"
            element={
              isAdminAuthenticated ? (
                <AdminSettings />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
