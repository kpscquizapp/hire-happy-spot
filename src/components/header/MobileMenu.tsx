
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthButtons from './AuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { language, translations } = useLanguage();

  return (
    <div className={cn(
      "md:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-100 transition-all duration-300 overflow-hidden shadow-lg z-40",
      isOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
    )}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-4">
          {/* Jobs with submenu */}
          <div className="space-y-2">
            <div className="font-medium text-neutral-900">{translations.jobs[language]}</div>
            <div className="pl-4 border-l-2 border-neutral-100 space-y-2">
              <a href="#jobs-by-location" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                {translations.jobsByLocation[language]}
              </a>
              <a href="#jobs-by-category" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                {translations.jobsByCategory[language]}
              </a>
              <a href="#jobs-by-experience" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                {translations.jobsByExperience[language]}
              </a>
              <a href="#jobs-by-industry" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                {translations.jobsByIndustry[language]}
              </a>
            </div>
          </div>
          
          {/* Services with submenu */}
          <div className="space-y-2">
            <div className="font-medium text-neutral-900">{translations.services[language]}</div>
            <div className="pl-4 border-l-2 border-neutral-100 space-y-2">
              <a href="#career-path" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                {translations.careerPathVisualization[language]}
              </a>
              <a href="#resume-builder" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                {translations.resumeBuilder[language]}
              </a>
              <a href="#technical-trainings" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                {translations.technicalTrainings[language]}
              </a>
            </div>
          </div>
          
          {/* Regular menu items */}
          <a href="#about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
            {translations.aboutUs[language]}
          </a>
          <a href="#blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
            {translations.blog[language]}
          </a>
          <a href="#contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
            {translations.contact[language]}
          </a>
        </nav>
        <AuthButtons isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
