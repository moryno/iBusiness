import axios from "axios";
import { getLocalData } from "../helpers/auth";
import { toast } from "react-toastify";

const BASE_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_VERSION;

export const onboardingRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default class OnboardingService {
  static async post(action, params) {
    let response = await onboardingRequest.post(action, params);
    return response.data;
  }
  static async put(action, params) {
    let response = await onboardingRequest.put(action, params);
    return response.data;
  }
  static async get(action) {
    let response = await onboardingRequest.get(action);
    return response.data;
  }
  static async delete(action) {
    let response = await onboardingRequest.delete(action);
    return response.data;
  }
  static async patch(action, params) {
    let response = await onboardingRequest.patch(action, params);
    return response.data;
  }
}

onboardingRequest.interceptors.request.use(
  async (config) => {
    const csrfToken = getLocalData("csrfToken");

    if (csrfToken) {
      config.headers = { "X-Csrf-Token": csrfToken };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

onboardingRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleErrorResponse(error);
    return Promise.reject(error);
  }
);

const handleErrorResponse = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error("Bad Request: " + data.message);
        break;
      case 401:
        toast.error("Unauthorized: " + data.message);
        break;
      case 404:
        toast.error("Not Found: " + data.message);
        break;
      case 405:
        toast.error(
          "Method Not Allowed: The requested method is not allowed for this resource"
        );
        break;

      default:
        toast.error("Error: Something went wrong");
    }
  } else if (error.request) {
    toast.error("Network Error: Please check your internet connection");
  } else {
    toast.error("Error: Something went wrong");
  }
};
