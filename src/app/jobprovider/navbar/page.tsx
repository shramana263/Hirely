// "use client";

// import { Menu } from "lucide-react"; // Hamburger icon
// import ThemeToggle from "../components/ThemeToggle/page";

// interface NavbarProps {
//   onToggleSidebar: () => void;
// }

// export default function Navbar({ onToggleSidebar }: NavbarProps) {
//   return (
//     <nav
//       className="
//         fixed top-0 left-0 right-0 z-50
//         bg-white/30 dark:bg-gray-900/30 backdrop-blur-md
//         border-b border-gray-300/40 dark:border-gray-700/40
//         p-3  shadow-sm
//         md:left-64 md:right-0 md:px-6
//         flex items-center justify-between
//       "
//     >

//       <button
//         onClick={onToggleSidebar}
//         className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//         aria-label="Toggle sidebar"
//       >
//         <Menu size={24} />
//       </button>
//       <div className="flex-1"></div>
//       <ThemeToggle />
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axiosClient from "@/library/axiosClient";
import ThemeToggle from "../components/ThemeToggle/page";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/jobprovider" },
    { label: "Profile", path: "/jobprovider/profile" },
    { label: "Job Appliers", path: "/jobprovider/appliers" },
    { label: "Job Postings", path: "/jobprovider/jobposting" },
    { label: "Shortlisted", path: "/jobprovider/shortlisted" },
  ];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    onMenuToggle();
  };

  const handleLogout = async () => {
    try {
      sessionStorage.clear();
      await axiosClient.get("/auth/logout", { method: "POST" });
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {/* Sidebar - Now appears above navbar with higher z-index */}
      <div
        className={`
        fixed top-0 left-0 bottom-0 z-50
        w-[65%] md:w-[220px]  
        bg-white dark:bg-gray-800
        border-r border-gray-200 dark:border-gray-700
        shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <Link
              href="/jobprovider"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              HIRELY
            </Link>
            <Button
              
              className="text-gray-700 dark:text-gray-300"
              onClick={handleMenuToggle}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleMenuToggle}
                className={`
                  block px-3 py-4 rounded-md text-sm font-bold 
                  ${
                    pathname === item.path
                      ? "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
                      : "text-gray-700  dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleMenuToggle();
                handleLogout();
              }}
              className="    block px-3 py-4 rounded-md w-full text-left text-sm font-bold text-red-600 dark:text-red-400 hover:underline"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-7">
              {!menuOpen && (
                <Button
             
              
                  className="p-2 text-white bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600"
                  onClick={handleMenuToggle}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              )}
              <div className="font-bold text-xl flex flex-1 justify-center align-middle text-gray-900 dark:text-white">
                Hirely{" "}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
