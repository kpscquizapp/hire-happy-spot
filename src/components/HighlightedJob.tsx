
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Clock, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define a type for our job listings
type JobListing = {
  id: number;
  title: string;
  company: string;
  description: string;
  salary: string;
  location: string;
  type: string;
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
      type: "Full-time"
    },
    {
      id: 2,
      title: "Senior Full Stack Developer",
      company: "Microsoft",
      description: "Help build the next generation of cloud solutions. Looking for experienced developers with React, Node.js, and Azure experience to join our growing team.",
      salary: "$130k - $160k",
      location: "Seattle / Remote",
      type: "Full-time"
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
    <section className="py-20 bg-gradient-to-br from-teal-50 to-sky-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_50%,rgba(3,179,176,0.1),transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(99,138,219,0.08),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Featured <span className="text-teal-600">Opportunities</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover top jobs from leading companies in the industry. Apply now to take the next step in your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentJobs.map((job) => (
            <div key={job.id} className="fade-in-section bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-100 transform hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
                  {job.company}
                </span>
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 leading-tight">
                {job.title}
              </h3>
              
              <p className="text-neutral-600 mb-6 line-clamp-3">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700">
                  <Briefcase className="h-4 w-4 mr-2 text-teal-500" />
                  {job.salary}
                </div>
                <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700">
                  <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                  {job.location}
                </div>
                <div className="flex items-center bg-neutral-50 px-3 py-2 rounded-lg text-sm text-neutral-700">
                  <Clock className="h-4 w-4 mr-2 text-teal-500" />
                  {job.type}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <a href={`/company/${job.company.toLowerCase()}`} className="text-neutral-600 hover:text-teal-600 transition-colors text-sm font-medium">
                  About {job.company}
                </a>
                <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                  Apply <ChevronRight className="ml-1 h-4 w-4 inline" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-3">
            <Button 
              onClick={prevPage}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5 text-neutral-600" />
            </Button>
            <div className="flex items-center bg-white text-neutral-600 px-4 py-2 rounded-full border border-neutral-200">
              Page {currentPage + 1} of {totalPages}
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
      </div>
    </section>
  );
};

export default HighlightedJob;
