import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobMap from '@/components/jobs/JobMap';
import { jobListings } from '@/data/jobListings';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MapPin, 
  Clock, 
  Bookmark,
  ChevronDown,
  X,
  Bell,
  Filter,
  ChevronUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  
  const [sortBy, setSortBy] = useState('default');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);
  
  // Filter states
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  
  // Filter options
  const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Noida', 'Gurgaon', 'Chennai', 'Delhi'];
  const salaryRanges = ['0-5 LPA', '5-10 LPA', '10-15 LPA', '15-20 LPA', '20-30 LPA', '30+ LPA'];
  const workModes = ['Remote', 'Hybrid', 'Onsite'];
  const experienceLevels = ['0-2 years', '2-5 years', '5-8 years', '8+ years'];

  // Company logos mapping (using first letter for now, can be replaced with actual logos)
  const getCompanyLogo = (companyName: string) => {
    const colors = [
      'from-teal-500 to-teal-700',
      'from-blue-500 to-blue-700',
      'from-purple-500 to-purple-700',
      'from-orange-500 to-orange-700',
      'from-green-500 to-green-700',
      'from-pink-500 to-pink-700',
    ];
    const colorIndex = companyName.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  const toggleFilter = (value: string, currentFilters: string[], setFilters: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(f => f !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  // Filter jobs
  const filteredJobs = useMemo(() => {
    let jobs = jobListings.filter(job => {
      const matchesQuery = query === '' || 
        job.title.en.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(query.toLowerCase()));

      const matchesLocation = selectedLocations.length === 0 || 
        selectedLocations.some(loc => job.location.includes(loc));

      const matchesSalary = selectedSalaryRanges.length === 0 || selectedSalaryRanges.some(range => {
        const salary = parseInt(job.salary.split('-')[0]);
        if (range === '0-5 LPA') return salary <= 5;
        if (range === '5-10 LPA') return salary >= 5 && salary <= 10;
        if (range === '10-15 LPA') return salary >= 10 && salary <= 15;
        if (range === '15-20 LPA') return salary >= 15 && salary <= 20;
        if (range === '20-30 LPA') return salary >= 20 && salary <= 30;
        if (range === '30+ LPA') return salary >= 30;
        return true;
      });

      const matchesWorkMode = selectedWorkModes.length === 0 || 
        selectedWorkModes.some(mode => job.type.en.toLowerCase().includes(mode.toLowerCase()));

      const matchesExperience = selectedExperience.length === 0 ||
        selectedExperience.some(exp => {
          const expYears = parseInt(exp.split('-')[0]);
          const jobExp = job.experience ? parseInt(job.experience.split('-')[0]) : 0;
          return Math.abs(expYears - jobExp) <= 2;
        });

      return matchesQuery && matchesLocation && matchesSalary && matchesWorkMode && matchesExperience;
    });

    // Sort jobs
    if (sortBy === 'salary-high') {
      jobs.sort((a, b) => {
        const salaryA = parseInt(a.salary.split('-')[0]);
        const salaryB = parseInt(b.salary.split('-')[0]);
        return salaryB - salaryA;
      });
    } else if (sortBy === 'salary-low') {
      jobs.sort((a, b) => {
        const salaryA = parseInt(a.salary.split('-')[0]);
        const salaryB = parseInt(b.salary.split('-')[0]);
        return salaryA - salaryB;
      });
    }

    return jobs;
  }, [query, sortBy, selectedLocations, selectedSalaryRanges, selectedWorkModes, selectedExperience]);

  const toggleBookmark = (jobId: number) => {
    setBookmarkedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleJobClick = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };

  const clearAllFilters = () => {
    setSelectedLocations([]);
    setSelectedSalaryRanges([]);
    setSelectedWorkModes([]);
    setSelectedExperience([]);
  };

  const activeFiltersCount = selectedLocations.length + selectedSalaryRanges.length + 
                             selectedWorkModes.length + selectedExperience.length;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-20 bg-neutral-50">
        {/* Header Bar */}
        <div className="bg-white border-b shadow-sm sticky top-16 z-20">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-neutral-900">
                  Job offers {query && `${query} - `}{filteredJobs.length} offers
                </h1>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Subscribe
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[150px] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="salary-high">Salary (High)</SelectItem>
                      <SelectItem value="salary-low">Salary (Low)</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-180px)]">
          {/* Filters Sidebar - Left */}
          <div className="w-[280px] border-r border-neutral-200 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-neutral-600" />
                  <h2 className="font-semibold text-neutral-900">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-xs text-teal-600 hover:text-teal-700"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-6">
                  {/* Location Filter */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm text-neutral-900">Location</h3>
                    <div className="space-y-2">
                      {locations.map(location => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`loc-${location}`}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={() => toggleFilter(location, selectedLocations, setSelectedLocations)}
                          />
                          <Label 
                            htmlFor={`loc-${location}`} 
                            className="text-sm cursor-pointer flex-1"
                          >
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Salary Range Filter */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm text-neutral-900">Salary Range</h3>
                    <div className="space-y-2">
                      {salaryRanges.map(range => (
                        <div key={range} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sal-${range}`}
                            checked={selectedSalaryRanges.includes(range)}
                            onCheckedChange={() => toggleFilter(range, selectedSalaryRanges, setSelectedSalaryRanges)}
                          />
                          <Label 
                            htmlFor={`sal-${range}`} 
                            className="text-sm cursor-pointer flex-1"
                          >
                            ₹{range}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Working Mode Filter */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm text-neutral-900">Working Mode</h3>
                    <div className="space-y-2">
                      {workModes.map(mode => (
                        <div key={mode} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mode-${mode}`}
                            checked={selectedWorkModes.includes(mode)}
                            onCheckedChange={() => toggleFilter(mode, selectedWorkModes, setSelectedWorkModes)}
                          />
                          <Label 
                            htmlFor={`mode-${mode}`} 
                            className="text-sm cursor-pointer flex-1"
                          >
                            {mode}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Experience Filter */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm text-neutral-900">Experience</h3>
                    <div className="space-y-2">
                      {experienceLevels.map(level => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox
                            id={`exp-${level}`}
                            checked={selectedExperience.includes(level)}
                            onCheckedChange={() => toggleFilter(level, selectedExperience, setSelectedExperience)}
                          />
                          <Label 
                            htmlFor={`exp-${level}`} 
                            className="text-sm cursor-pointer flex-1"
                          >
                            {level}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Job Listings - Center */}
          <div className="flex-1 overflow-y-auto bg-neutral-50 p-4">
            <div className="space-y-3 max-w-3xl mx-auto">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-500">No jobs found matching your filters</p>
                  <Button 
                    variant="outline" 
                    onClick={clearAllFilters}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="p-4 hover:shadow-lg transition-all cursor-pointer bg-white border-l-4 border-l-transparent hover:border-l-teal-600"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <div className="flex gap-4">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 bg-gradient-to-br ${getCompanyLogo(job.company)} rounded-lg flex items-center justify-center shadow-md`}>
                          <span className="text-white font-bold text-xl">
                            {job.company.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Job Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title and Salary Row */}
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900 hover:text-teal-600 transition-colors">
                            {job.title.en}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-lg font-semibold text-teal-600">
                              {job.salary ? `₹${job.salary}` : 'Undisclosed Salary'}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(job.id);
                              }}
                            >
                              <Bookmark 
                                className={`h-4 w-4 ${
                                  bookmarkedJobs.includes(job.id) 
                                    ? 'fill-current text-teal-600' 
                                    : 'text-neutral-400'
                                }`} 
                              />
                            </Button>
                          </div>
                        </div>

                        {/* Company and Location */}
                        <div className="flex items-center gap-4 mb-3 text-sm text-neutral-600">
                          <div className="flex items-center gap-1 font-medium">
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                            <ChevronDown className="h-3 w-3" />
                          </div>
                          {job.type.en.toLowerCase().includes('remote') && (
                            <div className="flex items-center gap-1">
                              <div className="h-1 w-1 bg-neutral-400 rounded-full"></div>
                              <span>Fully remote</span>
                            </div>
                          )}
                        </div>

                        {/* Skills and Time */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {job.skills?.slice(0, 5).map((skill, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary"
                                className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-orange-600 flex-shrink-0 ml-4">
                            <Clock className="h-4 w-4" />
                            <span>24d left</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Map - Right Side */}
          <div className="w-[400px] sticky top-[140px] h-[calc(100vh-180px)]">
            <JobMap jobs={filteredJobs} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobSearch;
