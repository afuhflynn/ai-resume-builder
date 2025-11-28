import { API_BASE } from "@/constants";
import axios, { AxiosInstance } from "axios";

// Create an Axios instance with a base URL for the API
export const privateAxios: AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  withXSRFToken: true,
});
