
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import StepsIndicator from './career/StepsIndicator';
import ExperienceStep from './career/ExperienceStep';
import SkillsStep from './career/SkillsStep';
import CareerPathsResult from './career/CareerPathsResult';
import { CareerPath, Course } from '@/types/job';

// This would typically come from an API
const generateCareerPaths = (experience: 'experienced' | 'fresher', selectedSkills: string[]): CareerPath[] => {
  // Basic logic to generate some career paths based on skills
  let careerPaths: CareerPath[] = [];
  
  if (selectedSkills.includes('Python')) {
    const pythonPath: CareerPath = {
      id: 1,
      title: experience === 'fresher' ? 'Junior Python Developer' : 'Senior Python Developer',
      description: 'Develop applications using Python programming language and frameworks.',
      requiredSkills: ['Python', 'Git', 'SQL'],
      demandLevel: 'high',
      salaryRange: experience === 'fresher' ? '$60,000 - $80,000' : '$110,000 - $150,000',
      growthPotential: 'high',
      recommendedCourses: [
        {
          id: 101,
          title: 'Python for Everybody',
          provider: 'Coursera',
          duration: '8 weeks',
          cost: '$49',
          level: 'beginner',
          description: 'Learn basics of Python programming language and get started with data analysis.',
          url: 'https://coursera.org'
        },
        {
          id: 102,
          title: 'Advanced Python Programming',
          provider: 'Udemy',
          duration: '10 weeks',
          cost: '$89',
          level: 'intermediate',
          description: 'Take your Python skills to the next level with advanced concepts and practical projects.',
          url: 'https://udemy.com'
        },
        {
          id: 103,
          title: 'Python for Data Science',
          provider: 'edX',
          duration: '12 weeks',
          cost: '$199',
          level: 'advanced',
          description: 'Master data science with Python, including NumPy, Pandas, and visualization tools.',
          url: 'https://edx.org'
        }
      ]
    };
    careerPaths.push(pythonPath);
    
    if (selectedSkills.includes('Flask') || selectedSkills.includes('Django')) {
      careerPaths.push({
        id: 2,
        title: experience === 'fresher' ? 'Junior Backend Developer' : 'Senior Backend Developer',
        description: 'Build server-side applications and APIs using Python frameworks.',
        requiredSkills: ['Python', 'Django', 'Flask', 'RESTful APIs', 'Git'],
        demandLevel: 'high',
        salaryRange: experience === 'fresher' ? '$65,000 - $85,000' : '$120,000 - $160,000',
        growthPotential: 'high',
        recommendedCourses: [
          {
            id: 201,
            title: 'Django Web Development',
            provider: 'Udemy',
            duration: '8 weeks',
            cost: '$59',
            level: 'beginner',
            description: 'Build full-featured web applications with Django framework.',
            url: 'https://udemy.com'
          },
          {
            id: 202,
            title: 'Flask Web Development',
            provider: 'Coursera',
            duration: '6 weeks',
            cost: '$49',
            level: 'beginner',
            description: 'Create web applications using Flask micro-framework.',
            url: 'https://coursera.org'
          },
          {
            id: 203,
            title: 'APIs with FastAPI and Python',
            provider: 'edX',
            duration: '5 weeks',
            cost: '$149',
            level: 'intermediate',
            description: 'Learn to build high-performance APIs with FastAPI.',
            url: 'https://edx.org'
          }
        ]
      });
    }
  }
  
  if (selectedSkills.includes('JavaScript') || selectedSkills.includes('TypeScript')) {
    careerPaths.push({
      id: 3,
      title: experience === 'fresher' ? 'Junior Frontend Developer' : 'Senior Frontend Developer',
      description: 'Create responsive and interactive user interfaces for web applications.',
      requiredSkills: ['JavaScript', 'HTML', 'CSS', 'React/Angular/Vue'],
      demandLevel: 'high',
      salaryRange: experience === 'fresher' ? '$55,000 - $75,000' : '$100,000 - $140,000',
      growthPotential: 'high',
      recommendedCourses: [
        {
          id: 301,
          title: 'Modern JavaScript',
          provider: 'Udemy',
          duration: '8 weeks',
          cost: '$59',
          level: 'beginner',
          description: 'Master modern JavaScript from basics to advanced concepts.',
          url: 'https://udemy.com'
        },
        {
          id: 302,
          title: 'Complete React Developer',
          provider: 'Coursera',
          duration: '12 weeks',
          cost: '$79',
          level: 'intermediate',
          description: 'Build complex, responsive and modern applications with React.',
          url: 'https://coursera.org'
        },
        {
          id: 303,
          title: 'Full Stack JavaScript Development',
          provider: 'edX',
          duration: '16 weeks',
          cost: '$299',
          level: 'advanced',
          description: 'Become a full stack developer with JavaScript, Node.js, and modern frameworks.',
          url: 'https://edx.org'
        }
      ]
    });
  }
  
  if (selectedSkills.includes('Data Analysis') || selectedSkills.includes('SQL') || 
      (selectedSkills.includes('Python') && selectedSkills.includes('R'))) {
    careerPaths.push({
      id: 4,
      title: experience === 'fresher' ? 'Junior Data Analyst' : 'Senior Data Analyst',
      description: 'Analyze and interpret complex data to help businesses make better decisions.',
      requiredSkills: ['SQL', 'Data Analysis', 'Excel', 'Python/R'],
      demandLevel: 'high',
      salaryRange: experience === 'fresher' ? '$60,000 - $80,000' : '$110,000 - $150,000',
      growthPotential: 'high',
      recommendedCourses: [
        {
          id: 401,
          title: 'Data Analysis with Python',
          provider: 'Coursera',
          duration: '10 weeks',
          cost: '$49',
          level: 'beginner',
          description: 'Learn to analyze data using Python libraries like Pandas and NumPy.',
          url: 'https://coursera.org'
        },
        {
          id: 402,
          title: 'SQL for Data Analysis',
          provider: 'Udemy',
          duration: '6 weeks',
          cost: '$59',
          level: 'beginner',
          description: 'Master SQL queries for data extraction and analysis.',
          url: 'https://udemy.com'
        },
        {
          id: 403,
          title: 'Advanced Data Visualization',
          provider: 'edX',
          duration: '8 weeks',
          cost: '$199',
          level: 'intermediate',
          description: 'Create compelling data visualizations with tools like Tableau and D3.js.',
          url: 'https://edx.org'
        }
      ]
    });
  }
  
  // If no specific paths were generated, add a generic one
  if (careerPaths.length === 0) {
    careerPaths.push({
      id: 99,
      title: experience === 'fresher' ? 'Junior Software Developer' : 'Senior Software Developer',
      description: 'Develop software applications using various programming languages and frameworks.',
      requiredSkills: selectedSkills.length > 0 ? selectedSkills : ['Programming Fundamentals'],
      demandLevel: 'medium',
      salaryRange: experience === 'fresher' ? '$50,000 - $70,000' : '$90,000 - $130,000',
      growthPotential: 'medium',
      recommendedCourses: [
        {
          id: 901,
          title: 'Programming Fundamentals',
          provider: 'Coursera',
          duration: '8 weeks',
          cost: '$49',
          level: 'beginner',
          description: 'Learn the basics of programming and software development concepts.',
          url: 'https://coursera.org'
        },
        {
          id: 902,
          title: 'Software Engineering Practices',
          provider: 'Udemy',
          duration: '10 weeks',
          cost: '$79',
          level: 'intermediate',
          description: 'Master essential practices for building reliable and maintainable software.',
          url: 'https://udemy.com'
        }
      ]
    });
  }
  
  return careerPaths;
};

const CareerPathVisualization = () => {
  const { language, translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [experience, setExperience] = useState<'experienced' | 'fresher'>('fresher');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  
  const steps = [
    { id: 1, label: translations.experience[language] },
    { id: 2, label: translations.skills[language] },
    { id: 3, label: translations.careerGoals[language] }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    
    // When moving to the final step, generate career paths
    if (currentStep === 1) {
      const paths = generateCareerPaths(experience, selectedSkills);
      setCareerPaths(paths);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          {translations.careerPathVisualization[language]}
        </h1>
        
        <StepsIndicator currentStep={currentStep} steps={steps} />
        
        <div className="mt-12">
          {currentStep === 0 && (
            <ExperienceStep 
              experience={experience} 
              setExperience={setExperience}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 1 && (
            <SkillsStep 
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 2 && (
            <CareerPathsResult 
              careerPaths={careerPaths}
              onBack={handleBack}
              experience={experience}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathVisualization;
