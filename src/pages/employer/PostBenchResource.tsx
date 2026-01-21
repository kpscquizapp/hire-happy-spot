import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  FileText,
  CheckCircle2,
  Lightbulb,
  X,
  User,
  Calendar,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

const PostBenchResource = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  
  const steps = [
    { number: 1, title: "Company Profile", completed: true },
    { number: 2, title: "Resource Details", current: true },
    { number: 3, title: "Contract Terms", completed: false },
    { number: 4, title: "Review & Publish", completed: false }
  ];

  const [formData, setFormData] = useState({
    resourceName: "",
    currentRole: "",
    totalExperience: "",
    employeeId: "",
    skills: [] as string[],
    professionalSummary: "",
    hourlyRate: "",
    currency: "USD - US Dollar",
    availableFrom: "",
    minimumDuration: "",
    locationPreferences: {
      remote: true,
      hybrid: true,
      onSite: false
    },
    requireNonSolicitation: true,
    resumeFile: null as File | null
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

  const handleSaveDraft = () => {
    toast.success("Draft saved", {
      description: "You can continue later from where you left off."
    });
  };

  const handleProceed = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Bench resource posted successfully!", {
        description: "Your resource is now visible to potential clients."
      });
      navigate("/employer-dashboard/talent-marketplace");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Post Bench Resource</h1>
          <p className="text-muted-foreground">List your available talent for contract opportunities</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/employer-dashboard")}>
          Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Left Sidebar - Steps */}
        <div className="space-y-6">
          {/* Progress Steps */}
          <Card className="border-border/50 rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                      step.completed 
                        ? "bg-primary text-primary-foreground" 
                        : step.current 
                          ? "bg-primary/20 text-primary border-2 border-primary" 
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {step.completed ? <CheckCircle2 className="h-4 w-4" /> : step.number}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${step.current ? "text-primary" : "text-foreground"}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tip */}
          <Card className="border-primary/30 bg-primary/5 rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Quick Tip</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Bench resources with verified skills and immediate availability get 3x more contract offers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <div className="space-y-6">
          {/* Policy Alert */}
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/30 rounded-xl overflow-hidden">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <p className="text-sm text-orange-800 dark:text-orange-200">
                <strong>Bench Policy:</strong> Resources listed here must be on your company payroll. Profiles can be anonymized until an interview request is accepted.
              </p>
            </CardContent>
          </Card>

          {/* Resource Basic Info */}
          <Card className="border-border/50 rounded-xl overflow-hidden shadow-sm">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-lg font-semibold">Resource Basic Info</CardTitle>
                  <p className="text-sm text-muted-foreground">Details about the professional you want to deploy</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Resource Name (Internal)</Label>
                  <Input
                    placeholder="John D."
                    value={formData.resourceName}
                    onChange={(e) => setFormData({ ...formData, resourceName: e.target.value })}
                    className="h-11 rounded-lg"
                  />
                  <p className="text-xs text-muted-foreground">Will be shown as "John D." publicly</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Current Role / Designation</Label>
                  <Input
                    placeholder="e.g. Senior Java Developer"
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Total Experience (Years)</Label>
                  <Select value={formData.totalExperience} onValueChange={(v) => setFormData({ ...formData, totalExperience: v })}>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {["0-1", "1-3", "3-5", "5-8", "8-10", "10+"].map((exp) => (
                        <SelectItem key={exp} value={exp}>{exp} years</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Employee ID / Ref Code</Label>
                  <Input
                    placeholder="Optional internal tracking code"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Technical Skills *</Label>
                <Input
                  placeholder="Type skill and press enter..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-11 rounded-lg"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {skill}
                      <X 
                        className="h-3 w-3 ml-2 cursor-pointer hover:text-destructive" 
                        onClick={() => removeSkill(skill)} 
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Professional Summary</Label>
                <Textarea
                  placeholder="Brief summary of their expertise and key projects..."
                  value={formData.professionalSummary}
                  onChange={(e) => setFormData({ ...formData, professionalSummary: e.target.value })}
                  rows={4}
                  className="rounded-lg resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Availability & Contract Terms */}
          <Card className="border-border/50 rounded-xl overflow-hidden shadow-sm">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-lg font-semibold">Availability & Contract Terms</CardTitle>
                  <p className="text-sm text-muted-foreground">Define the commercials and deployment conditions</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Hourly Rate (Client Billable)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input
                      placeholder="e.g. 45"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="pl-8 h-11 rounded-lg"
                    />
                    <span className="absolute right-3 top-3 text-muted-foreground text-sm">/ hr</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Currency</Label>
                  <Select value={formData.currency} onValueChange={(v) => setFormData({ ...formData, currency: v })}>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["USD - US Dollar", "EUR - Euro", "GBP - British Pound", "INR - Indian Rupee"].map((curr) => (
                        <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Available From</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                      className="pl-10 h-11 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Minimum Contract Duration</Label>
                  <Select value={formData.minimumDuration} onValueChange={(v) => setFormData({ ...formData, minimumDuration: v })}>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1 Month", "3 Months", "6 Months", "12 Months"].map((dur) => (
                        <SelectItem key={dur} value={dur}>{dur}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Deployment Location Preference</Label>
                <div className="flex gap-4">
                  {[
                    { id: "remote", label: "Remote" },
                    { id: "hybrid", label: "Hybrid" },
                    { id: "onSite", label: "On-site" }
                  ].map((loc) => (
                    <div key={loc.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={loc.id}
                        checked={formData.locationPreferences[loc.id as keyof typeof formData.locationPreferences]}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          locationPreferences: { ...formData.locationPreferences, [loc.id]: checked }
                        })}
                      />
                      <label htmlFor={loc.id} className="text-sm cursor-pointer">{loc.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex items-start gap-3">
                <Checkbox 
                  id="non-solicitation"
                  checked={formData.requireNonSolicitation}
                  onCheckedChange={(checked) => setFormData({ ...formData, requireNonSolicitation: checked as boolean })}
                />
                <div>
                  <label htmlFor="non-solicitation" className="text-sm font-semibold text-foreground cursor-pointer">
                    Require Non-Solicitation Agreement
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Client cannot hire this resource permanently for 12 months.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-border/50 rounded-xl overflow-hidden shadow-sm">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Documents</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Upload Anonymized Resume (PDF)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Click to upload resume</p>
                  <p className="text-xs text-muted-foreground mt-1">Max file size 5MB. Please remove contact details.</p>
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
              Save Draft
            </Button>
            <Button 
              onClick={handleProceed}
              className="px-8 h-12 rounded-xl bg-primary hover:bg-primary/90"
            >
              Proceed to Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBenchResource;