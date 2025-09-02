import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Seeker Dashboard - Hirely",
  description: "Find your dream job with Hirely",
};

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <main>{children}</main>
    </div>
  );
}