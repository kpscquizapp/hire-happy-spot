import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Building2, Clock, Bookmark, Zap, Sparkles, Briefcase, DollarSign, Award, Clock3, Navigation, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

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
  isFeatured?: boolean;
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
    isFeatured: true,
    postedTime: '2h ago',
    accentColor: 'from-blue-500 to-blue-600'
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
    accentColor: 'from-red-500 to-red-600'
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
    isFeatured: true,
    postedTime: '1d ago',
    accentColor: 'from-orange-500 to-orange-600'
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
    accentColor: 'from-indigo-500 to-indigo-600'
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
    accentColor: 'from-cyan-500 to-cyan-600'
  }
];

const topCompanies = [
  { name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
  { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
  { name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
  { name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com' },
  { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
];

const filterData = {
  category: [
    { id: 'it', label: 'IT & Software', count: 12450 },
    { id: 'finance', label: 'Banking & Finance', count: 5890 },
    { id: 'marketing', label: 'Sales & Marketing', count: 9340 },
    { id: 'healthcare', label: 'Healthcare', count: 4120 },
    { id: 'design', label: 'Design & Creative', count: 3670 },
  ],
  salary: [
    { id: '0-5', label: '₹0 - ₹5 LPA', count: 8520 },
    { id: '5-10', label: '₹5 - ₹10 LPA', count: 15230 },
    { id: '10-20', label: '₹10 - ₹20 LPA', count: 12450 },
    { id: '20-35', label: '₹20 - ₹35 LPA', count: 6780 },
    { id: '35+', label: '₹35 LPA+', count: 2340 },
  ],
  experience: [
    { id: 'fresher', label: 'Fresher', count: 5420 },
    { id: '1-3', label: '1-3 Years', count: 18650 },
    { id: '3-5', label: '3-5 Years', count: 14320 },
    { id: '5-10', label: '5-10 Years', count: 8970 },
    { id: '10+', label: '10+ Years', count: 3450 },
  ],
  type: [
    { id: 'full-time', label: 'Full-time', count: 35420 },
    { id: 'part-time', label: 'Part-time', count: 4560 },
    { id: 'contract', label: 'Contract', count: 7890 },
    { id: 'internship', label: 'Internship', count: 3210 },
    { id: 'freelance', label: 'Freelance', count: 2340 },
  ],
  location: [
    { id: 'bangalore', label: 'Bangalore', count: 18540 },
    { id: 'mumbai', label: 'Mumbai', count: 12350 },
    { id: 'delhi', label: 'Delhi NCR', count: 9870 },
    { id: 'hyderabad', label: 'Hyderabad', count: 8650 },
    { id: 'remote', label: 'Remote', count: 6780 },
  ],
  skills: [
    { id: 'javascript', label: 'JavaScript', count: 15420 },
    { id: 'python', label: 'Python', count: 12350 },
    { id: 'react', label: 'React', count: 9870 },
    { id: 'java', label: 'Java', count: 11650 },
    { id: 'nodejs', label: 'Node.js', count: 8780 },
    { id: 'aws', label: 'AWS', count: 7650 },
    { id: 'sql', label: 'SQL', count: 14320 },
    { id: 'typescript', label: 'TypeScript', count: 6540 },
  ],
};

interface FilterConfig {
  key: keyof typeof filterData;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const filterConfigs: FilterConfig[] = [
  { 
    key: 'category', 
    title: 'Job Category', 
    icon: <Briefcase className="h-4 w-4" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  { 
    key: 'skills', 
    title: 'Skills', 
    icon: <Code className="h-4 w-4" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  { 
    key: 'salary', 
    title: 'Salary Range', 
    icon: <DollarSign className="h-4 w-4" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  { 
    key: 'experience', 
    title: 'Experience Level', 
    icon: <Award className="h-4 w-4" />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  { 
    key: 'type', 
    title: 'Job Type', 
    icon: <Clock3 className="h-4 w-4" />,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600'
  },
  { 
    key: 'location', 
    title: 'Location', 
    icon: <Navigation className="h-4 w-4" />,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600'
  },
];

interface FilterSectionProps {
  config: FilterConfig;
  isOpen: boolean;
  onToggle: () => void;
  selectedFilters: string[];
  onFilterChange: (filterId: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  config,
  isOpen, 
  onToggle, 
  selectedFilters, 
  onFilterChange 
}) => {
  const selectedCount = selectedFilters.length;
  
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
          isOpen 
            ? 'bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20' 
            : 'hover:bg-muted/50 border border-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${config.iconBg} ${config.iconColor} flex items-center justify-center rounded-lg`}>
            {config.icon}
          </div>
          <span className={`font-medium ${isOpen ? 'text-primary' : 'text-foreground'}`}>
            {config.title}
          </span>
          {selectedCount > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
          isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
        }`} />
      </button>
      
      {isOpen && (
        <div className="mt-2 ml-3 pl-8 border-l-2 border-primary/20 space-y-2 pb-2 animate-fade-in">
          {filterData[config.key].map((option) => (
            <label 
              key={option.id}
              className="flex items-center justify-between cursor-pointer group py-1.5 px-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Checkbox 
                  id={option.id}
                  checked={selectedFilters.includes(option.id)}
                  onCheckedChange={() => onFilterChange(option.id)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary h-4 w-4"
                />
                <span className={`text-sm transition-colors ${
                  selectedFilters.includes(option.id) 
                    ? 'text-primary font-medium' 
                    : 'text-foreground group-hover:text-primary'
                }`}>
                  {option.label}
                </span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted/70 px-2 py-1 rounded-full font-medium">
                {option.count.toLocaleString()}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const HomeJobsSection = () => {
  const [openFilters, setOpenFilters] = useState<string[]>(['category', 'skills']);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: [],
    salary: [],
    experience: [],
    type: [],
    location: [],
    skills: [],
  });
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const toggleFilter = (filter: string) => {
    setOpenFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const handleFilterChange = (category: string, filterId: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(filterId)
        ? prev[category].filter(f => f !== filterId)
        : [...prev[category], filterId]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      salary: [],
      experience: [],
      type: [],
      location: [],
      skills: [],
    });
  };

  const toggleSaveJob = (jobId: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    );
  };

  const totalSelected = Object.values(selectedFilters).flat().length;

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 flex-shrink-0 hidden lg:block">
            <div className="bg-card border border-border/50 rounded-2xl p-5 sticky top-24 shadow-lg">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-violet-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">Filters</h3>
                    {totalSelected > 0 && (
                      <p className="text-xs text-muted-foreground">{totalSelected} filters applied</p>
                    )}
                  </div>
                </div>
                {totalSelected > 0 && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:text-primary/80 font-semibold bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {/* Filter Sections */}
              <div className="space-y-1">
                {filterConfigs.map((config) => (
                  <FilterSection 
                    key={config.key}
                    config={config}
                    isOpen={openFilters.includes(config.key)} 
                    onToggle={() => toggleFilter(config.key)}
                    selectedFilters={selectedFilters[config.key]}
                    onFilterChange={(id) => handleFilterChange(config.key, id)}
                  />
                ))}
              </div>

              {/* Apply Filters Button */}
              {totalSelected > 0 && (
                <div className="mt-5 pt-4 border-t border-border/50">
                  <Button className="w-full bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white font-semibold py-5 rounded-xl shadow-lg shadow-primary/25">
                    Apply Filters ({totalSelected})
                  </Button>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Hiring Companies */}
            <div className="bg-card border border-border/50 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground">Top Hiring Companies</h3>
                <div className="flex gap-1">
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-10 overflow-x-auto pb-2">
                {topCompanies.map((company, index) => (
                  <a 
                    key={index}
                    href={`/jobs?company=${company.name.toLowerCase()}`}
                    className="flex-shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="h-10 object-contain"
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                Recommended Jobs
              </h2>
              <span className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
                Showing <span className="font-semibold text-foreground">428</span> jobs
              </span>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <a
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                >
                  {/* Gradient Top Border */}
                  <div className={`h-1 bg-gradient-to-r ${job.accentColor}`} />
                  
                  <div className="p-6">
                    <div className="flex items-start gap-5">
                      {/* Company Logo */}
                      <div className="w-14 h-14 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/30 group-hover:scale-105 transition-transform">
                        <img 
                          src={job.companyLogo} 
                          alt={job.company}
                          className="w-9 h-9 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `<span class="text-xl font-bold text-primary">${job.company[0]}</span>`;
                          }}
                        />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              {job.isFeatured && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm mb-3">
                              <span className="font-medium text-foreground">{job.company}</span>
                              {job.isNew && (
                                <span className="px-2.5 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-5 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                                <Building2 className="h-3.5 w-3.5 text-primary" />
                                {job.type}
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent mb-2">
                              {job.salary}
                            </div>
                            <button 
                              onClick={(e) => toggleSaveJob(job.id, e)}
                              className={`p-2.5 rounded-xl transition-all ${
                                savedJobs.includes(job.id)
                                  ? 'bg-primary/10 text-primary'
                                  : 'hover:bg-muted text-muted-foreground hover:text-primary'
                              }`}
                            >
                              <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Skills & Time */}
                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/30">
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1.5 bg-gradient-to-r from-muted to-muted/70 text-foreground text-xs font-medium rounded-lg border border-border/30 hover:border-primary/30 hover:from-primary/5 hover:to-primary/10 transition-all cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                            <Clock className="h-3.5 w-3.5" />
                            {job.postedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-10">
              <Button className="px-10 py-6 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/25">
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
