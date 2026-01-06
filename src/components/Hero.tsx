import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const quickFilters = [
    { id: 'remote', label: 'Remote Only' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'product', label: 'Product' },
    { id: 'design', label: 'Design' },
    { id: 'marketing', label: 'Marketing' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (location) params.append('location', location);
    if (activeFilter) params.append('filter', activeFilter);
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <section className="pt-32 pb-20 bg-[hsl(222,47%,11%)]">
      <div className="container mx-auto px-4">
        {/* Hero Content - Centered */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Find your dream job
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Discover opportunities matching your skills and aspirations from over 10,000+ top companies globally.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="bg-white rounded-full p-2 shadow-2xl flex items-center gap-2 max-w-2xl mx-auto">
              {/* Job Search Input */}
              <div className="flex-1 flex items-center gap-3 pl-4">
                <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full h-12 text-gray-900 bg-transparent border-none focus:outline-none placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Divider */}
              <div className="w-px h-8 bg-gray-200"></div>
              
              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3 pl-4">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="w-full h-12 text-gray-900 bg-transparent border-none focus:outline-none placeholder:text-gray-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              {/* Search Button */}
              <Button 
                type="submit" 
                size="icon"
                className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-white text-gray-900 border-white hover:bg-gray-100 hover:text-gray-900 font-medium"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              All Filters
            </Button>
            
            {quickFilters.map((filter) => (
              <Button
                key={filter.id}
                variant="outline"
                size="sm"
                onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                className={`rounded-full font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'bg-transparent text-white border-gray-600 hover:bg-white/10 hover:text-white hover:border-gray-500'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
