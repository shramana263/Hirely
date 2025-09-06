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
  role: "admin" | "jobseeker" | "jobprovider"
  status: "active" | "inactive" | "blocked"
  joinedAt: string  
  createdAt: string
  updatedAt: string
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
        console.log("API Response:", res.data) // Debug log
        if (res.data.success) {
          const mappedUsers = res.data.data.map((user: any) => ({
            ...user,
            id: user._id || user.id,  
            joinedAt: user.joinedAt || user.createdAt,  
          }))
          console.log("Mapped users:", mappedUsers) 
          setUsers(mappedUsers)
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }
    fetchUsers()
  }, [])

 const handleUserAction = async (userId: string, action: "block" | "unblock") => {
    try {
      console.log("User ID:", userId) // Debug log to see what ID we're getting
      
      // Make API call to update user status on backend
      const newStatus = action === "block" ? "blocked" : "active"
      const res = await axiosClient.put(`/admin/users/${userId}/status`, {
        status: newStatus
      })

      if (res.data.success) {
        // Only update local state if API call succeeds
        setUsers(
          users.map((user) => 
            user.id === userId 
              ? { ...user, status: newStatus }
              : user
          )
        )
      }
    } catch (error) {
      console.error("Failed to update user status:", error)
      
    }
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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return (
          <Badge >
            {role}
          </Badge>
        )
      },
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
      accessorKey: "joinedAt", // Changed to match the mapped field
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
        const dateObj = new Date(date)
        return isNaN(dateObj.getTime()) ? "Invalid Date" : dateObj.toLocaleDateString()
      },
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
