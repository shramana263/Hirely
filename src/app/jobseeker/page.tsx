"use client";

import { useEffect, useState } from "react";
import { 
  Filter,
  Search,
  Briefcase
} from "lucide-react";
import jobService, { Job } from "@/services/jobService";
import JobCard from "@/components/JobCard";
import JobSeekerNavbar from "@/components/JobSeekerNavbar";
import jobSeekerService from "@/services/jobSeekerService";
import applicationService from "@/services/applicationService";
import JobApplicationModal from "@/components/JobApplicationModal";

// Utility function to check authentication
const checkAuthentication = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    isAuthenticated: !!token,
    token
  };
};

export default function JobSeekerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [authInfo, setAuthInfo] = useState<{isAuthenticated: boolean, token: string | null}>({
    isAuthenticated: false,
    token: null
  });
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  // Update auth info whenever component mounts or updates
  useEffect(() => {
    const { isAuthenticated, token } = checkAuthentication();
    setAuthInfo({ isAuthenticated, token });
    
    // Check profile completion if authenticated
    if (isAuthenticated && token) {
      checkProfileCompletion();
      fetchAppliedJobIds(); // Also fetch applied jobs
    }
  }, []);

  const checkProfileCompletion = async () => {
    try {
      const response = await jobSeekerService.getProfile();
      if (response.success) {
        const complete = jobSeekerService.isProfileComplete(response.data);
        setIsProfileComplete(complete);
      }
    } catch (error) {
      console.error("Failed to check profile completion:", error);
      // Don't set profile as complete if we can't check
      setIsProfileComplete(false);
      
      // Check if it's an authentication error
      if (error instanceof Error && error.message.includes("Authentication")) {
        console.log("Authentication error, redirecting to login");
        // Could redirect to login here if needed
      }
    }
  };

  const fetchAppliedJobIds = async () => {
    try {
      const appliedIds = await applicationService.getAppliedJobIds();
      console.log("Fetched applied job IDs:", appliedIds);
      setAppliedJobIds(new Set(appliedIds));
    } catch (error) {
      console.error("Failed to fetch applied job IDs:", error);
      // Keep existing applied jobs in state if fetch fails
    }
  };

  const refreshJobs = async () => {
    try {
      setLoading(true);
      
      // Check if token exists in session storage
      const { isAuthenticated, token } = checkAuthentication();
      setAuthInfo({ isAuthenticated, token });
      
      if (!token) {
        setError("Please log in to view job listings.");
        setLoading(false);
        return;
      }

      console.log("Fetching jobs using service...");
      const response = await jobService.getAllJobs();
      console.log("Jobs response:", response);
      setJobs(response.data || []);
      setError(null);
    } catch (error: any) {
      console.error("Failed to fetch jobs", error);
      
      // Handle different types of errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError("Authentication failed. Please log in again.");
      } else if (error.message?.includes("Authentication required")) {
        setError("Please log in to view job listings.");
      } else {
        setError("Failed to load jobs. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.job_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleApplyJob = async (jobId: string) => {
    // Check if token exists before applying
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setError("Please log in to apply for jobs.");
      return;
    }

    // Check if profile is complete
    if (!isProfileComplete) {
      setError("Please complete your profile before applying for jobs. Go to your profile page to add all required information.");
      return;
    }

    // Check if already applied for this job
    if (appliedJobIds.has(jobId)) {
      alert("You have already applied for this job.");
      return;
    }

    // Find the job and open the application modal
    const job = jobs.find(j => j._id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsApplicationModalOpen(true);
    }
  };

  const handleSubmitApplication = async (applicationData: { cover_letter?: string; resume_url?: string }) => {
    if (!selectedJob) return;

    try {
      console.log("Submitting application for job:", selectedJob._id, "with data:", applicationData);
      
      const response = await applicationService.applyForJob(selectedJob._id, applicationData);
      
      if (response.success) {
        // Add the job ID to applied jobs set
        setAppliedJobIds(prev => new Set([...prev, selectedJob._id]));
        
        alert("Application submitted successfully! You can check your application status in the Applications section.");
        console.log("Applied successfully to job:", selectedJob._id);
        
        // Close modal and reset selected job
        setIsApplicationModalOpen(false);
        setSelectedJob(null);
      }
    } catch (error: any) {
      console.error("Failed to apply for job:", error);
      throw error; // Re-throw to be handled by the modal
    }
  };

  const handleViewJobDetails = (jobId: string) => {
    // Navigate to job details page
    console.log("View job details:", jobId);
    // You can implement navigation here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <JobSeekerNavbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading job opportunities...</p>
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
            <p className="text-left">
              <strong>Token (first 20 chars):</strong> {authInfo.token ? authInfo.token.substring(0, 20) + '...' : 'None'}
            </p>
            <p className="text-left">
              <strong>Jobs loaded:</strong> {jobs.length}
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
                onClick={refreshJobs} 
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
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Job Recommendations
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
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
                    {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <div className="space-y-2">
                    {['Entry level', 'Mid level', 'Senior level', 'Executive'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isSaved={savedJobs.has(job._id)}
                  onToggleSave={toggleSaveJob}
                  onApply={handleApplyJob}
                  onViewDetails={handleViewJobDetails}
                  isProfileComplete={isProfileComplete}
                  isApplied={appliedJobIds.has(job._id)}
                />
              ))}

              {filteredJobs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Briefcase size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
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