"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {theme === "dark" ? (
        <Sun className="hover:bg-gray-700 cursor-pointer" size={26} />
      ) : (
        <Moon className="hover:bg-gray-300 cursor-pointer" size={26} />
      )}
    </button>
  );
}
