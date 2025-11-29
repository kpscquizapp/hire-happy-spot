import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown, ChevronRight } from 'lucide-react';
import AuthButtons from './AuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { translations } = useLanguage();
  const { user } = useAuth();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isCandidate = user?.role === 'candidate';
  const isEmployer = user?.role === 'employer';

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={cn(
      "md:hidden fixed top-full left-0 right-0 bg-white border-t border-neutral-100 transition-all duration-300 overflow-y-auto shadow-lg z-40",
      isOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
    )}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-2">
          {/* Candidates Section - Show only to candidates or non-logged users */}
          {(!user || isCandidate) && (
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('candidates')}
              className="w-full flex items-center justify-between text-neutral-900 hover:text-teal-600 py-2 font-medium"
            >
              {translations.candidates}
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSection === 'candidates' && "rotate-180")} />
            </button>
            {openSection === 'candidates' && (
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/jobs" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.jobsByCategory}</Link>
                <Link to="/jobs/locations" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.jobsByLocation}</Link>
                <Link to="/career-path" className="block text-sm text-teal-600 font-medium py-1">{translations.careerPathVisualization} ✨</Link>
                <Link to="/skills-assessment" className="block text-sm text-teal-600 font-medium py-1">Skills Assessment ✨</Link>
                <Link to="/resume-builder" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.resumeBuilder}</Link>
                <Link to="/interview-prep" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.interviewPrep}</Link>
              </div>
            )}
          </div>
          )}

          {/* Talent Marketplace Section - Show only to employers or non-logged users */}
          {(!user || isEmployer) && (
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('marketplace')}
              className="w-full flex items-center justify-between text-neutral-900 hover:text-teal-600 py-2 font-medium"
            >
              <span>
                {translations.talentMarketplace}
                <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">New</span>
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSection === 'marketplace' && "rotate-180")} />
            </button>
            {openSection === 'marketplace' && (
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/find-talent" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.findTalent}</Link>
                <Link to="/list-bench-talent" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.registerTalent}</Link>
                <Link to="/find-talent" className="block text-sm text-teal-600 hover:text-teal-700 py-1 font-medium">{translations.aiTalentMatching}</Link>
              </div>
            )}
          </div>
          )}

          {/* Employers Section - Show only to employers or non-logged users */}
          {(!user || isEmployer) && (
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('employers')}
              className="w-full flex items-center justify-between text-neutral-900 hover:text-teal-600 py-2 font-medium"
            >
              {translations.employers}
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSection === 'employers' && "rotate-180")} />
            </button>
            {openSection === 'employers' && (
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/post-job" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.postJob}</Link>
                <Link to="/employer" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.companyDashboard}</Link>
                <Link to="/ai-screening" className="block text-sm text-teal-600 hover:text-teal-700 py-1 font-medium">{translations.aiScreening}</Link>
              </div>
            )}
          </div>
          )}

          {/* Services Section - Show only to employers or non-logged users */}
          {(!user || isEmployer) && (
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('services')}
              className="w-full flex items-center justify-between text-neutral-900 hover:text-teal-600 py-2 font-medium"
            >
              {translations.services}
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSection === 'services' && "rotate-180")} />
            </button>
            {openSection === 'services' && (
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/resume-writing" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.resumeWriting}</Link>
                <Link to="/interview-coaching" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.interviewCoaching}</Link>
                <Link to="/ai-resume-review" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.aiResumeReview}</Link>
              </div>
            )}
          </div>
          )}

          {/* Resources Section - Show only to employers or non-logged users */}
          {(!user || isEmployer) && (
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('resources')}
              className="w-full flex items-center justify-between text-neutral-900 hover:text-teal-600 py-2 font-medium"
            >
              {translations.resources}
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSection === 'resources' && "rotate-180")} />
            </button>
            {openSection === 'resources' && (
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/blog" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.blogInsights}</Link>
                <Link to="/salary-trends" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.salaryTrends}</Link>
                <Link to="/career-advice" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.careerAdvice}</Link>
              </div>
            )}
          </div>
          )}

          {/* About Section - Show only to employers or non-logged users */}
          {(!user || isEmployer) && (
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('about')}
              className="w-full flex items-center justify-between text-neutral-900 hover:text-teal-600 py-2 font-medium"
            >
              {translations.aboutUs}
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSection === 'about' && "rotate-180")} />
            </button>
            {openSection === 'about' && (
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/about" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.aboutUsPage}</Link>
                <Link to="/hirio-ai" className="block text-sm text-teal-600 hover:text-teal-700 py-1 font-medium">{translations.hirioAI}</Link>
                <Link to="/contact" className="block text-sm text-neutral-600 hover:text-teal-600 py-1">{translations.contact}</Link>
              </div>
            )}
          </div>
          )}
        </nav>
        
        <AuthButtons isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
