import React, { useEffect, useState } from "react";
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
  Zap,
  CheckCircle2,
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
import { toast } from "sonner";
import {
  useCreateCandidateMutation,
  useCreateEmployerMutation,
  useLoginMutation,
} from "@/app/queries/loginApi";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/app/slices/userAuth";
import { RootState } from "@/app/store";

type Role = "candidate" | "employer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>("candidate");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

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

  const userDetails = useSelector((state: RootState) => state.user.userDetails);

  useEffect(() => {
    if (userDetails) {
      if (userDetails.role === "candidate") {
        navigate("/jobs");
      } else {
        navigate("/employer-dashboard");
      }
    }
  }, [userDetails, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const result = await login({ email, password, rememberMe });
      if ('data' in result) {
        // console.log(success , 'success')
        dispatch(setUser(result.data));
        toast.success("Welcome back!");
        const userRole = result.data?.role;
        navigate(userRole === "candidate" ? "/jobs" : "/employer-dashboard");
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
      if ('data' in success) {
        toast.success("Account created successfully!");
        navigate("/jobs");
      } else {
        toast.error("Signup failed");
      }
    } else {
      const success = await createEmployer(payload);
      if ('data' in success) {
        toast.success("Account created successfully!");
        navigate("/job-recommendations");
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
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

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                        >
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
                          <Input
                            id="email"
                            className="pl-12 h-12 text-base border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
                          <Input
                            id="password"
                            className="pl-12 pr-12 h-12 text-base border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-4 top-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            aria-pressed={showPassword}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 dark:bg-slate-800 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                            Keep me signed in
                          </span>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-green-600 dark:bg-green-700 text-white font-semibold rounded-lg transition-all text-base shadow-lg hover:shadow-xl hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-70"
                        disabled={isLoadingLogin}
                      >
                        {isLoadingLogin ? (
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <>Login</>
                        )}
                      </Button>
                    </form>

                    {/* Footer Links */}
                    <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Link
                        to="/employer-login"
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium flex items-center gap-2 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Employer Login
                      </Link>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm pt-4">
                      <span className="text-slate-600 dark:text-slate-400">
                        Don't have an account?{" "}
                      </span>
                      <button
                        type="button"
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                        onClick={() => setIsLogin(false)}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Features */}
              <div className="hidden lg:flex flex-col justify-between py-4">
                <div className="space-y-6">
                  {/* Main Headline */}
                  <div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                      Hire faster. Deploy smarter. Monetize your bench.
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg">
                      Move beyond resume matching. Deploy verified talent with
                      AI-driven scoring, bench monetization, and career growth
                      tools built for modern staffing and enterprises.
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                      <Zap className="h-4 w-4" />
                      AI technical scoring (0-100)
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      Bench-to-billable marketplace
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                      <Target className="h-4 w-4" />
                      Career growth ecosystem
                    </div>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {/* Feature 1 */}
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Zap className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                          AI technical fit score
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        Skip up to three rounds with 0-100 fit scores from
                        coding tests and real-world assessments.
                      </p>
                    </Card>

                    {/* Feature 2 */}
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-300" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                          Bench-to-billable
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        List idle talent, get matched to contract demand, and
                        turn bench into a profit center.
                      </p>
                    </Card>

                    {/* Feature 3 */}
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Target className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                          AI skill filtering
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        Only validated experts surface to your recruiters across
                        permanent, contract & project roles.
                      </p>
                    </Card>

                    {/* Feature 4 */}
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                          <Award className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                          Growth for top 1% talent
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        Career path visualization, paid mentorship, and
                        continuous upskilling keep your best engaged.
                      </p>
                    </Card>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        40%
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Reduction in time-to-hire
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        3x
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Faster deployment from bench
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        100%
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Skills verified before interview
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom tagline */}
              </div>
            </div>
          ) : (
            // Sign Up Layout - Keep original with dark mode & mobile responsiveness
            <Card className="shadow-2xl border-0 overflow-hidden bg-white dark:bg-slate-900">
              <CardHeader className="space-y-2 text-center bg-gradient-to-br from-primary to-primary/80 dark:from-primary/80 dark:to-primary/60 text-primary-foreground p-6 sm:p-8">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-primary-foreground/80 text-xs sm:text-sm md:text-base">
                  {role === "candidate"
                    ? "Join HIRION to find your dream job"
                    : "Post jobs and find top talent"}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6">
                  <Button
                    type="button"
                    variant={role === "candidate" ? "default" : "outline"}
                    onClick={() => setRole("candidate")}
                    className="w-full py-5 sm:py-6 text-xs sm:text-sm md:text-base font-medium transition-all hover:scale-[1.02] dark:border-slate-700"
                  >
                    <User className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                    Job Seeker
                  </Button>
                  <Button
                    type="button"
                    variant={role === "employer" ? "default" : "outline"}
                    onClick={() => setRole("employer")}
                    className="w-full py-5 sm:py-6 text-xs sm:text-sm md:text-base font-medium transition-all hover:scale-[1.02] dark:border-slate-700"
                  >
                    <Building2 className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                    Employer
                  </Button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {/* Common Fields */}

                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                        <Input
                          id="firstName"
                          className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                        <Input
                          id="lastName"
                          className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                        <Input
                          id="email"
                          className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                          placeholder="john@example.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                        <Input
                          id="password"
                          className="pl-10 sm:pl-11 pr-10 sm:pr-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          aria-pressed={showPassword}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 sm:h-5 w-4 sm:w-5" />
                          ) : (
                            <Eye className="h-4 sm:h-5 w-4 sm:w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Location
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                        <Input
                          id="location"
                          className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
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
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Availability
                          </Label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                            <Input
                              id="availability"
                              className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                              placeholder="Full-time, Part-time, etc."
                              value={availability}
                              onChange={(e) => setAvailability(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="yearsExperience"
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Years of Experience
                          </Label>
                          <div className="relative">
                            <Award className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                            <Input
                              id="yearsExperience"
                              className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
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
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Skills
                          </Label>
                          <div className="relative">
                            <Target className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                            <Input
                              id="skills"
                              className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                              placeholder="React, TypeScript, Node.js (comma separated)"
                              value={skills}
                              onChange={(e) => setSkills(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label
                            htmlFor="bio"
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Short Bio
                          </Label>
                          <textarea
                            id="bio"
                            className="w-full min-h-[100px] rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white bg-background px-3 py-2 text-xs sm:text-base ring-offset-background placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Company Name
                          </Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                            <Input
                              id="companyName"
                              className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                              placeholder="Acme Corp"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="industry"
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Industry
                          </Label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                            <Input
                              id="industry"
                              className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                              placeholder="Technology, Finance, etc."
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="companySize"
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Company Size
                          </Label>
                          <div className="relative">
                            <Users className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                            <Input
                              id="companySize"
                              className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                              placeholder="51-200 employees"
                              value={companySize}
                              onChange={(e) => setCompanySize(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="website"
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Website
                          </Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                            <Input
                              id="website"
                              className="pl-10 sm:pl-11 h-10 sm:h-12 text-xs sm:text-base dark:bg-slate-800 dark:text-white dark:border-slate-700"
                              placeholder="https://example.com"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label
                            htmlFor="description"
                            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Company Description
                          </Label>
                          <textarea
                            id="description"
                            className="w-full min-h-[100px] rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white bg-background px-3 py-2 text-xs sm:text-base ring-offset-background placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about your company..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="sm:pt-2 md:pt-4">
                    <Button
                      type="submit"
                      className="w-full h-10 sm:h-12 text-xs sm:text-sm md:text-base font-medium transition-all hover:scale-[1.02] shadow-lg dark:hover:opacity-90"
                      disabled={
                        isLoadingEmployer ||
                        isLoadingCandidate ||
                        isLoadingLogin
                      }
                    >
                      {isLoadingEmployer ||
                      isLoadingCandidate ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <>Create Account</>
                      )}
                    </Button>
                  </div>

                  <div className="text-center text-xs sm:text-sm pt-2 md:pt-3">
                    <span className="text-slate-600 dark:text-slate-400">
                      {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    </span>
                    <button
                      type="button"
                      className="text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-300 font-semibold transition-colors"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
