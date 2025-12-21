import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, ChevronDown, UserPlus, LogIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
    <div className="hidden md:flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="group relative overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 transition-all duration-300"
          >
            <span className="flex items-center gap-2 font-medium">
              <LogIn className="h-4 w-4 text-primary" />
              Get Started
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-data-[state=open]:rotate-180 duration-200" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-64 p-2 bg-background border border-border shadow-xl rounded-xl animate-in fade-in-0 zoom-in-95"
        >
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
            Sign In As
          </DropdownMenuLabel>
          <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-secondary/80">
            <Link to="/candidate-login" className="flex items-center gap-3 px-3 py-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-md">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">Candidate</span>
                <span className="text-xs text-muted-foreground">Find your dream job</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-secondary/80">
            <Link to="/employer-login" className="flex items-center gap-3 px-3 py-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-md">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">Employer</span>
                <span className="text-xs text-muted-foreground">Hire top talent</span>
              </div>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="my-2" />
          
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
            New Here?
          </DropdownMenuLabel>
          <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-transparent">
            <Link 
              to="/candidate-login" 
              className="flex items-center justify-center gap-2 w-full py-3 mx-1 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <UserPlus className="h-4 w-4" />
              Register Now
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthButtons;
