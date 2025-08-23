
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/jobprovider/components/data-table";


// Applicants data (more entries for testing pagination)
const applicants = [
  { id: 1, user_id: 101, first_name: "Rahul", middle_name: "", last_name: "Sharma", dob: "1998-05-12", contact_no: "9876543210", address: "Kolkata, India", skills: "React, Tailwind, Next.js", secondary_experience: "88%", highersecondary_experience: "91%", cgpa: "8.5", experience_year: "2 Years" },
  { id: 2, user_id: 102, first_name: "Priya", middle_name: "K", last_name: "Verma", dob: "2000-09-21", contact_no: "9876001234", address: "Delhi, India", skills: "UI/UX, Figma, HTML, CSS", secondary_experience: "92%", highersecondary_experience: "89%", cgpa: "9.0", experience_year: "1 Year" },
  { id: 3, user_id: 103, first_name: "Amit", middle_name: "R", last_name: "Kumar", dob: "1997-11-15", contact_no: "9876504321", address: "Mumbai, India", skills: "Node.js, Express, MongoDB", secondary_experience: "85%", highersecondary_experience: "87%", cgpa: "8.2", experience_year: "3 Years"  },
  { id: 4, user_id: 104, first_name: "Sneha", middle_name: "", last_name: "Patel", dob: "1999-02-28", contact_no: "9876112233", address: "Bangalore, India", skills: "Python, Django, Flask", secondary_experience: "90%", highersecondary_experience: "88%", cgpa: "9.1", experience_year: "2 Years"  },
  { id: 5, user_id: 105, first_name: "Karan", middle_name: "S", last_name: "Gupta", dob: "2001-07-19", contact_no: "9876223344", address: "Hyderabad, India", skills: "Java, Spring Boot, MySQL", secondary_experience: "89%", highersecondary_experience: "90%", cgpa: "8.8", experience_year: "1 Year" },
  { id: 6, user_id: 106, first_name: "Anjali", middle_name: "", last_name: "Rao", dob: "1998-12-05", contact_no: "9876334455", address: "Chennai, India", skills: "HTML, CSS, JavaScript", secondary_experience: "93%", highersecondary_experience: "92%", cgpa: "9.2", experience_year: "2 Years"},
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
  { accessorKey: "dob", header: "DOB" },
  { accessorKey: "contact_no", header: "Contact" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "skills", header: "Skills" },
  {
    accessorKey: "secondary_experience",
    header: "Education",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="space-y-1">
          <div>10th: {row.secondary_experience}</div>
          <div>12th: {row.highersecondary_experience}</div>
          <div>CGPA: {row.cgpa}</div>
        </div>
      );
    },
  },
  { accessorKey: "experience_year", header: "Experience" },

];

export default function ApplicantsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">Applicants List</h1>
          <Button onClick={() => router.push(`/jobprovider/jobposting/viewjob`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-lg">
            Back
          </Button>
        </div>

      
        <DataTable columns={columns} data={applicants} searchKey="first_name" pageSize={5} />
      </div>
    </div>
  );
}
