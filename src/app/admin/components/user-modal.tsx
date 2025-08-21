"use client"

import { useState, useEffect } from "react"
import type { User } from "./user-management"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserModalProps {
  user: User | null
  mode: "view" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (user: User) => void
}

export function UserModal({ user, mode, open, onOpenChange, onSave }: UserModalProps) {
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    status: "pending",
    joinDate: "",
    lastLogin: "",
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleSave = () => {
    onSave(formData)
  }

  const isViewMode = mode === "view"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isViewMode ? "View User" : "Edit User"}</DialogTitle>
          <DialogDescription>
            {isViewMode ? "View user details and information." : "Make changes to user information here."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3"
              disabled={isViewMode}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="col-span-3"
              disabled={isViewMode}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            {isViewMode ? (
              <div className="col-span-3">
                <Badge
                 
                >
                  {formData.status}
                </Badge>
              </div>
            ) : (
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "blocked" | "pending") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="joinDate" className="text-right">
              Join Date
            </Label>
            <Input id="joinDate" value={formData.joinDate} className="col-span-3" disabled />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastLogin" className="text-right">
              Last Login
            </Label>
            <Input id="lastLogin" value={formData.lastLogin} className="col-span-3" disabled />
          </div>
        </div>

        <DialogFooter>
          <Button  onClick={() => onOpenChange(false)}>
            {isViewMode ? "Close" : "Cancel"}
          </Button>
          {!isViewMode && <Button onClick={handleSave}>Save Changes</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
