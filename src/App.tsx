import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CareerPath from "./pages/CareerPath";
import Marketplace from "./pages/Marketplace";
import FindTalent from "./pages/FindTalent";
import TalentProfile from "./pages/TalentProfile";
import RegisterTalent from "./pages/RegisterTalent";
import EmployerLogin from "./pages/EmployerLogin";
import Register from "./pages/Register";
import JobSearch from "./pages/JobSearch";
import JobDetails from "./pages/JobDetails";
import ListBenchTalent from "./pages/ListBenchTalent";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateProfile from "./pages/CandidateProfile";
import JobRecommendations from "./pages/JobRecommendations";
import SkillsAssessment from "./pages/SkillsAssessment";
import SavedJobs from "./pages/SavedJobs";

// Employer Dashboard
import EmployerLayout from "./components/employer/EmployerLayout";
import CompanyDashboard from "./pages/employer/CompanyDashboard";
import PostJob from "./pages/employer/PostJob";
import AIScreening from "./pages/employer/AIScreening";
import HireFullTime from "./pages/employer/HireFullTime";
import HireInterns from "./pages/employer/HireInterns";
import ContractHiring from "./pages/employer/ContractHiring";
import TalentMarketplace from "./pages/employer/TalentMarketplace";
import JobCandidates from "./pages/employer/JobCandidates";
import AIInterviewResults from "./pages/employer/AIInterviewResults";

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <ScrollToTop />
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/career-path" element={<CareerPath />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/find-talent" element={<FindTalent />} />
                <Route path="/talent/:id" element={<TalentProfile />} />
                <Route path="/register-talent" element={<RegisterTalent />} />
                <Route path="/employer" element={<EmployerLogin />} />
                <Route path="/employer-login" element={<EmployerLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobSearch />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/job/:id" element={<JobDetails />} />
                <Route path="/list-bench-talent" element={<ListBenchTalent />} />
                <Route path="/candidate-login" element={<CandidateLogin />} />
                <Route path="/profile" element={<CandidateProfile />} />
                <Route path="/job-recommendations" element={<JobRecommendations />} />
                <Route path="/skills-assessment" element={<SkillsAssessment />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                {/* Employer Dashboard Routes */}
                <Route path="/employer-dashboard" element={<EmployerLayout />}>
                  <Route index element={<CompanyDashboard />} />
                  <Route path="post-job" element={<PostJob />} />
                  <Route path="hire-fulltime" element={<HireFullTime />} />
                  <Route path="hire-interns" element={<HireInterns />} />
                  <Route path="contract-hiring" element={<ContractHiring />} />
                  <Route path="talent-marketplace" element={<TalentMarketplace />} />
                  <Route path="ai-screening" element={<AIScreening />} />
                  <Route path="job/:jobId/candidates" element={<JobCandidates />} />
                  <Route path="interview-results/:candidateId" element={<AIInterviewResults />} />
                </Route>

                {/* Standalone employer routes (redirect to dashboard) */}
                <Route path="/post-job" element={<EmployerLayout />}>
                  <Route index element={<PostJob />} />
                </Route>
                <Route path="/hire-fulltime" element={<EmployerLayout />}>
                  <Route index element={<HireFullTime />} />
                </Route>
                <Route path="/hire-interns" element={<EmployerLayout />}>
                  <Route index element={<HireInterns />} />
                </Route>
                <Route path="/contract-hiring" element={<EmployerLayout />}>
                  <Route index element={<ContractHiring />} />
                </Route>
                <Route path="/talent-marketplace" element={<EmployerLayout />}>
                  <Route index element={<TalentMarketplace />} />
                </Route>
                <Route path="/ai-screening" element={<EmployerLayout />}>
                  <Route index element={<AIScreening />} />
                </Route>
                <Route path="/company-dashboard" element={<EmployerLayout />}>
                  <Route index element={<CompanyDashboard />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;