import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobListings } from '@/data/jobListings';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Building2,
  Briefcase,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const job = jobListings.find(j => j.id === parseInt(id || '0'));

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Job not found</h1>
            <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>

          {/* Job Header Card */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-10 w-10 text-teal-700" />
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        {job.title.en}
                      </h1>
                      <div className="flex items-center gap-2 text-lg text-neutral-600">
                        <Building2 className="h-5 w-5" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>
                    {job.featured && (
                      <Badge className="bg-teal-600">Featured</Badge>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type.en}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.experience || 'Not specified'}</span>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-teal-600">
                      ₹{job.salary} LPA
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Apply Now
                </Button>
                <Button size="lg" variant="outline">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Save
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skills Required */}
              {job.skills && job.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Required Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="px-4 py-2 text-sm bg-teal-50 text-teal-700 border-teal-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-neutral-700">
                    {job.fullDescription || job.description.en}
                    
                    {!job.fullDescription && (
                      <>
                        <h3 className="text-lg font-semibold mt-6 mb-3">Responsibilities:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Design, develop, and maintain high-quality software solutions</li>
                          <li>Collaborate with cross-functional teams to define and implement new features</li>
                          <li>Write clean, maintainable, and efficient code</li>
                          <li>Participate in code reviews and provide constructive feedback</li>
                          <li>Stay updated with emerging technologies and industry trends</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Requirements:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Bachelor's degree in Computer Science or related field</li>
                          <li>Strong problem-solving and analytical skills</li>
                          <li>Excellent communication and teamwork abilities</li>
                          <li>Experience with Agile development methodologies</li>
                          <li>Passion for learning and continuous improvement</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Benefits:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Competitive salary and performance bonuses</li>
                          <li>Health insurance and wellness programs</li>
                          <li>Flexible working hours and remote work options</li>
                          <li>Professional development opportunities</li>
                          <li>Collaborative and inclusive work environment</li>
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Job Type</div>
                    <div className="font-medium">{job.type.en}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Experience</div>
                    <div className="font-medium">{job.experience || 'Not specified'}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Location</div>
                    <div className="font-medium">{job.location}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Industry</div>
                    <div className="font-medium">{job.industry || 'IT & Software'}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Posted</div>
                    <div className="font-medium">2 days ago</div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>About {job.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-teal-700" />
                    </div>
                    <p className="text-sm text-neutral-600">
                      {job.company} is a leading technology company committed to innovation and excellence.
                      We create cutting-edge solutions that transform businesses and empower people.
                    </p>
                    <Button variant="outline" className="w-full">
                      View Company Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetails;
