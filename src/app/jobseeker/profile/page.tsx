"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  FileText,
  Link as LinkIcon,
  Upload,
  Loader2,
  Save,
  Download,
  AlertCircle,
  CheckCircle,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import JobSeekerNavbar from "@/components/JobSeekerNavbar";
import jobSeekerService, { JobSeekerProfile, UpdateProfileData } from "@/services/jobSeekerService";

export default function JobSeekerProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<UpdateProfileData>({
    contact_no: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    resume_path: "",
    resume_link: "",
    address: "",
    skills: "",
    country: "",
    secondary_experience: "",
    highersecondary_experience: "",
    cgpa: "",
    experience_year: "",
    additional_link: "",
    availability: "",
    dob: "",
  });

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Add a small delay to ensure sessionStorage is available
        const token = sessionStorage.getItem("accessToken");
        const userRole = sessionStorage.getItem("userRole");
        const userName = sessionStorage.getItem("userName");
        
        console.log("Profile page auth check:");
        console.log("- Token exists:", !!token);
        console.log("- Token preview:", token ? token.substring(0, 20) + "..." : "None");
        console.log("- User role:", userRole);
        console.log("- User name:", userName);
        
        if (!token) {
          console.log("❌ No token found, redirecting to login");
          router.push("/login");
          return false;
        }
        
        if (userRole !== "jobseeker") {
          console.log(`❌ Invalid user role '${userRole}', expected 'jobseeker', redirecting to login`);
          router.push("/login");
          return false;
        }
        
        console.log("✅ Authentication successful");
        return true;
      } catch (error) {
        console.error("❌ Error during auth check:", error);
        router.push("/login");
        return false;
      }
    };
    
    // Use setTimeout to ensure the component is fully mounted
    const timeoutId = setTimeout(() => {
      if (checkAuth()) {
        fetchProfile();
      }
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [router]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await jobSeekerService.getProfile();
      
      if (response.success) {
        setProfile(response.data);
        
        // Update form data with profile data
        setFormData({
          contact_no: response.data.contact_no || "",
          first_name: response.data.first_name || "",
          middle_name: response.data.middle_name || "",
          last_name: response.data.last_name || "",
          resume_path: response.data.resume_path || "",
          resume_link: response.data.resume_link || "",
          address: response.data.address || "",
          skills: response.data.skills || "",
          country: response.data.country || "",
          secondary_experience: response.data.secondary_experience || "",
          highersecondary_experience: response.data.highersecondary_experience || "",
          cgpa: response.data.cgpa || "",
          experience_year: response.data.experience_year || "",
          additional_link: response.data.additional_link || "",
          availability: response.data.availability || "",
          dob: response.data.dob ? response.data.dob.split('T')[0] : "",
        });
        
        if (response.data.image) {
          setImagePreview(`https://jobsite-api.wishalpha.com${response.data.image}`);
        }
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

 // ...existing code...

const handleSaveProfile = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    const response = await jobSeekerService.updateProfile(formData, imageFile || undefined);
    
    if (response.success) {
      setSuccess("Profile updated successfully!");
      setProfile(response.data);
      setImageFile(null);

      // Update session storage with new name if changed
      if (response.data.name) {
        sessionStorage.setItem("userName", response.data.name);
      }

      // Redirect to jobseeker dashboard after update
      router.push("/jobseeker");
    }
  } catch (err: any) {
    console.error("Error updating profile:", err);
    setError(err.message);
  } finally {
    setSaving(false);
  }
};

// ...existing code...

  const handleGenerateResume = async () => {
    if (!profile) return;
    
    // Check if profile is complete enough to generate resume
    if (!jobSeekerService.isProfileComplete(profile)) {
      setError("Please complete your profile (contact, name, address, skills, experience) before generating resume.");
      return;
    }
    
    try {
      setGenerating(true);
      setError(null);
      
      const response = await jobSeekerService.generateResume();
      
      if (response.success) {
        // Download or open the generated resume
        window.open(response.data.resume_url, '_blank');
        setSuccess("Resume generated successfully!");
      }
    } catch (err: any) {
      console.error("Error generating resume:", err);
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <JobSeekerNavbar />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  const isProfileComplete = profile ? jobSeekerService.isProfileComplete(profile) : false;

  return (
    <div className="min-h-screen bg-gray-800">
      <JobSeekerNavbar userName={profile?.name} userImage={imagePreview || undefined} />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-50">Profile</h1>
          <p className="mt-2 text-gray-300">
            Complete your profile to start applying for jobs and generate your resume.
          </p>
        </div>

        {/* Profile Completion Alert */}
        {!isProfileComplete && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Your profile is incomplete. Please fill in all required fields to apply for jobs and generate your resume.
            </AlertDescription>
          </Alert>
        )}

        {isProfileComplete && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your profile is complete! You can now apply for jobs and generate your resume.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={imagePreview || undefined} alt="Profile" />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    {profile?.name ? getInitials(profile.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email - Non-editable */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    // className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Full Name - Non-editable */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile?.name || ""}
                    disabled
                    // className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Name from signup cannot be changed</p>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="contact_no" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Contact Number *</span>
                  </Label>
                  <Input
                    id="contact_no"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleInputChange}
                    placeholder="Enter your contact number"
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="dob" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date of Birth</span>
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="First name"
                    required
                  />
                </div>

                {/* Middle Name */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="middle_name">Middle Name</Label>
                  <Input
                    id="middle_name"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                    placeholder="Middle name"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Address *</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>

                {/* Country */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="country" className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>Country</span>
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Professional Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skills */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="skills">Skills *</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                    required
                  />
                </div>

                {/* Experience Years */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="experience_year">Years of Experience *</Label>
                  <Input
                    id="experience_year"
                    name="experience_year"
                    value={formData.experience_year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 years"
                    required
                  />
                </div>

                {/* Availability */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="e.g., Full-time, Part-time, Contract"
                  />
                </div>

                {/* Additional Link */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="additional_link" className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Portfolio/LinkedIn</span>
                  </Label>
                  <Input
                    id="additional_link"
                    name="additional_link"
                    type="url"
                    value={formData.additional_link}
                    onChange={handleInputChange}
                    placeholder="https://"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education Card */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Secondary Education */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="secondary_experience">Secondary Education</Label>
                  <Input
                    id="secondary_experience"
                    name="secondary_experience"
                    value={formData.secondary_experience}
                    onChange={handleInputChange}
                    placeholder="High School, Board, Year"
                  />
                </div>

                {/* Higher Secondary */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="highersecondary_experience">Higher Secondary</Label>
                  <Input
                    id="highersecondary_experience"
                    name="highersecondary_experience"
                    value={formData.highersecondary_experience}
                    onChange={handleInputChange}
                    placeholder="College, Field, Year"
                  />
                </div>

                {/* CGPA/Percentage */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="cgpa">CGPA/Percentage</Label>
                  <Input
                    id="cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    placeholder="e.g., 8.5 CGPA or 85%"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Resume</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Resume Path */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="resume_path">Resume File Path Link</Label>
                  <Input
                    id="resume_path"
                    name="resume_path"
                    value={formData.resume_path}
                    onChange={handleInputChange}
                    placeholder="Upload resume file path"
                  />
                </div>

                {/* Resume Link */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="resume_link">Resume Link</Label>
                  <Input
                    id="resume_link"
                    name="resume_link"
                    type="url"
                    value={formData.resume_link}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>

              {/* Generate Resume Button */}
              <div className="pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateResume}
                  disabled={generating || !isProfileComplete}
                  className="w-full md:w-auto"
                >
                  {generating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Generate Resume from Profile
                </Button>
                {!isProfileComplete && (
                  <p className="text-sm text-gray-500 mt-1">
                    Complete your profile to generate resume
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button type="submit" disabled={saving} className="px-8">
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
