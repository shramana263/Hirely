"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ViewApplicantsPage() {
  const router = useRouter();

  const applicants = [
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      address: "Kolkata, India",
      speciality: "React, Tailwind CSS",
    },
    {
      name: "Priya Verma",
      email: "priya@example.com",
      address: "Delhi, India",
      speciality: "UI/UX Design, Figma",
    },
    {
      name: "Arjun Mehta",
      email: "arjun@example.com",
      address: "Mumbai, India",
      speciality: "JavaScript, Next.js",
    },
    {
      name: "Sneha Gupta",
      email: "sneha@example.com",
      address: "Bangalore, India",
      speciality: "Python, Django",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Applicants List
          </h1>
          <Button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Back
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                  Speciality
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                    {applicant.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    {applicant.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    {applicant.address}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    {applicant.speciality}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
