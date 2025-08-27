// "use client";
// export default function filters() {
//   return (
//     <div>
//       <h1>job provider filters</h1>
//     </div>
//   );
// }


"use client";

import { toast } from "sonner";

export default function Filters() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Job Provider Filters</h1>

      <button
        onClick={() =>
          toast.success("Filter applied successfully! 🎉")
        }
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Apply Filter
      </button>

      <button
        onClick={() =>
          toast.error("Failed to apply filter ❌")
        }
        className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Show Error
      </button>
    </div>
  );
}
