import { ChangeEvent, useState } from "react";
import { X, Plus, Trash2, Briefcase, Award, FolderGit2 } from "lucide-react";
import { useUpdateProfileMutation } from "@/app/queries/profileApi";
import { toast } from "sonner";

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface CandidateProfileUpdateProps {
  data: {
    candidateProfile: {
      location?: string;
      availability?: string;
      bio?: string;
      yearsExperience?: string | number;
      skills?: Array<{ name: string; id?: string } | string>;
      headline?: string;
      resourceType?: string;
      availableIn?: string;
      englishProficiency?: string;
      hourlyRateMin?: number | string;
      hourlyRateMax?: number | string;
      workExperiences?: Array<{
        companyName: string;
        role: string;
        employmentType: string;
        startDate: string;
        endDate: string | null;
        description: string | string[];
        location: string;
      }>;
      projects?: Array<{
        title: string;
        description: string;
        techStack: string[] | string;
        projectUrl: string;
        isFeatured: boolean;
      }>;
      certifications?: Array<{
        name: string;
        issuedBy: string;
        issueDate: string;
        expiryDate?: string;
        credentialUrl: string;
      }>;
    };
  };
}

const CandidateProfileUpdate = ({
  data,
}: CandidateProfileUpdateProps): JSX.Element => {
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    location: data?.candidateProfile.location || "",
    availability: data?.candidateProfile.availability || "",
    bio: data?.candidateProfile.bio || "",
    yearsExperience: data?.candidateProfile.yearsExperience || "",
    skills:
      data?.candidateProfile.skills?.map((s) =>
        typeof s === "string" ? { name: s } : s,
      ) || [],
    headline: data?.candidateProfile.headline || "",
    resourceType: data?.candidateProfile.resourceType || "",
    availableIn: data?.candidateProfile.availableIn || "",
    englishProficiency: data?.candidateProfile.englishProficiency || "",
    hourlyRateMin: data?.candidateProfile.hourlyRateMin || "",
    hourlyRateMax: data?.candidateProfile.hourlyRateMax || "",
    workExperiences: data?.candidateProfile.workExperiences || [],
    projects: data?.candidateProfile.projects || [],
    certifications: data?.candidateProfile.certifications || [],
  });

  const [
    updateProfile,
    { isLoading: isUpdating, isError: updateError, isSuccess },
  ] = useUpdateProfileMutation();

  const availabilityOptions = [
    "freelance",
    "full-time",
    "part-time",
    "contract",
  ];
  const resourceTypeOptions = [
    "BENCH RESOURCE",
    "ACTIVE RESOURCE",
    "AVAILABLE",
  ];
  const availableInOptions = ["Immediate", "1 Week", "2 Weeks", "1 Month"];
  const englishProficiencyOptions = [
    "Native",
    "Professional",
    "Intermediate",
    "Basic",
  ];
  const employmentTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
  ];

  const handleInputChange = (e: ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    const name = skillInput.trim();
    if (name && !formData.skills.some((s) => s.name === name)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, { name }], // Adds to existing array
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.name !== skillToRemove.name),
    }));
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: [
        ...prev.workExperiences,
        {
          companyName: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: null,
          description: "",
          location: "",
        },
      ],
    }));
  };

  const updateWorkExperience = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          techStack: [],
          projectUrl: "",
          isFeatured: false,
        },
      ],
    }));
  };

  const updateProject = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj,
      ),
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuedBy: "",
          issueDate: "",
          expiryDate: "",
          credentialUrl: "",
        },
      ],
    }));
  };

  const updateCertification = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert,
      ),
    }));
  };

  const removeCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      workExperiences: formData.workExperiences.map((exp) => ({
        ...exp,
        description: Array.isArray(exp.description)
          ? exp.description
          : String(exp.description ?? "")
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
      })),
    };
    updateProfile(payload)
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Failed to update profile");
      });
  };

  return (
    <div className="sm:p-8">
      <div className="space-y-8">
        {/* Basic Information */}
        {/* <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-6 text-left">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleInputChange}
                placeholder="e.g., Senior Full Stack Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div> */}

        {/* Professional Details */}
        <div className="space-y-4 text-left">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-6 text-left">
            Professional Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Remote, New York, London"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select availability</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resource Type
              </label>
              <select
                name="resourceType"
                value={formData.resourceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select resource type</option>
                {resourceTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available In
              </label>
              <select
                name="availableIn"
                value={formData.availableIn}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select availability</option>
                {availableInOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                English Proficiency
              </label>
              <select
                name="englishProficiency"
                value={formData.englishProficiency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select proficiency</option>
                {englishProficiencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate (Min) $
              </label>
              <input
                type="number"
                name="hourlyRateMin"
                value={formData.hourlyRateMin}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate (Max) $
              </label>
              <input
                type="number"
                name="hourlyRateMax"
                value={formData.hourlyRateMax}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4 text-left">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-6">
            Skills & Tech
          </h2>

          {/* Skills */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Skills
            </h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
                placeholder="Add a skill (e.g., TypeScript)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={skill.id || index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-teal-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex-1">
              Work Experience
            </h2>
            <button
              type="button"
              onClick={addWorkExperience}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition text-sm"
            >
              <Briefcase className="w-4 h-4" />
              Add Experience
            </button>
          </div>

          {formData.workExperiences.map((exp, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-700">
                  Experience #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.companyName}
                  onChange={(e) =>
                    updateWorkExperience(index, "companyName", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role/Title"
                  value={exp.role}
                  onChange={(e) =>
                    updateWorkExperience(index, "role", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={exp.employmentType}
                  onChange={(e) =>
                    updateWorkExperience(
                      index,
                      "employmentType",
                      e.target.value,
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Employment Type</option>
                  {employmentTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) =>
                    updateWorkExperience(index, "location", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateWorkExperience(index, "startDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    End Date (Leave empty if current)
                  </label>
                  <input
                    type="date"
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      updateWorkExperience(index, "endDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <textarea
                placeholder="Description of your role and achievements..."
                value={
                  Array.isArray(exp.description)
                    ? exp.description.join("\n")
                    : exp.description
                }
                onChange={(e) =>
                  updateWorkExperience(index, "description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex-1">
              Projects
            </h2>
            <button
              type="button"
              onClick={addProject}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition text-sm"
            >
              <FolderGit2 className="w-4 h-4" />
              Add Project
            </button>
          </div>

          {formData.projects.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-700">
                  Project #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => updateProject(index, "title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                placeholder="Tech Stack (comma separated, e.g., Node.js, PostgreSQL)"
                value={
                  Array.isArray(project.techStack)
                    ? project.techStack.join(", ")
                    : (project.techStack ?? "")
                }
                onChange={(e) =>
                  updateProject(
                    index,
                    "techStack",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="url"
                placeholder="Project URL"
                value={project.projectUrl}
                onChange={(e) =>
                  updateProject(index, "projectUrl", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={project.isFeatured}
                  onChange={(e) =>
                    updateProject(index, "isFeatured", e.target.checked)
                  }
                  className="min-h-0 min-w-0 w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Featured Project</span>
              </label>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex-1">
              Certifications
            </h2>
            <button
              type="button"
              onClick={addCertification}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition text-sm"
            >
              <Award className="w-4 h-4" />
              Add Certification
            </button>
          </div>

          {formData.certifications.map((cert, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-700">
                  Certification #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={(e) =>
                    updateCertification(index, "name", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Issued By"
                  value={cert.issuedBy}
                  onChange={(e) =>
                    updateCertification(index, "issuedBy", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={cert.issueDate}
                    onChange={(e) =>
                      updateCertification(index, "issueDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={cert.expiryDate || ""}
                    onChange={(e) =>
                      updateCertification(index, "expiryDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <input
                type="url"
                placeholder="Credential URL"
                value={cert.credentialUrl}
                onChange={(e) =>
                  updateCertification(index, "credentialUrl", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition font-medium"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-red-600 hover:text-white transition font-medium"
          >
            Cancel
          </button>
          {updateError && (
            <p className="text-red-600 text-sm">Failed to update profile</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileUpdate;
