import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Briefcase,
  Settings,
  Eye,
  CheckCircle,
  X,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Save,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Job Details', icon: FileText },
  { id: 2, title: 'Skills & Requirements', icon: Briefcase },
  { id: 3, title: 'Hiring Preferences', icon: Settings },
  { id: 4, title: 'Review & Publish', icon: Eye },
];

const PostJob = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript']);
  const [skillInput, setSkillInput] = useState('');
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
  });

  const jdScore = 75; // Mock JD quality score

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    toast.success('Job posted successfully! Redirecting to dashboard...');
    setTimeout(() => {
      navigate('/employer-dashboard');
    }, 1500);
  };

  const suggestedSkills = ['Node.js', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL'];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Post a Job</h1>
          <p className="text-neutral-600">Create a compelling job listing to attract top talent</p>
        </div>
        <Button variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex items-center gap-2 ${
                currentStep >= step.id ? 'text-teal-600' : 'text-neutral-400'
              }`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentStep >= step.id 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span className="font-medium text-sm hidden md:inline">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-1 mx-2 rounded ${
                  currentStep > step.id ? 'bg-teal-500' : 'bg-neutral-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {/* Step 1: Job Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Senior Frontend Developer"
                      value={jobData.title}
                      onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi NCR</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fulltime">Full-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="intern">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Experience Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                          <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                          <SelectItem value="lead">Lead (8+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Job Description</Label>
                    <Textarea 
                      placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                      rows={6}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Skills */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Required Skills</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a skill..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} className="bg-teal-600 hover:bg-teal-700">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="px-3 py-1 bg-teal-100 text-teal-700"
                        >
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="ml-2">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-teal-600" />
                      <span className="font-medium text-teal-800">AI Suggested Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill) => (
                        <Badge 
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-teal-100 border-teal-300"
                          onClick={() => !skills.includes(skill) && setSkills([...skills, skill])}
                        >
                          + {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Requirements</Label>
                    <Textarea 
                      placeholder="List the requirements for this position..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Nice to Have</Label>
                    <Textarea 
                      placeholder="Additional skills or experience that would be beneficial..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Salary Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5-10">₹5-10 LPA</SelectItem>
                          <SelectItem value="10-20">₹10-20 LPA</SelectItem>
                          <SelectItem value="20-35">₹20-35 LPA</SelectItem>
                          <SelectItem value="35+">₹35+ LPA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Application Deadline</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Enable AI Features</Label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                        <input type="checkbox" className="w-4 h-4 text-teal-600" defaultChecked />
                        <div>
                          <p className="font-medium text-sm">AI Resume Screening</p>
                          <p className="text-xs text-neutral-500">Automatically screen and rank candidates</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                        <input type="checkbox" className="w-4 h-4 text-teal-600" />
                        <div>
                          <p className="font-medium text-sm">Video Screening</p>
                          <p className="text-xs text-neutral-500">Include AI-powered video interviews</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Ready to publish!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Your job listing looks great. Review the details below before publishing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-navy-800 mb-2">Senior Frontend Developer</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-neutral-600">
                        <span>Engineering</span>
                        <span>•</span>
                        <span>Bangalore</span>
                        <span>•</span>
                        <span>Full-time</span>
                        <span>•</span>
                        <span>5-8 years</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} className="bg-teal-100 text-teal-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="bg-navy-800 hover:bg-navy-900">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handlePublish} className="bg-teal-600 hover:bg-teal-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Publish Job
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* JD Quality Score */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                JD Quality Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                  <span className="text-3xl font-bold text-white">{jdScore}</span>
                </div>
                <p className="mt-2 font-medium text-neutral-700">Average</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Clear job title</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Skills specified</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span>Add more details about role</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span>Include benefits & perks</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-teal-50 border-teal-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <p className="font-medium text-teal-800 text-sm">Pro Tip</p>
                  <p className="text-xs text-teal-700 mt-1">
                    Jobs with detailed descriptions receive 40% more qualified applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
