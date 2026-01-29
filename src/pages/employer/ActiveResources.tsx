import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  DollarSign,
  Calendar,
  Building2,
  User,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

// Mock data for resources
const mockResources = [
  {
    id: "1",
    name: "John D.",
    role: "Senior Java Developer",
    skills: ["Java Spring Boot", "Microservices", "Kubernetes", "PostgreSQL"],
    experience: "8-10 years",
    rate: 75,
    currency: "USD",
    status: "assigned",
    availableFrom: "2024-01-15",
    locationPreference: ["Remote", "Hybrid"],
    summary: "Experienced Java developer with expertise in building scalable microservices architecture. Led multiple enterprise projects with 99.9% uptime.",
    assignment: {
      clientName: "TechCorp Inc.",
      projectName: "Cloud Migration Platform",
      billingRate: 95,
      startDate: "2024-02-01",
      endDate: "2024-08-31",
      hoursPerWeek: 40,
      totalBilled: 28500,
    },
  },
  {
    id: "2",
    name: "Sarah M.",
    role: "React Frontend Developer",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    experience: "5-8 years",
    rate: 65,
    currency: "USD",
    status: "available",
    availableFrom: "2024-01-10",
    locationPreference: ["Remote"],
    summary: "Frontend specialist with a passion for creating beautiful, accessible user interfaces. Strong focus on performance optimization.",
    assignment: null,
  },
  {
    id: "3",
    name: "Mike R.",
    role: "DevOps Engineer",
    skills: ["AWS", "Docker", "Terraform", "CI/CD", "Python"],
    experience: "5-8 years",
    rate: 80,
    currency: "USD",
    status: "assigned",
    availableFrom: "2024-01-20",
    locationPreference: ["Remote", "On-site"],
    summary: "DevOps expert specializing in cloud infrastructure and automation. Reduced deployment time by 80% in previous engagements.",
    assignment: {
      clientName: "FinanceHub LLC",
      projectName: "Infrastructure Modernization",
      billingRate: 100,
      startDate: "2024-01-25",
      endDate: "2024-06-30",
      hoursPerWeek: 40,
      totalBilled: 16000,
    },
  },
  {
    id: "4",
    name: "Emily K.",
    role: "Data Scientist",
    skills: ["Python", "TensorFlow", "SQL", "Machine Learning"],
    experience: "3-5 years",
    rate: 70,
    currency: "USD",
    status: "available",
    availableFrom: "2024-02-01",
    locationPreference: ["Hybrid"],
    summary: "Data scientist with expertise in building predictive models and deriving actionable insights from complex datasets.",
    assignment: null,
  },
];

