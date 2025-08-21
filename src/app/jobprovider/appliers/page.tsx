"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ApplicantsPage() {
  const router = useRouter();

  // Example static data (in real app, fetch from DB / API)
  const applicants = [
    {
      id: 1,
      user_id: 101,
      contact_no: "9876543210",
      first_name: "Rahul",
      middle_name: "",
      last_name: "Sharma",
      dob: "1998-05-12",
      resume_path: "/resumes/rahul.pdf",
      resume_link: "http://example.com/resumes/rahul",
      address: "Kolkata, India",
      skills: "React, Tailwind, Next.js",
      country: "India",
      secondary_experience: "88%",
      highersecondary_experience: "91%",
      cgpa: "8.5",
      experience_year: "2 Years",
      additional_link: "",
    },
    {
      id: 2,
      user_id: 102,
      contact_no: "9876001234",
      first_name: "Priya",
      middle_name: "K",
      last_name: "Verma",
      dob: "2000-09-21",
      resume_path: "/resumes/priya.pdf",
      resume_link: "http://example.com/resumes/priya",
      address: "Delhi, India",
      skills: "UI/UX, Figma, HTML, CSS",
      country: "India",
      secondary_experience: "92%",
      highersecondary_experience: "89%",
      cgpa: "9.0",
      experience_year: "1 Year",
      additional_link: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Applicants List
          </h1>
          <Button
            onClick={() => router.push("/jobprovider")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Back
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  DOB
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Contact
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Address
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Skills
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Education
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Experience
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Resume
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b">
                  Portfolio
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a, idx) => (
                <tr
                  key={a.id}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                >
                  <td className="px-4 py-3 border-b text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {`${a.first_name} ${a.middle_name || ""} ${a.last_name}`}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {a.dob}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600 dark:text-gray-300">
                    {a.contact_no}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600 dark:text-gray-300">
                    {a.address}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600 dark:text-gray-300">
                    {a.skills || "-"}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600 dark:text-gray-300">
                    <div>10th: {a.secondary_experience || "-"}</div>
                    <div>12th: {a.highersecondary_experience || "-"}</div>
                    <div>CGPA: {a.cgpa || "-"}</div>
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600 dark:text-gray-300">
                    {a.experience_year || "-"}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <a
                      href={a.resume_link}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="px-4 py-3 border-b">
                    {a.additional_link ? (
                      <a
                        href={a.additional_link}
                        target="_blank"
                        className="text-green-600 hover:underline"
                      >
                        Portfolio
                      </a>
                    ) : (
                      "-"
                    )}
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
