
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/jobprovider/components/data-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Applicants data
const applicants = [
  {
    id: 1,
    user_id: 101,
    first_name: "Rahul",
    middle_name: "",
    last_name: "Sharma",
    email: "rahul.sharma@example.com",
    status: "Active",
    experience_year: "2 Years",
    job_name: "Frontend Developer",
  },
  {
    id: 2,
    user_id: 102,
    first_name: "Priya",
    middle_name: "K",
    last_name: "Verma",
    email: "priya.verma@example.com",
    status: "Inactive",
    experience_year: "1 Year",
    job_name: "UI/UX Designer",
  },
  {
    id: 3,
    user_id: 103,
    first_name: "Amit",
    middle_name: "R",
    last_name: "Kumar",
    email: "amit.kumar@example.com",
    status: "Active",
    experience_year: "3 Years",
    job_name: "Backend Developer",
  },
  {
    id: 4,
    user_id: 104,
    first_name: "Sneha",
    middle_name: "",
    last_name: "Patel",
    email: "sneha.patel@example.com",
    status: "Active",
    experience_year: "2 Years",
    job_name: "Python Developer",
  },
  {
    id: 5,
    user_id: 105,
    first_name: "Karan",
    middle_name: "S",
    last_name: "Gupta",
    email: "karan.gupta@example.com",
    status: "Inactive",
    experience_year: "1 Year",
    job_name: "Java Developer",
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
          <DropdownMenuTrigger asChild>
             <Button className="h-8 w-12 p-0 hover:bg-transparent focus-visible:ring-0"
            >
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
            Applicants List
          </h1>
          <Button
            onClick={() => router.push(`/jobprovider/jobposting`)}
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
