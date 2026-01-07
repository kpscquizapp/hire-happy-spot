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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';
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
  ArrowLeft,
  DollarSign,
  Clock,
  Globe,
  Star,
  Download,
  Award,
  Monitor,
  Heart,
  Eye,
  Building2,
  CheckCircle2,
  Users
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Basic Information', icon: FileText, color: 'primary' },
  { id: 2, title: 'Skills & Experience', icon: Briefcase, color: 'amber' },
  { id: 3, title: 'Location & Terms', icon: MapPin, color: 'blue' },
  { id: 4, title: 'Budget & Duration', icon: Wallet, color: 'green' },
];

interface Candidate {
  id: number;
  name: string;
  title: string;
  avatar: string;
  profileType: 'bench' | 'contract';
  matchPercentage: number;
  topMatch: boolean;
  hourlyRate: string;
  availability: string;
  location: string;
  experience: string;
  language: string;
  skills: string[];
  certifications: { name: string; issueDate: string }[];
  about: string;
  workHistory: { role: string; company: string; period: string; location: string; bullets: string[] }[];
  projects: { name: string; tech: string; icon: string }[];
  aiScores: { technical: number; communication: number; problemSolving: number };
}

const FindTalent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [view, setView] = useState<'form' | 'results'>('form');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobCategory: '',
    numberOfOpenings: '1',
    requiredSkills: [] as string[],
    experienceLevel: '',
    certifications: '',
    workMode: '',
    location: '',
    openToBench: true,
    duration: '',
    durationUnit: 'Month',
    startDate: '',
    paymentType: '',
    budgetMin: '',
    budgetMax: '',
  });

  const [skillInput, setSkillInput] = useState('');

  // Mock candidates data
  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'Amit Sharma',
      title: 'Senior React Native Developer',
      avatar: 'amit',
      profileType: 'bench',
      matchPercentage: 98,
      topMatch: true,
      hourlyRate: '$25 - $35',
      availability: 'Immediate',
      location: 'Bangalore, India',
      experience: '5.5 Years',
      language: 'Professional',
      skills: ['React Native', 'TypeScript', 'Redux', 'Node.js', 'GraphQL', 'Jest', 'Firebase'],
      certifications: [
        { name: 'Meta React Native', issueDate: 'Issued 2023' },
        { name: 'AWS Certified Dev', issueDate: 'Issued 2022' }
      ],
      about: 'Senior React Native Developer with over 5 years of experience building high-performance mobile applications for both iOS and Android. Proven track record of delivering scalable solutions for FinTech and E-commerce domains. Currently on bench at Infosys and available for immediate contract deployment.\n\nProficient in TypeScript, Redux Toolkit, and integrating native modules. Experienced in working with agile teams and mentoring junior developers.',
      workHistory: [
        {
          role: 'Senior Systems Engineer',
          company: 'Infosys Ltd.',
          period: 'Jan 2022 - Present',
          location: 'Bangalore',
          bullets: [
            'Led the mobile development team for a major US banking client app.',
            'Optimized app startup time by 40% using Hermes engine.',
            'Managed a team of 5 developers and handled code reviews.'
          ]
        },
        {
          role: 'Software Developer',
          company: 'TechMahindra',
          period: 'Jun 2019 - Dec 2021',
          location: 'Hyderabad',
          bullets: [
            'Developed cross-platform mobile apps for retail customers.',
            'Integrated payment gateways and third-party analytics tools.',
            'Worked closely with UX designers to implement pixel-perfect UI.'
          ]
        }
      ],
      projects: [
        { name: 'FinPay Wallet App', tech: 'React Native, Redux, Node.js', icon: 'wallet' },
        { name: 'ShopEase E-commerce', tech: 'React Native, Firebase, Stripe', icon: 'shopping' }
      ],
      aiScores: { technical: 9.5, communication: 8.8, problemSolving: 9.2 }
    },
    {
      id: 2,
      name: 'Priya Patel',
      title: 'Full Stack Developer',
      avatar: 'priya',
      profileType: 'contract',
      matchPercentage: 92,
      topMatch: true,
      hourlyRate: '$30 - $40',
      availability: 'Within 15 Days',
      location: 'Mumbai, India',
      experience: '4 Years',
      language: 'Professional',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
      certifications: [
        { name: 'AWS Solutions Architect', issueDate: 'Issued 2023' }
      ],
      about: 'Full Stack Developer with 4 years of experience in building scalable web applications. Expert in React, Node.js, and cloud technologies.',
      workHistory: [
        {
          role: 'Senior Developer',
          company: 'Wipro Technologies',
          period: 'Mar 2021 - Present',
          location: 'Mumbai',
          bullets: ['Built microservices architecture for e-commerce platform.', 'Reduced API response time by 60%.']
        }
      ],
      projects: [
        { name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', icon: 'shopping' }
      ],
      aiScores: { technical: 9.0, communication: 8.5, problemSolving: 8.8 }
    },
    {
      id: 3,
      name: 'Rahul Verma',
      title: 'React Native Developer',
      avatar: 'rahul',
      profileType: 'bench',
      matchPercentage: 88,
      topMatch: false,
      hourlyRate: '$20 - $30',
      availability: 'Immediate',
      location: 'Delhi, India',
      experience: '3 Years',
      language: 'Professional',
      skills: ['React Native', 'JavaScript', 'Redux', 'Firebase', 'REST APIs'],
      certifications: [],
      about: 'React Native developer with 3 years of experience building mobile apps for startups and enterprises.',
      workHistory: [
        {
          role: 'Mobile Developer',
          company: 'Startup Labs',
          period: 'Jan 2021 - Present',
          location: 'Delhi',
          bullets: ['Developed 10+ mobile applications.', 'Integrated push notifications and analytics.']
        }
      ],
      projects: [
        { name: 'Food Delivery App', tech: 'React Native, Firebase', icon: 'food' }
      ],
      aiScores: { technical: 8.5, communication: 8.0, problemSolving: 8.2 }
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      title: 'Mobile App Developer',
      avatar: 'sneha',
      profileType: 'contract',
      matchPercentage: 85,
      topMatch: false,
      hourlyRate: '$25 - $35',
      availability: 'Within 30 Days',
      location: 'Hyderabad, India',
      experience: '4.5 Years',
      language: 'Professional',
      skills: ['React Native', 'Flutter', 'Dart', 'Swift', 'Kotlin'],
      certifications: [
        { name: 'Google Flutter Certified', issueDate: 'Issued 2023' }
      ],
      about: 'Cross-platform mobile developer proficient in React Native and Flutter with experience in native iOS and Android development.',
      workHistory: [
        {
          role: 'Lead Mobile Developer',
          company: 'Cognizant',
          period: 'Jun 2020 - Present',
          location: 'Hyderabad',
          bullets: ['Led mobile team for healthcare client.', 'Published 5 apps to App Store and Play Store.']
        }
      ],
      projects: [
        { name: 'Healthcare App', tech: 'React Native, HealthKit', icon: 'health' }
      ],
      aiScores: { technical: 8.8, communication: 9.0, problemSolving: 8.5 }
    },
    {
      id: 5,
      name: 'Vikram Singh',
      title: 'Senior Mobile Engineer',
      avatar: 'vikram',
      profileType: 'bench',
      matchPercentage: 82,
      topMatch: false,
      hourlyRate: '$35 - $45',
      availability: 'Immediate',
      location: 'Pune, India',
      experience: '6 Years',
      language: 'Professional',
      skills: ['React Native', 'iOS', 'Swift', 'Objective-C', 'CI/CD'],
      certifications: [
        { name: 'Apple Certified Developer', issueDate: 'Issued 2021' }
      ],
      about: 'Senior mobile engineer with 6 years of experience in building enterprise-grade mobile applications.',
      workHistory: [
        {
          role: 'Principal Engineer',
          company: 'HCL Technologies',
          period: 'Apr 2019 - Present',
          location: 'Pune',
          bullets: ['Architected mobile solutions for Fortune 500 clients.', 'Set up mobile DevOps pipeline.']
        }
      ],
      projects: [
        { name: 'Banking App', tech: 'React Native, Swift', icon: 'bank' }
      ],
      aiScores: { technical: 9.2, communication: 8.3, problemSolving: 8.7 }
    },
    {
      id: 6,
      name: 'Kavitha Nair',
      title: 'React Developer',
      avatar: 'kavitha',
      profileType: 'contract',
      matchPercentage: 75,
      topMatch: false,
      hourlyRate: '$20 - $28',
      availability: 'Within 15 Days',
      location: 'Chennai, India',
      experience: '2.5 Years',
      language: 'Professional',
      skills: ['React', 'React Native', 'JavaScript', 'CSS', 'Git'],
      certifications: [],
      about: 'Frontend developer transitioning to mobile development with strong React fundamentals.',
      workHistory: [
        {
          role: 'Frontend Developer',
          company: 'TCS',
          period: 'Jan 2022 - Present',
          location: 'Chennai',
          bullets: ['Built responsive web applications.', 'Learning React Native for mobile projects.']
        }
      ],
      projects: [
        { name: 'Dashboard App', tech: 'React, Chart.js', icon: 'chart' }
      ],
      aiScores: { technical: 7.5, communication: 8.2, problemSolving: 7.8 }
    }
  ];

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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
        if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required';
        break;
      case 2:
        if (formData.requiredSkills.length === 0) newErrors.requiredSkills = 'At least one skill is required';
        break;
      case 3:
        if (!formData.workMode) newErrors.workMode = 'Work mode is required';
        break;
      case 4:
        // Budget step is optional
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePostJob = () => {
    if (!validateStep(currentStep)) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    // Simulate AI matching
    setTimeout(() => {
      setIsLoading(false);
      setView('results');
      toast.success('Job posted successfully! Showing matched candidates.');
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (score >= 70) return 'text-amber-600 bg-amber-100 border-amber-200';
    return 'text-red-600 bg-red-100 border-red-200';
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
                      className={`pr-10 ${errors.jobTitle ? 'border-destructive' : ''}`}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-primary hover:bg-primary/10"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.jobTitle && <p className="text-xs text-destructive mt-1">{errors.jobTitle}</p>}
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
                    className={`mt-1.5 min-h-[120px] ${errors.jobDescription ? 'border-destructive' : ''}`}
                  />
                  {errors.jobDescription && <p className="text-xs text-destructive mt-1">{errors.jobDescription}</p>}
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
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="openings" className="text-sm font-medium">Number of Openings</Label>
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
                  Next <ChevronRight className="h-4 w-4" />
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
                        <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeSkill(skill)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add skill..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); } }}
                      className={errors.requiredSkills ? 'border-destructive' : ''}
                    />
                    <Button type="button" variant="outline" onClick={() => addSkill(skillInput)}>Add</Button>
                  </div>
                  {errors.requiredSkills && <p className="text-xs text-destructive mt-1">{errors.requiredSkills}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Experience Level</Label>
                    <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Mid-Senior (3-5 Years)" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 Years)</SelectItem>
                        <SelectItem value="mid">Mid-Senior (3-5 Years)</SelectItem>
                        <SelectItem value="senior">Senior (5-8 Years)</SelectItem>
                        <SelectItem value="lead">Lead (8+ Years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="certifications" className="text-sm font-medium">Certifications (Optional)</Label>
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
                <Button variant="outline" onClick={prevStep} className="gap-2"><ChevronLeft className="h-4 w-4" /> Previous</Button>
                <Button onClick={nextStep} className="gap-2">Next <ChevronRight className="h-4 w-4" /></Button>
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
                    <Label className="text-sm font-medium">Work Mode <span className="text-destructive">*</span></Label>
                    <Select value={formData.workMode} onValueChange={(value) => setFormData(prev => ({ ...prev, workMode: value }))}>
                      <SelectTrigger className={`mt-1.5 ${errors.workMode ? 'border-destructive' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.workMode && <p className="text-xs text-destructive mt-1">{errors.workMode}</p>}
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <div className="relative mt-1.5">
                      <Input id="location" placeholder="Bangalore, India" value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} className="pr-10" />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div>
                    <p className="font-medium text-sm text-foreground">Open to Bench Resources</p>
                    <p className="text-xs text-muted-foreground">Allow agencies and companies to propose their bench employees</p>
                  </div>
                  <Switch checked={formData.openToBench} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, openToBench: checked }))} />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep} className="gap-2"><ChevronLeft className="h-4 w-4" /> Previous</Button>
                <Button onClick={nextStep} className="gap-2">Next <ChevronRight className="h-4 w-4" /></Button>
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
                      <Input type="number" min="1" placeholder="3" value={formData.duration} onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))} className="w-20" />
                      <Select value={formData.durationUnit} onValueChange={(value) => setFormData(prev => ({ ...prev, durationUnit: value }))}>
                        <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
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
                      <Input type="date" value={formData.startDate} onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))} className="pr-10" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Payment Type</Label>
                    <Select value={formData.paymentType} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentType: value }))}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Hourly Rate" /></SelectTrigger>
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
                      <Input placeholder="Min" value={formData.budgetMin} onChange={(e) => setFormData(prev => ({ ...prev, budgetMin: e.target.value }))} />
                      <span className="flex items-center text-muted-foreground">-</span>
                      <Input placeholder="Max" value={formData.budgetMax} onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: e.target.value }))} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep} className="gap-2"><ChevronLeft className="h-4 w-4" /> Previous</Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  // Results View
  if (view === 'results') {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        
        <main className="flex-1 pt-20">
          <div className="bg-background border-b">
            <div className="container mx-auto px-4 py-6">
              <Button variant="ghost" className="gap-2 mb-4 -ml-2" onClick={() => setView('form')}>
                <ArrowLeft className="h-4 w-4" /> Back to Job Posting
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Matched Candidates for: {formData.jobTitle || 'Your Job'}</h1>
                  <p className="text-muted-foreground">AI-matched profiles based on your job requirements</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">{candidates.length}</span> candidates found</p>
              <Select defaultValue="match">
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Highest Match Score</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="rate">Lowest Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {candidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCandidate(candidate)}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.avatar}`} />
                        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                              {candidate.topMatch && <Badge className="bg-green-100 text-green-700 border-green-200">⭐ Top 5% Match</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{candidate.title}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{candidate.hourlyRate}/hr</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{candidate.availability}</span>
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{candidate.location}</span>
                              <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{candidate.experience}</span>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className={`inline-flex items-center justify-center h-14 w-14 rounded-full border-2 ${getScoreColor(candidate.matchPercentage)}`}>
                              <span className="font-bold text-lg">{candidate.matchPercentage}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">AI Match</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {candidate.skills.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                          {candidate.skills.length > 5 && <Badge variant="outline" className="text-xs">+{candidate.skills.length - 5}</Badge>}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <Badge variant="outline" className={candidate.profileType === 'bench' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}>
                            {candidate.profileType === 'bench' ? <><Building2 className="h-3 w-3 mr-1" /> Bench Resource</> : <><Briefcase className="h-3 w-3 mr-1" /> Contract Resource</>}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedCandidate(candidate); }}><Eye className="h-4 w-4 mr-1" /> View Profile</Button>
                            <Button size="sm"><Heart className="h-4 w-4 mr-1" /> Shortlist</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <Footer />

        {/* Candidate Profile Sheet - Simple View */}
        <Sheet open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
            {selectedCandidate && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCandidate.avatar}`} />
                    <AvatarFallback className="text-xl">{selectedCandidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground">{selectedCandidate.name}</h2>
                    <p className="text-muted-foreground">{selectedCandidate.title}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className={selectedCandidate.profileType === 'bench' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>
                        {selectedCandidate.profileType === 'bench' ? 'Bench Resource' : 'Contract'}
                      </Badge>
                      {selectedCandidate.topMatch && <Badge className="bg-green-100 text-green-700">⭐ Top 5% Match</Badge>}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 ${getScoreColor(selectedCandidate.matchPercentage)}`}>
                      <span className="text-lg font-bold">{selectedCandidate.matchPercentage}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">AI Match</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{selectedCandidate.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{selectedCandidate.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedCandidate.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{selectedCandidate.experience}</span>
                  </div>
                </div>

                {/* AI Scores */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-3">AI Assessment Scores</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{selectedCandidate.aiScores.technical}</p>
                        <p className="text-xs text-muted-foreground">Technical</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{selectedCandidate.aiScores.communication}</p>
                        <p className="text-xs text-muted-foreground">Communication</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{selectedCandidate.aiScores.problemSolving}</p>
                        <p className="text-xs text-muted-foreground">Problem Solving</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* About */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">{selectedCandidate.about}</p>
                </div>

                {/* Work Experience */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Experience</h4>
                  <div className="space-y-3">
                    {selectedCandidate.workHistory.map((work, i) => (
                      <div key={i} className="border-l-2 border-primary/30 pl-3">
                        <h5 className="font-medium text-foreground">{work.role}</h5>
                        <p className="text-sm text-primary">{work.company}</p>
                        <p className="text-xs text-muted-foreground">{work.period}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {selectedCandidate.certifications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Certifications</h4>
                    <div className="space-y-2">
                      {selectedCandidate.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">{cert.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1">Book Interview</Button>
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Shortlist
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Form View
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1"><ArrowLeft className="h-4 w-4" /> Jobs</Button>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium">New Posting</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary/10">
                <Sparkles className="h-4 w-4" /> Contract Mode Enabled
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Post a Contract Opportunity</h1>
            <p className="text-muted-foreground">Fill in the details to find the perfect freelancer or bench talent for your project.</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => { if (validateStep(currentStep) || step.id < currentStep) setCurrentStep(step.id); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${currentStep === step.id ? 'bg-primary/10 text-primary' : currentStep > step.id ? 'text-primary/70' : 'text-muted-foreground'}`}
                >
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep === step.id ? 'bg-primary text-white' : currentStep > step.id ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {currentStep > step.id ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                  </div>
                  <span className="text-sm font-medium hidden md:inline">{step.title}</span>
                </button>
                {index < STEPS.length - 1 && <div className={`h-0.5 w-8 ${currentStep > step.id ? 'bg-primary/40' : 'bg-muted'}`} />}
              </React.Fragment>
            ))}
          </div>

          {renderStepContent()}

          {/* Action Buttons - Above Footer */}
          <div className="flex items-center justify-center gap-3 mt-8 mb-8">
            <Button variant="outline">Save Draft</Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Post Job Only</Button>
            <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={handlePostJob} disabled={isLoading}>
              {isLoading ? <><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Finding Matches...</> : <><Sparkles className="h-4 w-4" /> Post & Show Relevant Profiles</>}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindTalent;
