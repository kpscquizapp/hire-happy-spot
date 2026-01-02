import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, UserPlus, Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const { translations } = useLanguage();
  const { user } = useAuth();

  if (user) {
    return <UserMenu />;
  }

  if (isMobile) {
    return (
      <div className="mt-6 flex flex-col space-y-3">
        <p className="text-sm font-medium text-muted-foreground px-2">Sign In</p>
        <Link 
          to="/candidate-login" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <User className="h-5 w-5 text-primary" />
          <span className="font-medium">Candidate Sign In</span>
        </Link>
        <Link 
          to="/employer-login" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <Briefcase className="h-5 w-5 text-primary" />
          <span className="font-medium">Employer Sign In</span>
        </Link>
        <div className="pt-2">
          <p className="text-sm font-medium text-muted-foreground px-2 mb-2">New Here?</p>
          <Link 
            to="/candidate-login" 
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="h-5 w-5" />
            Register Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Upload CV Link */}
      <Link 
        to="/register-talent" 
        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors hidden lg:flex items-center gap-1.5"
      >
        <Upload className="h-4 w-4" />
        Upload your CV
      </Link>

      {/* Login / Register Button */}
      <Button 
        variant="outline" 
        className="rounded-lg border-primary text-primary hover:bg-primary/5 font-medium text-sm px-5"
        asChild
      >
        <Link to="/candidate-login">
          Login / Register
        </Link>
      </Button>

      {/* Job Post Button */}
      <Button 
        className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-5"
        asChild
      >
        <Link to="/post-job">
          Job Post
        </Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
