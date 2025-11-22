
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const { translations } = useLanguage();

  return (
    <div className={isMobile ? "mt-6 flex flex-col space-y-4" : "hidden md:flex items-center space-x-4"}>
      <Link 
        to="/employer" 
        className="text-neutral-900 hover:text-teal-600 transition-colors duration-300 font-medium py-2"
      >
        {translations.employerLogin}
      </Link>
      <Link 
        to="/register" 
        className={`button-primary ${isMobile ? "text-center" : "text-sm py-2"}`}
      >
        {translations.register} 
        <ChevronRight className={`${isMobile ? "inline" : "ml-1"} h-4 w-4`} />
      </Link>
    </div>
  );
};

export default AuthButtons;
