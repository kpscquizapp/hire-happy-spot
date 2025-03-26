
import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  logo: string;
  jobCount: number;
}

const companies: Company[] = [
  { id: 1, name: 'Zensar', logo: 'https://placehold.co/200x80?text=Zensar', jobCount: 42 },
  { id: 2, name: 'Infosys', logo: 'https://placehold.co/200x80?text=Infosys', jobCount: 78 },
  { id: 3, name: 'Xoriant', logo: 'https://placehold.co/200x80?text=Xoriant', jobCount: 35 },
  { id: 4, name: 'TCS', logo: 'https://placehold.co/200x80?text=TCS', jobCount: 120 },
  { id: 5, name: 'Wipro', logo: 'https://placehold.co/200x80?text=Wipro', jobCount: 67 },
  { id: 6, name: 'Accenture', logo: 'https://placehold.co/200x80?text=Accenture', jobCount: 93 },
  { id: 7, name: 'IBM', logo: 'https://placehold.co/200x80?text=IBM', jobCount: 84 },
  { id: 8, name: 'Microsoft', logo: 'https://placehold.co/200x80?text=Microsoft', jobCount: 56 },
];

const FeaturedCompanies = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 fade-in-section">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            Featured Companies
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-neutral-700" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-neutral-700" />
            </button>
          </div>
        </div>
        
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4 -mx-4 px-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex-none w-60 glass-card p-4 fade-in-section group"
            >
              <div className="bg-white p-4 rounded-xl mb-4 flex items-center justify-center h-24 group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-16 max-w-full"
                />
              </div>
              <h3 className="font-medium text-neutral-900 mb-1">{company.name}</h3>
              <p className="text-sm text-neutral-500">{company.jobCount} open positions</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
