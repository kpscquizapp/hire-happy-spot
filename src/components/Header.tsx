
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Logo from './header/Logo';
import DesktopNavigation from './header/DesktopNavigation';
import LanguageSelector from './header/LanguageSelector';
import AuthButtons from './header/AuthButtons';
import MobileMenuToggle from './header/MobileMenuToggle';
import MobileMenu from './header/MobileMenu';

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b",
        isScrolled 
          ? "py-2 shadow-md border-border" 
          : "py-3 shadow-sm border-border/50"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation - Centered */}
          <DesktopNavigation />

          {/* Auth Buttons - Right side */}
          <div className="hidden md:flex items-center gap-3">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <MobileMenuToggle isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} />
    </header>
  );
};

export default Header;
