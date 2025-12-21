
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
    <section className="pt-32 pb-20 bg-gradient-to-b from-navy-50 via-background to-background relative overflow-hidden">
      {/* Navy blue radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(210_60%_30%_/_0.08),transparent_70%)]"></div>
      {/* Gold accent glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(43_70%_50%_/_0.15),transparent_60%)] blur-2xl"></div>
      {/* Navy accent glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-navy-100/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-navy-100/30 rounded-full blur-3xl"></div>
      {/* Subtle gold ring */}
      <div className="absolute top-20 left-1/4 w-64 h-64 border border-gold-300/20 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gold-100/50 text-gold-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-gold-200/50">
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
            Your Hiring Champion
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-800 mb-4 tracking-tight">
            {translations.findDreamJob}
          </h1>
          <p className="text-lg md:text-xl text-navy-600/80 mb-8">
            {translations.discoverOpportunities}
          </p>

          <form onSubmit={handleSearch} className="glass-card p-4 md:p-6 border border-navy-100/50 shadow-lg">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-navy-400" />
                </div>
                <input
                  type="text"
                  placeholder={translations.positionSkillsCompany}
                  className="input-primary pl-11 w-full border-navy-200 focus:border-navy-500 focus:ring-navy-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-navy-400" />
                </div>
                <input
                  type="text"
                  placeholder={translations.location}
                  className="input-primary pl-11 w-full border-navy-200 focus:border-navy-500 focus:ring-navy-200"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-navy-400" />
                </div>
                <select
                  className="input-primary pl-11 w-full appearance-none border-navy-200 focus:border-navy-500 focus:ring-navy-200"
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
              
              <button type="submit" className="bg-gradient-to-r from-navy-700 to-navy-600 hover:from-navy-800 hover:to-navy-700 text-white font-medium px-8 py-3 rounded-full shadow-lg shadow-navy-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-navy-500/30 whitespace-nowrap flex items-center justify-center gap-2">
                <Search className="h-4 w-4" />
                {translations.searchJobs}
              </button>
            </div>
          </form>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-navy-500 text-sm font-medium">{translations.popular}</span>
            {['Software Engineer', 'Marketing', 'Design', 'Sales'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-1.5 bg-navy-50 hover:bg-gold-50 text-navy-600 hover:text-gold-700 text-sm rounded-full border border-navy-200 hover:border-gold-300 transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
