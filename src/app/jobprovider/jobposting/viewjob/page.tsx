"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ViewJobPage() {
  const router = useRouter();

  const job = {
    title: "Frontend Developer",
    company: "Robin Studios",
    location: "Remote",
    salary: "₹8–10 LPA",
    type: "Full-time",
    postedOn: "August 2, 2025",
    description: `We are looking for a skilled Frontend Developer with experience in React and Tailwind CSS.

Responsibilities:
- Build responsive interfaces
- Collaborate with backend teams
- Write clean and maintainable code

Requirements:
- 1+ year experience
- Strong HTML, CSS, JS skills`,
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl text-gray-800 dark:text-white">
            {job.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{job.company}</p>
          <p className="text-sm text-gray-400 mt-1">Posted on {job.postedOn}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1"><b>Location</b></p>
            <p className="text-gray-700 dark:text-gray-200">{job.location}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1"><b>Job Type</b></p>
            <p className="text-gray-700 dark:text-gray-200">{job.type}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1"><b>Salary</b></p>
            <p className="text-gray-700 dark:text-gray-200">{job.salary}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-2">Job Description</p>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base font-normal">
            {job.description}
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
