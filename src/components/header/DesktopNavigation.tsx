
import React from 'react';
import { Link } from 'react-router-dom';
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
      <NavigationMenuList className="space-x-4">
        {/* Jobs Dropdown */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
            {translations.jobs[language]}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 rounded-md shadow-lg w-96 bg-white">
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/jobs-by-location" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByLocation[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.findOpportunitiesInArea[language]}
                </div>
              </Link>
              <Link 
                to="/jobs-by-category" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByCategory[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.browseBySpecialization[language]}
                </div>
              </Link>
              <Link 
                to="/jobs-by-experience" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByExperience[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.fromEntryToExpert[language]}
                </div>
              </Link>
              <Link 
                to="/jobs-by-industry" 
                className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.jobsByIndustry[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.opportunitiesAcrossSectors[language]}
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Services Dropdown */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
            {translations.services[language]}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 rounded-md shadow-lg w-80 bg-white">
            <div className="flex flex-col space-y-1">
              <Link 
                to="/career-path" 
                className="group rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.careerPathVisualization[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.planCareerTrajectory[language]}
                </div>
              </Link>
              <Link 
                to="/resume-builder" 
                className="group rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.resumeBuilder[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.createProfessionalResume[language]}
                </div>
              </Link>
              <Link 
                to="/technical-trainings" 
                className="group rounded-md p-3 hover:bg-neutral-50"
              >
                <div className="text-sm font-medium text-neutral-900">
                  {translations.technicalTrainings[language]}
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-teal-600">
                  {translations.developYourSkills[language]}
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Regular Menu Items */}
        <NavigationMenuItem>
          <Link to="/about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.aboutUs[language]}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.blog[language]}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.contact[language]}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
