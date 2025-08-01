// components/JobPostingsPage.tsx
"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedOn: string;
}

export default function JobPostingsPage() {
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Robin Studios",
      location: "Kolkata, India",
      postedOn: "31st July 2025",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Tech Innovators",
      location: "Delhi, India",
      postedOn: "28th July 2025",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Creative Solutions",
      location: "Mumbai, India",
      postedOn: "25th July 2025",
    },
  ]);

  const handleEdit = (id: number) => alert(`Edit job with ID ${id}`);
  const handleDelete = (id: number) => alert(`Deleted job with ID ${id}`);
  const handleNewJob = () => alert("Open 'Post New Job' modal or form");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Job Posting Management</h1>
          <button
            onClick={handleNewJob}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium transition-transform hover:scale-105"
          >
            <Plus size={16} /> Post New Job
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm sm:text-base text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 font-semibold text-left">Job Title</th>
                <th className="px-4 py-3 font-semibold text-left">Company</th>
                <th className="px-4 py-3 font-semibold text-left">Location</th>
                <th className="px-4 py-3 font-semibold text-left">Posted On</th>
                <th className="px-4 py-3 font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                    No job postings available.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="px-4 py-3">{job.title}</td>
                    <td className="px-4 py-3">{job.company}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">{job.postedOn}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(job.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
