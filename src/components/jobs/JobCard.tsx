
import React from 'react';
import { ChevronRight, Clock, MapPin, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { JobListing } from '@/types/job';

interface JobCardProps {
  job: JobListing;
}

const JobCard = ({ job }: JobCardProps) => {
  const { language, translations } = useLanguage();

  return (
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
                {translations.featured[language]}
              </span>
            )}
          </div>
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
          {job.title[language]}
        </h3>
        
        <p className="text-neutral-600 mb-6 line-clamp-3 flex-grow">
          {job.description[language]}
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
            {job.type[language]}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-100">
          <a href={`/company/${job.company.toLowerCase()}`} className="text-neutral-600 hover:text-teal-600 transition-colors text-sm font-medium">
            {translations.aboutCompany[language]} {job.company}
          </a>
          <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
            {translations.apply[language]} <ChevronRight className="ml-1 h-4 w-4 inline" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
