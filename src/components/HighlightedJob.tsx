
import React from 'react';
import { ChevronRight } from 'lucide-react';

const HighlightedJob = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://placehold.co/1600x900')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-section">
            <div className="max-w-lg">
              <span className="inline-block bg-blue-50 text-blue px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Opportunity
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Senior Product Designer at Infosys
              </h2>
              <p className="text-neutral-600 mb-6">
                Join our team to create innovative solutions that impact millions of users worldwide. We're looking for a creative mind who can turn complex problems into elegant designs.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                  $120k - $150k
                </span>
                <span className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                  Remote / San Francisco
                </span>
                <span className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                  Full-time
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="/about" className="button-secondary">
                  More About Us
                </a>
                <a href="/apply" className="button-primary">
                  Apply Now <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="fade-in-section">
            <div className="glass-card overflow-hidden rounded-2xl aspect-video">
              <img
                src="https://placehold.co/800x500?text=Collaborative+Team"
                alt="Collaborative team at work"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightedJob;
