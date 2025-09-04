import {
  MapPin,
  Clock,
  Building2,
  DollarSign,
  BookmarkPlus,
  Bookmark,
  ExternalLink,
  Users,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { Job } from "@/services/jobService";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onApply?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
  isProfileComplete?: boolean;
  isApplied?: boolean;
}

export default function JobCard({ 
  job, 
  isSaved, 
  onToggleSave, 
  onApply, 
  onViewDetails,
  isProfileComplete = false,
  isApplied = false
}: JobCardProps) {
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-800">
      <div className="p-6">
        {/* Job Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 
              className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-2"
              onClick={() => onViewDetails?.(job._id)}
            >
              {job.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Building2 size={16} className="text-gray-500 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 truncate">
                {job.company || "Company Name"}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => onToggleSave(job._id)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 ml-4"
            aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          >
            {isSaved ? (
              <Bookmark size={20} className="text-blue-600 fill-current" />
            ) : (
              <BookmarkPlus size={20} className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 truncate">{job.address}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">{job.job_type}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              {formatSalary(job.min_salary, job.max_salary)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              {getTimeAgo(job.created_at)}
            </span>
          </div>
        </div>

        {/* Job Description Preview */}
        {job.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {job.description}
          </p>
        )}

        {/* Skills/Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Experience Level */}
        {job.experience_level && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              {job.experience_level}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => {
              if (!isProfileComplete) {
                alert("Please complete your profile before applying for jobs. Go to Profile to complete your details.");
                return;
              }
              if (isApplied) {
                alert("You have already applied for this job.");
                return;
              }
              onApply?.(job._id);
            }}
            disabled={!isProfileComplete || isApplied}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm ${
              !isProfileComplete
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isApplied
                ? "bg-green-100 text-green-700 border border-green-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            title={
              !isProfileComplete 
                ? "Complete your profile to apply for jobs" 
                : isApplied
                ? "You have already applied for this job"
                : "Apply for this job"
            }
          >
            {!isProfileComplete && <AlertCircle size={16} />}
            <Users size={16} />
            {!isProfileComplete 
              ? "Complete Profile to Apply" 
              : isApplied 
              ? "Already Applied" 
              : "Easy Apply"
            }
          </button>
          <button 
            onClick={() => onViewDetails?.(job._id)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
          >
            <ExternalLink size={16} />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
