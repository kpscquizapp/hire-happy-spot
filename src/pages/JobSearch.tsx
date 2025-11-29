import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobListings } from '@/data/jobListings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Briefcase, Building2, IndianRupee, Star, Filter } from 'lucide-react';

const JobSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const locationParam = searchParams.get('location') || '';
  const experienceParam = searchParams.get('experience') || '';

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  // Filter options
  const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Noida', 'Gurgaon', 'Chennai'];
  const experienceLevels = ['0-2 years', '2-5 years', '3-6 years', '4-7 years', '5-8 years', '6-10 years'];
  const industries = ['IT & Software', 'FinTech', 'E-commerce', 'Food Tech', 'Banking & Finance'];
  const salaryRanges = ['0-10 LPA', '10-20 LPA', '20-30 LPA', '30+ LPA'];

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobListings.filter(job => {
      const matchesQuery = query === '' || 
        job.title.en.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(query.toLowerCase()));

      const matchesLocation = selectedLocations.length === 0 || 
        selectedLocations.some(loc => job.location.includes(loc));

      const matchesExperience = selectedExperience.length === 0 ||
        selectedExperience.some(exp => job.experience?.includes(exp.split(' ')[0]));

      const matchesIndustry = selectedIndustries.length === 0 ||
        (job.industry && selectedIndustries.includes(job.industry));

      const matchesSalary = salaryRange.length === 0 || salaryRange.some(range => {
        const salary = parseInt(job.salary.split('-')[0]);
        if (range === '0-10 LPA') return salary <= 10;
        if (range === '10-20 LPA') return salary >= 10 && salary <= 20;
        if (range === '20-30 LPA') return salary >= 20 && salary <= 30;
        if (range === '30+ LPA') return salary >= 30;
        return true;
      });

      return matchesQuery && matchesLocation && matchesExperience && matchesIndustry && matchesSalary;
    });
  }, [query, selectedLocations, selectedExperience, selectedIndustries, salaryRange]);

  const toggleFilter = (value: string, currentFilters: string[], setFilters: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(f => f !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  const selectedJobData = selectedJob ? jobListings.find(job => job.id === selectedJob) : filteredJobs[0];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              {query ? `Search Results for "${query}"` : 'Browse Jobs'}
            </h1>
            <p className="text-neutral-600">{filteredJobs.length} jobs found</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="space-y-6">
                      {/* Location Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Location</h3>
                        <div className="space-y-2">
                          {locations.map(location => (
                            <div key={location} className="flex items-center space-x-2">
                              <Checkbox
                                id={`loc-${location}`}
                                checked={selectedLocations.includes(location)}
                                onCheckedChange={() => toggleFilter(location, selectedLocations, setSelectedLocations)}
                              />
                              <Label htmlFor={`loc-${location}`} className="text-sm cursor-pointer">
                                {location}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Experience Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Experience</h3>
                        <div className="space-y-2">
                          {experienceLevels.map(level => (
                            <div key={level} className="flex items-center space-x-2">
                              <Checkbox
                                id={`exp-${level}`}
                                checked={selectedExperience.includes(level)}
                                onCheckedChange={() => toggleFilter(level, selectedExperience, setSelectedExperience)}
                              />
                              <Label htmlFor={`exp-${level}`} className="text-sm cursor-pointer">
                                {level}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Industry Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Industry</h3>
                        <div className="space-y-2">
                          {industries.map(industry => (
                            <div key={industry} className="flex items-center space-x-2">
                              <Checkbox
                                id={`ind-${industry}`}
                                checked={selectedIndustries.includes(industry)}
                                onCheckedChange={() => toggleFilter(industry, selectedIndustries, setSelectedIndustries)}
                              />
                              <Label htmlFor={`ind-${industry}`} className="text-sm cursor-pointer">
                                {industry}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Salary Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Salary Range</h3>
                        <div className="space-y-2">
                          {salaryRanges.map(range => (
                            <div key={range} className="flex items-center space-x-2">
                              <Checkbox
                                id={`sal-${range}`}
                                checked={salaryRange.includes(range)}
                                onCheckedChange={() => toggleFilter(range, salaryRange, setSalaryRange)}
                              />
                              <Label htmlFor={`sal-${range}`} className="text-sm cursor-pointer">
                                ₹{range}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Job Cards */}
                <div className="xl:col-span-1 space-y-4">
                  <ScrollArea className="h-[calc(100vh-150px)]">
                    {filteredJobs.map(job => (
                      <Card
                        key={job.id}
                        className={`mb-4 cursor-pointer transition-all hover:shadow-lg ${
                          selectedJob === job.id ? 'ring-2 ring-teal-600' : ''
                        }`}
                        onClick={() => setSelectedJob(job.id)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-1">{job.title.en}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                {job.company}
                              </CardDescription>
                            </div>
                            {job.featured && (
                              <Badge className="bg-teal-600">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-neutral-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              {job.experience || 'Not specified'}
                            </div>
                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-4 w-4" />
                              ₹{job.salary}
                            </div>
                          </div>
                          {job.skills && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {job.skills.slice(0, 3).map(skill => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </div>

                {/* Job Details */}
                <div className="xl:col-span-2">
                  {selectedJobData ? (
                    <Card className="sticky top-24">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-2xl mb-2">{selectedJobData.title.en}</CardTitle>
                            <CardDescription className="text-lg flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              {selectedJobData.company}
                            </CardDescription>
                          </div>
                          {selectedJobData.featured && (
                            <Badge className="bg-teal-600 px-3 py-1">
                              <Star className="h-4 w-4 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {selectedJobData.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {selectedJobData.experience || 'Not specified'}
                          </div>
                          <div className="flex items-center gap-1 text-teal-600 font-semibold">
                            <IndianRupee className="h-4 w-4" />
                            ₹{selectedJobData.salary}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[calc(100vh-400px)]">
                          <div className="space-y-6">
                            {/* Skills */}
                            {selectedJobData.skills && (
                              <div>
                                <h3 className="font-semibold text-lg mb-3">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                  {selectedJobData.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <Separator />

                            {/* Job Description */}
                            <div>
                              <h3 className="font-semibold text-lg mb-3">Job Description</h3>
                              <div className="prose prose-sm max-w-none text-neutral-700 whitespace-pre-line">
                                {selectedJobData.fullDescription || selectedJobData.description.en}
                              </div>
                            </div>

                            {/* Apply Button */}
                            <div className="flex gap-4 pt-4">
                              <Button className="flex-1 bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white">
                                Apply Now
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Save Job
                              </Button>
                            </div>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="py-20 text-center">
                        <p className="text-neutral-500">Select a job to view details</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
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
