"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axiosClient from "@/library/axiosClient";

export default function ViewJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosClient.get(`/jobs/${jobId}`);
        setJob(res.data.data);
      } catch (error) {
        console.error("Failed to fetch job", error);
      } finally {
        setLoading(false);
      }
    };
    if (jobId) fetchJob();
  }, [jobId]);

  if (loading) {
    return <p className="p-6">Loading job...</p>;
  }

  if (!job) {
    return <p className="p-6">Job not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl text-gray-800 dark:text-white">
            {job.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{job.job_type}</p>
          <p className="text-sm text-gray-400 mt-1">
            Posted on {new Date(job.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <p className="text-sm text-gray-500 mb-1">
              <b>Location</b>
            </p>
            <p className="text-gray-700 dark:text-gray-200">{job.address}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <p className="text-sm text-gray-500 mb-1">
              <b>Job Type</b>
            </p>
            <p className="text-gray-700 dark:text-gray-200">{job.job_type}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <p className="text-sm text-gray-500 mb-1">
              <b>Salary</b>
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              ₹{job.min_salary} – ₹{job.max_salary}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500 mb-2">Job Description</p>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500 mb-2">Requirements</p>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {job.requirement}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
