
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Globe } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = (lang: 'pl' | 'en') => {
    setLanguage(lang);
  };

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
              {translations.jobs[language]}
            </a>
            <a href="#services" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              {translations.services[language]}
            </a>
            <a href="#about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              {translations.aboutUs[language]}
            </a>
            <a href="#blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              {translations.blog[language]}
            </a>
            <a href="#contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300">
              {translations.contact[language]}
            </a>
          </nav>

          {/* Auth Buttons and Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-neutral-600 hover:text-teal-600 transition-colors duration-300">
                <Globe className="h-5 w-5 mr-1" />
                <span>{language === 'pl' ? 'PL' : 'EN'}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => toggleLanguage('pl')}
                  className={cn("cursor-pointer", language === 'pl' && "text-teal-600 font-medium")}
                >
                  Polski (PL)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => toggleLanguage('en')}
                  className={cn("cursor-pointer", language === 'en' && "text-teal-600 font-medium")}
                >
                  English (EN)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="/employer" className="text-neutral-900 hover:text-teal-600 transition-colors duration-300 font-medium">
              {translations.employerLogin[language]}
            </a>
            <a href="/register" className="button-primary text-sm py-2">
              {translations.register[language]} <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Toggle for Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-neutral-600 hover:text-teal-600 transition-colors duration-300 mr-3">
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => toggleLanguage('pl')}
                  className={cn("cursor-pointer", language === 'pl' && "text-teal-600 font-medium")}
                >
                  Polski (PL)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => toggleLanguage('en')}
                  className={cn("cursor-pointer", language === 'en' && "text-teal-600 font-medium")}
                >
                  English (EN)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              className="flex items-center text-neutral-900" 
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
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-100 transition-all duration-300 overflow-hidden shadow-lg",
        mobileMenuOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <a href="#jobs" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              {translations.jobs[language]}
            </a>
            <a href="#services" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              {translations.services[language]}
            </a>
            <a href="#about" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              {translations.aboutUs[language]}
            </a>
            <a href="#blog" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              {translations.blog[language]}
            </a>
            <a href="#contact" className="text-neutral-600 hover:text-teal-600 transition-colors duration-300 py-2">
              {translations.contact[language]}
            </a>
          </nav>
          <div className="mt-6 flex flex-col space-y-4">
            <a href="/employer" className="text-neutral-900 hover:text-teal-600 transition-colors duration-300 font-medium py-2">
              {translations.employerLogin[language]}
            </a>
            <a href="/register" className="button-primary text-center">
              {translations.register[language]} <ChevronRight className="ml-1 h-4 w-4 inline" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
