
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  jobCount: string;
  color: string;
}

const companies: Company[] = [
  { id: 1, name: 'Infosys', jobCount: '250+ Jobs', color: 'text-blue-600' },
  { id: 2, name: 'TCS', jobCount: '180+ Jobs', color: 'text-slate-800' },
  { id: 3, name: 'Wipro', jobCount: '300+ Jobs', color: 'text-violet-600' },
  { id: 4, name: 'Accenture', jobCount: '290+ Jobs', color: 'text-purple-600' },
  { id: 5, name: 'IBM', jobCount: '140+ Jobs', color: 'text-blue-700' },
  { id: 6, name: 'Oracle', jobCount: '95+ Jobs', color: 'text-red-600' },
  { id: 7, name: 'Microsoft', jobCount: '120+ Jobs', color: 'text-cyan-600' },
  { id: 8, name: 'Google', jobCount: '85+ Jobs', color: 'text-green-600' },
];

const FeaturedCompanies = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="py-16 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Featured Companies Hiring Now
          </h2>
          <p className="text-muted-foreground">
            Join industry leaders and fast-growing startups
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          
          {/* Companies Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 scroll-smooth px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {companies.map((company) => (
              <a
                key={company.id}
                href={`/jobs?company=${company.name.toLowerCase()}`}
                className="flex-none w-36 bg-card border border-border/50 rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group text-center"
              >
                <h3 className={`font-bold text-lg ${company.color} mb-1 group-hover:scale-105 transition-transform`}>
                  {company.name}
                </h3>
                <p className="text-xs text-muted-foreground">{company.jobCount}</p>
              </a>
            ))}
          </div>
          
          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* View All Link */}
        <div className="text-center mt-8">
          <a 
            href="/companies" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View all 15,000+ companies <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
