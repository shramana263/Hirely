// "use client";

// import { toast } from "sonner";

// export default function Filters() {
//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Job Provider Filters</h1>

//       <button
//         onClick={() =>
//           toast.success("Filter applied successfully! 🎉")
//         }
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//       >
//         Apply Filter
//       </button>

//       <button
//         onClick={() =>
//           toast.error("Failed to apply filter ")
//         }
//         className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//       >
//         Show Error
//       </button>
//     </div>
//   );
// }
// components/Breadcrumbs.js
'use client'; 

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment); // Split and remove empty segments

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const displaySegment = segment.replace(/-/g, ' '); // Replace hyphens with spaces for readability

          return (
            <li key={href} className="flex items-center">
              <span>/</span>
              {isLast ? (
                <span className="ml-2 capitalize">{displaySegment}</span>
              ) : (
                <Link href={href} className="ml-2 capitalize">
                  {displaySegment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;