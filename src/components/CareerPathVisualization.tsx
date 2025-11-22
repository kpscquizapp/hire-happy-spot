
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
  
  // Python-related paths
  if (selectedSkills.includes('Python') || selectedSkills.includes('Django') || selectedSkills.includes('Flask')) {
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
          title: 'Python for Everybody Specialization',
          provider: 'University of Michigan on Coursera',
          duration: '8 weeks',
          cost: '$49/month',
          level: 'beginner',
          description: 'Learn basics of Python programming language with practical exercises and real-world applications.',
          url: 'https://coursera.org/python-for-everybody'
        },
        {
          id: 102,
          title: 'Advanced Python Programming',
          provider: 'Udemy - Jose Portilla',
          duration: '10 weeks',
          cost: '$89.99',
          level: 'intermediate',
          description: 'Take your Python skills to the next level with advanced concepts and practical projects.',
          url: 'https://udemy.com/advanced-python'
        },
        {
          id: 103,
          title: 'Python for Data Science and Machine Learning',
          provider: 'edX - IBM',
          duration: '12 weeks',
          cost: '$199',
          level: 'advanced',
          description: 'Master data science with Python, including NumPy, Pandas, and visualization tools.',
          url: 'https://edx.org/python-data-science'
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
            title: 'Django Web Development Masterclass',
            provider: 'Udemy - Mosh Hamedani',
            duration: '8 weeks',
            cost: '$59.99',
            level: 'beginner',
            description: 'Build full-featured web applications with Django framework.',
            url: 'https://udemy.com/django-masterclass'
          },
          {
            id: 202,
            title: 'Flask Web Development',
            provider: 'Coursera - University of Michigan',
            duration: '6 weeks',
            cost: '$49/month',
            level: 'beginner',
            description: 'Create web applications using Flask micro-framework.',
            url: 'https://coursera.org/flask-web-dev'
          },
          {
            id: 203,
            title: 'FastAPI: Modern Python Web APIs',
            provider: 'edX - Microsoft',
            duration: '5 weeks',
            cost: '$149',
            level: 'intermediate',
            description: 'Learn to build high-performance APIs with FastAPI.',
            url: 'https://edx.org/fastapi'
          }
        ]
      });
    }
  }
  
  // JavaScript/TypeScript paths
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
          title: 'Modern JavaScript From The Beginning',
          provider: 'Udemy - Brad Traversy',
          duration: '8 weeks',
          cost: '$59.99',
          level: 'beginner',
          description: 'Master modern JavaScript from basics to advanced concepts.',
          url: 'https://udemy.com/modern-javascript'
        },
        {
          id: 302,
          title: 'Complete React Developer in 2025',
          provider: 'Coursera - Meta (Facebook)',
          duration: '12 weeks',
          cost: '$79/month',
          level: 'intermediate',
          description: 'Build complex, responsive and modern applications with React.',
          url: 'https://coursera.org/react-developer'
        },
        {
          id: 303,
          title: 'Full Stack JavaScript Development',
          provider: 'edX - The Hong Kong University',
          duration: '16 weeks',
          cost: '$299',
          level: 'advanced',
          description: 'Become a full stack developer with JavaScript, Node.js, and modern frameworks.',
          url: 'https://edx.org/fullstack-js'
        }
      ]
    });
    
    if (selectedSkills.includes('React') || selectedSkills.includes('Next.js')) {
      careerPaths.push({
        id: 4,
        title: experience === 'fresher' ? 'Junior React Developer' : 'Senior React Developer',
        description: 'Build modern web applications using React and related technologies.',
        requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS'],
        demandLevel: 'high',
        salaryRange: experience === 'fresher' ? '$60,000 - $85,000' : '$110,000 - $150,000',
        growthPotential: 'high',
        recommendedCourses: [
          {
            id: 401,
            title: 'React - The Complete Guide',
            provider: 'Udemy - Academind by Maximilian',
            duration: '10 weeks',
            cost: '$89.99',
            level: 'beginner',
            description: 'Master React with hooks, routing, state management, and more.',
            url: 'https://udemy.com/react-complete-guide'
          },
          {
            id: 402,
            title: 'Advanced React and Redux',
            provider: 'Coursera - University of Helsinki',
            duration: '8 weeks',
            cost: '$49/month',
            level: 'intermediate',
            description: 'Learn advanced patterns for React applications with Redux.',
            url: 'https://coursera.org/advanced-react'
          },
          {
            id: 403,
            title: 'Next.js & React - The Complete Guide',
            provider: 'Udemy - Academind by Maximilian',
            duration: '8 weeks',
            cost: '$89.99',
            level: 'intermediate',
            description: 'Build SEO-friendly React applications with Next.js framework.',
            url: 'https://udemy.com/nextjs-react'
          }
        ]
      });
    }
  }
  
  // Data Analysis paths
  if (selectedSkills.includes('Data Analysis') || selectedSkills.includes('SQL') || 
      (selectedSkills.includes('Python') && (selectedSkills.includes('R') || selectedSkills.includes('Pandas')))) {
    careerPaths.push({
      id: 5,
      title: experience === 'fresher' ? 'Junior Data Analyst' : 'Senior Data Analyst',
      description: 'Analyze and interpret complex data to help businesses make better decisions.',
      requiredSkills: ['SQL', 'Data Analysis', 'Excel', 'Python/R'],
      demandLevel: 'high',
      salaryRange: experience === 'fresher' ? '$60,000 - $80,000' : '$110,000 - $150,000',
      growthPotential: 'high',
      recommendedCourses: [
        {
          id: 501,
          title: 'Data Analysis with Python',
          provider: 'Coursera - IBM',
          duration: '10 weeks',
          cost: '$49/month',
          level: 'beginner',
          description: 'Learn to analyze data using Python libraries like Pandas and NumPy.',
          url: 'https://coursera.org/data-analysis-python'
        },
        {
          id: 502,
          title: 'Advanced SQL for Data Science',
          provider: 'Udemy - 365 Careers',
          duration: '6 weeks',
          cost: '$59.99',
          level: 'beginner',
          description: 'Master SQL queries for data extraction and analysis.',
          url: 'https://udemy.com/sql-data-science'
        },
        {
          id: 503,
          title: 'Data Visualization with Tableau',
          provider: 'edX - University of California, Davis',
          duration: '8 weeks',
          cost: '$199',
          level: 'intermediate',
          description: 'Create compelling data visualizations with Tableau.',
          url: 'https://edx.org/tableau-visualization'
        }
      ]
    });
  }
  
  // Data Science and Machine Learning paths
  if (selectedSkills.includes('Machine Learning') || selectedSkills.includes('Data Science') ||
      selectedSkills.includes('TensorFlow') || selectedSkills.includes('PyTorch')) {
    careerPaths.push({
      id: 6,
      title: experience === 'fresher' ? 'Junior Data Scientist' : 'Senior Data Scientist',
      description: 'Apply machine learning algorithms to analyze data and make predictions.',
      requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      demandLevel: 'high',
      salaryRange: experience === 'fresher' ? '$75,000 - $95,000' : '$120,000 - $180,000',
      growthPotential: 'high',
      recommendedCourses: [
        {
          id: 601,
          title: 'Machine Learning Specialization',
          provider: 'Coursera - Stanford University & Andrew Ng',
          duration: '16 weeks',
          cost: '$49/month',
          level: 'intermediate',
          description: 'Learn practical machine learning techniques with Python.',
          url: 'https://coursera.org/machine-learning'
        },
        {
          id: 602,
          title: 'Deep Learning Specialization',
          provider: 'Coursera - DeepLearning.AI',
          duration: '12 weeks',
          cost: '$49/month',
          level: 'advanced',
          description: 'Master deep learning techniques and neural networks.',
          url: 'https://coursera.org/deep-learning'
        },
        {
          id: 603,
          title: 'Practical Data Science on AWS',
          provider: 'edX - Amazon Web Services',
          duration: '10 weeks',
          cost: '$249',
          level: 'intermediate',
          description: 'Build and deploy machine learning models on AWS.',
          url: 'https://edx.org/aws-data-science'
        }
      ]
    });
  }

  // DevOps paths
  if (selectedSkills.includes('Docker') || selectedSkills.includes('Kubernetes') || 
      selectedSkills.includes('AWS') || selectedSkills.includes('CI/CD')) {
    careerPaths.push({
      id: 7,
      title: experience === 'fresher' ? 'Junior DevOps Engineer' : 'Senior DevOps Engineer',
      description: 'Build, test, and maintain the infrastructure and tools for software development.',
      requiredSkills: ['Linux', 'Containerization', 'Cloud Platforms', 'CI/CD'],
      demandLevel: 'high',
      salaryRange: experience === 'fresher' ? '$70,000 - $90,000' : '$120,000 - $160,000',
      growthPotential: 'high',
      recommendedCourses: [
        {
          id: 701,
          title: 'Docker & Kubernetes: The Complete Guide',
          provider: 'Udemy - Stephen Grider',
          duration: '12 weeks',
          cost: '$94.99',
          level: 'intermediate',
          description: 'Master container deployment with Docker and Kubernetes.',
          url: 'https://udemy.com/docker-kubernetes'
        },
        {
          id: 702,
          title: 'AWS Certified DevOps Engineer',
          provider: 'Coursera - Amazon Web Services',
          duration: '16 weeks',
          cost: '$49/month',
          level: 'advanced',
          description: 'Learn DevOps practices on AWS and prepare for certification.',
          url: 'https://coursera.org/aws-devops'
        },
        {
          id: 703,
          title: 'GitLab CI: Pipelines, CI/CD and DevOps',
          provider: 'Udemy - Valentin Despa',
          duration: '8 weeks',
          cost: '$59.99',
          level: 'intermediate',
          description: 'Learn continuous integration and delivery with GitLab CI.',
          url: 'https://udemy.com/gitlab-ci'
        }
      ]
    });
  }
  
  // Mobile Development paths
  if (selectedSkills.includes('Android Development') || selectedSkills.includes('iOS Development') ||
      selectedSkills.includes('React Native') || selectedSkills.includes('Flutter')) {
    careerPaths.push({
      id: 8,
      title: experience === 'fresher' ? 'Junior Mobile Developer' : 'Senior Mobile Developer',
      description: 'Create applications for mobile devices on iOS and Android platforms.',
      requiredSkills: ['Mobile Development', 'UI/UX Design', 'API Integration'],
      demandLevel: 'high',
      salaryRange: experience === 'fresher' ? '$65,000 - $85,000' : '$110,000 - $150,000',
      growthPotential: 'high',
      recommendedCourses: [
        {
          id: 801,
          title: 'The Complete Flutter Development Bootcamp',
          provider: 'Udemy - Dr. Angela Yu',
          duration: '10 weeks',
          cost: '$89.99',
          level: 'beginner',
          description: 'Learn to build beautiful, native apps for iOS and Android with Flutter.',
          url: 'https://udemy.com/flutter-bootcamp'
        },
        {
          id: 802,
          title: 'iOS & Swift - The Complete iOS App Development Bootcamp',
          provider: 'Udemy - Dr. Angela Yu',
          duration: '14 weeks',
          cost: '$94.99',
          level: 'beginner',
          description: 'Learn iOS app development with Swift from beginner to professional.',
          url: 'https://udemy.com/ios-swift-bootcamp'
        },
        {
          id: 803,
          title: 'React Native - The Practical Guide',
          provider: 'Udemy - Academind by Maximilian',
          duration: '12 weeks',
          cost: '$89.99',
          level: 'intermediate',
          description: 'Build native mobile apps with JavaScript and React.',
          url: 'https://udemy.com/react-native-practical'
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
          title: 'The Complete Web Developer in 2025',
          provider: 'Udemy - Zero To Mastery Academy',
          duration: '12 weeks',
          cost: '$89.99',
          level: 'beginner',
          description: 'Learn the fundamentals of web development and programming.',
          url: 'https://udemy.com/web-developer-2025'
        },
        {
          id: 902,
          title: 'Software Engineering Essentials',
          provider: 'edX - MIT',
          duration: '10 weeks',
          cost: '$199',
          level: 'intermediate',
          description: 'Master essential practices for building reliable and maintainable software.',
          url: 'https://edx.org/software-engineering'
        },
        {
          id: 903,
          title: 'Computer Science 101',
          provider: 'Coursera - Stanford University',
          duration: '8 weeks',
          cost: '$49/month',
          level: 'beginner',
          description: 'Learn the fundamentals of computer science and programming.',
          url: 'https://coursera.org/cs101'
        }
      ]
    });
  }
  
  return careerPaths;
};

const CareerPathVisualization = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [experience, setExperience] = useState<'experienced' | 'fresher'>('fresher');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  
  const steps = [
    { id: 1, label: translations.experience },
    { id: 2, label: translations.skills },
    { id: 3, label: translations.careerGoals }
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
          {translations.careerPathVisualization}
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
