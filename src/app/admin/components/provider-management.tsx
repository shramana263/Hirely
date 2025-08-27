"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmationModal } from "./confirmation-modal"
import { MoreHorizontal, ArrowUpDown, Eye, CheckCircle, X, Building } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Provider {
  id: string
  name: string
  email: string
  contact_no: string
  status: "pending" | "approved" | "rejected"
  industry: string
  joinDate: string
  jobPostings: number
}



export function ProviderManagement() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean
    title: string
    description: string
    onConfirm: () => void
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
  })


    useEffect(() => {
      async function fetchUsers() {
        const accessToken = sessionStorage.getItem("accessToken");
        const res = await fetch("http://localhost:6008/api/admin/providers", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        const data = await res.json()
        if (data.success) {
          console.log(data.data);
          
          setProviders(data.data)
        }
      }
      fetchUsers()
    }, [])

  const handleProviderAction = (providerId: string, action: "approve" | "reject") => {
    setProviders(
      providers.map((provider) =>
        provider.id === providerId ? { ...provider, status: action === "approve" ? "approved" : "rejected" } : provider,
      ),
    )
  }

  const showConfirmation = (title: string, description: string, onConfirm: () => void) => {
    setConfirmationModal({
      open: true,
      title,
      description,
      onConfirm,
    })
  }

  const handleApprove = (provider: Provider) => {
    showConfirmation(
      "Approve Provider",
      `Are you sure you want to approve ${provider.name} from ${provider.name}?`,
      () => handleProviderAction(provider.id, "approve"),
    )
  }

  const handleReject = (provider: Provider) => {
    showConfirmation(
      "Reject Provider",
      `Are you sure you want to reject ${provider.name} from ${provider.name}?`,
      () => handleProviderAction(provider.id, "reject"),
    )
  }

  const columns: ColumnDef<Provider>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
           
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
           
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "contact_no",
      header: ({ column }) => (
        <Button
           
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "jobPostings",
      header: ({ column }) => (
        <Button
           
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Job Postings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "joinDate",
      header: ({ column }) => (
        <Button
           
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Join Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const provider = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button  className="h-8 w-12 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                Monitor Job Postings
              </DropdownMenuItem>
              {provider.status === "pending" && (
                <>
                  <DropdownMenuItem onClick={() => handleApprove(provider)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Provider
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReject(provider)}>
                    <X className="mr-2 h-4 w-4" />
                    Reject Provider
                  </DropdownMenuItem>
                </>
              )}
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
          <CardTitle>Provider Management</CardTitle>
          <CardDescription>Manage service providers, approve applications, and monitor job postings.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={providers} searchKey="company" searchPlaceholder="Search providers..." />
        </CardContent>
      </Card>

      <ConfirmationModal
        open={confirmationModal.open}
        onOpenChange={(open) => setConfirmationModal((prev) => ({ ...prev, open }))}
        title={confirmationModal.title}
        description={confirmationModal.description}
        onConfirm={() => {
          confirmationModal.onConfirm()
          setConfirmationModal((prev) => ({ ...prev, open: false }))
        }}
      />
    </div>
  )
}
