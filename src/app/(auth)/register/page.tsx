"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/library/axiosClient";

import { AxiosError } from "axios";
import { Eye, EyeOff, Mail, Lock, User, Briefcase, UserPlus, ArrowRight, ChevronDown } from "lucide-react";
import {  toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker", 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({ ...prev, role }));
    setIsRoleDropdownOpen(false);
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      toast("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post("/auth/register", formData);
        toast.success("Registration successful! Please login.");
      // Redirect based on role
      if (formData.role === "jobprovider") router.push("/login");
      else if (formData.role === "admin") router.push("/login");
      else if (formData.role === "jobseeker") router.push("/login");

    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
    
      if (axiosError.response) {
        setError(axiosError.response.data?.message || "Login failed");
      } else {
        setError("Login failed");
         toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "jobseeker": return <User className="w-5 h-5" />;
      case "admin": return <Lock className="w-5 h-5" />;
      case "jobprovider": return <Briefcase className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getRoleLabel = (role:string) => {
    switch (role) {
      case "jobseeker": return "Job Seeker";
      case "admin": return "Administrator";
      case "jobprovider": return "Job Provider";
      default: return "Job Seeker";
    }
  };

  const roles = [
    { value: "jobseeker", label: "Job Seeker", icon: User, description: "Looking for opportunities" },
    { value: "admin", label: "Administrator", icon: Lock, description: "Platform management" },
    { value: "jobprovider", label: "Job Provider", icon: Briefcase, description: "Hiring talent" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glass morphism card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Logo/Brand area */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Us</h1>
            <p className="text-gray-300">Create your account to get started</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Role Selection */}
            <div className="relative">
              <label className="block text-gray-300 text-sm font-medium mb-2">Account Type</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {getRoleIcon(formData.role)}
                    <span>{getRoleLabel(formData.role)}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isRoleDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {roles.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => handleRoleSelect(role.value)}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 text-white border-b border-white/5 last:border-b-0"
                        >
                          <IconComponent className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-sm text-gray-400">{role.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/10"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/10"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" />
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-300 text-sm animate-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <button 
                onClick={() => router.push("/login")}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Floating elements for extra visual interest */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full animate-bounce" style={{ animationDelay: "1s", animationDuration: "3s" }}></div>
        <div className="absolute -top-2 -right-8 w-4 h-4 bg-purple-500/30 rounded-full animate-bounce" style={{ animationDelay: "2s", animationDuration: "4s" }}></div>
        <div className="absolute -bottom-6 -right-2 w-6 h-6 bg-cyan-500/20 rounded-full animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}></div>
      </div>
    </div>
  );
}