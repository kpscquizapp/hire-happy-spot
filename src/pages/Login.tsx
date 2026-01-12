import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  MapPin,
  Briefcase,
  Target,
  Award,
  Building2,
  Globe,
  Users,
  Loader,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  useCreateCandidateMutation,
  useCreateEmployerMutation,
  useLoginMutation,
} from "@/app/queries/loginApi";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/app/slices/userAuth";

type Role = "candidate" | "employer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>("candidate");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Common
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  // Candidate fields
  const [availability, setAvailability] = useState("full-time");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [yearsExperience, setYearsExperience] = useState<number>(0);

  // Employer fields
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [createEmployer, { isLoading: isLoadingEmployer }] =
    useCreateEmployerMutation();
  const [createCandidate, { isLoading: isLoadingCandidate }] =
    useCreateCandidateMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = await login({ email, password, rememberMe: true });
      if (success) {
        // console.log(success , 'success')
        dispatch(setUser(success?.data));
        toast.success("Welcome back!");
        navigate("/job-recommendations");
      } else {
        toast.error("Invalid email or password");
      }
      return;
    }

    // Signup payloads
    const payload =
      role === "candidate"
        ? {
            email,
            password,
            firstName,
            lastName,
            location,
            availability,
            skills: skills.split(",").map((s) => s.trim()),
            bio,
            yearsExperience,
          }
        : {
            email,
            password,
            firstName,
            lastName,
            companyName,
            industry,
            location,
            companySize,
            website,
            description,
          };

    if (role === "candidate") {
      const success = await createCandidate(payload);
      if (success) {
        toast.success("Account created successfully!");
        navigate("/job-recommendations");
      } else {
        toast.error("Signup failed");
      }
    } else {
      const success = await createEmployer(payload);
      if (success) {
        toast.success("Account created successfully!");
        navigate("/job-recommendations");
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-white to-neutral-50">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-4 sm:pt-32 sm:pb-20">
        <div className="container mx-auto max-w-6xl ">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="space-y-2 text-center bg-gradient-to-br from-primary  to-primary/80 text-primary-foreground p-6 sm:p-8">
              <CardTitle className="text-2xl sm:text-3xl font-bold">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-sm sm:text-base">
                {isLogin
                  ? "Sign in to continue your journey"
                  : role === "candidate"
                  ? "Join HIRION to find your dream job"
                  : "Post jobs and find top talent"}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              {!isLogin && (
                <div className="flex gap-3 mb-6">
                  <Button
                    type="button"
                    variant={role === "candidate" ? "default" : "outline"}
                    onClick={() => setRole("candidate")}
                    className="w-full py-6 text-base font-medium transition-all hover:scale-[1.02]"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Job Seeker
                  </Button>
                  <Button
                    type="button"
                    variant={role === "employer" ? "default" : "outline"}
                    onClick={() => setRole("employer")}
                    className="w-full py-6 text-base font-medium transition-all hover:scale-[1.02]"
                  >
                    <Building2 className="mr-2 h-5 w-5" />
                    Employer
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Login Form */}
                {isLogin && (
                  // max-w-md mx-auto
                  <div className="space-y-5 grid grid-cols-1 sm:grid-cols-2">
                    <div className="">
                      <img
                        src="https://placehold.co/600x400"
                        alt="Images"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex sm:ml-5 justify-center flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email"
                            className="pl-11 h-12 text-base"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="my-4 sm:space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Password
                        </Label>
                        <div className="relative sm:my-0 my-2">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="password"
                            className="pl-11 pr-11 h-12 text-base"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-0 md:right-3 top-1 md:top-3 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link
                          to="/forgot-password"
                          className="text-sm text-primary hover:text-primary/80 font-medium"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Signup Form - Grid Layout */}
                {!isLogin && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Common Fields */}

                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="firstName"
                          className="pl-11 h-12 text-base"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="lastName"
                          className="pl-11 h-12 text-base"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          className="pl-11 h-12 text-base"
                          placeholder="john@example.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          className="pl-11 pr-11 h-12 text-base"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-0 md:right-3 top-1 md:top-3 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">
                        Location
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="location"
                          className="pl-11 h-12 text-base"
                          placeholder="New York, NY"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Candidate-specific Fields */}
                    {role === "candidate" && (
                      <>
                        <div className="space-y-2">
                          <Label
                            htmlFor="availability"
                            className="text-sm font-medium"
                          >
                            Availability
                          </Label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="availability"
                              className="pl-11 h-12 text-base"
                              placeholder="Full-time, Part-time, etc."
                              value={availability}
                              onChange={(e) => setAvailability(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="yearsExperience"
                            className="text-sm font-medium"
                          >
                            Years of Experience
                          </Label>
                          <div className="relative">
                            <Award className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="yearsExperience"
                              className="pl-11 h-12 text-base"
                              placeholder="5"
                              type="number"
                              value={yearsExperience}
                              onChange={(e) =>
                                setYearsExperience(Number(e.target.value))
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label
                            htmlFor="skills"
                            className="text-sm font-medium"
                          >
                            Skills
                          </Label>
                          <div className="relative">
                            <Target className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="skills"
                              className="pl-11 h-12 text-base"
                              placeholder="React, TypeScript, Node.js (comma separated)"
                              value={skills}
                              onChange={(e) => setSkills(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio" className="text-sm font-medium">
                            Short Bio
                          </Label>
                          <textarea
                            id="bio"
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    {/* Employer-specific Fields */}
                    {role === "employer" && (
                      <>
                        <div className="space-y-2">
                          <Label
                            htmlFor="companyName"
                            className="text-sm font-medium"
                          >
                            Company Name
                          </Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="companyName"
                              className="pl-11 h-12 text-base"
                              placeholder="Acme Corp"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="industry"
                            className="text-sm font-medium"
                          >
                            Industry
                          </Label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="industry"
                              className="pl-11 h-12 text-base"
                              placeholder="Technology, Finance, etc."
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="companySize"
                            className="text-sm font-medium"
                          >
                            Company Size
                          </Label>
                          <div className="relative">
                            <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="companySize"
                              className="pl-11 h-12 text-base"
                              placeholder="51-200 employees"
                              value={companySize}
                              onChange={(e) => setCompanySize(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="website"
                            className="text-sm font-medium"
                          >
                            Website
                          </Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="website"
                              className="pl-11 h-12 text-base"
                              placeholder="https://example.com"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label
                            htmlFor="description"
                            className="text-sm font-medium"
                          >
                            Company Description
                          </Label>
                          <textarea
                            id="description"
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about your company..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="sm:pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium transition-all hover:scale-[1.02] shadow-lg"
                    disabled={
                      isLoadingEmployer || isLoadingCandidate || isLoadingLogin
                    }
                  >
                    {isLoadingEmployer ||
                    isLoadingCandidate ||
                    isLoadingLogin ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>{isLogin ? "Sign In" : "Create Account"}</>
                    )}
                  </Button>
                </div>

                <div className="text-center text-sm sm:text-base pt-2">
                  <span className="text-muted-foreground">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
