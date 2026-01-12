import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Upload,
  Save,
  FileText,
  Star,
  MessageSquare,
  History,
  Settings,
  LogOut,
  Award,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CandidateProfile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    experience: user?.experience || "",
    currentRole: user?.currentRole || "",
    skills: user?.skills?.join(", ") || "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setResumeFile(file);
      toast.success("Resume selected");
    }
  };

  const handleSaveProfile = () => {
    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    updateProfile({
      ...formData,
      skills: skillsArray,
      resumeUrl: resumeFile ? URL.createObjectURL(resumeFile) : user?.resumeUrl,
    });
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-white to-neutral-50">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="mb-6 border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-32"></div>
              <CardContent className="relative pt-0 pb-6">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16">
                  <div className="w-32 h-32 rounded-full bg-teal-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-center md:text-left md:mb-4">
                    <h1 className="text-3xl font-bold text-neutral-900">
                      {user.name}
                    </h1>
                    <p className="text-neutral-600">
                      {user.currentRole || "Job Seeker"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Saved</span>
                </TabsTrigger>
                <TabsTrigger value="chats" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Chats</span>
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="flex items-center gap-2"
                >
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="logout"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                            disabled
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="pl-10"
                            placeholder="City, Country"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Professional Details</CardTitle>
                      <CardDescription>
                        Your work experience and skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentRole">Current Role</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="currentRole"
                            name="currentRole"
                            value={formData.currentRole}
                            onChange={handleInputChange}
                            className="pl-10"
                            placeholder="e.g., Software Engineer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="e.g., 3 years"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills (comma-separated)</Label>
                        <Textarea
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          placeholder="React, TypeScript, Node.js, Python"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Validated Skills Badges */}
                  <Card className="shadow-lg border-0 md:col-span-2 border-2 border-teal-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-teal-600" />
                            Validated Skills Badges
                          </CardTitle>
                          <CardDescription>
                            Skills you've validated through assessments
                          </CardDescription>
                        </div>
                        <Link to="/skills-assessment">
                          <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Take Assessment
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {user.validatedSkills &&
                      user.validatedSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                          {user.validatedSkills.map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-3 rounded-xl shadow-lg"
                            >
                              <Award className="h-5 w-5" />
                              <span className="font-semibold">{skill}</span>
                              <Badge
                                variant="secondary"
                                className="bg-white/20 text-white border-0"
                              >
                                Verified
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Award className="h-16 w-16 text-teal-300 mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">
                            No validated skills yet. Take skill assessments to
                            earn badges!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Validated skills improve your job match scores and
                            make you stand out to employers
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 md:col-span-2">
                    <CardHeader>
                      <CardTitle>Resume Upload</CardTitle>
                      <CardDescription>
                        Upload your latest resume (PDF, DOC, DOCX - Max 5MB)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-teal-200 rounded-lg p-8 bg-teal-50/30">
                        <FileText className="h-12 w-12 text-teal-500 mb-4" />
                        <Label htmlFor="resume" className="cursor-pointer">
                          <div className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
                            <Upload className="h-5 w-5" />
                            <span className="font-medium">
                              Click to upload resume
                            </span>
                          </div>
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            className="hidden"
                          />
                        </Label>
                        {resumeFile && (
                          <p className="mt-2 text-sm text-neutral-600">
                            Selected: {resumeFile.name}
                          </p>
                        )}
                        {user.resumeUrl && !resumeFile && (
                          <p className="mt-2 text-sm text-teal-600">
                            Resume uploaded ✓
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                    <CardDescription>
                      Jobs you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-12">
                      No saved jobs yet
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chats">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>
                      Chat with recruiters and employers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-12">
                      No messages yet
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Application History</CardTitle>
                    <CardDescription>
                      Track your job applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-12">
                      No applications yet
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-12">
                      Settings coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CandidateProfile;
