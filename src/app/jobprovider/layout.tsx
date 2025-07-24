"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar/page";

export default function SidebarProvider({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow ml-64 transition-all duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
}
