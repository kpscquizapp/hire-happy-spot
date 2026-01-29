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
  ArrowRight,
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
import { useLoginMutation } from "@/app/queries/loginApi";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/app/slices/userAuth";
import { RootState } from "@/app/store";

type Role = "candidate" | "employer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>("candidate");

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state: RootState) => state.user.userDetails);

  useEffect(() => {
    if (!userDetails || !isLogin) return;
    navigate(
      userDetails.role === "candidate" ? "/jobs" : "/employer-dashboard",
    );
  }, [userDetails, isLogin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const result = await login({ email, password });
        if ("data" in result) {
          dispatch(setUser(result.data));
          toast.success("Welcome back!");
        } else {
          toast.error("Invalid email or password");
        }
      } catch {
        toast.error("Connection error. Please try again.");
      }
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />

      <main className="flex-1 pt-16 pb-8 px-3 sm:pt-20 sm:pb-12 md:pt-24 md:pb-20">
        <div className="container mx-auto w-full px-2 sm:px-4 md:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch mt-8">
            {/* Left Column - Login Form */}
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border dark:border-slate-800">
              <CardContent className="py-8 sm:p-10 flex flex-col justify-center">
                <div className="space-y-8">
                  {/* Hirion Logo Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-8">
                      <Building2 className="h-8 w-8 text-green-600 dark:text-green-500" />
                      <span className="text-xl font-bold text-slate-900 dark:text-white">
                        HIRION
                      </span>
                    </div>
                    <div className="inline-block mb-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                      Enterprise Grade
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                      Your next career opportunity awaits.
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      Sign in to access AI-powered job matching, showcase your
                      verified skills, and connect with top employers seeking
                      talent like you.
                    </p>
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
                          className="pl-12 h-12 text-base border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:border-green-500  dark:focus:border-green-400"
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
                          className="pl-12 pr-12 h-12 text-base border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:border-green-500 dark:focus:border-green-400"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors min-h-0 min-w-0"
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
                      <Link
                        to="/employer-login"
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                      >
                        Employer Login →
                      </Link>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-green-600 dark:bg-green-700 text-white font-semibold rounded-lg transition-all text-base shadow-lg hover:shadow-xl hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-70"
                      disabled={isLoadingLogin}
                    >
                      {isLoadingLogin ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        <div className="flex items-center justify-center">
                          Login
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center text-sm pt-2 sm:pt-3">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">
                      Don't have an account?{" "}
                    </span>
                    <Link
                      to="/registration"
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                    >
                      Sign Up
                    </Link>
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
                    Get discovered. Get hired. Grow your career.
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-lg">
                    Stand out with AI-verified skills, get matched to
                    opportunities that fit, and access career growth tools
                    designed for top talent.
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
                    Smart job matching
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                    <Target className="h-4 w-4" />
                    Career growth tools
                  </div>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {/* Feature 1 */}
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Zap className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        AI technical fit score
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      Showcase your 0-100 skill score from coding tests and
                      real-world assessments to stand out to employers.
                    </p>
                  </Card>

                  {/* Feature 2 */}
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        Smart job matching
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      Get matched to roles that fit your skills, experience
                      level, and career goals across permanent, contract &
                      freelance positions.
                    </p>
                  </Card>

                  {/* Feature 3 */}
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Target className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        Career growth tools
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      Access career path visualization, paid mentorship
                      opportunities, and continuous upskilling to advance your
                      career.
                    </p>
                  </Card>

                  {/* Feature 4 */}
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Award className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        Verified skills badge
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      Earn validation through assessments and let your proven
                      expertise speak louder than any resume.
                    </p>
                  </Card>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      50%
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Faster interview callbacks
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      3x
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      More relevant job matches
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      100%
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Skills verified, credibility proven
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom tagline */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