const ActiveResources = () => {
  const [resources, setResources] = useState(mockResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState<typeof mockResources[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "assigned" | "available">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFilter =
      filterStatus === "all" || resource.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  const handleFilterChange = (status: "all" | "assigned" | "available") => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleViewResource = (resource: typeof mockResources[0]) => {
    setSelectedResource(resource);
    setIsDetailOpen(true);
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
    toast.success("Resource removed successfully");
  };

  const handleEditResource = (id: string) => {
    toast.info("Edit functionality coming soon");
  };

  const assignedCount = resources.filter((r) => r.status === "assigned").length;
  const availableCount = resources.filter((r) => r.status === "available").length;

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-tight">Active Resources</h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your bench talent</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <Card className="border-0 shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-lg md:rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Total Resources</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">{resources.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-lg md:rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Assigned</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{assignedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-lg md:rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Available</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400">{availableCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-slate-400 dark:text-slate-500" />
                <Input
                  placeholder="Search by name, role, or skills..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 sm:pl-12 h-9 sm:h-11 md:h-12 rounded-lg sm:rounded-xl text-sm border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => handleFilterChange("all")}
                  className="rounded-lg sm:rounded-xl text-xs sm:text-sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "assigned" ? "default" : "outline"}
                  onClick={() => handleFilterChange("assigned")}
                  className="rounded-lg sm:rounded-xl text-xs sm:text-sm"
                >
                  Assigned
                </Button>
                <Button
                  variant={filterStatus === "available" ? "default" : "outline"}
                  onClick={() => handleFilterChange("available")}
                  className="rounded-lg sm:rounded-xl text-xs sm:text-sm"
                >
                  Available
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="col-span-full p-6 sm:p-8 md:p-12 text-center">
            <Users className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 text-slate-300 dark:text-slate-700 mx-auto mb-3 sm:mb-4" />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">No resources found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {paginatedResources.map((resource) => (
              <Card key={resource.id} className="border-0 shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                  {/* Profile Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm sm:text-lg flex-shrink-0">
                        {resource.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base truncate">{resource.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 sm:mt-1">
                          <Building2 className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">Bench</span>
                        </p>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-xs mt-2">
                          ✓ AI Verified
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base line-clamp-2">{resource.role}</h4>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {resource.skills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs rounded-full"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {resource.skills.length > 3 && (
                      <Badge className="bg-blue-50 text-blue-600 text-xs rounded-full">
                        +{resource.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center gap-2 text-xs sm:text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Experience</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100 text-right">{resource.experience}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-xs sm:text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Availability</span>
                      <span className={`font-medium whitespace-nowrap ${resource.status === 'assigned' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {resource.status === 'assigned' ? '● Assigned' : `● Available ${resource.availableFrom}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-xs sm:text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Rate Card</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">${resource.rate}<span className="text-slate-500 dark:text-slate-400">/hr</span></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-lg border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm h-9 sm:h-10"
                      onClick={() => handleViewResource(resource)}
                    >
                      View Profile
                    </Button>
                    <Button
                      className="flex-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm h-9 sm:h-10"
                      onClick={() => {
                        toast.success(`Request sent for ${resource.name}`);
                      }}
                    >
                      Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4 py-3 sm:py-4 md:py-6 bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border-0">
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
                <span className="block sm:inline">Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredResources.length)}</span>
                <span className="hidden sm:inline"> of </span>
                <span className="block sm:inline">{filteredResources.length} resources</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 md:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg text-xs sm:text-xs h-8 sm:h-9 px-2 sm:px-3 w-full sm:w-auto"
                >
                  ← Prev
                </Button>
                
                <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto max-w-full">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="rounded-lg w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 p-0 text-xs flex-shrink-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg text-xs sm:text-xs h-8 sm:h-9 px-2 sm:px-3 w-full sm:w-auto"
                >
                  Next →
                </Button>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </>
        )}

        {/* Resource Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-slate-900 dark:border-slate-700 w-full sm:w-[90%] md:w-full mx-2 sm:mx-0 rounded-lg sm:rounded-2xl">
            {selectedResource && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0">
                      {selectedResource.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">{selectedResource.name}</h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">{selectedResource.role}</p>
                    </div>
                    <Badge
                      className={`ml-auto ${
                        selectedResource.status === "assigned"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {selectedResource.status === "assigned" ? "Assigned" : "Available"}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                  {/* Resource Info */}
                  <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg sm:rounded-xl">
                    <CardHeader className="pb-2 sm:pb-3">
                      <CardTitle className="text-sm sm:text-base flex items-center gap-2 dark:text-slate-100">
                        <User className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500" />
                        Resource Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{selectedResource.summary}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <Briefcase className="h-4 w-4 text-slate-400" />
                          <span>{selectedResource.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <DollarSign className="h-4 w-4 text-slate-400" />
                          <span>${selectedResource.rate}/hr ({selectedResource.currency})</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span>Available: {selectedResource.availableFrom}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span>{selectedResource.locationPreference.join(", ")}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-100 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {selectedResource.skills.slice(0, 4).map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 sm:px-3 py-1 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {selectedResource.skills.length > 4 && (
                            <Badge className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 text-xs">
                              +{selectedResource.skills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assignment Info (if assigned) */}
                  {selectedResource.assignment && (
                    <Card className="border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg sm:rounded-xl">
                      <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-sm sm:text-base flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                          <Building2 className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                          Assignment Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Client</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                              {selectedResource.assignment.clientName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Project</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                              {selectedResource.assignment.projectName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Start Date</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                              {selectedResource.assignment.startDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">End Date</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                              {selectedResource.assignment.endDate}
                            </p>
                          </div>
                      
                        </div>

                        <div className="border-t border-emerald-200 dark:border-emerald-800 pt-3 sm:pt-4">
                          <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">Billing Information</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="bg-white dark:bg-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-emerald-200 dark:border-emerald-800">
                              <p className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                ${selectedResource.assignment.billingRate}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Billing Rate/hr</p>
                            </div>
                            <div className="bg-white dark:bg-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-emerald-200 dark:border-emerald-800">
                              <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                                {selectedResource.assignment.hoursPerWeek}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Hours/Week</p>
                            </div>
                            <div className="bg-white dark:bg-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-emerald-200 dark:border-emerald-800">
                              <p className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ${selectedResource.assignment.totalBilled.toLocaleString()}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Total Billed</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Not Assigned Info */}
                  {!selectedResource.assignment && (
                    <Card className="border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30 rounded-lg sm:rounded-xl">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <Clock className="h-8 sm:h-10 w-8 sm:w-10 text-amber-500 dark:text-amber-400 mx-auto mb-2 sm:mb-3" />
                        <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1 text-sm">Currently Available</p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          This resource is not assigned to any project and is ready for new opportunities.
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsDetailOpen(false)}
                      className="rounded-lg dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => handleEditResource(selectedResource.id)}
                      className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-xs sm:text-sm"
                    >
                      <Edit className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                      Edit Resource
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ActiveResources;