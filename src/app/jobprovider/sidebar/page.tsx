"use client";

import { useSidebar } from "../layout"; 
import Link from "next/link";
import { X } from "lucide-react";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
   
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`bg-gray-200 w-64 p-5 space-y-6 border-r border-gray-200 fixed h-full z-20 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800 rounded-md hover:bg-gray-100 text-3xl">
            <Link href="/jobprovider">Dashboard</Link>
          </h2>
          <button
            className="p-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-3 text-sm font-bold">
          {[
            { label: "Profile", path: "/jobprovider/pages/profile" },
            { label: "Job Appliers", path: "/jobprovider/pages/appliers" },
            { label: "Job Postings", path: "/jobprovider/pages/jobposting" },
            { label: "Shortlisted", path: "/jobprovider/pages/shortlisted" },
            { label: "Filter (Skills)", path: "/jobprovider/pages/filters" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className="p-2.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              onClick={closeSidebar} // close sidebar on click 
            >
              {label}
            </Link>
          ))}
    <button
            onClick={() => {
              alert("Logout clicked! Implement logout logic.");
              closeSidebar();
            }}
            className="flex items-center hover:bg-gray-100 gap-2 p-2.5 rounded-md text-gray-600 hover:text-gray-900 font-bold"
            aria-label="Logout"
          >
          
            Logout
          </button>
      

        
        </nav>
      </aside>
    </>
  );
}
