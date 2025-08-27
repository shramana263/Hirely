import axiosClient from "@/library/axiosClient";

export interface Job {
  _id: string;
  name: string;
  job_type: string;
  address: string;
  min_salary: number;
  max_salary: number;
  created_at: string;
  company?: string;
  description?: string;
  requirements?: string[];
  experience_level?: string;
  application_deadline?: string;
}

export interface JobsResponse {
  data: Job[];
  total?: number;
  page?: number;
  limit?: number;
}

class JobService {
  private static instance: JobService;

  public static getInstance(): JobService {
    if (!JobService.instance) {
      JobService.instance = new JobService();
    }
    return JobService.instance;
  }

  async getAllJobs(): Promise<JobsResponse> {
    try {
      console.log("Fetching jobs from /jobs endpoint...");
      const response = await axiosClient.get("/jobs");
      console.log("Jobs API response:", response);
      
      // Return the response structure that matches what the jobprovider expects
      return {
        data: response.data.data || [],
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit
      };
    } catch (error: any) {
      console.error("Failed to fetch jobs:", error);
      
      // If it's a 403 error, it might be due to missing authentication
      if (error.response?.status === 403) {
        throw new Error("Authentication required to view job listings. Please log in.");
      }
      
      throw new Error("Failed to fetch jobs. Please try again later.");
    }
  }

  async getJobById(id: string): Promise<Job> {
    try {
      const response = await axiosClient.get(`/jobs/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch job with id ${id}:`, error);
      throw new Error("Failed to fetch job details");
    }
  }

  async createJob(jobData: Partial<Job>): Promise<Job> {
    try {
      const response = await axiosClient.post("/jobs", jobData);
      return response.data.data;
    } catch (error) {
      console.error("Failed to create job:", error);
      throw new Error("Failed to create job");
    }
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    try {
      const response = await axiosClient.put(`/jobs/${id}`, jobData);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update job with id ${id}:`, error);
      throw new Error("Failed to update job");
    }
  }

  async deleteJob(id: string): Promise<void> {
    try {
      await axiosClient.delete(`/jobs/${id}`);
    } catch (error) {
      console.error(`Failed to delete job with id ${id}:`, error);
      throw new Error("Failed to delete job");
    }
  }

  async applyForJob(jobId: string, applicationData?: any): Promise<void> {
    try {
      await axiosClient.post(`/jobs/${jobId}/apply`, applicationData || {});
    } catch (error) {
      console.error(`Failed to apply for job with id ${jobId}:`, error);
      throw new Error("Failed to apply for job");
    }
  }
}

export default JobService.getInstance();
