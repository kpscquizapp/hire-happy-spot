import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Mail,
  Upload,
  Edit,
  Share2,
  Bell,
  Info,
  History,
  Filter,
  Settings,
  MoreHorizontal,
  ChevronDown,
  CheckCircle2,
  Download,
  Calendar,
  Briefcase,
  FileText
} from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  title: string;
  bio: string;
  appliedDate: string;
  appliedTime: string;
  experience: string;
  location: string;
  skills: string[];
  workHistory: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  files: {
    name: string;
    type: string;
    size: string;
  }[];
  selected?: boolean;
}

const FindTalent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCandidateId, setSelectedCandidateId] = useState<number>(1);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([1]);

  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'Arjun Mehta',
      title: 'Product Designer',
      bio: "I'm UI/UX Designer based in Bangalore",
      appliedDate: '09/02/2024',
      appliedTime: '18.10',
      experience: '2nd Total Experience',
      location: 'Bangalore, India',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'Prototyping'],
      workHistory: [
        {
          role: 'Senior UI/UX Designer',
          company: 'Flipkart',
          period: 'August 2022 - October 2024',
          description: "I've led numerous projects, with complex concepts into visually compelling & user-friendly interfaces"
        },
        {
          role: 'Junior UI Designer',
          company: 'Zomato',
          period: 'March 2021 - August 2022',
          description: "I've honed my skills by collaborating with team and..."
        }
      ],
      files: [
        { name: 'arjun-cv-updated', type: 'File PDF', size: '2.1 MB' },
        { name: 'arjun-portfolio-new', type: 'File PDF', size: '5.4 MB' }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Product Designer',
      bio: "I'm UI/UX Designer based in Mumbai",
      appliedDate: '12/02/2024',
      appliedTime: '15.13',
      experience: '3 Years Experience',
      location: 'Mumbai, India',
      skills: ['UI/UX', 'Sketch', 'InVision'],
      workHistory: [
        {
          role: 'Product Designer',
          company: 'Swiggy',
          period: 'Jan 2022 - Present',
          description: 'Leading design initiatives for mobile app features'
        }
      ],
      files: [
        { name: 'priya-resume', type: 'File PDF', size: '1.8 MB' }
      ]
    },
    {
      id: 3,
      name: 'Rohan Verma',
      title: 'Product Designer',
      bio: "I'm UI/UX Designer based in Delhi",
      appliedDate: '11/02/2024',
      appliedTime: '08.10',
      experience: '4 Years Experience',
      location: 'Delhi, India',
      skills: ['UI/UX', 'Figma', 'Motion Design'],
      workHistory: [
        {
          role: 'Lead Designer',
          company: 'Paytm',
          period: 'June 2021 - Present',
          description: 'Designing payment flow experiences'
        }
      ],
      files: [
        { name: 'rohan-portfolio', type: 'File PDF', size: '3.2 MB' }
      ]
    },
    {
      id: 4,
      name: 'Ananya Reddy',
      title: 'Product Designer',
      bio: "I'm UI/UX Designer based in Hyderabad",
      appliedDate: '07/02/2024',
      appliedTime: '09.52',
      experience: '2 Years Experience',
      location: 'Hyderabad, India',
      skills: ['UI/UX', 'Adobe XD', 'Illustration'],
      workHistory: [
        {
          role: 'UI Designer',
          company: 'Razorpay',
          period: 'April 2023 - Present',
          description: 'Creating beautiful payment interfaces'
        }
      ],
      files: [
        { name: 'ananya-cv', type: 'File PDF', size: '2.0 MB' }
      ]
    },
    {
      id: 5,
      name: 'Vikram Singh',
      title: 'Product Designer',
      bio: "I'm UI/UX Designer based in Pune",
      appliedDate: '08/02/2024',
      appliedTime: '11.17',
      experience: '5 Years Experience',
      location: 'Pune, India',
      skills: ['UI/UX', 'Figma', 'Design Systems'],
      workHistory: [
        {
          role: 'Senior Designer',
          company: 'PhonePe',
          period: 'March 2020 - Present',
          description: 'Building comprehensive design systems'
        }
      ],
      files: [
        { name: 'vikram-portfolio', type: 'File PDF', size: '4.1 MB' }
      ]
    },
    {
      id: 6,
      name: 'Kavya Nair',
      title: 'Product Designer',
      bio: "I'm UI/UX Designer based in Chennai",
      appliedDate: '09/02/2024',
      appliedTime: '13.31',
      experience: '3 Years Experience',
      location: 'Chennai, India',
      skills: ['UI/UX', 'Prototyping', 'User Research'],
      workHistory: [
        {
          role: 'Product Designer',
          company: 'Freshworks',
          period: 'Jan 2022 - Present',
          description: 'Designing SaaS product experiences'
        }
      ],
      files: [
        { name: 'kavya-resume', type: 'File PDF', size: '1.9 MB' }
      ]
    },
    {
      id: 7,
      name: 'Rahul Gupta',
      title: 'Product Designer',
      bio: "I'm UI/UX Designer based in Kolkata",
      appliedDate: '10/02/2024',
      appliedTime: '14.22',
      experience: '4 Years Experience',
      location: 'Kolkata, India',
      skills: ['UI/UX', 'Figma', 'Animation'],
      workHistory: [
        {
          role: 'Senior UI Designer',
          company: 'CRED',
          period: 'Feb 2021 - Present',
          description: 'Creating premium fintech experiences'
        }
      ],
      files: [
        { name: 'rahul-portfolio', type: 'File PDF', size: '3.5 MB' }
      ]
    }
  ];

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  const toggleCandidateSelection = (id: number) => {
    setSelectedCandidates(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const selectAllCandidates = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map(c => c.id));
    }
  };

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(candidateSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Top Bar */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search now..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Custom Page
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Availability
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Product Designer</h1>
                <p className="text-sm text-muted-foreground">
                  Open Hiring / Product Designer / <span className="text-primary">Applied</span>
                </p>
              </div>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Upload className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant={activeTab === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('all')}
                  className={activeTab === 'all' ? 'bg-primary text-primary-foreground' : ''}
                >
                  All Applied
                </Button>
                <Button 
                  variant={activeTab === 'interview' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('interview')}
                >
                  Schedule Interview
                </Button>
                <Button 
                  variant={activeTab === 'draft' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('draft')}
                >
                  Draft Applied
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <History className="h-4 w-4" />
                  History Hiring
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Setting Page
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split View */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Left Panel - Candidate List */}
            <div className="w-96 flex-shrink-0">
              <Card className="overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-foreground">Others Applied</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search Applied..."
                      value={candidateSearch}
                      onChange={(e) => setCandidateSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={selectedCandidates.length === candidates.length}
                      onCheckedChange={selectAllCandidates}
                    />
                    <span className="text-sm text-foreground">Select All</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                    Sort By
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="max-h-[600px] overflow-y-auto">
                  {filteredCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedCandidateId === candidate.id ? 'bg-muted/50' : ''
                      }`}
                      onClick={() => setSelectedCandidateId(candidate.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={selectedCandidates.includes(candidate.id)}
                          onCheckedChange={() => toggleCandidateSelection(candidate.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.name}`} />
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">{candidate.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {candidate.appliedDate} • {candidate.appliedTime}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Panel - Candidate Details */}
            <div className="flex-1">
              <Card className="overflow-hidden">
                {/* Header with Gradient */}
                <div className="relative h-32 bg-gradient-to-r from-slate-800 via-purple-900 to-pink-800 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/30 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute top-6 left-0 right-0 text-center">
                    <h2 className="text-xl font-bold text-white">{selectedCandidate.title}</h2>
                    <p className="text-sm text-white/80">Select the best employee candidates to join your team</p>
                  </div>
                </div>

                {/* Profile Section */}
                <div className="px-6 -mt-12 relative z-10">
                  <div className="flex items-end justify-between">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCandidate.name}`} />
                      <AvatarFallback className="text-2xl">{selectedCandidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 mb-4">
                      <Button variant="ghost" size="icon">
                        <Mail className="h-5 w-5" />
                      </Button>
                      <Button variant="outline">Move Draft</Button>
                      <Button className="bg-primary hover:bg-primary/90">Schedule Interview</Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-2xl font-bold text-foreground">{selectedCandidate.name}</h2>
                    <p className="text-muted-foreground">{selectedCandidate.bio}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Left Content */}
                    <div className="col-span-2 space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Description</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          I'm experienced UI/UX designer passionate about creating engaging digital experiences. 
                          With a keen eye for detail and a commitment to user-centric design, I specialize in 
                          transforming ideas into visually... <span className="text-primary cursor-pointer">See more...</span>
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Experience</h3>
                        <div className="space-y-4">
                          {selectedCandidate.workHistory.map((work, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">{work.role} - {work.company}</h4>
                                <p className="text-sm text-muted-foreground mb-1">({work.period})</p>
                                <p className="text-sm text-muted-foreground">{work.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Sidebar - Overview */}
                    <div className="space-y-6">
                      {/* Overview Card */}
                      <Card className="p-4">
                        <h3 className="font-semibold text-foreground mb-4">Overview</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-muted">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Applied For</p>
                              <p className="font-medium text-foreground">{selectedCandidate.title}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-muted">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Application Date</p>
                              <p className="font-medium text-foreground">{selectedCandidate.appliedDate} • {selectedCandidate.appliedTime}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-muted">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Experience</p>
                              <p className="font-medium text-foreground">{selectedCandidate.experience}</p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* File Attachments */}
                      <Card className="p-4">
                        <h3 className="font-semibold text-foreground mb-4">File Attachment</h3>
                        <div className="space-y-3">
                          {selectedCandidate.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.type} - {file.size}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindTalent;
