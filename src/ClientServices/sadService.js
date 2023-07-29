import axios from "axios";
import { getLocalData } from "../helpers/auth";
import { toast } from "react-toastify";

const BASE_URL =
  process.env.REACT_APP_ERP_URL + process.env.REACT_APP_ADMIN_API_VERSION;

const sadRequest = axios.create({
  baseURL: BASE_URL,
});

//export default erpRequest;

export default class SadService {
  static async post(action, params) {
    let response = await sadRequest.post(action, params);
    return response.data;
  }
  static async put(action, params) {
    let response = await sadRequest.put(action, params);
    return response.data;
  }
  static async get(action) {
    let response = await sadRequest.get(action);
    return response.data;
  }
  static async delete(action) {
    let response = await sadRequest.delete(action);
    return response.data;
  }
  static async patch(action, params) {
    let response = await sadRequest.patch(action, params);
    return response.data;
  }
}

sadRequest.interceptors.request.use(
  async (config) => {
    const TOKEN = getLocalData("token");
    if (TOKEN) {
      config.headers = {
        Authorization: `Bearer ${TOKEN}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

sadRequest.interceptors.response.use(
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
