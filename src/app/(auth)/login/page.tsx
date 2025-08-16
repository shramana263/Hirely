"use client";


import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosClient from "@/library/axiosClient";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("pet_owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post("/auth/login", { email, password });
      const userRole = response.data.user.role;
      const token = response.data.accessToken;
      sessionStorage.setItem("accessToken", token);

      if (userRole === "jobseeker") router.push("/jobprovider");
      else if (userRole === "admin") router.push("/jobprovider");
      else if (userRole === "jobprovider") router.push("/jobprovider");

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <h2 className="text-3xl mb-4">Login</h2>
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     className="border p-2 mb-2"
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     className="border p-2 mb-2"
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
    //     Login
    //   </button>
    //   <p className="text-red-500 mt-2">{error}</p>
    //   <p className="mt-4 text-blue-500 cursor-pointer" onClick={() => router.push("/register")}>
    //     Don't have an account? Register
    //   </p>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>


  <div className="relative z-10 w-full max-w-sm">

  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">

          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-gray-300 text-base">Sign in to your account</p>
          </div>


          <div className="space-y-5">

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/10 text-base"
              />
            </div>

            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/10 text-base"
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

            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-300 text-sm animate-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group text-base"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            
            <div className="text-center">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                Forgot your password?
              </a>
            </div>
          </div>

          
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full animate-bounce" style={{ animationDelay: "1s", animationDuration: "3s" }}></div>
        <div className="absolute -top-2 -right-8 w-4 h-4 bg-blue-500/30 rounded-full animate-bounce" style={{ animationDelay: "2s", animationDuration: "4s" }}></div>
        <div className="absolute -bottom-6 -right-2 w-6 h-6 bg-pink-500/20 rounded-full animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}></div>
      </div>
    </div>
  );
}
