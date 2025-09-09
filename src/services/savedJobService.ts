import axiosClient from "@/library/axiosClient";

export interface SavedJob {
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
    created_at: string;
    provider_id: {
      _id: string;
      name: string;
      email: string;
    };
  };
  jobseeker_id: string;
  saved_at: string;
}

export interface SavedJobsResponse {
  data: {
    savedJobs: SavedJob[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalSavedJobs: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

class SavedJobService {
  private static instance: SavedJobService;

  public static getInstance(): SavedJobService {
    if (!SavedJobService.instance) {
      SavedJobService.instance = new SavedJobService();
    }
    return SavedJobService.instance;
  }

  async getMySavedJobs(page: number = 1, limit: number = 10): Promise<SavedJobsResponse> {
    try {
      console.log("Fetching saved jobs...");
      const response = await axiosClient.get(`/saved-jobs?page=${page}&limit=${limit}`);
      console.log("Saved jobs response:", response);

      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch saved jobs:", error);

      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      if (error.response?.status === 403) {
        throw new Error("Access denied. Jobseeker access required.");
      }

      throw new Error(error.response?.data?.message || "Failed to fetch saved jobs");
    }
  }

  async saveJob(jobId: string): Promise<{ success: boolean; message: string; data?: SavedJob }> {
    try {
      console.log("Saving job:", jobId);
      const response = await axiosClient.post(`/saved-jobs/${jobId}/save`);
      console.log("Save job response:", response);

      return response.data;
    } catch (error: any) {
      console.error(`Failed to save job ${jobId}:`, error);

      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      if (error.response?.status === 403) {
        throw new Error("Access denied. Jobseeker access required.");
      }

      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || "Job is already saved");
      }

      if (error.response?.status === 404) {
        throw new Error("Job not found");
      }

      throw new Error(error.response?.data?.message || "Failed to save job");
    }
  }

  async unsaveJob(jobId: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log("Unsaving job:", jobId);
      const response = await axiosClient.delete(`/saved-jobs/${jobId}/save`);
      console.log("Unsave job response:", response);

      return response.data;
    } catch (error: any) {
      console.error(`Failed to unsave job ${jobId}:`, error);

      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      if (error.response?.status === 403) {
        throw new Error("Access denied. Jobseeker access required.");
      }

      if (error.response?.status === 404) {
        throw new Error(error.response?.data?.message || "Saved job not found");
      }

      throw new Error(error.response?.data?.message || "Failed to unsave job");
    }
  }

  async isJobSaved(jobId: string): Promise<boolean> {
    try {
      // This is a helper method to check if a job is saved
      // We'll implement this by fetching saved jobs and checking
      const response = await this.getMySavedJobs(1, 1000); // Get all saved jobs
      const savedJobIds = response.data.savedJobs.map(saved => saved.job_id._id);
      return savedJobIds.includes(jobId);
    } catch (error) {
      console.error(`Failed to check if job ${jobId} is saved:`, error);
      return false;
    }
  }
}

export default SavedJobService.getInstance();
