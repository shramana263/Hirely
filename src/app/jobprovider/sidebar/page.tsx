"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import axiosClient from "@/library/axiosClient";

interface SidebarProps {
  isOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setSidebarOpen }: SidebarProps) {
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", path: "/jobprovider" },
    { label: "Profile", path: "/jobprovider/profile" },
    { label: "Job Appliers", path: "/jobprovider/appliers" },
    { label: "Job Postings", path: "/jobprovider/jobposting" },
    { label: "Shortlisted", path: "/jobprovider/filters" },
  ];

  return (
    <>
    
      <button
        onClick={() => setSidebarOpen(!isOpen)}
        className="fixed md:hidden z-40 top-4 left-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`bg-gray-200 dark:bg-gray-800 w-64 p-5 space-y-6 border-r border-gray-200 dark:border-gray-700 fixed h-full z-40 md:bg-white md:p-8 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo + close */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 text-2xl md:text-3xl">
            <Link href="/jobprovider">HIRELY</Link>
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2 md:gap-3 text-sm font-bold">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              onClick={() => setSidebarOpen(false)}
              className="p-2 md:p-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}

   
          <button
            onClick={async () => {
              sessionStorage.clear();
              try {
                await axiosClient.get("/auth/logout", { method: "POST" });
              } catch (err) {
                console.error("Logout error:", err);
              }
              toast.success("Logout successfully");
              setSidebarOpen(false);
              router.push("/");
            }}
            className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 p-2 md:p-2.5 rounded-md text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-bold text-left transition-colors"
            aria-label="Logout"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
