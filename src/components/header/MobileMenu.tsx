
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthButtons from './AuthButtons';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { language, translations } = useLanguage();

  return (
    <div className={cn(
      "md:hidden fixed top-full left-0 right-0 bg-white border-t border-neutral-100 transition-all duration-300 overflow-hidden shadow-lg z-40",
      isOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
    )}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-4">
          <Accordion type="multiple" className="w-full">
            {/* Jobs with accordion submenu */}
            <AccordionItem value="jobs" className="border-none">
              <AccordionTrigger className="py-2 font-medium text-neutral-900 hover:no-underline">
                {translations.jobs[language]}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 border-l-2 border-neutral-100 space-y-2">
                  <Link to="/jobs-by-location" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                    {translations.jobsByLocation[language]}
                  </Link>
                  <Link to="/jobs-by-category" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                    {translations.jobsByCategory[language]}
                  </Link>
                  <Link to="/jobs-by-experience" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                    {translations.jobsByExperience[language]}
                  </Link>
                  <Link to="/jobs-by-industry" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                    {translations.jobsByIndustry[language]}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Services with accordion submenu */}
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="py-2 font-medium text-neutral-900 hover:no-underline">
                {translations.services[language]}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 border-l-2 border-neutral-100 space-y-2">
                  <Link to="/career-path" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                    {translations.careerPathVisualization[language]}
                  </Link>
                  <Link to="/resume-builder" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                    {translations.resumeBuilder[language]}
                  </Link>
                  <Link to="/technical-trainings" className="block text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-1">
                    {translations.technicalTrainings[language]}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Regular menu items */}
          <Link to="/about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
            {translations.aboutUs[language]}
          </Link>
          <Link to="/blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
            {translations.blog[language]}
          </Link>
          <Link to="/contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
            {translations.contact[language]}
          </Link>
        </nav>
        <AuthButtons isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
