
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Clock, MapPin, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Define a type for our job listings
type JobListing = {
  id: number;
  title: string;
  company: string;
  description: string;
  salary: string;
  location: string;
  type: string;
  featured?: boolean;
};

const HighlightedJob = () => {
  // Sample job listings data
  const jobListings: JobListing[] = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Infosys",
      description: "Join our team to create innovative solutions that impact millions of users worldwide. We're looking for a creative mind who can turn complex problems into elegant designs.",
      salary: "$120k - $150k",
      location: "Remote / San Francisco",
      type: "Full-time",
      featured: true
    },
    {
      id: 2,
      title: "Senior Full Stack Developer",
      company: "Microsoft",
      description: "Help build the next generation of cloud solutions. Looking for experienced developers with React, Node.js, and Azure experience to join our growing team.",
      salary: "$130k - $160k",
      location: "Seattle / Remote",
      type: "Full-time",
      featured: true
    },
    {
      id: 3,
      title: "UX Research Lead",
      company: "IBM",
      description: "Lead user research initiatives to shape the future of our enterprise software. Seeking an experienced researcher who can transform user insights into actionable product improvements.",
      salary: "$110k - $140k",
      location: "New York / Hybrid",
      type: "Full-time"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Accenture",
      description: "Join our cloud infrastructure team to design, implement, and maintain scalable systems. Seeking expertise in Kubernetes, AWS, and CI/CD pipelines.",
      salary: "$125k - $155k",
      location: "Chicago / Remote",
      type: "Full-time"
    },
    {
      id: 5,
      title: "AI/ML Engineer",
      company: "Wipro",
      description: "Work on cutting-edge machine learning models that solve real-world business problems. Looking for experience with PyTorch, TensorFlow, and MLOps practices.",
      salary: "$140k - $170k",
      location: "Remote / Bangalore",
      type: "Full-time"
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "Google",
      description: "Create beautiful, responsive web applications that are used by millions. Looking for expertise in React, TypeScript, and modern CSS frameworks.",
      salary: "$115k - $145k",
      location: "Mountain View / Remote",
      type: "Full-time"
    },
    {
      id: 7,
      title: "Data Scientist",
      company: "Amazon",
      description: "Extract insights from large datasets to drive business decisions. Seeking experts in statistical analysis, machine learning, and data visualization.",
      salary: "$130k - $165k",
      location: "Seattle / Remote",
      type: "Full-time",
      featured: true
    },
    {
      id: 8,
      title: "Product Manager",
      company: "Apple",
      description: "Lead the development of innovative products from conception to launch. Looking for strategic thinkers with excellent communication skills.",
      salary: "$140k - $180k",
      location: "Cupertino / Hybrid",
      type: "Full-time"
    }
  ];

  // State to track current page of job listings
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 3;
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);
  
  // Get current jobs based on pagination
  const currentJobs = jobListings.slice(
    currentPage * jobsPerPage, 
    (currentPage + 1) * jobsPerPage
  );

  // Navigation functions
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-teal-50 via-sky-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_30%,rgba(3,179,176,0.15),transparent_50%)]"></div>
      <div className="absolute -top-20 right-0 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 -left-20 w-80 h-80 bg-sky-100/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="bg-teal-100/50 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full">
              Latest Opportunities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Featured <span className="text-teal-600">Opportunities</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover top jobs from leading companies in the industry. Apply now to take the next step in your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentJobs.map((job) => (
            <Card key={job.id} className="fade-in-section bg-white rounded-2xl p-0 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-0 group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/[0.01] to-sky-400/[0.03] group-hover:opacity-100 opacity-0 transition-opacity"></div>
              
              <div className="relative p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-sm font-medium border border-teal-100/50">
                      {job.company}
                    </span>
                    {job.featured && (
                      <span className="inline-flex items-center bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-medium border border-amber-100/50">
                        <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
                  {job.title}
                </h3>
                
                <p className="text-neutral-600 mb-6 line-clamp-3 flex-grow">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700 border border-neutral-100">
                    <Briefcase className="h-4 w-4 mr-2 text-teal-500" />
                    {job.salary}
                  </div>
                  <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700 border border-neutral-100">
                    <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                    {job.location}
                  </div>
                  <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700 border border-neutral-100">
                    <Clock className="h-4 w-4 mr-2 text-teal-500" />
                    {job.type}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-100">
                  <a href={`/company/${job.company.toLowerCase()}`} className="text-neutral-600 hover:text-teal-600 transition-colors text-sm font-medium">
                    About {job.company}
                  </a>
                  <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                    Apply <ChevronRight className="ml-1 h-4 w-4 inline" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-4">
            <Button 
              onClick={prevPage}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5 text-neutral-600" />
            </Button>
            <div className="flex items-center bg-white text-neutral-600 px-6 py-2 rounded-full border border-neutral-200 shadow-sm">
              <span className="font-medium">{currentPage + 1}</span>
              <span className="mx-2 text-neutral-400">/</span>
              <span>{totalPages}</span>
            </div>
            <Button 
              onClick={nextPage}
              variant="outline"
              size="icon"
              className="rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5 text-neutral-600" />
            </Button>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-6 text-base bg-white hover:bg-teal-50 text-teal-600 hover:text-teal-700 border border-teal-200/50 shadow-sm hover:shadow transition-all">
            Browse All Job Listings <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HighlightedJob;
