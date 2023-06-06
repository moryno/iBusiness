import axios from "axios";

const BASE_URL = "https://localhost:7041/api/";

const requestService = axios.create({ baseURL: BASE_URL });

requestService.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("token");

    if (TOKEN) {
      config.headers = { Authorization: `Bearer ${TOKEN}` };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requestService;
