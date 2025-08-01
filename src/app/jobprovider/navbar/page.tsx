
"use client";

import { Menu } from "lucide-react"; // Hamburger icon
import ThemeToggle from "../components/ThemeToggle/page";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50 
        bg-white/30 dark:bg-gray-900/30 backdrop-blur-md 
        border-b border-gray-300/40 dark:border-gray-700/40 
        p-3  shadow-sm
        md:left-64 md:right-0 md:px-6
        flex items-center justify-between
      "
    >
      {/* Hamburger button - visible only on mobile */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Spacer to keep theme toggle on right */}
      <div className="flex-1"></div>

      <ThemeToggle />
    </nav>
  );
}
