"use client";

import Image from "next/image";
import { Menu, Pencil } from "lucide-react";
import { useSidebar } from "../../layout";
import { motion } from "framer-motion";
import { useState } from "react";
import EditProviderModal from "./editprofile/page";


export default function ProviderProfile() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
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

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

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
    <div className="relative min-h-screen px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <Image
        src="/images/image.png"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        priority
        className="-z-10 opacity-10"
      />

      <EditProviderModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-200/70 transition-all duration-300 ${
          isEditModalOpen ? "backdrop-blur-sm" : ""
        }`}
      >
        <div className="flex justify-between items-start mb-8">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="rounded-lg bg-white hover:bg-gray-50 p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-36 h-36 relative rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-blue-500/30 hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                alt="Company Logo"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={handleEdit}
              className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg px-6 py-2.5 text-sm font-medium shadow-lg transition-all transform hover:scale-[1.03] active:scale-95"
              aria-label="Edit Profile"
            >
              <Pencil size={16} /> Edit Profile
            </button>
          </motion.div>

          <div className="text-center md:text-left flex-1">
            <div className="inline-block bg-blue-100/50 px-4 py-1 rounded-full mb-3">
              <span className="text-blue-800 text-sm font-semibold">
                {formData.industry}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              {formData.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
              <span className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-full">
                Established:{" "}
                <span className="font-semibold">{formData.established}</span>
              </span>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200/70" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800"
        >
          {[
            { label: "Email", value: formData.email },
            { label: "Contact", value: formData.contact_no },
            {
              label: "Website",
              value: (
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600 font-medium"
                >
                  {formData.website}
                </a>
              ),
            },
            { label: "Address", value: formData.address },
            { label: "Country", value: formData.country },
            { label: "Pincode", value: formData.pincode },
          ].map((item, index) => (
            <div
              key={index}
              className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {item.label}
                  </p>
                  <p className="font-medium text-base mt-1">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <hr className="my-8 border-gray-200/70" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900">
              About the Company
            </h3>
          </div>
          <div className="bg-gray-50/70 p-5 rounded-lg">
            <p className="leading-relaxed text-gray-700">
              {formData.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
