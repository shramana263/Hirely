// "use client";

// import Link from "next/link";
// import { useState } from "react";
// // import { Menu, X } from "lucide-react";

// import { useRouter } from "next/navigation";
// import axiosClient from "@/library/axiosClient";
// // import { Button } from "@/components/ui/button";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const navItems = [
//     {label: "Dashboard",path:"/jobprovider"},
//     { label: "Profile", path: "/jobprovider/profile" },
//     { label: "Job Appliers", path: "/jobprovider/appliers" },
//     { label: "Job Postings", path: "/jobprovider/jobposting" },
//     { label: "Shortlisted", path: "/jobprovider/shortlisted" },

//   ];

//   return (
//     <>
//       {/* <Button
//         onClick={toggleSidebar}
//         className="fixed md:hidden cursor-pointer z-30 top-4 left-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
//         aria-label="Toggle menu"
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </Button> */}

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`bg-gray-200 dark:bg-gray-800 w-64 p-5 space-y-6 border-r border-gray-200 dark:border-gray-700 fixed h-full z-20 md:bg-white md:p-8 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//           }`}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-bold mb-2 text-gray-800 dark:text-gray-100 text-3xl font-sans md:text-3xl">
//             <Link href="/jobprovider">HIRELY</Link>
//           </h2>
//           {/* <button
//             onClick={toggleSidebar}
//             className="md:hidden p-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
//             aria-label="Close menu"
//           >
//             <X size={20} />
//           </button> */}
//         </div>

//         <nav className="flex flex-col gap-2 md:gap-3 text-sm font-bold">
//           {navItems.map(({ label, path }) => (
//             <Link
//               key={path}
//               href={path}
//               onClick={() => setIsOpen(false)}
//               className="p-2 md:p-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
//             >
//               {label}
//             </Link>
//           ))}

//           <button
//             onClick={async () => {
//               sessionStorage.clear();

//               try {
//                 await axiosClient.get("/auth/logout", {
//                   method: "POST",
                  
//                 });
//               } catch (err) {
//                 console.error("Logout error:", err);
//               }

//               alert("Logout successfully");
//               setIsOpen(false);
//               router.push("/");
//             }}

//             className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 p-2 md:p-2.5 rounded-md text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-bold text-left transition-colors"
//             aria-label="Logout"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>
//     </>
//   );
// }