"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserModal } from "./user-modal"
import { MoreHorizontal, ArrowUpDown, Eye, Edit, Ban, CheckCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axiosClient from "@/library/axiosClient"


export interface User {
  id: string
  name: string
  email: string
  status: "active" | "blocked" | "pending"
  joinDate: string
  lastLogin: string
}



export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"view" | "edit">("view")

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axiosClient.get("/admin/allusers")
        if (res.data.success) {
          setUsers(res.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }
    fetchUsers()
  }, [])


  const handleUserAction = (userId: string, action: "block" | "unblock") => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, status: action === "block" ? "blocked" : "active" } : user)),
    )
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setModalMode("view")
    setModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setModalMode("edit")
    setModalOpen(true)
  }

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge>
            {status}
          </Badge>
        )
      },
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
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button  className="h-8 w-12 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewUser(user)}>
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUserAction(user.id, user.status === "blocked" ? "unblock" : "block")}
              >
                {user.status === "blocked" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Unblock User
                  </>
                ) : (
                  <>
                    <Ban className="mr-2 h-4 w-4" />
                    Block User
                  </>
                )}
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
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user accounts, view profiles, and control user access.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={users} searchKey="name" searchPlaceholder="Search users..." />
        </CardContent>
      </Card>

      <UserModal
        user={selectedUser}
        mode={modalMode}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={(updatedUser) => {
          setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
          setModalOpen(false)
        }}
      />
    </div>
  )
}
