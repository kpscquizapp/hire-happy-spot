
import React, { useState } from 'react';
import { Search, MapPin, Layers, ArrowRight, Briefcase, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const { translations } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (category) params.append('category', category);
    if (location) params.append('location', location);
    if (remoteOnly) params.append('remote', 'true');
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <section className="pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50/50 to-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-100/30 via-transparent to-purple-100/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span>
              <span className="text-primary font-medium text-sm">AI-Powered Career Matching</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 tracking-tight">
              Find Your
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
              Dream Job
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Discover opportunities matching your skills and aspirations with AI-powered recommendations
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-card rounded-xl p-5 shadow-lg border border-border/50 max-w-xl">
              {/* Job Title Input */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Job title, skill, or company"
                  className="w-full h-12 pl-12 pr-4 text-sm text-foreground bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Categories Dropdown */}
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    className="w-full h-12 pl-11 pr-4 text-sm text-foreground bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
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
                </div>
                
                {/* Location Input */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full h-12 pl-11 pr-4 text-sm text-foreground bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
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
                  className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all"
                >
                  Search Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            
            {/* Stats */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>50,000+ Active Jobs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>AI-Powered Matching</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Illustration Area */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main illustration placeholder with gradient */}
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-violet-200 via-purple-100 to-pink-100 rounded-3xl overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-yellow-200/40 rounded-full blur-2xl"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-blue-200/50 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200/40 rounded-full blur-2xl"></div>
                
                {/* Illustration overlay pattern */}
                <div className="absolute inset-0 opacity-20" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                ></div>
              </div>
              
              {/* Floating Stats Card - Jobs Posted */}
              <div className="absolute -top-2 -right-4 bg-card rounded-xl shadow-lg p-4 flex items-center gap-3 animate-fade-in border border-border/50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">5,240+</div>
                  <div className="text-xs text-muted-foreground">Jobs Posted</div>
                </div>
              </div>
              
              {/* Floating Stats Card - Candidates */}
              <div className="absolute -bottom-4 left-8 bg-card rounded-xl shadow-lg p-4 flex items-center gap-3 animate-fade-in border border-border/50" style={{ animationDelay: '0.2s' }}>
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">12,500+</div>
                  <div className="text-xs text-muted-foreground">Candidates</div>
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
