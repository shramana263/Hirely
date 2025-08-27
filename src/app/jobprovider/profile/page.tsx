"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import EditProviderModal from "./updateprofileModal";
import axiosClient from "@/library/axiosClient";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export default function ProviderProfile() {


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllFields, setShowAllFields] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  async function fetchProfile() {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await axiosClient.get("/providers/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = res.data.data;
      setFormData(data);

      const isProfileFilled = data.contact_no || data.description || data.address;
      setShowAllFields(isProfileFilled);
    } catch (err: unknown) {
      if (isAxiosError<{ message?: string }>(err)) {
        setError(err.response?.data?.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchProfile();
  }, []);




  async function updateProfile() {
    const accessToken = sessionStorage.getItem("accessToken");

    const res = await axiosClient.put(
      "/providers/updateprofile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(res.data);
  }


  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile();
    await fetchProfile();
    setShowAllFields(true);
    toast.success("Profile updated successfully!");
    setIsEditModalOpen(false);
  };
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!formData) return null;

  return (

    <div className="relative min-h-screen px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Image
        src="/images/edit.png"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        priority
        className="-z-10 opacity-10"
      />

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
                establishment: <span className="font-semibold">{formData.establishment}</span>
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 sm:my-8 border-gray-200 dark:border-gray-700" />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {["name", "email"].map((key) => (
            <div
              key={key}
              className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </p>
              <p className="font-medium text-sm sm:text-base mt-1">
                {formData[key]}
              </p>
            </div>
          ))}
        </div>


        {showAllFields && (
          <>
            <hr className="my-6 sm:my-8 border-gray-200 dark:border-gray-700" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {["contact_no", "website_link", "address", "country"].map((key, index) => {
                const label = key.charAt(0).toUpperCase() + key.replace("_", " ").slice(1);
                const value = key === "website_kink" ? (
                  <a
                    href={formData.website_link}
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600 dark:text-blue-400 font-medium break-all"
                  >
                    {formData.website_link}
                  </a>
                ) : (
                  formData[key]
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
          </>
        )}
      </motion.div>
    </div>

  );

}