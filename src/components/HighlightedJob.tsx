
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://placehold.co/1600x900')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover top jobs from leading companies in the industry. Apply now to take the next step in your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <div key={job.id} className="fade-in-section bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-100">
              <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {job.company}
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {job.title}
              </h3>
              <p className="text-neutral-600 mb-5 line-clamp-3">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                  {job.salary}
                </span>
                <span className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                  {job.location}
                </span>
                <span className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                  {job.type}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <a href={`/company/${job.company.toLowerCase()}`} className="text-neutral-600 hover:text-teal-600 text-sm">
                  About {job.company}
                </a>
                <a href={`/job/${job.id}`} className="button-primary text-sm py-2 px-4">
                  Apply <ChevronRight className="ml-1 h-4 w-4 inline" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button 
              onClick={prevPage}
              className="p-2 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5 text-neutral-600" />
            </button>
            <div className="flex items-center text-neutral-600 px-4">
              Page {currentPage + 1} of {totalPages}
            </div>
            <button 
              onClick={nextPage}
              className="p-2 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5 text-neutral-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HighlightedJob;
