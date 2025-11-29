import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const DesktopNavigation = () => {
  const { translations } = useLanguage();
  const { user } = useAuth();

  const isCandidate = user?.role === 'candidate';
  const isEmployer = user?.role === 'employer';

  return (
    <NavigationMenu className="hidden md:flex mr-auto ml-8">
      <NavigationMenuList className="space-x-1">
        {/* Candidates Menu - Show only to candidates or non-logged users */}
        {(!user || isCandidate) && (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.candidates}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[800px] p-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Jobs by Category */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">{translations.jobsByCategory}</h3>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-neutral-700 mt-3">{translations.jobsByIndustry}</h4>
                    <Link to="/jobs/it-software" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.itSoftware}</Link>
                    <Link to="/jobs/bpo-kpo" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.bpoKpo}</Link>
                    <Link to="/jobs/banking" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.bankingFinance}</Link>
                    <Link to="/jobs/sales-marketing" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.salesMarketing}</Link>
                    <Link to="/jobs/healthcare" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.healthcare}</Link>
                    
                    <h4 className="text-sm font-medium text-neutral-700 mt-4">{translations.jobsByRole}</h4>
                    <Link to="/jobs/developer" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.developer}</Link>
                    <Link to="/jobs/designer" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.designer}</Link>
                    <Link to="/jobs/data-analyst" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.dataAnalyst}</Link>
                  </div>
                </div>

                {/* Jobs by Location */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">{translations.jobsByLocation}</h3>
                  <div className="space-y-2">
                    <Link to="/jobs/bangalore" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.bangalore}</Link>
                    <Link to="/jobs/hyderabad" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.hyderabad}</Link>
                    <Link to="/jobs/pune" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.pune}</Link>
                    <Link to="/jobs/mumbai" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.mumbai}</Link>
                    <Link to="/jobs/delhi" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.delhiNCR}</Link>
                    
                    <h4 className="text-sm font-medium text-neutral-700 mt-4">Work Type</h4>
                    <Link to="/jobs/remote" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.remoteJobs}</Link>
                    <Link to="/jobs/hybrid" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.hybridJobs}</Link>
                    <Link to="/jobs/wfh" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.workFromHome}</Link>
                  </div>
                </div>

                {/* Candidate Tools */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">{translations.candidateTools}</h3>
                  <div className="space-y-2">
                    <Link to="/resume-builder" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.resumeBuilder}</Link>
                    <Link to="/career-path" className="block text-sm text-teal-600 hover:text-teal-700 py-1 font-medium">
                      {translations.careerPathVisualization} ✨
                    </Link>
                    <Link to="/interview-prep" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.interviewPrep}</Link>
                    <Link to="/salary-insights" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.salaryInsights}</Link>
                    <Link to="/skill-tests" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.skillTests}</Link>
                    <Link to="/skills-assessment" className="block text-sm text-teal-600 hover:text-teal-700 py-1 font-medium">
                      Skills Assessment ✨
                    </Link>
                    <Link to="/career-guidance" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.careerGuidance}</Link>
                    <Link to="/applications" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.applicationTracker}</Link>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        )}

        {/* Talent Marketplace Menu - Show only to employers or non-logged users */}
        {(!user || isEmployer) && (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.talentMarketplace}
            <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">New</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Find Talent */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">{translations.findTalent}</h3>
                  <div className="space-y-2">
                    <Link to="/find-talent" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.contractTalent}</Link>
                    <Link to="/find-talent?type=project" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.shortTermProject}</Link>
                    <Link to="/find-talent?type=bench" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.benchResources}</Link>
                    <Link to="/find-talent" className="block text-sm text-teal-600 hover:text-teal-700 py-1 font-medium">{translations.aiTalentMatching}</Link>
                    <Link to="/schedule-ai-interview" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.scheduleAIInterview}</Link>
                  </div>
                </div>

                {/* Register Talent */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">{translations.registerTalent}</h3>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-neutral-700 mt-2">For Individuals</h4>
                    <Link to="/register-talent" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.registerAsFreelance}</Link>
                    <Link to="/add-skills" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.addSkillsAvailability}</Link>
                    
                    <h4 className="text-sm font-medium text-neutral-700 mt-4">For Companies</h4>
                    <Link to="/list-bench-talent" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.addBenchResources}</Link>
                    <Link to="/register-talent" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.bulkUpload}</Link>
                    <Link to="/bench-dashboard" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.manageBenchDashboard}</Link>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        )}

        {/* Employers Menu - Show only to employers or non-logged users */}
        {(!user || isEmployer) && (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.employers}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-6">
              <div className="space-y-2">
                <Link to="/post-job" className="block text-sm text-neutral-600 hover:text-teal-600 py-2 font-medium">{translations.postJob}</Link>
                <Link to="/hire-fulltime" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.hireFullTime}</Link>
                <Link to="/hire-interns" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.hireInterns}</Link>
                <Link to="/hire-contract" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.shortTermHiring}</Link>
                <Link to="/marketplace" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.marketplaceAccess}</Link>
                <Link to="/ai-screening" className="block text-sm text-teal-600 hover:text-teal-700 py-2 font-medium">{translations.aiScreening}</Link>
                <Link to="/employer" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.companyDashboard}</Link>
                <Link to="/pricing" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.pricingPlans}</Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        )}

        {/* Services Menu - Show only to employers or non-logged users */}
        {(!user || isEmployer) && (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.services}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-6">
              <div className="space-y-2">
                <Link to="/resume-writing" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.resumeWriting}</Link>
                <Link to="/interview-coaching" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.interviewCoaching}</Link>
                <Link to="/ai-resume-review" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.aiResumeReview}</Link>
                <Link to="/background-verification" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.backgroundVerification}</Link>
                <Link to="/skills-assessment" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.skillAssessments}</Link>
                <Link to="/rpo" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.rpo}</Link>
                <Link to="/employer-branding" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.employerBranding}</Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        )}

        {/* Resources Menu - Show only to employers or non-logged users */}
        {(!user || isEmployer) && (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.resources}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-6">
              <div className="space-y-2">
                <Link to="/blog" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.blogInsights}</Link>
                <Link to="/salary-trends" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.salaryTrends}</Link>
                <Link to="/market-reports" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.marketReports}</Link>
                <Link to="/career-advice" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.careerAdvice}</Link>
                <Link to="/hiring-trends" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.hiringTrends}</Link>
                <Link to="/success-stories" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.successStories}</Link>
                <Link to="/faqs" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.faqs}</Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        )}

        {/* About Menu - Show only to employers or non-logged users */}
        {(!user || isEmployer) && (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.aboutUs}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-6">
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.aboutUsPage}</Link>
                <Link to="/hirio-ai" className="block text-sm text-teal-600 hover:text-teal-700 py-2 font-medium">{translations.hirioAI}</Link>
                <Link to="/team" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.ourTeam}</Link>
                <Link to="/contact" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.contact}</Link>
                <Link to="/press" className="block text-sm text-neutral-600 hover:text-teal-600 py-2">{translations.pressMedia}</Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
