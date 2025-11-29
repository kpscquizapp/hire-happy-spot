
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const { translations } = useLanguage();
  const { user } = useAuth();

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className={isMobile ? "mt-6 flex flex-col space-y-4" : "hidden md:flex items-center space-x-4"}>
      <div className={isMobile ? "flex flex-col space-y-2" : "flex items-center space-x-4"}>
        <Link 
          to="/candidate-login" 
          className="text-neutral-900 hover:text-teal-600 transition-colors duration-300 font-medium py-2"
        >
          Candidate Sign In
        </Link>
        <Link 
          to="/employer-login" 
          className="text-neutral-900 hover:text-teal-600 transition-colors duration-300 font-medium py-2"
        >
          Employer Sign In
        </Link>
      </div>
      <Link 
        to="/candidate-login" 
        className={`button-primary ${isMobile ? "text-center" : "text-sm py-2"}`}
      >
        Register
        <ChevronRight className={`${isMobile ? "inline" : "ml-1"} h-4 w-4`} />
      </Link>
    </div>
  );
};

export default AuthButtons;
