import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobListings } from '@/data/jobListings';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  MapPin,
  Building2,
  ArrowRight,
  Calendar,
  Clock,
  Briefcase,
  Share2,
  Copy,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const job = jobListings.find(j => j.id === parseInt(id || '0'));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`${job?.title.en} at ${job?.company}`);
    
    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      email: `mailto:?subject=${title}&body=Check out this job: ${url}`,
    };
    
    window.open(shareUrls[platform], '_blank');
  };

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Job not found</h1>
            <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/jobs')} className="bg-primary hover:bg-primary/90">
              Browse All Jobs
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse full description into sections
  const parseDescription = (desc: string) => {
    const sections: Record<string, string[]> = {
      about: [],
      responsibilities: [],
      requirements: [],
      benefits: []
    };
    
    if (!desc) return sections;
    
    const lines = desc.split('\n').filter(line => line.trim());
    let currentSection = 'about';
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.includes('About the Role') || trimmed.includes('We Are')) {
        currentSection = 'about';
      } else if (trimmed.includes('Responsibilities') || trimmed.includes('Key Responsibilities') || trimmed.includes('You Will')) {
        currentSection = 'responsibilities';
      } else if (trimmed.includes('Requirements') || trimmed.includes('Desired Experience')) {
        currentSection = 'requirements';
      } else if (trimmed.includes('Benefits') || trimmed.includes('What We Offer')) {
        currentSection = 'benefits';
      } else if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        sections[currentSection].push(trimmed.replace(/^[-•]\s*/, ''));
      } else if (!trimmed.startsWith('#') && trimmed.length > 10) {
        if (currentSection === 'about' && sections.about.length === 0) {
          sections.about.push(trimmed);
        }
      }
    });
    
    return sections;
  };

  const descSections = parseDescription(job.fullDescription || '');

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Job Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">{job.company[0]}</span>
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    {job.title.en}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>at <span className="font-medium text-foreground">{job.company}</span></span>
                    <Badge className="bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-md">
                      {job.type.en.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white font-semibold px-8 rounded-xl shadow-lg shadow-primary/25"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Bar */}
              <div className="inline-flex items-center gap-2 text-sm bg-primary/5 text-primary px-4 py-2 rounded-lg border border-primary/20">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Location:</span>
                <span className="text-foreground">{job.location}</span>
              </div>

              {/* We Are Section */}
              <section className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-lg font-bold text-primary mb-4">We Are:</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {job.company} is a global company that provides state-of-the-art technology solutions for top brands and agencies worldwide. Our proprietary technology is powered by Deep Learning algorithms, enabling businesses to achieve outstanding results and reach their goals at every stage of the funnel. As a {job.title.en}, you will be responsible for its development.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Founded and now operating in 90+ markets, {job.company} has always been private-by-design. It embraces first-party advertising and a relentless approach to innovation. We offer end-to-end Deep Learning-powered solutions to maximize conversion, drive new customer acquisition, create engagement, and fuel long-term demand for a global base of clients.
                </p>
              </section>

              {/* You Will Section */}
              <section className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-lg font-bold text-primary mb-4">You Will:</h2>
                <ul className="space-y-3">
                  {(descSections.responsibilities.length > 0 ? descSections.responsibilities : [
                    'Designing and implementing models, most often of deep neural networks, used to predict the behavior and preferences of Internet users',
                    'Analysis of the latest works in the field of Machine Learning',
                    'Conducting and analyzing A/B tests of new solutions',
                    'Developing and testing new approaches to modeling key issues, such as bidding in first-price auctions'
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Desired Experience Section */}
              <section className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-lg font-bold text-primary mb-4">Desired Experience:</h2>
                <ul className="space-y-3">
                  {(descSections.requirements.length > 0 ? descSections.requirements : [
                    `${job.experience || '4+ years'} of hands-on experience with Machine Learning / Data Science`,
                    'Interest and willingness to constantly develop in the area of Machine Learning',
                    'Knowledge of statistics and probability',
                    'Experience in Python and PyTorch / TensorFlow',
                    'Strong analytical and problem-solving skills',
                    'Ability to work effectively in a team environment'
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What We Offer Section */}
              <section className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-lg font-bold text-primary mb-4">What We Offer:</h2>
                <ul className="space-y-3">
                  {(descSections.benefits.length > 0 ? descSections.benefits : [
                    'Competitive salary and performance-based bonuses',
                    'Opportunity to work on state-of-the-art Deep Learning technology',
                    'Flexible working hours and remote work options',
                    'Private healthcare and multisport card',
                    'Modern office in the city center with great amenities'
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Location Card */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                  <p className="font-semibold text-foreground">{job.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">India</p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex flex-wrap gap-2 justify-center">
                  {job.skills?.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="px-4 py-2 text-sm bg-background hover:bg-primary/5 hover:border-primary/30 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {job.industry && (
                    <Badge 
                      variant="outline"
                      className="px-4 py-2 text-sm bg-primary/5 border-primary/20 text-primary"
                    >
                      {job.industry}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Job Overview */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="text-base font-bold text-foreground mb-5 text-center">Job Overview</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">JOB POSTED</p>
                    <p className="text-sm font-semibold text-foreground">2 mo ago</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">JOB EXPIRES</p>
                    <p className="text-sm font-semibold text-foreground">—</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Briefcase className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">JOB TYPE</p>
                    <p className="text-sm font-semibold text-foreground">{job.type.en}</p>
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="bg-gradient-to-br from-primary to-violet-600 rounded-2xl p-6 text-white">
                <h3 className="text-sm font-medium opacity-90 mb-1">Salary Range</h3>
                <p className="text-2xl font-bold">₹{job.salary}</p>
                <p className="text-sm opacity-75 mt-1">Per Annum</p>
              </div>

              {/* Share This Job */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="text-base font-bold text-foreground mb-4 text-center">Share This Job:</h3>
                
                {/* Copy Link */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
                  <input 
                    type="text" 
                    value={window.location.href}
                    readOnly
                    className="flex-1 text-xs bg-transparent text-muted-foreground truncate outline-none"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                    title="Copy link"
                  >
                    <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : 'text-muted-foreground'}`} />
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="flex justify-center gap-3">
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="w-10 h-10 bg-[#0077b5] hover:bg-[#0077b5]/90 rounded-lg flex items-center justify-center transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-white" />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 bg-[#1da1f2] hover:bg-[#1da1f2]/90 rounded-lg flex items-center justify-center transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5 text-white" />
                  </button>
                  <button 
                    onClick={() => handleShare('email')}
                    className="w-10 h-10 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center transition-colors"
                    title="Share via Email"
                  >
                    <Mail className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-xl flex items-center justify-center border border-primary/20">
                    <span className="text-xl font-bold text-primary">{job.company[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{job.company}</h3>
                    <p className="text-xs text-muted-foreground">{job.industry || 'Technology'}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {job.company} is a leading technology company committed to innovation and excellence, creating cutting-edge solutions that transform businesses.
                </p>
                <Button variant="outline" className="w-full rounded-xl">
                  View Company Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetails;
