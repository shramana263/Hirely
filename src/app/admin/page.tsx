"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { TopNavbar } from "./components/top-navbar"
import { UserManagement } from "./components/user-management"
import { ProviderManagement } from "./components/provider-management"
import { SkillProvider } from "./components/skill-provider"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("users")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />
      case "providers":
        return <ProviderManagement />
      case "skills":
        return <SkillProvider />
      default:
        return <UserManagement />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
