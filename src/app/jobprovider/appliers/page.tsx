"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../components/data-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ✅ Applicants sample data
const applicants = [
  {
    id: 1,
    user_id: 101,
    first_name: "Rahul",
    middle_name: "Nath",
    last_name: "Sharma",
    dob: "1998-05-12",
    address: "Kolkata, India",
    skills: "React, Tailwind, Next.js",
    secondary_experience: "88%",
    highersecondary_experience: "91%",
    cgpa: "8.5",
    experience_year: "2 Years",
    email: "rahul.sharma@example.com",
    status: "Active",
    job_name: "Frontend Developer",
  },
  {
    id: 2,
    user_id: 102,
    first_name: "Priya",
    middle_name: "Kumar",
    last_name: "Verma",
    dob: "2000-09-21",
    address: "Delhi, India",
    skills: "UI/UX, Figma, HTML, CSS",
    secondary_experience: "92%",
    highersecondary_experience: "89%",
    cgpa: "9.0",
    experience_year: "1 Year",
    email: "priya.verma@example.com",
    status: "Inactive",
    job_name: "UI/UX Designer",
  },
  {
    id: 3,
    user_id: 103,
    first_name: "Amit",
    middle_name: "",
    last_name: "Kumar",
    dob: "1997-11-15",
    address: "Mumbai, India",
    skills: "Node.js, Express, MongoDB",
    secondary_experience: "85%",
    highersecondary_experience: "87%",
    cgpa: "8.2",
    experience_year: "3 Years",
    email: "amit.kumar@example.com",
    status: "Active",
    job_name: "Backend Developer",
  },
  {
    id: 4,
    user_id: 104,
    first_name: "Sneha",
    middle_name: "",
    last_name: "Patel",
    dob: "1999-02-28",
    address: "Bangalore, India",
    skills: "Python, Django, Flask",
    secondary_experience: "90%",
    highersecondary_experience: "88%",
    cgpa: "9.1",
    experience_year: "2 Years",
    email: "sneha.patel@example.com",
    status: "Active",
    job_name: "Python Developer",
  },
  {
    id: 5,
    user_id: 105,
    first_name: "Karan",
    middle_name: "Kr",
    last_name: "Gupta",
    dob: "2001-07-19",
    address: "Hyderabad, India",
    skills: "Java, Spring Boot, MySQL",
    secondary_experience: "89%",
    highersecondary_experience: "90%",
    cgpa: "8.8",
    experience_year: "1 Year",
    email: "karan.gupta@example.com",
    status: "Inactive",
    job_name: "Java Developer",
  },
  {
    id: 6,
    user_id: 106,
    first_name: "Anjali",
    middle_name: "",
    last_name: "Rao",
    dob: "1998-12-05",
    address: "Chennai, India",
    skills: "HTML, CSS, JavaScript",
    secondary_experience: "93%",
    highersecondary_experience: "92%",
    cgpa: "9.2",
    experience_year: "2 Years",
    email: "anjali.rao@example.com",
    status: "Inactive",
    job_name: "Frontend Developer",
  },
];


const columns: ColumnDef<typeof applicants[0]>[] = [
  {
    accessorKey: "first_name",
    header: "Name",
    cell: (info) => {
      const row = info.row.original;
      return `${row.first_name} ${row.middle_name || ""} ${row.last_name}`;
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const row = info.row.original;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      );
    },
  },
  { accessorKey: "experience_year", header: "Experience" },
  { accessorKey: "job_name", header: "Job Name" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const applicant = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="h-8 w-12 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => alert(`Edit ${applicant.first_name}`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Delete ${applicant.first_name}`)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function ApplicantsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 border border-gray-200 dark:border-gray-700">

        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/jobprovider" className="hover:underline">
                jobprovider
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-800 dark:text-gray-200 font-medium">
              appliers
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl text-gray-800 dark:text-white font-extrabold">
            Applicants List
          </h1>
          <Button
            onClick={() => router.push("/jobprovider")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-lg"
          >
            Back
          </Button>
        </div>

   
        <DataTable
          columns={columns}
          data={applicants}
          searchKey="first_name"
          pageSize={4}
        />
      </div>
    </div>
  );
}
