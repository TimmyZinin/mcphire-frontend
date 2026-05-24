import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { queryClient } from "@/lib/queryClient";
import { MainLayout } from "@/components/layouts/MainLayout";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { V3Layout } from "@/components/layouts/V3Layout";
import { ScrollToTop } from "@/components/ScrollToTop";

// ---- Eagerly loaded (critical path) -----------------------
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import NotFound from "./pages/NotFound";

// ---- Lazy loaded (code-split) -----------------------------
const Knowledge = lazy(() => import("./pages/Knowledge"));
const KnowledgeCategory = lazy(() => import("./pages/KnowledgeCategory"));
const KnowledgeArticle = lazy(() => import("./pages/KnowledgeArticle"));
const JobsByCity = lazy(() => import("./pages/JobsByCity"));
const JobsByCategory = lazy(() => import("./pages/JobsByCategory"));
const EmployersPage = lazy(() => import("./pages/EmployersPage"));
const CompanyDetailPage = lazy(() => import("./pages/CompanyDetailPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const SalaryCalculator = lazy(() => import("./pages/SalaryCalculator"));
const ResumeChecklist = lazy(() => import("./pages/ResumeChecklist"));
const ResumeReview = lazy(() => import("./pages/ResumeReview"));
const McpPage = lazy(() => import("./pages/McpPage"));
const SavedJobs = lazy(() => import("./pages/SavedJobs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const PricingPage = lazy(() => import("./pages/PricingPage"));

// ---- Auth pages -------------------------------------------
const AuthPage = lazy(() => import("./pages/auth/AuthPage"));
// PasswordResetPage removed in Sprint 12 task 33 — magic-link replaces it
const VerifyMagicLinkPage = lazy(() => import("./pages/auth/VerifyMagicLinkPage"));

// ---- Seeker pages -----------------------------------------
// SeekerProfilePage already contains its own Navbar+Footer — rendered without DashboardLayout
const SeekerProfilePage = lazy(() => import("./pages/seeker/SeekerProfilePage"));
const MyApplicationsPage = lazy(() => import("./pages/seeker/MyApplicationsPage"));

// ---- Employer pages ---------------------------------------
// EmployerDashboardPage and CreateJobPage already contain their own Navbar+Footer
const EmployerDashboardPage = lazy(() => import("./pages/employer/EmployerDashboardPage"));
const CreateJobPage = lazy(() => import("./pages/employer/CreateJobPage"));

// ---- Fallback loader ----------------------------------------
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ---- Layout route helpers ----------------------------------
// These components render a layout wrapper around <Outlet />,
// enabling React Router v6 nested layout routing.

function AuthLayoutRoute() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

function DashboardLayoutRoute() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

function MainLayoutRoute() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function V3LayoutRoute() {
  return (
    <V3Layout>
      <Outlet />
    </V3Layout>
  );
}

// ---- App ---------------------------------------------------

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* ---- Public routes (pages include their own Navbar + Footer) ---- */}
                  <Route path="/" element={<HomePage />} />

                  {/* ---- Pages without inline navbar/footer — V3Layout wrap ---- */}
                  <Route element={<V3LayoutRoute />}>
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/tools/salary" element={<SalaryCalculator />} />
                    <Route path="/tools/resume-checklist" element={<ResumeChecklist />} />
                    <Route path="/tools/resume-review" element={<ResumeReview />} />
                  </Route>

                  {/* ---- Knowledge base ---- */}
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/knowledge/:category" element={<KnowledgeCategory />} />
                  <Route path="/knowledge/:category/:slug" element={<KnowledgeArticle />} />

                  {/* ---- Jobs — ORDER MATTERS: specific before :id ---- */}
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/jobs/saved" element={<SavedJobs />} />
                  <Route path="/jobs/city/:city" element={<JobsByCity />} />
                  <Route path="/jobs/category/:category" element={<JobsByCategory />} />
                  <Route path="/jobs/:id" element={<JobDetailPage />} />

                  {/* ---- Employers landing ---- */}
                  <Route path="/employers" element={<EmployersPage />} />

                  {/* ---- Company profiles ---- */}
                  <Route path="/companies/:slug" element={<CompanyDetailPage />} />

                  {/* ---- MCP ---- */}
                  <Route path="/mcp" element={<McpPage />} />

                  {/* ---- Pricing (V3 layout — no inline navbar/footer) ---- */}
                  <Route element={<V3LayoutRoute />}>
                    <Route path="/pricing" element={<PricingPage />} />
                  </Route>

                  {/* ---- Auth routes ----
                      NOTE: AuthPage contains its own centered layout with logo + card.
                      AuthLayout is provided for future new auth pages;
                      the existing AuthPage works as-is. ---- */}
                  <Route path="/auth/login" element={<AuthPage />} />
                  {/* Legacy /auth/register → magic-link login (Sprint 12 task 33) */}
                  <Route path="/auth/register" element={<Navigate to="/auth/login" replace />} />
                  {/* Legacy /auth/verify (email-verification) → login */}
                  <Route path="/auth/verify" element={<Navigate to="/auth/login" replace />} />
                  <Route path="/auth/reset-password" element={<Navigate to="/auth/login" replace />} />
                  <Route path="/auth/verify-magic-link" element={<VerifyMagicLinkPage />} />

                  {/* ---- Seeker routes (protected) ----
                      NOTE: SeekerProfilePage already includes its own Navbar+Footer.
                      ProtectedRoute is applied individually — no layout wrapping. ---- */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <SeekerProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* /applications — DashboardLayout (new page, no inline layout) */}
                  <Route
                    element={
                      <ProtectedRoute>
                        <DashboardLayoutRoute />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/applications" element={<MyApplicationsPage />} />
                  </Route>

                  {/* ---- Employer routes (protected, employer role) ----
                      NOTE: EmployerDashboardPage and CreateJobPage already include
                      their own Navbar+Footer — no DashboardLayout wrapping. ---- */}
                  <Route
                    path="/employer/dashboard"
                    element={
                      <ProtectedRoute requiredRole="employer">
                        <EmployerDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/employer/jobs/create"
                    element={
                      <ProtectedRoute requiredRole="employer">
                        <CreateJobPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/employer/jobs/:id/edit"
                    element={
                      <ProtectedRoute requiredRole="employer">
                        <CreateJobPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* /employer/applications — DashboardLayout (new route, no inline layout) */}
                  <Route
                    element={
                      <ProtectedRoute requiredRole="employer">
                        <DashboardLayoutRoute />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/employer/applications" element={<EmployerDashboardPage />} />
                  </Route>

                  {/* ---- 404 ---- */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
