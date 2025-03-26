
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle = ({ isOpen, onToggle }: MobileMenuToggleProps) => {
  return (
    <button 
      className="flex items-center text-neutral-900" 
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <div className="space-y-1.5">
        <span className={cn(
          "block h-0.5 w-6 bg-current transition-all duration-300",
          isOpen && "translate-y-2 rotate-45"
        )}></span>
        <span className={cn(
          "block h-0.5 w-6 bg-current transition-all duration-300",
          isOpen && "opacity-0"
        )}></span>
        <span className={cn(
          "block h-0.5 w-6 bg-current transition-all duration-300",
          isOpen && "-translate-y-2 -rotate-45"
        )}></span>
      </div>
    </button>
  );
};

export default MobileMenuToggle;
