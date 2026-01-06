import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface DesktopNavigationProps {
  isDark?: boolean;
}

const DesktopNavigation = ({ isDark = false }: DesktopNavigationProps) => {
  const { translations } = useLanguage();
  const { user } = useAuth();

  const isCandidate = user?.role === 'candidate';
  const isEmployer = user?.role === 'employer';

  const navItems = [
    { label: translations.candidates, href: '/jobs' },
    { label: translations.talentMarketplace, href: '/marketplace' },
    { label: translations.employers, href: '/employer' },
    { label: translations.services, href: '/services' },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "font-medium text-sm transition-colors",
            isDark 
              ? "text-gray-300 hover:text-white" 
              : "text-foreground hover:text-primary"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
