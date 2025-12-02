/**
 * =================================
 * API Client
 *
 *
 * =================================
 */

import { privateAxios } from "@/config/axios.config";
import { Resume, User } from "@prisma/client";

// Helper function for making authenticated requests
async function apiRequest<T>(
  endpoint: string,
  options: {
    body?: any;
    method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
  }
): Promise<T | null> {
  switch (options.method) {
    case "GET":
      try {
        const response = await privateAxios.get<any | null>(
          endpoint,
          options.body ?? {}
        );

        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "DELETE":
      try {
        const response = await privateAxios.delete<any | null>(endpoint);

        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "POST":
      try {
        const response = await privateAxios.post<any | null>(
          endpoint,
          options.body ?? {}
        );
        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "PUT":
      try {
        const response = await privateAxios.put<any | null>(
          endpoint,
          options.body ?? {}
        );
        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "PATCH":
      try {
        const response = await privateAxios.patch<any | null>(
          endpoint,
          options.body ?? {}
        );
        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    default:
      console.error("Invalid HTTP method");
      return null;
      break;
  }
}

// API Methods
export const api = {
  resume: {
    getAll: ({
      page,
      limit,
    }: {
      page: number;
      limit: number;
    }): Promise<ResumesMetadata | null> =>
      apiRequest(`/resumes?page=${page}&limit=${limit}`, {
        method: "GET",
      }),
    delete: ({ id }: { id: string }): Promise<{ success: boolean } | null> =>
      apiRequest(`/resumes/${id}`, {
        method: "DELETE",
      }),
    create: (data: any): Promise<Resume | null> =>
      apiRequest("/resumes", {
        method: "POST",
        body: data,
      }),
    importCreate: (data: any): Promise<Resume | null> =>
      apiRequest("/resumes/import", {
        method: "POST",
        body: data,
      }),
    generate: (data: any): Promise<Resume | null> =>
      apiRequest("/ai/generate", {
        method: "POST",
        body: data,
      }),
  },
  ai: {
    streamResumeImprovement: (data: any) =>
      apiRequest("/ai/stream", {
        method: "POST",
        body: data,
      }),
    generateResume: (data: any) =>
      apiRequest("/ai/generate", {
        method: "POST",
        body: data,
      }),
  },
  user: {
    updateProfile: (data: any) =>
      apiRequest("/user/profile", {
        method: "PUT",
        body: data,
      }),
    updatePassword: (data: any) =>
      apiRequest("/user/password", {
        method: "PUT",
        body: data,
      }),
    updateSubscription: (data: any) =>
      apiRequest("/user/subscription", {
        method: "PUT",
        body: data,
      }),
    get: (id: string): Promise<User | null> =>
      apiRequest("/user", {
        method: "GET",
      }),
    updateAvatar: (data: any) =>
      apiRequest("/user/avatar", {
        method: "PUT",
        body: data,
      }),
  },
  auth: {
    forgotPassword: (data: any) =>
      apiRequest("/auth/forgot-password", {
        method: "POST",
        body: data,
      }),
    resetPassword: (data: any) =>
      apiRequest("/auth/reset-password", {
        method: "POST",
        body: data,
      }),
    verifyEmail: (data: any) =>
      apiRequest("/auth/verify-email", {
        method: "POST",
        body: data,
      }),
    verifyOtp: (data: any) =>
      apiRequest("/auth/verify-otp", {
        method: "POST",
        body: data,
      }),
  },
};
