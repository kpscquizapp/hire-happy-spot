import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ArrowRight, SlidersHorizontal, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const popularSearches = [
  { label: 'Software Engineer', icon: TrendingUp },
  { label: 'Product Manager', icon: TrendingUp },
  { label: 'Data Scientist', icon: TrendingUp },
  { label: 'UI/UX Designer', icon: TrendingUp },
  { label: 'Frontend Developer', icon: TrendingUp },
];

const recentSearches = [
  { label: 'React Developer Bangalore', icon: Clock },
  { label: 'Full Stack Engineer Remote', icon: Clock },
  { label: 'DevOps AWS', icon: Clock },
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const quickFilters = [
    { id: 'remote', label: 'Remote Only' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'product', label: 'Product' },
    { id: 'design', label: 'Design' },
    { id: 'marketing', label: 'Marketing' },
  ];

  const locationSuggestions = [
    'Bangalore',
    'Mumbai',
    'Delhi NCR',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Remote',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (location) params.append('location', location);
    if (activeFilter) params.append('filter', activeFilter);
    window.location.href = `/jobs?${params.toString()}`;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleLocationClick = (loc: string) => {
    setLocation(loc);
    setShowLocationSuggestions(false);
  };

  return (
    <section className="pt-32 pb-16 bg-navy-900 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800 opacity-50" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Content - Centered */}
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-white/80 font-medium">10,000+ opportunities waiting</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Find your dream job
          </h1>
          
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto leading-relaxed">
            Discover opportunities matching your skills and aspirations from top companies globally.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-10">
            <div ref={searchRef} className="relative bg-white rounded-2xl p-2 shadow-2xl shadow-black/20 flex items-center gap-2 max-w-2xl mx-auto">
              {/* Job Search Input */}
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 pl-4">
                  <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full h-12 text-foreground bg-transparent border-none focus:outline-none placeholder:text-muted-foreground text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setShowSuggestions(true);
                      setShowLocationSuggestions(false);
                    }}
                  />
                </div>
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border z-50 overflow-hidden animate-scale-in">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="p-4 border-b border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" />
                          Recent Searches
                        </p>
                        <div className="space-y-1">
                          {recentSearches.map((item, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSuggestionClick(item.label)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors text-left group"
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="text-sm text-foreground">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Popular Searches */}
                    <div className="p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Popular Searches
                      </p>
                      <div className="space-y-1">
                        {popularSearches.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(item.label)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/5 transition-all text-left group"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Sparkles className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm text-foreground font-medium">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Divider */}
              <div className="w-px h-8 bg-border"></div>
              
              {/* Location Input */}
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 pl-4">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    className="w-full h-12 text-foreground bg-transparent border-none focus:outline-none placeholder:text-muted-foreground text-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => {
                      setShowLocationSuggestions(true);
                      setShowSuggestions(false);
                    }}
                  />
                </div>
                
                {/* Location Suggestions Dropdown */}
                {showLocationSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border z-50 overflow-hidden animate-scale-in">
                    <div className="p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5" />
                        Popular Locations
                      </p>
                      <div className="space-y-1">
                        {locationSuggestions.map((loc, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleLocationClick(loc)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors text-left group"
                          >
                            <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm text-foreground">{loc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Search Button */}
              <Button 
                type="submit" 
                size="icon"
                className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
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
              className="rounded-xl bg-white text-foreground border-white hover:bg-white/90 font-medium shadow-lg transition-all hover:-translate-y-0.5"
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
                className={`rounded-xl font-medium transition-all hover:-translate-y-0.5 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                    : 'bg-transparent text-white/80 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/30'
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
