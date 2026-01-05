
import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, Briefcase, Users, Bot, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const { translations } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (category) params.append('category', category);
    if (experienceLevel) params.append('experience', experienceLevel);
    if (jobType) params.append('type', jobType);
    if (location) params.append('location', location);
    if (remoteOnly) params.append('remote', 'true');
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <section className="pt-24 pb-16 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        {/* Active Jobs Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            50,000+ Active Jobs Available
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 tracking-tight">
              Find Your
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-violet-500 to-purple-500 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            
            <p className="text-base text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Discover opportunities matching your skills and aspirations with AI-powered job matching, assessments, and instant interview scheduling.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-card rounded-2xl p-6 shadow-xl border border-border/30 max-w-xl">
              {/* Row 1: Job Title & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full h-11 pl-10 pr-4 text-sm text-foreground bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="City or remote"
                    className="w-full h-11 pl-10 pr-4 text-sm text-foreground bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Row 2: Dropdowns */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="relative">
                  <select
                    className="w-full h-11 pl-3 pr-8 text-sm text-foreground bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="sales">Sales</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select
                    className="w-full h-11 pl-3 pr-8 text-sm text-foreground bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option value="">Experience Level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead / Manager</option>
                    <option value="executive">Executive</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select
                    className="w-full h-11 pl-3 pr-8 text-sm text-foreground bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="">Job Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                {/* Remote Checkbox */}
                <div className="flex items-center gap-2">
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
                
                {/* Search Button */}
                <Button 
                  type="submit" 
                  className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg shadow-primary/25"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Jobs
                </Button>
              </div>
            </form>
            
            {/* Stats Row */}
            <div className="flex items-center gap-8 mt-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-background flex items-center justify-center text-white text-xs font-bold">J</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-background flex items-center justify-center text-white text-xs font-bold">M</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-background flex items-center justify-center text-white text-xs font-bold">S</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">2M+ Job Seekers</div>
                  <div className="text-xs text-muted-foreground">Trust HIRION</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">15,000+ Companies</div>
                  <div className="text-xs text-muted-foreground">Hiring Now</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image Area */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-violet-100 via-purple-50 to-pink-50 rounded-3xl overflow-hidden relative shadow-2xl">
                {/* Professional team illustration placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-24 w-24 text-primary/30 mx-auto mb-4" />
                    <p className="text-muted-foreground/50 text-sm">Professional Team Image</p>
                  </div>
                </div>
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
              
              {/* Floating AI Interview Badge */}
              <div className="absolute -top-2 right-4 bg-card rounded-xl shadow-xl p-3 flex items-center gap-2 animate-fade-in border border-border/50">
                <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">AI Interview</div>
                  <div className="text-xs text-muted-foreground">Schedule in 1 click</div>
                </div>
              </div>
              
              {/* Floating Success Rate Badge */}
              <div className="absolute bottom-8 right-0 bg-card rounded-xl shadow-xl p-4 flex items-center gap-3 animate-fade-in border border-border/50" style={{ animationDelay: '0.2s' }}>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-xs text-muted-foreground border-l border-border pl-3">
                  AI-Powered<br/>Matching
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
