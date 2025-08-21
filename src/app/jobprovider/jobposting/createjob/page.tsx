
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/library/axiosClient";

export default function CreateJobForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    job_type: "",
    address: "",
    requirement: "",
    min_salary: "",
    max_salary: "",
  });

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await axiosClient.post("/jobs", {
      ...form,
      min_salary: Number(form.min_salary),
      max_salary: Number(form.max_salary),
    });

    alert("Job created successfully!");
    console.log(response.data);
    router.push("/jobprovider/jobposting");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      alert(error.response.data.message || "Failed to create job");
    } else {
      alert("Network error, please try again.");
    }
  }
};
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-10 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">
          Create New Job
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="job_type"
              className="block text-sm font-medium mb-1"
            >
              Job Type
            </label>
            <input
              type="text"
              name="job_type"
              id="job_type"
              value={form.job_type}
              onChange={handleChange}
              placeholder="Full-time / Part-time / Internship"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="min_salary"
              className="block text-sm font-medium mb-1"
            >
              Minimum Salary (INR)
            </label>
            <input
              type="number"
              name="min_salary"
              id="min_salary"
              value={form.min_salary}
              onChange={handleChange}
              required
              min={0}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="max_salary"
              className="block text-sm font-medium mb-1"
            >
              Maximum Salary (INR)
            </label>
            <input
              type="number"
              name="max_salary"
              id="max_salary"
              value={form.max_salary}
              onChange={handleChange}
              required
              min={0}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Job Description
            </label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="requirement"
              className="block text-sm font-medium mb-1"
            >
              Requirements
            </label>
            <textarea
              name="requirement"
              id="requirement"
              value={form.requirement}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="pt-4 flex justify-between ">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold text-sm shadow transition-transform hover:scale-105"
            >
              Post Job
            </button>
            <button
              onClick={() => router.push("/jobprovider/jobposting")}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold text-sm shadow transition-transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
