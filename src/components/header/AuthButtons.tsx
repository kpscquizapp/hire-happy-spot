import React from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthButtonsProps {
  isMobile?: boolean;
  isDark?: boolean;
}

const AuthButtons = ({ isMobile = false, isDark = false }: AuthButtonsProps) => {
  const { user } = useAuth();

  if (user) {
    return <UserMenu />;
  }

  if (isMobile) {
    return (
      <div className="mt-6 flex flex-col space-y-3">
        <Link 
          to="/register-talent" 
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors font-medium"
        >
          <Upload className="h-4 w-4" />
          Upload CV
        </Link>
        <Link 
          to="/candidate-login" 
          className="flex items-center justify-center px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors font-medium"
        >
          Login
        </Link>
        <Link 
          to="/post-job" 
          className="flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Post a Job
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Upload CV Button */}
      <Button 
        variant="outline"
        className={cn(
          "rounded-lg font-medium text-sm px-5",
          isDark 
            ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white" 
            : "border-primary text-primary hover:bg-primary/5"
        )}
        asChild
      >
        <Link to="/register-talent">
          Upload CV
        </Link>
      </Button>

      {/* Login Link */}
      <Link 
        to="/candidate-login"
        className={cn(
          "font-medium text-sm transition-colors px-3",
          isDark 
            ? "text-white hover:text-gray-300" 
            : "text-foreground hover:text-primary"
        )}
      >
        Login
      </Link>

      {/* Post a Job Button */}
      <Button 
        className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-5"
        asChild
      >
        <Link to="/post-job">
          Post a Job
        </Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
