import axios from "axios";
import { getLocalData } from "../helpers/auth";

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
    const { response } = error;
    if (response.status === 401 || response.status === 404) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
