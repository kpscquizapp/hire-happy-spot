import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Building2, Clock, Bookmark, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  isNew?: boolean;
  postedTime: string;
  accentColor: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Engineering Team Leader',
    company: 'Flipkart',
    companyLogo: 'https://logo.clearbit.com/flipkart.com',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹35L - ₹50L',
    skills: ['Java', 'Microservices', 'Team Lead'],
    isNew: true,
    postedTime: '2h ago',
    accentColor: 'border-l-blue-500'
  },
  {
    id: 2,
    title: 'Senior Frontend Developer',
    company: 'Zomato',
    companyLogo: 'https://logo.clearbit.com/zomato.com',
    location: 'Gurgaon (Hybrid)',
    type: 'Full-time',
    salary: '₹25L - ₹40L',
    skills: ['React Native', 'TypeScript', 'Redux'],
    postedTime: '5h ago',
    accentColor: 'border-l-red-500'
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Swiggy',
    companyLogo: 'https://logo.clearbit.com/swiggy.com',
    location: 'Bangalore',
    type: 'On-site',
    salary: '₹28L - ₹45L',
    skills: ['Product Strategy', 'Analytics', 'Agile'],
    postedTime: '1d ago',
    accentColor: 'border-l-orange-500'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Razorpay',
    companyLogo: 'https://logo.clearbit.com/razorpay.com',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹30L - ₹55L',
    skills: ['Python', 'Machine Learning', 'SQL'],
    isNew: true,
    postedTime: '3h ago',
    accentColor: 'border-l-indigo-500'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'Paytm',
    companyLogo: 'https://logo.clearbit.com/paytm.com',
    location: 'Noida',
    type: 'Full-time',
    salary: '₹20L - ₹35L',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    postedTime: '1d ago',
    accentColor: 'border-l-cyan-500'
  }
];

const topCompanies = [
  { name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
  { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
  { name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
  { name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com' },
  { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
];

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between py-4 border-b border-border/50 hover:bg-muted/30 px-2 -mx-2 rounded transition-colors"
  >
    <span className="font-medium text-foreground">{title}</span>
    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
  </button>
);

const HomeJobsSection = () => {
  const [openFilters, setOpenFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setOpenFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-card border border-border/50 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-lg">Filters</h3>
                <button className="text-sm text-primary hover:underline">Clear all</button>
              </div>
              
              <FilterSection 
                title="Job Category" 
                isOpen={openFilters.includes('category')} 
                onToggle={() => toggleFilter('category')} 
              />
              <FilterSection 
                title="Salary Range" 
                isOpen={openFilters.includes('salary')} 
                onToggle={() => toggleFilter('salary')} 
              />
              <FilterSection 
                title="Experience Level" 
                isOpen={openFilters.includes('experience')} 
                onToggle={() => toggleFilter('experience')} 
              />
              <FilterSection 
                title="Job Type" 
                isOpen={openFilters.includes('type')} 
                onToggle={() => toggleFilter('type')} 
              />
              <FilterSection 
                title="Location" 
                isOpen={openFilters.includes('location')} 
                onToggle={() => toggleFilter('location')} 
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Hiring Companies */}
            <div className="bg-card border border-border/50 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground">Top Hiring Companies</h3>
                <div className="flex gap-1">
                  <button className="w-8 h-8 border border-border rounded flex items-center justify-center hover:bg-muted transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="w-8 h-8 border border-border rounded flex items-center justify-center hover:bg-muted transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-8 overflow-x-auto pb-2">
                {topCompanies.map((company, index) => (
                  <a 
                    key={index}
                    href={`/jobs?company=${company.name.toLowerCase()}`}
                    className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Recommended Jobs Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Recommended Jobs
              </h2>
              <span className="text-sm text-muted-foreground">Showing 428 jobs</span>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <a
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className={`block bg-card border border-border/50 rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-l-4 ${job.accentColor}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img 
                        src={job.companyLogo} 
                        alt={job.company}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<span class="text-lg font-bold text-muted-foreground">${job.company[0]}</span>`;
                        }}
                      />
                    </div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">{job.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span>{job.company}</span>
                            {job.isNew && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded">NEW</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5" />
                              {job.type}
                            </span>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-primary font-semibold mb-2">{job.salary}</div>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Bookmark className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>

                      {/* Skills & Time */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.postedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeJobsSection;
