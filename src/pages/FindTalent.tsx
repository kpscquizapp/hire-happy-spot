import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PostContractModal from '@/components/PostContractModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Bot,
  Sparkles,
  ArrowLeft,
  Filter,
  SlidersHorizontal,
  User,
  Clock,
  DollarSign,
  MapPin,
  Briefcase,
  Building2,
  Star,
  Heart,
  Eye,
  ChevronDown,
  RotateCcw,
  Plus,
  X
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AIProfile {
  id: number;
  name: string;
  matchScore: number;
  skills: string[];
  experience: number;
  rate: number;
  profileType: 'bench' | 'contract';
  availability: 'immediate' | 'within30';
  location: string;
  avatar: string;
}

const FindTalent = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'posting' | 'results'>('posting');
  const [showContractModal, setShowContractModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Job posting form state
  const [jobData, setJobData] = useState({
    title: 'Senior React Developer',
    description: 'We are looking for an experienced React developer to join our team. The ideal candidate will have strong experience with React, Redux, TypeScript, and modern frontend development practices. You will be working on building scalable web applications and collaborating with cross-functional teams.',
    skills: ['React', 'Redux', 'TypeScript', 'Node.js', 'REST APIs'],
    experience: '5-8 years',
    location: 'Remote / Bangalore',
    budget: '$40/hr - $60/hr'
  });

  const [skillInput, setSkillInput] = useState('');
  
  // Filter state
  const [filters, setFilters] = useState({
    experienceRange: [2, 10],
    rateRange: [30, 70],
    profileTypes: { contract: true, bench: true },
    availability: 'all',
    location: 'all'
  });

  const [sortBy, setSortBy] = useState('matchScore');

  // Mock AI-matched profiles
  const aiProfiles: AIProfile[] = [
    { id: 1, name: 'Arjun Mehta', matchScore: 92, skills: ['React', 'Redux', 'TypeScript', 'Node.js'], experience: 6, rate: 45, profileType: 'bench', availability: 'immediate', location: 'Bangalore', avatar: 'arjun' },
    { id: 2, name: 'Priya Sharma', matchScore: 88, skills: ['React', 'Next.js', 'GraphQL', 'AWS'], experience: 7, rate: 55, profileType: 'contract', availability: 'immediate', location: 'Mumbai', avatar: 'priya' },
    { id: 3, name: 'Rohan Verma', matchScore: 85, skills: ['React', 'Redux', 'Python', 'Django'], experience: 5, rate: 40, profileType: 'bench', availability: 'within30', location: 'Delhi', avatar: 'rohan' },
    { id: 4, name: 'Ananya Reddy', matchScore: 82, skills: ['React', 'Vue.js', 'TypeScript', 'Firebase'], experience: 4, rate: 35, profileType: 'contract', availability: 'immediate', location: 'Hyderabad', avatar: 'ananya' },
    { id: 5, name: 'Vikram Singh', matchScore: 78, skills: ['React', 'Angular', 'Node.js', 'MongoDB'], experience: 8, rate: 60, profileType: 'bench', availability: 'within30', location: 'Pune', avatar: 'vikram' },
    { id: 6, name: 'Kavya Nair', matchScore: 75, skills: ['React', 'Redux', 'Jest', 'Cypress'], experience: 3, rate: 32, profileType: 'contract', availability: 'immediate', location: 'Chennai', avatar: 'kavya' },
    { id: 7, name: 'Rahul Gupta', matchScore: 68, skills: ['React', 'Svelte', 'Tailwind', 'PostgreSQL'], experience: 5, rate: 42, profileType: 'bench', availability: 'immediate', location: 'Kolkata', avatar: 'rahul' },
    { id: 8, name: 'Sneha Patel', matchScore: 55, skills: ['React', 'Bootstrap', 'jQuery', 'PHP'], experience: 4, rate: 30, profileType: 'contract', availability: 'within30', location: 'Ahmedabad', avatar: 'sneha' },
  ];

  const [shortlisted, setShortlisted] = useState<number[]>([]);

  const addSkill = (skill: string) => {
    if (skill && !jobData.skills.includes(skill)) {
      setJobData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setJobData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleShowProfiles = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setView('results');
    }, 1500);
  };

  const toggleShortlist = (id: number) => {
    setShortlisted(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Filter and sort profiles
  const filteredProfiles = aiProfiles
    .filter(p => {
      if (p.experience < filters.experienceRange[0] || p.experience > filters.experienceRange[1]) return false;
      if (p.rate < filters.rateRange[0] || p.rate > filters.rateRange[1]) return false;
      if (!filters.profileTypes.contract && p.profileType === 'contract') return false;
      if (!filters.profileTypes.bench && p.profileType === 'bench') return false;
      if (filters.availability !== 'all' && p.availability !== filters.availability) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'rate') return a.rate - b.rate;
      return 0;
    });

  const resetFilters = () => {
    setFilters({
      experienceRange: [2, 10],
      rateRange: [30, 70],
      profileTypes: { contract: true, bench: true },
      availability: 'all',
      location: 'all'
    });
  };

  // Job Posting View
  if (view === 'posting') {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Find Talent</h1>
              <p className="text-muted-foreground">
                Enter your job requirements and let AI find the best matching profiles
              </p>
            </div>

            {/* Job Description Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Title */}
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Job Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={jobData.title}
                    onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Senior React Developer"
                    className="mt-1.5"
                  />
                </div>

                {/* Job Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium">
                    Job Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={jobData.description}
                    onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>

                {/* Skills */}
                <div>
                  <Label className="text-sm font-medium">
                    Skills <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-3">
                    {jobData.skills.map((skill) => (
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
                      placeholder="Add a skill..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                    />
                    <Button variant="outline" onClick={() => addSkill(skillInput)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Experience, Location, Budget */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium">Experience</Label>
                    <Input
                      id="experience"
                      value={jobData.experience}
                      onChange={(e) => setJobData(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="e.g., 3-5 years"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input
                      id="location"
                      value={jobData.location}
                      onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Remote / Bangalore"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget" className="text-sm font-medium">Budget</Label>
                    <Input
                      id="budget"
                      value={jobData.budget}
                      onChange={(e) => setJobData(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="e.g., $40-60/hr"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI CTA Button */}
            <div className="flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="lg"
                      className="gap-3 px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
                      onClick={handleShowProfiles}
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Finding Matches...
                        </>
                      ) : (
                        <>
                          <Bot className="h-5 w-5" />
                          Show Me Similar Profiles
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p>Find contract & bench resources matching this job description using AI</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Additional Actions */}
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowContractModal(true)}
              >
                <Plus className="h-4 w-4" />
                Post Contract Opportunity
              </Button>
            </div>
          </div>
        </main>

        <Footer />
        <PostContractModal open={showContractModal} onOpenChange={setShowContractModal} />
      </div>
    );
  }

  // Results View
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Results Header */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-6">
            <Button 
              variant="ghost" 
              className="gap-2 mb-4 -ml-2"
              onClick={() => setView('posting')}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Job Posting
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Similar Profiles for: {jobData.title}
                </h1>
                <p className="text-muted-foreground">
                  AI-matched profiles based on your job description
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <div className="w-72 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </span>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Experience Slider */}
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Experience
                    </Label>
                    <Slider
                      value={filters.experienceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, experienceRange: value }))}
                      min={0}
                      max={15}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.experienceRange[0]} years</span>
                      <span>{filters.experienceRange[1]} years</span>
                    </div>
                  </div>

                  {/* Rate Slider */}
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Price / Rate
                    </Label>
                    <Slider
                      value={filters.rateRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, rateRange: value }))}
                      min={20}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${filters.rateRange[0]}/hr</span>
                      <span>${filters.rateRange[1]}/hr</span>
                    </div>
                  </div>

                  {/* Profile Type */}
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Profile Type
                    </Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox 
                          checked={filters.profileTypes.contract}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ 
                              ...prev, 
                              profileTypes: { ...prev.profileTypes, contract: !!checked } 
                            }))
                          }
                        />
                        <span className="text-sm">Contract Resource</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox 
                          checked={filters.profileTypes.bench}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ 
                              ...prev, 
                              profileTypes: { ...prev.profileTypes, bench: !!checked } 
                            }))
                          }
                        />
                        <span className="text-sm">Bench Resource</span>
                      </label>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Availability
                    </Label>
                    <Select 
                      value={filters.availability} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="within30">Within 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location
                    </Label>
                    <Select 
                      value={filters.location} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="remote">Remote Only</SelectItem>
                        <SelectItem value="onsite">Onsite Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results List */}
            <div className="flex-1">
              {/* Sort Header */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredProfiles.length}</span> profiles found
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matchScore">Highest Match Score</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                      <SelectItem value="rate">Lowest Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Profile Cards */}
              {filteredProfiles.length > 0 ? (
                <div className="space-y-4">
                  {filteredProfiles.map((profile) => (
                    <Card key={profile.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}`} />
                            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>

                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-foreground">{profile.name}</h3>
                                  <Badge 
                                    variant="outline" 
                                    className={profile.availability === 'immediate' ? 'text-green-600 border-green-300 bg-green-50' : 'text-amber-600 border-amber-300 bg-amber-50'}
                                  >
                                    {profile.availability === 'immediate' ? '🟢 Immediate' : '🟡 Within 30 Days'}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Briefcase className="h-3.5 w-3.5" />
                                    {profile.experience} Years
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3.5 w-3.5" />
                                    ${profile.rate}/hr
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {profile.location}
                                  </span>
                                </div>
                              </div>

                              {/* Match Score */}
                              <div className="text-center">
                                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${getScoreColor(profile.matchScore)}`}>
                                  <span className="font-bold text-sm">{profile.matchScore}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">AI Match</p>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {profile.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            {/* Score Bar */}
                            <div className="mt-3">
                              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getScoreBarColor(profile.matchScore)} transition-all`}
                                  style={{ width: `${profile.matchScore}%` }}
                                />
                              </div>
                            </div>

                            {/* Profile Type Badge & Actions */}
                            <div className="flex items-center justify-between mt-4">
                              <Badge 
                                variant="outline"
                                className={profile.profileType === 'bench' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}
                              >
                                {profile.profileType === 'bench' ? (
                                  <><Building2 className="h-3 w-3 mr-1" /> Bench Resource</>
                                ) : (
                                  <><Briefcase className="h-3 w-3 mr-1" /> Contract Resource</>
                                )}
                              </Badge>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/talent/${profile.id}`)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Profile
                                </Button>
                                <Button 
                                  variant={shortlisted.includes(profile.id) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => toggleShortlist(profile.id)}
                                  className={shortlisted.includes(profile.id) ? "bg-primary" : ""}
                                >
                                  <Heart className={`h-4 w-4 mr-1 ${shortlisted.includes(profile.id) ? 'fill-current' : ''}`} />
                                  {shortlisted.includes(profile.id) ? 'Shortlisted' : 'Shortlist'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <Card className="p-12 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No strong matches found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting experience or price range to find more profiles.
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <PostContractModal open={showContractModal} onOpenChange={setShowContractModal} />
    </div>
  );
};

export default FindTalent;
