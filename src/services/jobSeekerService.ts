import axiosClient from "@/library/axiosClient";

export interface JobSeekerProfile {
  _id?: string;
  user_id?: string;
  name: string;
  email: string;
  contact_no: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  resume_path?: string;
  resume_link?: string;
  address: string;
  skills?: string;
  image?: string;
  country?: string;
  secondary_experience?: string;
  highersecondary_experience?: string;
  cgpa?: string;
  experience_year?: string;
  additional_link?: string;
  availability?: string;
  dob?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  contact_no: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  resume_path?: string;
  resume_link?: string;
  address: string;
  skills?: string;
  country?: string;
  secondary_experience?: string;
  highersecondary_experience?: string;
  cgpa?: string;
  experience_year?: string;
  additional_link?: string;
  availability?: string;
  dob?: string;
}

class JobSeekerService {
  private static instance: JobSeekerService;

  public static getInstance(): JobSeekerService {
    if (!JobSeekerService.instance) {
      JobSeekerService.instance = new JobSeekerService();
    }
    return JobSeekerService.instance;
  }

  // Debug method to test connection
  async testConnection(): Promise<boolean> {
    try {
      console.log("Testing connection to backend...");
      const response = await axiosClient.get("/");
      console.log("Connection test response:", response);
      return true;
    } catch (error: any) {
      console.error("Connection test failed:", error);
      return false;
    }
  }

  async getProfile(): Promise<{ success: boolean; data: JobSeekerProfile; message?: string }> {
    try {
      console.log("Fetching jobseeker profile...");
      const response = await axiosClient.get("/jobseekers/me");
      console.log("Profile API response:", response);
      console.log("Profile API response data:", response.data);
      
      // Check if response.data exists and has the expected structure
      if (!response.data || typeof response.data !== 'object') {
        console.error("Invalid response structure:", response);
        throw new Error("Invalid response from server");
      }
      
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch profile:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      if (error.response?.status === 404) {
        throw new Error("Profile not found.");
      }
      
      // Handle case where response is empty or malformed
      if (!error.response || !error.response.data) {
        throw new Error("No response from server. Please check if the backend is running.");
      }
      
      throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
  }

  async updateProfile(profileData: UpdateProfileData, imageFile?: File): Promise<{ success: boolean; data: JobSeekerProfile; message?: string }> {
    try {
      console.log("=== FRONTEND UPDATE PROFILE ===");
      console.log("Profile data:", profileData);
      console.log("Image file provided:", !!imageFile);
      if (imageFile) {
        console.log("Image file details:", {
          name: imageFile.name,
          size: imageFile.size,
          type: imageFile.type
        });
      }
      
      const formData = new FormData();
      
      // Append all profile data (only non-empty values)
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value.toString());
          console.log(`✓ Added to FormData: ${key} = ${value}`);
        } else {
          console.log(`✗ Skipped empty value: ${key} = ${value}`);
        }
      });
      
      // Append image file if provided
      if (imageFile) {
        formData.append("image", imageFile);
        console.log("✓ Added image file to FormData:", imageFile.name);
      }
      
      console.log("Making PUT request to /jobseekers/me...");
      
      // Let axios set the Content-Type automatically for multipart/form-data
      const response = await axiosClient.put("/jobseekers/me", formData);
      
      console.log("✅ Update profile API response:", response);
      console.log("Response data:", response.data);
      
      if (!response.data) {
        throw new Error("Empty response from server");
      }
      
      return response.data;
    } catch (error: any) {
      console.error("❌ Failed to update profile:", error);
      
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
      
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || "Invalid profile data.");
      }
      
      if (error.response?.status === 413) {
        throw new Error("File too large. Please choose a smaller image.");
      }
      
      // Handle case where response is empty or malformed
      if (!error.response) {
        throw new Error("No response from server. Please check if the backend is running.");
      }
      
      throw new Error(error.response?.data?.message || error.message || "Failed to update profile");
    }
  }

  async generateResume(): Promise<{ success: boolean; data: { resume_url: string }; message?: string }> {
    try {
      console.log("Generating resume...");
      // Note: This endpoint might need to be created in the backend
      const response = await axiosClient.post("/jobseekers/generate-resume");
      console.log("Generate resume API response:", response);
      
      return response.data;
    } catch (error: any) {
      console.error("Failed to generate resume:", error);
      
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      if (error.response?.status === 400) {
        throw new Error("Incomplete profile. Please complete your profile to generate resume.");
      }
      
      throw new Error(error.response?.data?.message || "Failed to generate resume");
    }
  }

  // Helper method to check if profile is complete
  isProfileComplete(profile: JobSeekerProfile): boolean {
    const requiredFields = [
      'contact_no',
      'first_name',
      'last_name',
      'address',
      'skills',
      'experience_year'
    ];
    
    return requiredFields.every(field => {
      const value = profile[field as keyof JobSeekerProfile];
      return value !== undefined && value !== null && value !== '';
    });
  }
}

export default JobSeekerService.getInstance();
