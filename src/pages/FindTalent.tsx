import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  MapPin, 
  Star, 
  Bookmark,
  Calendar,
  ArrowLeft,
  Filter,
  Sparkles,
  MessageSquare
} from 'lucide-react';

const FindTalent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Mock data
  const skills = ['Java', 'Python', 'React', 'Node.js', 'AWS', 'DevOps', 'Data Science', 'UI/UX'];
  const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Remote'];
  
  const talents = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Senior Java Developer',
      skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
      experience: '8 years',
      location: 'Bangalore',
      availability: 'Immediate',
      rate: '₹2,500/hour',
      rating: 4.8,
      matchScore: 95,
      type: 'Freelancer'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      experience: '5 years',
      location: 'Hyderabad',
      availability: '2 weeks',
      rate: '₹1,800/hour',
      rating: 4.9,
      matchScore: 88,
      type: 'Bench Resource'
    },
    {
      id: 3,
      name: 'Amit Patel',
      title: 'DevOps Engineer',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
      experience: '6 years',
      location: 'Pune',
      availability: 'Immediate',
      rate: '₹2,200/hour',
      rating: 4.7,
      matchScore: 92,
      type: 'Freelancer'
    },
  ];

  const toggleFilter = (value: string, current: string[], setter: (val: string[]) => void) => {
    if (current.includes(value)) {
      setter(current.filter(v => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/marketplace')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
            
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Find Talent</h1>
            
            {/* Search Bar */}
            <div className="flex gap-4 max-w-4xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  type="text"
                  placeholder="Search by skills, role, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg"
                />
              </div>
              <Button 
                size="lg"
                className="px-8 bg-gradient-to-r from-teal-600 to-teal-800"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                AI Match
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <div className="w-80 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold mb-3">Skills</h3>
                    <div className="space-y-2">
                      {skills.map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleFilter(skill, selectedSkills, setSelectedSkills)}
                          />
                          <Label htmlFor={`skill-${skill}`} className="cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Location */}
                  <div>
                    <h3 className="font-semibold mb-3">Location</h3>
                    <div className="space-y-2">
                      {locations.map(loc => (
                        <div key={loc} className="flex items-center space-x-2">
                          <Checkbox
                            id={`loc-${loc}`}
                            checked={selectedLocations.includes(loc)}
                            onCheckedChange={() => toggleFilter(loc, selectedLocations, setSelectedLocations)}
                          />
                          <Label htmlFor={`loc-${loc}`} className="cursor-pointer">
                            {loc}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Talent List */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-neutral-600">
                  {talents.length} talents found
                </p>
              </div>

              <div className="space-y-4">
                {talents.map(talent => (
                  <Card 
                    key={talent.id} 
                    className="hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => navigate(`/talent/${talent.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Avatar */}
                        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                          {talent.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-semibold text-neutral-900">
                                  {talent.name}
                                </h3>
                                <Badge 
                                  className={talent.type === 'Freelancer' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
                                >
                                  {talent.type}
                                </Badge>
                              </div>
                              <p className="text-neutral-600">{talent.title}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                <span className="font-semibold text-amber-700">{talent.rating}</span>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Bookmark className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>

                          {/* Match Score */}
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="h-4 w-4 text-teal-600" />
                              <span className="text-sm font-semibold text-teal-600">
                                {talent.matchScore}% Match
                              </span>
                            </div>
                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                                style={{ width: `${talent.matchScore}%` }}
                              />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                            <div>
                              <span className="text-neutral-500">Experience</span>
                              <p className="font-medium">{talent.experience}</p>
                            </div>
                            <div>
                              <span className="text-neutral-500">Location</span>
                              <p className="font-medium flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {talent.location}
                              </p>
                            </div>
                            <div>
                              <span className="text-neutral-500">Availability</span>
                              <p className="font-medium text-green-600">{talent.availability}</p>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {talent.skills.map(skill => (
                                <Badge key={skill} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Rate */}
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-teal-600">
                              {talent.rate}
                            </span>
                            <Button 
                              className="bg-gradient-to-r from-teal-600 to-teal-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/talent/${talent.id}`);
                              }}
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindTalent;
