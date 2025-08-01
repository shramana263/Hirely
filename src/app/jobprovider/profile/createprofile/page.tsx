"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CreateProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    email: "",
    industry: "",
    address: "",
    country: "",
    pincode: "",
    website: "",
    established: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile created successfully!");
    console.log("New Profile:", formData);
    setFormData({
      name: "",
      contact_no: "",
      email: "",
      industry: "",
      address: "",
      country: "",
      pincode: "",
      website: "",
      established: "",
      description: "",
    });
  };

  return (
    <div className="relative min-h-screen  sm:px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Image
        src="/images/image.png"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        priority
        className="-z-10 opacity-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-10 border border-gray-200 dark:border-gray-700 mt-8 transition-colors duration-300"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Create New Profile
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Company Name", name: "name", type: "text" },
            { label: "Contact Number", name: "contact_no", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Industry", name: "industry", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Country", name: "country", type: "text" },
            { label: "Pincode", name: "pincode", type: "text" },
            { label: "Website", name: "website", type: "text" },
            { label: "Established Year", name: "established", type: "text" },
          ].map((field, idx) => (
            <div key={idx}>
              <Label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="mt-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 transition-colors duration-300"
                required
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Company Description
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Write about your company"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 transition-colors duration-300"
              required
            />
          </div>

          <div className="sm:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all"
            >
              Create Profile
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
