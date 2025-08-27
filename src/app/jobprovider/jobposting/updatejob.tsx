"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedOn: string;
  job_type: string;
  description: string;
  requirement: string;
  min_salary: string;
  max_salary: string;
}

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EditJobModal({
  isOpen,
  onClose,
  job,
  onFormChange,
  onSubmit,
}: EditJobModalProps) {
  if (!isOpen || !job) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-10"
    >
   
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal background"
      />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6  bg-white dark:bg-gray-800 z-10 py-2">
          <h2 className="text-xl font-bold">Edit Job</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Job Title</label>
            <Input
              name="title"
              value={job.title}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Company</label>
            <Input
              name="company"
              value={job.company}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Location</label>
            <Input
              name="location"
              value={job.location}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Posted On</label>
            <Input
              name="postedOn"
              value={job.postedOn}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Job Type</label>
            <input
              name="job_type"
              value={job.job_type}
              onChange={onFormChange}
              placeholder="Full-time / Part-time / Internship"
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Job Description</label>
            <Textarea
              name="description"
              value={job.description}
              onChange={onFormChange}
              rows={4}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Requirements</label>
            <Textarea
              name="requirement"
              value={job.requirement}
              onChange={onFormChange}
              rows={3}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Minimum Salary (INR)</label>
            <Input
              name="min_salary"
              type="number"
              min={0}
              value={job.min_salary}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Maximum Salary (INR)</label>
            <Input
              name="max_salary"
              type="number"
              min={0}
              value={job.max_salary}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}