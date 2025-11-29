import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobMap from '@/components/jobs/JobMap';
import { jobListings } from '@/data/jobListings';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Building2, 
  Clock, 
  Bookmark,
  ChevronDown,
  X,
  Bell
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

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    let jobs = jobListings.filter(job => {
      const matchesQuery = query === '' || 
        job.title.en.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(query.toLowerCase()));
      return matchesQuery;
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
  }, [query, sortBy]);

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

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Header Bar */}
        <div className="bg-white border-b border-neutral-200 sticky top-16 z-10">
          <div className="container mx-auto px-4 py-4">
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
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
          {/* Job Listings - Left Side */}
          <div className="w-[55%] overflow-y-auto bg-neutral-50 p-4">
            <div className="space-y-3 max-w-4xl">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-4 hover:shadow-md transition-all cursor-pointer bg-white border-l-4 border-l-transparent hover:border-l-teal-600"
                  onClick={() => handleJobClick(job.id)}
                >
                  <div className="flex gap-4">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-teal-700" />
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
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                          <ChevronDown className="h-3 w-3" />
                        </div>
                        {job.type.en.includes('Remote') && (
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
                              className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <Clock className="h-4 w-4" />
                          <span>24d left</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Map - Right Side */}
          <div className="w-[45%] sticky top-[140px] h-[calc(100vh-180px)]">
            <JobMap jobs={filteredJobs} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobSearch;
