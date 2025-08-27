/* eslint-disable react/jsx-no-undef */
"use client";

import { ReactNode} from "react";
import Sidebar from "./sidebar/page";
import Navbar from "./navbar/page";


export default function SidebarProvider({ sidebarOpen, setSidebarOpen, children }: { children: ReactNode, sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) {

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content area */}
      <div className={`
        flex-grow 
        bg-gray-50 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        transition-all duration-300
        ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-64'}
      `}>
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
   
        <main className="pt-16 px-4 sm:px-6 pb-6">
          {children}
        
        </main>
      </div>
    </div>
  );
}

