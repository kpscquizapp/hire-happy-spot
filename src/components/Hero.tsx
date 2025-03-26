
import React, { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchQuery, location, experience });
    // Handle search logic here
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-teal-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent_70%)]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 tracking-tight">
            Find your dream job today
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8">
            Discover opportunities that match your skills and aspirations
          </p>

          <form onSubmit={handleSearch} className="glass-card p-4 md:p-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Job title, skills, or company"
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
                  placeholder="Location"
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
                  <option value="">Experience level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
              
              <button type="submit" className="button-primary whitespace-nowrap">
                Search Jobs
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-neutral-500 text-sm">
            Popular: Software Engineer, Product Manager, Marketing, Sales
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
