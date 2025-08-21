"use client"

import { Users, Building2, Tags, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ activeSection, setActiveSection, collapsed, setCollapsed }: SidebarProps) {
  const menuItems = [
    { id: "users", label: "User Management", icon: Users },
    { id: "providers", label: "Provider Management", icon: Building2 },
    { id: "skills", label: "Skill Provider", icon: Tags },
  ]

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold text-sidebar-foreground">Admin Panel</h1>}
          <Button
         
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-950 hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Button
              
                  className={cn(
                    "w-full justify-start text-gray-900 hover:bg-sidebar-accent",
                    activeSection === item.id && "bg-sidebar-accent  text-gray-900",
                    collapsed && "px-2",
                  )}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
