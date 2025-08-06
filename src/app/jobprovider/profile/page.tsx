"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
  // Import useRouter
import EditProviderModal from "./updateprofileModal";


export default function ProviderProfile() {
 // Initialize router

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "Robin Studios",
    contact_no: "+91 56984 71552",
    email: "info@robinstudios.com",
    industry: "Creative Technology Company",
    address: "123 Tech Lane, Silicon Valley",
    country: "India",
    pincode: "560001",
    website: "https://www.robinstudios.com",
    established: "2017",
    description:
      "Robin Studios is a creative tech company focused on building scalable web applications and delivering top-notch design services. We foster a collaborative culture and strive for innovation in every project.",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    setIsEditModalOpen(false);
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  
      <EditProviderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300"
      >


        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 mb-8 md:mb-10">
       
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 relative rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl ring-2 ring-blue-500/30 hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                alt="Company Logo"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-medium shadow-lg transition-all transform hover:scale-[1.03] active:scale-95"
              aria-label="Edit Profile"
            >
              <Pencil size={16} /> <span className="hidden sm:inline">Edit Profile</span>
            </button>
          </motion.div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-block bg-blue-100/50 dark:bg-blue-900/30 px-3 py-1 sm:px-4 sm:py-1 rounded-full mb-2 sm:mb-3">
              <span className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm font-semibold">
                {formData.industry}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
              {formData.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 mt-2 sm:mt-4">
              <span className="text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                Established: <span className="font-semibold">{formData.established}</span>
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 sm:my-8 border-gray-200 dark:border-gray-700" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          {["email", "contact_no", "website", "address", "country", "pincode"].map((key, index) => {
            const label = key.charAt(0).toUpperCase() + key.replace("_", " ").slice(1);
            const value = key === "website" ? (
              <a
                href={formData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 dark:text-blue-400 font-medium break-all"
              >
                {formData.website}
              </a>
            ) : (
              formData[key as keyof typeof formData]
            );

            return (
              <div
                key={index}
                className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  {label}
                </p>
                <p className="font-medium text-sm sm:text-base mt-1">{value}</p>
              </div>
            );
          })}
        </motion.div>

        <hr className="my-6 sm:my-8 border-gray-200 dark:border-gray-700" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-1 h-6 sm:h-8 bg-blue-600 rounded-full"></div>
            <h3 className="text-xl sm:text-2xl font-bold">About the Company</h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-5 rounded-lg">
            <p className="leading-relaxed text-sm sm:text-base">{formData.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
