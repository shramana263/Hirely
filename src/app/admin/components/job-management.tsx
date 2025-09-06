"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axiosClient from "@/library/axiosClient"

export interface Job {
  id: string
  name: string
  job_type: string
  status: string
  provider_id: {
    _id: string
    name: string
    email: string
  }
  provider_name: string 
}

export function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axiosClient.get("/admin/alljobs")
        console.log("Jobs API Response:", res.data)
        if (res.data.success) {
          const mappedJobs = res.data.data.map((job: any, index: number) => {
            console.log(`Job ${index}:`, job) // Debug each job
            console.log(`Provider ID:`, job.provider_id) // Debug provider_id
            
            return {
              id: job._id || job.id,
              name: job.name,
              job_type: job.job_type,
              status: job.status,
              provider_id: job.provider_id,
              provider_name: job.provider_id?.name || "Unknown Provider"
            }
          })
          console.log("Mapped jobs:", mappedJobs)
          setJobs(mappedJobs)
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      }
    }
    fetchJobs()
  }, [])

  const columns: ColumnDef<Job>[] = [
    {
      id: "serial",
      header: "Sl No",
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>
      },
    },
    {
      accessorKey: "name",
      header: "Job Title",
    },
    {
      accessorKey: "provider_name",
      header: "Provider Name",
      cell: ({ row }) => {
        const providerName = row.getValue("provider_name") as string
        return <div>{providerName || "Unknown Provider"}</div>
      },
    },
    {
      accessorKey: "job_type",
      header: "Job Type",
      cell: ({ row }) => {
        const jobType = row.getValue("job_type") as string
        return (
          <span className="capitalize">
            {jobType?.replace('-', ' ') || "Not specified"}
          </span>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusColors = {
          open: "text-green-600 bg-green-100",
          closed: "text-red-600 bg-red-100",
          filled: "text-blue-600 bg-blue-100"
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || "text-gray-600 bg-gray-100"}`}>
            {status || "unknown"}
          </span>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const job = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-12 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log('View job:', job)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Management</CardTitle>
          <CardDescription>Manage job postings and monitor job providers.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={jobs} searchKey="name" searchPlaceholder="Search jobs..." />
        </CardContent>
      </Card>
    </div>
  )
}