"use client"

import { Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopNavbarProps {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

export function TopNavbar({ sidebarCollapsed, setSidebarCollapsed }: TopNavbarProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
         
          
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-semibold text-card-foreground">Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">
          <Button>
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/admin-avatar.png" alt="Admin" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
