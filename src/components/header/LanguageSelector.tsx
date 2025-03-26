
import React from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface LanguageSelectorProps {
  isMobile?: boolean;
}

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = (lang: 'pl' | 'en') => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "flex items-center text-neutral-600 hover:text-teal-600 transition-colors duration-300",
        isMobile && "mr-3"
      )}>
        <Globe className="h-5 w-5" />
        {!isMobile && <span className="ml-1">{language === 'pl' ? 'PL' : 'EN'}</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white z-50">
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
  );
};

export default LanguageSelector;
