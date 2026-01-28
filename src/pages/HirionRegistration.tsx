import React, { useEffect, useState } from "react";
import {
  Building2,
  User,
  Briefcase,
  Target,
  CheckCircle,
  EyeOff,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  useCreateCandidateMutation,
  useCreateEmployerMutation,
} from "@/app/queries/loginApi";

type UserType = "candidate" | "employer";
type CandidateStep = 1 | 2 | 3 | 4;
type EmployerStep = 1 | 2 | 3;

interface CandidateFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  candidateType: string;
  primaryJobRole: string;
  yearsExperience: number | null;
  primarySkills: string[];
  preferredWorkType: string[];
  expectedSalaryMin: number | null;
  expectedSalaryMax: number | null;
  availableToJoin: string;
  acceptedTerms: boolean;
  acceptedPrivacyPolicy: boolean;
}
interface EmployerFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  industry: string;
  location: string;
  companySize: string;
  website: string;
  description: string;
}

const HirionRegistration = () => {
  const [selectedType, setSelectedType] = useState<UserType>("candidate");
  const [candidateStep, setCandidateStep] = useState<CandidateStep>(1);
  const [employerStep, setEmployerStep] = useState<EmployerStep>(1);
  const [primarySkillsInput, setPrimarySkillsInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // API
  const [createCandidate, { isLoading: isLoadingCandidate }] =
    useCreateCandidateMutation();

  const [createEmployer, { isLoading: isLoadingEmployer }] =
    useCreateEmployerMutation();

  const [candidateForm, setCandidateForm] = useState<CandidateFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    candidateType: "",
    primaryJobRole: "",
    yearsExperience: null,
    primarySkills: [],
    preferredWorkType: [],
    expectedSalaryMin: null,
    expectedSalaryMax: null,
    availableToJoin: "",
    acceptedTerms: false,
    acceptedPrivacyPolicy: false,
  });

  useEffect(() => {
    setPrimarySkillsInput(candidateForm.primarySkills.join(", "));
  }, [candidateForm.primarySkills]);

  const [employerForm, setEmployerForm] = useState<EmployerFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    companyName: "",
    industry: "",
    location: "",
    companySize: "",
    website: "",
    description: "",
  });

  const validateCandidateStep = (
    step: number,
    form: CandidateFormData = candidateForm,
  ): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch (step) {
      case 1:
        if (
          !candidateForm.firstName?.trim() ||
          !candidateForm.lastName?.trim() ||
          !candidateForm.email?.trim() ||
          !candidateForm.password
        ) {
          toast.error("Please fill in all required fields.");
          return false;
        }
        if (!emailRegex.test(candidateForm.email?.trim())) {
          toast.error("Invalid email address.");
          return false;
        }
        if (candidateForm.password?.trim().length < 8) {
          toast.error("Password must be at least 8 characters.");
          return false;
        }
        return true;

      case 2:
        if (candidateForm.password !== candidateForm.confirmPassword) {
          toast.error("Passwords do not match.");
          return false;
        }
        if (
          !candidateForm.mobileNumber?.trim() ||
          !candidateForm.candidateType ||
          !candidateForm.primaryJobRole
        ) {
          toast.error("Please fill in all required fields.");
          return false;
        }
        return true;

      case 3:
        if (form.yearsExperience === null) {
          toast.error("Please select years of experience.");
          return false;
        }
        if (form.primarySkills.length === 0) {
          toast.error("Please add at least one skill.");
          return false;
        }
        if (form.preferredWorkType.length === 0) {
          toast.error("Please select at least one preferred work type.");
          return false;
        }
        if (
          form.expectedSalaryMin === null ||
          form.expectedSalaryMax === null
        ) {
          toast.error("Please enter your expected salary range.");
          return false;
        }
        if (
          form.expectedSalaryMin !== null &&
          form.expectedSalaryMax !== null &&
          form.expectedSalaryMin > form.expectedSalaryMax
        ) {
          toast.error("Minimum salary cannot exceed maximum salary.");
          return false;
        }
        return true;

      case 4:
        if (!candidateForm.availableToJoin) {
          toast.error("Please enter date available to join.");
          return false;
        }
        if (
          !candidateForm.acceptedTerms ||
          !candidateForm.acceptedPrivacyPolicy
        ) {
          toast.error("Please accept both terms and privacy policy.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const validateEmployerStep = (step: number): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch (step) {
      case 1:
        if (
          !employerForm.firstName?.trim() ||
          !employerForm.lastName?.trim() ||
          !employerForm.email?.trim() ||
          !employerForm.password
        ) {
          toast.error("Please fill in all required fields.");
          return false;
        }
        if (!emailRegex.test(employerForm.email?.trim())) {
          toast.error("Invalid email address.");
          return false;
        }
        if (employerForm.password?.trim().length < 8) {
          toast.error("Password must be at least 8 characters.");
          return false;
        }
        return true;

      case 2:
        if (!employerForm.companyName?.trim()) {
          toast.error("Please fill in all required fields.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (selectedType === "candidate") {
      // For step 3, parse and validate skills inline
      if (candidateStep === 3) {
        const parsedSkills = primarySkillsInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        const draft = { ...candidateForm, primarySkills: parsedSkills };
        if (!validateCandidateStep(3, draft)) return;
        setCandidateForm(draft);
        setCandidateStep(4);
      } else {
        const isValid = validateCandidateStep(candidateStep);
        if (isValid && candidateStep < 4) {
          setCandidateStep((prev) => (prev + 1) as CandidateStep);
        }
      }
    } else if (selectedType === "employer") {
      const isValid = validateEmployerStep(employerStep);
      if (isValid && employerStep < 3) {
        setEmployerStep((prev) => (prev + 1) as EmployerStep);
      }
    }
  };

  const handleBack = () => {
    if (selectedType === "candidate" && candidateStep > 1) {
      setCandidateStep((prev) => (prev - 1) as CandidateStep);
    } else if (selectedType === "employer" && employerStep > 1) {
      setEmployerStep((prev) => (prev - 1) as EmployerStep);
    }
  };

  const handleSubmit = async () => {
    // Candidate Registration
    if (selectedType === "candidate") {
      if (isLoadingCandidate) return;
      if (!validateCandidateStep(4)) return;

      try {
        await createCandidate(candidateForm).unwrap();
        toast.success("Account created successfully!");
        navigate("/login");
      } catch (err) {
        const errorMessage =
          (err as any)?.data?.message ||
          (err as any)?.message ||
          "Failed to create account";
        toast.error(errorMessage);
      }
    } else {
      if (!validateEmployerStep(3)) return;
    }

    // Employer Registration
    if (selectedType === "employer") {
      try {
        await createEmployer(employerForm).unwrap();
        toast.success("Account created successfully!");
        navigate("/employer-login");
      } catch (err) {
        const errorMessage =
          (err as any)?.data?.message ||
          (err as any)?.message ||
          "Failed to create account";
        toast.error(errorMessage);
      }
    }
  };

  const renderEmployerStep = () => {
    switch (employerStep) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
                >
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={employerForm.firstName}
                  onChange={(e) =>
                    setEmployerForm({
                      ...employerForm,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="Enter your first name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
                >
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  value={employerForm.lastName}
                  onChange={(e) =>
                    setEmployerForm({
                      ...employerForm,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Enter your last name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                value={employerForm.email}
                onChange={(e) =>
                  setEmployerForm({ ...employerForm, email: e.target.value })
                }
                autoComplete="email"
                required
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Label
                htmlFor="password"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Password{" "}
                <span className="text-gray-500 font-normal text-sm">
                  (Must include uppercase, lowercase, and a number)
                </span>
                <span className="text-destructive">*</span>
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={employerForm.password}
                onChange={(e) =>
                  setEmployerForm({ ...employerForm, password: e.target.value })
                }
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-4 top-10 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors min-h-0 min-w-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <Label
                htmlFor="companyName"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="companyName"
                value={employerForm.companyName}
                onChange={(e) =>
                  setEmployerForm({
                    ...employerForm,
                    companyName: e.target.value,
                  })
                }
                placeholder="Enter your company name"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label
                htmlFor="industry"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Industry
              </Label>
              <Input
                type="text"
                id="industry"
                value={employerForm.industry}
                onChange={(e) =>
                  setEmployerForm({ ...employerForm, industry: e.target.value })
                }
                placeholder="Enter your industry"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label
                htmlFor="location"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Location
              </Label>
              <Input
                type="text"
                id="location"
                value={employerForm.location}
                onChange={(e) =>
                  setEmployerForm({ ...employerForm, location: e.target.value })
                }
                placeholder="Enter your location"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label
                htmlFor="companySize"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Company Size
              </Label>
              <select
                value={employerForm.companySize}
                id="companySize"
                onChange={(e) =>
                  setEmployerForm({
                    ...employerForm,
                    companySize: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="" hidden>
                  Select Company Size
                </option>
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
                <option>201-500</option>
                <option>501-1000</option>
                <option>1000+</option>
              </select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <Label
                htmlFor="website"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Website
              </Label>
              <Input
                type="url"
                id="website"
                value={employerForm.website}
                onChange={(e) =>
                  setEmployerForm({ ...employerForm, website: e.target.value })
                }
                placeholder="Enter your website"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Description
              </Label>
              <Textarea
                value={employerForm.description}
                id="description"
                onChange={(e) =>
                  setEmployerForm({
                    ...employerForm,
                    description: e.target.value,
                  })
                }
                placeholder="Enter your description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </>
        );
    }
  };

  const renderCandidateStep = () => {
    switch (candidateStep) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
                >
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  value={candidateForm.firstName}
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="Enter your first name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
                >
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  value={candidateForm.lastName}
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Enter your last name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                value={candidateForm.email}
                onChange={(e) =>
                  setCandidateForm({ ...candidateForm, email: e.target.value })
                }
                placeholder="Enter your email address"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Label
                htmlFor="password"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={candidateForm.password}
                onChange={(e) =>
                  setCandidateForm({
                    ...candidateForm,
                    password: e.target.value,
                  })
                }
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-4 top-10 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors min-h-0 min-w-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="relative">
              <Label
                htmlFor="confirmPassword"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Confirm Password <span className="text-destructive">*</span>
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={candidateForm.confirmPassword}
                onChange={(e) =>
                  setCandidateForm({
                    ...candidateForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm your password"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-4 top-10 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors min-h-0 min-w-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div>
              <Label
                htmlFor="mobileNumber"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Mobile Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mobileNumber"
                type="tel"
                value={candidateForm.mobileNumber}
                onChange={(e) =>
                  setCandidateForm({
                    ...candidateForm,
                    mobileNumber: e.target.value,
                  })
                }
                placeholder="Enter your mobile number"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label
                htmlFor="candidateType"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Candidate Type <span className="text-destructive">*</span>
              </Label>
              <select
                value={candidateForm.candidateType}
                id="candidateType"
                onChange={(e) =>
                  setCandidateForm({
                    ...candidateForm,
                    candidateType: e.target.value,
                  })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="" hidden>
                  Select Candidate Type
                </option>
                <option>Full-Time Job Seeker</option>
                <option>Part-Time Job Seeker</option>
                <option>Contract Worker</option>
                <option>Freelancer</option>
              </select>
            </div>
            <div>
              <Label
                htmlFor="primaryJobRole"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Primary Job Role <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="primaryJobRole"
                value={candidateForm.primaryJobRole}
                onChange={(e) =>
                  setCandidateForm({
                    ...candidateForm,
                    primaryJobRole: e.target.value,
                  })
                }
                placeholder="Enter your primary job role"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <Label
                htmlFor="yearsExperience"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Years of Experience <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                id="yearsExperience"
                min="0"
                max="70"
                value={candidateForm.yearsExperience ?? ""}
                onChange={(e) =>
                  setCandidateForm({
                    ...candidateForm,
                    yearsExperience:
                      e.target.value === ""
                        ? null
                        : Number.isNaN(e.target.valueAsNumber)
                          ? null
                          : e.target.valueAsNumber,
                  })
                }
                placeholder="Enter your years of experience"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />{" "}
            </div>
            <div>
              <Label
                htmlFor="primarySkills"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Primary Skills (comma-separated){" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="primarySkills"
                value={primarySkillsInput}
                onChange={(e) => setPrimarySkillsInput(e.target.value)}
                placeholder="Enter your primary skills"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Preferred Work Type <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                {["remote", "hybrid", "onsite"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={candidateForm.preferredWorkType.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCandidateForm({
                            ...candidateForm,
                            preferredWorkType: [
                              ...candidateForm.preferredWorkType,
                              type,
                            ],
                          });
                        } else {
                          setCandidateForm({
                            ...candidateForm,
                            preferredWorkType:
                              candidateForm.preferredWorkType.filter(
                                (t) => t !== type,
                              ),
                          });
                        }
                      }}
                      className="mr-2 accent-primary min-h-0 min-w-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="expectedSalaryMin"
                  className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
                >
                  Expected Salary Min (INR){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  id="expectedSalaryMin"
                  value={candidateForm.expectedSalaryMin ?? ""}
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      expectedSalaryMin:
                        e.target.value === ""
                          ? null
                          : Number.isNaN(e.target.valueAsNumber)
                            ? null
                            : e.target.valueAsNumber,
                    })
                  }
                  placeholder="Yearly expected min salary"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label
                  htmlFor="expectedSalaryMax"
                  className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
                >
                  Expected Salary Max (INR){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  id="expectedSalaryMax"
                  value={candidateForm.expectedSalaryMax ?? ""}
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      expectedSalaryMax:
                        e.target.value === ""
                          ? null
                          : Number.isNaN(e.target.valueAsNumber)
                            ? null
                            : e.target.valueAsNumber,
                    })
                  }
                  placeholder="Yearly expected max salary"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div>
              <Label
                htmlFor="availableToJoin"
                className="block text-sm mb-2 text-gray-700 dark:text-gray-300"
              >
                Available to Join <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="availableToJoin"
                value={candidateForm.availableToJoin}
                onChange={(e) =>
                  setCandidateForm({
                    ...candidateForm,
                    availableToJoin: e.target.value,
                  })
                }
                placeholder="Immediate or specify date"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={candidateForm.acceptedTerms}
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      acceptedTerms: e.target.checked,
                    })
                  }
                  className="mt-1 mr-2 accent-primary min-w-0 min-h-0"
                  required
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I accept the Terms and Conditions
                </span>
              </label>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={candidateForm.acceptedPrivacyPolicy}
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      acceptedPrivacyPolicy: e.target.checked,
                    })
                  }
                  required
                  className="mt-1 mr-2 accent-primary min-w-0 min-h-0"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I accept the Privacy Policy
                </span>
              </label>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pb-16 pt-28 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="w-full bg-white dark:bg-gray-900 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-lg rounded-tr-lg rounded-br-lg shadow-lg">
          <div className="dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-gradient-to-br from-[#f7f9fc] to-[#f0f6ff] p-8 lg:rounded-bl-lg rounded-tr-lg rounded-tl-lg lg:rounded-tl-none lg:rounded-tr-none dark:rounded-tl-lg lg:rounded-tl-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary p-2">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                HIRION
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
              One account for
              <br />
              jobs, contracts & bench.
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 mt-6">
              Register as a candidate, or employer and manage hiring, job
              search, and bench deployment in one place.
            </p>

            <div className="flex flex-wrap gap-2 mb-8 font-semibold">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-sm">
                AI Job Matches
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-sm">
                Bench to Billable
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-sm">
                Contract & Full-time
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-primary dark:text-primary/90 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Smart recommendations based on your role
                </p>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary dark:text-primary/90 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unified experience for candidates & employers
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary dark:text-primary/90 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Secure, verified access for companies
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-500 mt-8">
              © 2026 Hirion Talent Solutions. All rights reserved.
            </p>
          </div>
          <div className="dark:bg-gray-900 p-8 rounded-br-lg rounded-tr-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Account Registration
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Select how you want to use Hirion and create your account.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => {
                  setSelectedType("candidate");
                  setCandidateStep(1);
                }}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedType === "candidate"
                    ? "border-green-600 bg-green-50 dark:bg-green-900/50"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <Briefcase
                  className={`w-6 h-6 mx-auto mb-2 ${selectedType === "candidate" ? "text-green-600" : "text-gray-500 dark:text-gray-400"}`}
                />
                <div
                  className={`font-semibold text-sm ${selectedType === "candidate" ? "text-green-600" : "text-gray-900 dark:text-gray-200"}`}
                >
                  Candidate
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Job seeker
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedType("employer");
                  setEmployerStep(1);
                }}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedType === "employer"
                    ? "border-green-600 bg-green-50 dark:bg-green-900/50"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <Building2
                  className={`w-6 h-6 mx-auto mb-2 ${selectedType === "employer" ? "text-green-600" : "text-gray-500 dark:text-gray-400"}`}
                />
                <div
                  className={`font-semibold text-sm ${selectedType === "employer" ? "text-green-600" : "text-gray-900 dark:text-gray-200"}`}
                >
                  Employer
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Hire & post jobs
                </div>
              </button>
            </div>

            {(selectedType === "candidate" || selectedType === "employer") && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  {selectedType === "candidate"
                    ? [1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`flex-1 h-2 rounded-full mx-1 ${
                            step <= candidateStep
                              ? "bg-green-600"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))
                    : [1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`flex-1 h-2 rounded-full mx-1 ${
                            step <= employerStep
                              ? "bg-green-600"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  Step{" "}
                  {selectedType === "candidate" ? candidateStep : employerStep}{" "}
                  of {selectedType === "candidate" ? 4 : 3}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {selectedType === "candidate" && renderCandidateStep()}

              {selectedType === "employer" && renderEmployerStep()}
            </div>

            <div className="mt-6">
              {((selectedType === "candidate" && candidateStep < 4) ||
                (selectedType === "employer" && employerStep < 3)) && (
                <div className="flex gap-3">
                  {((selectedType === "candidate" && candidateStep > 1) ||
                    (selectedType === "employer" && employerStep > 1)) && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

              {((selectedType === "candidate" && candidateStep === 4) ||
                (selectedType === "employer" && employerStep === 3)) && (
                <button
                  className="w-full bg-primary text-white px-4 py-3 rounded-md hover:bg-primary/90 transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  type="button"
                  disabled={isLoadingCandidate || isLoadingEmployer}
                  aria-busy={isLoadingCandidate || isLoadingEmployer}
                >
                  {isLoadingCandidate || isLoadingEmployer
                    ? "Creating account..."
                    : "Sign up and continue"}
                </button>
              )}
            </div>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Already registered?{" "}
                <Link to="/login" className="text-green-600 hover:underline">
                  Log in to your account
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HirionRegistration;
