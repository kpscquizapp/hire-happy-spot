import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  X,
  Bell,
  Filter,
  TrendingUp,
  Building2,
  Briefcase,
  Zap
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-teal-50/20 to-neutral-50">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Stats Bar */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {query ? `Search: ${query}` : 'All Jobs'}
                </h1>
                <p className="text-teal-100">{filteredJobs.length} opportunities available</p>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="flex items-center gap-2 text-3xl font-bold">
                    <TrendingUp className="h-6 w-6" />
                    {filteredJobs.length}
                  </div>
                  <p className="text-sm text-teal-100">Active Jobs</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 text-3xl font-bold">
                    <Building2 className="h-6 w-6" />
                    {new Set(filteredJobs.map(j => j.company)).size}
                  </div>
                  <p className="text-sm text-teal-100">Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-6">
            {/* Filters Sidebar */}
            <div className="w-[280px] flex-shrink-0">
              <div className="sticky top-24">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-teal-600" />
                        <h2 className="font-bold text-neutral-900">Filters</h2>
                        {activeFiltersCount > 0 && (
                          <Badge className="bg-teal-600">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </div>
                      {activeFiltersCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearAllFilters}
                          className="text-xs text-teal-600 hover:text-teal-700 h-auto p-1"
                        >
                          Clear
                        </Button>
                      )}
                    </div>

                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <div className="space-y-6 pr-4">
                        {/* Location Filter */}
                        <div>
                          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-teal-600" />
                            Location
                          </h3>
                          <div className="space-y-2">
                            {locations.map(location => (
                              <div key={location} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`loc-${location}`}
                                  checked={selectedLocations.includes(location)}
                                  onCheckedChange={() => toggleFilter(location, selectedLocations, setSelectedLocations)}
                                  className="border-teal-600 data-[state=checked]:bg-teal-600"
                                />
                                <Label 
                                  htmlFor={`loc-${location}`} 
                                  className="text-sm cursor-pointer flex-1 hover:text-teal-600"
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
                          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-teal-600" />
                            Salary Range
                          </h3>
                          <div className="space-y-2">
                            {salaryRanges.map(range => (
                              <div key={range} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`sal-${range}`}
                                  checked={selectedSalaryRanges.includes(range)}
                                  onCheckedChange={() => toggleFilter(range, selectedSalaryRanges, setSelectedSalaryRanges)}
                                  className="border-teal-600 data-[state=checked]:bg-teal-600"
                                />
                                <Label 
                                  htmlFor={`sal-${range}`} 
                                  className="text-sm cursor-pointer flex-1 hover:text-teal-600"
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
                          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                            <Zap className="h-4 w-4 text-teal-600" />
                            Working Mode
                          </h3>
                          <div className="space-y-2">
                            {workModes.map(mode => (
                              <div key={mode} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mode-${mode}`}
                                  checked={selectedWorkModes.includes(mode)}
                                  onCheckedChange={() => toggleFilter(mode, selectedWorkModes, setSelectedWorkModes)}
                                  className="border-teal-600 data-[state=checked]:bg-teal-600"
                                />
                                <Label 
                                  htmlFor={`mode-${mode}`} 
                                  className="text-sm cursor-pointer flex-1 hover:text-teal-600"
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
                          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                            <Clock className="h-4 w-4 text-teal-600" />
                            Experience
                          </h3>
                          <div className="space-y-2">
                            {experienceLevels.map(level => (
                              <div key={level} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`exp-${level}`}
                                  checked={selectedExperience.includes(level)}
                                  onCheckedChange={() => toggleFilter(level, selectedExperience, setSelectedExperience)}
                                  className="border-teal-600 data-[state=checked]:bg-teal-600"
                                />
                                <Label 
                                  htmlFor={`exp-${level}`} 
                                  className="text-sm cursor-pointer flex-1 hover:text-teal-600"
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
                </Card>
              </div>
            </div>

            {/* Job Listings */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2 bg-white">
                    <Bell className="h-4 w-4" />
                    Job Alerts
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-white">
                    <Bookmark className="h-4 w-4" />
                    Saved ({bookmarkedJobs.length})
                  </Button>
                </div>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="default">Relevance</SelectItem>
                    <SelectItem value="salary-high">Highest Salary</SelectItem>
                    <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Cards */}
              <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                  <Card className="p-12 text-center bg-white">
                    <div className="max-w-md mx-auto">
                      <Briefcase className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                      <p className="text-neutral-500 mb-4">Try adjusting your filters or search criteria</p>
                      <Button 
                        onClick={clearAllFilters}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </Card>
                ) : (
                  filteredJobs.map((job) => (
                    <Card
                      key={job.id}
                      className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-md"
                      onClick={() => handleJobClick(job.id)}
                    >
                      {/* Gradient accent on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:via-teal-500/3 group-hover:to-transparent transition-all duration-300" />
                      
                      <div className="relative p-6">
                        <div className="flex gap-5">
                          {/* Company Logo */}
                          <div className="flex-shrink-0">
                            <div className={`w-16 h-16 bg-gradient-to-br ${getCompanyLogo(job.company)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <span className="text-white font-bold text-2xl">
                                {job.company.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Job Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title Row */}
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-teal-600 transition-colors mb-1">
                                  {job.title.en}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-neutral-600">
                                  <span className="font-semibold text-neutral-800">{job.company}</span>
                                  <span className="text-neutral-400">•</span>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                  </div>
                                  {job.type.en.toLowerCase().includes('remote') && (
                                    <>
                                      <span className="text-neutral-400">•</span>
                                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                                        Remote
                                      </Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end gap-2">
                                <div className="text-right">
                                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                                    {job.salary ? `₹${job.salary}` : 'Competitive'}
                                  </div>
                                  <p className="text-xs text-neutral-500">per year</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(job.id);
                                  }}
                                >
                                  <Bookmark 
                                    className={`h-5 w-5 transition-all ${
                                      bookmarkedJobs.includes(job.id) 
                                        ? 'fill-current text-teal-600 scale-110' 
                                        : 'text-neutral-400 group-hover:text-teal-600'
                                    }`} 
                                  />
                                </Button>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mt-4">
                              {job.skills?.slice(0, 6).map((skill, index) => (
                                <Badge 
                                  key={index} 
                                  variant="secondary"
                                  className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-3 py-1"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills && job.skills.length > 6 && (
                                <Badge variant="secondary" className="bg-neutral-100 text-neutral-600">
                                  +{job.skills.length - 6} more
                                </Badge>
                              )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                              <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Posted 2 days ago</span>
                                </div>
                                {job.experience && (
                                  <div className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{job.experience} years</span>
                                  </div>
                                )}
                              </div>
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">
                                <Clock className="h-3 w-3 mr-1" />
                                24 days left
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobSearch;
