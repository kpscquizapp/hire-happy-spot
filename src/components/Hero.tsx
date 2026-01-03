
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const { translations } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (category) params.append('category', category);
    if (experience) params.append('experience', experience);
    if (location) params.append('location', location);
    if (remoteOnly) params.append('remote', 'true');
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <section className="pt-32 pb-28 relative overflow-hidden bg-primary">
      {/* Decorative circular overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[800px] bg-primary-foreground/5 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-primary-foreground/5 rounded-full"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-primary-foreground/5 rounded-full"></div>
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-foreground/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 tracking-tight">
            {translations.findDreamJob}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            {translations.discoverOpportunities}
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-lg p-3 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-2">
              {/* Skill/Company Input */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Skill, company, tag"
                  className="w-full h-11 px-4 text-sm text-foreground bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Categories Dropdown */}
              <div className="relative flex-1 min-w-0">
                <select
                  className="w-full h-11 px-4 text-sm text-foreground bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All categories</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Design</option>
                  <option value="sales">Sales</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Experience Level Dropdown */}
              <div className="relative flex-1 min-w-0">
                <select
                  className="w-full h-11 px-4 text-sm text-foreground bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">{translations.experienceLevel}</option>
                  <option value="entry">{translations.entry}</option>
                  <option value="mid">{translations.mid}</option>
                  <option value="senior">{translations.senior}</option>
                  <option value="executive">{translations.executive}</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Location Input */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder={translations.location}
                  className="w-full h-11 px-4 text-sm text-foreground bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              {/* Search Button */}
              <button 
                type="submit" 
                className="h-11 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-colors whitespace-nowrap"
              >
                {translations.searchJobs}
              </button>
            </div>
            
            {/* Remote Jobs Checkbox */}
            <div className="flex items-center justify-center mt-3 gap-2">
              <Checkbox 
                id="remote-only" 
                checked={remoteOnly}
                onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor="remote-only" 
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Only remote jobs
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
