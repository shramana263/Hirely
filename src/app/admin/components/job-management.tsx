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
}

export function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axiosClient.get("/jobs")
        if (res.data.success) {
          setJobs(res.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      }
    }
    fetchJobs()
  }, [])

  const columns: ColumnDef<Job>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "job_type",
      header: "Type",
    },
    {
      accessorKey: "status",
      header: "Status",
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
              <Button className="h-8 w-12 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {/* Add more actions if needed */}
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
          <CardDescription>Manage job postings.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={jobs} searchKey="name" searchPlaceholder="Search jobs..." />
        </CardContent>
      </Card>
    </div>
  )
}