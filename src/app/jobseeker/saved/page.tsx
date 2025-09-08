"use client";

import { useEffect, useState, useRef } from "react";
import {
  Filter,
  Search,
  Briefcase,
  MapPin,
  Clock,
  Building2,
  DollarSign,
  Bookmark,
  ExternalLink,
  Users,
  ArrowLeft
} from "lucide-react";
import savedJobService, { SavedJob } from "@/services/savedJobService";
import JobSeekerNavbar from "@/components/JobSeekerNavbar";
import applicationService from "@/services/applicationService";
import JobApplicationModal from "@/components/JobApplicationModal";
import Link from "next/link";

// Utility function to check authentication
const checkAuthentication = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    isAuthenticated: !!token,
    token
  };
};

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const locationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!isLocationOpen) return;
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setIsLocationOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLocationOpen(false);
    };

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isLocationOpen]);

  const [authInfo, setAuthInfo] = useState<{isAuthenticated: boolean, token: string | null}>({
    isAuthenticated: false,
    token: null
  });

  // Update auth info whenever component mounts or updates
  useEffect(() => {
    const { isAuthenticated, token } = checkAuthentication();
    setAuthInfo({ isAuthenticated, token });

    // Check profile completion if authenticated
    if (isAuthenticated && token) {
      checkProfileCompletion();
      fetchAppliedJobIds();
      fetchSavedJobs();
    }
  }, []);

  const checkProfileCompletion = async () => {
    try {
      const response = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:6008' : 'https://jobsite-api.wishalpha.com'}/api/jobseekers/profile`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Simple check for profile completion
          const complete = data.data?.firstName && data.data?.lastName && data.data?.email;
          setIsProfileComplete(complete);
        }
      }
    } catch (error) {
      console.error("Failed to check profile completion:", error);
      setIsProfileComplete(false);
    }
  };

  const fetchAppliedJobIds = async () => {
    try {
      const appliedIds = await applicationService.getAppliedJobIds();
      console.log("Fetched applied job IDs:", appliedIds);
      setAppliedJobIds(new Set(appliedIds));
    } catch (error) {
      console.error("Failed to fetch applied job IDs:", error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await savedJobService.getMySavedJobs();
      console.log("Fetched saved jobs:", response);
      setSavedJobs(response.data.savedJobs);

      // Extract unique locations from saved jobs
      const locations = Array.from(new Set(
        response.data.savedJobs.map(saved => saved.job_id.address)
      ));
      setAvailableLocations(locations);
      setError(null);
    } catch (error: any) {
      console.error("Failed to fetch saved jobs:", error);

      if (error.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError("Failed to load saved jobs. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Map of known city substrings -> canonical city name
  const cityMap: Record<string, string> = {
    'bengaluru': 'Bangalore',
    'bangalore': 'Bangalore',
  };

  const extractCity = (address: string) => {
    if (!address) return "";
    const lowerAddress = address.toLowerCase();
    for (const [key, value] of Object.entries(cityMap)) {
      if (lowerAddress.includes(key)) return value;
    }
    // Try to extract city-like patterns
    const words = address.split(',').map(w => w.trim());
    if (words.length > 1) return words[words.length - 1];
    return address.split(' ')[0];
  };

  const normalizeJobType = (raw?: string) => {
    if (!raw) return raw || "";
    const s = raw.toLowerCase();
    if (s.includes('full')) return 'Full time';
    if (s.includes('part')) return 'Part time';
    if (s.includes('intern')) return 'Internship';
    if (s.includes('freelance')) return 'Freelance';
    if (s.includes('contract')) return 'Contract';
    return raw.replace(/\b\w/g, c => c.toUpperCase());
  };

  const filteredJobs = savedJobs.filter(savedJob => {
    const job = savedJob.job_id;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      job.name.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      (job.address || '').toLowerCase().includes(q);

    const jobTypeNormalized = normalizeJobType(job.job_type);
    const matchesType = selectedTypes.size === 0 || selectedTypes.has(jobTypeNormalized);
    const jobCity = extractCity(job.address);
    const matchesLocation = selectedLocation === "All" || jobCity === selectedLocation;

    return matchesSearch && matchesType && matchesLocation;
  });

  const toggleSaveJob = async (jobId: string) => {
    try {
      await savedJobService.unsaveJob(jobId);
      // Remove from local state
      setSavedJobs(prev => prev.filter(saved => saved.job_id._id !== jobId));
    } catch (error) {
      console.error(`Failed to unsave job ${jobId}:`, error);
      alert("Failed to remove job from saved jobs. Please try again.");
    }
  };

  const handleApplyJob = async (jobId: string) => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setError("Please log in to apply for jobs.");
      return;
    }

    // Find the job details from saved jobs
    const savedJob = savedJobs.find(saved => saved.job_id._id === jobId);
    if (savedJob) {
      setSelectedJob(savedJob.job_id);
      setIsApplicationModalOpen(true);
    }
  };

  const handleViewJobDetails = (jobId: string) => {
    // You can implement navigation to job details page here
    console.log("View job details:", jobId);
  };

  const handleSubmitApplication = async (applicationData: any) => {
    try {
      console.log("Submitting application:", applicationData);
      // You can implement the application submission logic here
      // For now, just close the modal
      setIsApplicationModalOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      if (num >= 100000) {
        return `${(num / 100000).toFixed(1)}L`;
      }
      if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}K`;
      }
      return num.toString();
    };
    return `₹${formatNumber(min)} - ₹${formatNumber(max)}`;
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <JobSeekerNavbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading saved jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes("Authentication required") || error.includes("Please log in") || error.includes("Authentication failed");

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <JobSeekerNavbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center max-w-md">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 text-sm">
              <p className="font-semibold mb-2">Debug Information:</p>
              <p className="text-left">
                <strong>Token exists:</strong> {authInfo.isAuthenticated ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="space-y-2">
              {isAuthError ? (
                <div className="space-x-4">
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => window.location.href = '/register'}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <button
                  onClick={fetchSavedJobs}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <JobSeekerNavbar />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Back button and title */}
            <div className="flex items-center gap-4">
              <Link
                href="/jobseeker"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Jobs
              </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Saved Jobs
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredJobs.length} saved job{filteredJobs.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search saved jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Filter size={20} className="text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Type
                    </label>
                    <div className="space-y-2">
                      {['Full time', 'Part time', 'Internship', 'Freelance', 'Contract'].map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedTypes.has(type)}
                            onChange={(e) => {
                              const newSelected = new Set(selectedTypes);
                              if (e.target.checked) {
                                newSelected.add(type);
                              } else {
                                newSelected.delete(type);
                              }
                              setSelectedTypes(newSelected);
                            }}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <div className="relative" ref={locationRef}>
                      <button
                        type="button"
                        onClick={() => setIsLocationOpen(v => !v)}
                        className="w-full text-left py-1.5 px-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-100"
                      >
                        {selectedLocation === 'All' ? 'All' : selectedLocation}
                      </button>

                      {isLocationOpen && (
                        <ul className="absolute left-0 right-0 mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-h-60 overflow-auto shadow-lg">
                          <li
                            key="all"
                            onClick={() => { setSelectedLocation('All'); setIsLocationOpen(false); }}
                            className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            All
                          </li>
                          {availableLocations.map(loc => (
                            <li
                              key={loc}
                              onClick={() => { setSelectedLocation(loc); setIsLocationOpen(false); }}
                              className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              {loc}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar space-y-4">
                {filteredJobs.map((savedJob) => {
                  const job = savedJob.job_id;
                  return (
                    <div
                      key={savedJob._id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                    >
                      <div className="p-6">
                        {/* Job Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h2
                              className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-2"
                              onClick={() => handleViewJobDetails(job._id)}
                            >
                              {job.name}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              <Building2 size={16} className="text-gray-500 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400 truncate">
                                {job.provider_id?.name || "Company Name"}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleSaveJob(job._id)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 ml-4"
                            aria-label="Remove from saved jobs"
                          >
                            <Bookmark size={20} className="text-blue-600 fill-current" />
                          </button>
                        </div>

                        {/* Job Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400 truncate">{job.address}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {formatSalary(job.min_salary, job.max_salary)}
                            </span>
                          </div>
                        </div>

                        {/* Job Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        {/* Job Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              {normalizeJobType(job.job_type)}
                            </span>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <Clock size={14} />
                              <span>{getTimeAgo(job.created_at)}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApplyJob(job._id)}
                              disabled={!isProfileComplete}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isProfileComplete
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {appliedJobIds.has(job._id) ? 'Applied' : 'Apply Now'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredJobs.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <Bookmark size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No saved jobs found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {savedJobs.length === 0
                        ? "You haven't saved any jobs yet. Start browsing and save jobs you're interested in!"
                        : "Try adjusting your search terms or filters"
                      }
                    </p>
                    {savedJobs.length === 0 && (
                      <Link
                        href="/jobseeker"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Briefcase size={16} />
                        Browse Jobs
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        job={selectedJob}
        isOpen={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedJob(null);
        }}
        onSubmit={handleSubmitApplication}
      />
    </div>
  );
}
