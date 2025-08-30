"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface JobSeekerNavbarProps {
  userName?: string;
  userImage?: string;
}

export default function JobSeekerNavbar({ userName, userImage }: JobSeekerNavbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; image?: string }>({ name: "" });

  useEffect(() => {
    // Get user info from session storage
    const storedUserName = sessionStorage.getItem("userName") || userName || "User";
    setUser({
      name: storedUserName,
      image: userImage
    });
  }, [userName, userImage]);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userName");
    
    // Redirect to login page
    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/jobseeker/profile");
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-gray-800 shadow-sm border-b border-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/jobseeker" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-300 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-100">Hirely</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/jobseeker"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/jobseeker/saved"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Saved Jobs
            </Link>
            <Link
              href="/jobseeker/applications"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Applications
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      Job Seeker
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
