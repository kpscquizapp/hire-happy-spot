import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
  MapPin, 
  Wallet,
  X,
  Sparkles,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowLeft
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Basic Information', icon: FileText, color: 'primary' },
  { id: 2, title: 'Skills & Experience', icon: Briefcase, color: 'amber' },
  { id: 3, title: 'Location & Terms', icon: MapPin, color: 'blue' },
  { id: 4, title: 'Budget & Duration', icon: Wallet, color: 'green' },
];

const FindTalent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Basic Information
    jobTitle: '',
    jobDescription: '',
    jobCategory: '',
    numberOfOpenings: '1',
    // Skills & Experience
    requiredSkills: [] as string[],
    experienceLevel: '',
    certifications: '',
    // Location & Terms
    workMode: '',
    location: '',
    openToBench: true,
    // Budget & Duration
    duration: '',
    durationUnit: 'Month',
    startDate: '',
    paymentType: '',
    budgetMin: '',
    budgetMax: '',
  });

  const [skillInput, setSkillInput] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (action: 'draft' | 'post' | 'postAndShow') => {
    console.log('Form submitted:', { action, formData });
    if (action === 'postAndShow') {
      // Navigate to results or show profiles
      navigate('/employer-dashboard/talent-marketplace');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Basic Information</h3>
                  <p className="text-xs text-muted-foreground">Define the core requirements of the role</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="jobTitle" className="text-sm font-medium">
                    Job Title <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="jobTitle"
                      placeholder="e.g. Senior React Native Developer (Contract)"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-primary hover:bg-primary/10"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="jobDescription" className="text-sm font-medium">
                    Job Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Describe the project scope, deliverables, and expectations..."
                    value={formData.jobDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Job Category</Label>
                    <Select
                      value={formData.jobCategory}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, jobCategory: value }))}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="openings" className="text-sm font-medium">
                      Number of Openings
                    </Label>
                    <Input
                      id="openings"
                      type="number"
                      min="1"
                      value={formData.numberOfOpenings}
                      onChange={(e) => setFormData(prev => ({ ...prev, numberOfOpenings: e.target.value }))}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={nextStep} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Skills & Experience</h3>
                  <p className="text-xs text-muted-foreground">What technologies should the candidate know?</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="text-sm font-medium">
                    Required Skills <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-2">
                    {formData.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1.5">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add skill..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => addSkill(skillInput)}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Experience Level</Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Mid-Senior (3-5 Years)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 Years)</SelectItem>
                        <SelectItem value="mid">Mid-Senior (3-5 Years)</SelectItem>
                        <SelectItem value="senior">Senior (5-8 Years)</SelectItem>
                        <SelectItem value="lead">Lead (8+ Years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="certifications" className="text-sm font-medium">
                      Certifications (Optional)
                    </Label>
                    <Input
                      id="certifications"
                      placeholder="e.g. AWS Certified"
                      value={formData.certifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={nextStep} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location & Terms</h3>
                  <p className="text-xs text-muted-foreground">Where will the candidate work?</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Work Mode</Label>
                    <Select
                      value={formData.workMode}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, workMode: value }))}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Remote" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="location"
                        placeholder="Bangalore, India"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="pr-10"
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div>
                    <p className="font-medium text-sm text-foreground">Open to Bench Resources</p>
                    <p className="text-xs text-muted-foreground">Allow agencies and companies to propose their bench employees</p>
                  </div>
                  <Switch 
                    checked={formData.openToBench}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, openToBench: checked }))}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={nextStep} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Budget & Duration</h3>
                  <p className="text-xs text-muted-foreground">Set your financial limits for this contract</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Duration</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        type="number"
                        min="1"
                        placeholder="3"
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-20"
                      />
                      <Select
                        value={formData.durationUnit}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, durationUnit: value }))}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Week">Week</SelectItem>
                          <SelectItem value="Month">Month</SelectItem>
                          <SelectItem value="Year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Start Date</Label>
                    <div className="relative mt-1.5">
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Payment Type</Label>
                    <Select
                      value={formData.paymentType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, paymentType: value }))}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Hourly Rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="monthly">Monthly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Budget Range (INR)</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        placeholder="Min"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData(prev => ({ ...prev, budgetMin: e.target.value }))}
                      />
                      <span className="flex items-center text-muted-foreground">-</span>
                      <Input
                        placeholder="Max"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 pt-20 pb-24">
        {/* Page Header */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Jobs
                </Button>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium">New Posting</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary/10">
                <Sparkles className="h-4 w-4" />
                Contract Mode Enabled
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Post a Contract Opportunity</h1>
            <p className="text-muted-foreground">
              Fill in the details to find the perfect freelancer or bench talent for your project.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    currentStep === step.id 
                      ? 'bg-primary/10 text-primary' 
                      : currentStep > step.id 
                        ? 'text-primary/70'
                        : 'text-muted-foreground'
                  }`}
                >
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep === step.id 
                      ? 'bg-primary text-white' 
                      : currentStep > step.id
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.id}
                  </div>
                  <span className="text-sm font-medium hidden md:inline">{step.title}</span>
                </button>
                {index < STEPS.length - 1 && (
                  <div className={`h-0.5 w-8 ${currentStep > step.id ? 'bg-primary/40' : 'bg-muted'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          {renderStepContent()}
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-4 z-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSubmit('draft')}
            >
              Save Draft
            </Button>
            <Button 
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => handleSubmit('post')}
            >
              Post Job Only
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 gap-2"
              onClick={() => handleSubmit('postAndShow')}
            >
              <Sparkles className="h-4 w-4" />
              Post & Show Relevant Profiles
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindTalent;
