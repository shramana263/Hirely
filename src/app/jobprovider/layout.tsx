// "use client";

// import { ReactNode } from "react";
// import Sidebar from "./sidebar/page";
// import Navbar from "./navbar/page";

// export default function SidebarProvider({
//   sidebarOpen,
//   setSidebarOpen,
//   children,
// }: {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
//   children: ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       <div
//         className={`
//           flex-grow 
//           bg-gray-50 dark:bg-gray-900 
//           text-gray-900 dark:text-gray-100
//           transition-all duration-300
//           ${sidebarOpen ? "ml-64" : "ml-0 md:ml-64"}
//         `}
//       >
//         <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

//         <main className="pt-16 px-4 sm:px-6 pb-6">{children}</main>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { ReactNode, useState } from "react";
// import Navbar from "./navbar/page";

// export default function Layout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
//       <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      
//       <div className={`
//         transition-all duration-300 ease-in-out
//         ${menuOpen ? 'ml-[75%] md:ml-[300px]' : 'ml-0'}
//       `}>
//         <main className="
//           flex-grow
//           mx-auto w-full max-w-7xl
//           px-4 sm:px-6 lg:px-8
//           py-8 pt-24
//           text-gray-900 dark:text-gray-100
//         ">
//           <div className="
//             bg-white dark:bg-gray-800
//             rounded-xl shadow-sm
//             p-6 sm:p-8
//             border border-gray-200 dark:border-gray-700
//           ">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




"use client";

import { ReactNode, useState } from "react";
import Navbar from "./navbar/page";

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      
      {/* Main content area */}
      <div className={`
        flex-1
        transition-all duration-300 ease-in-out
        ${menuOpen ? 'pl-[65%] md:pl-[220px]' : 'pl-0'}
      `}>
        <main className="
          w-full
          mx-auto
          px-4 sm:px-6
          py-4 pt-16
          text-gray-900 dark:text-gray-100
        ">
          {/* Container with responsive padding */}
          <div className="
            bg-white dark:bg-gray-800
            rounded-lg shadow-sm
            p-4 sm:p-6
            border border-gray-200 dark:border-gray-700
            min-h-[calc(100vh-8rem)]  // Adjust based on your header height
          ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}