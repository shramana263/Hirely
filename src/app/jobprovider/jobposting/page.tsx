"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import EditJobModal from "./updatejob";
import axiosClient from "@/library/axiosClient";

interface Job {
  _id: string;
  name: string;
  job_type: string;
  address: string;
  min_salary: number;
  max_salary: number;
  created_at: string;
}

export default function JobPostingsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosClient.get("/jobs");
        setJobs(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <p className="p-6">Loading jobs...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Job Posting</h1>
          <button
            onClick={() => router.push("/jobprovider/jobposting/createjob")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium transition-transform hover:scale-105"
          >
            <Plus size={16} /> Post New Job
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                {job.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{job.job_type}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {job.address}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                ₹{job.min_salary} – ₹{job.max_salary}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on {new Date(job.created_at).toLocaleDateString()}
              </p>

              <div className="mt-4 flex gap-6">
                <button
                  onClick={() =>
                    router.push(`/jobprovider/jobposting/viewjob/${job._id}`)
                  }
                  className="flex items-center gap-1 text-green-600 hover:text-green-800"
                >
                  <Eye size={18} /> View
                </button>
                <button
                  onClick={() => console.log("Edit", job._id)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} /> Edit
                </button>
                <button
                  onClick={() => console.log("Delete", job._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
