
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: {
    [key: string]: {
      pl: string;
      en: string;
    };
  };
}

const translations = {
  // Header
  jobs: {
    pl: 'Oferty',
    en: 'Jobs',
  },
  services: {
    pl: 'Usługi',
    en: 'Services',
  },
  aboutUs: {
    pl: 'O nas',
    en: 'About Us',
  },
  blog: {
    pl: 'Blog',
    en: 'Blog',
  },
  contact: {
    pl: 'Kontakt',
    en: 'Contact',
  },
  employerLogin: {
    pl: 'Logowanie pracodawcy',
    en: 'Employer Login',
  },
  register: {
    pl: 'Rejestracja',
    en: 'Register',
  },
  
  // Hero
  findDreamJob: {
    pl: 'Znajdź wymarzoną pracę',
    en: 'Find your dream job',
  },
  discoverOpportunities: {
    pl: 'Odkryj oferty dopasowane do Twoich umiejętności i aspiracji',
    en: 'Discover opportunities matching your skills and aspirations',
  },
  searchJobs: {
    pl: 'Szukaj ofert',
    en: 'Search jobs',
  },
  positionSkillsCompany: {
    pl: 'Stanowisko, umiejętności lub firma',
    en: 'Position, skills or company',
  },
  location: {
    pl: 'Lokalizacja',
    en: 'Location',
  },
  experienceLevel: {
    pl: 'Poziom doświadczenia',
    en: 'Experience level',
  },
  entry: {
    pl: 'Początkujący',
    en: 'Entry',
  },
  mid: {
    pl: 'Średniozaawansowany',
    en: 'Mid-level',
  },
  senior: {
    pl: 'Zaawansowany',
    en: 'Senior',
  },
  executive: {
    pl: 'Kierowniczy',
    en: 'Executive',
  },
  popular: {
    pl: 'Popularne: Programista, Project Manager, Marketing, Sprzedaż',
    en: 'Popular: Developer, Project Manager, Marketing, Sales',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pl');

  const value = {
    language,
    setLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
