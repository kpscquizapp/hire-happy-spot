import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  jobCount: string;
  color: string;
  logo: string;
}

const companies: Company[] = [
  { id: 1, name: 'Infosys', jobCount: '250+ Jobs', color: 'text-blue-600', logo: 'https://logo.clearbit.com/infosys.com' },
  { id: 2, name: 'TCS', jobCount: '180+ Jobs', color: 'text-slate-800', logo: 'https://logo.clearbit.com/tcs.com' },
  { id: 3, name: 'Wipro', jobCount: '300+ Jobs', color: 'text-violet-600', logo: 'https://logo.clearbit.com/wipro.com' },
  { id: 4, name: 'Accenture', jobCount: '290+ Jobs', color: 'text-purple-600', logo: 'https://logo.clearbit.com/accenture.com' },
  { id: 5, name: 'IBM', jobCount: '140+ Jobs', color: 'text-blue-700', logo: 'https://logo.clearbit.com/ibm.com' },
  { id: 6, name: 'Oracle', jobCount: '95+ Jobs', color: 'text-red-600', logo: 'https://logo.clearbit.com/oracle.com' },
  { id: 7, name: 'Microsoft', jobCount: '120+ Jobs', color: 'text-cyan-600', logo: 'https://logo.clearbit.com/microsoft.com' },
  { id: 8, name: 'Google', jobCount: '85+ Jobs', color: 'text-green-600', logo: 'https://logo.clearbit.com/google.com' },
  { id: 9, name: 'Amazon', jobCount: '200+ Jobs', color: 'text-orange-500', logo: 'https://logo.clearbit.com/amazon.com' },
  { id: 10, name: 'Meta', jobCount: '75+ Jobs', color: 'text-blue-500', logo: 'https://logo.clearbit.com/meta.com' },
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
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Companies Hiring Now
          </h2>
          <p className="text-muted-foreground text-lg">
            Join industry leaders and fast-growing startups
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-muted hover:shadow-xl transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          
          {/* Companies Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-5 pb-4 scroll-smooth px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {companies.map((company) => (
              <a
                key={company.id}
                href={`/jobs?company=${company.name.toLowerCase()}`}
                className="flex-none w-40 bg-card border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden p-2">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-xl font-bold ${company.color}">${company.name[0]}</span>`;
                    }}
                  />
                </div>
                <h3 className={`font-bold text-base ${company.color} mb-1 group-hover:scale-105 transition-transform`}>
                  {company.name}
                </h3>
                <p className="text-sm text-muted-foreground">{company.jobCount}</p>
              </a>
            ))}
          </div>
          
          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-muted hover:shadow-xl transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>
        
        {/* View All Link */}
        <div className="text-center mt-10">
          <a 
            href="/companies" 
            className="inline-flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            View all 15,000+ companies 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
