
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
