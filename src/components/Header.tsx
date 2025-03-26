
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-white/90 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src="/lovable-uploads/635c4f04-521e-4c70-9b0a-7796b57a77bd.png" 
                alt="Hirion Logo" 
                className="h-10 w-auto mr-3" 
              />
              <div className="flex flex-col">
                <div className="text-xl font-bold text-neutral-900">
                  <span className="text-teal-600">HIR</span>
                  <span>ION</span>
                </div>
                <span className="text-xs text-neutral-500 -mt-1">Hiring Champion</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#jobs" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              Jobs
            </a>
            <a href="#services" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              Services
            </a>
            <a href="#about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              About Us
            </a>
            <a href="#blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              Blog
            </a>
            <a href="#contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/employer" className="text-neutral-900 hover:text-teal-600 transition-colors duration-300 font-medium">
              Employer Login
            </a>
            <a href="/register" className="button-primary text-sm py-2">
              Register <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center text-neutral-900" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={cn(
                "block h-0.5 w-6 bg-current transition-all duration-300",
                mobileMenuOpen && "translate-y-2 rotate-45"
              )}></span>
              <span className={cn(
                "block h-0.5 w-6 bg-current transition-all duration-300",
                mobileMenuOpen && "opacity-0"
              )}></span>
              <span className={cn(
                "block h-0.5 w-6 bg-current transition-all duration-300",
                mobileMenuOpen && "-translate-y-2 -rotate-45"
              )}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-100 transition-all duration-300 overflow-hidden shadow-lg",
        mobileMenuOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <a href="#jobs" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              Jobs
            </a>
            <a href="#services" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              Services
            </a>
            <a href="#about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              About Us
            </a>
            <a href="#blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              Blog
            </a>
            <a href="#contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              Contact
            </a>
          </nav>
          <div className="mt-6 flex flex-col space-y-4">
            <a href="/employer" className="text-neutral-900 hover:text-teal-600 transition-colors duration-300 font-medium py-2">
              Employer Login
            </a>
            <a href="/register" className="button-primary text-center">
              Register <ChevronRight className="ml-1 h-4 w-4 inline" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
