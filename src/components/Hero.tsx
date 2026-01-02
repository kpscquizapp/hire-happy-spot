
import React, { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const { translations } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (location) params.append('location', location);
    if (experience) params.append('experience', experience);
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <section className="pt-32 pb-24 relative overflow-hidden bg-gradient-to-br from-primary/15 via-primary/8 to-primary/3">
      {/* Decorative gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent"></div>
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-full blur-[80px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 tracking-tight">
            {translations.findDreamJob}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8">
            {translations.discoverOpportunities}
          </p>

          <form onSubmit={handleSearch} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-primary/10">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder={translations.positionSkillsCompany}
                  className="input-primary pl-11 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder={translations.location}
                  className="input-primary pl-11 w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  className="input-primary pl-11 w-full appearance-none"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">{translations.experienceLevel}</option>
                  <option value="entry">{translations.entry}</option>
                  <option value="mid">{translations.mid}</option>
                  <option value="senior">{translations.senior}</option>
                  <option value="executive">{translations.executive}</option>
                </select>
              </div>
              
              <button type="submit" className="button-primary whitespace-nowrap">
                {translations.searchJobs}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-neutral-500 text-sm">
            {translations.popular}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
