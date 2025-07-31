"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/library/axiosClient";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("pet_owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post("/auth/login", { email, password });
      const userRole = response.data.user.role;

      if (userRole === "jobseeker") router.push("/jobprovider");
      else if (userRole === "admin") router.push("/jobprovider");
      else if (userRole === "jobprovider") router.push("/jobprovider");

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login
      </button>
      <p className="text-red-500 mt-2">{error}</p>
      <p className="mt-4 text-blue-500 cursor-pointer" onClick={() => router.push("/guest/register")}>
        Don't have an account? Register
      </p>
    </div>
  );
}
