import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, DollarSign, ArrowLeft, User } from 'lucide-react';

const mockTalents = [
  {
    id: 1,
    name: "Anna Kowalska",
    skills: ["React", "TypeScript", "Node.js"],
    experience: 5,
    availability: "Immediate",
    location: "Warsaw, Poland",
    rate: 180,
    workMode: "Remote",
    description: "Full-stack developer with expertise in modern web technologies"
  },
  {
    id: 2,
    name: "Jan Nowak",
    skills: ["Python", "Django", "PostgreSQL"],
    experience: 7,
    availability: "Within 1 Week",
    location: "Krakow, Poland",
    rate: 200,
    workMode: "Hybrid",
    description: "Backend specialist with strong database optimization skills"
  },
  {
    id: 3,
    name: "Maria Wiśniewska",
    skills: ["Vue.js", "JavaScript", "CSS"],
    experience: 4,
    availability: "Immediate",
    location: "Gdansk, Poland",
    rate: 150,
    workMode: "Remote",
    description: "Frontend developer focused on creating beautiful user interfaces"
  },
  {
    id: 4,
    name: "Piotr Lewandowski",
    skills: ["Java", "Spring Boot", "Microservices"],
    experience: 8,
    availability: "Within 2 Weeks",
    location: "Wroclaw, Poland",
    rate: 220,
    workMode: "On-site",
    description: "Enterprise architect with deep microservices experience"
  }
];

const FindTalent = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredTalents = mockTalents.filter(talent => {
    const matchesSearch = searchTerm === '' || 
      talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      talent.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWorkMode = workModeFilter === 'all' || talent.workMode.toLowerCase() === workModeFilter;
    const matchesAvailability = availabilityFilter === 'all' || talent.availability === availabilityFilter;
    
    return matchesSearch && matchesWorkMode && matchesAvailability;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/marketplace')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Find Bench Talent</h1>
              <p className="text-muted-foreground text-lg">
                Search and filter available professionals for your projects
              </p>
            </div>

            {/* Search and Filters */}
            <Card className="glass-card border-0 shadow-elegant mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative md:col-span-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by skills or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={workModeFilter} onValueChange={setWorkModeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Work Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Work Modes</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="on-site">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Availability</SelectItem>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="Within 1 Week">Within 1 Week</SelectItem>
                      <SelectItem value="Within 2 Weeks">Within 2 Weeks</SelectItem>
                      <SelectItem value="Within 1 Month">Within 1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              {filteredTalents.length === 0 ? (
                <Card className="glass-card border-0 shadow-elegant">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No talents found matching your criteria</p>
                  </CardContent>
                </Card>
              ) : (
                filteredTalents.map(talent => (
                  <Card key={talent.id} className="glass-card border-0 shadow-elegant hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{talent.name}</CardTitle>
                            <CardDescription>{talent.experience} years of experience</CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">{talent.workMode}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{talent.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {talent.skills.map(skill => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {talent.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {talent.availability}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          {talent.rate} PLN/hour
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                        Contact & Request
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindTalent;
