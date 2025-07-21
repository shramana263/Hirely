"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
interface EditProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    contact_no: string;
    email: string;
    industry: string;
    address: string;
    country: string;
    pincode: string;
    website: string;
    established: string;
    description: string;
  };
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EditProviderModal({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
}: EditProviderModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40  backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
          <div className="sticky top-0 bg-blue-600 p-4 rounded-t-lg flex justify-between items-center z-10">
            <h2 className="text-xl font-bold text-white">
              Edit Profile
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-400 rounded-full p-1  transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">Company Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={onFormChange}
                    placeholder="Enter company name"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Contact Number</Label>
                    <Input
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={onFormChange}
                      placeholder="Enter contact number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={onFormChange}
                      placeholder="Enter email"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700">Industry Type</Label>
                  <Input
                    name="industry"
                    value={formData.industry}
                    onChange={onFormChange}
                    placeholder="Industry type"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-700">Address</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={onFormChange}
                      placeholder="Company address"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Country</Label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={onFormChange}
                      placeholder="Country"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Pincode</Label>
                    <Input
                      name="pincode"
                      value={formData.pincode}
                      onChange={onFormChange}
                      placeholder="Pincode"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Website</Label>
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={onFormChange}
                      placeholder="Website URL"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Established</Label>
                    <Input
                      name="established"
                      value={formData.established}
                      onChange={onFormChange}
                      placeholder="Year"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700">Description</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={onFormChange}
                    placeholder="Write about your company"
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className=" cursor-pointer flex justify-end gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  onClick={onClose}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="min-w-[100px] bg-blue-600 hover:bg-blue-700  text-white transition-colors"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}
