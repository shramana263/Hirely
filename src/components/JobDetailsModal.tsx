"use client";

import { X, MapPin, Clock, Building2, DollarSign, Briefcase, Calendar, Users } from "lucide-react";
import { Job } from "@/services/jobService";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  if (!isOpen || !job) return null;

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Job Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Job Title and Company */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {job.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Building2 size={20} />
              <span className="text-lg">{job.company || "Company Name"}</span>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <MapPin className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{job.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Briefcase className="text-green-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Job Type</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{job.job_type}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <DollarSign className="text-yellow-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Salary Range</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {formatSalary(job.min_salary, job.max_salary)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Clock className="text-purple-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Posted</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {getTimeAgo(job.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Experience Level */}
          {job.experience_level && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Experience Level
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                {job.experience_level}
              </span>
            </div>
          )}

          {/* Job Description */}
          {job.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Job Description
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Requirements/Skills */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Requirements & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Application Deadline */}
          {job.application_deadline && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Application Deadline
              </h3>
              <div className="flex items-center gap-2">
                <Calendar className="text-red-600" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  {formatDate(job.application_deadline)}
                </span>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Job ID:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{job._id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Posted Date:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {formatDate(job.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
