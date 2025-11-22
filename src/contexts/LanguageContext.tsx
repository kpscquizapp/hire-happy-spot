
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  translations: {
    [key: string]: string;
  };
}

const translations = {
  // Header
  jobs: 'Jobs',
  services: 'Services',
  aboutUs: 'About Us',
  blog: 'Blog',
  contact: 'Contact',
  employerLogin: 'Employer Login',
  register: 'Register',
  marketplace: 'Talent Marketplace',
  
  // Hero
  findDreamJob: 'Find your dream job',
  discoverOpportunities: 'Discover opportunities matching your skills and aspirations',
  searchJobs: 'Search jobs',
  positionSkillsCompany: 'Position, skills or company',
  location: 'Location',
  experienceLevel: 'Experience level',
  entry: 'Entry',
  mid: 'Mid-level',
  senior: 'Senior',
  executive: 'Executive',
  popular: 'Popular: Developer, Project Manager, Marketing, Sales',
  
  // Dropdown Menus
  jobsByLocation: 'Jobs by Location',
  jobsByCategory: 'Jobs by Category',
  jobsByExperience: 'Jobs by Experience',
  jobsByIndustry: 'Jobs by Industry',
  careerPathVisualization: 'Career Path',
  resumeBuilder: 'Resume Builder',
  technicalTrainings: 'Technical Trainings',
  findOpportunitiesInArea: 'Find opportunities in your area',
  browseBySpecialization: 'Browse listings by specialization',
  fromEntryToExpert: 'From entry-level to expert roles',
  opportunitiesAcrossSectors: 'Opportunities across sectors',
  planCareerTrajectory: 'Plan your career trajectory',
  createProfessionalResume: 'Create a professional resume',
  developYourSkills: 'Develop your skills',
  
  // Featured Jobs
  latestJobs: 'Latest jobs',
  featuredJobs: 'Featured job offers',
  discoverBestJobs: 'Discover the best job opportunities from leading companies. Apply now to take the next step in your career.',
  featured: 'Featured',
  apply: 'Apply',
  aboutCompany: 'About',
  browseAllJobs: 'Browse all jobs',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  
  // Career Path Visualization
  experience: 'Experience',
  skills: 'Skills',
  careerGoals: 'Career Goals',
  areYouExperienced: 'Are you an experienced IT professional?',
  yes: 'Yes',
  no: 'No',
  haveExperience: 'I have professional experience in IT',
  newToField: "I'm new to the IT field",
  nextStep: 'Next Step',
  selectYourSkills: 'Select your skills',
  back: 'Back',
  viewCareerPaths: 'View Career Paths',
  recommendedCareerPaths: 'Recommended Career Paths',
  availablePaths: 'Available Paths',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  requiredSkills: 'Required Skills',
  salaryRange: 'Salary Range',
  demandLevel: 'Demand Level',
  recommendedCourses: 'Recommended Courses',
  all: 'All',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  providedBy: 'Provided by',
  duration: 'Duration',
  cost: 'Cost',
  level: 'Level',
  goToCourse: 'Go to Course',
  selectPath: 'Select a career path on the left',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const value = {
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
