
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

const DesktopNavigation = () => {
  const { translations } = useLanguage();

  return (
    <NavigationMenu className="hidden md:flex mr-auto ml-8">
      <NavigationMenuList className="space-x-4">
        {/* Career Path Link */}
        <NavigationMenuItem>
          <Link to="/career-path" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.careerPathVisualization}
          </Link>
        </NavigationMenuItem>
        
        {/* Talent Marketplace Link */}
        <NavigationMenuItem>
          <Link to="/marketplace" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.marketplace}
          </Link>
        </NavigationMenuItem>
        
        {/* Regular Menu Items */}
        <NavigationMenuItem>
          <Link to="/about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.aboutUs}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.blog}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 px-4 py-2">
            {translations.contact}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
