import axios from "axios";

const BASE_URL = "https://192.168.1.13:7041/api";

let request = axios.create({ baseURL: BASE_URL });

request.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("token");

    if (TOKEN) {
      config.headers = { Authorization: `Bearer ${TOKEN}` };
    }

    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default request;
