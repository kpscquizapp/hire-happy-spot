
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Clock, MapPin, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

// Define a type for our job listings
type JobListing = {
  id: number;
  title: {
    pl: string;
    en: string;
  };
  company: string;
  description: {
    pl: string;
    en: string;
  };
  salary: string;
  location: string;
  type: {
    pl: string;
    en: string;
  };
  featured?: boolean;
};

const HighlightedJob = () => {
  const { language, translations } = useLanguage();
  
  // Sample job listings data
  const jobListings: JobListing[] = [
    {
      id: 1,
      title: {
        pl: "Senior Product Designer",
        en: "Senior Product Designer"
      },
      company: "CD Projekt",
      description: {
        pl: "Dołącz do naszego zespołu, aby tworzyć innowacyjne doświadczenia dla graczy, które mają wpływ na miliony graczy na całym świecie. Szukamy kreatywnej osoby, która potrafi przekształcać złożone problemy w eleganckie projekty.",
        en: "Join our team to create innovative gaming experiences that impact millions of players worldwide. We're looking for a creative mind who can turn complex problems into elegant designs."
      },
      salary: "12,000 - 18,000 PLN",
      location: "Warszawa",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      },
      featured: true
    },
    {
      id: 2,
      title: {
        pl: "Senior Full Stack Developer",
        en: "Senior Full Stack Developer"
      },
      company: "Asseco Poland",
      description: {
        pl: "Pomóż budować następną generację rozwiązań biznesowych. Szukamy doświadczonych programistów z doświadczeniem w React, Node.js i chmurze, którzy dołączą do naszego rosnącego zespołu.",
        en: "Help build the next generation of business solutions. Looking for experienced developers with React, Node.js, and cloud experience to join our growing team."
      },
      salary: "15,000 - 20,000 PLN",
      location: "Kraków / Zdalnie",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      },
      featured: true
    },
    {
      id: 3,
      title: {
        pl: "UX Research Lead",
        en: "UX Research Lead"
      },
      company: "Comarch",
      description: {
        pl: "Prowadź inicjatywy badawcze użytkowników, które kształtują przyszłość naszego oprogramowania dla przedsiębiorstw. Szukamy doświadczonego badacza, który potrafi przekształcić spostrzeżenia użytkowników w działania poprawiające produkt.",
        en: "Lead user research initiatives to shape the future of our enterprise software. Seeking an experienced researcher who can transform user insights into actionable product improvements."
      },
      salary: "10,000 - 16,000 PLN",
      location: "Wrocław / Hybrydowo",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      }
    },
    {
      id: 4,
      title: {
        pl: "DevOps Engineer",
        en: "DevOps Engineer"
      },
      company: "Infosys Poland",
      description: {
        pl: "Dołącz do naszego zespołu infrastruktury chmurowej, aby projektować, wdrażać i utrzymywać skalowalne systemy. Poszukujemy wiedzy specjalistycznej w Kubernetes, AWS i przebiegu CI/CD.",
        en: "Join our cloud infrastructure team to design, implement, and maintain scalable systems. Seeking expertise in Kubernetes, AWS, and CI/CD pipelines."
      },
      salary: "14,000 - 19,000 PLN",
      location: "Łódź / Zdalnie",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      }
    },
    {
      id: 5,
      title: {
        pl: "AI/ML Engineer",
        en: "AI/ML Engineer"
      },
      company: "Tauron",
      description: {
        pl: "Pracuj nad najnowocześniejszymi modelami uczenia maszynowego, które rozwiązują rzeczywiste problemy biznesowe. Poszukujemy doświadczenia z PyTorch, TensorFlow i praktykami MLOps.",
        en: "Work on cutting-edge machine learning models that solve real-world business problems. Looking for experience with PyTorch, TensorFlow, and MLOps practices."
      },
      salary: "16,000 - 22,000 PLN",
      location: "Gdańsk / Zdalnie",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      }
    },
    {
      id: 6,
      title: {
        pl: "Frontend Developer",
        en: "Frontend Developer"
      },
      company: "Allegro",
      description: {
        pl: "Twórz piękne, responsywne aplikacje internetowe, z których korzystają miliony. Poszukujemy specjalistów w React, TypeScript i nowoczesnych frameworkach CSS.",
        en: "Create beautiful, responsive web applications that are used by millions. Looking for expertise in React, TypeScript, and modern CSS frameworks."
      },
      salary: "12,000 - 17,000 PLN",
      location: "Poznań / Hybrydowo",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      }
    },
    {
      id: 7,
      title: {
        pl: "Data Scientist",
        en: "Data Scientist"
      },
      company: "PZU",
      description: {
        pl: "Wydobywaj spostrzeżenia z dużych zbiorów danych, aby podejmować decyzje biznesowe. Poszukujemy ekspertów w analizie statystycznej, uczeniu maszynowym i wizualizacji danych.",
        en: "Extract insights from large datasets to drive business decisions. Seeking experts in statistical analysis, machine learning, and data visualization."
      },
      salary: "14,000 - 21,000 PLN",
      location: "Warszawa / Zdalnie",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      },
      featured: true
    },
    {
      id: 8,
      title: {
        pl: "Product Manager",
        en: "Product Manager"
      },
      company: "Play",
      description: {
        pl: "Kieruj rozwojem innowacyjnych produktów od koncepcji do uruchomienia. Poszukujemy strategicznych myślicieli z doskonałymi umiejętnościami komunikacyjnymi.",
        en: "Lead the development of innovative products from conception to launch. Looking for strategic thinkers with excellent communication skills."
      },
      salary: "16,000 - 24,000 PLN",
      location: "Kraków / Hybrydowo",
      type: {
        pl: "Pełny etat",
        en: "Full-time"
      }
    }
  ];

  // State to track current page of job listings
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 3;
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);
  
  // Get current jobs based on pagination
  const currentJobs = jobListings.slice(
    currentPage * jobsPerPage, 
    (currentPage + 1) * jobsPerPage
  );

  // Navigation functions
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-teal-50 via-sky-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_30%,rgba(3,179,176,0.15),transparent_50%)]"></div>
      <div className="absolute -top-20 right-0 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 -left-20 w-80 h-80 bg-sky-100/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="bg-teal-100/50 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full">
              {language === 'pl' ? 'Najnowsze oferty' : 'Latest jobs'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            {language === 'pl' ? 'Wyróżnione ' : 'Featured '}
            <span className="text-teal-600">
              {language === 'pl' ? 'oferty pracy' : 'job offers'}
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {language === 'pl' 
              ? 'Odkryj najlepsze oferty pracy od wiodących firm w Polsce. Aplikuj już teraz, aby zrobić kolejny krok w swojej karierze.' 
              : 'Discover the best job opportunities from leading companies in Poland. Apply now to take the next step in your career.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentJobs.map((job) => (
            <Card key={job.id} className="fade-in-section bg-white rounded-2xl p-0 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-0 group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/[0.01] to-sky-400/[0.03] group-hover:opacity-100 opacity-0 transition-opacity"></div>
              
              <div className="relative p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-sm font-medium border border-teal-100/50">
                      {job.company}
                    </span>
                    {job.featured && (
                      <span className="inline-flex items-center bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-medium border border-amber-100/50">
                        <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                        {language === 'pl' ? 'Wyróżnione' : 'Featured'}
                      </span>
                    )}
                  </div>
                  <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
                  {job.title[language]}
                </h3>
                
                <p className="text-neutral-600 mb-6 line-clamp-3 flex-grow">
                  {job.description[language]}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700 border border-neutral-100">
                    <Briefcase className="h-4 w-4 mr-2 text-teal-500" />
                    {job.salary}
                  </div>
                  <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700 border border-neutral-100">
                    <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                    {job.location}
                  </div>
                  <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700 border border-neutral-100">
                    <Clock className="h-4 w-4 mr-2 text-teal-500" />
                    {job.type[language]}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-100">
                  <a href={`/company/${job.company.toLowerCase()}`} className="text-neutral-600 hover:text-teal-600 transition-colors text-sm font-medium">
                    {language === 'pl' ? `O firmie ${job.company}` : `About ${job.company}`}
                  </a>
                  <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                    {language === 'pl' ? 'Aplikuj' : 'Apply'} <ChevronRight className="ml-1 h-4 w-4 inline" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-4">
            <Button 
              onClick={prevPage}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
              aria-label={language === 'pl' ? "Poprzednia strona" : "Previous page"}
            >
              <ChevronLeft className="h-5 w-5 text-neutral-600" />
            </Button>
            <div className="flex items-center bg-white text-neutral-600 px-6 py-2 rounded-full border border-neutral-200 shadow-sm">
              <span className="font-medium">{currentPage + 1}</span>
              <span className="mx-2 text-neutral-400">/</span>
              <span>{totalPages}</span>
            </div>
            <Button 
              onClick={nextPage}
              variant="outline"
              size="icon"
              className="rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
              aria-label={language === 'pl' ? "Następna strona" : "Next page"}
            >
              <ChevronRight className="h-5 w-5 text-neutral-600" />
            </Button>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-6 text-base bg-white hover:bg-teal-50 text-teal-600 hover:text-teal-700 border border-teal-200/50 shadow-sm hover:shadow transition-all">
            {language === 'pl' ? 'Przeglądaj wszystkie oferty' : 'Browse all jobs'} <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HighlightedJob;
