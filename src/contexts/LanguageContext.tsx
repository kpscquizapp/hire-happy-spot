
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
  },
  
  // Dropdown Menus
  jobsByLocation: {
    pl: 'Praca wg lokalizacji',
    en: 'Jobs by Location',
  },
  jobsByCategory: {
    pl: 'Praca wg kategorii',
    en: 'Jobs by Category',
  },
  jobsByExperience: {
    pl: 'Praca wg doświadczenia',
    en: 'Jobs by Experience',
  },
  jobsByIndustry: {
    pl: 'Praca wg branży',
    en: 'Jobs by Industry',
  },
  careerPathVisualization: {
    pl: 'Wizualizacja ścieżki kariery',
    en: 'Career Path Visualization',
  },
  resumeBuilder: {
    pl: 'Kreator CV',
    en: 'Resume Builder',
  },
  technicalTrainings: {
    pl: 'Szkolenia techniczne',
    en: 'Technical Trainings',
  },
  findOpportunitiesInArea: {
    pl: 'Znajdź oferty w Twojej okolicy',
    en: 'Find opportunities in your area',
  },
  browseBySpecialization: {
    pl: 'Przeglądaj oferty według specjalizacji',
    en: 'Browse listings by specialization',
  },
  fromEntryToExpert: {
    pl: 'Od początkujących po ekspertów',
    en: 'From entry-level to expert roles',
  },
  opportunitiesAcrossSectors: {
    pl: 'Oferty w różnych sektorach',
    en: 'Opportunities across sectors',
  },
  planCareerTrajectory: {
    pl: 'Planuj swoją karierę',
    en: 'Plan your career trajectory',
  },
  createProfessionalResume: {
    pl: 'Stwórz profesjonalne CV',
    en: 'Create a professional resume',
  },
  developYourSkills: {
    pl: 'Rozwijaj swoje umiejętności',
    en: 'Develop your skills',
  },
  
  // Featured Jobs
  latestJobs: {
    pl: 'Najnowsze oferty',
    en: 'Latest jobs',
  },
  featuredJobs: {
    pl: 'Wyróżnione oferty pracy',
    en: 'Featured job offers',
  },
  discoverBestJobs: {
    pl: 'Odkryj najlepsze oferty pracy od wiodących firm w Polsce. Aplikuj już teraz, aby zrobić kolejny krok w swojej karierze.',
    en: 'Discover the best job opportunities from leading companies in Poland. Apply now to take the next step in your career.',
  },
  featured: {
    pl: 'Wyróżnione',
    en: 'Featured',
  },
  apply: {
    pl: 'Aplikuj',
    en: 'Apply',
  },
  aboutCompany: {
    pl: 'O firmie',
    en: 'About',
  },
  browseAllJobs: {
    pl: 'Przeglądaj wszystkie oferty',
    en: 'Browse all jobs',
  },
  previousPage: {
    pl: 'Poprzednia strona',
    en: 'Previous page',
  },
  nextPage: {
    pl: 'Następna strona',
    en: 'Next page',
  },
  
  // Career Path Visualization
  experience: {
    pl: 'Doświadczenie',
    en: 'Experience',
  },
  skills: {
    pl: 'Umiejętności',
    en: 'Skills',
  },
  careerGoals: {
    pl: 'Cele zawodowe',
    en: 'Career Goals',
  },
  areYouExperienced: {
    pl: 'Czy jesteś doświadczonym specjalistą IT?',
    en: 'Are you an experienced IT professional?',
  },
  yes: {
    pl: 'Tak',
    en: 'Yes',
  },
  no: {
    pl: 'Nie',
    en: 'No',
  },
  haveExperience: {
    pl: 'Mam doświadczenie zawodowe w IT',
    en: 'I have professional experience in IT',
  },
  newToField: {
    pl: 'Jestem nowy w branży IT',
    en: "I'm new to the IT field",
  },
  nextStep: {
    pl: 'Następny krok',
    en: 'Next Step',
  },
  selectYourSkills: {
    pl: 'Wybierz swoje umiejętności',
    en: 'Select your skills',
  },
  back: {
    pl: 'Wstecz',
    en: 'Back',
  },
  viewCareerPaths: {
    pl: 'Zobacz ścieżki kariery',
    en: 'View Career Paths',
  },
  recommendedCareerPaths: {
    pl: 'Rekomendowane ścieżki kariery',
    en: 'Recommended Career Paths',
  },
  availablePaths: {
    pl: 'Dostępne ścieżki',
    en: 'Available Paths',
  },
  high: {
    pl: 'Wysoki',
    en: 'High',
  },
  medium: {
    pl: 'Średni',
    en: 'Medium',
  },
  low: {
    pl: 'Niski',
    en: 'Low',
  },
  requiredSkills: {
    pl: 'Wymagane umiejętności',
    en: 'Required Skills',
  },
  salaryRange: {
    pl: 'Przedział wynagrodzeń',
    en: 'Salary Range',
  },
  demandLevel: {
    pl: 'Poziom zapotrzebowania',
    en: 'Demand Level',
  },
  recommendedCourses: {
    pl: 'Rekomendowane kursy',
    en: 'Recommended Courses',
  },
  all: {
    pl: 'Wszystkie',
    en: 'All',
  },
  beginner: {
    pl: 'Początkujący',
    en: 'Beginner',
  },
  intermediate: {
    pl: 'Średniozaawansowany',
    en: 'Intermediate',
  },
  advanced: {
    pl: 'Zaawansowany',
    en: 'Advanced',
  },
  providedBy: {
    pl: 'Dostarczany przez',
    en: 'Provided by',
  },
  duration: {
    pl: 'Czas trwania',
    en: 'Duration',
  },
  cost: {
    pl: 'Koszt',
    en: 'Cost',
  },
  level: {
    pl: 'Poziom',
    en: 'Level',
  },
  goToCourse: {
    pl: 'Przejdź do kursu',
    en: 'Go to Course',
  },
  selectPath: {
    pl: 'Wybierz ścieżkę kariery po lewej stronie',
    en: 'Select a career path on the left',
  },
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
