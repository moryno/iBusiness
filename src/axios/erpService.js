import axios from "axios";
import { getLocalData } from "../helpers/auth";

const BASE_URL = "https://localhost:5000/api/Adm/v1";

const erpRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

//export default erpRequest;

export default class ErpService {
  static async post(action, params) {
    let response = await erpRequest.post(action, params);
    return response.data;
  }
  static async put(action, params) {
    let response = await erpRequest.put(action, params);
    return response.data;
  }
  static async get(action) {
    let response = await erpRequest.get(action);
    return response.data;
  }
  static async delete(action) {
    let response = await erpRequest.delete(action);
    return response.data;
  }
  static async patch(action, params) {
    let response = await erpRequest.patch(action, params);
    return response.data;
  }
}

erpRequest.interceptors.request.use(
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

erpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401 || response.status === 404) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
