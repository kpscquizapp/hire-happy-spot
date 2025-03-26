
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Industry {
  id: number;
  name: string;
  jobCount: number;
  image: string;
  description: string;
}

const industries: Industry[] = [
  {
    id: 1,
    name: 'Information Technology',
    jobCount: 1250,
    image: 'https://placehold.co/600x400?text=IT',
    description: 'Software development, data science, and cybersecurity roles'
  },
  {
    id: 2,
    name: 'Manufacturing',
    jobCount: 860,
    image: 'https://placehold.co/600x400?text=Manufacturing',
    description: 'Production, quality control, and engineering positions'
  },
  {
    id: 3,
    name: 'Sales & Marketing',
    jobCount: 720,
    image: 'https://placehold.co/600x400?text=Sales',
    description: 'Business development, digital marketing, and branding experts'
  }
];

const TopIndustries = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-section">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            Top Industries Hiring Now
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore opportunities in the fastest growing sectors with thousands of open positions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <div 
              key={industry.id}
              className="glass-card overflow-hidden group fade-in-section"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-neutral-900/0 z-10"></div>
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-xl font-semibold mb-1">{industry.name}</h3>
                  <p className="text-white/80 text-sm">{industry.jobCount}+ open positions</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-neutral-600 mb-4">{industry.description}</p>
                <a 
                  href={`/industry/${industry.id}`}
                  className="inline-flex items-center text-blue font-medium hover:text-blue-600 transition-colors duration-300"
                >
                  Explore Jobs <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopIndustries;
