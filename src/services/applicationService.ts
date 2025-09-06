/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/library/axiosClient";

export interface Application {
  _id: string;
  job_id: {
    _id: string;
    name: string;
    description: string;
    job_type: string;
    address: string;
    min_salary: number;
    max_salary: number;
    status: string;
    provider_id: {
      name: string;
      email: string;
    };
  };
  jobseeker_id: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  cover_letter?: string;
  resume_url?: string;
  applied_at: string;
  updated_at: string;
}

export interface ApplyJobData {
  cover_letter?: string;
  resume_url?: string;
}

export interface ApplicationsResponse {
  success: boolean;
  data: Application[];
  pagination?: {
    current_page: number;
    total_pages: number;
    total_applications: number;
    per_page: number;
  };
  message?: string;
}

class ApplicationService {
  private static instance: ApplicationService;

  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  async applyForJob(jobId: string, applicationData?: ApplyJobData): Promise<{ success: boolean; data: Application; message?: string }> {
    try {
      console.log("Applying for job:", jobId, "with data:", applicationData);
      const response = await axiosClient.post(`/jobs/${jobId}/apply`, applicationData || {});
      console.log("Apply job response:", response);
      
      return response.data;
     
    } catch (error: any) {
      console.error(`Failed to apply for job with id ${jobId}:`, error);
      
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      if (error.response?.status === 400) {
        const message = error.response?.data?.message;
        if (message?.includes('already applied')) {
          throw new Error("You have already applied for this job.");
        }
        if (message?.includes('no longer accepting')) {
          throw new Error("This job is no longer accepting applications.");
        }
        throw new Error(message || "Invalid application data.");
      }
      
      if (error.response?.status === 404) {
        throw new Error("Job not found.");
      }
      
      throw new Error(error.response?.data?.message || "Failed to apply for job");
    }
  }

  async getMyApplications(page: number = 1, limit: number = 10): Promise<ApplicationsResponse> {
    try {
      console.log("Fetching my applications...");
      const response = await axiosClient.get(`/applications?page=${page}&limit=${limit}`);
      console.log("My applications response:", response);
      
      // Handle the nested response structure from backend
      const data = response.data;
      if (data.success && data.data) {
        return {
          success: true,
          data: data.data.applications || data.data || [],
          pagination: data.data.pagination || undefined,
          message: data.message
        };
      }
      
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch applications:", error);
      
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      throw new Error(error.response?.data?.message || "Failed to fetch applications");
    }
  }

  async getApplicationById(applicationId: string): Promise<{ success: boolean; data: Application; message?: string }> {
    try {
      console.log("Fetching application:", applicationId);
      const response = await axiosClient.get(`/applications/${applicationId}`);
      console.log("Application details response:", response);
      
      return response.data;
    } catch (error: any) {
      console.error(`Failed to fetch application with id ${applicationId}:`, error);
      
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      if (error.response?.status === 404) {
        throw new Error("Application not found.");
      }
      
      throw new Error(error.response?.data?.message || "Failed to fetch application details");
    }
  }

  async getAppliedJobIds(): Promise<string[]> {
    try {
      console.log("Fetching applied job IDs...");
      const response = await axiosClient.get("/applications/applied-jobs");
      console.log("Applied job IDs response:", response);
      
      return response.data.data || [];
    } catch (error: any) {
      console.error("Failed to fetch applied job IDs:", error);
      
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      // Return empty array on error rather than throwing, so UI doesn't break
      console.warn("Couldn't fetch applied job IDs, returning empty array");
      return [];
    }
  }
}

export default ApplicationService.getInstance();
