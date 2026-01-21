import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Building2, 
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  Sparkles,
  X,
  User,
  Linkedin,
  Github,
  Plus
} from "lucide-react";
import { toast } from "sonner";

const ContractorRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    experience: "",
    bio: "",
    skills: [] as string[],
    workMode: "full-time",
    hourlyRate: "",
    preferredDuration: "",
    availability: "",
    linkedinUrl: "",
    githubUrl: "",
    resumeFile: null as File | null,
    photoFile: null as File | null
  });
  
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = () => {
    toast.success("Profile completed successfully!", {
      description: "Your contractor profile is now live."
    });
    navigate("/marketplace");
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved", {
      description: "You can continue later from where you left off."
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">HIRION</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Left Sidebar */}
            <div className="space-y-6">
              {/* Photo Upload */}
              <Card className="border-border/50 rounded-xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Upload Photo</p>
                  <p className="text-xs text-muted-foreground">Professional headshots work best</p>
                </CardContent>
              </Card>

              {/* Resume Upload */}
              <Card className="border-border/50 rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Resume</span>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX (Max 5MB)</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Auto-fill from resume
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Skill extraction active
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Form */}
            <div className="space-y-6">
              {/* Personal Details */}
              <Card className="border-border/50 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">First Name</Label>
                      <Input
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="h-11 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Last Name</Label>
                      <Input
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="h-11 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Job Title</Label>
                      <Input
                        placeholder="e.g. Senior Java Developer"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className="h-11 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Total Experience</Label>
                      <Select value={formData.experience} onValueChange={(v) => setFormData({ ...formData, experience: v })}>
                        <SelectTrigger className="h-11 rounded-lg">
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent>
                          {["0-1 years", "1-3 years", "3-5 years", "5-8 years", "8-10 years", "10+ years"].map((exp) => (
                            <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Summary / Bio</Label>
                    <Textarea
                      placeholder="Briefly describe your professional background..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="rounded-lg resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Expertise */}
              <Card className="border-border/50 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Add Skills (Type and press Enter)</Label>
                    <Input
                      placeholder="e.g. React, Spring Boot, AWS"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="h-11 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 cursor-default"
                      >
                        {skill}
                        <X 
                          className="h-3 w-3 ml-2 cursor-pointer hover:text-destructive" 
                          onClick={() => removeSkill(skill)} 
                        />
                      </Badge>
                    ))}
                    <button 
                      onClick={() => document.querySelector<HTMLInputElement>('input[placeholder*="React"]')?.focus()}
                      className="px-3 py-1.5 rounded-full text-sm text-muted-foreground border border-dashed border-border hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Add more
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Work Preferences & Availability */}
              <Card className="border-border/50 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">Work Preferences & Availability</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Preferred Work Mode</Label>
                    <div className="flex gap-3">
                      {["Full-Time", "Contract / Freelance", "Internship"].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFormData({ ...formData, workMode: mode.toLowerCase() })}
                          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                            formData.workMode === mode.toLowerCase()
                              ? "bg-primary text-primary-foreground border-primary shadow-md"
                              : "bg-white dark:bg-slate-800 text-foreground border-border hover:border-primary"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.workMode !== "full-time" && (
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
                      <p className="text-sm font-medium text-primary">Contract & Freelance Settings</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Hourly Rate (USD)</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                            <Input
                              placeholder="45"
                              value={formData.hourlyRate}
                              onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                              className="pl-8 h-11 rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Preferred Duration</Label>
                          <Select value={formData.preferredDuration} onValueChange={(v) => setFormData({ ...formData, preferredDuration: v })}>
                            <SelectTrigger className="h-11 rounded-lg">
                              <SelectValue placeholder="Any duration" />
                            </SelectTrigger>
                            <SelectContent>
                              {["Any duration", "1-3 months", "3-6 months", "6-12 months", "12+ months"].map((dur) => (
                                <SelectItem key={dur} value={dur}>{dur}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Availability to Join</Label>
                    <Select value={formData.availability} onValueChange={(v) => setFormData({ ...formData, availability: v })}>
                      <SelectTrigger className="h-11 rounded-lg">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Immediately available", "1 week notice", "2 weeks notice", "1 month notice", "2+ months notice"].map((avail) => (
                          <SelectItem key={avail} value={avail}>{avail}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.availability === "Immediately available" && (
                      <button className="text-sm text-primary font-medium flex items-center gap-1 mt-2">
                        <Sparkles className="h-4 w-4" />
                        Mark as Immediately Available
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Online Presence */}
              <Card className="border-border/50 rounded-xl overflow-hidden shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Online Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        LinkedIn URL
                      </Label>
                      <Input
                        placeholder="linkedin.com/in/username"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        className="h-11 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub / Portfolio
                      </Label>
                      <Input
                        placeholder="github.com/username"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="h-11 rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  className="px-6 h-12 rounded-xl"
                >
                  Save as Draft
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="px-8 h-12 rounded-xl bg-primary hover:bg-primary/90"
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractorRegistration;