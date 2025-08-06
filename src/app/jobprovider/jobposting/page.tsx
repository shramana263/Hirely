"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Eye } from "lucide-react"; // Added Eye icon
import EditJobModal from "./updatejob";
import { useRouter } from "next/navigation";

 interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedOn: string;
}

export default function JobPostingsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([
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
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Hub",
      location: "Bangalore, India",
      postedOn: "20th July 2025",
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  const openEditModal = (job: Job) => {
    setCurrentJob(job);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentJob(null);
  };


  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentJob((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJob) return;

    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === currentJob.id ? currentJob : job))
    );
    closeEditModal();
  };


  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };
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
              key={job.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 flex flex-col justify-between border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  {job.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {job.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {job.location}
                </p>
              </div>

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Posted on:</span> {job.postedOn}
              </div>
              <div className="mt-4 flex gap-6">
                <button
                  onClick={() => openEditModal(job)}
                  title="Edit"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition transform hover:scale-105 active:scale-95"
                >
                  <Pencil size={18} />
                  <span className="text-sm">Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(job.id)}
                  title="Delete"
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 transition transform hover:scale-105 active:scale-95"
                >
                  <Trash2 size={20} />
                  <span className="text-sm">Delete</span>
                </button>
                <button
                  onClick={() => router.push(`/jobprovider/jobposting/viewjob`)}
                  title="View Job"
                  className="flex items-center gap-1 text-green-600 hover:text-green-800 transition transform hover:scale-105 active:scale-95"
                >
                  <Eye size={18} />
                  <span className="text-sm">View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <EditJobModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit} job={null}        />
      </div>
    </div>
  );
}
