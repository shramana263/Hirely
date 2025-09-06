"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmationModal } from "./confirmation-modal"
import { MoreHorizontal, ArrowUpDown, Eye, CheckCircle, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axiosClient from "@/library/axiosClient"

export interface Provider {
  id: string
  name: string 
  email: string 
  status: "active" | "inactive" | "blocked"
  joinedAt: string
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
    async function fetchProviders() {
      try {
        const res = await axiosClient.get("/admin/providers")
        console.log("Providers API Response:", res.data)
        if (res.data.success) {
          const mappedProviders = res.data.data.map((provider: any) => ({
            id: provider._id || provider.id,
            name: provider.name,
            email: provider.email,
            status: provider.status,
            joinedAt: provider.joinedAt || provider.createdAt,
          }))
          console.log("Mapped providers:", mappedProviders)
          setProviders(mappedProviders)
        }
      } catch (error) {
        console.error("Failed to fetch providers:", error)
      }
    }
    fetchProviders()
  }, [])

  const handleProviderAction = async (providerId: string, action: "block" | "unblock") => {
    try {
      const newStatus = action === "block" ? "blocked" : "active"
      const res = await axiosClient.put(`/admin/users/${providerId}/status`, {
        status: newStatus
      })

      if (res.data.success) {
        setProviders(
          providers.map((provider) =>
            provider.id === providerId 
              ? { ...provider, status: newStatus }
              : provider
          )
        )
      }
    } catch (error) {
      console.error("Failed to update provider status:", error)
    }
  }

  const showConfirmation = (title: string, description: string, onConfirm: () => void) => {
    setConfirmationModal({
      open: true,
      title,
      description,
      onConfirm,
    })
  }

  const handleBlock = (provider: Provider) => {
    showConfirmation(
      "Block Provider",
      `Are you sure you want to block ${provider.name}? They won't be able to access their account.`,
      () => handleProviderAction(provider.id, "block"),
    )
  }

  const handleUnblock = (provider: Provider) => {
    showConfirmation(
      "Unblock Provider", 
      `Are you sure you want to unblock ${provider.name}?`,
      () => handleProviderAction(provider.id, "unblock"),
    )
  }

  const columns: ColumnDef<Provider>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = status === "active" ? "default" : status === "blocked" ? "destructive" : "secondary"
        return (
          <Badge >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "joinedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Join Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.getValue("joinedAt") as string
        if (!date) return "N/A"
        try {
          const dateObj = new Date(date)
          return isNaN(dateObj.getTime()) ? "Invalid Date" : dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        } catch (error) {
          return "Invalid Date"
        }
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const provider = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-12 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {provider.status === "active" ? (
                <DropdownMenuItem onClick={() => handleBlock(provider)}>
                  <X className="mr-2 h-4 w-4" />
                  Block Provider
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => handleUnblock(provider)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Unblock Provider
                </DropdownMenuItem>
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
          <CardDescription>Manage job providers registered on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={providers} searchKey="name" searchPlaceholder="Search providers..." />
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