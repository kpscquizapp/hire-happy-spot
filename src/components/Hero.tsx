
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
    <section className="pt-28 pb-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85"></div>
      
      {/* Decorative circular overlays for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[900px] bg-primary-foreground/[0.03] rounded-full"></div>
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] bg-primary-foreground/[0.04] rounded-full"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-primary-foreground/[0.03] rounded-full"></div>
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-foreground/[0.02] rounded-full"></div>
      <div className="absolute top-1/3 left-0 -translate-x-1/2 w-[400px] h-[400px] bg-primary-foreground/[0.03] rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 tracking-tight">
            {translations.findDreamJob}
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/85 mb-8">
            {translations.discoverOpportunities}
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-xl p-4 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Skill/Company Input */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Skill, company, tag"
                  className="w-full h-12 px-4 text-sm text-foreground bg-muted/30 border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-background transition-all placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Categories Dropdown */}
              <div className="relative flex-1 min-w-0">
                <select
                  className="w-full h-12 px-4 pr-10 text-sm text-foreground bg-muted/30 border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-background transition-all appearance-none cursor-pointer"
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
                  className="w-full h-12 px-4 pr-10 text-sm text-foreground bg-muted/30 border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-background transition-all appearance-none cursor-pointer"
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
                  className="w-full h-12 px-4 text-sm text-foreground bg-muted/30 border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-background transition-all placeholder:text-muted-foreground"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              {/* Search Button */}
              <button 
                type="submit" 
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {translations.searchJobs}
              </button>
            </div>
            
            {/* Remote Jobs Checkbox */}
            <div className="flex items-center justify-center mt-4 gap-2">
              <Checkbox 
                id="remote-only" 
                checked={remoteOnly}
                onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary h-4 w-4"
              />
              <label 
                htmlFor="remote-only" 
                className="text-sm text-muted-foreground cursor-pointer select-none"
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
