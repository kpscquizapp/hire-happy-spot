
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DesktopNavigation = () => {
  const { language, translations } = useLanguage();

  return (
    <NavigationMenu className="hidden md:flex mr-auto ml-8">
      <NavigationMenuList>
        {/* Jobs Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
            {translations.jobs[language]}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 rounded-md shadow-lg w-96 z-50">
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="#jobs-by-location" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByLocation[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.findOpportunitiesInArea[language]}
                </div>
              </a>
              <a 
                href="#jobs-by-category" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByCategory[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.browseBySpecialization[language]}
                </div>
              </a>
              <a 
                href="#jobs-by-experience" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByExperience[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.fromEntryToExpert[language]}
                </div>
              </a>
              <a 
                href="#jobs-by-industry" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByIndustry[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.opportunitiesAcrossSectors[language]}
                </div>
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
            {translations.services[language]}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 rounded-md shadow-lg w-80 z-50">
            <div className="flex flex-col space-y-1">
              <a 
                href="#career-path" 
                className="group rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.careerPathVisualization[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.planCareerTrajectory[language]}
                </div>
              </a>
              <a 
                href="#resume-builder" 
                className="group rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.resumeBuilder[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.createProfessionalResume[language]}
                </div>
              </a>
              <a 
                href="#technical-trainings" 
                className="group rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.technicalTrainings[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.developYourSkills[language]}
                </div>
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Regular Menu Items */}
        <NavigationMenuItem>
          <a href="#about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-3 py-2">
            {translations.aboutUs[language]}
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="#blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-3 py-2">
            {translations.blog[language]}
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="#contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-3 py-2">
            {translations.contact[language]}
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
